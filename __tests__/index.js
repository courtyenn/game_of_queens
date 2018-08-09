import { of } from 'rxjs';

test('the observable emits hello', done => {
  of('hello').subscribe( str => {
    expect(data).toBe('hola');
    done();
  });
});