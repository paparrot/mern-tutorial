import {FaSignInAlt} from "react-icons/fa";
import {useState, useEffect} from "react";

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const {email, password} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault();
    }

    return <>
        <section className='heading'>
            <h1>
                <FaSignInAlt /> Login
                <p>Log in account</p>
            </h1>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            id='email'
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            name='password'
                            value={password}
                            placeholder='Enter your password'
                            id='password'
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </section>
    </>
}

export default Login;