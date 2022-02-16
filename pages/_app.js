import "../styles/globals.css";
import { useEffect } from "react";
import AOS from "aos";
import { SessionProvider } from "next-auth/react";
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
    <SessionProvider session={session}>
      <StoreProvider>
        {" "}
        <Component {...pageProps} />
      </StoreProvider>
    </SessionProvider>
  );
}

export default MyApp;
