import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('full_name');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get('/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedEmployees = employees.sort((a, b) => {
    if (orderBy === 'full_name') {
      return order === 'asc'
        ? a.full_name.localeCompare(b.full_name)
        : b.full_name.localeCompare(a.full_name);
    } else if (orderBy === 'position') {
      return order === 'asc'
        ? a.position.name.localeCompare(b.position.name)
        : b.position.name.localeCompare(a.position.name);
    } else if (orderBy === 'company') {
      return order === 'asc'
        ? a.company.name.localeCompare(b.company.name)
        : b.company.name.localeCompare(a.company.name);
    } else if (orderBy === 'workplace') {
      return order === 'asc'
        ? a.workplace.name.localeCompare(b.workplace.name)
        : b.workplace.name.localeCompare(a.workplace.name);
    } else if (orderBy === 'country') {
      return order === 'asc'
        ? a.country.name.localeCompare(b.country.name)
        : b.country.name.localeCompare(a.country.name);
    } else {
      return 0;
    }
  });

  const handleEditClick = (employeeId) => {
    navigate(`/employees/edit/${employeeId}`);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'personal_id'}
                  direction={orderBy === 'personal_id' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'personal_id')}
                >
                  Personal ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'full_name'}
                  direction={orderBy === 'full_name' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'full_name')}
                >
                  Full Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'position'}
                  direction={orderBy === 'position' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'position')}
                >
                  Position
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'company'}
                  direction={orderBy === 'company' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'company')}
                >
                  Company
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'workplace'}
                  direction={orderBy === 'workplace' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'workplace')}
                >
                  Workplace
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'country'}
                  direction={orderBy === 'country' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'country')}
                >
                  Country
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.personal_id}</TableCell>
                <TableCell>{employee.full_name}</TableCell>
                <TableCell>{employee.position.name}</TableCell>
                <TableCell>{employee.company.name}</TableCell>
                <TableCell>{employee.workplace.name}</TableCell>
                <TableCell>{employee.country.name}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEditClick(employee.id)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EmployeeList;
