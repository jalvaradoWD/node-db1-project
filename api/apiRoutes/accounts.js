const router = require("express").Router();

const {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} = require("../actions/accounts.actions");

const { accountsMiddlware } = require("../middleware/accounts.middleware");

router.get("/", accountsMiddlware, getAccounts);

router.post("/", accountsMiddlware, createAccount);

router.put("/:id", accountsMiddlware, updateAccount);

router.delete("/:id", accountsMiddlware, deleteAccount);

module.exports = router;
