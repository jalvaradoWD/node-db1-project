const db = require("../../data/dbConfig");

const getAccounts = async (req, res) => {
  const results = await db("accounts").select("*");

  return res.status(200).json(results);
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
