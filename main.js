console.log('Hello world!')

let accepted = [-3, 00, 02, 4, 7, 10, 12]
let schoolColors = ['danger', 'info', 'info', 'link']

let school = ''
let schoolId = null

let grades

let AGrades
let BGrades
let CGrades

function schoolSelect(selected) {
	school = selected

	switch(school) {
		case 'stx':
			schoolId = 0
			break;

		case 'hf':
			schoolId = 1
			break;

		case 'hhx':
			schoolId = 2
			break;

		case 'htx':
			schoolId = 3
			break;
	}
	dynPage1('A')
}

function remove(page) {
	const el = document.querySelector('#' + page + '')

	setTimeout(function(){ el.remove(); }, 500);
}

function dynPage1(fag) {
	let title= fag.toUpperCase()
	let body = document.body

	let AOptions = [3, 4, 5, 6]
	let BOptions = [2, 3, 4, 5]
	let COptions = [1, 2, 3, 4]
	let options = []

	switch(title) {
		case 'A':
		 options = AOptions
		 break;

		case 'B':
		 options = BOptions
		 break;

		case 'C':
		 options = COptions
		 break;

		case 'DONE':
		 alert('Alle karakerer indsamlet')
		 break; 
	}
	
	const el = document.createElement('section')
	el.innerHTML = `
<div class="hero-body">
  	<div class="floating-back">
  		<a href="#2" onclick="remove('page1${fag}')">
	  		<span class="icon-text">
			  <span class="icon">
			    <i class="fas fa-arrow-left"></i>
			  </span>
			  <span>Tilbage</span>
			</span>
		</a>
  	</div>
    <div class="">
     	<h1 class="title">${school.toUpperCase()}</h1>
		<p class="subtitle">Hvor mange ${title}-fag har du?</p>

		<div class="select is-rounded">
		  <select id="${title}GradesSelect">
		    <option>Antal ${title}-fag</option>
		    <option>${options[0]}</option>
		    <option>${options[1]}</option>
		    <option>${options[2]}</option>
		    <option>${options[3]}</option>
		  </select>
		</div>

		<a href="#4" onclick="dynPage2('${title}')" class="button is-medium is-success">Fortsæt</a>
    </div>
  </div>
  `;
  el.className = `hero is-${schoolColors[schoolId]} is-fullheight`
  el.id = "page1" + fag

  body.appendChild(el);

  setTimeout(function(){ el.scrollIntoView(); }, 50);
}

function dynPage2(fag) {
	let body = document.body
	let next 

	switch(fag) {
		case 'A': 
			next = 'B'
			break;

		case 'B': 
			next = 'C'
			break;

		case 'C': 
			next = 'DONE'
			break;
	}

	grades = document.querySelector('#' + fag + 'GradesSelect').value

	const el = document.createElement('section')
	el.innerHTML = `
  <div class="hero-body">
  	<div class="floating-back">
  		<a href="#3" onclick="remove('page2${fag}')">
	  		<span class="icon-text">
			  <span class="icon">
			    <i class="fas fa-arrow-left"></i>
			  </span>
			  <span>Tilbage</span>
			</span>
		</a>
  	</div>
    <div class="">
     	<h1 class="title">${school.toUpperCase()} - ${grades} ${fag}-fag</h1>
		<p class="subtitle">Hvilke karakterer fik du i de fag? <br>Indtast den samlede karakter, medmindre du markerer andet i afkrydsningsfeltet</p>

		<div id="grades${fag}" class="columns"></div>

		<a href="#5" onclick="dynPage1('${next}')" class="button is-medium is-primary">Fortsæt</a>
		<a href="#5" onclick="getGrades('${fag}', '${grades}')" class="button is-medium is-primary">Indsamling</a>
    </div>
  </div>
  `;
  el.className = `hero is-${schoolColors[schoolId]} is-fullheight`
  el.id = "page2" + fag

  body.appendChild(el);
  setTimeout(function(){

	  for (var i = 0; i < grades; i++) {
	  	console.log('created input')
		  	let column = document.querySelector('#grades' + fag)
		  	const detail = document.createElement('div')
			detail.innerHTML = `
				  	<label class="checkbox">
						  <input id="samlet${i+1}" class="samlet" onclick="handleSamlet(${i+1})" type="checkbox">
						  Både skriftligt og mundtligt?
						</label>

				   <input class="input grades" id="samlet${i+1}Input" placeholder="Samlet karakter" required>
				 </div>  `;
		  detail.className = `column${i+1}`

		  column.appendChild(detail)
		}
	}, 150);
  setTimeout(function(){ el.scrollIntoView(); }, 50);
}

function handleSamlet(index) {
	const element = document.querySelector('#samlet' + index)
	const column = document.querySelector('.column' + index)


		if(element.checked) {
			document.querySelector('#samlet' + index + 'Input').setAttribute('placeholder', 'Skriftlig karakter')

			const input = document.createElement('input')

		  	input.className = `input grades ekstra`
		  	input.id = `ekstra${index}`
		  	input.placeholder = `Mundtlig karakter`
		  	input.required = true

			column.appendChild(input)

			//console.log('checked')
		} else {
			//console.log('not cheked')

			const ekstra = document.querySelector('#ekstra' + index)

			if(ekstra) {

				ekstra.remove()
				document.querySelector('#samlet' + index + 'Input').setAttribute('placeholder', 'Samlet karakter')
			} else {

				//console.log('no ekstra input')
			}	
		}		  
}

function getGrades(fag, number) {
	let temp = []

	for (var i = 1; i <= number; i++) {
		let grade = document.querySelector('#samlet' + i + 'Input').value

		temp.push(parseInt(grade))
	}

	console.log(temp)

	switch(fag) {
		case 'A':
			AGrades = temp
			break;

		case 'B':
			BGrades = temp
			break;

		case 'C':
			CGrades = temp
			break;
	}
}


function calcSnit() {
	let total = 0
	let vægte = [1, 1.5, 2]
	let qty = 0

	for (let i = 0; i < AGrades.length; i++) {

		total += (AGrades[i] * vægte[2])
		qty += vægte[2]
	}

	let snit = total/qty

	console.log(snit)
}