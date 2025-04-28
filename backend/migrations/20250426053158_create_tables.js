exports.up = function (knex) {
  return knex.schema
    .createTable("categories", (table) => {
      table.increments("id").primary();
      table.string("name").unique().notNullable();
    })
    .createTable("training_offers", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("description");
      table.integer("category_id").references("id").inTable("categories");
      table.date("start_date");
      table.integer("duration");
      table.text("prerequisites"); // store as JSON string
    })
    .createTable("training_materials", (table) => {
      table.increments("id").primary();
      table.integer("offer_id").references("id").inTable("training_offers");
      table.string("file_url");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("training_materials")
    .dropTableIfExists("training_offers")
    .dropTableIfExists("categories");
};
