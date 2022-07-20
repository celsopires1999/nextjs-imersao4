import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import {
  TransactionCategoryLabels,
  TransactionTypeLabels,
} from "../../utils/models";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { NextPage } from "next";
import makeHttp from "../../utils/http";
import { Page } from "../../components/Page";
import { useKeycloak } from "@react-keycloak/ssr";
import { withAuth } from "../../hof/withAuth";
import { Head } from "../../components/Head";

const TransactionsNewPage: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { initialized, keycloak } = useKeycloak();

  function onSubmit(data: any) {
    try {
      makeHttp().post("transactions", data);
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  }

  if (
    typeof window !== "undefined" &&
    initialized &&
    !keycloak?.authenticated
  ) {
    router.replace(`/login?from=${window!.location.pathname}`);
    return null;
  }

  return (
    <Page>
      <Head title="Nova transação" />
      <Typography component="h1" variant="h4">
        Nova transação
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("payment_date")}
              type="date"
              required
              label="Data pagamento"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register("name")}
              label="Nome"
              required
              fullWidth
              inputProps={{ maxLength: 255 }}
            />
            <TextField
              {...register("description")}
              label="Descrição"
              required
              fullWidth
            />
            <TextField
              {...register("category")}
              select
              required
              label="Categoria"
              fullWidth
            >
              {TransactionCategoryLabels.map((i, key) => (
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              {...register("amount", { valueAsNumber: true })}
              required
              type="number"
              label="Valor"
              fullWidth
            />
            <TextField
              {...register("type")}
              select
              required
              label="Tipo de operação"
              fullWidth
            >
              {TransactionTypeLabels.map((i, key) => (
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>
            <Box marginTop={1}></Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Page>
  );
};

export default TransactionsNewPage;

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});
