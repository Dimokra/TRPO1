import { loadStudents } from "./data/studentDataHandler";
import { setupFormHandler } from "./HTMLactions/formHandler";

document.addEventListener("DOMContentLoaded", () => {
    loadStudents();
    setupFormHandler();
});
