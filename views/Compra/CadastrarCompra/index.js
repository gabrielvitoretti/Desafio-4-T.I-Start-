import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const CadastrarCompra = () => {

    const [compra, setCompra] = useState({
        id: '',
        dataCompra: '',
        ClienteId: ''
    });

    const[status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCompra({
        ...compra, [e.target.name]: e.target.value
    });
    const cadCompra = async e => {
        e.preventDefault();
        console.log(compra);

        const headers = {
            'Content-Type': 'application/json'
        }
        await axios.post(api + "/compras", compra, { headers })
            .then((response) => {
                //console.log(response.data.message);
                if(response.data.console.error){
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else{
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });
                }
            })
            .catch(()=>{
                console.log("Erro: Sem conexão com a API.")
            })
    }

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar nova compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-compra" className="btn btn-outline-success btn-sm">Compra</Link>
                </div>

            </div>
            <hr className="m-1" />
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
            <Form className="p-2" onSubmit={cadCompra}>
                <FormGroup className="p-2">
                    <Label >ID</Label>
                    <Input type="text" name="id" placeholder="ID da compra" onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label >Data</Label>
                    <Input type="text" name="dataCompra" placeholder="Data da compra" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label >Cliente Id</Label>
                    <Input type="text" name="ClienteId" placeholder="ID do cliente" onChange={valorInput} />
                </FormGroup>
                <Button type="submit" outline color="success">Inserir</Button>
            </Form>
        </Container>

    );
};