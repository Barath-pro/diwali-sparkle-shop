import { motion } from "framer-motion";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/contexts/ProductContext";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, items, updateQuantity } = useCart();
  const [burst, setBurst] = useState(false);

  const cartItem = items.find(i => i.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart(product);
    setBurst(true);
    setTimeout(() => setBurst(false), 600);
  };

  return (
    <motion.div
      className="card-hover-shadow relative rounded-xl border border-border bg-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-medium text-primary uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="font-display text-lg font-semibold text-foreground mt-1">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-foreground">₹{product.price}</span>
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="relative flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
              {burst && (
                <span className="absolute inset-0 rounded-lg border-2 border-gold animate-starburst pointer-events-none" />
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="rounded-lg border border-border p-1.5 hover:bg-muted transition-colors"
              >
                <Minus className="h-4 w-4 text-foreground" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-foreground">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="rounded-lg bg-primary p-1.5 hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-4 w-4 text-primary-foreground" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
