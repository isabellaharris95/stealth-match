import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Filter, Users, MapPin, Briefcase, GraduationCap, Shield, Eye, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useStealthMatch } from "@/hooks/useContract";
import { useAccount } from "wagmi";
import Header from "@/components/Header";

interface Candidate {
  id: string;
  encryptedId: string;
  matchScore: number;
  location: string;
  experience: string;
  skills: string[];
  education: string;
  currentRole: string;
  availability: string;
  salaryExpectation: string;
  isVerified: boolean;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    encryptedId: "FHE_CANDIDATE_X7K2M",
    matchScore: 95,
    location: "San Francisco, CA",
    experience: "5+ years",
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
    education: "Masters in Computer Science",
    currentRole: "Senior Frontend Developer",
    availability: "Available in 2 weeks",
    salaryExpectation: "$150k - $180k",
    isVerified: true,
  },
  {
    id: "2", 
    encryptedId: "FHE_CANDIDATE_P9L4N",
    matchScore: 89,
    location: "New York, NY",
    experience: "7+ years",
    skills: ["Python", "Machine Learning", "TensorFlow", "Docker", "Kubernetes"],
    education: "PhD in Artificial Intelligence",
    currentRole: "ML Engineering Lead",
    availability: "Available immediately",
    salaryExpectation: "$180k - $220k",
    isVerified: true,
  },
  {
    id: "3",
    encryptedId: "FHE_CANDIDATE_R5T8Q",
    matchScore: 82,
    location: "Austin, TX",
    experience: "3+ years",
    skills: ["Go", "Microservices", "PostgreSQL", "Redis", "GraphQL"],
    education: "Bachelors in Software Engineering",
    currentRole: "Backend Developer",
    availability: "Available in 1 month",
    salaryExpectation: "$120k - $140k",
    isVerified: false,
  },
  {
    id: "4",
    encryptedId: "FHE_CANDIDATE_M3C6V",
    matchScore: 78,
    location: "Remote",
    experience: "4+ years",
    skills: ["Vue.js", "Laravel", "MySQL", "Docker", "AWS"],
    education: "Bachelors in Computer Science",
    currentRole: "Full Stack Developer",
    availability: "Available in 3 weeks",
    salaryExpectation: "$110k - $130k",
    isVerified: true,
  },
];

const FindCandidates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [candidates, setCandidates] = useState(mockCandidates);
  const { toast } = useToast();

  const handleViewProfile = (candidateId: string) => {
    toast({
      title: "Profile Access Request",
      description: "Encrypted profile request sent. Candidate will be notified and can choose to share details.",
    });
  };

  const handleDownloadCV = (candidateId: string) => {
    toast({
      title: "CV Download Initiated",
      description: "Encrypted CV will be available once candidate approves the request.",
    });
  };

  const handleContact = (candidateId: string) => {
    toast({
      title: "Contact Request Sent",
      description: "Your message has been sent through our encrypted communication channel.",
    });
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = searchTerm === "" || 
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      candidate.currentRole.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === "" || candidate.location.includes(locationFilter);
    const matchesExperience = experienceFilter === "" || candidate.experience === experienceFilter;
    const matchesAvailability = availabilityFilter === "" || candidate.availability.includes(availabilityFilter);

    return matchesSearch && matchesLocation && matchesExperience && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Find Candidates</h1>
          </div>
          <p className="text-muted-foreground">
            Discover talented candidates through our encrypted matching system with full privacy protection
          </p>
        </div>

        {/* Privacy Notice */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-primary mb-2">Privacy-First Candidate Search</h3>
                <p className="text-sm text-muted-foreground">
                  All candidate information is encrypted using FHE technology. Personal details are only revealed 
                  with explicit candidate consent, ensuring complete privacy protection throughout the hiring process.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Search Filters
                </CardTitle>
                <CardDescription>
                  Narrow down your search with encrypted filters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Skills & Keywords</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="React, Python, AWS..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any location</SelectItem>
                      <SelectItem value="San Francisco">San Francisco, CA</SelectItem>
                      <SelectItem value="New York">New York, NY</SelectItem>
                      <SelectItem value="Austin">Austin, TX</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Seattle">Seattle, WA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Experience Level</label>
                  <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any experience</SelectItem>
                      <SelectItem value="1-2 years">1-2 years</SelectItem>
                      <SelectItem value="3+ years">3+ years</SelectItem>
                      <SelectItem value="5+ years">5+ years</SelectItem>
                      <SelectItem value="7+ years">7+ years</SelectItem>
                      <SelectItem value="10+ years">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Availability</label>
                  <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any availability</SelectItem>
                      <SelectItem value="immediately">Available immediately</SelectItem>
                      <SelectItem value="2 weeks">Within 2 weeks</SelectItem>
                      <SelectItem value="1 month">Within 1 month</SelectItem>
                      <SelectItem value="2 months">Within 2 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setLocationFilter("");
                    setExperienceFilter("");
                    setAvailabilityFilter("");
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Candidates List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {filteredCandidates.length} Encrypted Candidates Found
                </h2>
                <p className="text-sm text-muted-foreground">
                  Sorted by match score and availability
                </p>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Shield className="h-3 w-3 mr-1" />
                FHE Protected
              </Badge>
            </div>

            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-white font-bold">
                          {candidate.encryptedId.slice(-2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{candidate.encryptedId}</h3>
                            {candidate.isVerified && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                                <Shield className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground">{candidate.currentRole}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{candidate.matchScore}% Match</span>
                        </div>
                        <Badge variant="outline" className="border-primary/20 text-primary">
                          {candidate.availability}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{candidate.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{candidate.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{candidate.education}</span>
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {candidate.salaryExpectation}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Skills (Encrypted)</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewProfile(candidate.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadCV(candidate.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Request CV
                        </Button>
                      </div>
                      
                      <Button onClick={() => handleContact(candidate.id)}>
                        Contact Candidate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCandidates.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Candidates Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search filters to find more candidates.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setLocationFilter("");
                      setExperienceFilter("");
                      setAvailabilityFilter("");
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindCandidates;