import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Shield, 
  Lock, 
  CheckCircle, 
  FileText, 
  Zap,
  Eye,
  Download
} from "lucide-react";

const CVUploadSection = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsEncrypted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const encryptedCVs = [
    {
      id: 1,
      name: "John_Doe_CV.pdf",
      uploadDate: "2024-01-15",
      matchScore: 94,
      status: "Active",
      views: 12
    },
    {
      id: 2,
      name: "Jane_Smith_Resume.pdf", 
      uploadDate: "2024-01-14",
      matchScore: 87,
      status: "Active",
      views: 8
    },
    {
      id: 3,
      name: "Mike_Johnson_CV.pdf",
      uploadDate: "2024-01-13", 
      matchScore: 91,
      status: "Matched",
      views: 15
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Secure CV Management</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload and manage CVs with military-grade encryption powered by FHE technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Upload className="h-6 w-6 mr-2 text-primary" />
                  Upload New CV
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isEncrypted ? (
                  <>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">Drop your CV here</h3>
                      <p className="text-muted-foreground mb-4">
                        Supports PDF, DOC, DOCX files up to 10MB
                      </p>
                      <Button onClick={handleUpload} disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Choose File"}
                      </Button>
                    </div>

                    {isUploading && (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Encrypting with FHE...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Lock className="h-4 w-4 mr-2" />
                          Your data is being encrypted end-to-end
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 mx-auto mb-4 text-success" />
                    <h3 className="font-semibold text-xl mb-2">CV Successfully Encrypted!</h3>
                    <p className="text-muted-foreground mb-4">
                      Your CV is now protected with Fully Homomorphic Encryption
                    </p>
                    <Button onClick={() => setIsEncrypted(false)} variant="outline">
                      Upload Another CV
                    </Button>
                  </div>
                )}

                {/* Privacy Features */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
                    <Shield className="h-5 w-5 text-success" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">FHE Protection</div>
                      <div className="text-xs text-muted-foreground">Compute on encrypted data</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                    <Zap className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Instant Matching</div>
                      <div className="text-xs text-muted-foreground">Real-time job compatibility</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-wallet/10 rounded-lg">
                    <Lock className="h-5 w-5 text-wallet" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Zero Knowledge</div>
                      <div className="text-xs text-muted-foreground">Never reveal personal data</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Encrypted CVs List */}
          <div>
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <FileText className="h-6 w-6 mr-2 text-success" />
                  Encrypted CVs
                  <Badge className="ml-auto bg-success/10 text-success border-success/20">
                    {encryptedCVs.length} Files
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {encryptedCVs.map((cv) => (
                    <div key={cv.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{cv.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Uploaded: {cv.uploadDate}
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={cv.status === "Matched" ? "default" : "secondary"}
                          className={cv.status === "Matched" ? "bg-success text-success-foreground" : ""}
                        >
                          {cv.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center text-muted-foreground">
                            <Eye className="h-4 w-4 mr-1" />
                            {cv.views} views
                          </span>
                          <span className="font-semibold text-success">
                            {cv.matchScore}% match score
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVUploadSection;