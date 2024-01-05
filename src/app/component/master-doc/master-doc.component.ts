import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { MasterDocServiceService } from '../component-service/master-doc-service/master-doc-service.service';


declare var $: any;

interface documents {
  document_uuid: string;
  document_code: string;
  document_name: string;
  document_format_number: string;
}

@Component({
  selector: 'app-master-doc',
  templateUrl: './master-doc.component.html',
  styleUrls: ['./master-doc.component.scss'],
})

export class MasterDocComponent implements OnInit {

  searchText: string = '';

  document_uuid: string = '';
  document_code: string = '';
  document_name: string = '';
  document_format_number: string = '';

  constructor(
    private cookieService: CookieService,
    public masterDocService: MasterDocServiceService,
    @Inject('apiUrl') private apiUrl: string
  ) {

    this.apiUrl = apiUrl;
  }

  ngOnInit(): void {

    this.fetchDataDoc();
  }

  dataListDoc: documents[] = [];

  fetchDataDoc(): void {
    axios.get(`${this.apiUrl}/document/all`) 
      .then((response) => {
        this.dataListDoc = response.data;
        this.masterDocService.updateDataListDoc(this.dataListDoc);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data.message)
        } else if (error.response.status === 404) {
          console.log(error.response.data.message)
        }
      })
  }

  openAddDocModal() {
    $('#addDocModal').modal('show');
    this.document_code = '';
    this.document_name = '';
    this.document_format_number = '';
  }


  addMasterDoc() {
    const token = this.cookieService.get('userToken');

    axios.post(`${this.apiUrl}/superadmin/document/add`,
  }

  closeAddDocModal() {
    $('#addDocModal').modal('hide');
  }

  addDoc() {
    
  }

  openUpdateDocModal() {
    $('#editDocModal').modal('show');
  }

  closeUpdateDocModal() {
    $('#editDocModal').modal('hide');
  }
  updateDoc() {
    
  }
}

  export { documents };