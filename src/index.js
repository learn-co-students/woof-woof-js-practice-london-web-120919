const getElement = (element) => document.querySelector(element)
const makeElement = (type) => document.createElement(type)
const pupsURL = "http://localhost:3000/pups/"


document.addEventListener("DOMContentLoaded", () => {

    let filterOn = false
    const filterButton = getElement("#good-dog-filter")

    const dogsDiv = getElement("#dog-bar")
    const puppyDiv = getElement("#dog-info")
    

    // get dogs from API
    const getPups = (url) => fetch(url)
        .then( resp => resp.json() )
        .then( pups => checkFilter(pups))
    
    // check whether filter is applied & filter results accordingly
    const checkFilter = (puppies) => {
        if (filterOn) {
            puppies = puppies.filter( puppy => puppy.isGoodDog )
        } 
        renderPups(puppies)
    }

    // clear existing and render puppies
    const renderPups = (puppies) => {
        dogsDiv.innerHTML = ""
        for(const pup of puppies) {
            createPuppySpan(pup)
        }
    }

    // create span for each puppy
    const createPuppySpan = (pup) => {
        const span = makeElement("span")
        span.innerText = pup.name
        dogsDiv.append(span)
        span.addEventListener("click", () => {
            createPuppyShow(pup)
        })
        
    }

    // create elements to show puppy details and show them
    const createPuppyShow = (pup) => {
        const { name, image } = pup

        const pic = makeElement("img")
        pic.src = image
        const pupName = makeElement("h2")
        pupName.innerText = name
        const goodBadButton = makeElement("button")
        buttonText(goodBadButton, pup)
        toggleButton(goodBadButton, pup)
        
        puppyDiv.innerHTML = ""
        puppyDiv.append(pic, pupName, goodBadButton)
            
        }
    

 // button needs to display good dog if isGoodDog is true, or bad dog if false
    const buttonText = (button, pup) => {
        if (pup.isGoodDog) {
            button.innerText = "Good Dog!"
        } else {
            button.innerText = "Bad Dog!"
        }
    }

    // button needs to change status of isGoodDog when clicked
    // then needs to display good dog if isGoodDog is true, or bad dog if false
    const toggleButton = (button, pup) => {
        let thisPup = pup
        button.addEventListener("click", (e) => {
            
            let goodBadStatus = !thisPup.isGoodDog

            const configObj = {
                method: "PATCH",
                headers: { "content-type": "application/json"},
                body: JSON.stringify({
                    "isGoodDog": goodBadStatus
                })
            }
            fetch(pupsURL + thisPup.id, configObj)
                .then( resp => resp.json() )
                .then( puppy => createPuppyShow(puppy)) 
                .then(getPups(pupsURL))
            
        })
    
    }

    // filter button needs to: 
    // needs to filter by only good dogs when on
    // needs to remove filter/show all dogs when off
    // change inner text to be dynamic - switch between on and off
    
    filterButton.addEventListener("click", (e) => {
        filterOn = !filterOn
        getPups(pupsURL)
        filterButton.innerText = `Filter good dogs: ${ filterOn? "ON" : "OFF"}`
    })
     
    // const filterGoodDogs = (filterOn) => { 
    //     dogsDiv.innerHTML = ""
    //     if (filterOn) {
    //         filteredPups = puppiesArray.filter( puppy => puppy.isGoodDog )
    //         renderPups(filteredPups)
    //     } else { renderPups(puppiesArray) }
    // }
    




    getPups(pupsURL)

})