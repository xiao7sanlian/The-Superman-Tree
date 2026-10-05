let modInfo = {
	name: "The Superman Tree",
	author: "DeFe308",
	pointsName: "Superman Crystal",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours

	allowSmall: true,
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Super-QqQe308",
	pre:'',
	beta: '',
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1 2026/10/3~2026/10/5</h3><br>
		- Added Super-QqQe308.<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	//qi layer
	if(hasUpgrade('qi',11)) gain=gain.times(2)
	if(hasMilestone('qi',0)) gain=gain.times(tmp.qi.SPeff)
	//q layer
	if(hasMilestone('q',1)) gain=gain.times(buyableEffect('q',11))
	if(hasUpgrade('q',11)) gain=gain.times(upgradeEffect('q',11))
	//ach layer
	gain=gain.times(tmp.a.effect)
	if(hasAchievement('a',12)) gain=gain.times(2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	pause:n(1),
	devSpeed:n(0),
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade('qi',13)
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

//fast definition
function n(x){return new Decimal(x)}