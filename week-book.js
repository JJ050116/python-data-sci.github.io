const chapters = [
  {
    title: "เริ่มต้นและรู้จักข้อมูล",
    lead: "ก่อนจะเริ่มวิเคราะห์ อย่าเพิ่งเดาว่าในไฟล์มีอะไร เราจะเปิดไฟล์ ดูตัวอย่าง 3 บรรทัดแรก และตรวจโครงสร้างให้เป็น เพื่อไม่ให้เขียนโค้ดแบบลองผิดลองถูก",
    goals: [
      ["รู้จักไฟล์ CSV", "CSV คือไฟล์ข้อความธรรมดาที่เก็บข้อมูลตาราง แต่ละคอลัมน์คั่นด้วยจุลภาค (,)"],
      ["รู้จัก DataFrame", "DataFrame คือ 'สมุดตารางข้อมูลในหน่วยความจำ' คล้ายตารางใน Excel มีทั้งแถวและคอลัมน์"],
      ["แยก Property กับ Method", "df.shape (ขนาดตาราง) เป็น Property ไม่มีวงเล็บ () ส่วน df.head() (ดูตัวอย่าง) เป็น Method มีวงเล็บ ()"],
      ["อ่าน Error", "ถ้าเจอ FileNotFoundError ให้ตรวจก่อนว่ากำลังรัน Notebook จากโฟลเดอร์ไหน"]
    ],
    recap: "นี่คือบทแรก จึงยังไม่มีโค้ดเก่า เราเริ่มจากไฟล์ footballers.csv ในโฟลเดอร์ data/",
    prior: "# เริ่มต้นจากไฟล์ข้อมูล\nfootballers.csv",
    funcs: [
      ["pd.read_csv()", "ฟังก์ชันเปิดไฟล์ CSV แล้วแปลงเป็นตาราง DataFrame ทันที", "Function (มี ())"],
      ["df.shape", "Property ดูขนาด: (จำนวนแถว, จำนวนคอลัมน์) — ห้ามใส่วงเล็บ ()", "Property (ไม่มี ())"],
      ["df.head(n)", "Method ดูตัวอย่าง n แถวแรก — ต้องใส่วงเล็บ () เสมอ", "Method (มี ())"]
    ],
    normal: "Python ปกติ (csv)",
    library: "Pandas",
    pair: [
      ["import csv", "import pandas as pd", "นำเครื่องมือเข้ามาใช้: csv เป็นมาตรฐานของ Python ส่วน Pandas เป็น library สำหรับตารางข้อมูลโดยเฉพาะ"],
      ["with open(\"../data/footballers.csv\") as f:\n    rows = list(csv.DictReader(f))", "df = pd.read_csv(\"../data/footballers.csv\")", "ทั้งคู่เปิดอ่านไฟล์แล้ว: rows ได้เป็น list ของ dictionary ส่วน df ได้เป็น DataFrame (ตารางพร้อมใช้)"],
      ["print(rows[:3])", "df.head(3)", "ดูตัวอย่างเพียง 3 แถวแรกเพื่อตรวจหน้าตาข้อมูล โดยไม่ต้องโหลดทั้งไฟล์ออกมาให้รกหน้าจอ"]
    ],
    views: [
      ["มุมมองข้อมูลจริง", "อย่าเชื่อชื่อคอลัมน์ที่จำได้ ให้พิมพ์ df.columns ดูชื่อจริงเสมอ เพื่อเลี่ยง KeyError (เช่น overall กับ Overall ไม่เหมือนกัน)"],
      ["มุมมองเครื่องมือ", "Python ปกติใช้ csv.DictReader ได้ แต่ Pandas อ่านเป็น DataFrame แล้วมีคำสั่งกรอง จัดกลุ่ม และวิเคราะห์ต่อได้ทันที"]
    ],
    error: "FileNotFoundError: [Errno 2] No such file or directory",
    fix: "ตรวจว่ารัน Notebook จากโฟลเดอร์ใด หากรันจากโฟลเดอร์ challenge/ ให้ใช้ path `../data/footballers.csv` เพื่อถอยหลัง 1 โฟลเดอร์",
    challenge: "อ่านไฟล์ footballers.csv แล้วแสดง 3 แถวแรก พร้อมบอกจำนวนแถวและคอลัมน์จาก `df.shape`"
  },
  {
    title: "Data Wrangling",
    lead: "ข้อมูลดิบมักมีคอลัมน์มากเกินไป บทนี้เราจะตัดเลือกเฉพาะคอลัมน์ที่ใช้ เปลี่ยนชื่อให้อ่านง่าย และทำความเข้าใจความต่างระหว่าง 'Series (ข้อมูล 1 เสา)' กับ 'DataFrame (ตาราง)'",
    goals: [
      ["เข้าใจ Series vs DataFrame", "df['col'] วงเล็บเดี่ยวได้ Series (1 เสาข้อมูล) ส่วน df[['col1', 'col2']] วงเล็บคู่ได้ DataFrame (ตาราง)"],
      ["เลือกเฉพาะสิ่งที่ใช้", "ตัดคอลัมน์ที่ไม่เกี่ยวกับคำถามออก เพื่อให้ตารางเล็ก ชัดเจน และคิดง่ายขึ้น"],
      ["เปลี่ยนชื่อคอลัมน์", "ใช้ .rename() เปลี่ยนชื่อเช่น overall -> rating เพื่อให้รายงานเข้าใจง่าย"],
      ["ป้องกันข้อมูลเดิมพัง", "ใช้ .copy() แยกตารางใหม่ออกมาอย่างอิสระ ไม่เผลอแก้ df ต้นฉบับ"]
    ],
    recap: "เราพก df จาก Week 01 มาแล้ว จึงเริ่มจัดรูปข้อมูลได้ทันที",
    prior: "import pandas as pd\ndf = pd.read_csv(\"../data/footballers.csv\")",
    funcs: [
      ["df[['...']]", "เลือกหลายคอลัมน์เป็นตารางย่อ (DataFrame 2 มิติ)", "Syntax (วงเล็บ [[]])"],
      ["df['...']", "เลือก 1 คอลัมน์เดี่ยวๆ ได้ผลเป็น Series (1 มิติ)", "Syntax (วงเล็บ [])"],
      [".rename()", "เปลี่ยนชื่อคอลัมน์ในตารางใหม่ เช่น columns={'overall': 'rating'}", "Method (มี ())"],
      [".copy()", "คัดลอกตารางแยกออกมาอิสระ ป้องกันไม่ให้แก้โดนตารางเดิม", "Method (มี ())"]
    ],
    normal: "Python ปกติ (loop)",
    library: "Pandas",
    pair: [
      ["summary = []", "cols = [\"name\", \"club\", \"overall\"]", "ทั้งสองวิธีเริ่มจากระบุว่าจะเก็บข้อมูลคอลัมน์อะไรบ้าง"],
      ["for row in rows:\n    summary.append({\"name\": row[\"name\"], \"club\": row[\"club\"], \"rating\": row[\"overall\"]})", "summary = df[cols].rename(columns={\"overall\": \"rating\"})", "loop ต้องเขียนโค้ดหยิบทีละคนและสร้าง dictionary เอง; Pandas เลือกและเปลี่ยนชื่อทั้งคอลัมน์ในคำสั่งเดียว"],
      ["print(summary[:3])", "summary.head(3)", "ตรวจดูตารางใหม่ 3 แถวแรกก่อนนำไปวิเคราะห์ต่อเสมอ"]
    ],
    views: [
      ["มุมมองผู้เริ่มต้น", "จำง่ายๆ: วงเล็บเหลี่ยม 1 ชั้น `[]` ได้ 1 เสาข้อมูล (Series), วงเล็บเหลี่ยม 2 ชั้น `[[]]` ได้ตาราง (DataFrame)"],
      ["มุมมองความปลอดภัย", "เวลาเลือกคอลัมน์มาแต่งเติม ควรใช้ .copy() หรือสร้างตารางใหม่เสมอ เพื่อไม่ให้เผลอไปแก้ไข df ต้นฉบับ"]
    ],
    error: "KeyError: 'Overall'",
    fix: "ภาษา Python แยกตัวพิมพ์เล็ก-ใหญ่ (Case-sensitive) ชื่อจริงในตารางคือ `overall` เล็กทั้งหมด ตรวจสอบด้วย `df.columns` ก่อนเสมอ",
    challenge: "สร้าง summary ที่มี name, club, overall และเปลี่ยนชื่อ overall เป็น rating โดย df เดิมต้องไม่เปลี่ยน"
  },
  {
    title: "Cleaning data",
    lead: "ข้อมูลจริงมักมีช่องว่าง (Missing Value หรือ NaN) การ clean ไม่ใช่การรีบลบทิ้งหรือใส่เลข 0 มั่วๆ แต่ต้องเลือกวิธีที่สมเหตุผลและอธิบายได้",
    goals: [
      ["เข้าใจ NaN", "NaN ย่อมาจาก Not a Number หมายถึง 'ช่องว่างที่ไม่มีข้อมูล' ไม่ใช่เลข 0"],
      ["ตรวจหาช่องว่าง", "ใช้ .isna() ตรวจทุกช่อง และตามด้วย .sum() เพื่อรวมจำนวนช่องว่าง"],
      ["เข้าใจ Median (ค่ากลาง)", "ค่ามัธยฐานของคนที่เรียงลำดับแถว ทนทานต่อตัวเลขผิดปกติ ไม่ทำให้ค่าเฉลี่ยเบ้"],
      ["แทนค่าอย่างปลอดภัย", "ใช้ .fillna() เติมเฉพาะช่องที่หาย แล้วใช้ .assign() สร้างตารางใหม่อย่างปลอดภัย"]
    ],
    recap: "เรามี summary แล้ว แต่การ clean ควรทำกับ df ที่ยังมีข้อมูลจริงครบทุกคอลัมน์",
    prior: "df = pd.read_csv(\"../data/footballers.csv\")\nsummary = df[[\"name\", \"club\", \"overall\"]]",
    funcs: [
      [".isna()", "ตรวจว่าแต่ละช่องเป็นค่าว่าง (NaN) หรือไม่ ได้ผลเป็น Series ของ True/False", "Method (มี ())"],
      [".sum()", "รวมผลตัวเลข (นับ True เป็น 1, False เป็น 0) เพื่อสรุปจำนวนช่องว่าง", "Method (มี ())"],
      [".median()", "หาค่ากึ่งกลางของตัวเลขที่เรียงลำดับ ทนต่อตัวเลขผิดปกติหรือสุดโต่ง", "Method (มี ())"],
      [".fillna()", "แทนที่เฉพาะตำแหน่งที่เป็นช่องว่าง (NaN) ด้วยค่าที่เรากำหนด", "Method (มี ())"]
    ],
    normal: "Python ปกติ (if/loop)",
    library: "Pandas",
    pair: [
      ["heights = [float(r[\"height_cm\"]) for r in rows if r[\"height_cm\"] != \"\"]", "missing = df[\"height_cm\"].isna().sum()", "ก่อนจะแก้ ต้องรู้ก่อนว่าหายไปกี่จุด; isna() คืน True/False แล้ว sum() รวมให้"],
      ["middle = sorted(heights)[len(heights)//2]", "middle = df[\"height_cm\"].median()", "ทั้งคู่หาค่ากลาง แต่ median() ของ Pandas บอกเจตนาชัดเจนและข้ามช่องว่างให้อัตโนมัติ"],
      ["for row in rows:\n    if row[\"height_cm\"] == \"\": row[\"height_cm\"] = middle", "clean_df = df.assign(height_cm=df[\"height_cm\"].fillna(middle))", "Pandas ใช้ assign + fillna สร้างตารางใหม่ขึ้นมา จึงไม่เผลอไปแก้ทับข้อมูลต้นทาง"]
    ],
    views: [
      ["มุมมองความจริง", "ห้ามใส่ 0 แทนส่วนสูงที่หายไปเด็ดขาด เพราะไม่มีนักเตะคนไหนสูง 0 ซม. จะทำให้ค่าเฉลี่ยพังทลาย"],
      ["มุมมองการทำงาน", "การ clean ควรสร้าง clean_df ใหม่เสมอ เพื่อให้เรายังย้อนกลับไปตรวจสอบข้อมูลดิบต้นฉบับได้ตลอดเวลา"]
    ],
    error: "TypeError: could not convert string to float: ''",
    fix: "ช่องว่างที่เป็นข้อความเปล่าทำให้แปลงตัวเลขไม่ได้ ให้ตรวจด้วย `.isna()` หรือใช้ Pandas อ่านเป็น `NaN` แล้วแทนด้วย `.fillna()`",
    challenge: "บทเรียนใช้ height_cm แล้ว — Challenge ให้ใช้ age: นับค่าที่หาย สร้าง clean_df ที่แทน age ด้วย median และอธิบายเหตุผล"
  },
  {
    title: "Filter data",
    lead: "การกรองคือการคัดเฉพาะแถวที่ตอบคำถาม บทนี้จะพาเข้าใจว่า 'Series' คืออะไร, ทำไมเกิด Series ของ True/False และทำไมต้องใช้เครื่องหมาย & แทนคำว่า and",
    goals: [
      ["เข้าใจ Series รายแถว", "Series คือข้อมูล 1 คอลัมน์เดี่ยว เมื่อนำ df['age'] <= 25 จะได้ Series ของ True/False รายคน เรียกว่า Boolean Mask"],
      ["รู้ว่าทำไมต้องใช้ &", "Pandas ใช้ `&` เพื่อเปรียบเทียบระดับแถว ห้ามใช้ `and` เพราะ Series มีหลายแถวจน Python ตัดสินไม่ได้ (Ambiguous)"],
      ["ใส่วงเล็บเสมอ", "ต้องครอบ `(เงื่อนไข 1) & (เงื่อนไข 2)` เพื่อให้คำนวณแต่ละเงื่อนไขก่อนเชื่อม"],
      ["ใช้ query() เขียนกฎ", "เขียนเงื่อนไขให้อ่านง่ายเหมือนประโยค เช่น 'age <= 25 and overall >= 85'"]
    ],
    recap: "clean_df จาก Week 03 ทำให้เราไม่ต้องกังวลข้อมูลส่วนสูงหายเมื่อต้องนำมากรองต่อ",
    prior: "clean_df = df.assign(\n    height_cm=df[\"height_cm\"].fillna(df[\"height_cm\"].median())\n)",
    funcs: [
      ["Series (1 มิติ)", "ข้อมูล 1 คอลัมน์เดี่ยว เช่น df['age'] เมื่อเทียบเงื่อนไขจะได้ Series ของ True/False", "Concept"],
      ["& (และระดับแถว)", "เชื่อมเงื่อนไขของ Series ทีละแถวเข้าด้วยกัน ต้องใส่วงเล็บรอบแต่ละเงื่อนไขเสมอ", "Operator"],
      [".isin()", "เมธอดกรองข้อมูลโดยตรวจว่าค่าในแถวนั้นตรงกับสมาชิกในลิสต์หรือไม่", "Method (มี ())"],
      [".query()", "เมธอดกรองข้อมูลด้วยข้อความกฎ ทำให้อ่านเงื่อนไขง่ายโดยไม่ต้องใส่วงเล็บซับซ้อน", "Method (มี ())"]
    ],
    normal: "Python ปกติ (if/loop)",
    library: "Pandas",
    pair: [
      ["future_stars = []", "rule = \"age <= 25 and overall >= 85\"", "กำหนดเกณฑ์ดาวรุ่งก่อนลงมือกรอง: ทั้งสองวิธีต้องรู้ชัดเจนว่าต้องการเงื่อนไขอะไร"],
      ["for row in rows:\n    if int(row[\"age\"]) <= 25 and int(row[\"overall\"]) >= 85:\n        future_stars.append(row)", "future_stars = clean_df.query(rule)", "loop ต้องตรวจทีละคน; query หรือ Boolean Mask นำกฎไปตรวจสอบกับทั้งตารางพร้อมกันทันที"],
      ["print([r[\"name\"] for r in future_stars])", "future_stars[[\"name\", \"age\", \"overall\"]]", "แสดงเพียงคอลัมน์ที่เป็นหลักฐานตอบคำถาม ได้ผลลัพธ์เป็นตารางย่อพร้อมรายงาน"]
    ],
    views: [
      ["มุมมอง Series vs DataFrame", "DataFrame เปรียบเหมือนสมุดตาราง Excel ทั้งเล่ม ส่วน Series คือข้อมูลแค่ 1 เสา เมื่อเอา 1 เสาไปตรวจเงื่อนไข ผลลัพธ์จึงเป็น 1 เสาของ True/False"],
      ["มุมมอง Error (ทำไม ambiguous?)", "Python ปกติจะงงเมื่อเจอ Series ที่มีทั้ง True และ False ปนกันหลายแถว จึงแจ้งว่า 'The truth value of a Series is ambiguous' ทางแก้คือใช้เครื่องหมาย `&` ร่วมกับวงเล็บเสมอ"]
    ],
    error: "ValueError: The truth value of a Series is ambiguous",
    fix: "เปลี่ยนคำว่า `and` เป็นเครื่องหมาย `&` (และระดับแถว) พร้อมครอบวงเล็บ `(df['age'] <= 25) & (df['overall'] >= 85)` เสมอ",
    challenge: "หานักเตะอายุไม่เกิน 25 และ overall ตั้งแต่ 85 แล้วอธิบายว่าทำไมผลมีเพียงบางแถว"
  },
  {
    title: "Analysis พื้นฐาน",
    lead: "การวิเคราะห์คือการเปลี่ยนข้อมูลรายคนให้เป็นคำตอบภาพรวม บทนี้จะแบ่งข้อมูลเป็นกลุ่มด้วย groupby() และคำนวณค่าเฉลี่ยของแต่ละลีก",
    goals: [
      ["เข้าใจ GroupBy", "groupby('league') เปรียบเหมือนการแยกข้อมูลลงกล่องหรือแฟ้มตามชื่อลีก"],
      ["คำนวณหลังจัดกลุ่ม", "groupby อย่างเดียวไม่ใช่ตาราง ต้องตามด้วยคำนวณ เช่น .mean(), .count(), .median()"],
      ["เรียงลำดับคำตอบ", "ใช้ .sort_values(ascending=False) เพื่อให้กลุ่มที่คะแนนสูงสุดอยู่บนสุด"],
      ["สรุปหลายค่าด้วย .agg()", "ดูทั้งจำนวนคน (count) ค่าเฉลี่ย (mean) และค่ากลาง (median) พร้อมกัน"]
    ],
    recap: "future_stars คือผลการกรองหนึ่งกลุ่ม แต่การวิเคราะห์ภาพรวมควรกลับมาดู clean_df ทั้งตาราง",
    prior: "future_stars = clean_df.query(\"age <= 25 and overall >= 85\")",
    funcs: [
      [".groupby()", "เมธอดแยกข้อมูลเป็นกลุ่มตามคอลัมน์ที่กำหนด เช่น แยกลีก หรือแยกตำแหน่ง", "Method (มี ())"],
      [".mean()", "คำนวณค่าเฉลี่ยของตัวเลขในแต่ละกลุ่ม ได้ผลลัพธ์เป็น Series", "Method (มี ())"],
      [".sort_values()", "เมธอดเรียงลำดับแถวตามตัวเลขจากมากไปน้อย (ascending=False)", "Method (มี ())"],
      [".agg()", "สรุปค่าสถิติหลายๆ ตัวพร้อมกันในคำสั่งเดียว เช่น ['count', 'mean']", "Method (มี ())"]
    ],
    normal: "Python ปกติ (dict)",
    library: "Pandas",
    pair: [
      ["totals, counts = {}, {}", "by_league = clean_df.groupby(\"league\")[\"overall\"]", "เตรียมรวมคะแนนแยกลีก: Python ปกติต้องทำ dictionary เอง; Pandas ใช้ groupby แยกกลุ่มให้ทันที"],
      ["for row in rows:\n    league = row[\"league\"]\n    totals[league] = totals.get(league, 0) + int(row[\"overall\"])\n    counts[league] = counts.get(league, 0) + 1", "league_mean = by_league.mean()", "loop ต้องบวกผลรวมและนับจำนวนเอง; Pandas ซ่อนรายละเอียดการคำนวณไว้ใน mean()"],
      ["averages = {k: totals[k]/counts[k] for k in totals}", "league_mean.sort_values(ascending=False)", "เรียงจากมากไปน้อยเพื่ออ่านคำตอบ แต่ต้องดูจำนวนคนในแต่ละลีกประกอบด้วย"]
    ],
    views: [
      ["มุมมองตัวเลข", "ค่าเฉลี่ยสูงไม่ได้แปลว่านักเตะทุกคนในลีกนั้นมีคะแนนสูง ต้องตรวจจำนวนคน (count) ประกอบเสมอ"],
      ["มุมมองหลายค่า", "ใช้ count, mean, median ร่วมกันเมื่อไม่อยากเชื่อค่าเฉลี่ยเพียงค่าเดียว"]
    ],
    error: "KeyError: 'leagues'",
    fix: "ชื่อคอลัมน์จริงในตารางคือ `league` (ไม่มี s) ตรวจสอบด้วย `df.columns` ก่อนเขียนโค้ดเสมอ",
    challenge: "หาค่า overall เฉลี่ยแยกลีก เรียงจากมากไปน้อย แล้วรายงาน count ของแต่ละลีกด้วย"
  },
  {
    title: "Visualization",
    lead: "สมองมนุษย์จับความต่างของความสูงแท่งกราฟได้เร็วกว่าตัวเลข บทนี้จะสร้างกราฟแท่งด้วย Matplotlib และตั้งชื่อแกนให้ชัดเจน",
    goals: [
      ["เลือกกราฟแท่ง (Bar Chart)", "เหมาะสำหรับการเปรียบเทียบตัวเลขระหว่างกลุ่ม หรือเปรียบเทียบ Top 5"],
      ["เตรียมข้อมูลก่อนวาด", "ใช้ .nlargest(5, 'overall') ดึง 5 คนแรกก่อนส่งให้ฟังก์ชันวาดกราฟ"],
      ["ตั้งชื่อแกนให้สื่อสารได้", "กราฟที่ไม่มีชื่อแกน Y จะทำให้คนดูไม่รู้ว่าความสูงหมายถึงอะไร"],
      ["หมุนป้ายชื่อ", "ใช้ plt.xticks(rotation=25) เพื่อไม่ให้ชื่อยาวๆ ทับกัน"]
    ],
    recap: "league_mean จาก Week 05 คือข้อมูลสรุปที่สะอาดและเหมาะจะนำมาสร้างกราฟ",
    prior: "league_mean = clean_df.groupby(\"league\")[\"overall\"].mean()\nleague_mean = league_mean.sort_values(ascending=False)",
    funcs: [
      [".nlargest()", "เมธอดเลือก n แถวที่มีค่ามากที่สุดของคอลัมน์ เช่น 5 คนแรก", "Method (มี ())"],
      ["plt.bar()", "ฟังก์ชันสร้างกราฟแท่งจากรายชื่อ (แกน X) และตัวเลข (แกน Y)", "Function (มี ())"],
      ["plt.xticks()", "ฟังก์ชันปรับแต่งข้อความกำกับแกน X เช่น เอียงตัวอักษรให้อ่านง่าย", "Function (มี ())"],
      ["plt.ylabel()", "ฟังก์ชันใส่ชื่อและหน่วยให้กับแกนแนวตั้ง (แกน Y)", "Function (มี ())"]
    ],
    normal: "Python ปกติ (ข้อความ)",
    library: "Matplotlib",
    pair: [
      ["for name, value in league_mean.items():\n    print(f\"{name}: {'#' * int(value)}\")", "import matplotlib.pyplot as plt", "ทั้งสองวิธีทำให้เห็นความต่าง: ข้อความเหมาะกับ terminal ส่วน Matplotlib เหมาะกับการนำเสนอจริง"],
      ["# นับ # เพื่อเทียบความสูง", "plt.bar(league_mean.index, league_mean.values)", "กราฟแท่งใช้ชื่อลีก (index) และตัวเลข (values) ชุดเดียวกัน จึงเปรียบเทียบความสูงได้อย่างแม่นยำ"],
      ["# ไม่มีแกนอย่างเป็นทางการ", "plt.ylabel(\"Average overall\")\nplt.xticks(rotation=25)\nplt.show()", "เพิ่มชื่อแกนและหมุนข้อความไม่ให้ทับกัน เพื่อให้กราฟอธิบายตัวเองได้โดยไม่ต้องเดา"]
    ],
    views: [
      ["มุมมองการสื่อสาร", "กราฟไม่ใช่การวิเคราะห์แทนเรา ต้องมีคำอธิบายเสมอว่ากำลังเปรียบเทียบอะไร"],
      ["มุมมองคุณภาพ", "แกน Y ที่ตัดช่วงอาจทำให้ความต่างดูเกินจริง จึงต้องตรวจสเกลแกนเสมอ"]
    ],
    error: "ValueError: shape mismatch",
    fix: "ตรวจให้ข้อมูลแกน X และ Y มาจากตารางเดียวกันและยาวเท่ากัน",
    challenge: "วาดกราฟแท่ง top 5 overall พร้อมชื่อแกน และเขียน 1 ประโยคว่ากราฟแสดงอะไร"
  },
  {
    title: "เล่าเรื่องจากข้อมูล",
    lead: "ข้อสรุปที่ดีต้องมี 'คำตอบ', 'หลักฐานตัวเลข' และ 'ข้อจำกัด' การสื่อสารจึงไม่ใช่การแปะกราฟแล้วปล่อยให้คนดูเดาเอง",
    goals: [
      ["เปลี่ยน Index เป็นตาราง", "ใช้ .reset_index() ย้ายชื่อกลุ่มกลับมาเป็นคอลัมน์ปกติเพื่อให้หยิบไปใช้ง่าย"],
      ["หยิบคำตอบอันดับหนึ่ง", "ใช้ .iloc[0] ดึงแถวแรกหลังจากที่เราเรียงลำดับแล้ว"],
      ["สร้างประโยคสรุป", "ใช้ f-string นำตัวเลขและชื่อมาแทรกในประโยคภาษาไทยอย่างเป็นธรรมชาติ"],
      ["ระบุข้อจำกัดอย่างซื่อสัตย์", "ใส่คำว่า 'ในชุดข้อมูลนี้' เพื่อไม่ให้เหมารวมเกินหลักฐานจริง"]
    ],
    recap: "กราฟ Week 06 ให้หลักฐานด้วยภาพ; บทนี้เปลี่ยนหลักฐานนั้นเป็นประโยคที่ตรวจสอบได้",
    prior: "league_mean.plot.bar()\nplt.ylabel(\"Average overall\")\nplt.show()",
    funcs: [
      [".reset_index()", "เมธอดเปลี่ยนชื่อกลุ่มที่เป็น Index ให้กลับมาเป็นคอลัมน์ปกติในตาราง", "Method (มี ())"],
      [".iloc[0]", "Property เลือกตำแหน่งแถวตามลำดับตัวเลข (0 คือแถวแรกสุด) ห้ามใส่วงเล็บ ()", "Property (ไม่มี ())"],
      ["f-string", "รูปแบบข้อความ Python ที่แทรกค่าตัวแปรลงในประโยคได้ เช่น f\"{name} เฉลี่ย {val:.1f}\"", "Syntax"],
      ["print()", "ฟังก์ชันมาตรฐานของ Python สำหรับพิมพ์ข้อความหรือผลลัพธ์ออกทางหน้าจอ", "Function (มี ())"]
    ],
    normal: "Python ปกติ (format)",
    library: "Pandas",
    pair: [
      ["best_name = max(averages, key=averages.get)\nbest_value = averages[best_name]", "result = league_mean.reset_index(name=\"average_overall\")", "เลือกคำตอบจากผลที่เรียง: reset_index() เปลี่ยน Series สรุปให้เป็นตารางที่หยิบใช้ง่าย"],
      ["message = \"{} is highest at {:.1f}\".format(best_name, best_value)", "best = result.iloc[0]", "เตรียมข้อมูลเพียง 1 แถวแรกที่มีคะแนนสูงสุดก่อนนำมาเรียบเรียงประโยคเล่าเรื่อง"],
      ["print(message + \"; sample sizes may differ.\")", "print(f\"ในชุดข้อมูลนี้ {best['league']} มีค่าเฉลี่ย {best['average_overall']:.1f}\")", "เติมคำว่า 'ในชุดข้อมูลนี้' และระบุข้อจำกัด เพื่อไม่ให้เหมารวมเกินหลักฐาน"]
    ],
    views: [
      ["มุมมองความน่าเชื่อถือ", "คำว่า 'ในชุดข้อมูลนี้' บอกขอบเขตได้ดีกว่าคำว่า 'ลีกนี้ดีที่สุดในโลก'"],
      ["มุมมองผู้ฟัง", "เริ่มจากคำตอบก่อนค่อยอธิบายวิธีคำนวณ ไม่เริ่มจากโค้ดยาวๆ ให้ผู้ฟังเบื่อ"]
    ],
    error: "ข้อผิดพลาดเชิงเหตุผล: สรุปว่าทุกลีกเป็นแบบเดียวกัน",
    fix: "ตรวจจำนวนแถวและการคัดเลือกข้อมูล แล้วเขียนข้อจำกัดไว้ในข้อสรุปเสมอ",
    challenge: "เขียน 3 ประโยค: สิ่งที่เห็น, หลักฐานจากกราฟ, และสิ่งที่ยังสรุปไม่ได้"
  },
  {
    title: "Machine Learning เบื้องต้น",
    lead: "โมเดลไม่ใช่เวทมนตร์ มันคือกฎที่เรียนรู้ความสัมพันธ์ระหว่าง 'สถิตินักเตะ (Features)' กับ 'ราคา (Target)' เพื่อนำไปทำนายมูลค่านักเตะชุดใหม่",
    goals: [
      ["แยก feature ($X$) / target ($y$)", "$X$ คือสถิติ (ตาราง 2 มิติ [[]]) และ $y$ คือราคา (Series 1 มิติ [])"],
      ["แบ่ง train / test", "กันข้อมูล 20% ไว้ทดสอบความแม่นยำ ป้องกันการจำข้อสอบ"],
      ["วัด MAE", "เปรียบเทียบความผิดพลาดเฉลี่ยของโมเดลกับ Baseline (เดาค่าเฉลี่ย)"],
      ["ทำนาย Unseen Data", "นำโมเดลไปประเมินราคานักเตะดาวรุ่งชุดใหม่ที่ไม่เคยเห็นมาก่อน"]
    ],
    recap: "จาก Week 07 เรารู้ว่าข้อสรุปต้องมีหลักฐาน; ML ก็ต้องมีผลทดสอบและความแม่นยำเป็นหลักฐานเช่นกัน",
    prior: "# clean_df พร้อมใช้\n# features: overall, age, pace, shooting\n# target: value_millions",
    funcs: [
      ["train_test_split()", "ฟังก์ชันสุ่มแบ่งข้อมูลออกเป็นชุดฝึก (Train) และชุดทดสอบ (Test)", "Function (มี ())"],
      [".fit()", "เมธอดสั่งให้โมเดล Machine Learning เรียนรู้จากชุดฝึก", "Method (มี ())"],
      [".predict()", "เมธอดนำโมเดลไปทำนายข้อมูลนักเตะชุดใหม่", "Method (มี ())"],
      ["mean_absolute_error()", "ฟังก์ชันคำนวณค่าความผิดพลาดเฉลี่ย (MAE) ระหว่างคำตอบจริงกับค่าทำนาย", "Function (มี ())"]
    ],
    normal: "Python ปกติ (baseline)",
    library: "scikit-learn",
    pair: [
      ["baseline = sum(y_train) / len(y_train)", "from sklearn.linear_model import LinearRegression\nfeatures = [\"overall\", \"age\", \"pace\", \"shooting\"]", "baseline คือกฎง่ายที่สุด (เดาค่าเฉลี่ยเท่ากันทุกคน); ส่วน scikit-learn มี LinearRegression หาความสัมพันธ์หลายมิติ"],
      ["predictions = [baseline for _ in y_test]", "model = LinearRegression().fit(X_train, y_train)\ny_pred = model.predict(X_test)", "baseline ทายราคาเท่ากันทุกคน; LinearRegression ประเมินราคาจากสถิติของนักเตะแต่ละคน"],
      ["mae = sum(abs(a-p) for a,p in zip(y_test,predictions))/len(y_test)", "new_players = pd.read_csv(\"../data/scouted_players.csv\")\nnew_players[\"predicted_value\"] = model.predict(new_players[features]).round(1)", "ทั้งสองวัด MAE บน test ได้ และโมเดลยังนำไป predict นักเตะชุดใหม่ที่ไม่เคยเห็นมาก่อนได้ทันที"]
    ],
    views: [
      ["มุมมองธุรกิจ", "โมเดลช่วยแมวมองประเมินราคานักเตะดาวรุ่งจากคุณลักษณะได้รวดเร็วขึ้น"],
      ["มุมมองคุณภาพ", "ถ้าโมเดลผิดพลาด (MAE) มากกว่า Baseline แปลว่าโมเดลยังใช้งานไม่ได้"]
    ],
    error: "Expected 2D array, got 1D array instead",
    fix: "X ต้องเป็นตาราง 2 มิติ เช่น `df_clean[[\"overall\", \"age\", \"pace\", \"shooting\"]]` (ใส่วงเล็บ 2 ชั้น)",
    challenge: "Clean ข้อมูล value_millions, เทรน LinearRegression, วัด MAE เทียบกับ Baseline และ predict ราคานักเตะใน scouted_players.csv"
  },
  {
    title: "Mini project: สำรวจ",
    lead: "Mini project เริ่มจากคำถามที่ตอบได้จริง ไม่ใช่เริ่มจากกราฟสวยๆ เราจะวางขอบเขตและตรวจข้อมูลก่อนเขียนโค้ดจำนวนมาก",
    goals: [
      ["ตั้งคำถาม", "ให้ตอบได้จริงจากคอลัมน์ที่มี เช่น 'ตำแหน่งใดมีค่าตัวเฉลี่ยสูงสุด?'"],
      ["นับความถี่ด้วย value_counts()", "ตรวจดูว่ามีนักเตะในแต่ละตำแหน่งกี่คน มีตัวอย่างพอเปรียบเทียบไหม"],
      ["ดูสถิติด้วย .describe()", "สรุปค่าต่ำสุด สูงสุด และค่ากลางของตัวเลขเพื่อเห็นภาพรวม"],
      ["วางแผน 4 บรรทัด", "ระบุคำถาม, คอลัมน์ที่ใช้, การ clean และชนิดกราฟเพื่อลดการลองผิดลองถูก"]
    ],
    recap: "Week 08 สอนให้เทียบวิธีอย่างมีหลักฐาน; mini project จึงเลือกวิธีตามคำถาม ไม่ใช่ตามคำสั่งที่จำได้",
    prior: "# ตัวอย่างคำถาม\nquestion = \"ตำแหน่งใดมีค่าตัวเฉลี่ยสูงสุด?\"\n# clean_df คือข้อมูลที่จัดการ missing แล้ว",
    funcs: [
      ["df.columns", "Property ตรวจสอบรายชื่อคอลัมน์ที่มีจริงทั้งหมดในตาราง ห้ามใส่วงเล็บ ()", "Property (ไม่มี ())"],
      ["df.shape", "Property ตรวจสอบจำนวนแถวและคอลัมน์ (แถว, คอลัมน์) ห้ามใส่วงเล็บ ()", "Property (ไม่มี ())"],
      [".value_counts()", "เมธอดนับความถี่ของค่าที่ไม่ซ้ำกันในคอลัมน์ เช่น จำนวนคนต่อตำแหน่ง", "Method (มี ())"],
      [".describe()", "เมธอดสรุปช่วงของตัวเลข 8 ค่า (count, mean, std, min, 25%, 50%, 75%, max)", "Method (มี ())"]
    ],
    normal: "Python ปกติ (สำรวจ loop)",
    library: "Pandas",
    pair: [
      ["positions = {}\nfor row in rows:\n    positions[row[\"position\"]] = positions.get(row[\"position\"], 0) + 1", "clean_df[\"position\"].value_counts()", "ดูว่ามีตำแหน่งใดบ้างและมีตัวอย่างพอเปรียบเทียบหรือไม่: Pandas สั้นกว่าและคืนผลลัพธ์เป็น Series พร้อมดู"],
      ["values = [float(row[\"value_millions\"]) for row in rows]", "clean_df[[\"position\", \"value_millions\"]].info()", "ก่อนคำนวณค่าตัวเฉลี่ย ต้องตรวจชนิดข้อมูลและหาค่า missing เสมอ"],
      ["# เลือกคำถามหลังอ่านข้อมูล", "clean_df.groupby(\"position\")[\"value_millions\"].mean()", "การสำรวจข้อมูลนำพาเราไปสู่คำถามที่สามารถคำนวณและอธิบายได้จริง"]
    ],
    views: [
      ["มุมมองขอบเขต", "คำถามที่ดีต้องระบุทั้งกลุ่มและค่าที่จะวัด เช่น position กับ value_millions"],
      ["มุมมองการออกแบบ", "เลือกกราฟหลังรู้ชนิดคำถาม: เปรียบเทียบตัวเลขระหว่างกลุ่มให้เลือกใช้ Bar Chart"]
    ],
    error: "KeyError: 'value_million'",
    fix: "ชื่อจริงในไฟล์คือ `value_millions` (มี s) ตรวจ `df.columns` ก่อนแก้โค้ดเสมอ",
    challenge: "เขียนแผน 4 บรรทัด: คำถาม, คอลัมน์, การ clean, กราฟและเหตุผล"
  },
  {
    title: "Mini project: นำเสนอ",
    lead: "บทสุดท้ายทำให้งานของคุณรันซ้ำได้และสื่อสารได้จริง ผู้เรียนคนอื่นควรเปิด Notebook แล้วเห็นเส้นทางเดียวกับคุณตั้งแต่ต้นจนจบ",
    goals: [
      ["จัดลำดับ Notebook", "เรียงลำดับการทำงานให้อ่านจากบนลงล่างได้อย่างลื่นไหล"],
      ["ทำซ้ำได้ (Reproducible)", "Restart Kernel แล้ว Run All ผ่านฉลุยโดยไม่มี Error"],
      ["สื่อสารด้วยกราฟ", "กราฟมีชื่อหัวข้อและชื่อแกนชัดเจน ไม่ปล่อยให้คนดูเดาเอง"],
      ["สรุปอย่างรับผิดชอบ", "มีคำตอบชัดเจน หลักฐานตัวเลขรองรับ และระบุข้อจำกัดของข้อมูล"]
    ],
    recap: "จาก Week 09 เรามีคำถามและแผนแล้ว บทนี้เปลี่ยนแผนเป็นรายงานที่ผู้อื่นตรวจสอบได้",
    prior: "question = \"ตำแหน่งใดมีค่าตัวเฉลี่ยสูงสุด?\"\nresult = clean_df.groupby(\"position\")[\"value_millions\"].mean()",
    funcs: [
      ["def / return", "ไวยากรณ์สร้างฟังก์ชันของตนเองเพื่อจัดระเบียบโค้ดให้รันซ้ำได้ทุกครั้ง", "Syntax"],
      [".plot.bar()", "เมธอดสร้างกราฟแท่งด่วนจากผลลัพธ์ของ Pandas โดยตรง", "Method (มี ())"],
      ["plt.savefig()", "ฟังก์ชันบันทึกกราฟเป็นไฟล์ภาพ (PNG/JPG) ลงในเครื่อง", "Function (มี ())"]
    ],
    normal: "Python ปกติ (function ของเรา)",
    library: "Pandas pipeline",
    pair: [
      ["def average_by_position(rows):\n    # รวมและนับทีละ position\n    ...", "result = (clean_df.groupby(\"position\")[\"value_millions\"]\n    .mean().sort_values(ascending=False))", "ทั้งสองวิธีทำงานซ้ำได้: function ของเราอธิบายกฎเอง ส่วน Pandas pipeline สื่อลำดับการแปลงตารางอย่างชัดเจน"],
      ["report = average_by_position(rows)", "result.plot.bar(title=\"Average value by position\")", "เมื่อได้ผลลัพธ์แล้ว ต้องทำให้ผู้อ่านเห็นและตรวจสอบได้ทันที"],
      ["print(\"ข้อจำกัด: ข้อมูลมีเพียง 20 แถว\")", "plt.ylabel(\"Value (millions)\")\nplt.tight_layout()", "ปิดท้ายรายงานด้วยข้อจำกัดและกราฟที่มีความหมายครบถ้วน"]
    ],
    views: [
      ["มุมมองคุณภาพ", "Restart Kernel → Run All คือการทดสอบว่าคุณไม่ได้พึ่งตัวแปรที่เคยรันค้างไว้ในหน่วยความจำ"],
      ["มุมมองการส่งงาน", "รายงานที่ดีไม่จำเป็นต้องยาว แต่ทุกผลลัพธ์ต้องย้อนกลับไปยังโค้ดและข้อมูลจริงได้เสมอ"]
    ],
    error: "NameError: name 'result' is not defined",
    fix: "สร้าง result ใน cell ก่อนใช้ หรือเรียง cell ใหม่แล้ว Restart Kernel → Run All",
    challenge: "ส่ง Notebook ที่รันจากบนลงล่างได้ มี 1 กราฟ และสรุปคำตอบ/หลักฐาน/ข้อจำกัด 3 ประโยค"
  }
];

const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[c]);
const week = Number(document.body.dataset.week) - 1;
const chapter = chapters[week];
let visibleSteps = 0;
const app = document.querySelector("#book");

function updateCompare() {
  const current = chapter.pair[visibleSteps - 1];
  const normal = visibleSteps ? chapter.pair.slice(0, visibleSteps).map(step => step[0]).join("\n\n") : "# กดปุ่มเพื่อเริ่มดูโค้ดทีละขั้น";
  const library = visibleSteps ? chapter.pair.slice(0, visibleSteps).map(step => step[1]).join("\n\n") : "# กดปุ่มเพื่อเริ่มดูโค้ดทีละขั้น";

  const normalPre = document.querySelector("#compare .code-side:not(.library) pre");
  const normalCode = document.querySelector("#compare .code-side:not(.library) code");
  const libPre = document.querySelector("#compare .code-side.library pre");
  const libCode = document.querySelector("#compare .code-side.library code");
  const stepNote = document.querySelector("#compare .step-note");
  const nextBtn = document.querySelector("#next");

  if (normalPre && normalCode) {
    normalPre.className = visibleSteps ? "" : "empty";
    normalCode.textContent = normal;
  }
  if (libPre && libCode) {
    libPre.className = visibleSteps ? "" : "empty";
    libCode.textContent = library;
  }
  if (stepNote) {
    stepNote.innerHTML = `<b>${current ? `ขั้นที่ ${visibleSteps}:` : "ก่อนเริ่ม:"}</b> ${current ? current[2] : "เมื่อกดปุ่ม โค้ดทั้งสองฝั่งจะเพิ่มทีละขั้นพร้อมกัน"}`;
  }
  if (nextBtn) {
    nextBtn.disabled = visibleSteps === chapter.pair.length;
    nextBtn.textContent = visibleSteps === chapter.pair.length ? "ครบทุกขั้นแล้ว ✓" : visibleSteps ? "แสดงขั้นถัดไป →" : "แสดงขั้นแรก →";
  }
}

function render() {
  const current = chapter.pair[visibleSteps - 1];
  const normal = visibleSteps ? chapter.pair.slice(0, visibleSteps).map(step => step[0]).join("\n\n") : "# กดปุ่มเพื่อเริ่มดูโค้ดทีละขั้น";
  const library = visibleSteps ? chapter.pair.slice(0, visibleSteps).map(step => step[1]).join("\n\n") : "# กดปุ่มเพื่อเริ่มดูโค้ดทีละขั้น";
  const number = String(week + 1).padStart(2, "0");
  app.innerHTML = `<p class="chapter-kicker">WEEK ${number} · 2 HOURS · CHAPTER</p><h1 class="chapter-title">${chapter.title}</h1><p class="chapter-lede">${chapter.lead}</p><div class="chapter-meta"><span>อ่านเป็นบท</span><span>โค้ดทีละขั้น</span><span>Python เทียบ Library</span></div>
  <section class="section" id="goals"><p class="section-label">WHAT YOU WILL LEARN</p><h2>เมื่อจบบทนี้ คุณจะทำอะไรได้</h2><div class="goals">${chapter.goals.map(goal=>`<article class="goal"><b>${goal[0]}</b>${goal[1]}</article>`).join("")}</div></section>
  <section class="section" id="recap"><p class="section-label">REMEMBER BEFORE YOU CONTINUE</p><h2>ทบทวนโค้ดจากบทก่อน</h2><article class="recap"><h3>โค้ดนี้ยังอยู่กับเราเสมอ</h3><p>${chapter.recap}</p><pre><code>${escapeHtml(chapter.prior)}</code></pre></article></section>
  <section class="section" id="functions"><p class="section-label">FUNCTIONS IN THIS CHAPTER</p><h2>คำสั่งที่ต้องเข้าใจ</h2><div class="function-list">${chapter.funcs.map(f=>{
    const badgeText = f[2] || (f[0].includes("()") ? "Method" : f[0].includes(".") ? "Property" : "Syntax");
    const kindClass = badgeText.toLowerCase().includes("prop") ? "property" : badgeText.toLowerCase().includes("func") ? "function" : badgeText.toLowerCase().includes("method") ? "method" : "syntax";
    return `<article class="function-card"><div class="func-top"><code>${escapeHtml(f[0])}</code><span class="func-kind-badge badge-kind-${kindClass}">${badgeText}</span></div><p>${f[1]}</p></article>`;
  }).join("")}</div></section>
  <section class="section" id="visualize"><p class="section-label">VISUALIZE DATA FLOW</p><h2>แผนภาพการทำงานทีละก้าว (Interactive Diagram)</h2><p style="margin-bottom:12px;color:#475569;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><span>ทำความเข้าใจการไหลของข้อมูลและผลลัพธ์ของ Week นี้ แบบเห็นภาพทีละขั้นตอน (คลิก Node หรือบรรทัดโค้ดเพื่อสำรวจ)</span><a href="../data-sci-visualizer.html?week=${week+1}" target="_blank" style="font-size:0.88rem;color:#0284c7;font-weight:600;text-decoration:none;">เปิดแบบเต็มจอ ↗</a></p><div style="border-radius:16px;overflow:hidden;border:1px solid #cbd5e1;box-shadow:0 10px 25px rgba(0,0,0,0.06);background:#ffffff;"><iframe src="../data-sci-visualizer.html?week=${week+1}" style="width:100%;height:840px;border:none;" title="Data Flow Visualizer Week ${number}"></iframe></div></section>
  <section class="section" id="compare"><p class="section-label">ONE PROBLEM, TWO WAYS</p><h2>เขียนแบบปกติ เทียบกับใช้ Library</h2><p class="compare-intro">สองฝั่งทำโจทย์เดียวกัน จงดูว่าโค้ดปกติต้องจัดการอะไรเอง และ Library ลดงานส่วนใดให้เรา</p><div class="compare"><article class="code-side"><h3>${chapter.normal}</h3><pre class="${visibleSteps?"":"empty"}"><code>${escapeHtml(normal)}</code></pre></article><article class="code-side library"><h3>${chapter.library}</h3><pre class="${visibleSteps?"":"empty"}"><code>${escapeHtml(library)}</code></pre></article></div><div class="step-note"><b>${current?`ขั้นที่ ${visibleSteps}:`:"ก่อนเริ่ม:"}</b> ${current?current[2]:"เมื่อกดปุ่ม โค้ดทั้งสองฝั่งจะเพิ่มทีละขั้นพร้อมกัน"}</div><div class="actions"><button class="next" id="next" ${visibleSteps===chapter.pair.length?"disabled":""}>${visibleSteps===chapter.pair.length?"ครบทุกขั้นแล้ว ✓":visibleSteps?"แสดงขั้นถัดไป →":"แสดงขั้นแรก →"}</button><button class="reset" id="reset">เริ่มส่วนเปรียบเทียบใหม่</button></div></section>
  <section class="section" id="perspectives"><p class="section-label">THINK FROM MORE THAN ONE ANGLE</p><h2>มุมที่ต้องคิดเพิ่ม</h2><div class="perspectives">${chapter.views.map((view,i)=>`<article class="perspective ${i?"warn":""}"><h3>${view[0]}</h3><p>${view[1]}</p></article>`).join("")}</div></section>
  <section class="section" id="error"><p class="section-label">READ THE ERROR</p><h2>จุดที่มักพัง</h2><article class="error-box"><code>${escapeHtml(chapter.error)}</code><p><b>วิธีคิดก่อนแก้:</b> ${chapter.fix}</p></article></section>
  <section class="section challenge" id="challenge"><p class="section-label">PRACTICE</p><h2>Challenge ของ Week นี้</h2><p>${chapter.challenge}</p><ol><li>รันโค้ดแล้วดูผลหรือ Error ก่อน</li><li>เขียนคำตอบด้วยตัวเอง</li><li>ตรวจว่ารันจากบนลงล่างได้</li></ol><a href="../challenge/challenge_${week+1}.ipynb">เปิดไฟล์ Challenge ของ Week ${number}</a></section>
  <nav class="chapter-nav">${week?`<a href="week-${String(week).padStart(2,"0")}.html">← Week ${String(week).padStart(2,"0")}</a>`:""}${week<chapters.length-1?`<a href="week-${String(week+2).padStart(2,"0")}.html">Week ${String(week+2).padStart(2,"0")} →</a>`:""}</nav>`;

  document.querySelector("#next").addEventListener("click", () => {
    if (visibleSteps < chapter.pair.length) {
      visibleSteps += 1;
      updateCompare();
    }
  });
  document.querySelector("#reset").addEventListener("click", () => {
    visibleSteps = 0;
    updateCompare();
  });
}
render();
const toc = document.querySelector(".book-toc");
if (toc && !toc.querySelector("a[href='#visualize']")) {
  const compareLink = toc.querySelector("a[href='#compare']");
  const vizLink = document.createElement("a");
  vizLink.href = "#visualize";
  vizLink.textContent = "แผนภาพ Data Flow";
  if (compareLink) {
    toc.insertBefore(vizLink, compareLink);
  } else {
    toc.appendChild(vizLink);
  }
}
const apiGuideScript = document.createElement("script");
apiGuideScript.src = "../api-guide.js";
document.body.appendChild(apiGuideScript);
