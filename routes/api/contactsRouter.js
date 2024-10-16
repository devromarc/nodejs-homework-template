import express from "express";
import {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} from "../../controller/contactsController.js";

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", updateStatusContact);
export { router };
