const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    formStatus.textContent = "Sending your message…";

    try {
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch("https://formsubmit.co/ajax/andrewcolindeleon13@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Submission failed.");
      }

      contactForm.reset();
      formStatus.textContent = "Thanks! Your message has been sent successfully.";
      showToast("Message sent successfully!");
    } catch (error) {
      formStatus.textContent = "Something went wrong. Please email me directly at andrewcolindeleon13@gmail.com.";
    }
  });

  if (window.location.search.includes("sent=1")) {
    showToast("Message sent successfully!");
  }
}