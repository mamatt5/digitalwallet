import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import './CustomDataGrid.css';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function CustomDataGrid({ rows, columns, loading }) {
  return (
    <div className="customDataGrid">
        <DataGrid 
          rows={rows} 
          columns={columns} 
          loading={loading} 
          slots={{
            toolbar: CustomToolbar,
          }}
          sx={{ border: 'none', maxWidth: "1000px" }}
        />
    </div>
  );
}
