
document.addEventListener("DOMContentLoaded", () => {
  // ==============================
  // Theme Toggle
  // ==============================
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent =
      document.body.classList.contains("dark")
        ? "🌞 Light Mode"
        : "🌙 Dark Mode";
  });

  // ==============================
  // Calculator Functionality
  // ==============================
  const display = document.getElementById("myTextbox");
  const buttons = document.querySelectorAll(".buttons button"); // only calc buttons
  const historyList = document.getElementById("history-list");

  // Add item to history
  function addToHistory(expression, result) {
    const li = document.createElement("li");
    li.textContent = `${expression} = ${result}`;
    historyList.prepend(li); // latest on top
  }

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const value = e.target.textContent;

      if (button.classList.contains("clear")) {
        // Clear all
        display.value = "";
      } else if (button.classList.contains("backspace")) {
        // Delete last char
        display.value = display.value.slice(0, -1);
      } else if (button.classList.contains("equal")) {
        // Evaluate expression
        try {
          const expression = display.value;
          const result = eval(expression);
          display.value = result;
          addToHistory(expression, result);
        } catch {
          display.value = "Error";
        }
      } else {
        // Append value
        display.value += value;
      }
    });
  });

  // ==============================
  // Keyboard Support (Optional)
  // ==============================
  document.addEventListener("keydown", (e) => {
    if ((e.key >= "0" && e.key <= "9") || ["+", "-", "*", "/", "."].includes(e.key)) {
      display.value += e.key;
    } else if (e.key === "Backspace") {
      display.value = display.value.slice(0, -1);
    } else if (e.key === "Enter") {
      try {
        const expression = display.value;
        const result = eval(expression);
        display.value = result;
        addToHistory(expression, result);
      } catch {
        display.value = "Error";
      }
    } else if (e.key === "Escape") {
      display.value = "";
    }
  });
});

