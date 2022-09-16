import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundAuth from '../../components/BackgroundAuth';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomInputPass from '../../components/CustomInputPass';
import { instance } from '../../services/configServer';

const RegisterScreen = () => {

    let navigation = useNavigate();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loadingButton, setLoadingButton] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoadingButton(true);
        instance.post('users/register', {
            'username': username,
            'password': password,
            'firstname': firstName,
            'lastname': lastName,
            'phone': phoneNumber,
            'approved': '1',
            'teacher': 0,
            'role': 1,
            'status_users': 1,
            'gender': 1,
            'score': 0,
        }).then((response) => {
            if (response.status == 201) {
                setLoadingButton(false);
                navigation('/login', { replace: true });
            }
        }).catch((error) => {
            setLoadingButton(false);
            setError(error.response.data.message);
        })
    }

    return (
        <BackgroundAuth>
            <div className='bg-gradient-to-tr from-pink-600 via-pink-800 to-pink-400 xl:flex sm:hidden flex-col items-center justify-center w-full h-full bg-blue-400'>
                <div className='absolute text-white text-2xl font-iran font-bold text-center'>
                    <p>ثبت نام</p>
                    <br />
                    <p className='text-xs w-[28rem] font-medium leading-6'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام </p>
                </div>
            </div >
            <form onSubmit={onSubmit} className='flex flex-col items-start justify-center p-10'>
                <p className='font-iran font-bold text-lg w-full text-center'>ثبت نام</p>
                <br />
                <CustomInput
                    error={error.length !== 0}
                    placeholder='نام'
                    name={firstName}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <CustomInput
                    error={error.length !== 0}
                    placeholder='نام خانوادگی'
                    name={lastName}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <CustomInput
                    error={error.length !== 0}
                    placeholder='شماره همراه'
                    maxLength={11}
                    name={phoneNumber}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <CustomInput
                    error={error.length !== 0}
                    placeholder='نام کاربری'
                    name={username}
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                />
                <CustomInputPass
                    label='گذرواژه'
                    value={password}
                    showPassword={true}
                    onClick={() => setShowPassword(!showPassword)}
                    onChange={(e) => setpassword(e.target.value)}
                />
                <p className='flex transition-opacity duration-1000 text-xs text-red-500 font-iran h-6'>
                    {error ? error : ''}
                </p>
                <CustomButton disabled={loadingButton} text='ثبت نام' loading={loadingButton} color="blue" />
                <div>
                </div>
                <br />
                <p className='w-full text-center font-iran text-xs'>
                    قبلا ثبت نام کردید؟<Link to='/login' replace={true}>ورود</Link>
                </p>
            </form >

        </BackgroundAuth >
    )
}

export default RegisterScreen;