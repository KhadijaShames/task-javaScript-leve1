document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Page Setup
  document.title = "My DOM Practice";
  document.body.style.backgroundColor = "lightblue";
  const h1 = document.querySelector("h1");
  if (h1) h1.textContent = "Welcome to DOM Practice!";

  // 2. Text Highlighter
  window.highlightText = function (color) {
    document.querySelectorAll("p").forEach(p => {
      p.style.backgroundColor = color;
    });
  };

  // 3. Live Text Mirror
  const firstP = document.querySelector("p");
  const label = document.createElement("label");
  label.textContent = "Type here: ";
  const input = document.createElement("input");
  const mirrorDiv = document.createElement("div");

  input.addEventListener("input", () => {
    mirrorDiv.textContent = input.value;
  });

  if (firstP) {
    firstP.after(label, input, mirrorDiv);
  }

  // 4. Simple List Builder
  const colors = ['Red', 'Blue', 'Green', 'Yellow'];
  const title = document.createElement("h3");
  title.textContent = "My Favorite Colors";
  const ul = document.createElement("ul");
  colors.forEach(color => {
    const li = document.createElement("li");
    li.textContent = color + " ";
    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.classList.add("delete-btn");
    li.appendChild(delBtn);
    ul.appendChild(li);
  });

  mirrorDiv.after(title, ul);

  // 6. Item Counter
  const counter = document.createElement("p");
  ul.after(counter);

  function updateCounter() {
    const items = ul.querySelectorAll("li");
    if (items.length > 0) {
      counter.textContent = `${items.length} items remaining`;
    } else {
      counter.textContent = "List is empty!";
    }
  }
  updateCounter();

  // 5. Delete Buttons with Event Delegation
  ul.addEventListener("click", e => {
    if (e.target.classList.contains("delete-btn")) {
      const li = e.target.closest("li");
      if (li) {
        li.remove();
        updateCounter();
      }
    }
  });

  // 7. Show/Hide Panels
  for (let i = 1; i <= 3; i++) {
    const header = document.createElement("h4");
    header.textContent = `Section ${i}`;
    header.style.cursor = "pointer";
    const panel = document.createElement("div");
    panel.textContent = `This is the content of Section ${i}`;
    panel.classList.add("hidden");

    header.addEventListener("click", () => {
      document.querySelectorAll("div").forEach(div => {
        if (div.classList.contains("visible")) {
          div.classList.remove("visible");
          div.classList.add("hidden");
        }
      });
      if (panel.classList.contains("hidden")) {
        panel.classList.remove("hidden");
        panel.classList.add("visible");
      } else {
        panel.classList.remove("visible");
        panel.classList.add("hidden");
      }
    });

    counter.after(header, panel);
  }

  // 8. Simple Notifications
  window.showMessage = function (text) {
    const note = document.createElement("div");
    note.className = "notification";
    note.textContent = text;
    document.body.appendChild(note);
    setTimeout(() => {
      note.style.opacity = 0;
      setTimeout(() => note.remove(), 1000);
    }, 3000);
  };

  // 9. Light/Dark Mode
  const themeBtn = document.createElement("button");
  document.body.appendChild(themeBtn);
  let darkMode = localStorage.getItem("darkMode") === "true";

  function applyTheme() {
    if (darkMode) {
      document.body.style.backgroundColor = "#111";
      document.body.style.color = "#eee";
      themeBtn.textContent = "Light Mode";
    } else {
      document.body.style.backgroundColor = "lightblue";
      document.body.style.color = "black";
      themeBtn.textContent = "Dark Mode";
    }
    localStorage.setItem("darkMode", darkMode);
  }

  themeBtn.addEventListener("click", () => {
    darkMode = !darkMode;
    applyTheme();
  });

  applyTheme();
});
