import { getStudents } from "../data/studentStore";
import { renderStudents } from "./render";
import { Student } from "../template/Student";

const fioInput = document.querySelector<HTMLInputElement>("#filterFIO");
const facultyInput = document.querySelector<HTMLInputElement>("#filterFaculty");
const startYearInput = document.querySelector<HTMLInputElement>("#filterStartYear");
const endYearInput = document.querySelector<HTMLInputElement>("#filterEndYear");

export function getFilteredStudents(): Student[] {
  let list = getStudents();

  const fio = fioInput?.value.trim().toLowerCase() || "";
  const faculty = facultyInput?.value.trim().toLowerCase() || "";
  const startY = startYearInput?.value.trim();
  const endY = endYearInput?.value.trim();

  if (fio) list = list.filter(s => (s.surname + " " + s.name + " " + s.lastname).toLowerCase().includes(fio));
  if (faculty) list = list.filter(s => s.faculty.toLowerCase().includes(faculty));
  if (startY) list = list.filter(s => s.studyStart === Number(startY));
  if (endY) list = list.filter(s => (s.studyStart + 4) === Number(endY));

  return list;
}

export function applyFiltersAndRender() {
  const list = getFilteredStudents();
  renderStudents(list);
}

export function initFilters() {
  [fioInput, facultyInput, startYearInput, endYearInput].forEach(input => {
    input?.addEventListener("input", () => {
      applyFiltersAndRender();
    });
  });
}
