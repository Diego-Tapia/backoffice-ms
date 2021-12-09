import { HttpException, HttpStatus } from "@nestjs/common";
import { AxiosError } from "axios";

export class AxiosException extends HttpException {

    constructor(error: AxiosError){
        if (error.response) super(error.message, error.response.status)
        else if (error.request) super(error.message, HttpStatus.SERVICE_UNAVAILABLE)
        else super(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}