import { Injectable } from "@angular/core";
import { ApiError } from "./api-error";

@Injectable({
    providedIn: 'root'
})
export class TypeCheck {
    isApiError(value: ApiError | any ): value is ApiError {
        return typeof value['message'] === 'string' 
    }
}
