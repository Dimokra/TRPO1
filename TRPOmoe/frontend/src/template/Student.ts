export class Student {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    surname: string;
    lastname: string;
    birthday: Date;
    studyStart: number;
    faculty: string;

    constructor(
        name: string,
        surname: string,
        lastname: string,
        birthday: Date | string,
        studyStart: number,
        faculty: string,
        id?: number,
        createdAt?: Date | string,
        updatedAt?: Date | string
    ) {
        this.id = id;
        this.createdAt = createdAt ? new Date(createdAt) : undefined;
        this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;

        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.birthday = new Date(birthday);
        this.studyStart = studyStart;
        this.faculty = faculty;
    }

    getAge() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const dob = this.birthday;
        const dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
        let age = today.getFullYear() - dob.getFullYear();
        if (today < dobnow) {
            age--;
        }
        return age;
    }

    getGroup() {
        return { group: "aga" };
    }
}
