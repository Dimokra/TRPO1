"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const addStudentForm = document.querySelector('#addStudent');
const studentTableBoby = document.querySelector('#studentsTableBody');
class Student {
    constructor(name, surname, lastname, birthday, studyStart, faculty, id, createdAt, updatedAt) {
        this.id = undefined;
        this.createdAt = undefined;
        this.updatedAt = undefined;
        this.id = id;
        this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
        this.updatedAt = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;
        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.birthday = typeof birthday === 'string' ? new Date(birthday) : birthday;
        this.studyStart = studyStart;
        this.faculty = faculty;
    }
    getGroup() {
        return { group: 'aga' };
    }
    getAge() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const dob = this.birthday;
        const dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
        let age = today.getFullYear() - dob.getFullYear();
        if (today < dobnow) {
            age = age - 1;
        }
        return age;
    }
    renderStudent() {
        console.log('render', this);
        if (studentTableBoby) {
            setTimeout(() => {
                var _a;
                studentTableBoby.insertAdjacentHTML('beforeend', `<tr>
                    <td class="student-table_id">${(_a = this.id) !== null && _a !== void 0 ? _a : ' '}</td>
                    <td class="student-table_firstname">${this.name} ${this.surname} ${this.lastname}</td>
                    <td class="student-table_lastname">${this.lastname}</td>
                    <td class="student-table_surname">${this.surname}</td>
                    <td class="student-table_age">${this.getAge()}</td>
                    <td class="student-table_group">${this.getGroup().group}</td>
                    <td class="student-table_faculty">${this.faculty}</td>
                    <td class="student-table_studyStart">${this.studyStart}</td>
                    <td class="student-table_action">
                </tr>`);
            }, 3);
        }
    }
}
function getData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok)
                throw new Error('Ошибка, response is not ok');
            const data = yield response.json();
            console.log('RAW DATA: ', data);
            return data;
        }
        catch (err) {
            throw new Error(`Error - ${err}`);
        }
    });
}
function createAndRenderStudent(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const item = yield getData(url);
            const student = new Student(item.name, item.surname, item.lastname, item.birthday, item.studyStart, item.faculty, item.id, item.createdAt, item.updatedAt);
            student.renderStudent();
            return student;
        }
        catch (err) {
            console.error('Error creating student:', err);
            return null;
        }
    });
}
function initStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentsData = yield getData('http://localhost:3000/api/students');
            const list = Array.isArray(studentsData)
                ? studentsData
                : [studentsData];
            for (const item of list) {
                console.log("item:", item);
                const student = new Student(item.name, item.surname, item.lastname, item.birthday, item.studyStart, item.faculty, item.id, item.createdAt, item.updatedAt);
                student.renderStudent();
            }
        }
        catch (error) {
            console.error("Error initializing students:", error);
        }
    });
}
document.addEventListener('DOMContentLoaded', initStudents);
function studentHandler() {
} //Для редактирования если надо
function createStudent(studentDto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/api/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentDto),
            });
            const text = yield response.text();
            const data = text ? JSON.parse(text) : null;
            console.log("Студент создан:", data);
            // И только теперь создаём класс Student
            if (data) {
                const student = new Student(data.name, data.surname, data.lastname, data.birthday, Number(data.studyStart), data.faculty, Number(data.id), data.createdAt, data.updatedAt);
                student.renderStudent();
            }
        }
        catch (err) {
            console.error("Ошибка:", err);
        }
    });
}
addStudentForm === null || addStudentForm === void 0 ? void 0 : addStudentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addStudentForm);
    const dto = {
        name: String(formData.get("studentFirstName") || ""),
        surname: String(formData.get("studentLastName") || ""),
        lastname: String(formData.get("studentSurname") || ""),
        birthday: String(formData.get("studentBirthday") || ""), // СТРОКА!
        studyStart: String(formData.get("studentStudyStart") || ""), // СТРОКА!
        faculty: String(formData.get("studentFaculty") || "")
    };
    console.log("DTO:", dto);
    createStudent(dto);
});
