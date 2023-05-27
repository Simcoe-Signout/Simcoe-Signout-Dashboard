# DSBN Resource Booking Hub
A private, bookings manager used to book devices, tools, and other resources through an online dashboard.

# Development Environment
The development environment looks to create a consistent devlopment experience across all devices. It can be setup by doing the following:

1. Use the `cd` command to navigate to the root of this project
2. Run `./bin/dev_setup.sh`
3. Update the `BUILD_USER` in the .env file that was generated to be your current user
4. Run `docker-compose up` to run docker-compose with a `tail` watching the log, or `docker-compose up -d` to silently start the dev server
5. Navigate to `localhost:4000` in your browser to access the site

Note, there is currently a bug. The node_modules folder that was generated by docker belongs to root:root. If you want to add any new packages you will need to `chown` that folder with `sudo chown -R $(whoami) node_modules` to ensure that you are the proper owner


