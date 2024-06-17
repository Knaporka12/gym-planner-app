import axios from "axios";

export const TRAINING_PLAN_API_BASE_URL = 'http://localhost:3510';
export const TrainingPlanAPI = axios.create({
    baseURL: 'http://localhost:3510'
});

//npx json-server -p 3510 -w src/data/training-plan.json