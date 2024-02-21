const FlightModel = require('../models/flight')

module.exports = {
	new: newFlight,
	create,
	index,
	show
}

async function show(req, res) {
	try {
		const newFlight = new FlightModel()
		const defaultDate = newFlight.departs.toISOString().slice(0, 16)
		const flightFromTheDatabase = await FlightModel.findById(req.params.id)
		console.log(flightFromTheDatabase);
		res.render("flights/show", { flight: flightFromTheDatabase, defaultDate: defaultDate });
	} catch (err) {
		res.send(err);
	}
}

function newFlight(req, res) {
	const newFlight = new FlightModel()
	// console.log('departs', newFlight.departs)
	const defaultDate = newFlight.departs.toISOString().slice(0, 16)
	res.render('flights/new', { defaultDate: defaultDate })
}

// function create(req, res) {
//     FlightModel.create(req.body)
//     res.redirect('/flights')
// }

async function create(req, res) {
	console.log(req.body, " <- is the contents of our form!")

	try {
		const createdFlightDoc = await FlightModel.create(req.body)
		res.redirect('/flights')
	} catch (err) {
		console.log(err)
		res.redirect('/flights/new')
	}
}

async function index(req, res) {
	// model to go database and get all movies, then send an ejs page with all movies to browser
	try {
		const flightDocumentsFromTheDB = await FlightModel.find({}) // .find is a mongoose model query method
		res.render('flights/index', { flightDocs: flightDocumentsFromTheDB }) // /movies/index is looking in the views folder for the ejs page
		// movieDocs is now a variable inside of views/movies/index.ejs
	} catch (err) {
		console.log(err)
		res.redirect('/flights')
	}
}