var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Student } from "../template/Student";
import { apiLoadStudents, apiCreateStudent, apiDeleteStudent } from "../api/studentApi";
let students = [];
let lastId = 0;
export function loadStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield apiLoadStudents();
        students = data.map((s) => new Student(s.name, s.surname, s.lastname, new Date(s.birthday), s.studyStart, s.faculty, s.id));
        lastId = students.length ? Math.max(...students.map(s => s.id)) : 0;
    });
}
export function getStudents() {
    return students;
}
export function addStudent(s) {
    return __awaiter(this, void 0, void 0, function* () {
        const dto = Object.assign({}, s);
        const saved = yield apiCreateStudent(dto);
        const newStudent = new Student(saved.name, saved.surname, saved.lastname, new Date(saved.birthday), saved.studyStart, saved.faculty, saved.id);
        students.push(newStudent);
        document.dispatchEvent(new Event("students-updated"));
    });
}
export function deleteStudent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield apiDeleteStudent(id);
        students = students.filter(s => s.id !== id);
        document.dispatchEvent(new Event("students-updated"));
    });
}
//# sourceMappingURL=studentStore.js.map