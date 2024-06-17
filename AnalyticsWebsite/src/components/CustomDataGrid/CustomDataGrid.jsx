import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import './CustomDataGrid.css';

export default function CustomDataGrid() {
  const { data, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 13,
    maxColumns: 9,
  });

  return (
    <div className="customDataGrid">
        <DataGrid 
          {...data} 
          loading={loading} 
          slots={{ toolbar: GridToolbar }}
          sx={{border:'none'}}
        />
    </div>
  );
}
