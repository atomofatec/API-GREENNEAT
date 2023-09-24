import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../views/login';
import Register from '../views/register';
import DashboardGreenneat from '../views/dashboardGreenneat';
import DashboardPartner from '../views/dashboardPartner';
import TransactionsGreenneat from '../views/transactionsGreenneat';
import WalletPartner from '../views/walletPartner';
import WalletSupplier from '../views/walletSupplier';
import NovaTransacaoGreenneat from '../views/novaTransacaoGreenneat';

function Router() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/cadastro' element={<Register />}/>
            <Route path='/dashboard-greenneat' element={<DashboardGreenneat />}/>
            <Route path='/dashboard-cooperativo' element={<DashboardPartner />}/>
            <Route path='/transacoes-greenneat' element={<TransactionsGreenneat />}/>
            <Route path='/carteira-cooperativo' element={<WalletPartner />}/>
            <Route path='/carteira-estabelecimento' element={<WalletSupplier />}/>
            <Route path='/nova-transacao-greenneat' element={<NovaTransacaoGreenneat />}/>
        </Routes>
        </BrowserRouter>
    )
}
export default Router;