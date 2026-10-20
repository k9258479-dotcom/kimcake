import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <ShoppingBag className="w-4 h-4 text-[#108B67]" />
              <span>Giỏ hàng của bạn ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="w-12 h-12 stroke-[1.2] mb-3 text-slate-300" />
                <p className="text-sm font-medium text-slate-600">Giỏ hàng đang trống</p>
                <p className="text-xs text-slate-400 mt-1">Chọn sản phẩm trên landing page để thêm vào giỏ.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 bg-white"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <div className="text-xs font-bold text-[#EE4D2D] mt-0.5 tabular-nums">
                        {item.price.toLocaleString('vi-VN')}₫
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-slate-200 rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold font-mono tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        title="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Phí vận chuyển:</span>
                <span className="text-[#108B67] font-bold">MIỄN PHÍ</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Tổng tiền:</span>
                <span className="text-base text-[#EE4D2D] tabular-nums font-mono">
                  {totalAmount.toLocaleString('vi-VN')}₫
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-3 px-4 bg-[#EE4D2D] hover:bg-[#D9381E] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
              >
                <span>TIẾN HÀNH ĐẶT HÀNG (COD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
