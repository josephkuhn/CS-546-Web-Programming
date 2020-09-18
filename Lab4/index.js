const animals = require("./data/animals");
const connection = require("./data/mongoConnection");

const main = async () => {
  const sasha = await animals.create("Sasha", "Dog");
  console.log("Sasha the dog has been added.");
  console.log(sasha);
  const lucy = await animals.create("Lucy", "Dog");
  console.log("Lucy the dog has been added.");
  let all = await animals.getAll();
  console.log(all);
  const duke = await animals.create("Duke", "Walrus");
  console.log("Duke the walrus has been added.");
  console.log(duke);
  const sashita = await animals.rename(sasha._id, "Sashita");
  console.log("Sasha has been renamed to Sashita.");
  console.log(sashita);
  await animals.remove(lucy._id);
  console.log("Lucy has been removed.");
  all = await animals.getAll();
  console.log(all);
};

main().catch(error => {
  console.log(error);
});