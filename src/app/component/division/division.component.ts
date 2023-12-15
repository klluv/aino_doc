import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

declare var $: any;

interface Division {
  division_uuid: string;
  division_order: number;
  division_code: string;
  division_title: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit{

  division_code: string = '';
  division_title: string = '';

  constructor(private cookieService: CookieService) {}

  dataListDivision: Division[] = [];

  ngOnInit(): void {
    this.fetchDataDivision();
  }

  fetchDataDivision(): void {
    axios.get('http://localhost:8080/division/all')
    .then((response) => {
      this.dataListDivision = response.data;
    })
    .catch((error) => {
      if(error.response.status === 500) {
        console.log(error.response.data.message)
      }
    })
  }

  addDivisionModal() {
    $('#addDivisionModal').modal('show');
  }

  addDivision() {
    const token = this.cookieService.get('userToken');

    axios.post(`http://localhost:8080/superadmin/division/add`,
    { division_code: this.division_code, division_title: this.division_title }, 
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
}
