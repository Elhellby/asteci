import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { height } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function App() {

  const [contentGrid, setContentGrid] = useState([])
  const [page, setPage] = useState(1)
  const [rowCount, setRowCount] = useState(0)
  const [showDetail, setShowDetail] = useState(false)
  const [closeDetail, setCloseDetail] = useState(false)

  const columns = [
    { field: 'id', headerName: 'id' },
    { field: 'cityid', headerName: 'cityid' },
    { field: 'validdateutc', headerName: 'validdateutc' },
    { field: 'winddirectioncardinal', headerName: 'winddirectioncardinal' },
    { field: 'probabilityofprecip', headerName: 'probabilityofprecip' },
    { field: 'relativehumidity', headerName: 'relativehumidity' },
    { field: 'name', headerName: 'name' },
    { field: 'date-insert', headerName: 'date-insert' },
    { field: 'longitude', headerName: 'longitude' },
    { field: 'state', headerName: 'state' },
    { field: 'lastreporttime', headerName: 'lastreporttime' },
    { field: 'skydescriptionlong', headerName: 'skydescriptionlong' },
    { field: 'stateabbr', headerName: 'stateabbr' },
    { field: 'tempc', headerName: 'tempc' },
    { field: 'latitude', headerName: 'latitude' },
    { field: 'iconcode', headerName: 'iconcode' },
    { field: 'windspeedkm', headerName: 'windspeedkm' }
  ]

  const getInfoGrid = async () => {
    try {
      let response = await axios.get(`https://api.datos.gob.mx/v1/condiciones-atmosfericas?pageSize=10&page=${page}`)
      setRowCount(response.data.pagination.total)
      response.data.results = response.data.results.map(obj => {
        obj.id = obj._id
        delete obj._id
        return obj
      })
      setContentGrid([...contentGrid, ...response.data.results])

    } catch (error) {
      setContentGrid([])
    }
  }

  useEffect(() => {
    getInfoGrid()
  }, [page])

  return (
    <div className="App">
      <DataGrid
        autoPageSize={true}
        style={{ height: '650px' }}
        rows={contentGrid}
        columns={columns}
        rowHeight={50}
        rowCount={rowCount}
        pagination
        onPageChange={(page) => {
          setPage(page + 1)
        }}
        onRowDoubleClick={(info) => {
          console.log(info.row.cityid)
        }}
      />
      <Modal
        open={() => setShowDetail(!showDetail)}
        onClose={() => setCloseDetail(!closeDetail)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <DataGrid
            autoPageSize={true}
            style={{ height: '650px' }}
            rows={contentGrid}
            columns={columns}
            rowHeight={50}
            rowCount={rowCount}
            pagination
            onPageChange={(page) => {
              setPage(page + 1)
            }}
            onRowDoubleClick={(info) => {
              console.log(info.row.cityid)
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default App;
