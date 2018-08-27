import { SalesViewModel } from './sales.view-model';

export class CrediarioViewModel {
   id: number;
   person_id: number;
   user_id: number;
   sales: SalesViewModel[];
   enable_crediario: Boolean;
    constructor(i) {
        this.id = i.id != null ? i.id : null;
        this.person_id = i.person_id != null ? i.person_id : null;
        this.sales = i.sales != null ? i.sales : new SalesViewModel({});
        this.user_id = i.user_id != null ? i.user_id : null;
        this.enable_crediario = i.enable_crediario != null ? i.enable_crediario : null;
    }
}

