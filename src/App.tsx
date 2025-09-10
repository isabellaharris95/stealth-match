import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { WalletProvider } from "@/components/WalletProvider";
import Index from "./pages/Index";
import PostJob from "./pages/PostJob";
import FindCandidates from "./pages/FindCandidates";
import NotFound from "./pages/NotFound";

const App = () => (
  <WalletProvider>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/find-candidates" element={<FindCandidates />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </WalletProvider>
);

export default App;
