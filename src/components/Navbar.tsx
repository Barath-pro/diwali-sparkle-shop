import { ShoppingCart, Sparkles, User, LogOut } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginDialog from "./LoginDialog";

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">
              Diwali <span className="text-primary">Crackers</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <a href="#products" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Products
            </a>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-primary hover:text-accent transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
                <button onClick={logout} className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <LogOut className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <User className="h-4 w-4" />
                Login
              </button>
            )}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
};

export default Navbar;
