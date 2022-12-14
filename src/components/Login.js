import { useEffect, useState } from "react"
import React from "react"
import Alert from "react-bootstrap/esm/Alert"
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/esm/Form';
import GoogleSignin from "./GoogleSignin";

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config"

const Login = ({ addFirestoreUser }) => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    // const [loginErr, setLoginErr] = useState()
    const [alert, setAlert] = useState()

    const login = async (e) => {
        e.preventDefault()
        if (loginData.email === "" || loginData.password === "") {
            return setAlert({ message: "Please fill in all fields.", variant: "danger" })
        }
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then()
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // setLoginErr(errorMessage)
                setAlert({ message: errorMessage, variant: "danger" })
            });
    }

    return (
        <div className="container py-5 ">
            <div className="row d-flex align-items-center justify-content-center ">
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <h1 className="mb-5 text-center">Login</h1>
                    <form onSubmit={(e) => login(e)}>
                        {/* {loginVal && <Alert variant="danger">{loginVal}</Alert>} */}
                        {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}
                        {/* {loginErr && <Alert variant="danger">{loginErr}</Alert>} */}
                        {/* <!-- Email input --> */}
                        <FloatingLabel controlId="email" label="Email" className="mb-3">
                            <Form.Control type="email" onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
                        </FloatingLabel>

                        {/* <!-- Password input --> */}
                        <FloatingLabel controlId="password" label="Password" className="mb-3">
                            <Form.Control type="password" onChange={e => setLoginData({ ...loginData, password: e.target.value })} />
                        </FloatingLabel>

                        <div className="d-flex justify-content-around align-items-center mb-4">
                            {/* <!-- Checkbox --> */}
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                            </div>
                            <a href="#!">Forgot password?</a>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg btn-block" >Sign in</button>
                        </div>
                    </form>
                    <div className="d-grid">
                        <div className="divider align-items-center my-4">
                            <p className="text-center fw-bold mx-3 mb-0 text-muted ">OR</p>
                        </div>
                        <GoogleSignin addFirestoreUser={addFirestoreUser} setAlert={setAlert} />
                    </div>
                    <div className="d-flex justify-content-around align-items-center my-4">
                        Don't have an account yet? &nbsp;
                        <a href="/register">Register</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login