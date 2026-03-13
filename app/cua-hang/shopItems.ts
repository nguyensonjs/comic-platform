/**
 * Dữ liệu vật phẩm Cửa hàng (Linh Bảo Các).
 * Hiện tại hardcode; sau có thể thay bằng fetch từ API (env NEXT_PUBLIC_SHOP_ITEMS_URL).
 */
export type ShopCategory = 'all' | 'dan' | 'vu-khi' | 'trang-bi';

export type ShopItem = {
  id: number;
  name: string;
  category: 'dan' | 'vu-khi' | 'trang-bi';
  price: number;
  rarity: string;
  icon: string;
  color: string;
  effect: string;
  stock: number;
};

/** Tab danh mục: thứ tự và cặp label–icon cố định để khớp với hình ảnh */
export const shopCategories: { id: ShopCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'Tất cả', icon: '🏪' },
  { id: 'dan', label: 'Đan dược', icon: '⚗️' },       // thuốc / linh dược
  { id: 'vu-khi', label: 'Vũ khí', icon: '🗡️' },      // kiếm, đao, cung
  { id: 'trang-bi', label: 'Trang bị', icon: '🛡️' }, // giáp, áo, nhẫn
];

export const shopItems: ShopItem[] = [
  { id: 1, name: 'Tụ Linh Đan', category: 'dan', price: 200, rarity: 'Phổ thông', icon: '⚗️', color: 'from-green-700 to-emerald-800', effect: 'Tăng linh lực +500 ngay lập tức', stock: 99 },
  { id: 2, name: 'Hoàn Nguyệt Đan', category: 'dan', price: 500, rarity: 'Hiếm', icon: '🌙', color: 'from-blue-700 to-indigo-800', effect: 'Bứt phá cảnh giới, tăng linh lực +30%', stock: 20 },
  { id: 3, name: 'Hóa Thần Đan', category: 'dan', price: 1200, rarity: 'Sử thi', icon: '💜', color: 'from-purple-700 to-violet-800', effect: 'Đột phá Hóa Thần cảnh, +100% linh lực', stock: 5 },
  { id: 4, name: 'Cửu Chuyển Kim Đan', category: 'dan', price: 3000, rarity: 'Thần thoại', icon: '👑', color: 'from-amber-600 to-orange-700', effect: 'Tiên dược thiên cổ, có thể vượt kiếp', stock: 1 },
  { id: 5, name: 'Huyền Thiết Kiếm', category: 'vu-khi', price: 400, rarity: 'Hiếm', icon: '🗡️', color: 'from-slate-600 to-slate-800', effect: 'Linh lực công kích +800', stock: 15 },
  { id: 6, name: 'Hỏa Long Thương', category: 'vu-khi', price: 900, rarity: 'Sử thi', icon: '⚔️', color: 'from-orange-700 to-red-800', effect: 'Hỏa thuộc tính, thiêu đốt kẻ thù', stock: 8 },
  { id: 7, name: 'Vô Danh Kiếm', category: 'vu-khi', price: 2500, rarity: 'Thần thoại', icon: '✨', color: 'from-violet-700 to-purple-900', effect: 'Kiếm ý vô hình, vô địch thiên hạ', stock: 2 },
  { id: 8, name: 'Thiên Lôi Cung', category: 'vu-khi', price: 1800, rarity: 'Sử thi', icon: '⚡', color: 'from-yellow-600 to-amber-800', effect: 'Lôi thuộc tính cực mạnh, tầm xa', stock: 3 },
  { id: 9, name: 'Huyền Giáp', category: 'trang-bi', price: 600, rarity: 'Hiếm', icon: '🛡️', color: 'from-slate-700 to-blue-900', effect: 'Phòng thủ linh lực +1200', stock: 10 },
  { id: 10, name: 'Tiên Phụng Bào', category: 'trang-bi', price: 1500, rarity: 'Sử thi', icon: '🦅', color: 'from-pink-700 to-rose-900', effect: 'Tốc độ +50%, tàng hình 5 giây', stock: 4 },
  { id: 11, name: 'Long Vũ Hộ Giáp', category: 'trang-bi', price: 4000, rarity: 'Thần thoại', icon: '🐉', color: 'from-teal-700 to-cyan-900', effect: 'Bất tử trong 10 giây khi HP = 0', stock: 1 },
  { id: 12, name: 'Ngọc Linh Nhẫn', category: 'trang-bi', price: 350, rarity: 'Phổ thông', icon: '💍', color: 'from-green-700 to-teal-800', effect: 'Thu thêm 10% linh thạch từ nhiệm vụ', stock: 50 },
];
