import {FaSignInAlt} from "react-icons/fa";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, reset} from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset())

    }, [user, isSuccess, message, isError, navigate, dispatch])

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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

        const userData = {
            email,
            password
        };

        dispatch(login(userData));
    }

    if (isLoading) {
        return <Spinner/>
    }

    return <>
        <section className='heading'>
            <h1>
                <FaSignInAlt/> Login
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