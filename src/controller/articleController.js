const Article = require('../model/articleModel');
const slugify = require('slugify');

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    // Check if an article with the same title already exists
    const existingArticle = await Article.findOne({ title: req.body.title });
    if (existingArticle) {
      return res.status(400).send({ error: 'Article with this title already exists' });
    }

    // Create new Article instance with validated fields
    const article = new Article({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    });

    // Save the article to the database
    await article.save();

    // Respond with the saved article
    res.status(201).send(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(400).send(error);
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.send(articles);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get an article by slug
exports.getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params_id });
    if (!article) {
      return res.status(404).send();
    }
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an article by slug
exports.updateArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { slug: req.params._id
       },
      req.body,
      { new: true, runValidators: true }
    );
    if (!article) {
      return res.status(404).send();
    }
    res.send(article);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an article by slug
exports.deleteArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ slug: req.params._id });
    if (!article) {
      return res.status(404).send();
    }
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Search articles
exports.searchArticles = async (req, res) => {
  try {
    const { query, category } = req.query;
    const filter = {};
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ];
    }
    if (category) {
      filter.category = category;
    }
    const articles = await Article.find(filter).sort({ createdAt: -1 });
    res.send(articles);
  } catch (error) {
    res.status(500).send(error);
  }
};
