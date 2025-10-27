import "./main.scss";

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
  const listElement = document.getElementById("todo-list");
  listElement.innerHTML = ""; // Töm listan så det inte blir dubbletter sen

  todoList.items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.text;
    li.className = item.done ? "text-red-500" : "text-black";

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

//Det här är inputfältet
const input = document.createElement("input");
input.type = "text";
input.className =
  "bg-white p-2 mt-2 block w-full border border-gray-300 rounded";

const listElement = document.getElementById("todo-list");
listElement.parentNode.appendChild(input);

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
