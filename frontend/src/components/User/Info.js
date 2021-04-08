import React, { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, Form, Button, FormControl } from "react-bootstrap";
import UserContext from "../authentication/UserContext";
import Avatar from "../Detail/Avatar"
import { useParams } from 'react-router';
import userContext from "../authentication/UserContext";
import axios from 'axios'
import {
    Link, useHistory
} from "react-router-dom";

function Info(props) {
    const { authUser, setAuthUser } = useContext(userContext);
    const [value, setValue] = useState({
        displayName: authUser.displayName ? authUser.displayName : undefined,
        avatar: authUser.avatar ? authUser.avatar : undefined,
        description: "",
        location: ""
    })
    const [inputValue, setInputValue] = useState(null)
    const onChangeInput = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }



    const fileInputOnChange = (e) => {

        const formData = new FormData()
        formData.append('file', e.target.files[0])
        axios.post("http://localhost:5000/upload", formData, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
           

    }
    return (<Container className="mt-5">
        <Avatar size="avt" src={value.avatar} />
        <div className="text-center m-3">
            <input type="file" className="border" onChange={fileInputOnChange} value={inputValue} />
        </div>
        <div className="d-flex justify-content-center">
            <Form className="w-25">
                <Form.Group controlId="signupUsername">
                    <Form.Label>Tên hiển thị</Form.Label>
                    <Form.Control type="text" disabled value={authUser.username} />
                </Form.Group>

                <Form.Group controlId="signupUsername">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control isValid={false} type="text"
                        placeholder="Nhập tên bạn muốn hiển thị" name="displayName" onChange={onChangeInput} />
                </Form.Group>
                <Form.Group controlId="signupUsername">
                    <Form.Label>Mô tả bản thân</Form.Label>
                    <Form.Control type="text"
                        placeholder="Nhập Mô tả của bạn" name="description" onChange={onChangeInput} />
                </Form.Group>
                <Button variant="primary" type="submit" block className="rounded-pill">Update</Button>
            </Form>
        </div>

    </Container>)
}

export default Info