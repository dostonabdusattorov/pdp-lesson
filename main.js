const DATA = {
  developers: [
    {
      id: Math.random().toString(),
      name: "Doston Abdusattorov",
      tasks: [
        {
          id: Math.random().toString(),
          name: "Learn something new!",
          status: "todo",
        },
        {
          id: Math.random().toString(),
          name: "Learn something new!",
          status: "todo",
        },
      ],
    },
    {
      id: Math.random().toString(),
      name: "Samandar Boymurodov",
      tasks: [
        {
          id: Math.random().toString(),
          name: "Prepare for interview",
          status: "todo",
        },
      ],
    },
  ],
};

// ELEMENTS
const addDeveloperForm = document.querySelector("#add-developer-form");
const addDeveloperInput = document.querySelector("#add-developer-input");
const developerList = document.querySelector("#developer-list");
const searchDeveloperInput = document.querySelector("#search-developer-input");
const developerName = document.querySelector("#developer-name");
const todoTaskList = document.querySelector("#todo-task-list");
const inprogressTaskList = document.querySelector("#inprogress-task-list");
const doneTaskList = document.querySelector("#done-task-list");

let dragOverTaskStatus = null;

// EVENT_METHODS_1
const developerSelectionHandler = (developerId) => {
  const selectedDeveloper = DATA.developers.find(
    (developer) => developer.id === developerId
  );
  developerName.innerHTML = selectedDeveloper.name;

  todoTaskList.innerHTML = "";
  inprogressTaskList.innerHTML = "";
  doneTaskList.innerHTML = "";

  selectedDeveloper.tasks.forEach((task) => {
    const itemTaskElement = document.createElement("li");
    itemTaskElement.innerHTML = `
      <li class="task-card" draggable="true">
        <p>${task.name}</p>
      </li>
    `;

    itemTaskElement.addEventListener("dragend", () => {
      DATA.developers = DATA.developers.map((item) => {
        if (item.id !== selectedDeveloper.id) {
          return item;
        }

        if (dragOverTaskStatus) {
          const updatedTaskList = item.tasks.map((x) => {
            if (x.id !== task.id) {
              return x;
            }

            return { ...x, status: dragOverTaskStatus };
          });
          dragOverTaskStatus = null;
          return { ...item, tasks: updatedTaskList };
        } else {
          return item;
        }
      });
      console.log(DATA);

      developerSelectionHandler(developerId);
    });

    if (task.status === "todo") {
      todoTaskList.appendChild(itemTaskElement);
    }

    if (task.status === "inprogress") {
      inprogressTaskList.appendChild(itemTaskElement);
    }

    if (task.status === "done") {
      doneTaskList.appendChild(itemTaskElement);
    }
  });
};

const dragOverHandler = (status) => {
  dragOverTaskStatus = status;
};

// RENDER_METHODS
const renderDeveloperList = (list, text) => {
  developerList.innerHTML = "";
  const searchedList = list.filter((item) =>
    item.name.toLowerCase().includes(text.toLowerCase())
  );

  if (searchedList.length > 0) {
    searchedList.forEach((item) => {
      const itemElement = document.createElement("li");
      itemElement.innerHTML = `
      <li>
        <p>${item.name}</p>
      </li>
    `;
      itemElement.addEventListener("click", () => {
        developerSelectionHandler(item.id);
      });
      developerList.appendChild(itemElement);
    });
  } else {
    const itemElement = document.createElement("li");
    itemElement.innerHTML = `
      <li>
        <p>not found!</p>
      </li>
    `;
    developerList.appendChild(itemElement);
  }
};

// INPUT_VALUES_SETUP
let addDeveloperInputValue = "";
addDeveloperInput.addEventListener("keyup", (event) => {
  addDeveloperInputValue = event.target.value;
});

let searchDeveloperInputValue = "";
searchDeveloperInput.addEventListener("keyup", (event) => {
  searchDeveloperInputValue = event.target.value;
  renderDeveloperList(DATA.developers, searchDeveloperInputValue);
});

// EVENT_METHODS_2_AND_BINDING
addDeveloperForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (addDeveloperInputValue.length === 0) {
    return;
  }

  const newDeveloper = {
    id: Math.random().toString(),
    name: addDeveloperInputValue,
    tasks: [],
  };

  DATA.developers = [newDeveloper, ...DATA.developers];
  renderDeveloperList(DATA.developers, searchDeveloperInputValue);
  addDeveloperInput.value = "";
  addDeveloperInputValue = "";
});

todoTaskList.addEventListener("dragover", (event) => {
  event.preventDefault();
  dragOverHandler("todo");
});
inprogressTaskList.addEventListener("dragover", (event) => {
  event.preventDefault();
  dragOverHandler("inprogress");
});
doneTaskList.addEventListener("dragover", (event) => {
  event.preventDefault();
  dragOverHandler("done");
});

// ON_INIT
renderDeveloperList(DATA.developers, searchDeveloperInputValue);
