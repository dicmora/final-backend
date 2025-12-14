const router = require("express").Router();
const { celebrate, Joi, Segments } = require("celebrate");
const auth = require("../middlewares/auth");
const { getCurrentUser } = require("../controllers/usersController");
const User = require("../models/user");
const { NotFoundError } = require("../errors");

router.get("/me", auth, getCurrentUser);

router.patch(
  "/me",
  auth,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
    }),
  })
);
router.get("/check-email", async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) throw new NotFoundError("Email is required.");

    const userExists = await User.findOne({ email: email.toLowerCase() });

    res.json({ isAvailable: !userExists });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
