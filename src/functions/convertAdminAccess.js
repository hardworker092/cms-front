export const convertAdminAccess = (access) => {
    switch (access) {
        case 0:
            return 'مشترکین'
        case 1:
            return 'مشارکت کنندگان'
        case 2:
            return 'نویسندگان';
        case 3:
            return 'ویرایشگران';
        case 4:
            return 'مدیر کل';
        default:
            return 'تعریف نشده(باگ)'
    }
}