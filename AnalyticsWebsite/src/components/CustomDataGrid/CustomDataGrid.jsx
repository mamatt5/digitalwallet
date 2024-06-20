import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './CustomDataGrid.css';

export default function CustomDataGrid({ rows, columns, loading }) {
  return (
    <div className="customDataGrid">
        <DataGrid 
          rows={rows} 
          columns={columns} 
          loading={loading} 
          slots={{ toolbar: GridToolbar }}
          sx={{ border: 'none' }}
        />
    </div>
  );
}
