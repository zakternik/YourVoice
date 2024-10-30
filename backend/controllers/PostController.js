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
