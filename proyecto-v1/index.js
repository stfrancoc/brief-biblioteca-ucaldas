const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory data
let books = [
    { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez', available: true },
    { id: 2, title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', available: true },
    { id: 3, title: 'El amor en los tiempos del cólera', author: 'Gabriel García Márquez', available: true },
    { id: 4, title: 'Rayuela', author: 'Julio Cortázar', available: true },
    { id: 5, title: 'Ficciones', author: 'Jorge Luis Borges', available: true }
];

let loans = [];

// 1. List books
app.get('/books', (req, res) => {
    res.json(books);
});

// 2. Create loans
app.post('/loans', (req, res) => {
    const { bookId, studentName } = req.body;

    if (!bookId || !studentName) {
        return res.status(400).json({ message: 'bookId and studentName are required' });
    }

    const book = books.find(b => b.id === parseInt(bookId));

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    if (!book.available) {
        return res.status(400).json({ message: 'Book is not available for loan' });
    }

    const newLoan = {
        id: loans.length + 1,
        bookId: book.id,
        bookTitle: book.title,
        studentName,
        loanDate: new Date(),
        status: 'active'
    };

    book.available = false;
    loans.push(newLoan);

    res.status(201).json(newLoan);
});

// 3. Return books
app.patch('/loans/:id/return', (req, res) => {
    const loanId = parseInt(req.params.id);
    const loan = loans.find(l => l.id === loanId);

    if (!loan) {
        return res.status(404).json({ message: 'Loan not found' });
    }

    if (loan.status === 'returned') {
        return res.status(400).json({ message: 'Book already returned' });
    }

    const book = books.find(b => b.id === loan.bookId);
    if (book) {
        book.available = true;
    }

    loan.status = 'returned';
    loan.returnDate = new Date();

    res.json({ message: 'Book returned successfully', loan });
});

// 4. Consult active loans
app.get('/loans/active', (req, res) => {
    const activeLoans = loans.filter(l => l.status === 'active');
    res.json(activeLoans);
});

app.listen(port, () => {
    console.log(`Library API listening at http://localhost:${port}`);
});
