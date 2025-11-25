import { Student } from "../template/Student";
import { deleteStudent } from "../data/studentStore";

const tableBody = document.querySelector<HTMLTableSectionElement>("#studentsTableBody");

function createRow(student: Student) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${student.id}</td>
    <td>${student.name}</td>
    <td>${student.surname}</td>
    <td>${student.lastname}</td>
    <td>${student.birthday.toLocaleDateString()}</td>
    <td>${student.getAge()}</td>
    <td>${student.faculty}</td>
    <td><button class="delete-btn" data-id="${student.id}">Удалить</button></td>
  `;

  const btn = tr.querySelector(".delete-btn") as HTMLButtonElement | null;
  btn?.addEventListener("click", async () => {
    const id = Number(btn.dataset.id);
    try {
      await deleteStudent(id);
    } catch (err) {
      console.error(err);
      alert("Ошибка при удалении студента");
    }
  });

  return tr;
}

export function renderStudents(list: Student[]) {
  if (!tableBody) return;
  tableBody.innerHTML = "";

  if (!list.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="8" style="text-align:center">Нет студентов</td>`;
    tableBody.appendChild(tr);
    return;
  }

  list.forEach(s => {
    tableBody.appendChild(createRow(s));
  });
}
