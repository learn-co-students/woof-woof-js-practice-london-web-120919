const dogsURL = "http://localhost:3000/pups/"

addEventListener("DOMContentLoaded", function(){
    const buttonFilter = document.querySelector("#good-dog-filter")

    buttonFilter.addEventListener('click', function(e){
        // e.target.innerText = "Filter good dogs: ON"
        if (e.target.innerText === "Filter good dogs: OFF"){
            // const allDogs = document.querySelector('#dogb0')
            // console.log("1 click")
            dogBar.innerHTML = ""
            fetchGoodDogs()
            e.target.innerText = "Filter good dogs: ON"
            for (let i = 0; i < allGoodDogs.length; i++) {
                const dogBar = document.querySelector('#dog-bar')
                const span = document.createElement('p')
                span.innerText = allGoodDogs[i].name
                dogBar.append(span)
                // console.log(allGoodDogs[i]);
                
            }
        }else {
            e.target.innerText = "Filter good dogs: OFF"
            dogBar.innerHTML = ""
            fetchDogs()
        }
    })
    function fetchDogs(){
        fetch(dogsURL)
            .then(response => response.json())
            .then(function(dogs){
                // renderGoodDogs(dogs)
                return renderDogsName(dogs)
            })
    }

    function renderDogsName(dogs){
        for (let i = 0; i < dogs.length; i++) {
            renderDogName(dogs[i])
        }
    }

    function fetchGoodDogs(){
        return fetch(dogsURL)
            .then(response => response.json())
            .then(function(dogs){
                // renderGoodDogs(dogs)
                return renderGoodDogs(dogs)
            })
    }
    const allGoodDogs = []
    const dogBar = document.querySelector('#dog-bar')
    function renderGoodDogs(dogs){
        for (let i = 0; i < dogs.length; i++) {
            if (dogs[i].isGoodDog === true){
                allGoodDogs.push(dogs[i])
            }
        }
    }

    function renderDogName(dog){
        const dogBarDiv = document.querySelector('#dog-bar')
        const spanTag = document.createElement('p')
        spanTag.innerText = dog.name
        dogBarDiv.append(spanTag)
        const filterDiv = document.querySelector("#filter-div")
       

        spanTag.addEventListener('click', function(e){
            const dogInfoDiv = document.querySelector('#dog-info')
            const divPers = document.createElement('div')
            divPers.innerHTML = ""
            const h2Tag = document.createElement('h2')
            h2Tag.innerText = dog.name
            const image = document.createElement('img')
            image.src = dog.image
            const buttonTag = document.createElement('button')
            // buttonTag.innerText = dog.isGoodDog
            if (dog.isGoodDog === true){
                buttonTag.innerText = "Good Dog!"
            }else{
                buttonTag.innerText = "Bad Dog!"
            }
            divPers.append(h2Tag, image, buttonTag)
            dogInfoDiv.append(divPers)
            
            buttonTag.addEventListener('click', function(e){
                let dogBehavior = dog.isGoodDog
                if (dog.isGoodDog === true){
                    buttonTag.innerText = "Bad Dog!"
                    dogBehavior = dog.isGoodDog = false
                }else if (dog.isGoodDog === false){
                    buttonTag.innerText = "Good Dog!"
                    dogBehavior = dog.isGoodDog = true
                }

                const newDogBehavior = {
                    isGoodDog: dogBehavior
                }

                const configurationObject = {
                    method: "PATCH",
                    headers: {
                        "Content-Type":"application/json",
                        "Accept":"application/json"
                    },
                    body: JSON.stringify(newDogBehavior)
                }

                fetch(dogsURL + dog.id, configurationObject)
                    .then(response => response.json())
            })



        })
    }






fetchDogs()

}) // END OF DOMCONTENTLOADED