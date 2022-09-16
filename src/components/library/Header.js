import { CloseRounded } from '@mui/icons-material'
import React from 'react'

const Header = ({ indexMenu, setIndexMenu, setShowDialog }) => {
    return (
        <div className='w-full py-4 bg-[#d1d1d1] shadow-sm shadow-gray-400 flex justify-between items-center'>
            <div className='flex justify-center items-center flex-[2]'>
                <ul className='mr-10 flex bg-white rounded-lg overflow-hidden justify-center items-center'>
                    <li className={` w-52 text-center ${indexMenu == 2 ? 'bg-gray-600' : 'bg-white'} ${indexMenu == 2 ? 'text-white' : 'text-black'}`}>
                        <button type='button' onClick={() => setIndexMenu(2)} className={`w-full font-aviny px-3`}>
                            افزودن پرونده های رسانه
                        </button>
                    </li>
                    <li className={` w-52 text-center ${indexMenu == 1 ? 'bg-gray-600' : 'bg-white'} ${indexMenu == 1 ? 'text-white' : 'text-black'}`}>
                        <button onClick={() => setIndexMenu(1)} type='button' className={`font-aviny px-3 w-full`}>
                            کتابخانه پرونده های چند رسانه ای
                        </button>
                    </li>
                </ul>
            </div>
            <div className='flex justify-center items-center flex-[.1]'>
                <button type='button' onClick={() => setShowDialog(false)} className='w-5 h-5 rounded-full bg-[#FF5F57] flex justify-center items-center cursor-pointer'>
                    <CloseRounded fontSize='inherit' className={`text-[#FF5F57] hover:text-black`} />
                </button>
            </div>
        </div>
    )
}

export default Header