# Simple Scientific Calculator

A sleek, modern scientific calculator built with a "glassmorphism" aesthetic. This project is a lightweight, mobile-responsive web application that supports standard arithmetic and common scientific functions.

## 🚀 Features

* **Glassmorphism UI**: A beautiful, translucent design with backdrop filters and floating animations.
* **Scientific Functions**: Support for trigonometric functions (`sin`, `cos`, `tan`), logarithmic calculations (`log`), square roots (`√`), and exponents (`x^y`).
* **Constants**: Quick access to Mathematical constants like  and .
* **Responsive Design**: Mobile-first layout that scales beautifully from small screens to desktops.
* **Keyboard Support**: Fully functional keyboard shortcuts for numbers, operators, and actions (Enter for equals, Esc for clear).
* **History Tracking**: Displays the previous expression above the current input for better context.

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3, and Vanilla JavaScript.
* **Build Tool**: [Vite](https://vitejs.dev/) for fast development and optimized bundling.
* **Styling**: Custom CSS with CSS Variables for easy theme management.

## 📂 Project Structure

```text
├── public/
│   └── vite.svg           # Project icon
├── src/
│   ├── main.js            # Core calculator logic and event handling
│   ├── style.css          # Glassmorphism styling and animations
│   └── counter.js         # Default Vite counter component
├── index.html             # Main entry point and calculator layout
├── package.json           # Dependencies and scripts
└── .gitignore             # Standard git exclusion rules

```

## ⚡ Getting Started

1. **Clone the repository**:
```bash
git clone <repository-url>

```


2. **Install dependencies**:
```bash
npm install

```


3. **Run in development mode**:
```bash
npm run dev

```


4. **Build for production**:
```bash
npm run build

```



## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `0-9` | Input Numbers |
| `.` | Decimal Point |
| `+`, `-`, `*`, `/` | Basic Operators |
| `(`, `)` | Brackets |
| `Enter` / `=` | Calculate Result |
| `Backspace` | Delete last character |
| `Escape` | Clear All (AC) |

## 📝 Implementation Details

The calculator uses a `Calculator` class to manage state, including the `currentInput` and `history`. Calculations are performed by sanitizing the user string and evaluating it as a JavaScript mathematical expression, with safety checks for `NaN` and infinite results. Floating-point errors are mitigated by rounding results to 9 decimal places.
