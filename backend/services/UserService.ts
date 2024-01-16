import { Issue } from "../../types/Issue";
import BaseService from "./BaseService";
import { User } from "../../types/User";
import UserRepository from "../repositories/UserRepository";
import { PersistentUser } from "../../types/Models";

class UserService extends BaseService {

    userRepository: UserRepository;

    constructor() {
        super();
        this.userRepository = new UserRepository();
    }

    public async create(user: User): Promise<PersistentUser> {
        try {
            return this.userRepository.create(user);
        } catch (error: any) {
            throw new Error("Error in UserService.create()" + error.message);
        }
    }

    public async retrieveSingle(userId: string): Promise<PersistentUser> {
        try {
            const user = this.userRepository.getOne(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user
        } catch (error: any) {
            throw new Error("Error in UserService.retrieveSingle()" + error.message);
        }
    }

    public async retrieveAll(): Promise<PersistentUser[]> {
        try {
            return this.userRepository.getAll();
        } catch (error: any) {
            throw new Error("Error in UserService.retrieveAll()" + error.message);
        }
    }

    public async update(userId: string, user: User): Promise<PersistentUser> {
        try {
            const userToUpdate = this.userRepository.getOne(userId);

            if (!userToUpdate) {
                throw new Error('User not found');
            }
            const updatedUser = {
                ...userToUpdate,
                ...user
            };
            return this.userRepository.update(updatedUser);
        } catch (error: any) {
            throw new Error("Error in UserService.update()" + error.message);
        }
    }

    public async delete(userId: string): Promise<boolean> {
        try {
            return this.userRepository.delete(userId);
        } catch (error) {
            throw new Error("Error in TicketService.deleteTicket()");
        }
    }
}


export default UserService;