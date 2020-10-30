import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DietFormHandler } from './diet-form-handler';
import { DietType } from '../../../shared/model/domain/diet';
import { InternationalizationService } from '../../../shared/service/internationalization.service';

@Component({
  selector: 'app-diet-form',
  templateUrl: './diet-form.component.html',
  styleUrls: ['./diet-form.component.scss'],
})
export class DietFormComponent {
  @Input() formHandler: DietFormHandler;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  readonly DIET_TYPE: { [key: string]: string };
  readonly dietTypes: DietType[] = [DietType.CUTTING, DietType.KEEPING, DietType.BULKING];

  constructor(private i18nService: InternationalizationService) {
    this.DIET_TYPE = i18nService.DIET_TYPE;
  }

  handleSubmit(): void {
    this.save.emit();
  }

  handleCancel(): void {
    this.cancel.emit();
  }
}
