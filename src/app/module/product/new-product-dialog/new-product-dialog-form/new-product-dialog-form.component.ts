import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-new-product-dialog-form',
  templateUrl: './new-product-dialog-form.component.html',
  styleUrls: ['./new-product-dialog-form.component.scss']
})
export class NewProductDialogFormComponent {

  @Output() submit: EventEmitter<never> = new EventEmitter<never>();
  @Output() cancel: EventEmitter<never> = new EventEmitter<never>();



  constructor() { }

  handleSubmit(): void {
    this.submit.emit();
  }

  handleCancel(): void {
    this.cancel.emit();
  }

}
