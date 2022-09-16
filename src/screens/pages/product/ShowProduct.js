import { DeleteOutlineOutlined, Check, DoneAll, EditOutlined } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from '../../../services/configServer'
import { Spinner } from 'react-bootstrap'
import { convertDate, convertVisibility } from "../../../functions/converts";
import CustomDialog from "../../../components/CustomDialog";
import Pagination from "../../../components/Pagination";
import CustomSelect from "../../../components/CustomSelect";
import { MenuItem } from "@mui/material";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { returnCategories } from "../../../functions/returnCategory";

const ShowProducts = () => {
    const checkedRef = useRef(null);
    const checkedAllRef = useRef(null);

    const [author, setAuthor] = useState(0);
    const [authorList, setListAuthor] = useState([]);
    const [visibility, setVisibility] = useState(-1);
    const [title, setTitle] = useState('');
    const [teacher, setTeacher] = useState('');
    const [sort, setSort] = useState(0);

    const [productList, setProductList] = useState([]);
    const [productId, setProductId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectList, setSlelectedList] = useState([]);
    const [masterChecked, setMasterChecked] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [currentPage, setCureentpage] = useState(1);
    const [listCategories, setListCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [prePage] = useState(20);

    const indexOfLast = currentPage * prePage;
    const indexOfFirst = indexOfLast - prePage;
    const currentProducts = productList.slice(indexOfFirst, indexOfLast);

    const paginate = pageNumber => setCureentpage(pageNumber);

    useEffect(() => {
        getAuthor();
        getProducts();
        getCategories();
    }, [currentPage])

    const getCategories = () => {
        instance.get('categories/get').then((response) => {
            if (response.status == 200) {
                setListCategories(response.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const getAuthor = () => {
        instance.get('users/get').then((response) => {
            if (response.status == 200) {
                //console.log(response);
                setListAuthor(response.data.filter((value) => value.approved == 1));
            }
        }).catch((error) => {
            console.log(error);
        })
    }


    const getProducts = () => {
        setLoading(true);
        instance.get('products/get').then((res) => {
            if (res.status == 200) {
                console.log(res);
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].selected = false;
                    // res.data[i].teacher_name = teacherList.filter((value) => value.id == parseInt(res.data[i].teacher))[0].fullname
                }
                setProductList(res.data);
                setLoading(false);
                setShowDialog(false);
            }
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            setShowDialog(false);
        })
    }

    //? select / unSelect table rows
    const onMasterCheck = (e) => {
        let tempList = productList;
        //? check / uncheck all items
        tempList.map((value) => (value.selected = e.target.checked));
        // update State
        setMasterChecked(e.target.checked);
        setProductList(tempList);
        setSlelectedList(productList.filter((e) => e.selected));
    }

    //!! on selected checkced with click table row
    const onClickItemCheck = (item) => {
        let tempList = productList;
        tempList.map((value) => {
            if (value.id == item.id) {
                value.selected = !item.selected;
            }
            return value;
        });

        //? to control master checkbox state
        const totalItems = productList.length;
        const totalCheckedItems = tempList.filter((e) => e.selected).length;

        //? update State
        setMasterChecked(totalItems == totalCheckedItems);
        setProductList(tempList);
        setSlelectedList(productList.filter((e) => e.selected));
    }

    //? update List items state and master checkbox state
    const onItemCheck = (e, item) => {
        let tempList = productList;
        tempList.map((value) => {
            if (value.id == item.id) {
                value.selected = e.target.checked;
            }
            return value;
        });

        //? to control master checkbox state
        const totalItems = productList.length;
        const totalCheckedItems = tempList.filter((e) => e.selected).length;

        //? update State
        setMasterChecked(totalItems == totalCheckedItems);
        setProductList(tempList);
        setSlelectedList(productList.filter((e) => e.selected));
    }

    const onAcceptDialog = () => {
        if (selectList.length == 0) {
            instance.delete(`products/delete/${productId}`).then((response) => {
                if (response.status == 200) {
                    //console.log(response);
                    getProducts();
                }
            }).catch((error) => {
                console.log(error);
                setShowDialog(false);
            })
        } else {
            var list = [];
            selectList.forEach((value) => {
                list.push(value.id);
            })
            instance.delete(`products/delete/${list}`).then((response) => {
                if (response.status == 200) {
                    //console.log(response);
                    getProducts();
                }
            }).catch((error) => {
                console.log(error);
                setShowDialog(false);
            })
        }
    }

    const filter = () => {
        instance.get(`products`, {
            params: {
                visibility: visibility == -1 ? null : visibility,
                user_id: author == 0 ? null : author,
                title: title == "" ? null : title,
                sort: sort == 0 ? 'desc' : 'asc',
                teacher: teacher == "" ? null : teacher,
                categories: categoryId == 0 ? null : categoryId
            }
        }).then((response) => {
            if (response.status == 200) {
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    response.data[i].selected = false;
                }
                setProductList(response.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <form className="mt-28 mx-4">
            <CustomDialog onAccept={onAcceptDialog} setShowDialog={setShowDialog} showDialog={showDialog} />
            {
                loading && currentProducts.length == 0 ?
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
                        <h6 className="font-iran font-bold text-black mb-10">نمایش دوره ها</h6>
                        <div className="w-full flex flex-row gap-x-4">
                            <CustomInput
                                value={title}
                                placeholder={'جستجوی عنوان'}
                                name={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <CustomInput
                                value={teacher}
                                placeholder={'جستجوی استاد'}
                                name={teacher}
                                onChange={(e) => setTeacher(e.target.value)}
                            />
                            <CustomSelect
                                selected={true}
                                value={categoryId}
                                label='جستجوی دسته بندی'
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value={0}>
                                    همه دسته ها
                                </option>
                                {returnCategories(listCategories)}
                            </CustomSelect>
                            <CustomSelect onChange={(e) => setAuthor(e.target.value)} value={author} label={'جستجوی نویسنده'}>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    key={0}
                                    value={0}>
                                    <span className='text-sm'>همه کاربران</span>
                                </MenuItem>
                                {
                                    authorList.map((value) => {
                                        return (
                                            <MenuItem
                                                style={{ font: 'unset' }}
                                                key={value.id}
                                                value={value.id}>
                                                <span className='text-sm'>{value.fullname} {value.phone}</span>
                                            </MenuItem>
                                        )
                                    })
                                }
                            </CustomSelect>
                            <CustomSelect onChange={(e) => setVisibility(e.target.value)} value={visibility} label={'قابلیت مشاهده'}>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={-1}>
                                    <span className='text-sm'>نمایش همه</span>
                                </MenuItem>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={0}>
                                    <span className='text-sm'>{convertVisibility('', 0)}</span>
                                </MenuItem>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={1}>
                                    <span className='text-sm'>
                                        <div className="flex items-center">
                                            <div className="w-[.500rem] h-[.500rem] rounded-full bg-blue-600 ml-2" />
                                            محافظت شده
                                        </div>
                                    </span>
                                </MenuItem>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={2}>
                                    <span className='text-sm'>{convertVisibility('', 2)}</span>
                                </MenuItem>
                            </CustomSelect>
                            <CustomSelect onChange={(e) => setSort(e.target.value)} value={sort} label={'ترتیب بر اساس'}>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={0}>
                                    <span className='text-sm'>جدید ترین</span>
                                </MenuItem>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={1}>
                                    <span className='text-sm'>قدیمی ترین</span>
                                </MenuItem>
                            </CustomSelect>
                            <CustomButton
                                height={52}
                                type="button"
                                text={'اعمال'}
                                onClick={filter}
                            />
                        </div>
                        <table className="tableFixHead">
                            <thead>
                                <tr>
                                    <td className='pl-5 pr-3 pt-3'>
                                        <input
                                            hidden
                                            ref={checkedAllRef}
                                            className='checkbox'
                                            type='checkbox'
                                            style={{ marginLeft: 10 }}
                                            aria-label='hello'
                                            checked={masterChecked}
                                            id="mastercheck"
                                            onClick={(e) => onMasterCheck(e)}
                                            onChange={(e) => onMasterCheck(e)}
                                        />
                                        <div onClick={() => checkedAllRef.current.click()} onChange={() => checkedAllRef.current.onChange()} className={`w-5 h-5 rounded-full ${!masterChecked ? 'bg-transparent border' : 'bg-blue-600 border-0'} flex justify-center items-center`}>
                                            {masterChecked ? <DoneAll fontSize={'inherit'} className="text-white" /> : ''}
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        ردیف
                                    </td>
                                    <td>عنوان</td>
                                    <td>استاد</td>
                                    <td>قابلیت مشاهده</td>
                                    <td>نویسنده</td>
                                    <td>دسته بندی</td>
                                    <td>تاریخ ایجاد</td>
                                    <td>تاریخ ویرایش</td>
                                    <td className='pl-0'>عملیات</td>
                                    <td className='p-0'>
                                        <div onClick={() => selectList.length !== 0 && setShowDialog(true)} className='ml-2 relative text-gray-600 w-12 h-12 flex justify-center items-center hover:bg-black hover:bg-opacity-10 rounded-full cursor-pointer transition duration-700'>
                                            {/* <div className='w-0 h-0 bg-black absolute rounded-full transition ease-in active:-scale-0 duration-500'></div> */}
                                            <DeleteOutlineOutlined />
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (currentProducts || []).map((value, index) => (
                                        <tr onClick={() => onClickItemCheck(value)} key={value.id}>
                                            <td className='pl-5 pr-3 pt-2'>
                                                <input
                                                    hidden
                                                    ref={checkedRef}
                                                    className='checkbox'
                                                    type='checkbox'
                                                    style={{ marginLeft: 10 }}
                                                    checked={value.selected}
                                                    id="rowcheck{user.id}"
                                                    onChange={(e) => onItemCheck(e, value)}
                                                />
                                                <div onChange={() => checkedRef.current.onChange()} className={`w-5 h-5 rounded-full ${!value.selected ? 'bg-transparent border' : 'bg-blue-500 border-0'} flex justify-center items-center`}>
                                                    {value.selected ? <Check fontSize={'small'} className="text-white" /> : ''}
                                                </div>
                                            </td>
                                            <td className="text-[.80rem] font-yRegular">{index + 1}</td>
                                            <td className="text-[.65rem]">{value.title}</td>
                                            <td className="text-[.65rem]">{value.teacher}</td>
                                            <td className="text-[.65rem]">
                                                {convertVisibility(value.code, value.visibility)}
                                            </td>
                                            <td className="text-[.65rem]">{value.fullname}</td>
                                            <td className="text-[.65rem] no-underline">{value.categories.map((cat) => <Link className="no-underline" to="/admin/categories">{`${cat.name}${value.categories.length > 1 ? ', ' : ''}`}</Link>)}</td>
                                            <td className="text-[.80rem] font-yRegular">{convertDate(value.created_at)}</td>
                                            <td className="text-[.80rem] font-yRegular">{convertDate(value.updated_at, true)}</td>
                                            <td>
                                                <Link
                                                    className="text-[.60rem] text-gray-400 hover:text-gray-500 no-underline"
                                                    to={`/admin/updateProduct/${value.id}`}>
                                                    <EditOutlined />
                                                </Link>
                                            </td>
                                            <td className='pl-5 pr-3'>
                                                <DeleteOutlineOutlined onClick={() => { setProductId(value.id); setShowDialog(true) }} className="text-gray-400 hover:text-gray-500 font-normal" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {productList.length > prePage ? <Pagination prePage={prePage} totalList={productList.length} paginate={paginate} /> : <></>}
                    </>
            }
        </form >
    )
}


export default ShowProducts;