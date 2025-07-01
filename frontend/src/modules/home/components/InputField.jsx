import React from 'react';

const InputField = ({ label, name, type, register, error }) => {
    return (
        <div className="input-wrapper">
        <label htmlFor={name} className="input-label">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            {...register(name)}
            className={`input ${error ? 'input-error' : ''}`}
        />
        {error && <p className="form-error">{error.message}</p>}
        </div>
    );
};

export default InputField;

