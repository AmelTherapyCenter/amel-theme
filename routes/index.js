import { Router } from "express";

const router = Router();

// These are the routes for default/basic pages

router.get("/", (req, res) => {
    res.render("index", req.app.get('site'))
    // res.status(200).send("All good");
});

export default router;