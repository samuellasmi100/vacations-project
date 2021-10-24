import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { AppState } from '../../../redux/app-state';
import { Vacation } from '../../models/Vacation';
import update from '../../../images/update.png'
import axios from 'axios';
import './Edit.css';

export const Edit = () => {
    const { id } = useParams();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState();

    const history = useHistory();
    const vacations = useSelector((state: AppState) => state.vacations)

    //Find The Vacation To Update With Vacation Id
    const [vacation] = vacations.filter((vacation: Vacation) => {
        return vacation.vacationId === +id
    });
  
    const submit = async (data) => {
        try {
            await axios.put(`http://localhost:5001/vacations/${id}`, data);
            history.push('/vacations')
        } catch (err) {
            setError(err)
        }
    };

    return (
        <section>
        <div className="imgBx">
            <img src={update} alt={'update'}/>
        </div>
        <div className="contentBx">
            <div className="formBx">
            {error ? <div className='alert alert-danger' role='alert'>{error}</div> : ''}
                <h2>Update Vacation</h2>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="inputBx">
                        <input type="text"
                            placeholder="Please Enter The Destination"
                            autoComplete='off'
                            name="destination"
                            defaultValue={vacation.destination}
                            {...register("destination", { required: true })}
                        />
                        {errors.destination?.type === 'required' && <span className="err-msg">Destination is required</span>}
                    </div>
                    <div className="inputBx">
                        <input type="text"
                            placeholder="Please Enter The Description"
                            autoComplete='off'
                            defaultValue={vacation.description}
                            name="description"
                            {...register("description", { required: true })}/>
                        {errors.description?.type === 'required' && <span className="err-msg">Description is required</span>}
                    </div>
                    <div className="inputBx">
                        <input type="number"
                            placeholder='Please Enter The Price'
                            autoComplete='off'
                            defaultValue={vacation.price}
                            name='price'
                            {...register("price", { required: true })}
                        />
                        {errors.price?.type === 'required' && <span className="err-msg">Price is required</span>}
                    </div>
                    <div className="inputBx">
                        <input type="date"
                            autoComplete='off'
                            defaultValue={vacation.startDate}
                            name='startDate'
                            {...register("startDate", { required: true })}
                        />
                        {errors.startDate?.type === 'required' && <span className="err-msg">Check-in date is required</span>}
                    </div>
                    <div className="inputBx">
                      
                        <input type="date"
                            autoComplete='off'
                            defaultValue={vacation.endDate}
                            name='endDate'
                            {...register("endDate", { required: true })} />
                        {errors.endDate?.type === 'required' && <span className="err-msg">Check-out date Is required</span>}
                    </div>
                    <div className="inputBx">
                        <input type="url"
                            placeholder='Please Enter Url Of Image'
                            autoComplete='off'
                            defaultValue={vacation.image}
                            name='image'
                            {...register("image", { required: true })} />
                        {errors.image?.type === 'required' && <span className="err-msg">Image is required</span>}
                    </div>
                    <div className="inputBx">
                        <input type="submit"
                            className="btn"
                            value="Update"
                        />
                    </div>
                </form>
            </div>
        </div>
    </section>
    )
}
