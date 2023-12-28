import { Component } from '@angular/core';



declare var $: any;

interface documents {
  doc_title: string;
  doc_description: string;
  doc_type: string;
  doc_file: string;
  created_by: string;
  created_at: string;
}

@Component({
  selector: 'app-master-doc',
  templateUrl: './master-doc.component.html',
  styleUrls: ['./master-doc.component.scss'],
})
export class MasterDocComponent {

  searchText: string = '';

  doc_code: string = '';
  doc_title: string = '';
  doc_description: string = '';
  doc_format: string = '';

  openAddDocModal() {
    $('#addDocModal').modal('show');
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
