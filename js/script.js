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

// Функція для динамічного створення карток книг та їх додавання у DOM
function renderBooks(booksArray) {
    for (const book of booksArray) {
        const articleElement = document.createElement('article');

        const titleElement = document.createElement('h3'); 
        titleElement.textContent = book.title;

        const authorElement = document.createElement('p');
        authorElement.textContent = `автор: ${book.author}`;

        articleElement.dataset.pages = book.pages;
        
        if (book.finished === false) {
            articleElement.classList.add('unread');
        }
        
        articleElement.append(titleElement, authorElement);

        listContainer.append(articleElement);
    }
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

const countElement = document.querySelector('#books-count');
countElement.textContent = `Всього книг: ${books.length}`;






























