import { isApiError } from './type-check';

describe('TypeCheck', () => {
  it('this is an api error', () => {
    const apiError = {message: 'an error message'}
    expect(isApiError(apiError)).toBeTrue();
  });
  it('this is not an api error', () => {
    const notAnApiError = {any: 'some value'}
    expect(isApiError(notAnApiError)).toBeFalse();
  });
});
