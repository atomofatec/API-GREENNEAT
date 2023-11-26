import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
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
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import Title from '../Outros/Title';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { API_BASE_URL } from '../../../env';
import { visuallyHidden } from '@mui/utils';
import { getUserToken, formatDate } from '../../utils/util';
import { useState ,useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const alertStyle = {
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 9999,
  };

function createData(id, supplier, oil_amount, price, status, data, document) {
	return {
		id,
		supplier,
		oil_amount,
		price,
		status,
		data,
		document
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
		id: 'supplier',
		numeric: true,
		disablePadding: false,
		label: 'Estabelecimento',
	},
	{
		id: 'oil_amount',
		numeric: false,
		disablePadding: false,
		label: 'Quantidade',
	},
	{
		id: 'preco',
		numeric: false,
		disablePadding: false,
		label: 'Preço',
	},
	{
		id: 'status',
		numeric: true,
		disablePadding: false,
		label: 'Status',
	},
	{
		id: 'data',
		numeric: false,
		disablePadding: true,
		label: 'Data',
	},
	{
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
				{/* <TableCell padding="checkbox">
					<Checkbox
						color="success"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts',
						}}
					/>
				</TableCell> */}
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

const options = [
    { icon: <CheckIcon style={{ color: '#3B8F5C', height: '1rem' }} />, label: 'Aceitar' },
];

const ITEM_HEIGHT = 48;

function LongMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? 'long-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '15ch',
					},
				}}
			>
				<MenuItem
					key={'Aceitar'}
					selected={'Aceitar' === 'Pyxis'}
					onClick={props.onClickAccept}
				>
					<CheckIcon style={{ color: '#3B8F5C', height: '1rem' }} /> 
					Aceitar
				</MenuItem>
				{/* {options.map((option) => (
                    <MenuItem
                        key={option.label}
                        selected={option.label === 'Pyxis'}
                        onClick={handleClose}
                    >
                        {option.icon} {option.label}
                    </MenuItem>
                ))} */}
			</Menu>
		</div>
	);
}

function EnhancedTableToolbar(props) {
	const { numSelected } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				// ...(numSelected > 0 && {
				// 	bgcolor: (theme) =>
				// 		alpha(theme.palette.success.main, theme.palette.action.activatedOpacity),
				// }),
			}}
		>
			{/* {numSelected > 0 ? (
				<Typography
					sx={{ flex: '1 1 100%' }}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selecionado(s)
				</Typography>
			) : ( */}
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
                    <Title>Solicitações</Title>
                  </Grid>
              	</Grid>
				</Typography>
			{/* )}

			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip></Tooltip>
			)} */}
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


export default function TableRequestsPartner() {

	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('supplier');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rows, setRows] = React.useState([]);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [autoCloseSuccessTimeout, setAutoCloseSuccessTimeout] = useState(null);
    const [autoCloseErrorTimeout, setAutoCloseErrorTimeout] = useState(null);

	React.useEffect(() => {

		const request = async () => {

			try {
				//obter o token do cookie e formata para enviar para o backend
				const token = getUserToken()
				axios.defaults.headers.common['Authorization'] = token

				const response = await axios.get(API_BASE_URL + `/oils/available`)

				const r = response.data.map(item => createData(item.id, item.businessname, item.quantity + ' ml', item.price, item.status, formatDate(item.availabledate), item.document))
				setRows(r)

			} catch (error) {
				alert("Erro ao obter dados")
			}
		}

		request();
	}, [])

	const collectOil = async (id, document, amount) => {
		try{
			const token = getUserToken()
			axios.defaults.headers.common['Authorization'] = token

			await axios.put(API_BASE_URL + `/oils/collect/${id}`)
			const body = { amount: parseInt(amount), document: document }
			await axios.post(API_BASE_URL + `/transactions/transfer`, body)

			setSuccessMessage("Oleo coletado com sucesso");
			setSuccessAlertOpen(true);
            setAutoCloseSuccessTimeout(
                setTimeout(() => setSuccessAlertOpen(false), 5000)
            );
			setRows(rows.map(item => {
				if(item.id == id)
					item.status = "COLETADO"
				return item
			}))
			
		} catch(error){
			await axios.put(API_BASE_URL + `/oils/restore/${id}`)
			console.log(error)
			setErrorMessage(error.response.data.message);
            setErrorAlertOpen(true);
            setAutoCloseErrorTimeout(
                setTimeout(() => setErrorAlertOpen(false), 5000)
            );
		}	
		

	}

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.supplier);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, supplier) => {
		const selectedIndex = selected.indexOf(supplier);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, supplier);
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

	const isSelected = (supplier) => selected.indexOf(supplier) !== -1;

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
		<Paper sx={{ width: '80%', margin: '0 auto', display: 'flex', flexDirection: 'column' }} elevation={2}>
			<EnhancedTableToolbar numSelected={selected.length} />
			<TableContainer>
				<Table
					sx={{ width: '100%', minWidth: 750 }}
					aria-labelledby="tableTitle"
					size={dense ? 'small' : 'medium'}
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
							const isItemSelected = isSelected(row.supplier);
							const labelId = `enhanced-table-checkbox-${index}`;

							return (
								<TableRow
									hover
									onClick={(event) => handleClick(event, row.supplier)}
									role="checkbox"
									aria-checked={isItemSelected}
									tabIndex={-1}
									key={row.supplier}
									// selected={isItemSelected}
									// sx={{ cursor: 'pointer' }}
								>
									{/* <TableCell padding="checkbox">
										<Checkbox
											color="success"
											checked={isItemSelected}
											inputProps={{
												'aria-labelledby': labelId,
											}}
										/>
									</TableCell> */}
									<TableCell
										component="th"
										id={labelId}
										scope="row"
										padding="none"
										align="center"
									>
										{row.supplier}
									</TableCell>
									<TableCell align="center">{row.oil_amount}</TableCell>
									<TableCell align="center">{row.price}</TableCell>
									<TableCell align="center" sx={{
										color:
											row.status === 'DISPONIVEL' ? 'green' :
											row.status === 'COLETADO' ? 'red' : 'inherit',
									}}>{row.status}</TableCell>
									<TableCell align="center">{row.data}</TableCell>
									<TableCell align="center">
										{row.status == "DISPONIVEL" &&
											<LongMenu onClickAccept={() => collectOil(row.id, row.document, row.price)} row={row}/>
										}
									</TableCell>
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
				labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			{errorAlertOpen && (
                <div style={alertStyle}>
                    <Alert severity="error">
                        <AlertTitle>Erro</AlertTitle>
                        {errorMessage}
                    </Alert>
                </div>
            )}
            {successAlertOpen && (
                <div style={alertStyle}>
                    <Alert severity="success">
                        <AlertTitle>Sucesso</AlertTitle>
                        {successMessage}
                    </Alert>
                </div>
            )}
		</Paper>
	);
}