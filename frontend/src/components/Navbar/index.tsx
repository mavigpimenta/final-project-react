import { NavbarContainer, Image, DarkModeButton, NavbarContent, DarkModeImage } from "./styled.module";
import { useEffect, useState } from "react";
import LogoImage from "/Logo.svg";
import Sun from "/Sun.svg"
import Moon from "/Moon.svg"

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('dark-mode');
        return savedMode === 'true';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <NavbarContainer>
            <NavbarContent>
                <Image src={LogoImage} />
                <DarkModeButton onClick={toggleDarkMode}>
                    <DarkModeImage src={isDarkMode ? Moon : Sun} style={{ filter: isDarkMode ? 'invert(80%) sepia(20%) hue-rotate(190deg)' : 'none' }}/>
                </DarkModeButton>
            </NavbarContent>
        </NavbarContainer>
    )
}

export default Navbar;