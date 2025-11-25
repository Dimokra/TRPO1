import { apiGet, apiPost } from "../api/studentApi";
import { Student } from "../template/Student";
import { renderStudentRow } from "../HTMLactions/render";

export async function loadStudents() {
    const data = await apiGet("http://localhost:3000/api/students");

    const list = Array.isArray(data) ? data : [data];

    list.forEach(item => {
        const student = new Student(
            item.name,
            item.surname,
            item.lastname,
            item.birthday,
            item.studyStart,
            item.faculty,
            item.id,
            item.createdAt,
            item.updatedAt
        );

        renderStudentRow(student);
    });
}

export async function createStudent(dto: any) {
    const data = await apiPost("http://localhost:3000/api/students", dto);

    if (data) {
        const student = new Student(
            data.name,
            data.surname,
            data.lastname,
            data.birthday,
            Number(data.studyStart),
            data.faculty,
            Number(data.id),
            data.createdAt,
            data.updatedAt
        );

        renderStudentRow(student);
    }
}
