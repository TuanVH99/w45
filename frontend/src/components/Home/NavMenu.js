import React, { useContext, useEffect } from "react";
import { Navbar, Container, Nav, Form, Button, FormControl } from "react-bootstrap";
import UserContext from "../authentication/UserContext";
import Avatar from "../Detail/Avatar"
import { useParams } from 'react-router';

import {
    Link, useHistory
} from "react-router-dom";

function NavMenu(props) {
    const { authUser, setAuthUser } = useContext(UserContext);
    useEffect(() => {
        if (authUser) {

        }
    }, [authUser])
    const handleAuthUser = () => {
        if (!authUser || authUser["Error"]) {
            return (<>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/auth">Đăng nhập/Đăng ký</Nav.Link>
                        <Nav.Link as={Link} to="/test">Phòng thí nghiệm</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </>)
        }
        if (authUser) {
            return (
                <Nav className="ml-auto flex-row">
                    <Nav.Link as={Link} to={"/profile"}>  {authUser.username} <Avatar size="lg0" /></Nav.Link>
                </Nav>
            )
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Cookpad</Navbar.Brand>
                <Form inline>
                    <FormControl type="text" placeholder="Tìm kiếm..." className="mr-sm-2" />
                    <Button variant="outline-warning"><span>&#128269;</span></Button>
                </Form>
                {handleAuthUser()}



            </Container>
        </Navbar>
    )
}

export default NavMenu