let title = document.querySelector('#title');
let subtitle = title.nextElementSibling;

let days_before_zelda = function() {
    let today = new Date();
    let zelda = new Date(2023, 5, 12);
    let diff = zelda - today;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24)) - 30; // jsp pourquoi faut enlever 30
    title.innerHTML = days + ' days';
    subtitle.innerText = 'before Zelda Tears of the Kingdom is out!\nA bit more patience...';
    if (days <= 0) {
        title.innerHTML = 'Timer up !';
        subtitle.innerHTML = 'Zelda Tears of the Kingdom is out!';
    }
};

days_before_zelda();