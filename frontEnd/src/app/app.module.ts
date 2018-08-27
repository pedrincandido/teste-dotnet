import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ApplicationHttpClient } from './shared/services/http/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequestInterceptorService } from './shared/interceptor/interceptor-request';
import { ModalErrorComponent } from './shared/modal-error/modal-error.component';
import { AppRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalDeleteComponent } from './shared/modal-delete/modal-delete.component';
import { SearchListPipe } from './shared/pipe/search-list.pipe';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ModalErrorComponent,
    ModalDeleteComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    PagesModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true },
    ApplicationHttpClient],
  bootstrap: [AppComponent],
  entryComponents: [ModalErrorComponent, ModalDeleteComponent]
})
export class AppModule { }
