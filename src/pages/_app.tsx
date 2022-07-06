import * as React from "react";
import Head from "next/head";
import { AppContext, AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { SSRKeycloakProvider, SSRCookies } from "@react-keycloak/ssr";
import { KEYCLOAK_PUBLIC_CONFIG } from "../utils/auth";
import { parseCookies } from "../utils/cookies";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps & { cookies: any }) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    cookies,
  } = props;
  return (
    //@ts-expect-error
    <SSRKeycloakProvider
      keycloakConfig={KEYCLOAK_PUBLIC_CONFIG}
      persistor={SSRCookies(cookies)}
      initOptions={{
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          typeof window !== "undefined"
            ? `${window.location.origin}/silent-check-sso.html`
            : null,
      }}
    >
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SSRKeycloakProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    cookies: parseCookies(appContext.ctx.req),
  };
};
