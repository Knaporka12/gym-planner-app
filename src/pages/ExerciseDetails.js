import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { EXERCISE_DB_BASE_URL, exerciseDBDefaultOptions } from "../api/ExerciseDB";
import useAxiosGetWithCache from "../hooks/useAxiosGetWithCache";
import SimilarExercises from '../components/SimilarExercises';
import VideosList from '../components/VideosList';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import TrainingPlanView from '../components/TrainingPlanView';
import NoMatching from '../components/NoMatching';

const ExerciseDetails = () => {

  const { isViewVisible, setIsViewVisible, exerciseToAdd, setExerciseToAdd } = useContext(DataContext);

  const [exerciseData, setExerciseData] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const url = `${EXERCISE_DB_BASE_URL}/exercise/${id}`;
  const {data, error, loading} = useAxiosGetWithCache(url, exerciseDBDefaultOptions, `exercise-${id}`);

  const {bodyPart, equipment, gifUrl, instructions, name, secondaryMuscles, target} = data;

  useEffect(() => {
    
    setExerciseData(data);
    setFetchError(error);
    setIsLoading(loading);

  }, [data, error, loading]);

  useEffect(() => {
    setIsViewVisible(false);
  }, [])

  const handleClick = () => {
    setIsViewVisible(true);
    setExerciseToAdd(exerciseData);
  }

  return (

    <main className='exercise-details'>

      {fetchError && !isLoading && 
        <h2 className="fetch-error-h2 exercise-details__h2">{`${fetchError} - please reload the page`}</h2>
      }

      {isLoading && !fetchError && <h2 className="loading-h2 exercise-details__h2">Loading exercise details...</h2>}

      {(!fetchError && !isLoading &&  exerciseData.length === 0) &&
        <NoMatching
          missing={'exercise'}
          link={'/exercises'}
          linkText={'our exercise database'} 
        ></NoMatching>
      }

      {(!fetchError &&  !isLoading &&  Object.keys(exerciseData).length > 0) &&

        <>
        
          <section className='exercise-details__description'>

            <figure className='exercise-details__figure-description'>
              <img src={gifUrl} alt={`exercise ${name} picture`} />
              <button onClick={handleClick}>Add to your plan</button>
            </figure>

            <article className="exercise-details__article">

              <h2 className='exercise-details__h2--description'>{`${name[0].toUpperCase()}${name.substring(1)}`}</h2>

              <p className="exercise-details__para--body-part">Body Part: <span className='span-transition'>{bodyPart}</span></p>
              <p className="exercise-details__para--body-target">Target: <span className='span-transition'>{target}</span></p>
              <p className="exercise-details__para--body-equipment">Equipment: <span className='span-transition'>{equipment}</span></p>

              {(secondaryMuscles && secondaryMuscles.length > 0) && 

                <p className="exercise-details__para--body-secondary-muscles">Secondary muscles: 
                  {secondaryMuscles.map((muscle, index) => {
                    return (
                      <span className='span-transition' key={`secondary-muscle-${index}`}>{muscle} {index !== secondaryMuscles.length - 1 ? ',' : null}</span>
                    )
                  })}
                </p>

              }

              {(instructions && instructions.length > 0) && 

                <p className="exercise-details__para--body-instructions">Instructions:
                {instructions.map((instruction, index) => {
                    return (
                      <span key={`instruction-${index}`}> {index + 1}. {instruction}</span>
                    )
                })}
                </p>

              }

            </article>

          </section>

          <SimilarExercises
            key={`similar-ex-bodyPart-${id}`}
            exerciseId={id}
            cacheKey={`similar-ex-bodyPart-${id}`}
            dataToFetch={`bodyPart/${bodyPart}`}
            renderLimit={4}
            header={'target the same Body Part'}          
          ></SimilarExercises>

          <SimilarExercises
            key={`similar-ex-equipment-${id}`}
            exerciseId={id}
            cacheKey={`similar-ex-equipment-${id}`}
            dataToFetch={`equipment/${equipment}`}
            renderLimit={4}
            header={'require the same Equipment'}          
          ></SimilarExercises>

          <VideosList
            dataToFetch={name}
            exerciseId={id}
            renderLimit={3}
          ></VideosList>

        </>
      }

      {isViewVisible && <TrainingPlanView exerciseToAdd={exerciseToAdd}></TrainingPlanView>}

    </main>

  )

}

export default ExerciseDetails
