import { Link } from "react-router-dom"

const TrainingDayLink = ({ trainingDay }) => {

  const maxNoOfExercises = 10;
  const maxNameLength = 18;
  const { id, day, trainingTarget, exercises } = trainingDay;

  return (

    <Link className="training-day-link" to={`/training-day/${id}`}>

      <div className="training-day-link__container-h2-day"><h2 className="training-day-link__h2--day">{day}</h2></div>
      <h2 className="training-day-link__h2">{trainingTarget}</h2>

      <ul className="training-day-link__ul">

        {exercises.slice(0, maxNoOfExercises).map((exercise, index) => {

          const formatedName = exercise.name[0].toUpperCase() +  exercise.name.slice(1);

          return (
            <li  className="training-day-link__li" key={`${day}-exercise-${index}`}>

              <p className="training-day-link__para-exercise">
                {formatedName.length > maxNameLength 
                 ? `${formatedName.slice(0, maxNameLength)}...` 
                 : formatedName
                }
              </p>
              <p className="training-day-link__para-sets">{exercise.sets} sets {exercise.reps} reps</p>

            </li>
          )
        })}

        {exercises.length > maxNoOfExercises 
         ? <div className="training-day-link__container-dots"><span></span><span></span><span></span></div> 
         : null 
        }

      </ul>

      <div className="training-day-link__see-details">Click to see details or edit</div>
      
    </Link>

  )

}

export default TrainingDayLink
