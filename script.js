// changing tabs on hash

const sections = document.querySelectorAll('.section');

function showSectionFromHash() {
    const hash = window.location.hash.replace('#', '') || 'home-page';
    sections.forEach(s => s.style.display = s.id === hash ? 'block' : 'none');
}

window.addEventListener('hashchange', showSectionFromHash);
window.addEventListener('load', showSectionFromHash);


// form handling (Apps script)
const scriptURL = 'https://script.google.com/macros/s/AKfycby3vgRC4e4xoUUdt55SZ7xHk_7saQ31Sj-KAYqPjZnjiB7Xe4jqqFmgHGC6fD1ZIaRCAQ/exec';
const form = document.getElementById('contact-form');
const statusElement = document.getElementById('status');

form.addEventListener('submit', e => {
    e.preventDefault();
    statusElement.style.color = 'rgba(255, 255, 255, 0.6)';
    statusElement.textContent = 'Wysyłanie...';

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            console.log('Success!', response);
            statusElement.textContent = 'Wiadomość została wysłana!';
            statusElement.style.color = 'green';
            setTimeout(() => {
                statusElement.textContent = '';
            }, 8000);
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            statusElement.textContent = 'Błąd wysyłania wiadomości. Spróbuj ponownie.';
            statusElement.style.color = 'red';
            setTimeout(() => {
            statusElement.textContent = '';
            }, 8000);
        });
});