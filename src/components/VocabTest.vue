<template>
  <div class="ui segment">
    <div v-if="quizEnded" class="ui positive message">
      <div class="header">Quiz completed!</div>
      <p>Your score: {{ score }} / {{ total }}</p>
      <button class="ui blue button" @click="restartQuiz">Restart Quiz</button>
    </div>

    <div v-else>
      <h3 v-html="questionPrompt"></h3> <!-- Sử dụng v-html để chèn strong tag động -->

      <div class="ui buttons">
        <button
          v-for="(option, i) in options"
          :key="i"
          class="ui button"
          :class="{
            positive: selected === option && option === correctAnswer,
            negative: selected === option && option !== correctAnswer
          }"
          :disabled="selected"
          @click="checkAnswer(option)"
        >
          {{ option }}
        </button>
      </div>

      <div class="ui divider"></div>
      <button v-if="selected" class="ui primary button" @click="nextQuestion">Next</button>

      <div class="ui message">
        <p>Score: {{ score }} / {{ questionIndex }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      questionIndex: 0,
      current: {},
      options: [],
      selected: null,
      score: 0,
      quizEnded: false,
      questionType: '', // Loại câu hỏi random: 'viet_to_eng', 'viet_to_ita', 'eng_to_viet', v.v.
      questionPrompt: '', // Prompt động theo type
      correctAnswer: '', // Đáp án đúng theo type
      questionTypes: [ // Các loại câu hỏi có thể random (bạn có thể thêm/xóa để tùy chỉnh)
        { from: 'vietnamese', to: 'english', prompt: 'What is the English meaning of' },
        { from: 'vietnamese', to: 'italian', prompt: 'What is the Italian meaning of' },
        { from: 'english', to: 'vietnamese', prompt: 'What is the Vietnamese meaning of' },
        { from: 'english', to: 'italian', prompt: 'What is the Italian meaning of' },
        { from: 'italian', to: 'vietnamese', prompt: 'What is the Vietnamese meaning of' },
        { from: 'italian', to: 'english', prompt: 'What is the English meaning of' }
      ]
    }
  },
  computed: {
    total() {
      return this.words.length
    }
  },
  mounted() {
    if (this.words.length === 0) {
      this.quizEnded = true;
      return;
    }
    this.prepareQuestion()
  },
  methods: {
    prepareQuestion() {
      if (this.questionIndex >= this.total) {
        this.quizEnded = true
        return
      }
      this.selected = null
      this.current = this.words[this.questionIndex]
      
      // Random loại câu hỏi
      const randomType = this.questionTypes[Math.floor(Math.random() * this.questionTypes.length)]
      this.questionType = randomType
      
      // Tạo prompt động
      this.questionPrompt = `${randomType.prompt} "<strong>${this.current[randomType.from]}</strong>"?`
      
      // Đáp án đúng theo type
      this.correctAnswer = this.current[randomType.to]
      
      // Tạo options ngẫu nhiên từ field 'to'
      this.options = this.generateOptions(this.correctAnswer, randomType.to)
    },
    generateOptions(correct, field) {
      const options = new Set([correct]);
      const maxOptions = Math.min(4, this.words.length);
      while (options.size < maxOptions) {
        const random = this.words[Math.floor(Math.random() * this.words.length)][field];
        options.add(random);
      }
      return Array.from(options).sort(() => 0.5 - Math.random());
    },
    checkAnswer(option) {
      this.selected = option
      if (option === this.correctAnswer) this.score++
    },
    nextQuestion() {
      this.questionIndex++
      this.prepareQuestion()
    },
    restartQuiz() {
      this.score = 0
      this.questionIndex = 0
      this.quizEnded = false
      this.prepareQuestion()
    }
  }
}
</script>