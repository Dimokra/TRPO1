import { createStudent } from "../data/studentDataHandler";

export function setupFormHandler() {
    const form = document.querySelector<HTMLFormElement>("#addStudent");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const dto = {
            name: String(formData.get("studentFirstName") || ""),
            surname: String(formData.get("studentLastName") || ""),
            lastname: String(formData.get("studentSurname") || ""),
            birthday: String(formData.get("studentBirthday") || ""),
            studyStart: Number(formData.get("studentStudyStart") || 0),
            faculty: String(formData.get("studentFaculty") || "")
        };

        createStudent(dto);
    });
}
