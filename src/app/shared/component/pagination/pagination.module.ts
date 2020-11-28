import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { PagesPipe } from './pages.pipe';
import { IsLastPagePipe } from './is-last-page.pipe';
import { RawButtonModule } from '../raw-button/raw-button.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    RawButtonModule,
    FontAwesomeModule
  ],
  declarations: [
    PaginationComponent,
    PagesPipe,
    IsLastPagePipe,
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
