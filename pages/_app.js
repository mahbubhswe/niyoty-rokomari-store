import "../styles/globals.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { StoreProvider } from "../utils/Store";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return (
 
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>

  );
}

export default MyApp;
