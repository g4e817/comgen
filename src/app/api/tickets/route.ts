import { HttpResponse } from '../../../../types/HttpResponse'
import TicketService from '../../../../backend/services/TicketService'
import { PersistentIssue } from '../../../../types/Models'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { Issue } from '../../../../types/Issue'
import ApiControllerUtils from '../../../../backend/utils/controller/ApiControllerUtils'
import EntityError from '../../../../errors/EntityError'

const ticketService = new TicketService()

export async function GET(request: NextRequest): Promise<NextResponse<HttpResponse<PersistentIssue[]>>> {
    try {
        const response = await ticketService.retrieveAll()
        return ApiControllerUtils.buildSuccessResponse<PersistentIssue[]>(200, response)
    } catch (error: any) {
        return ApiControllerUtils.buildMappedErrorResponse(error)
    }
}

export async function POST(request: NextRequest): Promise<NextResponse<HttpResponse<PersistentIssue>>> {
    try {
        const user: Issue = await request.json()
        const response = await ticketService.create(user)
        return ApiControllerUtils.buildSuccessResponse<PersistentIssue>(201, response)
    } catch (error: any) {
        return ApiControllerUtils.buildMappedErrorResponse(error)
    }
}

export async function PUT(request: NextRequest): Promise<NextResponse<HttpResponse<PersistentIssue | string>>> {
    try {
        throw new EntityError('Not implemented')
    } catch (error: any) {
        return ApiControllerUtils.buildMappedErrorResponse(error)
    }
}

export async function DELETE(request: NextRequest): Promise<NextResponse<HttpResponse<PersistentIssue | string>>> {
    try {
        throw new EntityError('Not implemented')
    } catch (error: any) {
        return ApiControllerUtils.buildMappedErrorResponse(error)
    }
}