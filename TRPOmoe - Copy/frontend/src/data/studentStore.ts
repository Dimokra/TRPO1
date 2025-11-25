import { Student, StudentData } from "../template/Student";
import { apiLoadStudents, apiCreateStudent, apiDeleteStudent } from "../api/studentApi";

let students: Student[] = [];
let lastId = 0;

export async function loadStudents() {
  const data = await apiLoadStudents();

  students = (data || []).map((s: any) => {
    const bd = s.birthday ? new Date(s.birthday) : new Date();
    return new Student(
      s.name,
      s.surname,
      s.lastname,
      bd,
      Number(s.studyStart),
      s.faculty,
      Number(s.id)
    );
  });

  lastId = students.length ? Math.max(...students.map(s => s.id)) : 0;
  document.dispatchEvent(new Event("students-updated"));
}

export function getStudents() {

  return [...students];
}

export async function addStudent(s: StudentData) {
  const dto = {
    name: s.name,
    surname: s.surname,
    lastname: s.lastname,
    birthday: s.birthday instanceof Date ? s.birthday.toISOString() : s.birthday,
    studyStart: s.studyStart,
    faculty: s.faculty
  };

  const saved = await apiCreateStudent(dto);

  const savedBirthday = saved.birthday ? new Date(saved.birthday) : new Date();
  const newStudent = new Student(
    saved.name,
    saved.surname,
    saved.lastname,
    savedBirthday,
    Number(saved.studyStart),
    saved.faculty,
    Number(saved.id)
  );

  students.push(newStudent);
  lastId = Math.max(lastId, newStudent.id);
  document.dispatchEvent(new Event("students-updated"));
}

export async function deleteStudent(id: number) {
  await apiDeleteStudent(id);
  students = students.filter(s => s.id !== id);
  document.dispatchEvent(new Event("students-updated"));
}
