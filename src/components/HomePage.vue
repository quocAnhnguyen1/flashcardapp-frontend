<template>
  <div>
    <div v-for="flashcard in flashcards" :key="flashcard.id" class="card text-bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header">{{ flashcard.subject }}</div>
      <div class="card-body">
        <p><strong>Topic:</strong> {{ flashcard.topic }}</p>
        <p><strong>Question:</strong> {{ flashcard.question }}</p>
        <p v-if="flashcard.showAnswer"><strong>Answer:</strong> {{ flashcard.answer }}</p>
        <p><strong>Rating:</strong> {{ flashcard.rating }}</p>
      </div>
    </div>

    <form @submit.prevent="createFlashcard">
      <label for="flashcardSubject">Subject:</label>
      <input v-model="newFlashcardSubject" type="text" id="flashcardSubject" required style="width: 150px;"/>

      <label for="flashcardTopic">Topic:</label>
      <input v-model="newFlashcardTopic" type="text" id="flashcardTopic" required />

      <label for="flashcardQuestion">Question:</label>
      <input v-model="newFlashcardQuestion" type="text" id="flashcardQuestion" required />

      <label for="flashcardAnswer">Answer:</label>
      <input v-model="newFlashcardAnswer" type="text" id="flashcardAnswer" required />

      <label for="flashcardRating">Rating:</label>
      <input v-model="newFlashcardRating" type="number" id="flashcardRating" required style="width: 100px"/>

      <button type="submit">Create Flashcard</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const flashcards = ref([]);
const newFlashcardSubject = ref('');
const newFlashcardTopic = ref('');
const newFlashcardQuestion = ref('');
const newFlashcardRating = ref(0);
const newFlashcardAnswer = ref('');

const loadFlashcards = async () => {
  try{
    const response = await axios.get('http://localhost:8080/flashcards')
    flashcards.value = response.data;
  }catch (error){
    console.error('Error fetching flashcards:', error);
  }
};
const createFlashcard = async () => {
  const newFlashcard = {
    subject: newFlashcardSubject.value,
    topic: newFlashcardTopic.value,
    question: newFlashcardQuestion.value,
    rating: newFlashcardRating.value,
    answer: newFlashcardAnswer.value,
    showAnswer: false,
  };

  try {
    const response = await axios.post('http://localhost:8080/flashcards', newFlashcard);
    console.log(response.data); // Assuming the backend returns the saved flashcard
  } catch (error) {
    console.error('Error saving flashcard:', error);
  }

};

</script>

<style scoped>
/* Add your styles here if needed */
.card {
  border: 1px antiquewhite;
  margin-bottom: 15px;
  cursor: pointer;
}
.card-body{
  padding: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  margin-bottom: 0.5rem;
}
</style>
