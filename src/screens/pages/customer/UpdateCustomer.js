import React, { useEffect, useRef, useState } from "react";
import CustomInput from '../../../components/CustomInput';
import SizedBox from '../../../components/SizedBox'
// import { DatePicker } from "jalali-react-datepicker";
import { MenuItem, Select, FormControl } from "@mui/material";
import CustomButton from '../../../components/CustomButton';
import CustomSelect from '../../../components/CustomSelect';
import { instance } from '../../../services/configServer';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'


const AddCustomer = () => {

    const { id } = new useParams();
    let navigate = new useNavigate();

    const fileRef = useRef(null);
    const [userId, setUserId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [firstName, setFirtName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [approved, setApproved] = useState(false);
    const [role, setRole] = useState(0);
    const [selectedImage, setSelectedImgae] = useState('');
    const [picture, setPicture] = useState('');
    const [gender, setGender] = useState(1);
    const [nationalCode, setNationalCode] = useState('');
    const [birthday, setBirthday] = useState(Date);
    const [bornPlace, setBornPlace] = useState('');
    const [status, setStatus] = useState(0);
    const [score, setScore] = useState('');
    const [alert, setAlert] = useState({
        'status': 'success',
        'message': ''
    });


    useEffect(() => {
        getUsersById();
    }, [])

    const getUsersById = () => {
        setLoadingPage(true);
        instance.get('users/get').then((response) => {
            if (response.status == 200) {
                const res = response.data.filter((value) => value.id == parseInt(id))[0];
                setApproved(res.approved);
                setBirthday(Date);
                setBornPlace(res.born_place);
                setEmail(res.email);
                setFirtName(res.fullname.split(' ')[0]);
                setLastName(res.fullname.split(' ')[1]);
                setGender(res.gender);
                setNationalCode(res.national_code);
                setPhone(res.phone);
                setPicture(res.picture);
                setRole(res.role);
                setScore(res.score);
                setStatus(res.status_users);
                setUsername(res.username);
                setLoadingPage(false);
            }
        }).catch((error) => {
            setLoadingPage(false);
        })
    }


    const onFileChange = (e) => {
        setPicture('');
        setSelectedImgae('');
        if (e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/jpg') {
            setSelectedImgae(e.target.files[0]);
            setPicture(URL.createObjectURL(e.target.files[0]));
            console.log(picture);
        }
    }

    let preview;
    if (picture) {
        preview = <img className="rounded-full w-52 h-52" src={picture} alt='File preview' />;
    }

    const clearAlert = () => {
        setTimeout(() => {
            setAlert({ status: '', 'message': '' })
        }, 3000);
    }

    const onSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('firstname', firstName.trim());
        formData.append('picture', selectedImage);
        formData.append('lastname', lastName.trim());
        formData.append('phone', phone);
        formData.append('approved', approved ? 1 : 0);
        formData.append('role', approved == 1 ? role : 0);
        formData.append('status_users', status);
        formData.append('gender', gender);
        formData.append('score', score);
        formData.append('birthday', birthday);
        formData.append('born_place', bornPlace);
        formData.append('national_code', nationalCode);
        formData.append('email', email);
        instance.post(`users/update/${id}`, formData).then((response) => {
            if (response.status == 200) {
                setLoading(false);
                setAlert({ status: 'success', message: 'ویرایش کاربر با موفقیت انجام شد' })
                clearAlert();
                navigate('/admin/showCustomer', { replace: true });
            }
        }).catch((error) => {
            setAlert({ status: 'error', message: error.response.data.message })
            setLoading(false);
            clearAlert();
            console.log(error);
        })
    }

    return (
        <form onSubmit={onSubmit} className="py-5 px-4 mt-24">
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
                        <h6 className='font-iran font-bold text-black mb-10'>ویرایش کاربر </h6>
                        {alert.message.length !== 0 ? <div className={`h-16 ${alert.status == 'success' ? 'bg-green-400' : alert.status == 'warn' ? 'bg-yellow-400' : 'bg-red-400'} mb-3 mt-3 pr-1 rounded-md shadow-sm shadow-black`}>
                            <div className='h-full bg-gray-100 rounded-md text-right px-3 flex flex-col justify-center'>
                                <span className={`${alert.status == 'success' ? 'text-green-600' : alert.status == 'warn' ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {alert.status == 'success' ? 'موفقیت آمیز' : alert.status == 'warn' ? 'احتیاط' : 'خطا'}
                                </span>
                                <span className='text-black font-normal text-[.65rem] mt-1'>
                                    {alert.message}
                                </span>
                            </div>
                        </div> : <div />}
                        <div className="w-full grid-cols-5 grid gap-x-2">
                            <div className="grid col-span-3 border border-gray-100 rounded-md p-2">
                                <div className="flex flex-row">
                                    <CustomInput
                                        value={firstName}
                                        placeholder='نام'
                                        onChange={(e) => setFirtName(e.target.value)}
                                    />
                                    <SizedBox width={20} />
                                    <CustomInput
                                        value={lastName}
                                        placeholder='نام خانوادگی'
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-row">
                                    <CustomInput
                                        value={phone}
                                        maxLength={11}
                                        placeholder='شماره همراه'
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <SizedBox width={20} />
                                    <CustomInput
                                        value={username}
                                        placeholder='نام کاربری'
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <CustomInput
                                    value={email}
                                    placeholder='ایمیل'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="flex flex-row">
                                    <CustomInput
                                        value={nationalCode}
                                        placeholder='کد ملی'
                                        onChange={(e) => setNationalCode(e.target.value)}
                                    />
                                    <SizedBox width={20} />
                                    <CustomInput
                                        value={bornPlace}
                                        placeholder='محل تولد'
                                        onChange={(e) => setBornPlace(e.target.value)}
                                    />
                                </div>
                                <div className="w-full font-iran text-xs">
                                    {/* <input type={'date'} value={birthday} onChange={(e) => setBirthday(e.target.value)} /> */}
                                    {/* <DatePicker
                                        label="تاریخ تولد"
                                        timePicker={false}
                                        className="w-full font-yRegular text-base cursor-pointer focus:outline-none border-[1px] border-gray-400 h-12 rounded-md px-2 mt-2 mb-2"
                                        value={birthday}
                                        onChange={(e) => console.log(e)}
                                        onClickSubmitButton={(e) => setBirthday(e.value._i.replace('-//', ''))}
                                    /> */}
                                </div>
                                <SizedBox height={10} />
                                <CustomInput
                                    value={score}
                                    placeholder='امتیاز کاربر'
                                    onChange={(e) => setScore(e.target.value)}
                                />
                                {
                                    approved ?
                                        <CustomSelect label={'سطح دسترسی'} value={role} name={role} onChange={(e) => setRole(e.target.value)}>
                                            <MenuItem value={0}><span className='text-sm'>مشترکین</span></MenuItem>
                                            <MenuItem value={1}><span className='text-sm'>مشارکت کنندگان</span></MenuItem>
                                            <MenuItem value={2}><span className='text-sm'>نویسندگان</span></MenuItem>
                                            <MenuItem value={3}><span className='text-sm'>ویرایگشران</span></MenuItem>
                                            <MenuItem value={4}><span className='text-sm'>مدیرکل</span></MenuItem>
                                            <MenuItem value={5}><span className='text-sm'>مشترکین</span></MenuItem>
                                        </CustomSelect>
                                        : <div />
                                }
                                <div className="flex felx-row mt-3">
                                    <input className="w-3.5 h-3.5" id="approved" type={'checkbox'} value={approved}
                                        checked={approved ? true : false} onChange={(e) => setApproved(e.target.checked)} />
                                    <label className="focus:outline-none focus:border-0 font-iran text-xs mr-2" htmlFor="approved">دسترسی به پنل مدیریت</label>
                                </div>
                                <label className="font-iran text-xs mt-3">جنسیت</label>
                                <div className="flex">
                                    <div className="flex flex-row mt-2">
                                        <input id="male" name="gender" defaultChecked={gender == 1 ? true : false} value={1} onChange={(e) => setGender(e.target.value)} type={"radio"} />
                                        <label className="mr-1 font-iran text-sm" htmlFor="male">آقا</label>
                                    </div>
                                    <SizedBox width={20} />
                                    <div className="flex flex-row mt-2">
                                        <input id="famale" name="gender" defaultChecked={gender == 0 ? true : false} value={0} onChange={(e) => setGender(e.target.value)} type={"radio"} />
                                        <label className="mr-1 font-iran text-sm" htmlFor="famale">خانم</label>
                                    </div>
                                </div>
                            </div>
                            <div className="relative border border-gray-100 grid col-span-2 items-start rounded-md p-2">
                                <div className="flex flex-col">
                                    <input ref={fileRef} hidden className="w-full h-12" type="file" name="image" title='انتخاب تصویر' onChange={onFileChange} />
                                    <div className="border ml-72 border-gray-300 rounded-md flex flex-row">
                                        <button className="w-52 border-none h-12 flex items-center justify-center bg-blue-200 text-xs font-iran text-gray-500 font-bold" type="button" onClick={() => fileRef.current.click()}>
                                            انتخاب تصویر
                                        </button>
                                        <div className=" w-full flex justify-center items-center text-xs font-iran">
                                            {picture == "" || picture == null ? 'تصویر انتخاب نشده' : selectedImage.name}
                                        </div>
                                    </div>
                                    <div className="w-full h-[35rem] flex justify-center items-center">
                                        {preview}
                                    </div>
                                    <div className="absolute bottom-3 left-3">
                                        <CustomButton
                                            loading={loading}
                                            disabled={loading}
                                            text={'ویرایش'}
                                            color={'green'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
            }

        </form>
    )
}

export default AddCustomer;