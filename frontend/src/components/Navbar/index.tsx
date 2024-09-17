import { Background, Image } from "./styled.module";
import Logo from "/BoschLogo.png";

const Navbar = () => {
    return (
        <Background>
            <Image src={Logo} />
        </Background>
    )
}

export default Navbar;