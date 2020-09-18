const mongoCollections = require("./collections");
const posts = mongoCollections.posts;
const animals = require("./animals");
const uuid = require("node-uuid");
const mongo = require("mongodb");

module.exports = {
    async addPost(title, author, content) {
        if (!title || typeof title != "string") 
        { 
            throw "You must provide a title for your post in the form of a string";
        }
        if (!author || typeof author != "string")
        {
          throw "You must provide an author for your post in the form of a string";
        }
        if (!content || typeof content != "string")
        {
          throw "You must provide content for your post in the form of a string";
        }
        const postCollection = await posts();
    
        let newPost = {
          title: title,
          content: content,
          author: author,
        };
    
        const insertInfo = await postCollection.insertOne(newPost);
        if (insertInfo.insertedCount === 0) 
        {
            throw "Could not add post"
        }
    
        const newId = insertInfo.insertedId;
        const post = await this.getPostById(newId);

        return post;
    },

    async getPostById(id)
    {
        if (!id) 
        {
            throw "You must provide an id to search for"
        }
        let authorId;
        let authorName;

        const postCollection = await posts();
        const post = await postCollection.findOne({ _id: mongo.ObjectId(id) });
        if (post === null)
        {
            throw "No post exists with that id"
        }
        authorId = post.author;
        authorName = await animals.get(authorId);
        post.author = {_id: authorName._id, name: authorName.name};
        return post;
    },

    async getPostByTitle(titleName) {
        if (!titleName)
        {
            throw "You must provide an id to search for"
        }
    
        const postCollection = await posts();
        const post = await postCollection.find({ title: titleName }).toArray();
        if (post === null)
        {
            throw "No post exists with that author"
        }
        return post;
      },

      async getPostByAuthor(authorName) {
        if (!authorName)
        {
            throw "You must provide an id to search for"
        }
        
        const postCollection = await posts();
        const post = await postCollection.find({ author: String(authorName) }).toArray();
        if (post === null)
        {
            throw "No post exists with that author"
        }
        return post;
      },

    async getAllPosts() 
    {
        const postCollection = await posts();
        const postsAll = await postCollection.find({}).toArray();
        let authorId;
        let authorName;

        for (let x = 0; x < postsAll.length; x++)
        {
            authorId = postsAll[x].author;
            authorName = await animals.get(authorId);
            postsAll[x].author = {_id: authorName._id, name: authorName.name};
        }
        return postsAll;
    },

  async removeById(id) {
    if (!id)
    {
        throw "You must provide an id to search for";
    }
    const postCollection = await posts();
    const thePost = await this.getPostById(id);
    const deletionInfo = await postCollection.removeOne({ _id: mongo.ObjectId(id) });
    if (deletionInfo.deletedCount === 0) 
    {
      throw `Could not delete post with id of ${id}`;
    }
    let result = {"deleted": true, "data": thePost};
    return result;
  },

  async removeByAuthor(authorId) {
    if (!authorId)
    {
        throw "You must provide an id or string to search for";
    }
    const deletePosts = await this.getPostByAuthor(String(authorId));
    for (let x = 0; x < deletePosts.length; x++) 
    {
        await this.removeById(deletePosts[x]._id);
    }
  },

  async updateTitle(id, newTitle) {
    if (!id)
    {
    throw "You must provide an id to search for";
    }

    if (!newTitle)
    {
    throw "You must provide a new title for the post";
    }

    const postCollection = await posts();
    const postUpdate = {
        $set: { title: newTitle }
    };
    
    const updatedInfo = await postCollection.updateOne({ _id: mongo.ObjectId(id) }, postUpdate);
    if (updatedInfo.modifiedCount === 0) 
    {
        throw "The post title wasn't changed";
    }

    return await this.getPostById(id);
    },

    async updateContent(id, newContent) {
        if (!id)
        {
        throw "You must provide an id to search for";
        }

        if (!newContent)
        {
        throw "You must provide new content for the post";
        }

        const postCollection = await posts();
        const postUpdate = {
            $set: { content: newContent }
        };
        
        const updatedInfo = await postCollection.updateOne({ _id: mongo.ObjectId(id) }, postUpdate);
        if (updatedInfo.modifiedCount === 0) 
        {
            throw "The post content wasn't changed";
        }

        return await this.getPostById(id);
    }
}
