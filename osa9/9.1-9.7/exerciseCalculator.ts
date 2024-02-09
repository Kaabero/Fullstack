interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number

}  

const calculateExercises = (exercises: number[], target: number): Result => {
    const trainingDays = (exercises.filter(e => e > 0)).length;
    const periodLenght = exercises.length;
    const average = (exercises.reduce((a,b) => a+b, 0)) / periodLenght;
    const success = average >= target;
    if (target - average >= 3) {
        const rating = 1;
        const ratingDescription = 'try harder next time';
        return {
            periodLength: periodLenght,
            trainingDays: trainingDays,
            success: success,
            rating: rating,
            ratingDescription: ratingDescription,
            target: target,
            average: average
        };
    } else if (target - average >= 2 && target - average < 3) {
        const rating = 2;
        const ratingDescription = 'not too bad but could be better';
        return {
            periodLength: periodLenght,
            trainingDays: trainingDays,
            success: success,
            rating: rating,
            ratingDescription: ratingDescription,
            target: target,
            average: average
        };
    } else {
        const rating = 3;
        const ratingDescription = 'very good!';
        return {
            periodLength: periodLenght,
            trainingDays: trainingDays,
            success: success,
            rating: rating,
            ratingDescription: ratingDescription,
            target: target,
            average: average
        };
    }
    

};


const parseArgumentsForExercises = (args: string[]): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    const exercises = [];

    for (let i =3; i< args.length; i++) {
        if(!isNaN(Number(args[i]))) {
            exercises.push(Number(args[i]));
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }
    console.log('exercises', exercises);
    return exercises;
    
   
  };
  

  const parseArgumentsForTarget = (args: string[]): number => {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    if(!isNaN(Number(args[2]))) {
        console.log('target', Number(args[2]));
        return Number(args[2]);
            
    } else {
        throw new Error('Provided value for target was not a number!');
    }    
    
  };

   
  
try {
    const exercises = parseArgumentsForExercises(process.argv);
    const target = parseArgumentsForTarget(process.argv);
    console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}