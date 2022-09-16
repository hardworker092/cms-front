export const convertAccess = (price) => {
    if (price == '0') {
        return (
            <div className="flex items-center">
                <div className="w-[.500rem] h-[.500rem] rounded-full bg-green-600 ml-2" />
                آزاد
            </div>
        )
    } else if (price == '1') {
        return (
            <div className="flex items-center">
                <div className="w-[.500rem] h-[.500rem] rounded-full bg-blue-600 ml-2" />
                رایگان
            </div>
        )
    } else if (price == '2') {
        return (
            <div className="flex items-center">
                <div className="w-[.500rem] h-[.500rem] rounded-full bg-orange-600 ml-2" />
                خرید
            </div>
        )
    }
    else if (price == '3') {
        return (
            <div className="flex items-center">
                <div className="w-[.500rem] h-[.500rem] rounded-full bg-cyan-600 ml-2" />
                خرید اشتراکی
            </div>
        )
    } else if (price == '4') {
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

}