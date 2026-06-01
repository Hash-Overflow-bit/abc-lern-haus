export function speakDE(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  u.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}