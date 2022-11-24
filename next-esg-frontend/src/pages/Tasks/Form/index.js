import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api';
import './index.css';

const Tasks = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [model, setModel] = useState({
        title: '',
        description: ''
    })

    useEffect(() => {
        if (id)
            findTask(id)
    }, [id])

    const updatedModel = (e) => {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (id)
            await api.put(`/tasks/${id}`, model)
        else
            await api.post('/tasks', model)

        navigate(-1)
    }

    const findTask = async (id) => {
        const response = await api.get(`tasks/${id}`)
        console.log(response)
        setModel({
            title: response.data.title,
            description: response.data.description
        })
    }

    return (

        <div className="container">
            <br />
            <div className="task-header">
                <h1>Nova Tarefa</h1>
                <Button variant="dark" size="sm" onClick={() => navigate(-1)}>Voltar</Button>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={model.title}
                            onChange={(e) => updatedModel(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={model.description}
                            onChange={(e) => updatedModel(e)} />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>
        </div>
    );
}
export default Tasks;