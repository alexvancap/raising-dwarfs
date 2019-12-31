# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Character.destroy_all
Charlist.destroy_all

player1 = User.create({username: "player 1", password_digest: "123", money: 600})
Character.create({name: "Creep", image: "/characters/idle_citizen.gif", hungry: 75, thirsty: 75, sleepy: 2, social: 75, status: "cool", user: player1})

# creep = ListChar.create({name: "Creep", image: "/characters/idle_citizen.gif", hungry: 75, thirsty: 75, sleepy: 75, social: 75, status: "cool", user: player1})

Charlist.create({name: "Creep", image: "/characters/idle_citizen.gif", price: 500})
Charlist.create({name: "Artist", image: "/characters/waving_artist.gif", price: 500})
Charlist.create({name: "Astrologer", image: "/characters/idle_astrologer.gif", price: 500})
Charlist.create({name: "Herbalist", image: "/characters/idle_herbalist.gif", price: 500})
Charlist.create({name: "Blacksmith", image: "/characters/blacksmith.gif", price: 500})
Charlist.create({name: "Hunter", image: "/characters/idle_hunter.gif", price: 500})
Charlist.create({name: "Barber", image: "/characters/idle_barber.gif", price: 500})

