window.addEventListener('load',displayAppointments);

var data;
var remainder;
var noOfPages;
function displayAppointments(){
    let url="http://localhost:3000/appointment";
    let xhr=new XMLHttpRequest();
    xhr.open("GET",url);
    xhr.send();
    xhr.onload=function(){
        if(xhr.status>=200 && xhr.status<400){
            data=[...JSON.parse(xhr.response)];
            let length=data.length;
            console.log(length)
            let perPage=5;
            noOfPages=Math.ceil(length/perPage);
            remainder=length%perPage;

            let paginationCover=document.createElement("div");
            paginationCover.setAttribute("class","paginationCover");

            let previousBtn=document.createElement("button");
            previousBtn.setAttribute("id","previousBtn");
            previousBtn.innerHTML="Prev";

            // paginationCover.append(previousBtn);

            for(let i=1;i<=noOfPages;i++){
                let pages=document.createElement("button");
                pages.innerHTML=i;
                pages.setAttribute("id",`btn${i}`);
                pages.addEventListener('click',pageDirect);
                paginationCover.append(pages);
            }

            let nextBtn=document.createElement("button");
            nextBtn.setAttribute("id","nextBtn");
            nextBtn.innerHTML="Next";

            // paginationCover.append(nextBtn);

            document.body.append(paginationCover);

            

            let output="";
            if(data.length<5){
                for(let i=0;i<data.length;i++){
                    output+=`
                        <div class="cards">
                            <div>Name: ${data[i].name}</div>
                            <div>Age: ${data[i].age}</div>
                            <div>Gender: ${data[i].gender}</div>
                            <div>Appointment for: ${data[i].appointment_reason}</div>
                            <div>At: ${data[i].time}</div>
                            <div>On: ${data[i].date}</div>
                        </div>
                    `
                }
                document.getElementById("display").innerHTML=output;
            }
            if(data.length>=5){
                for(let i=0;i<5;i++){
                    output+=`
                        <div class="cards">
                            <div>Name: ${data[i].name}</div>
                            <div>Age: ${data[i].age}</div>
                            <div>Gender: ${data[i].gender}</div>
                            <div>Appointment for: ${data[i].appointment_reason}</div>
                            <div>At: ${data[i].time}</div>
                            <div>On: ${data[i].date}</div>
                        </div>
                    `
                }
                document.getElementById("display").innerHTML=output;
            }
            else if(data.length===0){
                let empty=`
                    <div class="cards">
                        <div class="noApp">No appointments currently.</div>
                        <button onclick=redirectAppointmentPage() id="create">Create Appointment</button>
                    </div>
                    
                `
                document.getElementById("display").innerHTML=empty;
            }
            
        }
    }
}

function redirectAppointmentPage(){
    location.assign("createAppointments.html")
}

function pageDirect(){
    let id=(event.target.innerHTML);
    let url=`http://localhost:3000/appointment?_page=${id}&_limit=${5}`;
    
    fetch(url)
    .then(response=> response.json())
    .then(data=>{
        let output="";
        console.log(data)
        for(i in data){
            output+=`
                <div class="cards">
                    <div>Name: ${data[i].name}</div>
                    <div>Age: ${data[i].age}</div>
                    <div>Gender: ${data[i].gender}</div>
                    <div>Appointment for: ${data[i].appointment_reason}</div>
                    <div>At: ${data[i].time}</div>
                    <div>On: ${data[i].date}</div>
                </div>
            `
        }
        document.getElementById("display").innerHTML=output;
    
    })
    .catch(error=>console.log(error));
}