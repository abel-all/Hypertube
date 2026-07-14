import { IsEmail, IsEmpty, Length } from 'class-validator';

export class CreateUserDto {
    @Length(4, 12, {
        message: (args) => `${args.property} must be between ${args.constraints[0]} and ${args.constraints[1]} characters. You provided ${args.value.length}.`
    })
    username!: string;

    @IsEmail({}, { message: 'Please provide a valid email address.' })
    email!: string;

    @Length(2, 6, {
        message: (args) => `${args.property} must be between ${args.constraints[0]} and ${args.constraints[1]} characters. You provided ${args.value.length}.`
    })
    firstName!: string;

    @Length(2, 6, {
        message: (args) => `${args.property} must be between ${args.constraints[0]} and ${args.constraints[1]} characters. You provided ${args.value.length}.`
    })
    lastName!: string;

    @Length(8, 12, {
        message: (args) => `${args.property} must be between ${args.constraints[0]} and ${args.constraints[1]} characters. You provided ${args.value.length}.`
    })
    password!: string;
}
