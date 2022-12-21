import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import React from "react"
import Alert from "react-bootstrap/Alert"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";


// TODO: add hashing for passwords

const Login = ({ _onLogin, pb }) => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    const [loginVal, setLoginVal] = useState("")
    useEffect(() => {
        if (pb.authStore.isValid) {
            navigate("/tasks")
        }
    })

    const login = async (e) => {
        e.preventDefault()
        try {
            await pb.collection('users').authWithPassword(loginData.email, loginData.password);
            _onLogin()
            return navigate("/tasks")
        } catch (err) {
            console.log(err.data)
            setLoginVal("Invalid email/password")
        }
    }



    return (
        <div className="container py-5 ">
            <div className="row d-flex align-items-center justify-content-center ">
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <form onSubmit={(e) => login(e)}>
                        {loginVal && <Alert variant="danger">{loginVal}</Alert>}
                        {/* <!-- Email input --> */}
                        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                            <Form.Control type="email" onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
                        </FloatingLabel>

                        {/* <!-- Password input --> */}
                        <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
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

                        {/* <!-- Submit button --> */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg btn-block" >Sign in</button>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>

                            <a className="btn btn-primary btn-lg" style={{ backgroundColor: "#3b5998" }} href="#!"
                                role="button">
                                <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
                            </a>
                            <a className="btn btn-primary btn-lg " style={{ backgroundColor: "#55acee" }} href="#!"
                                role="button">
                                <i className="fab fa-twitter me-2"></i>Continue with Twitter</a>
                        </div>
                        <div className="d-flex justify-content-around align-items-center my-4">
                            Don't have an account yet? &nbsp;
                            <a href="/register">Register</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login