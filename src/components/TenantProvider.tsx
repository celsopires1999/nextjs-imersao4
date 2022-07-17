import { createContext, ReactNode, useEffect, useState } from "react";
import { useAuthSwr } from "../hooks/useAuthSwr";
import { isEqual } from "lodash";

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  balance: number;
}

const TenantContext = createContext<Tenant>(null as any);

export default TenantContext;

export type TenantProviderProps = {
  children: ReactNode;
};

export const TenantProvider: React.FunctionComponent<TenantProviderProps> = (
  props
) => {
  const [tenant, setTenant] = useState<Tenant>();
  const { data } = useAuthSwr("my-account", {
    refreshInterval: 10000,
  });

  useEffect(() => {
    if (!isEqual(data, tenant)) {
      setTenant(data);
    }
  }, [data, tenant]);

  return (
    <TenantContext.Provider value={tenant as any}>
      {props.children}
    </TenantContext.Provider>
  );
};
