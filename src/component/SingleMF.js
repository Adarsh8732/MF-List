import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import PrimarySearchAppBar from './Navbar';

function createData(name, calories, fat, carbs, protein) {
    return {
      name,
      calories,
    };
}
const rows=[];

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Date',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Nav',
  },
  
];

// function SingleMF(props) {
function EnhancedTableHead(props) {
        const {  order, orderBy, numSelected, rowCount} =
          props;
    return (
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              {/* <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
              /> */}
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'center' : 'center'}
                padding={headCell.disablePadding ? 'normal' : 'normal'}
              >{headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
    }
    
// }
// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//   };
  export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  

    const {id} = useParams();
    const[specificMF,setspecificMf] = useState([]);
    useEffect(()=>{
        async function fetchApi(){
            let response = await fetch(`https://api.mfapi.in/mf/${id}`);
            response = await response.json();
            setspecificMf(response);
        }
        fetchApi()
    },[setspecificMf])
    console.log(specificMF.meta);
    console.log(id);
    let datanav = specificMF.data;

    if(datanav!=undefined){
        datanav.map((dn)=>{
            rows.push(createData(dn.date,dn.nav));
        })
    }
    let {fund_house,scheme_category,scheme_name,scheme_type} = {};
    if(specificMF!=undefined)
        if(specificMF.meta!=undefined){
            // {fund_house,scheme_category,scheme_name,scheme_type} = specificMF.meta;
            fund_house = specificMF.meta.fund_house
            scheme_category = specificMF.meta.scheme_category
            scheme_name = specificMF.meta.scheme_name
            scheme_type = specificMF.meta.scheme_type
        }
    console.log(datanav);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
      
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    //   fund_house: "Aditya Birla Sun Life Mutual Fund"
    //   scheme_category: "Equity Scheme - Large & Mid Cap Fund"
    //   scheme_code: 100033
    //   scheme_name: "Aditya Birla Sun Life Equity Advantage Fund - Regular Growth"
    //   scheme_type: "Open Ended Schemes"
    return (
        <>
        <PrimarySearchAppBar></PrimarySearchAppBar>
        <Card className="mf_info" style={{backgroundColor:"lightgray"}}sx={{ minWidth: "100%" }}>
            <CardContent className="mf_info">
                <Typography variant='h4'>
                    Mutual Fund Info
                </Typography>
                <hr/>
                <Typography variant="h6" component="div">
                FundHouse  :-  {fund_house}
                </Typography>
                <Typography variant="h6" component="div">
                Scheme Category  :- {scheme_category}
                </Typography>
                
                <Typography variant="h6" component="div">
                Scheme Name  :-  {scheme_name}
                </Typography>
                <Typography variant="h6" component="div">
                Scheme Type  :-  {scheme_type}
                </Typography>
            </CardContent>
            
        </Card>
        <br></br>

        <Box sx={{ width: '90%' }} style={{margin:"auto"}}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                       role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                           {/*<Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                          */}
                        </TableCell> 
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.calories}</TableCell>
                        </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 25, 100,rows.length]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      </>
    );
  }
  

// export default SingleMF
