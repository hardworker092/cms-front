import CustomInput from '../../../../../components/CustomInput'
import CustomSelect from '../../../../../components/CustomSelect'
import React, { useRef } from 'react';
import { MenuItem } from '@mui/material';
import { useContext } from 'react';
import { CourseContext } from '../../../../../hooks/useCourseContext';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const CourseTab = props => {
    const editor = useRef(null);
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    const { title, setTitle, desc, setDesc, author, setAuthor, authorList, teacher, setTeacher } = useContext(CourseContext);

    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row gap-x-2'>
                <CustomInput
                    name={title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="عنوان دوره"
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
                <CustomInput
                    name={teacher}
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                    placeholder="نام استاد"
                />
            </div>
            <SunEditor
                onChange={(content) => setDesc(content)}
                defaultValue={desc}
                setOptions={{
                    height: 200,
                    buttonList: [['undo', 'redo'], ['font', 'fontSize', 'formatBlock'], ['paragraphStyle', 'blockquote'], ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'], ['fontColor', 'textStyle'], ['outdent', 'indent'], ['align', 'horizontalRule', 'list', 'lineHeight'], ['table', 'link', 'image', 'video', 'audio'], ['imageGallery'], ['fullScreen', 'showBlocks', 'codeView'], ['preview', 'print'], ['save', 'template']]
                }}
                setDefaultStyle='text-2xl'
                height='500'
                placeholder="توضیحات دوره"
                getSunEditorInstance={getSunEditorInstance}
            />
        </div >
    )
}

export default CourseTab;