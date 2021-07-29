import React, {SyntheticEvent, useState, useEffect} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";
import {Button, Form, Modal} from "react-bootstrap";
import SearchEvent from "../Event/SearchBar";
import GroupUsersList from "../Group/GroupUsersList";


const RemoveUserToGroupModal = ({group, id, refreshGroup}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userListDefault, setUserListDefault] = useState();
    const [userList, setUserList] = useState();

    const refreshGroupManageUsers = (groupId) => {
        refreshGroup(groupId)
    }

    const fetchData = async () => {
        return await fetch('https://apisymfonykelian.herokuapp.com/api/users')
            .then(response => response.json())
            .then(data => {
                setUserList(data)
                setUserListDefault(data)
            });}

    useEffect( () => {fetchData()},[]);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Manage users
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Manage user's rights</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h1>User List</h1>

                    <GroupUsersList handleShow={handleShow} refreshGroupManageUsers={refreshGroupManageUsers} groupUserList={userList} group={group} id={id}/>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default RemoveUserToGroupModal;