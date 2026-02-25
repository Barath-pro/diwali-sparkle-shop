import { useProducts } from "@/contexts/ProductContext";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const { products } = useProducts();

  return (
    <section id="products" className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Our <span className="text-primary">Festive</span> Collection
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Handpicked crackers to make your Diwali truly special
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
