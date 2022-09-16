import { gregorian_to_jalali } from "./convertDateFunc";
import React, { Component } from 'react';

export const convertAccess = (access) => {
    if (access == 0) {
        return (
            <div className="flex items-center">
                <div className="w-[.500rem] h-[.500rem] rounded-full bg-green-600 ml-2" />
                آزاد
            </div>
        )
    } else if (access == 1) {
        return (
            <div className="flex items-center">
                <div className="w-[.500rem] h-[.500rem] rounded-full bg-blue-600 ml-2" />
                رایگان
            </div>
        )
    } else if (access == 2) {
        return (
            <div className="flex items-center">
                <div className="w-[.500rem] h-[.500rem] rounded-full bg-orange-600 ml-2" />
                خرید
            </div>
        )
    }
    else if (access == 3) {
        return (
            <div className="flex items-center">
                <div className="w-[.500rem] h-[.500rem] rounded-full bg-cyan-600 ml-2" />
                خرید اشتراکی
            </div>
        )
    } else if (access == 4) {
        return (
            <div className="flex items-center">
                <div className="w-[.500rem] h-[.500rem] rounded-full bg-red-600 ml-2" />
                بسته
            </div>
        )
    } else {
        return 'تعریف نشده'
    }
}


export const convertVisibility = (code, visibility) => {
    if (visibility == 1) {
        return (
            <div className="flex items-center">
                <div className="w-[.500rem] h-[.500rem] rounded-full bg-blue-600 ml-2" />
                {code}
            </div>
        )
    } else {
        switch (visibility) {
            case 0:
                return (
                    <div className="flex items-center">
                        <div className="w-[.500rem] h-[.500rem] rounded-full bg-green-600 ml-2" />
                        عمومی
                    </div>
                );
            case 2:
                return (
                    <div className="flex items-center">
                        <div className="w-[.500rem] h-[.500rem] rounded-full bg-red-600 ml-2" />
                        خصوصی
                    </div>
                );
            default:
                return (
                    <div className="flex items-center">
                        <div className="w-[.500rem] h-[.500rem] rounded-full bg-red-600 ml-2" />
                        تعریف نشده (باگ)
                    </div>
                );
        }
    }
}


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

export const convertAdminAccess = (access) => {
    if (access == 0) {
        return 'مشترکین'
    } else if (access == 1) {
        return 'مشارکت کنندگان'
    } else if (access == 2) {
        return 'نویسندگان'
    }
    else if (access == 3) {
        return 'ویرایشگران'
    } else if (access == 4) {
        return 'مدیرکل'
    } else {
        return 'تعریف نشده'
    }
}