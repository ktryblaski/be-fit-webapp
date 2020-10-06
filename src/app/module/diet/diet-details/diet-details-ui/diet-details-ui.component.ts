import { Component, Input, OnInit } from '@angular/core';
import { Diet } from '../../../../shared/model/domain/diet';
import { InternationalizationService } from '../../../../shared/service/internationalization.service';

@Component({
  selector: 'app-diet-details-ui',
  templateUrl: './diet-details-ui.component.html',
  styleUrls: ['./diet-details-ui.component.scss']
})
export class DietDetailsUiComponent implements OnInit {

  readonly DIET_TYPE: {[key: string]: string};

  @Input() diet: Diet;

  constructor(private i18nService: InternationalizationService) {
    this.DIET_TYPE = i18nService.DIET_TYPE;
  }

  ngOnInit(): void {
  }

}
