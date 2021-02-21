const express = require("express");
const router = express.Router();
const axios = require("axios");


router.get("/", async (req, res) => {
	axios.defaults.headers.common["Authorization"] = "Token token=MdMC5NNjd_4Gp6AnV7W-4_IsbNLcFkvR_RAMtZdL";
	axios.defaults.headers.common["X-Api-Version"] = "20161108";
	axios.defaults.headers.common["Accept"] = "application/vnd.api+json";

	axios
		.get("https://api.teamtailor.com/v1/jobs")
		.then((response) => {
			const jobArray = [];
			response.data.data.map((job) => {
				jobArray.push(job);
			})
			res.send(jobArray);
		})
		.catch((err) => {
			console.log(err)
		});
});

module.exports = router;
