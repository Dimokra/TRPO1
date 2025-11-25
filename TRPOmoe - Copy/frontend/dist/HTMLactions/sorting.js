import { getStudents } from "../data/studentStore";
import { renderStudents } from "./render";
export function initSorting() {
    const headers = document.querySelectorAll("th.sortable");
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const field = header.dataset.field;
            const list = [...getStudents()];
            switch (field) {
                case "fio":
                    list.sort((a, b) => a.getFIO().localeCompare(b.getFIO()));
                    break;
                case "faculty":
                    list.sort((a, b) => a.faculty.localeCompare(b.faculty));
                    break;
                case "birthday":
                    list.sort((a, b) => a.birthday.getTime() - b.birthday.getTime());
                    break;
                case "studyStart":
                    list.sort((a, b) => a.studyStart - b.studyStart);
                    break;
            }
            renderStudents(list);
        });
    });
}
//# sourceMappingURL=sorting.js.map