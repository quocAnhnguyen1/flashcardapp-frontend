<template>
  <div>
    <div v-for="flashcard in flashcards" :key="flashcard.id" class="card text-bg-light mb-3">
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
  try {
    const response = await axios.get('http://localhost:8080/flashcards');
    flashcards.value = response.data;
  } catch (error) {
    console.error('Error fetching flashcards:', error);
  }
});
</script>

<style scoped>
/* Add your styles here if needed */
.card {
  /* Add styling for the card */
}
</style>
