import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DietView} from '../../../../shared/model/domain/diet';
import {InternationalizationService} from '../../../../shared/service/internationalization.service';

@Component({
  selector: 'app-diets-list-ui',
  templateUrl: './diets-list-ui.component.html',
  styleUrls: ['./diets-list-ui.component.scss']
})
export class DietsListUiComponent {

  readonly DATE_FORMAT: 'd/M/yyyy';
  readonly DIET_TYPE: {[key: string]: string};

  @Input() diets: DietView[];
  @Output() clickId: EventEmitter<DietView> = new EventEmitter<DietView>();

  constructor(private i18nService: InternationalizationService) {
    this.DIET_TYPE = i18nService.DIET_TYPE;
  }

  handleClick(diet: DietView) {
    this.clickId.next(diet);
  }

}
