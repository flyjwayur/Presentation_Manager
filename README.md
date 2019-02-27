# Presentation Manager

Presentaion Manager application where students can see, add, edit, delete a presentation in one place.

- Demo : https://presentationmanager2.appspot.com/presentations

## 1. Main features

- Display all student presentations
- Display one of presentations in detail
- Add/Edit/Delete a presentation
- Sign Up & Sign In
- Authenticated Routes

## 2. Implementation with MERN stack

### > Front-End

- CRUD functionalities with React & Redux
- Consistent design theme with Material UI
- Validation in add form, signIn/up form with React
- Protected Routes with React & React Router
- Display spinner on load data

### > Back-End

- Create Presentation & User REST API EndPoints with Expressjs & Nodejs
- Model the data with Mongoose
- Manage data in cloud with MongoDB Atlas
- Validation in presentation/sign in/sign up
- Authentication
  - Create token with Jsonwebtoken
  - Encrypt password with bcryptjs
- Deploy in gcloud (First, in Heroku)

## Getting started

Clone the project:

```
> git clone https://github.com/flyjwayur/Presentation_Manager.git
> cd Presentation_Manager
> yarn install
> yarn run dev
```

## License

- This project is licensed under the MIT License.
- The SVG images in the project are from [Undraws.co](https://undraw.co/illustrations)
