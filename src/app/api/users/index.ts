import type { NextApiRequest, NextApiResponse } from 'next'
import { HttpResponse } from '../../../../types/HttpResponse'
import UserService from '../../../../backend/services/UserService'
import { User } from '../../../../types/User'
import { PersistentUser } from '../../../../types/Models'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<HttpResponse<PersistentUser>>
) {

    try {

        const userService = new UserService()

        switch (req.method) {
            case "GET":
                const users = await userService.retrieveAll()
                res.status(200).json({ response: users })
                break;
            case "POST":
                const user: User = JSON.parse(req.body)
                const response = await userService.create(user)
                res.status(201).json({ response: response })
                break;
            default:
                res.status(405).json({ response: "Method not allowed" })
                break;
        }

    } catch (error: any) {
        res.status(500).json({ response: "Error within Users: " + error.message })
    }
}