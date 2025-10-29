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

// Deklarerar variabel för sortering
let sortUp = true;

// Sorteringsknappen
sortButton.addEventListener("click", () => {
  sortUp = !sortUp;
  sortIcon.src = sortUp ? "/icons/up.svg" : "/icons/down.svg";
  todoList.items.sort((a, b) => (sortUp ? a.done - b.done : b.done - a.done));
  localStorage.setItem("todos", JSON.stringify(todoList.items));
  renderTodoList();
});

// nya inputfältet
//Gör en kontainer
const inputContainer = document.createElement("div");
inputContainer.className = "relative mt-4 w-full";

//fixa knappen
const addButton = document.createElement("button");
addButton.className = "absolute left-2 top-1/2 -translate-y-1/2";
const addIcon = document.createElement("img");
addIcon.src = "/icons/plus.svg";
addIcon.className = "w-6 h-6";
addButton.appendChild(addIcon);

//inputfältet
const input = document.createElement("input");
input.type = "text";
input.className =
  "bg-white pl-10 pr-3 py-2 block w-full focus:outline-none focus:ring-0";

//sätt ihop
inputContainer.appendChild(addButton);
inputContainer.appendChild(input);
app.appendChild(inputContainer);

//Knapptryckning
addButton.addEventListener("click", () => {
  addTodoFromInput();
});

// Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodoFromInput();
  }
});

//Fixar en ny grej
function addTodoFromInput() {
  const text = input.value.trim();
  if (text === "") return;
  //id-t ska blir +1 från det sista
  const newId = todoList.items.length
    ? todoList.items[todoList.items.length - 1].id + 1
    : 1;

  todoList.items.push({ id: newId, text, done: false });

  //Sparar i local storage
  localStorage.setItem("todos", JSON.stringify(todoList.items));

  input.value = "";
  renderTodoList();
}

// //Gamla inputfältet
// const input = document.createElement("input");
// input.type = "text";
// input.className =
//   "bg-white p-2 mt-4 block w-full focus:outline-none focus:ring-0";
// listElement.parentNode.appendChild(input);

//Skapar min grundlista
const todoList = {
  items: [
    { id: 1, text: "Lära mig Javascript", done: false },
    { id: 2, text: "Få Tailwind att funka", done: true },
    { id: 3, text: "Få Scss att funka", done: true },
    { id: 4, text: "Få Tailwind att funka på riktigt :(", done: false },
    { id: 5, text: "Göra en att-göra-app", done: false },
  ],
};

//Spara listan till localStorage
const saved = localStorage.getItem("todos");
if (saved) {
  todoList.items = JSON.parse(saved);
}

//Ritar ut listan på skärmen
function renderTodoList() {
  const listElement = document.getElementById("todo-list");
  listElement.innerHTML = ""; // Töm listan först

  todoList.items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.text;
    li.dataset.id = item.id;
    li.className = item.done
      ? "font-mono text-red-500 mb-2"
      : "font-mono text-black mb-2";

    li.addEventListener("click", () => {
      item.done = !item.done;
      localStorage.setItem("todos", JSON.stringify(todoList.items));
      li.className = item.done
        ? "font-mono text-red-500 mb-2"
        : "font-mono text-black mb-2";
    });

    listElement.appendChild(li);
  });
}

renderTodoList();
