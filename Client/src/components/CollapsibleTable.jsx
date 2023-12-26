import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from './Button';
import './CollapsibleTable.css'

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row({ key, row, dataHeadCells, subDataHeadCells, readOnly, subTableTitle }) {
  const [open, setOpen] = React.useState(false);
  const subHeadCells = [ ...subDataHeadCells ]
  subHeadCells.push(
    {
      id: '',
      numeric: true,
      disablePadding: false,
      label: '',
    }
  )

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* Add TableCells */}
        {dataHeadCells.map((column) => (column['id']===dataHeadCells[0]['id'] ? (
          <TableCell
            component="th"
            id={row[column['id']]}
            scope="row"
            padding="none"
          >
            {row[column['id']]}
          </TableCell>
          ) : (
          <TableCell align={column['numeric']===true ? "right" : "left"} >{row[column['id']]}</TableCell>
        )))}
        {/* New TableCell for Edit & Delete button */}
        {!readOnly && (
          <TableCell align="right">
            <IconButton
              aria-label="edit"
              color="primary"
              size="small"
              onClick={(e) => {e.stopPropagation(); /*onEdit(row.id)*/}} // Replace with your edit function
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="secondary"
              size="small"
              onClick={(e => {e.stopPropagation(); })}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {subTableTitle}
              </Typography>
              <Table size="small" aria-label="purchases">
                {/* Add SubTable Header Cells */}
                <TableHead>
                  <TableRow>
                    {subHeadCells.map((headCell) => (
                      (headCell.id !== '' || !readOnly) &&
                      <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                      >
                      {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Add SubTableCells */}
                  {row.subTable.map((subRow) => (
                    <TableRow key={subRow.id}>
                      {/* New SubTableCell */}
                      {subDataHeadCells.map((column) => (column['id'] === subDataHeadCells[0]['id'] ? (
                        <TableCell
                          component="th"
                          id={subRow.id}
                          scope="row"
                          padding="none"
                        >
                          {subRow[column['id']]}
                        </TableCell>
                      ) : (
                        <TableCell align={column['numeric']===true ? "right" : "left"} >{subRow[column['id']]}</TableCell>
                      )))}
                      {/* New SubTableCell for Edit & Delete button */}
                      {!readOnly && (
                        <TableCell align="right">
                          <IconButton
                            aria-label="edit"
                            color="primary"
                            size="small"
                            onClick={(e) => {e.stopPropagation(); /*onEdit(row.id)*/}} // Replace with your edit function
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            color="secondary"
                            size="small"
                            onClick={(e => {e.stopPropagation(); })}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable({ dataTable, dataHeadCells, subDataHeadCells, title, subTableTitle, onAdd, readOnly}) {
  const plusSign = `<svg data-slot="icon" data-darkreader-inline-stroke="" fill="none" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" style="width: 16px; height: 16px;" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
  </svg><p>Add</p>`
  const empty = Array.isArray(dataTable) && dataTable.every(obj => Object.keys(obj).length === 0);
  const headCells = [ ...dataHeadCells ]
  headCells.push(
    {
      id: '',
      numeric: true,
      disablePadding: false,
      label: '',
    }
  )
  
  console.log(dataTable);
  return (
    <TableContainer component={Paper}>
      <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
      >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
        {!readOnly && (
          <Button text={<span dangerouslySetInnerHTML={{ __html: plusSign }} />} onClick={onAdd} classNames='add-btn btn btn-G btn-wide right'/>
        )}
      </Toolbar>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {/* Add Table Header */}
            {headCells.map((headCell) => (
              (headCell.id !== '' || !readOnly) &&
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
              >
              {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Add Table Rows */}
          {!empty && dataTable.map((row) => (
            <Row 
             key={row.id}
             row={row}
             dataHeadCells={dataHeadCells}
             subDataHeadCells={subDataHeadCells}
             readOnly={readOnly}
             subTableTitle={subTableTitle}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.defaultProps = {
  readOnly: false,
}