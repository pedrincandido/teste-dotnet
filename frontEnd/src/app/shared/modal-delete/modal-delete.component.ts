import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {
  @Input() name;

  constructor(
    private translate: TranslateService,
    public activeModal: NgbActiveModal) {
    translate.setDefaultLang('pt-br');
  }
  ngOnInit() {
  }

  activeDelete(sendDelete: boolean) {
    if (sendDelete) {
      this.activeModal.close(true);
    } else {
      this.activeModal.close(false);
    }
  }

}
