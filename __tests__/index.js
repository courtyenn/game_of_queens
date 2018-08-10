import test from 'ava'
import sinon from 'sinon'
import { from, timer, Subject } from 'rxjs';
import { switchMap, takeUntil, filter, scan, pluck } from 'rxjs/operators';
import * as Test from '../src/'


test('Handling bad data', async t => {

})

test('End of draw input, should exit by itself', async t => {

})
test('Never reaches 4 queens, should exit by itself', async t => {
  // let fetchDeck = sinon.stub();
  // fetchDeck.resolves('12345678')

  sinon.stub(Test, "draw").callsFake(() => from([{ suit: 'HEARTS', value: 'QUEEN' }, { suit: 'SPADES', value: '2' }]));
  // fetchDeck()
  t.plan(1)
  await Test.draw()
  t.end()
  // return start()

})