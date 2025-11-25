import { getStudents } from "../data/studentStore";
import { renderStudents } from "./render";
const fioInput = document.querySelector("#filterFIO");
const facultyInput = document.querySelector("#filterFaculty");
const startYearInput = document.querySelector("#filterStartYear");
const endYearInput = document.querySelector("#filterEndYear");
export function applyFilters() {
    let list = getStudents();
    const fio = (fioInput === null || fioInput === void 0 ? void 0 : fioInput.value.trim().toLowerCase()) || "";
    const faculty = (facultyInput === null || facultyInput === void 0 ? void 0 : facultyInput.value.trim().toLowerCase()) || "";
    const startY = startYearInput === null || startYearInput === void 0 ? void 0 : startYearInput.value.trim();
    const endY = endYearInput === null || endYearInput === void 0 ? void 0 : endYearInput.value.trim();
    if (fio)
        list = list.filter(s => s.getFIO().toLowerCase().includes(fio));
    if (faculty)
        list = list.filter(s => s.faculty.toLowerCase().includes(faculty));
    if (startY)
        list = list.filter(s => s.studyStart === Number(startY));
    if (endY)
        list = list.filter(s => s.studyStart + 4 === Number(endY));
    renderStudents(list);
}
export function initFilters() {
    [fioInput, facultyInput, startYearInput, endYearInput].forEach(input => {
        input === null || input === void 0 ? void 0 : input.addEventListener("input", applyFilters);
    });
}
//# sourceMappingURL=filters.js.map