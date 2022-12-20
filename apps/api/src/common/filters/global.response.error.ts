import { IResponseArguments, IResponseError } from './response.error.interface'

export const GlobalResponseError: (args: IResponseArguments) => IResponseError = ({
    status,
    message,
    details,
    code,
    request,
}: IResponseArguments): IResponseError => {
    return {
        method: request.method,
        status,
        code,
        message,
        ...(details !== message && { details }),
    }
}
