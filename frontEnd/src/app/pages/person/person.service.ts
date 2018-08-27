import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApplicationHttpClient } from '../../shared/services/http/http.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PersonService {

  url = environment.PERSON;
  constructor(private http: ApplicationHttpClient) { }

  getPersonAll() {
    return this.http
      .get(this.url);
  }

  doGet(page?) {
    return this.http
      .get(this.url, page);
  }

  getPersonById(id: any) {
    return this.http
      .doGetOne(this.url, id);
  }

  postPerson(data: any) {
    return this.http
      .post(this.url, data);
  }

  updatePerson(data: any) {
    return this.http
      .put(this.url, data.id, data);
  }

  deletePerson(id: any) {
    return this.http
      .delete(this.url, id);
  }

  getByName(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.http
      .doGet(this.url, term);
  }
}
