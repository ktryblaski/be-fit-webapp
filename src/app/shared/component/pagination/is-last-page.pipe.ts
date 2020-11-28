import { Pipe, PipeTransform } from '@angular/core';
import { Pagination } from './-model/pagination';

@Pipe({
  name: 'isLastPage'
})
export class IsLastPagePipe implements PipeTransform {

  transform(current: Pagination, total: number): boolean {
    if (!total || !current?.page || !current?.pageSize) {
      throw new Error('Invalid pagination data');
    }

    return current.page === Math.ceil(total / current.pageSize);
  }

}
