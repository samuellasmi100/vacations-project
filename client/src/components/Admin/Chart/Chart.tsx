import React from 'react'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/app-state';
import { Vacation } from '../../models/Vacation';
import './Chart.css'


export const Chart = () => {
    const vacation = useSelector((state:AppState) => state.vacations);
    const [vacationsData,setVacationsData] = useState({});

    const vacationsName = vacation.map((vacation:Vacation) =>{
        if(vacation.numOfFollowers > 0)
         return vacation.destination
    });
    const numberOfFollowes = vacation.map((vacation:Vacation) => vacation.numOfFollowers);

    const chart = ():any => {
        
        setVacationsData({
            labels:[...vacationsName],
            datasets:[
                {
                    label:'Vacations Information',
                    data:[...numberOfFollowes],
                    backgroundColor:'#FF4F5A',
                    borderColor:'rgb(0,0,0,1)',
                    borderWidth:2
                }
            ]
        })
    }
    
useEffect(() => {
    chart()
},[])
    return (
        <div className='chart'>
            <Bar type="bar" data={vacationsData}/>
        </div>
    )
}
