import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import { stateSchema } from "../../models/stateSchema/dbStateSchema.mjs";

dotenv.config();

export default class DB {
  constructor() {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((err) => {
        console.log(err);
      });

    this.gameModelState = mongoose.model("gameStates", stateSchema);
  }

  async saveMove(gameID, move) {
    const game = await this.gameModelState.findOne({ gameID: gameID });

    // if gameID does not exist in db, create a new game
    if (!game) {
      const newGame = new this.gameModelState({
        gameID: gameID,
        moves: [move],
      });
      await newGame.save();
    } else {
      game.moves.push(move);
      await game.save();
    }
  }

  async getMoves(gameID) {
    const game = await this.gameModelState.findOne({ gameID: gameID }).then()
      .catc;
    return game.boardState;
  }

  async saveGameFullState(gameID, moves) {
    const game = await this.gameModelState.findOne({ gameID: gameID });
    game.boardState = moves;
    await game
      .save()
      .then(() => {
        console.log("Game state saved");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async deleteGame(gameID) {
    const game = await this.gameModelState.findOne({ gameID: gameID });
    await game
      .delete()
      .then(() => {
        console.log("Game deleted", gameID);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
