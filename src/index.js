import { Observable, Subscription, of, fromEvent, from, empty, merge, timer, Subject } from 'rxjs';
import { multicast, flatMap, concat, map, mapTo, switchMap, tap, mergeMap, takeUntil, filter, finalize, scan, pluck, every, mergeAll, withLatestFrom, concatMap } from 'rxjs/operators';
import axios from 'axios'

let cardMap = {
    SPADES: [],
    HEARTS: [],
    CLUBS: [],
    DIAMONDS: []
}
let deck_id;

const fetchDeck = async () => (await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle`)).data.deck_id

const getCardValue = (card) => {
    const cardValueMap = {
        'ACE': 20,
        'KING': 19,
        'QUEEN': 18,
        'JACK': 17
    }
    return cardValueMap[card]
}

const sortCards = (a, b) => {
    let x = parseInt(a)
    let y = parseInt(b)
    if(!x)x = getCardValue(a);
    if(!y)y=getCardValue(b);

    if(x < y)return -1
    if(x === y)return 0
    if(x > y)return 1
}

const isQueen = card => {
    console.log(card.value)
    return card.value === 'QUEEN'
};

const draw = (deckId) => {
    const source = from(axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)).pipe(pluck('data')).pipe(pluck('cards'))

    return source.pipe(switchMap(x => x))
}

const pollDeck = (deckId, interval = 1000) => {
    let pollSubject = new Subject();
    let testSubj = new Subject();
    let timer$ = timer(0, interval).pipe(switchMap(_ => draw(deckId)), takeUntil(testSubj))
    timer$.subscribe(pollSubject)
    pollSubject.pipe(filter(isQueen)).pipe(scan((acc, _) => acc + 1, 0)).pipe(filter(val => val >= 4)).subscribe(x => {
        testSubj.next()
    }, err => console.error(err), complete => {
        Object.keys(cardMap).forEach(suit => {
            console.log(suit + ': [' + cardMap[suit].sort(sortCards).toString()+ ']')
        })
    })
    return pollSubject;
}

const startDrawing = (deckId) => {

}

export const start = async () => {
    const deckId = await fetchDeck()

    pollDeck(deckId).subscribe(card => {
        cardMap[card.suit].push(card.value)
    })
}

start();