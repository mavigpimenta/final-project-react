const { Post } = require('../models/post');
const { User } = require('../models/user')

class PostController {
    static async getAll(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit; 
    
        try {
            const posts = await Post.find({ removedAt: null })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('userId', 'name')
                .populate({
                    path: 'comments',
                    match: { removedAt: null },
                    options: { limit: 2 }, 
                    populate: { path: 'userId', select: 'name' }
                })
                .exec();

            const postsWithComments = posts.map(post => {
                 if (!post.comment) {
                    post.comment = []; 
                 }
                return post;
            });
    
            const totalPosts = await Post.countDocuments({ removedAt: null }); 
    
            return res.status(200).json({
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                totalPosts,
                posts: postsWithComments
            });
        } catch (error) {
            return res.status(500).send({ message: "Failed to retrieve posts", data: error.message });
        }
    }
    
    static async getByTitle(req, res) {
        const { title } = req.query; 
    
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit; 
    
        try {
            let query = { removedAt: null };
    
            if (title) {
                query = {
                    $or: [
                        { title: new RegExp(title, 'i'), removedAt: null },
                        { userId: { $in: await User.find({ name: new RegExp(title, 'i') }).distinct('_id') } },
                    ]
                };
            }
    
            const posts = await Post.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('userId', 'name')
                .populate({
                    path: 'comments',
                    match: { removedAt: null },
                    options: { limit: 2 }, 
                    populate: { path: 'userId', select: 'name' }
                })
                .exec();
    
            const totalPosts = await Post.countDocuments(query);
    
            return res.status(200).json({
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                totalPosts,
                posts
            });
        } catch (error) {
            return res.status(500).send({ message: "Failed to search posts", data: error.message });
        }
    }
    
    
    static async getById(req, res) {
        const { id } = req.params; 
    
        if (!id)
            return res.status(400).send({ message: "Post ID is required" });
    
        try {
            const post = await Post.findById(id)
                .populate('userId', 'name')
                .populate({
                    path: 'comments',
                    match: { removedAt: null },
                    populate: { path: 'userId', select: 'name' }
                })
                .exec();
    
            if (!post) {
                return res.status(404).send({ message: "Post not found" });
            }
    
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).send({ message: "Failed to retrieve post", data: error.message });
        }
    }
    
    static async create(req, res) {
        const { title, description } = req.body;

        if (!title || !description)
            return res.status(400).send({ message: "There is incomplete information" });

        try {
            const id = req.user?.id;
            const userId = await User.findById(id);
            console.log('User ID from token:', userId);

            const post = {
                comments: [],
                userId,
                title,
                description,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            };

            await Post.create(post);
            return res.status(201).send({ message: "Created post wit sucessfully" });
        } catch (error) {
            return res.status(500).send({ error: "Something wrong", data: error.message });
        }
    }

    static async edit(req, res) {
        const { id } = req.params; 
        const { title, description } = req.body;

        if (!title || !description)
            return res.status(400).send({ message: "There is incomplete information" });

        try {
            const post = await Post.findById(id);
            if (!post) 
                return res.status(404).send({ message: "Post not found" });

            if (post.userId.id !== req.user.id) 
                return res.status(403).send({ message: "You are not authorized to edit this comment." });

            post.title = title;
            post.description = description;
            post.updatedAt = Date.now();

            await post.save();
            return res.status(200).send({ message: "Updated post with sucessfully." });
        } catch (error) {
            return res.status(500).send({ error: "Something wrong", data: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        try {
            const post = await Post.findById(id);
            if (!post) return res.status(404).send({ message: "Post not found" });

            if (req.user.role !== 'ADMIN') 
                return res.status(403).send({ message: "Forbbiden" });
            
            post.removedAt = Date.now();
            await post.save();

            return res.status(200).send({ message: "Deleted post with sucessfully" });
        } catch (error) {
            return res.status(500).send({ error: "Something wrong", data: error.message });
        }
    }
}

module.exports = PostController;
