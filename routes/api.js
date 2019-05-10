// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is a sample API route. */

const Profile = require('../models/Profile')

router.get('/profile', (req, res) => {
	
	const query = req.query

	let filters = req.query
	if (req.query.age != null) {
		filters = {age: {$gt: query.age}}
	}

	Profile.find(filters)
	.then(profiles => {
		res.json({
			confirmation: 'success profile',
			data: profiles
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

})

router.put('/profile/update', (req, res) => {

	const query = req.query // require: id, key=value
	const profileId = query.id
	delete query['id']

	Profile.findByIdAndUpdate(profileId, query, {new: true})
	.then( profile=>
		res.json({
			confirmation: "success",
			data: profile
		}))
	.catch(err=>{
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('./profile/remove', (req, res) => {
	const query = req.query

	Profile.findByIdAndRemove(query.id)
	.then( () => {
		res.json({
			confirmation: 'success',
			data: 'Profile ' + query.id + ' successfully removed.'
		})
	})
	.catch( err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/profile/:id', (req, res) => {

const id = req.params.id

Profile.findById(id)
.then( profile => {
	res.json({
		confirmation: 'success',
		data: profile
	})
})
.catch(err=> {
	res.json({
		confirmation: "fail",
		message: 'Profile ' + id + ' not found.'
	})
})

})

router.post('/profile', (req, res) => {
	Profile.create(req.body)
	.then( profile=> {
		res.json({
			confirmation: 'success',
			data: profile
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
