import React, { useState, useEffect } from "react"
import Alert from "react-bootstrap/esm/Alert"
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/esm/Form';

// Firebase
import { doc, setDoc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase-config"

export default function ChangePassword({ nav }) {
    const [user, setUser] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log("onAuthStateChanged")
            if (!user) return nav("/login")
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef)
            user.extraInfo = docSnap.data()
            setUser(user)
        })
    }, [])

    const [changePasswordData, setChangePasswordData] = useState({ oldPassword: "", password: "", passwordConfirm: "" })
    const [errorData, setErrorData] = useState({})

    const submit = async (e) => {
        e.preventDefault()
        // try {
        //     const record = await pb.collection('users').update(pb.authStore.model.id, changePasswordData);
        //     await pb.collection('users').authWithPassword(record.email, changePasswordData.password);
        //     setErrorData("none")
        // } catch (err) {
        //     setErrorData(err.data.data)
        //     console.log(err.data.data)
        // }
    }
    return (
        <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <form onSubmit={(e) => submit(e)}>
                        {(errorData === "none") && <Alert variant="success">Password Changed</Alert>}

                        {/* <!-- Email input --> */}
                        {errorData && (errorData.oldPassword && <Alert variant="danger">{errorData.oldPassword.message}</Alert>)}
                        <FloatingLabel controlId="oldPassword" label="current Password" className="mb-3">
                            <Form.Control autoFocus type="password" onChange={e => setChangePasswordData({ ...changePasswordData, oldPassword: e.target.value })} />
                        </FloatingLabel>

                        {/* <!-- Password input --> */}
                        {errorData && (errorData.password && <Alert variant="danger">{errorData.password.message}</Alert>)}
                        <FloatingLabel controlId="password" label="New Password" className="mb-3">
                            <Form.Control type="password" onChange={e => setChangePasswordData({ ...changePasswordData, password: e.target.value })} />
                        </FloatingLabel>

                        {/* <!-- Password input --> */}
                        {errorData && (errorData.passwordConfirm && <Alert variant="danger">{errorData.passwordConfirm.message}</Alert>)}
                        <FloatingLabel controlId="passwordConfirm" label="Confirm Password" className="mb-3">
                            <Form.Control type="password" onChange={e => setChangePasswordData({ ...changePasswordData, passwordConfirm: e.target.value })} />
                        </FloatingLabel>

                        {/* <!-- Submit button --> */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-outline-primary btn-lg btn-block" >Change password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}