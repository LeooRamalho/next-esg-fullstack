import { AppDataSource } from "../"
import { Request, Response } from "express"
import { Users } from "../entity/Users"

export const getUsers = async (req: Request, res: Response) => {
    const users = await AppDataSource.getRepository(Users).find()
    return res.json(users)
}

export const getUser = async (req, res) => {
    const { id } = req.params
    const user = await AppDataSource.getRepository(Users).findOneBy({ id })
    return res.json(user)
}

export const saveUser = async (req, res, next) => {
    try {
        const { username } = req.body;
        const userExists = await AppDataSource.getRepository(Users).findOneBy({ username })
        if (userExists)
            throw new Error("Já existe um usuário cadastrado com esse username")

        const user = await AppDataSource.getRepository(Users).save(req.body)
        return res.json(user)
    }
    catch (err) {
        next(err)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const { username, firstName, lastName, password } = req.body

        const userToUpdate = await AppDataSource.getRepository(Users).findOneBy({ id })

        const userAlreadyExists = await AppDataSource.getRepository(Users).findOneBy({ username })

        if (userAlreadyExists)
            throw new Error("Já existe um usuario com esse username")

        if (username && username != userToUpdate.username)
            userToUpdate.username = username
        if (firstName && firstName != userToUpdate.firstName)
            userToUpdate.firstName = firstName
        if (lastName && lastName != userToUpdate.lastName)
            userToUpdate.lastName = lastName
        if (password && password != userToUpdate.password)
            userToUpdate.password = password

        const user = await AppDataSource.createQueryBuilder()
            .update(Users)
            .set(userToUpdate)
            .where("id = :id", { id })
            .execute()
        if (user.affected == 1) {
            const userUpdated = await AppDataSource.getRepository(Users).findOneBy({ id })
            return res.json(userUpdated);
        }
        else {
            return res.status(404).json({ message: "Usuário não encontrada!" })
        }
    }
    catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await AppDataSource.createQueryBuilder()
        .delete()
        .from(Users)
        .where("id = :id", { id })
        .execute()

    if (user.affected == 1) {
        return res.status(200).json({ message: "Usuário excluído com sucesso!" });
    }
    else {
        return res.status(404).json({ message: "Usuário não encontrado!" })
    }
}