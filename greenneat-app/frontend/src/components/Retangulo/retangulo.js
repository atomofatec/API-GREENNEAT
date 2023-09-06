import Style from './Retangulo.module.css'
import Logo from '../../images/logo_greenneat.png'
import { Button } from '@mui/material';

function Retangulo() {
    return (
        <body>
            <div className={Style.retangulo}></div>
            <div className={Style.logo_container}>
                <img src={Logo} alt='logo' />
            </div>
            <div className={Style.text_container}>
                <p className={Style.text} style={{ marginLeft: '15%' }}>
                    Seja Bem-Vindo(a)!
                </p>
                <p className={Style.text} style={{ marginTop: -25 }}>
                    Como deseja se cadastrar?
                </p>
            </div>
            <hr className={Style.diviser}></hr>
            <div className={Style.button_container}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2, backgroundColor: '#136935', border: '3px solid #F3EEBF', width: 250}}
              >
                Cooperativo
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2, backgroundColor: '#136935', border: '3px solid #F3EEBF', width: 250}}
              >
                Estabelecimento
              </Button>
            </div>
            <div className={Style.logar}>
                Já possui uma conta?
            </div>
        </body>
    )
}

export default Retangulo;