
exports.up = async (knex) => {
  await knex.schema
    .createTable('categories', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.timestamps(true, true)
    })
    .createTable('books', (table) => {
      table.increments('id').primary()
      table.string('name').unique()
      table.integer('rating')
      table.string('yearPublished')
      table.integer('categoryId').references('categories.id')
      table.timestamps(true, true)
    })
    .createTable('pages', (table) => { // one book, many pages
      table.increments('id').primary()
      table.string('content')
      table.integer('bookId').references('books.id')
      // table.integer('ownerId').unsigned().references('id').inTable('persons').onDelete('SET NULL');
      table.timestamps(true, true)
    })
    .createTable('authors', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('avatar').defaultsTo('')
      table.timestamps(true, true)
    })
    .createTable('books_authors', (table) => { // many books, many authors
      // table.increments('id').primary()
      table.integer('bookId').unsigned().references('books.id')
      // table.integer('bookId').unsigned().references('id').inTable('books').onDelete('CASCADE')
      table.integer('authorId').unsigned().references('authors.id')
      // table.integer('authorId').unsigned().references('id').inTable('authors').onDelete('CASCADE')
      table.unique(['bookId', 'authorId']) // remove this and you will have duplicates
    })

    .createTable('country', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('code')
      table.string('icc')
    })
    .createTable('person', (table) => {
      table.string('firstName')
      table.string('lastName')
      table.string('country')
      table.string('sex')
      table.integer('weightKg')
      table.integer('heightCm')
      table.date('dateOfBirth')
      table.time('timeOfBirth')
      table.datetime('testDateTime')
      table.string('updated_by')
      table.datetime('updated_at')      
      table.unique(['firstName', 'lastName'])
    })

}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('authors_books')
    .dropTableIfExists('pages')
    .dropTableIfExists('authors')
    .dropTableIfExists('books')

    .dropTableIfExists('country')
    .dropTableIfExists('person')
}


/* bookshelf
var Book = bookshelf.Model.extend({
  tableName: 'books',
  authors: function() {
    return this.belongsToMany(Author);
  },
  pages: function() {
    return this.hasMany(Page);
  }
});

var Page = bookshelf.Model.extend({
  tableName: 'pages',
  book: function() {
    return this.belongsTo(Book);
  }
});

var Author = bookshelf.Model.extend({
  tableName: 'authors',
  books: function() {
    return this.belongsToMany(Book);
  }
});
*/