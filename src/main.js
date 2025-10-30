import "./main.scss";

// Styling för själva sidan
document.body.className =
  "bg-black flex items-center justify-center min-h-screen";

// Fixar styling för "appen"
const app = document.getElementById("app");
app.className = "bg-yellow-300 p-6 min-h-[650px] max-w-md w-full";

// Skapar container för rubrik och knapp i DOM
const headerContainer = document.createElement("div");
headerContainer.className = "flex items-center mb-4";

// Skapar rubriken i DOM
const title = document.createElement("h1");
title.id = "merAttGora";
title.textContent = "mer att göra";
title.className = "text-4xl font-bold font-mono mb-2";

// Skapar sorterings-knappen med ikon
const sortButton = document.createElement("button");
sortButton.className = "ml-auto flex items-center gap-2 p-2 bg-transparent";
const sortIcon = document.createElement("img");
sortIcon.src = "/icons/up.svg";
sortIcon.className = "w-6 h-6";
sortButton.appendChild(sortIcon);

// Lägger till rubrik och sorterings-knapp i containern
headerContainer.appendChild(title);
headerContainer.appendChild(sortButton);

// Skapar listan i DOM
const listElement = document.createElement("ul");
listElement.id = "todo-list";
listElement.className = "font-mono mt-4";
app.appendChild(listElement);

// Placera header-container ovanför listan
app.insertBefore(headerContainer, listElement);

// Sorteringsknappen
let sortUp = true;
sortButton.addEventListener("click", () => {
  sortUp = !sortUp;
  sortIcon.src = sortUp ? "/icons/up.svg" : "/icons/down.svg";
  todoList.items.sort((a, b) => (sortUp ? a.done - b.done : b.done - a.done));
  localStorage.setItem("todos", JSON.stringify(todoList.items));
  renderTodoList();
});

// Nya inputfältet
//Gör en kontainer
const inputContainer = document.createElement("div");
inputContainer.className = "relative mt-4 w-full";

//Gör plus-knappen
const addButton = document.createElement("button");
addButton.className = "absolute left-2 top-1/2 -translate-y-1/2";
const addIcon = document.createElement("img");
addIcon.src = "/icons/plus.svg";
addIcon.className = "w-6 h-6";
addButton.appendChild(addIcon);

//Gör inputfältet
const input = document.createElement("input");
input.type = "text";
input.className =
  "bg-white pl-10 pr-3 py-2 block w-full focus:outline-none focus:ring-0";

//Sätt ihop och rita ut
inputContainer.appendChild(addButton);
inputContainer.appendChild(input);
app.appendChild(inputContainer);

//Knapptryckning
addButton.addEventListener("click", () => {
  addTodoFromInput();
});

//Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodoFromInput();
  }
});

//Lägg till en ny grej
function addTodoFromInput() {
  const text = input.value.trim();
  if (text === "") return;
  //id-t ska bli +1 från det sista
  const newId = todoList.items.length
    ? todoList.items[todoList.items.length - 1].id + 1
    : 1;

  todoList.items.push({ id: newId, text, done: false });

  //Sparar i local storage
  localStorage.setItem("todos", JSON.stringify(todoList.items));

  input.value = "";
  renderTodoList();
}

//Skapa min grundlista
const todoList = {
  items: [
    { id: 1, text: "Lära mig Javascript", done: false },
    { id: 2, text: "Få Tailwind att funka", done: true },
    { id: 3, text: "Få Scss att funka", done: true },
    { id: 4, text: "Få Tailwind att funka på riktigt :(", done: false },
    { id: 5, text: "Göra en att-göra-app", done: false },
  ],
};

//Funktionen för redigering och radering
//Gör ikonerna
function createLeftIcons(editContainer, editInput, item, li) {
  //Gör plusknappen
  const plusButton = document.createElement("button");
  plusButton.className = "absolute left-2 top-1/2 -translate-y-1/2";
  const plusIcon = document.createElement("img");
  plusIcon.src = "/icons/plus.svg";
  plusIcon.className = "w-6 h-6";
  plusButton.appendChild(plusIcon);

  //Klick plus funkar som enter här
  plusButton.addEventListener("click", () => {
    const newText = editInput.value.trim();
    if (newText === "") return;
    item.text = newText;
    localStorage.setItem("todos", JSON.stringify(todoList.items));
    renderTodoList();
  });

  //Gör minusknappen
  const minusButton = document.createElement("button");
  minusButton.className = "absolute left-10 top-1/2 -translate-y-1/2";
  const minusIcon = document.createElement("img");
  minusIcon.src = "/icons/minus.svg";
  minusIcon.className = "w-6 h-6";
  minusButton.appendChild(minusIcon);

  // Klick minus tar bort objektet
  minusButton.addEventListener("click", () => {
    todoList.items = todoList.items.filter((i) => i.id !== item.id);
    localStorage.setItem("todos", JSON.stringify(todoList.items));
    li.remove();
  });

  //Lägg till knapparna
  editContainer.appendChild(plusButton);
  editContainer.appendChild(minusButton);
}

//Spara listan till localStorage
const saved = localStorage.getItem("todos");
if (saved) {
  todoList.items = JSON.parse(saved);
}

//Rendera lista v3 nu med redigeringen
function renderTodoList() {
  const listElement = document.getElementById("todo-list");
  listElement.innerHTML = ""; //Tömmer listan

  todoList.items.forEach((item) => {
    if (!item.text || item.text.trim() === "") return; // trimma tomma rader
    const li = document.createElement("li");
    li.dataset.id = item.id;
    li.className = "flex items-baseline gap-2 mb-2 font-mono";

    const icon = document.createElement("img");
    icon.src = item.done ? "/icons/done.svg" : "/icons/todo.svg";
    icon.className = "w-3 h-3";

    // Klick på ikonen växlar status
    icon.addEventListener("click", () => {
      item.done = !item.done;
      localStorage.setItem("todos", JSON.stringify(todoList.items));
      icon.src = item.done ? "/icons/done.svg" : "/icons/todo.svg";
    });

    // Lägg till text
    const text = document.createElement("span");
    text.textContent = item.text;
    text.className = "todo-text";

    // Lägg ihop ikonerna och texten
    li.appendChild(icon);
    li.appendChild(text);

    //Klicka på raden för att redigera

    text.addEventListener("click", () => {
      const existing = li.querySelector(".edit-container");
      const editContainer = document.createElement("div");
      editContainer.className = "edit-container relative mt-2 w-full";
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = item.text;
      editInput.className =
        "bg-white pl-[72px] py-2 block w-full focus:outline-none focus:ring-0";

      // Inputrutan
      editContainer.appendChild(editInput);
      text.style.display = "none";
      icon.style.display = "none";
      li.insertBefore(editContainer, li.firstChild);
      editInput.focus();

      // Ny lösning för att undvika dubbla rutor med fungerande knappar
      editInput.addEventListener("blur", (e) => {
        if (e.relatedTarget && editContainer.contains(e.relatedTarget)) return;
        editContainer.remove();
        text.style.display = "";
        icon.style.display = "";
      });

      createLeftIcons(editContainer, editInput, item, li);

      //Enter sparar och stänger
      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const newText = editInput.value.trim();
          if (newText === "") return;
          item.text = newText;
          localStorage.setItem("todos", JSON.stringify(todoList.items));
          text.style.display = "";
          icon.style.display = "";
          renderTodoList();
        }
      });

      // Escape stänger edit-rutan utan att spara
      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          editContainer.remove();
          text.style.display = "";
          icon.style.display = "";
        }
      });
    });
    // Lägg li i listElement
    listElement.appendChild(li);
  });
}

renderTodoList();
