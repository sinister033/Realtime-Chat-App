import Message from "../model/message.js";

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ message: "Message added to the database" });
    }
    return res.json({
      message: "Failure in saving the messsage to the database",
    });
  } catch (err) {
    next(err);
  }
};
export const getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({updatedAt:1});

    const foundMessages=messages.map((msg)=>{
        return {
            self:msg.sender.toString()===from,
            message:msg.message.text,
        }
    })
    res.json(foundMessages);
  } catch (err) {
    next(err);
  }
};
