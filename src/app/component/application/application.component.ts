import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';


declare var $: any;


interface Application {
  application_uuid: string;
  application_order: number;
  application_code: string;
  application_title: string;
  application_description: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {

  application_code: string = '';
  application_title: string = '';
  application_description: string = '';
  
  constructor(private router: Router, private cookieService: CookieService) {}

  dataListApplication: Application[] = [];

  

  ngOnInit(): void {
    this.fetchDataApplication()
  }

  fetchDataApplication(): void {
    axios.get('http://localhost:8080/application/all')
    .then((response) => {
      this.dataListApplication = response.data;
      console.log(response.data);
    })
    .catch((error) => {
      if(error.response.status === 500) {
        console.log(error.response.data.message)
      }
    })
  }

  addApplicationModal() {
    $('#addApplicationModal').modal('show');
  }

  addApplication() {
    const token = this.cookieService.get('userToken');

    axios.post(`http://localhost:8080/superadmin/application/add`,
    { application_code: this.application_code, application_title: this.application_title, application_description: this.application_description }, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data.message);
      Swal.fire({
        title: 'Success',
        text: response.data.message,
        icon: 'success'
      });
    })
    .catch((error) => {
      if(error.response.status === 400) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error'
        });
      } else if(error.response.status === 422) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error'
        });
      } else if (error.response.status === 500) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Terjadi kesalahan',
          icon: 'error'
        });
      }
    });
  }
  openEditModal(application_uuid: string): void {
    $('#editApplicationModal').modal('show');

  }

  openModal() {
    $('#editApplicationModal').modal('show');
  }
  }