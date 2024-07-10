import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbar } from '@mui/x-data-grid';
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
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        slots={{ toolbar: CustomToolbar }}
        sx={{ border: 'none', width: '100%', color: 'black' }}
        pageSizeOptions={[25, 50, 100]} 
        pagination 
        autoHeight 
      />
    </div>
  );
}
