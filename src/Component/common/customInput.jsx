import React from 'react';

const CustomInput = ({placeholder,type,name,onChange,error}) => {
    return (
        <>
            <input onChange={onChange} className="form-control  my-2" placeholder={placeholder} type={type} name={name} />
            {error && <div className='text-danger'>{error}</div>}
        </>
    );
}

export default CustomInput;
