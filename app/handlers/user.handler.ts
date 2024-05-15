/**
 * Basicamente el handler, tomaria la funcion de un controlador, el cual
 * recibe la peticion y la redirecciona a la funcion de servicio correspondiente
 * la cual contiene la logica de negocio para procesar la peticion
 */
import { container } from "tsyringe";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserService } from "../service/user.service";
import { ErrorResponse } from "../utility/response";
import jsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";

/**
 * De esta forma es como podemos usar la inyeccion de dependencias usando
 * el container de tsyringe. Ya que ahora le pasamos nuestras dependencias
 * a su container para que estas este centralizadas
 */
// const userService = new UserService();
const userService = container.resolve(UserService);

/**
 * * Asi es como podemos acceder al body de una solicitud POST, si
 * deseamos manipularlo hay que usar JSON.parse para descerializarlo
 * y convertirlo a un objeto manipulable con TypeScript:
 * const body = JSON.parse(event.body);
 * console.log(body.email);
 * console.log(body.password);
 * 
 * Pero una mejor forma de hacer esto es usar el modulo de Middy.js
 * el cual proporciona varios middlewares para hacer estas tareas.
 * 
 * Esta es la forma en la que se usa middy, basicamente se le pasa
 * el manejador como parametro y a traves de .use definimos que
 * middlewares van a ejecutarse previos al manejador.
 * 
 * Como puedes ver al 'async' ya no se usa con middy
 */
export const Signup = middy((event: APIGatewayProxyEventV2) => {
    return userService.createUser(event);
}).use(jsonBodyParser());

export const Login = async(event: APIGatewayProxyEventV2) => {
    return userService.loginUser(event);
};

export const Verify = async(event: APIGatewayProxyEventV2) => {
    return userService.verifyUser(event);
};

export const Profile = async(event: APIGatewayProxyEventV2) => {
    /**
     * Dado que en el archivo .yml definimos que algunos metodos
     * pueden ser llamados con diferentes metodos HTTP, debemos
     * identificar cual de esos metodos esta siendo utilizado en
     * la peticion para asi poder redireccionarlo a su metodo
     * de servicio correspondiente
     */
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === 'post') {
        return userService.createProfile(event);
    } else if (httpMethod === 'put') {
        return userService.updateProfile(event);
    } else if (httpMethod === 'get') {
        return userService.getProfile(event);
    } else {
        return ErrorResponse({
            code: 404,
            error: 'requested method nos suported!'
        });
    }
};

export const Cart = async(event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === 'post') {
        return userService.createCart(event);
    } else if (httpMethod === 'put') {
        return userService.updateCart(event);
    } else if (httpMethod === 'get') {
        return userService.getCart(event);
    } else {
        return ErrorResponse({
            code: 404,
            error: 'requested method nos suported!'
        });
    }
};

export const Payment = async(event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === 'post') {
        return userService.createPaymentMethod(event);
    } else if (httpMethod === 'put') {
        return userService.updatePaymentMethod(event);
    } else if (httpMethod === 'get') {
        return userService.getPaymentMethod(event);
    } else {
        return ErrorResponse({
            code: 404,
            error: 'requested method nos suported!'
        });
    }
};