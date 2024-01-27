const container = document.querySelector('.intial');
const search=document.querySelector('.search-box button');
const input=document.querySelector('.search-box');
const weatherBox=document.querySelector('.weather-box');
const weatherDetails=document.querySelector('.weather-details');

const error=document.querySelector('.not-found');

search.addEventListener('click',()=>{
 getAnswer();
});

input.addEventListener('keyup',(e)=>{
       if(e.key ==='Enter'){
             getAnswer();
       }
}
);
function getAnswer(){
       const APIkey='6b6d43a5f725ffc751babbdcbfe4a42f';
       const city=document.querySelector('.search-box input').value;
       if(city=='')
         return;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json =>{

        if(json.cod == '404'){
              container.style.height= '450px';
              weatherBox.classList.remove('active');
              weatherDetails.classList.remove('active');
              error.classList.add('active');
              return;
        }

        container.style.height= '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error.classList.remove('active');


         const image=document.querySelector('.weather-box .box .info .weather .icon');
         const temperature=document.querySelector('.weather-box .box .info .weather .temp');
         const description=document.querySelector('.weather-box .box .info .weather .desc');
         const humidity=document.querySelector('.weather-details .humidity span');
         const wind =document.querySelector('.weather-details .wind span');
        const b =document.querySelector('body');
         
      
         switch(json.weather[0].main){
             case 'Clear':
                 image.innerHTML = `<iconify-icon icon="meteocons:clear-day-fill"></iconify-icon>`;
                 b.style.background="url(/sunset-background.jpg)";
                 break;
             case 'Rain':
              image.innerHTML = `<iconify-icon icon="meteocons:extreme-rain-fill"></iconify-icon>`;
              b.style.background="url(/rain.jpg)";
                 
                    break;
             case 'Snow':
              image.innerHTML = `<iconify-icon icon="meteocons:extreme-snow"></iconify-icon>`;
              b.style.background="url(/snow.jpg)";
                           break;
             case 'Clouds':
              image.innerHTML = `<iconify-icon icon="meteocons:partly-cloudy-day-fill"></iconify-icon>`;
              b.style.background="url(/cloud.jpg)";

                           break;
             case 'Mist':
              image.innerHTML = `<iconify-icon icon="meteocons:mist-fill"></iconify-icon>`;
              b.style.background="url(/mist.jpg)";
                        
                           break;
             case 'Haze':
              image.innerHTML = `<iconify-icon icon="meteocons:extreme-haze-fill"></iconify-icon>`;
                 
              b.style.background="url(/mist.jpg)";
                           break;
                       
                
             default:
              image.innerHTML = `<iconify-icon icon="meteocons:extreme-day"></iconify-icon>`;
              b.style.background="url(/mist.jpg)";
                                             
         }
         temperature.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`;
         description.innerHTML=`${json.weather[0].description}`;
         humidity.innerHTML=`${json.main.humidity}%`;
         wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`;
         
    
        });
}

