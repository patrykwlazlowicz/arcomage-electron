import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameModule } from './ui/game/game.module';
import { createTranslateLoader } from './shared/lib/translate-file-loader';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader)
      },
      useDefaultLang: true,
      defaultLanguage: 'en'
    }),
    GameModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
