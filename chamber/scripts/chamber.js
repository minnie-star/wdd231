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

const container = document.getElementById("membersContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

async function getMembers() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  displayMembers(members);
}

function displayMembers(members) {
  container.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h2>${member.name}</h2>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone Number:</strong> ${member.phoneNumber}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p><strong>Membership:</strong> ${membershipLevel(member.membershipLevel)}</p>
      <p>${member.email}</p>
    `;
    container.appendChild(card);
  });
}

function membershipLevel(level) {
  if (level === 1) return "Member";
  if (level === 2) return "Silver";
  if (level === 3) return "Gold";
  return "Unknown";
}

gridBtn.addEventListener("click", () => {
  container.classList.add("grid-view");
  container.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
})

getMembers();

})