import Navbar from "../Navbar";
import Footer from "../Footer";
import { ScrollRestoration } from "react-router-dom";

const PageEnveloper = ({ children }: { children: string }) => {
    return (
        <>
            <ScrollRestoration />
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default PageEnveloper;