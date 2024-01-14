// src/components/__tests__/FlashcardsViewTest.ts
import { test, assert } from 'vitest';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import jest from 'jest';
import FlashcardsView from '../FlashcardsView.vue';

jest.mock('axios');

test('deleteFlashcard deletes a flashcard', async () => {
    // Mock flashcard data
    const flashcards = [
        { id: 1, subject: 'Math', topic: 'Algebra', question: 'What is 2 + 2?', rating: 5, answer: '4', showAnswer: false },

    ];

    axios.get.mockResolvedValue({ data: flashcards });

    const wrapper = mount(FlashcardsView);

    await wrapper.vm.deleteFlashcard(1);

    assert.is(wrapper.vm.flashcards.length, flashcards.length - 1);
});

test('createFlashcard creates a new flashcard', async () => {
    // Mock flashcard data
    const newFlashcard = {
        subject: 'Science',
        topic: 'Biology',
        question: 'What is photosynthesis?',
        rating: 4,
        answer: 'The process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll.',
        showAnswer: false,
    };

    // Mock axios response for creating a flashcard
    axios.post.mockResolvedValue({ data: newFlashcard });

    const wrapper = mount(FlashcardsView);

    await wrapper.vm.createFlashcard();

    // Check if the new flashcard is added to the flashcards list
    assert.is(wrapper.vm.flashcards.length, 1);
    assert.is(wrapper.vm.flashcards[0].subject, newFlashcard.subject);
    assert.is(wrapper.vm.flashcards[0].topic, newFlashcard.topic);
});
