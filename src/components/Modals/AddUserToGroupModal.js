import React, {useState, useEffect} from "react";
import {Button, Modal} from "react-bootstrap";
import SearchEvent from "../Event/SearchBar";
import AddGroupUsersList from "../Group/AddGroupUsersList";
import { HiOutlineUserAdd } from "react-icons/hi";

const AddUserToGroupModal = ({group, id, refreshGroup}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [input, setInput] = useState('');
    const [userListDefault, setUserListDefault] = useState();
    const [userList, setUserList] = useState();

    const fetchData = async () => {
        return await fetch('https://apisymfonykelian.herokuapp.com/api/users')
            .then(response => response.json())
            .then(data => {
                setUserList(data)
                setUserListDefault(data)
            });}
    const updateInput = async (input) => {
        const filtered = userListDefault?.filter((user) => {
            return user.name.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setUserList(filtered);
    }
    const refreshGroupAddUser = (groupId) =>{
        refreshGroup(groupId)
    }

    useEffect( () => {fetchData()},[]);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <HiOutlineUserAdd></HiOutlineUserAdd>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h1>User List</h1>
                    <SearchEvent
                        input={input}
                        onChange={updateInput}
                    />

                    <AddGroupUsersList refreshGroupAddUser={refreshGroupAddUser} groupUserList={userList} group={group} id={id}/>

                </Modal.Body>

            </Modal>
        </>
    )
}

export default AddUserToGroupModal;