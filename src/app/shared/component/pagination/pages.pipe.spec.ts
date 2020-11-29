import { Pagination } from './-model/pagination';
import { PagesPipe } from './pages.pipe';

describe('pages', () => {
  const pipe = new PagesPipe();

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

  it('should return [1]', () => {
    const pagination: Pagination = { page: 1, pageSize: 10 };
    const total = 1;

    expect(pipe.transform(pagination, total)).toEqual([1]);
  });

  it('should return [1, 2] #1', () => {
    const pagination: Pagination = { page: 1, pageSize: 10 };
    const total = 11;

    expect(pipe.transform(pagination, total)).toEqual([1, 2]);
  });

  it('should return [1, 2] #2', () => {
    const pagination: Pagination = { page: 1, pageSize: 10 };
    const total = 20;

    expect(pipe.transform(pagination, total)).toEqual([1, 2]);
  });

  it('should return [1, 2, 3, 4, 5]', () => {
    const pagination: Pagination = { page: 3, pageSize: 10 };
    const total = 51;

    expect(pipe.transform(pagination, total)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return [2, 3, 4, 5, 6] #1', () => {
    const pagination: Pagination = { page: 4, pageSize: 10 };
    const total = 51;

    expect(pipe.transform(pagination, total)).toEqual([2, 3, 4, 5, 6]);
  });

  it('should return [2, 3, 4, 5, 6] #2', () => {
    const pagination: Pagination = { page: 6, pageSize: 10 };
    const total = 51;

    expect(pipe.transform(pagination, total)).toEqual([2, 3, 4, 5, 6]);
  });

  it('should return [5, 6, 7, 8, 9] #1', () => {
    const pagination: Pagination = { page: 7, pageSize: 10 };
    const total = 99;

    expect(pipe.transform(pagination, total)).toEqual([5, 6, 7, 8, 9]);
  });

  it('should return [6, 7, 8, 9, 10]', () => {
    const pagination: Pagination = { page: 8, pageSize: 10 };
    const total = 99;

    expect(pipe.transform(pagination, total)).toEqual([6, 7, 8, 9, 10]);
  });

});
