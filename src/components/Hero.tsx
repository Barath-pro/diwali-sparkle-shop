import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Diwali Special Collection 2024
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 glow-text text-foreground leading-tight">
            Light Up Your
            <br />
            <span className="text-primary">Celebrations</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Premium crackers and fireworks for an unforgettable Diwali.
            Safe, vibrant, and crafted with joy.
          </p>

          <motion.a
            href="#products"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-5 w-5" />
            Shop Now
          </motion.a>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-accent/10 blur-2xl" />
      </div>
    </section>
  );
};

export default Hero;
