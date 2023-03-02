const DATA = {
  developers: [
    {
      id: Math.random().toString(),
      name: "Doston Abdusattorov",
      tasks: [
        {
          id: Math.random().toString(),
          name: "Learn something new!",
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
