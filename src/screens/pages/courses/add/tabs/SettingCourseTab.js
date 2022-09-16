import React, { useContext } from "react";
import { CourseContext } from "../../../../../hooks/useCourseContext";

const SettingCourseTab = () => {

    const { navigate, setNavigate, access, setAccess } = useContext(CourseContext);

    var listAccessCourse = [
        {
            'id': 1,
            'title': 'آزاد',
            'desc': 'دوره محافظت نمی‌شود. هر کاربر می‌تواند بدون نیاز به ورود به سیستم یا ثبت‌نام، به محتوای آن دسترسی داشته باشد.',
        },
        {
            'id': 2,
            'title': 'رایگان',
            'desc': 'دوره محافظت می‌شود. ثبت‌نام و ورود کاربر ، برای دسترسی به محتوا ضروری است.',
        },
        {
            'id': 3,
            'title': 'خرید',
            'desc': 'کاربران باید دوره را (بصورت پرداخت کامل یک مرحله‌ای) خریداری کرده تا دسترسی آن‌ها به دوره باز شود.',
        },
        {
            'id': 4,
            'title': 'خرید اشتراکی',
            'desc': 'این دوره با درگاه‌های "پی‌پال" محافظت می‌شود. کاربران باید دوره را (بصورت پرداخت اشتراکی) خریداری کرده تا دسترسی آن‌ها به دوره باز شود.',
        },
        {
            'id': 5,
            'title': 'بسته',
            'desc': 'دسترسی به دوره فقط از طریق ثبت‌نام توسط مدیر (دستی)، ثبت‌نام گروهی، یا ثبت‌نام ادغامی (سبد خرید یا عضویت) امکان پذیر است.',
        }
    ];

    var listNavigateCourse = [
        {
            'id': 1,
            'title': 'خطی',
            'desc': 'کاربر را در توالی مراحل تعیین شدۀ دوره، ملزم به پیشرفت می‌کند',
        },
        {
            'id': 2,
            'title': 'فرم آزاد',
            'desc': 'به کاربر اجازه می‌دهد تا بدون دنبال کردن توالی مراحل مشخص شدۀ دوره، آزادانه عمل کند',
        },
    ];

    return (
        <div className="w-full p-2 text-right">
            <span className="text-sm">تنظیمات دوره</span>
            <p className="font-iran text-xs mt-1">نحوه دسترسی به دوره را کنترل می کند</p>
            <hr />
            <div className="flex flex-row">
                <span>حالت دسترسی</span>
                <div className="flex flex-col px-4">
                    {
                        listAccessCourse.map((accesses) => {
                            return (
                                <div key={accesses.id}>
                                    <input
                                        onChange={(e) => setAccess(parseInt(e.target.value))}
                                        checked={accesses.id == access ? true : false}
                                        value={accesses.id}
                                        type="radio"
                                        name="accesses"
                                        id={accesses.title}
                                    />
                                    <label className="mr-2 mb-4 cursor-pointer" htmlFor={accesses.title}>
                                        <span>{accesses.title}</span>
                                        <span className="font-normal text-gray-400 mt-1">{accesses.desc}</span>
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <hr />
            <span className="text-sm">تنظیمات پیمایش دوره</span>
            <p className="font-iran text-xs mt-1">نحوه تعامل کاربران با محتوا و تجربه پیمایشی آن‌ها را کنترل می‌کند</p>
            <hr />
            <div className="flex flex-row">
                <span>پیشرفت دوره</span>
                <div className="flex flex-col px-4">
                    {
                        listNavigateCourse.map((navigates) => {
                            return (
                                <div key={navigates.id}>
                                    <input
                                        onChange={(e) => setNavigate(parseInt(e.target.value))}
                                        checked={navigates.id == navigate ? true : false}
                                        value={navigates.id}
                                        type="radio"
                                        name="navigates"
                                        id={navigates.title}
                                    />
                                    <label className="mr-2 mb-4 cursor-pointer" htmlFor={navigates.title}>
                                        <span>{navigates.title}</span>
                                        <span className="font-normal text-gray-400 mt-1">{navigates.desc}</span>
                                    </label>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SettingCourseTab;