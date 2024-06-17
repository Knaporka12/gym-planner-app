import { useState, useEffect } from 'react'
import slider1 from '../img/slider-1.webp'
import slider2 from '../img/slider-2.webp'
import slider3 from '../img/slider-3.jpeg'
import slider4 from '../img/slider-4.jpg'
import slider5 from '../img/slider-5.png'
import dumbellIcon from '../img/icons/dumbell.png'
import videoIcon from '../img/icons/video.png'
import descriptionsImg from '../img/descriptions.webp'
import { Link } from 'react-router-dom'
import { IoSearchCircle } from "react-icons/io5";
import { GiBiceps } from "react-icons/gi";
import { GiProgression } from "react-icons/gi";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


const Home = () => {

  const { scrollToPageTop, handleNavigate } = useContext(DataContext);

  const sliderImages = [ slider1, slider2, slider3, slider4, slider5 ];


  useEffect(() => {
    scrollToPageTop();
  }, []); 



  return (

    <main className='home'>

      <div id="scroll-marker"></div> {/*miejsce do ktorego scrolluje bo jest header fixed ktory to zaburza  */}

      <section className='home__landing'>

        <p className='home__para-create'>Create your own, custom <span>training plan</span> with up to <br /> <span>1300</span> different exercises, <span>instructional videos</span> and more!</p>



        <figure className="home__figure-slider" >

          <Slide duration={2350} transitionDuration={350} pauseOnHover={false} canSwipe={false} easing='ease-out'>

          {sliderImages.map((slide, index)=> (

            <div key={index}>

              <img  
                src={slide}
                className='home__img-slider'
                alt={`slider-image-${index}`}
              />

            </div>

            ))} 

          </Slide>


          <a href="#scroll-marker"><button className="home__btn-slider">What do we offer?</button></a>

        </figure>


        <h1 className='home__h1-jim-planner'>JIM PLANNER</h1>

      </section>

      <article className="home__article-exercises">

        <h2 className='home__h2-exercises'>Huge selection of exercises</h2>

        <div className='home__container-exercise-icons'>
          <img className='home__dumbell-icon' src={dumbellIcon} alt="dumbell-icon" />
          <img className='home__dumbell-icon' src={dumbellIcon} alt="dumbell-icon" />
          <img className='home__dumbell-icon' src={dumbellIcon} alt="dumbell-icon" />
        </div>

        <p className="home__para-exercises">
          Choose from over <span>1,300 exercises, targeting every muscle group and using a variety of equipment.</span> Whatever your level of fitness and training conditions, there is something for everyone. All exercises can be found in the <Link to={"/exercises"}>exercises section</Link>, where you can search by muscle group, equipment or name.
        </p>

      </article>

      <section className="home__section-descriptions">

        <article className="home__article-descriptions">

          <h2 className='home__h2-descriptions'>Detailed descriptions and instructions</h2>

          <div className='home__container-description-icons'>
            <img className='home__video-icon' src={videoIcon} alt="video-icon" />
            <img className='home__video-icon' src={videoIcon} alt="video-icon" />
            <img className='home__video-icon' src={videoIcon} alt="video-icon" />
          </div>

          <p className="home__para-descriptions">
            Just starting out in the gym? Don't worry! All the <span>exercises are described in detail</span>, both how to perform them, the recommended amount of series and repetitions, plus they are accompanied by the most popular <span>instructional videos</span> showing how to perform the activity. In the desciption we also provide similat exercises to help you modify your plan <span>to suit your personal preferences and needs.</span>
          </p>

        </article>

        <figure className="home__figure-descriptions">
          <img className="home__img-descriptions" src={descriptionsImg} alt="description-video-example" />
        </figure>

      </section>

      <section className='home__section-plan'>

        <h2 className='home__h2-plan'>Set up your plan</h2>

        <article className="home__article-plan">



          <p className="home__para-plan">
            <span><IoSearchCircle size={'3em'}></IoSearchCircle></span>
            Search our exercises an their details
          </p>

          <p className="home__para-plan">
            <span><GiBiceps size={'2.5em'}></GiBiceps></span>
            Choose those that suit your needs
          </p>

          <p className="home__para-plan">
            <span><GiProgression size={'2.25em'}></GiProgression></span>
            Create your own plan and implement it with our <Link className='gym-planner-link' to={"/plan"}>GYM PLANNER</Link>
          </p>


        </article>

        <Link to={"/exercises"} onClick={()=> handleNavigate(1)}><button className='home__btn-plan'>Start your journey</button></Link>

      </section>


    </main>

  )

}

export default Home
