import { TranslateLoader } from "@ngx-translate/core";
import { Observable, of } from 'rxjs';

export function createTranslateLoader() {
    return new TranslateFileLoader();
}

import EN from "../../../assets/i18n/en.json";

export class TranslateFileLoader implements TranslateLoader {

    private static Languages: any = {
        'en': EN
    };

    constructor() { 
    }

    public getTranslation(lang: string): Observable<Object> {
        return of(TranslateFileLoader.Languages[lang]);
    }
}