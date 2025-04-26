// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Image Hover Effect
document.querySelectorAll(".img-fluid").forEach((image) => {
  image.addEventListener("mouseover", () => {
    image.style.transform = "scale(1.1)";
    image.style.transition = "transform 0.3s ease";
  });
  image.addEventListener("mouseout", () => {
    image.style.transform = "scale(1)";
  });
});

// Mobile Mockup Animation on Scroll
const mockups = document.querySelectorAll(".d-flex img");
window.addEventListener("scroll", () => {
  mockups.forEach((mockup, index) => {
    const position = mockup.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (position < windowHeight - 100) {
      mockup.style.transform = `translateY(${
        index % 2 === 0 ? "-20px" : "20px"
      })`;
      mockup.style.transition = "transform 0.5s ease";
    }
  });
});

// Button Hover Effect
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#ffc107"; // Change to yellow
    button.style.color = "#000"; // Change text color to black
    button.style.transition = "background-color 0.3s ease, color 0.3s ease";
  });
  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = ""; // Reset to default
    button.style.color = ""; // Reset to default
  });
});

// Social Media Icon Bounce Effect
document.querySelectorAll(".social-media-section img").forEach((icon) => {
  icon.addEventListener("mouseover", () => {
    icon.style.transform = "scale(1.2)";
    icon.style.transition = "transform 0.3s ease";
  });
  icon.addEventListener("mouseout", () => {
    icon.style.transform = "scale(1)";
  });
});

