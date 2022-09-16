import { MenuItem, Select, FormControl } from "@mui/material";
import { useEffect } from "react";
import { useRef, useState } from "react"
import { Spinner } from "react-bootstrap";
import SunEditor from "suneditor-react";
import CustomInput from "../../../components/CustomInput";
import SendBox from "../../../components/SendBox"
import SizedBox from "../../../components/SizedBox";
import { instance } from "../../../services/configServer";
import { useParams, useNavigate } from 'react-router-dom';
import CustomSelect from "../../../components/CustomSelect";
import Library from "../../../components/library/main";
import React, { Component } from 'react';

const UpdateArticle = () => {

    let { id } = useParams();
    let navigation = useNavigate();

    const [loadingPage, setLoadingPage] = useState(false);


    const editor = useRef(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [author, setAuthor] = useState(1);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(1);
    const [visibility, setVisibility] = useState(1);
    const [codeArticle, setCodeArticle] = useState('');
    const [tagName, setTagName] = useState('');
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

    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    useEffect(() => {
        getUser();
        getArticles();
        getCategories();
    }, [])

    const getArticles = () => {
        setLoadingPage(true);
        instance.get('articles/get').then((response) => {
            if (response.status == 200) {
                const res = response.data.filter((value) => value.id == parseInt(id))[0];
                console.log(res);
                setTitle(res.title);
                setDesc(res.description);
                setAuthor(res.user_id);
                setStatus(res.status + 1);
                setVisibility(res.visibility + 1);
                setCodeArticle(res.code);
                setFileLink(res.picture);
                setCategoryListId(res.categories.map((value) => value.id))
                setLoadingPage(false);
            }
        }).catch((error) => {
            setLoadingPage(false);
            console.log(error)
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
                //console.log(response);
                setAuthorList(response.data.filter((user) => user.approved == 1));
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    const clearAlert = () => {
        setTimeout(() => {
            setAlert({ status: 'sucess', message: '' })
        }, 5000);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (title == "") {
            setAlert({ status: 'error', message: 'تکمیل گزینه عنوان الزامی است' });
            clearAlert();
        } else if (visibility == 2 && codeArticle == "") {
            setAlert({ status: 'error', message: 'تکمیل گزینه کد مقاله الزامی است' });
            clearAlert();
        } else if (categoryListId.length == 0) {
            setAlert({ status: 'error', message: 'برای ثبت مقاله نیاز است حداقل یک دسته بندی انتخاب شود' });
            clearAlert();
        } else if (desc.length == 0) {
            setAlert({ status: 'error', message: 'تکمیل گزینه توضیحات مقاله الزامی است' });
            clearAlert();
        } else {
            setLoading(true);
            const formData = new FormData();
            formData.append('tags', tagName,);
            formData.append('categories', categoryListId,);
            formData.append('picture', fileLink,);
            formData.append('user_id', author,);
            formData.append('image_id', 1,); //!remove at
            formData.append('title', title,);
            formData.append('description', desc,);
            formData.append('status', status - 1,);
            formData.append('visibility', visibility - 1,);
            formData.append('code', visibility == 2 ? codeArticle : '',);
            instance.post(`articles/update/${id}`, formData).then((response) => {
                if (response.status == 200) {
                    console.log(response);
                    setAlert({ status: 'success', message: 'مقاله با موفقیت ویرایش شد' });
                    clearAlert();
                    navigation('/admin/showArticle', { replace: true })
                }
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setAlert({ status: 'error', message: error.response.data.message });
                clearAlert();
                setLoading(false);
            })
        }
    }

    return (
        <form className='mt-36' onSubmit={onSubmit}>
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
                        <span> در حال گرفتن اطلاعات، لطفا منتتظر بمانید</span>
                    </div>
                    :
                    <>
                        <Library
                            showDialog={open}
                            setShowDialog={setOpen}
                            setFileName={setFileName}
                            setFileLink={setFileLink}
                        />
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
                        <h6 className='font-iran font-[900] text-black text-sm mb-4 mt-10 mr-5'>ویرایش مقاله</h6>
                        <div className="px-3 grid grid-cols-4 gap-x-2 w-full mt-3">
                            <div className="grid col-span-3 px-2 py-2 rounded-md">
                                <div className='flex flex-col w-full'>
                                    <div className='flex flex-row gap-x-4'>
                                        <CustomInput
                                            name={title}
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="عنوان مقاله"
                                        />
                                        <FormControl className='hover:border-none font-iran' sx={{ minWidth: 300 }}>
                                            <CustomSelect onChange={(e) => setAuthor(e.target.value)} value={author} label={'نویسنده'}>
                                                {
                                                    authorList.map((value) => {
                                                        return (
                                                            <MenuItem
                                                                className='font-iran'
                                                                style={{ font: 'unset' }}
                                                                key={value.id}
                                                                value={value.id}>
                                                                <span className='text-sm'>{value.fullname} {value.phone}</span>
                                                            </MenuItem>
                                                        )
                                                    })
                                                }
                                            </CustomSelect>
                                        </FormControl>
                                    </div>
                                    <SunEditor
                                        onChange={(content) => setDesc(content)}
                                        defaultValue={desc}
                                        setOptions={{
                                            height: 200,
                                            buttonList: [['undo', 'redo'], ['font', 'fontSize', 'formatBlock'], ['paragraphStyle', 'blockquote'], ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'], ['fontColor', 'textStyle'], ['outdent', 'indent'], ['align', 'horizontalRule', 'list', 'lineHeight'], ['table', 'link', 'image', 'video', 'audio'], ['imageGallery'], ['fullScreen', 'showBlocks', 'codeView'], ['preview', 'print'], ['save', 'template']]
                                        }}
                                        setDefaultStyle='text-2xl'
                                        height='500'
                                        placeholder="توضیحات مقاله"
                                        getSunEditorInstance={getSunEditorInstance}
                                    />
                                </div>
                            </div>
                            <div className="grid col-span-1 px-2py-2">
                                <SendBox
                                    loading={loading}
                                    status={status}
                                    setStatus={setStatus}
                                    visibility={visibility}
                                    setVisibility={setVisibility}
                                    code={codeArticle}
                                    setCode={setCodeArticle}
                                    categoriesList={categoriesList}
                                    setCategoryListId={setCategoryListId}
                                    categoryListId={categoryListId}
                                />
                                <SizedBox height={10} />
                                <div className="border border-gray-400 rounded-md h-40 overflow-auto pt-3 px-2">
                                    <span>افزودن برچسب</span>
                                    <hr />
                                    <div className="flex flex-row">
                                        <CustomInput
                                            name={tagName}
                                            value={tagName}
                                            onChange={(e) => setTagName(e.target.value)}
                                            placeholder="نام برچسب"
                                        />
                                    </div>
                                    <span className="font-normal -mt-1 mr-1">برچسب هارا با کاما از هم جدا کنید</span>
                                </div>
                            </div>
                        </div>
                    </>
            }

        </form>
    )
}

export default UpdateArticle