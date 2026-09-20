// Interactive Code Inspector & API Guide for Data Science ทีละก้าว
// Designed for beginners (0 to 100) with Line Numbers, Badges, and Real-World Analogies

const apiGuideStyles = document.createElement("style");
apiGuideStyles.textContent = `
/* Code Inspector Layout */
.code-inspector-section {
  margin-top: 2.5rem;
}
.code-inspector-header {
  margin-bottom: 1.2rem;
}
.code-inspector-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* macOS Terminal / Editor Window (Matching Image 0) */
.code-window {
  background: #090e17;
  border: 1px solid #1e293b;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.28);
  font-family: 'Fira Code', 'SF Mono', Consolas, ui-monospace, monospace;
}
.code-window-bar {
  height: 44px;
  background: #0e1726;
  border-bottom: 1px solid #1e293b;
  display: flex;
  align-items: center;
  padding: 0 18px;
  position: relative;
  user-select: none;
}
.code-window-dots {
  display: flex;
  align-items: center;
  gap: 8px;
}
.code-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}
.dot-red { background: #ff5f56; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #27c93f; }
.code-window-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #94a3b8;
  font-size: 0.84rem;
  font-weight: 500;
  letter-spacing: 0.03em;
}
.code-window-body {
  padding: 14px 0;
  overflow-x: auto;
}

/* Code Lines */
.code-line {
  display: flex;
  align-items: center;
  padding: 3px 20px;
  font-size: 0.86rem;
  line-height: 1.85;
  cursor: pointer;
  transition: background 0.12s ease, border-color 0.12s ease;
  border-left: 3px solid transparent;
}
.code-line:hover {
  background: rgba(56, 189, 248, 0.08);
  border-left-color: rgba(56, 189, 248, 0.5);
}
.code-line.active {
  background: rgba(56, 189, 248, 0.15);
  border-left-color: #38bdf8;
}
.code-line-num {
  width: 38px;
  flex-shrink: 0;
  text-align: right;
  padding-right: 18px;
  color: #475569;
  user-select: none;
}
.code-line-text {
  flex: 1;
  white-space: pre;
  color: #f1f5f9;
  font-family: inherit;
}
.code-line.is-comment .code-line-text {
  color: #64748b;
  font-style: italic;
}

/* Syntax Highlighting */
.tok-kw { color: #f472b6; font-weight: 600; }
.tok-str { color: #38bdf8; }
.tok-num { color: #fb923c; }
.tok-fn { color: #34d399; }
.tok-op { color: #facc15; }
.tok-var { color: #e2e8f0; }

/* Line Badges on the Right (Matching Image 0) */
.code-line-badge {
  margin-left: 14px;
  padding: 2px 10px;
  border-radius: 6px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  flex-shrink: 0;
  user-select: none;
  border: 1px solid transparent;
}
.badge-series { background: rgba(236, 72, 153, 0.15); border-color: #db2777; color: #f472b6; }
.badge-dataframe { background: rgba(2, 132, 199, 0.15); border-color: #0284c7; color: #38bdf8; }
.badge-operator { background: rgba(217, 119, 6, 0.15); border-color: #d97706; color: #fbbf24; }
.badge-property { background: rgba(234, 88, 12, 0.15); border-color: #ea580c; color: #fb923c; }
.badge-method { background: rgba(5, 150, 105, 0.15); border-color: #059669; color: #34d399; }
.badge-function { background: rgba(13, 148, 136, 0.15); border-color: #0d9488; color: #2dd4bf; }
.badge-syntax { background: rgba(124, 58, 237, 0.15); border-color: #7c3aed; color: #c084fc; }
.badge-query { background: rgba(6, 182, 212, 0.15); border-color: #06b6d4; color: #22d3ee; }
.badge-mask { background: rgba(168, 85, 247, 0.15); border-color: #9333ea; color: #d8b4fe; }

/* Interactive Explanation Card (Matching Image 1) */
.code-explanation-card {
  background: #0b131e;
  border: 1px solid #1e293b;
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
}
.explanation-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}
.explanation-active-tag {
  display: inline-block;
  background: rgba(2, 132, 199, 0.2);
  border: 1.5px solid #0284c7;
  color: #38bdf8;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 5px 16px;
  border-radius: 8px;
  letter-spacing: 0.02em;
}
.explanation-kind-badge {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.kind-concept { background: #ede9fe; color: #6d28d9; }
.kind-method { background: #dcfce7; color: #15803d; }
.kind-property { background: #ffedd5; color: #c2410c; }
.kind-function { background: #ccfbf1; color: #0f766e; }
.kind-operator { background: #fef3c7; color: #b45309; }
.kind-syntax { background: #fce7f3; color: #be185d; }

.explanation-text {
  color: #e2e8f0;
  font-size: 1.02rem;
  line-height: 1.75;
  margin-bottom: 14px;
}
.explanation-text strong {
  color: #38bdf8;
}
.explanation-rule-box {
  background: #060b12;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 14px;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  color: #67e8f9;
  line-height: 1.6;
}
.explanation-rule-box b {
  display: block;
  color: #94a3b8;
  font-size: 0.7rem;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.explanation-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
  font-size: 0.84rem;
  margin-bottom: 18px;
}

/* Keyword Pills Bar (Matching Image 1) */
.keyword-pills-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid #1e293b;
}
.keyword-pill {
  background: #0f1926;
  border: 1.5px solid #334155;
  color: #cbd5e1;
  padding: 6px 14px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}
.keyword-pill:hover {
  border-color: #38bdf8;
  color: #ffffff;
  transform: translateY(-1px);
}
.keyword-pill.active {
  background: #0c4a6e;
  border-color: #38bdf8;
  color: #38bdf8;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.35);
}

/* API Dictionary Cards Section */
.api-intro { margin: 0 0 1rem; color: #60716b; font-size: .82rem; }
.api-list { display: grid; gap: .75rem; }
.api-card { padding: 1.1rem; border: 1px solid #d7e1dc; border-radius: .65rem; background: #fff; }
.api-top { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.api-card code { color: #064b43; font-size: .84rem; font-weight: 800; font-family: 'Fira Code', monospace; }
.api-kind { padding: .2rem .45rem; border-radius: 999px; background: #ddf2eb; color: #064b43; font-size: .63rem; font-weight: 800; }
.api-kind.property { background: #fff1ce; color: #795c12; }
.api-kind.syntax { background: #f2e9ff; color: #704597; }
.api-kind.concept { background: #ede9fe; color: #6d28d9; }
.api-card > p { margin: .5rem 0; color: #4f6159; font-size: .8rem; line-height: 1.6; }
.api-details { display: grid; grid-template-columns: 1fr 1fr; gap: .6rem; margin-top: .75rem; }
.api-detail { padding: .7rem .75rem; border-radius: .4rem; background: #f7faf8; color: #586860; font-size: .74rem; line-height: 1.55; }
.api-detail b { display: block; margin-bottom: .2rem; color: #285c51; font-size: .68rem; text-transform: uppercase; letter-spacing: 0.04em; }
.api-detail code { font-size: .72rem; }
.api-detail.warning { background: #fff8f5; color: #76574f; }
.api-detail.warning b { color: #ae5146; }
.api-example { margin: 0; overflow: auto; padding: .75rem; border-radius: .4rem; background: #102a32; color: #d9eae5; font: .72rem/1.65 'Fira Code', monospace; white-space: pre-wrap; }
@media(max-width:800px){ .api-details { grid-template-columns: 1fr; } }
`;
document.head.appendChild(apiGuideStyles);

// Complete 10-Week Data for the Interactive Code Inspector
const codeInspectorData = [
  // Week 01
  {
    filename: "week01_open_and_check.py",
    title: "เริ่มต้นและรู้จักข้อมูล",
    subtitle: "เข้าใจความต่างระหว่าง DataFrame (ตาราง), Property (df.shape) และ Method (df.head())",
    lines: [
      { num: 1, textHtml: '<span class="tok-com"># 1. นำเข้า Pandas สำหรับจัดการข้อมูลแบบตาราง</span>', isComment: true },
      { num: 2, textHtml: '<span class="tok-kw">import</span> <span class="tok-var">pandas</span> <span class="tok-kw">as</span> <span class="tok-var">pd</span>', badge: "IMPORT", badgeType: "syntax", key: "import" },
      { num: 3, textHtml: '<span class="tok-com"># 2. อ่านไฟล์ CSV เป็น DataFrame (ตารางในหน่วยความจำ)</span>', isComment: true },
      { num: 4, textHtml: '<span class="tok-var">df</span> <span class="tok-op">=</span> <span class="tok-var">pd</span>.<span class="tok-fn">read_csv</span>(<span class="tok-str">"../data/footballers.csv"</span>)', badge: "PD.READ_CSV", badgeType: "function", key: "read_csv" },
      { num: 5, textHtml: '<span class="tok-com"># 3. ตรวจขนาดตาราง: กี่แถว กี่คอลัมน์ — เป็น Property ไม่มีวงเล็บ ()</span>', isComment: true },
      { num: 6, textHtml: '<span class="tok-var">rows</span>, <span class="tok-var">cols</span> <span class="tok-op">=</span> <span class="tok-var">df</span>.<span class="tok-fn">shape</span>', badge: "DF.SHAPE", badgeType: "property", key: "shape" },
      { num: 7, textHtml: '<span class="tok-com"># 4. ดูชื่อหัวคอลัมน์จริงทั้งหมด เพื่อไม่สะกดชื่อผิด</span>', isComment: true },
      { num: 8, textHtml: '<span class="tok-fn">print</span>(<span class="tok-var">df</span>.<span class="tok-fn">columns</span>)', badge: "DF.COLUMNS", badgeType: "property", key: "columns" },
      { num: 9, textHtml: '<span class="tok-com"># 5. ดูตัวอย่าง 3 แถวแรก — เป็น Method ต้องมีวงเล็บ ()</span>', isComment: true },
      { num: 10, textHtml: '<span class="tok-var">sample</span> <span class="tok-op">=</span> <span class="tok-var">df</span>.<span class="tok-fn">head</span>(<span class="tok-num">3</span>)', badge: "DF.HEAD", badgeType: "method", key: "head" },
      { num: 11, textHtml: '<span class="tok-com"># 6. ตรวจชนิดข้อมูลและหาช่องว่าง (Missing Value)</span>', isComment: true },
      { num: 12, textHtml: '<span class="tok-var">df</span>.<span class="tok-fn">info</span>()', badge: "DF.INFO", badgeType: "method", key: "info" }
    ],
    keywords: [
      {
        key: "import",
        label: "import (Syntax)",
        badgeType: "syntax",
        lineNums: [2],
        title: "import pandas as pd — นำเข้าไลบรารี",
        kind: "Syntax · ไวยากรณ์พื้นฐาน",
        kindClass: "kind-syntax",
        explanation: "<strong>import pandas as pd</strong> คือคำสั่งนำเข้าเครื่องมือ Pandas เข้ามาใช้งานในโปรแกรม พร้อมตั้งชื่อเล่นสั้นๆ ว่า <code>pd</code> เพื่อความสะดวกในการเรียกใช้ฟังก์ชัน เช่น <code>pd.read_csv()</code>",
        rule: "import pandas as pd",
        tip: "💡 ควรสั่ง import ไว้ที่บรรทัดบนสุดของไฟล์หรือ Cell แรกเสมอ"
      },
      {
        key: "dataframe",
        label: "DataFrame (ตาราง)",
        badgeType: "dataframe",
        lineNums: [4],
        title: "DataFrame (ตารางข้อมูลใน Pandas)",
        kind: "Concept · ชนิดข้อมูลหลัก",
        kindClass: "kind-concept",
        explanation: "<strong>DataFrame คืออะไร?</strong> เปรียบเหมือน 'สมุดตาราง Excel ทั้งแผ่น' ที่มีทั้งแถวแนวนอนและคอลัมน์แนวตั้ง มีชื่อหัวคอลัมน์และเลขกำกับแถว (Index) ตัวแปร <code>df</code> เก็บข้อมูลทั้งหมดไว้ในหน่วยความจำพร้อมให้เราสั่งการได้ทันที",
        rule: "df = pd.read_csv(\"path/file.csv\")  # คืนค่าเป็น DataFrame",
        tip: "💡 DataFrame เป็นข้อมูล 2 มิติ (มีแถว x คอลัมน์) ต่างจาก Series ที่เป็นข้อมูลเสาเดียว 1 มิติ"
      },
      {
        key: "read_csv",
        label: "pd.read_csv()",
        badgeType: "function",
        lineNums: [4],
        title: "pd.read_csv() — ฟังก์ชันอ่านไฟล์",
        kind: "Function · ฟังก์ชัน",
        kindClass: "kind-function",
        explanation: "<strong>pd.read_csv()</strong> คือฟังก์ชันของ Pandas ที่ทำหน้าที่แปลงข้อความในไฟล์ CSV ให้กลายเป็นตาราง DataFrame โดยอัตโนมัติ โดยจะนำบรรทัดแรกของไฟล์มาเป็นชื่อคอลัมน์",
        rule: "pd.read_csv(\"../data/footballers.csv\")",
        tip: "⚠️ หากเกิด FileNotFoundError ให้ตรวจว่าไฟล์ Notebook รันจากโฟลเดอร์ใด ควรใช้ ../ เพื่อถอยหลัง 1 ระดับ"
      },
      {
        key: "shape",
        label: "df.shape (Property)",
        badgeType: "property",
        lineNums: [6],
        title: "df.shape — ขนาดของตาราง (แถว, คอลัมน์)",
        kind: "Property · พร็อพเพอร์ตี้",
        kindClass: "kind-property",
        explanation: "<strong>df.shape</strong> คือ 'Property' หรือคุณสมบัติประจำตัวของ DataFrame จึง<strong>ไม่มีวงเล็บ ()</strong> ผลลัพธ์เป็นตัวเลข 2 ตัว เช่น <code>(20, 15)</code> หมายถึงมี 20 แถว และ 15 คอลัมน์",
        rule: "rows, cols = df.shape  # ห้ามเขียน df.shape() เด็ดขาด!",
        tip: "💡 วิธีจำ: สเปกที่ตารางมีอยู่แล้ว (เช่น ขนาด, ชื่อคอลัมน์) เป็น Property ไม่ต้องใส่วงเล็บ ()"
      },
      {
        key: "columns",
        label: "df.columns (Property)",
        badgeType: "property",
        lineNums: [8],
        title: "df.columns — รายชื่อหัวคอลัมน์จริง",
        kind: "Property · พร็อพเพอร์ตี้",
        kindClass: "kind-property",
        explanation: "<strong>df.columns</strong> คืนรายชื่อคอลัมน์ทั้งหมด ช่วยป้องกันข้อผิดพลาด KeyError ได้ดีที่สุด เพราะ Python แยกตัวพิมพ์เล็ก-ใหญ่ เช่น <code>overall</code> กับ <code>Overall</code> ถือเป็นคนละชื่อกัน",
        rule: "print(df.columns)  # ดูรายชื่อ Index(['name', 'club', 'overall', ...])",
        tip: "💡 ตรวจ df.columns ก่อนเขียนโค้ดเสมอเพื่อดูว่าสะกดชื่อคอลัมน์ถูกต้องหรือไม่"
      },
      {
        key: "head",
        label: "df.head() (Method)",
        badgeType: "method",
        lineNums: [10],
        title: "df.head() — ดูตัวอย่างแถวแรก",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>df.head()</strong> คือ 'Method' (คำสั่งที่สั่งให้ตารางลงมือทำ) จึง<strong>ต้องมีวงเล็บ ()</strong> ใช้ดึงตัวอย่างแถวบนสุดมาดูเพื่อตรวจหน้าตาข้อมูล ค่าเริ่มต้นคือ 5 แถว หรือใส่ตัวเลขเช่น <code>head(3)</code>",
        rule: "df.head(3)  # ดูเพียง 3 แถวแรก ไม่โหลดทั้งไฟล์ออกมาให้รกหน้าจอ",
        tip: "⚠️ ใช้ดูตัวอย่างเท่านั้น อย่าสรุปจำนวนข้อมูลทั้งหมดจาก head()"
      },
      {
        key: "info",
        label: "df.info() (Method)",
        badgeType: "method",
        lineNums: [12],
        title: "df.info() — ตรวจโครงสร้างและช่องว่าง",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>df.info()</strong> รายงานภาพรวมของตาราง: แสดงชนิดข้อมูลของแต่ละคอลัมน์ (int64, float64, object) และจำนวนช่องที่ไม่ว่าง (non-null count) ถ้าคอลัมน์ไหนมีค่าน้อยกว่าจำนวนแถวทั้งหมด แสดงว่ามีข้อมูลหาย!",
        rule: "df.info()  # แสดงผลสรุปออกหน้าจอทันที",
        tip: "💡 ถ้าเห็น height_cm มี 19 non-null จากทั้งหมด 20 แถว แปลว่ามีนักเตะ 1 คนที่ไม่มีข้อมูลส่วนสูง"
      }
    ]
  },

  // Week 02
  {
    filename: "week02_wrangling_and_series.py",
    title: "Data Wrangling",
    subtitle: "ไขความลับ: วงเล็บ 1 ชั้นได้ Series (1 มิติ) เทียบกับ วงเล็บ 2 ชั้นได้ DataFrame (2 มิติ)",
    lines: [
      { num: 1, textHtml: '<span class="tok-com"># 1. วงเล็บคู่ [[]] = เลือกหลายคอลัมน์ ได้ผลเป็น DataFrame (ตารางย่อ)</span>', isComment: true },
      { num: 2, textHtml: '<span class="tok-var">summary</span> <span class="tok-op">=</span> <span class="tok-var">df</span>[[<span class="tok-str">"name"</span>, <span class="tok-str">"club"</span>, <span class="tok-str">"overall"</span>]]', badge: "DATAFRAME", badgeType: "dataframe", key: "double_bracket" },
      { num: 3, textHtml: '<span class="tok-com"># 2. วงเล็บเดี่ยว [] = เลือก 1 คอลัมน์ ได้ผลเป็น Series (เสาข้อมูลเดี่ยว)</span>', isComment: true },
      { num: 4, textHtml: '<span class="tok-var">ratings</span> <span class="tok-op">=</span> <span class="tok-var">df</span>[<span class="tok-str">"overall"</span>]', badge: "SERIES", badgeType: "series", key: "series" },
      { num: 5, textHtml: '<span class="tok-com"># 3. เปลี่ยนชื่อคอลัมน์ในตารางใหม่ด้วย .rename()</span>', isComment: true },
      { num: 6, textHtml: '<span class="tok-var">summary</span> <span class="tok-op">=</span> <span class="tok-var">summary</span>.<span class="tok-fn">rename</span>(<span class="tok-var">columns</span><span class="tok-op">=</span>{<span class="tok-str">"overall"</span>: <span class="tok-str">"rating"</span>})', badge: "RENAME", badgeType: "method", key: "rename" },
      { num: 7, textHtml: '<span class="tok-com"># 4. คัดลอกตารางแยกออกมาด้วย .copy() เพื่อความปลอดภัย</span>', isComment: true },
      { num: 8, textHtml: '<span class="tok-var">clean_copy</span> <span class="tok-op">=</span> <span class="tok-var">summary</span>.<span class="tok-fn">copy</span>()', badge: "COPY", badgeType: "method", key: "copy" },
      { num: 9, textHtml: '<span class="tok-com"># 5. ตรวจดู 3 แถวแรกของตารางใหม่</span>', isComment: true },
      { num: 10, textHtml: '<span class="tok-var">clean_copy</span>.<span class="tok-fn">head</span>(<span class="tok-num">3</span>)', badge: "HEAD", badgeType: "method", key: "head" },
      { num: 11, textHtml: '<span class="tok-com"># 6. ตรวจชนิดข้อมูลแต่ละคอลัมน์ — เป็น Property ไม่มีวงเล็บ ()</span>', isComment: true },
      { num: 12, textHtml: '<span class="tok-var">col_types</span> <span class="tok-op">=</span> <span class="tok-var">clean_copy</span>.<span class="tok-fn">dtypes</span>', badge: "DTYPES", badgeType: "property", key: "dtypes" }
    ],
    keywords: [
      {
        key: "series",
        label: "Series (1 คอลัมน์)",
        badgeType: "series",
        lineNums: [4],
        title: "Series — ข้อมูล 1 เสาเดี่ยวๆ (1 มิติ)",
        kind: "Concept · ชนิดข้อมูล",
        kindClass: "kind-concept",
        explanation: "<strong>Series คืออะไร?</strong> เปรียบเหมือนเราดึง 'ข้อมูล 1 เสาเดี่ยวๆ' ออกมาจากตาราง Excel พร้อมหมายเลขแถว (Index) เช่น <code>df['overall']</code> จะได้คะแนนของนักเตะทุกคนเรียงกันลงมา [90, 86, 91, 88...]",
        rule: "single_col = df[\"overall\"]  # วงเล็บ 1 ชั้น -> ได้ Series",
        tip: "💡 ข้อแตกต่างสำคัญ: Series คือ 1 มิติ (ไม่มีหัวคอลัมน์ มีแต่ชื่อและแถว) ส่วน DataFrame คือ 2 มิติ (มีทั้งแถวและคอลัมน์)"
      },
      {
        key: "double_bracket",
        label: "df[[...]] (DataFrame)",
        badgeType: "dataframe",
        lineNums: [2],
        title: "df[[...]] — วงเล็บคู่ เลือกหลายคอลัมน์",
        kind: "Syntax · ไวยากรณ์",
        kindClass: "kind-syntax",
        explanation: "<strong>ทำไมต้องมีวงเล็บซ้อน 2 ชั้น?</strong> วงเล็บชั้นนอกคือการสั่งเลือกข้อมูลของ Pandas ส่วนวงเล็บชั้นในคือ Python List ที่บรรจุชื่อคอลัมน์ <code>[\"name\", \"club\", \"overall\"]</code> ผลลัพธ์ที่ได้จึงยังคงเป็นตาราง 2 มิติ (DataFrame) เสมอ",
        rule: "sub_table = df[[\"name\", \"overall\"]]  # ได้ DataFrame ย่อ",
        tip: "💡 แม้จะเลือกแค่ 1 คอลัมน์ แต่ถ้าใส่วงเล็บ 2 ชั้น เช่น df[['age']] ก็จะได้ DataFrame ที่มี 1 คอลัมน์"
      },
      {
        key: "rename",
        label: ".rename()",
        badgeType: "method",
        lineNums: [6],
        title: ".rename() — เปลี่ยนชื่อคอลัมน์",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.rename()</strong> ใช้เปลี่ยนชื่อหัวคอลัมน์ให้อ่านเข้าใจง่ายขึ้นสำหรับผู้อ่านรายงาน เช่น เปลี่ยนจาก <code>overall</code> เป็น <code>rating</code> โดยส่ง dictionary <code>{ชื่อเดิม: ชื่อใหม่}</code>",
        rule: "df.rename(columns={\"old_name\": \"new_name\"})",
        tip: "⚠️ เมธอดนี้ไม่แก้ตารางเดิม ต้องเอาตัวแปรมารับค่ากลับ เช่น summary = summary.rename(...)"
      },
      {
        key: "copy",
        label: ".copy()",
        badgeType: "method",
        lineNums: [8],
        title: ".copy() — สำเนาตารางเพื่อความปลอดภัย",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.copy()</strong> สร้างสำเนาของตารางที่แยกเป็นอิสระจากตารางต้นฉบับอย่างสิ้นเชิง ช่วยป้องกันไม่ให้การแก้ไขตารางใหม่ไปกระทบหรือทำลายข้อมูลใน <code>df</code> เดิมโดยไม่ตั้งใจ",
        rule: "clean_df = df.copy()",
        tip: "💡 แนะนำให้ใช้ .copy() เสมอเมื่อเริ่มขั้นตอน Data Cleaning"
      },
      {
        key: "head",
        label: "df.head() (Method)",
        badgeType: "method",
        lineNums: [10],
        title: "df.head() — ดูตัวอย่าง 3 แถวแรก",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.head(3)</strong> สั่งให้ดึงตัวอย่าง 3 แถวแรกของตารางที่เพิ่งจัดการเสร็จขึ้นมาตรวจสอบ เพื่อดูว่าชื่อคอลัมน์และข้อมูลเปลี่ยนไปตามที่เราต้องการจริงหรือไม่",
        rule: "clean_copy.head(3)",
        tip: "💡 ตรวจดูตัวอย่างแถวทุกครั้งหลัง rename หรือ wrangling ก่อนนำไปทำงานขั้นต่อไป"
      },
      {
        key: "dtypes",
        label: "df.dtypes (Property)",
        badgeType: "property",
        lineNums: [12],
        title: "df.dtypes — ตรวจสอบชนิดข้อมูล (Property ไม่มีวงเล็บ ())",
        kind: "Property · พร็อพเพอร์ตี้",
        kindClass: "kind-property",
        explanation: "<strong>df.dtypes คืออะไร?</strong> เป็น Property ใช้ดูประเภทข้อมูลในแต่ละคอลัมน์ เช่น int64 (จำนวนเต็ม), float64 (ทศนิยม), object (ข้อความ) <strong>ข้อควรระวัง:</strong> เป็น Property ประจำตัว จึง<strong>ไม่มีวงเล็บ ()</strong> หากเขียน <code>clean_copy.dtypes()</code> จะเกิด TypeError ทันที",
        rule: "col_types = clean_copy.dtypes  # ไม่มี ()",
        tip: "💡 กฎจำง่าย: สเปกที่ตารางมีอยู่แล้ว (.shape, .columns, .dtypes) เป็น Property ไม่ต้องใส่วงเล็บ ()"
      }
    ]
  },

  // Week 03
  {
    filename: "week03_cleaning_missing.py",
    title: "Cleaning data",
    subtitle: "เข้าใจ NaN (ช่องว่าง), ทำไมห้ามแทนด้วย 0, และใช้ median แทนค่าอย่างปลอดภัย",
    lines: [
      { num: 1, textHtml: '<span class="tok-com"># 1. ตรวจช่องว่าง (NaN) ในส่วนสูง ได้ Series ของ True/False</span>', isComment: true },
      { num: 2, textHtml: '<span class="tok-var">is_missing</span> <span class="tok-op">=</span> <span class="tok-var">df</span>[<span class="tok-str">"height_cm"</span>].<span class="tok-fn">isna</span>()', badge: "ISNA", badgeType: "method", key: "isna" },
      { num: 3, textHtml: '<span class="tok-com"># 2. รวมจำนวนช่องว่างด้วย .sum() (True นับเป็น 1, False นับเป็น 0)</span>', isComment: true },
      { num: 4, textHtml: '<span class="tok-var">missing_count</span> <span class="tok-op">=</span> <span class="tok-var">is_missing</span>.<span class="tok-fn">sum</span>()', badge: "SUM", badgeType: "method", key: "sum" },
      { num: 5, textHtml: '<span class="tok-com"># 3. หาค่ามัธยฐาน (ค่ากลาง) ทนทานต่อตัวเลขสุดโต่ง</span>', isComment: true },
      { num: 6, textHtml: '<span class="tok-var">middle_height</span> <span class="tok-op">=</span> <span class="tok-var">df</span>[<span class="tok-str">"height_cm"</span>].<span class="tok-fn">median</span>()', badge: "MEDIAN", badgeType: "method", key: "median" },
      { num: 7, textHtml: '<span class="tok-com"># 4. แทนที่เฉพาะช่องว่างด้วย .fillna() โดยไม่แก้ทับของเดิม</span>', isComment: true },
      { num: 8, textHtml: '<span class="tok-var">filled_height</span> <span class="tok-op">=</span> <span class="tok-var">df</span>[<span class="tok-str">"height_cm"</span>].<span class="tok-fn">fillna</span>(<span class="tok-var">middle_height</span>)', badge: "FILLNA", badgeType: "method", key: "fillna" },
      { num: 9, textHtml: '<span class="tok-com"># 5. ประกอบตารางใหม่ด้วย .assign() ได้ clean_df ที่ปลอดภัย</span>', isComment: true },
      { num: 10, textHtml: '<span class="tok-var">clean_df</span> <span class="tok-op">=</span> <span class="tok-var">df</span>.<span class="tok-fn">assign</span>(<span class="tok-var">height_cm</span><span class="tok-op">=</span><span class="tok-var">filled_height</span>)', badge: "ASSIGN", badgeType: "method", key: "assign" },
      { num: 11, textHtml: '<span class="tok-com"># 6. ตรวจสอบขนาดตารางหลัง Clean — เป็น Property ไม่มีวงเล็บ ()</span>', isComment: true },
      { num: 12, textHtml: '<span class="tok-var">final_shape</span> <span class="tok-op">=</span> <span class="tok-var">clean_df</span>.<span class="tok-fn">shape</span>', badge: "SHAPE", badgeType: "property", key: "shape" }
    ],
    keywords: [
      {
        key: "isna",
        label: ".isna()",
        badgeType: "method",
        lineNums: [2],
        title: ".isna() — ตรวจสอบหาช่องว่าง (NaN)",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.isna() คืออะไร?</strong> เหมือนเราถือไฟฉายส่องดูทีละช่องในคอลัมน์ ถ้าช่องไหนว่างเปล่า (NaN) จะตอบว่า <code>True</code> ถ้ามีตัวเลขอยู่แล้วจะตอบว่า <code>False</code> ผลลัพธ์ที่ได้ออกมาจึงเป็น 'Series ของ True/False'",
        rule: "df[\"height_cm\"].isna()  # ผลลัพธ์: [False, False, True, False...]",
        tip: "💡 NaN ย่อมาจาก Not a Number หมายถึงช่องว่างที่ไม่มีข้อมูลบันทึกไว้ ไม่ใช่เลข 0!"
      },
      {
        key: "sum",
        label: ".sum() (Method)",
        badgeType: "method",
        lineNums: [4],
        title: ".sum() — นับจำนวน True ทั้งหมด",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.sum() บน Series ของ True/False</strong>: ใน Python ค่า <code>True</code> มีค่าทางตัวเลขเท่ากับ 1 และ <code>False</code> มีค่าเท่ากับ 0 เมื่อเรียก <code>.sum()</code> บนผลลัพธ์ของ <code>.isna()</code> จึงได้จำนวนช่องว่างทั้งหมดในคอลัมน์ทันที!",
        rule: "df[\"height_cm\"].isna().sum()  # ได้จำนวนช่องว่าง เช่น 1",
        tip: "💡 เทคนิคนี้ใช้ได้กับ Boolean Mask ทุกประเภทเพื่อดูว่ามีกี่แถวที่ผ่านเกณฑ์"
      },
      {
        key: "median",
        label: ".median()",
        badgeType: "method",
        lineNums: [6],
        title: ".median() — ค่ากึ่งกลางของคนที่เรียงแถว",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>ทำไมต้องใช้ Median แทนค่าเฉลี่ย (Mean)?</strong> Median คือค่าที่อยู่ตรงกลางเมื่อนำข้อมูลมาเรียงจากน้อยไปมาก จุดเด่นคือไม่ถูกตัวเลขสุดโต่ง (เช่น คนที่สูงผิดปกติ 220 ซม.) ดึงค่าให้เบ้ จึงเหมาะมากสำหรับใช้เป็นตัวแทนของข้อมูลที่หายไป",
        rule: "middle = df[\"height_cm\"].median()",
        tip: "⚠️ ห้ามใส่ 0 แทนส่วนสูงเด็ดขาด เพราะไม่มีคนสูง 0 ซม. จะทำให้ค่าสถิติเฉลี่ยพังทั้งหมด"
      },
      {
        key: "fillna",
        label: ".fillna()",
        badgeType: "method",
        lineNums: [8],
        title: ".fillna() — เติมเฉพาะช่องที่ว่าง",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.fillna()</strong> จะเข้าไปแทนที่เฉพาะช่องที่เป็น NaN เท่านั้น ช่องเดิมที่มีข้อมูลถูกต้องอยู่แล้วจะไม่ถูกแตะต้องเลย",
        rule: "new_series = series.fillna(ค่าที่ต้องการแทน)",
        tip: "💡 ผลลัพธ์คืนค่าเป็น Series ใหม่ จึงปลอดภัยและไม่กระทบข้อมูลดิบ"
      },
      {
        key: "assign",
        label: ".assign()",
        badgeType: "method",
        lineNums: [10],
        title: ".assign() — สร้างตารางใหม่พร้อมคอลัมน์ปรับปรุง",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.assign()</strong> เป็นวิธีที่ปลอดภัยที่สุดในการเพิ่มหรือแทนที่คอลัมน์ใน Pandas โดยจะสร้าง DataFrame ใหม่ขึ้นมา ไม่เผลอไปเปลี่ยนข้อมูลใน <code>df</code> ต้นฉบับ",
        rule: "clean_df = df.assign(height_cm=filled_height)",
        tip: "💡 ชื่อนอกเครื่องหมายคำพูดทางซ้ายของ = ใน assign คือชื่อคอลัมน์ที่จะสร้างใหม่"
      },
      {
        key: "shape",
        label: "df.shape (Property)",
        badgeType: "property",
        lineNums: [12],
        title: "df.shape — ตรวจสอบขนาดตาราง (Property ไม่มีวงเล็บ ())",
        kind: "Property · พร็อพเพอร์ตี้",
        kindClass: "kind-property",
        explanation: "<strong>df.shape</strong> ตรวจสอบว่าหลังจากทำความสะอาดและเติมค่าว่างแล้ว ตารางยังมีขนาดแถวและคอลัมน์ครบถ้วน เช่น <code>(20, 15)</code> <strong>ข้อควรระวัง:</strong> เป็น Property ไม่มีวงเล็บ <code>()</code>",
        rule: "clean_df.shape  # คืนค่า (แถว, คอลัมน์)",
        tip: "💡 วิธีแยกแยะ: ถ้าเป็นการ 'สั่งคำนวณ' (.isna(), .median(), .fillna()) จะมี () เสมอ แต่ถ้าเป็นการ 'ถามสเปก' (.shape) จะไม่มี ()"
      }
    ]
  },

  // Week 04 (จุดเน้นหลักของผู้ใช้: Series, Mask, &, Ambiguous Error)
  {
    filename: "week04_filter_and_series.py",
    title: "Filter data",
    subtitle: "เข้าใจ Series รายแถว, Boolean Mask, ทำไมต้องใช้ & และเลี่ยง Ambiguous Error",
    lines: [
      { num: 1, textHtml: '<span class="tok-com"># 1. เทียบอายุ <= 25 ได้ผลลัพธ์เป็น Series ของ True/False</span>', isComment: true },
      { num: 2, textHtml: '<span class="tok-var">young_mask</span> <span class="tok-op">=</span> <span class="tok-var">df</span>[<span class="tok-str">"age"</span>] <span class="tok-op">&lt;=</span> <span class="tok-num">25</span>', badge: "SERIES", badgeType: "series", key: "series" },
      { num: 3, textHtml: '<span class="tok-com"># 2. เทียบคะแนน >= 85 ได้ผลลัพธ์เป็น Series ของ True/False</span>', isComment: true },
      { num: 4, textHtml: '<span class="tok-var">star_mask</span> <span class="tok-op">=</span> <span class="tok-var">df</span>[<span class="tok-str">"overall"</span>] <span class="tok-op">&gt;=</span> <span class="tok-num">85</span>', badge: "SERIES", badgeType: "series", key: "series" },
      { num: 5, textHtml: '<span class="tok-com"># 3. เชื่อมด้วย & (และระดับแถว) — ห้ามใช้ and เพราะ Series มีหลายค่า (Ambiguous)</span>', isComment: true },
      { num: 6, textHtml: '<span class="tok-var">combined_mask</span> <span class="tok-op">=</span> (<span class="tok-var">young_mask</span>) <span class="tok-op">&amp;</span> (<span class="tok-var">star_mask</span>)', badge: "OPERATOR &", badgeType: "operator", key: "ampersand" },
      { num: 7, textHtml: '<span class="tok-com"># 4. ใช้ Boolean Mask สวมทับตารางเพื่อเลือกเฉพาะแถวที่ผ่านเกณฑ์</span>', isComment: true },
      { num: 8, textHtml: '<span class="tok-var">future_stars</span> <span class="tok-op">=</span> <span class="tok-var">df</span>[<span class="tok-var">combined_mask</span>]', badge: "BOOLEAN MASK", badgeType: "mask", key: "boolean_mask" },
      { num: 9, textHtml: '<span class="tok-com"># 5. อีกวิธี: ใช้ .query() กรองด้วยข้อความคล้ายภาษาคน</span>', isComment: true },
      { num: 10, textHtml: '<span class="tok-var">target_leagues</span> <span class="tok-op">=</span> <span class="tok-var">df</span>.<span class="tok-fn">query</span>(<span class="tok-str">"league == \'La Liga\'"</span>)', badge: "QUERY", badgeType: "query", key: "query" },
      { num: 11, textHtml: '<span class="tok-com"># 6. ตรวจสอบกลุ่มหลายหมวดหมู่ด้วย .isin()</span>', isComment: true },
      { num: 12, textHtml: '<span class="tok-var">forwards</span> <span class="tok-op">=</span> <span class="tok-var">df</span>[<span class="tok-var">df</span>[<span class="tok-str">"position"</span>].<span class="tok-fn">isin</span>([<span class="tok-str">"ST"</span>, <span class="tok-str">"RW"</span>])]', badge: "ISIN", badgeType: "method", key: "isin" }
    ],
    keywords: [
      {
        key: "series",
        label: "Series (หัวใจการกรอง)",
        badgeType: "series",
        lineNums: [2, 4],
        title: "Series — เข้าใจจาก 0 สู่ 100",
        kind: "Concept · ชนิดข้อมูลพื้นฐาน",
        kindClass: "kind-concept",
        explanation: "<strong>Series คืออะไรสำหรับผู้เริ่มต้น?</strong><br>เปรียบเทียบง่ายๆ:<br>• <strong>DataFrame</strong> = สมุดตาราง Excel ทั้งเล่ม (มีทั้งแถวและคอลัมน์)<br>• <strong>Series</strong> = ข้อมูล <strong>1 เสาเดี่ยวๆ</strong> ที่ดึงออกมาจากตาราง พร้อมหมายเลขแถว (Index)<br><br>เมื่อเราเขียน <code>df['age'] &lt;= 25</code> ตัว Pandas จะหยิบเสาอายุมาเทียบทีละคน ได้ผลลัพธ์เป็น <strong>Series ของ True/False</strong> เรียงต่อกันลงมา [True, False, False, True...]",
        rule: "col_series = df[\"age\"]             # ข้อมูล 1 คอลัมน์เดี่ยว\nbool_series = df[\"age\"] <= 25       # Series ที่เก็บ True/False รายแถว",
        tip: "💡 จำง่ายๆ: วงเล็บ 1 ชั้น df['col'] ได้ Series (1 เสา), วงเล็บ 2 ชั้น df[['col']] ได้ DataFrame (ตาราง)"
      },
      {
        key: "ampersand",
        label: "& (และระดับแถว)",
        badgeType: "operator",
        lineNums: [6],
        title: "ทำไมต้องใช้ & และทำไม and ถึงพัง (Ambiguous Error)",
        kind: "Operator · ตัวดำเนินการ",
        kindClass: "kind-operator",
        explanation: "<strong>ทำไมใช้ and แล้วเกิด Error: <em>The truth value of a Series is ambiguous</em>?</strong><br><br>1. คำว่า <code>and</code> ของ Python ถูกออกแบบมาเพื่อตัดสิน <strong>ความจริงตัวเดียว</strong> เช่น <code>True and False</code> ได้ <code>False</code><br>2. แต่ใน Pandas แต่ละฝั่งคือ <strong>Series ที่มี 20 แถว</strong> ซึ่งมีทั้ง True และ False ปนกันหลายคน Python จึงไม่รู้ว่า 'จะให้สรุปทั้งตารางเป็น True หรือ False ตัวเดียวได้อย่างไร?' จึงโยน Error ว่า <em>ambiguous (คลุมเครือ)</em><br>3. ทางแก้คือใช้เครื่องหมาย <strong><code>&amp;</code></strong> ซึ่งสั่งให้ Pandas ทำการเปรียบเทียบ 'และ' <strong>ระดับแถว ทีละคนจนครบทั้ง 20 แถว</strong>",
        rule: "# ❌ พัง: (df['age'] <= 25) and (df['overall'] >= 85)\n# ✅ ถูก: (df['age'] <= 25) & (df['overall'] >= 85)   <-- ต้องมีวงเล็บรอบแต่ละเงื่อนไขเสมอ!",
        tip: "⚠️ ต้องใส่วงเล็บรอบแต่ละเงื่อนไขเสมอ เพราะเครื่องหมาย & มีลำดับการทำงานสูงกว่าเครื่องหมายเปรียบเทียบ"
      },
      {
        key: "boolean_mask",
        label: "Boolean Mask (การกรอง)",
        badgeType: "mask",
        lineNums: [8],
        title: "Boolean Mask — แผ่นกระดาษฉลุเลือกแถว",
        kind: "Concept · กลไกการกรอง",
        kindClass: "kind-concept",
        explanation: "<strong>Boolean Mask ทำงานอย่างไร?</strong><br>เปรียบเหมือน 'แผ่นกระดาษฉลุ' ที่เราเจาะรูเฉพาะแถวที่เป็น <code>True</code> แล้วนำไปทาบทับลงบนตาราง <code>df[combined_mask]</code> แถวที่เป็น <code>True</code> จะโผล่รอดออกมา ส่วนแถวที่เป็น <code>False</code> จะถูกบังไว้ ผลลัพธ์จึงได้ตารางเฉพาะนักเตะที่ผ่านเกณฑ์ทั้งสองข้อพร้อมกัน",
        rule: "mask = (df[\"age\"] <= 25) & (df[\"overall\"] >= 85)\nresult_df = df[mask]",
        tip: "💡 ตรวจดูจำนวนคนที่ผ่านเกณฑ์ได้ง่ายๆ ด้วย mask.sum() (นับ True เป็น 1)"
      },
      {
        key: "query",
        label: ".query() (Method)",
        badgeType: "query",
        lineNums: [10],
        title: ".query() — กรองด้วยประโยคภาษาคน",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.query()</strong> ช่วยให้เราเขียนเงื่อนไขเป็นข้อความสั้นๆ ได้ โดยสามารถพิมพ์คำว่า <code>and</code> หรือ <code>or</code> ข้างในข้อความได้เลย และไม่ต้องใส่วงเล็บซ้อนกันหลายชั้น เหมาะสำหรับผู้เริ่มต้นที่ไม่อยากปวดหัวกับวงเล็บ",
        rule: "df.query(\"age <= 25 and overall >= 85\")",
        tip: "💡 ใน .query() ใช้คำว่า and ได้ เพราะ Pandas จะแปลความหมายระดับแถวให้เราเองโดยอัตโนมัติ"
      },
      {
        key: "isin",
        label: ".isin() (Method)",
        badgeType: "method",
        lineNums: [12],
        title: ".isin() — กรองหลายค่าพร้อมกัน",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.isin()</strong> ใช้ตรวจว่าค่าในคอลัมน์นั้นตรงกับสมาชิกตัวใดตัวหนึ่งใน List ที่เราส่งไปหรือไม่ แทนที่จะต้องเขียน <code>(pos == 'ST') | (pos == 'RW')</code> ให้ยาว",
        rule: "df[df[\"position\"].isin([\"ST\", \"RW\"])]",
        tip: "💡 คืนค่าเป็น Series ของ True/False เช่นเดียวกับการเปรียบเทียบเงื่อนไขอื่นๆ"
      }
    ]
  },

  // Week 05
  {
    filename: "week05_groupby_analysis.py",
    title: "Analysis พื้นฐาน",
    subtitle: "groupby() เปรียบเหมือนการแยกกองเอกสารตามลีก แล้วคำนวณค่าเฉลี่ยสรุป",
    lines: [
      { num: 1, textHtml: '<span class="tok-com"># 1. จัดกลุ่มข้อมูลตาม league แล้วเลือกดูคอลัมน์ overall</span>', isComment: true },
      { num: 2, textHtml: '<span class="tok-var">by_league</span> <span class="tok-op">=</span> <span class="tok-var">df</span>.<span class="tok-fn">groupby</span>(<span class="tok-str">"league"</span>)[<span class="tok-str">"overall"</span>]', badge: "GROUPBY", badgeType: "method", key: "groupby" },
      { num: 3, textHtml: '<span class="tok-com"># 2. คำนวณค่าเฉลี่ยของแต่ละลีก ได้ผลลัพธ์เป็น Series</span>', isComment: true },
      { num: 4, textHtml: '<span class="tok-var">league_mean</span> <span class="tok-op">=</span> <span class="tok-var">by_league</span>.<span class="tok-fn">mean</span>()', badge: "MEAN", badgeType: "method", key: "mean" },
      { num: 5, textHtml: '<span class="tok-com"># 3. เรียงลำดับจากค่าเฉลี่ยมากไปน้อย</span>', isComment: true },
      { num: 6, textHtml: '<span class="tok-var">sorted_result</span> <span class="tok-op">=</span> <span class="tok-var">league_mean</span>.<span class="tok-fn">sort_values</span>(<span class="tok-var">ascending</span><span class="tok-op">=</span><span class="tok-kw">False</span>)', badge: "SORT_VALUES", badgeType: "method", key: "sort_values" },
      { num: 7, textHtml: '<span class="tok-com"># 4. ดูชื่อลีกที่เป็น Index ของ Series ด้วย .index (Property ไม่มีวงเล็บ ())</span>', isComment: true },
      { num: 8, textHtml: '<span class="tok-var">league_names</span> <span class="tok-op">=</span> <span class="tok-var">sorted_result</span>.<span class="tok-fn">index</span>', badge: "INDEX", badgeType: "property", key: "index_prop" },
      { num: 9, textHtml: '<span class="tok-com"># 5. แปลงผลลัพธ์ Series กลับเป็นตาราง DataFrame ด้วย .reset_index()</span>', isComment: true },
      { num: 10, textHtml: '<span class="tok-var">result_df</span> <span class="tok-op">=</span> <span class="tok-var">sorted_result</span>.<span class="tok-fn">reset_index</span>(<span class="tok-var">name</span><span class="tok-op">=</span><span class="tok-str">"avg_overall"</span>)', badge: "RESET_INDEX", badgeType: "method", key: "reset_index" },
      { num: 11, textHtml: '<span class="tok-com"># 6. สรุปหลายค่าสถิติพร้อมกันด้วย .agg() (count, mean, median)</span>', isComment: true },
      { num: 12, textHtml: '<span class="tok-var">stats</span> <span class="tok-op">=</span> <span class="tok-var">df</span>.<span class="tok-fn">groupby</span>(<span class="tok-str">"league"</span>)[<span class="tok-str">"overall"</span>].<span class="tok-fn">agg</span>([<span class="tok-str">"count"</span>, <span class="tok-str">"mean"</span>, <span class="tok-str">"median"</span>])', badge: "AGG", badgeType: "method", key: "agg" }
    ],
    keywords: [
      {
        key: "groupby",
        label: ".groupby()",
        badgeType: "method",
        lineNums: [2],
        title: ".groupby() — แบ่งตารางเป็นกลุ่ม",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.groupby() เปรียบเหมือนการแยกกองเอกสาร</strong>: นำแถวทั้งหมดมาคัดแยกใส่กล่องตามชื่อลีก (เช่น กล่อง La Liga, กล่อง Premier League, กล่อง MLS) แต่การแยกกองยังไม่ได้คำนวณอะไรออกมา จึงต้องตามด้วยคำสั่งสรุปผลเสมอ",
        rule: "df.groupby(\"group_col\")[\"value_col\"]",
        tip: "⚠️ groupby() อย่างเดียวจะยังไม่แสดงผลตัวเลข ต้องสั่ง .mean(), .sum() หรือ .agg() ตามหลัง"
      },
      {
        key: "mean",
        label: ".mean()",
        badgeType: "method",
        lineNums: [4],
        title: ".mean() — คำนวณค่าเฉลี่ยของแต่ละกลุ่ม",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.mean()</strong> จะนำคะแนนของนักเตะทุกคนในกล่องนั้นมารวมกันแล้วหารด้วยจำนวนคน ได้คำตอบเป็นตัวเลขค่าเฉลี่ย 1 ค่าต่อ 1 ลีก ผลลัพธ์ที่ได้ออกมาคือ <strong>Series ที่มี Index เป็นชื่อลีก</strong>",
        rule: "league_mean = df.groupby(\"league\")[\"overall\"].mean()",
        tip: "💡 ค่าเฉลี่ยตอบภาพรวม แต่ไม่ได้แปลว่าทุกคนในลีกนั้นจะคะแนนสูงเท่ากัน ควรดูจำนวนคนประกอบ"
      },
      {
        key: "sort_values",
        label: ".sort_values()",
        badgeType: "method",
        lineNums: [6],
        title: ".sort_values() — เรียงลำดับข้อมูล",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.sort_values()</strong> ใช้เรียงลำดับตัวเลขเพื่อหาว่ากลุ่มไหนได้คะแนนสูงสุด ค่าเริ่มต้นคือเรียงจากน้อยไปมาก (ascending=True) ถ้าต้องการให้มากสุดอยู่บนสุดให้ระบุ <code>ascending=False</code>",
        rule: "series.sort_values(ascending=False)",
        tip: "💡 ช่วยให้เรามองเห็นอันดับ 1, 2, 3 ของการเปรียบเทียบได้ทันทีโดยไม่ต้องกวาดสายตาหา"
      },
      {
        key: "index_prop",
        label: "series.index (Property)",
        badgeType: "property",
        lineNums: [8],
        title: "series.index — ชื่อกลุ่มที่เป็นหัวแถว (Property ไม่มีวงเล็บ ())",
        kind: "Property · พร็อพเพอร์ตี้",
        kindClass: "kind-property",
        explanation: "<strong>series.index คืออะไร?</strong> ตอนที่เราสั่ง groupby() รายชื่อลีกจะกลายเป็น Index (ป้ายกำกับแถว) ของ Series ตัวแปร <code>.index</code> เป็น Property ประจำตัว จึง<strong>ไม่มีวงเล็บ ()</strong> สามารถส่งตรงเข้าแกน X ของกราฟได้ทันที",
        rule: "names = series.index  # คืนค่า Index(['La Liga', 'Premier League', ...]) ไม่มี ()",
        tip: "💡 index เป็นคุณสมบัติประจำตัว ไม่ใช่คำสั่งคำนวณ จึงไม่ต้องใส่วงเล็บ ()"
      },
      {
        key: "reset_index",
        label: ".reset_index()",
        badgeType: "method",
        lineNums: [10],
        title: ".reset_index() — แปลง Series กลับเป็นตาราง DataFrame",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.reset_index()</strong> จะย้ายชื่อกลุ่มจาก Index กลับมาเป็นคอลัมน์ข้อมูลปกติ และเปลี่ยน Series ให้กลับมาเป็นตาราง 2 มิติ (DataFrame) พร้อมใช้งานต่อ",
        rule: "df_table = series.reset_index(name=\"avg_overall\")",
        tip: "💡 เหมาะมากเมื่อต้องการนำผลลัพธ์ไปกรองหรือจัดรูปต่อในขั้นตอนถัดไป"
      },
      {
        key: "agg",
        label: ".agg()",
        badgeType: "method",
        lineNums: [12],
        title: ".agg() — สรุปหลายค่าสถิติในครั้งเดียว",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.agg() ย่อมาจาก Aggregate</strong> ใช้เมื่อเราไม่อยากเชื่อค่าเฉลี่ยเพียงอย่างเดียว จึงสั่งให้คำนวณทั้งจำนวนตัวอย่าง (count), ค่าเฉลี่ย (mean) และค่ากลาง (median) ออกมาเป็นตารางเดียวกันในคำสั่งเดียว",
        rule: "grouped.agg([\"count\", \"mean\", \"median\"])",
        tip: "💡 ถ้ารายงานมี count จะช่วยบอกความน่าเชื่อถือว่าลีกนั้นมีนักเตะกี่คน"
      }
    ]
  },

  // Week 06
  {
    filename: "week06_visualization_matplotlib.py",
    title: "Visualization",
    subtitle: "ใช้ Matplotlib เปลี่ยนตัวเลขเป็นภาพเปรียบเทียบ พร้อมชื่อแกนที่ชัดเจน",
    lines: [
      { num: 1, textHtml: '<span class="tok-com"># 1. เลือกนักเตะ 5 คนที่มีคะแนน overall สูงสุดด้วย .nlargest()</span>', isComment: true },
      { num: 2, textHtml: '<span class="tok-var">top5</span> <span class="tok-op">=</span> <span class="tok-var">df</span>.<span class="tok-fn">nlargest</span>(<span class="tok-num">5</span>, <span class="tok-str">"overall"</span>)', badge: "NLARGEST", badgeType: "method", key: "nlargest" },
      { num: 3, textHtml: '<span class="tok-com"># 2. นำเข้าโมดูล pyplot สำหรับวาดกราฟ</span>', isComment: true },
      { num: 4, textHtml: '<span class="tok-kw">import</span> <span class="tok-var">matplotlib</span>.<span class="tok-var">pyplot</span> <span class="tok-kw">as</span> <span class="tok-var">plt</span>', badge: "IMPORT", badgeType: "syntax", key: "import_plt" },
      { num: 5, textHtml: '<span class="tok-com"># 3. วาดกราฟแท่ง: ส่งรายชื่อ (แกน X) และคะแนน (แกน Y)</span>', isComment: true },
      { num: 6, textHtml: '<span class="tok-var">plt</span>.<span class="tok-fn">bar</span>(<span class="tok-var">top5</span>[<span class="tok-str">"name"</span>], <span class="tok-var">top5</span>[<span class="tok-str">"overall"</span>])', badge: "PLT.BAR", badgeType: "function", key: "plt_bar" },
      { num: 7, textHtml: '<span class="tok-com"># 4. หมุนป้ายชื่อแกน X 25 องศาเพื่อไม่ให้ตัวหนังสือทับกัน</span>', isComment: true },
      { num: 8, textHtml: '<span class="tok-var">plt</span>.<span class="tok-fn">xticks</span>(<span class="tok-var">rotation</span><span class="tok-op">=</span><span class="tok-num">25</span>, <span class="tok-var">ha</span><span class="tok-op">=</span><span class="tok-str">"right"</span>)', badge: "PLT.XTICKS", badgeType: "function", key: "plt_xticks" },
      { num: 9, textHtml: '<span class="tok-com"># 5. ใส่ชื่อแกน Y อธิบายความหมายของความสูงแท่ง</span>', isComment: true },
      { num: 10, textHtml: '<span class="tok-var">plt</span>.<span class="tok-fn">ylabel</span>(<span class="tok-str">"Overall Rating (คะแนนรวม)"</span>)', badge: "PLT.YLABEL", badgeType: "function", key: "plt_ylabel" },
      { num: 11, textHtml: '<span class="tok-com"># 6. สั่งแสดงผลกราฟออกหน้าจอ</span>', isComment: true },
      { num: 12, textHtml: '<span class="tok-var">plt</span>.<span class="tok-fn">show</span>()', badge: "PLT.SHOW", badgeType: "function", key: "plt_show" }
    ],
    keywords: [
      {
        key: "nlargest",
        label: ".nlargest()",
        badgeType: "method",
        lineNums: [2],
        title: ".nlargest() — เลือกแถวที่ค่าสูงสุด",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.nlargest(n, 'col')</strong> คือคำสั่งลัดที่ดึง $n$ แถวแรกที่มีค่าตัวเลขมากที่สุดและเรียงลำดับให้อัตโนมัติ สั้นกว่าการเขียน sort_values แล้วค่อย head",
        rule: "top5 = df.nlargest(5, \"overall\")",
        tip: "💡 เหมาะมากสำหรับการเตรียมข้อมูล Top 5 หรือ Top 10 ก่อนนำไปพล็อตกราฟ"
      },
      {
        key: "import_plt",
        label: "import pyplot",
        badgeType: "syntax",
        lineNums: [4],
        title: "import matplotlib.pyplot as plt",
        kind: "Syntax · ไวยากรณ์",
        kindClass: "kind-syntax",
        explanation: "<strong>matplotlib.pyplot</strong> เป็นไลบรารีมาตรฐานสำหรับสร้างกราฟใน Python นิยมตั้งชื่อเล่นสั้นๆ ว่า <code>plt</code>",
        rule: "import matplotlib.pyplot as plt",
        tip: "💡 นำเข้าพร้อมกับ pandas ไว้บนสุดของโค้ดเสมอ"
      },
      {
        key: "plt_bar",
        label: "plt.bar() (Function)",
        badgeType: "function",
        lineNums: [6],
        title: "plt.bar() — วาดกราฟแท่ง",
        kind: "Function · ฟังก์ชัน",
        kindClass: "kind-function",
        explanation: "<strong>plt.bar(x, y)</strong> ฟังก์ชันสร้างกราฟแท่ง โดยแกน X คือหมวดหมู่ (เช่น ชื่อนักเตะ) และแกน Y คือตัวเลข (เช่น คะแนน overall) ต้องส่งข้อมูลที่มีความยาวเท่ากันเสมอ",
        rule: "plt.bar(x_categories, y_values)",
        tip: "⚠️ ห้ามสลับลำดับแกน X และ Y เพราะจะทำให้ทิศทางของกราฟผิดพลาด"
      },
      {
        key: "plt_xticks",
        label: "plt.xticks()",
        badgeType: "function",
        lineNums: [8],
        title: "plt.xticks() — จัดวางป้ายชื่อแกน X",
        kind: "Function · ฟังก์ชัน",
        kindClass: "kind-function",
        explanation: "<strong>plt.xticks(rotation=25, ha='right')</strong> ปรับองศาของตัวหนังสือแกน X ให้เอียง 25 องศา ช่วยให้อ่านชื่อยาวๆ ได้ชัดเจนโดยที่ตัวอักษรไม่ทับซ้อนกัน",
        rule: "plt.xticks(rotation=25, ha=\"right\")",
        tip: "💡 ha='right' ช่วยให้ปลายชื่อชี้ตรงกับกึ่งกลางของแท่งกราฟพอดี"
      },
      {
        key: "plt_ylabel",
        label: "plt.ylabel()",
        badgeType: "function",
        lineNums: [10],
        title: "plt.ylabel() — ใส่ชื่อและหน่วยแกน Y",
        kind: "Function · ฟังก์ชัน",
        kindClass: "kind-function",
        explanation: "<strong>plt.ylabel()</strong> สำคัญมากสำหรับการสื่อสารข้อมูล เพราะกราฟที่ไม่มีชื่อแกนจะทำให้คนดูไม่รู้ว่าแท่งกราฟสูงหมายถึงอะไร ต้องระบุทั้งชื่อตัวแปรและหน่วยวัดเสมอ",
        rule: "plt.ylabel(\"ชื่อแกนและหน่วย\")",
        tip: "💡 กราฟที่ดีต้องตอบคำถามได้ด้วยตัวเองโดยไม่ต้องให้คนพรีเซนต์คอยบอก"
      },
      {
        key: "plt_show",
        label: "plt.show()",
        badgeType: "function",
        lineNums: [12],
        title: "plt.show() — แสดงรูปภาพกราฟ",
        kind: "Function · ฟังก์ชัน",
        kindClass: "kind-function",
        explanation: "<strong>plt.show()</strong> สั่งให้ Matplotlib นำคำสั่งตกแต่งทั้งหมด (แท่ง, ชื่อแกน, ป้ายกำกับ) มาประกอบเป็นภาพและแสดงผลออกหน้าจออย่างสมบูรณ์",
        rule: "plt.show()",
        tip: "💡 วางไว้บรรทัดสุดท้ายของการวาดรูปเสมอ"
      }
    ]
  },

  // Week 07
  {
    filename: "week07_storytelling_insights.py",
    title: "เล่าเรื่องจากข้อมูล",
    subtitle: "เปลี่ยน Series เป็นตารางด้วย .reset_index(), ดึงแถวด้วย .iloc[0] และเขียนสรุปด้วย f-string",
    lines: [
      { num: 1, textHtml: '<span class="tok-com"># 1. ปรับ Index ของผลลัพธ์ให้กลับมาเป็นคอลัมน์ปกติด้วย .reset_index()</span>', isComment: true },
      { num: 2, textHtml: '<span class="tok-var">summary_table</span> <span class="tok-op">=</span> <span class="tok-var">league_mean</span>.<span class="tok-fn">reset_index</span>(<span class="tok-var">name</span><span class="tok-op">=</span><span class="tok-str">"average_overall"</span>)', badge: "RESET_INDEX", badgeType: "method", key: "reset_index" },
      { num: 3, textHtml: '<span class="tok-com"># 2. เรียงลำดับคะแนนจากมากไปน้อยด้วย .sort_values()</span>', isComment: true },
      { num: 4, textHtml: '<span class="tok-var">ranked</span> <span class="tok-op">=</span> <span class="tok-var">summary_table</span>.<span class="tok-fn">sort_values</span>(<span class="tok-str">"average_overall"</span>, <span class="tok-var">ascending</span><span class="tok-op">=</span><span class="tok-kw">False</span>)', badge: "SORT_VALUES", badgeType: "method", key: "sort_values" },
      { num: 5, textHtml: '<span class="tok-com"># 3. ดึงแถวแรก (อันดับ 1) ออกมาดูด้วย .iloc[0] — เป็น Property ไม่มีวงเล็บ ()</span>', isComment: true },
      { num: 6, textHtml: '<span class="tok-var">best_league</span> <span class="tok-op">=</span> <span class="tok-var">ranked</span>.<span class="tok-fn">iloc</span>[<span class="tok-num">0</span>]', badge: "ILOC", badgeType: "property", key: "iloc" },
      { num: 7, textHtml: '<span class="tok-com"># 4. ใช้ f-string สรุปผลลัพธ์เป็นประโยคที่ผู้อ่านเข้าใจได้ทันที</span>', isComment: true },
      { num: 8, textHtml: '<span class="tok-var">message</span> <span class="tok-op">=</span> <span class="tok-str">f"ในชุดข้อมูลนี้ {best_league[\'league\']} มีคะแนนเฉลี่ยสูงสุดที่ {best_league[\'average_overall\']:.1f}"</span>', badge: "F-STRING", badgeType: "syntax", key: "fstring" },
      { num: 9, textHtml: '<span class="tok-com"># 5. นับจำนวนตัวอย่างทั้งหมดด้วย len() — เป็น Function มีวงเล็บ ()</span>', isComment: true },
      { num: 10, textHtml: '<span class="tok-var">sample_count</span> <span class="tok-op">=</span> <span class="tok-fn">len</span>(<span class="tok-var">df</span>)', badge: "LEN", badgeType: "function", key: "len_func" },
      { num: 11, textHtml: '<span class="tok-com"># 6. พิมพ์รายงานพร้อมระบุข้อจำกัด ไม่เหมารวมเกินหลักฐาน</span>', isComment: true },
      { num: 12, textHtml: '<span class="tok-fn">print</span>(<span class="tok-str">f"{message} (อ้างอิงจากข้อมูลตัวอย่าง {sample_count} คน)"</span>)', badge: "PRINT", badgeType: "function", key: "print" }
    ],
    keywords: [
      {
        key: "reset_index",
        label: ".reset_index()",
        badgeType: "method",
        lineNums: [2],
        title: ".reset_index() — ย้าย Index กลับมาเป็นคอลัมน์",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.reset_index() คืออะไร?</strong> ตอนที่เราสั่ง groupby() ชื่อลีกจะถูกนำไปทำเป็น Index (ป้ายกำกับแถว) คำสั่ง .reset_index() จะปลดชื่อลีกกลับมาเป็นคอลัมน์ข้อมูลปกติในตาราง ทำให้เราสามารถเขียน <code>row['league']</code> ได้อย่างสะดวก",
        rule: "df_table = series.reset_index(name=\"column_name\")",
        tip: "💡 เปลี่ยนจาก Series ผลลัพธ์ให้กลับมาเป็น DataFrame ที่มี 2 คอลัมน์"
      },
      {
        key: "sort_values",
        label: ".sort_values()",
        badgeType: "method",
        lineNums: [4],
        title: ".sort_values() — เรียงลำดับตารางผลลัพธ์",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.sort_values()</strong> บน DataFrame ใช้ระบุชื่อคอลัมน์ที่ต้องการเรียง เช่น <code>ranked = summary_table.sort_values('average_overall', ascending=False)</code> เพื่อให้อันดับ 1 มาอยู่ที่แถวแรกสุด",
        rule: "df.sort_values(\"col_name\", ascending=False)",
        tip: "💡 การเรียงลำดับก่อนใช้ .iloc[0] เป็นสิ่งสำคัญเพื่อให้มั่นใจว่าดึงแถวอันดับ 1 จริงๆ"
      },
      {
        key: "iloc",
        label: ".iloc[0] (Property)",
        badgeType: "property",
        lineNums: [6],
        title: ".iloc[0] — ดึงแถวตามลำดับตัวเลข (Property ไม่มีวงเล็บ ())",
        kind: "Property · พร็อพเพอร์ตี้",
        kindClass: "kind-property",
        explanation: "<strong>.iloc ย่อมาจาก Integer Location</strong> คือการชี้ตำแหน่งแถวด้วยตัวเลขเริ่มต้นจาก 0 ดังนั้น <code>.iloc[0]</code> หมายถึงดึงข้อมูลแถวบนสุด (อันดับ 1) ออกมาดูทั้งแถว <strong>ข้อควรระวัง:</strong> เป็น Property Indexer ใช้วงเล็บเหลี่ยม <code>[]</code> ห้ามใส่วงเล็บกลม <code>()</code>",
        rule: "first_row = df.iloc[0]  # แถวแรกสุด (วงเล็บเหลี่ยม [])",
        tip: "💡 ใช้กับตารางที่เรียงลำดับคะแนนแล้วเพื่อหยิบ 'ผู้ชนะเลิศ' มาทำรายงาน"
      },
      {
        key: "fstring",
        label: "f-string",
        badgeType: "syntax",
        lineNums: [8],
        title: "f-string — จัดรูปแบบข้อความอัตโนมัติ",
        kind: "Syntax · ไวยากรณ์ Python",
        kindClass: "kind-syntax",
        explanation: "<strong>f-string</strong> ช่วยให้เราแทรกตัวแปรลงในข้อความได้โดยตรงในวงเล็บปีกกา <code>{variable}</code> และสามารถจัดทศนิยม เช่น <code>{value:.1f}</code> เพื่อปัดเศษทศนิยมเหลือ 1 ตำแหน่งให้อ่านง่าย",
        rule: "f\"ลีก {name} คะแนนเฉลี่ย {val:.1f}\"",
        tip: "💡 คำสรุปที่ดีควรขึ้นต้นด้วยคำว่า 'ในชุดข้อมูลนี้...' เพื่อบอกขอบเขตหลักฐานอย่างชัดเจน"
      },
      {
        key: "len_func",
        label: "len() (Function)",
        badgeType: "function",
        lineNums: [10],
        title: "len() — นับจำนวนแถวทั้งหมด (Function มีวงเล็บ ())",
        kind: "Function · ฟังก์ชัน",
        kindClass: "kind-function",
        explanation: "<strong>len()</strong> เป็นฟังก์ชันมาตรฐานของ Python ใช้ส่ง DataFrame เข้าไปเพื่อถามจำนวนแถวทั้งหมด เช่น <code>len(df)</code> ได้ 20 เพื่อนำตัวเลขนี้ไปใส่เป็นหลักฐานในรายงาน",
        rule: "total_rows = len(df)  # ฟังก์ชันมีวงเล็บ ()",
        tip: "💡 รายงานที่น่าเชื่อถือควรบอกจำนวนกลุ่มตัวอย่างเสมอ ไม่ปล่อยให้คนอ่านเดา"
      },
      {
        key: "print",
        label: "print() (Function)",
        badgeType: "function",
        lineNums: [12],
        title: "print() — แสดงรายงานข้อความสรุปพร้อมข้อจำกัด",
        kind: "Function · ฟังก์ชัน",
        kindClass: "kind-function",
        explanation: "<strong>print()</strong> ส่งข้อความสรุปออกหน้าจอ การระบุข้อจำกัด เช่น <em>'(อ้างอิงจากข้อมูลตัวอย่าง 20 คน)'</em> ช่วยให้รายงานมีความน่าเชื่อถือทางวิทยาศาสตร์ข้อมูล ไม่ด่วนสรุปเกินหลักฐาน",
        rule: "print(message + \" (หมายเหตุ: ...)\")",
        tip: "💡 อย่ารายงานข้อสรุปโดยไม่มีบริบทและข้อจำกัดของข้อมูลประกอบเสมอ"
      }
    ]
  },

  // Week 08
  {
    filename: "week08_machine_learning.py",
    title: "Machine Learning เบื้องต้น",
    subtitle: "Features (X) ต้องเป็นตาราง 2 มิติ [[]], Target (y) เป็น Series 1 มิติ []",
    lines: [
      { num: 1, textHtml: '<span class="tok-com"># 1. กำหนด Features (ข้อมูลเข้า X) เป็นตาราง 2 มิติ [[]]</span>', isComment: true },
      { num: 2, textHtml: '<span class="tok-var">X</span> <span class="tok-op">=</span> <span class="tok-var">df</span>[[<span class="tok-str">"overall"</span>, <span class="tok-str">"age"</span>, <span class="tok-str">"pace"</span>, <span class="tok-str">"shooting"</span>]]', badge: "2D DATAFRAME", badgeType: "dataframe", key: "feature_x" },
      { num: 3, textHtml: '<span class="tok-com"># 2. กำหนด Target (เป้าหมายทำนาย y) เป็น Series 1 มิติ []</span>', isComment: true },
      { num: 4, textHtml: '<span class="tok-var">y</span> <span class="tok-op">=</span> <span class="tok-var">df</span>[<span class="tok-str">"value_millions"</span>]', badge: "1D SERIES", badgeType: "series", key: "target_y" },
      { num: 5, textHtml: '<span class="tok-com"># 3. แบ่งข้อมูลเป็น Train (80%) และ Test (20%)</span>', isComment: true },
      { num: 6, textHtml: '<span class="tok-var">X_train</span>, <span class="tok-var">X_test</span>, <span class="tok-var">y_train</span>, <span class="tok-var">y_test</span> <span class="tok-op">=</span> <span class="tok-fn">train_test_split</span>(<span class="tok-var">X</span>, <span class="tok-var">y</span>, <span class="tok-var">test_size</span><span class="tok-op">=</span><span class="tok-num">0.2</span>)', badge: "TRAIN_TEST_SPLIT", badgeType: "function", key: "split" },
      { num: 7, textHtml: '<span class="tok-com"># 4. ฝึกสอนโมเดลให้เรียนรู้ความสัมพันธ์ด้วย .fit()</span>', isComment: true },
      { num: 8, textHtml: '<span class="tok-var">model</span> <span class="tok-op">=</span> <span class="tok-fn">LinearRegression</span>().<span class="tok-fn">fit</span>(<span class="tok-var">X_train</span>, <span class="tok-var">y_train</span>)', badge: "FIT", badgeType: "method", key: "fit" },
      { num: 9, textHtml: '<span class="tok-com"># 5. สั่งโมเดลทำนายราคากับชุดทดสอบด้วย .predict()</span>', isComment: true },
      { num: 10, textHtml: '<span class="tok-var">y_pred</span> <span class="tok-op">=</span> <span class="tok-var">model</span>.<span class="tok-fn">predict</span>(<span class="tok-var">X_test</span>)', badge: "PREDICT", badgeType: "method", key: "predict" },
      { num: 11, textHtml: '<span class="tok-com"># 6. วัดความผิดพลาดเฉลี่ย (MAE) เทียบกับราคาจริง</span>', isComment: true },
      { num: 12, textHtml: '<span class="tok-var">mae</span> <span class="tok-op">=</span> <span class="tok-fn">mean_absolute_error</span>(<span class="tok-var">y_test</span>, <span class="tok-var">y_pred</span>)', badge: "MAE", badgeType: "function", key: "mae" }
    ],
    keywords: [
      {
        key: "feature_x",
        label: "Features (X) 2 มิติ",
        badgeType: "dataframe",
        lineNums: [2],
        title: "Features (X) — ตารางข้อมูลนำเข้า",
        kind: "Concept · ข้อมูล 2 มิติ",
        kindClass: "kind-concept",
        explanation: "<strong>Features (X) ทำไมต้องเป็นตาราง 2 มิติ [[]]?</strong><br>scikit-learn กำหนดว่าข้อมูลเข้าสำหรับสอนโมเดลต้องมีทั้งแถวและคอลัมน์ (หลายปัจจัย เช่น overall, age, pace) จึงต้องใช้วงเล็บ 2 ชั้นเพื่อให้ได้ DataFrame 2 มิติเสมอ หากส่ง 1 มิติจะเกิด Error: <em>Expected 2D array, got 1D array instead</em>",
        rule: "X = df[[\"overall\", \"age\", \"pace\"]]  # ต้องใส่วงเล็บ 2 ชั้น!",
        tip: "💡 สัญลักษณ์ X นิยมใช้ตัวพิมพ์ใหญ่เพื่อสื่อว่าเป็นเมทริกซ์หรือตาราง 2 มิติ"
      },
      {
        key: "target_y",
        label: "Target (y) 1 มิติ",
        badgeType: "series",
        lineNums: [4],
        title: "Target (y) — คำตอบเป้าหมายที่อยากทำนาย",
        kind: "Concept · ข้อมูล 1 มิติ",
        kindClass: "kind-concept",
        explanation: "<strong>Target (y)</strong> คือสิ่งที่เราต้องการให้โมเดลทายคำตอบ (เช่น ราคาค่าตัวนักเตะ) ซึ่งมีเพียงคำตอบเดียวต่อคน จึงใช้วงเล็บชั้นเดียว <code>df['value_millions']</code> ได้ผลลัพธ์เป็น Series 1 มิติ",
        rule: "y = df[\"value_millions\"]  # วงเล็บ 1 ชั้น ได้ Series",
        tip: "💡 สัญลักษณ์ y นิยมใช้ตัวพิมพ์เล็กเพื่อสื่อว่าเป็นเวกเตอร์ 1 มิติ (Series)"
      },
      {
        key: "split",
        label: "train_test_split()",
        badgeType: "function",
        lineNums: [6],
        title: "train_test_split() — แบ่งข้อมูลฝึกและทดสอบ",
        kind: "Function · ฟังก์ชัน",
        kindClass: "kind-function",
        explanation: "<strong>ทำไมต้องแบ่ง Train/Test?</strong> เพื่อป้องกันโมเดล 'แอบจำข้อสอบ'! เราแบ่งข้อมูล 80% ให้โมเดลฝึกเรียนรู้ (Train) และเก็บอีก 20% ไว้เป็นข้อสอบที่โมเดลไม่เคยเห็นมาก่อน (Test) เพื่อวัดความแม่นยำอย่างแท้จริง",
        rule: "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)",
        tip: "⚠️ ห้ามนำ X_test และ y_test ไปใส่ในตอน fit เด็ดขาด"
      },
      {
        key: "fit",
        label: ".fit() (Method)",
        badgeType: "method",
        lineNums: [8],
        title: ".fit() — ให้โมเดลเรียนรู้ความสัมพันธ์",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.fit()</strong> คือคำสั่งให้โมเดลเริ่มการเรียนรู้ โดยโมเดลจะหาน้ำหนักความสัมพันธ์ว่า สถิติ overall, age, pace ส่งผลต่อราคาค่าตัวอย่างไร",
        rule: "model.fit(X_train, y_train)",
        tip: "💡 หลังจากคำสั่งนี้ model จะพร้อมสำหรับการทำนาย"
      },
      {
        key: "predict",
        label: ".predict() (Method)",
        badgeType: "method",
        lineNums: [10],
        title: ".predict() — สั่งให้โมเดลทำนายคำตอบ",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.predict()</strong> จะรับข้อมูลสถิติของนักเตะเข้ามา แล้วคำนวณราคาที่น่าจะเป็นออกมาให้เราทันที",
        rule: "predictions = model.predict(X_test)",
        tip: "💡 สามารถนำโมเดลที่ fit แล้วไป predict กับไฟล์นักเตะชุดใหม่ (Unseen Data) ได้ทันที"
      },
      {
        key: "mae",
        label: "mean_absolute_error()",
        badgeType: "function",
        lineNums: [12],
        title: "mean_absolute_error() — วัดความผิดพลาดเฉลี่ย (MAE)",
        kind: "Function · ฟังก์ชัน",
        kindClass: "kind-function",
        explanation: "<strong>Mean Absolute Error (MAE)</strong> คำนวณความคลาดเคลื่อนเฉลี่ยระหว่างราคาจริง (y_test) กับราคาที่โมเดลทำนาย (y_pred) หน่วยเป็นล้านยูโร ยิ่งค่าน้อยยิ่งทายแม่นยำ",
        rule: "mae = mean_absolute_error(y_test, y_pred)",
        tip: "💡 นำค่า MAE ไปเทียบกับเกณฑ์ความคุ้มค่าเสมอ ไม่ดูแค่ตัวเลขเดี่ยวๆ"
      }
    ]
  },

  // Week 09
  {
    filename: "week09_mini_project_explore.py",
    title: "Mini project: สำรวจ",
    subtitle: "ตรวจคอลัมน์ด้วย df.columns, ตรวจขนาดด้วย .shape, นับความถี่ และสรุปสถิติด้วย describe()",
    lines: [
      { num: 1, textHtml: '<span class="tok-com"># 1. ตรวจสอบรายชื่อคอลัมน์จริงทั้งหมดในตาราง — เป็น Property ไม่มีวงเล็บ ()</span>', isComment: true },
      { num: 2, textHtml: '<span class="tok-fn">print</span>(<span class="tok-var">df</span>.<span class="tok-fn">columns</span>)', badge: "COLUMNS", badgeType: "property", key: "columns" },
      { num: 3, textHtml: '<span class="tok-com"># 2. ตรวจสอบขนาดตาราง (แถว, คอลัมน์) — เป็น Property ไม่มีวงเล็บ ()</span>', isComment: true },
      { num: 4, textHtml: '<span class="tok-fn">print</span>(<span class="tok-var">df</span>.<span class="tok-fn">shape</span>)', badge: "SHAPE", badgeType: "property", key: "shape" },
      { num: 5, textHtml: '<span class="tok-com"># 3. นับจำนวนนักเตะในแต่ละตำแหน่งด้วย .value_counts()</span>', isComment: true },
      { num: 6, textHtml: '<span class="tok-var">pos_counts</span> <span class="tok-op">=</span> <span class="tok-var">df</span>[<span class="tok-str">"position"</span>].<span class="tok-fn">value_counts</span>()', badge: "VALUE_COUNTS", badgeType: "method", key: "value_counts" },
      { num: 7, textHtml: '<span class="tok-com"># 4. ตรวจสอบช่องว่างในแต่ละคอลัมน์ด้วย .isna().sum()</span>', isComment: true },
      { num: 8, textHtml: '<span class="tok-var">missing_summary</span> <span class="tok-op">=</span> <span class="tok-var">df</span>.<span class="tok-fn">isna</span>().<span class="tok-fn">sum</span>()', badge: "ISNA_SUM", badgeType: "method", key: "isna_sum" },
      { num: 9, textHtml: '<span class="tok-com"># 5. สรุปช่วงของตัวเลข 8 ค่าสถิติ (min, max, mean, quartiles)</span>', isComment: true },
      { num: 10, textHtml: '<span class="tok-var">stats_overview</span> <span class="tok-op">=</span> <span class="tok-var">df</span>[[<span class="tok-str">"age"</span>, <span class="tok-str">"overall"</span>, <span class="tok-str">"value_millions"</span>]].<span class="tok-fn">describe</span>()', badge: "DESCRIBE", badgeType: "method", key: "describe" },
      { num: 11, textHtml: '<span class="tok-com"># 6. สรุปชนิดข้อมูลและตรวจ non-null ด้วย .info()</span>', isComment: true },
      { num: 12, textHtml: '<span class="tok-var">df</span>.<span class="tok-fn">info</span>()', badge: "INFO", badgeType: "method", key: "info" }
    ],
    keywords: [
      {
        key: "columns",
        label: "df.columns (Property)",
        badgeType: "property",
        lineNums: [2],
        title: "df.columns — สำรวจชื่อคอลัมน์ทั้งหมด (Property ไม่มีวงเล็บ ())",
        kind: "Property · พร็อพเพอร์ตี้",
        kindClass: "kind-property",
        explanation: "<strong>df.columns</strong> ตรวจสอบชื่อคอลัมน์จริงทั้งหมดที่มีในไฟล์ก่อนเริ่มทำงาน เพื่อวางแผนเลือกว่าจะใช้คอลัมน์ใดมาตอบโจทย์ของ Mini Project <strong>ข้อควรระวัง:</strong> เป็น Property ไม่มีวงเล็บ <code>()</code>",
        rule: "print(df.columns)",
        tip: "💡 เริ่มต้นวิเคราะห์ทุกโปรเจกต์ด้วยการตรวจสอบชื่อคอลัมน์เสมอ"
      },
      {
        key: "shape",
        label: "df.shape (Property)",
        badgeType: "property",
        lineNums: [4],
        title: "df.shape — ขนาดตาราง (Property ไม่มีวงเล็บ ())",
        kind: "Property · พร็อพเพอร์ตี้",
        kindClass: "kind-property",
        explanation: "<strong>df.shape</strong> ตรวจสอบจำนวนแถวและคอลัมน์ของข้อมูลก่อนเริ่มต้นโปรเจกต์ เช่น <code>(20, 15)</code> <strong>ข้อควรระวัง:</strong> เป็น Property ไม่มีวงเล็บ <code>()</code>",
        rule: "print(df.shape)  # คืนค่า (20, 15) ไม่มี ()",
        tip: "💡 อย่าเขียน df.shape() เด็ดขาด เพราะ shape เป็นคุณสมบัติประจำตัว ไม่ใช่ฟังก์ชัน"
      },
      {
        key: "value_counts",
        label: ".value_counts()",
        badgeType: "method",
        lineNums: [6],
        title: ".value_counts() — นับความถี่ของข้อมูล",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.value_counts()</strong> ใช้นับว่าในคอลัมน์นั้นมีค่าที่ไม่ซ้ำกันกี่ค่า และแต่ละค่าปรากฏขึ้นมากี่ครั้ง เช่น ตำแหน่ง ST มี 6 คน, CB มี 4 คน ช่วยให้เรารู้ว่ากลุ่มตัวอย่างแต่ละกลุ่มมีมากพอที่จะนำไปวิเคราะห์เปรียบเทียบหรือไม่",
        rule: "df[\"position\"].value_counts()",
        tip: "💡 คืนค่าเป็น Series เรียงลำดับจากค่าที่พบมากที่สุดไปหาน้อยที่สุด"
      },
      {
        key: "isna_sum",
        label: ".isna().sum()",
        badgeType: "method",
        lineNums: [8],
        title: ".isna().sum() — ตรวจหาช่องว่างทุกคอลัมน์",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.isna().sum()</strong> ตรวจดูทุกคอลัมน์ว่ามีข้อมูลสูญหาย (NaN) กี่จุด ช่วยให้เราวางแผนได้ทันทีว่าก่อนคำนวณจะต้อง Clean คอลัมน์ใดบ้าง",
        rule: "df.isna().sum()  # คืนค่าจำนวน NaN แยกตามคอลัมน์",
        tip: "💡 ถ้าคอลัมน์ไหนเป็น 0 แปลว่าข้อมูลสมบูรณ์พร้อมใช้งาน"
      },
      {
        key: "describe",
        label: ".describe()",
        badgeType: "method",
        lineNums: [10],
        title: ".describe() — สรุปสถิติ 8 ค่าอย่างรวดเร็ว",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.describe()</strong> เป็นเมธอดสรุปตัวเลขสถิติพื้นฐาน 8 ค่า ได้แก่ จำนวนนับ (count), ค่าเฉลี่ย (mean), ส่วนเบี่ยงเบนมาตรฐาน (std), ค่าต่ำสุด (min), เปอร์เซ็นไทล์ที่ 25%, 50% (median), 75% และค่าสูงสุด (max)",
        rule: "df[[\"age\", \"overall\"]].describe()",
        tip: "💡 ช่วยตรวจหาตัวเลขที่ผิดปกติได้ทันที เช่น ถ้า min ของส่วนสูงเป็น 0 แปลว่ามีข้อมูลผิดพลาด"
      },
      {
        key: "info",
        label: "df.info() (Method)",
        badgeType: "method",
        lineNums: [12],
        title: "df.info() — ตรวจสอบชนิดข้อมูลและช่องว่าง",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>df.info()</strong> สรุปโครงสร้างของตาราง รายงานชนิดตัวแปรและจำนวนค่าที่ไม่ว่าง เพื่อวางแผนการจัดการข้อมูลก่อนนำไปใช้วิเคราะห์",
        rule: "df.info()",
        tip: "💡 ใช้เช็กความพร้อมของชุดข้อมูลก่อนเริ่มลงมือสรุปผล"
      }
    ]
  },

  // Week 10
  {
    filename: "week10_mini_project_pipeline.py",
    title: "Mini project: นำเสนอ",
    subtitle: "ใช้ def สร้างฟังก์ชัน, ทำ Method Chaining, สั่งพล็อต และเซฟรูปด้วย savefig()",
    lines: [
      { num: 1, textHtml: '<span class="tok-com"># 1. ประกาศฟังก์ชันวิเคราะห์ข้อมูลของตนเองด้วยคำสำคัญ def</span>', isComment: true },
      { num: 2, textHtml: '<span class="tok-kw">def</span> <span class="tok-fn">calculate_scout_report</span>(<span class="tok-var">data</span>):', badge: "DEF", badgeType: "syntax", key: "def" },
      { num: 3, textHtml: '<span class="tok-com"># 2. รวมคำสั่งแบบ Pipeline: จัดกลุ่ม -> หาค่าเฉลี่ย -> เรียงลำดับ</span>', isComment: true },
      { num: 4, textHtml: '    <span class="tok-var">report</span> <span class="tok-op">=</span> <span class="tok-var">data</span>.<span class="tok-fn">groupby</span>(<span class="tok-str">"position"</span>)[<span class="tok-str">"value_millions"</span>].<span class="tok-fn">mean</span>().<span class="tok-fn">sort_values</span>(<span class="tok-var">ascending</span><span class="tok-op">=</span><span class="tok-kw">False</span>)', badge: "PIPELINE", badgeType: "method", key: "pipeline" },
      { num: 5, textHtml: '<span class="tok-com"># 3. ส่งผลลัพธ์กลับออกไปด้วย return</span>', isComment: true },
      { num: 6, textHtml: '    <span class="tok-kw">return</span> <span class="tok-var">report</span>', badge: "RETURN", badgeType: "syntax", key: "def" },
      { num: 7, textHtml: '<span class="tok-com"># 4. เรียกใช้ฟังก์ชันและสร้างกราฟแท่งจากผลลัพธ์ด้วย .plot.bar()</span>', isComment: true },
      { num: 8, textHtml: '<span class="tok-var">result</span> <span class="tok-op">=</span> <span class="tok-fn">calculate_scout_report</span>(<span class="tok-var">df</span>)', badge: "CALL", badgeType: "syntax", key: "def" },
      { num: 9, textHtml: '<span class="tok-com"># 5. สั่งวาดกราฟแท่งจาก Series ของ Pandas โดยตรง</span>', isComment: true },
      { num: 10, textHtml: '<span class="tok-var">result</span>.<span class="tok-fn">plot</span>.<span class="tok-fn">bar</span>(<span class="tok-var">title</span><span class="tok-op">=</span><span class="tok-str">"Average Market Value by Position"</span>)', badge: "PLOT.BAR", badgeType: "method", key: "plot_bar" },
      { num: 11, textHtml: '<span class="tok-com"># 6. บันทึกกราฟลงในเครื่องเป็นไฟล์ภาพ PNG ด้วย plt.savefig()</span>', isComment: true },
      { num: 12, textHtml: '<span class="tok-var">plt</span>.<span class="tok-fn">savefig</span>(<span class="tok-str">"position_value_chart.png"</span>, <span class="tok-var">dpi</span><span class="tok-op">=</span><span class="tok-num">150</span>, <span class="tok-var">bbox_inches</span><span class="tok-op">=</span><span class="tok-str">"tight"</span>)', badge: "SAVEFIG", badgeType: "function", key: "savefig" }
    ],
    keywords: [
      {
        key: "def",
        label: "def / return",
        badgeType: "syntax",
        lineNums: [2, 6, 8],
        title: "def & return — สร้างและเรียกใช้ฟังก์ชัน",
        kind: "Syntax · ไวยากรณ์ Python",
        kindClass: "kind-syntax",
        explanation: "<strong>def คืออะไร?</strong> ใช้สำหรับสร้างฟังก์ชันหรือชุดคำสั่งของเราเอง เพื่อให้สามารถนำกลับมาเรียกใช้งานซ้ำๆ กับข้อมูลชุดใหม่ได้โดยไม่ต้องก็อปปี้โค้ดเดิม และใช้ <code>return</code> เพื่อส่งผลลัพธ์กลับออกมาเก็บในตัวแปร",
        rule: "def my_analysis(dataframe):\n    # ประมวลผล\n    return result\nresult = my_analysis(df)",
        tip: "⚠️ print() เพียงแค่พิมพ์ออกหน้าจอ แต่ return จะส่งค่ากลับมาให้เรานำไปวาดกราฟต่อได้"
      },
      {
        key: "pipeline",
        label: "Method Chaining (Pipeline)",
        badgeType: "method",
        lineNums: [4],
        title: "Method Chaining — ร้อยคำสั่งเป็นเส้นทางข้อมูล",
        kind: "Method · แนวคิดการเขียน",
        kindClass: "kind-method",
        explanation: "<strong>Method Chaining (Pipeline)</strong> คือการเชื่อมคำสั่งด้วยจุด <code>.</code> ต่อกันไปเรื่อยๆ: <code>groupby() -> .mean() -> .sort_values()</code> ทำให้อ่านเส้นทางการแปรรูปตารางได้อย่างต่อเนื่องเป็นลำดับขั้น ไม่ต้องตั้งชื่อตัวแปรพักให้รกความจำ",
        rule: "result = data.groupby(\"col\").mean().sort_values(ascending=False)",
        tip: "💡 ถ้าคำสั่งยาว สามารถครอบด้วยวงเล็บ ( ... ) แล้วเคาะขึ้นบรรทัดใหม่ให้อ่านง่าย"
      },
      {
        key: "plot_bar",
        label: ".plot.bar()",
        badgeType: "method",
        lineNums: [10],
        title: ".plot.bar() — วาดกราฟด่วนจาก Pandas",
        kind: "Method · เมธอด",
        kindClass: "kind-method",
        explanation: "<strong>.plot.bar()</strong> เป็นเครื่องมือสะดวกสบายของ Pandas ที่เชื่อมกับ Matplotlib ให้อัตโนมัติ โดยจะดึง Index (ชื่อตำแหน่ง) มาเป็นแกน X และตัวเลขค่าเฉลี่ยมาเป็นความสูงแท่งในคำสั่งเดียว",
        rule: "series.plot.bar(title=\"หัวข้อกราฟ\")",
        tip: "💡 รวดเร็วกว่า plt.bar() เมื่อข้อมูลของเราถูกสรุปอยู่ใน Series หรือ DataFrame อยู่แล้ว"
      },
      {
        key: "savefig",
        label: "plt.savefig()",
        badgeType: "function",
        lineNums: [12],
        title: "plt.savefig() — บันทึกรูปภาพกราฟลงเครื่อง",
        kind: "Function · ฟังก์ชัน",
        kindClass: "kind-function",
        explanation: "<strong>plt.savefig()</strong> ใช้บันทึกภาพกราฟที่วาดเสร็จแล้วลงเป็นไฟล์ PNG หรือ JPG ในเครื่องคอมพิวเตอร์ เพื่อนำไปแนบในสไลด์นำเสนอ หรือส่งรายงานสรุปให้หัวหน้างาน",
        rule: "plt.savefig(\"chart.png\", dpi=150, bbox_inches=\"tight\")",
        tip: "💡 ใส่ bbox_inches=\"tight\" เพื่อตัดขอบขาวส่วนเกินและไม่ให้ป้ายชื่อแกนถูกตัดตกขอบ"
      }
    ]
  }
];

// Expanded Dictionary Catalog with Clear 0-to-100 Explanations
const apiCatalog = {
  series: {
    kind: "concept",
    name: "Series (ซีรีส์)",
    meaning: "ข้อมูล 1 มิติ (1 คอลัมน์เดี่ยว) ใน Pandas พร้อมเลขแถว (Index) เปรียบเหมือนดึง 1 เสาออกมาจากตาราง Excel",
    usage: "series = df[\"age\"]  # วงเล็บชั้นเดียว",
    returns: "Series: ข้อมูล 1 คอลัมน์เดี่ยว",
    example: "ages = df[\"age\"]\nprint(ages.head(3))",
    warning: "คำว่า and ปกติของ Python ไม่สามารถใช้สรุป Series ได้ ต้องใช้ & แทน"
  },
  dataframe: {
    kind: "concept",
    name: "DataFrame (ดาต้าเฟรม)",
    meaning: "ตารางข้อมูล 2 มิติ (มีทั้งแถวและคอลัมน์) คล้ายสมุดตาราง Excel ทั้งแผ่น",
    usage: "df = pd.read_csv(\"file.csv\") หรือ df[[\"col1\", \"col2\"]]",
    returns: "DataFrame: ตารางที่มีแถว คอลัมน์ และคำสั่งวิเคราะห์",
    example: "summary = df[[\"name\", \"overall\"]]",
    warning: "หากต้องการส่งหลาย feature ให้ scikit-learn ต้องเป็น DataFrame 2 มิติเสมอ"
  },
  booleanMask: {
    kind: "concept",
    name: "Boolean Mask (กระดาษฉลุ)",
    meaning: "Series ที่เก็บค่า True หรือ False รายคน เมื่อนำไปครอบตาราง จะคัดกรองเหลือเฉพาะแถวที่เป็น True",
    usage: "mask = df[\"age\"] <= 25\nresult = df[mask]",
    returns: "DataFrame ที่เหลือเฉพาะแถวที่ผ่านเกณฑ์",
    example: "young = df[\"age\"] <= 25\ndf[young]",
    warning: "เมื่อมีหลายเงื่อนไข ต้องครอบแต่ละเงื่อนไขด้วยวงเล็บ และเชื่อมด้วย & หรือ |"
  },
  import: { kind: "syntax", name: "import ... as ...", meaning: "คำสั่งนำ module หรือ library ภายนอกเข้ามาใช้งานในไฟล์ เช่น Pandas, Matplotlib", usage: "import pandas as pd", returns: "ทำให้เรียกใช้คำสั่งผ่านตัวย่อ เช่น pd.read_csv() ได้", example: "import pandas as pd\nimport matplotlib.pyplot as plt", warning: "ถ้ายังไม่ได้ติดตั้ง library ในเครื่องจะพบ ModuleNotFoundError" },
  open: { kind: "function", name: "open()", meaning: "ฟังก์ชันมาตรฐานของ Python สำหรับเปิดไฟล์จากฮาร์ดดิสก์", usage: "with open(\"data.csv\") as file:", returns: "file object สำหรับอ่านหรือเขียนข้อมูล", example: "with open(\"../data/footballers.csv\") as f:\n    text = f.read()", warning: "ควรใช้คู่กับคำสั่ง with เสมอ เพื่อให้ Python ปิดไฟล์ให้อัตโนมัติ" },
  dictReader: { kind: "function", name: "csv.DictReader()", meaning: "อ่านไฟล์ CSV แล้วแปลงแต่ละแถวให้เป็น dictionary โดยใช้หัวตารางเป็น key", usage: "csv.DictReader(file_object)", returns: "ตัวอ่านแถวที่สามารถวนลูป for ได้ทีละคน", example: "rows = list(csv.DictReader(f))", warning: "ข้อมูลทั้งหมดจาก CSV จะเริ่มต้นเป็นข้อความ (string) ต้องแปลง float/int ก่อนคำนวณ" },
  readCsv: { kind: "function", name: "pd.read_csv()", meaning: "ฟังก์ชันของ Pandas สำหรับเปิดไฟล์ CSV แล้วแปลงเป็น DataFrame ตารางพร้อมใช้ทันที", usage: "pd.read_csv(\"path/to/file.csv\")", returns: "DataFrame: ตารางข้อมูลในหน่วยความจำ", example: "df = pd.read_csv(\"../data/footballers.csv\")", warning: "ตำแหน่ง path อ้างอิงจากโฟลเดอร์ที่รัน Notebook หากอยู่ในโฟลเดอร์ย่อยให้ใช้ ../" },
  head: { kind: "method", name: "df.head(n)", meaning: "Method ดูตัวอย่าง n แถวแรกของตาราง (ค่าเริ่มต้น 5 แถว)", usage: "df.head(3)", returns: "DataFrame ใหม่ที่มี n แถวแรก", example: "df.head(3)", warning: "ใช้เพื่อตรวจดูหน้าตาข้อมูลเท่านั้น อย่าสรุปจำนวนแถวทั้งหมดจาก head" },
  shape: { kind: "property", name: "df.shape", meaning: "Property แสดงขนาดของตาราง: (จำนวนแถว, จำนวนคอลัมน์) — ไม่มีวงเล็บ ()", usage: "df.shape", returns: "tuple เช่น (20, 15)", example: "rows, cols = df.shape", warning: "อย่าเขียน df.shape() เพราะ shape เป็นคุณสมบัติประจำตัว ไม่ใช่ฟังก์ชัน" },
  columns: { kind: "property", name: "df.columns", meaning: "Property เก็บรายชื่อหัวคอลัมน์ทั้งหมดในตาราง — ไม่มีวงเล็บ ()", usage: "df.columns", returns: "Index ของชื่อคอลัมน์ เช่น ['name', 'age', 'overall']", example: "print(df.columns)", warning: "ชื่อคอลัมน์แยกตัวพิมพ์เล็ก-ใหญ่; overall และ Overall ถือเป็นคนละคอลัมน์" },
  info: { kind: "method", name: "df.info()", meaning: "Method แสดงสรุปโครงสร้าง ชนิดข้อมูล และตรวจหาจำนวนแถวที่มีข้อมูลหาย (non-null)", usage: "df.info()", returns: "พิมพ์สรุปโครงสร้างออกหน้าจอ", example: "df.info()", warning: "ถ้า non-null count น้อยกว่าจำนวนแถวทั้งหมด แสดงว่าคอลัมน์นั้นมีค่าสูญหาย" },
  bracket: { kind: "syntax", name: "df[...] vs df[[...]]", meaning: "วงเล็บ 1 ชั้นเลือก 1 คอลัมน์ได้ Series (1 มิติ); วงเล็บ 2 ชั้นเลือกหลายคอลัมน์ได้ DataFrame (2 มิติ)", usage: "df[\"age\"] หรือ df[[\"name\", \"age\"]]", returns: "วงเล็บเดี่ยวได้ Series; วงเล็บคู่ได้ DataFrame", example: "age_series = df[\"age\"]\nmini_table = df[[\"name\", \"age\"]]", warning: "ถ้าจะส่งข้อมูล Feature ให้กับ Machine Learning ต้องใช้วงเล็บ 2 ชั้นเสมอ" },
  rename: { kind: "method", name: ".rename()", meaning: "Method สำหรับเปลี่ยนชื่อคอลัมน์ให้อ่านง่ายขึ้น", usage: "df.rename(columns={\"ชื่อเดิม\": \"ชื่อใหม่\"})", returns: "DataFrame ใหม่ที่เปลี่ยนชื่อแล้ว", example: "summary = df.rename(columns={\"overall\": \"rating\"})", warning: "ต้องนำตัวแปรมารับค่ากลับ มิฉะนั้นชื่อเดิมในตารางจะยังคงอยู่" },
  copy: { kind: "method", name: ".copy()", meaning: "สร้างสำเนาตารางใหม่ออกมาเป็นอิสระ ป้องกันการเผลอแก้ไขทับตารางต้นทาง", usage: "clean_df = df.copy()", returns: "DataFrame สำเนาใหม่", example: "clean_df = df.copy()", warning: "แนะนำให้ใช้เสมอก่อนเริ่มกระบวนการ Clean ข้อมูล" },
  isna: { kind: "method", name: ".isna()", meaning: "ตรวจดูทีละช่องว่ามีค่าว่าง (NaN) หรือไม่ ได้ผลเป็น True/False", usage: "df[\"height_cm\"].isna()", returns: "Series ของ True (ถ้าช่องว่าง) และ False (ถ้ามีข้อมูล)", example: "df[\"height_cm\"].isna()", warning: "isna() ยังไม่ได้นับตัวเลข ต้องสั่งตามด้วย .sum() เพื่อรวมจำนวน" },
  sum: { kind: "method", name: ".sum()", meaning: "หาผลรวมของตัวเลขใน Series (สำหรับ True/False ค่า True มีค่าเท่ากับ 1)", usage: "series.sum()", returns: "ผลรวมตัวเลข", example: "missing_count = df[\"height_cm\"].isna().sum()", warning: "ถ้าใช้กับ Series ตัวเลขปกติ จะหมายถึงผลรวมคะแนน ไม่ใช่จำนวนแถว" },
  median: { kind: "method", name: ".median()", meaning: "คำนวณค่ามัธยฐาน (ค่ากึ่งกลางของคนที่เรียงลำดับ) ทนทานต่อค่าผิดปกติสุดโต่ง", usage: "df[\"height_cm\"].median()", returns: "ตัวเลขค่ากลาง 1 ค่า", example: "middle = df[\"height_cm\"].median()", warning: "ทนทานกว่าค่าเฉลี่ย (mean) มากเมื่อข้อมูลมีคนสูงหรือต่ำผิดปกติ" },
  fillna: { kind: "method", name: ".fillna()", meaning: "แทนที่เฉพาะช่องที่เป็นค่าว่าง (NaN) ด้วยค่าที่เรากำหนด", usage: "series.fillna(value)", returns: "Series หรือ DataFrame ใหม่ที่ไม่มีช่องว่าง", example: "df[\"height_cm\"].fillna(middle)", warning: "อย่าใส่ 0 แทนค่าว่างอัตโนมัติหากเลข 0 ไม่มีความหมายจริงในข้อมูล" },
  assign: { kind: "method", name: ".assign()", meaning: "สร้าง DataFrame ใหม่พร้อมเพิ่มหรือแทนที่คอลัมน์ที่ระบุอย่างปลอดภัย", usage: "df.assign(height_cm=new_values)", returns: "DataFrame ใหม่", example: "clean_df = df.assign(height_cm=filled_series)", warning: "ทางซ้ายของเครื่องหมาย = ใน assign คือชื่อคอลัมน์ ไม่ใช่ตัวแปรทั่วไป" },
  ampersand: { kind: "syntax", name: "& (และระดับแถว)", meaning: "ตัวดำเนินการเชื่อมเงื่อนไขแบบ และ สำหรับ Series ของ Pandas โดยจะตรวจทีละแถว", usage: "(เงื่อนไข 1) & (เงื่อนไข 2)", returns: "Series ของ True/False", example: "(df[\"age\"] <= 25) & (df[\"overall\"] >= 85)", warning: "ต้องใส่วงเล็บรอบแต่ละเงื่อนไขเสมอ และห้ามใช้ and กับ Series" },
  query: { kind: "method", name: ".query()", meaning: "กรอง DataFrame ด้วยข้อความเงื่อนไขที่อ่านง่ายเหมือนประโยคภาษาอังกฤษ", usage: "df.query(\"age <= 25 and overall >= 85\")", returns: "DataFrame ที่เหลือเฉพาะแถวที่ผ่านเงื่อนไข", example: "stars = df.query(\"age <= 25 and overall >= 85\")", warning: "ชื่อคอลัมน์ที่มีช่องว่างต้องครอบด้วยเครื่องหมาย backtick `" },
  isin: { kind: "method", name: ".isin()", meaning: "ตรวจสอบว่าค่าในคอลัมน์ตรงกับค่าใดค่าหนึ่งในลิสต์หรือไม่", usage: "series.isin([\"ค่า1\", \"ค่า2\"])", returns: "Series ของ True/False สำหรับนำไปใช้กรอง", example: "df[df[\"league\"].isin([\"La Liga\", \"MLS\"])]", warning: "เหมาะสำหรับเลือกหลายหมวดหมู่พร้อมกันโดยไม่ต้องเขียนเชื่อมด้วย | หลายครั้ง" },
  groupby: { kind: "method", name: ".groupby()", meaning: "แยกข้อมูลในตารางออกเป็นกลุ่มๆ ตามคอลัมน์ที่ระบุ (เหมือนแยกแฟ้มเอกสาร)", usage: "df.groupby(\"league\")[\"overall\"]", returns: "GroupBy object ที่ต้องตามด้วยการคำนวณ เช่น .mean(), .count()", example: "df.groupby(\"league\")[\"overall\"].mean()", warning: "groupby อย่างเดียวไม่ใช่ตารางผลลัพธ์ ต้องสั่งคำนวณต่อท้ายเสมอ" },
  mean: { kind: "method", name: ".mean()", meaning: "หาค่าเฉลี่ยของตัวเลขในแต่ละกลุ่ม หรือใน Series", usage: "series.mean() หรือ grouped.mean()", returns: "ตัวเลข 1 ค่า หรือ Series สรุปค่าเฉลี่ยต่อกลุ่ม", example: "league_mean = df.groupby(\"league\")[\"overall\"].mean()", warning: "ค่าเฉลี่ยไม่บอกความกระจายของข้อมูล ควรตรวจดูจำนวนคน (count) ควบคู่ด้วย" },
  agg: { kind: "method", name: ".agg()", meaning: "สรุปค่าสถิติหลายๆ ตัวพร้อมกันในคำสั่งเดียว เช่น นับคน, หาค่าเฉลี่ย, หาค่ากลาง", usage: "grouped.agg([\"count\", \"mean\", \"median\"])", returns: "DataFrame สรุปค่าสถิติที่มีหลายคอลัมน์", example: "df.groupby(\"league\")[\"overall\"].agg([\"count\", \"mean\"])", warning: "ช่วยให้เห็นภาพรวมของข้อมูลหลายมิติโดยไม่ต้องรันโค้ดหลายรอบ" },
  sortValues: { kind: "method", name: ".sort_values()", meaning: "เรียงลำดับข้อมูลตามค่าตัวเลขจากน้อยไปมาก หรือมากไปน้อย", usage: "series.sort_values(ascending=False)", returns: "Series หรือ DataFrame ใหม่ที่เรียงลำดับแล้ว", example: "league_mean.sort_values(ascending=False)", warning: "ค่าเริ่มต้น ascending=True คือเรียงน้อยไปมาก ถ้าต้องการมากสุดขึ้นก่อนให้ใส่ False" },
  nlargest: { kind: "method", name: ".nlargest()", meaning: "ดึง n แถวแรกที่มีค่าตัวเลขสูงที่สุดในคอลัมน์นั้น", usage: "df.nlargest(5, \"overall\")", returns: "DataFrame จำนวน n แถวที่เรียงจากมากไปน้อย", example: "top5 = df.nlargest(5, \"overall\")", warning: "สะดวกและสั้นกว่าการสั่ง sort_values แล้วค่อยดึง head" },
  index: { kind: "property", name: ".index", meaning: "Property เก็บรายชื่อป้ายกำกับแถวใน Series หรือ DataFrame — ไม่มีวงเล็บ ()", usage: "series.index", returns: "Index เช่น รายชื่อลีกหลังจากการ groupby", example: "plt.bar(league_mean.index, league_mean.values)", warning: "index เป็นคุณสมบัติประจำตัว ไม่ต้องใส่วงเล็บ ()" },
  values: { kind: "property", name: ".values", meaning: "Property ดึงตัวเลขข้อมูลด้านในออกมาเป็น NumPy Array", usage: "series.values", returns: "array ของตัวเลขหรือข้อความ", example: "league_mean.values", warning: "เหมาะสำหรับส่งต่อให้ library อื่นที่ต้องการ Array โดยตรง" },
  pltBar: { kind: "function", name: "plt.bar()", meaning: "ฟังก์ชันของ Matplotlib สำหรับวาดกราฟแท่งเปรียบเทียบ", usage: "plt.bar(x_values, y_values)", returns: "กราฟแท่งในแกนแสดงผล", example: "plt.bar(top5[\"name\"], top5[\"overall\"])", warning: "ข้อมูลแกน X และแกน Y ต้องมาจากตารางเดียวกันและมีความยาวเท่ากัน" },
  ylabel: { kind: "function", name: "plt.ylabel()", meaning: "ฟังก์ชันใส่ชื่อและหน่วยให้กับแกนแนวตั้ง (แกน Y) ของกราฟ", usage: "plt.ylabel(\"ชื่อแกน\")", returns: "กำหนดข้อความแกน Y", example: "plt.ylabel(\"Overall Rating\")", warning: "กราฟที่ไม่มีชื่อแกนจะทำให้ผู้อื่นไม่เข้าใจความหมายของความสูงแท่ง" },
  show: { kind: "function", name: "plt.show()", meaning: "ฟังก์ชันสั่งให้ Matplotlib วาดและแสดงผลกราฟออกหน้าจอ", usage: "plt.show()", returns: "แสดงผลรูปภาพ", example: "plt.show()", warning: "วางไว้บรรทัดสุดท้ายหลังตั้งชื่อแกนและหมุนป้ายชื่อเรียบร้อยแล้ว" },
  resetIndex: { kind: "method", name: ".reset_index()", meaning: "ย้ายป้ายชื่อแถวที่เป็น Index กลับมาเป็นคอลัมน์ปกติในตาราง", usage: "series.reset_index(name=\"ชื่อใหม่\")", returns: "DataFrame ใหม่ที่นำไปใช้งานต่อง่ายขึ้น", example: "result = league_mean.reset_index(name=\"average_overall\")", warning: "เหมาะมากสำหรับการนำผลลัพธ์จากการ groupby ไปสร้างประโยคเล่าเรื่อง" },
  iloc: { kind: "property", name: ".iloc[n]", meaning: "Indexer เลือกแถวตามลำดับตัวเลขตำแหน่ง เริ่มต้นนับจาก 0", usage: "df.iloc[0]", returns: "ข้อมูลแถวที่เลือก (แถวที่ 0 คือแถวบนสุด)", example: "best = result.iloc[0]", warning: "iloc[0] คือแถวแรกหลังเรียงลำดับ เหมาะสำหรับดึงอันดับ 1 ของรายงาน" },
  fstring: { kind: "syntax", name: "f-string", meaning: "รูปแบบข้อความของ Python ที่ช่วยแทรกตัวแปรลงในข้อความได้ใน { }", usage: "f\"ข้อความ {variable:.1f}\"", returns: "string ข้อความสมบูรณ์", example: "f\"ลีก {best['league']} มีคะแนน {best['average_overall']:.1f}\"", warning: "ส่วน :.1f หมายถึงปัดเศษทศนิยมเหลือ 1 ตำแหน่ง" },
  trainSplit: { kind: "function", name: "train_test_split()", meaning: "ฟังก์ชันของ scikit-learn สำหรับแบ่งข้อมูลเป็นชุดฝึก (Train) และชุดทดสอบ (Test)", usage: "train_test_split(X, y, test_size=0.2)", returns: "X_train, X_test, y_train, y_test", example: "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)", warning: "ต้องแบ่ง X และ y พร้อมกันเพื่อรักษาคู่แถวและคำตอบให้ตรงกัน" },
  fit: { kind: "method", name: ".fit()", meaning: "Method สั่งให้โมเดล Machine Learning เริ่มต้นเรียนรู้ความสัมพันธ์จากชุดฝึก", usage: "model.fit(X_train, y_train)", returns: "โมเดลที่ผ่านการเรียนรู้แล้ว", example: "model = LinearRegression().fit(X_train, y_train)", warning: "ห้ามนำ X_test หรือ y_test ไปใส่ในตอน fit เด็ดขาด" },
  predict: { kind: "method", name: ".predict()", meaning: "Method สั่งให้โมเดลทำนายคำตอบจากข้อมูลนักเตะชุดใหม่", usage: "model.predict(X_test)", returns: "Array ของคำตอบที่โมเดลทำนายได้", example: "y_pred = model.predict(X_test)", warning: "จำนวนคอลัมน์ของข้อมูลใหม่ต้องตรงกับตอนที่โมเดลเรียนรู้มา" },
  mae: { kind: "function", name: "mean_absolute_error()", meaning: "ฟังก์ชันคำนวณความคลาดเคลื่อนเฉลี่ยแบบค่าสัมบูรณ์ (MAE)", usage: "mean_absolute_error(y_true, y_pred)", returns: "ตัวเลขความผิดพลาดเฉลี่ย (ยิ่งน้อยยิ่งดี)", example: "error = mean_absolute_error(y_test, y_pred)", warning: "เปรียบเทียบความผิดพลาดของโมเดลกับ Baseline เสมอเพื่อดูว่าฉลาดขึ้นจริงไหม" },
  valueCounts: { kind: "method", name: ".value_counts()", meaning: "Method นับความถี่ของค่าที่ไม่ซ้ำกันในคอลัมน์นั้น เช่น นับจำนวนคนต่อตำแหน่ง", usage: "df[\"position\"].value_counts()", returns: "Series ที่เก็บจำนวนนับเรียงจากมากไปน้อย", example: "df[\"position\"].value_counts()", warning: "ค่าว่าง NaN จะไม่ถูกนับเป็นค่าเริ่มต้น" },
  describe: { kind: "method", name: ".describe()", meaning: "Method สรุปสถิติเบื้องต้น 8 ค่า (count, mean, std, min, 25%, 50%, 75%, max)", usage: "df.describe()", returns: "DataFrame สรุปค่าสถิติ", example: "df[[\"age\", \"overall\"]].describe()", warning: "ช่วยให้เห็นภาพรวมของตัวเลขได้อย่างรวดเร็วในคำสั่งเดียว" },
  def: { kind: "syntax", name: "def", meaning: "คำสำคัญสำหรับประกาศสร้างฟังก์ชันของตนเองเพื่อนำกลับมาใช้ซ้ำ", usage: "def ชื่อ_ฟังก์ชัน(parameter):", returns: "ฟังก์ชันที่พร้อมเรียกใช้งานซ้ำ", example: "def get_top_players(df, n=5):\n    return df.nlargest(n, \"overall\")", warning: "บรรทัดเนื้อหาด้านในฟังก์ชันต้องมีการเคาะเยื้อง (Indent) เสมอ" },
  return: { kind: "syntax", name: "return", meaning: "คำสั่งส่งค่าผลลัพธ์จากในฟังก์ชันกลับออกมาให้ตัวแปรภายนอก", usage: "return value", returns: "ส่งค่าที่ระบุและสิ้นสุดการทำงานของฟังก์ชันตรงนั้น", example: "return result.sort_values(ascending=False)", warning: "print เพียงแสดงบนหน้าจอ แต่ return ทำให้เอาผลลัพธ์ไปคำนวณหรือพล็อตกราฟต่อได้" },
  plot: { kind: "property", name: ".plot", meaning: "Accessor ของ Pandas สำหรับเปิดประตูสู่การสร้างกราฟด่วนจากตาราง", usage: "series.plot.bar()", returns: "PlotAccessor สำหรับเลือกชนิดกราฟ", example: "result.plot.bar()", warning: "ต้องตามด้วยชนิดกราฟ เช่น .bar(), .line(), .hist()" },
  plotBar: { kind: "method", name: ".plot.bar()", meaning: "Method สร้างกราฟแท่งจาก Pandas โดยตรง เชื่อมกับ Matplotlib ให้อัตโนมัติ", usage: "series.plot.bar(title=\"หัวข้อ\")", returns: "แกนกราฟของ Matplotlib", example: "result.plot.bar(title=\"Market Value\")", warning: "สะดวก รวดเร็ว และไม่ต้องแยกดึง index และ values ด้วยตนเอง" },
  savefig: { kind: "function", name: "plt.savefig()", meaning: "ฟังก์ชันบันทึกภาพกราฟที่สร้างขึ้นลงในฮาร์ดดิสก์เป็นไฟล์ PNG หรือ JPG", usage: "plt.savefig(\"chart.png\", dpi=150, bbox_inches=\"tight\")", returns: "ไฟล์ภาพในเครื่อง", example: "plt.savefig(\"report.png\", dpi=150)", warning: "ควรเรียกใช้ก่อนสั่ง plt.show() หรือก่อนปิดหน้าต่างกราฟ" }
};

const guideByWeek = [
  ["import", "readCsv", "dataframe", "shape", "columns", "head", "info"],
  ["bracket", "series", "dataframe", "rename", "copy", "columns"],
  ["isna", "sum", "median", "fillna", "assign"],
  ["series", "ampersand", "booleanMask", "query", "isin", "bracket"],
  ["groupby", "mean", "agg", "sortValues"],
  ["nlargest", "pltBar", "ylabel", "show", "index", "values"],
  ["resetIndex", "iloc", "fstring", "sortValues"],
  ["bracket", "dataframe", "series", "trainSplit", "fit", "predict", "mae"],
  ["columns", "valueCounts", "describe", "info", "groupby"],
  ["def", "return", "pipeline", "plotBar", "savefig"]
];

const weekIndex = Number(document.body.dataset.week) - 1;
const weekInspector = codeInspectorData[weekIndex];

// Helper to escape HTML safely
const esc = str => String(str).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" })[c]);

if (weekInspector) {
  // 1. Build and Inject Interactive Code Inspector (Matching Image 0 & Image 1)
  const inspectorSection = document.createElement("section");
  inspectorSection.className = "section code-inspector-section";
  inspectorSection.id = "code-inspector";

  const defaultKeyword = weekInspector.keywords[0];

  inspectorSection.innerHTML = `
    <div class="code-inspector-header">
      <p class="section-label">INTERACTIVE CODE INSPECTOR</p>
      <h2>เจาะลึกโค้ดทีละบรรทัด (Line-by-Line Code Inspector)</h2>
      <p style="color:#64748b;font-size:.9rem;margin-top:4px;">${weekInspector.subtitle}</p>
    </div>

    <div class="code-inspector-container">
      <!-- Editor Window (Image 0) -->
      <div class="code-window" aria-label="Editor Code Window">
        <div class="code-window-bar">
          <div class="code-window-dots">
            <span class="code-dot dot-red"></span>
            <span class="code-dot dot-yellow"></span>
            <span class="code-dot dot-green"></span>
          </div>
          <span class="code-window-title">${weekInspector.filename}</span>
        </div>
        <div class="code-window-body">
          ${weekInspector.lines.map(line => `
            <div class="code-line ${line.isComment ? 'is-comment' : ''}" data-line="${line.num}" data-key="${line.key || ''}">
              <span class="code-line-num">${line.num}</span>
              <span class="code-line-text">${line.textHtml}</span>
              ${line.badge ? `<span class="code-line-badge badge-${line.badgeType || 'method'}">${line.badge}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Explanation Card (Image 1) -->
      <div class="code-explanation-card" id="code-explanation-box">
        <div class="explanation-header">
          <span class="explanation-active-tag" id="exp-active-tag">${defaultKeyword.label}</span>
          <span class="explanation-kind-badge ${defaultKeyword.kindClass}" id="exp-kind-badge">${defaultKeyword.kind}</span>
        </div>
        <div class="explanation-text" id="exp-text">
          ${defaultKeyword.explanation}
        </div>
        ${defaultKeyword.rule ? `
          <div class="explanation-rule-box" id="exp-rule-box">
            <b>รูปแบบการเขียน (Syntax / Usage):</b>
            <div id="exp-rule-code">${esc(defaultKeyword.rule)}</div>
          </div>
        ` : ''}
        <div class="explanation-hint">
          <span>💡 เลื่อนเมาส์ไปวางบนบรรทัดในโค้ดฝั่งบน หรือกดคีย์เวิร์ดด้านล่างเพื่อสลับคำอธิบาย</span>
        </div>
        <div class="keyword-pills-bar" aria-label="Keyword Selection Pills">
          ${weekInspector.keywords.map((kw, i) => `
            <button type="button" class="keyword-pill ${i === 0 ? 'active' : ''}" data-key="${kw.key}">${kw.label}</button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Insert before #functions or after #goals / #recap
  const functionsSection = document.querySelector("#functions");
  if (functionsSection) {
    functionsSection.insertAdjacentElement("beforebegin", inspectorSection);
  } else {
    document.querySelector("#book").appendChild(inspectorSection);
  }

  // Interactivity Logic
  const activeTagEl = inspectorSection.querySelector("#exp-active-tag");
  const kindBadgeEl = inspectorSection.querySelector("#exp-kind-badge");
  const textEl = inspectorSection.querySelector("#exp-text");
  const ruleBoxEl = inspectorSection.querySelector("#exp-rule-box");
  const ruleCodeEl = inspectorSection.querySelector("#exp-rule-code");
  const pills = inspectorSection.querySelectorAll(".keyword-pill");
  const codeLines = inspectorSection.querySelectorAll(".code-line");

  function setActiveConcept(kwKey, sourceLineNum = null) {
    let kw = weekInspector.keywords.find(k => k.key === kwKey);
    
    // If not found in keywords, check if it's a line with direct info
    if (!kw && sourceLineNum) {
      const line = weekInspector.lines.find(l => l.num === sourceLineNum);
      if (line && line.key) {
        kw = weekInspector.keywords.find(k => k.key === line.key);
      }
    }
    if (!kw) return;

    // Update Card UI
    activeTagEl.textContent = kw.label;
    kindBadgeEl.textContent = kw.kind;
    kindBadgeEl.className = `explanation-kind-badge ${kw.kindClass}`;
    textEl.innerHTML = kw.explanation;

    if (ruleBoxEl && ruleCodeEl) {
      if (kw.rule) {
        ruleBoxEl.style.display = "block";
        ruleCodeEl.textContent = kw.rule;
      } else {
        ruleBoxEl.style.display = "none";
      }
    }

    // Update Pills
    pills.forEach(p => p.classList.toggle("active", p.dataset.key === kw.key));

    // Highlight Code Lines
    codeLines.forEach(l => {
      const lineNum = Number(l.dataset.line);
      const isTarget = kw.lineNums && kw.lineNums.includes(lineNum);
      l.classList.toggle("active", Boolean(isTarget));
    });
  }

  // Pill click handlers
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      setActiveConcept(pill.dataset.key);
    });
  });

  // Line hover / click handlers
  codeLines.forEach(line => {
    line.addEventListener("mouseenter", () => {
      const lineKey = line.dataset.key;
      const lineNum = Number(line.dataset.line);
      if (lineKey) {
        setActiveConcept(lineKey, lineNum);
      }
    });
    line.addEventListener("click", () => {
      const lineKey = line.dataset.key;
      const lineNum = Number(line.dataset.line);
      if (lineKey) {
        setActiveConcept(lineKey, lineNum);
      }
    });
  });

  // Initial highlight on default keyword lines
  if (defaultKeyword.lineNums) {
    codeLines.forEach(l => {
      if (defaultKeyword.lineNums.includes(Number(l.dataset.line))) {
        l.classList.add("active");
      }
    });
  }

  // Add Table of Contents Link
  const toc = document.querySelector(".book-toc");
  if (toc) {
    const goalsLink = toc.querySelector("a[href='#functions']");
    const inspLink = document.createElement("a");
    inspLink.href = "#code-inspector";
    inspLink.textContent = "เจาะลึกโค้ด (มีเลขบรรทัด)";
    if (goalsLink) {
      toc.insertBefore(inspLink, goalsLink);
    } else {
      toc.appendChild(inspLink);
    }
  }
}

// 2. Render Reference Cards (Dictionary of Functions / Methods / Properties)
const targetSection = document.querySelector("#code-inspector") || document.querySelector("#functions");
const guide = document.createElement("section");
guide.className = "section";
guide.id = "api-guide";
guide.innerHTML = `
  <p class="section-label">READ THE CODE, NOT JUST COPY IT</p>
  <h2>พจนานุกรมคำสั่งฉบับเข้าใจง่าย (0 ถึง 100)</h2>
  <p class="api-intro">
    <b>หลักการแยกแยะ 3 คำสำคัญ:</b><br>
    • <b>Property (คุณสมบัติ):</b> สเปกที่ตารางมีอยู่แล้ว <b>ไม่ต้องมีวงเล็บ ()</b> เช่น <code>df.shape</code>, <code>df.columns</code><br>
    • <b>Method (เมธอด):</b> คำสั่งที่ติดอยู่กับตาราง เรียกผ่านจุดและ<b>ต้องมีวงเล็บ ()</b> เช่น <code>df.head()</code>, <code>df.info()</code><br>
    • <b>Function (ฟังก์ชัน):</b> คำสั่งลอยตัว เรียกชื่อตรงๆ และมีวงเล็บ () เช่น <code>pd.read_csv()</code>, <code>plt.bar()</code><br>
    • <b>Syntax (ไวยากรณ์):</b> กฎของภาษา เช่น <code>import</code>, วงเล็บ <code>[[]]</code>, หรือเครื่องหมาย <code>&</code>
  </p>
  <div class="api-list">
    ${(guideByWeek[weekIndex] || []).map(key => {
      const item = apiCatalog[key];
      if (!item) return '';
      return `
        <article class="api-card">
          <div class="api-top">
            <code>${esc(item.name)}</code>
            <span class="api-kind ${item.kind}">${item.kind}</span>
          </div>
          <p>${item.meaning}</p>
          <div class="api-details">
            <div class="api-detail">
              <b>เขียนอย่างไร</b>
              <code>${esc(item.usage)}</code>
            </div>
            <div class="api-detail">
              <b>ได้อะไรกลับมา</b>
              ${item.returns}
            </div>
            <div class="api-detail warning">
              <b>ระวัง</b>
              ${item.warning}
            </div>
            <pre class="api-example"><code>${esc(item.example)}</code></pre>
          </div>
        </article>
      `;
    }).join("")}
  </div>
`;

if (targetSection) {
  targetSection.insertAdjacentElement("afterend", guide);
}

const toc = document.querySelector(".book-toc");
if (toc && !toc.querySelector("a[href='#api-guide']")) {
  toc.insertAdjacentHTML("beforeend", '<a href="#api-guide">พจนานุกรมคำสั่ง</a>');
}
