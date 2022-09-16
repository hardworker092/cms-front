import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import Header from './Header';
import ShowFile from './ShowFile';
import AddFile from './AddFile';


const Library = ({ showDialog, setShowDialog, setFileName, setFileLink }) => {

    const [indexMenu, setIndexMenu] = useState(1);

    return (
        <Transition appear show={showDialog} as={Fragment}>
            <Dialog
                as="div"
                className="fixed justify-center items-center inset-0 z-10 overflow-y-auto bg-black bg-opacity-80"
                onClose={() => setShowDialog(false)}
            >
                <div className="min-h-screen h-full text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="text-right inline-block w-full h-full overflow-auto align-middle transition-all transform bg-gray-200 shadow-xl">
                            <div className='flex justify-center items-center h-full bg-gradient-to-t from-[#0198FF] to-[#0382d6]'>
                                <div className='w-full h-full bg-gray-200'>
                                    <Header indexMenu={indexMenu} setIndexMenu={setIndexMenu} setShowDialog={setShowDialog} />
                                    <div className='overflow-auto'>
                                        {
                                            indexMenu == 1 ?
                                                <ShowFile setShowDialog={setShowDialog} setFileName={setFileName} setFileLink={setFileLink} />
                                                :
                                                <AddFile />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Library