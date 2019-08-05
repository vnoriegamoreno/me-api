const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// get all subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).send({
      success: "true",
      data: subscribers
    });
  } catch (err) {
    res.status(500).send({
      success: "false",
      message: err.message
    });
  }
});

// get one subscriber
router.get("/:id", async (req, res) => {
  try {
    let subscribers = await Subscriber.find();
    subscribers = subscribers.find(sub => sub.id === req.params.id);
    res.status(200).send({
      success: "true",
      data: [subscribers]
    });
  } catch (err) {
    res.status(500).send({
      success: "false",
      message: err.message
    });
  }
  res.json(subscribers);
});

// create one subscriber
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedChannel: req.body.subscribedChannel
  });
  const subscribers = await Subscriber.find();
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).send({
      success: "true",
      data: [newSubscriber, ...subscribers]
    });
  } catch (err) {
    res.status(500).send({
      success: "false",
      message: err.message
    });
  }
});

// update one subscriber
router.patch("/:id", (req, res) => {});

// delete one subscriber
router.delete("/:id", (req, res) => {});

async function getSubscriber(req, res, next) {
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber === null)
      return res.status(404).send({
        success: "false",
        message: "Can not find subcriber"
      });
  } catch (err) {
    return res.status(500).send({
      success: "false",
      message: err.message
    });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;
