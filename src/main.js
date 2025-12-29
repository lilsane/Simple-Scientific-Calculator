import './style.css';

class Calculator {
  constructor() {
    this.historyElement = document.getElementById('history');
    this.displayElement = document.getElementById('display');
    this.currentInput = '0';
    this.history = '';
    this.shouldResetScreen = false;

    this.init();
  }

  init() {
    const keys = document.querySelectorAll('button');
    keys.forEach(key => {
      key.addEventListener('click', (e) => this.handleKeyPress(e));

      // Ripple effect
      key.addEventListener('mousedown', (e) => this.createRipple(e, key));
    });

    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  handleKeyPress(e) {
    const target = e.target.closest('button');
    if (!target) return;

    if (target.dataset.num) {
      this.appendNumber(target.dataset.num);
    } else if (target.dataset.action) {
      this.handleAction(target.dataset.action);
    }
  }

  handleKeyboard(e) {
    if ((e.key >= 0 && e.key <= 9) || e.key === '.') this.appendNumber(e.key);
    if (e.key === '=' || e.key === 'Enter') this.calculate();
    if (e.key === 'Backspace') this.deleteLast();
    if (e.key === 'Escape') this.clearAll();
    if (['+', '-', '*', '/', '(', ')'].includes(e.key)) this.appendOperator(e.key);
  }

  createRipple(e, button) {
    const rect = button.getBoundingClientRect();
    // Logic handled by CSS :active mostly, but we can enhance if needed.
    // CSS :active::after is good enough for simple ripple without JS overhead.
  }

  appendNumber(number) {
    if (this.currentInput === '0' || this.shouldResetScreen) {
      this.currentInput = '';
      this.shouldResetScreen = false;
    }
    // Prevent multiple dots
    if (number === '.' && this.currentInput.includes('.')) return;

    this.currentInput += number;
    this.updateDisplay();
  }

  appendOperator(operator) {
    this.shouldResetScreen = false;
    // Map visual operators to code operators if needed, but handled by replacing in calculate usually
    // Or just append to string
    if (this.currentInput === '0' && operator !== '-') {
      // Allow starting with - negative number, otherwise replace 0
      if (operator !== '(' && operator !== 'pd') { // pd = placeholder
        // Actually, usually we just append.
      }
    }
    this.currentInput += operator;
    this.updateDisplay();
  }

  handleAction(action) {
    switch (action) {
      case 'clear-all':
        this.clearAll();
        break;
      case 'clear-entry':
        this.clearEntry();
        break;
      case 'calculate':
        this.calculate();
        break;
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'sqrt':
        this.appendFunction(action);
        break;
      case 'pow':
        this.currentInput += '^'; // Will need replacement
        this.updateDisplay();
        break;
      case 'pi':
        this.currentInput = this.currentInput === '0' ? 'pi' : this.currentInput + 'pi';
        this.updateDisplay();
        break;
      case 'e':
        this.currentInput = this.currentInput === '0' ? 'e' : this.currentInput + 'e';
        this.updateDisplay();
        break;
      default:
        // Operators like (, )
        this.appendOperator(action);
    }
  }

  appendFunction(funcName) {
    if (this.currentInput === '0' || this.shouldResetScreen) {
      this.currentInput = '';
      this.shouldResetScreen = false;
    }
    this.currentInput += `${funcName}(`;
    this.updateDisplay();
  }

  clearAll() {
    this.currentInput = '0';
    this.history = '';
    this.historyElement.textContent = '';
    this.updateDisplay();
  }

  clearEntry() {
    this.currentInput = '0';
    this.updateDisplay();
  }

  deleteLast() {
    this.currentInput = this.currentInput.toString().slice(0, -1);
    if (this.currentInput === '') this.currentInput = '0';
    this.updateDisplay();
  }

  calculate() {
    try {
      this.history = this.currentInput;
      this.historyElement.textContent = this.history;

      // Sanitize and replace
      let expression = this.currentInput
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10') // Standard log is usually base 10 on calculators, or ln? Math.log is ln. Let's use log10
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/pi/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/\^/g, '**');

      // Add multiply if missing before brackets e.g. 5(2) -> 5*(2)
      // expression = expression.replace(/(\d)\(/g, '$1*('); // Simple regex, might need more robust

      const result = new Function('return ' + expression)();

      if (!isFinite(result) || isNaN(result)) {
        this.currentInput = 'Error';
      } else {
        // Round to avoid floating point errors
        this.currentInput = String(Math.round(result * 1000000000) / 1000000000);
      }

      this.shouldResetScreen = true;
      this.updateDisplay();

      // Animation for result
      this.displayElement.animate([
        { transform: 'scale(1.1)', color: '#fff' },
        { transform: 'scale(1)', color: '#fff' }
      ], {
        duration: 300,
        easing: 'ease-out'
      });

    } catch (error) {
      this.currentInput = 'Error';
      this.updateDisplay();
    }
  }

  updateDisplay() {
    this.displayElement.textContent = this.currentInput;
    // Auto scroll if needed?
    this.displayElement.scrollLeft = this.displayElement.scrollWidth;
  }
}

new Calculator();
