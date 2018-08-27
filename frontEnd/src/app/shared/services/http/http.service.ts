import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';

export interface IRequestOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    body?: any;
}

export function applicationHttpClientCreator(http: HttpClient) {
    return new ApplicationHttpClient(http);
}

@Injectable()
export class ApplicationHttpClient {

    // Extending the HttpClient through the Angular DI.
    public constructor(public http: HttpClient) {
        // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
        // for ex. this.httpClient.http.get(...)
    }

    getHeaders() {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
    /**
     * GET request
     * @param {string} endPoint it doesn't need / in front of the end point
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public get<T>(endPoint: string, path?: string, options?: IRequestOptions): Observable<T> {
        options = ({ headers: this.getHeaders() });
        return this.http.get<T>(endPoint, options);
    }

    // tslint:disable-next-line:max-line-length
    public doGet<T>(endPoint: string, condition?: string, page?: number, sortOn?: boolean, direction?: string, column?: string, options?: IRequestOptions): Observable<T> {
        let params = new HttpParams();
        if (condition) {
            params = params.append('nome', condition);
        }

        options = ({ params: params, headers: this.getHeaders() });
        return this.http.get<T>(endPoint, options);
    }

    public doGetOne<T>(endPoint: string, path?: string, options?: IRequestOptions): Observable<T> {
        let url = endPoint + '/';
        (path !== undefined) ? url += path : url += '';
        options = ({ headers: this.getHeaders() });
        return this.http.get<T>(url, options);
    }

    /**
     * POST request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        // if (options.headers) {
        options = ({ headers: this.getHeaders() });
        // }
        return this.http.post<T>(endPoint, params, options);
    }

    /**
     * PUT request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public put<T>(endPoint: string, path: string, params: Object, options?: IRequestOptions): Observable<T> {
        let url = endPoint;
        if (path) {
             url +=  '/' + path;
        }
        options = ({ headers: this.getHeaders() });
        return this.http.put<T>(url, params, options);
    }

    /**
     * DELETE request
     * @param {string} endPoint end point of the api
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public delete<T>(endPoint: string, path: string, options?: IRequestOptions): Observable<T> {
        const url = endPoint + '/' + path;
        options = ({ headers: this.getHeaders() });
        return this.http.delete<T>(url, options);
    }
}
