---
name: interactive-viz-diagram
description: วาด Visualize Interactive Diagram สำหรับอธิบายระบบ/โค้ด ด้วย SVG + HTML Overlay + Tailwind/CSS + Animation — ใช้เมื่อต้องสร้าง pipeline diagram, workflow anatomy, code-explainer หรือแผนภาพแบบคลิกได้พร้อม code snippet
---

# Skill: Interactive Visualize Diagram

ทักษะการวาด **แผนภาพแบบอินเทอร์แอกทีฟ** สำหรับอธิบายการทำงานของระบบพร้อมตัวอย่างโค้ด
ถอดมาจากเว็บ CI/CD × GitHub Visual Explainer (React + Vite + Tailwind + Framer Motion / Modern Web Components)

## 1. ใช้ Skill นี้เมื่อไหร่

- ต้องอธิบาย **flow ของระบบ** (pipeline, workflow, data flow, สถาปัตยกรรม) ด้วยภาพ
- ต้องการให้ **คลิก/hover ที่ diagram แล้วเห็นคำอธิบาย + โค้ดจริง** ของจุดนั้น
- ต้องการ **code ↔ diagram sync กัน** (hover โค้ดแล้ว diagram สว่าง และกลับกัน)
- ต้องการตัวอย่างโค้ดพร้อม **syntax highlight + คำอธิบายจุดสำคัญ**

## 2. หลักการสำคัญ 5 ข้อ

1. **Data-driven diagram** — นิยาม stages/connectors เป็น array/object อย่า hardcode JSX ทีละกล่อง
2. **SVG วาดเส้น, HTML วาดกล่อง** — เส้นเชื่อม/ลูกศร/animation ใช้ SVG ส่วน node ที่ต้องคลิก/มีข้อความใช้ HTML overlay (อ่านง่าย + responsive + accessible)
3. **One source of position** — กำหนดพิกัดครั้งเดียวในหน่วย viewBox แล้วแปลงเป็น `%` สำหรับ HTML overlay
4. **สี = ความหมาย** — แต่ละ phase มีสีประจำ ใช้สีเดียวกันทั้งเส้น กล่อง chip และ info panel
5. **ทุก diagram ต้องมีชีวิต** — เส้นต้องไหล (dash animation), มีจุดแสงวิ่ง, มี auto-play + คลิกได้

## 3. สถาปัตยกรรม: SVG + HTML Overlay

```
<div relative aspect-[1200/640]>          ← canvas (กำหนดสัดส่วนคงที่)
  <svg viewBox="0 0 1200 640">            ← ชั้นเส้น: connectors, ลูกศร, จุดวิ่ง
  <div absolute style={left,top,%}>       ← ชั้นกล่อง: node ที่คลิกได้ (HTML)
  <div absolute>                          ← ชั้น label บนเส้น
</div>
<div>                                     ← info panel: คำอธิบาย + code ของ node ที่ active
```

**ทำไมต้องแยกชั้น?** SVG เก่งเรื่องเส้นโค้ง/ลูกศร/`animateMotion`
แต่ข้อความยาว + ปุ่มคลิก + hover ทำด้วย HTML/Tailwind ง่ายกว่าและคมกว่า

## 4. ระบบพิกัด (หัวใจของ Skill)

กำหนด viewBox คงที่ เช่น `1200 × 640` หรือ `1200 × 520` แล้ว map เป็น `%`:

```javascript
const VW = 1200, VH = 520;
const pctX = (v) => `${(v / VW) * 100}%`;
const pctY = (v) => `${(v / VH) * 100}%`;

// พิกัดกล่อง — หน่วยเดียวกับ SVG viewBox
const POS = {
  checkout: { x: 57, y: 240, w: 116, h: 60 },
  test:     { x: 617, y: 240, w: 116, h: 60 },
};
```

**เส้นเชื่อม** เขียนเป็น path data (`M/L/Q/C`) เก็บใน array:

```javascript
const CONNECTORS = [
  { d: "M 173 270 L 193 270", color: "#58a6ff" },
  { d: "M 845 145 L 845 166 Q 845 176 835 176 L 125 176 ...", color: "#bc8cff" },
  { d: "M 600 478 C 600 590, 145 590, 145 138", color: "#f778ba", dashed: true },
];
```

**จุดแสงวิ่ง** ใช้ SMIL `animateMotion` ตามเส้นทางรวม (ROUTE):

```html
<circle r="5" fill="#e6edf7" filter="url(#glow)">
  <animateMotion dur="6s" repeatCount="indefinite" path={ROUTE} />
</circle>
```

## 5. ระบบสี + CSS Animation

**Palette (Dual Theme: Light Mode & Dark Mode):**

| Token | Light Theme (Default) | Dark Theme (GitHub Dark) | ใช้กับ |
|---|---|---|---|
| `bg-page / widget` | `#f6f8fa / #ffffff` | `#0a0e1a / #0d1424` | พื้นหลังหน้าเว็บและ Container |
| `line / border` | `#e2e8f0 / #cbd5e1` | `#1e2a45 / #2a3a5e` | เส้นขอบกล่องและโครงสร้าง |
| `conn-track` | `#e2e8f0` | `#1e2a45` | เส้นรางเบื้องหลังลูกศร |
| `text / muted` | `#0f172a / #475569` | `#e6edf3 / #8b949e` | ตัวหนังสือหลัก / คำอธิบายรอง |
| `gh-blue` | `#0284c7` | `#58a6ff` | CI / source / ข้อมูล DataFrame / Input |
| `gh-purple` | `#7c3aed` | `#bc8cff` | transform / groupby / wrangling / Method |
| `gh-green` | `#16a34a` | `#3fb950` | deploy / สำเร็จ / output / Verify |
| `gh-orange` | `#ea580c` | `#f0883e` | trigger / condition / filter / Property |
| `gh-pink` | `#db2777` | `#f778ba` | Series / filtered subsets |
| `gh-danger` | `#e11d48` | `#f43f5e` | Exception / Error Loop / Diagnostic |

**CSS ที่ต้องมี:**

```css
.flow-dash { stroke-dasharray: 7 9; animation: dash-move 1.1s linear infinite; }
@keyframes dash-move { to { stroke-dashoffset: -16; } }

.bg-grid {
  background-image:
    linear-gradient(rgba(88,166,255,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(88,166,255,.05) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

## 6. เจ็ด Pattern สำเร็จรูป

### Pattern A — Clickable Pipeline (diagram หลัก)
- Node เป็น `<button>` วางด้วย % + `activeIdx` state + `setInterval` auto-play (~2.8s)
- Node ที่ active: ขยาย `scale-[1.05]` + `box-shadow` สี phase + วงแหวน pulsing ring
- ด้านล่างมี **info panel**: icon + chip phase + คำอธิบาย + mini terminal + progress dots
- คลิก node ใด = `setActiveIdx(i)` + หยุด auto-play

### Pattern B — Code ↔ Diagram Sync (ผ่าโครงสร้าง)
- ฝั่งซ้าย/ล่าง: CodeBlock ที่ hover แต่ละบรรทัดได้ (`onLineHover`)
- ฝั่งขวา/บน: diagram ของโครงสร้าง
- state เดียว `activeRegion` เชื่อมสองฝั่งผ่าน map สองทาง

### Pattern C — CodeBlock with Tokenizer
- macOS title bar (`🔴 🟡 🟢`)
- Tokenizer: comment ทั้งบรรทัด → เทาเอียง, `key:`/`func` → เขียว, `"string"` → ฟ้า, ตัวเลข/boolean → ม่วง
- รองรับ `highlightLines` (แถบสี + border ซ้าย) และ `onLineHover` ต่อบรรทัด
