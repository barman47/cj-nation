const express = require('express');
const router = express.Router();
const passport = require('passport');
const crypto = require('crypto');
// const multer = require('multer');

const Post = require('../../models/Post');
const validateAddPost = require('../../utils/validation/addPost');
const validateCommentInput = require('../../utils/validation/addComment');

// const upload = multer({
//     dest: 'uploads',
//     limits: {
//         fileSize: 100000000
//     },
//     fileFilter: (req, file, callback) => {
//         if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp3|mp4|docx|pdf)$/i)){
//             return callback(new Error('File not supported for upload. Supported uploads includes (.docx, .pdf, .mp3 .mp4, .jpg, .png, .gif) only.'));
//         }
//         callback(undefined, true);
//     }
// });

router.get('/all', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => {
            res.json(posts);
        })
        .catch(err => console.log(err));
});

router.get('/homepagePosts', (req, res) => {
    Post.find()
        .limit(8)
        .sort({ date: -1 })
        .then(posts => {
            res.json(posts);
        })
        .catch(err => console.log(err));
});

router.post('/addPost', passport.authenticate('jwt', { session: false }), /*upload.single('file'),*/ (req, res) => {
    const { errors, isValid } = validateAddPost(req.body);

    // console.log(req.file);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const file = req.files.file;
    console.log(file);

    file.mv(`${__dirname}../../../client/public/uploads/${file.name}`, err => {
        if(err){
            console.log(err);
            return res.status(500).json({ msg: 'Upload Failed.' });
        }

        const post = new Post({
            user: req.user,
            text: req.body.text,
            title: req.body.title,
            type: req.body.type,
            mimeType: file.mimetype,
            url: file.name
        });
    
        post.save()
            .then(createdPost => {
                const post = {
                    id: createdPost.id,
                    user: createdPost.user,
                    text: createdPost.text,
                    url: createdPost.url,
                    title: createdPost.title,
                    type: createdPost.type,
                    likes: createdPost.likes,
                    comments: createdPost.comments,
                    date: createdPost.date
                };
            
                res.json({ ...post, msg: 'Successfully Added Post', fileName: createdPost.url, filePath: `/uploads/${file.name}` });
            })
            .catch(err => console.log(err));
    });
});

router.put('/:postID', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateAddPost(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Post.findByIdAndUpdate(req.params.postID, {$set: {
        text: req.body.text,
        image: req.body.image || undefined,
        audio: req.body.audio || undefined,
        video: req.body.video || undefined
    }}, { new: true }, (err, updatedPost) => {
        if (err) {
            return console.log(err);
        }
        const post = {
            id: updatedPost.id,
            user: updatedPost.user,
            text: updatedPost.text,
            image: updatedPost.image,
            audio: updatedPost.audio,
            video: updatedPost.video,
            file: updatedPost.file,
            likes: updatedPost.likes,
            comments: updatedPost.comments,
            date: updatedPost.date
        };
        res.json({ ...post, msg: 'Post Updated' });
    });
});

router.delete('/:postID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findOneAndDelete({ id: req.params.postID })
        .then(() => res.json({ msg: 'Post Deleted Successfully' }))
        .catch(err => console.log(err));
});

// // @route POST api/posts/like/:id
// // @desc Like Post
// // @access Public
// router.post('/like/:postID/:userID', (req, res) => {
//     Post.findById(req.params.postID)
//         .then(post => {
//             if (post) {
//                 if(post.likes.filter(like => like.userID.toString() === req.params.userID).length > 0) {
//                     return res.status(400).json({ msg: 'User already liked this post' });
//                 }
//                 const newLike = {
//                     userID: req.params.userID
//                 };

//                 post.likes.unshift(newLike);
//                 post.save().then(post => res.json(post)).catch(err => console.log(err));
//             }
//         })
//         .catch(err => console.log(err))
// });

// // @route POST api/posts/unlike/:id
// // @desc Unlike Post
// // @access Private
// router.post('/unlike/:postID/:userID', (req, res) => {
//     Post.findById(req.params.postID)
//         .then(post => {
//             for (var i = 0; i < post.likes.length; i++) {
//                 if (post.likes[i].userID === req.params.userID.toString()) {
//                     const removeIndex = post.likes.map(like => like.userID === req.params.userID.toString()).indexOf(req.params.userID);
//                     post.likes.splice(removeIndex, 1);
//                     console.log('post unliked');
//                     post.save().then(post => {
//                         return res.status(200).json(post)
//                     });
//                     break;
//                 }
//             }

//             res.status(400).json({ alreadyliked: 'User has not liked this post' });
            
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(404).json({ postnotfound: 'No post found' });
//         });
// });

// // @route POST api/posts/comment/:id
// // @desc Add a comment to post
// // @access Private
router.post('/comment/:postID', (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    // Check Validation
    if(!isValid) {
        // if any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    Post.findById(req.params.postID)
        .then(post => {
            const newComment = {
                text: req.body.text,
                user: req.body.user
            };

            // Add comments to array
            post.comments.unshift(newComment);

            // Save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
});

// // @route DELETE api/posts/comment/:id/:comment_id
// // @desc Add a remove comment from post
// // @access Private
// router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
//     Post.findById(req.params.id)
//         .then(post => {
//             // Check if comment exists
//             if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
//                 return res.status(404).json({ commentnotexists: 'Comment does not exist.' });
//             }
//             // Get remove index
//             const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

//             // Splice comment out of array
//             post.comments.splice(removeIndex, 1);
//             post.save().then(post => res.json(post));
//         })
//         .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
// });
module.exports = router;