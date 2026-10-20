import React, { useState } from 'react';
import {
  Star, Truck, ShieldCheck, Heart, Share2, MessageCircle, Store,
  Check, ShoppingCart, Plus, Minus, ArrowLeft, Sparkles, CheckCircle2
} from 'lucide-react';
import { Language } from '../types';
import { imgShopee } from '../data/themes';

interface LandingPageLive05Props {
  language: Language;
  onBackToCatalog?: () => void;
  onAddToCart?: (item: any) => void;
}

export const LandingPageLive05: React.FC<LandingPageLive05Props> = ({
  language,
  onBackToCatalog,
  onAddToCart
}) => {
  const [selectedColor, setSelectedColor] = useState('Hồng Pastel');
  const [selectedSize, setSelectedSize] = useState('Size 90 (10-12kg)');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(133);

  // Vouchers state
  const [vouchers, setVouchers] = useState([
    { id: 'v10', code: 'GIAM10K', title: 'Giảm 10k', minSpend: 'Đơn từ 250k', saved: false },
    { id: 'v15', code: 'GIAM15K', title: 'Giảm 15k', minSpend: 'Đơn từ 400k', saved: false },
    { id: 'v5', code: 'GIAM5K', title: 'Giảm 5k', minSpend: 'Đơn từ 150k', saved: true }
  ]);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleVoucher = (id: string) => {
    setVouchers((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const nextState = !v.saved;
          showToast(nextState ? `Đã lưu mã ${v.title}!` : `Đã hủy lưu mã ${v.title}`);
          return { ...v, saved: nextState };
        }
        return v;
      })
    );
  };

  const handleToggleFav = () => {
    setIsFavorite(!isFavorite);
    setFavoriteCount(prev => isFavorite ? prev - 1 : prev + 1);
    showToast(isFavorite ? 'Đã bỏ yêu thích' : 'Đã lưu vào danh sách yêu thích!');
  };

  const productImages = [
    imgShopee,
    'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80'
  ];

  const price = 350000;
  const originalPrice = 490000;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        id: 'dress-05',
        name: `Váy Len Hai Màu Cưng Xỉu (${selectedColor}, ${selectedSize})`,
        price,
        quantity,
        image: productImages[0]
      });
    }
    showToast('Đã thêm sản phẩm vào giỏ hàng!');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#222222]">
      {/* Top Banner Navigation */}
      <div className="bg-[#EE4D2D] text-white text-xs py-2 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBackToCatalog && (
              <button
                onClick={onBackToCatalog}
                className="flex items-center gap-1 font-semibold text-orange-100 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kho Giao Diện (#1848)</span>
              </button>
            )}
            <span className="text-white/40">|</span>
            <span className="font-medium truncate">Mẫu Giao Diện Sàn Thương Mại Điện Tử 05 (Shopee Marketplace Style)</span>
          </div>
          <span className="hidden sm:inline bg-black/20 px-2 py-0.5 rounded text-[11px]">
            Template Chuẩn Shopee Mall
          </span>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Product Card Container */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Gallery Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={productImages[activeImgIndex]}
                  alt="Váy Len Cho Bé"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#EE4D2D] text-white text-[11px] font-black px-2 py-0.5 rounded-sm">
                  -29%
                </span>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2.5">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImgIndex === idx
                        ? 'border-[#EE4D2D] shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Share & Favorite Buttons */}
              <div className="flex items-center justify-between pt-2 px-1 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span>Chia sẻ:</span>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      showToast('Đã sao chép liên kết!');
                    }}
                    className="hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </button>
                </div>

                <button
                  onClick={handleToggleFav}
                  className={`flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
                    isFavorite ? 'text-[#EE4D2D]' : 'hover:text-[#EE4D2D]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  <span>Đã thích ({favoriteCount})</span>
                </button>
              </div>
            </div>

            {/* Product Purchase & Specification Details */}
            <div className="md:col-span-7 space-y-5">
              {/* Badges & Title */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#EE4D2D] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm">
                    Yêu thích+
                  </span>
                  <span className="text-xs text-slate-500">KissyBabi Official Store</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  Váy Len Hai Màu Cưng Xỉu Dành Cho Bé Gái Đi Tiệc, Đi Chơi Mùa Thu Đông Siêu Ấm Áp
                </h1>

                {/* Rating Bar */}
                <div className="flex items-center gap-4 text-xs mt-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-[#EE4D2D] font-bold">
                    <span className="underline text-sm">4.9</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="text-slate-700">
                    <strong className="underline">1.2k</strong> Đánh giá
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="text-slate-700">
                    <strong className="tabular-nums">3.8k</strong> Đã bán
                  </div>
                </div>
              </div>

              {/* Price Banner */}
              <div className="bg-[#FAFAFA] p-4 rounded-xl flex items-baseline gap-3">
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ₫{originalPrice.toLocaleString('vi-VN')}
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-[#EE4D2D] tabular-nums">
                  ₫{price.toLocaleString('vi-VN')}
                </span>
                <span className="bg-[#EE4D2D]/10 text-[#EE4D2D] text-xs font-bold px-2 py-0.5 rounded">
                  29% GIẢM
                </span>
              </div>

              {/* Shop Vouchers Bar */}
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-500 shrink-0 w-28">Mã Giảm Giá Shop:</span>
                <div className="flex flex-wrap gap-2">
                  {vouchers.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => handleToggleVoucher(v.id)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                        v.saved
                          ? 'bg-[#EE4D2D] text-white border-[#EE4D2D]'
                          : 'bg-orange-50 text-[#EE4D2D] border-orange-200 hover:bg-orange-100'
                      }`}
                    >
                      <span>{v.title}</span>
                      <span className="text-[10px] font-normal">({v.saved ? 'Đã lưu' : 'Lưu'})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shipping Guarantee */}
              <div className="flex items-start gap-3 text-xs border-t border-slate-100 pt-3">
                <span className="text-slate-500 shrink-0 w-28">Vận Chuyển:</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                    <Truck className="w-3.5 h-3.5 text-[#108B67]" />
                    <span>Miễn phí vận chuyển cho đơn hàng trên ₫25.000</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Dự kiến nhận hàng: 23 Th01 - 27 Th01 · Tặng voucher ₫15.000 nếu trễ hạn
                  </p>
                </div>
              </div>

              {/* Color Selection */}
              <div className="flex items-center gap-3 text-xs border-t border-slate-100 pt-3">
                <span className="text-slate-500 shrink-0 w-28">Màu Sắc:</span>
                <div className="flex flex-wrap gap-2">
                  {['Hồng Pastel', 'Kem Trắng Sữa', 'Nâu Mocha'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        selectedColor === color
                          ? 'border-[#EE4D2D] text-[#EE4D2D] bg-orange-50/60 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-500 shrink-0 w-28">Size / Cỡ:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Size 80 (8-10kg)',
                    'Size 90 (10-12kg)',
                    'Size 100 (12-14kg)',
                    'Size 110 (14-16kg)'
                  ].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'border-[#EE4D2D] text-[#EE4D2D] bg-orange-50/60 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3 text-xs border-t border-slate-100 pt-3">
                <span className="text-slate-500 shrink-0 w-28">Số Lượng:</span>
                <div className="flex items-center">
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold text-slate-800 font-mono tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-slate-400 text-xs ml-3">48 sản phẩm có sẵn</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 rounded-xl border border-[#EE4D2D] bg-orange-50 text-[#EE4D2D] font-bold text-xs flex items-center gap-2 hover:bg-orange-100 active:scale-95 transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Thêm Vào Giỏ Hàng</span>
                </button>

                <button
                  onClick={() => setOrderModalOpen(true)}
                  className="px-8 py-3 rounded-xl bg-[#EE4D2D] hover:bg-[#D9381E] text-white font-bold text-xs shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  MUA NGAY
                </button>
              </div>

              {/* Guarantee text */}
              <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#108B67]" /> Trả hàng miễn phí 15 ngày
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#108B67]" /> Hàng chính hãng 100%
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#108B67]" /> Miễn phí vận chuyển
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Profile Widget */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-400 to-[#EE4D2D] p-0.5 shrink-0">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-black text-[#EE4D2D] text-xl">
                KB
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">KissyBabi - Chuyên QCCC Cho Bé</h3>
                <span className="text-[10px] bg-red-50 text-[#EE4D2D] font-bold px-1.5 py-0.5 rounded">
                  Mall
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Online 3 Giờ Trước</div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => showToast('Mở cửa sổ chat với KissyBabi...')}
                  className="px-3 py-1 rounded-lg border border-[#EE4D2D] text-[#EE4D2D] hover:bg-orange-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat Ngay</span>
                </button>
                <button
                  onClick={() => showToast('Đang chuyển đến trang Shop KissyBabi...')}
                  className="px-3 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Xem Shop</span>
                </button>
              </div>
            </div>
          </div>

          {/* Shop stats grid */}
          <div className="grid grid-cols-3 gap-6 text-xs text-slate-600 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
            <div>
              <div className="text-slate-400">Đánh Giá:</div>
              <div className="text-[#EE4D2D] font-bold text-sm">5,9k</div>
            </div>
            <div>
              <div className="text-slate-400">Tỉ Lệ Phản Hồi:</div>
              <div className="text-[#EE4D2D] font-bold text-sm">99%</div>
            </div>
            <div>
              <div className="text-slate-400">Thời Gian Phản Hồi:</div>
              <div className="text-slate-800 font-bold text-sm">trong vài giờ</div>
            </div>
          </div>
        </div>
      </main>

      {/* Instant Buy Modal */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Xác nhận Đặt Mua Ngay</h3>
              <button
                onClick={() => setOrderModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex gap-3">
                <img src={productImages[0]} alt="Product" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <div className="font-bold text-slate-900 line-clamp-1">Váy Len Hai Màu Cưng Xỉu</div>
                  <div className="text-slate-500 mt-0.5">Phân loại: {selectedColor} · {selectedSize}</div>
                  <div className="text-[#EE4D2D] font-bold mt-1">
                    ₫{price.toLocaleString('vi-VN')} x {quantity}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Tạm tính ({quantity} sản phẩm):</span>
                  <span>₫{(price * quantity).toLocaleString('vi-VN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Phí vận chuyển:</span>
                  <span className="text-[#108B67] font-semibold">MIỄN PHÍ</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 border-t pt-1.5 text-sm">
                  <span>Tổng tiền thanh toán COD:</span>
                  <span className="text-[#EE4D2D]">₫{(price * quantity).toLocaleString('vi-VN')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setOrderModalOpen(false);
                  showToast('Đặt hàng thành công! Mã vận đơn đã được gửi qua SMS.');
                }}
                className="w-full py-3 bg-[#EE4D2D] hover:bg-[#D9381E] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
              >
                XÁC NHẬN MUA NGAY (COD)
              </button>
              <button
                onClick={() => setOrderModalOpen(false)}
                className="w-full py-2 text-slate-500 hover:text-slate-700 text-xs font-medium"
              >
                Tiếp tục xem sản phẩm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
