
document.getElementById("submitBtn").addEventListener('click',redirectAllAppointmentsPage);

function redirectAllAppointmentsPage(){
    let name=document.getElementById("name").value;
    let age=document.getElementById("age").value;
    let gender=document.getElementById("gender").value;
    let reason=document.getElementById("reason").value;
    let time=document.getElementById("time").value;
    let date=document.getElementById("date").value;
    if(!name || !age || !gender || !reason || !time || !date){
        alert("Please fill all fields !")
    }
    else{
        let obj={
            name:name,
                age:age,
                appointment_reason:reason,
                time:time,
                date:date,
                gender:gender
        }
        let json=JSON.stringify(obj);
        console.log(json)
        var url="http://localhost:3000/appointment";
        let xhr= new XMLHttpRequest();
        xhr.open("POST",url);
        xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
        xhr.send(json);
        xhr.onload=function(){
            if(xhr.status>=200 && xhr.status<400){
                    alert("Appointment for "+obj.name+" set successfully for "+obj.date);
                    redirectAppointmentsPage();
                
            }
            
        }
    }
    
    
}

function redirectAppointmentsPage(){
    location.assign("appointments.html");
}