import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

interface Role {
  role_uuid: string;
  role_order: number;
  role_code: string;
  role_title: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

@Component({
  selector: 'app-access-group',
  templateUrl: './access-group.component.html',
  styleUrls: ['./access-group.component.scss']
})
export class AccessGroupComponent implements OnInit {

  constructor(private cookieService: CookieService) {}

  dataListRole: Role[] = [];

  ngOnInit(): void {
    this.fetchDataRoleGroup();
  }

  fetchDataRoleGroup(): void {
    axios.get('http://localhost:8080/role/all')
    .then((response) => {
      this.dataListRole = response.data;
      console.log(response.data)
    })
    .catch((error) => {
      if(error.response.status === 500) {
        console.log(error.response.data.message)
      }
    })
  }

  addRole() {
    
  }
}