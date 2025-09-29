import axios from "axios";


let instance = undefined;

export const axiosInstance = {

    getInstance: () => {
      if(instance){
        return instance;
      }else{
         instance = axios.create({
          baseURL: 'https://localhost:7051'
        });
       
      }
      return instance ;
  
  },
  
}