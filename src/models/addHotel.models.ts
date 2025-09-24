import mongoose from "mongoose";
export type addHotelTypes = {
  _id: string;
  userId: string;
  name: string;
  city: string;
 
  description: string;
  type: string;
  // adultCount: number;
  // childCount: number;
  facilities: string[];
  pricePerNight: number;
  // starRating: number;
  imageUrls: string[];
imageFiles: FileList;
roomStatus:string,
  lastUpdated: Date;

};
const HotelSchema = new mongoose.Schema<addHotelTypes>(
  {
     userId: { type: String,  },
  name: { type: String,  },
  city: { type: String,  },

  description: { type: String,required:true  },
  type: { type: String,  },
  // adultCount: { type: Number,  },
  // childCount: { type: Number,  },
  facilities: [{ type: String,  }],
  roomStatus:{
  type:String,
  enum:["Booked","Available","Maintenance"],
default:"Available"},
  pricePerNight: { type: Number,  },
  // starRating: { type: Number,  min: 1, max: 5 },
  imageUrls: [{ type: String,  }],
  lastUpdated: { type: Date  },
  },
  { timestamps: true }
);
export const AddHotel = mongoose.model<addHotelTypes>("AddHotel", HotelSchema);
