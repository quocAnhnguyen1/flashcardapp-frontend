<template>
  <div>
    <div v-for="card in cards" :key="card.id" class="card text-bg-light mb-3" @click="toggleCard(card.id)">
      <div class="card-header">{{ card.subject }}</div>
      <div v-if="card.showAnswer" class="card-body">
        <p><strong>Question:</strong> {{ card.question }}</p>
        <p><strong>Answer:</strong> {{ card.answer }}</p>
      </div>
    </div>

    <form @submit.prevent="createCard">
      <label for="cardSubject">Subject:</label>
      <input v-model="newCardSubject" type="text" id="cardSubject" required style="width: 150px"/>

      <label for="cardQuestion">Question:</label>
      <input v-model="newCardQuestion" type="text" id="cardQuestion" required />

      <label for="cardAnswer">Answer:</label>
      <input v-model="newCardAnswer" type="text" id="cardAnswer" required />

      <button type="submit">Create Card</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const cards = ref(store.state.cards);
const newCardSubject = ref('');
const newCardQuestion = ref('');
const newCardAnswer = ref('');
let lastUsedId = ref(0);

const createCard = () => {
  lastUsedId.value += 1;
  const newCard = {
    id: lastUsedId.value,
    subject: newCardSubject.value,
    question: newCardQuestion.value,
    answer: newCardAnswer.value,
    showAnswer: false, // Initially hide the answer
  };

  store.commit('addCard', newCard);
  newCardSubject.value = '';
  newCardQuestion.value = '';
  newCardAnswer.value = '';
};

const toggleCard = (cardId) => {
  const cardIndex = cards.value.findIndex((card) => card.id === cardId);
  if (cardIndex !== -1) {
    // Toggle the showAnswer property for the clicked card
    cards.value[cardIndex].showAnswer = !cards.value[cardIndex].showAnswer;
  }
};
</script>

<style scoped>
/* Add your existing styles here if needed */

form {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Add spacing between input fields */
}

label {
  margin-bottom: 0.5rem; /* Add spacing below labels */
}

/* Add additional styling for the card and revealed content if needed */
.card {
  cursor: pointer;
  /* Add additional styling for the card */
}
</style>


