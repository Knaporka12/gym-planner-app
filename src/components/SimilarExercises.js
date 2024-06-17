import { useState, useEffect } from 'react';
import { EXERCISE_DB_BASE_URL, exerciseDBDefaultOptions } from "../api/ExerciseDB";
import useAxiosGetWithCache from "../hooks/useAxiosGetWithCache";
import ExerciseCard from './ExerciseCard';

const SimilarExercises = ({cacheKey, exerciseId,  dataToFetch, renderLimit, header}) => {

    const [defaultExercisesData, setDefaultExercisesData] = useState([]);
    const [exercisesData, setExercisesData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const url = dataToFetch ? `${EXERCISE_DB_BASE_URL}/${dataToFetch.replaceAll(" ", "%20")}` : EXERCISE_DB_BASE_URL;
    const {data, error, loading} = useAxiosGetWithCache(url, exerciseDBDefaultOptions, cacheKey);

    useEffect(() => {

    setDefaultExercisesData(data);
    setFetchError(error);
    setIsLoading(loading);

    }, [data, error, loading]);

    useEffect(() => {

        let data = [];
        
        if (defaultExercisesData.length > renderLimit){

            let selectedNumbers = new Array(2000).fill(0);
            let i = 0;

            while (i < renderLimit) {

                const randomNumber = Math.floor(Math.random() * defaultExercisesData.length);

                while (!selectedNumbers[randomNumber] && defaultExercisesData[randomNumber].id !== exerciseId){ //sprawdzam czy to nie to samo cwiczenie pod ktore generuje podobne cwiczenia

                    data.push(defaultExercisesData[randomNumber]);
                    selectedNumbers[randomNumber] = 1;
                    i++;

                }

            }

            setExercisesData(data);

        } else {

            for (let i = 0; i < renderLimit; i++){

                if (defaultExercisesData[i] && defaultExercisesData[i].id !== exerciseId){
                    data.push(defaultExercisesData[i]);
                }
            }

            setExercisesData(data);

        }

    }, [defaultExercisesData]);


    return (

    <>

        {fetchError && !isLoading && 
            <h2 className="fetch-error-h2">{`${fetchError} - please reload the page`}</h2>
        }

        {isLoading && !fetchError && <h2 className="loading-h2">Loading exercises...</h2>}

        {(!fetchError &&  !isLoading &&  exercisesData.length === 0) &&
         <h2 className="no-matching-h2">No matching exercises {header}</h2>
        }

        {(!fetchError && !isLoading && exercisesData.length > 0) &&

            <>

                <h3 className="similar-exercises__h3">Exercises that {header}:</h3>
                    
                <section className="similar-exercises">

                    {exercisesData.map((exercise) => {

                    return (

                        <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                        ></ExerciseCard>

                    )

                    })} 

                </section>

            </>
        }

    </>

    )

}

export default SimilarExercises
