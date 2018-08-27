import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '../../shared/services/http/http.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class SaleService {
  url = environment.SALE;
  constructor(private http: ApplicationHttpClient) { }

  getCompanyAll() {
    return this.http
      .get(this.url);
  }

  doGet(page?) {
    return this.http
      .get(this.url, page);
  }

  getCompanyById(id: any) {
    return this.http
      .doGetOne(this.url, id);
  }

  postCompany(data: any) {
    return this.http
      .post(this.url, data);
  }

  updateCompany(data: any) {
    return this.http
      .put(this.url, data.id, data);
  }

  deleteCompany(id: any) {
    return this.http
      .delete(this.url, id);
  }

  // getByName(term: string, operationId: string) {
  //   const condition = 'name like ' + term + ', operation.id eq ' + operationId;
  //   if (term === '') {
  //     return of([]);
  //   }
  //   return this.http
  //     .doGet(this.url, condition);
  // }

}
