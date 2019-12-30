# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Character.destroy_all

player1 = User.create({username: "player 1", password_digest: "123"})

character1 = Character.create({name: "character 1", hungry: 75, thirsty: 75, sleepy: 75, social: 75, status: "cool", user: player1})
