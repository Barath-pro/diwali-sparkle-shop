import { useProducts } from "@/contexts/ProductContext";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CATEGORIES = ["All", "Sparklers", "Rockets", "Ground", "Aerial", "Sound"] as const;
const FEATURED_COUNT = 6;

const ProductGrid = () => {
  const { products } = useProducts();
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory);

  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, FEATURED_COUNT);

  return (
    <section id="products" className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Our <span className="text-primary">Festive</span> Collection
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Handpicked crackers to make your Diwali truly special
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground py-10">No products in this category yet.</p>
        )}

        {filteredProducts.length > FEATURED_COUNT && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {showAll ? (
                <>Show Less <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>View All Products ({filteredProducts.length}) <ChevronDown className="h-4 w-4" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
