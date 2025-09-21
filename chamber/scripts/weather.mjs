document.addEventListener("DOMContentLoaded", () => {


  async function getMembers() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  return members;
  }

  function getRandomSpotlights(members, count) {
  // Filter only Gold or Silver
  const eligible = members.filter(member =>
    member.membershipLevel === 2 || member.membershipLevel === 3
  );

  // Shuffle randomly
  const shuffled = eligible.sort(() => 0.5 - Math.random());

  // Return first `count`
  return shuffled.slice(0, count);
  }

  function renderSpotlights(members) {
    const container = document.getElementById("spotlights");
    container.innerHTML = ""; 

    const spotlights = getRandomSpotlights(members, Math.floor(Math.random() * 2) + 2); 

    spotlights.forEach(member => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" width="100" height="80">
        <h2>${member.name}</h2>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone Number:</strong> ${member.phoneNumber}</p>
        <a href="${member.websiteUrl}" target="_blank">Visit Website</a>
        <p><strong>Membership:</strong> ${levelName(member.membershipLevel)}</p>
        <p><strong>Email:</strong> ${member.email}</p>
      `;
      container.appendChild(card);
    });
  }


  function levelName(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
  }


  
  // getMembers() must fetch JSON and then call renderSpotlights with the data
  getMembers().then(members => renderSpotlights(members));

  //SELECT HTML ELEMENTS INT THE DOCUMENT
  const myTown = document.querySelector('#town');
  const myDescription = document.querySelector('#description');
  const myTemperature = document.querySelector('#temperature');
  const myGraphic = document.querySelector('#graphic');

  //CREATE REQUIRED VARIABLES FOR THE URL
  const myKey = "7f1f981d6afa25e07f5fc5a378fcec1d"
  const myLat = "-29.760751297919757"
  const myLong = "31.050330390772697"

  //CONSTRUCT A FULL PATH USING TEMPLATE LITERALS
  const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`

  // TRY TO GRAB THE CURRENT WEATHER DATA
  async function apiFetch() {
    try {
      const response = await fetch(myURL);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        displayResults(data); 
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  //DISPLAY THE JSON DATA ONTO MY WEB PAGE
  function displayResults(data) {
      myTown.innerHTML = data.name
      myDescription.innerHTML = data.weather[0].description
      myTemperature.innerHTML =`${data.main.temp}&deg;F`
      const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      myGraphic.setAttribute('SRC', iconsrc)
      myGraphic.setAttribute('alt', data.weather[0].description)
  }



apiFetch();

})
