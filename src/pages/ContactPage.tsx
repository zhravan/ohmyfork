import { Calendar, ExternalLink, Mail, MapPin } from 'lucide-react';
import * as React from 'react';

import { GitHubHeader } from '@/components/GitHubHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [status, setStatus] = React.useState<'idle'|'submitting'|'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <GitHubHeader />

      <div className="container mx-auto px-2 sm:px-4 py-6">
  <h1 className="sr-only">Contact & Social</h1>

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
                  <Mail className="w-4 h-4 mr-2" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=mrshravankumarb@gmail.com"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
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
                {/* Unified card renderer for consistent spacing & sizing */}
                {(() => {
                  type SocialLink = { name: string; href: string; icon: string };
                  const wrapCls = "w-6 h-6 rounded bg-white border border-border object-contain p-0.5";
                  const Card = ({ item }: { item: SocialLink }) => (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="flex items-center gap-3 p-3 border border-border rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <img src={item.icon} alt="" className={wrapCls} />
                      <span className="text-foreground text-xs flex-1 min-w-0 whitespace-normal break-words">{item.name}</span>
                      <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" aria-hidden="true" />
                    </a>
                  );

                  const developer: SocialLink[] = [
                    { name: 'GitHub', href: 'https://github.com/zhravan', icon: 'https://cdn-icons-png.flaticon.com/256/25/25231.png' },
                    { name: 'GitLab (zhravan)', href: 'https://gitlab.com/zhravan', icon: 'https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png' },
                    { name: 'GitLab (shravan_20)', href: 'https://gitlab.com/shravan_20', icon: 'https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png' },
                    { name: 'Stack Overflow', href: 'https://stackoverflow.com/users/11899809/zhravan', icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico' },
                    { name: 'LeetCode', href: 'https://leetcode.com/u/zhravan/', icon: 'https://leetcode.com/static/images/LeetCode_logo_rvs.png' },
                    { name: 'HackerEarth', href: 'https://www.hackerearth.com/@zhravan/', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/HackerEarth_logo.png' },
                    { name: 'HackerRank', href: 'https://www.hackerrank.com/profile/imshravan', icon: 'https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png' },
                    { name: 'Replit', href: 'https://replit.com/@zhravan', icon: 'https://replit.com/public/icons/favicon-prompt-192.png' },
                    { name: 'CodePen', href: 'https://codepen.io/zhravan', icon: 'https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Large.png' },
                    { name: 'CodeSandbox', href: 'https://codesandbox.io/u/zhravan', icon: 'https://images.seeklogo.com/logo-png/34/1/code-sandbox-logo-png_seeklogo-349463.png' },
                  ];

                  const social: SocialLink[] = [
                    { name: 'LinkedIn', href: 'https://linkedin.com/in/zhravan', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
                    { name: 'X', href: 'https://x.com/zhravan', icon: 'https://images.freeimages.com/image/large-previews/f35/x-twitter-logo-on-black-circle-5694247.png' },
                    { name: 'Bluesky', href: 'https://bsky.app/profile/zhravan.bsky.social', icon: 'https://bsky.app/static/apple-touch-icon.png' },
                    { name: 'Reddit', href: 'https://www.reddit.com/user/im_skb/', icon: 'https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-180x180.png' },
                    { name: 'Discord', href: 'https://discord.com/users/shravan20_', icon: 'https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/discord.svg' },
                    { name: 'Twitch', href: 'https://www.twitch.tv/zhravan', icon: 'https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png' },
                    { name: 'Mastodon', href: 'https://mastodon.social/@zhravan', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Mastodon_Logotype_%28Simple%29.svg' },
                    { name: 'YouTube', href: 'https://www.youtube.com/@ohmycuriosity', icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg' },
                    { name: 'Email', href: 'mailto:mrshravankumarb@gmail.com', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Mail_%28iOS%29.svg' },
                  ];

                  const content: SocialLink[] = [
                    { name: 'Digital Garden', href: 'https://wiki.ohmyscript.com/', icon: 'https://cdn.dribbble.com/userupload/27096444/file/original-5e944f1c560b81ee84745815c0f16bb5.jpg?resize=400x0' },
                    { name: 'Medium', href: 'http://medium.com/@zhravan', icon: 'https://cdn.freebiesupply.com/images/thumbs/2x/medium-icon-white-on-black.png' },
                    { name: 'dev.to', href: 'https://dev.to/zhravan', icon: 'https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png' },
                  ];

                  return (
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm font-medium mb-2 text-muted-foreground">Developer</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {developer.map((item) => <Card key={item.href} item={item} />)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2 text-muted-foreground">Social</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {social.map((item) => <Card key={item.href} item={item} />)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2 text-muted-foreground">Content</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {content.map((item) => <Card key={item.href} item={item} />)}
                        </div>
                      </div>
                    </div>
                  );
                })()}
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

              <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" autoComplete="given-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" autoComplete="family-name" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    inputMode="email"
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

                <Button type="submit" className="github-button-primary w-full" disabled={status !== 'idle'} aria-busy={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : status === 'success' ? 'Sent! ✅' : 'Send Message'}
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
