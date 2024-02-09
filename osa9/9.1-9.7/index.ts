import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (!(Number(req.query.height)) || !(Number(req.query.weight))) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    
    if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }


    const height = Number(req.query.height);
    const weight = Number(req.query.weight); 



const bmi = calculateBmi(height, weight)
console.log('bmi', bmi)
return res.json({
    weight,
    height,
    bmi
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});