console.log('Hello world!')

let accepted = [-3, 00, 02, 4, 7, 10, 12]
let schoolColors = ['danger', 'info', 'info', 'link']

let school = ''
let schoolId = null

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
	dynPage1()
}

function remove(page) {
	const el = document.querySelector('#' + page + '')

	setTimeout(function(){ el.remove(); }, 500);
}

function dynPage1() {
	let body = document.body
	const el = document.createElement('section')
	el.innerHTML = `
		<div class="hero-body">
  	<div class="floating-back">
  		<a href="#2" onclick="remove('page1')">
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
		<p class="subtitle">Nu skal vi i gang. Hvor mange A-fag har du?</p>

		<div class="select is-rounded">
		  <select id="aGradesSelect">
		    <option>Antal A-fag</option>
		    <option>3</option>
		    <option>4</option>
		    <option>5</option>
		    <option>6</option>
		  </select>
		</div>

		<a href="#4" onclick="dynPage2()"class="button is-medium is-success">Fortsæt</a>
    </div>
  </div>
  `;
  el.className = `hero is-${schoolColors[schoolId]} is-fullheight`
  el.id = "page1"

  body.appendChild(el);

  setTimeout(function(){ el.scrollIntoView(); }, 50);
}

function dynPage2() {
	let body = document.body

	let aGrades = document.querySelector('#aGradesSelect').value
	console.log(aGrades)
	const el = document.createElement('section')
	el.innerHTML = `
  <div class="hero-body">
  	<div class="floating-back">
  		<a href="#3" onclick="remove('page2')">
	  		<span class="icon-text">
			  <span class="icon">
			    <i class="fas fa-arrow-left"></i>
			  </span>
			  <span>Tilbage</span>
			</span>
		</a>
  	</div>
    <div class="">
     	<h1 class="title">HTX - 3 A-fag</h1>
		<p class="subtitle">Hvilke karakterer fik du i de fag? <br>Indtast den samlede karakter, medmindre du markerer andet i afkrydsningsfeltet</p>

		<div id="grades" class="columns"></div>

		<a href="#5" class="button is-medium is-primary">Fortsæt</a>
    </div>
  </div>
  `;
  el.className = `hero is-${schoolColors[schoolId]} is-fullheight`
  el.id = "page2"

  body.appendChild(el);
  setTimeout(function(){

	  for (var i = 0; i < aGrades; i++) {
		  	let column = document.querySelector('#grades')
		  	const detail = document.createElement('div')
			detail.innerHTML = `
				  	<label class="checkbox">
						  <input id="samlet${i+1}" class="samlet" onclick="handleSamlet(${i+1})" type="checkbox">
						  Både skriftligt og mundtligt?
						</label>

				   <input class="input grades" id="samlet${i+1}" placeholder="Samlet karakter">
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
			const input = document.createElement('input')

		  	input.className = `input grades ekstra`
		  	input.id = `ekstra${index}`
		  	input.placeholder = `Ekstra karakter`

			column.appendChild(input)

			console.log('checked')
		} else {
			console.log('not cheked')

			const ekstra = document.querySelector('#ekstra' + index)
			if(ekstra) {
				ekstra.remove()
			} else {
				console.log('no ekstra input')
			}
			
		}

		  

		  
}