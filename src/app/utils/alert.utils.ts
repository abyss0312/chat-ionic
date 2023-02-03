import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { useSnackbar, WithSnackbarProps } from "notistack";


let useSnackRef:WithSnackbarProps;
export const SnackbarUtilitiesConf = () =>{
     useSnackRef = useSnackbar();
}

@Injectable({
    providedIn:'root'
})
export class AlertUtils {

    toast(msg:string, variant:"success" | "error"){
        useSnackRef.enqueueSnackbar(msg, {variant});
    }


    error(message: string){
        this.toast(message,"error");
    }
    success(message: string){
        this.toast(message,"success");
    }


}