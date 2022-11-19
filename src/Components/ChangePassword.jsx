import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { Form } from "react-bootstrap";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ChangePassword = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputs,setInputs]=useState({
        pw_old:"",
        pw_new1:"",
        pw_new2:""
    })

    const {pw_old,pw_new1,pw_new2}=inputs;

    const onChange=(e)=>{
        setInputs({...inputs,[e.target.name]:e.target.value})
    }

    const onSubmitForm=async(e)=>{
        e.preventDefault();
        let parseRes
        try {

            const body={pw_old,pw_new1,pw_new2};

            const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}/auth/change-password`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(body)
            });

             parseRes= await response.json();
            //console.log(parseRes);
            toast.error(parseRes.message)
            
            //window.location='/profile'
            
        } catch (error) {
            //console.error(error.message)
            toast.error(parseRes.message)
            //console.log(parseRes.message)
        }
    }
    return (
        <>
            <Button className="edit-profile-btn" onClick={handleShow}>Change Password<i class="fa-solid fa-key"></i></Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Your Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmitForm}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Old Password</Form.Label>
                            <Form.Control required type="password" placeholder="Old password" name="pw_old" 
                              value={pw_old} onChange={e=>onChange(e)} />
                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Enter New Password</Form.Label>
                            <Form.Control type="password" placeholder=" New Password" name="pw_new1" 
                              value={pw_new1} onChange={e=>onChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Re-Enter New Password</Form.Label>
                            <Form.Control type="password" placeholder=" New Password" name="pw_new2" 
                              value={pw_new2} onChange={e=>onChange(e)}/>
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