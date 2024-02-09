import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (!(Number(req.query.height)) || !(Number(req.query.weight))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }
    
    if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }


    const height = Number(req.query.height);
    const weight = Number(req.query.weight); 

    const bmi = calculateBmi(height, weight);
    console.log('bmi', bmi);
    return res.json({
        weight,
        height,
        bmi
    });
});

app.post('/exercises', (req, res) => {
    
    if (!(req.body.daily_exercises) || !(req.body.target)) {
        return res.status(400).send({ error: 'parameters missing' });
    }
    
    if (isNaN(Number(req.body.target))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    
    for (let i =0; i< req.body.daily_exercises.length; i++) {
        if(isNaN(Number(req.body.daily_exercises[i]))) {
            return res.status(400).send({ error: 'malformatted parameters' });  
        }
    }

    const exercises = req.body.daily_exercises;
    const target = req.body.target;
    console.log('exercises', exercises);
    console.log('target', target);
  
    const result = calculateExercises(exercises, target);
    return res.send({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});