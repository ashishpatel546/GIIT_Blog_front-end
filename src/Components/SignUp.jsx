import NavBar from './NavBar';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const SignUp = () => {

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        country: "",
        mobile: ""

    });

    const { name,password,email,country,mobile } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        try {

            const body = {name, password,email,country,mobile };
            const response = await fetch('http://[::1]:8000/auth/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            console.log(parseRes);
            
            window.location="/login"
            } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <>
            <NavBar/>
            <div className="container log-in w-50">
                <div className="text-center">
                    <h3>Create Your Account</h3>
                </div>
                <div className='form-container'>
                    <Form onSubmit={onSubmitForm}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter your name" name="name" value={name} 
                                onChange={e => onChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" name="email" value={email}
                                onChange={e => onChange(e)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" name="password"value={password}
                                onChange={e => onChange(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicMobile">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control required type="tel" placeholder="Mobile Number" name="mobile" value={mobile}
                                onChange={e => onChange(e)} />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicc">
                            <Form.Label>Country</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={e => onChange(e)} name="country" value={country}>
                                <option>Select Country</option>
                                <option value="1">India</option>
                                <option value="2">Bangladesh</option>
                                <option value="3">Nepal</option>
                                <option value="4">Other</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check required type="checkbox" label="I Agree to Terms and Conditions" />
                        </Form.Group>
                        <Button className="blog-post-btn" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default SignUp;