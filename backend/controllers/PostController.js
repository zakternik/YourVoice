var PostModel = require('../models/PostModel');

/**
 * PostController.js
 *  
 *  
 * @description :: Server-side logic for managing Posts.
 */

module.exports = {

    list: function (req, res) {
        PostModel.find(function (err, Posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post.',
                    error: err
                });
            }
            return res.json(Posts);
        });
    },

    show: function (req, res) {
        var id = req.params.id;

        PostModel.findOne({_id: id}, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post.',
                    error: err
                });
            }

            if (!Post) {
                return res.status(404).json({
                    message: 'No such Post'
                });
            }

            return res.json(Post);
        });
    },

    create: function (req, res) {
        var newPost = new PostModel({
            title : req.body.title,
            content : req.body.content,
            category : req.body.category,
            // author : req.session.userId,
        });

        newPost.save(function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Post',
                    error: err
                });
            }
            return res.status(201).json(Post);
        });
    },

    update: function (req, res) {
        var id = req.params.id;

        PostModel.findOne({_id: id}, function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting post',
                    error: err
                });
            }

            if (!post) {
                return res.status(404).json({
                    message: 'No such post'
                });
            }

            post.title = req.body.title ? req.body.title : post.title;
            post.content = req.body.content ? req.body.content : post.content;
            post.category = req.body.category ? req.body.category : post.category;

            post.save(function (err, post) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating post.',
                        error: err
                    });
                }

                return res.json(post);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;

        PostModel.findByIdAndRemove(id, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Post.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
