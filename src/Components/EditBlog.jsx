import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';




const EditBlog = ({ id }) => {

    const [lgShow, setLgShow] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [keys, setKeys] = useState([]);
    const [urls, setUrls] = useState([]);


    const updateBlog = async e => {
        e.preventDefault();
        try {

            const body = { title, description, keys, urls };;
            const response = await fetch(`http://[::1]:8000/blogs/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(body)
            });
            window.location = '/myblogs';
            console.log(response.json());
        } catch (err) {
            console.error(err.message);
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
                id={`id${id}`}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit your Blog
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="new-blog-form" onSubmit={updateBlog}>
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