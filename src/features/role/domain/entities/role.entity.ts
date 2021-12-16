interface IRole {
    name: string;
    description: string;
}
export class Role {
    name: string;
    description: string;
    constructor({ name, description }:IRole) {
        this.name = name;
        this.description = description;
    }
}