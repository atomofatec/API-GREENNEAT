import Style from './Triangle.module.css'
import Logo from '../../images/logo.png'

function Triangle() {
    return (
        <body>
            <div className={Style.triangulo}></div>
            <div className={Style.logo_container}>
                <img src={Logo} alt='logo' />
            </div>
        </body>
    )
}

export default Triangle;