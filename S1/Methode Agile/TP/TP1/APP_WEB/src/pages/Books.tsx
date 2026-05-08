import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Loader2, Sparkles, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/integrations/firebase/config';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'sonner';

interface Recommendation {
  rank: number;
  title: string;
  price: number | null;
  review_score: number | null;
  review_summary: string | null;
  score: number;
  fallbackPrice?: number;
  fallbackScore?: number;
}

export default function Books() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [modulesFromGrades, setModulesFromGrades] = useState<string[]>([]);
  const [autoFetched, setAutoFetched] = useState(false);
  
  // API URL - update this to your deployed API URL or use localhost for development
  const API_URL = 'http://localhost:8000'; // Change to your API URL

  // Fetch user profile to get field of study
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const profileRef = doc(db, 'profiles', user.id);
        const profileSnap = await getDoc(profileRef);
        
        if (profileSnap.exists()) {
          const profileData = profileSnap.data();
          if (profileData.grade_level) {
            setGradeLevel(profileData.grade_level);
            if (!profileData.field_of_study) {
              setFieldOfStudy(profileData.grade_level);
            }
          }
          if (profileData.field_of_study) {
            setFieldOfStudy(profileData.field_of_study);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, [user]);

  // Fetch grades to build modules list automatically for the logged-in student
  useEffect(() => {
    const fetchGrades = async () => {
      if (!user) return;

      try {
        const gradesRef = collection(db, 'grades');
        const gradesQuery = query(gradesRef, where('student_id', '==', user.id));
        const gradesSnap = await getDocs(gradesQuery);

        const subjects = new Set<string>();
        gradesSnap.forEach((docSnap) => {
          const data = docSnap.data();
          if (typeof data.subject === 'string' && data.subject.trim()) {
            subjects.add(data.subject.trim());
          }
        });

        setModulesFromGrades(Array.from(subjects));
      } catch (error) {
        console.error('Error fetching grades for recommendations:', error);
      }
    };

    fetchGrades();
  }, [user]);

  // Fetch personalized recommendations from MODEL_API
  const fetchRecommendations = async (domain: string, modulesList: string[] = []) => {
    if (!domain.trim()) {
      toast.error('Missing field of study or grade level');
      return;
    }

    setLoadingRecommendations(true);
    
    try {
      const response = await fetch(`${API_URL}/api/v1/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: domain,
          modules: modulesList.length > 0 ? modulesList : [domain],
          limit: 12,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const enriched = (data.recommendations || []).map((rec: Recommendation) => ({
        ...rec,
        fallbackPrice: rec.price ?? Number((10 + Math.random() * 40).toFixed(2)),
        fallbackScore: rec.review_score ?? Number((3 + Math.random() * 2).toFixed(1)),
      }));
      setRecommendations(enriched);
      if (data.count === 0) {
        toast.message('No recommendations yet. Add grades or field of study to improve results.');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Failed to fetch recommendations. Make sure the API is running.');
      setRecommendations([]);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // Auto-fetch when we have domain + modules (no user input required)
  useEffect(() => {
    const domainToUse = (gradeLevel && gradeLevel.trim()) || fieldOfStudy.trim();
    if (!domainToUse || autoFetched === true) return;

    const modulesList = modulesFromGrades.length > 0 ? modulesFromGrades : [domainToUse];
    fetchRecommendations(domainToUse, modulesList).then(() => setAutoFetched(true));
  }, [fieldOfStudy, gradeLevel, modulesFromGrades, autoFetched]);

  const handleRefresh = () => {
    const domainToUse = (gradeLevel && gradeLevel.trim()) || fieldOfStudy.trim();
    if (!domainToUse) {
      toast.error('Missing field of study or grade level');
      return;
    }
    const modulesList = modulesFromGrades.length > 0 ? modulesFromGrades : [domainToUse];
    setAutoFetched(true);
    fetchRecommendations(domainToUse, modulesList);
  };

  const splitTitleAndSummary = (rawTitle: string) => {
    if (!rawTitle) return { title: 'Untitled', summary: '' };
    const parts = rawTitle.split(':');
    const title = (parts.shift() || '').trim() || rawTitle;
    const summary = parts.join(':').trim();
    return { title, summary };
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold">Book Recommendations 📚</h1>
          <p className="text-muted-foreground mt-1">
            Discover educational books to enhance your learning journey
          </p>
        </div>

        

        {/* Books Grid */}
        {loadingRecommendations ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-muted rounded-t-xl" />
                <CardContent className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : recommendations.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Your Personalized Recommendations
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendations.map((rec, index) => (
                <Card
                  key={index}
                  className="dashboard-card overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {(() => {
                    const { title, summary } = splitTitleAndSummary(rec.title);
                    const displaySummary = rec.review_summary || summary || 'A recommended pick for your studies.';
                    return (
                      <>
                        <div className="aspect-[3/4] w-full overflow-hidden">
                          <img
                            src="/cover.png"
                            alt={title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <CardContent className="p-6 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <Badge variant="secondary" className="text-xs">
                              #{rec.rank}
                            </Badge>
                            <Badge 
                              className="text-xs"
                              style={{ 
                                backgroundColor: `rgba(var(--primary-rgb), ${rec.score})`,
                              }}
                            >
                              {(rec.score * 100).toFixed(0)}% match
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="font-semibold text-base leading-snug line-clamp-2">
                              {title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {displaySummary}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-semibold">
                                ${((rec.price ?? rec.fallbackPrice) || 0).toFixed(2)}
                              </span>
                              <span className="flex items-center gap-1 text-yellow-500">
                                <span className="font-semibold text-foreground">
                                  {(rec.review_score ?? rec.fallbackScore ?? 0).toFixed(1)}
                                </span>
                                <span>★</span>
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </>
                    );
                  })()}
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card className="dashboard-card">
            <CardContent className="py-16 text-center space-y-2">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-2" />
              <h3 className="text-lg font-semibold">No recommendations yet</h3>
              <p className="text-muted-foreground">
                We need your grade level/field of study and some recorded grades to personalize books.
              </p>
              <p className="text-muted-foreground text-sm">
                Ask an admin to add your field of study and grades, then refresh.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
