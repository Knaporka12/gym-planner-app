import TrainingDayExercise from "./TrainingDayExercise";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const TrainingDayList = ({ exercises, trainingDay, trainingPlan, setAndSaveTrainingPlan }) => {

  const { handleNavigate } = useContext(DataContext);

  return (

    <>

      <section className="training-day-list">

        {exercises.length === 0 &&
          <h2 className="training-day-list__no-exercises">You haven't added any exercises yet
            <Link to={'/exercises'} onClick={() => handleNavigate(1)}>Add exercises</Link>
          </h2>
        }

        {(exercises && exercises.length > 0) && (
          <>
            {exercises.map((exercise, index) => (
              <TrainingDayExercise
                key={`training-day-exercise-${index}`}
                exercise={exercise}
                trainingDay={trainingDay}
                trainingPlan={trainingPlan}
                setAndSaveTrainingPlan={setAndSaveTrainingPlan}
              />
            ))}
          </>
        )}

      </section>

      {(exercises && exercises.length > 0) && (
        <Link to={'/exercises'} onClick={() => handleNavigate(1)}><button style={{marginTop: '2rem'}}>Add more exercises</button></Link>
      )}

    </>

  );

}

export default TrainingDayList;
