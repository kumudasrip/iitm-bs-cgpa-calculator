# IITM BS CGPA Calculator

A fully functional CGPA calculator and future grade prediction system for IIT Madras BS Degree programs.

---

## 🔗 Live Demo

https://iitm-bs-cgpa-calc.vercel.app/

---

## 🎯 Features

### Complete Program Support
- ✅ **BS in Data Science and Applications** - All Foundation, Diploma, and Degree courses
- ✅ **BS in Electronic Systems** - All Foundation, Diploma, and Degree courses
- ✅ **Accurate Credits** - All courses with correct credits including labs and projects

### Smart CGPA Calculations
- 📊 **Current CGPA** - Based on completed courses only
- 📈 **With Ongoing** - Includes current semester predictions
- 🎯 **Future Projection** - Plan ahead with hypothetical grades
- ⚡ **Real-time Updates** - CGPA updates instantly as you enter grades

### User-Friendly Features
- 🔒 **Pre-loaded Courses** - Official courses from both programs (non-editable)
- ➕ **Custom Courses** - Add your own courses with any credits
- 🗑️ **Remove Any Course** - Delete any course you don't need
- ℹ️ **Built-in Help** - Click the (i) button for usage instructions
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop

### Accurate Grading
- Uses official IITM grading formula: `CGPA = Σ(Grade Points × Credits) / Σ(Credits)`
- Grade scale: S=10, A=9, B=8, C=7, D=6, E=4, U=0
- Proper credit weighting for all calculations

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download here](https://nodejs.org/))
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kumudasrip/iitm-bs-cgpa-calculator.git
   cd iitm-bs-cgpa-calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Go to [http://localhost:3000](http://localhost:3000)
   - Start calculating your CGPA! 🎓

---


## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.4
- **Styling:** Tailwind CSS 3.4
- **UI:** Custom components with purple gradient theme
- **Logic:** 100% client-side (no backend required)

---


## 📖 How to Use

### 1. Select Your Program
- Choose between "BS in Data Science" or "BS in Electronic Systems"
- Select your level: Foundation / Diploma / Degree

### 2. Enter Your Grades
For each course:
- **Status:** Completed / Ongoing / Future
- **Grade:** S / A / B / C / D / E / U
- Pre-loaded courses have locked names (only custom courses are editable)

### 3. View Your CGPA
Three cards show:
- **Current CGPA:** Completed courses only
- **With Ongoing:** Including current semester
- **Future Projection:** With planned courses

### 4. Customize
- **Add Custom Course:** Click the button at bottom of table
- **Remove Courses:** Click trash icon for any course
- **Get Help:** Click (i) icon in top right corner

---

## 🔧 Development

### Project Structure
```
iitm-bs-cgpa-calculator/
├── app/
│   ├── CGPACalculator.tsx    # Main calculator component
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── package.json               # Dependencies
├── next.config.js             # Next.js config
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind config
└── README.md                  # This file
```

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```


## 🎓 CGPA Calculation Formula

The calculator uses the official IIT Madras formula:

```
CGPA = Σ(Grade Points × Credits) / Σ(Credits)
```

**Grade Points:**
- S = 10
- A = 9
- B = 8
- C = 7
- D = 6
- E = 4
- U = 0

**Example:**
| Course | Credits | Grade | Points | Weighted |
|--------|---------|-------|--------|----------|
| Math   | 4       | A (9) | 9      | 36       |
| English| 4       | B (8) | 8      | 32       |
| Python | 4       | S (10)| 10     | 40       |
| **Total** | **12** |   |        | **108**  |

**CGPA = 108 / 12 = 9.0**

---

## 🔒 Privacy & Data

- ✅ **No data collection** - Everything runs in your browser
- ✅ **No backend** - Pure client-side application
- ✅ **No tracking** - We don't track your usage
- ❌ **No data persistence** - Refresh clears all data


---

## 🎯 Use Cases

Perfect for:
- ✅ **Current students** planning their semester grades
- ✅ **Prospective students** exploring CGPA scenarios
- ✅ **Academic advisors** helping students
- ✅ **Alumni** calculating their historical CGPA

---

## 💡 Tips for Best Results

1. **Be realistic** with ongoing/future grades
2. **Update regularly** as you complete courses
3. **Try different scenarios** to see grade impact
4. **Focus on high-credit courses** - they affect CGPA more
5. **Plan ahead** - use Future Projection to set targets

---


## 🌟 Star This Repo!

If this calculator helped you, please give it a ⭐ on GitHub!

It helps others discover this tool.

---


## 📌 Important Notes

1. **This is unofficial** - Not affiliated with IIT Madras
2. **For reference only** - Always verify with official sources
3. **Formulas are accurate** - Based on Jan 2026 grading documents
4. **Credits may change** - Check official curriculum for updates
5. **Use responsibly** - This is a planning tool, not official record

---
## 📄 License

This project is open source and available for educational purposes.

---
<div align="center">

### Built for IITM BS Students

**Making academic planning easier!**

[⭐ Star on GitHub](https://github.com/kumudasrip/iitm-bs-cgpa-calculator) • 
[📖 Documentation](README.md) • 
[🐛 Report Bug](https://github.com/kumudasrip/iitm-bs-cgpa-calculator/issues)

---

*Formulas based on official IITM BS grading documents*

</div>
