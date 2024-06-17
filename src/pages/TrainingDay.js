import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import {  TrainingPlanAPI  } from "../api/TrainingPlanAPI"
import TrainingDayList from '../components/TrainingDayList';
import { MdOutlineEdit } from "react-icons/md";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import NoMatching from '../components/NoMatching';

const TrainingDay = () => {

    const { trainingPlan, setAndSaveTrainingPlan, isTrainingPlanLoading: isLoading, trainingPlanFetchError: fetchError } = useContext(DataContext);

    const [trainingDay, setTrainingDay] = useState({});
    const [trainingTarget, setTrainingTarget] = useState('');
    const [isTargetEditing, setIsTargetEditing] = useState(false);
    const [editedTrainingTarget, setEditedTrainingTarget] = useState('');

    const { id } = useParams();

    useEffect(() => {

        setTrainingDay(trainingPlan.find((day) => day.id == id)); //bez strict equal bo typy moga byc rozne

    }, [trainingPlan]);

    useEffect(() => {
        if (trainingDay) setTrainingTarget(trainingDay.trainingTarget);
    }, [trainingDay]);

    useEffect(() => {
        if (isTargetEditing) {
            setEditedTrainingTarget(trainingTarget);
        }
    }, [isTargetEditing]);

    const handleTargetEdit = async (e, dayId) => { 

        // e.preventDefault();

        // if (editedTrainingTarget.trim().length === 0) {
        //     setIsTargetEditing(false);
        //     return;
        // }

        // let error = null;

        // try{

        //     const updatedDay = {...trainingDay, trainingTarget: `${editedTrainingTarget[0].toUpperCase()}${editedTrainingTarget.slice(1)}`};
        //     const request = await TrainingPlanAPI.put(`/training-plan/${trainingDay.id}`, updatedDay);
        //     if (request.status !== 200) throw Error('Something went wrong');
        //     const updatedTrainingPlan = trainingPlan.map((item) => item.id !== trainingDay.id ? item : updatedDay);
        //     setTrainingPlan(updatedTrainingPlan);
        //     setIsTargetEditing(false);
        //     setTrainingTarget(editedTrainingTarget); 

        // } catch (err) {

        // if (err.response){
        //     console.log(err.response.data);
        //     console.log(err.response.headers);
        //     console.log(err.response.status);
        //     error = err.response.data;
        // } else if (err.request) {
        //     console.log(err.request)
        //     error = err.request;
        // } else {
        //     console.log(err.message)
        //     error = err.message;
        // } 
        // } finally {
        //     return error;
        // }
        // code when i was fetching the data from my own json

        e.preventDefault();

        if (editedTrainingTarget.trim().length === 0) {
            setIsTargetEditing(false);
            return;
        }

        const updatedDay = {...trainingDay, trainingTarget: `${editedTrainingTarget[0].toUpperCase()}${editedTrainingTarget.slice(1)}`};
        const updatedTrainingPlan = trainingPlan.map((item) => item.id !== trainingDay.id ? item : updatedDay);
        setAndSaveTrainingPlan(updatedTrainingPlan);
        setIsTargetEditing(false);
        setTrainingTarget(editedTrainingTarget); 

    }


    return (

    <main className="training-day">

        {fetchError && !isLoading && 
            <h2 className="fetch-error-h2">{`${fetchError} - please reload the page`}</h2>
        }

        {isLoading && !fetchError && <h2 className="loading-h2">Loading your training day...</h2>}

        {trainingDay && (Object.keys(trainingDay).length > 0 && !fetchError && !isLoading) &&
            <>

                <h1 className="training-day__h1">{trainingDay.day}</h1>

                {isTargetEditing &&   
                    <form className='training-day__form' onSubmit={(e) => {handleTargetEdit(e, trainingDay.id)}}>

                        <input
                            type='text' 
                            className="training-day__input" 
                            value={editedTrainingTarget}
                            onChange={(e) => {setEditedTrainingTarget(e.target.value)}}
                        />

                        <button type='submit'>OK</button>

                    </form>
                }

                {!isTargetEditing && 
                    <div className='training-day__container-training-target'>

                        <h2 className="training-day__h2">
                            {trainingTarget ? trainingTarget : "Add training target"}
                        </h2>

                        <MdOutlineEdit
                            className="edit-icon"  
                            size={'2.5em'}
                            onClick={() => {setIsTargetEditing(true)}}
                        />

                    </div>
                }
                    
                <TrainingDayList
                    exercises={trainingDay.exercises}
                    trainingDay={trainingDay}
                    trainingPlan={trainingPlan}
                    setAndSaveTrainingPlan={setAndSaveTrainingPlan}
                ></TrainingDayList>
                
            </>
        }

        {(!fetchError &&  !isLoading &&  !trainingDay) && 
            <NoMatching
                missing={'day'}
                link={'/plan'}
                linkText={'your training plan'} 
            ></NoMatching>
        }
            

    </main>

    )

}

export default TrainingDay
