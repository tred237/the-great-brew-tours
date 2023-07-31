## The Great Brew Tours

A brewery tour scheduling app for breweries located in Denver, Colorado Springs, and Fort Collins where:
  - Users can search the catalog of breweries and see reviews left by other users
  - Users can create an acccount to access the tour scheduling features and to add/edit their brewery reviews
  - Admins can create/edit breweries, create/delete tours, and delete reviews of any user

---

### Requirements
  - Ruby 2.7.4
  - Node v16
  - Posgresql

---

### Installation
  1. Fork this repository
  2. 
  ![image](https://github.com/tred237/the-great-brew-tours/assets/103388556/811bb032-6726-403f-9468-2423f2295cb5)

  3. Copy the SSH key from the forked repository
  4. 
  ![image](https://github.com/tred237/the-great-brew-tours/assets/103388556/3b848765-0474-4e4d-9dd5-8fa436febae5)

  5. In your terminal, clone the repository using the SSH key you copied from the fork
  ```
  git clone <pasted-ssh-key>
  ```

  4. Navigate to the `root` of the cloned repository and install the back-end and front-end dependancies
  ```
  cd the-great-brew-tours
  bundle install
  npm install --prefix client
  ```

  5. Build the database migrations and seed the database
  ```
  rails db:migrate db:seed
  ```

---

### Usage

  1. Navigate to the project's root directory and start Rails using
  ```
  rails s
  ```

  2. Open a new terminal. Navigate to the project's root directory and start React using
  ```
  npm start --prefix client
  ```

  - You can access the Rails API routes at: http://localhost:3000
  - You can access the Florum front-end at: http://localhost:4000
  - You can create an account to access standard user features
  - To access the admin features, you can sign in using these credentials
  ```
  username: admin
  password: T3ster!
  ```
---

### Data Model

![image](https://github.com/tred237/the-great-brew-tours/assets/103388556/39dd7eff-5361-4d4b-a399-5bb9557f5967)

---

### Resources

[React Bootstrap](https://react-bootstrap.netlify.app/)\
[Faker](https://github.com/faker-ruby/faker)\
[Material UI](https://mui.com/)\
[Open Brewery DB API](https://www.openbrewerydb.org/)

Images:\
[Image 1](https://unsplash.com/photos/W3SEyZODn8U)\
[Image 3](https://unsplash.com/photos/EUO7L470LXk)\
[Image 3](https://unsplash.com/photos/K8nr6rNDtUE)\
[Image 4](https://unsplash.com/photos/_fLgxjACz5k)\
[Image 5](https://unsplash.com/photos/Qy2KMPRV3X4)\
[Image 6](https://unsplash.com/photos/-Ygu9Qx309s)\
[Image 7](https://unsplash.com/photos/xD5SWy7hMbw)\
[Image 8](https://unsplash.com/photos/WzPdP9pn7go)\
[Image 9](https://unsplash.com/photos/rJdiuJnONVw)\
[Image 10](https://unsplash.com/photos/yMbzmWYKNrU)

---

### Pending Issues
- Add Action Mailers
- Add bad language filtering
- Add ability to add mulitple pictures for breweries
- Add Boostrap Icons
- Create mobile view
- Add search brewery feature

---

### Contributions

Contributions are welcome, but please open an issue first to discuss what you would like to change.

---

### License

[MIT](https://choosealicense.com/licenses/mit/)
