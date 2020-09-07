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

## Q&A

1- Why did I choose this solution architecture for the backend?    
  - I am familiar with express and I know it is great for building apis as fast as possible.    
  - After reading the task and user stories i decided to go with sql for my database it is better to implement relations using sql and the task had a lot of relations.
  
2- What do I like and dislike about Node/Javascript compared to other programming languages?
    Likes:
      - It is easy to understand
      - The code readability makes it easy to work with others
      - Coercion it seems hard at the beginning but it is very helpful when you understand it well
    Dislikes:
      - the too many dependencies I have to deal with
      - code can easily get unorganised 
    
    
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
