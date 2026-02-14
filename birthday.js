function blow() {
  // Hide flames
  document.querySelectorAll(".flame").forEach(f => f.style.display = "none");

  // Show message
  document.getElementById("message").style.display = "block";

  // Fade out page
  setTimeout(() => {
    document.body.style.transition = "opacity 1.5s";
    document.body.style.opacity = 0;
  }, 1500);

  // Go to memory lane
  setTimeout(() => {
    window.location.href = "memory.html";
  }, 3000);
}
