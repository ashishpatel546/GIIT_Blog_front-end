import NavBar from "./NavBar";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const NewBlog = ({setAuth,isauth}) => {
  const [title,setTitle]=useState("");
  const [description,setDesc]=useState("");
  const [keys,setKeys]=useState([]);
  const [urls,setUrls]=useState([]);


  const onSubmitForm=async(e)=>{
   e.preventDefault();    //to prevent refreshing
   try{
     const body={title,description,keys,urls};
     console.log(body);
     const response=await fetch('http://[::1]:8000/blogs',{
       method:"POST",
       headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${localStorage.getItem('token')}`
                
      },
       body:JSON.stringify(body)
     });
     window.location='/myblogs';
     console.log(response.json( ));
   }catch(err){
     console.error(err.message);
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
               <Form.Control type="text" placeholder="" value={keys} onChange={e=> setKeys(e.target.value.split(','))} name="keys" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
               <Form.Label>Urls</Form.Label>
               <Form.Control type="text" placeholder="" value={urls} onChange={e=> setUrls(e.target.value.split(','))} name="urls" />
            </Form.Group>
            <Button className="blog-post-btn" type="submit">Post</Button>
         </Form>
         </div>
      </>
   )
}

export default NewBlog;