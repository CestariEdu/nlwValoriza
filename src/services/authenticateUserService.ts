import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest {
    email: string;
    password: string;
}


class AuthenticateUserService {

    async execute( { email, password }: IAuthenticateRequest) {

        const usersRepositories = getCustomRepository(UsersRepositories);


        // Validating E-mail has exists
        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error('E-mail or Password incorrect')
        }

        // Validation Password is correct
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('E-mail or Password incorrect')
        }

        // Generate token
        const token = sign(
            {
                email: user.email,
            }, 'ef753fc427fe328527bb97d9808bfde6', {
                subject: user.id,
                expiresIn: '1d'
            }
        )

        return {
            token: token
        }

    };

};

export { AuthenticateUserService };
