import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/integrations/firebase/config';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Grade {
  id: string;
  subject: string;
  grade: number;
  term: string;
}

export default function Analytics() {
  const { user, isAdmin } = useAuth();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      if (!user) return;

      try {
        const gradesRef = collection(db, 'grades');
        let gradesQuery;

        if (isAdmin) {
          // Admin: fetch all grades
          gradesQuery = query(gradesRef, orderBy('created_at', 'desc'));
        } else {
          // Student: fetch only their grades
          gradesQuery = query(
            gradesRef,
            where('student_id', '==', user.id),
            orderBy('created_at', 'desc')
          );
        }

        const gradesSnap = await getDocs(gradesQuery);
        const gradesData: Grade[] = [];

        gradesSnap.forEach((doc) => {
          gradesData.push({
            id: doc.id,
            ...doc.data(),
          } as Grade);
        });

        setGrades(gradesData);
      } catch (error) {
        console.error('Error fetching grades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [user, isAdmin]);

  // Chart configurations
  const chartColors = {
    primary: 'hsl(221, 83%, 53%)',
    primaryLight: 'hsla(221, 83%, 53%, 0.2)',
    secondary: 'hsl(174, 62%, 47%)',
    secondaryLight: 'hsla(174, 62%, 47%, 0.2)',
    accent: 'hsl(38, 92%, 50%)',
    success: 'hsl(142, 71%, 45%)',
    destructive: 'hsl(0, 84%, 60%)',
  };

  // Group grades by subject for bar chart
  const subjectGrades = grades.reduce((acc, grade) => {
    if (!acc[grade.subject]) {
      acc[grade.subject] = [];
    }
    acc[grade.subject].push(Number(grade.grade));
    return acc;
  }, {} as Record<string, number[]>);

  const subjectAverages = Object.entries(subjectGrades).map(([subject, grades]) => ({
    subject,
    average: grades.reduce((sum, g) => sum + g, 0) / grades.length,
  }));

  const barChartData = {
    labels: subjectAverages.map((s) => s.subject),
    datasets: [
      {
        label: 'Average Grade',
        data: subjectAverages.map((s) => s.average),
        backgroundColor: chartColors.primary,
        borderColor: chartColors.primary,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Line chart for grade trend
  const lineChartData = {
    labels: grades.map((_, i) => `Grade ${i + 1}`),
    datasets: [
      {
        label: 'Grade Trend',
        data: grades.map((g) => Number(g.grade)),
        borderColor: chartColors.primary,
        backgroundColor: chartColors.primaryLight,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColors.primary,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Doughnut chart for grade distribution
  const gradeDistribution = {
    A: grades.filter((g) => Number(g.grade) >= 90).length,
    B: grades.filter((g) => Number(g.grade) >= 80 && Number(g.grade) < 90).length,
    C: grades.filter((g) => Number(g.grade) >= 70 && Number(g.grade) < 80).length,
    D: grades.filter((g) => Number(g.grade) >= 60 && Number(g.grade) < 70).length,
    F: grades.filter((g) => Number(g.grade) < 60).length,
  };

  const doughnutChartData = {
    labels: ['A (90-100)', 'B (80-89)', 'C (70-79)', 'D (60-69)', 'F (< 60)'],
    datasets: [
      {
        data: Object.values(gradeDistribution),
        backgroundColor: [
          chartColors.success,
          chartColors.primary,
          chartColors.secondary,
          chartColors.accent,
          chartColors.destructive,
        ],
        borderWidth: 0,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    cutout: '60%',
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-muted rounded-xl" />
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
            {isAdmin ? 'School Analytics' : 'My Analytics'} 📊
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAdmin
              ? 'View comprehensive school performance data'
              : 'Visualize your academic performance over time'}
          </p>
        </div>

        {grades.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="font-display">Grades by Subject</CardTitle>
                <CardDescription>Average performance across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={barChartData} options={barChartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Line Chart */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="font-display">Grade Trend</CardTitle>
                <CardDescription>Your performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Line data={lineChartData} options={lineChartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Doughnut Chart */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="font-display">Grade Distribution</CardTitle>
                <CardDescription>Breakdown of your grades by letter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="font-display">Performance Summary</CardTitle>
                <CardDescription>Key statistics at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-xl text-center">
                    <p className="text-3xl font-bold font-display text-primary">
                      {grades.length > 0
                        ? (
                            grades.reduce((sum, g) => sum + Number(g.grade), 0) / grades.length
                          ).toFixed(1)
                        : 0}
                      %
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Average Grade</p>
                  </div>
                  <div className="p-4 bg-success/5 rounded-xl text-center">
                    <p className="text-3xl font-bold font-display text-success">
                      {grades.length > 0 ? Math.max(...grades.map((g) => Number(g.grade))) : 0}%
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Highest Grade</p>
                  </div>
                  <div className="p-4 bg-secondary/5 rounded-xl text-center">
                    <p className="text-3xl font-bold font-display text-secondary">
                      {grades.length}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Total Grades</p>
                  </div>
                  <div className="p-4 bg-accent/5 rounded-xl text-center">
                    <p className="text-3xl font-bold font-display text-accent">
                      {Object.keys(subjectGrades).length}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Subjects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="dashboard-card">
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <span className="text-4xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {isAdmin
                  ? 'No grades have been recorded yet. Add student grades to see analytics.'
                  : 'Your grades will appear here once they are added to the system.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
