import { ref, watch } from "vue";

export function useDarkMode() {
  const isDarkMode = ref(
    localStorage.getItem("darkMode") === "false" ? false : true
  );

  watch(
    isDarkMode,
    (val) => {
      localStorage.setItem("darkMode", val.toString());
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
