import React, { useState, useEffect } from 'react'
import SendBox from '../../../components/SendBox';
import { ProductContext } from '../../../hooks/useProductContext';
import ProductBuild from './tabs/ProductBuild';
import ProductTab from './tabs/ProductTab';
import ProductSetting from './tabs/ProductSetting';
import { Spinner } from 'react-bootstrap';
import { instance } from '../../../services/configServer'
import Library from '../../../components/library/main';
import { useNavigate, useParams } from 'react-router-dom';

const AddProduct = () => {

    let { id } = useParams();
    let navigation = useNavigate();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [tinyDesc, setTinyDesc] = useState('');
    const [status, setStatus] = useState(1);
    const [visibility, setVisibiliy] = useState(1);
    const [productCode, setProductCode] = useState('');
    const [type, setType] = useState(1);
    const [price, setPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [teacher, setTeacher] = useState('');
    const [lessonCount, setLessonCount] = useState('');
    const [indexTab, setIndexTab] = useState(1);
    const [productList, setProductList] = useState([]);
    const [file, setFile] = useState([]);
    const [fileListId, setFileListId] = useState([]);
    const [productId, setproductId] = useState(0);
    const [selectedPic, setSelectedPic] = useState('');
    const [open, setOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileLink, setFileLink] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);
    const [categoryListId, setCategoryListId] = useState([]);
    const [authorList, setAuthorList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [picture, setPicture] = useState('');
    const [picName, setPicName] = useState('');
    const [author, setAuthor] = useState(1);
    const [update, setUpdate] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [alert, setAlert] = useState({
        'status': 'success',
        'message': ''
    });

    const resetForm = () => {
        setTitle('');
        setAuthor(1);
        setCategoryListId([]);
        setDesc('');
        setStatus(1);
        setVisibiliy(1);
        setProductCode('');
        setPicture('');
        setTinyDesc('');
        setType(0);
        setPrice('');
        setDiscountPrice('');
        setDuration('');
        setTeacher('');
        setLessonCount(0);
        setFileList([])
        setUpdate(false);
    }

    useEffect(() => {
        if (id) {
            getProducts();
        }
    }, [])

    const getProducts = () => {
        setLoadingUpdate(true);
        setUpdate(true);
        instance.get('products/get').then((response) => {
            if (response.status == 200) {
                const res = response.data.filter((value) => value.id == parseInt(id))[0];
                console.log(res);
                setTitle(res.title);
                setAuthor(res.user_id);
                setCategoryListId(res.categories.map((value) => value.id));
                setDesc(res.description);
                setStatus(res.status + 1);
                setVisibiliy(res.visibility + 1);
                setProductCode(res.code);
                setPicture(res.picture);
                setTinyDesc(res.tiny_desc);
                setType(res.type);
                setPrice(res.price);
                setDiscountPrice(res.price_discount);
                setDuration(res.duration);
                setTeacher(res.teacher);
                setLessonCount(res.lessons_count);
                setFileList(res.files.map((value) => value))
                setLoadingUpdate(false);
            }
        }).catch((error) => {
            console.log(error);
            setLoadingUpdate(false);
        })
    }

    const updateProduct = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title,);
        formData.append('user_id', author);
        formData.append("picture", picture,);
        formData.append("description", desc,);
        formData.append("tiny_desc", tinyDesc,);
        formData.append("price", price,);
        formData.append("teacher", teacher,);
        formData.append("duration", duration,);
        formData.append("lessons_count", lessonCount,);
        formData.append("tags", "",);
        formData.append("type", type,);
        formData.append('visibility', (visibility - 1),);
        formData.append('code', visibility == 2 ? productCode : '',);
        formData.append('status', (status - 1),);
        formData.append("price_discount", discountPrice,);
        formData.append("categories", categoryListId,);
        formData.append("file_id", fileList.map((value) => value.id));
        instance.post(`products/update/${id}`, formData).then((response) => {
            if (response.status == 200) {
                setLoading(false);
                navigation('/admin/showProduct', { replace: true });
            }
        }).catch((error) => {
            setAlert({ status: 'error', message: error.response.data.message });
            clearAlert();
            setLoading(false);
            console.log(error);
        })
    }

    const addProduct = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title,);
        formData.append('user_id', author);
        formData.append("picture", picture,);
        formData.append("description", desc,);
        formData.append("tiny_desc", tinyDesc,);
        formData.append("price", price,);
        formData.append("teacher", teacher,);
        formData.append("duration", duration,);
        formData.append("lessons_count", lessonCount,);
        formData.append("tags", "",);
        formData.append("type", type,);
        formData.append('visibility', (visibility - 1),);
        formData.append('code', visibility == 2 ? productCode : '',);
        formData.append('status', (status - 1),);
        formData.append("price_discount", discountPrice,);
        formData.append("categories", categoryListId,);
        formData.append("file_id", fileList.map((value) => value.id));
        instance.post('products/add', formData).then((response) => {
            setAlert({ status: 'success', message: "محصول با موفقیت افزوده شد" });
            clearAlert();
            setLoading(false);
        }).catch((error) => {
            setAlert({ status: 'error', message: error.response.data.message });
            clearAlert();
            setLoading(false);
            console.log(error);
        })
    }


    const onSubmit = (e) => {
        e.preventDefault();
        if (title == "") {
            setAlert({ status: 'error', message: 'تکمیل گزینه نام محصول الزامی است' });
            clearAlert();
        } else if (desc.length == 0) {
            setAlert({ status: 'error', message: 'تکمیل گزینه توضیحات الزامی است' });
            clearAlert();
        } else if (visibility == 2 && productCode == "") {
            setAlert({ status: 'error', message: 'تکمیل گزینه کد محصول الزامی است' });
            clearAlert();
        } else if (categoryListId.length == 0) {
            setAlert({ status: 'error', message: 'برای ثبت محصول نیاز است حداقل یک دسته بندی انتخاب شود' });
            clearAlert();
        } else if (tinyDesc.length == 0) {
            setAlert({ status: 'error', message: 'تکمیل گزینه توضیحات کوتاه الزامی است' });
            clearAlert();
        } else if (price.length == 0) {
            setAlert({ status: 'error', message: 'تکمیل گزینه قیمت الزامی است' });
            clearAlert();
        } else if (duration.length == 0) {
            setAlert({ status: 'error', message: 'تکمیل گزینه زمان دوره الزامی است' });
            clearAlert();
        } else if (teacher.length == 0) {
            setAlert({ status: 'error', message: 'تکمیل گزینه استاد الزامی است' });
            clearAlert();
        } else if (lessonCount.length == 0) {
            setAlert({ status: 'error', message: 'تکمیل گزینه تعداد جلسات دوره الزامی است' });
            clearAlert();
        } else {
            if (update) {
                updateProduct();
            } else {
                addProduct();
            }
        }
    }

    const listTab = [
        {
            'id': 1,
            'title': 'صفحه محصول',
            'screen': <ProductTab />
        },
        {
            'id': 2,
            'title': 'تنظیمات',
            'screen': <ProductSetting />
        },
        {
            'id': 3,
            'title': 'مدیریت فایل',
            'screen': <ProductBuild />
        },
    ];

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

    const clearAlert = () => {
        setTimeout(() => {
            setAlert({ status: 'sucess', message: '' })
        }, 5000);
    }

    return (
        <form className='mx-4 mt-16' onSubmit={onSubmit}>
            {
                update && loadingUpdate ?
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
                            setFileName={setPicName}
                            setFileLink={setPicture}
                        />
                        {alert.message.length !== 0 ? <div className={`h-16 w-[80%] top-2 z-50 absolute ${alert.status == 'success' ? 'bg-green-400' : alert.status == 'warn' ? 'bg-yellow-400' : 'bg-red-400'} mx-3 mt-3 pr-1 rounded-md shadow-sm shadow-black`}>
                            <div className='h-full bg-gray-200 rounded-md text-right px-3 flex flex-col justify-center'>
                                <span className={`${alert.status == 'success' ? 'text-green-600' : alert.status == 'warn' ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {alert.status == 'success' ? 'موفقیت آمیز' : alert.status == 'warn' ? 'احتیاط' : 'خطا'}
                                </span>
                                <span className='text-black font-normal text-[.65rem] mt-1'>
                                    {alert.message}
                                </span>
                            </div>
                        </div> : <div />}
                        <div className='flex flex-col items-start justify-center px-2 pt-4 mt-20'>
                            <ul className="navbar flex flex-row">
                                {
                                    listTab.map((value) => {
                                        return (
                                            <li key={value.id}><p onClick={() => setIndexTab(value.id)} className={` ${indexTab == value.id ? 'text-blue-700 font-bold' : 'text-black font-medium'}`}>{value.title}</p></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <h6 className='mt-4 font-iran font-[900] text-black text-sm mb-4'>
                            {indexTab == 1 ? 'افزودن محصول' : (indexTab == 2 ? 'تنظیمات' : 'محصولات مشابه')}
                        </h6>
                        <div className="w-full grid grid-cols-4 gap-x-3" >
                            <div className='grid col-span-3'>
                                <ProductContext.Provider value={{
                                    title,
                                    setTitle,
                                    desc,
                                    setDesc,
                                    tinyDesc,
                                    setTinyDesc,
                                    type,
                                    setType,
                                    price,
                                    setPrice,
                                    discountPrice,
                                    setDiscountPrice,
                                    duration,
                                    setDuration,
                                    teacher,
                                    setTeacher,
                                    lessonCount,
                                    setLessonCount,
                                    file,
                                    setFile,
                                    productId,
                                    setproductId,
                                    fileListId,
                                    setFileListId,
                                    selectedPic,
                                    setSelectedPic,
                                    fileName,
                                    setFileName,
                                    fileLink,
                                    setFileLink,
                                    fileList,
                                    setFileList,
                                    setAlert,
                                    author,
                                    setAuthor,
                                    authorList,
                                    update
                                }}>
                                    {listTab[indexTab - 1].screen}
                                </ProductContext.Provider>
                            </div>
                            <div className='grid col-span-1'>
                                <div className='flex flex-col'>
                                    <SendBox
                                        loading={loading}
                                        status={status}
                                        setStatus={setStatus}
                                        visibility={visibility}
                                        setVisibility={setVisibiliy}
                                        code={productCode}
                                        setCode={setProductCode}
                                        categoriesList={categoriesList}
                                        setCategoryListId={setCategoryListId}
                                        categoryListId={categoryListId}
                                        isUpdate={update}
                                    />
                                </div>
                                <div className="border border-gray-400 rounded-md overflow-auto p-2 pt-2 gap-y-3 flex flex-col my-2">
                                    {picture ? <img className="cursor-pointer rounded-md" onClick={() => setOpen(true)} src={picture} alt="image_course" /> : <div />}
                                    <span>برای ویرایش یا به‌روزرسانی روی تصویر کلیک نمایید</span>
                                    <button type='button' className="font-iran text-xs text-blue-500 underline mt-2" onClick={picture ? () => setPicture('') : () => setOpen(true)}>
                                        {picture ? 'پاک کردن تصویر شاخص' : 'قرار دادن تصویر شاخص'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </form>
    )
}

export default AddProduct