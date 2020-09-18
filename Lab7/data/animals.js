const mongoCollections = require("./collections");
const animals = mongoCollections.animals;
const mongo = require("mongodb");

module.exports = {
    async create(name, animalType, likes) {
        if (!name || typeof name != "string") 
        { 
            throw "You must provide a name for your animal";   
        }
    
        if (!animalType || typeof animalType != "string")
        {
            throw "You must provide a type for your animal in the form of a string";
        }

        /*if (!likes || !Array.isArray(likes))
        {
          throw "You must provide an array of strings or Object IDs for likes";
        }*/
        const animalCollection = await animals();
    
        let newAnimal = {
          name: name,
          animalType: animalType,
          likes: likes
        };
    
        const insertInfo = await animalCollection.insertOne(newAnimal);
        if (insertInfo.insertedCount === 0) 
        {
            throw "Could not add animal"
        }
    
        const newId = insertInfo.insertedId;
    
        const animal = await this.get(newId);
        return animal;
    },

    async getAll() 
    {
        const animalCollection = await animals();
        const posts = require("./posts");
        const animalsAll = await animalCollection.find({}).toArray();
        let authorPosts = [];

        for (let x = 0; x < animalsAll.length; x++)
        {
            authorPosts = await posts.getPostByAuthor(animalsAll[x]._id);
            animalsAll[x].posts = [];
            for (let y = 0; y < authorPosts.length; y++)
            {
                animalsAll[x].posts.push({_id: authorPosts[y]._id, title: authorPosts[y].title})
            }
        }
        return animalsAll;
    },

    async get(id)
    { 
        if (!id) 
        {
            throw "You must provide an id to search for"
        }
        const animalCollection = await animals();
        const animal = await animalCollection.findOne({ _id: mongo.ObjectId(id) });
        if (animal === null)
        {
            console.log("this is it");
            throw "No animal exists with that id"
        }

        return animal;
    }, 

    async remove(id)
    {
        posts = require("./posts");
        if (!id) 
        {
            throw "You must provide an id to search for"
        }
        const animalCollection = await animals();
        const result = await this.get(mongo.ObjectId(id));
        await posts.removeByAuthor(id);
        const deleteAnimal = await animalCollection.removeOne(result);
        if (deleteAnimal.deletedCount === 0)
        {
            throw `Could not delete animal with id of ${id}`
        }
        else
        {
            let real = {
                deleted: true,
                data: result
            };
            return real;
        }
    },

    async rename(id, newName) 
    {
        if (!id) 
        {
            throw "You must provide an id to search for"
        }
        if (!newName) 
        {
            throw "You must provide a new name to update to"
        }
        const animalCollection = await animals();
        const updatedAnimal = {
            $set: {name: newName}
          };
        const updateInfo = await animalCollection.updateOne({ _id: mongo.ObjectId(id) }, updatedAnimal);
        if (updateInfo.modifiedCount === 0)
        {
            throw "The animal does not exist and cannot be updated"
        }
        return await this.get(id);
    },

    async updateType(id, newType) 
    {
        if (!id) 
        {
            throw "You must provide an id to search for"
        }
        if (!newType) 
        {
            throw "You must provide a new type to update to"
        }
        const animalCollection = await animals();
        const updatedAnimal = {
            $set: {animalType: newType}
          };
        const updateInfo = await animalCollection.updateOne({ _id: mongo.ObjectId(id) }, updatedAnimal);
        if (updateInfo.modifiedCount === 0)
        {
            throw "The animal does not exist and cannot be updated"
        }
        return await this.get(id);
    },

    async like(animalId, postId) {
        if (!animalId) 
        {
        throw "You must provide the id of the animal liking the post"
        }
        if (typeof animalId !== "string" && typeof animalId !== "ObjectId") 
        {
        throw "The animal id must be a string or ObjectId"
        }
        if (animalId === undefined) 
        {
        throw "No animal id provided"
        }

        if (!postId) 
        {
        throw "You must provide the id of the post you want to like"
        }
        if (typeof postId !== "string" && typeof postId !== "ObjectId") 
        {
        throw "The post id must be a string or ObjectId"
        }
        if (postId === undefined)
        {
        throw "no post id provided";
        }

        const animalCollection = await animals();

        return animalCollection.update({ _id: animalId }, { $addToSet: { likes: postId } }).then(function()
        {
            return exports.get(animalId);
        });
    },

    async unlike(animalId, postId) {
        if (!animalId) 
        {
        throw "You must provide the id of the animal liking the post"
        }
        if (typeof animalId !== "string" && typeof animalId !== "ObjectId") 
        {
        throw "The animal id must be a string or ObjectId"
        }
        if (animalId === undefined) 
        {
        throw "No animal id provided"
        }

        if (!postId) 
        {
        throw "You must provide the id of the post you want to like"
        }
        if (typeof postId !== "string" && typeof postId !== "ObjectId") 
        {
        throw "The post id must be a string or ObjectId"
        }
        if (postId === undefined)
        {
        throw "no post id provided";
        }

        const animalCollection = await animals();

        return animalCollection.update({ _id: animalId }, { $pull: { likes: postId } }).then(function()
        {
            return exports.get(animalId);
        });
    }
};