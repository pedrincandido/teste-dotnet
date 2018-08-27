
export class TechnologiesViewModel {
    id: number;
    nome: string;

    constructor(t) {
        this.id = t.id != null ? t.id : null;
        this.nome = t.nome != null ? t.nome : null;
    }
}
