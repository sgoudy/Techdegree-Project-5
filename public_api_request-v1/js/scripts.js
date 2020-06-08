const allUsers = 'https://randomuser.me/api/?results=12&inc=picture,name,email,phone,location,dob&nat=us';
const galleryImg = document.querySelector('#gallery');
const body = document.querySelector('body');


//Create modal div		
const modalCont = document.createElement('div');
modalCont.setAttribute('class', 'modal-container');
body.appendChild(modalCont);
const script = document.querySelector('script');
const scriptPar = script.parentNode;
scriptPar.insertBefore(modalCont, script);
modalCont.setAttribute('hidden', true);

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch(allUsers)
  .then(response => response.json())
  .then(data => createProfile(data.results))
  
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
let info=[];

function createProfile (results){
	results.forEach(each => {
	//  Create the placeholders for each profile
		const card = document.createElement('div');
		card.setAttribute('class', 'card');
		galleryImg.appendChild(card);
	//  Image holder
		const cardImgCont = document.createElement('div');
		cardImgCont.setAttribute('class', 'card-img-container');
		card.appendChild(cardImgCont);
	//  Data holder
		const cardInfo = document.createElement('div');
		cardInfo.setAttribute('class', 'card-info-container');
		card.appendChild(cardInfo);
	//  Add the picture and data pulled from fetch command
		cardImgCont.innerHTML = `<img class = "card-img" src = ${each.picture.large} alt= "profile picture">`;
		cardInfo.innerHTML = `<h3 id = "name" class = "card-name cap">${each.name.first} ${each.name.last}</h3>
		<p class = "card-text">${each.email}</p>
		<p class = "card-text cap" >${each.location.city}</p>`;
	//  Build the info array
		const fName = `${each.name.first}`;
		const lName = `${each.name.last}`;
		const email = `${each.email}`;
		const city = `${each.location.city}`;
		const phone = `${each.phone}`;
			const dobRaw = `${each.dob.date}`;
			const dobArr = dobRaw.split('-');
			const month = dobArr[1];
			const day = dobArr[2].substring(0,2);
			const year = dobArr[0];
		const dob = `${month}/${day}/${year}`;
		const location = `${each.location.street.number} ${each.location.street.name} ${each.location.city}, ${each.location.state}, ${each.location.country} ${each.location.postcode}`;
		info.push({fName, lName, email, city, phone, dob, location});
		})
	}
	
//---------- Return email if card is clicked in any location -------------------//
function selectGallery(e){
	const cardData = e.target;
		if (cardData.tagName === 'P'){
			const emailAndCity = cardData.parentNode.children[1].textContent;
			createModal (emailAndCity);
		} else if (cardData.tagName === 'H3'){
			const name = cardData.parentNode.children[1].textContent;
			createModal (name);
		} else if (cardData.tagName === 'DIV' && cardData.className === 'card'){
			const div = cardData.children[1];
			const divName = div.querySelector('.card-text').textContent;
			createModal(divName);
		 } else if (cardData.tagName === 'DIV' && cardData.className === 'card-info-container'){
			const cardName = cardData.children[1].textContent;
			createModal(cardName);
		 } else if (cardData.tagName === 'DIV' && cardData.className === 'card-img-container'){
			const imgParent = cardData.parentNode.children[1];
			const imgParentText = imgParent.querySelector('.card-text').textContent;
			createModal(imgParentText)
		 } else if (cardData.tagName === 'IMG'){
			const img = cardData.parentNode.parentNode.children[1];
			const imgName = img.querySelector('.card-text').textContent;
			createModal(imgName)
		}
		else {	
			return null;
	}
}


function createModal (name){
	
	console.log(name)
	
}

	// } else {
	// const nameInfo = wholeCard.querySelector('#name').textContent;
	// const fNameTarget = nameInfo.split(' ')[0];
	// const lNameTarget = nameInfo.split(' ')[1];
	// info.forEach(person => {
	// 		const first = person.fName;
	// 		const last = person.lName;
	// 		const wholeName = first.concat(' ',last);
	// 		if(nameInfo === wholeName){
	// 			console.log(nameInfo);
	// 			console.log(wholeName);
	// 		}
	// 	})
	

	
	// if(fName === info[0]){
	// 	console.log(fName)
	// 	console.log(info[0])
	// }
	
	// 	const modal = document.createElement('div');
	// 	modal.setAttribute('class', 'modal');
	// 	modalCont.appendChild(modal);
	// 	const exitBtn = document.createElement('button');
	// 	modal.appendChild(exitBtn);
	// 	exitBtn.setAttribute('type', 'button');
	// 	exitBtn.setAttribute('id', 'modal-close-btn');
	// 	exitBtn.setAttribute('class', 'modal-close-btn');
	// 	exitBtn.innerHTML = '<strong>X</strong>';
		
	// 	const infoCont = document.createElement('div');
	// 	infoCont.setAttribute('class', 'modal-info-container');
	// 	modal.appendChild(infoCont);

	// 	infoCont.innerHTML = `
	// 	<img class = "modal-img" src = '${each.picture.large}' alt = "profile picture">
	// 	<h3 id="name" class="modal-name cap">${each.name.first} ${each.name.last}</h3>
 //        <p class="modal-text">${each.email}</p>
 //        <p class="modal-text cap">${each.location.city}</p>
 //        <hr>
 //        <p class="modal-text">${each.phone}</p>
 //        <p class="modal-text">${each.location}</p>
 //        <p class="modal-text">'Birthday' ${each.dob}</p>`;







// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
galleryImg.addEventListener('click', selectGallery, false)