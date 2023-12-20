interface CustomErr {

    status:number,
    message:{message:string,token?:any},
    

}
const CreateError = (status:number , message:{message:string,token?:any}):CustomErr =>{

    const err : CustomErr ={
         status:status,
         message:message,
    }

    return err;

}

export default CreateError;