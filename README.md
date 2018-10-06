# My Tab

Judgement free alcohol consumption tracker.
This is the front end of the [My Tab](https://my-tab.herokuapp.com/) app.
The back end code can be see [here](https://github.com/JonathanWThom/my-tab-api).

![My Tab dashboard](https://github.com/JonathanWThom/my-tab/blob/master/dashboard.png)

### Features

* Create and sign in to user account. Receives JWT from api and uses it in each request.
* Add drinks with the following parameters: Ounces, Alcohol Percentage, and Date
Imbibed On.
* See all drinks across time, or narrow date range.
* For a given range of drinks, see the total standard drinks consumed, and the average
number of standard drinks per day.
* Delete drinks.

### Technology

* [React](http://reactjs.org/).
* Tiny [Express](http://expressjs.com/) server.
* [Milligram CSS](https://milligram.io/)
* Configured for deployment to [Heroku](https://heroku.com/). Since that's where it's deployed!

### Setup

* Will not run without the [API](https://github.com/JonathanWThom/my-tab-api).
* Once that's install, `npm install` and `npm start` should do the trick.

### Todo and Known Bugs

* Needs an explanation of what a standard drink is.
* Not yet optimized for mobile - which is where I will be using it the most.
* Test coverage
* Heavily reliant on the API for getting the current set of drinks. This client
could be refactored to do more of the heavy lifting so that less hits to the api
are needed.
* Could use some serious refactoring.
* There is some odd behavior when all drinks from the selected time period are removed.

### License

* MIT
