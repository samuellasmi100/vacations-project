import { useState } from 'react'
import './AddVacation.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import addVacation from '../../../images/addVacation.png'

export const AddVacation = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState();
    const history = useHistory();

    const submit = async (data) => {
        try {
            await axios.post('http://localhost:5001/vacations', data);
            history.push('/vacations')
        } catch (err) {
            setError(err.response.data.error)
        }
    };
    return (
        <section>
            <div className="imgBx">
                <img src={addVacation} alt={"addVacation"} />
            </div>
            <div className="contentBx">
                <div className="formBx">
                {error ? <div className='alert alert-danger' role='alert'>{error}</div> : ''}
                    <h2>Add Vacation</h2>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="inputBx">
                            <input type="text"
                                placeholder="Please Enter The Destination"
                                autoComplete='off'
                                name="destination"
                                {...register("destination", { required: true })}/>
                            {errors.destination?.type === 'required' && <span className="err-msg">Destination is required</span>}
                        </div>
                        <div className="inputBx">
                            <input type="text"
                                placeholder="Please Enter The Description"
                                autoComplete='off'
                                name="description"
                                {...register("description", { required: true })}
                            />
                            {errors.description?.type === 'required' && <span className="err-msg">Description is required</span>}
                        </div>
                        <div className="inputBx">
                            <input type="number"
                                placeholder='Please Enter The Price'
                                autoComplete='off'
                                name='price'
                                {...register("price", { required: true })}
                            />
                            {errors.price?.type === 'required' && <span className="err-msg">Price is required</span>}
                        </div>
                        <div className="inputBx">
                            <input type="date"
                                autoComplete='off'
                                name='startDate'
                                {...register("startDate", { required: true })}/>
                            {errors.startDate?.type === 'required' && <span className="err-msg">Check-in date is required</span>}
                        </div>
                        <div className="inputBx">
                            <input type="date"
                                autoComplete='off'
                                name='endDate'
                                {...register("endDate", { required: true })} />
                            {errors.endDate?.type === 'required' && <span className="err-msg">Check-out date Is required</span>}
                        </div>
                        <div className="inputBx">
                            <input type="url"
                                placeholder='Please Enter Url Of Image'
                                autoComplete='off'
                                name='image'
                                {...register("image", { required: true })} />
                            {errors.image?.type === 'required' && <span className="err-msg">Image is required</span>}
                        </div>
                        <div className="inputBx">
                            <input type="submit"
                                className="btn"
                                value="Add"/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}




