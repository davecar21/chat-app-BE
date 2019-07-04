const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // const result = await UserModel.getUser();
        console.log(res.locals.token)
        // return res.status(200).send(result);
    } catch (error) {
        return res.status(400).send({
            response: 'FAILED',
            message: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        // const result = await UserModel.postUser(req.body);
        return res.status(200).send({
            response: 'SUCCESS',
            message: {
                // employeeID: result.employeeID
            }
        });
    } catch (error) {
        console.log(error)
        let errorMsg=[];
        _.forEach(error.errors, function (value, key) {
            errorMsg.push(value.message);
        });
        return res.status(400).send({
            response: 'FAILED',
            message: errorMsg,
            error: error.errmsg
        });
    }
});

router.put('/', async (req, res) => {
    try {
        // const result = await UserModel.putUser(req.body);
        
        return res.status(200).send({
            response: 'SUCCESS',
            message: {
                // username: result
            }
        });
    } catch (error) {
        return res.status(400).send({
            response: 'FAILED',
            message: error.message.message
        });
    }
});

module.exports = router;