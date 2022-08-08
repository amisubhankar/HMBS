import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { logoutAction } from '../../Redux/login/loginActions'
import { Modal, Button } from "react-bootstrap";



function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const lg = useSelector(state=>state.loginR)
    const [show,setShow] = useState(true)

    //function for dispatching logout action so that
    //a user/admin can logged out
    const handleLogout = () => {
        dispatch(logoutAction(lg.role))
        navigate('/')
    }
    
    //function to close the Modal alert box
    const handleClose = () => {
        setShow(false)
        navigate('/')
    }

    return (
        <Modal show={show}>
        <Modal.Header closeButton='true'>
          <Modal.Title>Logout from application</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Logout
