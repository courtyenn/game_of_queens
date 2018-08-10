# Game of Queens

### Get Started
`npm i && npm start`

## Deck of Cards
Utilizing the [deck of cards API](http://deckofcardsapi.com/), make a network request to "shuffle" or generate a deck of cards. With the returned deck id, make subsequent network requests drawing 2 cards at a time. Keep drawing until each suit's Queen card is drawn. Then stop. Provide separate lists of all cards drawn for each suit. At most make one network request each second.

Your final solution should print to the screen the array of drawn cards for each suit. Each array should be sorted. For example, your code should print something like:

```
SPADES: [2, 3, 5, 10, JACK, QUEEN]
CLUBS: [2, 4, 5, 6, 10, JACK, QUEEN, KING]
HEARTS: [2, 3, 5, JACK, QUEEN, KING]
DIAMONDS: [2, 3, 5, 6, 7, 8, 10, QUEEN]
```