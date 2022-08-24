const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const day = document.getElementById('day');
const today_date = document.getElementById('today_date');
const datahide = document.querySelector('.middle_layer')

const getInfo = async (e) => {
    e.preventDefault();
    let cityVal = cityName.value;


    if (cityVal ==="") {
        city_name.innerText = `plz enter name before search`;
        datahide.classList.add('data_hide');
    } else { 
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=f8e2f153d70e2e5656ab0908191a830c`;

            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data]
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`
            temp_real_val.innerText = arrData[0].main.temp;
            const getCurrentDay = () => {
                var weekday = new Array(7);
                weekday[0] = "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tue";
                weekday[3] = "Wed";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";
                let currentTime = new Date();
                let days = weekday[currentTime.getDay()];

                return day.innerHTML= days ;
            }
            getCurrentDay();
            
    
            const getCurrentTime = () => {
                var months = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "June",
                    "July",
                    "Aug",
                    "Sept",
                    "Oct",
                    "Nov",
                    "Dec",
                ];
    
                let now = new Date();
                let month = months[now.getMonth()];
                let date = now.getDate();

    
        
                return today_date.innerHTML = `${date}  ${month}`;
    
            }
            getCurrentTime();
        
            
            const tempStatus = arrData[0].weather[0].main
            if (tempStatus == "Sunny") {
                temp_status.innerHTML =
                    '<i class="fa fa-sun" aria-hidden="true"> </i>';
            } else if (tempStatus == "Clouds") {
                temp_status.innerHTML =
                    '<i class="fa fa-cloud" aria-hidden="true"></i>';
            } else if (tempStatus == "Rain") {
                temp_status.innerHTML =
                    '<i class="fa fa-cloud-rain" aria-hidden="true"></i>';
            } else {
                temp_status.innerHTML =
                    '<i class="fa fa-sun" aria-hidden="true"></i>';
            }
            datahide.classList.remove('data_hide');

        } catch {
            city_name.innerText = `plz enter currect name & search`;
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click', getInfo);
