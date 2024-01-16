import type { NextApiRequest, NextApiResponse } from 'next'
import { HttpResponse } from '../../../../types/HttpResponse'
import { User } from '../../../../types/User'
import TicketService from '../../../../backend/services/TicketService'
import { PersistentUser } from '../../../../types/Models'
import UserService from '../../../../backend/services/UserService'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<HttpResponse<PersistentUser | boolean>>
) {

    try {

        const userService = new UserService()
        const { id } = req.query
        //switch based on req.method
        let response;

        switch (req.method) {
            case "GET":
                response = await userService.retrieveSingle(id as string);
                res.status(200).json({ response: response });
                break;
            case "PUT":
                const user: User = req.body;
                response = await userService.update(id as string, user);
                res.status(201).json({ response: response });
                break;
            case "DELETE":
                response = await userService.delete(id as string)
                res.status(204).json({ response: response })
                break;
            default:
                res.status(405).json({ response: "Method not allowed" });
                break;
        }

    } catch (error: any) {
        res.status(500).json({ response: "Error within Users: " + error.message })
    }
}