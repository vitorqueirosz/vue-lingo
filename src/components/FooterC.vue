<template>
  <footer
    :class="
      `flex items-center border-t-2 border-neutral-200 h-36 w-full m-auto ` +
      resultPayload.bgClass
    "
  >
    <div
      className="flex m-auto justify-around items-center h-full w-full max-w-3xl md:justify-between"
    >
      <div v-if="$store.state.hasResult" class="flex items-center">
        <Icon :name="resultPayload.icon" class="mr-2" />
        <div>
          <h3 :class="`font-bold text-xl md:2x ` + resultPayload.textClass">
            {{ resultPayload.title }}
          </h3>
          <p :class="resultPayload.textClass">
            {{ resultPayload.description }}
          </p>
        </div>
      </div>

      <ButtonC
        v-else
        variant="secondary"
        :disabled="$store.state.hasResult"
        @click="handleNextStep"
      >
        SKIP
      </ButtonC>
      <ButtonC
        :disabled="!$store.state.currentAnswer"
        :variant="resultPayload.variant"
        @click="handleCheckAnswer"
      >
        {{ buttonTitle }}
      </ButtonC>
    </div>
  </footer>
</template>

<script>
import ButtonC from '@/components/ButtonC.vue';
import Icon from '@/components/Icon.vue';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    ButtonC,
    Icon,
  },
  props: {
    handleNextStep: {
      type: Function,
      default: () => undefined,
    },
  },
  setup(props) {
    const buttonTitle = ref('CHECK');
    const resultPayload = ref({});
    const store = useStore();

    const handleCheckAnswer = () => {
      if (!store.state.hasResult) {
        store.commit('checkAnswer');
        buttonTitle.value = 'CONTINUE';
      } else {
        resultPayload.value = {};
        props.handleNextStep();
      }
    };

    const handleResult = () => {
      if (!store.state.hasResult) return;

      const isCorrectAnswer = store.state.isCorrectAnswer;

      if (isCorrectAnswer) {
        resultPayload.value = {
          icon: 'check',
          title: 'Well done!',
          textClass: 'text-green-700',
          bgClass: 'bg-green-200',
          variant: 'success',
        };
      } else {
        resultPayload.value = {
          icon: 'closeBorder',
          title: 'Correct solution:',
          textClass: 'text-red-700',
          bgClass: 'bg-red-200',
          description: store.state.correctAnswer,
          variant: 'error',
        };
      }
    };
    watch(() => store.state.isCorrectAnswer, handleResult);

    return {
      buttonTitle,
      handleCheckAnswer,
      resultPayload,
    };
  },
};
</script>
