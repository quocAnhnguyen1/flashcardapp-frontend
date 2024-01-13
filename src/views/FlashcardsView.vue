<template>
  <div>
    <div v-for="flashcard in flashcards" :key="flashcard.id" class="card text-bg-light mb-3" @click="toggleFlashcard(flashcard.id)" style="max-width: 18rem;">
      <div class="card-header">{{ flashcard.subject }}</div>
      <div class="card-body">
        <p><strong>Topic:</strong> {{ flashcard.topic }}</p>
        <p><strong>Question:</strong> {{ flashcard.question }}</p>
        <p v-if="flashcard.showAnswer"><strong>Answer:</strong> {{ flashcard.answer }}</p>
        <p><strong>Rating:</strong> {{ flashcard.rating }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const flashcards = ref([]);
onMounted(async () => {
  try{
    const response = await axios.get('http://localhost:8080/flashcards');
    flashcards.value = response.dataM
  } catch (error){
    console.error('Error fetching flashcards:', error);
  }
});
const toggleFlashcard = (id) => {
  const flashcard = flashcards.value.find((f) => f.id === id);
  if (flashcard) {
    flashcard.showAnswer = !flashcard.showAnswer;
  }
};
const loadFlashcards = async () => {
  try {
    const response = await axios.get('http://localhost:8080/flashcards');
    flashcards.value = response.data;
  } catch (error){
    console.error('Error fetching flashcards:', error);
  }
};


onMounted(loadFlashcards);
</script>

<style scoped>
/* Add your styles here if needed */
.card {
  border: 1px antiquewhite;
  background-color: cadetblue;
  margin-bottom: 15px !important;
  cursor: pointer !important;
}
.card-body{
  padding: 10px !important;
}
</style>
