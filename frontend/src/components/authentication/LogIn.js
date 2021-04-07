import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";

function LogIn() {
    const history = useHistory();
    const [value, setValue] = useState({
        username: "",
        password: "",

    })

    const { authedUser, setAuthedUser } = useContext(UserContext)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (authedUser) {
            history.push("/")
        }
    }, [authedUser, history])
    const handleInput = () => {
        if (value.password === "" || value.username === "") {
            setError("Hãy điền đầy đủ thông tin")
            return false
        }
        if (value.username.length <= 6 || value.password.length <= 6) {
            setError("Vui long điền đúng định dạng")
            return false
        }
        return true
    }
    const onChangeInput = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }
    const submitUser = (e) => {
        if (!handleInput()) {
            return
        }
        e.preventDefault();
        setLoading(true)
        setError("")
        setSuccess(false)
        fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {
                Accepts: "application/json",
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(value)
        }).then(res => res.json())
            .then(
                (result) => {
                    if (result.Error) {
                        setError(result.Error)
                        setLoading(false)
                    } else {
                        console.log(result)
                        const { token } = result
                        setAuthedUser(result)
                        localStorage.setItem('token', token)
                        setSuccess(true)
                        history.push("/")
                    }
                }
            )
    }
    return (
        <>
            <Card>
                <Card.Header className="text-center">Đăng nhập</Card.Header>
                <Card.Body>
                    <Form>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">Đang đăng nhập...</Alert>}
                        <Form.Group controlId="formUsername">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Form.Control type="text" placeholder="điền tên tài khoản của bạn" name="username" onChange={onChangeInput} />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder="điền mật khẩu của bạn tại đây..." name="password" onChange={onChangeInput} />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button variant="primary" className="rounded-pill w-50 " onClick={submitUser}>
                                {loading ? <Spinner animation="border" variant="light" /> : "Đăng nhập"}
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
export default LogIn