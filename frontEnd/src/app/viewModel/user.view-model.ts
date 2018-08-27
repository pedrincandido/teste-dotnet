export class UserViewModel {
    id: number;
    login: number;
    password: string;
    constructor(v) {
        this.id = v.Id != null ? v.Id : null;
        this.login = v.login != null ? v.login : null;
        this.password = v.password != null ? v.password : null;
    }
}
