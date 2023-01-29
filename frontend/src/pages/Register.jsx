import {FaUser} from "react-icons/fa";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {register, reset} from '../features/auth/authSlice';
import Spinner from "../components/Spinner";

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth )

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset())

    }, [user, isSuccess, message, isError, navigate, dispatch])

    const {name, email, password, passwordConfirmation} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault();

        if (passwordConfirmation !== password) {
            toast.error("Password do not match");
        } else {
            const userData = {
                name,
                email,
                password
            };

            dispatch(register(userData));
        }
    }

    if (isLoading) {
        return <Spinner/>
    }

    return <>
        <section className='heading'>
            <h1>
                <FaUser /> Register
                <p>Create an account</p>
            </h1>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name='name'
                            value={name}
                            placeholder='Enter your name'
                            id='name'
                            onChange={onChange}
                        />
                    </div>
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
                        <input
                            type="password"
                            className="form-control"
                            name='passwordConfirmation'
                            value={passwordConfirmation}
                            placeholder='Confirm your password'
                            id='passwordConfirmation'
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

export default Register;