const express =require("express")
const { authAdmin} = require("../Controllers/AdminController")
const { getAllUsers, deleteUser, updateUser, getUser, getOneUserBySearch}  = require("../Controllers/AuthControllers")

const router = express.Router()

router.route("/").get(getAllUsers).post(getOneUserBySearch)
router.route("/delete/:id").delete(deleteUser)
router.route("/edit/:id").patch(updateUser)
router.route("/adminlogin").post(authAdmin)
router.route("/edit/:id").get(getUser)

module.exports = router