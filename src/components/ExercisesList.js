import { useState, useEffect } from "react"
import ExerciseCard from "./ExerciseCard";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const ExercisesList = ({exercisesData, renderLimit, fetchError, isLoading, scrollToTop}) => {

    const [dataToRender, setDataToRender] = useState([]);
    const [visibleData, setVisibleData] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const exercisesPerPage = 60;

    const handlePageChange = (pageValue) => {
        setPage(pageValue);
        scrollToTop();
    }

    useEffect(() => {

        const setData = () => {

            if (!renderLimit && exercisesData.length > 0){
                setDataToRender(exercisesData);
                return;
            }

            let data = [];

            for (let i = 0; i < renderLimit; i++){

                if (exercisesData[i]){
                    data.push(exercisesData[i]);
                }
            }

            setDataToRender(data);

        }

        setData();

    }, [exercisesData])

    useEffect(() => {

        const setPagination = () => {

            if (dataToRender && dataToRender.length > 60){
                setPage(1);
                setTotalPages(Math.ceil(dataToRender.length / exercisesPerPage))
            } else {
                setPage(0);
                setTotalPages(0);
            }

        }

        setPagination();

    }, [dataToRender])

    useEffect(() => {

        const setVisibleExercises = () => {

            const beginning = page === 0 ? 0 : (0 + page - 1) * 60;
            const end = beginning + 60;
            let visibleExercises = [];

            for (let i = beginning; i < end; i++){

                if (dataToRender[i]){
                    visibleExercises.push(dataToRender[i]);
                }
            }

            setVisibleData(visibleExercises);
        }

        setVisibleExercises();

    }, [dataToRender, page])

    return (

    <>

        {fetchError && !isLoading && 
            <h2 className="fetch-error-h2">{`${fetchError} - please reload the page`}</h2>
        }

        {isLoading && !fetchError && <h2 className="loading-h2">Loading exercises...</h2>}

        {(!fetchError &&  !isLoading &&  visibleData.length === 0) &&
         <h2 className="no-matching-h2">No matching exercises - try with other filters</h2>
        }

        {(!fetchError && !isLoading && visibleData.length > 0) &&
                
            <section className="exercises-list">

                {visibleData.map((exercise) => {

                return (

                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                    ></ExerciseCard>

                )

                })} 

            </section>
        }

        <ResponsivePagination
            current={page}
            total={totalPages}
            onPageChange={(value) => handlePageChange(value)}
        />

    </>

    )

}

export default ExercisesList
