const myInfo = new URLSearchParams(window.location.search);
console.log(myInfo);

console.log(myInfo.get('first'));
console.log(myInfo.get('last'));
console.log(myInfo.get('organization-title'));
console.log(myInfo.get('email'));
console.log(myInfo.get('phone'));
console.log(myInfo.get('organization-name'));

document.querySelector('#results').innerHTML = `
<p>Details for ${myInfo.get('first')} ${myInfo.get('last')}</p>
<p>Your Organization Title: ${myInfo.get('organization-title')}</p>
<p>Your Email: ${myInfo.get('email')}</p>
<p>Your Phone: ${myInfo.get('phone')}</p>
<p>Your Organization Name: ${myInfo.get('organization-name')}</p>`
