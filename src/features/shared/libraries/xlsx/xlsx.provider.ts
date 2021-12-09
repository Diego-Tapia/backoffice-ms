import { LibrariesTypes } from "../libraries.types";
import * as XLSX from 'xlsx'

export const XlsxProvider =  {
    provide: LibrariesTypes.XLSX,
    useValue: XLSX 
}