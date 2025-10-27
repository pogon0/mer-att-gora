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
      todoList.items = todoList.items.filter((i) => i.id !== item.id);

      //   li.className = item.done ? "text-red-500" : "text-black";
      //   item.done = !item.done; // toggla done (det här togglar färgen)
      renderTodoList(); // rita om listan
    });

    listElement.appendChild(li);
  });
}
renderTodoList();

//Skapa en hårdkodad lista med punkter att göra.
//Presentera denna på skärmen, helst med lite kontroll.
//Detta betyder i en html-struktur t.ex. i en ul/li-lista
//Implementera klickhändelse för att hantera borttagandet av en todo.
//Todo tas bort från skärmen och markeras som klar i javascript-listan.
//Implementera tailwind eller liknande för stylingen
//VG
//Kunna visa även klara händelser och klicka tillbaka den så att de blir oklara igen.
//Skapa ett formulär som tillåter att en användare skapar nya todos efterhand.
//Kunna sortera ordningen på dina todos
