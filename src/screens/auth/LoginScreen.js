import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundAuth from '../../components/BackgroundAuth';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { instance } from '../../services/configServer';


const LoginScreen = () => {

    let navigation = useNavigate();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [error, setError] = useState('');
    const [loadingButton, setLoadingButton] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (username == '' || password == '') {
            setError('اطلاعات برای ورود به حساب کامل نیست');
        } else {
            setLoadingButton(true);
            instance.post('users/login', {
                'username': username,
                'password': password,
            }).then((response) => {
                if (response.status == 200) {
                    console.log(response);
                    setError('');
                    setLoadingButton(false);
                    console.log(response.data.Token);
                    sessionStorage.setItem('user_id', response.data.id);
                    sessionStorage.setItem('api_token', response.data.Token);
                    const token = sessionStorage.getItem('api_token');
                    if (token) {
                        navigation('/admin/dashbord', { replace: true });
                    } else {
                        setError('خطا در هنگام ورود به حساب کاربری')
                    }
                }
            }).catch((error) => {
                setLoadingButton(false);
                console.log(error);
                setError(error.response.data.message);
            })
        }
    }
    return (
        <BackgroundAuth>
            <div className='bg-gradient-to-tr from-pink-600 via-pink-800 to-pink-400 xl:flex sm:hidden flex-col items-center justify-center w-full h-full bg-blue-400 '>
                <div className='absolute text-white text-2xl font-iran font-bold text-center'>
                    <p>ورود</p>
                    <br />
                    <p className='text-xs w-[28rem] font-medium leading-6'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام </p>
                </div>
            </div >
            <form onSubmit={onSubmit} className='flex flex-col items-start justify-center p-10'>
                <p className='font-iran font-bold text-lg w-full text-center'>ورود کاربر</p>
                <br />
                <CustomInput
                    error={error.length !== 0}
                    placeholder='نام کاربری'
                    name={username}
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                />
                <CustomInput
                    error={error.length !== 0}
                    placeholder='گذرواژه'
                    name={password}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />
                <p className='flex transition-opacity duration-1000 text-xs text-red-500 font-iran h-6'>
                    {error ? error : ''}
                </p>
                <CustomButton disabled={loadingButton} text='ورود' loading={loadingButton} color="blue" />
                {/* <p className='w-full text-right font-iran text-xs'>
                        <Link to='/'>رمز عبور خود را فراموش کردم</Link>
                    </p> */}
                <div>
                </div>
                <br />
                <p className='w-full text-center font-iran text-xs'>
                    هنوز ثبت نام نکردید؟ <Link to='/register' replace={true}>ثبت نام</Link>
                </p>
            </form>

        </BackgroundAuth >
    )
}

export default LoginScreen;