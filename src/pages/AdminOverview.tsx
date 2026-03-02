import { useMemo } from "react";
import { useOrders } from "@/contexts/OrderContext";
import { useProducts } from "@/contexts/ProductContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Package, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";

const AdminOverview = () => {
  const { orders } = useOrders();
  const { products } = useProducts();
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrder = orders.length ? Math.round(totalRevenue / orders.length) : 0;

  const dailyData = useMemo(() => {
    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weekdayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
    const aggregate = dayOrder.reduce<Record<string, { orders: number; revenue: number }>>((acc, day) => {
      acc[day] = { orders: 0, revenue: 0 };
      return acc;
    }, {});

    orders.forEach(order => {
      const d = new Date(order.date);
      if (Number.isNaN(d.getTime())) return;
      const day = weekdayMap[d.getDay()];
      if (!aggregate[day]) return;
      aggregate[day].orders += 1;
      aggregate[day].revenue += order.total;
    });

    return dayOrder.map(day => ({
      day,
      orders: aggregate[day].orders,
      revenue: aggregate[day].revenue,
    }));
  }, [orders]);

  const stats = [
    { label: "Total Revenue", value: `Rs. ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-primary" },
    { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "text-accent" },
    { label: "Products", value: products.length, icon: Package, color: "text-gold" },
    { label: "Avg Order", value: `Rs. ${avgOrder.toLocaleString()}`, icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Daily Orders</h3>
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
          <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Revenue Trend</h3>
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
