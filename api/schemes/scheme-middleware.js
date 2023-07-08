const db = require('../../data/db-config')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
async function checkSchemeId (req, res, next) {
  const schemeId = await db('schemes').where('scheme_id', req.params.scheme_id).first();

  if (!schemeId) {
    res.status(404).json({message: `scheme with scheme_id ${req.params.scheme_id} not found`})
  } else {
    next()
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const schemeName = req.body.scheme_name

  if (!schemeName || isNaN(schemeName) === false || schemeName.length === 0) {
    res.status(400).json({message: "invalid scheme_name"})
  } else next()

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/

// http post :9000/api/schemes/8/steps instructions='Do not eat junk food' step_number=4

const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;

  console.log(instructions, step_number)
  
  if (!instructions || 
    isNaN(instructions) === false || 
    instructions.length === 0 ||
    isNaN(step_number) === true ||
    !step_number ||
    step_number < 1) {
      res.status(400).json({message: "invalid step"})
    } else next()


}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
