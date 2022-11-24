import { AppDataSource } from "../"
import { Request, Response } from "express"
import { Users } from "../entity/Users"

export const login = async (req: Request, res: Response) => {

    const { username, password } = req.body;
    const users = await AppDataSource.getRepository(Users).findOneBy({ username, password });
    return res.json(!!users)
}