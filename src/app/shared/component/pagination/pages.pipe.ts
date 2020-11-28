import { Pipe, PipeTransform } from '@angular/core';
import { Pagination } from './-model/pagination';

@Pipe({
  name: 'pages'
})
export class PagesPipe implements PipeTransform {

  static readonly NUMBER_OF_PAGES = 5;

  transform(current: Pagination, total: number): number[] {
    if (!total || !current?.page || !current?.pageSize) {
      throw new Error('Invalid pagination data');
    }

    const pages: number[] = [current.page];
    const totalPages = Math.ceil(total / current.pageSize);

    for (let i = 1; pages.length < PagesPipe.NUMBER_OF_PAGES && (current.page - i >= 1 || current.page + i <= totalPages) ; i++) {
      if (current.page - i >= 1) {
        pages.push(current.page - i);
      }

      if (pages.length < PagesPipe.NUMBER_OF_PAGES && current.page + i <= totalPages) {
        pages.push(current.page + i);
      }

    }

    return pages.sort((a, b) => a - b);
  }

}
