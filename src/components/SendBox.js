import SizedBox from "./SizedBox";
import { MenuItem, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomSelect from "./CustomSelect";


const SendBox = ({
    status,
    setStatus,
    visibility,
    setVisibility,
    code,
    setCode,
    loading,
    categoriesList,
    setCategoryListId,
    categoryListId,
    isUpdate = false,
}) => {

    const handleCategory = (id) => {
        if (categoryListId.find((value) => value == id) == undefined ? true : false) {
            setCategoryListId([...categoryListId, id]);
            console.log(categoryListId);
        } else {
            var array = [...categoryListId];
            var index = array.indexOf(id);
            if (index != -1) {
                array.splice(index, 1);
                setCategoryListId(array);
            }
            console.log(categoryListId);
        }
    }

    const returnSubCat = (category, level = 1) => {
        return category.map((value) => {
            level = level + 10;
            return (
                <div style={{ marginRight: level }}>
                    <label className={`cursor-pointer font-iran text-xs font-bold`}>
                        <input checked={categoryListId.find((cat) => cat == value.id ? true : false)} onClick={() => handleCategory(value.id)} type={'checkbox'} className="w-4 h-4 cursor-pointer" />{" "}
                        {value.name}
                    </label>
                    {returnSubCat(value.children, level)}
                </div>
            )
        })
    }

    const returnCategories = (category = categoriesList) => {
        return category.map((value) => {
            return (
                <>
                    <label className={`cursor-pointer font-iran text-xs font-bold`}>
                        <input checked={categoryListId.find((cat) => cat == value.id ? true : false)} onClick={() => handleCategory(value.id)} type={'checkbox'} className="w-4 h-4 cursor-pointer" />{" "}
                        {value.name}
                    </label>
                    {returnSubCat(value.children)}
                </>
            )
        })
    }

    return (
        <div className="flex flex-col">
            <div className="border border-gray-400 p-3 text-right rounded-md">
                <span>????????????</span>
                <hr />
                <span className="mb-3">?????????? : {status == 1 ? '???? ???????????? ??????????????' : "?????? ????????"}</span>
                <CustomSelect onChange={(e) => setStatus(e.target.value)} value={status} label={'??????????'}>
                    <MenuItem className="text-right" value={0}> <span className="font-bold py-1">?????? ???????? </span> </MenuItem>
                    <MenuItem value={1}><span className="font-bold py-1"> ???? ???????????? ?????????????? </span></MenuItem>
                </CustomSelect>
                <span>???????????? ???????????? : {visibility == 1 ? '??????????' : visibility == 2 ? '???????????? ?????? ???? ?????? ????????' : '??????????'}</span>
                <FormControl className="w-full">
                    <RadioGroup
                        onChange={(e) => setVisibility(e.target.value)}
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={1}
                        value={visibility}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel className="font-iran" style={{
                            font: 'unset'
                        }} value={1} control={<Radio size="small" />} label="??????????" />
                        <FormControlLabel value={2} control={<Radio size="small" />} label="???????????? ?????? ???? ?????? ????????" />
                        {visibility == 2 ? <div className="mt-2">
                            <CustomInput name={code} value={code} onChange={(e) => setCode(e.target.value)} placeholder='???? ????????' />
                        </div> : ""}
                        <FormControlLabel
                            value={3}
                            control={<Radio size="small" />
                            }
                            label="??????????"
                        />
                    </RadioGroup>
                </FormControl>
                <div className="text-left">
                    <CustomButton
                        disabled={loading}
                        loading={loading}
                        color={isUpdate ? 'green' : 'blue'}
                        text={isUpdate ? '????????????' : '????????????'}
                    />
                </div>
            </div>
            <SizedBox height={10} />
            <div className="border border-gray-400 rounded-md h-80 overflow-auto p-2 pt-3 gap-y-3 flex flex-col">
                {returnCategories()}
            </div>
        </div>
    )
}

export default SendBox;