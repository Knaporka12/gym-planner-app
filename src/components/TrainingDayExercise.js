import { Link } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdClose  } from "react-icons/io";
import { useEffect, useState } from "react";
import { TrainingPlanAPI } from "../api/TrainingPlanAPI";
import swapArrayItems from "../helpers/SwapArrayItems";



const TrainingDayExercise = ({exercise, trainingDay, trainingPlan, setAndSaveTrainingPlan}) => {


  const { name, gifUrl, id} = exercise;

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [rest, setRest] = useState("");
  const [exerciseNumber, setExerciseNumber] = useState("");
  const [updatedSets, setUpdatedSets] = useState("");
  const [updatedReps, setUpdatedReps] = useState("");
  const [updatedRest, setUpdatedRest] = useState("");
  const [updatedExerciseNumber, setUpdatedExerciseNumber] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setExerciseNumber(exercise.noOfExercise);
    setSets(exercise.sets);
    setReps(exercise.reps);
    setRest(exercise.restBetweenSetsSecs);
  })

  const startEditing = () => {
    setIsEditting(true);
    setUpdatedExerciseNumber(exerciseNumber);
    setUpdatedReps(reps);
    setUpdatedSets(sets);
    setUpdatedRest(rest);
  }

  const handleDelete = async () => {

    // try{

    //   let updatedDayExercises = trainingDay.exercises.filter((item) => item.id !== id);

    //   updatedDayExercises = updatedDayExercises.map((item) => {

    //     const updatedNumber = item.noOfExercise > exerciseNumber ? item.noOfExercise- 1 : item.noOfExercise;
    //     return ({...item, noOfExercise: updatedNumber});

    //   });

    //   const updatedDay = {...trainingDay, exercises: updatedDayExercises};
    //   const request = await TrainingPlanAPI.put(`/training-plan/${trainingDay.id}`, updatedDay);
    //   if (request.status !== 200) throw Error('Something went wrong');
    //   const updatedTrainingPlan = trainingPlan.map((item) => item.id !== trainingDay.id ? item : updatedDay);
    //   setTrainingPlan(updatedTrainingPlan);
    //   setFetchError(null);

    // } catch (err) {

    // if (err.response){
    //   console.log(err.response.data);
    //   console.log(err.response.headers);
    //   console.log(err.response.status);
    //   setFetchError(err.response.data)
    // } else if (err.request) {
    //   console.log(err.request)
    //   setFetchError(err.request)
    // } else {
    //   console.log(err.message)
    //   setFetchError(err.message)
    // } 
    // } finally {
    //   setIsDeleting(false);
    //   setIsLoading(false)
    // }
    // code when i was fetching the data from my own json

    let updatedDayExercises = trainingDay.exercises.filter((item) => item.id !== id);

    updatedDayExercises = updatedDayExercises.map((item) => {

      const updatedNumber = item.noOfExercise > exerciseNumber ? item.noOfExercise- 1 : item.noOfExercise;
      return ({...item, noOfExercise: updatedNumber});

    });

    const updatedDay = {...trainingDay, exercises: updatedDayExercises};
    const updatedTrainingPlan = trainingPlan.map((item) => item.id !== trainingDay.id ? item : updatedDay);
    setAndSaveTrainingPlan(updatedTrainingPlan);
    setIsDeleting(false);

  }

  const handleEdit = async (e) => {

    // e.preventDefault();

    // if (sets === updatedSets && reps === updatedReps && rest === updatedRest && exerciseNumber === updatedExerciseNumber) {
    //   setIsEditting(false);
    //   return;
    // }

    // try{

    //   let updatedDayExercises = trainingDay.exercises.map((item) => {
    //     if (item.id !== id) return item;
    //     return  {...item, sets: updatedSets, reps: updatedReps, restBetweenSetsSecs: updatedRest, noOfExercise: updatedExerciseNumber};
    //   });

    //   if (exerciseNumber !== updatedExerciseNumber) {

    //     if (updatedExerciseNumber < exerciseNumber) {

    //       updatedDayExercises = swapArrayItems(updatedDayExercises, exerciseNumber - 1, updatedExerciseNumber - 1, 'left');

    //     } else {

    //       updatedDayExercises = swapArrayItems(updatedDayExercises, exerciseNumber - 1, updatedExerciseNumber - 1, 'right');

    //     }

    //     updatedDayExercises = updatedDayExercises.map((item, index) => ({...item, noOfExercise: index + 1}));

    //   }

    //   const updatedDay = {...trainingDay, exercises: updatedDayExercises};
    //   const request = await TrainingPlanAPI.put(`/training-plan/${trainingDay.id}`, updatedDay);
    //   if (request.status !== 200) throw Error('Something went wrong');
    //   const updatedTrainingPlan = trainingPlan.map((item) => item.id !== trainingDay.id ? item : updatedDay);
    //   setTrainingPlan(updatedTrainingPlan); 
    //   setFetchError(null);

    // } catch (err) {

    // if (err.response){
    //   console.log(err.response.data);
    //   console.log(err.response.headers);
    //   console.log(err.response.status);
    //   setFetchError(err.response.data)
    // } else if (err.request) {
    //   console.log(err.request)
    //   setFetchError(err.request)
    // } else {
    //   console.log(err.message)
    //   setFetchError(err.message)
    // } 
    // } finally {
    //   setIsEditting(false);
    //   setIsLoading(false)
    // } 
    // code when i was fetching the data from my own json


    e.preventDefault();

    if (sets === updatedSets && reps === updatedReps && rest === updatedRest && exerciseNumber === updatedExerciseNumber) {
      setIsEditting(false);
      return;
    }

    let updatedDayExercises = trainingDay.exercises.map((item) => {
      if (item.id !== id) return item;
      return  {...item, sets: updatedSets, reps: updatedReps, restBetweenSetsSecs: updatedRest, noOfExercise: updatedExerciseNumber};
    });

    if (exerciseNumber !== updatedExerciseNumber) {

      if (updatedExerciseNumber < exerciseNumber) {

        updatedDayExercises = swapArrayItems(updatedDayExercises, exerciseNumber - 1, updatedExerciseNumber - 1, 'left');

      } else {

        updatedDayExercises = swapArrayItems(updatedDayExercises, exerciseNumber - 1, updatedExerciseNumber - 1, 'right');

      }

      updatedDayExercises = updatedDayExercises.map((item, index) => ({...item, noOfExercise: index + 1}));

    }

    const updatedDay = {...trainingDay, exercises: updatedDayExercises};
    const updatedTrainingPlan = trainingPlan.map((item) => item.id !== trainingDay.id ? item : updatedDay);
    setAndSaveTrainingPlan(updatedTrainingPlan); 
    setIsEditting(false);

  }

  return (

    <div className='training-day-exercise'>

      {fetchError && !isLoading && 
        <h2 className="fetch-error-h2">Action failed - please reload the page</h2>
      }

      {(!isEditting && !fetchError && !isLoading) &&

        <section>

          <h3 className='training-day-exercise__h3'>{exerciseNumber}.</h3>

          <Link to={`/exercise/${id}`}>

            <figure  className={isEditting ? "training-day-exercise__figure small" : "training-day-exercise__figure"}>
              <img  className="training-day-exercise__gif" src={gifUrl} alt={`${name} exercise image`} />
              <figcaption className='training-day-exercise__figcaption'>{name}</figcaption>
            </figure>

          </Link>

          <div>
            <p className="training-day-exercise__para-details">Sets: <span>{sets}</span></p>
            <p className="training-day-exercise__para-details">Reps: <span>{reps}</span></p>
            <p className="training-day-exercise__para-details">Rest between sets: <span>{rest}s</span></p>
          </div>

        </section> 

      }

      {(isEditting && !fetchError && !isLoading) &&

        <form onSubmit={handleEdit}>

          <div>

            <p className='training-day-exercise__para-details'>Number of exercise: </p>
            <input
              type="number"
              value={updatedExerciseNumber}
              onChange={(e) => setUpdatedExerciseNumber(Number(e.target.value))}
              min={1} 
              max={trainingDay.exercises.length}
            />

            <Link to={`/exercise/${id}`}>

              <figure  className={isEditting ? "training-day-exercise__figure small" : "training-day-exercise__figure"}>
                <img  
                  className={isEditting ? "training-day-exercise__gif small" : "training-day-exercise__gif"}
                  src={gifUrl} 
                  alt={`${name} exercise image`} 
                />
                <figcaption className='training-day-exercise__figcaption'>{name}</figcaption>
              </figure>

            </Link>

          </div>

          <div>
            <p className="training-day-exercise__para-details">Sets: </p> 
            <input
              type="number"
              value={updatedSets}
              onChange={(e) => setUpdatedSets(Number(e.target.value))}
              min={1} 
              max={99}
            />
          </div>
          
          <div>
            <p className="training-day-exercise__para-details">Reps: </p> 
            <input
              type="number"
              value={updatedReps}
              onChange={(e) => setUpdatedReps(Number(e.target.value))}
              min={1} 
              max={99} 
            />
          </div>

          <div>
            <p className="training-day-exercise__para-details">Rest between sets: </p> 
            <input
              type="number"
              value={updatedRest}
              onChange={(e) => setUpdatedRest(Number(e.target.value))}
              min={1} 
              max={999}
              className="rest" 
            />
          </div>

          <button type="submit">OK</button>

        </form>

      }

      {!fetchError && !isLoading &&
        <>
          <MdOutlineEdit
            className="edit-icon" 
            size={'2.5em'}
            onClick={!isEditting ? startEditing : null}
          />

          <IoMdClose
            className="close-icon"
            size={'2.5em'}
            onClick={() => { !isDeleting && setIsDeleting(true) }}
          ></IoMdClose>
        </>
      }

      {isDeleting && 
        <div className="training-day-exercise__close-alert">
          <p>Delete the exercise from your plan?</p>
          <div>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => {setIsDeleting(false)}}>No</button>
          </div>
        </div>  
      }

    </div>

  )

} 

export default TrainingDayExercise
 