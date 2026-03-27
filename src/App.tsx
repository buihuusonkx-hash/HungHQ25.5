/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PenSquare, FileText, Download, Plus, Trash2, ChevronRight, Sparkles, RefreshCw, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QUESTION_BANK, type QBankEntry } from './questionBank';
import { useMathRender } from './MathText';

// --- CƠ SỞ DỮ LIỆU CHUẨN CT 2018 (SÁCH CÁNH DIỀU) ---
const curriculumData: Record<string, Record<string, { nhanBiet: string; thongHieu: string; vanDung: string }>> = {
  "Chương VI. Một số yếu tố của xác suất": {
    "Xác suất có điều kiện": {
      nhanBiet: "- Nhận biết được khái niệm xác suất có điều kiện.",
      thongHieu: "- Tính được xác suất có điều kiện trong những trường hợp đơn giản.\n- Nhận biết được hai biến cố độc lập.",
      vanDung: "- Giải quyết được một số bài toán thực tế có sử dụng xác suất có điều kiện."
    },
    "Xác suất toàn phần": {
      nhanBiet: "- Nhận biết được công thức xác suất toàn phần.\n- Nhận biết được công thức Bayes.",
      thongHieu: "- Vận dụng được công thức xác suất toàn phần và công thức Bayes để tính toán xác suất trong các bài toán đơn giản.",
      vanDung: "- Giải quyết được một số bài toán thực tiễn gắn với công thức xác suất toàn phần và công thức Bayes."
    }
  },
  "Chương 1. Nguyên hàm, tích phân": {
    "Nguyên hàm": {
      nhanBiet: "- Nhận biết được khái niệm nguyên hàm của một hàm số.\n- Nhận biết được bảng nguyên hàm cơ bản.",
      thongHieu: "- Tính được nguyên hàm trong những trường hợp đơn giản.",
      vanDung: "- Giải quyết bài toán thực tiễn gắn với nguyên hàm."
    },
    "Tích phân": {
      nhanBiet: "- Nhận biết được khái niệm và tính chất của tích phân.",
      thongHieu: "- Tính được tích phân bằng bảng nguyên hàm và tính chất.",
      vanDung: "- Sử dụng phương pháp đổi biến, từng phần.\n- Ứng dụng tích phân giải quyết bài toán thực tế."
    }
  }
};

const defaultLevels = () => [
  { tenMucDo: 'Nhận biết', yeuCau: '', color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100', qs: { nlc: '', ds: '', tln: '' } },
  { tenMucDo: 'Thông hiểu', yeuCau: '', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-100', qs: { nlc: '', ds: '', tln: '' } },
  { tenMucDo: 'Vận dụng', yeuCau: '', color: 'text-rose-600', bgColor: 'bg-rose-50', borderColor: 'border-rose-100', qs: { nlc: '', ds: '', tln: '' } }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('nhap-lieu');
  const [data, setData] = useState<any[]>([]);
  const [monHoc, setMonHoc] = useState('Toán');

  // Khởi tạo 1 chương trống khi load app
  useEffect(() => {
    setData([{ tenChuong: '', noiDungs: [{ tenNoiDung: '', soTiet: 0, mucDos: defaultLevels() }] }]);
  }, []);

  const themChuongMoi = () => {
    setData([...data, { tenChuong: '', noiDungs: [{ tenNoiDung: '', soTiet: 0, mucDos: defaultLevels() }] }]);
  };

  const xoaChuong = (cIdx: number) => {
    const newData = data.filter((_, index) => index !== cIdx);
    setData(newData.length ? newData : [{ tenChuong: '', noiDungs: [{ tenNoiDung: '', soTiet: 0, mucDos: defaultLevels() }] }]);
  };

  const themNoiDung = (chuongIndex: number) => {
    const newData = [...data];
    newData[chuongIndex].noiDungs.push({ tenNoiDung: '', soTiet: 0, mucDos: defaultLevels() });
    setData(newData);
  };

  const xoaNoiDung = (chuongIndex: number, ndIndex: number) => {
    const newData = [...data];
    newData[chuongIndex].noiDungs = newData[chuongIndex].noiDungs.filter((_: any, index: number) => index !== ndIndex);
    if (newData[chuongIndex].noiDungs.length === 0) {
      newData[chuongIndex].noiDungs = [{ tenNoiDung: '', soTiet: 0, mucDos: defaultLevels() }];
    }
    setData(newData);
  };

  // HÀM XỬ LÝ LÕI: Tự động map Yêu cầu cần đạt
  const handleChonNoiDung = (chuongIndex: number, ndIndex: number, tenNoiDungSelected: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    const chuong = newData[chuongIndex];
    const noiDung = chuong.noiDungs[ndIndex];
    
    noiDung.tenNoiDung = tenNoiDungSelected;

    const chuongData = curriculumData[chuong.tenChuong];
    if (chuongData && chuongData[tenNoiDungSelected]) {
      const yc = chuongData[tenNoiDungSelected];
      noiDung.mucDos[0].yeuCau = yc.nhanBiet;
      noiDung.mucDos[1].yeuCau = yc.thongHieu;
      noiDung.mucDos[2].yeuCau = yc.vanDung;
    } else {
      noiDung.mucDos.forEach((md: any) => md.yeuCau = '');
    }
    
    setData(newData);
  };

  // Cập nhật số câu hỏi
  const handleUpdateQS = (cIdx: number, nIdx: number, mIdx: number, field: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[cIdx].noiDungs[nIdx].mucDos[mIdx].qs[field] = value;
    setData(newData);
  };

  // Cập nhật số tiết
  const handleUpdateSoTiet = (cIdx: number, nIdx: number, value: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[cIdx].noiDungs[nIdx].soTiet = value;
    setData(newData);
  };

  // Hàm đếm số câu từ chuỗi (ví dụ: "Câu 1, 2" -> 2 câu)
  const countQuestions = (input: string) => {
    if (!input || !input.trim()) return 0;
    // Tách theo dấu phẩy, chấm phẩy hoặc từ "và", loại bỏ các phần tử rỗng
    return input.split(/[,;\s]+(v\u00E0)?\s*/).filter(s => s && s.match(/\d/)).length;
  };

  // Tính tổng số câu và điểm
  // p1 = TNPA (câu 1-12), p2 = Đúng/Sai số câu (câu 13-16), p3 = TLN (câu 17-22)
  // Mỗi câu Đúng/Sai có 4 ý (NB + TH + TH + VD), điểm mỗi câu = 1đ
  // Mỗi câu TLN: NB×0.5đ, TH×0.5đ, VD×0.5đ, VDC×0.5đ
  const getTotals = () => {
    let p1 = 0, p2 = 0, p3 = 0;
    data.forEach(c => {
      c.noiDungs.forEach((nd: any) => {
        // TNPA: chỉ đếm mức NB và TH (mức 0 và 1)
        p1 += countQuestions(nd.mucDos[0].qs.nlc);
        p1 += countQuestions(nd.mucDos[1].qs.nlc);
        // DS: tổng số câu (mọi mức)
        nd.mucDos.forEach((md: any) => {
          p2 += countQuestions(md.qs.ds);
        });
        // TLN: tổng câu từ cả 3 mức (NB câu 17,18 + TH câu 19,20 + VD/VDC câu 21,22)
        nd.mucDos.forEach((md: any) => {
          p3 += countQuestions(md.qs.tln);
        });
      });
    });
    return { 
      p1, p2, p3, 
      total: p1 + p2 + p3,
      score1: p1 * 0.25,
      score2: p2 * 1.0,
      score3: p3 * 0.5,
      totalScore: (p1 * 0.25) + (p2 * 1.0) + (p3 * 0.5)
    };
  };

  const totals = getTotals();

  // THUAT TOAN TU DONG PHAN BO (CHUAN 2025)
  const tuDongPhanBo = () => {
    const newData = JSON.parse(JSON.stringify(data));
    const totalSotiet = newData.reduce((acc: number, c: any) => acc + c.noiDungs.reduce((sum: number, nd: any) => sum + (nd.soTiet || 0), 0), 0);

    if (totalSotiet === 0) {
      alert("Vui long nhap 'So tiet' truoc khi tu dong phan bo!");
      return;
    }

    // Flat list
    const allItems: any[] = [];
    newData.forEach((c: any, cIdx: number) => {
      c.noiDungs.forEach((nd: any, nIdx: number) => {
        allItems.push({ cIdx, nIdx, soTiet: nd.soTiet || 0 });
      });
    });

    // Largest Remainder Method
    const lrm = (total: number): number[] => {
      const exact = allItems.map(it => (it.soTiet / totalSotiet) * total);
      const fl = exact.map(v => Math.floor(v));
      let rem = total - fl.reduce((a, b) => a + b, 0);
      exact.map((v, i) => ({ r: v - fl[i], i }))
           .sort((a, b) => b.r - a.r)
           .slice(0, rem)
           .forEach(({ i }) => fl[i]++);
      return fl;
    };

    const alloc1 = lrm(12); // TNPA: cau 1-12
    const alloc2 = lrm(4);  // DS: cau 13-16
    const alloc3 = lrm(6);  // TLN: cau 17-22

    let nlc = 1, ds = 13, tln = 17;

    allItems.forEach((item, i) => {
      const { cIdx, nIdx } = item;
      const nd = newData[cIdx].noiDungs[nIdx];
      nd.mucDos.forEach((md: any) => { md.qs.nlc = ''; md.qs.ds = ''; md.qs.tln = ''; });

      // TNPA: NB (~60%) => mucDos[0], TH (~40%) => mucDos[1]
      const c1 = alloc1[i];
      const c1NB = Math.ceil(c1 * 0.6), c1TH = c1 - c1NB;
      for (let k = 0; k < c1NB; k++) {
        const cur = nd.mucDos[0].qs.nlc;
        nd.mucDos[0].qs.nlc = (cur ? cur + ', ' : '') + `Cau ${nlc++}`;
      }
      for (let k = 0; k < c1TH; k++) {
        const cur = nd.mucDos[1].qs.nlc;
        nd.mucDos[1].qs.nlc = (cur ? cur + ', ' : '') + `Cau ${nlc++}`;
      }

      // DS: tat ca vao mucDos[0] (1 cau = 4 y: a=NB, b,c=TH, d=VD)
      const c2 = alloc2[i];
      for (let k = 0; k < c2; k++) {
        const cur = nd.mucDos[0].qs.ds;
        nd.mucDos[0].qs.ds = (cur ? cur + ', ' : '') + `Cau ${ds++}`;
      }

      // TLN (chuan 2025): TH (cau 17,18) => mucDos[1]; VD+VDC (cau 19-22) => mucDos[2]
      // Khong co NB trong TLN
      const c3 = alloc3[i];
      const c3TH  = Math.round(c3 * 2 / 6); // ~2 cau TH
      const c3VD  = c3 - c3TH;               // phan con lai = VD+VDC (4 cau)
      // mucDos[0].qs.tln = '' (khong co NB)
      for (let k = 0; k < c3TH; k++) {
        const cur = nd.mucDos[1].qs.tln;
        nd.mucDos[1].qs.tln = (cur ? cur + ', ' : '') + `Cau ${tln++}`;
      }
      for (let k = 0; k < c3VD; k++) {
        const cur = nd.mucDos[2].qs.tln;
        nd.mucDos[2].qs.tln = (cur ? cur + ', ' : '') + `Cau ${tln++}`;
      }
    });

    setData(newData);
  };

  const calculateRowSpan = (chuong: any) => {
    return chuong.noiDungs.reduce((total: number, nd: any) => total + nd.mucDos.length, 0);
  };

  let globalRowIdx = 0; // Để tính STT liên tục cho bài học

  const exportToWord = () => {
    const tableElement = document.getElementById('ma-tran-table');
    if (!tableElement) {
      alert("Không tìm thấy bảng để xuất!");
      return;
    }

    const cloneTable = tableElement.cloneNode(true) as HTMLTableElement;
    cloneTable.setAttribute('border', '1');
    cloneTable.style.borderCollapse = 'collapse';
    cloneTable.style.width = '100%';

    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Ma trận Đề kiểm tra</title>
        <style>
          table { border-collapse: collapse; width: 100%; font-family: "Times New Roman", Times, serif; font-size: 11pt; }
          th, td { border: 1px solid black; padding: 5px; text-align: center; vertical-align: middle; }
          th { font-weight: bold; }
        </style>
      </head>
      <body>
        <h2 style="text-align: center; font-family: 'Times New Roman', Times, serif; font-weight: bold;">MA TRẬN ĐỀ KIỂM TRA MÔN TOÁN 12</h2>
        ${cloneTable.outerHTML}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ma_Tran_De_Thi.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToWordDacTa = () => {
    const tableElement = document.getElementById('dac-ta-table');
    if (!tableElement) {
      alert("Không tìm thấy bảng đặc tả để xuất!");
      return;
    }

    const cloneTable = tableElement.cloneNode(true) as HTMLTableElement;
    cloneTable.setAttribute('border', '1');
    cloneTable.style.borderCollapse = 'collapse';
    cloneTable.style.width = '100%';

    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Bản Đặc tả Đề kiểm tra</title>
        <style>
          table { border-collapse: collapse; width: 100%; font-family: "Times New Roman", Times, serif; font-size: 11pt; }
          th, td { border: 1px solid black; padding: 5px; text-align: center; vertical-align: middle; }
          .text-left { text-align: left; }
          th { font-weight: bold; }
        </style>
      </head>
      <body>
        <h2 style="text-align: center; font-family: 'Times New Roman', Times, serif; font-weight: bold;">BẢN ĐẶC TẢ ĐỀ KIỂM TRA MÔN TOÁN 12</h2>
        ${cloneTable.outerHTML}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ban_Dac_Ta_De_Thi.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-indigo-600 font-bold tracking-[0.2em] text-[10px] uppercase mb-3">Smarter Education Tools</p>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight italic">Math Matrix <span className="text-indigo-600">Pro</span></h1>
          <div className="h-1 w-20 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Hệ thống chuyên dụng tối ưu hóa quy trình xây dựng ma trận và đặc tả đề thi theo chuẩn chương trình GDPT 2018.
          </p>
        </motion.div>
      </header>

      {/* Tabs */}
      <div className="flex justify-center space-x-2 mb-10 overflow-x-auto py-2">
        <button 
          onClick={() => setActiveTab('nhap-lieu')} 
          className={`px-6 py-3 rounded-full font-bold text-sm flex items-center transition-all duration-300 whitespace-nowrap ${activeTab === 'nhap-lieu' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}`}
        >
          <PenSquare className="w-4 h-4 mr-2" /> Nhập liệu
        </button>
        <button 
          onClick={() => setActiveTab('ma-tran')} 
          className={`px-6 py-3 rounded-full font-bold text-sm flex items-center transition-all duration-300 whitespace-nowrap ${activeTab === 'ma-tran' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}`}
        >
          <Plus className="w-4 h-4 mr-2" /> Ma trận đề thi
        </button>
        <button 
          onClick={() => setActiveTab('dac-ta')} 
          className={`px-6 py-3 rounded-full font-bold text-sm flex items-center transition-all duration-300 whitespace-nowrap ${activeTab === 'dac-ta' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}`}
        >
          <FileText className="w-4 h-4 mr-2" /> Bảng ma trận đặc tả
        </button>
        <button 
          onClick={() => setActiveTab('tao-de')} 
          className={`px-6 py-3 rounded-full font-bold text-sm flex items-center transition-all duration-300 whitespace-nowrap ${activeTab === 'tao-de' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}`}
        >
          <Sparkles className="w-4 h-4 mr-2" /> Tạo đề tự động
        </button>
      </div>

      <main className="max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {/* TAB 1: NHẬP LIỆU */}
          {activeTab === 'nhap-lieu' && (
            <motion.div 
              key="nhap-lieu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Cấu trúc Ma trận</h2>
                  <p className="text-slate-500 text-sm">Thiết lập các chương, nội dung và phân bổ câu hỏi.</p>
                </div>
                <button 
                  onClick={themChuongMoi} 
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" /> Thêm Chương Mới
                </button>
              </div>
              
              {data.map((chuong, cIdx) => (
                <motion.div 
                  layout
                  key={`c-${cIdx}`} 
                  className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex-1 w-full">
                      <label className="block text-[10px] font-black text-indigo-600 mb-2 uppercase tracking-widest">Chương / Chủ đề {cIdx + 1}</label>
                      <div className="flex gap-3 relative">
                        <input 
                          list={`chuong-suggestions-${cIdx}`}
                          className="flex-1 p-4 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none bg-slate-50 font-bold text-slate-800 transition-all pr-12"
                          value={chuong.tenChuong}
                          placeholder="Chọn hoặc nhập tên Chương / Chủ đề..."
                          onChange={(e) => {
                            const newData = JSON.parse(JSON.stringify(data));
                            newData[cIdx].tenChuong = e.target.value;
                            setData(newData);
                          }}
                        />
                        <ChevronRight className="absolute right-16 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 rotate-90 pointer-events-none" />
                        <datalist id={`chuong-suggestions-${cIdx}`}>
                          {Object.keys(curriculumData).map(c => <option key={c} value={c}>{c}</option>)}
                        </datalist>
                        <button 
                          onClick={() => xoaChuong(cIdx)}
                          className="p-4 text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors border-2 border-transparent hover:border-rose-100"
                          title="Xóa chương"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {chuong.tenChuong && chuong.noiDungs.map((nd: any, nIdx: number) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={`n-${nIdx}`} 
                        className="ml-0 md:ml-10 mt-6 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 relative"
                      >
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-[3] w-full">
                            <div className="flex justify-between items-center mb-3">
                              <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest">Nội dung kiến thức {nIdx + 1}</label>
                              <button 
                                onClick={() => xoaNoiDung(cIdx, nIdx)}
                                className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="relative group">
                              <input 
                                list={`nd-suggestions-${cIdx}-${nIdx}`}
                                className="w-full p-4 border-2 border-slate-50 rounded-2xl focus:border-indigo-500 outline-none bg-white shadow-xl shadow-slate-100/50 font-bold text-slate-800 transition-all pr-12"
                                value={nd.tenNoiDung}
                                placeholder="Nhập hoặc chọn nội dung kiến thức..."
                                onChange={(e) => {
                                  const newData = JSON.parse(JSON.stringify(data));
                                  newData[cIdx].noiDungs[nIdx].tenNoiDung = e.target.value;
                                  setData(newData);
                                }}
                                onBlur={(e) => {
                                  // Nếu nội dung khớp với gợi ý thì tự động map yêu cầu
                                  handleChonNoiDung(cIdx, nIdx, e.target.value);
                                }}
                              />
                              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 rotate-90" />
                              <datalist id={`nd-suggestions-${cIdx}-${nIdx}`}>
                                {Object.keys(curriculumData[chuong.tenChuong] || {}).map(n => <option key={n} value={n}>{n}</option>)}
                              </datalist>
                            </div>
                          </div>
                          <div className="flex-1 w-full">
                            <label className="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest text-center">SỐ TIẾT</label>
                            <div className="p-1 bg-white rounded-3xl border-2 border-slate-50 shadow-xl shadow-slate-100/50">
                              <input 
                                type="number"
                                className="w-full p-4 border-none rounded-2xl outline-none bg-transparent font-black text-slate-800 text-center text-xl"
                                value={nd.soTiet || ''}
                                placeholder="0"
                                onChange={(e) => handleUpdateSoTiet(cIdx, nIdx, parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                        </div>

                        {nd.tenNoiDung && (
                          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {nd.mucDos.map((md: any, mIdx: number) => (
                              <div key={`m-${mIdx}`} className={`p-5 rounded-2xl border-2 ${md.borderColor} ${md.bgColor} transition-all hover:shadow-md`}>
                                <div className="flex items-center mb-4">
                                  <div className={`w-2 h-2 rounded-full mr-2 ${md.color.replace('text', 'bg')}`}></div>
                                  <p className={`font-black text-xs uppercase tracking-wider ${md.color}`}>{md.tenMucDo}</p>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase mb-2 ml-1">Yêu cầu cần đạt (Sửa nội dung)</label>
                                    <textarea 
                                      className="w-full p-3 bg-white/50 border border-slate-200 rounded-xl text-[10px] focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none leading-relaxed text-slate-600 h-24"
                                      value={md.yeuCau}
                                      onChange={(e) => {
                                        const newData = JSON.parse(JSON.stringify(data));
                                        newData[cIdx].noiDungs[nIdx].mucDos[mIdx].yeuCau = e.target.value;
                                        setData(newData);
                                      }}
                                    />
                                  </div>
                                  <div className="grid grid-cols-1 gap-3">
                                    <div className="group">
                                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">
                                        {mIdx === 0 ? 'Nhiều lựa chọn (Câu NB)' : mIdx === 1 ? 'Nhiều lựa chọn (Câu TH)' : 'Nhiều lựa chọn (Câu VD — hiếm)'}
                                      </label>
                                      <input 
                                        placeholder={mIdx === 0 ? 'Câu 1, 2, 3...' : mIdx === 1 ? 'Câu 8, 9...' : 'Câu...'} 
                                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        value={md.qs.nlc} 
                                        onChange={e => handleUpdateQS(cIdx, nIdx, mIdx, 'nlc', e.target.value)}
                                      />
                                    </div>
                                    <div className="group">
                                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">
                                        {mIdx === 0 ? 'Đúng-Sai: ý a — NB (câu 13–16)' : mIdx === 1 ? 'Đúng-Sai: ý b,c — TH' : 'Đúng-Sai: ý d — VD'}
                                      </label>
                                      <input 
                                        placeholder={mIdx === 0 ? 'Câu 13, 14, 15, 16' : mIdx === 1 ? 'Câu 13, 14...' : 'Câu 13, 14...'} 
                                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        value={md.qs.ds} 
                                        onChange={e => handleUpdateQS(cIdx, nIdx, mIdx, 'ds', e.target.value)}
                                      />
                                    </div>
                                    <div className="group">
                                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 ml-1">
                                        {mIdx === 0 ? 'Trả lời ngắn NB (câu 17, 18)' : mIdx === 1 ? 'Trả lời ngắn TH (câu 19, 20)' : 'Trả lời ngắn VD+VDC (câu 21, 22)'}
                                      </label>
                                      <input 
                                        placeholder={mIdx === 0 ? 'Câu 17, 18' : mIdx === 1 ? 'Câu 19, 20' : 'Câu 21, 22'} 
                                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        value={md.qs.tln} 
                                        onChange={e => handleUpdateQS(cIdx, nIdx, mIdx, 'tln', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {chuong.tenChuong && (
                    <button 
                      onClick={() => themNoiDung(cIdx)} 
                      className="mt-8 ml-0 md:ml-10 px-6 py-3 border-2 border-dashed border-slate-200 text-slate-500 font-bold text-xs rounded-2xl hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all flex items-center group"
                    >
                      <Plus className="w-3 h-3 mr-2 group-hover:rotate-90 transition-transform" /> Thêm nội dung kiến thức khác
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* TAB 2: MA TRẬN ĐỀ THI */}
          {activeTab === 'ma-tran' && (
            <motion.div 
              key="ma-tran"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl relative"
            >
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Ma trận Đề kiểm tra Môn {monHoc} 12</h2>
                <p className="text-slate-400 text-xs mt-2 italic font-medium">(Dành cho kỳ thi tốt nghiệp THPT và kiểm tra định kỳ)</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {['Toán', 'Lý', 'Hóa', 'Sinh', 'Sử', 'Địa', 'KTPL', 'Anh'].map(mon => (
                    <button
                      key={mon}
                      onClick={() => setMonHoc(mon)}
                      className={`px-4 py-2 rounded-full font-bold text-xs transition-all border-2 ${
                        monHoc === mon
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 scale-105'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                      }`}
                    >
                      {mon}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button onClick={themChuongMoi} className="px-5 py-2.5 bg-slate-600 text-white rounded-lg font-bold text-xs flex items-center hover:bg-slate-700 transition-all shadow-md">
                    <Plus className="w-3.5 h-3.5 mr-2" /> Thêm Chương
                  </button>
                   <button onClick={() => {
                     if (data.length === 0) themChuongMoi();
                     else themNoiDung(data.length - 1);
                   }} className="px-5 py-2.5 bg-indigo-500 text-white rounded-lg font-bold text-xs flex items-center hover:bg-indigo-600 transition-all shadow-md">
                     <Plus className="w-3.5 h-3.5 mr-2" /> Th\u00eam B\u00e0i M\u1edbi
                   </button>
                   <button onClick={tuDongPhanBo} className="px-5 py-2.5 bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center hover:bg-emerald-600 transition-all shadow-md">
                     <FileText className="w-3.5 h-3.5 mr-2" /> T\u1ef1 \u0110\u1ed9ng Ph\u00e2n B\u1ed5
                   </button>
                   <button onClick={exportToWord} className="px-5 py-2.5 bg-sky-600 text-white rounded-lg font-bold text-xs flex items-center hover:bg-sky-700 transition-all shadow-md">
                     <Download className="w-3.5 h-3.5 mr-2" /> Xu\u1ea5t File Word
                   </button>
                 </div>
               </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table id="ma-tran-table" className="w-full border-collapse text-[11px] min-w-[1200px]">
                  <thead>
                    {/* Hàng 1: tiêu đề lớn */}
                    <tr className="bg-slate-900 text-white text-center text-[11px] font-black">
                      <th className="border border-slate-700 p-3" rowSpan={3}>STT</th>
                      <th className="border border-slate-700 p-3" rowSpan={3}>SỐ<br/>TIẾT</th>
                      <th className="border border-slate-700 p-3 text-center" rowSpan={3}>NỘI DUNG KIẾN THỨC,<br/>ĐƠN VỊ KIẾN THỨC</th>
                      <th className="border border-slate-700 p-2 tracking-wide" colSpan={9}>SỐ CÂU HỎI THEO MỨC ĐỘ NHẬN THỨC</th>
                      <th className="border border-slate-700 p-3 w-20" rowSpan={3}>TỔNG<br/>SỐ CÂU</th>
                      <th className="border border-slate-700 p-3 w-16" rowSpan={3}>TỶ LỆ<br/>(%)</th>
                    </tr>
                    {/* Hàng 2: nhóm phần */}
                    <tr className="text-white text-center text-[10px] font-black tracking-wide">
                      <th className="border border-slate-600 p-2" colSpan={2} style={{background:'#065f46'}}>
                        TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN<br/>
                        <span className="text-[9px] font-semibold opacity-80">(Câu 1 → Câu 12)</span>
                      </th>
                      <th className="border border-slate-600 p-2" colSpan={3} style={{background:'#92400e'}}>
                        TRẮC NGHIỆM ĐÚNG/SAI<br/>
                        <span className="text-[9px] font-semibold opacity-80">(Câu 13 → Câu 16) — 16 ý</span>
                      </th>
                      <th className="border border-slate-600 p-2" colSpan={4} style={{background:'#7f1d1d'}}>
                        TRẢ LỜI NGẮN<br/>
                        <span className="text-[9px] font-semibold opacity-80">(Câu 17 → Câu 22)</span>
                      </th>
                    </tr>
                    {/* Hàng 3: sub-header */}
                    <tr className="text-center text-[10px] font-black">
                      {/* TNPA */}
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#d1fae5',color:'#065f46'}}>Nhận biết<br/><span className="font-normal text-[9px]">(NB)</span></th>
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#d1fae5',color:'#065f46'}}>Thông hiểu<br/><span className="font-normal text-[9px]">(TH)</span></th>
                      {/* Đúng/Sai — tính theo ý */}
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#fef3c7',color:'#92400e'}}>NB<br/><span className="font-normal text-[9px]">4 ý (a)</span></th>
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#fef3c7',color:'#92400e'}}>TH<br/><span className="font-normal text-[9px]">8 ý (b,c)</span></th>
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#fef3c7',color:'#92400e'}}>VD<br/><span className="font-normal text-[9px]">4 ý (d)</span></th>
                      {/* Trả lời ngắn */}
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#ffe4e6',color:'#7f1d1d'}}>NB<br/><span className="font-normal text-[9px]">(câu 17,18)</span></th>
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#ffe4e6',color:'#7f1d1d'}}>TH<br/><span className="font-normal text-[9px]">(câu 19,20)</span></th>
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#ffe4e6',color:'#7f1d1d'}}>VD<br/><span className="font-normal text-[9px]">(câu 21)</span></th>
                      <th className="border border-slate-300 p-2 w-14" style={{background:'#ffe4e6',color:'#7f1d1d'}}>VDC<br/><span className="font-normal text-[9px]">(câu 22)</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      let globalCounter = 0;
                      const rows = data.flatMap((chuong, cIdx) =>
                        chuong.noiDungs.map((nd: any, nIdx: number) => {
                          globalCounter++;
                          // === TNPA (Trắc nghiệm nhiều phương án): Câu 1-12 ===
                          const nlcNB = countQuestions(nd.mucDos[0].qs.nlc); // Nhận biết
                          const nlcTH = countQuestions(nd.mucDos[1].qs.nlc); // Thông hiểu

                          // === Đúng/Sai: 4 câu × 4 ý = 16 ý ===
                          // Cấu trúc: câu 13a,14a,15a,16a = NB (4 ý)
                          //           câu 13b,13c,14b,14c,15b,15c,16b,16c = TH (8 ý)
                          //           câu 13d,14d,15d,16d = VD (4 ý)
                          // Mỗi câu DS nhập ở mức NB: tổng số câu DS
                          const dsCauTotal = countQuestions(nd.mucDos[0].qs.ds)
                                          + countQuestions(nd.mucDos[1].qs.ds)
                                          + countQuestions(nd.mucDos[2].qs.ds);
                          // Phân phối ý theo tỷ lệ chuẩn: NB=1ý, TH=2ý, VD=1ý
                          const dsYNB = dsCauTotal * 1; // 4 ý NB (ý a)
                          const dsYTH = dsCauTotal * 2; // 8 ý TH (ý b,c)
                          const dsYVD = dsCauTotal * 1; // 4 ý VD (ý d)

                          // === Trả lời ngắn: Câu 17-22 (6 câu) ===
                          // NB: câu 17,18 (mức 0)
                          // TH: câu 19,20 (mức 1)
                          // VD: câu 21   (mức 2 — phần đầu)
                          // VDC: câu 22  (mức 2 — phần sau)
                          const tlnNB  = countQuestions(nd.mucDos[0].qs.tln);
                          const tlnTH  = countQuestions(nd.mucDos[1].qs.tln);
                          const tlnVDRaw = countQuestions(nd.mucDos[2].qs.tln);
                          const tlnVD  = Math.ceil(tlnVDRaw / 2);  // câu 21
                          const tlnVDC = Math.floor(tlnVDRaw / 2); // câu 22

                          const rowTotal = nlcNB + nlcTH + dsCauTotal + tlnNB + tlnTH + tlnVDRaw;
                          return (
                            <tr key={`mt-${cIdx}-${nIdx}`} className="hover:bg-indigo-50/30 transition-colors">
                              <td className="border border-slate-200 p-3 text-center text-slate-500 font-bold">{globalCounter}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-indigo-700">{nd.soTiet || ''}</td>
                              <td className="border border-slate-200 p-3 font-semibold text-slate-800">
                                {nd.tenNoiDung || <span className="text-slate-300 italic font-normal">Chưa nhập nội dung...</span>}
                              </td>
                              {/* TNPA */}
                              <td className="border border-slate-200 p-3 text-center font-black text-emerald-800" style={{background:'#f0fdf4'}}>{nlcNB || ''}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-emerald-800" style={{background:'#f0fdf4'}}>{nlcTH || ''}</td>
                              {/* Đúng/Sai (ý) */}
                              <td className="border border-slate-200 p-3 text-center font-black text-amber-800" style={{background:'#fffbeb'}}>{dsYNB || ''}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-amber-800" style={{background:'#fffbeb'}}>{dsYTH || ''}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-amber-800" style={{background:'#fffbeb'}}>{dsYVD || ''}</td>
                              {/* Trả lời ngắn */}
                              <td className="border border-slate-200 p-3 text-center font-black text-rose-800" style={{background:'#fff1f2'}}>{tlnNB || ''}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-rose-800" style={{background:'#fff1f2'}}>{tlnTH || ''}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-rose-800" style={{background:'#fff1f2'}}>{tlnVD || ''}</td>
                              <td className="border border-slate-200 p-3 text-center font-black text-rose-800" style={{background:'#fff1f2'}}>{tlnVDC || ''}</td>
                              {/* Tổng */}
                              <td className="border border-slate-200 p-3 text-center font-black text-indigo-700 bg-indigo-50">{rowTotal > 0 ? rowTotal : ''}</td>
                              <td className="border border-slate-200 p-3 text-center text-slate-500 font-medium">
                                {totals.total > 0 ? ((rowTotal / totals.total) * 100).toFixed(0) + '%' : ''}
                              </td>
                            </tr>
                          );
                        })
                      );
                      if (rows.length === 0) {
                        return (
                          <tr>
                            <td colSpan={14} className="text-center p-16">
                              <div className="flex flex-col items-center text-slate-300">
                                <FileText className="w-12 h-12 mb-3 opacity-20" />
                                <p className="italic font-medium text-slate-400">Chưa có dữ liệu. Vui lòng nhập tại tab Nhập liệu.</p>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                      return rows;
                    })()}

                    {/* Hàng TỔNG CỘNG */}
                    {(() => {
                      const sumNlcNB   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[0].qs.nlc), 0), 0);
                      const sumNlcTH   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[1].qs.nlc), 0), 0);
                      const sumDsCau   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) =>
                        s + countQuestions(nd.mucDos[0].qs.ds) + countQuestions(nd.mucDos[1].qs.ds) + countQuestions(nd.mucDos[2].qs.ds), 0), 0);
                      const sumDsYNB   = sumDsCau * 1;
                      const sumDsYTH   = sumDsCau * 2;
                      const sumDsYVD   = sumDsCau * 1;
                      const sumTlnNB   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[0].qs.tln), 0), 0);
                      const sumTlnTH   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[1].qs.tln), 0), 0);
                      const sumTlnVDRaw = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[2].qs.tln), 0), 0);
                      const sumTlnVD   = Math.ceil(sumTlnVDRaw / 2);
                      const sumTlnVDC  = Math.floor(sumTlnVDRaw / 2);
                      const grandTotal = sumNlcNB + sumNlcTH + sumDsCau + sumTlnNB + sumTlnTH + sumTlnVDRaw;
                      return (
                        <tr className="bg-slate-900 text-white font-black text-center text-sm">
                          <td className="border border-slate-700 p-4 text-center" colSpan={3}>TỔNG CỘNG</td>
                          <td className="border border-slate-700 p-4">{sumNlcNB}</td>
                          <td className="border border-slate-700 p-4">{sumNlcTH}</td>
                          <td className="border border-slate-700 p-4">{sumDsYNB}</td>
                          <td className="border border-slate-700 p-4">{sumDsYTH}</td>
                          <td className="border border-slate-700 p-4">{sumDsYVD}</td>
                          <td className="border border-slate-700 p-4">{sumTlnNB}</td>
                          <td className="border border-slate-700 p-4">{sumTlnTH}</td>
                          <td className="border border-slate-700 p-4">{sumTlnVD}</td>
                          <td className="border border-slate-700 p-4">{sumTlnVDC}</td>
                          <td className="border border-slate-700 p-4 bg-indigo-600">{grandTotal}</td>
                          <td className="border border-slate-700 p-4">100%</td>
                        </tr>
                      );
                    })()}

                    {/* Hàng chú thích cấu trúc câu hỏi */}
                    {(() => {
                      const sumNlcNB   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[0].qs.nlc), 0), 0);
                      const sumNlcTH   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[1].qs.nlc), 0), 0);
                      const sumDsCau   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) =>
                        s + countQuestions(nd.mucDos[0].qs.ds) + countQuestions(nd.mucDos[1].qs.ds) + countQuestions(nd.mucDos[2].qs.ds), 0), 0);
                      const sumTlnNB   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[0].qs.tln), 0), 0);
                      const sumTlnTH   = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[1].qs.tln), 0), 0);
                      const sumTlnVDRaw = data.reduce((a, c) => a + c.noiDungs.reduce((s: number, nd: any) => s + countQuestions(nd.mucDos[2].qs.tln), 0), 0);
                      return (
                        <tr className="text-center text-[10px] font-bold" style={{background:'#1e3a5f', color:'#93c5fd'}}>
                          <td className="border border-slate-600 p-2 text-left" colSpan={3} style={{paddingLeft:'1rem'}}>
                            <span className="font-black">Số câu:</span>&nbsp;
                            TNPA <strong>{sumNlcNB + sumNlcTH}</strong>/12&nbsp;·&nbsp;
                            Đ/S <strong>{sumDsCau}</strong>/4 câu ({sumDsCau*4}/16 ý)&nbsp;·&nbsp;
                            TLN <strong>{sumTlnNB + sumTlnTH + sumTlnVDRaw}</strong>/6
                          </td>
                          <td className="border border-slate-600 p-2" colSpan={2}>
                            Câu 1→12
                          </td>
                          <td className="border border-slate-600 p-2" colSpan={3}>
                            Câu 13→16 (a,b,c,d)
                          </td>
                          <td className="border border-slate-600 p-2" colSpan={4}>
                            Câu 17→22
                          </td>
                          <td className="border border-slate-600 p-2" colSpan={2}></td>
                        </tr>
                      );
                    })()}
                  </tbody>
                </table>
              </div>


              {/* Bottom Cards Summary */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border-2 border-emerald-100 shadow-lg flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-base">I</span>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-0.5">PHẦN I: TRẮC NGHIỆM</h3>
                    <p className="text-xl font-black text-slate-900">{totals.p1}<span className="text-xs text-slate-400 font-bold"> / 12 câu</span></p>
                    <p className="text-[10px] text-slate-400 font-medium">Câu 1 → 12</p>
                    <p className="text-xs text-slate-500">Điểm: <span className="text-emerald-600 font-black">{(totals.p1 * 0.25).toFixed(2)} / 3.00đ</span></p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border-2 border-amber-100 shadow-lg flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-base">II</span>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-0.5">PHẦN II: ĐÚNG/SAI</h3>
                    <p className="text-xl font-black text-slate-900">{totals.p2}<span className="text-xs text-slate-400 font-bold"> / 4 câu</span></p>
                    <p className="text-[10px] text-slate-400 font-medium">Câu 13→16 · NB:4ý · TH:8ý · VD:4ý</p>
                    <p className="text-xs text-slate-500">Điểm: <span className="text-amber-600 font-black">{(totals.p2 * 1.0).toFixed(2)} / 4.00đ</span></p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border-2 border-rose-100 shadow-lg flex items-center space-x-4">
                  <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-base">III</span>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-rose-700 uppercase tracking-widest mb-0.5">PHẦN III: TRẢ LỜI NGẮN</h3>
                    <p className="text-xl font-black text-slate-900">{totals.p3}<span className="text-xs text-slate-400 font-bold"> / 6 câu</span></p>
                    <p className="text-[10px] text-slate-400 font-medium">Câu 17→22 · NB·TH·VD·VDC</p>
                    <p className="text-xs text-slate-500">Điểm: <span className="text-rose-600 font-black">{(totals.p3 * 0.5).toFixed(2)} / 3.00đ</span></p>
                  </div>
                </div>
                <div className="bg-slate-900 p-5 rounded-2xl shadow-xl flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Tổng điểm</h3>
                    <p className="text-xl font-black text-white">{(totals.p1*0.25 + totals.p2*1.0 + totals.p3*0.5).toFixed(2)}<span className="text-xs text-slate-400 font-bold"> / 10.00đ</span></p>
                    <p className="text-xs text-slate-400">Tổng câu: <span className="text-slate-200 font-black">{totals.total}</span> (22 câu)</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                App được thiết kế bởi <span className="text-slate-900">Bùi Thị Kiên</span>
              </div>
            </motion.div>
          )}

          {/* TAB 3: BẢNG ĐẶC TẢ */}
          {activeTab === 'dac-ta' && (
            <motion.div 
              key="dac-ta"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Bảng Đặc tả Đề thi</h2>
                  <p className="text-slate-500 text-sm mt-1">Chi tiết yêu cầu cần đạt và cấu trúc phân bổ câu hỏi.</p>
                </div>
                <button onClick={exportToWordDacTa} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center shadow-lg shadow-slate-200">
                  <Download className="w-4 h-4 mr-2" /> Xuất File Word
                </button>
              </div>

              <div className="overflow-x-auto -mx-8 px-8">
                <table id="dac-ta-table" className="w-full border-collapse text-sm min-w-[1200px]">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="border border-slate-800 p-4 w-12 text-[10px] uppercase font-black" rowSpan={3}>TT</th>
                      <th className="border border-slate-800 p-4 w-56 text-[10px] uppercase font-black" rowSpan={3}>Chương / Chủ đề</th>
                      <th className="border border-slate-800 p-4 w-48 text-[10px] uppercase font-black" rowSpan={3}>Nội dung kiến thức</th>
                      <th className="border border-slate-800 p-4 w-32 text-[10px] uppercase font-black" rowSpan={3}>Mức độ</th>
                      <th className="border border-slate-800 p-4 text-[10px] uppercase font-black" rowSpan={3}>Yêu cầu cần đạt</th>
                      <th className="border border-slate-800 p-2 text-[10px] uppercase font-black text-center" colSpan={8}>Số câu hỏi theo mức độ nhận thức</th>
                    </tr>
                    <tr>
                      <th className="border border-slate-700 p-2 text-[9px] uppercase font-bold text-center" colSpan={2} style={{background:'#065f46',color:'#fff'}}>TNPA (C1–C12)</th>
                      <th className="border border-slate-700 p-2 text-[9px] uppercase font-bold text-center" colSpan={3} style={{background:'#92400e',color:'#fff'}}>Đúng/Sai · 16 ý (C13–C16)</th>
                      <th className="border border-slate-700 p-2 text-[9px] uppercase font-bold text-center" colSpan={3} style={{background:'#7f1d1d',color:'#fff'}}>Trả lời ngắn (C17–C22)</th>
                    </tr>
                    <tr className="bg-slate-100 text-slate-600">
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#d1fae5',color:'#065f46'}}>NB<br/>(Biết)</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#d1fae5',color:'#065f46'}}>TH<br/>(Hiểu)</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#fef3c7',color:'#92400e'}}>NB<br/>4ý(a)</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#fef3c7',color:'#92400e'}}>TH<br/>8ý(bc)</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#fef3c7',color:'#92400e'}}>VD<br/>4ý(d)</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#ffe4e6',color:'#7f1d1d'}}>TH<br/>C17,18</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#ffe4e6',color:'#7f1d1d'}}>VD<br/>C19,20</th>
                      <th className="border border-slate-200 p-1.5 w-14 text-[8px] font-black" style={{background:'#ffe4e6',color:'#7f1d1d'}}>VDC<br/>C21,22</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {data.map((chuong, cIdx) => (
                      chuong.tenChuong && chuong.noiDungs.map((nd: any, nIdx: number) => (
                        nd.tenNoiDung && nd.mucDos.map((md: any, mIdx: number) => {
                          // TLN mIdx2: split VD(ceil) / VDC(floor)
                          const tlnRaw2 = mIdx === 2 ? (md.qs.tln || '') : '';
                          const tlnTokens2 = tlnRaw2.split(/[,;\s]+/).filter((s:string) => s && s.match(/\d/));
                          const tlnVDCount  = Math.ceil(tlnTokens2.length / 2);
                          const tlnVDCCount = Math.floor(tlnTokens2.length / 2);
                          // TLN mIdx1: TH câu (câu 17,18)
                          const tlnTH = mIdx === 1 ? (md.qs.tln || '') : '';
                          // Label từng câu TLN
                          const labelTH  = tlnTH  ? tlnTH.split(/[,;\s]+/).filter((s:string)=>s&&s.match(/\d/)).map((s:string)=>`C${s.replace(/\D/g,'')}`).join(' ') : '';
                          const labelVD  = tlnVDCount  > 0 ? tlnTokens2.slice(0,tlnVDCount).map((s:string)=>`C${s.replace(/\D/g,'')}`).join(' ') : '';
                          const labelVDC = tlnVDCCount > 0 ? tlnTokens2.slice(tlnVDCount).map((s:string)=>`C${s.replace(/\D/g,'')}`).join(' ') : '';
                          return (
                            <tr key={`row-${cIdx}-${nIdx}-${mIdx}`} className="hover:bg-indigo-50/30 transition-colors group">
                              {nIdx === 0 && mIdx === 0 && (
                                <td className="border border-slate-200 p-4 font-black text-center bg-slate-50" rowSpan={calculateRowSpan(chuong)}>{cIdx + 1}</td>
                              )}
                              {nIdx === 0 && mIdx === 0 && (
                                <td className="border border-slate-200 p-4 font-black text-slate-900 bg-slate-50" rowSpan={calculateRowSpan(chuong)}>{chuong.tenChuong}</td>
                              )}
                              {mIdx === 0 && (
                                <td className="border border-slate-200 p-4 font-bold text-indigo-600" rowSpan={nd.mucDos.length}>{nd.tenNoiDung}</td>
                              )}
                              <td className={`border border-slate-200 p-3 text-[11px] font-black text-center uppercase tracking-tighter ${md.color}`}>
                                {md.tenMucDo}
                              </td>
                              <td className="border border-slate-200 p-3 whitespace-pre-line text-[11px] leading-relaxed text-justify text-slate-600">
                                {md.yeuCau || '---'}
                              </td>
                              {/* TNPA NB=mIdx0, TH=mIdx1 */}
                              <td className="border border-slate-200 p-2 text-center font-bold text-emerald-800 text-[10px]" style={{background:'#f0fdf4'}}>{mIdx === 0 ? (md.qs.nlc || '') : ''}</td>
                              <td className="border border-slate-200 p-2 text-center font-bold text-emerald-800 text-[10px]" style={{background:'#f0fdf4'}}>{mIdx === 1 ? (md.qs.nlc || '') : ''}</td>
                              {/* DS: 4 câu 13-16, mỗi câu 4 ý: a=NB, b,c=TH, d=VD */}
                              <td className="border border-slate-200 p-2 text-center font-bold text-amber-800 text-[10px]" style={{background:'#fffbeb'}}>{mIdx === 0 ? (md.qs.ds || '') : ''}</td>
                              <td className="border border-slate-200 p-2 text-center font-bold text-amber-800 text-[10px]" style={{background:'#fffbeb'}}>{mIdx === 1 ? (md.qs.ds || '') : ''}</td>
                              <td className="border border-slate-200 p-2 text-center font-bold text-amber-800 text-[10px]" style={{background:'#fffbeb'}}>{mIdx === 2 ? (md.qs.ds || '') : ''}</td>
                              {/* TLN: TH=mIdx1(câu17,18), VD=mIdx2 ceil, VDC=mIdx2 floor */}
                              <td className="border border-slate-200 p-2 text-center font-bold text-rose-800 text-[10px]" style={{background:'#fff1f2'}}>
                                {mIdx === 1 && labelTH ? <span title={md.qs.tln}>{labelTH}</span> : ''}
                              </td>
                              <td className="border border-slate-200 p-2 text-center font-bold text-rose-800 text-[10px]" style={{background:'#fff1f2'}}>
                                {mIdx === 2 && labelVD ? <span title={tlnTokens2.slice(0,tlnVDCount).join(', ')}>{labelVD}</span> : ''}
                              </td>
                              <td className="border border-slate-200 p-2 text-center font-bold text-rose-800 text-[10px]" style={{background:'#fff1f2'}}>
                                {mIdx === 2 && labelVDC ? <span title={tlnTokens2.slice(tlnVDCount).join(', ')}>{labelVDC}</span> : ''}
                              </td>
                            </tr>
                          );
                        })
                      ))
                    ))}
                    {data.every(c => !c.tenChuong) && (
                      <tr>
                        <td colSpan={14} className="text-center p-20">
                          <div className="flex flex-col items-center justify-center text-slate-300">
                            <FileText className="w-16 h-16 mb-4 opacity-20" />
                            <p className="italic font-medium">Chưa có dữ liệu. Vui lòng thiết lập cấu trúc tại tab Nhập liệu.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 4: TẠO ĐỀ TỰ ĐỘNG */}
          {activeTab === 'tao-de' && (
            <TabTaoDeTuDong data={data} countQuestions={countQuestions} />
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-4xl mx-auto mt-20 text-center pb-12 border-t border-slate-200 pt-8">
        <p className="text-slate-400 text-[10px] uppercase font-black tracking-[0.3em]">Math Matrix Pro &copy; 2026</p>
        <p className="text-slate-400 text-[10px] mt-2 italic">Dành cho giáo viên tối ưu hóa quy trình kiểm tra đánh giá</p>
      </footer>
    </div>
  );
}




type CauHoi = {
  id: number;
  phan: 'nlc' | 'ds' | 'tln';
  soThuTu: number;
  chuong: string;
  noiDung: string;
  mucDo: string;
  yeuCau: string;
  noiDungCauHoi: string;
  dapAn: string;
};

function allocateByTiet(quota: number, items: Array<{ soTiet: number }>): number[] {
  if (items.length === 0) return [];
  const totalTiet = items.reduce((s, nd) => s + nd.soTiet, 0);
  if (totalTiet === 0) {
    const base = Math.floor(quota / items.length);
    const alloc = items.map(() => base);
    let rem = quota - base * items.length;
    for (let i = 0; rem > 0 && i < items.length; i++, rem--) alloc[i]++;
    return alloc;
  }
  const exact = items.map(nd => (nd.soTiet / totalTiet) * quota);
  const floor = exact.map(v => Math.floor(v));
  let needed = quota - floor.reduce((a, b) => a + b, 0);
  const order = exact.map((v, i) => ({ rem: v - floor[i], i })).sort((a, b) => b.rem - a.rem);
  for (let k = 0; k < needed; k++) floor[order[k].i]++;
  return floor;
}



function getQuestionsFromBank(noiDung: string, phan: 'nlc'|'ds'|'tln', mucDo: string): QBankEntry | undefined {
  const noi = noiDung.toLowerCase();
  const allKeys = Object.keys(QUESTION_BANK).filter(k => k !== 'default');
  // Lấy tất cả các key có chứa từ khóa khớp với noiDung
  const matchedKeys = allKeys.filter(k => {
    const kWords = k.split(' ');
    return kWords.some(w => w.length > 3 && noi.includes(w));
  });
  const targetMucDo = mucDo === 'Nhận biết' ? 'NB' : mucDo.includes('Thông') ? 'TH' : mucDo === 'Vận dụng cao' ? 'VDC' : 'VD';
  // Gom câu hỏi từ tất cả key phù hợp
  let pool: QBankEntry[] = [];
  for (const key of (matchedKeys.length > 0 ? matchedKeys : ['default'])) {
    pool = pool.concat((QUESTION_BANK[key] || []).filter(q => q.phan === phan && q.mucDo === targetMucDo));
  }
  // Fallback 1: bất kỳ câu nào trong default cùng phan + mức độ
  if (pool.length === 0) pool = QUESTION_BANK['default'].filter(q => q.phan === phan && q.mucDo === targetMucDo);
  // Fallback 2: bất kỳ câu nào trong default cùng phan
  if (pool.length === 0) pool = QUESTION_BANK['default'].filter(q => q.phan === phan);
  return pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : undefined;
}

function generateExamQuestions(data: any[], countQuestions: (s: string) => number): CauHoi[] {
  const MUC_DO_MAP: Record<number, string> = { 0: 'Nhận biết', 1: 'Thông hiểu', 2: 'Vận dụng' };
  // Mức độ TLN: mucDos[1]=TH, mucDos[2]=VD (ta tách VD & VDC từ mucDos[2].qs.tln chia đôi)

  const result: CauHoi[] = [];
  let nlcCount = 0, dsCount = 0, tlnCount = 0;

  // Duyệt từng chủ đề trong ma trận
  data.forEach((chuong: any) => {
    if (!chuong.tenChuong) return;
    chuong.noiDungs.forEach((nd: any) => {
      if (!nd.tenNoiDung) return;

      // ── PHẦN I: Trắc nghiệm nhiều phương án (nlc) ──────────────────
      // Đọc từng mức độ từ ma trận
      nd.mucDos.forEach((md: any, mIdx: number) => {
        const n = countQuestions(md.qs.nlc);
        if (n <= 0) return;
        const mucDoTen = MUC_DO_MAP[mIdx] || 'Vận dụng';
        for (let k = 0; k < n; k++) {
          const bq = getQuestionsFromBank(nd.tenNoiDung, 'nlc', mucDoTen);
          nlcCount++;
          result.push({
            id: Date.now() + Math.random(),
            phan: 'nlc', soThuTu: nlcCount,
            chuong: chuong.tenChuong,
            noiDung: nd.tenNoiDung,
            mucDo: mucDoTen,
            yeuCau: md.yeuCau || '',
            noiDungCauHoi: bq ? bq.noiDung : `[${mucDoTen.toUpperCase()}] ${nd.tenNoiDung}\nA. Phương án A\u2003B. Phương án B\u2003C. Phương án C\u2003D. Phương án D`,
            dapAn: bq ? bq.dapAn : 'A',
          });
        }
      });

      // ── PHẦN II: Đúng/Sai (ds) ─────────────────────────────────────
      // Số câu DS = tổng câu DS của chủ đề (dùng tổng 3 mức vì mỗi câu DS gồm 4 ý hỗn hợp)
      const nDs = nd.mucDos.reduce((s: number, md: any) => s + countQuestions(md.qs.ds), 0);
      for (let k = 0; k < nDs; k++) {
        const bq = getQuestionsFromBank(nd.tenNoiDung, 'ds', 'NB');
        dsCount++;
        result.push({
          id: Date.now() + Math.random(),
          phan: 'ds', soThuTu: dsCount,
          chuong: chuong.tenChuong,
          noiDung: nd.tenNoiDung,
          mucDo: 'Hỗn hợp (NB+TH+TH+VD)',
          yeuCau: nd.mucDos[1]?.yeuCau || '',
          noiDungCauHoi: bq ? bq.noiDung :
            `Cho các mệnh đề sau về "${nd.tenNoiDung}", xác định Đúng (Đ) hoặc Sai (S):\na) [Nhận biết] Mệnh đề 1\nb) [Thông hiểu] Mệnh đề 2\nc) [Thông hiểu] Mệnh đề 3\nd) [Vận dụng] Mệnh đề 4`,
          dapAn: bq ? bq.dapAn : 'Đ S Đ S',
        });
      }

      // ── PHẦN III: Trả lời ngắn (tln) – Câu 17→22 ──────────────────────
      // Cấu trúc chuẩn 2025 (không có NB trong TLN):
      //   TH  (câu 17,18): đọc từ mucDos[1].qs.tln
      //   VD  (câu 19,20): ceil(mucDos[2].qs.tln / 2)
      //   VDC (câu 21,22): floor(mucDos[2].qs.tln / 2)
      const nTlnTH     = countQuestions(nd.mucDos[1]?.qs?.tln || '');
      const nTlnVD_raw = countQuestions(nd.mucDos[2]?.qs?.tln || '');
      const nTlnVD     = Math.ceil(nTlnVD_raw / 2);
      const nTlnVDC    = Math.floor(nTlnVD_raw / 2);
      // TLN – Thông hiểu (câu 19, 20)
      for (let k = 0; k < nTlnTH; k++) {
        const bq = getQuestionsFromBank(nd.tenNoiDung, 'tln', 'Thông hiểu');
        tlnCount++;
        result.push({
          id: Date.now() + Math.random(),
          phan: 'tln', soThuTu: tlnCount,
          chuong: chuong.tenChuong,
          noiDung: nd.tenNoiDung,
          mucDo: 'Thông hiểu',
          yeuCau: nd.mucDos[1]?.yeuCau || '',
          noiDungCauHoi: bq ? bq.noiDung : `[THÔNG HIỂU – TLN] ${nd.tenNoiDung}`,
          dapAn: bq ? bq.dapAn : '...',
        });
      }
      // TLN – Vận dụng (câu 21)
      for (let k = 0; k < nTlnVD; k++) {
        const bq = getQuestionsFromBank(nd.tenNoiDung, 'tln', 'Vận dụng');
        tlnCount++;
        result.push({
          id: Date.now() + Math.random(),
          phan: 'tln', soThuTu: tlnCount,
          chuong: chuong.tenChuong,
          noiDung: nd.tenNoiDung,
          mucDo: 'Vận dụng',
          yeuCau: nd.mucDos[2]?.yeuCau || '',
          noiDungCauHoi: bq ? bq.noiDung : `[VẬN DỤNG – TLN] ${nd.tenNoiDung}`,
          dapAn: bq ? bq.dapAn : '...',
        });
      }
      // TLN – Vận dụng cao (câu 22)
      for (let k = 0; k < nTlnVDC; k++) {
        const bq = getQuestionsFromBank(nd.tenNoiDung, 'tln', 'Vận dụng cao');
        tlnCount++;
        result.push({
          id: Date.now() + Math.random(),
          phan: 'tln', soThuTu: tlnCount,
          chuong: chuong.tenChuong,
          noiDung: nd.tenNoiDung,
          mucDo: 'Vận dụng cao',
          yeuCau: nd.mucDos[2]?.yeuCau || '',
          noiDungCauHoi: bq ? bq.noiDung : `[VẬN DỤNG CAO – TLN] ${nd.tenNoiDung}`,
          dapAn: bq ? bq.dapAn : '...',
        });
      }
    });
  });

  // Đánh lại số thứ tự theo từng phần
  let n1 = 0, n2 = 0, n3 = 0;
  return result.map(q => {
    if (q.phan === 'nlc') return { ...q, soThuTu: ++n1 };
    if (q.phan === 'ds')  return { ...q, soThuTu: ++n2 };
    return { ...q, soThuTu: ++n3 };
  });
}




function TabTaoDeTuDong({ data, countQuestions }: { data: any[], countQuestions: (s: string) => number }) {
  const [cauHois, setCauHois] = React.useState<CauHoi[]>([]);
  const [isGenerated, setIsGenerated] = React.useState(false);
  const [tenTruong, setTenTruong] = React.useState('TRƯỜNG THPT ...');
  // KaTeX auto-render sau khi sinh đề
  const mathRef = useMathRender([cauHois, isGenerated]);
  const [tenDe, setTenDe] = React.useState('ĐỀ KIỂM TRA MÔN TOÁN 12');
  const [thoiGian, setThoiGian] = React.useState('90');
  const [nguonTaiLieu, setNguonTaiLieu] = React.useState('thuvienhoclieu.com');
  const [hienThiDapAn, setHienThiDapAn] = React.useState(false);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [warnMsg, setWarnMsg] = React.useState<string>('');

  // ── NGUỒN TÀI LIỆU ──────────────────────────────────────────
  const [showNguon, setShowNguon] = React.useState(true);
  const [keywordSearch, setKeywordSearch] = React.useState('');
  const [pasteTxt, setPasteTxt] = React.useState('');
  const [importedCount, setImportedCount] = React.useState(0);
  const [extraBank, setExtraBank] = React.useState<Array<{noiDung: string, dapAn: string, phan: string}>>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const ONLINE_SOURCES = [
    {
      name: 'Thư viện Học liệu',
      url: 'https://thuvienhoclieu.com',
      searchUrl: (kw: string) => `https://thuvienhoclieu.com/?s=${encodeURIComponent(kw)}`,
      color: 'bg-blue-600', hoverColor: 'hover:bg-blue-700',
      icon: '📚', desc: 'Kho đề thi & tài liệu chính thức BGD',
    },
    {
      name: 'Toanmath.com',
      url: 'https://toanmath.com',
      searchUrl: (kw: string) => `https://toanmath.com/?s=${encodeURIComponent(kw)}`,
      color: 'bg-emerald-600', hoverColor: 'hover:bg-emerald-700',
      icon: '📐', desc: 'Trắc nghiệm & đề thi Toán chuyên sâu',
    },
  ];

  // Xử lý upload file từ ổ D / ổ C
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    let count = 0;
    const newBank: Array<{noiDung: string, dapAn: string, phan: string}> = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string || '';
        // Phân tích từng dòng: nếu dòng bắt đầu bằng số thứ tự hoặc "Câu" => question
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 10);
        lines.forEach(line => {
          const trimmed = line.trim();
          // Tìm đáp án ở cuối dòng dạng "ĐA: A" hoặc "Đáp án: ..."
          const dapAnMatch = trimmed.match(/(?:đ[aá]p\s*[aá]n|ĐA|DA)[\s:]+([A-Dd\.\-\w]+)/i);
          const dapAn = dapAnMatch ? dapAnMatch[1].trim() : '...';
          const noiDung = trimmed.replace(/(?:đ[aá]p\s*[aá]n|ĐA|DA)[\s:]+[A-Dd\.\-\w]+/i, '').trim();
          if (noiDung.length > 8) {
            newBank.push({ noiDung, dapAn, phan: 'nlc' });
            count++;
          }
        });
        setExtraBank(prev => [...prev, ...newBank]);
        setImportedCount(prev => prev + count);
      };
      reader.readAsText(file as File, 'utf-8');
    });
    // Reset input để cho phép tải lại cùng file
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Xử lý dán văn bản thủ công
  const handlePasteImport = () => {
    if (!pasteTxt.trim()) return;
    const lines = pasteTxt.split(/\r?\n/).filter(l => l.trim().length > 10);
    const newBank: Array<{noiDung: string, dapAn: string, phan: string}> = [];
    lines.forEach(line => {
      const trimmed = line.trim();
      const dapAnMatch = trimmed.match(/(?:đ[aá]p\s*[aá]n|ĐA|DA)[\s:]+([A-Dd\.\-\w]+)/i);
      const dapAn = dapAnMatch ? dapAnMatch[1].trim() : '...';
      const noiDung = trimmed.replace(/(?:đ[aá]p\s*[aá]n|ĐA|DA)[\s:]+[A-Dd\.\-\w]+/i, '').trim();
      if (noiDung.length > 8) newBank.push({ noiDung, dapAn, phan: 'nlc' });
    });
    setExtraBank(prev => [...prev, ...newBank]);
    setImportedCount(prev => prev + newBank.length);
    setPasteTxt('');
  };

  const QUOTA = { nlc: 12, ds: 4, tln: 6 };
  const hasData = data.some(c => c.tenChuong && c.noiDungs.some((nd: any) => nd.tenNoiDung));
  const nlcQuestions = cauHois.filter(q => q.phan === 'nlc');
  const dsQuestions  = cauHois.filter(q => q.phan === 'ds');
  const tlnQuestions = cauHois.filter(q => q.phan === 'tln');

  const handleGenerate = () => {
    const qs = generateExamQuestions(data, countQuestions);
    setCauHois(qs);
    setIsGenerated(true);
    setEditingId(null);
    // Kiểm tra và cảnh báo nếu thiếu câu
    const nlcRaw = qs.filter(q => q.phan === 'nlc').length;
    const dsRaw  = qs.filter(q => q.phan === 'ds').length;
    const tlnRaw = qs.filter(q => q.phan === 'tln').length;
    const warns: string[] = [];
    if (nlcRaw < QUOTA.nlc) warns.push(`Trắc nghiệm nhiều phương án: ma trận có ${nlcRaw}/${QUOTA.nlc} câu`);
    if (dsRaw  < QUOTA.ds)  warns.push(`Đúng/Sai: ma trận có ${dsRaw}/${QUOTA.ds} câu`);
    if (tlnRaw < QUOTA.tln) warns.push(`Trả lời ngắn: ma trận có ${tlnRaw}/${QUOTA.tln} câu`);
    setWarnMsg(warns.length ? '⚠️ Lưu ý: ' + warns.join(' · ') : '');
  };

  const handleUpdateCauHoi = (id: number, field: keyof CauHoi, value: string) => {
    setCauHois(prev => prev.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const exportExamToWord = () => {
    const phanI = nlcQuestions.map((q, i) => `
      <tr>
        <td style="border:1px solid #ccc;padding:8px;width:30px;text-align:center;font-weight:bold">${i + 1}</td>
        <td style="border:1px solid #ccc;padding:8px;">${q.noiDungCauHoi.replace(/\n/g, '<br/>')}</td>
        <td style="border:1px solid #ccc;padding:8px;text-align:center;">${q.mucDo}</td>
        <td style="border:1px solid #ccc;padding:8px;text-align:center;">${q.dapAn}</td>
      </tr>`).join('');

    const phanII = dsQuestions.map((q, i) => `
      <tr>
        <td style="border:1px solid #ccc;padding:8px;width:30px;text-align:center;font-weight:bold">${i + 1}</td>
        <td style="border:1px solid #ccc;padding:8px;">${q.noiDungCauHoi.replace(/\n/g, '<br/>')}</td>
        <td style="border:1px solid #ccc;padding:8px;text-align:center;">${q.mucDo}</td>
        <td style="border:1px solid #ccc;padding:8px;text-align:center;">${q.dapAn}</td>
      </tr>`).join('');

    const phanIII = tlnQuestions.map((q, i) => `
      <tr>
        <td style="border:1px solid #ccc;padding:8px;width:30px;text-align:center;font-weight:bold">${i + 1}</td>
        <td style="border:1px solid #ccc;padding:8px;">${q.noiDungCauHoi.replace(/\n/g, '<br/>')}</td>
        <td style="border:1px solid #ccc;padding:8px;text-align:center;">${q.mucDo}</td>
        <td style="border:1px solid #ccc;padding:8px;text-align:center;">${q.dapAn}</td>
      </tr>`).join('');

    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${tenDe}</title>
      <style>
        body { font-family: "Times New Roman", Times, serif; font-size: 12pt; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid black; padding: 6px; vertical-align: top; }
        th { background: #f0f0f0; font-weight: bold; text-align: center; }
        h1,h2,h3 { text-align: center; }
        .section-title { background: #1e293b; color: white; padding: 8px; font-weight: bold; margin: 20px 0 10px; }
      </style>
      </head>
      <body>
        <p style="text-align:center;font-weight:bold">${tenTruong}</p>
        <h2>${tenDe}</h2>
        <p style="text-align:center">Thời gian làm bài: ${thoiGian} phút (không kể thời gian phát đề)</p>
        <p style="text-align:right;font-style:italic;font-size:10pt;color:#555">📚 Nguồn tài liệu: ${nguonTaiLieu}</p>
        <hr/>

        <div class="section-title">PHẦN I. TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN (${nlcQuestions.length} câu)</div>
        <p><em>Mỗi câu trả lời đúng được 0,25 điểm. Thí sinh chỉ chọn một phương án.</em></p>
        <table>
          <tr><th>STT</th><th>Nội dung câu hỏi</th><th>Mức độ</th><th>Đáp án</th></tr>
          ${phanI}
        </table>

        <div class="section-title">PHẦN II. TRẮC NGHIỆM ĐÚNG / SAI (${dsQuestions.length} câu)</div>
        <p><em>Mỗi câu có 4 mệnh đề. Thí sinh xác định đúng (Đ) / sai (S) cho mỗi mệnh đề.</em></p>
        <table>
          <tr><th>STT</th><th>Nội dung câu hỏi</th><th>Mức độ</th><th>Đáp án</th></tr>
          ${phanII}
        </table>

        <div class="section-title">PHẦN III. TRẢ LỜI NGẮN (${tlnQuestions.length} câu)</div>
        <p><em>Thí sinh điền đáp số vào ô trả lời.</em></p>
        <table>
          <tr><th>STT</th><th>Nội dung câu hỏi</th><th>Mức độ</th><th>Đáp án</th></tr>
          ${phanIII}
        </table>
      </body>
      </html>
    `;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'De_Thi_Tu_Dong.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const phanColors = {
    nlc: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', headerBg: 'bg-emerald-600' },
    ds:  { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   badge: 'bg-amber-100 text-amber-700',   headerBg: 'bg-amber-600'   },
    tln: { bg: 'bg-rose-50',    border: 'border-rose-200',    text: 'text-rose-700',    badge: 'bg-rose-100 text-rose-700',    headerBg: 'bg-rose-600'    },
  };

  return (
    <motion.div
      key="tao-de"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
      ref={mathRef as React.RefObject<HTMLDivElement>}
    >
      {/* ── PANEL NGUỒN TÀI LIỆU ─────────────────────────────────── */}
      <div id="nguon-tai-lieu-panel" className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl border border-indigo-800 shadow-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-500/30 rounded-xl flex items-center justify-center text-lg">📂</div>
            <div>
              <h3 className="font-black text-base">Nguồn Tài Liệu Câu Hỏi</h3>
              <p className="text-indigo-300 text-[11px]">Lấy câu từ online hoặc từ file trên máy tính (ổ C, ổ D...)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {importedCount > 0 && (
              <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-black rounded-full animate-pulse">
                ✅ {importedCount} câu đã nhập
              </span>
            )}
            <button
              onClick={() => setShowNguon(!showNguon)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all"
            >
              {showNguon ? '▲ Thu gọn' : '▼ Mở rộng'}
            </button>
          </div>
        </div>

        {showNguon && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CỘT TRÁI: Nguồn Online */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-3">🌐 Nguồn Online</p>
              <div className="flex gap-2 mb-3">
                <input
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-indigo-300 outline-none focus:border-indigo-400"
                  placeholder="Nhập từ khóa tìm kiếm..."
                  value={keywordSearch}
                  onChange={e => setKeywordSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && keywordSearch.trim()) {
                      window.open(`https://thuvienhoclieu.com/?s=${encodeURIComponent(keywordSearch)}`, '_blank');
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                {ONLINE_SOURCES.map(src => (
                  <div key={src.name} className="flex items-center gap-2">
                    <button
                      onClick={() => window.open(keywordSearch.trim() ? src.searchUrl(keywordSearch) : src.url, '_blank')}
                      className={`flex-1 px-4 py-2.5 ${src.color} ${src.hoverColor} text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all`}
                    >
                      <span className="text-base">{src.icon}</span>
                      <div className="text-left">
                        <div>{src.name}</div>
                        <div className="font-normal opacity-80 text-[10px]">{src.desc}</div>
                      </div>
                      <span className="ml-auto text-[10px] opacity-70">↗</span>
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-indigo-400 text-[10px] mt-3 italic">
                💡 Sau khi tìm, dán nội dung câu hỏi vào ô bên phải để nhập vào ngân hàng
              </p>
            </div>

            {/* CỘT PHẢI: File từ máy + Dán text */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col gap-3">
              {/* Upload file từ ổ D, C */}
              <div>
                <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">💾 Từ Ổ Đĩa Máy Tính (D:, C:...)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".txt,.doc,.docx,.csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border-2 border-dashed border-violet-400"
                >
                  <span className="text-lg">📁</span>
                  Chọn file từ máy tính
                  <span className="text-[10px] bg-violet-500 px-2 py-0.5 rounded-full">.txt .doc .docx</span>
                </button>
                <p className="text-indigo-400 text-[10px] mt-1.5 italic text-center">
                  Có thể chọn nhiều file — tự động đọc và phân tích câu hỏi
                </p>
              </div>

              {/* Dán text thủ công */}
              <div className="flex-1 flex flex-col">
                <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">📋 Dán Câu Hỏi Trực Tiếp</p>
                <textarea
                  className="flex-1 min-h-[80px] px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-indigo-400 outline-none focus:border-indigo-400 resize-none font-mono"
                  placeholder={'Dán câu hỏi ở đây, mỗi câu 1 dòng:\nVí dụ: Tập xác định của hàm số... ĐA: B\nHay: Câu 1. Giá trị... Đáp án: C'}
                  value={pasteTxt}
                  onChange={e => setPasteTxt(e.target.value)}
                />
                <button
                  onClick={handlePasteImport}
                  disabled={!pasteTxt.trim()}
                  className="mt-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-xl font-bold text-xs transition-all"
                >
                  ➕ Nhập vào ngân hàng câu hỏi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── CONFIG CARD ─────────────────────────────────────────── */}
      {/* Header / Config card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Tạo đề thi tự động</h2>
            </div>
            <p className="text-slate-500 text-sm ml-[52px]">Sinh đề thi theo đúng cấu trúc ma trận và bảng đặc tả đã thiết lập.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {isGenerated && (
              <>
                <button
                  onClick={() => setHienThiDapAn(!hienThiDapAn)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center transition-all border-2 ${
                    hienThiDapAn ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {hienThiDapAn ? 'Ẩn đáp án' : 'Hiện đáp án'}
                </button>
                <button
                  onClick={exportExamToWord}
                  className="px-5 py-2.5 bg-sky-600 text-white rounded-xl font-bold text-sm flex items-center hover:bg-sky-700 transition-all shadow-md"
                >
                  <Download className="w-4 h-4 mr-2" /> Xuất Word
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thông tin đề */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tên trường / Đơn vị</label>
            <input
              className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-indigo-400 outline-none bg-slate-50 font-bold text-slate-800 text-sm transition"
              value={tenTruong}
              onChange={e => setTenTruong(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tên đề thi</label>
            <input
              className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-indigo-400 outline-none bg-slate-50 font-bold text-slate-800 text-sm transition"
              value={tenDe}
              onChange={e => setTenDe(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Thời gian (phút)</label>
            <input
              type="number"
              className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-indigo-400 outline-none bg-slate-50 font-black text-slate-800 text-sm transition"
              value={thoiGian}
              onChange={e => setThoiGian(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Nguồn tài liệu</label>
            <input
              className="w-full p-3 border-2 border-indigo-100 rounded-xl focus:border-indigo-400 outline-none bg-indigo-50/50 font-bold text-indigo-700 text-sm transition"
              value={nguonTaiLieu}
              onChange={e => setNguonTaiLieu(e.target.value)}
              placeholder="ví dụ: thuvienhoclieu.com"
            />
          </div>
        </div>

        {!hasData ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-300">
            <AlertCircle className="w-16 h-16 mb-4 opacity-30" />
            <p className="text-lg font-bold text-slate-400">Chưa có dữ liệu ma trận</p>
            <p className="text-sm text-slate-400 mt-1">Vui lòng thiết lập chương và nội dung kiến thức tại tab <strong>Nhập liệu</strong> trước.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {!isGenerated ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-indigo-300" />
                </div>
                <p className="text-slate-500 mb-6 text-sm">Nhấn nút bên dưới để sinh đề thi tự động từ ma trận và bảng đặc tả đã cài đặt.</p>
                <button
                  onClick={handleGenerate}
                  className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-base flex items-center mx-auto shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-3" /> Sinh đề thi tự động
                </button>
              </div>
            ) : (
              <div className="w-full">
                {/* C\u1ea3nh b\u00e1o n\u1ebfu thi\u1ebfu c\u00e2u */}
                {warnMsg && (
                  <div className="mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-bold text-amber-700">{warnMsg}. Vui l\u00f2ng ki\u1ec3m tra l\u1ea1i ma tr\u1eadn t\u1ea1i tab <strong>Nh\u1eadp li\u1ec7u</strong>.</p>
                  </div>
                )}
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className={`rounded-2xl p-4 flex items-center gap-4 border ${nlcQuestions.length < QUOTA.nlc ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-100'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${nlcQuestions.length < QUOTA.nlc ? 'bg-amber-500' : 'bg-emerald-500'}`}><span className="text-white font-black text-sm">I</span></div>
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-wider ${nlcQuestions.length < QUOTA.nlc ? 'text-amber-700' : 'text-emerald-700'}`}>Nhi\u1ec1u l\u1ef1a ch\u1ecdn</p>
                      <p className="text-2xl font-black text-slate-900">
                        {nlcQuestions.length}<span className="text-sm text-slate-400 font-bold">/{QUOTA.nlc}</span> <span className="text-xs text-slate-400 font-medium">c\u00e2u</span>
                      </p>
                    </div>
                  </div>
                  <div className={`rounded-2xl p-4 flex items-center gap-4 border ${dsQuestions.length < QUOTA.ds ? 'bg-amber-50 border-amber-200' : 'bg-amber-50 border-amber-100'}`}>
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center"><span className="text-white font-black text-sm">II</span></div>
                    <div>
                      <p className="text-[10px] font-black text-amber-700 uppercase tracking-wider">\u0110\u00fang / Sai</p>
                      <p className="text-2xl font-black text-slate-900">
                        {dsQuestions.length}<span className="text-sm text-slate-400 font-bold">/{QUOTA.ds}</span> <span className="text-xs text-slate-400 font-medium">c\u00e2u</span>
                      </p>
                    </div>
                  </div>
                  <div className={`rounded-2xl p-4 flex items-center gap-4 border ${tlnQuestions.length < QUOTA.tln ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-100'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tlnQuestions.length < QUOTA.tln ? 'bg-amber-500' : 'bg-rose-500'}`}><span className="text-white font-black text-sm">III</span></div>
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-wider ${tlnQuestions.length < QUOTA.tln ? 'text-amber-700' : 'text-rose-700'}`}>Tr\u1ea3 l\u1eddi ng\u1eafn</p>
                      <p className="text-2xl font-black text-slate-900">
                        {tlnQuestions.length}<span className="text-sm text-slate-400 font-bold">/{QUOTA.tln}</span> <span className="text-xs text-slate-400 font-medium">c\u00e2u</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleGenerate}
                    className="px-6 py-2.5 border-2 border-dashed border-slate-300 text-slate-500 rounded-xl font-bold text-xs hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-2" /> Sinh l\u1ea1i \u0111\u1ec1 m\u1edbi
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* \u0110\u1ec1 thi */}
      {isGenerated && cauHois.length > 0 && (
        <>
          {/* Banner th\u00f4ng tin \u0111\u1ec1 */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm px-8 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Th\u00f4ng tin \u0111\u1ec1 thi</p>
              <p className="text-lg font-black text-slate-900">{tenDe}</p>
              <p className="text-sm text-slate-500">{tenTruong} &nbsp;&middot;&nbsp; Th\u1eddi gian: <strong>{thoiGian} ph\u00fat</strong></p>
            </div>
            {nguonTaiLieu && (
              <a
                href={nguonTaiLieu.startsWith('http') ? nguonTaiLieu : `https://${nguonTaiLieu}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 border-2 border-indigo-100 rounded-2xl text-indigo-700 font-bold text-sm hover:bg-indigo-100 transition-all flex-shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                <span>Ngu\u1ed3n: <span className="underline">{nguonTaiLieu}</span></span>
              </a>
            )}
          </div>

          {/* PH\u1ea6N I */}
          {nlcQuestions.length > 0 && (

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-emerald-600 px-8 py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-black text-lg">PHẦN I. TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN</h3>
                  <p className="text-emerald-100 text-xs mt-0.5">Mỗi câu trả lời đúng được 0,25 điểm · Chọn một phương án đúng nhất · Câu 1–12</p>
                </div>
                <span className="bg-white/20 text-white font-black text-2xl px-4 py-2 rounded-2xl">{nlcQuestions.length}</span>
              </div>
          {/* ═══ PHẦN I: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN ═══════════════════ */}
          {nlcQuestions.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-emerald-600 px-8 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-black text-base">PHẦN I. TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN</h3>
                  <p className="text-emerald-100 text-xs mt-0.5">Câu 1 – {nlcQuestions.length} · Mỗi câu đúng 0,25 điểm · Chọn đáp án đúng nhất</p>
                </div>
                <span className="bg-white/20 text-white font-black text-xl px-4 py-2 rounded-2xl">{nlcQuestions.length}</span>
              </div>

              <div className="p-6 space-y-4">
                {nlcQuestions.map((q, i) => {
                  const cauSo = i + 1;
                  // Tách đề + 4 phương án A B C D
                  const raw = q.noiDungCauHoi.replace(/^\[.*?\]\s*–?\s*/, '').trim();
                  const optRegex = /\n?([A-D])\.\s*/g;
                  const splitParts = raw.split(/\n?[A-D]\.\s*/);
                  const deDan = splitParts[0].trim();
                  // Lấy label A B C D và nội dung mỗi option
                  const optMatches = [...raw.matchAll(/([A-D])\.\s*([^\n]*)/g)];
                  const options = optMatches.length > 0
                    ? optMatches.map(m => ({ label: m[1], text: m[2].trim() }))
                    : ['A', 'B', 'C', 'D'].map((lbl, k) => ({ label: lbl, text: splitParts[k + 1]?.trim() || `Phương án ${lbl}` }));

                  const keyword = encodeURIComponent(q.noiDung || '');

                  return (
                    <div key={q.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                      {/* Mini toolbar */}
                      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-50 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase">
                            {q.mucDo === 'Nhận biết' ? 'NB' : q.mucDo === 'Thông hiểu' ? 'TH' : q.mucDo === 'Vận dụng cao' ? 'VDC' : 'VD'}
                          </span>
                          <span className="text-[10px] text-slate-400 italic">{q.noiDung}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="relative group">
                            <button className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-bold hover:bg-indigo-100 transition">🔍 Tìm nguồn</button>
                            <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                              <div className="p-1.5 flex flex-col gap-0.5">
                                <a href={`https://thuvienhoclieu.com/?s=${keyword}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-blue-50 text-xs font-bold text-blue-700">📚 Thư viện Học liệu ↗</a>
                                <a href={`https://toanmath.com/?s=${keyword}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-emerald-50 text-xs font-bold text-emerald-700">📐 Toanmath.com ↗</a>
                                <a href={`https://www.google.com/search?q=${encodeURIComponent((q.noiDung||'')+' trắc nghiệm toán 12')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 text-xs text-slate-600 font-bold">🌐 Google ↗</a>
                                <button onClick={() => { setKeywordSearch(q.noiDung||''); setShowNguon(true); document.getElementById('nguon-tai-lieu-panel')?.scrollIntoView({behavior:'smooth',block:'start'}); }} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-violet-50 text-xs font-bold text-violet-700 text-left w-full">📂 Nhập file máy tính</button>
                              </div>
                            </div>
                          </div>
                          {editingId === q.id
                            ? <button onClick={() => setEditingId(null)} className="px-2 py-1 bg-slate-200 rounded-lg text-[9px] font-bold">✓ Xong</button>
                            : <button onClick={() => setEditingId(q.id)} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[9px] font-bold hover:bg-emerald-200 transition">✏ Sửa</button>
                          }
                        </div>
                      </div>

                      {/* Nội dung câu hỏi */}
                      <div className="px-5 py-3">
                        {editingId === q.id ? (
                          <textarea
                            className="w-full p-3 border-2 border-emerald-300 rounded-xl text-sm font-mono bg-white outline-none focus:border-emerald-500 resize-none min-h-[100px]"
                            value={q.noiDungCauHoi}
                            onChange={e => handleUpdateCauHoi(q.id, 'noiDungCauHoi', e.target.value)}
                          />
                        ) : (
                          <>
                            {/* Câu số + đề dẫn */}
                            <p className="text-sm font-bold text-slate-900 mb-2 leading-relaxed">
                              <span className="text-emerald-700 font-black mr-1">Câu {cauSo}.</span>
                              {deDan}
                            </p>
                            {/* 4 phương án A B C D */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                              {options.map(opt => {
                                const isCorrect = hienThiDapAn && q.dapAn.trim().toUpperCase() === opt.label;
                                return (
                                  <div key={opt.label} className={`flex items-start gap-2 px-3 py-1.5 rounded-xl text-sm transition ${isCorrect ? 'bg-emerald-100 border-2 border-emerald-400' : 'bg-slate-50 border border-slate-200'}`}>
                                    <span className={`font-black flex-shrink-0 w-5 text-sm ${isCorrect ? 'text-emerald-700' : 'text-slate-500'}`}>{opt.label}.</span>
                                    <span className={`leading-snug ${isCorrect ? 'text-emerald-800 font-bold' : 'text-slate-700'}`}>{opt.text}</span>
                                    {isCorrect && <span className="ml-auto flex-shrink-0 text-emerald-600 text-xs font-black">✓</span>}
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══ PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI ══════════════════════════ */}
          {dsQuestions.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-amber-500 px-8 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-black text-base">PHẦN II. TRẮC NGHIỆM ĐÚNG / SAI</h3>
                  <p className="text-amber-100 text-xs mt-0.5">Câu 1 – {dsQuestions.length} · Mỗi câu có 4 mệnh đề a, b, c, d · Xác định Đúng (Đ) / Sai (S)</p>
                </div>
                <span className="bg-white/20 text-white font-black text-xl px-4 py-2 rounded-2xl">{dsQuestions.length}</span>
              </div>

              <div className="p-6 space-y-5">
                {dsQuestions.map((q, i) => {
                  const cauSo = i + 1; // Câu 1–4 trong phần này
                  const labelMap = ['a', 'b', 'c', 'd'];
                  const mucDoYMap = ['Nhận biết', 'Thông hiểu', 'Thông hiểu', 'Vận dụng'];
                  const raw = q.noiDungCauHoi;
                  const parts = raw.split(/\n(?=[a-d]\))/i);
                  const danDe = parts[0].replace(/^\[.*?\]\s*–?\s*/, '').trim();
                  const yItems = parts.slice(1);
                  const finalYs = labelMap.map((_, k) => {
                    if (yItems[k]) return yItems[k].replace(/^[a-d]\)\s*/i, '').trim();
                    return `Mệnh đề ${labelMap[k].toUpperCase()} – [${mucDoYMap[k]}]`;
                  });
                  const dapAnParts = (q.dapAn || '').split(/\s+/);

                  return (
                    <div key={q.id} className="border-2 border-amber-200 rounded-2xl overflow-hidden">
                      {/* Mini toolbar */}
                      <div className="flex items-center justify-between px-4 py-1.5 bg-amber-50 border-b border-amber-100">
                        <span className="text-[10px] text-slate-400 italic">{q.noiDung} · Câu {12 + cauSo} (tổng)</span>
                        <div className="flex gap-1">
                          {editingId === q.id
                            ? <button onClick={() => setEditingId(null)} className="px-2 py-1 bg-slate-200 rounded-lg text-[9px] font-bold">✓ Xong</button>
                            : <button onClick={() => setEditingId(q.id)} className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-[9px] font-bold hover:bg-amber-200 transition">✏ Sửa</button>
                          }
                        </div>
                      </div>

                      <div className="px-5 py-4">
                        {editingId === q.id ? (
                          <textarea
                            className="w-full p-3 border-2 border-amber-300 rounded-xl text-sm font-mono bg-white outline-none resize-none min-h-[120px]"
                            value={q.noiDungCauHoi}
                            onChange={e => handleUpdateCauHoi(q.id, 'noiDungCauHoi', e.target.value)}
                          />
                        ) : (
                          <>
                            {/* Câu số + đề dẫn */}
                            <p className="text-sm font-bold text-slate-900 mb-3 leading-relaxed">
                              <span className="text-amber-700 font-black mr-1">Câu {cauSo}.</span>
                              {danDe}
                            </p>
                            {/* 4 mệnh đề a b c d */}
                            <div className="space-y-2">
                              {finalYs.map((y, k) => {
                                const da = (dapAnParts[k] || '').toUpperCase();
                                const isD = da === 'Đ' || da === 'D';
                                return (
                                  <div key={k} className={`flex items-start gap-3 px-3 py-2 rounded-xl border ${hienThiDapAn ? (isD ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-200') : 'bg-slate-50 border-slate-200'}`}>
                                    <span className={`font-black text-sm flex-shrink-0 w-5 ${hienThiDapAn ? (isD ? 'text-emerald-700' : 'text-rose-500') : 'text-amber-600'}`}>{labelMap[k]})</span>
                                    <p className={`text-sm leading-relaxed flex-1 ${hienThiDapAn ? (isD ? 'text-emerald-800' : 'text-slate-600') : 'text-slate-800'}`}>{y}</p>
                                    {hienThiDapAn && (
                                      <span className={`flex-shrink-0 text-xs font-black px-2 py-0.5 rounded-lg ${isD ? 'bg-emerald-600 text-white' : 'bg-rose-500 text-white'}`}>
                                        {isD ? 'Đúng' : 'Sai'}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2 italic">1 ý đúng: 0,1đ · 2 ý: 0,25đ · 3 ý: 0,5đ · 4 ý: 1,0đ</p>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══ PHẦN III: TRẢ LỜI NGẮN ════════════════════════════════════ */}
          {tlnQuestions.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-rose-600 px-8 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-black text-base">PHẦN III. TRẢ LỜI NGẮN</h3>
                  <p className="text-rose-100 text-xs mt-0.5">Câu 1 – {tlnQuestions.length} · Thí sinh ghi kết quả vào ô trả lời · Mỗi câu đúng 0,5 điểm</p>
                </div>
                <span className="bg-white/20 text-white font-black text-xl px-4 py-2 rounded-2xl">{tlnQuestions.length}</span>
              </div>

              <div className="p-6 space-y-4">
                {tlnQuestions.map((q, i) => {
                  const cauSo = i + 1; // Câu 1–6 trong phần này
                  const mdStyle: Record<string, string> = {
                    'Thông hiểu': 'TH',
                    'Vận dụng': 'VD',
                    'Vận dụng cao': 'VDC',
                    'Nhận biết': 'NB',
                  };
                  const noiDungClean = q.noiDungCauHoi.replace(/^\[.*?\]\s*–?\s*/, '').trim();

                  return (
                    <div key={q.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                      {/* Mini toolbar */}
                      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-50 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">{mdStyle[q.mucDo] || q.mucDo}</span>
                          <span className="text-[10px] text-slate-400 italic">{q.noiDung} · Câu {16 + cauSo} (tổng)</span>
                        </div>
                        <div className="flex gap-1">
                          {editingId === q.id
                            ? <button onClick={() => setEditingId(null)} className="px-2 py-1 bg-slate-200 rounded-lg text-[9px] font-bold">✓ Xong</button>
                            : <button onClick={() => setEditingId(q.id)} className="px-2 py-1 bg-rose-100 text-rose-700 rounded-lg text-[9px] font-bold hover:bg-rose-200 transition">✏ Sửa</button>
                          }
                        </div>
                      </div>

                      <div className="px-5 py-3">
                        {editingId === q.id ? (
                          <textarea
                            className="w-full p-3 border-2 border-rose-300 rounded-xl text-sm font-mono bg-white outline-none resize-none min-h-[80px]"
                            value={q.noiDungCauHoi}
                            onChange={e => handleUpdateCauHoi(q.id, 'noiDungCauHoi', e.target.value)}
                          />
                        ) : (
                          <>
                            {/* Câu số + đề bài */}
                            <p className="text-sm font-bold text-slate-900 mb-2 leading-relaxed">
                              <span className="text-rose-700 font-black mr-1">Câu {cauSo}.</span>
                              {noiDungClean}
                            </p>
                            {/* Ô trả lời */}
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-slate-500 font-bold flex-shrink-0">Kết quả:</span>
                              <div className={`flex-1 border-b-2 ${hienThiDapAn ? 'border-rose-400' : 'border-slate-300'} pb-1 min-h-[28px] flex items-end`}>
                                {hienThiDapAn ? (
                                  <span className="text-sm font-black text-rose-700">{q.dapAn}</span>
                                ) : (
                                  <span className="text-slate-200 text-xs italic">...</span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 flex-shrink-0">0,5đ</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

// Component v\u1ebd h\u00ecnh minh h\u1ecda SVG theo ch\u1ee7 \u0111\u1ec1
function MathDiagramSVG({ noiDung, phan }: { noiDung: string; phan: string }) {
  const noi = noiDung.toLowerCase();
  const uid = React.useId().replace(/:/g, '');

  // TICH PHAN / NGUYEN HAM \u2013 Di\u1ec7n t\u00edch d\u01b0\u1edbi \u0111\u01b0\u1eddng cong
  if (noi.includes('t\u00edch ph\u00e2n') || noi.includes('nguy\u00ean h\u00e0m')) {
    return (
      <svg viewBox="0 0 320 200" className="w-full" aria-label="H\u00ecnh minh h\u1ecda t\u00edch ph\u00e2n">
        <defs>
          <marker id={`arr-${uid}`} markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
            <polygon points="0,0 7,3.5 0,7" fill="#94a3b8"/>
          </marker>
          <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05"/>
          </linearGradient>
        </defs>
        {/* L\u01b0\u1edbi */}
        {[50,90,130,170].map(y=><line key={y} x1="40" y1={y} x2="300" y2={y} stroke="#f1f5f9" strokeWidth="1"/>)}
        {[80,130,180,230].map(x=><line key={x} x1={x} y1="10" x2={x} y2="175" stroke="#f1f5f9" strokeWidth="1"/>)}
        {/* Tr\u1ee5c */}
        <line x1="40" y1="170" x2="300" y2="170" stroke="#94a3b8" strokeWidth="1.8" markerEnd={`url(#arr-${uid})`}/>
        <line x1="50" y1="185" x2="50" y2="10" stroke="#94a3b8" strokeWidth="1.8" markerEnd={`url(#arr-${uid})`}/>
        {/* V\u00f9ng di\u1ec7n t\u00edch t\u00f4 m\u00e0u */}
        <path d="M 100,170 L 100,100 C 130,80 160,60 200,55 C 220,53 230,58 240,80 L 240,170 Z"
              fill={`url(#grad-${uid})`} stroke="#6366f1" strokeWidth="0.5"/>
        {/* \u0110\u01b0\u1eddng cong y=f(x) */}
        <path d="M 60,155 C 80,140 90,120 100,100 C 130,80 160,60 200,55 C 225,52 250,65 280,95"
              fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Nh\u00e3n a, b */}
        <line x1="100" y1="170" x2="100" y2="98" stroke="#6366f1" strokeWidth="1" strokeDasharray="3,3"/>
        <line x1="240" y1="170" x2="240" y2="78" stroke="#6366f1" strokeWidth="1" strokeDasharray="3,3"/>
        <text x="96" y="183" fontSize="12" fill="#6366f1" fontWeight="bold" fontFamily="serif">a</text>
        <text x="236" y="183" fontSize="12" fill="#6366f1" fontWeight="bold" fontFamily="serif">b</text>
        {/* Ch\u1eef S */}
        <text x="160" y="135" fontSize="16" fill="#6366f1" fontWeight="bold" fontFamily="serif">S</text>
        {/* Nh\u00e3n tr\u1ee5c */}
        <text x="290" y="180" fontSize="11" fill="#94a3b8" fontStyle="italic">x</text>
        <text x="55" y="16" fontSize="11" fill="#94a3b8" fontStyle="italic">y</text>
        <text x="52" y="167" fontSize="9" fill="#94a3b8">O</text>
        {/* Nh\u00e3n h\u00e0m */}
        <text x="245" y="80" fontSize="11" fill="#6366f1" fontStyle="italic">y=f(x)</text>
        {/* K\u00fd hi\u1ec7u t\u00edch ph\u00e2n */}
        <text x="8" y="125" fontSize="30" fill="#6366f1" fontFamily="serif">\u222b</text>
        <text x="32" y="108" fontSize="9" fill="#6366f1">b</text>
        <text x="32" y="136" fontSize="9" fill="#6366f1">a</text>
      </svg>
    );
  }

  // XAC SUAT \u2013 Bi\u1ec3u \u0111\u1ed3 c\u00e2y x\u00e1c su\u1ea5t
  if (noi.includes('x\u00e1c su\u1ea5t') || noi.includes('bi\u1ebfn c\u1ed1') || noi.includes('bayes') || noi.includes('to\u00e0n ph\u1ea7n')) {
    return (
      <svg viewBox="0 0 320 200" className="w-full" aria-label="C\u00e2y x\u00e1c su\u1ea5t">
        <defs>
          <marker id={`arr2-${uid}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <polygon points="0,0 6,3 0,6" fill="#6366f1"/>
          </marker>
        </defs>
        {/* N\u00fat g\u1ed1c */}
        <circle cx="50" cy="100" r="16" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="2"/>
        <text x="50" y="104" fontSize="10" fill="#6366f1" fontWeight="bold" textAnchor="middle">\u03a9</text>
        {/* N\u00fat A, \u0100 */}
        <circle cx="170" cy="55" r="16" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
        <text x="170" y="59" fontSize="11" fill="#10b981" fontWeight="bold" textAnchor="middle">A</text>
        <circle cx="170" cy="145" r="16" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
        <text x="170" y="149" fontSize="11" fill="#f59e0b" fontWeight="bold" textAnchor="middle">\u0100</text>
        {/* N\u00fat B|A, \u0181|A, B|\u0100, \u0181|\u0100 */}
        <circle cx="285" cy="30" r="14" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5"/>
        <text x="285" y="34" fontSize="9" fill="#10b981" fontWeight="bold" textAnchor="middle">B</text>
        <circle cx="285" cy="75" r="14" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5"/>
        <text x="285" y="79" fontSize="9" fill="#10b981" fontWeight="bold" textAnchor="middle">\u0181</text>
        <circle cx="285" cy="125" r="14" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5"/>
        <text x="285" y="129" fontSize="9" fill="#f59e0b" fontWeight="bold" textAnchor="middle">B</text>
        <circle cx="285" cy="170" r="14" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5"/>
        <text x="285" y="174" fontSize="9" fill="#f59e0b" fontWeight="bold" textAnchor="middle">\u0181</text>
        {/* \u0110\u01b0\u1eddng n\u1ed1i */}
        <line x1="66" y1="88" x2="154" y2="62" stroke="#6366f1" strokeWidth="1.5" markerEnd={`url(#arr2-${uid})`}/>
        <line x1="66" y1="112" x2="154" y2="138" stroke="#6366f1" strokeWidth="1.5" markerEnd={`url(#arr2-${uid})`}/>
        <line x1="186" y1="48" x2="271" y2="34" stroke="#10b981" strokeWidth="1.5" markerEnd={`url(#arr2-${uid})`}/>
        <line x1="186" y1="60" x2="271" y2="72" stroke="#10b981" strokeWidth="1.5" markerEnd={`url(#arr2-${uid})`}/>
        <line x1="186" y1="138" x2="271" y2="128" stroke="#f59e0b" strokeWidth="1.5" markerEnd={`url(#arr2-${uid})`}/>
        <line x1="186" y1="152" x2="271" y2="167" stroke="#f59e0b" strokeWidth="1.5" markerEnd={`url(#arr2-${uid})`}/>
        {/* X\u00e1c su\u1ea5t */}
        <text x="95" y="68" fontSize="9" fill="#6366f1">P(A)</text>
        <text x="95" y="138" fontSize="9" fill="#6366f1">P(\u0100)</text>
        <text x="215" y="42" fontSize="8" fill="#10b981">P(B|A)</text>
        <text x="215" y="72" fontSize="8" fill="#10b981">P(\u0181|A)</text>
        <text x="215" y="125" fontSize="8" fill="#f59e0b">P(B|\u0100)</text>
        <text x="215" y="165" fontSize="8" fill="#f59e0b">P(\u0181|\u0100)</text>
      </svg>
    );
  }

  // HAM SO \u2013 \u0110\u01b0\u1eddng cong h\u00e0m s\u1ed1
  if (noi.includes('h\u00e0m s\u1ed1') || noi.includes('gi\u1edbi h\u1ea1n') || noi.includes('\u0111\u1ea1o h\u00e0m') || noi.includes('li\u00ean t\u1ee5c')) {
    return (
      <svg viewBox="0 0 320 200" className="w-full" aria-label="\u0110\u1ed3 th\u1ecb h\u00e0m s\u1ed1">
        <defs>
          <marker id={`arr3-${uid}`} markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
            <polygon points="0,0 7,3.5 0,7" fill="#94a3b8"/>
          </marker>
        </defs>
        {[40,80,120,160].map(y=><line key={y} x1="20" y1={y} x2="305" y2={y} stroke="#f1f5f9" strokeWidth="1"/>)}
        {[60,110,160,210,260].map(x=><line key={x} x1={x} y1="5" x2={x} y2="190" stroke="#f1f5f9" strokeWidth="1"/>)}
        {/* Tr\u1ee5c */}
        <line x1="20" y1="100" x2="305" y2="100" stroke="#94a3b8" strokeWidth="1.8" markerEnd={`url(#arr3-${uid})`}/>
        <line x1="160" y1="190" x2="160" y2="5" stroke="#94a3b8" strokeWidth="1.8" markerEnd={`url(#arr3-${uid})`}/>
        <text x="295" y="112" fontSize="11" fill="#94a3b8" fontStyle="italic">x</text>
        <text x="165" y="14" fontSize="11" fill="#94a3b8" fontStyle="italic">y</text>
        <text x="163" y="112" fontSize="9" fill="#94a3b8">O</text>
        {/* \u0110\u01b0\u1eddng cong b\u1eadc 3 */}
        <path d="M 30,160 C 60,155 90,140 120,120 C 140,108 150,100 160,100 C 175,100 195,95 220,70 C 250,40 275,25 300,20"
              fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
        {/* \u0110i\u1ec3m c\u1ef1c \u0111\u1ea1i / c\u1ef1c ti\u1ec3u */}
        <circle cx="110" cy="126" r="4" fill="#ef4444" stroke="white" strokeWidth="1.5"/>
        <text x="93" y="118" fontSize="9" fill="#ef4444">C\u0110</text>
        <circle cx="205" cy="83" r="4" fill="#10b981" stroke="white" strokeWidth="1.5"/>
        <text x="208" y="78" fontSize="9" fill="#10b981">CT</text>
        {/* \u0110\u01b0\u1eddng k\u1ebb */}
        <line x1="110" y1="126" x2="110" y2="100" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3"/>
        <line x1="205" y1="83" x2="205" y2="100" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3"/>
        <text x="106" y="114" fontSize="8" fill="#64748b">x\u2081</text>
        <text x="201" y="114" fontSize="8" fill="#64748b">x\u2082</text>
        <text x="185" y="55" fontSize="11" fill="#6366f1" fontStyle="italic">y=f(x)</text>
      </svg>
    );
  }

  // HINH HOC \u2013 H\u00ecnh kh\u1ed1i
  if (noi.includes('h\u00ecnh') || noi.includes('kh\u1ed1i') || noi.includes('th\u1ec3 t\u00edch') || noi.includes('di\u1ec7n t\u00edch')) {
    return (
      <svg viewBox="0 0 320 200" className="w-full" aria-label="H\u00ecnh h\u1ecdc kh\u00f4ng gian">
        {/* H\u00ecnh h\u1ed9p ch\u1eef nh\u1eadt 3D */}
        <polygon points="80,160 200,160 200,80 80,80" fill="#6366f1" fillOpacity="0.08" stroke="#6366f1" strokeWidth="1.5"/>
        <polygon points="200,160 260,120 260,40 200,80" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.5"/>
        <polygon points="80,80 200,80 260,40 140,40" fill="#6366f1" fillOpacity="0.2" stroke="#6366f1" strokeWidth="1.5"/>
        {/* C\u1ea1nh \u1ea9n */}
        <line x1="80" y1="160" x2="140" y2="120" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,3"/>
        <line x1="140" y1="120" x2="260" y2="120" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,3"/>
        <line x1="140" y1="120" x2="140" y2="40" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,3"/>
        {/* Nh\u00e3n \u0111\u1ec9nh */}
        {[['80','80','A'],['200','80','B'],['200','160','C'],['80','160','D'],
          ['140','40','E'],['260','40','F'],['260','120','G'],['140','120','H']].map(([x,y,l])=>(
          <text key={l} x={parseInt(x)+(l==='A'||l==='D'||l==='E'||l==='H'?-14:4)} y={parseInt(y)+(l==='C'||l==='D'?14:l==='A'||l==='B'?-4:4)}
                fontSize="11" fill="#475569" fontWeight="bold">{l}</text>
        ))}
        {/* K\u00edch th\u01b0\u1edbc */}
        <line x1="80" y1="170" x2="200" y2="170" stroke="#94a3b8" strokeWidth="1"/>
        <text x="135" y="182" fontSize="9" fill="#64748b" textAnchor="middle">a</text>
        <line x1="210" y1="80" x2="210" y2="160" stroke="#94a3b8" strokeWidth="1"/>
        <text x="218" y="124" fontSize="9" fill="#64748b">b</text>
        <line x1="202" y1="77" x2="263" y2="37" stroke="#94a3b8" strokeWidth="1"/>
        <text x="240" y="55" fontSize="9" fill="#64748b">c</text>
      </svg>
    );
  }

  // M\u1eb8C \u0110\u1ecaNH \u2013 H\u1ec7 tr\u1ee5c to\u1ea1 \u0111\u1ed9 v\u1edbi \u0111i\u1ec3m
  return (
    <svg viewBox="0 0 320 200" className="w-full" aria-label="H\u1ec7 tr\u1ee5c to\u1ea1 \u0111\u1ed9">
      <defs>
        <marker id={`arr4-${uid}`} markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill="#94a3b8"/>
        </marker>
      </defs>
      {[40,80,120,160].map(y=><line key={y} x1="20" y1={y} x2="305" y2={y} stroke="#f8fafc" strokeWidth="1.5"/>)}
      {[60,110,160,210,260].map(x=><line key={x} x1={x} y1="5" x2={x} y2="190" stroke="#f8fafc" strokeWidth="1.5"/>)}
      <line x1="20" y1="110" x2="305" y2="110" stroke="#94a3b8" strokeWidth="1.8" markerEnd={`url(#arr4-${uid})`}/>
      <line x1="160" y1="190" x2="160" y2="5" stroke="#94a3b8" strokeWidth="1.8" markerEnd={`url(#arr4-${uid})`}/>
      {/* \u0110\u01b0\u1eddng cong m\u1eabu */}
      <path d="M 30,170 C 70,150 110,100 160,80 C 210,60 250,50 295,48"
            fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 30,60 C 70,62 100,70 140,90 C 175,108 230,140 295,170"
            fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeDasharray="5,3"/>
      <text x="285" y="122" fontSize="11" fill="#94a3b8" fontStyle="italic">x</text>
      <text x="165" y="14" fontSize="11" fill="#94a3b8" fontStyle="italic">y</text>
      <text x="163" y="124" fontSize="9" fill="#94a3b8">O</text>
      <text x="270" y="44" fontSize="10" fill="#6366f1" fontStyle="italic">f(x)</text>
      <text x="270" y="168" fontSize="10" fill="#f59e0b" fontStyle="italic">g(x)</text>
    </svg>
  );
}

// Component c\u00e2u h\u1ecfi ri\u00eang (\u0111\u00fang chu\u1ea9n React component)
type PhanColors = Record<string, { bg: string; border: string; text: string; badge: string; headerBg: string }>;

interface QuestionCardProps {
  key?: React.Key;
  q: CauHoi;
  idx: number;
  label: string;
  phanColors: PhanColors;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  hienThiDapAn: boolean;
  handleUpdateCauHoi: (id: number, field: keyof CauHoi, value: string) => void;
}

function QuestionCard({
  q, idx, label, phanColors, editingId, setEditingId, hienThiDapAn, handleUpdateCauHoi
}: QuestionCardProps) {
  const c = phanColors[q.phan];
  const isEditing = editingId === q.id;
  const [showDiagram, setShowDiagram] = React.useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.03 }}
      className={`rounded-2xl border-2 ${c.border} ${c.bg} p-5`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`w-8 h-8 rounded-xl ${c.headerBg} text-white font-black text-sm flex items-center justify-center flex-shrink-0`}>{label}</span>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${c.badge}`}>{q.mucDo.toUpperCase()}</span>
          <span className="text-[10px] text-slate-400 font-medium truncate max-w-[200px]">{q.noiDung}</span>
        </div>
        <div className="flex gap-1.5 flex-shrink-0">
          <button
            onClick={() => setShowDiagram(!showDiagram)}
            title="Hi\u1ec7n / \u1ea8n h\u00ecnh minh h\u1ecda"
            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all ${
              showDiagram ? 'bg-violet-600 text-white' : 'bg-white text-slate-400 border border-slate-200 hover:border-violet-300 hover:text-violet-600'
            }`}
          >
            \ud83d\udcca H\u00ecnh
          </button>
          <button
            onClick={() => setEditingId(isEditing ? null : q.id)}
            className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-all ${
              isEditing ? 'bg-indigo-600 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300'
            }`}
          >
            {isEditing ? '\u2713 Xong' : '\u270f\ufe0f S\u1eeda'}
          </button>
        </div>
      </div>

      {/* H\u00ecnh minh h\u1ecda */}
      <AnimatePresence>
        {showDiagram && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="bg-white/70 rounded-2xl border border-slate-200 p-3">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">
                H\u00ecnh minh h\u1ecda m\u00f4 ph\u1ecfng \u2022 {q.noiDung}
              </p>
              <MathDiagramSVG noiDung={q.noiDung} phan={q.phan} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">N\u1ed9i dung c\u00e2u h\u1ecfi</label>
            <textarea
              className="w-full p-3 border-2 border-indigo-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition bg-white resize-none"
              rows={5}
              value={q.noiDungCauHoi}
              onChange={e => handleUpdateCauHoi(q.id, 'noiDungCauHoi', e.target.value)}
            />
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">\u0110\u00e1p \u00e1n</label>
            <input
              className="w-full p-2.5 border-2 border-indigo-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition bg-white"
              value={q.dapAn}
              onChange={e => handleUpdateCauHoi(q.id, 'dapAn', e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">{q.noiDungCauHoi}</p>
          {hienThiDapAn && (
            <div className={`mt-3 p-2.5 rounded-xl ${c.bg} border ${c.border}`}>
              <span className={`text-[10px] font-black ${c.text} uppercase tracking-wider`}>\u0110\u00e1p \u00e1n: </span>
              <span className="text-sm font-bold text-slate-700">{q.dapAn}</span>
            </div>
          )}
        </div>
      )}
      {q.yeuCau && (
        <div className="mt-3 text-[10px] text-slate-400 italic border-t border-slate-200 pt-2">
          <span className="font-bold text-slate-500">Y\u00eau c\u1ea7u c\u1ea7n \u0111\u1ea1t: </span>{q.yeuCau.split('\n')[0]}
        </div>
      )}
    </motion.div>
  );
}

