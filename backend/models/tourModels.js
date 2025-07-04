const mongoose = require('mongoose');
const slugify=require('slugify')
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount:{ 
      type:Number,
      validate:{
        validator:function(val){
          return val<this.price;
        
        },
        message:"Discount price must be greater than price"

      }

    },
       
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
     
    },
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    startDates: [Date],
  },
   
    
  { toJSON:{virtuals:true},
      toObject:{virtuals:true}

  }
)

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });

  tourSchema.virtual('durationweeks').get(function(){
      return this.duration/7;
  })
tourSchema.pre('save',function(next){
  this.slug=slugify(this.name,{lower:true});
  next();
})
tourSchema.pre(/^find/,function(next){
  this.find({secretTour:{$ne:true}})
  this.start=Date.now()
  next();
})
tourSchema.post(/^find/,function(doc,next){
  console.log(`Query took ${Date.now()-this.start} milliseconds`)
  //console.log(doc)
  next()
})

tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });

  next();
});

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

tourSchema.pre('aggregate',function(next){

  this.pipeline().unshift({$match:{secretTour:{$ne:true}}})
  console.log(this.pipeline())
  next()
})

const Tour=mongoose.model('Tour',tourSchema);
module.exports=Tour;