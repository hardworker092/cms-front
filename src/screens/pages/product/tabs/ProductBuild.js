import React, { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../../../../hooks/useProductContext'
import CustomInput from '../../../../components/CustomInput';
import Library from '../../../../components/library/main';
import { instance } from '../../../../services/configServer';

const ProductBuild = () => {
    const { fileName, setFileName, fileLink, setFileLink, fileListId, setFileListId, fileList, setFileList, setAlert } = useContext(ProductContext);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getFile();
    }, [])

    const getFile = () => {
        instance.get('files/get').then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }

    const clearAlert = () => {
        setTimeout(() => {
            setAlert({ status: 'sucess', message: '' })
        }, 5000);
    }


    const addFile = () => {
        if (fileName == "") {
            setAlert({ status: 'error', message: 'تکمیل گزینه نام فایل الزامی است' });
            clearAlert();
        } else if (fileName == "") {
            setAlert({ status: 'error', message: 'تکمیل گزینه لینک فایل الزامی است' });
            clearAlert();
        } else {
            instance.post('files/add', {
                "title": fileName,
                "link": fileLink,
            }).then((response) => {
                if (response.status == 201) {
                    setFileList([...fileList, response.data]);
                    setFileListId([...fileListId, response.data.id]);
                    setFileLink('');
                    setFileName('');
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const handleDeleteFile = (id) => {
        setFileList(fileList.filter((value) => value.id !== id));
    }

    return (
        <div>
            <Library
                showDialog={open}
                setShowDialog={setOpen}
                setFileName={setFileName}
                setFileLink={setFileLink}
            />
            <div className='flex flex-row gap-x-2'>
                <CustomInput
                    placeholder={'نام فایل'}
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
                <CustomInput
                    placeholder={'لینک'}
                    value={fileLink}
                    onChange={(e) => setFileLink(e.target.value)}
                />
                <button type='button' onClick={addFile} className='w-64 h-[3.3rem] flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-md border-[1px] border-gray-400'>
                    <span> افزودن </span>
                </button>
                <button onClick={() => setOpen(true)} type='button' className='w-64 h-[3.3rem] flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-md border-[1px] border-gray-400'>
                    <span> انتخاب از گالری </span>
                </button>
            </div>
            {fileList.length !== 0 ? <span className='mb-2'>تعداد فایل های اضافه شده : <span className='font-yRegular inline-block text-base'>{fileList.length}</span></span> : <div />}
            {
                fileList.length == 0 ?
                    <div />
                    :
                    fileList.map((value, index) => {
                        return (
                            <div className='flex flex-row justify-between  py-4 border border-gray-600 px-4 rounded-md mb-2'>
                                <div className='flex flex-row'>
                                    <div className='w-9 h-9 bg-blue-400 rounded-full flex justify-center items-center text-white font-yRegular'>
                                        {index + 1}
                                    </div>
                                    <div className='flex items-center mr-2 font-iran text-sm'>
                                        {value.title}
                                    </div>
                                </div>
                                <div>
                                    <button type='button' onClick={() => handleDeleteFile(value.id)}>
                                        حذف
                                    </button>
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default ProductBuild