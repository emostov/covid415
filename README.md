![logo](frontend/src/public/COVID415.png)
# COVID415

[COVID415](http://covid415.herokuapp.com/#/) is a service that matches San Franciscans in self-isolation due to the novel coronavirus 2019-nCoV (also known as COVID-19) pandemic with local volunteers to deliver essentials like food and medicine.

![home](frontend/public/homepage.png "COVID415")

## Technologies used
* Front-end:
  * React
  * Redux
* Back-end
  * Express
  * MongoDB
* Cloud:
  * Heroku
* Integrations:
  * Google Maps Geoencoding API
  * Google Maps Distance Matrix API
  * MapBox

## Features
* ### **View delivery requests** - an interactive list and map show all delivery requests sorted by distance away. Users can browse requests and accept a request.
![accept_delivery](frontend/public/accept_delivery.gif "Accept Delivery")

* ### **Manage your deliveries** - an separate tab allows users to view and manage all the delivery requests that they've accepted.
![complete_delivery](frontend/public/complete_delivery.gif "Complete Delivery")

* ### Request a delivery - as a user under self-isolation, you can request a delivery which will be added to the list and map.
![request_task](frontend/public/request_task.gif "Request Task")

## Future features
- ### Direct messaging
- ### Notifications
- ### Secure payment integrations