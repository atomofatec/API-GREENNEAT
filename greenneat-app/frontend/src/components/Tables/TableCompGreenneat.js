import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Title from '../Outros/Title';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { API_BASE_URL } from '../../../env';
import { getUserToken } from '../../utils/util';

function createData(tipo, valor, data, regiao) {
	return {
		tipo,
		valor,
		//data,
		regiao,
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
		id: 'tipo de óleo',
		numeric: false,
		disablePadding: false,
		label: 'Tipo',
	},
	{
		id: 'valor',
		numeric: true,
		disablePadding: false,
		label: 'Média de valor ($)',
	},
	// {
	// 	id: 'data',
	// 	numeric: true,
	// 	disablePadding: false,
	// 	label: 'Data',
	// },
	{
		id: 'regiao',
		numeric: false,
		disablePadding: true,
		label: 'Região',
	},
];

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;

	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
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
							</Typography>
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
};

async function getValue(type, location){
	return await axios.get(API_BASE_URL + `/oils/compare?type=${type}&location=${location}`)
}

export default function TableUsersGreenneat() {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('tipo');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(8);
	const [rows, setRows] = React.useState([]);



	useEffect(() => {
		const request = async () => {

			try{
				
				const results = []

				//obter o token do cookie e formata para enviar para o backend
				const token = getUserToken() 
				axios.defaults.headers.common['Authorization'] = token

				//obter media de preços para cada comparação região/tipo de oleo
				for	(var type=1; type<=2; type++){
					for(var location = 1; location <= 4; location++){
						results.push(await getValue(type, location))
					}
				}

				const r = [
					createData("Virgem", results[0].data.averagePrice, "-", "Norte"),
					createData("Virgem", results[1].data.averagePrice, "-", "Sul"),
					createData("Virgem", results[2].data.averagePrice, "-", "Leste"),
					createData("Virgem", results[3].data.averagePrice, "-", "Oeste"),
					createData("Usado", results[4].data.averagePrice, "-", "Norte"),
					createData("Usado", results[5].data.averagePrice, "-", "Sul"),
					createData("Usado", results[6].data.averagePrice, "-", "Leste"),
					createData("Usado", results[7].data.averagePrice, "-", "Oeste")
				]
				setRows(r)
			} catch(error) {
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
			<TableContainer>
				<Grid
					container
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					sx={{ marginBottom: "20px", marginTop: "20px" }}
				>
					<Grid item xs={6}>
						<Title>Comparador</Title>
					</Grid>
				</Grid>
					<Table
						sx={{ width: '100%', minWidth: 750 }}
						aria-labelledby="tableTitle"
					>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
						/>
						<TableBody>
							{visibleRows.map((row, index) => (
								<TableRow
									hover
									role="checkbox"
									tabIndex={-1}
									key={row.nome}
								>
									<TableCell
										component="th"
										scope="row"
										padding="none"
										align="center"
									>
										{row.tipo}
									</TableCell>
									<TableCell align="center">{row.valor}</TableCell>
									{/* <TableCell align="center">{row.data}</TableCell> */}
									<TableCell align="center">{row.regiao}</TableCell>
								</TableRow>
							))}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
	);
}