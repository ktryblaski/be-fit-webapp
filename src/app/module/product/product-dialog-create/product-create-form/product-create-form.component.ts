import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-product-create-form',
  templateUrl: './product-create-form.component.html',
  styleUrls: ['./product-create-form.component.scss']
})
export class ProductCreateFormComponent {

  @Output() submit: EventEmitter<never> = new EventEmitter<never>();
  @Output() cancel: EventEmitter<never> = new EventEmitter<never>();

  handleSubmit(): void {
    this.submit.emit();
  }

  handleCancel(): void {
    this.cancel.emit();
  }

}
