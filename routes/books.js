const express = require('express');
const Book = require('../models').Book;
const router = express.Router();
const createError = require('http-errors');

const {Op} = require('sequelize');

// Route handler
const asyncHandler = (cb) =>  {
    return async(req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error) {
            next(error);
        }
    }
}
// get route that shows all of the books
router.get('/',  asyncHandler (async (req, res) => {
        const books =await Book.findAndCountAll({
            limit: 10
        });   
        const maxPages = Math.ceil(books.count/10) 
        res.render('index', {books: books.rows, maxPages});
}))

// Get route for new page
router.get('/new',  (req, res) => {
    res.render('new-book');
})
// Search route
router.get('/search' , asyncHandler( async (req, res) => {
    const query = String(req.query.search);
    const books = await Book.findAndCountAll({
        where: {
            [Op.or] :[
                {
                    title: {
                        [Op.like]: `%${query}%`
                    }
                },
                {
                    author: {
                        [Op.like]: `%${query}%`
                    }
                },
                {
                    genre: {
                        [Op.like]: `%${query}%`
                    }
                },
                {
                    year: {
                        [Op.like]: `%${query}%`
                    }
                },
            ]
            }
        })
    res.render('index' , {books: books.rows})
}));

// Post route got  new page
router.post('/new',  asyncHandler( async (req, res) => {
    let book;
    try {
        book = await Book.create(req.body);
        res.redirect('/')
    } catch (error) {
        if(error.name === "SequelizeValidationError"){
        // render the update page with the error messages for the user to add in the required fields
            book = await Book.build(req.body);
            res.render('new-book', {book, error})
        }else {
            console.log(error)
            throw error 
        }
    }
}))
// Get route for update page
router.get('/:id',  asyncHandler( async (req, res) => {
    const id = req.params.id
    const book = await Book.findByPk(id);
    // If book is not found, throw interal server error (500)
    try {
        if(book) {
            res.render('update-book', {book, id});
        } else {
            const error = createError(500, 'The project you are looking for does not exist.')
            throw error 
        }
        
    } catch (error) {
        // global error handler will handle the error 
        next(error);
        
    }
}))

// Post route for update page
router.post('/:id', asyncHandler(async (req, res) => {
    let book;
    const id = req.params.id;
    try {
        book = await Book.findByPk(id);
        await book.update(req.body);
        // Go back to the main page after updating
        res.redirect('/');
    } catch (error) {
        // render the update page with the error messages for the user to add in the required fields
        if(error.name === "SequelizeValidationError"){
            book = await Book.build(req.body);
            res.render('update-book', {book, error, id})
        }else {
            throw error 
        }
    }
}))
// Delete route
router.post('/:id/delete', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const book = await Book.findByPk(id);
    await book.destroy();
    res.redirect('/');
}))

// Pagination routes
router.get('/page/:number', asyncHandler(async (req, res) => {
    const pageNumber = req.params.number;
    // 10 books per page
    const books =await Book.findAndCountAll({
        limit:10,
        offset: 10*(pageNumber-1)
    });    
    const maxPages = Math.ceil(books.count/10) 
    res.render('index', {books: books.rows, maxPages});
}))



module.exports = router;