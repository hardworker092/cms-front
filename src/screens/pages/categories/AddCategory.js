import React, { useContext } from 'react'
import CustomButton from '../../../components/CustomButton'
import CustomInput from '../../../components/CustomInput'
import CustomSelect from '../../../components/CustomSelect'
import { returnCategories } from '../../../functions/returnCategory'
import { CategoryContext } from '../../../hooks/useCategoryContext'

const AddCategory = () => {

    const {
        slug,
        setSlug,
        name,
        setName,
        loading,
        desc,
        setDesc,
        categoriesList,
        parentCategory,
        setParentCategory,
        valueUpdate,
        update
    } = useContext(CategoryContext)

    return (
        <div>
            <CustomInput
                placeholder={'نامک'}
                value={slug}
                name={slug}
                defaultValue={valueUpdate.name}
                onChange={(e) => setSlug(e.target.value)}
            />
            <CustomInput
                placeholder={'نام دسته'}
                value={name}
                name={name}
                onChange={(e) => setName(e.target.value)}
            />
            <CustomSelect
                selected={true}
                value={parentCategory}
                label='دسته مادر'
                onChange={(e) => setParentCategory(e.target.value)}
            >
                <option value={0}>
                    هیچکدام
                </option>
                {returnCategories(categoriesList)}
            </CustomSelect>
            <CustomInput
                multiline
                placeholder={'توضیحات'}
                value={desc}
                name={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <CustomButton
                text={update ? 'ویرایش' : 'انتشار'}
                color={update ? 'green' : 'blue'}
                loading={loading}
                disabled={loading}
            />
        </div>
    )
}

export default AddCategory