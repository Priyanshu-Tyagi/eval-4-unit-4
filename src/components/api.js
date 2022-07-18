import axios from "axios"


// For Hospitals

export function addHospitals(hospitalname){
    return axios({
        url:`https://62d51c53d4406e5235530ce2.mockapi.io/hospital`,
        method:"POST",
        data:hospitalname
    });
}
export function getHospitals(){
    return axios.get("https://62d51c53d4406e5235530ce2.mockapi.io/hospital")
}


// For Doctors

export function addDoctors(doctorname,hospital,Specialisation,salary){
    return axios({
        url:`https://62d51c53d4406e5235530ce2.mockapi.io/Doctors`,
        method:"POST",
        data:{doctorname,hospital,Specialisation,salary}
    });
}

export function getDoctors(){
    return axios.get("https://62d51c53d4406e5235530ce2.mockapi.io/Doctors")
}