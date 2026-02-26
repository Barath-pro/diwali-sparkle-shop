import { Sparkles, Instagram, Mail, Phone, MapPin, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">About Us</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We are one of the leading Diwali crackers retailers, bringing joy and festivity to your celebrations since 2010. Our mission is to provide safe, high-quality fireworks at the best prices.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#products" className="hover:text-primary transition-colors">Sparklers</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Rockets</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Ground Crackers</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Aerial Fireworks</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Sound Crackers</a></li>
            </ul>
          </div>

          {/* License & Certificate */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">License & Certificate</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <FileCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>Licensed by Petroleum & Explosives Safety Organisation (PESO)</span>
              </div>
              <div className="flex items-start gap-2">
                <FileCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-start gap-2">
                <FileCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>License No: LE-12345/2024</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:info@diwalistore.com" className="hover:text-primary transition-colors">info@diwalistore.com</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>123, Cracker Street, Sivakasi, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  Follow us
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Diwali Crackers Store. Light up responsibly. 🪔</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
