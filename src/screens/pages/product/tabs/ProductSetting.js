import React, { useContext, useRef } from 'react'
import SunEditor from 'suneditor-react';
import CustomInput from '../../../../components/CustomInput';
import InputNumber from '../../../../components/CustomInputNum';
import SizedBox from '../../../../components/SizedBox';
import { ProductContext } from '../../../../hooks/useProductContext';

const ProductSetting = () => {
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };
    const editor = useRef(null);
    const { type, setType, discountPrice, setDiscountPrice, duration, setDuration, teacher, setTeacher, lessonCount, setLessonCount, tinyDesc, setTinyDesc, price, setPrice } = useContext(ProductContext);

    const products = [
        {
            'id': 1,
            'title': 'اقتصادی',
        },
        {
            'id': 2,
            'title': 'روانشناسی تغییر',
        },
        {
            'id': 3,
            'title': 'اهمال کاری',
        },
        {
            'id': 4,
            'title': 'خدا شناسی',
        },
        {
            'id': 5,
            'title': 'احکام رقص',
        },
    ];

    return (
        <div>
            <SunEditor
                onChange={(content) => setTinyDesc(content)}
                defaultValue={tinyDesc}
                setOptions={{
                    height: 150,
                    buttonList: [['undo', 'redo'], ['font', 'fontSize', 'formatBlock'], ['paragraphStyle', 'blockquote'], ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'], ['fontColor', 'textStyle'], ['outdent', 'indent'], ['align', 'horizontalRule', 'list', 'lineHeight'], ['table', 'link', 'image', 'video', 'audio'], ['imageGallery'], ['fullScreen', 'showBlocks', 'codeView'], ['preview', 'print'], ['save', 'template']]
                }}
                setDefaultStyle='text-2xl'
                height='150'
                placeholder="توضیح کوتاه محصول"
                getSunEditorInstance={getSunEditorInstance}
            />
            <div className='border border-gray-400 mt-2 rounded-sm px-2'>
                <h6 className='font-iran text-sm mt-4 text-black'>اطلاعات محصول</h6>
                <hr />
                {/* <div className='flex flex-row my-2 px-2'>
                    <FormControlLabel value={0} control={<Checkbox value={0} onChange={(e) => setType(e.target.value)} />} label="مجازی" />
                    <FormControlLabel value={1} control={<Checkbox value={1} onChange={(e) => setType(e.target.value)} />} label="دانلودی" />
                </div> */}
                <div className='pl-5'>
                    <InputNumber value={price} onChange={(e) => setPrice(e.target.value)} suffix="تومان" label={'قیمت عادی (تومان)'} />
                    <SizedBox width={20} />
                    <InputNumber value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} label={'قیمت فروش ویژه (تومان)'} />
                </div>
            </div>
            <div className='border border-gray-400 mt-2 rounded-sm px-2'>
                <h6 className='font-iran text-sm mt-4 text-black'>زمان</h6>
                <hr />
                <div className='flex flex-row gap-x-2'>
                    <CustomInput value={duration} onChange={(e) => setDuration(e.target.value)} placeholder={'دقیقه'} />
                    <CustomInput value={teacher} onChange={(e) => setTeacher(e.target.value)} placeholder={'استاد'} />
                    <CustomInput value={lessonCount} onChange={(e) => setLessonCount(e.target.value)} placeholder={'تعداد جلسات'} />
                </div>
            </div>
        </div>
    )
}

export default ProductSetting