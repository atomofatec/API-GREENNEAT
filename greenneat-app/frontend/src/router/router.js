import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../views/login';
import Register from '../views/register';
import DashboardGreenneat from '../views/dashboardGreenneat';
import DashboardPartner from '../views/dashboardPartner';
import TransactionsGreenneat from '../views/transactionsGreenneat';
import WalletPartner from '../views/walletPartner';
import WalletSupplier from '../views/walletSupplier';
import NewTransactionGreenneat from '../views/novaTransacaoGreenneat';
import UsersGreenneat from '../views/usersGreenneat';
import RequestSupplier from '../views/requestSupplier';
import ComparatorGreenneat from '../views/comparatorGreenneat';
import RequestPartner from '../views/requestsViewPartner';
import MyProfileGreenneat from '../views/myProfileGreenneat';
import MyProfilePartner from '../views/myProfilePartner';
import MyProfileSupplier from '../views/myProfileSupplier';
import OilTransactionPartner from '../views/oilTransactionPartner';
import EditUser from '../views/editUser';
import HistGreenneat from '../views/histGreenneat';
import ForgotPassword from '../views/forgotPassword';

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
            <Route path='/nova-transacao-Greenneat' element={<NewTransactionGreenneat />}/>
            <Route path='/usuarios-Greenneat' element={<UsersGreenneat />}/>
            <Route path='/solicitar-estabelecimento' element={<RequestSupplier />}/>
            <Route path='/comparador-Greenneat' element={<ComparatorGreenneat />}/>
            <Route path='/solicitacoes-coleta-cooperativo' element={<RequestPartner />}/>
            <Route path='/meu-perfil-Greenneat' element={<MyProfileGreenneat />}/>
            <Route path='/meu-perfil-cooperativo' element={<MyProfilePartner />}/>
            <Route path='/meu-perfil-estabelecimento' element={<MyProfileSupplier />}/>
            <Route path='/transacao-oleo' element={<OilTransactionPartner />}/>
            <Route path='/editar-usuario' element={<EditUser />}/>
            <Route path='/historico-movimentacao' element={<HistGreenneat />}/>
            <Route path='/esqueci-senha' element={<ForgotPassword />}/>
        </Routes>
        </BrowserRouter>
    )
}
export default Router;