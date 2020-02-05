document.addEventListener('DOMContentLoaded', function() {
	const baseURL = 'http://localhost:3000/pups/';

	function fetchAndRenderDogs() {
		fetch(baseURL)
			.then(resp => resp.json())
			.then(renderDogs);
	}

	function renderDogs(dogs) {
		dogs.forEach(dog => {
			showDog(dog);
		});
	}

	function showDog(dog) {
		const spanDog = document.createElement('span');
		spanDog.innerText = dog.name;
        const dogInfoDiv = document.querySelector('#dog-info');
       
        const dogImg = document.createElement('img');
        dogImg.src = dog.image;
        const dogName = document.createElement('h2');
        dogName.innerText = dog.name;

        const button = document.createElement('button');
		const poBar = document.querySelector('#dog-bar');
		poBar.append(spanDog);

		spanDog.addEventListener('click', function(e) {
			(dog.isGoodDog? button.innerText = 'Good Dog!': button.innerText = 'Bad Dog!');
            dogInfoDiv.innerHTML = "" ////clear it befor appending
            dogInfoDiv.append(dogImg, dogName, button);
        });


        button.addEventListener('click', function (e) { 
                console.log(dog.isGoodDog)
                let dogBehavior = dog.isGoodDog
                if (dog.isGoodDog) {
                    button.innerText = 'Bad Dog!'
                    dogBehavior = false
                    dog.isGoodDog = dogBehavior
                }
                else {
                    button.innerText = 'Good Dog!'
                    dogBehavior = true
                    dog.isGoodDog = dogBehavior
                }
               

                const changeBehaviour = {
                    isGoodDog: dogBehavior
                }

                const configurationObject = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept":"application/json"
                    },
                    body: JSON.stringify(changeBehaviour)
                }

                fetch(baseURL + dog.id, configurationObject)
                    .then(response => response.json())
            })
	}

	fetchAndRenderDogs();
});
