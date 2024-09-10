import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      userId: mongoose.Types.ObjectId;
      sessionId: mongoose.Types.ObjectId;
    }
  }
}
import { CardsDocument } from "../../models/Cards";

declare global {
  namespace Express {
    interface Request {
      cards?: CardsDocument[]; 
    }
  }
}



export {};


