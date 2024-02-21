const FlightModel = require('../models/flight')

module.exports = {
    create
}

async function create (req,res) {
  
    try {
        const flightDoc = await FlightModel.findById(req.params.id)
        flightDoc.destinations.push(req.body); 
        await flightDoc.save()
        // const defaultDate = flightDoc.arrival.toISOString().slice(0, 16)
        res.redirect(`/flights/${req.params.id}`)
    } catch(err) {
        console.log(err)
        res.send(err)
    }



}