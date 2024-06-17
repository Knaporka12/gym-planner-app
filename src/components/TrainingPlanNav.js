import TrainingDayLink from "./TrainingDayLink";

const TrainingPlanNav = ({trainingPlan}) => {

  return (

    <nav className='training-plan-nav'>

      {trainingPlan.map((trainingDay, index) => {

        return (

          <TrainingDayLink
            key={`training-day-link-${index}`}
            trainingDay={trainingDay}
          ></TrainingDayLink>

        )

      })}

    </nav>

  )

}

export default TrainingPlanNav
