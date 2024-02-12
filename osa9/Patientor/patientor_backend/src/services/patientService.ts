import patientData from '../../data/patients.json'

import { Patient, NonSensitivePatientData } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
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



export default {
  getPatients,
  getNonSensitivePatientData
};