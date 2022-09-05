import NavBar from './NavBar';
import { Form, Button } from 'react-bootstrap';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setAuth}) => {
    
    const setAuth1=boolean=> {
        setAuth(boolean);
    }
    
    const [inputs, setInputs] = useState({
        email: "",
        password: "",


    });

    const { password, email } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        try {

            const body = { password, email };
            const response = await fetch('http://[::1]:8000/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

          
            const parseRes = await response.json();
            console.log(parseRes);
        
            if(parseRes.token){
                localStorage.setItem("token",parseRes.token);
                setAuth1(true);    //prop
                //toast.info("logged in successfully");
                //successT();
              }
              else{
                setAuth1(false);
                //toast.error(parseRes);
              }
            
            

        } catch (err) {
            console.error(err.message);
        }
        //window.location = "/home";
    }
    /*const navigate = useNavigate()
    
        if (resp.length>0) {
            setAllow(true);
            navigate("/home", { replace: true })     //push/replace redirect to new page but difference is that push allows to go back page but replace doesn't.
            console.log(allow)
        }
        /*else {
           
        }*/
    
    return (
        <>
            <NavBar setAuth={setAuth1}/>
            <div className='outer-log-in'>
            <div className="container log-in w-50">
                <div className="text-center">
                    <h3>Login to Your Account</h3>
                </div>
                <div className='form-container'>
                    <Form onSubmit={onSubmitForm}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" name="email" value={email} autoComplete="off"
                                onChange={e => onChange(e)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Enter Password" name="password" value={password} autoComplete="off"
                                onChange={e => onChange(e)} />
                        </Form.Group>

                        <Button className="blog-post-btn" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
            </div>
            
        </>
    )
}

export default Login;
