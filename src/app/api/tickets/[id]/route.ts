import { HttpResponse } from '../../../../../types/HttpResponse'
import TicketService from '../../../../../backend/services/TicketService'
import { PersistentIssue } from '../../../../../types/Models'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { Issue } from '../../../../../types/Issue'
import ApiControllerUtils from '../../../../../backend/utils/controller/ApiControllerUtils'
import HttpResponseError from '../../../../../errors/HttpResponseError'
import EntityError from '../../../../../errors/EntityError'
import { ValidationError } from 'xml2js'

const ticketService = new TicketService()

export async function GET(request: Request, { params }: { params: { id: string } }): Promise<NextResponse<HttpResponse<PersistentIssue>>> {
    try {
        const { id } = params

        if (!id) {
            throw new ValidationError('id is required')
        }

        const response = await ticketService.retrieveSingle(id)
        return ApiControllerUtils.buildSingleResponse<PersistentIssue>(response)
    } catch (error: any) {
        return ApiControllerUtils.buildMappedErrorResponse(error)
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<HttpResponse<PersistentIssue>>> {
    try {
        const { id } = params
        const ticket: Issue = await request.json()

        if (!id) {
            throw new ValidationError('id is required')
        }
        const response = await ticketService.update(id, ticket)
        return ApiControllerUtils.buildUpdateResponse<PersistentIssue>(response)
    } catch (error: any) {
        return ApiControllerUtils.buildMappedErrorResponse(error)
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    try {
        const { id } = params

        if (!id) {
            throw new ValidationError('id is required')
        }
        const response = await ticketService.delete(id)
        return ApiControllerUtils.buildDeleteResponse()
    } catch (error: any) {
        return ApiControllerUtils.buildMappedErrorResponse(error)
    }
}