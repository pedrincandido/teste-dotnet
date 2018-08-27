import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApplicationHttpClient } from '../../shared/services/http/http.service';

@Injectable()
export class CrediarioService {

  url = environment.CREDIARIO;
  constructor(private http: ApplicationHttpClient) { }

  getCrediarioAll() {
    return this.http
      .get(this.url);
  }

  doGet(page?) {
    return this.http
      .get(this.url, page);
  }

  getAtivos() {
    return this.http.get(this.url + '/ativos');
  }

  getCrediarioById(id: any) {
    return this.http
      .doGetOne(this.url, id);
  }

  postCrediario(data: any) {
    return this.http
      .post(this.url, data);
  }

  updateCrediario(data: any) {
    return this.http
      .put(this.url, null, data);
  }

  deleteCrediario(id: any) {
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
