// const fs=require('fs')
const Tour=require('./../models/tourModels')
const APIFeatures=require('./../utils/apiFeatures')
const catchAsync=require('./../utils/catchAsync')
const AppError=require('./../utils/appError')
// const tours=JSON.parse(
//     fs.readFileSync(`${__dirname}/../tours-simple.json`)
// );
//console.log(Tour)

exports.getTourStats=catchAsync(async(req,res,next)=>{
   
        const stats=await Tour.aggregate([
            {
            $match:{ratingsAverage:{$gte:4.5}}
            },
            {
            $group:{
                _id:{$toUpper:'$difficulty'},
                numTours:{$sum:1},
                numRatings:{$sum:'$ratingsQuantity'},
                avgRating:{$avg:'$ratingsAverage'},
                avgPrice:{$avg:'$price'},
                minprice:{$min:'$price'},
                maxprice:{$max:'$price'}
            }   
            },
            {
                $sort:{avgPrice:1}
            },
            {
                $match:{_id:{$ne:'EASY'}}
            }
            ]);
            res.status(201).json({
            status:'success',
            data:{
            stats,
            }
            });
        
    })
exports.getMonthlyPlan=catchAsync(async (req,res,next)=> {
    
        const year=req.params.year*1;
        const plan= await Tour.aggregate([
            {
                $unwind:'$startDates'
            },
            {
                $match:{
                    startDates:{
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`),
                    }
                }
            },
            {
                $group:{
                    _id:{$month:'$startDates'},
                    numTourStarts:{$sum:1},
                    tours:{$push:'$name'}
                }
            },
            {

                $addFields:{month:'$_id'}
            },
            
            {
                $project:{
                    _id:0
                }
            },
            {
                $sort:{numTourStarts:-1}
            }
        ])
    res.status(201).json({
    status:'success',
    data:{
        plan
    }
});
    }
)

exports.aliasTopTours=(req,res,next)=>{
    req.query.limit='5';
    req.query.sort="-ratingsAverage,price";
    req.query.fields="name,price,ratingsAverage,summary,difficulty";
    next();
}
exports.createTour= catchAsync(async (req,res,next) => {

    const newTour = await Tour.create(req.body);
    //console.log("g",newTour)
    res.status(201).json({
        status:'success',
        data:{
            tour:newTour,
        }
    });
} 
)

exports.deleteTour=catchAsync(async (req,res,next)=>{
    
        const tour=await Tour.findByIdAndDelete(req.params.id)
        if(!tour){
        return next(new AppError('No tour found with this ID',404));
        }
        res.status(204).json({
            status:'success',
            data:{
                tour:"null"
            }
        })
    })

    

exports.updateTour=catchAsync(async (req,res,next)=>{
   
        const tour= await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if(!tour){
        return next(new AppError('No tour found with thst ID',404));
        }
        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        })
    })

exports.getalltours=catchAsync(async (req,res,next)=>{

    const features=new APIFeatures(Tour.find(),req.query).filter().sort().limitFields().Pagination();
    
    const tours=await features.query;
    if(!tours){
    return next(new AppError('No tour found with this ID',404));
    }
        res.status(200).json({
        status:'success2',
        data:{
            
            tours,
        }
    })
})
exports.gettours=catchAsync(async (req,res,next)=>{

 const tours= await Tour.findById(req.params.id);
 if(!tours){
    //return next(new AppError('No tour found with thst ID',404));
    
     return next(new AppError('No tour found with that ID', 404));
   
 }
 res.status(200).json({
    status:'success1',
    data:{
        tours
    }

 })

} )
    
