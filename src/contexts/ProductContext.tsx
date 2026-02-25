import React, { createContext, useContext, useState, useCallback } from "react";

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const defaultProducts: Product[] = [
  { id: "1", title: "Golden Sparklers", price: 149, image: "https://images.unsplash.com/photo-1498931299210-d53b73bf6d0b?w=400&h=400&fit=crop", category: "Sparklers", description: "Premium golden sparklers for magical celebrations" },
  { id: "2", title: "Sky Rockets", price: 299, image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&h=400&fit=crop", category: "Rockets", description: "Soar high with brilliant sky rockets" },
  { id: "3", title: "Flower Pots", price: 199, image: "https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=400&h=400&fit=crop", category: "Ground", description: "Beautiful fountain of colorful sparks" },
  { id: "4", title: "Chakri Spinner", price: 99, image: "https://images.unsplash.com/photo-1508896694512-1eade558679c?w=400&h=400&fit=crop", category: "Ground", description: "Spinning wheels of dazzling light" },
  { id: "5", title: "Atom Bomb", price: 349, image: "https://images.unsplash.com/photo-1514862322738-ea122c1a6a60?w=400&h=400&fit=crop", category: "Aerial", description: "Thundering sound with brilliant burst" },
  { id: "6", title: "Twinkling Stars", price: 179, image: "https://images.unsplash.com/photo-1481162854517-d9e353af153d?w=400&h=400&fit=crop", category: "Sparklers", description: "Multi-color twinkling star sparklers" },
  { id: "7", title: "Roman Candles", price: 249, image: "https://images.unsplash.com/photo-1486365227133-37c5975ad162?w=400&h=400&fit=crop", category: "Aerial", description: "Classic Roman candles with vivid colors" },
  { id: "8", title: "Laxmi Bomb", price: 129, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", category: "Sound", description: "Auspicious crackers for prosperity" },
  { id: "9", title: "Color Smoke", price: 79, image: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=400&h=400&fit=crop", category: "Ground", description: "Safe and colorful smoke crackers" },
];

interface ProductContextType {
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be within ProductProvider");
  return ctx;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  const addProduct = useCallback((p: Omit<Product, "id">) => {
    setProducts(prev => [...prev, { ...p, id: Date.now().toString() }]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
