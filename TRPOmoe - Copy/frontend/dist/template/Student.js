export class Student {
    constructor(name, surname, lastname, birthday, studyStart, faculty, id) {
        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.birthday = birthday;
        this.studyStart = studyStart;
        this.faculty = faculty;
        this.id = id;
    }
    getAge() {
        const now = new Date();
        let age = now.getFullYear() - this.birthday.getFullYear();
        const bd = new Date(now.getFullYear(), this.birthday.getMonth(), this.birthday.getDate());
        if (now < bd)
            age--;
        return age;
    }
    getStudyPeriod() {
        const endYear = this.studyStart + 4;
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        if (currentYear > endYear || (currentYear === endYear && currentMonth >= 8)) {
            return `${this.studyStart}-${endYear} (закончил)`;
        }
        const course = currentYear - this.studyStart + (currentMonth >= 8 ? 1 : 0);
        return `${this.studyStart}-${endYear} (${course} курс)`;
    }
    getFIO() {
        return `${this.surname} ${this.name} ${this.lastname}`;
    }
    getFormattedBirthday() {
        const d = this.birthday;
        return `${d.toLocaleDateString()} (${this.getAge()} лет)`;
    }
}
//# sourceMappingURL=Student.js.map