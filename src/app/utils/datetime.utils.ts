



export const getCurrentTime = () =>{
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();

    return time;
}