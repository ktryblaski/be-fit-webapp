import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorModalData } from './-model/error-modal-data';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {

  title: string | null;
  content: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorModalData) {
    if (!data || (typeof data === 'string' && !data.trim()) || (typeof data !== 'string' && !data.content.trim())) {
      throw Error('No content for error modal');
    }

    if (typeof data === 'string') {
      this.content = data;
    }
  }

}
