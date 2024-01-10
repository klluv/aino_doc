import { Component } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-form-itcm',
  templateUrl: './form-itcm.component.html',
  styleUrls: ['./form-itcm.component.scss']
})
export class FormItcmComponent {

  constructor() { }
ngOnInit(): void {
  
}

openModalAdd() {

  $('#addITCMModal').modal('show');
}

searchText: string = '';

matchesSearch(item: string): boolean {
  const searchLowerCase = this.searchText.toLowerCase();
  return (
    item.toLowerCase().includes(searchLowerCase)
  );
}

}
