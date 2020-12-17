const db = require("../../data/dbConfig");

const accountsMiddlware = async (req, res, next) => {
  const { method } = req;
  try {
    switch (method) {
      case "POST": {
        let { name, budget } = req.body;
        const [foundAccount] = await db("accounts").where({ name }).select("*");

        if (foundAccount) {
          return res.status(400).json({
            message: "The name of the given account already exists.",
          });
        }

        if (!name || !budget) {
          if (name === "") {
            return res.status(400).json({
              message: "You haven't entered a name for the account.",
            });
          }

          return res.status(400).json({
            message:
              "All the fields are required to be filled out in order to create an account.",
          });
        }

        break;
      }
      case "PUT": {
        const { id } = req.params;
        let { name, budget } = req.body;
        const [foundAccount] = await db("accounts").where({ id }).select("*");

        if (!name || !budget) {
          return res.status(400).json({
            message:
              "All the fields are required to be filled out in order to create an account.",
          });
        }

        if (!foundAccount) {
          return res.status(400).json({ message: "Account doesn't exist" });
        }
        break;
      }

      case "DELETE": {
        const { id } = req.params;

        const [foundAccount] = await db("accounts").where({ id }).select("*");

        if (!foundAccount) {
          return res.status(400).json({ message: "Account doesn't exist" });
        }

        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errorMessage: "Server Error",
    });
  }
  next();
};

module.exports = { accountsMiddlware };
