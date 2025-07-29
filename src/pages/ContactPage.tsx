import { ArrowLeft, Calendar, ExternalLink, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { GitHubHeader } from '@/components/GitHubHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

      <div className="container mx-auto px-2 sm:px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to ohmyfork
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📞</span>
            <h1 className="text-2xl font-bold">Contact & Social</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Information */}
          <div className="border border-border rounded-md bg-background">
            <div className="bg-muted/30 px-3 sm:px-4 py-3 border-b border-border">
              <span className="font-mono text-xs sm:text-sm text-foreground">
                contact/info.md
              </span>
            </div>
            <div className="p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Mail_%28iOS%29.svg"
                    alt="Email"
                    className="w-5 h-5 text-muted-foreground"
                  />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:mrshravankumarb@gmail.com"
                      className="text-primary hover:underline"
                    >
                      mrshravankumarb@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Karnataka, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Availability</p>
                    <a
                      href="https://cal.com/zhravan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Open to opportunities
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Social Links</h3>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                  <a
                    href="https://github.com/shravan20"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/256/25/25231.png"
                      alt="GitHub"
                      className="w-5 h-5 rounded bg-white object-contain"
                    />
                    <span>GitHub</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://gitlab.com/zhravan"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png"
                      alt="GitLab"
                      className="w-5 h-5"
                    />
                    <span>GitLab (zhravan)</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://gitlab.com/shravan_20"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png"
                      alt="GitLab"
                      className="w-5 h-5"
                    />
                    <span>GitLab (shravan_20)</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://linkedin.com/in/zhravan"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                      alt="LinkedIn"
                      className="w-5 h-5 rounded"
                    />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://x.com/zhravan"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://images.freeimages.com/image/large-previews/f35/x-twitter-logo-on-black-circle-5694247.png"
                      alt="X"
                      className="w-6 h-6 rounded bg-white border border-gray-300 object-contain"
                      style={{ padding: "2px" }}
                    />
                    <span>X</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="mailto:mrshravankumarb@gmail.com"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Mail_%28iOS%29.svg"
                      alt="Email"
                      className="w-5 h-5 rounded"
                    />
                    <span>Email</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://wiki.ohmyscript.com/"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://cdn.dribbble.com/userupload/27096444/file/original-5e944f1c560b81ee84745815c0f16bb5.jpg?resize=400x0"
                      alt="Digital Garden"
                      className="w-7 h-5 rounded bg-white border border-gray-300 object-contain"
                      style={{ padding: "2px" }}
                    />
                    <span>Digital Garden</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://stackoverflow.com/users/11899809/zhravan"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico"
                      alt="Stack Overflow"
                      className="w-5 h-5 rounded"
                    />
                    <span>Stack Overflow</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://leetcode.com/u/zhravan/"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
                      alt="LeetCode"
                      className="w-5 h-5"
                    />
                    <span>LeetCode</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://www.hackerearth.com/@zhravan/"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e8/HackerEarth_logo.png"
                      alt="HackerEarth"
                      className="w-7 h-5 rounded bg-white border border-gray-300 object-contain"
                      style={{ padding: "2px" }}
                    />
                    <span>HackerEarth</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  {/* Duplicate removed: Only one Hackerearth link with SVG logo retained for clarity */}
                  <a
                    href="https://www.hackerrank.com/profile/imshravan"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png"
                      alt="HackerRank"
                      className="w-5 h-5"
                    />
                    <span>HackerRank</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://bsky.app/profile/zhravan.bsky.social"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://bsky.app/static/apple-touch-icon.png"
                      alt="Bluesky"
                      className="w-5 h-5 rounded"
                    />
                    <span>Bluesky</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://www.reddit.com/user/im_skb/"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-180x180.png"
                      alt="Reddit"
                      className="w-5 h-5 rounded"
                    />
                    <span>Reddit</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://www.youtube.com/@ohmycuriosity"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                      alt="YouTube"
                      className="w-8 h-5 rounded bg-white object-contain"
                    />
                    <span>YouTube</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="http://medium.com/@zhravan"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://cdn.freebiesupply.com/images/thumbs/2x/medium-icon-white-on-black.png"
                      alt="Medium"
                      className="w-7 h-5 rounded bg-white border border-gray-300 object-contain"
                      style={{ padding: "2px" }}
                    />
                    <span>Medium</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://dev.to/zhravan"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
                      alt="dev.to"
                      className="w-7 h-5 rounded bg-white border border-gray-300 object-contain"
                      style={{ padding: "2px" }}
                    />
                    <span>dev.to</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://replit.com/@zhravan"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://replit.com/public/icons/favicon-prompt-192.png"
                      alt="Replit"
                      className="w-5 h-5 rounded"
                    />
                    <span>Replit</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://codepen.io/zhravan"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Large.png"
                      alt="CodePen"
                      className="w-5 h-5 rounded bg-white border border-gray-300 object-contain"
                      style={{ padding: "2px" }}
                    />
                    <span>CodePen</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://codesandbox.io/u/zhravan"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://images.seeklogo.com/logo-png/34/1/code-sandbox-logo-png_seeklogo-349463.png"
                      alt="CodeSandbox"
                      className="w-7 h-5 rounded bg-white border border-gray-300 object-contain"
                      style={{ padding: "2px" }}
                    />
                    <span>CodeSandbox</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://discord.com/users/shravan20_"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/discord.svg"
                      alt="Discord"
                      className="w-5 h-5 rounded"
                    />
                    <span>Discord</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://www.twitch.tv/zhravan"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png"
                      alt="Twitch"
                      className="w-5 h-5 rounded"
                    />
                    <span>Twitch</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  <a
                    href="https://mastodon.social/@zhravan"
                    className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors text-primary"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/48/Mastodon_Logotype_%28Simple%29.svg"
                      alt="Mastodon"
                      className="w-7 h-5 rounded bg-white border border-gray-300 object-contain"
                      style={{ padding: "2px" }}
                    />
                    <span>Mastodon</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-border rounded-md bg-background">
            <div className="bg-muted/30 px-3 sm:px-4 py-3 border-b border-border">
              <span className="font-mono text-xs sm:text-sm text-foreground">
                contact/form.tsx
              </span>
            </div>
            <div className="p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-6">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Project collaboration"
                    required
                  />
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
                  <strong>Response Time:</strong> I typically respond within 24
                  hours during business days. For urgent matters, feel free to
                  reach out via email directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
