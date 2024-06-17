import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import DataContext from "../context/DataContext";

const ExerciseCard = ({exercise}) => {

    const { setIsViewVisible, setExerciseToAdd } = useContext(DataContext);

    const {id, gifUrl, name, equipment, target} = exercise;

    const maxLengthofName = 38;
    
    const handleClick = () => {
        setIsViewVisible(true);
        setExerciseToAdd(exercise);
    }

    return (

    <div className='exercise-card'>

        <figure  className='exercise-card__exercise-figure'>
            <img  className="exercise-card__exercise-gif" src={gifUrl} alt={`${name} exercise image`} />
            <figcaption className='exercise-card__exercise-figcaption'>{name.length > maxLengthofName ? `${name.slice(0, 38)}...` : name}</figcaption>
        </figure>

        <p className='exercise-card__exercise-para'>
            Equipment - <span>{equipment}</span>
        </p>

        <p className='exercise-card__exercise-para'>
            Target - <span>{target}</span>
        </p>

        <Link to={`/exercise/${id}`}><button className='exercise-card__exercise-btn--details'>See details</button></Link>
        <button className='exercise-card__exercise-btn--add' onClick={handleClick}>Add to your plan</button> 
        
    </div>

    )

}

export default ExerciseCard
