import { Length } from 'class-validator';

export class SignInDto {
  @Length(4, 12, {
    message: (args) => `${args.property} must be between ${args.constraints[0]} and ${args.constraints[1]} characters. You provided ${args.value.length}.`
  })
  username!: string;

  @Length(8, 12, {
    message: (args) => `${args.property} must be between ${args.constraints[0]} and ${args.constraints[1]} characters. You provided ${args.value.length}.`
  })
  password!: string;
}
