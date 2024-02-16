import patientsFullData from '../../data/patients';

import { Patient, NonSensitivePatientData, NewPatient } from '../types';

import { v4 as uuidv4 } from 'uuid';


const patients: Patient[] = patientsFullData;

const getPatients = (): Patient[] => {
  console.log('patients', patients);
  return patients;
};

const findById= (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  console.log('patient', patient);
  return patient;
};


const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation

      }));
  };

const addPatient = ( patient: NewPatient): Patient => {
    const newPatient= {
        id: uuidv4(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};


export default {
  getPatients,
  getNonSensitivePatientData,
  addPatient,
  findById
};