console.log('script.js підключено');

const books = [
    { title: "C# in Depth", author: "Джон Скіт", pages: 528, finished: true },
    { title: "Python Crash Course", author: "Ерік Матез", pages: 544, finished: false },
    { title: "Dune", author: "Френк Герберт", pages: 896, finished: false },
    { title: "The Martian", author: "Енді Вір", pages: 369, finished: true },
    { title: "1984", author: "Джордж Орвелл", pages: 328, finished: false },
    { title: "A Game of Thrones", author: "Джордж Р. Р. Мартін", pages: 835, finished: true },
    { title: "American Gods", author: "Ніл Ґейман", pages: 632, finished: false },
    { title: "The Shining", author: "Стівен Кінг", pages: 659, finished: false },
    { title: "Atomic Habits", author: "Джеймс Клір", pages: 320, finished: true },
    { title: "Educated", author: "Тара Вестовер", pages: 352, finished: true }
];

const staticCards = document.querySelectorAll('#books-list article');

for (const card of staticCards) {
    card.remove();
}

const listContainer = document.querySelector('#books-list');

function renderBooks(booksArray) {
    listContainer.innerHTML = '';

    booksArray.forEach((book, index) => {
        const articleElement = document.createElement('article');

        const titleElement = document.createElement('h3');
        titleElement.textContent = book.title;

        const authorElement = document.createElement('p');
        authorElement.textContent = `автор: ${book.author}`;

        const pagesElement = document.createElement('p');
        pagesElement.textContent = `сторінок: ${book.pages}`;

        const statusSelect = document.createElement('select');
        statusSelect.classList.add('status-select');
        statusSelect.dataset.index = index;
        statusSelect.setAttribute('aria-label', `Статус книги ${book.title}`);
        statusSelect.append(new Option('Читаю', 'reading'), new Option('Прочитано', 'finished'));
        statusSelect.value = book.finished ? 'finished' : 'reading';

        articleElement.dataset.pages = book.pages;

        if (book.finished === false) {
            articleElement.classList.add('unread');
        }

        articleElement.append(titleElement, authorElement, pagesElement, statusSelect);
        listContainer.append(articleElement);
    });
}
console.log(books);

// Підраховує загальну суму сторінок лише для тих книг, які вже прочитані (finished === true)
function calculateReadPages(booksArray) {
    let totalReadPages = 0;

    for (let i = 0; i < booksArray.length; i++) {
        if (booksArray[i].finished === true) {
            totalReadPages += booksArray[i].pages;
        }
    }
    console.log(`Всього прочитано сторінок: ${totalReadPages}`);
}

calculateReadPages(books);

// Перебирає масив книг та виводить статус прочитання для кожної, позначаючи непрочитані
function classifyBooks(booksArray) {
    console.log("--- Статус прочитання книг ---");
    
    for (const book of booksArray) {
        const statusLabel = book.finished === false ? 'Ще не прочитано' : 'Прочитано';

        console.log(`Книга "${book.title}" — ${statusLabel}`);
    }
}

classifyBooks(books);

// Розраховує необхідну кількість сторінок для читання на день, округлюючи до цілого
const pagesPerDay = (pages, days) => Math.round(pages / days);

const targetDays = 14;
const result = pagesPerDay(books[0].pages, targetDays);

console.log(`--- Розрахунок темпу читання ---`);
console.log(`Щоб прочитати "${books[0].title}" за ${targetDays} днів, треба читати ${result} сторінок на день.`);

renderBooks(books);
updateStats();

// Оновлює статистику в aside: всього книг, прочитано та читаю
function updateStats() {
    const readCount = books.filter(book => book.finished).length;
    const readingCount = books.length - readCount;

    document.querySelector('#books-count').textContent = `Всього книг: ${books.length}`;
    document.querySelector('#read-count').textContent = `Прочитано: ${readCount}`;
    document.querySelector('#reading-count').textContent = `Читаю: ${readingCount}`;
}

const form = document.querySelector('#book-form');

const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const pagesInput = document.querySelector('#book-pages');
const statusInput = document.querySelector('#book-status');
const authorError = document.querySelector('#author-error');

// Обробник надсилання форми: додає нову книгу в масив і перемальовує список без перезавантаження
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = Number(pagesInput.value);
    const finished = statusInput.value === 'finished';
    
    const newBook = { title, author, pages, finished };
    books.push(newBook);
    console.log('Додано книгу:', newBook);
    renderBooks(books);
    updateStats();
    form.reset();
    authorError.textContent = '';
});

// Додаткова валідація поля «Автор»: забороняє цифри та показує власне повідомлення
authorInput.addEventListener('input', () => {
    const message = authorInput.validity.patternMismatch
        ? 'Ім’я автора не повинно містити цифр'
        : '';

    authorInput.setCustomValidity(message);
    authorError.textContent = message;
});

// Делегування події change: зміна статусу книги прямо в картці та оновлення лічильника
listContainer.addEventListener('change', (event) => {
    if (!event.target.classList.contains('status-select')) {
        return;
    }

    const index = Number(event.target.dataset.index);
    books[index].finished = event.target.value === 'finished';

    event.target.closest('article').classList.toggle('unread', !books[index].finished);
    updateStats();
});


























