const myInfo = new URLSearchParams(window.location.search);
console.log(myInfo);

console.log(myInfo.get('name'));
console.log(myInfo.get('surname'));
console.log(myInfo.get('email'));


document.querySelector('#results').innerHTML = `
<p>Details for ${myInfo.get('name')} ${myInfo.get('surname')}</p>
<p>Your Email: ${myInfo.get('email')}</p>`