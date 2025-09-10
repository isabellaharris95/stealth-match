import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  Users, 
  Shield, 
  TrendingUp, 
  MapPin, 
  Clock,
  DollarSign,
  Eye,
  Heart
} from "lucide-react";

const JobMatchingDashboard = () => {
  const jobListings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120K - $160K",
      posted: "2 days ago",
      matches: 23,
      skills: ["React", "TypeScript", "GraphQL"]
    },
    {
      id: 2,
      title: "DevOps Engineer",
      company: "CloudScale",
      location: "Remote",
      type: "Full-time", 
      salary: "$100K - $140K",
      posted: "1 day ago",
      matches: 15,
      skills: ["AWS", "Docker", "Kubernetes"]
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "New York, NY",
      type: "Full-time",
      salary: "$130K - $180K", 
      posted: "3 days ago",
      matches: 31,
      skills: ["Strategy", "Analytics", "Agile"]
    }
  ];

  const stats = [
    { label: "Active Jobs", value: "247", icon: Briefcase, color: "text-primary" },
    { label: "Encrypted CVs", value: "1,429", icon: Shield, color: "text-success" },
    { label: "Matches Made", value: "89", icon: Users, color: "text-wallet" },
    { label: "Success Rate", value: "94%", icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Dashboard Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Job Matching Dashboard</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time insights into your confidential recruitment pipeline
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Jobs */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Briefcase className="h-6 w-6 mr-2 text-primary" />
              Active Job Listings
            </h3>
            <div className="space-y-4">
              {jobListings.map((job) => (
                <Card key={job.id} className="bg-gradient-card border-0 shadow-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{job.title}</h4>
                        <p className="text-muted-foreground mb-2">{job.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.posted}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        {job.matches} matches
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Match Score: <span className="font-semibold text-success">92%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Privacy & Analytics */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-success" />
              Privacy Analytics
            </h3>
            
            <div className="space-y-6">
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-success" />
                    Encryption Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>CVs Encrypted</span>
                        <span className="font-semibold">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>FHE Computations</span>
                        <span className="font-semibold">1,247</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Zero-Knowledge Matches</span>
                        <span className="font-semibold">89</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="h-2 w-2 bg-success rounded-full" />
                      <span>New encrypted CV uploaded</span>
                      <span className="text-muted-foreground ml-auto">2m ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      <span>Job match found (92% compatibility)</span>
                      <span className="text-muted-foreground ml-auto">15m ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="h-2 w-2 bg-wallet rounded-full" />
                      <span>Interview scheduled via encrypted channel</span>
                      <span className="text-muted-foreground ml-auto">1h ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobMatchingDashboard;