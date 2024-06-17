import { useState, useEffect } from "react";
import { EXERCISE_DB_BASE_URL, exerciseDBDefaultOptions } from "../api/ExerciseDB";
import useAxiosGetWithCache from "../hooks/useAxiosGetWithCache";
import SearchDBInput from "../components/SearchDBInput";
import ScrollBar from "../components/ScrollBar";
import ExercisesList from "../components/ExercisesList";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import TrainingPlanView from "../components/TrainingPlanView";


const Exercises = () => {

  const {
    exercisesData, setExercisesData, defaultExercisesData,
    setDefaultExercisesData, scrollToExercisesListTop,
    exerciseToAdd, isViewVisible, setIsViewVisible
  } = useContext(DataContext);

  const [bodyPart, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");
  const [bodyPartList, setBodyPartList] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");

  const {data, error, loading} = useAxiosGetWithCache(EXERCISE_DB_BASE_URL, exerciseDBDefaultOptions, 'exercisesData');

  useEffect(() => {
    
    setDefaultExercisesData(data);
    setExercisesData(data);
    setFetchError(error);
    setIsLoading(loading);

  }, [data, error, loading]);

  useEffect(() => {

    const filterExercises = () => {

      if (equipment || bodyPart){

        let filteredData = [...defaultExercisesData];
        if (equipment) filteredData = filteredData.filter((item) => item.equipment === equipment);
        if (bodyPart) filteredData = filteredData.filter((item) => item.bodyPart === bodyPart);
        setExercisesData(filteredData);
        setInput("");

      }

    }

    filterExercises();

  }, [equipment, bodyPart])

  useEffect(() => {

    const filterExercisesByName = () => {

      if (search){

        const searchToLower = search.toLowerCase();

        setBodyPart("");
        setEquipment("");

        setExercisesData(defaultExercisesData.filter((item) => {
          return (
            item.name.toLowerCase().includes(searchToLower) ||
            item.bodyPart.toLowerCase().includes(searchToLower) ||
            item.equipment.toLowerCase().includes(searchToLower) ||
            item.target.toLowerCase().includes(searchToLower)
          )
        }));

        setTimeout(() => {scrollToExercisesListTop()}, 100);
        console.log('search')
        console.log(search);

      }

    }

    filterExercisesByName();

  }, [search])

  useEffect(() => {
    setIsViewVisible(false);
  }, [])

  const handleResetFilters = () => {
    setSearch("");
    setBodyPart("");
    setEquipment("");
    setInput("");
    setExercisesData(defaultExercisesData);
  }


  return (

    <main className="exercises" style={{flexGrow: '1'}}>

      <h1 className="exercises__h1">Search our exercises database</h1>

      <SearchDBInput
        input={input}
        setInput={setInput}
        search={search}
        setSearch={setSearch}
      ></SearchDBInput>

      <ScrollBar 
        key={1}
        dataToFetch = {"bodyPartList"}
        header={"body part"} 
        dataToRender={bodyPartList} 
        setDataToRender={setBodyPartList}
        filter={bodyPart}
        setFilter={setBodyPart}
      ></ScrollBar>

      <ScrollBar 
        key={2}
        dataToFetch = {"equipmentList"} 
        header={"equipment"}
        dataToRender={equipmentList} 
        setDataToRender={setEquipmentList}
        filter={equipment}
        setFilter={setEquipment}
      ></ScrollBar>

      <button className="exercises__btn-reset-filters" onClick={handleResetFilters}>Reset filters</button>

      <ExercisesList
        exercisesData={exercisesData}
        setExercisesData={setExercisesData}
        renderLimit={1000}
        fetchError={fetchError}
        isLoading={isLoading}
        scrollToTop={scrollToExercisesListTop}      
      ></ExercisesList>

      {isViewVisible && <TrainingPlanView exerciseToAdd={exerciseToAdd}></TrainingPlanView>}

    </main>

  )

}

export default Exercises
