import "normalize.css";
import "@/styles/globals.scss";

import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import wrapperStore from "@/store/index";
import { Provider } from "react-redux";

export default function App({ Component, ...args }: AppProps) {
  const { store, props } = wrapperStore.useWrappedStore(args);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}
