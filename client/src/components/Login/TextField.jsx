import { Field, useField } from "formik";

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const isInvalid = meta.touched && meta.error;
    return (
        <div
            className={`${isInvalid ? "invalid-input-container" : ""} input-container`}
        >
            <label>{label}</label>
            <Field  {...field} {...props} />
            <span>{meta.error}</span>
        </div>
    );
};

export default TextField;
