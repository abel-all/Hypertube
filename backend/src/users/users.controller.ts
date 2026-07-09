import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Get("create")
    async createUser() {
        const username = "testuser";
        const email = "hello@world.com";
        return this.usersService.createUser(username, email);
    }
}