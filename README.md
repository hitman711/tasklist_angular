# Task list Frontend #
	This is front end project which link with tasklist backend server. This project perform following operation
1. User registration, sigin, signout.
2. Task creations, read, update and delete operation with permission check.
3. Filter tasks based on name, status, and logged in user.
4. State user validation (without token user cant access task page).

## Requirements

* **nodejs**		(sudo apt-get install nodejs)
* **npm**		(sudo apt-get install npm)

## Installation

* Clone project in your local system

* Install project dev depenancies
	
	npm install --only=dev

* run grunt command to start local server where web page serve

	grunt

* To create build run `grunt prod` and index file without any changes. It will create build folder with customize css, js lib files.
