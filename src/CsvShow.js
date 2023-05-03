import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { CSVReader } from 'react-papaparse';
import Table from 'react-bootstrap/Table';
import Papa from 'papaparse';
import Button from 'react-bootstrap/Button';
import {eventsList} from './eventsList';


export default function CsvViewerButton({url}) {
    const [showModal, setShowModal] = useState(false);
    const [csvData, setCsvData] = useState([]);
  
    const handleFileLoaded = (data) => {
      setCsvData(data);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setCsvData([]);
    };
  
    return (
      <>
        <Button onClick={() => fetch(url)
          .then(response => response.text())
          .then(data => {
            const parsedData = Papa.parse(data, { header: true });
            handleFileLoaded(parsedData.data);
          })
        }>
          View File
        </Button>

        <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show = {showModal}
      onHide={handleCloseModal}
      fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Summary of the Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Table striped bordered hover> <thead> <tr> {csvData[0] && Object.keys(csvData[0]).map((key) => ( <th key={key}>{key}</th> ))} </tr> </thead> <tbody> {csvData.map((row, rowIndex) => ( <tr key={rowIndex}> {Object.values(row).map((value, colIndex) => ( <td key={colIndex}>{value}</td> ))} </tr> ))} </tbody> </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal}>Close</Button>
      </Modal.Footer>
    </Modal>

      
      </>
    );
  }
  