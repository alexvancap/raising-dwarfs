# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_31_004445) do

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.integer "hungry"
    t.integer "thirsty"
    t.integer "sleepy"
    t.integer "social"
    t.string "status"
    t.integer "user_id"
    t.integer "earnings"
  end

  create_table "charlists", force: :cascade do |t|
    t.string "name"
    t.string "price"
    t.string "image"
    t.integer "earnings"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.integer "money"
  end

end
