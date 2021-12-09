import { LibrariesTypes } from "../libraries.types";
import * as Axios from 'axios'

export const AxiosProvider =  {
    provide: LibrariesTypes.AXIOS,
    useValue: Axios
}