const controller = {}
const models = require('../models')
const { Sequelize } = require('sequelize');

controller.showList = async (req,res) =>{
    page = isNaN(req.query.page) ? 0 : parseInt(req.query.page) - 1;

    const blogs= await models.Blog.findAll({
        attributes: ["id", "title", "imagePath", "summary","createdAt"],
        include: [{model: models.Comment}]
    })
    res.locals.categories = await models.Category.findAll({
        attributes:["id","name"],
        include: [{model: models.Blog}]
    })
    res.locals.tags = await models.Tag.findAll({
        attributes:["id","name"]
    })

    res.locals.blogs = blogs
    res.locals.page_start = 2*page;
    res.locals.page_end = 2*page + 2;
    res.locals.length_page = Math.ceil(blogs.length / 2)

    res.render("index")
}

controller.showCategoryBlog = async (req,res) =>{
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    page = isNaN(req.query.page) ? 0 : parseInt(req.query.page) - 1;

    const blogs = await models.Blog.findAll({
        attributes: ["id", "title", "imagePath", "summary","createdAt"],
        where:{
            categoryId: id,
        },
        include: [{model: models.Comment}]
    })
    res.locals.categories = await models.Category.findAll({
        attributes:["id","name"],
        include: [{model: models.Blog}]
    })
    res.locals.tags = await models.Tag.findAll({
        attributes:["id","name"]
    })

    res.locals.blogs = blogs
    res.locals.page_start = 2*page;
    res.locals.page_end = 2*page + 2;
    res.locals.length_page = Math.ceil(blogs.length / 2)

    res.render("index")
}

controller.showTagBlog = async (req,res) =>{
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    page = isNaN(req.query.page) ? 0 : parseInt(req.query.page) - 1;

    const blogs = await models.Blog.findAll({
        attributes: ["id", "title", "imagePath", "summary","createdAt"],
        include: [
            {model: models.Comment},
            {
                model: models.Tag,
                where: { id: id },
                through: { attributes: [] },
            },
        ]
    })
    res.locals.categories = await models.Category.findAll({
        attributes:["id","name"],
        include: [{model: models.Blog}]
    })
    res.locals.tags = await models.Tag.findAll({
        attributes:["id","name"]
    })

    res.locals.blogs = blogs
    res.locals.page_start = 2*page;
    res.locals.page_end = 2*page + 2;
    res.locals.length_page = Math.ceil(blogs.length / 2)

    res.render("index")
}

controller.showSearchResult = async (req,res) =>{
    let search = req.params.search;
    page = isNaN(req.query.page) ? 0 : parseInt(req.query.page) - 1;

    const blogs = await models.Blog.findAll({
        attributes: ["id", "title", "imagePath", "summary","createdAt"],
        where:{
            title: {
                [Sequelize.Op.like]: `%${search}%`,
              },
        },
        include: [
            {model: models.Comment},
        ]
    })
    res.locals.categories = await models.Category.findAll({
        attributes:["id","name"],
        include: [{model: models.Blog}]
    })
    res.locals.tags = await models.Tag.findAll({
        attributes:["id","name"]
    })

    res.locals.blogs = blogs
    res.locals.page_start = 2*page;
    res.locals.page_end = 2*page + 2;
    res.locals.length_page = Math.ceil(blogs.length / 2)

    res.render("index")
}

controller.showDetails = async(req, res) => {
    let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
    res.locals.blog = await models.Blog.findOne({
        attributes: ['id', 'title', 'description', 'createdAt'],
        where: { id: id },
        include: [
            { model: models.Category },
            { model: models.User },
            { model: models.Tag },
            { model: models.Comment }
        ]
    })
    res.locals.categories = await models.Category.findAll({
        attributes:["id","name"],
        include: [{model: models.Blog}]
    })
    res.locals.tags = await models.Tag.findAll({
        attributes:["id","name"]
    })
    res.render('details');
}

module.exports = controller