# Online Courses
proof of concept for an online courses platform

## Installation

copy then paste the following lines into terminal
- $ git clone https://github.com/Mahmoud-Mohamed-Elgamily/simple-online-courses-app.git
- $ cd server
- $ npm i
- $ npm run dev
  open other terminal in the main repo directory
- $ cd client
- $ npm i
- $ npm start

you are all set now wait for seconds and the website will open in your default browser!

## Workflow
- Backend(Express)
  - setting up DataBase
  - creating migrations
  - creating models
  - adding middleware for jwt authentication
  - creating api routes and controllers
  
- Frontend(React)
  - integrating material ui admin dashboard
  - remove unused components, menu items and dependencies 
  - create userProvider to access user data easily
  - create serverHandler for handling request to server
  - create authService to help authenticate user (login / register)
  - create component for crud Users
  - create component for crud Categories
  - create component for crud Courses
  
  - create component for client to be able to view courses
  - user can filter courses based on categories 
  - user can search through courses using course name
  - user can enroll to courses
  - user can cancel enrollment
  - user can finish courses and get points 

# Pictures

-Admin Home
![](projectImages/adminPage.png)

-Admin Users
![](projectImages/adminUsersPage.png)

-Admin Categories
![](projectImages/adminCategoriesPage.png)

-Admin Courses 
![](projectImages/adminCoursesPage.png)

-Client Home
![](projectImages/homePage.png)

-Client Courses
![](projectImages/homepageCourses.png)

-Logged Client Home
![](projectImages/loggedUserHomePage.png)

-Logged Client Courses
![](projectImages/loggedUserCourses.png)
