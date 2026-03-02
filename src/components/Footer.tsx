import { Sparkles, Mail, Phone, MapPin, FileCheck, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* About Us */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">About Us</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We are one of the leading Diwali crackers retailers, bringing joy and festivity to your celebrations since
              2010. Our mission is to provide safe, high-quality fireworks at the best prices.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#products" className="transition-colors hover:text-primary">
                  Sparklers
                </a>
              </li>
              <li>
                <a href="#products" className="transition-colors hover:text-primary">
                  Rockets
                </a>
              </li>
              <li>
                <a href="#products" className="transition-colors hover:text-primary">
                  Ground Crackers
                </a>
              </li>
              <li>
                <a href="#products" className="transition-colors hover:text-primary">
                  Aerial Fireworks
                </a>
              </li>
              <li>
                <a href="#products" className="transition-colors hover:text-primary">
                  Sound Crackers
                </a>
              </li>
            </ul>
          </div>

          {/* License & Certificate */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground">License & Certificate</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Licensed by Petroleum & Explosives Safety Organisation (PESO)</span>
              </div>
              <div className="flex items-start gap-2">
                <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-start gap-2">
                <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>License No: LE-12345/2024</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground">Contact Us</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+919876543210" className="transition-colors hover:text-primary">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:sales@selvifireworks.com" className="transition-colors hover:text-primary">
                  sales@selvifireworks.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>123, Fireworks Lane, M.G. Road, Sivakasi, Tamil Nadu - 626123</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Diwali Crackers Store. Light up responsibly.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
