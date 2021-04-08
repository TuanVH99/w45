import React, { useContext, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import userContext from "../authentication/UserContext";
import Avatar from '../Detail/Avatar';



function Profile() {
    const { authUser, setAuthUser } = useContext(userContext)
    const history = useHistory();
    useEffect(() => {
        if (!authUser) {
            history.push('/')
        }
    }, [authUser, history])

    const handleKitchen = () => {
        if (!authUser.mykitchen|| authUser.mykitchen==[]) {
            return (
                <blockquote class="blockquote text-center m-5 p-5">
                    <p class="mb-0">Hình như bạn chưa tạo món nào cả, hãy vào bếp thôi.</p>
                </blockquote>
            )
        }
    }
    const handleBookmark = () => {
        if (!authUser.mybookmark || authUser.mybookmark==[]) {
            return (
                <blockquote class="blockquote text-center p-5 m-5">
                    <p class="mb-0">Bạn chua lưu món nào</p>
                </blockquote>
            )
        }
    }




    if (!authUser) {
        return null
    }
    return (
        <Container className="mt-5 pt-5">
            <div className="text-center">
                <Avatar size="avt" src={authUser.avatar} />
                <h3>{authUser.username}</h3>
                <figure>
                    <blockquote className="blockquote">
                        <p>{authUser.description}</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        By {authUser.username} <cite title="Source Title">{(new Date(authUser.created)).toLocaleString()}</cite>
                    </figcaption>
                </figure>
            </div>
            <h3 className="mb-0 mt-5 h3">Nhà bếp của tôi</h3>
            <hr></hr>
            {handleKitchen()}
            <Button variant="outline-warning" className="rounded-pill">Thêm món ...</Button>
            <h3 className="mb-0 mt-5 h3">Món ăn đã lưu</h3>
            <hr />
            {handleBookmark()}
            <hr></hr>
            <div class="d-flex justify-content-center">
                <Button variant="outline-info" className="rounded-pill m-3">Chỉnh sửa thông tin cá nhân</Button>
                <Button onClick={()=>{
                    setAuthUser(null)
                    history.push('/')
                }} variant="outline-info" className="rounded-pill m-3">Đăng xuất</Button>
            </div>


        </Container>)
}

export default Profile