import { AppBar, Toolbar, Typography } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import Menu from "./Menu";
import UserAccountMenu from "./UserAccountMenu";
import { useKeycloak } from "@react-keycloak/ssr";
import { useContext } from "react";
import TenantContext from "../TenantProvider";

//next static
const Navbar: React.FunctionComponent = () => {
  const { initialized, keycloak } = useKeycloak();
  const tenant = useContext(TenantContext);
  const isLoading = !(initialized && keycloak?.authenticated && tenant);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Menu />
          <StoreIcon />
          <Typography component="h1" variant="h6" style={{ flexGrow: 1 }}>
            Fincycle - {isLoading ? `loading` : tenant.name}
          </Typography>
          <Typography>
            Saldo R$ {isLoading ? `loading` : tenant.balance}
          </Typography>
          <UserAccountMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
