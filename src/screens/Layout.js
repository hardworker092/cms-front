import { TreeView, TreeItem } from '@mui/lab'
import { ArrowDropUp, ArrowDropDown, } from '@mui/icons-material';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import TreeLabel from '../components/TreeLabel'

const Layout = () => {
    let navigate = useNavigate();
    return (
        <div className='w-full'>
            <div className='w-full h-56 flex flex-col justify-center items-center shadow-sm rounded-tl-[4rem] mb-3'>
                <img style={{ width: 100, height: 100 }} className="rounded-full" src="/background.png" alt="hello" />
                {/* <span className='mt-3 text-white text-center text-xs font-iran'>
                    <p>محمد مداحی 09150553208</p>
                </span> */}
            </div>
            <TreeView
                disabledItemsFocusable={false}
                aria-label="file system navigator"
                defaultCollapseIcon={<ArrowDropUp />}
                defaultExpandIcon={<ArrowDropDown />}
                sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>

                <TreeItem onClick={() => navigate('dashbord')} className='text-white focus:bg-darkLight' nodeId="1" label={<TreeLabel className={'text-white font-iran text-[.8rem] p-3'} />} />

                <TreeItem className='text-white' nodeId="2" label={<TreeLabel title='دوره ها' className={'text-white font-iran text-[.8rem] p-3'} />}>
                    <TreeItem onClick={() => navigate('showCourse')} nodeId="10" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem]'} title='نمایش دوره ها' />} />
                    <TreeItem onClick={() => navigate('addCourse')} nodeId="11" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem]'} title='افزودن دوره' />} />
                </TreeItem>

                <TreeItem className='text-white' nodeId="3" label={<TreeLabel title='درس ها' className={'text-white font-iran text-[.8rem] p-3'} />}>
                    <TreeItem onClick={() => navigate('showLesson')} nodeId="12" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem] w-full focus:bg-white'} title='نمایش درس ها' />} />
                    <TreeItem onClick={() => navigate('addLesson')} nodeId="13" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem]'} title='افزودن درس' />} />
                </TreeItem>

                <TreeItem className='text-white' nodeId="4" label={<TreeLabel title='نوشته ها' className={'text-white font-iran text-[.8rem] p-3'} />}>
                    <TreeItem onClick={() => navigate('showArticle')} nodeId="14" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem]'} title='نمایش نوشته ها' />} />
                    <TreeItem onClick={() => navigate('addArticle')} nodeId="15" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem]'} title='افزودن نوشته' />} />
                </TreeItem>

                <TreeItem className='text-white' nodeId="5" label={<TreeLabel title='کاربران' className={'text-white font-iran text-[.8rem] p-3'} />}>
                    <TreeItem onClick={() => navigate('showCustomer')} nodeId="16" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem]'} title='نمایش کاربران' />} />
                    <TreeItem onClick={() => navigate('addCustomer')} nodeId="17" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem]'} title='افزودن کاربر' />} />
                </TreeItem>

                <TreeItem className='text-white' nodeId="6" label={<TreeLabel title='تیکت ها' className={'text-white font-iran text-[.8rem] p-3'} />}>
                    <TreeItem onClick={() => navigate('/showTicket')} nodeId="18" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem]'} title='همه تیکت ها' />} />
                    <TreeItem onClick={() => navigate('/newTicket')} nodeId="19" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem]'} title='تیکت جدید' />} />
                    <TreeItem onClick={() => navigate('/departeman')} nodeId="20" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem]'} title='د‍‍‍پارتمان ها' />} />
                </TreeItem>

                <TreeItem className='text-white' nodeId="7" label={<TreeLabel title='محصولات' className={'text-white font-iran text-[.8rem] p-3'} />}>
                    <TreeItem onClick={() => navigate('showProduct')} nodeId="21" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem]'} title='نمایش محصولات' />} />
                    <TreeItem onClick={() => navigate('addProduct')} nodeId="22" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem]'} title='افزودن محصول' />} />
                </TreeItem>

                <TreeItem className='text-white' nodeId="8" label={<TreeLabel title='دسته ها' className={'text-white font-iran text-[.8rem] p-3'} />}>
                    <TreeItem onClick={() => navigate('categories')} nodeId="23" label={<TreeLabel className={'text-gray-300 font-iran py-3 pr-8 text-[.7rem]'} title='مدیریت دسته بندی ها' />} />
                </TreeItem>
            </TreeView>
        </div>
    )
}

export default Layout