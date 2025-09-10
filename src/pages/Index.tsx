import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JobMatchingDashboard from "@/components/JobMatchingDashboard";
import CVUploadSection from "@/components/CVUploadSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <JobMatchingDashboard />
        <CVUploadSection />
      </main>
    </div>
  );
};

export default Index;
