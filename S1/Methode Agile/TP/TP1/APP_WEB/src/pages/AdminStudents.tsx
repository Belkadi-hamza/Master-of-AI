import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/integrations/firebase/config';
import { collection, getDocs, query, orderBy, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { User, GraduationCap, Loader2, UserPlus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  grade_level: string | null;
  field_of_study: string | null;
}


export default function AdminStudents() {
  const { isAdmin, createStudent: createStudentAccount, user, signIn } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [createStudentDialogOpen, setCreateStudentDialogOpen] = useState(false);
  const [creatingStudent, setCreatingStudent] = useState(false);
  const [editStudentDialogOpen, setEditStudentDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(false);
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState<Profile | null>(null);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);

  // Create student form state
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentGradeLevel, setStudentGradeLevel] = useState('');
  const [studentFieldOfStudy, setStudentFieldOfStudy] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // Edit student form state
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentEmail, setEditStudentEmail] = useState('');
  const [editStudentGradeLevel, setEditStudentGradeLevel] = useState('');
  const [editStudentFieldOfStudy, setEditStudentFieldOfStudy] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    fetchStudents();
  }, [isAdmin, navigate]);

  const fetchStudents = async () => {
    try {
      const profilesRef = collection(db, 'profiles');
      const profilesQuery = query(profilesRef, orderBy('created_at', 'desc'));
      const profilesSnap = await getDocs(profilesQuery);

      const studentsData: Profile[] = [];
      
      // Check each profile's role and only include students
      for (const profileDoc of profilesSnap.docs) {
        const profileData = profileDoc.data();
        
        // Skip deleted profiles
        if (profileData.deleted) {
          continue;
        }
        
        const userId = profileData.user_id || profileDoc.id;
        
        // Check the user's role in user_roles collection
        try {
          const roleRef = doc(db, 'user_roles', userId);
          const roleSnap = await getDoc(roleRef);
          
          // Only include if role is 'student' or doesn't exist (defaults to student)
          const userRole = roleSnap.exists() ? roleSnap.data()?.role : 'student';
          
          // Skip if user role is marked as deleted
          if (roleSnap.exists() && roleSnap.data()?.deleted) {
            continue;
          }
          
          if (userRole === 'student') {
            studentsData.push({
              id: profileDoc.id,
              ...profileData,
            } as Profile);
          }
        } catch (roleError) {
          // If there's an error checking role, skip this user
          console.warn(`Error checking role for user ${userId}:`, roleError);
        }
      }

      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };


  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentEmail || !studentPassword || !studentName) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (studentPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (!user || !user.email) {
      toast.error('Admin session expired. Please sign in again.');
      navigate('/auth');
      return;
    }

    // If admin password is not shown, show it and return (two-step process)
    if (!showAdminPassword) {
      setShowAdminPassword(true);
      return;
    }

    // If admin password field is shown but empty, require it
    if (!adminPassword) {
      toast.error('Please enter your admin password to restore your session');
      return;
    }

    setCreatingStudent(true);

    try {
      const adminEmail = user.email;

      // Use the createStudent function from useAuth hook
      // This will create the student and sign them in (signing out admin)
      const { error } = await createStudentAccount(
        studentEmail,
        studentPassword,
        studentName,
        studentGradeLevel || undefined,
        studentFieldOfStudy || undefined
      );

      if (error) {
        if (error.message.includes('email-already-in-use') || error.message.includes('email already in use')) {
          toast.error('This email is already registered');
        } else if (error.message.includes('invalid-email') || error.message.includes('invalid email')) {
          toast.error('Invalid email address');
        } else if (error.message.includes('weak-password') || error.message.includes('weak password')) {
          toast.error('Password is too weak');
        } else {
          toast.error(`Failed to create student: ${error.message}`);
        }
        return;
      }

      // Sign admin back in using stored credentials
      const signInError = await signIn(adminEmail, adminPassword);
      if (signInError.error) {
        toast.error('Student created, but failed to restore admin session. Please sign in manually.');
        navigate('/auth');
        return;
      }

      // Reset form
      setStudentEmail('');
      setStudentPassword('');
      setStudentName('');
      setStudentGradeLevel('');
      setStudentFieldOfStudy('');
      setAdminPassword('');
      setShowAdminPassword(false);
      setCreateStudentDialogOpen(false);

      // Show success message
      toast.success('Student account created successfully!');

      // Refresh students list
      await fetchStudents();
      
    } catch (error: any) {
      console.error('Error creating student:', error);
      toast.error(`Failed to create student: ${error.message}`);
    } finally {
      setCreatingStudent(false);
    }
  };

  const handleEditStudent = (student: Profile) => {
    setSelectedStudentForEdit(student);
    setEditStudentName(student.full_name || '');
    setEditStudentEmail(student.email || '');
    setEditStudentGradeLevel(student.grade_level || '');
    setEditStudentFieldOfStudy(student.field_of_study || '');
    setEditStudentDialogOpen(true);
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForEdit || !editStudentName || !editStudentEmail) {
      toast.error('Please fill in all required fields');
      return;
    }

    setEditingStudent(true);

    try {
      // Update profile in Firestore
      const profileRef = doc(db, 'profiles', selectedStudentForEdit.id);
      await updateDoc(profileRef, {
        full_name: editStudentName,
        email: editStudentEmail,
        grade_level: editStudentGradeLevel || null,
        field_of_study: editStudentFieldOfStudy || null,
        updated_at: serverTimestamp(),
      });

      // Update Firebase Auth display name if possible
      // Note: We can't directly update another user's auth data from client SDK
      // This would require Firebase Admin SDK. For now, we just update Firestore.

      toast.success('Student updated successfully!');
      setEditStudentDialogOpen(false);
      setSelectedStudentForEdit(null);
      await fetchStudents(); // Refresh students list
    } catch (error: any) {
      console.error('Error updating student:', error);
      toast.error(`Failed to update student: ${error.message}`);
    } finally {
      setEditingStudent(false);
    }
  };

  const handleDeleteStudent = async (studentId: string, userId: string) => {
    if (!confirm('Are you sure you want to delete this student account? This action cannot be undone.')) {
      return;
    }

    setDeletingStudentId(studentId);

    try {
      // Note: Deleting Firebase Auth users requires Admin SDK
      // For now, we'll just delete the profile and role documents
      // The auth account will remain but won't be accessible through the app
      
      // Delete profile
      const profileRef = doc(db, 'profiles', studentId);
      await updateDoc(profileRef, {
        // Mark as deleted rather than actually deleting
        deleted: true,
        updated_at: serverTimestamp(),
      });

      // Optionally delete role
      try {
        const roleRef = doc(db, 'user_roles', userId);
        await updateDoc(roleRef, {
          deleted: true,
        });
      } catch (error) {
        // Role might not exist, that's okay
      }

      toast.success('Student account deleted successfully!');
      await fetchStudents(); // Refresh students list
    } catch (error: any) {
      console.error('Error deleting student:', error);
      toast.error(`Failed to delete student: ${error.message}`);
    } finally {
      setDeletingStudentId(null);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Manage Student Accounts 👩‍🎓</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage student accounts
            </p>
          </div>
          <Button
            onClick={() => setCreateStudentDialogOpen(true)}
            className="gradient-primary gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Create Student
          </Button>
        </div>

        {/* Students Grid */}
        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student, index) => (
              <Card
                key={student.id}
                className="dashboard-card"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">
                        {student.full_name || 'Unnamed Student'}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {student.grade_level && (
                          <Badge variant="secondary">
                            {student.grade_level}
                          </Badge>
                        )}
                        {student.field_of_study && (
                          <Badge variant="outline">
                            {student.field_of_study}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditStudent(student)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteStudent(student.id, student.user_id)}
                      disabled={deletingStudentId === student.id}
                      className="flex-1 text-destructive hover:text-destructive"
                    >
                      {deletingStudentId === student.id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 mr-2" />
                      )}
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="dashboard-card">
            <CardContent className="py-16 text-center">
              <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Students Yet</h3>
              <p className="text-muted-foreground">
                Click "Create Student" to add your first student account
              </p>
            </CardContent>
          </Card>
        )}

        {/* Create Student Dialog */}
        <Dialog open={createStudentDialogOpen} onOpenChange={setCreateStudentDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Create New Student Account
              </DialogTitle>
              <DialogDescription>
                Create a new student account. The student will be able to sign in with the email and password you provide.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-name">Full Name *</Label>
                <Input
                  id="student-name"
                  type="text"
                  placeholder="John Doe"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="input-focus"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-email">Email *</Label>
                <Input
                  id="student-email"
                  type="email"
                  placeholder="student@school.edu"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="input-focus"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-password">Password *</Label>
                <Input
                  id="student-password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  className="input-focus"
                  required
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 6 characters long
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-grade">Grade Level</Label>
                <Select value={studentGradeLevel} onValueChange={setStudentGradeLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade level (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bac + 1">Bac + 1</SelectItem>
                    <SelectItem value="Bac + 2">Bac + 2</SelectItem>
                    <SelectItem value="Bachelor's degree">Bachelor's degree</SelectItem>
                    <SelectItem value="Master's degree">Master's degree</SelectItem>
                    <SelectItem value="Doctorat d'Etat">Doctorat d'Etat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-field">Field of Study</Label>
                <Input
                  id="student-field"
                  type="text"
                  placeholder="e.g., Computer Science, Business, Engineering"
                  value={studentFieldOfStudy}
                  onChange={(e) => setStudentFieldOfStudy(e.target.value)}
                  className="input-focus"
                />
              </div>

              {showAdminPassword && (
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Your Admin Password *</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter your admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="input-focus"
                    required={showAdminPassword}
                  />
                  <p className="text-xs text-muted-foreground">
                    Required to restore your admin session after creating the student
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCreateStudentDialogOpen(false);
                    setStudentEmail('');
                    setStudentPassword('');
                    setStudentName('');
                    setStudentGradeLevel('');
                    setStudentFieldOfStudy('');
                    setAdminPassword('');
                    setShowAdminPassword(false);
                  }}
                  className="flex-1"
                  disabled={creatingStudent}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 gradient-primary" disabled={creatingStudent}>
                  {creatingStudent ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : showAdminPassword ? (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Student & Restore Session
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Continue
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Student Dialog */}
        <Dialog open={editStudentDialogOpen} onOpenChange={setEditStudentDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Edit Student Account
              </DialogTitle>
              <DialogDescription>
                Update student information
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleUpdateStudent} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-student-name">Full Name *</Label>
                <Input
                  id="edit-student-name"
                  type="text"
                  placeholder="John Doe"
                  value={editStudentName}
                  onChange={(e) => setEditStudentName(e.target.value)}
                  className="input-focus"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-student-email">Email *</Label>
                <Input
                  id="edit-student-email"
                  type="email"
                  placeholder="student@school.edu"
                  value={editStudentEmail}
                  onChange={(e) => setEditStudentEmail(e.target.value)}
                  className="input-focus"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Note: Changing email here only updates the profile. The Firebase Auth email cannot be changed from the client.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-student-grade">Grade Level</Label>
                <Select value={editStudentGradeLevel} onValueChange={setEditStudentGradeLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade level (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Bac + 1">Bac + 1</SelectItem>
                    <SelectItem value="Bac + 2">Bac + 2</SelectItem>
                    <SelectItem value="Bachelor's degree">Bachelor's degree</SelectItem>
                    <SelectItem value="Master's degree">Master's degree</SelectItem>
                    <SelectItem value="Doctorat d'Etat">Doctorat d'Etat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-student-field">Field of Study</Label>
                <Input
                  id="edit-student-field"
                  type="text"
                  placeholder="e.g., Computer Science, Business, Engineering"
                  value={editStudentFieldOfStudy}
                  onChange={(e) => setEditStudentFieldOfStudy(e.target.value)}
                  className="input-focus"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditStudentDialogOpen(false);
                    setSelectedStudentForEdit(null);
                    setEditStudentName('');
                    setEditStudentEmail('');
                    setEditStudentGradeLevel('');
                    setEditStudentFieldOfStudy('');
                  }}
                  className="flex-1"
                  disabled={editingStudent}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 gradient-primary" disabled={editingStudent}>
                  {editingStudent ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Update Student
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
