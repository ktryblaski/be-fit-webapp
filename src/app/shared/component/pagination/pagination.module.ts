import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { PagesPipe } from './pages/pages.pipe';
import { IsLastPagePipe } from './pages/is-last-page.pipe';
import { RawButtonModule } from '../raw-button/raw-button.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageSizeComponent } from './page-size/page-size.component';
import { PagesComponent } from './pages/pages.component';

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
    PageSizeComponent,
    PagesComponent,
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
