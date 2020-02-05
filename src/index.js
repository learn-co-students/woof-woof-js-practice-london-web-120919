const url = 'http://localhost:3000/pups';
let dogBar = '';
let pupsArray = [];
let button = '';
let filtered = false;

document.addEventListener('DOMContentLoaded', e => {
	button = document.querySelector('#good-dog-filter');
	button.addEventListener('click', e => {
		filterButton();
	});

	fetchAllPups();
	dogBar = document.querySelector('#dog-bar');
});
// End of DOMCONTENTLOADED

function filterDogs(data) {
	let filteredPups = [];
	data.map(pup => {
		pup.isGoodDog ? filteredPups.push(pup) : '';
	});
	renderAllPups(filteredPups);
}

function filterButton() {
	button.getAttribute('filtered') == 'true'
		? ((button.innerText = 'Filter good dogs: OFF'),
		  button.setAttribute('filtered', 'false'),
		  (filtered = false),
		  fetchAllPups())
		: ((button.innerText = 'Filter good dogs: ON'),
		  button.setAttribute('filtered', 'true'),
		  (filtered = true),
		  fetchAllPups());
}

function goodBadDog(button, info) {
	info.isGoodDog
		? (button.innerText = 'Bad Dog!')
		: (button.innerText = 'Good Dog!');
}

// Renderers

function renderPupInfo(info) {
	const dogInfo = document.querySelector('#dog-info');
	dogInfo.innerHTML = '';

	let image = document.createElement('img');
	image.src = `${info.image}`;

	let heading = document.createElement('h2');
	heading.innerText = `${info.name}`;

	let button = document.createElement('button');
	goodBadDog(button, info);

	button.addEventListener('click', e => {
		if (filtered) {
			fetchGoodBadDog(info);
			// filterFetchAllPups();
		} else {
			fetchGoodBadDog(info);
		}
	});

	dogInfo.appendChild(image);
	dogInfo.appendChild(heading);
	dogInfo.appendChild(button);
}

function renderPup(pup) {
	let span = document.createElement('span');
	span.innerText = pup.name;

	span.addEventListener('click', e => {
		fetchDogInfo(pup);
	});
	return span;
}

function renderAllPups(data) {
	dogBar.innerHTML = '';
	for (const pup of data) {
		dogBar.appendChild(renderPup(pup));
	}
}

// Here be Fetchs'

function fetchGoodBadDog(info) {
	console.log(info);
	const bool = !info.isGoodDog;
	fetch(url + '/' + info.id, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			isGoodDog: bool
		})
	})
		.then(res => res.json())
		.then(res => renderPupInfo(res), fetchAllPups());
}

function fetchDogInfo(pup) {
	fetch(url + '/' + pup.id)
		.then(res => res.json())
		.then(renderPupInfo);
}

// function filterFetchAllPups() {
// 	fetch(url)
// 		.then(res => res.json())
// 		.then(data => filterDogs(data));
// }

function fetchAllPups() {
	if (!filtered) {
		fetch(url)
			.then(res => res.json())
			.then(data => {
				pupsArray = data;
				renderAllPups(data);
			});
	} else {
		fetch(url)
			.then(res => res.json())
			.then(data => filterDogs(data));
	}
}
