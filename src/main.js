import "./main.scss";

// Styling för själva sidan
document.body.className =
  "bg-gray-100 flex items-center justify-center min-h-screen";

// Styling för "appen" OBS! 650 behöver lösas så ramen inte överskrids
const app = document.getElementById("app");
app.className = "bg-yellow-300 p-6 xrounded shadow h-[650px] max-w-md w-full";

// Skapa container för rubrik + knapp
const headerContainer = document.createElement("div");
headerContainer.className = "flex items-center mb-4";

// Skriv rubriken
const title = document.createElement("h1");
title.id = "merAttGora";
title.textContent = "mer att göra";
title.className = "text-4xl font-bold font-mono mb-2";

// Skapa knappen med ikon
const sortButton = document.createElement("button");
sortButton.className =
  "ml-auto flex items-center gap-2 p-2 rounded bg-transparent";
const sortIcon = document.createElement("img");
sortIcon.src = "/icons/up.svg";
sortIcon.className = "w-6 h-6";
sortButton.appendChild(sortIcon);

// Lägg rubrik och knapp i containern
headerContainer.appendChild(title);
headerContainer.appendChild(sortButton);

// Skapa listan här
const listElement = document.createElement("ul");
listElement.id = "todo-list";
listElement.className = "font-mono mt-4";
app.appendChild(listElement);

// Placera header-container ovanför listan
app.insertBefore(headerContainer, listElement);

// Variabel för sortering
let sortUp = true;

// Sorteringsknappen
sortButton.addEventListener("click", () => {
  sortUp = !sortUp; //Togglar sorteringen/ikonen
  sortIcon.src = sortUp ? "/icons/up.svg" : "/icons/down.svg";
  renderTodoList();
});

//Det här är inputfältet
const input = document.createElement("input");
input.type = "text";
input.className =
  "bg-white p-2 mt-4 block w-full xrounded focus:outline-none focus:ring-0";
listElement.parentNode.appendChild(input);

//det här är min grundlista
const todoList = {
  items: [
    { id: 1, text: "Lära mig Javascript", done: false },
    { id: 2, text: "Få Tailwind att funka", done: true },
    { id: 3, text: "Få Scss att funka", done: true },
    { id: 4, text: "Få Tailwind att funka på riktigt :(", done: false },
    { id: 5, text: "Göra en att-göra-app", done: false },
  ],
};

//nu sparar vi listan till localStorage
const saved = localStorage.getItem("todos");
if (saved) {
  todoList.items = JSON.parse(saved);
}

//nu ritar jag ut listan på skärmen
function renderTodoList() {
  const listElement = document.getElementById("todo-list");
  listElement.innerHTML = ""; // Töm listan först

  // Sortera listan ÄR DET DET HÄR SOM KNASAR?
  const sortedItems = [...todoList.items].sort((a, b) =>
    sortUp ? a.done - b.done : b.done - a.done
  );

  // Rita ut sorterade grejor
  sortedItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.text;
    li.className = item.done
      ? "font-mono text-red-500 mb-2"
      : "font-mono text-black mb-2";

    li.addEventListener("click", () => {
      item.done = !item.done; // toggla done
      localStorage.setItem("todos", JSON.stringify(todoList.items));
      renderTodoList();
    });

    listElement.appendChild(li);
  });
}

renderTodoList();

//det här är det som fixar en ny grej
function addTodoFromInput() {
  const text = input.value.trim();
  if (text === "") return;
  //id-t ska blir +1 från det sista
  const newId = todoList.items.length
    ? todoList.items[todoList.items.length - 1].id + 1
    : 1;

  todoList.items.push({ id: newId, text, done: false });

  //spara i local storage
  localStorage.setItem("todos", JSON.stringify(todoList.items));

  input.value = "";
  renderTodoList();
}

// Lägg till grej när man trycker Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodoFromInput();
  }
});
