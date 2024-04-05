const { getAllArticles, createArticle } = require('../services/articleService');

const articleController = require('express').Router();


articleController.get('/', async (req, res) => {
    const articles = await getAllArticles();
    res.render('articles', {
        title: '- Articles',
        articles
    });
});

articleController.post('/', async (req,res) => {
    await createArticle(req.body.author, req.body.title, req.body.content)
    res.redirect('/articles');
})

module.exports = articleController;


// articles: [
        //     { 
        //         author: 'John',
        //         title: 'Eh 1',
        //         content: 'Static article 1'
        //     },
        //     {
        //         author: 'Mary',
        //         title: 'Lo 2',
        //         content: 'Static article 2'
        //     },
        // ]