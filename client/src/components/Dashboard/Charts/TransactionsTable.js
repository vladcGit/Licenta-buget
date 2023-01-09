import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const headCells = [
  {
    id: "uniqueId",
    align: "left",
    disablePadding: false,
    label: "Id",
  },
  {
    id: "description",
    align: "left",
    disablePadding: true,
    label: "Description",
  },
  {
    id: "date",
    align: "right",
    disablePadding: false,
    label: "Date",
  },
  {
    id: "Tag",
    align: "left",
    disablePadding: false,

    label: "Category",
  },
  {
    id: "amount",
    align: "right",
    disablePadding: false,
    label: "Total Amount",
  },
];

const formatDate = (date) => {
  date = new Date(date);
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + "/" + mm + "/" + yyyy;
};

function TransactionsTableHead() {
  return (
    <TableHead>
      <TableRow style={{ backgroundColor: "#74e0d9" }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TransactionsTable({ transactions }) {
  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            "& .MuiTableCell-root:first-child": {
              pl: 2,
            },
            "& .MuiTableCell-root:last-child": {
              pr: 3,
            },
          }}
        >
          <TransactionsTableHead />
          <TableBody>
            {transactions.map((row, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  tabIndex={-1}
                  key={row.id}
                  style={
                    index % 2
                      ? { background: "white" }
                      : { background: "white" }
                  }
                >
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="right">{formatDate(row.date)}</TableCell>
                  <TableCell align="left">{row.categoryName}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
