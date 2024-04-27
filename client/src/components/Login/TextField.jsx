import { Field, useField } from "formik";

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const isInvalid = meta.touched && meta.error;
    return (
        <div
            className={`${isInvalid ? "" : ""} auth-input-container`}
        >
            <label>{label}</label>
            <input as={Field} {...field} {...props} />
            <span>{meta.error}</span>
        </div>
    );
};

export default TextField;
