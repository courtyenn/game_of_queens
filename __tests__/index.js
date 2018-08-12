import rewire from 'rewire'
import test from 'ava'
import sinon from 'sinon'
import { from, timer, Subject } from 'rxjs';
import { switchMap, takeUntil, filter, scan, pluck } from 'rxjs/operators';
const Rewire = rewire('../src/')

test('Handling bad data', async t => {
  const deck = [
    { suit: 'HEARTS', value: 'QUEEN' },
    { suit: 'SPADE', value: 'KING' }
  ]
  Rewire.__set__({
    fetchDeck: () => 123,
    draw: () => [deck.shift(), deck.shift()]
  })
  await Rewire.start().catch((e) => e === 'Bad Card Data' ? t.pass() : t.fail())
})

test('End of draw input, should exit by itself', async t => {
  const deck = [{ suit: 'HEARTS', value: 'QUEEN' },
  { suit: 'CLUBS', value: 'KING' },
  { suit: 'HEARTS', value: 'KING' },
  { suit: 'SPADES', value: 'KING' },
  { suit: 'DIAMONDS', value: 'KING' },
  { suit: 'CLUBS', value: '2' },
  { suit: 'HEARTS', value: '2' },
  { suit: 'SPADES', value: '2' },
  { suit: 'DIAMONDS', value: '2' },
  { suit: 'CLUBS', value: '3' },
  { suit: 'HEARTS', value: '3' },
  { suit: 'SPADES', value: '3' },
  { suit: 'DIAMONDS', value: '3' },
  ]
  Rewire.__set__({
    fetchDeck: () => 123,
    draw: () => [deck.shift(), deck.shift()]
  })
  await Rewire.start().catch((e) => e === 'Bad Card Data' ? t.pass() : t.fail())
})

test('four queens found', async t => {
  const deck = [
    { suit: 'HEARTS', value: 'QUEEN' },
    { suit: 'SPADES', value: 'QUEEN' },
    { suit: 'CLUBS', value: 'QUEEN' },
    { suit: 'DIAMONDS', value: 'QUEEN' }
  ]
  Rewire.__set__({
    fetchDeck: () => 123,
    draw: () => [deck.shift(), deck.shift()]
  })
  await Rewire.start().then((cardMap) => t.pass())
})