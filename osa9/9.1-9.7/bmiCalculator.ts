interface CalculateBmi {
    height: number;
    weight: number;
}
  
export const parseArguments = (args: string[]): CalculateBmi => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}
  
export const calculateBmi = (height: number, weight: number): string => {
  height = (height / 100) * (height / 100);
  const bmi = weight / height;
  if (bmi < 18.5) {
      return 'Underweight';
  } else if (18.5 <= bmi && bmi <= 24.9 ) {
      return 'Normal (healthy weight)';

  } else if ( bmi >= 25 && bmi <= 29.9) {
      return 'Overweight';
  } else {
      return 'Obese'
  }
}
  
try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}