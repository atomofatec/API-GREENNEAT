import Style from './Retangulo.module.css'
import Logo from '../../images/logo_greenneat.png'
import { Divider } from '@mui/material';

function Retangulo() {
    return (
        <body>
            <div className={Style.retangulo}></div>
            <div className={Style.logo_container}>
                <img src={Logo} alt='logo' />
            </div>
            <div className={Style.text_container}>
                <p className={Style.text} style={{marginLeft: '15%'}}>
                    Seja bem-vindo(a)!
                </p>
                <p className={Style.text} style={{marginTop: -25}}>
                    Como deseja se cadastrar?
                </p>
            </div>
                <hr className={Style.diviser}></hr>
        </body>
    )
}

export default Retangulo;