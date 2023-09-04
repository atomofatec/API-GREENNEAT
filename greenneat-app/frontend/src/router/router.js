import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../../../src/views/login';
import Cadastros from '../../../src/views/cadastros';
import DashboardGreenneat from '../../../src/views/dashboardGreenneat';
import TransacoesGreenneat from '../../../src/views/transacoesGreenneat';
import CarteiraCooperativo from '../../../src/views/carteiraCooperativo';
import CarteiraEstabelecimento from '../../../src/views/carteiraEstabelecimento';
import DashboardCooperativo from '../../../src/views/dashboardCooperativo';

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