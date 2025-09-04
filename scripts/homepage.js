document.addEventListener("DOMContentLoaded", () => {
  
  const footerDate = document.getElementById("lastModified");
  const currentYear = new Date().getFullYear();
  const lastModified = document.lastModified;

  
  footerDate.textContent = `© ${currentYear} | Last Modified: ${lastModified}`;

  const navbutton = document.querySelector('#ham-btn');
  const navLinks = document.querySelector('#nav-bar');

  navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navLinks.classList.toggle('show');
  })
})