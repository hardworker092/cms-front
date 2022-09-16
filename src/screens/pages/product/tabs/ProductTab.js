import { MenuItem } from '@mui/material';
import React, { useContext, useRef } from 'react'
import SunEditor from 'suneditor-react';
import CustomInput from '../../../../components/CustomInput';
import CustomSelect from '../../../../components/CustomSelect';
import { ProductContext } from '../../../../hooks/useProductContext';

const ProductTab = () => {
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };
    const editor = useRef(null);

    const { title, setTitle, desc, setDesc, author, setAuthor, authorList } = useContext(ProductContext);

    return (
        <div>
            <div className='flex flex-row gap-x-2'>
                <CustomInput
                    name={title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="نام محصول"
                />
                <CustomSelect onChange={(e) => setAuthor(e.target.value)} value={author} label={'نویسنده'}>
                    {
                        authorList.map((value) => {
                            return (
                                <MenuItem
                                    className='font-iran'
                                    style={{ font: 'unset' }}
                                    key={value.id}
                                    value={value.id}>
                                    <span className='text-sm'>{value.fullname} {value.phone}</span>
                                </MenuItem>
                            )
                        })
                    }
                </CustomSelect>
            </div>
            <SunEditor
                disableToolbar={false}
                onChange={(content) => setDesc(content)}
                defaultValue={desc}
                setOptions={{
                    height: 500,
                    buttonList: [['undo', 'redo'], ['font', 'fontSize', 'formatBlock'], ['paragraphStyle', 'blockquote'], ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'], ['fontColor', 'textStyle'], ['outdent', 'indent'], ['align', 'horizontalRule', 'list', 'lineHeight'], ['table', 'link', 'image', 'video', 'audio'], ['imageGallery'], ['fullScreen', 'showBlocks', 'codeView'], ['preview', 'print'], ['save', 'template']]
                }}
                setDefaultStyle='text-2xl'
                height='500'
                placeholder="توضیحات محصول"
                getSunEditorInstance={getSunEditorInstance}
            />
        </div>
    )
}

export default ProductTab