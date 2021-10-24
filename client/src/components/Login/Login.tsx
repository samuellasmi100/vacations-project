import { useHistory ,Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { ActionType } from '../../redux/action/action-type';
import { useState } from 'react';
import { User } from '../models/User'
import './Login.css';
import axios from 'axios';
import  signIn from '../../images/signIn.png';

export const Login = () => {
    const [error, setError] = useState();

    const { register, handleSubmit, formState: { errors } } = useForm<User>();

    const history = useHistory();
    const dispatch = useDispatch();

    const submit = async (data: User) => {

        try {
            let userLoginDetails = new UserLoginDetails(data.email, data.password);
            const response = await axios.post<SuccessfulLoginServerResponse>("http://localhost:5001/users/login", userLoginDetails);

            sessionStorage.setItem('token','Bearer ' + response.data.token);
       
            dispatch({ type: ActionType.SAVE_LOGIN_DETAILS, payload: response.data});

            axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');

            history.push('/vacations')
        }
        catch (err) {
            setError(err.response.data.error)
        }
    };
    return (
        <section>
            <div className="imgBx">
                <img src={signIn} alt={"signIn"}/>
            </div>
            <div className="contentBx">
                <div className="formBx">
                {error ? <div className='alert alert-danger' role='alert'>{error}</div> : ''}
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="inputBx">
                            <input type="text"
                                placeholder='Please Enter Your Email...'
                                name='email'
                                autoComplete='off'
                                {...register("email", { required: true })} />
                            {errors.email?.type === 'required' && <span className="err-msg">Email is required</span>}
                        </div>
                        <div className="inputBx">
                            <input type="password"
                                placeholder='Please Enter Your Password...'
                                name="password"
                                autoComplete='off'
                                {...register("password", { required: true, minLength: 6, maxLength: 15 })} />
                            {errors.password?.type === 'minLength' && <span className="err-msg">Please Enter A Password With At Least 6 Characters</span>}
                            {errors.password?.type === 'maxLength' && <span className="err-msg">Please Enter A Password With No Longer Then 15 Characters</span>}
                            {errors.password?.type === 'required' && <span className="err-msg">Password is required</span>}
                        </div>
                        <div className="inputBx">
                            <input type="submit"
                                className="btn"
                                value="Sign in"
                            />
                        </div>
                        <div className="inputBx">
                            <p>Dont Have an account? <Link to="/register">Sign up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}