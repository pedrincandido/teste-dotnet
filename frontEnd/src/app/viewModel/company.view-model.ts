import { VacancyViewModel } from './vacancy.view-model';

export class CompanyViewModel {
    id: number;
    nome: string;
    vagas: VacancyViewModel[];
    constructor(c) {
        this.id = c.id != null ? c.id : null;
        this.nome = c.nome != null ? c.nome : null;
        this.vagas = c.vagas != null ? c.vagas : new VacancyViewModel({});
    }
}
