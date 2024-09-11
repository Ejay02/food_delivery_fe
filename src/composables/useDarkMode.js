import { ref, watch } from "vue";

export function useDarkMode() {
  const isDarkMode = ref(localStorage.getItem("darkMode") === "true");

  watch(
    isDarkMode,
    (val) => {
      localStorage.setItem("darkMode", val);
      if (val) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    { immediate: true }
  );

  return isDarkMode;
}
