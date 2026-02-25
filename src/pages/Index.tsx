import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import SparkleBackground from "@/components/SparkleBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <SparkleBackground />
      <Navbar />
      <Hero />
      <ProductGrid />
      <CartDrawer />
      <footer className="relative z-10 border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© 2024 Diwali Crackers Store. Light up responsibly. 🪔</p>
      </footer>
    </div>
  );
};

export default Index;
