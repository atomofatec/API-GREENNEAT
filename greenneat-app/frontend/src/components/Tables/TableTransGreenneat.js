import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Title from '../Outros/Title';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import { API_BASE_URL } from '../../../env';
import { visuallyHidden } from '@mui/utils';

function createData(receiver, documento, valor, data, situacao) {
  return {
    receiver,
    documento,
    valor,
    data,
    situacao,
  };
}


function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "cnpj_receiver",
    numeric: false,
    disablePadding: false,
    label: "Destinatário",
  },
  
  {
    id: "documento",
    numeric: false,
    disablePadding: false,
    label: "Documento",
  },
  {
    id: "valor",
    numeric: true,
    disablePadding: false,
    label: "Valor",
  },
  {
    id: "data",
    numeric: false,
    disablePadding: true,
    label: "Data",
  },
  {
    id: "situacao",
    numeric: false,
    disablePadding: true,
    label: "Situação",
  },
];

function EnhancedTableHead(props) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;

	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<StyledTableCell
						key={headCell.id}
						align={headCell.numeric ? 'center' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							<Typography sx={{fontWeight: 'bold'}}>
								{headCell.label}
								{orderBy === headCell.id ? (
									<Box component="span" sx={visuallyHidden}>
										{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
									</Box>
								) : null}
							</Typography>
						</TableSortLabel>
					</StyledTableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const ITEM_HEIGHT = 48;

function EnhancedTableToolbar(props) {
	const { numSelected } = props;

	return (
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
				<Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <Grid item xs={6}>
                    <Title>Transações</Title>
                  </Grid>
              	</Grid>
				</Typography>
		</Toolbar>
	);
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	textAlign: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

function formatDate(date){
	var data = new Date(date)
	
	var dia  = data.getDate();
	if (dia< 10) {
		dia  = "0" + dia;
	}

	var mes  = data.getMonth() + 1;
	if (mes < 10) {
		mes  = "0" + mes;
	}

	var ano  = data.getFullYear();
	return dia + "/" + mes + "/" + ano;
}

export default function TableTransGreenneat() {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('sender');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rows, setRows] = React.useState([]);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	React.useEffect(() => {

		const request = async () => {

			try {
				
				//obter o token do cookie e formata para enviar para o backend
				const tokenCookie = document.cookie.split(" ")
				let token = tokenCookie[0].split("=")[1]
				token = token.substring(0, token.length - 1)
				axios.defaults.headers.common['Authorization'] = token

				const response = await axios.get(API_BASE_URL + `/transactions`)
				const transactions = response.data
				
				const r = await Promise.all(transactions.map(async transaction => {
					
					// let sender = await axios.get(API_BASE_URL + `/users/` + transaction.idsenderuser)
					// sender = sender.data[0]
					let receiver = await axios.get(API_BASE_URL + `/users/` + transaction.idreceiveruser)
					receiver = receiver.data[0]

					return createData(receiver.businessname, receiver.document, transaction.amount, formatDate(transaction.date), 
          transaction.status);
				}))

				setRows(r)

			} catch (error) {
				alert("Erro ao obter dados")
			}
		}

		request();
	}, [])

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.sender);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, sender) => {
		const selectedIndex = selected.indexOf(sender);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, sender);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const isSelected = (sender) => selected.indexOf(sender) !== -1;

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(
		() =>
			stableSort(rows, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage,
			),
		[order, orderBy, page, rowsPerPage],
	);

  return (
    <Paper
      sx={{
        width: "80%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
      elevation={2}
    >
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table
          sx={{ width: "100%", minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.sender);
              //const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  // hover
                  // onClick={(event) => handleClick(event, row.sender)}
                  // //role="checkbox"
                  // aria-checked={isItemSelected}
                  // tabIndex={-1}
                  // key={row.sender}
                  // selected={isItemSelected}
                  // sx={{ cursor: "pointer" }}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      color="success"
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell> */}
                  {/* <TableCell
                    component="th"
                    //id={labelId}
                    scope="row"
                    padding="none"
                    align="center"
                  >
                    {row.sender}
                  </TableCell> */}
                  <TableCell align="center">{row.receiver}</TableCell>
                  <TableCell align="center">{row.documento}</TableCell>
                  <TableCell align="center">{row.valor}</TableCell>
                  <TableCell align="center">{row.data}</TableCell>
                  <TableCell align="center">{row.situacao}</TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
