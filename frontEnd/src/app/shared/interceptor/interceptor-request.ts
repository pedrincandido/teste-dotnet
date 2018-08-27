import { Injectable } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {


    isRefreshingToken: boolean;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private modalService: NgbModal
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            // .do((ev: HttpEvent<any>) => {
            //     if (ev instanceof HttpResponse) {
            //         console.log('ev in the do: ', ev);
            //     }
            // })
            .catch((error: any) => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        default:
                        return this.handleErrorDefault(error);
                    }
                }

                return Observable.throw(error);
            });
    }

    // handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    //     if (!this.isRefreshingToken) {
    //         this.isRefreshingToken = true;

    //         // Reset here so that the following requests wait until the token
    //         // comes back from the refreshToken call.
    //         thistokenSubject.next(null);

    //         return this.authService.refreshToken()
    //             .switchMap((newToken: string) => {
    //                 if (newToken) {
    //                     this.tokenSubject.next(newToken);
    //                     return next.handle(this.addToken(this.getNewRequest(req), newToken));
    //                 }

    //                 // If we don't get a new token, we are in trouble so logout.
    //                 return this.logoutUser();
    //             })
    //             .catch(error => {
    //                 // If there is an exception calling 'refreshToken', bad news so logout.
    //                 return this.logoutUser();
    //             })
    //             .finally(() => {
    //                 this.isRefreshingToken = false;
    //             });
    //     } else {
    //         return this.tokenSubject
    //             .filter(token => token != null)
    //             .take(1)
    //             .switchMap(token => {
    //                 return next.handle(this.addToken(this.getNewRequest(req), token));
    //             });
    //     }
    // }

    handleErrorDefault(error) {
        if (error) {
            const json = error.error;
            let message;
            if (error.status === 404) {
                message = 'Não foi encontrado nenhum item correspondente';
            } else {
                message = json.message;
            }

            const dialogRef = this.modalService.open(ModalErrorComponent);
            dialogRef.componentInstance.message = message;
            return Observable.throw(error.status);

        } else {
            return Observable.throw(error.error);
        }
    }



}
