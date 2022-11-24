import { getUser, getUsers, saveUser, updateUser, deleteUser } from "./controller/UserController"
import { getCompany, getCompanies, saveCompany, updateCompany } from "./controller/CompaniesController"

import { Router } from 'express'
import { login } from "./controller/LoginController"
const routes = Router()

//LOGIN
routes.post("/login", login)

//USER ROUTES
routes.get('/users', getUsers)
routes.get('/users/:id', getUser)
routes.post('/users', saveUser)
routes.put('/users/:id', updateUser)
routes.delete('/users/:id', deleteUser)

//COMPANY ROUTES
routes.get('/companies', getCompanies)
routes.get('/companies/:id', getCompany)
routes.post('/companies', saveCompany)
routes.put('/companies/:id', updateCompany)

export default routes