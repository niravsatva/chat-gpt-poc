import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}
