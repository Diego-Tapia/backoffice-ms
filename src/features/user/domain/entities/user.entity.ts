export class User {
   
    customId: string;
    username: string;
    status: string;
    avatarUrl: string;
    clientId: string;
    _id?:string;
    walletId?: string;


    constructor(
        customId: string,
        username: string,
        status: string,
        avatarUrl: string,
        clientId?: string,
        _id?:string,
        walletId?: string

    ) {
        
        this.customId = customId;
        this.username = username;
        this.status = status;
        this.avatarUrl = avatarUrl;
        this.clientId = clientId;
        this._id= _id;
        this.walletId = walletId
    }
}
