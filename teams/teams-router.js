const router = require("express").Router();
const Teams = require("./teams-model");

router.post("/", (req, res) => {
    const teamInfo = req.body;

    Teams.add(teamInfo)
        .then(team => {
            res.status(201).json(team);
        })
        .catch(err => {
            res.status(500).json({ message: "couldnt add team" })
        });
});

router.get("/", (req, res) => {
    Teams.getTeams()
        .then(teams => {
            res.status(200).json(teams);
        })
        .catch(err => {
            res.status(500).json({ message: "could not get teams" })
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Teams.remove(id)
        .then(removed => {
            res.status(200).json(removed);
        })
        .catch(err => {
            res.status(500).json({ message: "could not delete team" })
        })
})


module.exports = router;