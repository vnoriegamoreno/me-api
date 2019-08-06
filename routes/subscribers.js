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
router.get("/:id", getSubscriber, (req, res) => {
  try {
    res.status(200).send({
      succes: "true",
      data: [res.subscriber]
    });
  } catch (err) {
    res.status(500).send({
      succes: "false",
      message: `Any subscriber with ${req.param.id} finded ...`
    });
  }
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
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedChannel != null) {
    res.subscriber.subscribedChannel = req.body.subscribedChannel;
  }

  try {
    const updatedSubscriber = await res.subscriber.save();
    res.status(200).send({
      success: "true",
      message: "Subscribed updated",
      data: [updatedSubscriber]
    });
  } catch {
    res.status(400).send({
      success: "false",
      message: err.message
    });
  }
});

// delete one subscriber
router.delete("/:id", getSubscriber, async (req, res) => {
  const cpySubscriber = await res.subscriber;
  console.log(cpySubscriber);
  try {
    await res.subscriber.remove();
    res.status(200).send({
      success: "true",
      message: "Subscriber deleted",
      data: [cpySubscriber]
    });
  } catch (err) {
    res.status(500).send({
      succes: "false",
      message: err.message
    });
  }
});

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
