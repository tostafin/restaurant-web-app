# Restaurant IT
This repo contains a web application for running an online restaurant.

## Technologies
I used the following technologies to build this app:
- [Angular](https://github.com/angular/angular) with [TypeScript](https://www.typescriptlang.org)
- [Angular Material](https://github.com/angular/components)
- [AngularFire](https://github.com/angular/angularfire)
- [Firebase](https://firebase.google.com), in particular:
  - Authentication
  - Firestore
  - Storage

## Overview
### Signed out users
They can only see two views: the homepage and the menu:

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/homepage.png?raw=true)

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/menu_so.png?raw=true)

They also can't order any dishes. But they can use filters:

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/menu_filter.png?raw=true)

Also, they can use the pagination:

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/menu_pagination.png?raw=true)

Signed out users can navigate themselves to register and login views:

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/sign_up.png?raw=true)

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/sign_in.png?raw=true)

### Signed in users (customers)
Once the user signs in, they can order the food:

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/menu_si.png?raw=true)

All orders appear in their cart:

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/cart_before_order.png?raw=true)

If they order a specific dish, they can review it:

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/dish_details_review.png?raw=true)

### Managers
They can manage dishes offered by the restaurant:

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/dm_entry.png?raw=true)

For instance, they can add new dishes:

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/dm_add_dish.png?raw=true)

They can also update or delete them:

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/dm_edit_dish.png?raw=true)

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/dm_update_dish.png?raw=true)

### Admins
They have an extra view called Admin Panel. There they can: 
- change user roles:

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/admin_roles.png?raw=true)

- change session persistence

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/admin_sp.png?raw=true)

- ban users

![alt text](https://github.com/tostafin/restaurant-web-app/blob/master/docs/images/admin_ban.png?raw=true)
