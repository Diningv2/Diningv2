import monthName from "../config/monthName";

export default function dateBuilder(offset) {
    // get date for menus -- relies on the fact that server is on EST/EDT
    const currentDate = new Date();
    const date =
        monthName[currentDate.getMonth()] +
        ", " +
        (currentDate.getDate() + offset) +
        " " +
        currentDate.getFullYear() +
        " 00:00:00";
    return date;
}
