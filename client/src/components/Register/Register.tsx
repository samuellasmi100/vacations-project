import { useState } from 'react'
import { UserRegisterDetails } from '../models/UserRegisterDetails';
import { useHistory,Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User } from '../models/User';
import signUp from '../../images/signUp.png'
import axios from 'axios';
import './Register.css';

export const Register = (): JSX.Element => {
    const [error, setError] = useState();

    const { register, handleSubmit, formState: { errors } } = useForm<User>();

    const history = useHistory()

    const submit = async (data: User) => {

        try {
            let userRegisterDetails = new UserRegisterDetails(data.firstName, data.lastName, data.email, data.password);
            await (axios.post('http://localhost:5001/users', userRegisterDetails));

            history.push('/login')

        } catch (err) {
            setError(err.response.data.error)
        }
    };
    return (
        <section>
            <div className="imgBx">
                <img src={signUp} alt={'signUp'} />
            </div>
            <div className="contentBx">
                <div className="formBx">
                {error ? <div className='alert alert-danger' role='alert'>{error}</div> : ''}
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="inputBx">
                            <input type="text"
                                placeholder="Please Enter Your First name"
                                autoComplete='off'
                                name="firstName"
                                {...register("firstName", { required: true, minLength: 2, maxLength: 15 })} />
                            {errors.firstName?.type === 'required' && <span className="err-msg">first name is required</span>}
                            {errors.firstName?.type === 'minLength' && <span className="err-msg">First Name Must Be At Least 2 Letters</span>}
                            {errors.firstName?.type === 'maxLength' && <span className="err-msg">First Name Cannot Be More Than 15 Letters</span>}
                        </div>
                        <div className="inputBx">
                            <input type="text"
                                placeholder="Please Enter Your Last name"
                                autoComplete='off'
                                name="lastName"
                                {...register("lastName", { required: true, minLength: 2, maxLength: 15 })} />
                            {errors.lastName?.type === 'required' && <span className="err-msg">Last Name Must Be At Least Tow Letters</span>}
                            {errors.lastName?.type === 'minLength' && <span className="err-msg">Last Name Must Be At Least 2 Letters</span>}
                            {errors.lastName?.type === 'maxLength' && <span className="err-msg">Last Name Cannot Be More Than 15 Letters</span>}
                        </div>
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
                                value="Sign Up"
                            />
                        </div>
                        <div className="inputBx">
                            <p>Already Have an account? <Link  to="/login">Sign up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}







