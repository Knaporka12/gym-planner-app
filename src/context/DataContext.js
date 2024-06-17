import { createContext, useState, useEffect} from "react";
import { TrainingPlanAPI } from "../api/TrainingPlanAPI";
import {  TRAINING_PLAN_API_BASE_URL  } from "../api/TrainingPlanAPI"
import useAxiosGetWithCache from "../hooks/useAxiosGetWithCache";
import { emptyTrainingPlan } from "../data/defaults";

const DataContext = createContext({});

export const ContextProvider = ({ children }) => {

    const [exercisesData, setExercisesData] = useState([]);
    const [defaultExercisesData, setDefaultExercisesData] = useState([]);
    const [trainingPlan, setTrainingPlan] = useState(JSON.parse(localStorage.getItem('trainingPlan')) || emptyTrainingPlan);
    const [trainingPlanFetchError, setTrainingPlanFetchError] = useState(null);
    const [isTrainingPlanLoading, setisTrainingPlanLoading] = useState(false);
    const [isViewVisible, setIsViewVisible] = useState(false);
    const [exerciseToAdd, setExerciseToAdd] = useState({});
    const [navList, setNavList] = useState([
    {
      id: 0,
      page: '/gym-planner-app',
      isSelected: true,
      text: 'Home'
    },
    {
      id: 1,
      page: '/exercises',
      isSelected: false,
      text: 'Exercises'
    },
    {
      id: 2,
      page: '/plan',
      isSelected: false,
      text: 'Training Plan'
    }
  ]);

    // const {data, error, loading} = useAxiosGetWithCache(`${TRAINING_PLAN_API_BASE_URL}/training-plan`, null, false);

    // useEffect(() => {

    //     setTrainingPlan(data);
    //     setTrainingPlanFetchError(error);
    //     setisTrainingPlanLoading(loading);

    // }, [data, error, loading]);
    // code when i was fetching the data from my own json

    const addExerciseToPlan = async (exercise, day) => {

        // let error = null;

        // try{

        //     const updatedDayExercises = [...day.exercises, exercise];
        //     const updatedDay = {...day, exercises: updatedDayExercises};
        //     const request = await TrainingPlanAPI.put(`/training-plan/${day.id}`, updatedDay);
        //     if (request.status !== 200) throw Error('Something went wrong');
        //     const updatedTrainingPlan = trainingPlan.map((item) => item.id !== day.id ? item : updatedDay);
        //     setTrainingPlan(updatedTrainingPlan); 

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

        const updatedDayExercises = [...day.exercises, exercise];
        const updatedDay = {...day, exercises: updatedDayExercises};
        const updatedTrainingPlan = trainingPlan.map((item) => item.id !== day.id ? item : updatedDay);
        setAndSaveTrainingPlan(updatedTrainingPlan); 

    }

    const setAndSaveTrainingPlan = (newTrainingPlan) => {
        setTrainingPlan(newTrainingPlan);
        localStorage.setItem('trainingPlan', JSON.stringify(newTrainingPlan))
    }

    const scrollToExercisesListTop = () => {
        window.scrollTo({ top: 1300, left: 0, behavior: 'smooth' });
    }

    const scrollToPageTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    const handleNavigate = (listItemId) => {

        let updatedNavList = navList.map((item) => {
            if (item.id !== listItemId) return {...item, isSelected: false};
            return {...item, isSelected: true};
        })

        setNavList(updatedNavList);
    }


    return ( 

        <DataContext.Provider value={{

            exercisesData,
            setExercisesData,
            defaultExercisesData,
            setDefaultExercisesData,
            scrollToExercisesListTop,
            scrollToPageTop,
            trainingPlan,
            setTrainingPlan,
            addExerciseToPlan,
            isViewVisible,
            setIsViewVisible,
            exerciseToAdd,
            setExerciseToAdd,
            trainingPlanFetchError,
            isTrainingPlanLoading,
            navList,
            setNavList,
            handleNavigate,
            setAndSaveTrainingPlan

        }}>
            {children}
        </DataContext.Provider>
    )

};

export default DataContext;