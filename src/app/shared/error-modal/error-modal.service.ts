import { Injectable } from '@angular/core';
import { ErrorModalData } from './-model/error-modal-data';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from './error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {

  constructor(private dialog: MatDialog) { }

  showError(error: ErrorModalData): void {
    this.dialog.open(ErrorModalComponent, {
      width: '400px',
      data: error,
      autoFocus: false
    });
  }

}
