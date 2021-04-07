import React from "react";
import { Tabs, Tab, Container } from "react-bootstrap"
import LogIn from "./LogIn";
import SignUp from "./SignUp";

function Auth() {
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







