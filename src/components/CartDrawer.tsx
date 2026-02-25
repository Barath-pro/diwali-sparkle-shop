import { X, Minus, Plus, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    toast.success("🎆 Order placed successfully! (Simulated Stripe Checkout)", {
      description: `Total: ₹${totalPrice}`,
      duration: 4000,
    });
    clearCart();
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-border bg-card shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h2 className="font-display text-xl font-bold text-foreground">Your Cart</h2>
                <button onClick={() => setIsOpen(false)} className="rounded-lg p-2 hover:bg-muted transition-colors">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Sparkles className="h-12 w-12 mb-4 text-muted" />
                    <p className="text-lg font-medium">Cart is empty</p>
                    <p className="text-sm mt-1">Add some crackers to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-4 rounded-lg border border-border p-3">
                        <img src={item.product.image} alt={item.product.title} className="h-16 w-16 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground truncate">{item.product.title}</h4>
                          <p className="text-sm text-primary font-medium">₹{item.product.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="rounded-md border border-border p-1 hover:bg-muted">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="rounded-md border border-border p-1 hover:bg-muted">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-accent">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-border px-6 py-4 space-y-4">
                  <div className="flex justify-between text-lg font-bold text-foreground">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full rounded-xl bg-primary py-3 text-center font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
