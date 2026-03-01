// Initialisation des variables
const mainButton = document.getElementById("cookieclick");

let cookies = 0;
const counter = document.getElementById("counter");

let cookiesLegacy = 0;
const counterLegacy = document.getElementById("counterLegacy");


let cookiesPerClick = 1;
const counterPerClick = document.getElementById("counterPerClick");

let bakerTitle = document.getElementById("bakerTitle");
if (cookies == 0) bakerTitle.textContent = "apprentice baker";

let buyFactor = 1;

// Liste des batiments
let buildingList = [
	{ name: "Electric Oven", cpc: 1, price: 10*2, quantity: 0 },
	{ name: "Fancy Grandma", cpc: 2, price: 10*(2**2), quantity: 0 },
	{ name: "Farm", cpc: 2 ** 2, price: 10*(2**3), quantity: 0 },
	{ name: "Mine", cpc: 2 ** 3, price: 10*(2**4), quantity: 0 },
	{ name: "Factory", cpc: 2 ** 4, price: 10*(2**5), quantity: 0 },
	{ name: "Bank", cpc: 2 ** 5, price: 10*(2**6), quantity: 0 },
	{ name: "Temple", cpc: 2 ** 6, price: 10*(2**7), quantity: 0 },
	{ name: "Wizard tower", cpc: 2 ** 7, price: 10*(2**8), quantity: 0 },
	{ name: "Shipment", cpc: 2 ** 8, price: 10*(2**9), quantity: 0 },
	{ name: "Alchemy lab", cpc: 2 ** 9, price: 10*(2**10), quantity: 0 },
	{ name: "Portal", cpc: 2 ** 10, price: 10*(2**11), quantity: 0 },
	{ name: "Time machine", cpc: 2 ** 11, price: 10*(2**12), quantity: 0 },
	{ name: "Antimatter condenser", cpc: 2 ** 12, price: 10*(2**13), quantity: 0 },
	{ name: "Prism", cpc: 2 ** 13, price: 10*(2**14), quantity: 0 },
	{ name: "Chancemaker", cpc: 2 ** 14, price: 10*(2**15), quantity: 0 },
	{ name: "Fractal engine", cpc: 2 ** 15, price: 10*(2**16), quantity: 0 },
	{ name: "Javascript console", cpc: 2 ** 16, price: 10*(2**17), quantity: 0 },
	{ name: "Idleverses", cpc: 2 ** 17, price: 10*(2**18), quantity: 0 },
	{ name: "Cortex baker", cpc: 2 ** 18, price: 10*(2**19), quantity: 0 },
	{ name: "You", cpc: 2 ** 19, price: 10*(2**20), quantity: 0 }
	];

	let buildingBlock = document.getElementById("buildingBlock");
	const br = document.createElement("br");
	for (let building of buildingList) {
		let li = document.createElement("li");
		let buildingButton = document.createElement("button");
		buildingButton.id = building.name.replace(/\s/g, "") + "Button"; // Remove spaces for ID
		buildingButton.textContent = building.name + " (+" + building.cpc + " cpc),	cost: " + building.price + " cookies" + " (owned: " + building.quantity + ")";
		buildingButton.addEventListener("click", function() {
			buyBuilding(building);
		});
		li.appendChild(buildingButton);
		buildingBlock.appendChild(li);
		buildingBlock.appendChild(br.cloneNode());
		}

	// Mise à jour des compteurs et des boutons de bâtiments
	function updateBuildingButtons() {
		counter.textContent = cookies;
		counterPerClick.textContent = cookiesPerClick;

		let buildingButtons = buildingBlock.getElementsByTagName("button");	
		for (let i = 0; i < buildingList.length; i++) {
			buildingButtons[i].textContent = buildingList[i].name + " (+" + buildingList[i].cpc + " cpc),	cost: " + buildingPrice(buildingList[i]) + " cookies" + " (owned: " + buildingList[i].quantity + ")";
		}
	}

	function buildingPrice(building) {
		let price = 0;
		for (let i = 0; i < buyFactor; i++) {
			price += Math.round(building.price * (1.15 ** i));
		}
		return price;
	}

	/* function numberMaxBuy(building) {
		let quantity = 0;
		let price = building.price;
		while (price <= cookies) {
			quantity++;
			price = price + Math.round(building.price * 1.15);
		}
		return quantity;
	} */

	function buyBuilding(building) {

		let price = buildingPrice(building);
		if (cookies >= price ) {
			cookies = cookies - price;
			cookiesPerClick = cookiesPerClick + buyFactor * building.cpc;	

			building.quantity += buyFactor;

			building.price = Math.round(building.price * 1.15**buyFactor);

			updateBuildingButtons();
		}
	}

// Listener du bouton principal
mainButton.addEventListener("click", function() {
	// Incrémentation du nombre de cookies
	cookies = cookies + cookiesPerClick;
	cookiesLegacy = cookiesLegacy + cookiesPerClick;

	// Mise à jour des compteurs
	counter.textContent = cookies;
	counterLegacy.textContent = cookiesLegacy;
	counterPerClick.textContent = cookiesPerClick;

	// Rang du boulanger
	if (cookiesLegacy >= 100) {
		bakerTitle.textContent = "master baker";
	}
	else if (cookiesLegacy >= 50) {
		bakerTitle.textContent = "baker";
	}
	else if (cookiesLegacy >= 10) {
		bakerTitle.textContent = "junior baker";
	}	
	});

	// Listener du bouton de facteur d'achat
	const buyFactorButton = document.getElementById("buyFactorButton");
	buyFactorButton.addEventListener("click", function() {		
		if (buyFactor == 1) {
			buyFactor = 10;
			buyFactorButton.textContent = "Buy x10";	
		}
		else if (buyFactor == 10) {
			buyFactor = 100;
			buyFactorButton.textContent = "Buy x100";	
		}	
		else if (buyFactor == 100) {
			buyFactor = 1;
			buyFactorButton.textContent = "Buy x1";	
		}
		updateBuildingButtons();
	});