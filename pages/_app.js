import GlobalLayout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  );
}

export default MyApp;
