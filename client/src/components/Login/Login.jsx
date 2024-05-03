import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../Context/AccountContext";
import { useContext, useState } from "react";
import "./style.css";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axios";

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AccountContext);

    const handleLogin = async (username, password) => {
        const response = await axiosInstance.post("/auth/login", {
            username,
            password,
        });
        if (response.data) {
            if (response.data.loggedIn) {
                console.log(response.data)
                localStorage.setItem("token", response.data.token)
                setUser({ ...response.data });
                navigate("/home");
            } else {
                toast.error(response.data.message);
            }
        } else {
            toast.error("Boom on server");
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
                onSubmit={async (values, actions) => {
                    setLoading(true);
                    await handleLogin(values.username, values.password);

                    setLoading(false);
                    // actions.resetForm();
                }}
            >
                {(formik) => (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                    >
                        <h2>Log In</h2>
                        <TextField
                            name="username"
                            placeholder="Enter username"
                            label={"username"}
                        />

                        <TextField
                            name="password"
                            placeholder="Enter password"
                            label={"password"}
                            type="password"
                        />
                        <div className="auth-form-buttons-container">
                            <button type="submit">
                                {loading ? "Loading ..." : "Log In"}
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/register");
                                }}
                            >
                                Create Acount
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
