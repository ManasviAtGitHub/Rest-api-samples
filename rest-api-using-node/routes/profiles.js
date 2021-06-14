const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");

// router.get("/",(req, res) =>{
//     res.send("HI, Welcome to user profiles");
// });
router.get("/",(req, res) =>{
    Profile.find()
    .exec()
    .then(result => {
        
        // console.log(result);
        const response={
            count : result.length,
            profiles : result.map(result_res =>{

                return {
                    name : result_res.name,
                    _id: result_res._id,
                    request_for_more_info :{
                        type: 'GET',
                        uri : 'http://localhost:5000/api/profiles/'+result_res._id 

                    }

                }
            }

            )};
        
        res.status(200).json(response);
        // res.status(200).json(result);

    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:err});
    });
});

router.get("/:profileId",(req, res) =>{
    const id = req.params.profileId;
    Profile.findById(id)
    .select('_id name job date')
    .exec()
    .then(result => {
        if(result){
            // console.log(result);

            res.status(200).json({
                profile : result,
                request:{
                    type : 'GET',
                    description : "GET all profiles following the uri",
                    uri: "http://localhost:5000/profiles"
                }

            });
        }else{
            res.status(404).json({message: "Not a valid entry"});
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({message:err});
    });
});

router.delete("/:profileId",(req, res) =>{
    const id = req.params.profileId;
    Profile.deleteOne({_id:id})
    .exec()
    .then(result => {
        // console.log(result);
        res.status(200).json({
            message:"Profile Deleted",
            request_to_create_new_profile:{
                type:'POST',
                uri: "http://localhost:5000/profiles",
                body: {name:'String', job:'String'}
            }
        });
    
        })
    .catch(err=>{
        console.log(err);
        res.status(404).json({message:err});
    });
});

router.patch("/:profileId",(req, res) =>{
    const id = req.params.profileId;
    const updateParam ={};
    for(const param of req.body){
        updateParam[param.name] = param.value;
    }


    Profile.updateOne(
        {_id: id},
        {$set : updateParam
            // job : req.body.job
        })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({

            message:"Profile updated",
            request:{
                type:'GET',
                uri: "http://localhost:5000/profiles"+id

            }

        });
    
        })
    .catch(err=>{
        console.log(err);
        res.status(404).json({message:err});
    });
});


router.post("/", (req, res)=>{

    const myprofile = new Profile({
        name : req.body.name,
        job : req.body.job
    });

    myprofile
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:"Created profile successfully",
                createProfile:{
                    name: result.name,
                    job: result.job,
                    id: result._id,
                request_for_more_info:{
                    type:'GET',
                    uri:"http://localhost:5000/api/profiles/"+result._id
                }}

            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({message:err});
        });

});




module.exports = router;



// router.get("/",(req, res) =>{
//     Profile.find()
//     .exec()
//     .then(result => {
//         console.log(result);
//         res.status(200).json(result);
//     })
//     .catch(err=>{
//         console.log(err);
//         res.status(500).json({message:err});
//     });
// });

// router.get("/:profileId",(req, res) =>{
//     const id = req.params.profileId;
//     Profile.findById(id)
//     .exec()
//     .then(result => {
//         if(result){
//             console.log(result);
//             res.status(200).json(result);
//         }else{
//             res.status(404).json({message: "Not a valid entry"});
//         }
        
//     })
//     .catch(err=>{
//         console.log(err);
//         res.status(404).json({message:err});
//     });
// });

// router.delete("/:profileId",(req, res) =>{
//     const id = req.params.profileId;
//     Profile.deleteOne({_id:id})
//     .exec()
//     .then(result => {
//         console.log(result);
//         res.status(200).json(result);
    
//         })
//     .catch(err=>{
//         console.log(err);
//         res.status(404).json({message:err});
//     });
// });

// router.patch("/:profileId",(req, res) =>{
//     const id = req.params.profileId;
//     const updateParam ={};
//     for(const param of req.body){
//         updateParam[param.name] = param.value;
//     }


//     Profile.updateMany(
//         {_id: id},
//         {$set : updateParam
//             // job : req.body.job
//         })
//     .exec()
//     .then(result => {
//         console.log(result);
//         res.status(200).json(result);
    
//         })
//     .catch(err=>{
//         console.log(err);
//         res.status(404).json({message:err});
//     });
// });


// router.post("/", (req, res)=>{

//     const myprofile = new Profile({
//         name : req.body.name,
//         job : req.body.job
//     });

//     myprofile
//         .save()
//         .then(result => {
//             console.log(result);
//             res.status(201).json({
//                 message : "handling post request to /profiles",
//                 createdProfile : result
//             });
//         })
//         .catch(err =>{
//             console.log(err);
//             res.status(500).json({message:err});
//         });

// });