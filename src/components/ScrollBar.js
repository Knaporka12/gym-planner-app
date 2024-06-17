import { useState, useEffect } from "react";
import { EXERCISE_DB_BASE_URL, exerciseDBDefaultOptions } from "../api/ExerciseDB";
import useAxiosGetWithCache from "../hooks/useAxiosGetWithCache";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import ScrollBarCard from "./ScrollBarCard";
import useWindowSize from "../hooks/useWindowSize";



const ScrollBar = ({ dataToFetch, header, dataToRender, setDataToRender, filter, setFilter }) => {

  const [translate, setTranslate] = useState(0);
  const [smallestSizeTranslate, setSmallestSizeTranslate] = useState(0);
  const [gap, setGap] = useState(15);
  const [pxToScroll, setPxToScroll] = useState(440);
  const [isSmallestSize, setIsSmallestSize] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);
  const [isFirstItemVisible, setIsFirstItemVisible] = useState(false);
  const [isLastItemVisible, setIsLastItemVisible] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  // jesli mobile to przesuniete defaultowo musibyc o 1060 czyli polowe ekranu + polowe scrollbarCard w np prawa strone i wetdy trzeba kombinowac z nextcount

  const { data, error, loading } = useAxiosGetWithCache(`${EXERCISE_DB_BASE_URL}/${dataToFetch}`, exerciseDBDefaultOptions, `${dataToFetch}`);

  const { width } = useWindowSize();
  const scrollbarCardWidth = 200;
  const remUnit = 16;

  const responsive = [{width: 1580, gap: 13}, {width: 1450, gap: 11}, {width: 1360, gap: 9}, {width: 1260, gap: 7}, {width: 1170, gap: 5},{width: 1070, gap: 16},{width: 800, gap: 11}, {width: 680, gap: 9}, {width: 600, gap: 120}, ]

  useEffect(() => {

    setDataToRender(data);
    setFetchError(error);
    setisLoading(loading);

    if (data && data.length > 0) {

      let updatedCount = 0;
      data.forEach(() => updatedCount++);
      updatedCount = (updatedCount / 2) - 2;
      setScrollCount(updatedCount);

    }

  }, [data, error, loading]);

  useEffect(() => {

    const checkVisibility = () => {

      if (dataToRender && dataToRender.length > 0) {
        translate === scrollCount * - pxToScroll - smallestSizeTranslate  * 3 ? setIsFirstItemVisible(true) : setIsFirstItemVisible(false);
        translate === scrollCount * pxToScroll  + smallestSizeTranslate  * 3 ? setIsLastItemVisible(true) : setIsLastItemVisible(false);
        // * 3 bo defaultowo jest juz przesuniete o jedno (czyli o dwie dlugosci smallestSizeTranslate no i jest dodatkowo przesuniete o samo smallestSizeTranslate)
      }

    }

    checkVisibility();

  }, [translate, scrollCount])

  useEffect(() => {

    let updatedGap = 0;
    responsive.forEach((item) => width < item.width ? updatedGap = item.gap : null);
    
    if (updatedGap) {
      setGap(updatedGap);
      setPxToScroll(scrollbarCardWidth + updatedGap * remUnit);
      updatedGap === responsive[responsive.length - 1].gap  ? setIsSmallestSize(true) : setIsSmallestSize(false);
    } 

  }, [width])

  useEffect(() => {
    if (isSmallestSize) {
      let smallestTranslate = responsive[responsive.length - 1].gap / 2 * remUnit + scrollbarCardWidth / 2;
      setTranslate(smallestTranslate);
      setSmallestSizeTranslate(smallestTranslate);
    }
  }, [isSmallestSize])

  const handleNext = () => {
    setTranslate((prev) => prev + pxToScroll);
  }

  const handlePrev = () => {
    setTranslate((prev) => prev - pxToScroll);
  }


  return (

    <>

      {fetchError && !isLoading && <h2 className="fetch-error-h2">{`${fetchError} - please reload the page`}</h2>}

      {isLoading && !fetchError && <h2 className="loading-h2">loading {header}...</h2>}

      {(!fetchError && !isLoading && dataToRender.length > 0) &&
        <>
          <h2 className="scrollbar__h2">Search by {header}</h2>

          <div className="scrollbar__container">

            <section className="scrollbar" style={{ transform: `translateX(${translate * - 1}px)`, gap: `${gap}rem` }}>

              {dataToRender.map((item, index) => {

                return (
                  <ScrollBarCard
                    key={`${index} - ${item}`}
                    text={item}
                    header={header}
                    filter={filter}
                    setFilter={setFilter}
                  ></ScrollBarCard>
                )

              })}

            </section>

          </div>

          <div className="scrollbar__container-arrows">

            <button className="scrollbar__btn-arrow" disabled={isFirstItemVisible} onClick={handlePrev}>
              <FaArrowCircleLeft
                className="scrollbar__arrow-icon"
                size={'2.5em'}
              ></FaArrowCircleLeft>
            </button>

            <button className="scrollbar__btn-arrow" disabled={isLastItemVisible} onClick={handleNext}>
              <FaArrowCircleRight
                className="scrollbar__arrow-icon"
                size={'2.5em'}
              ></FaArrowCircleRight>
            </button>

          </div>

        </>

      }

    </>

  )

}

export default ScrollBar
