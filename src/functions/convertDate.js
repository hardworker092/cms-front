import { gregorian_to_jalali } from "./convertDateFunc";

export const convertDate = (dateTime, update) => {
    var newDate = dateTime.split('.')[0];
    var date = newDate.split('T')[0];
    var time = newDate.split('T')[1]

    var year = date.split("-")[0];
    var month = date.split("-")[1];
    var day = date.split("-")[2];
    var date = gregorian_to_jalali(parseInt(year), parseInt(month), parseInt(day));
    if (update) {
        return `${date[0]}/${date[1]}/${date[2]}`
    } else {
        return `${date[0]}/${date[1]}/${date[2]}`
    }
} //! converDate end


export const convertDateForUser = (date) => {
    const newDate = date.split('-');
    const d = gregorian_to_jalali(parseInt(newDate[0]), parseInt(newDate[1]), parseInt(newDate[2]));
    return d;
}