class APIFeatures{
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
    filter(){
        const queryObj={...this.queryString}
        const excludeField=['page','sort','limit','fields'];
        excludeField.forEach(el=>delete queryObj[el]);
        let queryStr=JSON.stringify(queryObj)
        
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(typeof(queryStr))
        const mongoQuery=JSON.parse(queryStr)
        console.log(queryStr)
        this.query.find(mongoQuery)
        return this;
    }
    sort(){ 
        if(this.queryString.sort)
        {
            const sortBy=this.queryString.sort.split(',').join(' ');
            this.query=this.query.sort(sortBy)
            console.log(sortBy)
        }
        return this;
        }
    limitFields(){
        if(this.queryString.fields){
        const fields=this.queryString.fields.split(',').join(' ');
        this.query=this.query.select(fields);
    }else{
        this.query=this.query.select('-__v')
    }
    return this;
    }
    Pagination(){
        const limit =this.queryString.limit*1;
        const page=this.queryString.page*1;
        const skip=(page-1)*limit;
        console.log(skip)
    
        this.query=this.query.skip(skip).limit(limit);
        return this;
    }
       
    }
module.exports=APIFeatures;