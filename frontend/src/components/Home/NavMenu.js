import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import UserContext from "../authentication/UserContext";
import Avatar from "../User/Avatar"

import {
    Link, useHistory
} from "react-router-dom";

function NavMenu() {
    const { authedUser, setAuthedUser } = useContext(UserContext);

  
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Cookpad</Navbar.Brand>
                {
                    authedUser ? (
                        <Nav className="ml-auto flex-row">
                        <Nav.Link as={Link} to="/profile">  {authedUser.username} <Avatar/></Nav.Link>
                        </Nav>
                    )
                     :
                        (<>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-auto">
                                    <Nav.Link as={Link} to="/auth">Đăng nhập/Đăng ký</Nav.Link>
                                    <Nav.Link as={Link} to="/test">Phòng thí nghiệm</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                            </>)
                }
            </Container>
        </Navbar>
    )
}

export default NavMenu