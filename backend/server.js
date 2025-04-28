const knex = require("knex")(require("./knexfile").development);

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// Middleware to verify admin access via JWT
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") throw new Error("Not admin");
    next();
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

// Route to handle training offer submission
app.post(
  "/api/training-offers",
  verifyAdmin,
  upload.single("file"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        category,
        duration,
        startDate,
        prerequisites,
      } = req.body;
      const file = req.file;

      // Check or insert category
      let [cat] = await knex("categories").where({ name: category });
      if (!cat) {
        const [catId] = await knex("categories").insert({ name: category });
        cat = { id: catId };
      }

      // Insert training offer
      const [offerId] = await knex("training_offers").insert({
        title,
        description,
        category_id: cat.id,
        duration,
        start_date: startDate,
        prerequisites,
      });

      // Insert training material
      if (file) {
        await knex("training_materials").insert({
          offer_id: offerId,
          file_url: file.filename,
        });
      }

      res.status(201).json({ message: "Training offer saved to database!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    }
  }
);

app.get("/api/training-offers", async (req, res) => {
  try {
    const offers = await knex("training_offers")
      .join("categories", "training_offers.category_id", "categories.id")
      .leftJoin(
        "training_materials",
        "training_offers.id",
        "training_materials.offer_id"
      )
      .select(
        "training_offers.*",
        "categories.name as category_name",
        "training_materials.file_url"
      );

    res.json(offers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch offers" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Backend running on http://localhost:${process.env.PORT}`);
});
