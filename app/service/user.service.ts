import { ErrorResponse, SuccessResponse } from "../utility/response";
import { UserRepository } from "../repository/user.repository";
import { SignupInput } from "../models/dto/signup-input.dto";
import { AppValidationError } from "../utility/errors";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { plainToClass } from "class-transformer";
import { autoInjectable } from "tsyringe";
import { UserType } from "../models/enums/user-type.enum";
import { getHashedPassword, getSalt } from "../utility/password";

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
        try {
            /**
             * Dado que usamos middy en el handler, con el middleware de
             * jsonBodyParser, este middleware ya parsea la solicitud, por
             * lo que no es necesario usar el JSON.parse, ya que el body
             * ahora vendrá parseado por defecto
             */
            // const body = event.body;
            /**
             * plainToClass convierte texto plano(objeto) a una clase la
             * cual es pasada como parámetro
             */
            const signupInput = plainToClass(SignupInput, event.body);

            /**
             * Esta es la forma en la que ejecutamos las validaciones
             * de class-validator y class-transformer, esto ocurre
             * con lo que definimos en nuestra función AppValidationError
             */
            const error = await AppValidationError(signupInput);
            if (error) return ErrorResponse({code: 404, error });

            const salt = await getSalt();
            const hashedPassword = await getHashedPassword(signupInput.password, salt);
            const data = await this.userRepository.createAccount({
                email: signupInput.email,
                password: hashedPassword,
                phone: signupInput.phone,
                userType: UserType.BUYER,
                salt: salt,
            });

            return SuccessResponse(data);
        } catch (error) {
            console.error(error);
            return ErrorResponse({ code: 500, error });
        }
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