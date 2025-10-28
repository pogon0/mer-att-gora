import "./main.scss";
//styling för sidan
document.body.className =
  "bg-gray-100 flex items-center justify-center min-h-screen";

//styling för "appen"
const app = document.getElementById("app");
app.className = "bg-yellow-300 p-6 rounded shadow h-[650px] max-w-md w-full";

//här kommer rubben
const title = document.createElement("h1");
title.id = "merAttGora";
title.textContent = "mer att göra";
title.className = "text-4xl font-bold font-mono mb-2";
app.appendChild(title);

//här gör vi ul:en till listan
const listElement = document.createElement("ul");
listElement.id = "todo-list";
listElement.className = "font-mono mt-4";
app.appendChild(listElement);

//Det här är inputfältet
const input = document.createElement("input");
input.type = "text";
input.className =
  "bg-white p-2 mt-4 block w-full rounded focus:outline-none focus:ring-0";
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

//nu ritar jag ut den på skärmen
function renderTodoList() {
  const listElement = document.getElementById("todo-list"); //knas
  listElement.innerHTML = ""; // Töm listan så det inte blir dubbletter sen

  todoList.items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.text;
    li.className = item.done
      ? "font-mono text-red-500 mb-2"
      : "font-mono text-black mb-2";
    li.addEventListener("click", () => {
      //   li.style.display = "none"; // döljer raden om jag klickar på den

      item.done = !item.done; // toggla done
      //   todoList.items = todoList.items.filter((i) => i.id !== item.id);

      //   li.className = item.done ? "text-red-500" : "text-black";
      //   item.done = !item.done; // toggla done (det här togglar färgen)
      renderTodoList(); // rita om listan
    });

    listElement.appendChild(li);
  });
}
renderTodoList();

function addTodoFromInput() {
  const text = input.value.trim();
  if (text === "") return;
  //id-t ska blir +1 från det sista
  const newId = todoList.items.length
    ? todoList.items[todoList.items.length - 1].id + 1
    : 1;

  todoList.items.push({ id: newId, text, done: false });

  input.value = "";
  renderTodoList();
}

// Lägg till grej när man trycker Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodoFromInput();
  }
});
