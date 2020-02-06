//urls
const pupsUrl = 'http://localhost:3000/pups/'

document.addEventListener('DOMContentLoaded', ()=>{

    //html
    const dogBar = document.getElementById("dog-bar");
    const dogInfo = document.getElementById("dog-info");

    const goodDogFilter = document.getElementById("good-dog-filter");
    
    function fetchPups(){
        fetch(pupsUrl)
            .then(resp => resp.json())
            .then(fetchWithFilter)
    }

    function loadAllPups(json){
        json.forEach(pup => loadPupBar(pup))
    }

    function loadPupBar(pup) {
        const span = document.createElement('span')
        span.innerText = pup.name;

        
        span.addEventListener('click', () => showPup(pup)
        )

        dogBar.append(span);
    }

    function showPup(pup) {
        dogInfo.innerHTML = null;

        const img = document.createElement('img')
        img.src = pup.image

        const h2 = document.createElement('h2')
        h2.innerText = pup.name

        const buttonGoodBad = document.createElement('button')
        buttonGoodBad.innerText = pup.isGoodDog ? "Good Dog" : "Bad Dog";
        buttonGoodBad.addEventListener('click', () => isGoodBad(pup))


        dogInfo.append(img,h2, buttonGoodBad)
    }

    /////good bad change button

    function isGoodBad(pup) {
        let pupGoodnes = pup.isGoodDog
        pupGoodnes ? pupGoodnes = false : pupGoodnes = true ;

        //make patch request
        const jsonGoodnes = {
            isGoodDog : pupGoodnes
        }

        changeIsGoodStatus(pup,jsonGoodnes)
    }

    function changeIsGoodStatus(pup,jsonGoodnes){
        return fetch(pupsUrl+pup.id, {
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(jsonGoodnes)
        })
        .then(resp => resp.json())
        .then(showPup)
    }
    
    ///// Filter
    function dogFilter() {
        goodDogFilter.addEventListener('click', ()=>{
            let dogText = goodDogFilter.innerText
            if (dogText == "Filter good dogs: OFF") {
                goodDogFilter.innerText = "Filter good dogs: ON";
                fetchPups();
            } else {
                goodDogFilter.innerText = "Filter good dogs: OFF";
                fetchPups();
            }
        })
    }

    function fetchWithFilter(json){
        let dogText = goodDogFilter.innerText

        if (dogText == "Filter good dogs: OFF"){
            cleanHtml()
            loadAllPups(json)
        } else {
            cleanHtml()
            loadGoodPups(json)
        }

    }

    ////// fetch good pups

    function loadGoodPups(json){
        json.forEach(pup =>{ 
            if (pup.isGoodDog){
            loadPupBar(pup)}
        })
    }

    ///Dring it up

    function cleanHtml() {
        dogBar.innerHTML = null;
        dogInfo.innerHTML = null;
    }

    
    dogFilter()
    fetchPups();
});