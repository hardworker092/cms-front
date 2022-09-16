import React from 'react';
import { Outlet } from 'react-router-dom'
import Layout from '../Layout';

const SideBar = () => {
    return (
        <div className="flex flex-row w-full h-screen fixed">
            <div className="hidden lg:flex flex-[2] md:hidden bg-gradient-to-t from-blue-600 to-blue-700 mt-20 rounded-tl-[4rem] h-full">
                <Layout />
            </div>
            <div className='flex flex-[12] justify-end'>
                {/* <div className='absolute h-20 flex justify-end items-center px-5 w-full bg-white z-30 border-b'>
                    <div className='flex flex-row justify-start items-center'>
                        <div className='flex justify-center items-center w-9 h-9 rounded-full bg-[#fff] hover:bg-gray-100 mt-1 cursor-pointer icon-button'>
                            <Settings fontSize={'small'} className='text-black icon-button' />
                        </div>
                        <SizedBox width={15} />
                        <div className=' flex justify-center items-center w-9 h-9 rounded-full bg-[#fff] hover:bg-gray-100 cursor-pointer icon-button'>
                            <div className='relative icon-button'>
                                <Notifications fontSize={'small'} className='text-black' />
                                <Badge postion={'top-1 right-0.5'} />
                            </div>
                        </div>
                        <SizedBox width={10} />
                        <div className='w-0.5 h-6 bg-gray-200' />
                        <SizedBox width={20} />
                        <span className='font-iran text-[.70rem] font-bold text-black'>
                            محمد مداحی
                        </span>
                        <SizedBox width={20} />
                        <div className=' flex justify-center items-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer icon-button'>
                            <Person className='text-black' fontSize={'small'} />
                        </div>
                    </div>
                </div> */}
                <div className='bg-white w-full overflow-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SideBar;
