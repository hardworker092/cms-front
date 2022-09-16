import { Check } from '@mui/icons-material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { instance } from '../../services/configServer';
import CustomButton from '../CustomButton';

const ShowFile = ({ setShowDialog, setFileName, setFileLink }) => {

    const [fileId, setFileId] = useState(0);
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState('');

    const listFolder = [
        {
            'id': 1,
            'titel': 'شخص',
            'desc': 'تصاویر کاربران و اعضای تیم'
        },
        {
            'id': 2,
            'titel': 'رسانه',
            'desc': 'تصاویر رسانه ای'
        },
        {
            'id': 3,
            'titel': 'نوشته',
            'desc': 'تصاویر نوشته ها'
        },
        {
            'id': 4,
            'titel': 'فایل',
            'desc': 'تصاویر مرتبط با فایل های دانلودی'
        },
    ]

    useEffect(() => {
        setFile([]);
        getFiles();
    }, [])

    const getFiles = () => {
        setLoading(true);
        instance.get('libraries/get').then((response) => {
            if (response.status == 200) {
                setFileList(response.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className='grid grid-cols-6 h-screen'>
            <div className='grid col-span-5'>
                <div className='flex-wrap flex gap-3 my-2 pr-2'>
                    {
                        loading && fileList.length == 0 ?
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
                            fileList.map((value) => {
                                return (
                                    <div key={value.id} onDoubleClick={() => setShowDialog(false)} onClick={() => { setFileId(value.id); setFile(value); setFileName(value.title); setFileLink(value.picture) }} className={`relative flex flex-col items-center w-52 h-72 bg-white rounded-md cursor-pointer overflow-hidden ${fileId == value.id ? 'border-2 border-blue-500' : 'border-none'}`}>
                                        <img width={'100%'} height={'50'} src={value.picture} />
                                        <span className='absolute bottom-2'>{value.title}</span>
                                        {fileId == value.id ? <div className='absolute top-1 right-1 bg-blue-500 rounded-full w-5 h-5 flex justify-center items-center'>
                                            <Check fontSize='small' className='text-white' />
                                        </div> : <div />}
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
            <div className='grid grid-cols-1 bg-white'>
                {
                    file.length == 0 ? <div />
                        : <div className='w-full flex flex-col text-left'>
                            <img src={file.picture} alt="image" />
                            <div className='pr-4 mt-4 w-full flex flex-col gap-y-3 text-2xl'>
                                <span>نام : {file.title}</span>
                                <span>سایز فایل : {file.size}</span>
                                <span>فرمت فایل : {file.type}</span>
                                <span>آدرس فایل : <a href={file.picture}>{file.picture}</a></span>
                            </div>
                            <div className='mt-3 ml-3'>
                                <CustomButton
                                    type='button'
                                    text={'انتخاب فایل'}
                                    onClick={() => setShowDialog(false)}
                                />
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default ShowFile