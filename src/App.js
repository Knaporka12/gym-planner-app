import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home"
import Exercises from "./pages/Exercises"
import ExerciseDetails from "./pages/ExerciseDetails"
import TrainingPlan from "./pages/TrainingPlan"
import TrainingDay from "./pages/TrainingDay";
import Missing from "./pages/Missing"
import { Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/DataContext";
import "./css/main.css"


function App() {

  return (

    <div className="App">

      <ContextProvider>

        <Nav></Nav>

          <Routes>

            <Route path="/gym-planner-app/" element={<Home />}/>

            <Route path="/exercises" element={<Exercises/>}></Route>

            <Route path="/exercise/:id" element={<ExerciseDetails />}></Route>

            <Route path="/plan" element={<TrainingPlan />}></Route>

            <Route path="/training-day/:id" element={<TrainingDay />}></Route>

            <Route path="*" element={<Missing />}></Route>
            

          </Routes>

        <Footer></Footer>

      </ContextProvider>

    </div>

  );
  
}

export default App;
