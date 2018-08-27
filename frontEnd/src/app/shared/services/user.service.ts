import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from './http/http.service';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserService {

  url = environment.USER;
  constructor(private http: ApplicationHttpClient) { }

  getByName(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.http
      .doGet(this.url, term);
  }

  getUserById(id: any) {
    return this.http
      .doGetOne(this.url, id);
  }
}
