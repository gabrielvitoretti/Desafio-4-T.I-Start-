import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";
export const ListarCompra = () => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getCompra = async () => {
        await axios.get(api + "/listacompras")
            .then((response) => {
                console.log(response.data.compra);
                setData(response.data.compra);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log("Erro: sem conexão com a API.")
            })
    }
    const apagarCompra = async (idCompra) => {
        console.log(idCompra);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluircompra/" + idCompra, 
        { headers })
            .then((response) => {
                console.log(response.data.error);
                getCompra();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conetar-se a API.'
                });
            });
    }
    useEffect(() => {
        getCompra();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações da compra</h1>
                    </div>
                </div>
                <div className="m-auto p-2">
                    <Link to="/cadastrarcompra" className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data da compra</th>
                            <th>Cliente ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.dataCompra}</td>
                                <td>{item.ClienteId}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-compra/" + item.id} className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={()=> apagarCompra(compra.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};