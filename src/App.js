import './style.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import React, {useState, useEffect, useRef, useMemo} from 'react';

function App() {
  const gridRef = useRef;

  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {field: 'athlete'},
    {
      field: 'age',
      cellRenderer: (p) => (
        <>
        <b>age is </b>
        {p.value}
        </>
      ),
    },

    {field: 'country', editable: false},
    {field: 'year' , editable: true},
    {field: 'date' , editable: true},
    {field: 'gold' , editable: true},
    {field: 'sport' , editable: true},
    {field: 'silver' , editable: true},
    {field: 'bronce' , editable: true},
    
  ],
  
  ),

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      enableRowGroup: true,
    }),
    []
  );

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then((result) => result.json())
    .then((rowData) => setRowData(rowData));

  }, []);

  const handleCellValueChanged = (params) => {
    console.log('Old Value', params.oldValue, 'new value', params.newValue);
    console.log('updated', params.node.data);
  };

  const gridOptions = {
    columnDefs,
    onCellValueChanged: handleCellValueChanged,
  };

  return (
    <div className='ag-theme-alpine-dark' style={{height: '100vh'}}>
      <AgGridReact
         rowGroupPanelShows= 'always'
         rowData={rowData}
         animateRows={true}
         columnDefs={columnDefs}
         gridOptions={gridOptions}
         defaultColDef={defaultColDef}


      />
      </div>

  )
}


export default App;