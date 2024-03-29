import { createStore } from 'vuex';

interface Card {
    id: number;
    subject: string;
    question: string;
    answer: string;
    showAnswer: boolean;
    rating: number;
}

interface State {
    cards: Card[];
}

export default createStore<State>({
    state: {
        cards: [],
    },
    mutations: {
        addCard(state, card: Card) {
            state.cards.push(card);
        },
    },
});
