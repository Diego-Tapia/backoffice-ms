import { Inject } from "@nestjs/common";
import { WalletsByClients } from "../../domain/walletsByClients.entity";
import { IWalletsByClientsRepository } from "../../infrastructure/repositories/walletsByClients-repository.interface";
import { WalletsByClientsTypes } from "../../walletsByClients.types";
import { IGetWalletsByClientsByIdApplication } from "./get-by-id-walletsByClients.app.interface";

export class GetWalletsByClientsByIdApplication implements IGetWalletsByClientsByIdApplication {


    constructor(
        @Inject(WalletsByClientsTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly walletsByClientsRepository: IWalletsByClientsRepository,
    ) {
        this.walletsByClientsRepository = walletsByClientsRepository;
    }

    public async execute(id: string): Promise<WalletsByClients> {
        return await this.walletsByClientsRepository.findById(id);
    }
}