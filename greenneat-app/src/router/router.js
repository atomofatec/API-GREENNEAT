import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../views/login';
import Cadastros from '../views/cadastros';
import DashboardGreenneat from '../views/dashboardGreenneat';
import TransacoesGreenneat from '../views/transacoesGreenneat';
import CarteiraCooperativo from '../views/carteiraCooperativo';
import CarteiraEstabelecimento from '../views/carteiraEstabelecimento';
import DashboardCooperativo from '../views/dashboardCooperativo';

function Router() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/cadastro' element={<Cadastros />}/>
            <Route path='/dashboard-greenneat' element={<DashboardGreenneat />}/>
            <Route path='/dashboard-cooperativo' element={<DashboardCooperativo />}/>
            <Route path='/transacoes-greenneat' element={<TransacoesGreenneat />}/>
            <Route path='/carteira-cooperativo' element={<CarteiraCooperativo />}/>
            <Route path='/carteira-estabelecimento' element={<CarteiraEstabelecimento />}/>
        </Routes>
        </BrowserRouter>
    )
}
export default Router;