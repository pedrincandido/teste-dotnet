
export class SalesViewModel {
    id: number;
    purchase_date: Date;
    value: number;
    enable_sale: Boolean;
    crediario_id: number;

    constructor(s) {
        this.id = s.id != null ? s.id : null;
        this.purchase_date = s.purchase_date != null ? s.purchase_date : null;
        this.value = s.value ? s.value : null;
        this.enable_sale = s.enable_sale != null ? s.enable_sale : null;
        this.crediario_id = s.crediario_id != null ? this.crediario_id : null;
    }
}
