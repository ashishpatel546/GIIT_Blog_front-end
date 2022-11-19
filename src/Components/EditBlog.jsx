import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const EditBlog = ({b}) => {

    const [lgShow, setLgShow] = useState(false);

    const [title, setTitle] = useState(b.title);
    const [description, setDesc] = useState(b.description);
    const [keys, setKeys] = useState(b.keys);
    const [urls, setUrls] = useState(b.urls);


    const updateBlog = async e => {
        e.preventDefault();
        try {

            const body = { title, description, keys, urls };
            const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}/blogs/${b.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(body)
            });
            window.location = '/myblogs';
           
        } catch (err) {
            //console.error(err.message);
            toast.error(err.message)
        }
    }



    return (
        <>
            <i className="fa-solid fa-pen-to-square" onClick={() => setLgShow(true)}> </i>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                id={`id${b.id}`}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit your Blog
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form  onSubmit={updateBlog}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" value={title} onChange={e => setTitle(e.target.value)} name="title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={10} value={description} onChange={e => setDesc(e.target.value)} name="description" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Keys</Form.Label>
                            <Form.Control type="text" placeholder="" value={keys} onChange={e => setKeys(e.target.value.split(','))} name="keys" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Urls</Form.Label>
                            <Form.Control type="text" placeholder="" value={urls} onChange={e => setUrls(e.target.value.split(','))} name="urls" />
                        </Form.Group>
                        <Button type="submit">Post</Button>
                    </Form>
                </Modal.Body>
            </Modal>



        </>


    )
}

export default EditBlog;