import mongoose from "mongoose";

const moveSchema = new mongoose.Schema({
  coor: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  color: { type: String, required: true },
});

const stateSchema = new mongoose.Schema({
  gameID: { type: String, required: true },
  boardState: [moveSchema],
});
