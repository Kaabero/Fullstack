
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Table,TableBody, TableHead, Typography, TableCell, TableRow,} from '@mui/material';
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { Patient, Entry, Diagnosis } from '../../types';



const PatientInfo = () => {
  const [ patient, setPatient ] = useState<Patient>();
  const [ diagnoses, setDiagnoses ] = useState<Diagnosis[]>();
  const id = useParams();
  console.log('id', id.id, typeof(id.id));


  useEffect(() => {
    const getDiagnoses = async () => {
      const diagnosesData = await diagnosesService.getAll();
      setDiagnoses(diagnosesData);
    };
    const getPatient = async () => {
        if (id.id) {
            const data = await patientService.getById(id.id);
            setPatient(data);
        }

    };
    getPatient();
    getDiagnoses();
  }, [id.id]);
  
  console.log('patient', patient);
  console.log('diagnoses', diagnoses);

 

  if (!id.id) {
    return (
        <div className="App">
          <Box>
            <Typography align="center" variant="h6">
              Cant't find the patient
            </Typography>
          </Box>
        </div>
    );
  }

  const DiagnosisData = ({ code, diagnoses }: { code: string; diagnoses: Diagnosis[] | undefined }) => {

    const diagnosis = diagnoses?.find(diagnosis => diagnosis.code === code);
  
    if (!diagnosis) {
      return null;
    }
  
    return (
      <p>
        {diagnosis.code}: {diagnosis.name}
      </p>
    );
  };
  const Entries = (entry: Entry) => {
   

    if (!entry.diagnosisCodes){
      return (
        <div>
            <br />
            <strong>{entry.date}</strong> <br />
            <em>{entry.description}</em>
            <p>No diagnosis</p>
        </div>
      );
    }
    return (
      <div>
          <br />
          <strong>{entry.date}</strong> <br />
          <em>{entry.description}</em>
          <p>Diagnosis:</p>
          {(entry.diagnosisCodes).map((code: string, index: number) =>
          <DiagnosisData
            key={index}
            code={code}
            diagnoses={diagnoses}
          />
          )}
      </div>
    );
  };
 


  if (patient) {
    return (
        <div className="App">
        <Box>
            <Typography align="center" variant="h6">
            Patient: <strong>{patient.name}</strong>
            </Typography>
        </Box>
        <Table style={{ marginBottom: "1em" }}>
            <TableHead>
            <TableRow>
                <TableCell>Ssn</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Occupation</TableCell>     
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key={patient.id}>
                <TableCell>{patient.ssn}</TableCell>
                <TableCell>{patient.dateOfBirth}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.occupation}</TableCell>
                </TableRow>
            </TableBody>
            
        </Table>
        <h2>Entries: </h2>
        {(patient.entries).map((entry: Entry) => (
          <Entries
          key={entry.id}
          {...entry}
          />
        ))}
        

        </div>
    );
  } else {
    return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Cant't find the patient
        </Typography>
      </Box>
    </div>
    );
  }
};

export default PatientInfo;
