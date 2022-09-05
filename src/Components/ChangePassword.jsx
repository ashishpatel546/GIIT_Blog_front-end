import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { Form } from "react-bootstrap";

const ChangePassword = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button className="edit-profile-btn" onClick={handleShow}>Change Password<i class="fa-solid fa-key"></i></Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Your Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Old Password</Form.Label>
                            <Form.Control type="password" placeholder="Old password" />
                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Enter New Password</Form.Label>
                            <Form.Control type="password" placeholder=" New Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Re-Enter New Password</Form.Label>
                            <Form.Control type="password" placeholder=" New Password" />
                        </Form.Group>

                        
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                
            </Modal>
        </>
    )
}
export default ChangePassword;