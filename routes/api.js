// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is a sample API route. */

const Company = require('../models/Company')

router.get('/company', (req, res) => {

	Company.find()
	.then(companies => {
		res.json({
			confirmation: 'success',
			data: companies
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

})

router.put('/company/update', (req, res) => {

	const query = req.query // require: id, key=value
	const companyId = query.id
	delete query['id']

	Company.findByIdAndUpdate(companyId, query, {new: true})
	.then( company=>
		res.json({
			confirmation: "success",
			data: company
		}))
	.catch(err=>{
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('./company/remove', (req, res) => {
	const query = req.query

	Company.findByIdAndRemove(query.id)
	.then( () => {
		res.json({
			confirmation: 'success',
			data: 'Company ' + query.id + ' successfully removed.'
		})
	})
	.catch( err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/company/:id', (req, res) => {

const id = req.params.id

Company.findById(id)
.then( company => {
	res.json({
		confirmation: 'success',
		data: company
	})
})
.catch(err=> {
	res.json({
		confirmation: "fail",
		message: 'Company ' + id + ' not found.'
	})
})

})

router.post('/company', (req, res) => {
	Company.create(req.body)
	.then( company => {
		res.json({
			confirmation: 'success',
			data: company
		})
	})
	.catch( err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

})


// router.get('/:resource', (req, res) => {
// 	res.json({
// 		confirmation: 'success',
// 		resource: req.params.resource,
// 		query: req.query // from the url query string
// 	})
// })

// router.get('/:resource/:id', (req, res) => {
// 	res.json({
// 		confirmation: 'success',
// 		resource: req.params.resource,
// 		id: req.params.id,
// 		query: req.query // from the url query string
// 	})
// })



module.exports = router
