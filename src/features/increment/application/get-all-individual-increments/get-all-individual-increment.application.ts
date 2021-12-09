import { Injectable } from "@nestjs/common";
import { IGetAllIndividualIncrementApplication } from "./get-all-individual-increment-app.interface";

@Injectable()
export class GetAllIndividualIncrementApplication implements IGetAllIndividualIncrementApplication {

  constructor(
  ) {}

  async execute() : Promise<any>{  
  
  }

}