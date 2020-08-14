
exports.up = function (knex) {
    return knex.schema.createTable("teams", tbl => {
        tbl.increments();
        tbl.string("city", 255).notNullable();
        tbl.string("name", 255).notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("teams");
};
