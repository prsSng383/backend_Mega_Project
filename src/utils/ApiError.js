// Pre-defining the format of the upcoimg errors , this will be the responses when the Error in Api will occur. 

class ApiError extends Error{
      
    constructor(statusCode,message="Soemthing went wrong",errors=[],statck=""){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors


        if (statck) {
            this.stack = statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }

}


export{ApiError}