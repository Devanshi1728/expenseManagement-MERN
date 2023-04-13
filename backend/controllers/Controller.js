const model = require("../models/model");

//  post: http://localhost:8080/api/categories
async function create_Categories(req, res) {
  try {
    const existingData = await model.Categories.find({});
    let data;
    if (existingData.length === 0) {
      data = new model.Categories({
        type: "Investment",
        color: "#FCBE44",
      });
    } else {
      const { type, color } = req.body;
      data = await new model.Categories({
        type,
        color,
      });
    }
    data.save();
    return res.json({ message: "Created Successfully", data: data });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Error while creating categories ${error}` });
  }
}

//  get: http://localhost:8080/api/categories
async function get_Categories(req, res) {
  let data = await model.Categories.find({});
  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );
  return res.json(filter);
}

//  post: http://localhost:8080/api/transaction
async function create_Transaction(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { name, type, amount, accType } = req.body;

  const create = await new model.Transaction({
    name,
    type,
    amount,
    accType,
    date: new Date(),
  });

  create.save();
  return res.json(create);
}

//  get: http://localhost:8080/api/transaction
async function get_Transaction(req, res) {
  let data = await model.Transaction.find({});
  return res.json(data);
}

//  delete: http://localhost:8080/api/transaction
async function delete_Transaction(req, res) {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: "Request body not Found" });
    const data = await model.Transaction.findByIdAndRemove(id);
    if (data) {
      res.status(200).json({
        data: data,
        message: "Transaction deleted successfuly",
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

//  get: http://localhost:8080/api/labels
async function get_Labels(req, res) {
  model.Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info["color"],
            date: v.date,
            accType: v.accType,
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json({ message: error || "Lookup Collection Error" });
    });
}

module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
};
