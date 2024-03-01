import { Component, Inject, OnInit } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { FormServiceService } from '../component-service/form-service/form-service.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';


declare var $: any;

interface forms {
  form_uuid: string;
  form_number: string;
  form_ticket: string;
  form_status: string;
  document_uuid: string;
  document_name: string;
  document_order: number;
  created_by: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

interface documents {
  document_uuid: string;
  document_code: string;
  document_name: string;
  document_format_number: string;
}

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  searchText: string = '';

  form!: FormGroup;
  dataListForm: forms[] = [];
  dataListDocument: documents[] = [];

  form_uuid: string = '';
  form_number: string = '';
  form_ticket: string = '';
  form_status: string = '';
  document_uuid: string = '';
  form_code: string = '';
  form_name: string = '';
  document_format_number: string = '';

  isPublished: boolean = true;

  constructor(
    private cookieService: CookieService,
    public formService: FormServiceService,
    private fb: FormBuilder,
    private formGroupDirective: FormGroupDirective
  ) {
  }

  ngOnInit(): void {
    this.fetchDataForm();
    this.form = this.fb.group({
      form_uuid: [this.form_uuid],
      form_number: [this.form_number],
      form_ticket: [this.form_ticket],
      form_status: [this.form_status],
      document_uuid: [this.document_uuid],
      form_code: [this.form_code],
      form_name: [this.form_name],
      document_format_number: [this.document_format_number],
    });

  }

  matchesSearch(item: forms): boolean {
    const searchLowerCase = this.searchText.toLowerCase();
    return (
      item.form_uuid.toLowerCase().includes(searchLowerCase) ||
      item.form_number.toLowerCase().includes(searchLowerCase) ||
      item.form_ticket.toLowerCase().includes(searchLowerCase) ||
      item.form_status.toLowerCase().includes(searchLowerCase)
    );
  }

  fetchDataForm(): void {
    axios.get(`${environment.apiUrl2}/form`)
      .then((response) => {
        console.log(response.data);
        this.dataListForm = response.data;
        this.formService.updateDataListForm(this.dataListForm);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchDataDocument(): Promise<void> {
    return axios.get(`${environment.apiUrl2}/document`)
      .then((response) => {
        this.dataListDocument = response.data;
        console.log(this.dataListDocument);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  openModalAddForm() {
    this.fetchDataDocument().then(() => {
      $('#addFormModal').modal('show');
      this.form_number = '';
      this.form_ticket = '';
      this.document_uuid = '';
      this.isPublished = false;
    });
  }

  addForm() {
    const token = this.cookieService.get('userToken');
    
    const formData = {
      form_ticket: this.form_ticket,
      document_uuid: this.document_uuid,
      isPublished: this.isPublished ? true : false
    };

    console.log(formData);

    axios.post(`${environment.apiUrl2}/api/form/add`, {
      isPublished: this.isPublished ? true : false,
      formData: {
        form_ticket: this.form_ticket,
        document_uuid: this.document_uuid,
      } },
      {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data);
        this.fetchDataForm();
        Swal.fire({
          icon: 'success',
          title: 'Formulir baru ditambahkan',
          showConfirmButton: false,
          timer: 1500
        })
        $('#addFormModal').modal('hide');
        this.form_number = '';
        this.form_ticket = '';
        this.document_uuid = '';
        this.isPublished = false;
      })
      .catch((error) => {
        if (error.response.status === 422 || error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
  }

  getSpecificForm(form_uuid: string) {
    axios.get(`${environment.apiUrl2}/form/` + form_uuid)
      .then((response) => {
        console.log(response.data)
        const form = response.data;
        this.form_uuid = form.form_uuid;
        this.form_number = form.form_number;
        this.form_ticket = form.form_ticket;
        this.document_uuid = form.document_uuid;
        this.isPublished = form.isPublished;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openModalEditForm() {
    $('#editFormModal').modal('show');
  }
}

export { forms };
