import { addStudent } from "../data/studentStore";

const form = document.querySelector<HTMLFormElement>("#addStudent");
const errorBox = document.querySelector<HTMLDivElement>("#formErrors");

export function initFormHandler() {
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form) return;

    errorBox!.innerHTML = "";
    const fd = new FormData(form);

    const name = (fd.get("studentFirstName") as string || "").trim();
    const surname = (fd.get("studentLastName") as string || "").trim();
    const lastname = (fd.get("studentSurname") as string || "").trim();
    const birthdayStr = fd.get("studentBirthday") as string || "";
    const studyStart = Number(fd.get("studentStartYear"));
    const faculty = (fd.get("studentFaculty") as string || "").trim();

    const birthday = new Date(birthdayStr);

    const errors: string[] = [];

    if (!name) errors.push("Имя обязательно");
    if (!surname) errors.push("Фамилия обязательна");
    if (!lastname) errors.push("Отчество обязательно");

    if (isNaN(birthday.getTime())) errors.push("Дата рождения неверна");
    else {
      if (birthday < new Date("1900-01-01") || birthday > new Date())
        errors.push("Дата рождения должна быть в диапазоне 1900 — сегодня");
    }

    const currentYear = new Date().getFullYear();
    if (isNaN(studyStart) || studyStart < 2000 || studyStart > currentYear)
      errors.push("Год начала обучения неверный");

    if (!faculty) errors.push("Факультет обязателен");

    if (errors.length) {
      errorBox!.innerHTML = errors.map((e) => `<div>${e}</div>`).join("");
      return;
    }

    try {
      await addStudent({
        name,
        surname,
        lastname,
        birthday,
        studyStart,
        faculty
      });
      form.reset();
    } catch (err) {
      console.error(err);
      errorBox!.innerHTML = `<div>Ошибка при сохранении на сервере</div>`;
    }
  });
}
