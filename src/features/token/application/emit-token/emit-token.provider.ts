import { TokenTypes } from "../../token.types";
import { EmitTokenApplication } from "./emit-token.application";

export const EmitTokenApplicationProvider = {
  provide: TokenTypes.APPLICATION.EMIT_TOKEN,
  useClass: EmitTokenApplication,
};