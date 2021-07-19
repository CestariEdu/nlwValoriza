import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    // Receber o Token
    const authToken = request.headers.authorization;

    // Validar se o token está preenchido
    if (!authToken) {
        return response.status(401).json({
            error: 'Unauthorized'
        });
    };

    const [,token] = authToken.split(' ');

    try {
        // Validar se o token é valido
        const { sub } = verify(token, 'ef753fc427fe328527bb97d9808bfde6') as IPayload;

        // Recuperar informações do usuário
        request.user_id = sub;

        return next();
    } catch {
        return response.status(401).json({
            error: 'Unauthorized'
        });
    }

    return next();
}
