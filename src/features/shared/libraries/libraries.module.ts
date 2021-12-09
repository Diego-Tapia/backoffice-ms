import { Module } from '@nestjs/common';
import { AxiosProvider } from './axios/axios.provider';
import { XlsxProvider } from './xlsx/xlsx.provider';

@Module({
    providers: [
        AxiosProvider,
        XlsxProvider
    ],
    exports: [
        AxiosProvider,
        XlsxProvider
    ]
})

export class LibrariesModule {}