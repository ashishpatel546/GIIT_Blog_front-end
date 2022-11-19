import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useEffect } from "react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile=({user})=>{

    const [show, setShow] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [country, setCountry] = useState(user.country);
    const [mobile, setMobile] = useState(user.mobile);
    useEffect(()=>{
        setName(user.name)
        setEmail(user.email)
        setCountry(user.country)
        setMobile(user.mobile)
    },[user])
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {

            const body = {name,email,country,mobile };
            const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}/user/${user.id}`, {
                method: "PATCH",
                headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}` },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
          
            
            window.location="/profile"
            } catch (err) {
            //console.error(err.message);
            toast.error(err.message)
        }
    }
    return (
        <>
          <Button className="edit-profile-btn" onClick={handleShow}>Edit Profile<i class="fa-solid fa-user-pen"></i></Button>
          <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit your details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={onSubmitForm}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" value={name } 
                                onChange={e => setName(e.target.value)} name="name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={email}
                                onChange={e => setEmail(e.target.value)} />
                           
                        </Form.Group>

                        
                        <Form.Group className="mb-3" controlId="formBasicMobile">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="tel" placeholder="Mobile Number" name="mobile" value={mobile}
                               onChange={e => setMobile(e.target.value)} />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicc">
                            <Form.Label>Country</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={e => setCountry(e.target.value)} name="country" value={country}>
                                <option value={user.country}>{user.country}</option>
                                <option value="India">India</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                        
                        <Button className="blog-post-btn" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                
                </Modal.Body>
                
            </Modal>
        </>
    )
}
export default EditProfile;