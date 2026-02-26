// Initialisation des variables
const mainButton = document.getElementById("cookieclick");

let cookies = 0;
let cookiesLegacy = 0;
const counter = document.getElementById("counter");

let cookiesPerClick = 1;
const counterPerClick = document.getElementById("counterPerClick");

let bakerTitle = document.getElementById("bakerTitle");
if (cookies == 0) bakerTitle.textContent = "apprentice baker";

// Améliorations
let upgradesList = [
	{ name: "Electric Oven", factor: 1, price: 20 },
	{ name: "Fancy Grandma", factor: 2, price: 50 }
	];

	let upgradeBlock = document.getElementById("upgradeBlock");
	for (let upgrade of upgradesList) {
		let li = document.createElement("li");
		let upgradeButton = document.createElement("button");
		upgradeButton.textContent = upgrade.name + " (+" + upgrade.factor + "),	cost: " + upgrade.price + " cookies";
		upgradeButton.addEventListener("click", function() {
			buyUpgrade(upgrade);
		});
		li.appendChild(upgradeButton);
		upgradeBlock.appendChild(li);
		}

	function buyUpgrade(upgrade) {
		if (cookies >= upgrade.price) {
			cookies = cookies - upgrade.price;
			cookiesPerClick = cookiesPerClick + upgrade.factor;	
			counter.textContent = cookies;
			counterPerClick.textContent = cookiesPerClick;
		}
	}

// Listener du bouton principal
mainButton.addEventListener("click", function() {
	// Incrémentation du nombre de cookies
	cookies = cookies + cookiesPerClick;
	cookiesLegacy = cookiesLegacy + cookiesPerClick;

	// Mise à jour des compteurs
	counter.textContent = cookies;
	counterPerClick.textContent = cookiesPerClick;

	// Rang du boulanger
	if (cookiesLegacy >= 10) {
		bakerTitle.textContent = "junior baker";
	}
	if (cookiesLegacy >= 50) {
		bakerTitle.textContent = "baker";
	}
	if (cookiesLegacy >= 100) {
		bakerTitle.textContent = "master baker";
	}
	});