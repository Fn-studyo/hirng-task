'use-strict';
const { validationResult } = require("express-validator/check");
const request = require("request");
const csv=require('csvtojson');
const linkCheck = require('link-check');
const {shuffle} = require("../helpers/shuffle.helper");
const {getRandomString} = require("../helpers/randomString.helper");


exports.actionCsv = async (req, res) => {
    let payload = req.body;
    let alpha = getRandomString(12);
    let num = Math.floor(Math.random() * 10000000000000);
    let conversionKey = shuffle(alpha+num);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    await performAction(payload, req, res, conversionKey);
}

async function performAction(payload, req, res, conversionKey) {
    const jsonArray= await csv().fromStream(request.get(payload.csv.url));
    const subtractTwoArrays = (arr1, arr2) => arr1.filter( el => !arr2.includes(el) )
    let info = subtractTwoArrays(Object.keys(jsonArray[0]), payload.csv.select_fields);
    const colParser = info.reduce((acc,curr)=> (acc[curr]='omit', acc),{});
    let check = payload.csv.select_fields.every((el) => {
        return  Object.keys(jsonArray[0]).indexOf(el) !== -1;
    });

    linkCheck(payload.csv.url,  (err, result) => {
        if(result.status === 'dead'){
            return res.status(422).send({
                message: 'This url is invalid'
            })
        }else{
            if(check){
                csv(payload.csv.select_fields.length > 0 ? {
                    colParser,
                    checkType:true
                } : {})
                    .fromStream(request.get(payload.csv.url))
                    .then((json)=>{
                        return res.status(200).send({
                            conversion_key:conversionKey,
                            json
                        });
                    }).catch((err)=>{
                    return res.send(err);
                });
            }else{
                return res.status(404).send({
                    error:'Your selected field option does not exist/invalid'
                })
            }
        }
    });
}




