import React, { createContext, useContext, useState } from "react";

export interface Order {
  id: string;
  customerName: string;
  email: string;
  items: { title: string; quantity: number; price: number }[];
  total: number;
  status: "Pending" | "Shipped" | "Delivered";
  date: string;
}

const mockOrders: Order[] = [
  { id: "ORD-001", customerName: "Rahul Sharma", email: "rahul@mail.com", items: [{ title: "Golden Sparklers", quantity: 3, price: 149 }, { title: "Sky Rockets", quantity: 1, price: 299 }], total: 746, status: "Shipped", date: "2024-11-01" },
  { id: "ORD-002", customerName: "Priya Patel", email: "priya@mail.com", items: [{ title: "Flower Pots", quantity: 5, price: 199 }], total: 995, status: "Pending", date: "2024-11-02" },
  { id: "ORD-003", customerName: "Amit Singh", email: "amit@mail.com", items: [{ title: "Atom Bomb", quantity: 2, price: 349 }, { title: "Chakri Spinner", quantity: 4, price: 99 }], total: 1094, status: "Delivered", date: "2024-10-30" },
  { id: "ORD-004", customerName: "Sneha Gupta", email: "sneha@mail.com", items: [{ title: "Roman Candles", quantity: 3, price: 249 }], total: 747, status: "Pending", date: "2024-11-03" },
  { id: "ORD-005", customerName: "Vikram Joshi", email: "vikram@mail.com", items: [{ title: "Twinkling Stars", quantity: 6, price: 179 }], total: 1074, status: "Shipped", date: "2024-11-01" },
];

interface OrderContextType {
  orders: Order[];
  updateOrderStatus: (id: string, status: Order["status"]) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be within OrderProvider");
  return ctx;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};
