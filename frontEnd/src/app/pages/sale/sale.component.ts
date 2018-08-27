import { Component, OnInit } from '@angular/core';
import { SaleService } from './sale.service';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyViewModel } from '../../viewModel/company.view-model';
import { VacancyViewModel } from '../../viewModel/vacancy.view-model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css'],
  providers: [SaleService]
})
export class SaleComponent implements OnInit {
  isRegister: boolean;
  showTable: boolean;
  company: Array<any> = [];
  companyForm: FormGroup;
  companyData: CompanyViewModel;
  public searchVacancy;
  searching: boolean;
  searchFailed: boolean;
  executePost: boolean;
  msgSucess: boolean;
  msgSucessPut: boolean;
  vacancy: Array<any> = [];
  controlVacancy: FormArray;
  searchText: any;
  constructor(
    private saleService: SaleService,
    private translate: TranslateService,
    private formBuild: FormBuilder,
    private modalService: NgbModal
  ) {
    translate.setDefaultLang('pt-br');
  }

  ngOnInit() {
    this.buildForm();
    this.showTable = true;
    this.searchCompany();


    // this.searchVacancy = (text$: Observable<string>) =>
    //   text$
    //     .debounceTime(300)
    //     .distinctUntilChanged()
    //     .do(() => this.searching = true)
    //     .switchMap((params) => {
    //       this.searching = false;
    //       return this.vacancyService.getByName(params).map((val: any) => val)
    //         .catch(() => {
    //           this.searchFailed = true;
    //           return of([]);
    //         });
    //     });
  }

  buildForm() {
    this.companyForm = this.formBuild.group({
      'name': ['', Validators.required],
      // 'searchField': [''],
      vacancies: this.formBuild.array([])
    });
  }

  searchCompany() {
    this.company = [];
    this.saleService.getCompanyAll().subscribe((company: any) => {
      company.forEach(result => {
        this.company.push(new CompanyViewModel(result));
      });
    });
  }

  hidenForm() {
    this.showTable = !this.showTable;
    this.isRegister = false;
    this.searchCompany();
  }

  initVacancy() {
    return this.formBuild.group({
      vacancy: ['', Validators.required]
    });
  }

  addVacancy() {
    const control = <FormArray>this.companyForm.controls['vacancies'];
    control.push(this.initVacancy());
  }

  removeVacancy(i: number) {
    const control = <FormArray>this.companyForm.controls['vacancies'];
    control.removeAt(i);
  }

  register() {
    this.searchText = null;
    this.showTable = false;
    this.isRegister = true;
    this.executePost = true;
    this.addVacancy();
    this.companyData = new CompanyViewModel({});
  }

  formatter = (result: VacancyViewModel) => result.nome;

  validParseDataVacancy() {
    this.vacancy = [];
    const dataVacancy = this.companyForm.controls.vacancies.value;
    if (dataVacancy.length >= 1) {
      for (const element of dataVacancy) {
        const item = new VacancyViewModel({
          id: element.vacancy.id
        });
        this.vacancy.push(item);
      }
    }
  }

  validParseDataSend() {
    this.validParseDataVacancy();

    if (this.vacancy.length >= 1) {
      this.companyData.vagas = this.vacancy;
    }
  }

  saveOrUpdateData() {
    this.validParseDataSend();

    if (this.companyData.id != null) {
      this.executePost = false;
    }
    if (this.executePost) {
      this.saleService.postCompany(this.companyData).subscribe((result: any) => {
        // const dataReturn = result.data;
        if (result) {
          this.msgSucess = true;
          // this.showForm = false;
          this.isRegister = false;
          this.showTable = true;
          this.searchCompany();
          // this.functions.push(dataReturn);
        }
      },
        err => {

        });
    } else {
      if (this.companyData.id && this.companyData.id !== null) {
        this.saleService.updateCompany(this.companyData).subscribe(result => {
          if (result) {
            this.searchCompany();
            this.msgSucessPut = true;
            // this.showForm = false;
            this.showTable = true;
          }
        });
      }
    }
  }

  resetMessageSucess() {
    this.msgSucess = false;
    this.msgSucessPut = false;
  }

  update(id: any) {
    this.searchText = null;
    this.buildForm();
    this.showTable = false;
    this.isRegister = true;
    this.resetMessageSucess();
    this.companyForm.controls['vacancies'].reset();
    this.companyForm.controls['vacancies'].updateValueAndValidity();
    const findCompany = this.company.find(a => a.id === id);
    if (findCompany != null) {
      this.companyData = new CompanyViewModel(findCompany);
      this.controlVacancy = <FormArray>this.companyForm.controls['vacancies'];
      this.patchVacancy();
      // this.showForm = true;
    }
  }

  patchVacancy(): void {
    this.vacancy = [];
    this.companyData.vagas.forEach((item) => {
      this.controlVacancy.push(this.patchValuesVacancy(item));
    });
  }

  private patchValuesVacancy(item): AbstractControl {
    return this.formBuild.group({
      vacancy: [item]
    });
  }

}
