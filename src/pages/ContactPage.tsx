import { GitHubHeader } from "@/components/GitHubHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Github, Linkedin, Twitter, Mail, MapPin, Calendar, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-background">
      <GitHubHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📞</span>
            <h1 className="text-2xl font-bold">Contact & Social</h1>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="border border-border rounded-md bg-background">
            <div className="bg-muted/30 px-4 py-3 border-b border-border">
              <span className="font-mono text-sm text-foreground">contact/info.md</span>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:john.doe@example.com" className="text-primary hover:underline">
                      john.doe@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Availability</p>
                    <p className="text-muted-foreground">Open to opportunities</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Social Links</h3>
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href="https://github.com/johndoe" 
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  
                  <a 
                    href="https://linkedin.com/in/johndoe" 
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  
                  <a 
                    href="https://twitter.com/johndoe" 
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    <span>Twitter</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  
                  <a 
                    href="mailto:john.doe@example.com" 
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="border border-border rounded-md bg-background">
            <div className="bg-muted/30 px-4 py-3 border-b border-border">
              <span className="font-mono text-sm text-foreground">contact/form.tsx</span>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Project collaboration" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Hi John, I'd like to discuss..."
                    rows={6}
                    required 
                  />
                </div>
                
                <Button type="submit" className="github-button-primary w-full">
                  Send Message
                </Button>
              </form>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-md">
                <p className="text-sm text-muted-foreground">
                  <strong>Response Time:</strong> I typically respond within 24 hours during business days.
                  For urgent matters, feel free to reach out via email directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}