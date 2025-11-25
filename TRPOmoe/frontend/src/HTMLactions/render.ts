
import { Student } from "../template/Student";

const studentTableBody = document.querySelector<HTMLTableSectionElement>("#studentsTableBody");

export function renderStudentRow(student: Student) {
    if (!studentTableBody) return;

    studentTableBody.insertAdjacentHTML(
        "beforeend",
        `
        <tr>
            <td>${student.id ?? ""}</td>
            <td>${student.name}</td>
            <td>${student.surname}</td>
            <td>${student.lastname}</td>
            <td>${student.birthday.toLocaleDateString()}</td>
            <td>${student.getAge()}</td>
            <td>${student.faculty}</td>
            <td>
                <button data-id="${student.id}" class="delete-student">Удалить</button>
            </td>
        </tr>
        `
    );
}
