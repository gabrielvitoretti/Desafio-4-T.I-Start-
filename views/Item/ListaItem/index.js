import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";
export const ListarItem = () => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getItensCompra = async () => {
        await axios.get(api + "/listaitenscompra")
            .then((response) => {
                console.log(response.data.itemcompra);
                setData(response.data.itemcompra);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log("Erro: sem conexão com a API.")
            })
    }
    const apagarItem = async (idItem) => {
        console.log(idItem);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluiritenscompra/" + idItem, 
        { headers })
            .then((response) => {
                console.log(response.data.error);
                getItensCompra();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }
    useEffect(() => {
        getItensCompra();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações do item</h1>
                    </div>
                </div>
                <div className="m-auto p-2">
                    <Link to="/cadastraritenscompra" className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ProdutoID</th>
                            <th>CompraID</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.ProdutoId}</td>
                                <td>{item.CompraId}</td>
                                
                                <td className="text-center/">
                                    <Link to={"/listar-itemcompra/" + item.id} className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={()=> apagarItem(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};