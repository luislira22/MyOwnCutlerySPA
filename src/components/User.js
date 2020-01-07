import React, { useState, useEffect } from 'react'
import config from '../Config'
import axios from "axios";
import LogInModal from './modals/LogInModal';
import SignUpModal from './modals/SignUpModal';
import EditAccountModal from './modals/EditAccountModal'
import { Button, ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap';
import * as QUERIES from '../data/queries'


const User = (props) => {

    const [showLogIn, setShowLogIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const [user, setUser] = useState();
    const [rememberMe, setRememberMe] = useState(true);

    useEffect(() => {
        const value = localStorage.getItem('loginData');
        if (value) {
            userLogIn(JSON.parse(value))
        }
    }, []);



    const logIn = async user => {
        return await QUERIES.logInClient(user);
    }

    const userLogIn = (data) => {
        props.setUserToken(data.token);
        console.log(data.permissions);
        setUser(data.user);
        props.setPermitMdfp(data.permissions.MDFP);
        props.setUpdateNameAddress(data.permissions.updateNameAndAddress);
        props.setPermitAllOrders(data.permissions.getAllOrders);
        props.setPermitAllClients(data.permissions.getAllClients);
        props.setPermitOrders(data.permissions.getOrders);
        props.setPermitDeleteClient(data.permissions.deleteClient);
        props.setPermitClient(data.permissions.getClient);
        props.setPermitCancelOrder(data.permissions.cancelOrder)
        props.setPermitUpdateOrder(data.permissions.updateOrder)
        if (rememberMe) {
            localStorage.setItem('loginData', JSON.stringify(data));
        }
    }
/*
    const consultClient = async () => {
        return await axios({
            method: "get",
            url: config.routes.users.consultClient,
            headers: { "Content-Type": "application/json;charset=UTF-8", "Authorization": props.userToken },
        }).then(response => {
            return response;
        }).catch((error) => {
            return error.response;
        })
    }*/



    const logOut = () => {
        props.setUserToken(null);
        setUser(null);
        props.resetPermissions();
        localStorage.clear();
    }

    return (
        <>
            {!user ?
                <>
                    <ButtonToolbar>
                        <Button variant="light" style={{ marginRight: "15px" }} onClick={() => setShowLogIn(true)}>Log In</Button>
                        <Button variant="outline-light" onClick={() => setShowSignUp(true)}>Sign Up</Button>
                    </ButtonToolbar>
                    <LogInModal
                        show={showLogIn}
                        onHide={e => setShowLogIn(false)}
                        login={logIn}
                        rememberMe={rememberMe}
                        setRememberMe={setRememberMe}
                        userLogIn={userLogIn}
                    />
                    <SignUpModal
                        show={showSignUp}
                        onHide={e => setShowSignUp(false)}
                        createuser={(user) => QUERIES.createClient(user)}
                    />
                </>
                :
                <>
                    <DropdownButton
                        alignRight
                        title={user.name ? user.name.firstname + " " + user.name.lastname : user.email}
                        id="dropdown-menu-align-right"
                        variant="secondary">
                        {user.name &&
                            <Dropdown.Item eventKey="1" onSelect={() => setShowEditUser(true)}>Consult Account</Dropdown.Item>
                        }
                        <Dropdown.Item eventKey="2" onSelect={() => QUERIES.deleteMyAccount(props.userToken).then(logOut)}>Delete Account</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="3" onSelect={() => logOut()}>Log Out</Dropdown.Item>
                    </DropdownButton>
                    {user.name &&
                        <EditAccountModal
                            show={showEditUser}
                            onHide={e => setShowEditUser(false)}
                            user={user}
                            updateClient={(user) => QUERIES.updateClient(user, props.userToken)}
                            cannotUpdate={!props.updateNameAddress}
                        />
                    }
                </>
            }
        </>
    )
}
export default User;