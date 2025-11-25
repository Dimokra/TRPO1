import "./style/main.css"
import { loadStudents, getStudents } from "./data/studentStore";
import { renderStudents } from "./HTMLactions/render";
import { initFilters, applyFiltersAndRender } from "./HTMLactions/filters";
import { initSorting } from "./HTMLactions/sorting";
import { initFormHandler } from "./HTMLactions/formHandler";

console.log("SCRIPT LOADED");

async function init() {
  await loadStudents();

  renderStudents(getStudents());
  initFilters();
  initSorting();
  initFormHandler();
  document.addEventListener("students-updated", () => {
    applyFiltersAndRender();
  });

  applyFiltersAndRender();
}

document.addEventListener("DOMContentLoaded", init);
