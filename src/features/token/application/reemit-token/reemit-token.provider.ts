import { TokenTypes } from "../../token.types";
import { ReemitTokenApplication } from "./reemit-token.application";

export const ReemitTokenApplicationProvider = {
  provide: TokenTypes.APPLICATION.REEMIT_TOKEN,
  useClass: ReemitTokenApplication,
};