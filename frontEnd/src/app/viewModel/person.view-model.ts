export class PersonViewModel {
    cpf: string;
    birth_date: Date;
    id: number;
    name: string;
    gender_id: number;
    constructor(p) {
        this.cpf = p.cpf != null ? p.cpf : null;
        this.birth_date = p.birth_date != null ? p.birth_date : null;
        this.id = p.id != null ? p.id : null;
        this.name = p.name != null ? p.name : null;
        this.gender_id = p.gender_id != null ? p.gender_id : null;
    }
}
