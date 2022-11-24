import { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import './index.css';
import api from '../../../services/api';
import moment from 'moment';

const Detail = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [task, setTask] = useState()

    const findTask = async () => {
        const response = await api.get(`/tasks/${id}`)
        console.log(response)
        setTask(response.data)
    }
    useEffect(() => {
        findTask()
    }, [id])

    return (
        <div className="container">
            <br />
            <div className="task-header">
                <h1>Detalhes da Tarefa</h1>
                <Button variant="dark" size="sm" onClick={() => navigate(-1)}>Voltar</Button>
            </div>
            <br />
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{task?.title}</Card.Title>

                    <Card.Text>
                        {task?.description}
                        <br />
                        {task?.finished ? "Finalizado" : "Pendente"}
                        <br />
                        <strong>Data de Cadastro: </strong>
                        {moment(task?.created_at).format('DD/MM/YYYY')}
                        <br />
                        <strong>Data de Atualização: </strong>
                        {moment(task?.updated_at).format('DD/MM/YYYY')}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Detail;