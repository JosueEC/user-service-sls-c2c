const formatResponse = (
        { statusCode, message, data }: 
        { statusCode: number, message: string, data?: unknown | undefined }
    ) => {
    if (data) {
        return {
            statusCode,
            headers: {
                'Access-Control-Allow-Oirign': '*',
            },
            body: JSON.stringify({
                message,
                data,
            }),
        };
    } else {
        return {
            statusCode,
            headers: {
                'Access-Control-Allow-Oirign': '*',
            },
            body: JSON.stringify({
                message,
            }),
        };
    }
};

export const SuccessResponse = (data: object) => {
    return formatResponse({ statusCode: 200, message: 'success', data });
};

export const ErrorResponse = (code = 1000, error: unknown) => {
    if (Array.isArray(error)) {
        const errorObject = error[0].constraints;
        const errorMessage = errorObject[Object.keys(errorObject)[0]] || 'Error Ocurred';
        return formatResponse({ statusCode: code, message: errorMessage, data: errorMessage });
    }

    return formatResponse({ statusCode: code, message: `${error}`, data: error });
};