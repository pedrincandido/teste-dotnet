import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationHttpClient } from '../shared/services/http/http.service';
import { SaleComponent } from './sale/sale.component';
import { CrediarioComponent } from './crediario/crediario.component';
import { PersonComponent } from './person/person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { SearchListPipe } from '../shared/pipe/search-list.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forChild(PagesRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    SaleComponent,
    CrediarioComponent,
    PersonComponent,
    SearchListPipe
  ],
  providers: [ApplicationHttpClient],
  entryComponents: []
})
export class PagesModule { }
