import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { ApplicationService } from '../component-service/application-service/application.service';


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
export class ApplicationComponent implements OnInit {

  application_uuid: string = '';
  application_code: string = '';
  application_title: string = '';
  application_description: string = '';
  
  constructor(
    private router: Router,
    private cookieService: CookieService,
    public applicationService: ApplicationService
    ) {}  

  dataListApplication: Application[] = [];

  

  ngOnInit(): void {
    this.fetchDataApplication()
  }

  fetchDataApplication(): void {
    axios.get('http://localhost:8080/application/all')
    .then((response) => {
      this.dataListApplication = response.data;
      this.applicationService.updateDataListApplication(this.dataListApplication);
    })
    .catch((error) => {
      if(error.response.status === 500) {
        console.log(error.response.data.message)
      }
    })
  }
  

  addApplicationModal() {
    $('#addApplicationModal').modal('show');
    this.application_code = '';
    this.application_title = '';
    this.application_description = '';
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
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      $('#addApplicationModal').modal('hide');
      this.application_code = '';
      this.application_title = '';
      this.application_description = '';
    })
    .catch((error) => {
      if(error.response.status === 400 || error.response.status === 422 || error.response.status === 500) {
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
  getSpecApp(applicationUuid: string): void {
    axios.get(`http://localhost:8080/application/${applicationUuid}`)
    .then((response) => {
      const applicationData = response.data;
      console.log(applicationData);
      this.application_uuid = applicationData.application_uuid;
      this.application_code = applicationData.application_code;
      this.application_title = applicationData.application_title;
      this.application_description = applicationData.application_description;

      $('#editApplicationModal').modal('show');
    })
    .catch((error) => {
      if (error.response.status === 500 || error.response.status === 404) {
        console.log(error.response.data.message)
      }
    })
  }

  updateApplication(): void {
    const token = this.cookieService.get('userToken');
    const applicationUuid = this.application_uuid;

    axios.put(`http://localhost:8080/superadmin/application/update/${applicationUuid}`,
    { application_code: this.application_code, application_title: this.application_title, application_description: this.application_description },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data.message);
      this.fetchDataApplication();
      Swal.fire({
        title: 'Success',
        text: response.data.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      })
      $('#editApplicationModal').modal('hide');
    })
      .catch((error) => {
        if(error.response.status === 400 || error.response.status === 422 || error.response.status === 500) {
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
      })
    }
  }

export { Application };