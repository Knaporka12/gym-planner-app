import { useContext, useState } from "react";
import DataContext from "../context/DataContext";
import { IoMdClose, IoMdCheckmark  } from "react-icons/io";
import { defaultExerciseSettings } from "../data/defaults";

const TrainingPlanView = ({exerciseToAdd}) => {

    const { trainingPlan, addExerciseToPlan, setIsViewVisible } = useContext(DataContext);

    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAdd = async (day, isAdded) => {
        // if (isAdded) return;
        // const exerciseNumber = day.exercises.length === 0 ? 1 : day.exercises[day.exercises.length - 1].noOfExercise + 1;
        // const exercise = {...exerciseToAdd, ...defaultExerciseSettings, noOfExercise: exerciseNumber };
        // const error = await addExerciseToPlan(exercise, day);
        // if (error) setFetchError(error);
        // setIsLoading(false);
        // code when i was fetching the data from my own json

        if (isAdded) return;
        const exerciseNumber = day.exercises.length === 0 ? 1 : day.exercises[day.exercises.length - 1].noOfExercise + 1;
        const exercise = {...exerciseToAdd, ...defaultExerciseSettings, noOfExercise: exerciseNumber };
        addExerciseToPlan(exercise, day);


    } 

    return (

        <div className="training-plan-view__filter">

            {fetchError && !isLoading && 
                <section className="training-plan-view">
                    <h2 className="fetch-error-h2">{`${fetchError} - please reload the page`}</h2>
                </section>
            }

            {!fetchError &&
                <section className="training-plan-view">

                    <h3 className="training-plan-view__h3">Which day do you want to add the exercise to?</h3>

                    <ul className="training-plan-view__ul">

                        {trainingPlan.map((day, index) => {

                            let isAdded = false;

                            day.exercises.forEach((exercise, index) => {if (exercise.id === exerciseToAdd.id)  isAdded = true });

                            return (

                                <div key={`day-${index}`}>

                                    <span className="span--day-number">{index + 1}</span>

                                    <li 
                                        className="training-plan-view__li"
                                        key={`training-plan-view-day-${day.id}`}
                                        onClick={() => handleAdd(day, isAdded)}
                                    >
                                        <span className="span--day">{day.day}</span>
                                        {isAdded && 
                                            <span className="span--added">
                                                Added <IoMdCheckmark size={'1.75em'} className="training-plan-view__checkmark-icon"></IoMdCheckmark>
                                            </span>
                                        }
                                    </li>


                                </div>
                            )

                        })}
                    
                    </ul>

                    <IoMdClose size={'2.5em'} onClick={() => {setIsViewVisible(false);}} className="close-icon"></IoMdClose>

                </section>
            }

        </div>

    )

}

export default TrainingPlanView
