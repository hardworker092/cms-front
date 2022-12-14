import LessonTab from './tabs/LessonTab';
import SettingLesson from './tabs/SettingLessonTab';
import React, { useEffect, useState } from 'react';
import SendBox from '../../../../components/SendBox';
import { LessonContext } from '../../../../hooks/useLessonContext'
import { instance } from '../../../../services/configServer';
import Library from '../../../../components/library/main';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';


const UpdateLesson = () => {

    let { id } = useParams();
    let navigation = useNavigate();
    const [loadingPage, setLoadingPage] = useState(false);

    const [authorList, setAuthorList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [desc, setDesc] = useState('');
    const [indexPage, setIndexPage] = useState(0);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState(1);
    const [status, setStatus] = useState(1);
    const [visibility, setVisibility] = useState(1);
    const [lessonCode, setLessonCode] = useState('');
    const [courseId, setCourseId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [urlVide, setUrlVideo] = useState('');
    const [listCourse, setListCourse] = useState([]);
    const [open, setOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileLink, setFileLink] = useState('');
    const [categoryListId, setCategoryListId] = useState([]);
    const [teacher, setTeacher] = useState(1);
    const [teacherList, setTeacherList] = useState([]);
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
        getCourses();
        getLessons();
    }, [])

    const getLessons = () => {
        setLoadingPage(true);
        instance.get('lessons/get').then((response) => {
            if (response.status == 200) {
                const res = response.data.filter((value) => value.id == parseInt(id))[0];
                console.log(res);
                setTitle(res.title)
                setCourseId(res.course_id);
                setAuthor(res.user_id);
                setDesc(res.description);
                setStatus(res.status + 1);
                setVisibility(res.visibility + 1);
                setUrlVideo(res.url_video);
                setLessonCode(res.code);
                setCategoryListId(res.categories.map((value) => value.id))
                //! change
                setTeacher(res.teacher);
                setFileLink(res.picture);
                setLoadingPage(false);
            }
        }).catch((error) => {
            console.log(error);
            setLoadingPage(false);
        })
    }

    const getCourses = () => {
        instance.get('courses/get').then((response) => {
            if (response.status == 200) {
                setListCourse(response.data);
                setCourseId(response.data[0].id);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

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
                console.log(response);
                setAuthorList(response.data.filter((user) => user.approved == 1));
                //!change approved to teacher
                setTeacherList(response.data.filter((user) => user.approved == 1));
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const listPage = [
        {
            'id': 0,
            'title': '???????? ????????',
            'page': <LessonTab />
        },
        {
            'id': 1,
            'title': '??????????????',
            'page': <SettingLesson />
        },
    ];

    const resetForm = () => {
        setTitle('');
        setCategoryListId([])
        setDesc('');
        setStatus(1);
        setVisibility(1);
        setUrlVideo('');
    }

    const onSubmit = (e) => {
        console.log(courseId);
        e.preventDefault();
        if (title == "") {
            setAlert({ status: 'error', message: '?????????? ?????????? ?????????? ???????????? ??????' });
            clearAlert();
        } else if (teacher == 0) {
            setAlert({ status: 'error', message: '?????????? ?????????? ?????????? ???????????? ??????' });
            clearAlert();
        } else if (visibility == 2 && lessonCode == "") {
            setAlert({ status: 'error', message: '?????????? ?????????? ???? ?????? ???????????? ??????' });
            clearAlert();
        } else if (categoryListId.length == 0) {
            setAlert({ status: 'error', message: '???????? ?????? ?????? ???????? ?????? ?????????? ???? ???????? ???????? ???????????? ??????' });
            clearAlert();
        } else {
            setLoading(true);
            const formData = new FormData();
            formData.append('title', title,);
            formData.append('user_id', author,);
            formData.append('code', visibility == 2 ? lessonCode : '',);
            formData.append('categories', categoryListId,);
            formData.append('picture', fileLink,);
            formData.append('course_id', courseId,);
            formData.append('status', (status - 1),);
            formData.append('visibility', (visibility - 1),);
            formData.append('teacher', teacher);
            instance.post(`lessons/update/${id}`, formData).then((response) => {
                if (response.status == 200) {
                    console.log(response);
                    setAlert({ status: 'success', message: '?????? ???? ???????????? ???????????? ????' });
                    clearAlert();
                    setLoading(false);
                    navigation('/admin/showLesson', { replace: true });
                }
            }).catch((error) => {
                console.log(error);
                setAlert({ status: 'error', message: error.response.data.message });
                setLoading(false);
                clearAlert();
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    return (
        <form className='mt-16' onSubmit={onSubmit}>
            {
                loadingPage ?
                    <div className="w-full h-[50rem] flex flex-col justify-center items-center">
                        <Spinner
                            style={{ color: 'blue' }}
                            as="span"
                            size="lg"
                            role="status"
                            aria-hidden="true"
                            animation="border"
                        />
                        <br />
                        <span> ???? ?????? ?????????? ???????????????? ???????? ???????????? ????????????</span>
                    </div>
                    :

                    <>
                        <Library
                            showDialog={open}
                            setShowDialog={setOpen}
                            setFileName={setFileName}
                            setFileLink={setFileLink}
                        />
                        <div className='flex flex-col items-start justify-center bg-white px-4 pt-4'>
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
                        <LessonContext.Provider value={{
                            title,
                            setTitle,
                            author,
                            setAuthor,
                            desc,
                            setDesc,
                            visibility,
                            setVisibility,
                            status,
                            setStatus,
                            courseId,
                            setCourseId,
                            setAlert,
                            setLoading,
                            authorList,
                            categoriesList,
                            setCategoriesList,
                            listCourse,
                            urlVide,
                            setUrlVideo,
                            categoryListId,
                            teacher,
                            setTeacher,
                            teacherList
                        }}>
                            {alert.message.length !== 0 ? <div className={`h-16 ${alert.status == 'success' ? 'bg-green-400' : alert.status == 'warn' ? 'bg-yellow-400' : 'bg-red-400'} mx-3 mt-3 pr-1 rounded-md shadow-sm shadow-black`}>
                                <div className='h-full bg-gray-100 rounded-md text-right px-3 flex flex-col justify-center'>
                                    <span className={`${alert.status == 'success' ? 'text-green-600' : alert.status == 'warn' ? 'text-yellow-600' : 'text-red-600'}`}>
                                        {alert.status == 'success' ? '???????????? ????????' : alert.status == 'warn' ? '????????????' : '??????'}
                                    </span>
                                    <span className='text-black font-normal text-[.65rem] mt-1'>
                                        {alert.message}
                                    </span>
                                </div>
                            </div> : <div />}
                            <h6 className='mt-3 font-iran font-[900] text-black text-sm mb-4 mr-5'>
                                {indexPage == 0 ? '???????????? ??????' : ''}
                            </h6>
                            <div className="px-3 grid grid-cols-4 gap-x-2 mt-3 w-full">
                                <div className="grid col-span-3 px-2 py-2 rounded-md">
                                    {listPage[indexPage].page}
                                </div>
                                <div className="grid col-span-1 px-2py-2">
                                    <SendBox
                                        loading={loading}
                                        status={status}
                                        setStatus={setStatus}
                                        visibility={visibility}
                                        setVisibility={setVisibility}
                                        code={lessonCode}
                                        setCode={setLessonCode}
                                        categoriesList={categoriesList}
                                        setCategoryListId={setCategoryListId}
                                        categoryListId={categoryListId}
                                        isUpdate={true}
                                    />
                                    <div className="border border-gray-400 rounded-md overflow-auto p-2 pt-2 gap-y-3 flex flex-col my-2">
                                        {fileLink ? <img className="cursor-pointer rounded-md" onClick={() => setOpen(true)} src={fileLink} alt="image_course" /> : <div />}
                                        <span>???????? ???????????? ???? ??????????????????????? ?????? ?????????? ???????? ????????????</span>
                                        <button type='button' className="font-iran text-xs text-blue-500 underline mt-2" onClick={fileLink ? () => setFileLink('') : () => setOpen(true)}>
                                            {fileLink ? '?????? ???????? ?????????? ????????' : '???????? ???????? ?????????? ????????'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </LessonContext.Provider>
                    </>
            }
        </form >
    )
}

export default UpdateLesson;