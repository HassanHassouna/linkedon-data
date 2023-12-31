const mongoose = require('mongoose')
const fs = require("fs")
const data = JSON.parse(fs.readFileSync("people.json"))

mongoose.connect('mongodb://localhost/test-db', { useNewUrlParser: true })

const Person = mongoose.model('Person', new mongoose.Schema({
    firstName: String,
    lastName: String,
    currentCompany: {
        industry: String,
        name: String
    },
    currentPosition: String,
    previousCompanies: [
        {
            industry: String,
            name: String
        }
    ],
    salary: Number
}, { collection: "linkedon" }, {multi: true}))

const onInsert = function (err, docs) {
    if (err) { console.log(err) }
    else { console.info('Done'); mongoose.disconnect() }
}

Person.collection.insertMany(data, onInsert)

//Find the count of people who make more than 25000.

db.linkedon.count({salary: {$gt: 25000}})

// Find only the top 3 earning people, and return only their first name and salary.

db.linkedon.find({}, {firstName: 1, salary: 1}).sort({salary: -1}).limit(3)

// Find the total number of people currently working at Walmart that are earning at least 7000.

db.linkedon.count({currentCompany: {name: "Walmart"}, salary: {$gte: 7000}})

// Find the current company name, full name, and salary of the highest earning person that currently works in either Sales or Retail.
// Make sure you’re returning only those fields (company name, first and last name, and salary.)
// You should find it to be Holly Gonzales, working at Groupon for 20,000.

db.linkedon.find({$or: [{currentCompany: {industry: "Sales"}}, {currentCompany: {industry: "Retail"}}]}, {firstName: 1, lastName: 1, salary: 1, "currentCompany.name": 1}).sort({salary: -1}).limit(1)

// Find the number of people who have ever worked at Apple, past or present.

db.linkedon.count({$or: [{currentCompany: {name: "Apple"}}, {previousCompanies: {name: "Apple"}}]})


