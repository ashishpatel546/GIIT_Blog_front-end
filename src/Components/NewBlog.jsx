import NavBar from "./NavBar";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewBlog = ({setAuth,isauth}) => {
  const [title,setTitle]=useState("");
  const [description,setDesc]=useState("");
  const [keys,setKeys]=useState("");
  const [urls,setUrls]=useState("");
  const [category,setCategory]=useState("");


  const onSubmitForm=async(e)=>{
   e.preventDefault();    //to prevent refreshing
   try{
     const body={title,description,keys,urls,category};
    
     const response=await fetch(`${process.env.REACT_APP_URL_PREFIX}/blogs`,{
       method:"POST",
       headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${localStorage.getItem('token')}`
                
      },
       body:JSON.stringify(body)
     });
     window.location='/myblogs';
     //console.log(response.json( ));
   }catch(err){
     //console.error(err.message);
     toast.error(err.message)
   }

 }
   return (
      <>
         <NavBar setAuth={setAuth} isauth={isauth}/>
         <h2 className="new-blog-text">New Blog</h2>
         <div className="container new-form-container">
         <Form className="new-blog-form" onSubmit={onSubmitForm}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>Title</Form.Label>
               <Form.Control type="text" placeholder="Enter Title" value={title} onChange={e=> setTitle(e.target.value)} name="title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
               <Form.Label>Description</Form.Label>
               <Form.Control as="textarea" rows={10} value={description} onChange={e=> setDesc(e.target.value)} name="description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
               <Form.Label>Keys</Form.Label>
               <Form.Control type="text" placeholder="" value={keys} onChange={e=> setKeys(e.target.value)} name="keys" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
               <Form.Label>Urls</Form.Label>
               <Form.Control type="text" placeholder="" value={urls} onChange={e=> setUrls(e.target.value)} name="urls" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicc">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={e => setCategory(e.target.value)} name="category" value={category}>
                                <option>Select Category</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="NodeJS">NodeJS</option>
                                <option value="NestJS">NestJS</option>
                                <option value="ReactJS">ReactJS</option>
                                <option value="Javascript">Javascript</option>
                                <option value="Java">Java</option>
                                <option value="Devops">Devops</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
            <Button className="blog-post-btn" type="submit">Post</Button>
         </Form>
         </div>
      </>
   )
}

export default NewBlog;