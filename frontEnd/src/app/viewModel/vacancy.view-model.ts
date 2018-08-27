export class VacancyViewModel {
    id: number;
    nome: string;
    constructor(v) {
        this.id = v.id != null ? v.id : null;
        this.nome = v.nome != null ? v.nome : null;
    }
}
