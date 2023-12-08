import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

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
  selector: 'app-list-all-role',
  templateUrl: './list-all-role.component.html',
  styleUrls: ['./list-all-role.component.scss']
})
export class ListAllRoleComponent implements OnInit{

  constructor(private router: Router){}

  dataListRole: Role[] = [];

  ngOnInit(): void {
    this.fetchDataRole()
  }

  fetchDataRole(): void {
    axios.get('http://localhost:8080/role/all')
    .then((response) => {
      this.dataListRole = response.data;
    })
    .catch((error) => {
      if(error.response.status === 500) {
        console.log(error.response.data.message)
      }
    })
  }

}