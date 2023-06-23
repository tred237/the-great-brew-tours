# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_23_201317) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "breweries", force: :cascade do |t|
    t.string "name", null: false
    t.string "website"
    t.string "address"
    t.string "city", null: false
    t.string "postal_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "creator_id", null: false
    t.index ["creator_id"], name: "index_breweries_on_creator_id"
  end

  create_table "brewery_reviews", force: :cascade do |t|
    t.boolean "is_recommended", null: false
    t.string "review", null: false
    t.boolean "is_edited", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.bigint "brewery_id", null: false
    t.index ["brewery_id"], name: "index_brewery_reviews_on_brewery_id"
    t.index ["user_id"], name: "index_brewery_reviews_on_user_id"
  end

  create_table "scheduled_tours", force: :cascade do |t|
    t.integer "number_of_people", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "tour_id", null: false
    t.bigint "user_id", null: false
    t.index ["tour_id"], name: "index_scheduled_tours_on_tour_id"
    t.index ["user_id"], name: "index_scheduled_tours_on_user_id"
  end

  create_table "tour_breweries", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "tour_id", null: false
    t.bigint "brewery_id", null: false
    t.index ["brewery_id"], name: "index_tour_breweries_on_brewery_id"
    t.index ["tour_id"], name: "index_tour_breweries_on_tour_id"
  end

  create_table "tours", force: :cascade do |t|
    t.date "tour_date", null: false
    t.time "time_to_meet", null: false
    t.float "duration", null: false
    t.string "meeting_location", null: false
    t.integer "available_slots", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "creator_id", null: false
    t.index ["creator_id"], name: "index_tours_on_creator_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "email", null: false
    t.integer "age", null: false
    t.boolean "is_admin", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "breweries", "users", column: "creator_id"
  add_foreign_key "brewery_reviews", "breweries"
  add_foreign_key "brewery_reviews", "users"
  add_foreign_key "scheduled_tours", "tours"
  add_foreign_key "scheduled_tours", "users"
  add_foreign_key "tour_breweries", "breweries"
  add_foreign_key "tour_breweries", "tours"
  add_foreign_key "tours", "users", column: "creator_id"
end
