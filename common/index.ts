export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offsetTop = element.offsetTop;
    window.scrollTo({
      top: offsetTop - 80,
      behavior: "smooth",
    });
  }
};
