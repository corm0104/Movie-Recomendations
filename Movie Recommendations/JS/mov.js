let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;
const KEY = "da169c45960df84361f91d9ba78eae4a";
let movieID = 0;

document.getElementById("search-button").style.transform = "rotate(360deg)";


document.getElementById('search-button').addEventListener('click', getConfig);


function getConfig(){
    let url = "".concat(baseURL, 'configuration?api_key=', KEY);
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    
    .then((data) =>{
        baseImageURL = data.images.secure_base_url;
        configData = data.images;
        console.log('config', data);
        console.log('config fetched');
        runSearch(document.getElementById("search-input").value);
        
    })
    .catch(function(err){
        alert(err);
    });
}

function runSearch(keyword){
    let url = "".concat(baseURL, 'search/movie?api_key=', KEY, '&query=', keyword);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        
        console.log(data);
        displaydata(data, "search-results");
        
    })
}




function getRecommendations(keyword){
    //let url= "".concat(baseURL, 'movie/', movieID, '/recommendations?api_key=', KEY, keyword);
        
fetch(baseURL + "movie/" + movieID + "/recommendations?api_key=" + KEY + "&language=en-US&page=1")
    .then(result=>result.json())
    .then((data)=>{
        console.log(data);
        displaydata(data, "recommend-results");
    
    document.getElementById("recommend-results").classList.add("active");
    document.getElementById("search-results").classList.remove("active");
    
    })
    
    
    
}

function displaydata(data, expectedDiv){
    console.log("creating data");
    
    let x = document.getElementById(expectedDiv);
    x.innerHTML = "";
    
    data.results.forEach(function (movies) {
        console.log(movies);
        let div = document.createElement('div');
        let img = document.createElement('img');
        let title = document.createElement('h2');
        let desc = document.createElement('p');
        
        div.classList.add("card");
        img.classList.add("poster");
        title.textContent = movies.title;
        img.src = "https://image.tmdb.org/t/p/w500/" + movies.poster_path;
        desc.textContent = movies.overview;
        
        x.appendChild(div);
        div.appendChild(img);
        div.appendChild(title);
        div.appendChild(desc);
        
        
        img.addEventListener('click', function(){
            movieID = movies.id;
            getRecommendations();
        });
        
    });
   
    
    
}