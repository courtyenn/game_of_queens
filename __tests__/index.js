import test from 'ava'
import sinon from 'sinon'
import { switchMap, takeUntil, filter, scan, pluck } from 'rxjs/operators';

const drawFake = async () => sinon.fake.resolves([{suit: 'HEARTS', value: 'QUEEN'}, {suit: 'SPADES', value: '2'}]);

test('checks 3 even numbers', t => {
  t.plan(3)
  return evenNumbers_
    .map(n => {
      t.true(n % 2 === 0)
    })
})