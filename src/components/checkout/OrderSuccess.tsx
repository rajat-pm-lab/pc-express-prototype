interface Props {
  total: number;
  points: number;
  onContinue: () => void;
}

export default function OrderSuccess({ total, points, onContinue }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="animate-scale-in text-6xl mb-4">✅</div>
      <h2 className="text-xl font-bold text-dark mb-1 animate-fade-in">Order Placed!</h2>
      <p className="text-sm text-body animate-fade-in" style={{ animationDelay: '100ms' }}>
        Order #PCE-2026-03-4821
      </p>

      <div className="bg-success-light rounded-xl p-4 w-full mt-6 space-y-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex justify-between text-sm">
          <span className="text-body">Pickup</span>
          <span className="font-medium text-dark">Tomorrow 10:00am–12:00pm</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-body">Store</span>
          <span className="font-medium text-dark">Lakeshore Blvd Loblaws</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-body">Total</span>
          <span className="font-bold text-dark">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-optimum">⭐ Points earned</span>
          <span className="font-bold text-optimum">{points.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full py-3 mt-6 bg-loblaws text-white font-semibold text-sm rounded-xl active:scale-97 transition-transform"
      >
        Continue Shopping
      </button>
    </div>
  );
}
