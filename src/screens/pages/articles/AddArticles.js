import { MenuItem, FormControl } from "@mui/material";
import React, { useRef, useState, useEffect } from "react"
import CustomInput from "../../../components/CustomInput";
import CustomSelect from "../../../components/CustomSelect";
import Library from "../../../components/library/main";
import SendBox from "../../../components/SendBox"
import { instance } from "../../../services/configServer";
import SunEditor from "suneditor-react";


const AddArticles = () => {
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
        instance.get("users/get").then((response) => {
            if (response.status == 200) {
                setAuthorList(response.data.filter((user) => user.approved == 1));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const resetForm = () => {
        setTitle('');
        setCategoryListId([])
        setStatus(1);
        setVisibility(1);
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
            instance.post('articles/add', formData).then((response) => {
                console.log(response);
                if (response.status == 201) {
                    setAlert({ status: 'success', message: 'مقاله با موفقیت ثبت شد' });
                    clearAlert();
                    resetForm();
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
            <Library
                showDialog={open}
                setShowDialog={setOpen}
                setFileName={setFileName}
                setFileLink={setFileLink}
            />
            <h6 className='font-iran font-[900] text-black text-sm mb-4 mt-10 mr-5'>افزودن مقاله جدید</h6>
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
            <div className="px-3 grid grid-cols-4 gap-x-2 w-full mt-3">
                <div className="grid col-span-3 px-2  py-2 rounded-md">
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-row gap-x-2'>
                            <CustomInput
                                name={title}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="عنوان مقاله"
                            />
                            <FormControl className='hover:border-none font-iran' sx={{ minWidth: 300 }}>
                                <CustomSelect
                                    value={author}
                                    label="نویسنده"
                                    disabled={authorList.lenght == 0 ? true : false}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    {
                                        authorList.map((value) => {
                                            return <MenuItem key={value.id} value={value.id}> <span className='text-sm'>{value.fullname} {value.phone} </span></MenuItem>
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
                <div className="grid col-span-1 px-2 py-2">
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
                    <div className="border border-gray-400 rounded-md h-40 overflow-auto pt-3 px-2 mt-2">
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
                    <div className="border border-gray-400 rounded-md overflow-auto p-2 pt-2 gap-y-3 flex flex-col my-2">
                        {fileLink ? <img className="cursor-pointer rounded-md" onClick={() => setOpen(true)} src={fileLink} alt="image_course" /> : <div />}
                        <span>برای ویرایش یا به‌روزرسانی روی تصویر کلیک نمایید</span>
                        <button type='button' className="font-iran text-xs text-blue-500 underline mt-2" onClick={fileLink ? () => setFileLink('') : () => setOpen(true)}>
                            {fileLink ? 'پاک کردن تصویر شاخص' : 'قرار دادن تصویر شاخص'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddArticles