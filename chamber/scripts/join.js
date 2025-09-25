document.addEventListener("DOMContentLoaded", () => {

    // Set the value of the "date" field
    const formDateTime = document.getElementById("datetime");
    const datetime = document.datetime;

    formDateTime.textContent = `Date and Time: ${datetime} `
    

    const links = document.querySelectorAll('.info-link');
    const modals = document.querySelectorAll('.modal');
    const closes = document.querySelectorAll('.close');

    if(links) {
    links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const modalId = link.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'block';
    });
    });

    }

    if(closes) {
    closes.forEach(close => {
    close.addEventListener('click', () => {
        close.closest('.modal').style.display = 'none';
    });
    });
    }

    if(modals) {
        window.addEventListener('click', e => {
        modals.forEach(modal => {
            if (e.target === modal) modal.style.display = 'none';
    });
    });
    }

})
