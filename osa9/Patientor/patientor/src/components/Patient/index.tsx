
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Table,TableBody, TableHead, Typography, TableCell, TableRow,} from '@mui/material';
import patientService from "../../services/patients";
import { Patient } from '../../types';



const PatientInfo = () => {
  const [ patient, setPatient ] = useState<Patient>()
  const id = useParams()
  console.log('id', id.id, typeof(id.id))

  if (!id.id) {
    return (
        <div className="App">
          <Box>
            <Typography align="center" variant="h6">
              Cant't find the patient
            </Typography>
          </Box>
        </div>
    )
  }

  useEffect(() => {
    const getPatient = async () => {
        if (id.id) {
            const data = await patientService.getById(id.id);
            setPatient(data)
        }
    }
    getPatient()
  }, [])
  
  console.log('patient', patient)

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
                <TableCell>Entries</TableCell>      
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
    )
  }
};

export default PatientInfo;
