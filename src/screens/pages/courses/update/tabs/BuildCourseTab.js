import React, { useState, useEffect, useContext } from "react";
import { Spinner } from "react-bootstrap";
import CustomInput from "../../../../../components/CustomInput";
import SizedBox from "../../../../../components/SizedBox";
import { CourseContext } from "../../../../../hooks/useCourseContext";
import { instance } from "../../../../../services/configServer";
import { Link } from 'react-router-dom'

const BuildCourseTab = () => {
    const { lessonTitle, setLessonTitle, author, courseId, setAlert, setLoading, categoryListId, visibility, status, teacher } = useContext(CourseContext);
    const [error] = useState('');
    const [loadingPage, setLoadingPage] = useState(false);
    const [loadingSend, setLoadingSend] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [list, setList] = useState([]);


    useEffect(() => {
        getLesson();
        console.log('loop');
    }, [])

    useEffect(() => {
        getLesson();
    }, [courseId])

    const deleteLesson = async (id) => {
        setLoadingDelete(true);
        instance.delete(`lessons/delete/${id}`).then((response) => {
            if (response.status == 200) {
                getLesson();
            }
        }).catch((error) => {
            console.log(error.toJSON());
            setLoadingDelete(false);
        })
    }

    const getLesson = () => {
        setLoadingPage(true);
        instance.get('lessons/get').then((response) => {
            if (response.status == 200) {
                setList(response.data.filter((value) => value.course_id == courseId));
                setLoadingPage(false);
                setLoadingDelete(false);
                setLoadingSend(false);
                setLoading(false);
            }
        }).catch((error) => {
            setLoadingPage(false);
            console.log(error.toJSON());
        })
    }

    const clearAlert = () => {
        setTimeout(() => {
            setAlert({ status: 'sucess', message: '' })
        }, 5000);
    }

    const addLesson = () => {
        //console.log(courseId);
        if (lessonTitle == "") {
            setAlert({ status: 'error', message: 'تکمیل گزینه عنوان درس الزامی است' });
            clearAlert();
        } else {
            setLoadingSend(true);
            setLoading(true);
            const formDataLesson = new FormData();
            formDataLesson.append('title', lessonTitle,);
            formDataLesson.append('user_id', author,);
            formDataLesson.append('categories', categoryListId);
            formDataLesson.append('course_id', courseId,);
            formDataLesson.append('status', (status - 1),);
            formDataLesson.append('visibility', (visibility - 1),);
            formDataLesson.append('teacher', teacher);
            instance.post('lessons/add', formDataLesson).then((res) => {
                if (res.status == 201) {
                    console.log(res.data);
                    getLesson();
                }
            }).catch((error) => {
                console.log(error);
                setAlert({ status: 'error', message: error.response.data.message })
                clearAlert();
                setLoadingSend(false);
                setLoading(false);
            })
            setLessonTitle('');
        }

    }

    return (
        <div className="flex flex-col p-3 border border-gray-400">
            <span className="mr-2 mb-3">تعداد درس های این دوره : {list.length}</span>
            <div className="w-full h-[38rem] overflow-auto">
                {
                    loadingPage && list.length == 0 ?
                        <div className="flex justify-center items-center w-full h-full">
                            <Spinner
                                style={{ color: 'blue' }}
                                as="span"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                animation="border"
                            />
                        </div>
                        :
                        list.length == 0 ?
                            <div className="flex justify-center items-center border-2 border-dashed rounded-md border-gray-400 py-3 mt-3">
                                <span className="py-10 font-normal text-center text-gray-400">
                                    <p>دوره هنوز دارای هیچ محتوایی نیست</p>
                                    <p>با استفاده از گزینه افزودن درس، میتوانید درس جدیدی به این دوره اضاف کنید</p>
                                </span>
                            </div> :
                            list.map((lesson, index) => {
                                return (
                                    <div key={lesson.id} className="flex flex-row justify-between items-center border border-dashed rounded-md border-gray-400 py-3 px-2 mt-1">
                                        <div className="flex flex-row items-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-600 flex justify-center items-center font-yRegular text-white">
                                                {index + 1}
                                            </div>
                                            <SizedBox width={10} />
                                            <div className="font-iran text-xs">{lesson.title}</div>
                                        </div>
                                        {loadingDelete ? <Spinner
                                            style={{ marginBottom: -3, marginLeft: 20 }}
                                            as="span"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            animation="border"
                                        /> : <div className="flex flex-row items-center ml-3">
                                            <Link to={`/admin/updateLesson/${lesson.id}`} className="font-iran no-underline font-bold text-[.63rem] cursor-pointer text-blue-900 hover:text-blue-500 ml-1">ویرایش</Link>
                                            |
                                            <button type={'button'} onClick={() => deleteLesson(lesson.id)}
                                                className="font-iran font-bold text-[.63rem] cursor-pointer text-red-600 hover:text-red-500 mr-1">حذف</button>
                                        </div>}
                                    </div>
                                );
                            })
                }
            </div>
            <div className="flex flex-row mt-4">
                <CustomInput
                    error={error.length !== 0}
                    placeholder={'عنوان درس'}
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                />
                <SizedBox width={10} />
                <button type="button" onClick={() => !loadingSend ? addLesson() : {}} className="w-24 h-[3.25rem] border-[1px] border-blue-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md flex justify-center items-center">
                    {loadingSend ?
                        <Spinner
                            style={{ color: 'blue' }}
                            as="span"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            animation="border"
                        /> : <span className="text-blue-900 font-medium">افزودن درس</span>}
                </button>
            </div>
            <div className="text-right font-iran text-red-500 text-sm -mt-2">
                {error ? error : ''}
            </div>
        </div>
    )
}

export default BuildCourseTab;