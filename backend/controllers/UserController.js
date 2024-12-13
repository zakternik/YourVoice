const bcrypt = require("bcrypt"); // Ensure bcrypt is imported
const SALT_WORK_FACTOR = 10; // Define salt work factor

var UserModel = require("../models/UserModel.js");
const PostModel = require("../models/PostModel.js");
/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {
  /**
   * UserController.list()
   */
  list: async function (req, res) {
    try {
      // Poiščemo vse uporabnike, brez gesel
      const users = await UserModel.find().select("-password");

      return res.json(users);
    } catch (err) {
      return res.status(500).json({
        message: "Error when getting User.",
        error: err.message,
      });
    }
  },

  /**
   * UserController.show()
   */
  show: async function (req, res) {
    const id = req.params.id;

    try {
      const user = await UserModel.findOne({ _id: id }).select("-password");

      if (!user) {
        return res.status(404).json({
          message: "No such User",
        });
      }

      return res.json(user);
    } catch (err) {
      return res.status(500).json({
        message: "Error when getting User.",
        error: err.message,
      });
    }
  },

  /**
   * UserController.showPosts()
   */
  showPosts: async function (req, res) {
    const id = req.params.id;

    try {
      const userPosts = await PostModel.find({ userId: id })
        .select("-password -updatedAt")
        .sort({ createdAt: -1 });

      if (!userPosts) {
        return res.status(404).json({
          message: "No posts found for this user",
        });
      }

      return res.json(userPosts);
    } catch (err) {
      return res.status(500).json({
        message: "Error when getting users posts.",
        error: err.message,
      });
    }
  },

  /**
   * UserController.create()
   */
  create: async function (req, res) {
    try {
      // Ustvarimo novega uporabnika
      const newUser = new UserModel({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      });

      const user = await newUser.save();

      // Odstranimo geslo iz odgovora
      user.password = undefined;

      return res.status(201).json(user);
    } catch (err) {
      // Obravnava napake za podvojen ključ
      if (err.code === 11000) {
        const field = err.keyPattern.username ? "Username" : "Email";
        return res.status(409).json({
          message: `${field} already taken. Please choose another.`,
          error: err.message,
        });
      }

      return res.status(500).json({
        message: "Error when creating User",
        error: err.message,
      });
    }
  },

  login: async function (req, res) {
    try {
      // Poiščemo uporabnika po uporabniškem imenu
      const user = await UserModel.findOne({ username: req.body.username });

      if (!user) {
        return res.status(401).json({
          message: "Wrong username or password",
          error: new Error("Wrong username or password"),
        });
      }

      // Preverimo, če se geslo ujema z geslom v bazi
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Wrong username or password",
          error: new Error("Wrong username or password"),
        });
      }

      req.session.userId = user._id;
      req.session.username = user.username;

      user.password = undefined;

      return res.json(user);
    } catch (err) {
      console.error("Login error:", err.message || err);
      return res.status(500).json({
        message: "Error during login",
        error: err.message || err,
      });
    }
  },
  /**
   * UserController.update()
   */
  update: async function (req, res) {
    const id = req.params.id;

    try {
      // Poiščemo uporabnika po ID-ju
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({
          message: "No such User",
        });
      }

      // Pripravimo objekt za posodobitev
      const updates = {};

      // Preverimo, ali je geslo v telesu zahtevka
      if (req.body.password) {
        // Validacija novega gesla
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(req.body.password)) {
          return res.status(400).json({
            message:
              "Geslo mora biti dolgo vsaj 8 znakov in vsebovati vsaj eno veliko črko in eno številko.",
          });
        }

        // Hashiranje novega gesla
        const hash = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR);
        updates.password = hash;
      }

      // Posodobimo bio in avatar (če sta na voljo)
      updates.bio = req.body.bio || user.bio;
      updates.avatar = req.body.avatar || user.avatar;

      // Posodobimo uporabniški profil
      const result = await UserModel.updateOne({ _id: id }, updates, {
        runValidators: true,
      });

      // Preverimo, ali je posodobitev uspela
      if (result.nModified === 0) {
        return res.status(400).json({
          message: "No changes made to the user profile.",
        });
      }

      return res.json({ message: "User updated successfully" });
    } catch (err) {
      console.error("Error during user update:", err.message || err);
      return res.status(500).json({
        message: "Error when updating User.",
        error: err.message || err,
      });
    }
  },

  /**
   * UserController.remove()
   */
  remove: async function (req, res) {
    const id = req.params.id;

    try {
      // Poiščemo in odstranimo uporabnika po ID-ju
      const user = await UserModel.findByIdAndRemove(id);

      if (!user) {
        return res.status(404).json({
          message: "No such User",
        });
      }

      return res.status(204).json(); // Uspešno odstranjeno, brez vsebine v odgovoru
    } catch (err) {
      console.error("Error during user deletion:", err.message || err);
      return res.status(500).json({
        message: "Error when deleting the User.",
        error: err.message || err,
      });
    }
  },
};
