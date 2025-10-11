document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("subscribeModal");

    const btn = document.getElementById("subscribeBtn");
    const closeBtn = document.querySelector(".close");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
        modal.style.display = "none";
        }
    }
})