//pamietaj o scroll to top jak bedzie trzeba
import { useState, useEffect } from "react"
import {  TRAINING_PLAN_API_BASE_URL  } from "../api/TrainingPlanAPI"
import useAxiosGetWithCache from "../hooks/useAxiosGetWithCache";
import TrainingPlanNav from "../components/TrainingPlanNav";
import { useContext } from "react";
import DataContext from "../context/DataContext";


const TrainingPlan = () => {

    const { trainingPlan, trainingPlanFetchError: fetchError, isTrainingPlanLoading: isLoading, scrollToPageTop} = useContext(DataContext);

    useEffect(() => {
        scrollToPageTop();
    }, []);

   return (

    <main className="training-plan">

        {fetchError && !isLoading && 
            <h2 className="fetch-error-h2">{`${fetchError} - please reload the page`}</h2>
        }

        {isLoading && !fetchError && <h2 className="loading-h2">Loading your training plan...</h2>}

        {(!fetchError && !isLoading ) &&

            <>

                <h1 className="training-plan__h1">Browse your training plan:</h1>
                    
                <TrainingPlanNav
                    trainingPlan={trainingPlan}
                ></TrainingPlanNav>
                

            </>
        }

    </main>

   )

}

export default TrainingPlan
