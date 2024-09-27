document.addEventListener('DOMContentLoaded', function() {
	const baseURL = 'http://localhost:3000/pups/';
	let likeCount = 0;

	function fetchAndRenderDogs() {
		fetch(baseURL)
			.then(resp => resp.json())
			.then(renderDogs);
	}

	function renderDogs(dogs) {
		if (filterBtn.innerText === 'Filter good dogs: ON') {
			let goodDogs = dogs.filter(dog => {ç
				return dog.isGoodDog;
			});
			goodDogs.forEach(dog => showDog(dog));
		} else {
			dogs.forEach(dog => showDog(dog));
		}
	}

	function showDog(dog) {
		const dogInfoDiv = document.querySelector('#dog-info');

		const spanDog = document.createElement('span');
		spanDog.innerText = dog.name;

		const dogImg = document.createElement('img');
		dogImg.src = dog.image;

		const dogName = document.createElement('h2');
		dogName.innerText = dog.name;

		const button = document.createElement('button');

		const likeBtn = document.createElement('button');
		likeBtn.className = 'like';
		likeBtn.innerText = 'LIKE💓 : ' + likeCount;

		likeBtn.addEventListener('click', function(e) {
			++likeCount;
			console.log(likeCount);
			likeBtn.innerText = 'LIKE💓 : ' + likeCount;
			const totalLikes = likeBtn.innerText;

			//backend
			const configurationO = {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					likes: likeCount
				})
			};

			fetch(baseURL + dog.id, configurationO).then(response => response.json());
		});

		const poBar = document.querySelector('#dog-bar');
		poBar.append(spanDog);

		spanDog.addEventListener('click', function(e) {
			dog.isGoodDog
				? (button.innerText = 'Good Dog!')
				: (button.innerText = 'Bad Dog!');
			dogInfoDiv.innerHTML = ''; ////clear it befor appending
			dogInfoDiv.append(dogImg, dogName, button, likeBtn);
		});

		button.addEventListener('click', function(e) {
			console.log(dog.isGoodDog);
			let dogBehavior = dog.isGoodDog;
			if (dog.isGoodDog) {
				button.innerText = 'Bad Dog!';
				dogBehavior = false;
				dog.isGoodDog = dogBehavior;
			} else {
				button.innerText = 'Good Dog!';
				dogBehavior = true;
				dog.isGoodDog = dogBehavior;
			}

			const changeBehaviour = {
				isGoodDog: dogBehavior
			};

			const configurationObject = {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(changeBehaviour)
			};

			fetch(baseURL + dog.id, configurationObject).then(response =>
				response.json()
			);
		});

		///// FILTER
	}

	fetchAndRenderDogs();

	filterBtn = document.querySelector('#good-dog-filter');
	filterBtn.addEventListener('click', function(e) {
		// console.log(filterBtn.innerText)
		let mesg = e.target.innerText;

		if (mesg === 'Filter good dogs: OFF') {
			mesg = 'Filter good dogs: ON';
			e.target.innerText = mesg;
		} else {
			mesg = 'Filter good dogs: OFF';
			e.target.innerText = mesg;
		}

		fetchAndRenderDogs();

		// e.target.innerText = mesg
	});
});
