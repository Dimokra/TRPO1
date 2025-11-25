"use strict";
// //вместо birthDay надо вычислять возраст
// interface Student {
//     private id: number
//     private firstName: string;
//     private lastName: string;
//     private surname: string;
//     readonly birthDay: Date;
//     readonly startYear: Date;
//     private faculty: string;
// }
// class newStudent {
//     private firstName: string;
//     private lastName: string;
//     private surname: string;
//     readonly birthDay: Date;
//     readonly startYear: Date;
//     private faculty: string;
//     constructor(firstName: string, lastName: string, surname: string, birthDay: Date, startYear: Date, faculty: string ) {
//         this.firstName = firstName
//         this.lastName = lastName
//         this.surname = surname
//         this.birthDay = birthDay
//         this.startYear = startYear
//         this.faculty = faculty
//     }
// }
// function renderToTable(tableEl: HTMLTableElement, obj: Student): void {
//     if(!tableEl) throw new Error(`${tableEl} not exist`)
//     tableEl.insertAdjacentHTML('beforeend' ,`<tbody><tr><td>${obj.id}</td><td>${obj.firstName + ' ' + obj.lastName}</td><td>${obj.birthDay}</td><td>${}</td><td></td></tr></tbody>`)
// }
