export enum Role {
    MASTER="master",
    DEVELOPER="developer",
    JUNIOR="junior"
}

export type User = {
    name: string;
    email: string;
    role: Role;
}