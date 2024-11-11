# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'httparty'
require 'json'
require_relative '../config/environment'

api_url = ENV['API_URL']
api_key = ENV['API_KEY']

# El siguiente script carga datos a la BD por defecto de Rails (Sqlite3) desde el endpoint de una API:

# Limpia la tabla
Device.destroy_all

# Obtiene los datos de la API con la gema HTTParty
response = HTTParty.get(api_url, :headers => {
      "apikey" => api_key
    })

apiDevices = JSON.parse(response.body)

# Setea los campos missing y state
for device in apiDevices["devices"] do
    if device["missing"] == false then
        missing = "False"
        state = "ok"
    else
        missing = "True"
        state = "missing"
    end
    @newDevice = Device.create(name: device["name"], os_details: device["os_details"], type: device["type"], missing: missing, state: state, location: device["location"])
    puts @newDevice
end
