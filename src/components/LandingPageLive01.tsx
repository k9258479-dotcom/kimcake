import React, { useState, useEffect } from 'react';
import {
  Clock, ShieldCheck, Truck, RefreshCw, Star, CheckCircle,
  Phone, MapPin, User, ChevronRight, ThumbsUp, ShoppingBag,
  Award, Heart, Share2, Check, ArrowLeft, Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { imgTea } from '../data/themes';

interface LandingPageLive01Props {
  language: Language;
  onBackToCatalog?: () => void;
  onAddToCart?: (item: any) => void;
}

export const LandingPageLive01: React.FC<LandingPageLive01Props> = ({
  language,
  onBackToCatalog,
  onAddToCart
}) => {
  // 24-hour countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 38, seconds: 22 });
  const [selectedBundle, setSelectedBundle] = useState<'1box' | '2box' | '4box'>('2box');
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'guide' | 'reviews'>('overview');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedVoucher, setSavedVoucher] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  interface BundleOption {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    savings: string;
    desc: string;
    popular?: boolean;
  }

  const bundles: Record<'1box' | '2box' | '4box', BundleOption> = {
    '1box': {
      id: 'tea-1',
      name: 'Combo 1 Hộp Trà Búp Ổi & Thìa Canh (100g)',
      price: 168000,
      originalPrice: 230000,
      savings: 'Tiết kiệm 62.000₫',
      desc: 'Dùng thử 15 ngày, thanh lọc cơ thể và ổn định đường huyết nhẹ.'
    },
    '2box': {
      id: 'tea-2',
      name: 'Combo 2 Hộp + TẶNG Bình Thủy Tinh Chịu Nhiệt Cao Cấp',
      price: 320000,
      originalPrice: 460000,
      savings: 'Tiết kiệm 140.000₫ + Quà tặng 85.000₫',
      desc: 'Liệu trình chuẩn 1 tháng, hiệu quả rõ rệt. [BÁN CHẠY NHẤT]',
      popular: true
    },
    '4box': {
      id: 'tea-4',
      name: 'Combo Đại Tiết Kiệm: Mua 3 Tặng 1 Hộp (Tổng 4 Hộp) + Miễn Ship Toàn Quốc',
      price: 499000,
      originalPrice: 920000,
      savings: 'Tiết kiệm 421.000₫ + Freeship',
      desc: 'Liệu trình chuyên sâu 2 tháng cho cả gia đình, chỉ 8k/ngày.'
    }
  };

  const currentBundle = bundles[selectedBundle];

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng!');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
    }, 800);
  };

  const galleryImages = [
    imgTea,
    'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#222222]">
      {/* Top Banner Navigation & Quick Return */}
      <div className="bg-[#108B67] text-white text-xs py-2 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBackToCatalog && (
              <button
                onClick={onBackToCatalog}
                className="flex items-center gap-1 font-semibold text-emerald-100 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kho Giao Diện (#1848)</span>
              </button>
            )}
            <span className="text-white/40">|</span>
            <span className="font-medium truncate">Mẫu Giao Diện Sàn Thương Mại Điện Tử 01 (Trà Búp Ổi D2C)</span>
          </div>
          <span className="hidden sm:inline bg-black/20 px-2 py-0.5 rounded text-[11px] font-mono">
            Chuẩn SEO · Tối ưu Mobile
          </span>
        </div>
      </div>

      {/* Golden Hour Flash Sale Urgent Notice Bar */}
      <div className="bg-gradient-to-r from-[#D9381E] via-[#EE4D2D] to-[#D9381E] text-white py-2.5 px-4 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold tracking-wide text-xs sm:text-sm uppercase">
            <Clock className="w-4 h-4 animate-pulse text-yellow-300" />
            <span>Ưu Đãi Giờ Vàng Sàn TMĐT — Giảm Tới 45%</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-white/90 mr-1">Kết thúc sau:</span>
            <span className="bg-black/40 px-2 py-1 rounded text-white font-mono font-bold">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-black/40 px-2 py-1 rounded text-white font-mono font-bold">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-black/40 px-2 py-1 rounded text-white font-mono font-bold">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Interactive Product Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
              <img
                src={galleryImages[activeGalleryIndex]}
                alt="Trà Búp Ổi & Dây Thìa Canh"
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-3 left-3 bg-[#EE4D2D] text-white text-xs font-black px-2.5 py-1 rounded-md shadow-sm">
                GIẢM 27%
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-full font-mono">
                {activeGalleryIndex + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeGalleryIndex === idx
                      ? 'border-[#108B67] shadow-sm scale-102'
                      : 'border-slate-200 hover:border-slate-300 opacity-80'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Trust highlights under gallery */}
            <div className="grid grid-cols-3 gap-3 pt-3">
              <div className="bg-white p-3 rounded-xl border border-slate-100 text-center space-y-1">
                <ShieldCheck className="w-5 h-5 mx-auto text-[#108B67]" />
                <div className="text-[11px] font-bold text-slate-800">100% Chính Hãng</div>
                <div className="text-[10px] text-slate-500">Thảo mộc tự nhiên</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 text-center space-y-1">
                <Truck className="w-5 h-5 mx-auto text-[#108B67]" />
                <div className="text-[11px] font-bold text-slate-800">Giao Hàng Miễn Phí</div>
                <div className="text-[10px] text-slate-500">Đơn từ 2 hộp</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 text-center space-y-1">
                <RefreshCw className="w-5 h-5 mx-auto text-[#108B67]" />
                <div className="text-[11px] font-bold text-slate-800">Đổi Trả 7 Ngày</div>
                <div className="text-[10px] text-slate-500">Kiểm tra trước khi trả</div>
              </div>
            </div>
          </div>

          {/* Right Column: PDP Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            {/* Title & Ratings */}
            <div className="space-y-2 border-b border-slate-200 pb-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#108B67] bg-emerald-50 px-2.5 py-0.5 rounded-md">
                <Award className="w-3.5 h-3.5" />
                <span>Sản Phẩm Bán Chạy #1 Sàn TMĐT</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] leading-snug">
                Trà Búp Ổi & Dây Thìa Canh Hảo Hạng
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed">
                Hỗ trợ cân bằng đường huyết tự nhiên, giảm mỡ máu, thanh lọc gan thận và an thần ngủ ngon từ 100% thảo mộc rừng Tây Nguyên.
              </p>

              {/* Rating and sales stats */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <span>4.9</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 underline cursor-pointer">1,245 đánh giá</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-medium">Đã bán 12.8k sản phẩm</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#FFF8F6] border border-[#FDE1D9] rounded-2xl p-4 sm:p-5 flex items-baseline justify-between">
              <div>
                <div className="text-xs text-slate-500 line-through">
                  Giá gốc: {currentBundle.originalPrice.toLocaleString('vi-VN')}₫
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#EE4D2D] tabular-nums">
                    {currentBundle.price.toLocaleString('vi-VN')}₫
                  </span>
                  <span className="text-xs font-bold text-white bg-[#EE4D2D] px-2 py-0.5 rounded">
                    SALE GIỜ VÀNG
                  </span>
                </div>
                <div className="text-xs font-semibold text-emerald-700 mt-1">
                  ✓ {currentBundle.savings}
                </div>
              </div>

              {/* Voucher Save Button */}
              <button
                onClick={() => setSavedVoucher(!savedVoucher)}
                className={`text-xs font-bold px-3 py-2 rounded-lg border transition-all cursor-pointer ${
                  savedVoucher
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-[#EE4D2D] border-[#EE4D2D] hover:bg-orange-50'
                }`}
              >
                {savedVoucher ? '✓ Đã áp mã 25K' : 'Lưu voucher 25K'}
              </button>
            </div>

            {/* Bundle Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Chọn gói ưu đãi tiết kiệm:
              </label>

              <div className="space-y-2.5">
                {(['1box', '2box', '4box'] as const).map((key) => {
                  const b = bundles[key];
                  const isSelected = selectedBundle === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedBundle(key)}
                      className={`relative p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#108B67] bg-[#F0FDF9] shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {b.popular && (
                        <span className="absolute -top-2.5 right-4 bg-[#108B67] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          BÁN CHẠY NHẤT
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#108B67] bg-[#108B67]' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-slate-900">
                              {b.name}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {b.desc}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0 ml-3">
                          <div className="text-sm font-black text-[#108B67] tabular-nums">
                            {b.price.toLocaleString('vi-VN')}₫
                          </div>
                          <div className="text-[11px] text-slate-400 line-through tabular-nums">
                            {b.originalPrice.toLocaleString('vi-VN')}₫
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fast Purchase CTA */}
            <div className="pt-2 space-y-3">
              <a
                href="#order-form"
                className="w-full py-4 px-6 text-sm font-black text-white bg-gradient-to-r from-[#108B67] to-[#0D7355] hover:from-[#0D7355] hover:to-[#0A5C44] rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-98 text-center"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>MUA NGAY — KIỂM TRA HÀNG MỚI THANH TOÁN (COD)</span>
              </a>

              <p className="text-[11px] text-center text-slate-500">
                Giao hàng tận nhà trong 2 - 3 ngày · Được bóc hàng kiểm tra chất lượng
              </p>
            </div>
          </div>
        </div>

        {/* Content Tabs Section */}
        <section className="mt-16 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {/* Tab buttons */}
          <div className="flex border-b border-slate-200 pb-px gap-4 sm:gap-8 overflow-x-auto text-sm font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-[#108B67] text-[#108B67] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Tổng quan sản phẩm
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-3 transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'ingredients'
                  ? 'border-[#108B67] text-[#108B67] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Thành phần thảo mộc
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`pb-3 transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'guide'
                  ? 'border-[#108B67] text-[#108B67] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Cách pha & Sử dụng
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-[#108B67] text-[#108B67] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Đánh giá thực tế (1,245)
            </button>
          </div>

          {/* Tab Panels */}
          <div className="pt-6 text-sm text-slate-700 leading-relaxed space-y-4">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Tại sao Trà Búp Ổi & Dây Thìa Canh được hàng nghìn khách hàng tin chọn?
                </h3>
                <p>
                  Sự kết hợp hoàn hảo giữa <strong>Búp Ổi Rừng Tây Nguyên</strong> giàu polyphenol, flavonoid tự nhiên cùng thảo dược quý <strong>Dây Thìa Canh</strong> chuẩn GACP-WHO giúp kích thích cơ thể sản sinh insulin tự nhiên, ức chế hấp thu đường sau bữa ăn và hỗ trợ tim mạch bền vững.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-[#108B67]">01. Ổn định đường huyết</span>
                    <p className="text-xs text-slate-600">Giảm chỉ số HbA1c sau 4-6 tuần sử dụng đều đặn.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-[#108B67]">02. Hỗ trợ tiêu hóa & mỡ máu</span>
                    <p className="text-xs text-slate-600">Tan mỡ thừa, thanh lọc độc tố đường ruột và gan.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-[#108B67]">03. Vị thơm thanh dễ uống</span>
                    <p className="text-xs text-slate-600">Hương thơm mộc dịu, hậu ngọt tự nhiên, không chất bảo quản.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Nguồn gốc & Thành phần 100% Thuần Khiết</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li><strong>Búp ổi non (65%):</strong> Thu hoạch thủ công vào sáng sớm, sấy lạnh thăng hoa giữ trọn 98% vi chất.</li>
                  <li><strong>Dây thìa canh chuẩn hóa (25%):</strong> Hoạt chất Gymnemic Acid ngăn cản hấp thu đường tại ruột non.</li>
                  <li><strong>Cỏ ngọt tự nhiên (10%):</strong> Tạo vị ngọt thanh nhẹ dịu không sinh calo, an toàn tuyệt đối cho người tiểu đường.</li>
                </ul>
              </div>
            )}

            {activeTab === 'guide' && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Hướng dẫn pha trà chuẩn vị thơm ngon</h3>
                <ol className="list-decimal pl-5 space-y-2 text-slate-600">
                  <li>Cho 1 túi trà lọc (hoặc 5-7g búp ổi) vào bình hãm.</li>
                  <li>Rót 300ml - 500ml nước sôi ở nhiệt độ 85°C - 90°C.</li>
                  <li>Ủ trà trong 5 - 7 phút để các dưỡng chất chiết xuất hoàn toàn.</li>
                  <li>Uống ấm hoặc cho vào ngăn mát tủ lạnh dùng cả ngày thay nước lọc.</li>
                </ol>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="font-bold text-slate-900">Phản hồi từ khách hàng thực tế</div>
                  <span className="text-xs text-slate-500">100% Khách mua qua Sàn TMĐT đã xác thực</span>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: 'Bác Trần Văn Ba (62 tuổi, Hà Nội)',
                      rating: 5,
                      text: 'Tôi uống đến hộp thứ 3 rồi, đo đường huyết từ 8.4 hạ xuống còn 6.1 rất ổn định. Uống thay nước chè thơm lắm, ngủ cũng sâu giấc hơn hẳn.',
                      date: '2 ngày trước'
                    },
                    {
                      name: 'Chị Mai Lan (TP. Hồ Chí Minh)',
                      rating: 5,
                      text: 'Mua cho bố mẹ ở quê, ông bà khen tấm tắc. Đóng gói rất kỹ, bình quà tặng thủy tinh dày dặn đẹp tuyệt vời. Đã đặt thêm combo 4 hộp.',
                      date: 'Hôm qua'
                    }
                  ].map((rev, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">{rev.name}</span>
                        <span className="text-[11px] text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600">{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Dedicated Fast Checkout Form Section */}
        <section id="order-form" className="mt-16 max-w-2xl mx-auto bg-white rounded-3xl border-2 border-[#108B67]/30 p-6 sm:p-8 shadow-xl">
          <div className="text-center space-y-2 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#108B67] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Form Đặt Hàng Nhanh Sàn TMĐT
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Điền Thông Tin Nhận Hàng (COD)
            </h2>
            <p className="text-xs text-slate-500">
              Nhận hàng tận nhà mới thanh toán · Miễn phí đổi trả trong 7 ngày
            </p>
          </div>

          {orderSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 bg-[#108B67] text-white rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Đặt hàng thành công!</h3>
              <p className="text-xs text-slate-600">
                Cảm ơn quý khách <strong>{customerName}</strong>! Đơn hàng ({currentBundle.name}) với tổng tiền <strong>{currentBundle.price.toLocaleString('vi-VN')}₫</strong> đang được đóng gói và giao đến: <br />
                <span className="text-slate-800 font-medium">{customerAddress}</span> (SĐT: {customerPhone}).
              </p>
              <button
                onClick={() => {
                  setOrderSuccess(false);
                  setCustomerName('');
                  setCustomerPhone('');
                  setCustomerAddress('');
                }}
                className="px-6 py-2.5 text-xs font-bold text-[#108B67] bg-white border border-[#108B67] rounded-xl hover:bg-emerald-50 transition-colors"
              >
                Đặt thêm đơn khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Gói sản phẩm đã chọn:
                </label>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex justify-between items-center font-medium">
                  <span className="font-bold text-slate-900">{currentBundle.name}</span>
                  <span className="font-black text-[#EE4D2D] tabular-nums">
                    {currentBundle.price.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên người nhận *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full pl-9 pr-3 py-2.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#108B67]/30 focus:border-[#108B67]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Số điện thoại nhận hàng *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Ví dụ: 0987 654 321"
                    className="w-full pl-9 pr-3 py-2.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#108B67]/30 focus:border-[#108B67]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Địa chỉ giao hàng chi tiết *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    required
                    rows={2}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Số nhà, tên đường, Phường/Xã, Quận/Huyện, Tỉnh/TP..."
                    className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#108B67]/30 focus:border-[#108B67]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ghi chú cho shipper (tùy chọn)
                </label>
                <input
                  type="text"
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="Giao giờ hành chính, gọi trước khi đến..."
                  className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#108B67]/30 focus:border-[#108B67]"
                />
              </div>

              {/* Payment Summary */}
              <div className="bg-slate-50 p-4 rounded-xl space-y-1.5 text-xs border border-slate-100">
                <div className="flex justify-between text-slate-500">
                  <span>Tiền hàng:</span>
                  <span className="tabular-nums font-mono">{currentBundle.price.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Phí vận chuyển:</span>
                  <span className="text-[#108B67] font-bold">MIỄN PHÍ</span>
                </div>
                {savedVoucher && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Mã giảm giá ưu đãi:</span>
                    <span>-25.000₫</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-sm text-slate-900">
                  <span>Tổng thanh toán khi nhận hàng:</span>
                  <span className="text-[#EE4D2D] tabular-nums font-mono text-base">
                    {(currentBundle.price - (savedVoucher ? 25000 : 0)).toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 text-sm font-black text-white bg-[#EE4D2D] hover:bg-[#D9381E] rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-98 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'ĐANG XỬ LÝ ĐƠN HÀNG...' : 'XÁC NHẬN ĐẶT HÀNG — THANH TOÁN COD'}
              </button>
            </form>
          )}
        </section>
      </main>

      {/* Floating Bottom Sticky Bar for Mobile Conversion */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <div className="text-[10px] text-slate-400">Giá khuyến mại:</div>
          <div className="text-base font-black text-[#EE4D2D] tabular-nums">
            {currentBundle.price.toLocaleString('vi-VN')}₫
          </div>
        </div>

        <a
          href="#order-form"
          className="flex-1 py-3 px-4 text-xs font-black text-white bg-[#108B67] rounded-xl text-center shadow-md active:scale-95"
        >
          MUA NGAY (COD)
        </a>
      </div>
    </div>
  );
};
