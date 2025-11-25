var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addStudent } from "../data/studentStore";
const form = document.querySelector("#addStudent");
const errorBox = document.querySelector("#formErrors");
export function initFormHandler() {
    form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        errorBox.innerHTML = "";
        const fd = new FormData(form);
        const name = fd.get("studentFirstName").trim();
        const surname = fd.get("studentLastName").trim();
        const lastname = fd.get("studentSurname").trim();
        const birthday = new Date(fd.get("studentBirthday"));
        const studyStart = Number(fd.get("studentAge"));
        const faculty = fd.get("studentGroup").trim();
        const errors = [];
        if (!name)
            errors.push("Имя обязательно");
        if (!surname)
            errors.push("Фамилия обязательна");
        if (!lastname)
            errors.push("Отчество обязательно");
        if (isNaN(birthday.getTime()))
            errors.push("Дата рождения неверна");
        else {
            if (birthday < new Date("1900-01-01") || birthday > new Date())
                errors.push("Дата рождения должна быть в диапазоне 1900 — сегодня");
        }
        const currentYear = new Date().getFullYear();
        if (studyStart < 2000 || studyStart > currentYear)
            errors.push("Год начала обучения неверный");
        if (!faculty)
            errors.push("Факультет обязателен");
        if (errors.length) {
            errorBox.innerHTML = errors.map((e) => `<div>${e}</div>`).join("");
            return;
        }
        yield addStudent({
            name,
            surname,
            lastname,
            birthday,
            studyStart,
            faculty,
        });
        form.reset();
    }));
}
//# sourceMappingURL=formHandler.js.map