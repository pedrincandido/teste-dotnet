import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { CrediarioService } from './crediario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { PersonService } from '../person/person.service';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { PersonViewModel } from '../../viewModel/person.view-model';
import { TranslateService } from '@ngx-translate/core';
import { ModalDeleteComponent } from '../../shared/modal-delete/modal-delete.component';
import { CrediarioViewModel } from '../../viewModel/crediario.view-model';
import { UserViewModel } from '../../viewModel/user.view-model';
import { UserService } from '../../shared/services/user.service';
import { SalesViewModel } from '../../viewModel/sales.view-model';

@Component({
  selector: 'app-crediario',
  templateUrl: './crediario.component.html',
  styleUrls: ['./crediario.component.css'],
  providers: [CrediarioService, PersonService, UserService]
})
export class CrediarioComponent implements OnInit {
  isRegister: boolean;
  showTable: boolean;
  crediario: Array<any> = [];
  crediarioForm: FormGroup;
  crediarioData: CrediarioViewModel;
  searching: boolean;
  searchFailed: boolean;
  executePost: boolean;
  msgSucess: boolean;
  msgSucessPut: boolean;
  searchingVacancy: boolean;
  searchingTech: boolean;
  searchingTechFailed: boolean;
  searchVacancyFailed: boolean;
  searchingPerson: boolean;
  searchPersonFailed: boolean;
  selectedSearchPerson: PersonViewModel;
  selectedSearchUser: UserViewModel;
  public searchPerson;
  public searchUser;
  public searchTechnologies;
  controlSales: FormArray;
  sales: Array<any> = [];
  searchText: any;
  contasAtivas: any;
  constructor(
    private crediarioService: CrediarioService,
    private personService: PersonService,
    private userService: UserService,
    // private techService: TechnologiesService,
    private translate: TranslateService,
    private formBuild: FormBuilder,
    private modalService: NgbModal
  ) {
    translate.setDefaultLang('pt-br');
    this.contasAtivas = setInterval(() => {
      this.getAtivos();
    }, 60000);
  }

  ngOnInit() {
    this.getAtivos();
    this.buildForm();
    this.showTable = true;
    this.searchCrediario();
    this.searchPerson = (text$: Observable<string>) =>
      text$
        .debounceTime(300)
        .distinctUntilChanged()
        .do(() => this.searchingPerson = true)
        .switchMap((params) => {
          this.searchingPerson = false;
          return this.personService.getByName(params).map((val: any) => val)
            .catch(() => {
              this.searchPersonFailed = true;
              return of([]);
            });
        });

    this.searchUser = (text$: Observable<string>) =>
      text$
        .debounceTime(300)
        .distinctUntilChanged()
        .do(() => this.searchingVacancy = true)
        .switchMap((params) => {
          this.searchingVacancy = false;
          return this.userService.getByName(params).map((val: any) => val)
            .catch(() => {
              this.searchVacancyFailed = true;
              return of([]);
            });
        });

    // this.searchTechnologies = (text$: Observable<string>) =>
    //   text$
    //     .debounceTime(300)
    //     .distinctUntilChanged()
    //     .do(() => this.searchingTech = true)
    //     .switchMap((params) => {
    //       this.searchingTech = false;
    //       return this.techService.getByName(params).map((val: any) => val)
    //         .catch(() => {
    //           this.searchingTechFailed = true;
    //           return of([]);
    //         });
    //     });
  }

  buildForm() {
    this.crediarioForm = this.formBuild.group({
      'person_id': [new FormControl({ value: '' }, Validators.required)],
      'user_id': [new FormControl({ value: '' }, Validators.required)],
      'enable_crediario': [''],
      sales: this.formBuild.array([])
    });
  }

  searchCrediario() {
    this.crediario = [];
    this.crediarioService.getCrediarioAll().subscribe((inter: any) => {
      inter.forEach(result => {
        this.crediario.push(new CrediarioViewModel(result));
      });
    });
  }

  hidenForm() {
    this.searchText = null;
    this.showTable = !this.showTable;
    this.isRegister = false;
    this.searchCrediario();
  }

  initSale() {
    return this.formBuild.group({
      purchase_date: ['', Validators.required],
      value: ['', Validators.required],
      enable_sale: ['']
    });
  }

  addSale() {
    const control = <FormArray>this.crediarioForm.controls['sales'];
    control.push(this.initSale());
  }

  removeSale(i: number) {
    const control = <FormArray>this.crediarioForm.controls['sales'];
    control.removeAt(i);
  }

  validParseDataSale() {
    this.sales = [];
    const dataSale = this.crediarioForm.controls.sales.value;
    if (dataSale.length >= 1) {
      for (const element of dataSale) {
        const item = new SalesViewModel({
          id: element.id,
          purchase_date: element.purchase_date,
          value: element.value,
          enable_sale: element.enable_sale
        });
        this.sales.push(item);
      }
    }
  }

  register() {
    this.buildForm();
    this.selectedSearchPerson = new PersonViewModel({});
    this.selectedSearchUser = new UserViewModel({});
    this.showTable = false;
    this.isRegister = true;
    this.executePost = true;
    this.crediarioData = new CrediarioViewModel({});
    this.addSale();
  }

  parseDataSend() {
    this.validParseDataSale();
    if (this.selectedSearchPerson) {
      this.crediarioData.person_id = this.selectedSearchPerson.id;
    }
    debugger
    if (this.selectedSearchUser) {
      this.crediarioData.user_id = this.selectedSearchUser.id;
    }

    if (this.sales && this.sales.length > 0) {
      this.crediarioData.sales = this.sales;
    }
  }

  saveOrUpdateData() {
    if (this.crediarioData.id != null) {
      this.executePost = false;
    }
    if (this.executePost) {
      this.crediarioService.postCrediario(this.crediarioData).subscribe((result: any) => {
        if (result) {
          this.msgSucess = true;
          this.isRegister = false;
          this.showTable = true;
          this.searchCrediario();
        }
      },
        err => {

        });
    } else {
      if (this.crediarioData.id && this.crediarioData.id !== null) {
        this.crediarioService.updateCrediario(this.crediarioData).subscribe(result => {
          if (result) {
            this.msgSucessPut = true;
            this.showTable = true;
            this.isRegister = false;
            this.searchCrediario();

          }
        });
      }
    }
  }

  formatterPerson = (result: PersonViewModel) => result.name;
  fomatterUser = (result: UserViewModel) => result.login;
  // formatter = (result: TechnologiesViewModel) => result.nome;

  resetMessageSucess() {
    this.msgSucess = false;
    this.msgSucessPut = false;
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
    this.crediarioService.deleteCrediario(id).subscribe(() => {
      this.searchCrediario();
    });
  }

  update(id: any) {
    this.searchText = null;
    this.buildForm();
    this.showTable = false;
    this.isRegister = true;
    this.resetMessageSucess();
    this.crediarioForm.controls['sales'].reset();
    this.crediarioForm.controls['sales'].updateValueAndValidity();
    const findInterview = this.crediario.find(a => a.id === id);
    if (findInterview != null) {
      this.crediarioData = new CrediarioViewModel(findInterview);
      this.controlSales = <FormArray>this.crediarioForm.controls['sales'];
      this.searchPersonById();
      this.searchUserById();
      this.patchSale();
      this.showTable = false;
    }
  }

  searchPersonById() {
    this.personService.getPersonById(this.crediarioData.person_id).subscribe(result => {
      this.selectedSearchPerson = new PersonViewModel(result);
    });
  }

  searchUserById() {
    this.userService.getUserById(this.crediarioData.user_id).subscribe(result => {
      this.selectedSearchUser = new UserViewModel(result);
    });
  }

  getAtivos() {
    this.crediarioService.getAtivos().subscribe(result => {
      this.contasAtivas = result;
    });
  }

  patchSale(): void {
    this.crediarioData.sales.forEach((item) => {
      this.controlSales.push(this.patchValuesSale(item));
    });
  }

  private patchValuesSale(item): AbstractControl {
    debugger
    return this.formBuild.group({
      id: [item.id],
      value: [item.value],
      purchase_date: [item.purchase_date],
      enable_sale: [item.enable_sale]
    });
  }

  validContinue() {
    this.parseDataSend();
    if (this.crediarioData.person_id === null || this.crediarioData.person_id === undefined) {
      this.crediarioForm.controls['person_id'].reset();
      this.crediarioForm.controls['person_id'].setValidators(Validators.required);
      this.crediarioForm.controls['person_id'].markAsTouched();
      this.crediarioForm.controls['person_id'].updateValueAndValidity();
    }
    if (this.crediarioData.user_id === null || this.crediarioData.user_id === undefined) {
      this.crediarioForm.controls['user_id'].reset();
      this.crediarioForm.controls['user_id'].setValidators(Validators.required);
      this.crediarioForm.controls['user_id'].markAsTouched();
      this.crediarioForm.controls['user_id'].updateValueAndValidity();
    }

    if (this.crediarioForm.valid) {
      this.saveOrUpdateData();
    }
  }
}
