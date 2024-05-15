import { UserRepository } from "../repository/user.repository";
import { SuccessResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { autoInjectable } from "tsyringe";

/**
 * Para poder inyectar la dependencia en el container es necesario
 * marcarla con el decorador @autoInjectable igualmente proporcionado
 * por 'tsyringe'
 */
@autoInjectable()
export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(event: APIGatewayProxyEventV2) {
        /**
         * Dado que usamos middy en el handler, con el middleware de
         * jsonBodyParser, este middleware ya parsea la solicitud, por
         * lo que no es necesario usar el JSON.parse, ya que el body
         * ahora vendra parseado por defecto
         */
        const body = event.body;
        console.log(body);

        await this.userRepository.createUserOperation();

        return SuccessResponse({ message: 'response from createUser' });
    }

    async loginUser(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: 'response from loginUser' });
    }

    async verifyUser(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: 'response from verifyUser' });
    }

    //* User profile section
    async createProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: 'response from createProfile' });
    }

    async getProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: 'response form getProfile' });
    }

    async updateProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: 'response from editProfile' });
    }

    //* Cart section
    async createCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: 'response from createCart' });
    }

    async getCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: 'response from getCart' });
    }

    async updateCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: 'response from updateCart' });
    }

    //* Payment section
    async createPaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: 'response from createPaymentMethod' });
    }

    async getPaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: 'response from getPaymentMethod' });
    }

    async updatePaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: 'response from updatePaymenthMethod' });
    }
}