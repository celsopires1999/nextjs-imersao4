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
import { Button, Container, Paper, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { Token, validateAuth } from "../../utils/auth";
import makeHttp, { http } from "../../utils/http";
import { Transaction } from "../../utils/models";
import { parseISO, format } from "date-fns";
import AddIcon from "@mui/icons-material/Add";
import router from "next/router";

interface TransactionsPageProps {
  transactions: Transaction[];
}

const columns: Column[] = [
  {
    name: "payment_date",
    title: "Data pag.",
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), "dd/MM/yyyy");
    },
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
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), "dd/MM/yyyy");
    },
  },
];
const TransactionsPage: NextPage<TransactionsPageProps> = (props) => {
  const { transactions } = props;
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Minhas Transações
      </Typography>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => router.push("/transactions/new")}
      >
        Criar
      </Button>
      <Paper>
        <Grid rows={transactions} columns={columns}>
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
      </Paper>
    </Container>
  );
};

export default TransactionsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = validateAuth(ctx.req);
  if (!auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const token = (auth as Token).token;
  const { data: transactions } = await makeHttp(token).get("transactions");
  return { props: { transactions } };
};
