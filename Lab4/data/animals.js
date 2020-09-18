const mongoCollections = require("./mongoCollections");
const animals = mongoCollections.animals;
const mongo = require("mongodb");

module.exports = {
    async create(name, animalType) {
        if (!name) 
        { 
            throw "You must provide a name for your animal";
        }
    
        if (!animalType || typeof animalType != "string")
        {
          throw "You must provide a type for your animal in the form of a string";
        }
        const animalCollection = await animals();
    
        let newAnimal = {
          name: name,
          animalType: animalType
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
        const animalsAll = await animalCollection.find({}).toArray();
        return animalsAll;
    },

    async get(id)
    { 
        if (!id) 
        {
            throw "You must provide an id to search for"
        }
        const animalCollection = await animals();
        const animal = await animalCollection.findOne({ _id: id });
        if (animal === null)
        {
            throw "No animal exists with that id"
        }

        return animal;
    }, 

    async remove(id)
    {
        if (!id) 
        {
            throw "You must provide an id to search for"
        }
        const animalCollection = await animals();
        const result = await this.get(mongo.ObjectId(id));
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
            throw "You must provide a name to search for"
        }
        const animalCollection = await animals();
        const animal = await this.get(id);
        const updatedAnimal = {
            $set: {name: newName}
          };
        const updateInfo = await animalCollection.updateOne({ _id: id }, updatedAnimal);
        if (updateInfo.modifiedCount === 0)
        {
            throw "The animal does not exist and cannot be updated"
        }
        return await this.get(id);
    }
};