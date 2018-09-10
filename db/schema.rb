# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_09_10_220454) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "availabilities", force: :cascade do |t|
    t.integer "pro_id", null: false
    t.string "day", null: false
    t.integer "start_time", null: false
    t.integer "end_time", null: false
    t.integer "club_id", null: false
    t.index ["club_id"], name: "index_availabilities_on_club_id"
    t.index ["pro_id"], name: "index_availabilities_on_pro_id"
  end

  create_table "bookings", force: :cascade do |t|
    t.integer "club_id", null: false
    t.integer "court_num", null: false
    t.integer "booked_by_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "date", null: false
    t.string "title"
    t.string "color"
    t.integer "time"
    t.string "event_type"
    t.integer "pro_id"
    t.integer "event_id"
    t.index ["booked_by_id"], name: "index_bookings_on_booked_by_id"
    t.index ["court_num"], name: "index_bookings_on_court_num"
    t.index ["time", "date", "court_num"], name: "index_bookings_on_time_and_date_and_court_num", unique: true
  end

  create_table "clubs", force: :cascade do |t|
    t.string "name", null: false
    t.integer "director_id"
    t.integer "court_amt"
    t.float "lat"
    t.float "lng"
    t.string "phone_number"
    t.string "email"
    t.string "address"
    t.string "secret", null: false
    t.string "ready", default: "false", null: false
  end

  create_table "courts", force: :cascade do |t|
    t.integer "club_id", null: false
    t.string "name"
    t.string "court_type"
    t.index ["club_id"], name: "index_courts_on_club_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "title", null: false
    t.string "event_type", null: false
    t.string "registerable", null: false
    t.string "start_time", null: false
    t.string "end_time", null: false
    t.integer "maxppl"
    t.string "date", null: false
    t.integer "club_id", null: false
    t.index ["club_id"], name: "index_events_on_club_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.integer "member_id", null: false
    t.integer "club_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["club_id"], name: "index_memberships_on_club_id"
    t.index ["member_id", "club_id"], name: "index_memberships_on_member_id_and_club_id", unique: true
    t.index ["member_id"], name: "index_memberships_on_member_id"
  end

  create_table "results", force: :cascade do |t|
    t.integer "winner_id", null: false
    t.integer "loser_id", null: false
    t.integer "line_num"
    t.string "score"
    t.index ["loser_id"], name: "index_results_on_loser_id"
    t.index ["winner_id"], name: "index_results_on_winner_id"
  end

  create_table "rosters", force: :cascade do |t|
    t.integer "team_id"
    t.integer "member_id"
    t.index ["member_id"], name: "index_rosters_on_member_id"
    t.index ["team_id"], name: "index_rosters_on_team_id"
  end

  create_table "signups", force: :cascade do |t|
    t.integer "member_id", null: false
    t.integer "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_signups_on_event_id"
    t.index ["member_id", "event_id"], name: "index_signups_on_member_id_and_event_id", unique: true
    t.index ["member_id"], name: "index_signups_on_member_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name", null: false
    t.string "sport", null: false
    t.string "gender"
    t.integer "captain_id"
    t.index ["captain_id"], name: "index_teams_on_captain_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "pro_member", null: false
    t.string "authorized", default: "false", null: false
    t.integer "club_id"
    t.index ["club_id"], name: "index_users_on_club_id"
  end

end
