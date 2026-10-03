console.log('script.js підключено');

const books = [
    { title: "C# in Depth", pages: 528, finished: true },           
    { title: "Python Crash Course", pages: 544, finished: false },  
    { title: "Dune", pages: 896, finished: false },                 
    { title: "The Martian", pages: 369, finished: true },           
    { title: "1984", pages: 328, finished: false },              
    { title: "A Game of Thrones", pages: 835, finished: true },   
    { title: "American Gods", pages: 632, finished: false },    
    { title: "The Shining", pages: 659, finished: false },    
    { title: "Atomic Habits", pages: 320, finished: true },    
    { title: "Educated", pages: 352, finished: true }    
];

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

