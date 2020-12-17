const db = require("../../data/dbConfig");

const getAccounts = async (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    /**
     * Expected queries
     * id
     * orderBy = "column,[asc||desc]",
     * limit
     */
    const { id, orderBy, limit } = req.query;
    let requestedCall = db("accounts").select("*");

    id ? (requestedCall = requestedCall.where({ id })) : null;
    if (orderBy) {
      const [column, func] = orderBy.split(",");
      requestedCall = requestedCall.orderBy(column, func);
    }
    limit ? (requestedCall = requestedCall.limit(limit)) : null;

    const results = await requestedCall;

    return res.status(200).json(results);
  } else {
    let results = await db("accounts").select("*");
    return res.status(200).json(results);
  }
};

const createAccount = async (req, res) => {
  /**
   * Required Fields
   * ================
   * name
   * budget
   */

  const createdAccount = req.body;
  await db("accounts").insert(createdAccount);
  return res.status(200).json(createdAccount);
};

const updateAccount = async (req, res) => {
  /**
   * Required Fields
   * ================
   * Name
   * Budget
   */

  const { id } = req.params;
  const updatedAccount = req.body;

  await db("accounts").where({ id }).update(req.body);
  return res.status(200).json(updatedAccount);
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;

  await db("accounts").where({ id }).del();
  return res.status(200).json({ message: "Account deleted" });
};

module.exports = {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
};
