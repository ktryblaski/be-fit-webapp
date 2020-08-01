import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DietView} from "../../../../shared/model/domain/diet";
import {InternationalizationService} from "../../../../shared/service/internationalization.service";

@Component({
  selector: 'app-diets-list-ui',
  templateUrl: './diets-list-ui.component.html',
  styleUrls: ['./diets-list-ui.component.scss']
})
export class DietsListUiComponent {

  readonly DIET_TYPE: {[key: string]: string};

  @Input() diets: DietView[];
  @Output() clickId: EventEmitter<number> = new EventEmitter<number>();

  constructor(private i18nService: InternationalizationService) {
    this.DIET_TYPE = i18nService.DIET_TYPE;
  }

  handleClickId(id: number) {
    this.clickId.next(id);
  }

}
