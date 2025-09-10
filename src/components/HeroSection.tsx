import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Users, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20 px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Enterprise-Grade Privacy Protection
          </Badge>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Confidential Job Matching
            <span className="block text-4xl md:text-5xl font-light mt-2 opacity-90">
              with Encrypted CVs
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect talented candidates with top employers while keeping sensitive data encrypted using 
            <strong className="text-white font-semibold"> Fully Homomorphic Encryption (FHE)</strong>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-3 shadow-button">
              <Link to="/post-job">
                <Briefcase className="h-5 w-5 mr-2" />
                Post a Job
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-3">
              <Link to="/find-candidates">
                <Users className="h-5 w-5 mr-2" />
                Find Candidates
              </Link>
            </Button>
          </div>
          
          {/* Privacy Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Lock className="h-8 w-8 mb-4 mx-auto text-white" />
              <h3 className="font-semibold text-lg mb-2">End-to-End Encryption</h3>
              <p className="text-white/70 text-sm">CVs remain encrypted throughout the entire matching process</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Shield className="h-8 w-8 mb-4 mx-auto text-white" />
              <h3 className="font-semibold text-lg mb-2">Zero Knowledge Matching</h3>
              <p className="text-white/70 text-sm">Match candidates without revealing personal information</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Users className="h-8 w-8 mb-4 mx-auto text-white" />
              <h3 className="font-semibold text-lg mb-2">GDPR Compliant</h3>
              <p className="text-white/70 text-sm">Full privacy compliance with global data protection laws</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;