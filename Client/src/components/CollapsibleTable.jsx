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

function Row({ key, row, dataHeadCells, subDataHeadCells, readOnly, subTableTitle, onSubAdd, onEdit, onSubEdit, onDelete, onSubDelete, addable, subAddable, editable, subEditable}) {
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
  const plusSign = `<svg data-slot="icon" data-darkreader-inline-stroke="" fill="none" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" style="width: 16px; height: 16px;" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
  </svg><p>Add</p>`

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
            {/* Edit button */ }
            {editable &&  (<IconButton
              aria-label="edit"
              color="primary"
              size="small"
              onClick={(e) => { e.stopPropagation(); onEdit(row.id) }} // Replace with your edit function
            >
              <EditIcon />
            </IconButton>
            )}
            {/* Delete button */ }
            <IconButton
              aria-label="delete"
              color="secondary"
              size="small"
              onClick={(e) => { e.stopPropagation(); onDelete(row.id) }}
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
                <Toolbar
                sx={{
                  pl: { sm: 2 },
                  pr: { xs: 1, sm: 1 },
                }}
                >
                  <Typography variant="h6" gutterBottom component="div">
                    {subTableTitle}
                  </Typography>
                  {!readOnly && subAddable && (
                    <Button text={<span dangerouslySetInnerHTML={{ __html: plusSign }} />} onClick={onSubAdd} classNames='add-btn btn btn-G btn-wide right'/>
                  )}
                </Toolbar>
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
                          {/* Edit button */ }
                          {subEditable &&  (<IconButton
                            aria-label="edit"
                            color="primary"
                            size="small"
                            onClick={(e) => { e.stopPropagation(); 
                            console.log(row.id)
                            console.log(subRow.id)
                            onSubEdit([row.id, subRow.id]) }} // Replace with your edit function
                          >
                            <EditIcon />
                          </IconButton>
                          )}
                          {/* Delete button */ }
                          <IconButton
                            aria-label="delete"
                            color="secondary"
                            size="small"
                            onClick={(e) => { e.stopPropagation(); 
                            console.log(row.id)
                            console.log(subRow.id)
                            onSubDelete([row.id, subRow.id]) }}
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

export default function CollapsibleTable({ dataTable, dataHeadCells, subDataHeadCells, title, subTableTitle, onAdd, onSubAdd, onEdit, onSubEdit, onDelete, onSubDelete, readOnly, addable, subAddable, editable, subEditable}) {
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
        {!readOnly && addable && (
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
             subTableTitle={subTableTitle}
             addable={addable}
             subAddable={subAddable}
             editable={editable}
             subEditable={subEditable}
             readOnly={readOnly}
             onSubAdd={onSubAdd}
             onEdit={onEdit}
             onSubEdit={onSubEdit}
             onDelete={onDelete}
             onSubDelete={onSubDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.defaultProps = {
  addable: true,
  subAddable: false,
  editable: true,
  subEditable: true,
  readOnly: false,
  onEdit: (e) => {e.stopPropagation() },
  onSubEdit: (e) => {e.stopPropagation() },
  onSubAdd: () => {},
  onDelete: (e) => {e.stopPropagation() },
  onSubDelete: (e) => {e.stopPropagation() },
}