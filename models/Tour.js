const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// step in this section are.....
//Creating Schema ->> Modal ->> Query
const tourSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a Tour name"],
      trim: true,
      index: true,
      unique: true,
      minLength: [3, "Name must be at least Three Character"],
      maxLength: [10, "Name is too Large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      index: true,
      min: [100, "Price can not be Negative"],
    },
    img: 
    { type: String,
      required: true,
    },
    allowance: {
      type: String,
      required: true,
      enum: {
        values: ["adult", "kid"],
        message: "allowance cant not be {VALUE}, must be kids/adult",
      },
    },
    member: {
      type: Number,
      required: true,
      min: [1, "member can not be Negative"],
      max: [5, "member is too Large"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Member Can not be float",
    },
    rating: {
      type: Number,
      required: true,
      min: [0, "ratting can not be Negative"],
      max: [5, "rating is too Large"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Rating Can not be float",
    },
    status: {
      type: String,
      index: true,
      enum: {
        values: ["active", "inactive", "discontinued"],
        message: "status can not be {VALUE}",
      },
    },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: Types.ObjectId,
    //   },
    // ]
  },
  { timestamps: true }
);

// Middleware 2 types. PRE and POST and Instance
tourSchema.pre("save", function (next) {
  console.log("Before Saving data");
  if (this.rating == 0) {
    this.status = "discontinued";
  }
  next();
});

// productSchema.post("save", function (doc, next) {
//   console.log(`After Saving data ${doc.name}`);
//   next();
// });

// injecting this logger Instance in our schema.
tourSchema.methods.logger = function () {
  console.log(` Data saved for ${this.name}`);
};

// Modal
const Tour = new mongoose.model("Tour", tourSchema);
module.exports = Tour;
