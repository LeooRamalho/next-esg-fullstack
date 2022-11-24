import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { formatDate } from '../../utils';

const Tasks = () => {
    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        loadTasks()
    }, [])

    const loadTasks = async () => {
        const response = await api.get('/tasks')
        console.log(response);
        setTasks(response.data)
    }

    const newTask = () => { navigate('/tarefas_cadastro') }

    const editTask = (id) => { navigate(`/tarefas_cadastro/${id}`) }

    const viewTask = (id) => { navigate(`/tarefas/${id}`) }

    const finishTask = async (id) => {
        await api.patch(`/tasks/${id}`)
        loadTasks()
    }

    const deleteTask = async (id) => {
        await api.delete(`/tasks/${id}`)
        loadTasks()
    }

    return (
        <div className="container">
            <br />
            <div className="task-header">
                <h1>Tarefas</h1>
                <Button variant="dark" size="sm" onClick={newTask}>Nova Tarefa</Button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{formatDate(task.updated_at)}</td>
                                <td>{task.finished ? "Finalizado" : "Pendente"}</td>
                                <td>
                                    <Button size="sm" variant="primary" disabled={task.finished} onClick={() => editTask(task.id)}>Editar</Button>{' '}
                                    <Button size="sm" variant="success" disabled={task.finished} onClick={() => finishTask(task.id)}>Finalizar</Button>{' '}
                                    <Button size="sm" variant="warning" onClick={() => viewTask(task.id)}>Visualizar</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => deleteTask(task.id)}>Remover</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}
export default Tasks;