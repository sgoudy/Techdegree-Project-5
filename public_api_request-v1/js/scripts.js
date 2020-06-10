//  URL built based on US personnel and only retrieving pertinent information
const allUsers = 'https://randomuser.me/api/?results=12&inc=picture,name,email,phone,location,dob&nat=us';
const galleryImg = document.querySelector('#gallery');
const body = document.querySelector('body');

//  Search Container
const search = document.querySelector('.search-container');
const form = document.createElement('form');
form.innerHTML = `
	<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="First or Last Name">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
	</form>`
search.appendChild(form)

//  CSS Tweaks
body.style.backgroundColor = '#292929'
const h1 = document.querySelector('h1');
h1.style.color = 'white';

//  Create modal div		
const modalCont = document.createElement('div');
modalCont.setAttribute('class', 'modal-container');
body.appendChild(modalCont);
const script = document.querySelector('script');
const scriptPar = script.parentNode;
scriptPar.insertBefore(modalCont, script);
modalCont.setAttribute('hidden', true);

//	Create modal div and append to modal container	
const modal = document.createElement('div');
modal.setAttribute('class', 'modal');
modal.innerHTML = `
<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>`;
modalCont.appendChild(modal);
const exitBtn = document.querySelector('.modal-close-btn');

//	Create modal info container and append to modal div
const infoCont = document.createElement('div');
infoCont.setAttribute('class', 'modal-info-container');
modal.appendChild(infoCont);

//  Create Next and Prev buttons
const scrollBtnCont = document.createElement('div');
scrollBtnCont.setAttribute('class', 'modal-btn-container');
modalCont.appendChild(scrollBtnCont);
scrollBtnCont.innerHTML = `
	<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>`;
scrollBtnCont.setAttribute('hidden', true);

//  Store information on 12 users printed to screen here
let info=[];
// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch(allUsers)
  .then(checkStatus)
  .then(response => response.json())
  .then(data => createProfile(data.results))
  .catch(error => console.log('There was a problem with your request!', error))
  
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

/**
 * Function checks on fetch results
 * @param  (response)
 * @return result of fetch request
 */
function checkStatus(response){
	if (response.ok){
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText))
	}
}

/**
 * Function creates template for each employee card
 * @param  (results) employee information 
 * @return card display
 */
function createProfile (results){
	results.forEach(each => {
	//  Create the placeholders for each profile
		const card = document.createElement('div');
		card.setAttribute('class', 'card');
		card.style.borderRadius = '15px';
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
		const img = `${each.picture.large}`;
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
		const location = `${each.location.street.number} ${each.location.street.name} ${each.location.city}, ${each.location.state} ${each.location.postcode}`;
		info.push({img, fName, lName, email, city, phone, dob, location});
		})
	}
	
/**
 * Function identifies unique email address of person
 * no matter where on the card a user clicks.
 * @param  (e) click event
 * @return email of item clicked
 */
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

/**
 * Function creates Modals for users on click
 * @param  {name} user object
 * @return container information
 */
function createModal (name){
//	Display container when element is clicked	
	modalCont.hidden = false;
	scrollBtnCont.hidden = false;
//	Choose info to display in container upon click
	info.forEach(each => {
		if (each.email === name){
			infoCont.innerHTML = `
				<img class="modal-img" src="${each.img}" alt="profile picture">
				<h3 id="name" class="modal-name cap">${each.fName} ${each.lName}</h3>
		        <p class="modal-text">${each.email}</p>
		        <p class="modal-text cap">${each.city}</p>
		        <hr>
		        <p class="modal-text">${each.phone}</p>
		        <p class="modal-text">${each.location}</p>
		        <p class="modal-text">Birthday: ${each.dob}</p>`;			
		}
	})	
}	

/**
 *  Function sets modalCont attribute to hidden on click
 */		
function closeBox(){
	modalCont.hidden = true;
}	

/**
 * Function allows for Next and Prev Btn Functionality
 * @param  {e} 
 * @return createModal 
 */
function scrollFunc(e){
	const parent = e.target.parentNode.parentNode.children[0];
	const email = parent.querySelector('.modal-text').textContent;
	info.forEach(each => {
		const indexValue = info.indexOf(each);
			if (each.email === email && e.target.className === 'modal-next btn' && indexValue < 11){
				let nextPersonIndexValue = indexValue + 1;
				const nextPerson = info[nextPersonIndexValue].email;
				return createModal(nextPerson);
			} else if (each.email === email && e.target.className === 'modal-next btn' && indexValue === 11){
				nextPersonIndexValue = 0;
				const startNew = info[nextPersonIndexValue].email;
				return createModal(startNew);
			} else if (each.email === email && e.target.className === 'modal-prev btn' && indexValue > 0){
				let prevPersonIndexValue = indexValue - 1;
				const prevPerson = info[prevPersonIndexValue].email;
				return createModal(prevPerson);
			} else if (each.email === email && e.target.className === 'modal-prev btn' && indexValue === 0){
				prevPersonIndexValue = 11;
				const startAtTop = info[prevPersonIndexValue].email;
				return createModal(startAtTop);
			} 
	})
}

/**
 * Function performs Search of Items on Page
 * @param  {e} input value
 */
function formSearch (e){
	e.preventDefault();
	const caseSensInput = document.getElementById('search-input').value;
	const input = caseSensInput.toLowerCase();
	const card = document.querySelectorAll('.card');
	let fName = [];
	let lName = [];
	for (let i = 0; i < info.length; i ++){
		const first = info[i].fName.toLowerCase();
		const last = info[i].lName.toLowerCase();
		fName.push(first);
		lName.push(last);
		}
	for (let i = 0; i < fName.length; i ++){
		if (fName[i].includes(input) || lName[i].includes(input)){
			const index = i;
			card[i].style.display = ''
		} else {
			card[i].style.display = 'none';
		}
	}
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
galleryImg.addEventListener('click', selectGallery)
exitBtn.addEventListener('click', closeBox)
scrollBtnCont.addEventListener('click', scrollFunc)
form.addEventListener('submit', formSearch)