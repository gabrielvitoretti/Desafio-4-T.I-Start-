import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './views/Home';
import { ListarClientes } from './views/Cliente/ListarClientes';
import { CadastrarCliente } from './views/Cliente/CadastrarCli';
import { ListarPedidos } from './views/Pedido/ListarPedidos';
import { CadastrarPedidos } from './views/Pedido/CadastrarPedi';
import { Item } from './views/Servico/Item';
import { ListarServicos } from './views/Servico/ListarServicos';
import { CadastrarServ } from './views/Servico/CadastrarServ';
import { Menu } from './components/Menu';
import { ListarCompra } from './views/Compra/ListarCompra';
import { CadastrarCompra } from './views/Compra/CadastrarCompra';
import { CadastrarProduto } from './views/Produtos/CadastrarProdutos';
import { ListarProduto} from './views/Produtos/ListaProdutos';
import { ListarItem } from './views/Item/ListaItem';
import { CadastrarItem } from './views/Item/CadastrarItem';
function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/listar-cliente" element={<ListarClientes />} />
          <Route path="/cadastrarcliente" element={<CadastrarCliente/>}/>
          <Route path="/listar-pedido" element={<ListarPedidos />} />
          <Route path="/cadastrarpedido" element={<CadastrarPedidos/>}/>
          <Route path="listar-item" element={<Item/>}/>
          <Route path="/listar-servico" element={<ListarServicos />} />
          <Route path="/cadastrarservico" element={<CadastrarServ />} />
          <Route path="/listar-compra" element={<ListarCompra/>}/>
          <Route path="/cadastrarcompra" element={<CadastrarCompra/>}/>
          <Route paht="/cadastrarproduto" element={<CadastrarProduto/>}/>
          <Route path="/listar-produto" element={<ListarProduto/>}/>
          <Route path="/listar-itemcompra" element={<ListarItem/>}/>
          <Route path="/cadastraritenscompra" element={<CadastrarItem/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
