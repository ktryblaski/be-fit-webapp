import {Component, Input} from '@angular/core';
import {Product} from '../../../../shared/model/domain/product';

@Component({
  selector: 'app-product-details-dialog-ui',
  templateUrl: './product-details-dialog-ui.component.html',
  styleUrls: ['./product-details-dialog-ui.component.scss']
})
export class ProductDetailsDialogUiComponent {

  @Input() product: Product;

}
