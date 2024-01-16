import fs from 'fs';
import path from 'path';
import { AbstractRepository } from './AbstractRepository';
import { User } from '../../types/User';
import { PersistentUser } from '../../types/Models';
import { generateUniqueId } from '../../helper';
import { config } from '../config/config';


class UserRepository implements AbstractRepository<User, PersistentUser> {

    public entity = 'users';
    protected dataFolderPath: string;


    constructor() {
        this.dataFolderPath = path.resolve(config.currentWorkingDirectory + `/data/${this.entity}.json`);
    }

    public getOne(id: string): PersistentUser | undefined {
        const users = this.getAll();

        return users.find(user => user.id === id);
    }

    public getAll(): PersistentUser[] {
        const usersData = fs.readFileSync(path.join(this.dataFolderPath), 'utf-8');
        const users = JSON.parse(usersData) as PersistentUser[];
        return users;
    }

    public create(user: User): PersistentUser {
        const id = generateUniqueId();
        const newUser = {
            ...user,
            id,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const users = this.getAll()
        users.push(newUser);
        fs.writeFileSync(this.dataFolderPath, JSON.stringify(users));
        return newUser;
    }

    public update(entity: PersistentUser): PersistentUser {
        const users = this.getAll();
        const index = users.findIndex(u => u.id === entity.id);
        const updatedUser = {
            ...entity,
            updatedAt: new Date()
        };

        users[index] = updatedUser;
        fs.writeFileSync(this.dataFolderPath, JSON.stringify(users));
        return updatedUser;
    }

    public delete(id: string): boolean {
        const users = this.getAll();
        const index = users.findIndex(u => u.id === id);
        users.splice(index, 1);
        fs.writeFileSync(this.dataFolderPath, JSON.stringify(users));
        return true;
    }
};

export default UserRepository;