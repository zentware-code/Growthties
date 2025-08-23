"use strict";
let date = new Date(),
    nextDay = new Date(new Date().getTime() + 864e5),
    nextMonth = 11 === date.getMonth() ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1),
    prevMonth = 11 === date.getMonth() ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1);
//console.log(JSON.parse(localStorage.getItem('calender')));

window.events = JSON.parse(localStorage.getItem('calender'));

