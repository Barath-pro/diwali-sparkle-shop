import { useOrders } from "@/contexts/OrderContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useOrders();

  const statusColors: Record<string, string> = {
    Pending: "bg-secondary text-secondary-foreground",
    Shipped: "bg-primary/15 text-primary",
    Delivered: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Order Management</h1>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order ID</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Items</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{order.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-foreground">{order.customerName}</div>
                    <div className="text-xs text-muted-foreground">{order.email}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {order.items.map(i => `${i.title} ×${i.quantity}`).join(", ")}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">₹{order.total}</td>
                  <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                  <td className="px-4 py-3">
                    <Select
                      value={order.status}
                      onValueChange={(val) => updateOrderStatus(order.id, val as any)}
                    >
                      <SelectTrigger className={`w-28 h-8 text-xs rounded-full ${statusColors[order.status]}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
