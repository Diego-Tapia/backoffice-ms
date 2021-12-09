
export class WalletsByClients {
    constructor(
        clientId: string,
        walletId: string,
        type: string
    ) {
        this.clientId = clientId;
        this.walletId = walletId;
        this.type = type;
    }
    clientId: string;
    walletId: string;
    type: string;
}