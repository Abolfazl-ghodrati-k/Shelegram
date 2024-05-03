
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AccountContext } from "../../Context/AccountContext";
import { toast } from "react-toastify";

function SignUp() {
    const navigate = useNavigate();
    const { setUser } = useContext(AccountContext);
    const [loading, setLoading] = useState(false);

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
                    const vals = { ...values };
                    setLoading(true);

                    await fetch("http://localhost:5050/auth/signup", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(vals),
                    })
                        .catch((err) => {
                            toast.error(
                                err.message ||
                                    "Error on Server Please try again later"
                            );
                            console.log(err);
                            return;
                        })
                        .then((res) => {
                            if (!res || !res.ok || res.status >= 400) {
                                toast.error("BooMM on server");
                                return;
                            }
                            return res.json();
                        })
                        .then((data) => {
                            if (!data) return;
                            setUser({ ...data });
                            navigate("/home");
                        });
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
                            <button
                                onClick={() => navigate("/")}
                            >
                                Back
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default SignUp;
