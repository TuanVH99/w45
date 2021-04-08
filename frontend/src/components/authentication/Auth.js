import React, { useContext, useEffect } from "react";
import { Tabs, Tab, Container } from "react-bootstrap"
import { useHistory } from "react-router";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import userContext from "./UserContext"


function Auth() {
    const { authUser,setAuthUser } = useContext(userContext)
    const history = useHistory()
    useEffect(() => {
        if (authUser) {
            history.push('/')
        }
    }, [authUser, history])

    return (<Container className="pt-5">
        <Tabs justify defaultActiveKey="login" id="uncontrolled-tab-example">
            <Tab eventKey="signup" title="Đăng ký">
                <SignUp />
            </Tab>
            <Tab eventKey="login" title="Đăng nhập">
                <LogIn />
            </Tab>
        </Tabs>
    </Container>)
}
export default Auth







