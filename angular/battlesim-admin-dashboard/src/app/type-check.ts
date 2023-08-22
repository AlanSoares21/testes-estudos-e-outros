import { ApiError } from "./api-error";

export function isApiError(value: ApiError | any )
: value is ApiError {
    return typeof value['message'] === 'string' 
}
