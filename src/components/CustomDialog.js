import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';


const CustomDialog = ({ onAccept, showDialog, setShowDialog }) => {
    return (
        <Transition appear show={showDialog} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-aut bg-[#000] bg-opacity-80"
                onClose={() => setShowDialog(false)}
            >
                <div className="min-h-screen px-4 text-center">
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
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-sm font-bold font-iran leading-6 text-gray-900 text-right"
                            >
                                آیا از انجام این عمل اطمینان دارید؟
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-xs font-iran text-gray-500 text-right">
                                    توجه / این عملیات غیرقابل بازگشت می باشد
                                </p>
                            </div>
                            <div className="mt-6 flex flex-row justify-center">

                                <button
                                    type="button"
                                    className="w-56 outline-none font-iran ml-5 inline-flex justify-center px-4 py-2 text-xs text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={() => setShowDialog(false)}
                                >
                                    اتصراف
                                </button>
                                <button
                                    type="button"
                                    className="w-56 outline-none font-iran inline-flex justify-center px-4 py-2 text-xs text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={onAccept}
                                >
                                    بله
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default CustomDialog