const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema ({
  airport: {
    type: String,
    enum: ['ATL', 'AUS', 'DEN', 'DFW', 'LAX', 'SAN'],
    required: true
  },
  arrival: {
    type: Date,
    default: function() {
      const today = new Date()
      // console.log(today, 'today')
      const oneYearFromNow = today.getFullYear() + 1
      // console.log(oneYearFromNow, 'year from now')
      today.setFullYear(oneYearFromNow)
      return today
    },
    required: true
  }
}, {
  timestamps: true
})

const flightSchema = new Schema({
    airline: {
      type: String,
      enum: ['American', 'Emirates', 'Southwest', 'United']
    },
    airport: {
      type: String,
      enum: ['ATL', 'AUS', 'DEN', 'DFW', 'LAX', 'SAN']
    },
    flightNo: {
      type: Number,
      min: 10,
      max: 9999
    },
    departs: {
      type: Date,
      default: function() {
        const today = new Date()
        // console.log(today, 'today')
        const oneYearFromNow = today.getFullYear() + 1
        // console.log(oneYearFromNow, 'year from now')
        today.setFullYear(oneYearFromNow)
        return today
      }
    },
    destinations: [destinationSchema]
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Flight', flightSchema)
