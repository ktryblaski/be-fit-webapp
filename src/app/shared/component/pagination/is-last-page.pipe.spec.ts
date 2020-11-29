import { IsLastPagePipe } from './is-last-page.pipe';
import { Pagination } from './-model/pagination';

describe('isLastPage', () => {

  const pipe = new IsLastPagePipe();

  describe('should throw error', () => {
    it('when total is empty', () => {
      const pagination: Pagination = { page: 1, pageSize: 10 };
      const total: number = null;

      expect(() => pipe.transform(pagination, total)).toThrowMatching((thrown: any) => thrown instanceof Error);
    });
    it('when page is empty', () => {
      const pagination: Pagination = { page: null, pageSize: 10 };
      const total = 4;

      expect(() => pipe.transform(pagination, total)).toThrowMatching((thrown: any) => thrown instanceof Error);
    });
    it('when pageSize is empty', () => {
      const pagination: Pagination = { page: 2, pageSize: null };
      const total = 4;

      expect(() => pipe.transform(pagination, total)).toThrowMatching((thrown: any) => thrown instanceof Error);
    });
  });

  it('should return true', () => {
    const pagination: Pagination = { page: 3, pageSize: 10 };
    const total = 30;

    expect(pipe.transform(pagination, total)).toBeTrue();
  });

  describe('should return false', () => {
    it('with total=31 and page={3, 10}', () => {
      const pagination: Pagination = { page: 3, pageSize: 10 };
      const total = 31;

      expect(pipe.transform(pagination, total)).toBeFalse();
    });
    it('with total=40 and page={3, 10}', () => {
      const pagination: Pagination = { page: 3, pageSize: 10 };
      const total = 40;

      expect(pipe.transform(pagination, total)).toBeFalse();
    });
    it('with total=40 and page={1, 2}', () => {
      const pagination: Pagination = { page: 1, pageSize: 2 };
      const total = 40;

      expect(pipe.transform(pagination, total)).toBeFalse();
    });
  });

});
