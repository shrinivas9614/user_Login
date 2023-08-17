import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

const initialData = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123', phone: '123-456-7890', address: '123 Street, City' },
  // Add more data rows as needed
];

function App() {
  const [data, setData] = useState(initialData);

  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log(`Edit row with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Implement your delete logic here
    console.log(`Delete row with ID: ${id}`);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.password}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => handleEdit(row.id)}>Edit</Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDelete(row.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;

