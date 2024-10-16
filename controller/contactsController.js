import { Contact } from "../models/contactsModel.js";
import {
  contactValidation,
  favoriteValidation,
} from "../validations/validations.js";

const getAllContacts = async (_req, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOne({ _id: contactId }).lean();

    if (!result) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { error } = contactValidation.validate(req.body);

  if (error) {
    res.status(400).json({ message: "missing required name field" });
  }

  try {
    const result = await Contact.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { error } = contactValidation.validate(req.body);

  if (error) {
    res.status(400).json({ message: "missing required name field" });
  }

  try {
    const result = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      {
        new: true,
      }
    );
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res) => {
  const { error } = favoriteValidation.validate(req.body);
  if (error) {
    res.status(404).json({ message: "missing field favorite" });
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    res.status(404).json({ message: "Not found" });
  }

  res.json(result);
};

export {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
