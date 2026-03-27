// ─────────────────────────────────────────────────────────────────────────────
// NGÂN HÀNG CÂU HỎI TOÁN 12 – Đầy đủ 3 phần, 12 chủ đề
// ─────────────────────────────────────────────────────────────────────────────

export type QBankEntry = {
  mucDo: 'NB' | 'TH' | 'VD' | 'VDC';
  phan: 'nlc' | 'ds' | 'tln';
  noiDung: string;
  dapAn: string;
};

export const QUESTION_BANK: Record<string, QBankEntry[]> = {

  /* ── DEFAULT (fallback) ──────────────────────────────────────────────── */
  'default': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Đạo hàm của y = x³ – 3x + 2:\nA. y\' = 3x² – 3\u2003B. y\' = 3x² + 3\u2003C. y\' = x² – 3\u2003D. y\' = 3x²', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] ∫2x dx bằng:\nA. x² + C\u2003B. 2 + C\u2003C. x² / 2 + C\u2003D. 2x + C', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Hàm y = x³ – 3x² + 2 đạt cực đại tại:\nA. x = 0\u2003B. x = 2\u2003C. x = –1\u2003D. x = 1', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính ∫₀¹ (2x + 1) dx.', dapAn:'2' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính đạo hàm y\' của y = x⁴ – 2x² + 1 tại x = 1.', dapAn:'0' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm cực trị của hàm số y = x³ – 3x.', dapAn:'Cực đại tại x=–1 (y=2); Cực tiểu tại x=1 (y=–2)' },
    { mucDo:'VD', phan:'tln', noiDung:'Diện tích hình phẳng giới hạn bởi y = x² và y = 2x.', dapAn:'4/3' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm m để phương trình x³ – 3x + m = 0 có 3 nghiệm phân biệt.', dapAn:'–2 < m < 2' },
    { mucDo:'VDC', phan:'tln', noiDung:'Thể tích vật tròn xoay: y=√x, y=0, x=1 quay quanh Ox.', dapAn:'V = π/2' },
    { mucDo:'NB', phan:'ds', noiDung:'Đ/S về đạo hàm và nguyên hàm:\na) [NB] (xⁿ)\' = nxⁿ⁻¹ với mọi n.\nb) [TH] ∫x² dx = x³/3 + C.\nc) [TH] Nếu f\'(x₀)=0 thì x₀ là cực trị.\nd) [VD] ∫₀¹ 2x dx = 1.', dapAn:'Đ Đ S Đ' },
  ],

  /* ── HÀM SỐ ─────────────────────────────────────────────────────────── */
  'hàm số': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Hàm y = x³ – 3x đồng biến trên:\nA. (–∞;–1) và (1;+∞)\u2003B. (–1;1)\u2003C. (0;+∞)\u2003D. (–∞;0)', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Tiệm cận ngang của y = (2x+1)/(x–1):\nA. y=2\u2003B. y=1\u2003C. y=–1\u2003D. Không có', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Hàm y = x⁴ – 2x² đạt cực tiểu tại:\nA. x = ±1\u2003B. x = 0\u2003C. x = –1\u2003D. x = 1', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Số cực trị của y = x⁴ – 2x² + 1:\nA. 3\u2003B. 1\u2003C. 2\u2003D. 0', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Giá trị lớn nhất của y = –x² + 4x – 1:\nA. 3\u2003B. 4\u2003C. 5\u2003D. 2', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tìm khoảng đồng biến của y = x³ – 3x² – 9x + 2.', dapAn:'(–∞;–1) và (3;+∞)' },
    { mucDo:'TH', phan:'tln', noiDung:'Tìm tiệm cận của y = (x+2)/(x–3).', dapAn:'TCĐ: x=3; TCN: y=1' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm m để hàm y = x³ – 3x + m có cực đại bằng 5.', dapAn:'m = 3' },
    { mucDo:'VD', phan:'tln', noiDung:'Biện luận số cực trị của y = x⁴ – 2mx² theo m.', dapAn:'m>0: 3 cực trị; m≤0: 1 cực trị' },
    { mucDo:'VDC', phan:'tln', noiDung:'Biện luận theo m số nghiệm của x³ – 3x – m = 0.', dapAn:'m<–2 hoặc m>2: 1 nghiệm; m=±2: 2 nghiệm; –2<m<2: 3 nghiệm' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm tất cả m để đường thẳng y = m cắt đồ thị y = x³ – 3x tại 3 điểm phân biệt.', dapAn:'–2 < m < 2' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho y = x³ – 3x + 2. Đ/S:\na) [NB] Hàm có 2 điểm cực trị.\nb) [TH] y\'(0) = –3.\nc) [TH] Hàm đồng biến trên (1;+∞).\nd) [VD] Giá trị cực đại bằng 4.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── ĐẠO HÀM ────────────────────────────────────────────────────────── */
  'đạo hàm': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Đạo hàm của y = sin x:\nA. cos x\u2003B. –cos x\u2003C. –sin x\u2003D. tan x', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Đạo hàm của y = eˣ:\nA. eˣ\u2003B. xeˣ⁻¹\u2003C. ln x\u2003D. eˣ + 1', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Đạo hàm của y = ln x:\nA. 1/x\u2003B. x\u2003C. 1/(ln x)\u2003D. eˣ', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Đạo hàm của y = x²·eˣ:\nA. eˣ(x² + 2x)\u2003B. 2xeˣ\u2003C. x²eˣ\u2003D. 2x', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Phương trình tiếp tuyến đồ thị y=x² tại (1,1):\nA. y = 2x – 1\u2003B. y = x\u2003C. y = 2x + 1\u2003D. y = x + 1', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:"Tính y' biết y = (x² + 1)·sin x.", dapAn:"y' = 2x·sin x + (x² + 1)·cos x" },
    { mucDo:'TH', phan:'tln', noiDung:'Tính đạo hàm y = ln(x² + 1).', dapAn:"y' = 2x/(x² + 1)" },
    { mucDo:'VD', phan:'tln', noiDung:'Viết phương trình tiếp tuyến của y = x³ – 2x tại x = 1.', dapAn:'y = x – 2' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm x để tiếp tuyến của y = x³ – 3x² + 1 song song y = 9x.', dapAn:'x = –1 hoặc x = 3' },
    { mucDo:'VDC', phan:'tln', noiDung:'Chứng minh f(x) = x³ + 3x + 1 đồng biến trên ℝ.', dapAn:"f'(x) = 3x² + 3 > 0 ∀x ∈ ℝ ⇒ đồng biến" },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm tất cả tiếp tuyến của y = x³ – x qua điểm O(0,0).', dapAn:'y = –x và y = 2x' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho y = x³ – 6x. Đ/S:\na) [NB] y\'(0) = –6.\nb) [TH] Tiếp tuyến tại (1;–5): y = –3x – 2.\nc) [TH] Hàm ĐB trên (–∞;–√2) và (√2;+∞).\nd) [VD] Tại x=2, hệ số góc tiếp tuyến bằng 6.', dapAn:'Đ Đ Đ S' },
  ],

  /* ── NGUYÊN HÀM ─────────────────────────────────────────────────────── */
  'nguyên hàm': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] ∫(3x² – 2x + 1) dx bằng:\nA. x³ – x² + x + C\u2003B. 6x – 2 + C\u2003C. x³ + x + C\u2003D. 3x³ – x² + C', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] ∫sin x dx bằng:\nA. –cos x + C\u2003B. cos x + C\u2003C. –sin x + C\u2003D. sin x + C', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] ∫eˣ dx bằng:\nA. eˣ + C\u2003B. xeˣ + C\u2003C. eˣ/x + C\u2003D. eˣ⁻¹ + C', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] ∫(x + 1)² dx bằng:\nA. (x+1)³/3 + C\u2003B. 2(x+1) + C\u2003C. x² + x + C\u2003D. x³/3 + x + C', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] F(x) nguyên hàm f = 2x, F(0) = 3. Thì F(x) bằng:\nA. x² + 3\u2003B. x² – 3\u2003C. 2x² + 3\u2003D. x² + 1', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính ∫x·eˣ dx bằng phương pháp từng phần.', dapAn:'xeˣ – eˣ + C' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính ∫x·cos x dx bằng phương pháp từng phần.', dapAn:'x·sin x + cos x + C' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính ∫x·ln x dx.', dapAn:'x²·ln x/2 – x²/4 + C' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính ∫sin²x dx bằng công thức hạ bậc.', dapAn:'x/2 – sin(2x)/4 + C' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính ∫₁ᵉ x·ln x dx.', dapAn:'(e² + 1)/4' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính ∫₀^(π/2) x·cos x dx.', dapAn:'π/2 – 1' },
    { mucDo:'NB', phan:'ds', noiDung:'Đ/S về công thức nguyên hàm:\na) [NB] ∫1/x dx = ln|x| + C.\nb) [TH] ∫cos x dx = sin x + C.\nc) [TH] ∫(f+g)dx = ∫f dx – ∫g dx.\nd) [VD] ∫₀¹ eˣ dx = e – 1.', dapAn:'Đ Đ S Đ' },
  ],

  /* ── TÍCH PHÂN ──────────────────────────────────────────────────────── */
  'tích phân': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] ∫₀² 2x dx bằng:\nA. 4\u2003B. 2\u2003C. 8\u2003D. 0', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Nếu ∫ₐᵇ f dx = 5 thì ∫ₐᵇ 3f dx bằng:\nA. 15\u2003B. 5\u2003C. 8\u2003D. 2', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] ∫₀^(π/2) cos x dx bằng:\nA. 1\u2003B. 0\u2003C. –1\u2003D. π/2', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Diện tích hình y=x² và Ox từ 0 đến 2:\nA. 8/3\u2003B. 4\u2003C. 2\u2003D. 16/3', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] ∫₋₁¹ (x³ + x) dx bằng:\nA. 0\u2003B. 2\u2003C. –2\u2003D. 4', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính ∫₁² (x² – 2x + 1) dx.', dapAn:'1/3' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính ∫₀^π sin x dx.', dapAn:'2' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính diện tích hình phẳng giới hạn y = x² và y = x.', dapAn:'1/6' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính ∫₀¹ x√(x²+1) dx bằng đặt t = x²+1.', dapAn:'(2√2 – 1)/3' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính thể tích khi y=x², y=0, x=2 quay quanh Ox.', dapAn:'V = 32π/5' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính ∫₀^(π/4) tan²x dx.', dapAn:'1 – π/4' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho ∫₀²f dx=3, ∫₀²g dx=5. Đ/S:\na) [NB] ∫₀²(f+g)dx = 8.\nb) [TH] ∫₀² 2f dx = 6.\nc) [TH] ∫₂⁰ f dx = –3.\nd) [VD] ∫₀² f·g dx = 15.', dapAn:'Đ Đ Đ S' },
  ],

  /* ── ỨNG DỤNG TÍCH PHÂN ─────────────────────────────────────────────── */
  'ứng dụng tích phân': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Diện tích hình phẳng giới hạn y=f(x), Ox, x=a, x=b:\nA. S = ∫ₐᵇ|f(x)|dx\u2003B. S = ∫ₐᵇf(x)dx\u2003C. S = |∫ₐᵇf(x)dx|\u2003D. S = ∫ₐᵇf\'(x)dx', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Thể tích vật tròn xoay quanh Ox: V = π∫ₐᵇ___dx. Điền vào:\nA. f²(x)\u2003B. f(x)\u2003C. |f(x)|\u2003D. f\'(x)', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Diện tích hình phẳng giữa y=x² và y=x:\nA. 1/6\u2003B. 1/3\u2003C. 1/2\u2003D. 1', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Thể tích: y=x, y=0, x=2 quay Ox:\nA. 8π/3\u2003B. 4π\u2003C. 2π\u2003D. 4π/3', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính diện tích hình phẳng giới hạn y=x² và y=4.', dapAn:'32/3' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính diện tích hình phẳng: y=sin x, Ox, từ 0 đến π.', dapAn:'2' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính thể tích: y=x²+1, y=0, x=0, x=1 quay Ox.', dapAn:'28π/15' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính diện tích hình phẳng giới hạn y=x³ và y=x.', dapAn:'1/2' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính thể tích: y=√x, y=0, x=4 quay Ox.', dapAn:'8π' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm a > 0 sao cho ∫₀ᵃ (2x+1)dx = 6.', dapAn:'a = 2' },
    { mucDo:'NB', phan:'ds', noiDung:'Đ/S về diện tích, thể tích:\na) [NB] ∫₀¹ x² dx = 1/3.\nb) [TH] S giữa y=x² và y=x là 1/6.\nc) [TH] Thể tích y=x, x∈[0,1] quay Ox: V=π/3.\nd) [VD] S giữa y=x³ và Ox từ –1→1: S=1/2.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── SỐ PHỨC ────────────────────────────────────────────────────────── */
  'số phức': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Số phức z = 3 + 4i có mô-đun:\nA. 5\u2003B. 7\u2003C. 25\u2003D. 1', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Số phức liên hợp của z = 2 – 3i:\nA. 2 + 3i\u2003B. –2 + 3i\u2003C. –2 – 3i\u2003D. 3 – 2i', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] i⁴ bằng:\nA. 1\u2003B. –1\u2003C. i\u2003D. –i', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] (2+3i)(1–i) bằng:\nA. 5+i\u2003B. 5–i\u2003C. –1+5i\u2003D. 2+3', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Nghiệm của z² + 4 = 0:\nA. z = ±2i\u2003B. z = ±2\u2003C. z = 2i\u2003D. z = –2i', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính z = (1+i)/(1–i). Biểu diễn dạng a+bi.', dapAn:'z = i' },
    { mucDo:'TH', phan:'tln', noiDung:'Tìm z=a+bi biết z – 2z̄ = 3 + i.', dapAn:'z = –3 – i' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính (1+i)⁸.', dapAn:'16' },
    { mucDo:'VD', phan:'tln', noiDung:'z₁=1+i, z₂=√3–i. Tính |z₁·z₂| và arg(z₁·z₂).', dapAn:'|z₁z₂|=2√2; arg=5π/12' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm tất cả z thỏa |z–1|=|z+i| và |z|=√2.', dapAn:'z=1+i hoặc z=–1–i' },
    { mucDo:'VDC', phan:'tln', noiDung:'Giải phương trình z² – (1+3i)z + (–2+i) = 0.', dapAn:'z₁=2; z₂=–1+3i' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho z = 3 – 4i. Đ/S:\na) [NB] |z| = 5.\nb) [TH] z + z̄ = 6.\nc) [TH] z·z̄ = 25.\nd) [VD] z² = –7 – 24i.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── PHƯƠNG TRÌNH MẶT PHẲNG ─────────────────────────────────────────── */
  'phương trình mặt phẳng': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Mặt phẳng qua O, pháp tuyến n=(1,2,3):\nA. x+2y+3z=0\u2003B. x–2y+3z=0\u2003C. 2x+y+3z=0\u2003D. x+2y–3z=0', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Mặt phẳng Oxz có phương trình:\nA. y = 0\u2003B. x = 0\u2003C. z = 0\u2003D. x+y+z=0', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Khoảng cách từ O đến (P): 2x–y+2z–6=0:\nA. 2\u2003B. 3\u2003C. 1\u2003D. 6', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Hai mp x+2y–z=1 và 2x+4y–2z=3 quan hệ:\nA. Song song\u2003B. Cắt nhau\u2003C. Trùng nhau\u2003D. Vuông góc', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Pháp vectơ của mp 3x–y+2z+5=0:\nA. (3,–1,2)\u2003B. (3,1,2)\u2003C. (–3,1,–2)\u2003D. (1,3,2)', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Viết pt mặt phẳng qua A(1,0,–1), B(2,1,0), C(0,–1,1).', dapAn:'x – y – z = 0' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính khoảng cách từ A(2,3,–1) đến mp x–2y+2z+3=0.', dapAn:'4/3' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm hình chiếu của M(1,2,3) xuống mp 2x–y+z=6.', dapAn:'H(3,1,4)' },
    { mucDo:'VD', phan:'tln', noiDung:'Viết pt mp chứa A(1,0,0), B(0,1,0) song song với Oz.', dapAn:'x + y = 1' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm mp đối xứng với (P): x+y+z=1 qua (Q): x+y+z=3.', dapAn:'x+y+z = 5' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm điểm M trên mp (P): x+y+z=1 gần A(3,0,0) nhất.', dapAn:'M=(4/3, –1/3, –1/3)' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho (P): 2x–y+2z–6=0. Đ/S:\na) [NB] Véc-tơ pháp n=(2,–1,2).\nb) [TH] d(O,(P))=2.\nc) [TH] (P) cắt cả 3 trục tọa độ.\nd) [VD] A(3,0,0) thuộc (P).', dapAn:'Đ Đ Đ S' },
  ],

  /* ── PHƯƠNG TRÌNH ĐƯỜNG THẲNG ──────────────────────────────────────── */
  'phương trình đường thẳng': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Đường thẳng qua A(1,0,2), vtcp u=(1,–1,2):\nA. x=1+t, y=–t, z=2+2t\u2003B. x=t, y=–t, z=2t\u2003C. x=1, y=–1, z=2\u2003D. x=1+t, y=2t, z=t', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Đường thẳng (x–1)/2=(y+1)/1=(z–2)/3 có vtcp:\nA. (2,1,3)\u2003B. (1,–1,2)\u2003C. (–2,1,3)\u2003D. (3,1,2)', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Hai đường thẳng chéo nhau khi:\nA. Không đồng phẳng\u2003B. Song song\u2003C. Cắt nhau\u2003D. Cùng phương', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] d₁: x/1=y/2=z/3 và d₂: x/2=y/4=z/6 quan hệ:\nA. Song song\u2003B. Trùng nhau\u2003C. Cắt nhau\u2003D. Chéo nhau', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Điểm B(3,0,1) có thuộc d: x=1+t, y=t, z=2–t không?\nA. Có (t=2)\u2003B. Không\u2003C. t=1\u2003D. t=3', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Viết pt đường thẳng qua A(1,2,3) và B(3,0,1).', dapAn:'(x–1)/2=(y–2)/(–2)=(z–3)/(–2)' },
    { mucDo:'TH', phan:'tln', noiDung:'Tìm giao điểm d: x=1+t, y=t, z=2–t với mp x+y+z=4.', dapAn:'M(2,1,1)' },
    { mucDo:'VD', phan:'tln', noiDung:'Viết pt đường thẳng qua A(2,1,–1) vuông góc mp x–2y+z=5.', dapAn:'(x–2)/1=(y–1)/(–2)=(z+1)/1' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính khoảng cách từ M(1,0,0) đến d: x=t, y=1+t, z=t.', dapAn:'√(2/3)' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính khoảng cách 2 đường chéo nhau: d₁: x=1+t, y=t, z=0 và d₂: x=0, y=s, z=1+s.', dapAn:'1/√2' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm mp chứa d₁ và song song d₂ (xem VD trên).', dapAn:'x – y – z = 0' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho d: x=2+t, y=1–2t, z=3t. Đ/S:\na) [NB] vtcp u=(1,–2,3).\nb) [TH] A(2,1,0) thuộc d khi t=0.\nc) [TH] d vuông góc mp Oyz.\nd) [VD] d cắt mp xy tại (5/3,–1/3,0).', dapAn:'Đ Đ S Đ' },
  ],

  /* ── PHƯƠNG TRÌNH MẶT CẦU ──────────────────────────────────────────── */
  'phương trình mặt cầu': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Mặt cầu tâm I(1,2,3) bán kính R=5:\nA. (x–1)²+(y–2)²+(z–3)²=25\u2003B. x²+y²+z²=25\u2003C. (x+1)²+(y+2)²+(z+3)²=25\u2003D. (x–1)²=25', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Mặt cầu x²+y²+z²–2x–4y+5=0 có tâm:\nA. (1,2,0)\u2003B. (–1,–2,0)\u2003C. (2,4,0)\u2003D. (0,0,0)', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Điều kiện pt x²+y²+z²+ax+by+cz+d=0 là mặt cầu:\nA. a²+b²+c²–4d > 0\u2003B. d < 0\u2003C. a,b,c > 0\u2003D. d = 0', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Bán kính (S): x²+y²+z²–2x+4y–4z–10=0:\nA. 4\u2003B. 3\u2003C. 5\u2003D. √10', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Điểm A(1,–1,0) so với (S): I(0,0,0), R=2:\nA. Trong (IA=√2<2)\u2003B. Ngoài\u2003C. Trên mặt cầu\u2003D. IA=R', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính bán kính và tâm: x²+y²+z²–4x+6y–2z+5=0.', dapAn:'I(2,–3,1); R=3' },
    { mucDo:'TH', phan:'tln', noiDung:'Viết pt mặt cầu đường kính AB, A(1,2,–1), B(3,0,3).', dapAn:'(x–2)²+(y–1)²+(z–1)²=9' },
    { mucDo:'VD', phan:'tln', noiDung:'Viết pt mặt cầu ngoại tiếp tứ diện O,A(2,0,0),B(0,2,0),C(0,0,2).', dapAn:'x²+y²+z²–2x–2y–2z=0' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm vị trí tương đối (S): x²+y²+z²=9 và (P): x+y+z=√3.', dapAn:'d(I,(P))=1 < 3=R ⇒ (P) cắt (S)' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm mp tiếp xúc (S): I(1,2,3) R=3 tại M(1,2,6).', dapAn:'z = 6' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm điểm trên (S): x²+y²+z²=14 gần A(3,2,1) nhất.', dapAn:'M = (3/√14·√14, …) = A·(√14/IA)' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho (S): x²+y²+z²–4x+2y–4=0. Đ/S:\na) [NB] Tâm I=(2,–1,0).\nb) [TH] R=3.\nc) [TH] O(0,0,0) nằm trong (S).\nd) [VD] A(4,–1,0) thuộc (S).', dapAn:'Đ Đ Đ S' },
  ],

  /* ── XÁC SUẤT ───────────────────────────────────────────────────────── */
  'xác suất': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Tung 1 đồng xu, P(ngửa):\nA. 1/2\u2003B. 1\u2003C. 0\u2003D. 1/4', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Gieo 1 xúc xắc, P(số chẵn):\nA. 1/2\u2003B. 1/3\u2003C. 1/6\u2003D. 2/3', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Nếu A,B xung khắc thì P(A∪B) bằng:\nA. P(A)+P(B)\u2003B. P(A)·P(B)\u2003C. 0\u2003D. 1', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Hộp 3 đỏ 2 xanh. Rút 2 bi, P(cả 2 đỏ):\nA. 3/10\u2003B. 1/5\u2003C. 2/5\u2003D. 1/2', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] P(A)=0,6; P(B)=0,5; A⊥B. P(A∩B):\nA. 0,3\u2003B. 0,8\u2003C. 0,1\u2003D. 0,55', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tung 3 đồng xu. Tính P(đúng 2 mặt ngửa).', dapAn:'3/8' },
    { mucDo:'TH', phan:'tln', noiDung:'Gieo 2 xúc xắc. Tính P(tổng=7).', dapAn:'1/6' },
    { mucDo:'VD', phan:'tln', noiDung:'Hộp 5 đỏ 3 xanh, rút 2 bi không hoàn lại. P(1 đỏ 1 xanh).', dapAn:'15/28' },
    { mucDo:'VD', phan:'tln', noiDung:'P(A)=0,4; P(B|A)=0,5; P(B|Ā)=0,2. Tính P(B).', dapAn:'0,32' },
    { mucDo:'VDC', phan:'tln', noiDung:'Với P(A)=0,4, P(B)=0,32. Tính P(A|B) theo Bayes.', dapAn:'0,625' },
    { mucDo:'VDC', phan:'tln', noiDung:'NM I: 60% SP phế 2%; NM II: 40% SP phế 3%. Lấy 1 phế phẩm. P(từ NM II).', dapAn:'1/2' },
    { mucDo:'NB', phan:'ds', noiDung:'Gieo 2 xúc xắc. Đ/S:\na) [NB] Không gian mẫu có 36 phần tử.\nb) [TH] P(tổng=2) = 1/36.\nc) [TH] P(tổng≤6) = 15/36.\nd) [VD] P(tổng=7 hoặc 11) = 2/9.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── XÁC SUẤT CÓ ĐIỀU KIỆN ─────────────────────────────────────────── */
  'xác suất có điều kiện': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] P(A|B) bằng:\nA. P(A∩B)/P(B)\u2003B. P(A)·P(B)\u2003C. P(A)+P(B)\u2003D. P(A∩B)/P(A)', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] A độc lập với B khi:\nA. P(A∩B)=P(A)·P(B)\u2003B. P(A|B)=P(A)+P(B)\u2003C. P(A∩B)=0\u2003D. A và B xung khắc', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] P(A)=0,5; P(B)=0,4; P(A∩B)=0,2. P(A|B)=?\nA. 0,5\u2003B. 0,4\u2003C. 0,8\u2003D. 0,2', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] P(A|B)=0,6; P(B)=0,5. P(A∩B)=?\nA. 0,3\u2003B. 0,1\u2003C. 0,8\u2003D. 1,1', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'P(A)=0,6; P(B)=0,5; P(A∩B)=0,3. Tính P(A|B) và P(B|A).', dapAn:'P(A|B)=0,6; P(B|A)=0,5' },
    { mucDo:'TH', phan:'tln', noiDung:'3 bi đỏ 2 bi xanh rút không hoàn lại. P(lần 2 đỏ | lần 1 đỏ).', dapAn:'1/2' },
    { mucDo:'VD', phan:'tln', noiDung:'P(A)=0,4; P(B|A)=0,5; P(B|Ā)=0,2. Tính P(A|B) theo Bayes.', dapAn:'0,625' },
    { mucDo:'VD', phan:'tln', noiDung:'P(A)=0,4; P(B|A)=0,5; P(B|Ā)=0,2. Tính P(A∩B).', dapAn:'0,2' },
    { mucDo:'VDC', phan:'tln', noiDung:'NM I: 60% SP phế 2%; NM II: 40% SP phế 3%. P(từ NM II | phế phẩm).', dapAn:'0,5' },
    { mucDo:'VDC', phan:'tln', noiDung:'Dịch P=0,01; độ nhạy 95%, đặc hiệu 90%. P(bệnh|dương tính).', dapAn:'≈0,087' },
    { mucDo:'NB', phan:'ds', noiDung:'P(A)=0,4; P(B)=0,5; P(A∩B)=0,2. Đ/S:\na) [NB] P(A|B)=0,4.\nb) [TH] P(B|A)=0,5.\nc) [TH] A và B độc lập.\nd) [VD] P(A∪B)=0,7.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── TỔ HỢP – HOÁN VỊ ──────────────────────────────────────────────── */
  'tổ hợp': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] C₅² bằng:\nA. 10\u2003B. 20\u2003C. 5\u2003D. 15', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] Số hoán vị của 5 phần tử:\nA. 120\u2003B. 60\u2003C. 24\u2003D. 20', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] A₅² bằng:\nA. 20\u2003B. 10\u2003C. 5\u2003D. 15', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Chọn 3 học sinh từ 10:\nA. 120\u2003B. 720\u2003C. 30\u2003D. 10', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] Khai triển (x+1)⁵, hệ số x³:\nA. 10\u2003B. 5\u2003C. 1\u2003D. 15', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Xếp 5 học sinh vào 5 ghế hàng ngang. Số cách.', dapAn:'5! = 120' },
    { mucDo:'TH', phan:'tln', noiDung:'4 nam 3 nữ, chọn 2 người có ít nhất 1 nữ.', dapAn:'15' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm hệ số x⁴ trong (2x–1)⁶.', dapAn:'60' },
    { mucDo:'VD', phan:'tln', noiDung:'Giải phương trình Cₙ² = 15.', dapAn:'n = 6' },
    { mucDo:'VDC', phan:'tln', noiDung:'Số tự nhiên 4 chữ số khác nhau từ {1,2,3,4,5}.', dapAn:'5×4×3×2 = 120' },
    { mucDo:'VDC', phan:'tln', noiDung:'Số hạng không chứa x trong (x + 1/x²)⁹.', dapAn:'C₉³ = 84' },
    { mucDo:'NB', phan:'ds', noiDung:'Về tổ hợp hoán vị. Đ/S:\na) [NB] P₄ = 4! = 24.\nb) [TH] C₆³ = 20.\nc) [TH] Aₙᵏ = k!·Cₙᵏ.\nd) [VD] C₅⁰+C₅¹+…+C₅⁵ = 32.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── DÃY SỐ ─────────────────────────────────────────────────────────── */
  'dãy số': [
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] CSC 2,5,8,11,... có công sai d:\nA. 3\u2003B. 2\u2003C. 5\u2003D. 1', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] CSN 2,6,18,54,... có công bội q:\nA. 3\u2003B. 2\u2003C. 4\u2003D. 6', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'[NHẬN BIẾT] CSC u₁=3, d=2 thì u₅:\nA. 11\u2003B. 13\u2003C. 10\u2003D. 12', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] CSN u₁=2, q=3. Tổng 4 số hạng đầu:\nA. 80\u2003B. 60\u2003C. 40\u2003D. 100', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'[THÔNG HIỂU] CSC u₁=1, u₁₀=19. Công sai d:\nA. 2\u2003B. 3\u2003C. 1\u2003D. 4', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'CSC u₁=1, u₂=4. Tìm u₁₀ và S₁₀.', dapAn:'u₁₀=28; S₁₀=145' },
    { mucDo:'TH', phan:'tln', noiDung:'CSN u₁=3, q=2. Tính S₆.', dapAn:'S₆ = 189' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm CSC có 3 số hạng đầu: tổng=9, tích=15.', dapAn:'1, 3, 5 (hoặc ngược lại)' },
    { mucDo:'VD', phan:'tln', noiDung:'Tổng n số hạng đầu CSC: Sₙ=n²+2n. Tìm d và u₁.', dapAn:'u₁=3; d=2' },
    { mucDo:'VDC', phan:'tln', noiDung:'Gửi 100 triệu, lãi suất 8%/năm kép. Sau 5 năm có bao nhiêu?', dapAn:'100×(1,08)⁵ ≈ 146,93 triệu' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tổng vô hạn CSN: u₁=6, q=1/3.', dapAn:'S = 9' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho CSC u₁=2, d=3. Đ/S:\na) [NB] u₅ = 14.\nb) [TH] S₄ = 26.\nc) [TH] S₁₀ = 155.\nd) [VD] uₙ = 3n – 1.', dapAn:'Đ Đ Đ Đ' },
  ],
};
