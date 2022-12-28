const langs = {
  en: 'en-US',
  es: 'es-ES',
  pt: 'pt-BR',
};

export const handleTriggerVoice = (sentence) => {
  const lang = sentence?.language || 'en';

  const utterance = new SpeechSynthesisUtterance(sentence.value);
  const voices = speechSynthesis.getVoices();
  const voice = voices.find((voice) => voice.lang === langs[lang]);
  utterance.voice = voice;
  if (sentence?.speed) utterance.rate = sentence.speed;
  speechSynthesis.speak(utterance);
};
