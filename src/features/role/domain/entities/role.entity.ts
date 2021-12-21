interface IRole {
    name: string;
    description: string;
    id?: string;
}
export class Role {
    name: string;
    description: string;
    id?: string;
    constructor({ name, description, id }:IRole) {
        this.name = name;
        this.description = description;
        this.id = id
    }
}