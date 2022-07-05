import {
  Column,
  IntegratedFiltering,
  IntegratedPaging,
  PagingState,
  SearchState,
  SortingState,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  PagingPanel,
  SearchPanel,
  Table,
  TableHeaderRow,
  Toolbar,
} from "@devexpress/dx-react-grid-material-ui";
import { Container, Typography } from "@mui/material";

const data = [
  {
    payment_date: `${new Date().toLocaleDateString()}`,
    name: "some name",
    category: "some category",
    type: "some type",
    created_at: new Date().toLocaleDateString(),
  },
];
type Props = {};
const columns: Column[] = [
  {
    name: "payment_date",
    title: "Data pag.",
  },
  {
    name: "name",
    title: "Nome",
  },
  {
    name: "category",
    title: "Categoria",
  },
  {
    name: "type",
    title: "Operação",
  },
  {
    name: "created_at",
    title: "Criado em",
  },
];
const TransactionsPage = (_props: Props) => {
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Minhas Transações
      </Typography>
      <Grid rows={[]} columns={columns}>
        <Table />
        <SortingState
          defaultSorting={[{ columnName: "created_at", direction: "desc" }]}
        />
        <SearchState defaultValue="Conta de luz" />
        <PagingState defaultCurrentPage={0} pageSize={5} />
        <TableHeaderRow showSortingControls />
        <IntegratedFiltering />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
        <IntegratedPaging />
      </Grid>
    </Container>
  );
};

export default TransactionsPage;
