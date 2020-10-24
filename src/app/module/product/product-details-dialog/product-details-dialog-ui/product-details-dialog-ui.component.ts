import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../shared/model/domain/product';

@Component({
  selector: 'app-product-details-dialog-ui',
  templateUrl: './product-details-dialog-ui.component.html',
  styleUrls: ['./product-details-dialog-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsDialogUiComponent {
  @Input() product: Product;
  @Output() toggleFavourite = new EventEmitter();
  @Output() exit = new EventEmitter();

  handleToggleFavourite(): void {
    this.toggleFavourite.next();
  }

  handleExit(): void {
    this.exit.next();
  }
}
