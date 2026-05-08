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
import { collection, getDocs, query, where, addDoc, serverTimestamp, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Plus, BookOpen, GraduationCap, Loader2, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  grade_level: string | null;
  field_of_study: string | null;
}

interface Grade {
  id: string;
  student_id: string;
  subject: string;
  grade: number;
  term: string;
  created_at?: any;
  student_name?: string;
}

export default function AdminGrades() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Profile[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingGrade, setAddingGrade] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletingGradeId, setDeletingGradeId] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState(false);
  const [selectedGradeForEdit, setSelectedGradeForEdit] = useState<Grade | null>(null);

  // Grade form state
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [semester, setSemester] = useState(() => {
    const currentYear = new Date().getFullYear();
    return `Semester 1 (${currentYear})`;
  });

  // Edit grade form state
  const [editSubject, setEditSubject] = useState('');
  const [editGrade, setEditGrade] = useState('');
  const [editSemester, setEditSemester] = useState('');

  // Add state for selected student filter
  const [selectedStudentFilter, setSelectedStudentFilter] = useState('');

  // Update semester options dynamically
  const semesterOptions = [
    `Semester 1 (${new Date().getFullYear()})`,
    `Semester 2 (${new Date().getFullYear()})`,
  ];

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, [isAdmin, navigate]);

  const fetchData = async () => {
    try {
      // Fetch students first
      const profilesRef = collection(db, 'profiles');
      const profilesQuery = query(profilesRef);
      const profilesSnap = await getDocs(profilesQuery);

      const studentsData: Profile[] = [];
      for (const profileDoc of profilesSnap.docs) {
        const profileData = profileDoc.data();
        const userId = profileData.user_id || profileDoc.id;
        
        try {
          const roleRef = doc(db, 'user_roles', userId);
          const roleSnap = await getDoc(roleRef);
          const userRole = roleSnap.exists() ? roleSnap.data()?.role : 'student';
          
          if (userRole === 'student') {
            studentsData.push({
              id: profileDoc.id,
              ...profileData,
            } as Profile);
          }
        } catch (error) {
          // If role check fails, assume student
          studentsData.push({
            id: profileDoc.id,
            ...profileData,
          } as Profile);
        }
      }

      setStudents(studentsData);

      // Fetch all grades
      const gradesRef = collection(db, 'grades');
      const gradesSnap = await getDocs(gradesRef);

      const gradesData: Grade[] = [];
      gradesSnap.forEach((doc) => {
        const gradeData = doc.data();
        // Find student name from the studentsData we just fetched
        const student = studentsData.find(s => s.user_id === gradeData.student_id);
        gradesData.push({
          id: doc.id,
          ...gradeData,
          student_name: student?.full_name || student?.email || 'Unknown Student',
        } as Grade);
      });

      // Sort by created_at in descending order (newest first)
      gradesData.sort((a, b) => {
        const aDate = a.created_at?.toMillis?.() || (typeof a.created_at === 'string' ? new Date(a.created_at).getTime() : 0);
        const bDate = b.created_at?.toMillis?.() || (typeof b.created_at === 'string' ? new Date(b.created_at).getTime() : 0);
        return bDate - aDate;
      });

      setGrades(gradesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || !subject || !grade) {
      toast.error('Please fill in all fields');
      return;
    }

    const gradeNum = parseFloat(grade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      toast.error('Grade must be between 0 and 100');
      return;
    }

    setAddingGrade(true);

    try {
      const gradesRef = collection(db, 'grades');
      await addDoc(gradesRef, {
        student_id: selectedStudentId,
        subject,
        grade: gradeNum,
        term: semester,
        created_at: serverTimestamp(),
      });

      toast.success('Grade added successfully!');
      setSubject('');
      setGrade('');
      setSelectedStudentId('');
      setDialogOpen(false);
      await fetchData(); // Refresh grades list
    } catch (error) {
      console.error('Error adding grade:', error);
      toast.error('Failed to add grade');
    } finally {
      setAddingGrade(false);
    }
  };

  const handleEditGrade = (gradeItem: Grade) => {
    setSelectedGradeForEdit(gradeItem);
    setEditSubject(gradeItem.subject);
    setEditGrade(gradeItem.grade.toString());
    setEditSemester(gradeItem.term);
    setEditDialogOpen(true);
  };

  const handleUpdateGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGradeForEdit || !editSubject || !editGrade) {
      toast.error('Please fill in all fields');
      return;
    }

    const gradeNum = parseFloat(editGrade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      toast.error('Grade must be between 0 and 100');
      return;
    }

    setEditingGrade(true);

    try {
      const gradeRef = doc(db, 'grades', selectedGradeForEdit.id);
      await updateDoc(gradeRef, {
        subject: editSubject,
        grade: gradeNum,
        term: editSemester,
        updated_at: serverTimestamp(),
      });

      toast.success('Grade updated successfully!');
      setEditDialogOpen(false);
      setSelectedGradeForEdit(null);
      await fetchData(); // Refresh grades list
    } catch (error) {
      console.error('Error updating grade:', error);
      toast.error('Failed to update grade');
    } finally {
      setEditingGrade(false);
    }
  };

  const handleDeleteGrade = async (gradeId: string) => {
    if (!confirm('Are you sure you want to delete this grade?')) {
      return;
    }

    setDeletingGradeId(gradeId);

    try {
      const gradeRef = doc(db, 'grades', gradeId);
      await deleteDoc(gradeRef);
      toast.success('Grade deleted successfully!');
      await fetchData(); // Refresh grades list
    } catch (error) {
      console.error('Error deleting grade:', error);
      toast.error('Failed to delete grade');
    } finally {
      setDeletingGradeId(null);
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'bg-success text-success-foreground';
    if (grade >= 80) return 'bg-primary text-primary-foreground';
    if (grade >= 70) return 'bg-accent text-accent-foreground';
    return 'bg-destructive text-destructive-foreground';
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-96 bg-muted rounded-xl" />
        </div>
      </DashboardLayout>
    );
  }

  // Filter grades based on selected student
  const filteredGrades = selectedStudentFilter
    ? grades.filter((grade) => grade.student_id === selectedStudentFilter)
    : grades;

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Manage Grades 📝</h1>
            <p className="text-muted-foreground mt-1">
              Add and manage student grades
            </p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="gradient-primary gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Grade
          </Button>
        </div>

        {/* Student Selector */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {/* <Label htmlFor="student-filter">Select Student</Label> */}
            <Select
              value={selectedStudentFilter}
              onValueChange={setSelectedStudentFilter}
              id="student-filter"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Student" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Select Student</SelectItem>
                {students.map((student) => (
                  <SelectItem key={student.user_id} value={student.user_id}>
                    {student.full_name || student.email || 'Unknown Student'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grades Table */}
        {filteredGrades.length > 0 ? (
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="font-display">All Student Grades</CardTitle>
              <CardDescription>View and manage grades for all students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="table-header px-4 py-3 text-left">Student</th>
                      <th className="table-header px-4 py-3 text-left">Subject</th>
                      <th className="table-header px-4 py-3 text-left">Semester</th>
                      <th className="table-header px-4 py-3 text-right">Grade</th>
                      <th className="table-header px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGrades.map((gradeItem, index) => {
                      const student = students.find((s) => s.user_id === gradeItem.student_id);
                      const studentName = student?.full_name || student?.email || 'Unknown Student';

                      return (
                        <tr
                          key={gradeItem.id}
                          className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-4 py-4 font-medium">{studentName}</td>
                          <td className="px-4 py-4">{gradeItem.subject}</td>
                          <td className="px-4 py-4 text-muted-foreground">{gradeItem.term}</td>
                          <td className="px-4 py-4 text-right">
                            <Badge className={getGradeColor(Number(gradeItem.grade))}>
                              {gradeItem.grade}%
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditGrade(gradeItem)}
                                className="text-primary hover:text-primary"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteGrade(gradeItem.id)}
                                disabled={deletingGradeId === gradeItem.id}
                                className="text-destructive hover:text-destructive"
                              >
                                {deletingGradeId === gradeItem.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="dashboard-card">
            <CardContent className="py-16 text-center">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Grades Yet</h3>
              <p className="text-muted-foreground mb-4">
                Click "Add Grade" to add your first grade
              </p>
              <Button onClick={() => setDialogOpen(true)} className="gradient-primary gap-2">
                <Plus className="w-4 h-4" />
                Add Grade
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Add Grade Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Grade
              </DialogTitle>
              <DialogDescription>
                Add a grade for a student
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddGrade} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-select">Student *</Label>
                <Select value={selectedStudentId} onValueChange={setSelectedStudentId} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.user_id || "unknown"}>
                        {student.full_name || student.email || 'Unknown Student'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="input-focus"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade (%) *</Label>
                <Input
                  id="grade"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0-100"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="input-focus"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester">Semester *</Label>
                <Select value={semester} onValueChange={setSemester} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesterOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    setSubject('');
                    setGrade('');
                    setSelectedStudentId('');
                    setSemester(`Semester 1 (${new Date().getFullYear()})`);
                  }}
                  className="flex-1"
                  disabled={addingGrade}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 gradient-primary" disabled={addingGrade}>
                  {addingGrade ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Grade
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Grade Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Edit Grade
              </DialogTitle>
              <DialogDescription>
                Update the grade information
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleUpdateGrade} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-student">Student</Label>
                <Input
                  id="edit-student"
                  value={selectedGradeForEdit?.student_name || 'Unknown Student'}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-subject">Subject *</Label>
                <Input
                  id="edit-subject"
                  placeholder="e.g., Mathematics"
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value)}
                  className="input-focus"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-grade">Grade (%) *</Label>
                <Input
                  id="edit-grade"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0-100"
                  value={editGrade}
                  onChange={(e) => setEditGrade(e.target.value)}
                  className="input-focus"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-semester">Semester *</Label>
                <Select value={editSemester} onValueChange={setEditSemester} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesterOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditDialogOpen(false);
                    setSelectedGradeForEdit(null);
                    setEditSubject('');
                    setEditGrade('');
                    setEditSemester('');
                  }}
                  className="flex-1"
                  disabled={editingGrade}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 gradient-primary" disabled={editingGrade}>
                  {editingGrade ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Update Grade
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

