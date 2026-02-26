import { useState, useEffect, useCallback } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowLeft,
  Smartphone,
  QrCode,
  CheckCircle2,
  Timer,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import SparkleBackground from "@/components/SparkleBackground";

const UPI_APPS = [
  { id: "gpay", name: "Google Pay", color: "from-blue-500 to-blue-700", icon: "G" },
  { id: "phonepe", name: "PhonePe", color: "from-purple-500 to-purple-700", icon: "P" },
  { id: "paytm", name: "Paytm", color: "from-sky-400 to-sky-600", icon: "₱" },
  { id: "bhim", name: "BHIM UPI", color: "from-orange-500 to-orange-700", icon: "B" },
];

const TIMER_SECONDS = 120; // 2 minutes
const MERCHANT_UPI_ID = import.meta.env.VITE_UPI_ID ?? "barath200617@oksbi";
const MERCHANT_NAME = import.meta.env.VITE_UPI_NAME ?? "DiwaliCrackers";

const PaymentGateway = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [expired, setExpired] = useState(false);

  const customerDetails = (location.state as any)?.customerDetails;

  // Countdown timer for QR
  useEffect(() => {
    if (isMobile || expired) return;
    if (timeLeft <= 0) {
      setExpired(true);
      toast.error("QR code expired! Please try again.");
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, isMobile, expired]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleRefreshQR = () => {
    setTimeLeft(TIMER_SECONDS);
    setExpired(false);
  };

  const upiUri = `upi://pay?pa=${encodeURIComponent(MERCHANT_UPI_ID)}&pn=${encodeURIComponent(
    MERCHANT_NAME
  )}&am=${totalPrice}&cu=INR&tn=${encodeURIComponent("Order Payment")}`;

  const handleUPIPay = useCallback(
    (appId: string) => {
      setSelectedApp(appId);
      setProcessing(true);
      // Simulate UPI payment
      setTimeout(() => {
        toast.success("🎆 Payment successful! Order placed!", {
          description: `₹${totalPrice} paid via ${UPI_APPS.find((a) => a.id === appId)?.name}. Thank you!`,
          duration: 5000,
        });
        clearCart();
        setProcessing(false);
        navigate("/");
      }, 2500);
    },
    [totalPrice, clearCart, navigate]
  );

  const handleQRPaymentDone = () => {
    setProcessing(true);
    setTimeout(() => {
      toast.success("🎆 Payment verified! Order placed!", {
        description: `₹${totalPrice} received. Thank you${customerDetails?.name ? `, ${customerDetails.name}` : ""}!`,
        duration: 5000,
      });
      clearCart();
      setProcessing(false);
      navigate("/");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background relative">
        <SparkleBackground />
        <Navbar />
        <CartDrawer />
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <h2 className="font-display text-2xl font-bold text-foreground">
            No pending payment
          </h2>
          <p className="text-muted-foreground mt-2">Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <SparkleBackground />
      <Navbar />
      <CartDrawer />
      <div className="container mx-auto px-4 py-10 relative z-10 max-w-lg">
        <button
          onClick={() => navigate("/checkout")}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Checkout
        </button>

        {/* Amount Card */}
        <div className="rounded-xl border border-border bg-card p-6 text-center mb-6">
          <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
          <h2 className="font-display text-4xl font-bold text-primary">
            ₹{totalPrice}
          </h2>
        </div>

        {isMobile ? (
          /* ─── MOBILE: UPI App Selection ─── */
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Smartphone className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-bold text-foreground">
                Pay with UPI
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {UPI_APPS.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleUPIPay(app.id)}
                  disabled={processing}
                  className={`relative flex flex-col items-center gap-2 rounded-xl border border-border p-4 transition-all hover:scale-[1.03] hover:shadow-md disabled:opacity-60 ${
                    selectedApp === app.id
                      ? "ring-2 ring-primary border-primary"
                      : "bg-card"
                  }`}
                >
                  <div
                    className={`h-12 w-12 rounded-full bg-gradient-to-br ${app.color} flex items-center justify-center text-white font-bold text-xl`}
                  >
                    {app.icon}
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {app.name}
                  </span>
                  {selectedApp === app.id && processing && (
                    <div className="absolute inset-0 rounded-xl bg-background/80 flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-5 text-center">
              <p className="text-xs text-muted-foreground">
                Select an app to complete payment of ₹{totalPrice}
              </p>
            </div>
          </div>
        ) : (
          /* ─── DESKTOP: QR Code ─── */
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <QrCode className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-bold text-foreground">
                Scan QR to Pay
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              UPI ID: <strong>{MERCHANT_UPI_ID}</strong>
            </p>

            <div className="flex flex-col items-center gap-4">
              <div
                className={`p-4 bg-white rounded-2xl shadow-inner transition-opacity ${
                  expired ? "opacity-30" : ""
                }`}
              >
                <QRCodeSVG
                  value={upiUri}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin={false}
                />
              </div>

              {/* Timer */}
              <div
                className={`flex items-center gap-2 text-sm font-medium ${
                  timeLeft <= 30
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                <Timer className="h-4 w-4" />
                {expired ? (
                  <span>QR Expired</span>
                ) : (
                  <span>Expires in {formatTime(timeLeft)}</span>
                )}
              </div>

              {expired ? (
                <button
                  onClick={handleRefreshQR}
                  className="rounded-xl bg-secondary px-6 py-2.5 text-sm font-semibold text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  Generate New QR
                </button>
              ) : (
                <button
                  onClick={handleQRPaymentDone}
                  disabled={processing}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  {processing ? "Verifying Payment..." : "I've Completed Payment"}
                </button>
              )}

              <p className="text-xs text-muted-foreground text-center mt-1">
                Open any UPI app on your phone, scan the QR code, and complete
                the payment of <strong>₹{totalPrice}</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentGateway;
