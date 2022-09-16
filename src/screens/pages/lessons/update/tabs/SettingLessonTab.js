import { MenuItem, FormControl } from "@mui/material";
import React, { useContext } from "react";
import CustomInput from "../../../../../components/CustomInput";
import CustomSelect from "../../../../../components/CustomSelect";
import { LessonContext } from "../../../../../hooks/useLessonContext";

const SettingCourseTab = () => {

    const { listCourse, courseId, setCourseId, urlVideo, setUrlVideo } = useContext(LessonContext)

    return (
        <div className="w-full p-2 text-right">
            <span className="text-sm">تنظیمات دسترسی به درس</span>
            <p className="font-iran text-xs mt-1">مشخص نمایید درس مربوط به کدام دوره می باشد</p>
            <hr />
            <FormControl className='hover:border-none font-iran w-52 my-3'>
                <CustomSelect
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    label={'دوره'}
                >
                    <MenuItem className="text-right" value={0}>
                        <span className='text-sm'>بدون دوره</span> </MenuItem>
                    {
                        listCourse.map((course) => {
                            return (
                                <MenuItem className="text-right" value={course.id}>
                                    <span className='text-sm'>{course.course_title}</span> </MenuItem>
                            )
                        })
                    }
                </CustomSelect>
            </FormControl>
            <hr />
            <span className="text-sm">تنظیمات پیمایش دوره</span>
            <p className="font-iran text-xs mt-1">نحوه تعامل کاربران با محتوا و تجربه پیمایشی آن‌ها را کنترل می‌کند</p>
            <hr />
            <div className="flex flex-row">
                <CustomInput
                    value={urlVideo}
                    name={urlVideo}
                    onChange={(e) => setUrlVideo(e.target.value)}
                    placeholder="آدرس ویدیو"
                />
            </div>
        </div>
    )
}

export default SettingCourseTab;