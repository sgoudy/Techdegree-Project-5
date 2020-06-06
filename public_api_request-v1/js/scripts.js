const allUsers = 'https://randomuser.me/api/?results=12';

const galleryImg = document.querySelector('#gallery');



// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch(allUsers)
  .then(response => response.json())
  .then(data => createProfile(data.results));



// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function createProfile (data){
	console.log(data[0]);
	data.forEach(each => {
	
		const card = document.createElement('div');
		card.setAttribute('class', 'card');
		galleryImg.appendChild(card);

		const cardImgCont = document.createElement('div');
		cardImgCont.setAttribute('class', 'card-img-container');
		card.appendChild(cardImgCont);

		const cardInfo = document.createElement('div');
		cardInfo.setAttribute('class', 'card-info-container');
		card.appendChild(cardInfo);

		cardImgCont.innerHTML = `<img class = "card-img" src = '${each.picture.large}' alt= "profile picture">`;
		cardInfo.innerHTML = `<h3 id = "name" class = "card-name cap">${each.name.first} ${each.name.last}</h3>
		<p class = "card-text">${each.email}</p>
		<p class = "card-text cap" >${each.location.city}</p>`
	})
}






// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------



