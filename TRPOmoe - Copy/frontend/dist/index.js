var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loadStudents, getStudents } from "./data/studentStore";
import { renderStudents } from "./HTMLactions/render";
import { initFilters } from "./HTMLactions/filters";
import { initSorting } from "./HTMLactions/sorting";
import { initFormHandler } from "./HTMLactions/formHandler";
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield loadStudents();
        renderStudents(getStudents());
        initFilters();
        initSorting();
        initFormHandler();
        document.addEventListener("students-updated", () => {
            renderStudents(getStudents());
        });
    });
}
document.addEventListener("DOMContentLoaded", init);
fetch("/api/students")
    .then(r => r.json())
    .then(data => {
    console.log("ДАННЫЕ С СЕРВЕРА:", data);
});
//# sourceMappingURL=index.js.map