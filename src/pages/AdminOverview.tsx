import { useOrders } from "@/contexts/OrderContext";
import { useProducts } from "@/contexts/ProductContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Package, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";

const dailyData = [
  { day: "Mon", orders: 12, revenue: 4500 },
  { day: "Tue", orders: 18, revenue: 6800 },
  { day: "Wed", orders: 25, revenue: 9200 },
  { day: "Thu", orders: 22, revenue: 8100 },
  { day: "Fri", orders: 30, revenue: 11500 },
  { day: "Sat", orders: 45, revenue: 17200 },
  { day: "Sun", orders: 38, revenue: 14800 },
];

const AdminOverview = () => {
  const { orders } = useOrders();
  const { products } = useProducts();
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  const stats = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-primary" },
    { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "text-accent" },
    { label: "Products", value: products.length, icon: Package, color: "text-gold" },
    { label: "Avg Order", value: `₹${Math.round(totalRevenue / orders.length)}`, icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Daily Orders</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35 30% 88%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(20 10% 45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(20 10% 45%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(35 30% 88%)" }} />
              <Bar dataKey="orders" fill="hsl(30 95% 52%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35 30% 88%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(20 10% 45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(20 10% 45%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(35 30% 88%)" }} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(0 75% 50%)" strokeWidth={2} dot={{ fill: "hsl(0 75% 50%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
