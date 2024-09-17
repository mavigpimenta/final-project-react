import Navbar from "../Navbar";
import { ScrollRestoration } from "react-router-dom";

const PageEnveloper = ({ children }: { children: string }) => {
    return (
        <>
            <ScrollRestoration />
            <Navbar />
            {children}
        </>
    )
}

export default PageEnveloper;