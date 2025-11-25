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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadStudents = loadStudents;
exports.createStudent = createStudent;
const studentApi_1 = require("../api/studentApi");
const Student_1 = require("../template/Student");
const render_1 = require("../HTMLactions/render");
function loadStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, studentApi_1.apiGet)("http://localhost:3000/api/students");
        const list = Array.isArray(data) ? data : [data];
        list.forEach(item => {
            const student = new Student_1.Student(item.name, item.surname, item.lastname, item.birthday, item.studyStart, item.faculty, item.id, item.createdAt, item.updatedAt);
            (0, render_1.renderStudentRow)(student);
        });
    });
}
function createStudent(dto) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, studentApi_1.apiPost)("http://localhost:3000/api/students", dto);
        if (data) {
            const student = new Student_1.Student(data.name, data.surname, data.lastname, data.birthday, Number(data.studyStart), data.faculty, Number(data.id), data.createdAt, data.updatedAt);
            (0, render_1.renderStudentRow)(student);
        }
    });
}
