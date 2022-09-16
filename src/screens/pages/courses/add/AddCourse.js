import CourseTab from './tabs/CourseTab';
import BuildCourseTab from './tabs/BuildCourseTab';
import SettingCourseTab from './tabs/SettingCourseTab';
import React, { useEffect, useState } from 'react';
import SendBox from '../../../../components/SendBox';
import { CourseContext } from '../../../../hooks/useCourseContext'
import { instance } from '../../../../services/configServer';
import Library from '../../../../components/library/main';

const AddCourse = () => {
    const [desc, setDesc] = useState('');
    const [indexPage, setIndexPage] = useState(0);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState(1);
    const [status, setStatus] = useState(1);
    const [visibility, setVisibility] = useState(1);
    const [codeCourse, setCodeCourse] = useState('');
    const [lessonTitle, setLessonTitle] = useState('');
    const [courseId, setCourseId] = useState(0);
    const [navigate, setNavigate] = useState(1);
    const [access, setAccess] = useState(1);
    const [loading, setLoading] = useState(false);

    const [teacher, setTeacher] = useState("");
    const [open, setOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileLink, setFileLink] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);
    const [categoryListId, setCategoryListId] = useState([]);
    const [authorList, setAuthorList] = useState([]);

    const [alert, setAlert] = useState({
        'status': 'success',
        'message': ''
    });


    const clearAlert = () => {
        setTimeout(() => {
            setAlert({ status: 'sucess', message: '' })
        }, 5000);
    }

    useEffect(() => {
        getUser();
        getCategories();
    }, [])

    const getCategories = () => {
        instance.get('categories/get').then((response) => {
            if (response.status == 200) {
                setCategoriesList(response.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const getUser = () => {
        instance.get('users/get').then((response) => {
            if (response.status == 200) {
                setAuthorList(response.data.filter((user) => user.approved == 1));
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const listPage = [
        {
            'id': 0,
            'title': 'صفحه دوره',
            'page': <CourseTab />
        },
        {
            'id': 1,
            'title': 'دوره ساز',
            'page': <BuildCourseTab />
        },
        {
            'id': 2,
            'title': 'تنظیمات',
            'page': <SettingCourseTab />
        },
    ];

    const resetForm = () => {
        setTitle('');
        setLessonTitle('');
        setCategoryListId([])
        setDesc('');
        setStatus(1);
        setVisibility(1);
        setNavigate(1);
        setAccess(1);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (title == "") {
            setAlert({ status: 'error', message: 'تکمیل گزینه عنوان دوره الزامی است' });
            clearAlert();
        } else if (teacher == 0) {
            setAlert({ status: 'error', message: 'تکمیل گزینه استاد الزامی است' });
            clearAlert();
        } else if (visibility == 2 && codeCourse == "") {
            setAlert({ status: 'error', message: 'تکمیل گزینه کد دوره الزامی است' });
            clearAlert();
        } else if (categoryListId.length == 0) {
            setAlert({ status: 'error', message: 'برای ثبت دوره نیاز است حداقل یک دسته بندی انتخاب شود' });
            clearAlert();
        } else {
            setLoading(true);
            const formData = new FormData();
            formData.append('course_title', title,);
            formData.append('course_user_id', author,);
            formData.append('categories', categoryListId);
            formData.append('description', desc,);
            formData.append('course_visibility', (visibility - 1),);
            formData.append('code', visibility == 2 ? codeCourse : '',);
            formData.append('access', (access - 1),);
            formData.append('course_status', (status - 1),);
            formData.append('picture', fileLink,);
            formData.append('navigation', (navigate - 1),);
            formData.append('course_teacher', teacher,);
            instance.post('courses/add', formData).then((response) => {
                if (response.status == 201) {
                    console.log(response);
                    setCourseId(response.data.id);
                    setAlert({ status: 'success', message: 'دوره با موفقیت ثبت شد' });
                    clearAlert();
                    setLoading(false);
                    resetForm();
                }
            }).catch((error) => {
                console.log(error);
                setAlert({ status: 'error', message: error.response.data.message });
                setLoading(false);
                clearAlert();
            });
        }
    }

    return (
        <form className='mt-16' onSubmit={onSubmit}>
            <Library
                showDialog={open}
                setShowDialog={setOpen}
                setFileName={setFileName}
                setFileLink={setFileLink}
            />
            <div className='flex flex-col items-start justify-center bg-white px-4 pt-4 '>
                <ul className="navbar flex flex-row">
                    {
                        listPage.map((value) => {
                            return (
                                <li key={value.id}><p onClick={() => setIndexPage(value.id)} className={` ${indexPage == value.id ? 'text-blue-700 font-bold' : 'text-black font-medium'}`}>{value.title}</p></li>
                            )
                        })
                    }
                </ul>
            </div>
            <CourseContext.Provider value={{
                title,
                setTitle,
                author,
                setAuthor,
                teacher,
                setTeacher,
                desc,
                setDesc,
                visibility,
                setVisibility,
                status,
                setStatus,
                lessonTitle,
                setLessonTitle,
                courseId,
                setCourseId,
                navigate,
                setNavigate,
                access,
                setAccess,
                setAlert,
                setLoading,
                authorList,
                categoriesList,
                setCategoriesList,
                categoryListId,
                teacher,
                setTeacher,
            }}>
                {/* <Snackbar anchorOrigin={{
                    horizontal: 'left', vertical: 'top'
                }} open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                        <span>دوره با موفقیت ثبت شد</span>
                    </Alert>
                </Snackbar>
                <button type='button' onClick={() => setOpen(true)}>
                    open
                </button> */}
                {alert.message.length !== 0 ? <div className={`h-16 ${alert.status == 'success' ? 'bg-green-400' : alert.status == 'warn' ? 'bg-yellow-400' : 'bg-red-400'} mx-3 mt-3 pr-1 rounded-md shadow-sm shadow-black`}>
                    <div className='h-full bg-gray-100 rounded-md text-right px-3 flex flex-col justify-center'>
                        <span className={`${alert.status == 'success' ? 'text-green-600' : alert.status == 'warn' ? 'text-yellow-600' : 'text-red-600'}`}>
                            {alert.status == 'success' ? 'موفقیت آمیز' : alert.status == 'warn' ? 'احتیاط' : 'خطا'}
                        </span>
                        <span className='text-black font-normal text-[.65rem] mt-1'>
                            {alert.message}
                        </span>
                    </div>
                </div> : <div />}
                <h6 className='mt-3 font-iran font-[900] text-black text-sm mb-4 mr-5'>
                    {indexPage == 0 ? 'افزودن دوره' : (indexPage == 1 ? 'دوره ساز' : '')}
                </h6>
                <div className="px-3 grid md:grid-cols-1 lg:grid-cols-4 gap-x-2 mt-3 w-full">
                    <div className="grid col-span-3 py-2">
                        {listPage[indexPage].page}
                    </div>
                    <div className="grid col-span-1 px-2 py-2">
                        <SendBox
                            loading={loading}
                            status={status}
                            setStatus={setStatus}
                            visibility={visibility}
                            setVisibility={setVisibility}
                            code={codeCourse}
                            setCode={setCodeCourse}
                            categoriesList={categoriesList}
                            setCategoryListId={setCategoryListId}
                            categoryListId={categoryListId}
                        />
                        <div className="border border-gray-400 rounded-md overflow-auto p-2 pt-2 gap-y-3 flex flex-col my-2">
                            {fileLink ? <img className="cursor-pointer rounded-md" onClick={() => setOpen(true)} src={fileLink} alt="image_course" /> : <div />}
                            <span>برای ویرایش یا به‌روزرسانی روی تصویر کلیک نمایید</span>
                            <button type='button' className="font-iran text-xs text-blue-500 underline mt-2" onClick={fileLink ? () => setFileLink('') : () => setOpen(true)}>
                                {fileLink ? 'پاک کردن تصویر شاخص' : 'قرار دادن تصویر شاخص'}
                            </button>
                        </div>
                    </div>
                </div>
            </CourseContext.Provider>
        </form >
    )
}

export default AddCourse;