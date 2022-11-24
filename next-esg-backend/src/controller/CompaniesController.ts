import { AppDataSource } from "../"
import { Request, Response } from "express"
import { Companies } from "../entity/Companies"

export const getCompanies = async (req: Request, res: Response) => {
    const companies = await AppDataSource.getRepository(Companies).find()
    return res.json(companies)
}

export const getCompany = async (req, res) => {
    const { id } = req.params
    const company = await AppDataSource.getRepository(Companies).findOneBy({ id })
    return res.json(company)
}

export const saveCompany = async (req, res, next) => {
    try {
        const { name } = req.body;
        const companyExists = await AppDataSource.getRepository(Companies).findOneBy({ name })
        if (companyExists)
            throw new Error("Já existe uma empresa cadastrada com esse nome")

        const company = await AppDataSource.getRepository(Companies).save(req.body)
        return res.json(company)
    }
    catch (err) {
        next(err)
    }
}

export const updateCompany = async (req, res, next) => {
    try {
        const { id, name } = req.params
        const companyAlreadyExists = await AppDataSource.getRepository(Companies).findOneBy({ name })
        if (companyAlreadyExists)
            throw new Error("Já existe uma empresa com esse nome")

        const company = await AppDataSource.createQueryBuilder()
            .update(Companies)
            .set(req.body)
            .where("id = :id", { id })
            .execute()
        if (company.affected == 1) {
            const companyUpdated = await AppDataSource.getRepository(Companies).findOneBy({ id })
            return res.json(companyUpdated);
        }
        else {
            return res.status(404).json({ message: "Empresa não encontrada!" })
        }
    }
    catch (err) {
        next(err)
    }
}