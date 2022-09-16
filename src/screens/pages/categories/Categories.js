import React, { useEffect, useState } from 'react';
import { CategoryContext } from '../../../hooks/useCategoryContext';
import { instance } from '../../../services/configServer';
import AddCategory from './AddCategory';
import ShowCategories from './ShowCategories';

const Categories = () => {
    const [valueUpdate, setValueUpdate] = useState({});

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [parentCategory, setParentCategory] = useState(0);
    const [categoriesList, setCategoriesList] = useState([]);
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(false);
    const [update, setUpdate] = useState(false);
    const [categoryId, setCategoryId] = useState(0);
    const [alert, setAlert] = useState({
        'status': 'success',
        'message': ''
    });

    useEffect(() => {
        setName(valueUpdate.name);
        setSlug(valueUpdate.slug)
        setParentCategory(valueUpdate.parent_id == null ? 0 : valueUpdate.parent_id)
        console.log(valueUpdate.parent_id);
        setDesc(valueUpdate.description);
        setCategoryId(valueUpdate.id);
        setUpdate(true);
    }, [valueUpdate])

    const clearAlert = () => {
        setTimeout(() => {
            setAlert({ status: 'success', message: '' })
        }, 5000);
    }

    useEffect(() => {
        getCategories();
        setUpdate(false);
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

    const resetForm = () => {
        setName('');
        setSlug('')
        setParentCategory(0)
        setDesc('');
        setCategoryId(0);
        setUpdate(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (name == "") {
            setAlert({ status: 'error', message: 'تکمیل گزینه نام دسته الزامی است' });
            clearAlert();
        } else if (slug == "") {
            setAlert({ status: 'error', message: 'تکمیل گزینه نامک دسته الزامی است' });
            clearAlert();
        } else {
            setLoading(true);
            if (update) {
                instance.post(`categories/update/${categoryId}`, {
                    'name': name.trim(),
                    'slug': slug.trim(),
                    'parent_id': parentCategory == 0 ? null : parentCategory,
                    'description': desc
                }).then((response) => {
                    if (response.status == 200) {
                        setChange(!change);
                        setAlert({ status: 'success', message: 'دسته با موفقیت ویرایش شد' });
                        clearAlert();
                        getCategories();
                        resetForm();
                    } setLoading(false);
                }).catch((error) => {
                    console.log(error);
                    setLoading(false);
                })
            } else {
                instance.post('categories/add', {
                    'name': name.trim(),
                    'slug': slug.trim(),
                    'parent_id': parentCategory == 0 ? null : parentCategory,
                    'description': desc
                }).then((response) => {
                    if (response.status == 200) {
                        setChange(!change);
                        setAlert({ status: 'success', message: 'دسته با موفقیت ثبت شد' });
                        clearAlert();
                        getCategories();
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
    }

    return (
        <form className='px-4 mt-28' onSubmit={onSubmit}>
            {alert.message.length !== 0 ? <div className={`h-16 ${alert.status == 'success' ? 'bg-green-400' : alert.status == 'warn' ? 'bg-yellow-400' : 'bg-red-400'} mt-3 pr-1 rounded-md shadow-sm shadow-black`}>
                <div className='h-full bg-gray-100 rounded-md text-right px-3 flex flex-col justify-center'>
                    <span className={`${alert.status == 'success' ? 'text-green-600' : alert.status == 'warn' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {alert.status == 'success' ? 'موفقیت آمیز' : alert.status == 'warn' ? 'احتیاط' : 'خطا'}
                    </span>
                    <span className='text-black font-normal text-[.65rem] mt-1'>
                        {alert.message}
                    </span>
                </div>
            </div> : <div />}
            <CategoryContext.Provider value={{
                slug,
                setSlug,
                name,
                setName,
                loading,
                setLoading,
                desc,
                setDesc,
                categoriesList,
                parentCategory,
                setParentCategory,
                change,
                valueUpdate,
                setValueUpdate,
                update
            }}>
                <div className='grid grid-cols-7 gap-x-3 mt-4'>
                    <div className='col-span-2'>
                        <h6 className='font-iran text-sm font-bold mb-5'>اضافه کردن دسته</h6>
                        <AddCategory />
                    </div>
                    <div className='grid col-span-5'>
                        <ShowCategories />
                    </div>
                </div>
            </CategoryContext.Provider>
        </form>
    )
}

export default Categories