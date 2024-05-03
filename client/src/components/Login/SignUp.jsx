import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AccountContext } from "../../Context/AccountContext";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axios";

function SignUp() {
    const navigate = useNavigate();
    const { setUser } = useContext(AccountContext);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (username, password) => {
        const response = await axiosInstance.post("auth/signup", {
            username,
            password,
        });
        if (response.data) {
            if (response.data.loggedIn) {
                localStorage.setItem("token", response.data.token)
                setUser({ ...response.data });
                navigate("/home");
            } else {
                toast.error(response.data.message);
            }
        } else {
            toast.error("Error on server")
        }
    };

    return (
        <div className="auth-form">
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .required("Username required")
                        .min(6, "Username too short!")
                        .max(28, "Username too long!"),
                    password: Yup.string()
                        .required("Password required")
                        .min(6, "Password too short!")
                        .max(28, "Password too long!"),
                })}
                onSubmit={async (values) => {
                    setLoading(true);

                    await handleSignUp(values.username, values.password)
                    setLoading(false);
                }}
            >
                {(formik) => (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                    >
                        <h2>Sign Up</h2>
                        <TextField
                            name="username"
                            placeholder="Enter username"
                            autoComplete="off"
                            label={"username"}
                        />

                        <TextField
                            name="password"
                            placeholder="Enter password"
                            autoComplete="off"
                            label={"password"}
                            type="password"
                        />
                        <div className="auth-form-buttons-container">
                            <button type="submit">
                                {loading ? "Loading ..." : "Sign Up"}
                            </button>
                            <button onClick={() => navigate("/")}>Back</button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default SignUp;
