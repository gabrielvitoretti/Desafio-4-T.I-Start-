import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";
export const ListarPedidos = () => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getPedidos = async () => {
        await axios.get(api + "/todospedidos")
            .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log("Erro: sem conexão com a API.")
            })
    }
    const apagarPedido = async (idPedido) => {
        console.log(idPedido);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluirpedido/" + idPedido, 
        { headers })
            .then((response) => {
                console.log(response.data.error);
                getPedidos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }
    useEffect(() => {
        getPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações do pedido</h1>
                    </div>
                </div>
                <div className="m-auto p-2">
                    <Link to="/cadastrarpedido" className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>ClienteID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.data}</td>
                                <td>{item.ClienteId}</td>
                                
                                <td className="text-center/">
                                    <Link to={"/listar-pedido/" + item.id} className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={()=> apagarPedido(pedido.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};