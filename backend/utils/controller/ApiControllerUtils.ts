import { NextResponse } from "next/server";
import { HttpResponse, MetaData, MetaPagination } from "../../../types/HttpResponse";
import HttpResponseError from "../../../errors/HttpResponseError";
import LlmBackendFactory from "../../llmIntegration/LlmBackendFactory";
import { ErrorDefinitionEnum } from "../../../errors/ErrorDefinitions";
import EntityError from "../../../errors/EntityError";
import ServiceError from "../../../errors/ServiceError";
import { AuthenticationError } from "openai";
import { ValidationError } from "xml2js";

export default class ApiControllerUtils {
    public static buildSuccessResponse<T>(httpStatusCode: number, content: T, meta: MetaData = {}): NextResponse<HttpResponse<T>> {
        const res = this.buildApiResponseJson<T>({ message: 'success', response: content, meta: meta });

        return NextResponse.json(res, { status: httpStatusCode });
    }

    public static buildErrorResponse<T>(httpStatusCode: number, content: any, errorName: string): NextResponse<HttpResponse<T>> {
        const res = this.buildApiResponseJson<T>({ message: 'error', response: content, meta: { error: errorName } });

        return NextResponse.json(res, { status: httpStatusCode });
    }

    public static mapApplicationErrorToHttpResponseError(error: any): HttpResponseError {
        switch (error.constructor) {
            case LlmBackendFactory:
                return new HttpResponseError(502, error.name + ': Something went wrong in external LLM dependency. ' + error.message, ErrorDefinitionEnum.LlmIntegrationError);
            case EntityError:
                return new HttpResponseError(400, error.message, ErrorDefinitionEnum.EntityError);
            case ServiceError:
                return new HttpResponseError(500, error.message, ErrorDefinitionEnum.ServiceError);
            case AuthenticationError:
                return new HttpResponseError(401, error.message, ErrorDefinitionEnum.AuthenticationError);
            case ValidationError:
                return new HttpResponseError(400, error.message, ErrorDefinitionEnum.ValidationError);
            default:
                return new HttpResponseError(400, error.message);
        }
    }

    public static buildMappedErrorResponse<T>(error: any): NextResponse<HttpResponse<T>> {
        const errorResponse = ApiControllerUtils.mapApplicationErrorToHttpResponseError(error);
        return ApiControllerUtils.buildErrorResponse<T>(errorResponse.status, errorResponse.message, errorResponse.name);
    }

    private static buildApiResponseJson<T>(response: HttpResponse<T>): HttpResponse<T> {
        return {
            message: response.message,
            response: response.response,
            meta: response.meta,
        };
    }

    public static buildCreatedResponse<T>(object: T): NextResponse<HttpResponse<T>> {
        return ApiControllerUtils.buildSuccessResponse<T>(201, object);
    }

    public static buildPaginatedResponse<T>(objects: T, pagination: MetaPagination): NextResponse<HttpResponse<T>> {
        return ApiControllerUtils.buildSuccessResponse<T>(200, objects, pagination);
    }

    public static buildSingleResponse<T>(object: T): NextResponse<HttpResponse<T>> {
        return ApiControllerUtils.buildSuccessResponse<T>(200, object);
    }

    public static buildUpdateResponse<T>(object: T): NextResponse<HttpResponse<T>> {
        return ApiControllerUtils.buildSuccessResponse<T>(200, object);
    }

    public static buildDeleteResponse(): NextResponse {
        return new NextResponse(null, { status: 204 });
    }
}