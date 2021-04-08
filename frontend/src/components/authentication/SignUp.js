import React, { useState } from "react";
import {  Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";


function SignUp() {
    const history = useHistory();

    const [value, setValue] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const onChangeInput = (e) => {
            setValue({
                ...value,
                [e.target.name]: e.target.value
            })
    }
    const handleInput = () => {
        if (value.confirmPassword === "" || value.password === "" || value.username === "") {
            setError("Hãy điền đầy đủ thông tin")
            return false
        }
        if (value.username.length <= 5 || value.password.length <= 5) {
            setError("Vui long điền đúng định dạng")
            return false
        }
        return true
    }

    const submitUser = (e) => {
        if (!handleInput()) {
            return
        }
        e.preventDefault();
        setLoading(true)
        setError("")
        setSuccess(false)
        fetch('http://localhost:5000/sign-up', {
            method: "POST",
            headers: {
                Accepts: "application/json",
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(value)
        }).then(res => res.json())
            .then((result) => {
                    if (result.Error) {
                        setError(result.Error)
                        setLoading(false)
                    } else {
                        setSuccess(true)
                        history.push('/auth')
                    }
                })
    }
    return (
        <>
            <Card>
                <Card.Header className="text-center">Đăng ký</Card.Header>
                <Card.Body>
                    <Form>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">Đăng ký thành công, chuyển tới trang đăng nhập...</Alert>}
                        <Form.Group controlId="signupUsername">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Form.Control isValid={false} type="text" placeholder="Tên tài khoản gồm 6 ký tự" name="username" onChange={onChangeInput} />
                        </Form.Group>
                        <Form.Group controlId="signupPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Mật khẩu gồm 6 ký tự" name="password" onChange={onChangeInput} />
                        </Form.Group>
                        <Form.Group controlId="signupConfirmPassword">
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder="Xác nhận mật khẩu" name="confirmPassword" onChange={onChangeInput} />
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="primary" className="rounded-pill w-50" onClick={submitUser}>
                                {loading ? <Spinner animation="border" variant="light" /> : "Đăng ký"}
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
export default SignUp