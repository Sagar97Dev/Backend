const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');

// Create a new article
router.post('/addArticles', articleController.createArticle);

// Get all articles
router.get('/getAllarticles', articleController.getAllArticles);

// Get an article by slug
router.get('/getSinglearticles/:id', articleController.getArticleBySlug);

// Update an article by slug
router.patch('/updateArticles/:id', articleController.updateArticleBySlug);

// Delete an article by slug
router.delete('/deleteArticles/:id', articleController.deleteArticleBySlug);

// Search articles
router.get('/search', articleController.searchArticles);

module.exports = router;
