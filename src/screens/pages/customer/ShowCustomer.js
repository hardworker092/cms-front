import { DeleteOutlineOutlined, Check, DoneAll, EditOutlined } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from '../../../services/configServer'
import { Spinner } from 'react-bootstrap'
import { convertDate } from "../../../functions/converts";
import { convertAdminAccess } from "../../../functions/convertAdminAccess";
import CustomDialog from "../../../components/CustomDialog";
import Pagination from "../../../components/Pagination";
import CustomInput from "../../../components/CustomInput";
import CustomSelect from "../../../components/CustomSelect";
import CustomButton from "../../../components/CustomButton";
import { MenuItem } from "@mui/material";

const ShowCustomer = () => {

    const checkedRef = useRef(null);
    const checkedAllRef = useRef(null);

    const [user, setUser] = useState(0);
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState(0);
    const [role, setRole] = useState(0);
    const [users, setUsers] = useState([]);
    const [sort, setSort] = useState(0);

    const [listUsers, setListUsers] = useState([]);
    const [userId, setUserId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectList, setSlelectedList] = useState([]);
    const [masterChecked, setMasterChecked] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [currentPage, setCureentpage] = useState(1);
    const [prePage] = useState(28);

    const indexOfLast = currentPage * prePage;
    const indexOfFirst = indexOfLast - prePage;
    const currentUser = listUsers.slice(indexOfFirst, indexOfLast);

    const paginate = pageNumber => setCureentpage(pageNumber);

    useEffect(() => {
        getUsers();
        getUserSelected();
    }, [currentPage])

    const getUserSelected = () => {
        instance.get('users/get').then((response) => {
            if (response.status == 200) {
                setUsers(response.data.filter((value) => value.approved == 1));
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const getUsers = () => {
        setLoading(true);
        console.log(currentPage);
        instance.get('users/get').then((res) => {
            console.log(res);
            if (res.status == 200) {
                console.log('res : ', res);
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].selected = false;
                }
                setListUsers(res.data);
                setLoading(false);
                setShowDialog(false);
            }
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            setShowDialog(false);
        })
    }

    //? select / unSelect table rows
    const onMasterCheck = (e) => {
        let tempList = listUsers;
        //? check / uncheck all items
        tempList.map((value) => (value.selected = e.target.checked));
        // update State
        setMasterChecked(e.target.checked);
        setListUsers(tempList);
        setSlelectedList(listUsers.filter((e) => e.selected));
    }

    //!! on selected checkced with click table row
    const onClickItemCheck = (item) => {
        let tempList = listUsers;
        tempList.map((value) => {
            if (value.id == item.id) {
                value.selected = !item.selected;
            }
            return value;
        });

        //? to control master checkbox state
        const totalItems = listUsers.length;
        const totalCheckedItems = tempList.filter((e) => e.selected).length;

        //? update State
        setMasterChecked(totalItems == totalCheckedItems);
        setListUsers(tempList);
        setSlelectedList(listUsers.filter((e) => e.selected));
    }

    //? update List items state and master checkbox state
    const onItemCheck = (e, item) => {
        let tempList = listUsers;
        tempList.map((value) => {
            if (value.id == item.id) {
                value.selected = e.target.checked;
            }
            return value;
        });

        //? to control master checkbox state
        const totalItems = listUsers.length;
        const totalCheckedItems = tempList.filter((e) => e.selected).length;

        //? update State
        setMasterChecked(totalItems == totalCheckedItems);
        setListUsers(tempList);
        setSlelectedList(listUsers.filter((e) => e.selected));
    }

    const onAcceptDialog = () => {
        if (selectList.length == 0) {
            instance.delete(`users/delete/${userId}`).then((response) => {
                if (response.status == 200) {
                    //console.log(response);
                    getUsers();
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
            instance.delete(`users/delete/${list}`).then((response) => {
                if (response.status == 200) {
                    // console.log(response);
                    getUsers();
                }
            }).catch((error) => {
                console.log(error);
                setShowDialog(false);
            })
        }
    }

    const filter = () => {
        instance.get(`users`, {
            params: {
                fullname: user == 0 ? null : user,
                username: username == '' ? null : username,
                gender: gender == 0 ? null : gender,
                role: role == 0 ? null : role,
                sort: sort == 0 ? 'desc' : 'asc',
            }
        }).then((response) => {
            if (response.status == 200) {
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    response.data[i].selected = false;
                }
                setListUsers(response.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <form className="mt-28 mx-16">
            <CustomDialog onAccept={onAcceptDialog} setShowDialog={setShowDialog} showDialog={showDialog} />
            {
                loading && currentUser.length == 0 ?
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
                        <h6 className="font-iran font-bold text-black mb-10">نمایش کاربران</h6>
                        <div className="flex flex-row gap-x-2">
                            <CustomSelect
                                label={'نام و نام خانوادگی'}
                                value={user}
                                name={user}
                                onChange={(e) => setUser(e.target.value)}
                            >
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    key={0}
                                    value={0}>
                                    <span className='text-sm'>همه کاربران</span>
                                </MenuItem>
                                {
                                    users.map((value) => {
                                        return (
                                            <MenuItem
                                                style={{ font: 'unset' }}
                                                key={value.id}
                                                value={value.fullname}>
                                                <span className='text-sm'>{value.fullname}</span>
                                            </MenuItem>
                                        )
                                    })
                                }
                            </CustomSelect>
                            <CustomInput
                                placeholder={'نام کاربری'}
                                value={username}
                                name={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <CustomSelect
                                label={'جنسیت'}
                                value={gender}
                                name={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={0}>
                                    <span className='text-sm'>همه</span>
                                </MenuItem>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={1}>
                                    <span className='text-sm'>آقا</span>
                                </MenuItem>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={2}>
                                    <span className='text-sm'>خانم</span>
                                </MenuItem>
                            </CustomSelect>
                            <CustomSelect
                                label={'دسترسی'}
                                value={role}
                                name={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={0}>
                                    <span className='text-sm'>همه دسترسی ها</span>
                                </MenuItem>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={1}>
                                    <span className='text-sm'>{convertAdminAccess(0)}</span>
                                </MenuItem>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={2}>
                                    <span className='text-sm'>{convertAdminAccess(1)}</span>
                                </MenuItem>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={3}>
                                    <span className='text-sm'>{convertAdminAccess(2)}</span>
                                </MenuItem>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={4}>
                                    <span className='text-sm'>{convertAdminAccess(3)}</span>
                                </MenuItem>
                                <MenuItem
                                    style={{ font: 'unset' }}
                                    value={5}>
                                    <span className='text-sm'>{convertAdminAccess(4)}</span>
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
                                    <td>
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
                                    <td>
                                        ردیف
                                    </td>
                                    <td>نام و نام خانوادگی</td>
                                    <td>شماره همراه</td>
                                    <td>نام کاربری</td>
                                    <td>جنسیت</td>
                                    <td>دسترسی</td>
                                    <td>تاریخ ایجاد</td>
                                    <td>تاریخ ویرایش</td>
                                    <td>عملیات</td>
                                    <td>
                                        <div onClick={() => selectList.length !== 0 && setShowDialog(true)} className='ml-2 relative text-gray-600 w-12 h-12 flex justify-center items-center hover:bg-black hover:bg-opacity-10 rounded-full cursor-pointer transition duration-700'>
                                            {/* <div className='w-0 h-0 bg-black absolute rounded-full transition ease-in active:-scale-0 duration-500'></div> */}
                                            <DeleteOutlineOutlined />
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (currentUser || []).map((value, index) => (
                                        <tr onClick={() => onClickItemCheck(value)} key={value.id}>
                                            <td>
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
                                                    {value.selected ?
                                                        <Check fontSize={'small'} className="text-white" /> : ''}
                                                </div>
                                            </td>
                                            <td className="text-[.80rem] font-yRegular">{index + 1}</td>
                                            <td className="text-[.65rem] flex items-center">
                                                <img className="rounded-full w-10 h-10 ml-2" src={value.picture} alt='File preview' />
                                                {value.fullname}
                                            </td>
                                            <td className="text-[.65rem]">{value.phone}</td>
                                            <td className="text-[.65rem]">{value.username}</td>
                                            <td className="text-[.65rem]">{value.gender == 1 ? "آقا" : "خانم"}</td>
                                            <td className="text-[.65rem]">{convertAdminAccess(value.role)}</td>
                                            <td className="text-[.80rem] font-yRegular">{convertDate(value.created_at)}</td>
                                            <td className="text-[.80rem] font-yRegular">{convertDate(value.updated_at, true)}</td>
                                            <td>
                                                <Link
                                                    className="text-[.60rem] text-gray-400 hover:text-gray-500 no-underline"
                                                    to={`/admin/updateCustomer/${value.id}`}>
                                                    <EditOutlined />
                                                </Link>
                                            </td>
                                            <td className='pl-5 pr-3'>
                                                <DeleteOutlineOutlined onClick={() => { setUserId(value.id); setShowDialog(true) }} className="text-gray-400 hover:text-gray-500 font-normal" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {listUsers.length > prePage ? <Pagination prePage={prePage} totalList={listUsers.length} paginate={paginate} /> : <></>}
                    </>
            }
        </form >
    )
}

export default ShowCustomer;