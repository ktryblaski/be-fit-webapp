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
      const total: number = 4;

      expect(() => pipe.transform(pagination, total)).toThrowMatching((thrown: any) => thrown instanceof Error);
    });
    it('when pageSize is empty', () => {
      const pagination: Pagination = { page: 2, pageSize: null };
      const total: number = 4;

      expect(() => pipe.transform(pagination, total)).toThrowMatching((thrown: any) => thrown instanceof Error);
    });
  });

  it('should return true', () => {
    const pagination: Pagination = { page: 3, pageSize: 10 };
    const total: number = 30;

    expect(pipe.transform(pagination, total)).toBeTrue();
  });

  describe('should return false', () => {
    it('#1', () => {
      const pagination: Pagination = { page: 3, pageSize: 10 };
      const total: number = 31;

      expect(pipe.transform(pagination, total)).toBeFalse();
    });
    it('#2', () => {
      const pagination: Pagination = { page: 3, pageSize: 10 };
      const total: number = 40;

      expect(pipe.transform(pagination, total)).toBeFalse();
    });
    it('#2', () => {
      const pagination: Pagination = { page: 1, pageSize: 2 };
      const total: number = 40;

      expect(pipe.transform(pagination, total)).toBeFalse();
    });
  });

});
