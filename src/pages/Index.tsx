import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import SparkleBackground from "@/components/SparkleBackground";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <SparkleBackground />
      <Navbar />
      <Hero />
      <ProductGrid />
      <CartDrawer />
      <div id="about"></div>
      <div id="contact"></div>
      <Footer />
    </div>
  );
};

export default Index;
