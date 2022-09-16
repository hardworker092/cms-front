import { DeleteOutlineOutlined, Check, DoneAll, EditOutlined } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { instance } from '../../../services/configServer'
import { Spinner } from 'react-bootstrap'
import { convertDate } from "../../../functions/converts";
import CustomDialog from "../../../components/CustomDialog";
import Pagination from "../../../components/Pagination";

import { useContext } from "react";
import { CategoryContext } from "../../../hooks/useCategoryContext";

const ShowCategories = () => {

    const { change, setValueUpdate } = useContext(CategoryContext);

    const checkedRef = useRef(null);
    const checkedAllRef = useRef(null);

    const [author, setAuthor] = useState(0);
    const [authorList, setListAuthor] = useState([]);

    const [listCategories, setListCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectList, setSlelectedList] = useState([]);
    const [masterChecked, setMasterChecked] = useState(false);

    const [showDialog, setShowDialog] = useState(false);
    const [currentPage, setCureentpage] = useState(1);
    const [courseStaticList, setCourseStaticList] = useState([]);
    const [prePage] = useState(10);

    const indexOfLast = currentPage * prePage;
    const indexOfFirst = indexOfLast - prePage;
    const currentCategory = listCategories.slice(indexOfFirst, indexOfLast);

    const paginate = pageNumber => setCureentpage(pageNumber);

    useEffect(() => {
        getAuthor();
        getCategory();
    }, [currentPage])

    useEffect(() => {
        getCategory();
    }, [change])

    const getAuthor = () => {
        instance.get('users/get').then((response) => {
            if (response.status == 200) {
                //console.log(response);
                setListAuthor(response.data.filter((value) => value.approved == 1 && value.teacher == 0));
            }
        }).catch((error) => {
            console.log(error);
        })
    }


    const getCategory = () => {
        setLoading(true);
        instance.get('categories/get-all').then((res) => {
            if (res.status == 200) {
                console.log(res);
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].selected = false;
                }
                setListCategories(res.data);
                setCourseStaticList(res.data);
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
        let tempList = listCategories;
        //? check / uncheck all items
        tempList.map((value) => (value.selected = e.target.checked));
        // update State
        setMasterChecked(e.target.checked);
        setListCategories(tempList);
        setSlelectedList(listCategories.filter((e) => e.selected));
    }

    //!! on selected checkced with click table row
    const onClickItemCheck = (item) => {
        let tempList = listCategories;
        tempList.map((value) => {
            if (value.id == item.id) {
                value.selected = !item.selected;
            }
            return value;
        });

        //? to control master checkbox state
        const totalItems = listCategories.length;
        const totalCheckedItems = tempList.filter((e) => e.selected).length;

        //? update State
        setMasterChecked(totalItems == totalCheckedItems);
        setListCategories(tempList);
        setSlelectedList(listCategories.filter((e) => e.selected));
    }

    //? update List items state and master checkbox state
    const onItemCheck = (e, item) => {
        let tempList = listCategories;
        tempList.map((value) => {
            if (value.id == item.id) {
                value.selected = e.target.checked;
            }
            return value;
        });

        //? to control master checkbox state
        const totalItems = listCategories.length;
        const totalCheckedItems = tempList.filter((e) => e.selected).length;

        //? update State
        setMasterChecked(totalItems == totalCheckedItems);
        setListCategories(tempList);
        setSlelectedList(listCategories.filter((e) => e.selected));
    }

    const onAcceptDialog = () => {
        if (selectList.length == 0) {
            instance.delete(`categories/delete/${categoryId}`).then((response) => {
                if (response.status == 200) {
                    //console.log(response);
                    getCategory();
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
            instance.delete(`categories/delete/${list}`).then((response) => {
                if (response.status == 200) {
                    //console.log(response);
                    getCategory();
                }
            }).catch((error) => {
                console.log(error);
                setShowDialog(false);
            })
        }
    }

    return (
        <form className="mx-4">
            <CustomDialog onAccept={onAcceptDialog} setShowDialog={setShowDialog} showDialog={showDialog} />
            {
                loading && currentCategory.length == 0 ?
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
                        <h6 className="font-iran text-sm font-bold mb-10">نمایش دسته ها</h6>
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
                                    <td>نام</td>
                                    <td>تاریخ ایجاد</td>
                                    <td>تاریخ ویرایش</td>
                                    <td className='pl-0'>ویرایش</td>
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
                                    (currentCategory || []).map((value, index) => (
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
                                            <td className="text-[.65rem]">{value.name}</td>
                                            <td className="text-[.80rem] font-yRegular">{convertDate(value.created_at)}</td>
                                            <td className="text-[.80rem] font-yRegular">{convertDate(value.updated_at, true)}</td>
                                            <td>
                                                <button type="button" onClick={() => { setValueUpdate(value); value.selected = !value.selected }}
                                                    className="text-[.60rem] text-gray-400 hover:text-gray-500 no-underline">
                                                    <EditOutlined />
                                                </button>
                                            </td>
                                            <td className='pl-5 pr-3'>
                                                <DeleteOutlineOutlined onClick={() => {
                                                    value.selected = !value.selected
                                                    setCategoryId(value.id); setShowDialog(true);
                                                }} className="text-gray-400 hover:text-gray-500 font-normal" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {listCategories.length > prePage ? <Pagination prePage={prePage} totalList={listCategories.length} paginate={paginate} /> : <></>}
                    </>
            }
        </form >
    )
}


export default ShowCategories;