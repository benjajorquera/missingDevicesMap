# Devices Challenge

You must have ruby, node and npm installed on your system.

Install the dependencies with ````bundle install````. If necessary you can change the ruby version in the ````Gemfile```` If you get some kind of error like dependency error you can run ````bundle update```` or ````bundle install --with development````.

The default database is located in ````db/development.sqlite3```` Perform a migration with ````rake db:migrate```` or you can reset the database with ````rake db:migrate:reset```` You can seed the database with ````ruby db/seed.rb```` which deletes the “Devices” table and creates it again, populating it with the data it fetches from the api url and api key delivered in a ````env```` in the root of the project.

It runs the project (backend) with ````bundle exec rails server```` which is raised on port 3000.

For the client, inside the client folder run ````npm install```` to install the libraries, then ````npm run start```` then press the “y” key to run on port 3001. You can configure a google maps api key in a ````.env````.
