import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Settings, Database, Users, Shield } from 'lucide-react';

export default function AdminSettings() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);

  const settingCards = [
    {
      title: 'School Settings',
      description: 'Configure school name, logo, and contact information',
      icon: Settings,
      color: 'bg-primary/10 text-primary',
    },
    {
      title: 'Database Management',
      description: 'Manage student records and academic data',
      icon: Database,
      color: 'bg-secondary/10 text-secondary',
    },
    {
      title: 'User Management',
      description: 'Manage admin accounts and permissions',
      icon: Users,
      color: 'bg-accent/10 text-accent',
    },
    {
      title: 'Security Settings',
      description: 'Configure authentication and access controls',
      icon: Shield,
      color: 'bg-success/10 text-success',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold">Admin Settings ⚙️</h1>
          <p className="text-muted-foreground mt-1">
            Configure your school portal settings and preferences
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingCards.map((setting, index) => (
            <Card
              key={setting.title}
              className="dashboard-card cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${setting.color} flex items-center justify-center`}>
                    <setting.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="font-display">{setting.title}</CardTitle>
                    <CardDescription>{setting.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click to configure {setting.title.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="dashboard-card border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Pro Tip</h3>
                <p className="text-sm text-muted-foreground">
                  You can manage student grades from the "Manage Students" page. Click on any
                  student card to view their details and add new grades.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
