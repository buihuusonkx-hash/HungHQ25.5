// ─────────────────────────────────────────────────────────────────────────────
// NGÂN HÀNG CÂU HỎI TOÁN 12 – Công thức chuẩn LaTeX/KaTeX
// Dùng $...$ cho inline math, $$...$$ cho display math
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
    { mucDo:'NB', phan:'nlc', noiDung:'Đạo hàm của $y = x^3 - 3x + 2$ là:\nA. $y\' = 3x^2 - 3$\nB. $y\' = 3x^2 + 3$\nC. $y\' = x^2 - 3$\nD. $y\' = 3x^2$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'$\\int 2x\\,dx$ bằng:\nA. $x^2 + C$\nB. $2 + C$\nC. $\\dfrac{x^2}{2} + C$\nD. $2x + C$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Hàm $y = x^3 - 3x^2 + 2$ đạt cực đại tại:\nA. $x = 0$\nB. $x = 2$\nC. $x = -1$\nD. $x = 1$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $\\displaystyle\\int_0^1 (2x+1)\\,dx$.', dapAn:'$2$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $y\'$ của $y = x^4 - 2x^2 + 1$ tại $x = 1$.', dapAn:'$0$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm cực trị của hàm số $y = x^3 - 3x$.', dapAn:'Cực đại tại $x=-1$ ($y=2$); Cực tiểu tại $x=1$ ($y=-2$)' },
    { mucDo:'VD', phan:'tln', noiDung:'Diện tích hình phẳng giới hạn bởi $y = x^2$ và $y = 2x$.', dapAn:'$S = \\dfrac{4}{3}$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm $m$ để phương trình $x^3 - 3x + m = 0$ có 3 nghiệm phân biệt.', dapAn:'$-2 < m < 2$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Thể tích vật tròn xoay: $y=\\sqrt{x}$, $y=0$, $x=1$ quay quanh $Ox$.', dapAn:'$V = \\dfrac{\\pi}{2}$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho các mệnh đề về đạo hàm và nguyên hàm:\na) $(x^n)\' = nx^{n-1}$ với mọi $n$.\nb) $\\int x^2\\,dx = \\dfrac{x^3}{3} + C$.\nc) Nếu $f\'(x_0)=0$ thì $x_0$ là điểm cực trị.\nd) $\\displaystyle\\int_0^1 2x\\,dx = 1$.', dapAn:'Đ Đ S Đ' },
  ],

  /* ── HÀM SỐ ─────────────────────────────────────────────────────────── */
  'hàm số': [
    { mucDo:'NB', phan:'nlc', noiDung:'Hàm $y = x^3 - 3x$ đồng biến trên:\nA. $(-\\infty;-1)$ và $(1;+\\infty)$\nB. $(-1;1)$\nC. $(0;+\\infty)$\nD. $(-\\infty;0)$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Tiệm cận ngang của $y = \\dfrac{2x+1}{x-1}$:\nA. $y=2$\nB. $y=1$\nC. $y=-1$\nD. Không có', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Hàm $y = x^4 - 2x^2$ đạt cực tiểu tại:\nA. $x = \\pm 1$\nB. $x = 0$\nC. $x = -1$\nD. $x = 1$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Số cực trị của $y = x^4 - 2x^2 + 1$:\nA. $3$\nB. $1$\nC. $2$\nD. $0$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Giá trị lớn nhất của $y = -x^2 + 4x - 1$:\nA. $3$\nB. $4$\nC. $5$\nD. $2$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tìm khoảng đồng biến của $y = x^3 - 3x^2 - 9x + 2$.', dapAn:'$(-\\infty;-1)$ và $(3;+\\infty)$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tìm tiệm cận của $y = \\dfrac{x+2}{x-3}$.', dapAn:'TCĐ: $x=3$; TCN: $y=1$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm $m$ để hàm $y = x^3 - 3x + m$ có cực đại bằng $5$.', dapAn:'$m = 3$' },
    { mucDo:'VD', phan:'tln', noiDung:'Biện luận số cực trị của $y = x^4 - 2mx^2$ theo $m$.', dapAn:'$m>0$: 3 cực trị; $m\\leq 0$: 1 cực trị' },
    { mucDo:'VDC', phan:'tln', noiDung:'Biện luận theo $m$ số nghiệm của $x^3 - 3x - m = 0$.', dapAn:'$m<-2$ hoặc $m>2$: 1 nghiệm; $m=\\pm2$: 2 nghiệm; $-2<m<2$: 3 nghiệm' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm tất cả $m$ để đường thẳng $y=m$ cắt đồ thị $y=x^3-3x$ tại 3 điểm phân biệt.', dapAn:'$-2 < m < 2$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho $y = x^3 - 3x + 2$. Xác định Đúng/Sai:\na) Hàm có 2 điểm cực trị.\nb) $y\'(0) = -3$.\nc) Hàm đồng biến trên $(1;+\\infty)$.\nd) Giá trị cực đại bằng $4$.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── ĐẠO HÀM ────────────────────────────────────────────────────────── */
  'đạo hàm': [
    { mucDo:'NB', phan:'nlc', noiDung:'Đạo hàm của $y = \\sin x$:\nA. $\\cos x$\nB. $-\\cos x$\nC. $-\\sin x$\nD. $\\tan x$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Đạo hàm của $y = e^x$:\nA. $e^x$\nB. $xe^{x-1}$\nC. $\\ln x$\nD. $e^x+1$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Đạo hàm của $y = \\ln x$:\nA. $\\dfrac{1}{x}$\nB. $x$\nC. $\\dfrac{1}{\\ln x}$\nD. $e^x$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Đạo hàm của $y = x^2 \\cdot e^x$:\nA. $e^x(x^2+2x)$\nB. $2xe^x$\nC. $x^2e^x$\nD. $2x$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Phương trình tiếp tuyến đồ thị $y=x^2$ tại $(1;1)$:\nA. $y = 2x-1$\nB. $y = x$\nC. $y = 2x+1$\nD. $y = x+1$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $y\'$ biết $y = (x^2+1)\\sin x$.', dapAn:"$y' = 2x\\sin x + (x^2+1)\\cos x$" },
    { mucDo:'TH', phan:'tln', noiDung:'Tính đạo hàm $y = \\ln(x^2+1)$.', dapAn:"$y' = \\dfrac{2x}{x^2+1}$" },
    { mucDo:'VD', phan:'tln', noiDung:'Viết phương trình tiếp tuyến của $y = x^3 - 2x$ tại $x = 1$.', dapAn:'$y = x - 2$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm $x$ để tiếp tuyến của $y = x^3 - 3x^2 + 1$ song song $y = 9x$.', dapAn:'$x = -1$ hoặc $x = 3$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Chứng minh $f(x) = x^3 + 3x + 1$ đồng biến trên $\\mathbb{R}$.', dapAn:"$f'(x) = 3x^2+3 > 0\\;\\forall x\\in\\mathbb{R}$ $\\Rightarrow$ đồng biến" },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm tất cả tiếp tuyến của $y = x^3 - x$ qua $O(0;0)$.', dapAn:'$y = -x$ và $y = 2x$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho $y = x^3 - 6x$. Xác định Đúng/Sai:\na) $y\'(0) = -6$.\nb) Tiếp tuyến tại $(1;-5)$: $y = -3x-2$.\nc) Hàm ĐB trên $(-\\infty;-\\sqrt{2})$ và $(\\sqrt{2};+\\infty)$.\nd) Tại $x=2$, hệ số góc tiếp tuyến bằng $6$.', dapAn:'Đ Đ Đ S' },
  ],

  /* ── NGUYÊN HÀM ─────────────────────────────────────────────────────── */
  'nguyên hàm': [
    { mucDo:'NB', phan:'nlc', noiDung:'$\\int(3x^2-2x+1)\\,dx$ bằng:\nA. $x^3-x^2+x+C$\nB. $6x-2+C$\nC. $x^3+x+C$\nD. $3x^3-x^2+C$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'$\\int\\sin x\\,dx$ bằng:\nA. $-\\cos x+C$\nB. $\\cos x+C$\nC. $-\\sin x+C$\nD. $\\sin x+C$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'$\\int e^x\\,dx$ bằng:\nA. $e^x+C$\nB. $xe^x+C$\nC. $\\dfrac{e^x}{x}+C$\nD. $e^{x-1}+C$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$\\int(x+1)^2\\,dx$ bằng:\nA. $\\dfrac{(x+1)^3}{3}+C$\nB. $2(x+1)+C$\nC. $x^2+x+C$\nD. $\\dfrac{x^3}{3}+x+C$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$F(x)$ nguyên hàm $f=2x$, $F(0)=3$. Thì $F(x)$ bằng:\nA. $x^2+3$\nB. $x^2-3$\nC. $2x^2+3$\nD. $x^2+1$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $\\int x e^x\\,dx$ bằng phương pháp từng phần.', dapAn:'$xe^x - e^x + C$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $\\int x\\cos x\\,dx$ bằng phương pháp từng phần.', dapAn:'$x\\sin x + \\cos x + C$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính $\\int x\\ln x\\,dx$.', dapAn:'$\\dfrac{x^2\\ln x}{2} - \\dfrac{x^2}{4} + C$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính $\\int\\sin^2 x\\,dx$ bằng công thức hạ bậc.', dapAn:'$\\dfrac{x}{2} - \\dfrac{\\sin 2x}{4} + C$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính $\\displaystyle\\int_1^e x\\ln x\\,dx$.', dapAn:'$\\dfrac{e^2+1}{4}$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính $\\displaystyle\\int_0^{\\pi/2} x\\cos x\\,dx$.', dapAn:'$\\dfrac{\\pi}{2}-1$' },
    { mucDo:'NB', phan:'ds', noiDung:'Xác định Đúng/Sai:\na) $\\int\\dfrac{1}{x}\\,dx = \\ln|x|+C$.\nb) $\\int\\cos x\\,dx = \\sin x+C$.\nc) $\\int(f+g)\\,dx = \\int f\\,dx - \\int g\\,dx$.\nd) $\\displaystyle\\int_0^1 e^x\\,dx = e-1$.', dapAn:'Đ Đ S Đ' },
  ],

  /* ── TÍCH PHÂN ──────────────────────────────────────────────────────── */
  'tích phân': [
    { mucDo:'NB', phan:'nlc', noiDung:'$\\displaystyle\\int_0^2 2x\\,dx$ bằng:\nA. $4$\nB. $2$\nC. $8$\nD. $0$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Nếu $\\displaystyle\\int_a^b f\\,dx=5$ thì $\\displaystyle\\int_a^b 3f\\,dx$ bằng:\nA. $15$\nB. $5$\nC. $8$\nD. $2$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'$\\displaystyle\\int_0^{\\pi/2}\\cos x\\,dx$ bằng:\nA. $1$\nB. $0$\nC. $-1$\nD. $\\dfrac{\\pi}{2}$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Diện tích hình $y=x^2$ và $Ox$ từ $0$ đến $2$:\nA. $\\dfrac{8}{3}$\nB. $4$\nC. $2$\nD. $\\dfrac{16}{3}$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$\\displaystyle\\int_{-1}^{1}(x^3+x)\\,dx$ bằng:\nA. $0$\nB. $2$\nC. $-2$\nD. $4$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $\\displaystyle\\int_1^2(x^2-2x+1)\\,dx$.', dapAn:'$\\dfrac{1}{3}$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $\\displaystyle\\int_0^{\\pi}\\sin x\\,dx$.', dapAn:'$2$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính diện tích hình phẳng giới hạn $y=x^2$ và $y=x$.', dapAn:'$S=\\dfrac{1}{6}$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính $\\displaystyle\\int_0^1 x\\sqrt{x^2+1}\\,dx$ bằng đặt $t=x^2+1$.', dapAn:'$\\dfrac{2\\sqrt{2}-1}{3}$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính thể tích khi $y=x^2$, $y=0$, $x=2$ quay quanh $Ox$.', dapAn:'$V=\\dfrac{32\\pi}{5}$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính $\\displaystyle\\int_0^{\\pi/4}\\tan^2 x\\,dx$.', dapAn:'$1-\\dfrac{\\pi}{4}$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho $\\displaystyle\\int_0^2 f\\,dx=3$, $\\displaystyle\\int_0^2 g\\,dx=5$. Xác định Đúng/Sai:\na) $\\displaystyle\\int_0^2(f+g)\\,dx=8$.\nb) $\\displaystyle\\int_0^2 2f\\,dx=6$.\nc) $\\displaystyle\\int_2^0 f\\,dx=-3$.\nd) $\\displaystyle\\int_0^2 f\\cdot g\\,dx=15$.', dapAn:'Đ Đ Đ S' },
  ],

  /* ── ỨNG DỤNG TÍCH PHÂN ─────────────────────────────────────────────── */
  'ứng dụng tích phân': [
    { mucDo:'NB', phan:'nlc', noiDung:'Diện tích hình phẳng giới hạn $y=f(x)$, $Ox$, $x=a$, $x=b$:\nA. $S=\\displaystyle\\int_a^b|f(x)|\\,dx$\nB. $S=\\displaystyle\\int_a^b f(x)\\,dx$\nC. $S=\\left|\\displaystyle\\int_a^b f(x)\\,dx\\right|$\nD. $S=\\displaystyle\\int_a^b f\'(x)\\,dx$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Thể tích vật tròn xoay quanh $Ox$: $V=\\pi\\displaystyle\\int_a^b\\underline{\\quad}\\,dx$. Điền vào:\nA. $[f(x)]^2$\nB. $f(x)$\nC. $|f(x)|$\nD. $f\'(x)$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Diện tích hình phẳng giữa $y=x^2$ và $y=x$:\nA. $\\dfrac{1}{6}$\nB. $\\dfrac{1}{3}$\nC. $\\dfrac{1}{2}$\nD. $1$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Thể tích: $y=x$, $y=0$, $x=2$ quay $Ox$:\nA. $\\dfrac{8\\pi}{3}$\nB. $4\\pi$\nC. $2\\pi$\nD. $\\dfrac{4\\pi}{3}$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính diện tích hình phẳng giới hạn $y=x^2$ và $y=4$.', dapAn:'$S=\\dfrac{32}{3}$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính diện tích hình phẳng: $y=\\sin x$, $Ox$, từ $0$ đến $\\pi$.', dapAn:'$S=2$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính thể tích: $y=x^2+1$, $y=0$, $x=0$, $x=1$ quay $Ox$.', dapAn:'$V=\\dfrac{28\\pi}{15}$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính diện tích hình phẳng giới hạn $y=x^3$ và $y=x$.', dapAn:'$S=\\dfrac{1}{2}$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính thể tích: $y=\\sqrt{x}$, $y=0$, $x=4$ quay $Ox$.', dapAn:'$V=8\\pi$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm $a>0$ sao cho $\\displaystyle\\int_0^a(2x+1)\\,dx=6$.', dapAn:'$a=2$' },
    { mucDo:'NB', phan:'ds', noiDung:'Xác định Đúng/Sai:\na) $\\displaystyle\\int_0^1 x^2\\,dx=\\dfrac{1}{3}$.\nb) $S$ giữa $y=x^2$ và $y=x$ là $\\dfrac{1}{6}$.\nc) Thể tích $y=x$, $x\\in[0,1]$ quay $Ox$: $V=\\dfrac{\\pi}{3}$.\nd) $S$ giữa $y=x^3$ và $Ox$ từ $-1$ đến $1$: $S=\\dfrac{1}{2}$.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── SỐ PHỨC ────────────────────────────────────────────────────────── */
  'số phức': [
    { mucDo:'NB', phan:'nlc', noiDung:'Số phức $z = 3+4i$ có mô-đun:\nA. $5$\nB. $7$\nC. $25$\nD. $1$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Số phức liên hợp của $z = 2-3i$:\nA. $2+3i$\nB. $-2+3i$\nC. $-2-3i$\nD. $3-2i$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'$i^4$ bằng:\nA. $1$\nB. $-1$\nC. $i$\nD. $-i$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$(2+3i)(1-i)$ bằng:\nA. $5+i$\nB. $5-i$\nC. $-1+5i$\nD. $2+3$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Nghiệm của $z^2+4=0$:\nA. $z=\\pm 2i$\nB. $z=\\pm 2$\nC. $z=2i$\nD. $z=-2i$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính $z = \\dfrac{1+i}{1-i}$. Biểu diễn dạng $a+bi$.', dapAn:'$z = i$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tìm $z=a+bi$ biết $z - 2\\bar{z} = 3+i$.', dapAn:'$z = -3-i$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính $(1+i)^8$.', dapAn:'$16$' },
    { mucDo:'VD', phan:'tln', noiDung:'$z_1=1+i$, $z_2=\\sqrt{3}-i$. Tính $|z_1 z_2|$ và $\\arg(z_1 z_2)$.', dapAn:'$|z_1z_2|=2\\sqrt{2}$; $\\arg=\\dfrac{5\\pi}{12}$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm tất cả $z$ thỏa $|z-1|=|z+i|$ và $|z|=\\sqrt{2}$.', dapAn:'$z=1+i$ hoặc $z=-1-i$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Giải phương trình $z^2-(1+3i)z+(-2+i)=0$.', dapAn:'$z_1=2$; $z_2=-1+3i$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho $z=3-4i$. Xác định Đúng/Sai:\na) $|z|=5$.\nb) $z+\\bar{z}=6$.\nc) $z\\cdot\\bar{z}=25$.\nd) $z^2=-7-24i$.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── PHƯƠNG TRÌNH MẶT PHẲNG ─────────────────────────────────────────── */
  'phương trình mặt phẳng': [
    { mucDo:'NB', phan:'nlc', noiDung:'Mặt phẳng qua $O$, pháp tuyến $\\vec{n}=(1,2,3)$:\nA. $x+2y+3z=0$\nB. $x-2y+3z=0$\nC. $2x+y+3z=0$\nD. $x+2y-3z=0$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Mặt phẳng $Oxz$ có phương trình:\nA. $y=0$\nB. $x=0$\nC. $z=0$\nD. $x+y+z=0$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Khoảng cách từ $O$ đến $(P): 2x-y+2z-6=0$:\nA. $2$\nB. $3$\nC. $1$\nD. $6$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Hai mp $x+2y-z=1$ và $2x+4y-2z=3$ quan hệ:\nA. Song song\nB. Cắt nhau\nC. Trùng nhau\nD. Vuông góc', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Pháp vectơ của mp $3x-y+2z+5=0$:\nA. $(3,-1,2)$\nB. $(3,1,2)$\nC. $(-3,1,-2)$\nD. $(1,3,2)$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Viết pt mặt phẳng qua $A(1,0,-1)$, $B(2,1,0)$, $C(0,-1,1)$.', dapAn:'$x-y-z=0$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính khoảng cách từ $A(2,3,-1)$ đến mp $x-2y+2z+3=0$.', dapAn:'$\\dfrac{4}{3}$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm hình chiếu của $M(1,2,3)$ xuống mp $2x-y+z=6$.', dapAn:'$H(3,1,4)$' },
    { mucDo:'VD', phan:'tln', noiDung:'Viết pt mp chứa $A(1,0,0)$, $B(0,1,0)$ song song với $Oz$.', dapAn:'$x+y=1$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm mp đối xứng với $(P): x+y+z=1$ qua $(Q): x+y+z=3$.', dapAn:'$x+y+z=5$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm điểm $M$ trên mp $(P): x+y+z=1$ gần $A(3,0,0)$ nhất.', dapAn:"$M=\\left(\\dfrac{4}{3},-\\dfrac{1}{3},-\\dfrac{1}{3}\\right)$" },
    { mucDo:'NB', phan:'ds', noiDung:'Cho $(P): 2x-y+2z-6=0$. Xác định Đúng/Sai:\na) Véc-tơ pháp $\\vec{n}=(2,-1,2)$.\nb) $d(O,(P))=2$.\nc) $(P)$ cắt cả 3 trục tọa độ.\nd) $A(3,0,0)$ thuộc $(P)$.', dapAn:'Đ Đ Đ S' },
  ],

  /* ── PHƯƠNG TRÌNH ĐƯỜNG THẲNG ──────────────────────────────────────── */
  'phương trình đường thẳng': [
    { mucDo:'NB', phan:'nlc', noiDung:'Đường thẳng qua $A(1,0,2)$, vtcp $\\vec{u}=(1,-1,2)$:\nA. $x=1+t,\\; y=-t,\\; z=2+2t$\nB. $x=t,\\; y=-t,\\; z=2t$\nC. $x=1,\\; y=-1,\\; z=2$\nD. $x=1+t,\\; y=2t,\\; z=t$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Đường thẳng $\\dfrac{x-1}{2}=\\dfrac{y+1}{1}=\\dfrac{z-2}{3}$ có vtcp:\nA. $(2,1,3)$\nB. $(1,-1,2)$\nC. $(-2,1,3)$\nD. $(3,1,2)$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$d_1: \\dfrac{x}{1}=\\dfrac{y}{2}=\\dfrac{z}{3}$ và $d_2: \\dfrac{x}{2}=\\dfrac{y}{4}=\\dfrac{z}{6}$ quan hệ:\nA. Song song\nB. Trùng nhau\nC. Cắt nhau\nD. Chéo nhau', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Viết pt đường thẳng qua $A(1,2,3)$ và $B(3,0,1)$.', dapAn:'$\\dfrac{x-1}{2}=\\dfrac{y-2}{-2}=\\dfrac{z-3}{-2}$' },
    { mucDo:'TH', phan:'tln', noiDung:'Tìm giao điểm $d: x=1+t,\\; y=t,\\; z=2-t$ với mp $x+y+z=4$.', dapAn:'$M(2,1,1)$' },
    { mucDo:'VD', phan:'tln', noiDung:'Viết pt đường thẳng qua $A(2,1,-1)$ vuông góc mp $x-2y+z=5$.', dapAn:'$\\dfrac{x-2}{1}=\\dfrac{y-1}{-2}=\\dfrac{z+1}{1}$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tính khoảng cách từ $M(1,0,0)$ đến $d: x=t,\\; y=1+t,\\; z=t$.', dapAn:'$\\sqrt{\\dfrac{2}{3}}$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tính khoảng cách 2 đường chéo nhau:\n$d_1: x=1+t,\\; y=t,\\; z=0$\n$d_2: x=0,\\; y=s,\\; z=1+s$.', dapAn:'$\\dfrac{1}{\\sqrt{2}}$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho $d: x=2+t,\\; y=1-2t,\\; z=3t$. Xác định Đúng/Sai:\na) vtcp $\\vec{u}=(1,-2,3)$.\nb) $A(2,1,0)$ thuộc $d$ khi $t=0$.\nc) $d$ vuông góc mp $Oyz$.\nd) $d$ cắt mp $xOy$ tại $\\left(\\dfrac{5}{3},-\\dfrac{1}{3},0\\right)$.', dapAn:'Đ Đ S Đ' },
  ],

  /* ── PHƯƠNG TRÌNH MẶT CẦU ──────────────────────────────────────────── */
  'phương trình mặt cầu': [
    { mucDo:'NB', phan:'nlc', noiDung:'Mặt cầu tâm $I(1,2,3)$ bán kính $R=5$:\nA. $(x-1)^2+(y-2)^2+(z-3)^2=25$\nB. $x^2+y^2+z^2=25$\nC. $(x+1)^2+(y+2)^2+(z+3)^2=25$\nD. $(x-1)^2=25$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Mặt cầu $x^2+y^2+z^2-2x-4y+5=0$ có tâm:\nA. $(1,2,0)$\nB. $(-1,-2,0)$\nC. $(2,4,0)$\nD. $(0,0,0)$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Bán kính $(S): x^2+y^2+z^2-2x+4y-4z-10=0$:\nA. $4$\nB. $3$\nC. $5$\nD. $\\sqrt{10}$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tính bán kính và tâm: $x^2+y^2+z^2-4x+6y-2z+5=0$.', dapAn:'$I(2,-3,1)$; $R=3$' },
    { mucDo:'TH', phan:'tln', noiDung:'Viết pt mặt cầu đường kính $AB$, $A(1,2,-1)$, $B(3,0,3)$.', dapAn:'$(x-2)^2+(y-1)^2+(z-1)^2=9$' },
    { mucDo:'VD', phan:'tln', noiDung:'Viết pt mặt cầu ngoại tiếp tứ diện $O,A(2,0,0),B(0,2,0),C(0,0,2)$.', dapAn:'$x^2+y^2+z^2-2x-2y-2z=0$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm vị trí tương đối $(S): x^2+y^2+z^2=9$ và $(P): x+y+z=\\sqrt{3}$.', dapAn:'$d(I,(P))=1 < 3=R$ $\\Rightarrow$ $(P)$ cắt $(S)$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tìm mp tiếp xúc $(S): I(1,2,3)$, $R=3$ tại $M(1,2,6)$.', dapAn:'$z=6$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho $(S): x^2+y^2+z^2-4x+2y-4=0$. Xác định Đúng/Sai:\na) Tâm $I=(2,-1,0)$.\nb) $R=3$.\nc) $O(0,0,0)$ nằm trong $(S)$.\nd) $A(4,-1,0)$ thuộc $(S)$.', dapAn:'Đ Đ Đ S' },
  ],

  /* ── XÁC SUẤT ───────────────────────────────────────────────────────── */
  'xác suất': [
    { mucDo:'NB', phan:'nlc', noiDung:'Tung 1 đồng xu, $P(\\text{ngửa})$:\nA. $\\dfrac{1}{2}$\nB. $1$\nC. $0$\nD. $\\dfrac{1}{4}$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Gieo 1 xúc xắc, $P(\\text{số chẵn})$:\nA. $\\dfrac{1}{2}$\nB. $\\dfrac{1}{3}$\nC. $\\dfrac{1}{6}$\nD. $\\dfrac{2}{3}$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Nếu $A$, $B$ xung khắc thì $P(A\\cup B)$:\nA. $P(A)+P(B)$\nB. $P(A)\\cdot P(B)$\nC. $0$\nD. $1$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Hộp 3 đỏ 2 xanh. Rút 2 bi, $P(\\text{cả 2 đỏ})$:\nA. $\\dfrac{3}{10}$\nB. $\\dfrac{1}{5}$\nC. $\\dfrac{2}{5}$\nD. $\\dfrac{1}{2}$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$P(A)=0{,}6$; $P(B)=0{,}5$; $A\\perp B$. $P(A\\cap B)$:\nA. $0{,}3$\nB. $0{,}8$\nC. $0{,}1$\nD. $0{,}55$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Tung 3 đồng xu. Tính $P(\\text{đúng 2 mặt ngửa})$.', dapAn:'$\\dfrac{3}{8}$' },
    { mucDo:'TH', phan:'tln', noiDung:'Gieo 2 xúc xắc. Tính $P(\\text{tổng}=7)$.', dapAn:'$\\dfrac{1}{6}$' },
    { mucDo:'VD', phan:'tln', noiDung:'Hộp 5 đỏ 3 xanh, rút 2 bi không hoàn lại. $P(\\text{1 đỏ 1 xanh})$.', dapAn:'$\\dfrac{15}{28}$' },
    { mucDo:'VD', phan:'tln', noiDung:'$P(A)=0{,}4$; $P(B|A)=0{,}5$; $P(B|\\bar{A})=0{,}2$. Tính $P(B)$.', dapAn:'$0{,}32$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Với $P(A)=0{,}4$, $P(B)=0{,}32$. Tính $P(A|B)$ theo Bayes.', dapAn:'$0{,}625$' },
    { mucDo:'VDC', phan:'tln', noiDung:'NM I: 60% SP phế 2%; NM II: 40% SP phế 3%. Lấy 1 phế phẩm. $P(\\text{từ NM II})$.', dapAn:'$\\dfrac{1}{2}$' },
    { mucDo:'NB', phan:'ds', noiDung:'Gieo 2 xúc xắc. Xác định Đúng/Sai:\na) Không gian mẫu có $36$ phần tử.\nb) $P(\\text{tổng}=2)=\\dfrac{1}{36}$.\nc) $P(\\text{tổng}\\leq 6)=\\dfrac{15}{36}$.\nd) $P(\\text{tổng}=7 \\text{ hoặc } 11)=\\dfrac{2}{9}$.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── XÁC SUẤT CÓ ĐIỀU KIỆN ─────────────────────────────────────────── */
  'xác suất có điều kiện': [
    { mucDo:'NB', phan:'nlc', noiDung:'$P(A|B)$ bằng:\nA. $\\dfrac{P(A\\cap B)}{P(B)}$\nB. $P(A)\\cdot P(B)$\nC. $P(A)+P(B)$\nD. $\\dfrac{P(A\\cap B)}{P(A)}$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'$A$ độc lập với $B$ khi:\nA. $P(A\\cap B)=P(A)\\cdot P(B)$\nB. $P(A|B)=P(A)+P(B)$\nC. $P(A\\cap B)=0$\nD. $A$ và $B$ xung khắc', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'$P(A)=0{,}5$; $P(B)=0{,}4$; $P(A\\cap B)=0{,}2$. $P(A|B)=?$\nA. $0{,}5$\nB. $0{,}4$\nC. $0{,}8$\nD. $0{,}2$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'$P(A)=0{,}6$; $P(B)=0{,}5$; $P(A\\cap B)=0{,}3$. Tính $P(A|B)$ và $P(B|A)$.', dapAn:'$P(A|B)=0{,}6$; $P(B|A)=0{,}5$' },
    { mucDo:'VD', phan:'tln', noiDung:'$P(A)=0{,}4$; $P(B|A)=0{,}5$; $P(B|\\bar{A})=0{,}2$. Tính $P(A|B)$ theo Bayes.', dapAn:'$0{,}625$' },
    { mucDo:'VDC', phan:'tln', noiDung:'NM I: 60% SP phế 2%; NM II: 40% SP phế 3%. $P(\\text{từ NM II}|\\text{phế phẩm})$.', dapAn:'$0{,}5$' },
    { mucDo:'NB', phan:'ds', noiDung:'$P(A)=0{,}4$; $P(B)=0{,}5$; $P(A\\cap B)=0{,}2$. Xác định Đúng/Sai:\na) $P(A|B)=0{,}4$.\nb) $P(B|A)=0{,}5$.\nc) $A$ và $B$ độc lập.\nd) $P(A\\cup B)=0{,}7$.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── TỔ HỢP – HOÁN VỊ ──────────────────────────────────────────────── */
  'tổ hợp': [
    { mucDo:'NB', phan:'nlc', noiDung:'$C_5^2$ bằng:\nA. $10$\nB. $20$\nC. $5$\nD. $15$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'Số hoán vị của $5$ phần tử:\nA. $120$\nB. $60$\nC. $24$\nD. $20$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'$A_5^2$ bằng:\nA. $20$\nB. $10$\nC. $5$\nD. $15$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Chọn 3 học sinh từ 10:\nA. $120$\nB. $720$\nC. $30$\nD. $10$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'Khai triển $(x+1)^5$, hệ số $x^3$:\nA. $10$\nB. $5$\nC. $1$\nD. $15$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'Xếp 5 học sinh vào 5 ghế hàng ngang. Số cách.', dapAn:'$5! = 120$' },
    { mucDo:'TH', phan:'tln', noiDung:'4 nam 3 nữ, chọn 2 người có ít nhất 1 nữ.', dapAn:'$15$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm hệ số $x^4$ trong $(2x-1)^6$.', dapAn:'$60$' },
    { mucDo:'VD', phan:'tln', noiDung:'Giải phương trình $C_n^2=15$.', dapAn:'$n=6$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Số tự nhiên 4 chữ số khác nhau từ $\\{1,2,3,4,5\\}$.', dapAn:'$5\\times4\\times3\\times2=120$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Số hạng không chứa $x$ trong $\\left(x+\\dfrac{1}{x^2}\\right)^9$.', dapAn:'$C_9^3=84$' },
    { mucDo:'NB', phan:'ds', noiDung:'Xác định Đúng/Sai:\na) $P_4=4!=24$.\nb) $C_6^3=20$.\nc) $A_n^k=k!\\cdot C_n^k$.\nd) $C_5^0+C_5^1+\\cdots+C_5^5=32$.', dapAn:'Đ Đ Đ Đ' },
  ],

  /* ── DÃY SỐ ─────────────────────────────────────────────────────────── */
  'dãy số': [
    { mucDo:'NB', phan:'nlc', noiDung:'CSC $2,5,8,11,\\ldots$ có công sai $d$:\nA. $3$\nB. $2$\nC. $5$\nD. $1$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'CSN $2,6,18,54,\\ldots$ có công bội $q$:\nA. $3$\nB. $2$\nC. $4$\nD. $6$', dapAn:'A' },
    { mucDo:'NB', phan:'nlc', noiDung:'CSC $u_1=3$, $d=2$ thì $u_5$:\nA. $11$\nB. $13$\nC. $10$\nD. $12$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'CSN $u_1=2$, $q=3$. Tổng 4 số hạng đầu:\nA. $80$\nB. $60$\nC. $40$\nD. $100$', dapAn:'A' },
    { mucDo:'TH', phan:'nlc', noiDung:'CSC $u_1=1$, $u_{10}=19$. Công sai $d$:\nA. $2$\nB. $3$\nC. $1$\nD. $4$', dapAn:'A' },
    { mucDo:'TH', phan:'tln', noiDung:'CSC $u_1=1$, $u_2=4$. Tìm $u_{10}$ và $S_{10}$.', dapAn:'$u_{10}=28$; $S_{10}=145$' },
    { mucDo:'TH', phan:'tln', noiDung:'CSN $u_1=3$, $q=2$. Tính $S_6$.', dapAn:'$S_6=189$' },
    { mucDo:'VD', phan:'tln', noiDung:'Tìm CSC có 3 số hạng đầu: tổng $=9$, tích $=15$.', dapAn:'$1, 3, 5$ (hoặc ngược lại)' },
    { mucDo:'VD', phan:'tln', noiDung:'Tổng $n$ số hạng đầu CSC: $S_n=n^2+2n$. Tìm $d$ và $u_1$.', dapAn:'$u_1=3$; $d=2$' },
    { mucDo:'VDC', phan:'tln', noiDung:'Gửi 100 triệu, lãi suất $8\\%$/năm kép. Sau 5 năm có bao nhiêu?', dapAn:'$100\\times(1{,}08)^5 \\approx 146{,}93$ triệu' },
    { mucDo:'VDC', phan:'tln', noiDung:'Tổng vô hạn CSN: $u_1=6$, $q=\\dfrac{1}{3}$.', dapAn:'$S=9$' },
    { mucDo:'NB', phan:'ds', noiDung:'Cho CSC $u_1=2$, $d=3$. Xác định Đúng/Sai:\na) $u_5=14$.\nb) $S_4=26$.\nc) $S_{10}=155$.\nd) $u_n=3n-1$.', dapAn:'Đ Đ Đ Đ' },
  ],
};
