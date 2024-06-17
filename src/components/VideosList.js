import { useState, useEffect, useMemo } from "react"
import useAxiosGetWithCache from '../hooks/useAxiosGetWithCache'
import {VIDEO_API_BASE_URL, videosApiDefaultoptions} from '../api/VideoAPI'
import VideoLink from './VideoLink'

const VideosList = ({dataToFetch, exerciseId, renderLimit}) => {

    const [defaultVideosData, setDefaultVideosData] = useState([]);
    const [videosData, setVideosData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const url = `${VIDEO_API_BASE_URL}/search`;
    const options = useMemo(() => ({

        ...videosApiDefaultoptions,
        params: {query: `${dataToFetch} exercise`},

    }), [dataToFetch]);

    const {data, error, loading} = useAxiosGetWithCache(url, options, `exercise-${exerciseId}-videos`);

    useEffect(() => {
    
        setDefaultVideosData(data.contents);
        setFetchError(error);
        setIsLoading(loading);

    }, [data, error, loading]);


    useEffect(() => {

        const setData = () => {

            let data = [];
    
            if (renderLimit) {

                for (let i = 0; i < renderLimit; i++){
                    if ( defaultVideosData && defaultVideosData[i]) data.push(defaultVideosData[i]);
                }
            }

            setVideosData(data);
            
        }

        setData();
        
    }, [defaultVideosData]);

    return (

    <>

        {fetchError && !isLoading && 
            <h2 className="fetch-error-h2">{`${fetchError} - please reload the page`}</h2>
        }

        {isLoading && !fetchError && <h2 className="loading-h2">Loading videos...</h2>}

        {(!fetchError &&  !isLoading && videosData && videosData.length === 0) &&
         <h2 className="no-matching-h2">No matching instructional videos for this exercise</h2>
        }

        {(!fetchError && !isLoading && videosData && videosData.length > 0) &&

            <>

                <h3 className="videos-list__h3">Instructional videos :</h3>
                    
                <section className="videos-list">

                    {videosData.map((item, index) => {

                    return (

                        <VideoLink

                            key={`video link ${index}`}
                            video={item.video}

                        ></VideoLink>

                    )

                    })} 

                </section>

            </>
        }

    </>

    )

}

export default VideosList
