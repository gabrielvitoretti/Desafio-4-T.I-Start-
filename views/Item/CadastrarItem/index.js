import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const CadastrarItem = () => {

    const [item, setItem] = useState({
        ProdutoId: '',
        CompraId: '',
        descricao: '',
        valor: ''
    });

    const[status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItem({
        ...item, [e.target.name]: e.target.value
    });
    const cadItem = async e => {
        e.preventDefault();
        console.log(item);

        const headers = {
            'Content-Type': 'application/json'
        }
        await axios.post(api + "/itenscompra", item, { headers })
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
                    <h1>Cadastrar novo item</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-itenscompra" className="btn btn-outline-success btn-sm">Compra</Link>
                </div>

            </div>
            <hr className="m-1" />
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
            <Form className="p-2" onSubmit={cadItem}>
                <FormGroup className="p-2">
                    <Label >ProdutoID</Label>
                    <Input type="text" name="produtoid" placeholder="ID do produto" onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label >CompraId</Label>
                    <Input type="text" name="compraid" placeholder="Id da compra" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label >descricao</Label>
                    <Input type="text" name="descricao" placeholder="Descrição do item" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label >valor</Label>
                    <Input type="text" name="valor" placeholder="Valor do item" onChange={valorInput} />
                </FormGroup>
                <Button type="submit" outline color="success">Inserir</Button>
            </Form>
        </Container>

    );
};