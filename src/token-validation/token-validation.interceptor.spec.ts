import { TokenValidationInterceptor } from './token-validation.interceptor';
import { ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { of } from 'rxjs';

/*
  I used chatgpt to get this test, (which I modifed later to fit our use case )  
*/
describe('TokenValidationInterceptor', () => {
  let interceptor: TokenValidationInterceptor;
  let mockCallHandler: CallHandler;

  beforeEach(() => {
    interceptor = new TokenValidationInterceptor();
    mockCallHandler = { handle: jest.fn() } as any;
  });

  function createContext(headers: Record<string, any>): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ headers }),
      }),
    } as any;
  }

  it('throws if Authorization header is missing', () => {
    const ctx = createContext({});
    expect(() => interceptor.intercept(ctx, mockCallHandler)).toThrowError(
      UnauthorizedException,
    );
  });

  it('throws if Authorization format is invalid', () => {
    const ctx = createContext({ authorization: 'NotBearer token' });
    expect(() => interceptor.intercept(ctx, mockCallHandler)).toThrowError(
      UnauthorizedException,
    );
  });

  it('throws if token structure is invalid', () => {
    const ctx = createContext({ authorization: 'Bearer onlyonepart' });
    expect(() => interceptor.intercept(ctx, mockCallHandler)).toThrowError(
      UnauthorizedException,
    );
  });

  it('calls next.handle() and returns its Observable when token is valid', (done) => {
    const validHeader = { authorization: 'Bearer abc.def.ghi' };
    const ctx = createContext(validHeader);

    const fakeResult$ = of('ok');
    (mockCallHandler.handle as jest.Mock).mockReturnValue(fakeResult$);

    const result$ = interceptor.intercept(ctx, mockCallHandler);

    // interceptor should delegate to handle()
    expect(mockCallHandler.handle).toHaveBeenCalled();

    // and propagate the Observable
    result$.subscribe(value => {
      expect(value).toBe('ok');
      done();
    });
  });
});
