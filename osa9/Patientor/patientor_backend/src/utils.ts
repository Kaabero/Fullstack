import { NewPatient, Gender } from './types';



const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!(name) || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)|| !(date)) {
      throw new Error('Incorrect or missing date');
  }
  return date;
};


const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!(gender) || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};


const parseSsn = (ssn: unknown): string => {
    if (!(ssn) || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
  
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!(occupation) || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
  
    return occupation;
};


const toNewPatient = (object: unknown): NewPatient=> {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
      entries: []
    };
  
    return newPatient;
  }

  throw new Error('Incorrect data: a field missing');
};

export default toNewPatient;