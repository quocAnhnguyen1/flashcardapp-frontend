<template>
  <div>
    <div class="card-container">
      <div v-for="flashcard in flashcards" :key="flashcard.id">
          <div v-for="flashcard in flashcards" :key="flashcard.id" class="card text-bg-light mb-3" @click="toggleShowAnswer(flashcard.id)">
            <div class="card-content">
              <button @click="deleteFlashcard(flashcard.id)" class="delete-button">X</button>
              <div class="card-header">{{ flashcard.subject }}</div>
              <div class="card-body">
                <p><span class="topic">Topic:</span> {{ flashcard.topic }}</p>
                <p><span class="question">Question:</span> {{ flashcard.question }}</p>
              </div>
              <div v-if="flashcard.showAnswer" class="card-answer">
                <p><span class="answer">Answer:</span> <span class="answer-text">{{ flashcard.answer }}</span></p>
              </div>
              <div class="rating-line">
                <p><span class="rating">Rating:</span> {{ flashcard.rating }}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { ref, onMounted } from 'vue';
import axios from 'axios';

const flashcards = ref([]);
onMounted(async () => {
  try{
    const response = await axios.get('http://localhost:8080/flashcards');
    flashcards.value = response.data
    addGroupStartMarkers();
  } catch (error){
    console.error('Error fetching flashcards:', error);
  }
});

const toggleShowAnswer = (id) => {
  const flashcard = flashcards.value.find((f) => f.id === id);
  if (flashcard) {
    flashcard.showAnswer = !flashcard.showAnswer;
  }
};


const loadFlashcards = async () => {
  try {
    const response = await axios.get('http://localhost:8080/flashcards');
    flashcards.value = response.data;
  } catch (error) {
    console.error('Error fetching flashcards:', error);
  }
};
const deleteFlashcard = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/flashcards/${id}`);
    await loadFlashcards();
  }catch(error) {
    console.log('Error deleting flashcard:', error);
  }
};


onMounted(loadFlashcards);
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
}
.card {
  position: relative;
  border: 1px solid black;
  background-color: cadetblue;
  margin-bottom: 15px;
  cursor: pointer;
  width: 180px;
  height: 200px;
}
.card-content {
  text-align: center;
}
.card-header {
  font-size: 22px;
  font-weight: bolder;
  margin: 10px 0;
}
.answer{
  font-weight: bold;
}
.question {
  font-weight: bold;
}
.topic {
  font-weight: bold;
}
.rating-line {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 10px;
  font-weight: bold;
}
.card-answer {
  margin-top: 15px;
}
.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  border: #222222;
  padding: 5px;
  font-weight: bold;
}
.card-container {
  background: linear-gradient(to right, #8B0000, #000000);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
