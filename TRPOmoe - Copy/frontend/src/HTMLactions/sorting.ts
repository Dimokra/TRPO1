import { getFilteredStudents } from "./filters";
import { renderStudents } from "./render";
import { getStudents } from "../data/studentStore";

type SortOrder = "asc" | "desc" | null;

const sortState: { field: string | null; order: SortOrder } = { field: null, order: null };

export function initSorting() {
  const headers = document.querySelectorAll<HTMLTableCellElement>("th.sortable");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const field = header.dataset.field || null;
      if (!field) return;

      if (sortState.field === field) {
        sortState.order = sortState.order === "asc" ? "desc" : "asc";
      } else {
        sortState.field = field;
        sortState.order = "asc";
      }

      applySortAndRender();
      updateHeaderUI();
    });
  });
}

function applySortAndRender() {
  let list = getFilteredStudents();

  if (!sortState.field || !sortState.order) {
    renderStudents(list);
    return;
  }

  const field = sortState.field;
  const order = sortState.order === "asc" ? 1 : -1;

  const sorted = [...list].sort((a: any, b: any) => {
    switch (field) {
      case "id":
        return (a.id - b.id) * order;
      case "name":
        return a.name.localeCompare(b.name) * order;
      case "surname":
        return a.surname.localeCompare(b.surname) * order;
      case "lastname":
        return a.lastname.localeCompare(b.lastname) * order;
      case "birthday":
        return (a.birthday.getTime() - b.birthday.getTime()) * order;
      case "age":
        return (a.getAge() - b.getAge()) * order;
      case "faculty":
        return a.faculty.localeCompare(b.faculty) * order;
      case "studyStart":
        return (a.studyStart - b.studyStart) * order;
      default:
        return 0;
    }
  });

  renderStudents(sorted);
}

function updateHeaderUI() {
  const headers = document.querySelectorAll<HTMLTableCellElement>("th.sortable");
  headers.forEach(h => {
    const field = h.dataset.field || "";
    if (sortState.field === field) {
      h.classList.add("sorted");
      h.dataset.order = sortState.order || "";
    } else {
      h.classList.remove("sorted");
      delete h.dataset.order;
    }
  });
}

export function resetSorting() {
  sortState.field = null;
  sortState.order = null;
  applySortAndRender();
}
