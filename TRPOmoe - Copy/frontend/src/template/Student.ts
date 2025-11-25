export interface StudentData {
  name: string;
  surname: string;
  lastname: string;
  birthday: Date;
  studyStart: number;
  faculty: string;
}

export class Student {
  constructor(
    public name: string,
    public surname: string,
    public lastname: string,
    public birthday: Date,
    public studyStart: number,
    public faculty: string,
    public id: number
  ) {}

  getAge(): number {
    const now = new Date();
    let age = now.getFullYear() - this.birthday.getFullYear();
    const bd = new Date(now.getFullYear(), this.birthday.getMonth(), this.birthday.getDate());
    if (now < bd) age--;
    return age;
  }

  getStudyPeriod(): string {
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

  getFIO(): string {
    return `${this.surname} ${this.name} ${this.lastname}`;
  }

  getFormattedBirthday(): string {
    const d = this.birthday;
    return `${d.toLocaleDateString()} (${this.getAge()} лет)`;
  }
}
