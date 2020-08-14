const db = require("../data/db-config");

module.exports = {
    add,
    getTeams,
    remove
}

async function add(team) {
    const id = await db("teams").insert(team);

    return db("teams").where({ id }).first();
}

async function getTeams() {
    return db("teams");
}

async function remove(id) {
    return db("teams").where({ id }).del();
}