import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { db } from '@/integrations/firebase/config';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { BookOpen, TrendingUp, Award, Clock, Users } from 'lucide-react';

interface Grade {
  id: string;
  subject: string;
  grade: number;
  term: string;
}

interface Profile {
  full_name: string | null;
  email: string | null;
  grade_level: string | null;
  field_of_study: string | null;
}

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Admin statistics
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalGrades, setTotalGrades] = useState(0);
  const [averagePerformance, setAveragePerformance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch profile
        const profileRef = doc(db, 'profiles', user.id);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          const profileData = profileSnap.data();
          setProfile({
            full_name: profileData.full_name || null,
            email: profileData.email || null,
            grade_level: profileData.grade_level || null,
            field_of_study: profileData.field_of_study || null,
          });
        }

        if (isAdmin) {
          // Fetch admin statistics
          // Count students
          const profilesRef = collection(db, 'profiles');
          const profilesSnap = await getDocs(profilesRef);
          
          let studentCount = 0;
          for (const profileDoc of profilesSnap.docs) {
            const profileData = profileDoc.data();
            const userId = profileData.user_id || profileDoc.id;
            
            try {
              const roleRef = doc(db, 'user_roles', userId);
              const roleSnap = await getDoc(roleRef);
              const userRole = roleSnap.exists() ? roleSnap.data()?.role : 'student';
              if (userRole === 'student') {
                studentCount++;
              }
            } catch (error) {
              // If role check fails, assume student
              studentCount++;
            }
          }
          setTotalStudents(studentCount);

          // Fetch all grades for average calculation
          const gradesRef = collection(db, 'grades');
          const gradesSnap = await getDocs(gradesRef);
          
          const allGrades: number[] = [];
          gradesSnap.forEach((doc) => {
            const gradeData = doc.data();
            if (gradeData.grade) {
              allGrades.push(Number(gradeData.grade));
            }
          });

          setTotalGrades(allGrades.length);
          
          if (allGrades.length > 0) {
            const average = allGrades.reduce((sum, g) => sum + g, 0) / allGrades.length;
            setAveragePerformance(Math.round(average));
          } else {
            setAveragePerformance(0);
          }
        } else {
          // Fetch grades for students
          const gradesRef = collection(db, 'grades');
          const gradesQuery = query(
            gradesRef,
            where('student_id', '==', user.id)
          );
          const gradesSnap = await getDocs(gradesQuery);

          const gradesData: Grade[] = [];
          gradesSnap.forEach((doc) => {
            gradesData.push({
              id: doc.id,
              ...doc.data(),
            } as Grade);
          });

          // Sort by created_at in descending order (newest first)
          gradesData.sort((a, b) => {
            const aDate = a.created_at?.toMillis?.() || (typeof a.created_at === 'string' ? new Date(a.created_at).getTime() : 0);
            const bDate = b.created_at?.toMillis?.() || (typeof b.created_at === 'string' ? new Date(b.created_at).getTime() : 0);
            return bDate - aDate;
          });

          setGrades(gradesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isAdmin]);

  const averageGrade = grades.length > 0
    ? (grades.reduce((sum, g) => sum + Number(g.grade), 0) / grades.length).toFixed(1)
    : '0';

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-xl" />
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
        <div>
          <h1 className="text-3xl font-display font-bold">
            Welcome back, {profile?.full_name || 'Student'}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAdmin
              ? 'Here\'s your admin overview'
              : 'Track your academic progress and discover new books'}
          </p>
          {!isAdmin && (profile?.grade_level || profile?.field_of_study) && (
            <div className="flex gap-2 mt-3">
              {profile?.grade_level && (
                <Badge variant="secondary" className="text-sm">
                  {profile.grade_level}
                </Badge>
              )}
              {profile?.field_of_study && (
                <Badge variant="outline" className="text-sm">
                  {profile.field_of_study}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        {!isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Grade</p>
                    <p className="text-3xl font-bold font-display mt-1">{averageGrade}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Subjects</p>
                    <p className="text-3xl font-bold font-display mt-1">{grades.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Top Grade</p>
                    <p className="text-3xl font-bold font-display mt-1">
                      {grades.length > 0 ? Math.max(...grades.map((g) => Number(g.grade))) : 0}%
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Term</p>
                    <p className="text-3xl font-bold font-display mt-1">Fall</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Grades Table */}
        {!isAdmin && (
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="font-display">Your Grades</CardTitle>
              <CardDescription>View your academic performance across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              {grades.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="table-header px-4 py-3 text-left">Subject</th>
                        <th className="table-header px-4 py-3 text-left">Term</th>
                        <th className="table-header px-4 py-3 text-right">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((grade, index) => (
                        <tr
                          key={grade.id}
                          className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-4 py-4 font-medium">{grade.subject}</td>
                          <td className="px-4 py-4 text-muted-foreground">{grade.term}</td>
                          <td className="px-4 py-4 text-right">
                            <Badge className={getGradeColor(Number(grade.grade))}>
                              {grade.grade}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No grades recorded yet.</p>
                  <p className="text-sm">Your grades will appear here once they're added.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Admin View */}
        {isAdmin && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="dashboard-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Students</p>
                      <p className="text-3xl font-bold font-display mt-1">{totalStudents}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Grades</p>
                      <p className="text-3xl font-bold font-display mt-1">{totalGrades}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Performance</p>
                      <p className="text-3xl font-bold font-display mt-1">{averagePerformance}%</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="font-display">Quick Actions</CardTitle>
                <CardDescription>Manage your school portal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/admin/students" className="block">
                    <Card className="dashboard-card hover:border-primary cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Users className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Manage Student Accounts</h3>
                            <p className="text-sm text-muted-foreground">Create and manage student accounts</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link to="/admin/grades" className="block">
                    <Card className="dashboard-card hover:border-primary cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-secondary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Manage Grades</h3>
                            <p className="text-sm text-muted-foreground">Add and manage student grades</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
