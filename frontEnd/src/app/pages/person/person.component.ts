import { Component, OnInit } from '@angular/core';
import { ModalDeleteComponent } from '../../shared/modal-delete/modal-delete.component';
import { PersonViewModel } from '../../viewModel/person.view-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from './person.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [PersonService]
})
export class PersonComponent implements OnInit {
  isRegister: boolean;
  showTable: boolean;
  person: Array<any> = [];
  personForm: FormGroup;
  personData: PersonViewModel;
  public searchVacancy;
  searching: boolean;
  searchFailed: boolean;
  executePost: boolean;
  msgSucess: boolean;
  msgSucessPut: boolean;
  searchText: any;
  constructor(
    private personService: PersonService,
    private formBuild: FormBuilder,
    private translate: TranslateService,
    private modalService: NgbModal
  ) {
    translate.setDefaultLang('pt-br');
  }

  ngOnInit() {
    this.buildForm();
    this.showTable = true;
    this.searchPerson();

  }

  buildForm() {
    this.personForm = this.formBuild.group({
      'nome': ['', Validators.required],
      'cpf': ['', Validators.required],
      'dataNascimento': ['', Validators.required],
      'sexo': ['']
    });
  }

  searchPerson() {
    this.person = [];
    this.personService.getPersonAll().subscribe((person: any) => {
      person.forEach(result => {
        this.person.push(new PersonViewModel(result));
      });
    });
  }

  register() {
    this.searchText = null;
    this.showTable = false;
    this.isRegister = true;
    this.executePost = true;
    this.personData = new PersonViewModel({});
  }


  hidenForm() {
    this.showTable = !this.showTable;
    this.isRegister = false;
    this.searchPerson();
  }

  saveOrUpdateData() {
    if (this.personData.id != null) {
      this.executePost = false;
    }
    if (this.executePost) {
      this.personService.postPerson(this.personData).subscribe((result: any) => {
        if (result === 200) {
          this.msgSucess = true;
          this.showTable = true;
          this.isRegister = false;
          this.searchPerson();
        }
      },
        err => {

        });
    } else {
      if (this.personData.id && this.personData.id !== null) {
        this.personService.updatePerson(this.personData).subscribe(result => {
          if (result) {
            this.searchPerson();
            this.msgSucessPut = true;
            this.isRegister = false;
            this.showTable = true;
          }
        });
      }
    }
  }

  openModalDelete(data: any) {
    this.resetMessageSucess();
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.data = data;
    modalRef.result.then(result => {
      if (result) {
        this.deleteMethods(data.id);
      }
    });
  }

  deleteMethods(id: any) {
    this.personService.deletePerson(id).subscribe(() => {
      this.searchPerson();
    });
  }

  resetMessageSucess() {
    this.msgSucess = false;
    this.msgSucessPut = false;
  }

  update(id: any) {
    this.searchText = null;
    this.showTable = false;
    this.isRegister = true;
    this.resetMessageSucess();
    const findPerson = this.person.find(a => a.id === id);
    if (findPerson != null) {
      this.personData = new PersonViewModel(findPerson);
    }
  }

}
