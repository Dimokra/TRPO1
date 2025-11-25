import { deleteStudent } from "../data/studentStore";
const tableBody = document.querySelector("#studentsTableBody");
export function renderStudents(list) {
    if (!tableBody)
        return;
    tableBody.innerHTML = "";
    list.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.getFIO()}</td>
            <td>${student.faculty}</td>
            <td>${student.getFormattedBirthday()}</td>
            <td>${student.getStudyPeriod()}</td>
            <td><button data-id="${student.id}" class="delete-btn">X</button></td>
        `;
        row.querySelector(".delete-btn").addEventListener("click", () => {
            deleteStudent(student.id);
            document.dispatchEvent(new Event("students-updated"));
        });
        tableBody.appendChild(row);
    });
}
//# sourceMappingURL=render.js.map