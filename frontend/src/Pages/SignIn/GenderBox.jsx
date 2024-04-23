import React from 'react'

const GenderBox = (props) => {
    const handleOnChange = (value) =>{
        props.setgender(value)
    }

    return (
        <>
            <div className="flex flex-row">
                <h4>Gender: &nbsp;</h4>
                <input type='radio' id='male' className=' radio radio-primary'  name='gender' value='Male' onChange={()=>handleOnChange('Male')}/>
                <label htmlFor='male'>&nbsp;Male</label>
                <input type='radio' id='female' className=' radio radio-primary ms-4' name='gender'  value='Female' onChange={()=>handleOnChange('Female')}/>
                <label htmlFor='female'>&nbsp;Female</label>
            </div>
        </>
    )
}

export default GenderBox
