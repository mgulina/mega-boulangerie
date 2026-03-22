// Initialisation des variables
const mainButton = document.getElementById("cookieclick");

let cookies = 0;
const counter = document.getElementById("counter");

let cookiesLegacy = 0;
const counterLegacy = document.getElementById("counterLegacy");


let cookiesPerClick = 1;
const counterPerClick = document.getElementById("counterPerClick");

let cpcFromBuildings = 0;
let cookiesPerClickUpgradeFactor = 1;

let bakerTitle = document.getElementById("bakerTitle");
if (cookies == 0) bakerTitle.textContent = "apprentice baker";

let buyFactor = 1;
let increaseFactor = 1.15;

// Formatage des nombres affichés
function formatNum(num) {
	if (num >= 10 ** 60) {
		return (num / 10 ** 60).toFixed(0) + "  NoD";
	}
	else if (num >= 10 ** 57) {
		return (num / 10 ** 57).toFixed(0) + "  OcD";
	}
	else if (num >= 10 ** 54) {
		return (num / 10 ** 54).toFixed(0) + "  SpD";
	}
	else if (num >= 10 ** 51) {
		return (num / 10 ** 51).toFixed(0) + "  SxD";
	}
	else if (num >= 10 ** 48) {
		return (num / 10 ** 48).toFixed(0) + "  QiD";
	}
	else if (num >= 10 ** 45) {
		return (num / 10 ** 45).toFixed(0) + "  QaD";
	}
	else if (num >= 10 ** 42) {
		return (num / 10 ** 42).toFixed(0) + " TrD";
	}
	else if (num >= 10 ** 39) {
		return (num / 10 ** 39).toFixed(0) + "  DoD";
	}
	else if (num >= 10 ** 36) {
		return (num / 10 ** 36).toFixed(0) + "  UnD";
	}
	else if (num >= 10 ** 33) {
		return (num / 10 ** 33).toFixed(0) + "  Dc";
	}
	else if (num >= 10 ** 30) {
		return (num / 10 ** 30).toFixed(0) + "  No";
	}
	else if (num >= 10 ** 27) {
		return (num / 10 ** 27).toFixed(0) + "  Oc";
	}
	else if (num >= 10 ** 24) {
		return (num / 10 ** 24).toFixed(0) + "  Sp";
	}
	else if (num >= 10 ** 21) {
		return (num / 10 ** 21).toFixed(0) + "  Sx";
	}
	else if (num >= 10 ** 18) {
		return (num / 10 ** 18).toFixed(0) + "  Qi";
	}
	else if (num >= 10 ** 15) {
		return (num / 10 ** 15).toFixed(0) + "  Qa";
	}
	else if (num >= 10 ** 12) {
		return (num / 10 ** 12).toFixed(0) + "  T";
	}
	else if (num >= 10 ** 9) {
		return (num / 10 ** 9).toFixed(0) + " B";
	}
	else if (num >= 10 ** 6) {
		return (num / 10 ** 6).toFixed(0) + " M";
	}
	else if (num >= 10 ** 3) {
		return (num / 10 ** 3).toFixed(0) + " K";
	}
	else {
		return num;
	}
}

// Liste des batiments
let buildingList = [
	{ name: "Gold hands", cpc: 1, price: 10*2, quantity: 0, description: "Gold hands to bake cookies faster!" },
	{ name: "Fancy Grandma", cpc: 2, price: 10*(2**2), quantity: 0, description: "A nice grandma to help you bake cookies!" },
	{ name: "Farm", cpc: 2 ** 2, price: 10*(2**3), quantity: 0, description: "A farm to grow cookie plants!" },
	{ name: "Mine", cpc: 2 ** 3, price: 10*(2**4), quantity: 0, description: "A mine to extract cookie ore!" },
	{ name: "Factory", cpc: 2 ** 4, price: 10*(2**5), quantity: 0, description: "A factory to mass produce cookies!" },
	{ name: "Bank", cpc: 2 ** 5, price: 10*(2**6), quantity: 0, description: "A bank to store your cookies!" },
	{ name: "Temple", cpc: 2 ** 6, price: 10*(2**7), quantity: 0, description: "A temple to worship the cookie gods!" },
	{ name: "Wizard tower", cpc: 2 ** 7, price: 10*(2**8), quantity: 0, description: "A wizard tower to cast cookie spells!" },
	{ name: "Shipment", cpc: 2 ** 8, price: 10*(2**9), quantity: 0, description: "A shipment to deliver cookies!" },
	{ name: "Alchemy lab", cpc: 2 ** 9, price: 10*(2**10), quantity: 0, description: "An alchemy lab to create magical cookies!" },
	{ name: "Portal", cpc: 2 ** 10, price: 10*(2**11), quantity: 0, description: "A portal to other cookie dimensions!" },
	{ name: "Time machine", cpc: 2 ** 11, price: 10*(2**12), quantity: 0, description: "A time machine to bake cookies in the past!" },
	{ name: "Antimatter condenser", cpc: 2 ** 12, price: 10*(2**13), quantity: 0, description: "An antimatter condenser to create cookie energy!" },
	{ name: "Prism", cpc: 2 ** 13, price: 10*(2**14), quantity: 0, description: "A prism to refract cookie light!" },
	{ name: "Chancemaker", cpc: 2 ** 14, price: 10*(2**15), quantity: 0, description: "A chancemaker to increase cookie chances!" },
	{ name: "Fractal engine", cpc: 2 ** 15, price: 10*(2**16), quantity: 0, description: "A fractal engine to generate infinite cookies!" },
	{ name: "Javascript console", cpc: 2 ** 16, price: 10*(2**17), quantity: 0, description: "A javascript console to debug your cookie empire!" },
	{ name: "Idleverses", cpc: 2 ** 17, price: 10*(2**18), quantity: 0, description: "An idleverses to explore different cookie universes!" },
	{ name: "Cortex baker", cpc: 2 ** 18, price: 10*(2**19), quantity: 0, description: "A cortex baker to optimize your cookie production!" },
	{ name: "You", cpc: 2 ** 19, price: 10*(2**20), quantity: 0, description: "You, the ultimate cookie master!" }
	];

// Création des boutons de bâtiments
let buildingBlock = document.getElementById("buildingBlock");
for (let building of buildingList) {
	let li = document.createElement("li");
	li.className = "upgrade-item";
	let buildingButton = document.createElement("button");
	//buildingButton.id = building.name.replace(/\s/g, "") + "Button"; // Remove spaces for ID
	buildingButton.textContent = building.name + " (+" + building.cpc + " cpc),	cost: " + formatNum(building.price) + " cookies" + " (owned: " + building.quantity + ")";
	buildingButton.title = building.description;
	buildingButton.addEventListener("click", function() {
		buyBuilding(building);
	});
	li.appendChild(buildingButton);
	buildingBlock.appendChild(li);
	}	

// Liste des améliorations
let upgradeList = [
	{ name: "Double-thick glass", description: "A double-thick glass to keep your cookies fresh!", price: 1000, purchased: false },
	{ name: "Lubricated dentures", description: "Lubricated dentures to chew cookies faster!", price: 5000, purchased: false },
	{ name: "Forwards from grandma", description: "Forwards from grandma to get cookie tips!", price: 10000, purchased: false },
	{ name: "Steel-plated rolling pins", description: "Steel-plated rolling pins to flatten cookies better!", price: 50000, purchased: false },
	{ name: "Caramelized sugar", description: "Caramelized sugar to make cookies sweeter!", price: 100000, purchased: false },
	{ name: "Radial chimes", description: "Radial chimes to increase cookie production!", price: 500000, purchased: false },
	{ name: "Billion fingers", description: "A billion fingers to click cookies faster!", price: 1000000, purchased: false }
];

// Création des boutons d'améliorations
let upgradeBlock = document.getElementById("upgradeBlock");
for (let upgrade of upgradeList) {
	let li = document.createElement("li");
	li.className = "upgrade-item";
	let upgradeButton = document.createElement("button");
	upgradeButton.textContent = upgrade.name +" (cost: " + formatNum(upgrade.price) + " cookies)";
	upgradeButton.title = upgrade.description;
	upgradeButton.addEventListener("click", function() {
		buyUpgrade(upgrade);
	});
	li.appendChild(upgradeButton);
	upgradeBlock.appendChild(li);
}

// Calcul du cpc total
function calculateCPC() {
	cpcFromBuildings = 0;
	for (let i = 0; i < buildingList.length; i++) {
		cpcFromBuildings += buildingList[i].quantity * buildingList[i].cpc;	
	}
}

// Mise à jour des compteurs 
function updateCounters() {
	calculateCPC();	
	counterPerClick.textContent = formatNum((cookiesPerClick + cpcFromBuildings) * cookiesPerClickUpgradeFactor);
	counter.textContent = formatNum(cookies);
	counterLegacy.textContent = formatNum(cookiesLegacy);
}

// Mise à jour des boutons de bâtiments
function updateBuildingButtons() {
	let buildingButtons = buildingBlock.getElementsByTagName("button");	
	for (let i = 0; i < buildingList.length; i++) {
		buildingButtons[i].textContent = buildingList[i].name + " (+" + buildingList[i].cpc * cookiesPerClickUpgradeFactor + " cpc),	cost: " + formatNum(buildingPrice(buildingList[i])) + " cookies" + " (owned: " + buildingList[i].quantity + ")";
	}
}

// Mise à jour des boutons d'améliorations
function updateUpgradeButtons() {
	let upgradeButtons = upgradeBlock.getElementsByTagName("button");
	for (let i = 0; i < upgradeList.length; i++) {
		if (upgradeList[i].purchased) {
			upgradeButtons[i].textContent = upgradeList[i].name + " (purchased)";
		}
	}
}


// Calcul du prix d'achat en fonction du facteur d'achat
function buildingPrice(building) {
	let price = 0;
	for (let i = 0; i < buyFactor; i++) {
		price += Math.round(building.price * (increaseFactor ** i));
	}
	return price;
}

/* function numberMaxBuy(building) {
	let quantity = 0;
	let price = building.price;
	while (price <= cookies) {
		quantity++;
		price = price + Math.round(building.price * increaseFactor**quantity);
	}
	return quantity;
} */

function buyBuilding(building) {

	let price = buildingPrice(building);
	if (cookies >= price ) {
		cookies = cookies - price;
		building.quantity += buyFactor;
		building.price = Math.round(building.price * increaseFactor**buyFactor);

		updateCounters();
		updateBuildingButtons();
	}
}

function buyUpgrade(upgrade) {
	let price = upgrade.price;
	if (cookies >= price && !upgrade.purchased) {
		cookies = cookies - price;
		upgrade.purchased = true;
		//upgradeButton.textContent = upgrade.name + " (purchased)";

		// Effets des améliorations // Placer le *2 dans la formule de calcul du cpc !!!
		if (upgrade.name == "Double-thick glass") {
			cookiesPerClickUpgradeFactor = cookiesPerClickUpgradeFactor * 2;
		}
		else if (upgrade.name == "Lubricated dentures") {
			cookiesPerClickUpgradeFactor = cookiesPerClickUpgradeFactor * 2;
		}
		else if (upgrade.name == "Forwards from grandma") {
			cookiesPerClickUpgradeFactor = cookiesPerClickUpgradeFactor * 2;
		}
		else if (upgrade.name == "Steel-plated rolling pins") {
			cookiesPerClickUpgradeFactor = cookiesPerClickUpgradeFactor * 2;
		}
		else if (upgrade.name == "Caramelized sugar") {
			cookiesPerClickUpgradeFactor = cookiesPerClickUpgradeFactor * 2;
		}
		else if (upgrade.name == "Radial chimes") {
			cookiesPerClickUpgradeFactor = cookiesPerClickUpgradeFactor * 2;
		}
		else if (upgrade.name == "Billion fingers") {
			cookiesPerClickUpgradeFactor = cookiesPerClickUpgradeFactor * 2;
		}
		updateCounters();
		updateUpgradeButtons();
		updateBuildingButtons();
	}
}


// Listener du bouton principal
mainButton.addEventListener("click", function() {
	// Incrémentation du nombre de cookies
	calculateCPC();
	cookies = cookies + (cookiesPerClick + cpcFromBuildings) * cookiesPerClickUpgradeFactor;
	cookiesLegacy = cookiesLegacy + (cookiesPerClick + cpcFromBuildings) * cookiesPerClickUpgradeFactor;

	updateCounters();

	// Rang du boulanger
	if (cookiesLegacy >= 10**6) {
		bakerTitle.textContent = "master baker";
	}
	else if (cookiesLegacy >= 10**4) {
		bakerTitle.textContent = "baker";
	}
	else if (cookiesLegacy >= 10**2) {
		bakerTitle.textContent = "junior baker";
	}	
});

// Listener du bouton de facteur d'achat
const buyFactorButton = document.getElementById("buyFactorButton");
buyFactorButton.addEventListener("click", function() {		
	if (buyFactor == 1) {
		buyFactor = 10;
	}
	else if (buyFactor == 10) {
		buyFactor = 100;
	}	
	else if (buyFactor == 100) {
		buyFactor = 1;
	}
	buyFactorButton.textContent = "Buy x" + buyFactor;
	updateBuildingButtons();
});

function tick() {
	// Création d'un événement personnalisé
	const tick = new Event("tick");

	// Écouteur pour réagir à l'événement
	document.addEventListener("tick", () => {
		mainButton.click();
		
	});

	let intervalId;
	if (buildingList[1].quantity > 0) {
		intervalId = setInterval(() => {
			document.dispatchEvent(tick);
		}, 1000);
	}
	else if (buildingList[1].quantity == 0) {
		clearInterval(intervalId);
	}
}