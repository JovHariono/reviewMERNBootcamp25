# Eiwa
Framework for building REST APIs for education and prototypes.
Built on Node.js and Express using a MongoDB database.

![brand.svg](brand.svg)

## Quick Start

First, make sure you have Node.js and MongoDB Server installed. Then
Type the following command to create a project named `api-sales`:

```bash
git clone git@gitlab.com:jakbar-labs/open-source/eiwa.git api-sales
```

Go into the directory and install the required dependencies:

```bash
cd api-sales
npm install
```

### Database Configuration

Make sure MongoDB Server is installed and running.
Open the `.env` file and set the database configuration section:

```
DB_CONNECTION=mongodb
DB_HOST=127.0.0.1
DB_PORT=27017
DB_DATABASE=your_db
```

### Create an Admin Account

Run the following command to create an administrator account:

```bash
npm run eiwa -- --make --admin
```

Fill according to your preferences:

```bash
? Enter your username: admin
? Enter your password: *****
? Enter your email: admin@mail.com
```

If successful, the following message will appear:

```bash
admin created successfully
```

### Obtaining an Authentication Token (JWT)

To get the JWT auth token, you can access it with Postman:

```
POST : http://localhost:4000/api/v1/users/signin  
{
  "email": "youremail@mail.com",
  "password": "yourpassword"
}
```

### Hello World

Each application will be considered as modules consisting of:

- `controllers.js` 
- `middlewares.js`
- `models.js`
- `routers.js`
- `sanitizers.js`
- `validators.js`

Here we will create a simple module with the name `hello-world`:

```bash
npm run eiwa -- --make --module
```

Fill in the module name:

```bash
? Enter the module name (e.g. products or employee-categories): hello-world
```

If successful, the result:

```bash 
modules created successfully
controllers created successfully
filters created successfully
middlewares created successfully
models created successfully
routers created successfully
routers created successfully
```

> **Note**: if the module name uses two words, you can write it with a hypens sign (`-`)
> like `hello-world`. If it's just one word, just `helloworld` or `products`.

### Register the Router Module

After the module has been created, add a router in the `index.js` file as follows:

```js
// ...
const {HelloWorldRouter} = require("./modules/hello-world/routers");
// ...

// ...
LibModuleRegister(app, "hello-world", HelloWorldRouter)

// ...
```

Now you can access the API with the following conditions:

#### Hello World List

Using the `GET` method with a URL:

```
http://localhost:4000/api/v1/hello-world
```

> You can add queries in it.
> **_Don't forget to add a token in the header with the prefix `Bearer`._**

#### Hello World Create

Using the `POST` method with a URL:

```
http://localhost:4000/api/v1/hello-world
```

> You can add body (JSON) to it. 
> **_Don't forget to add a token in the header with the prefix `Bearer`._**

#### Hello World Detail

Using the `GET` method with a URL:

```
http://localhost:4000/api/v1/hello-world/123
```

> You can change the `123` parameter above.
> This parameter is an accessible `:id`
> with `params.id` on the controller.
> **_Don't forget to add a token in the header with the prefix `Bearer`._**
#### Hello World Update

Using the `PUT` method with the URL:

```
http://localhost:4000/api/v1/hello-world/123
```

> You can change the `123` parameter above.
> This parameter is an accessible `:id`
> with `params.id` on the controller. Besides that,
> You can also add a body containing the data
> later you can use it as the content of the data
> that you want to change (for now, document/table
> not created yet, don't worry. This is just a test
> to ensure your API is working properly). 
> **_Don't forget to add a token in the header with the prefix `Bearer`._**

#### Hello World Delete

Using the `DELETE` method with the URL:

```
http://localhost:4000/api/v1/hello-world/123
```

> You can change the `123` parameter above.
> This parameter is an accessible `:id`
> with `params.id` on the controller.
> **_Don't forget to add a token in the header with the prefix `Bearer`._**

### Running Development Server

Run the following command to run the development server:

```bash
npm run dev
```

Now you can play around with your API in Postman.

----

## App Configuration

In the `.env` file, there are several API settings that
You can set it according to your preferences:

```
APP_KEY=<yourapikey>
APP_PORT=4000
APP_PREFIX_ENDPOINT=api
APP_VERSION=v1
APP_ACCESS_TOKEN_LIFETIME=3h
```

> **Note**: don't forget to always replace `APP_KEY` with
> your preferences!

## Creating Plugins

If you want to share your module, you can use the following command to archive your module:

```bash
npm run eiwa -- --make --plugin
```

Here you will be asked to enter the name of your module to archive. 
Fill in the name of the module you want to archive, for example:

```bash
? Module name: suppliers
√ [eiwa] creating plugin successfully...
```

Now you can see the `plugins` folder. 
There there are modules that you have archived. 
You can share it with anyone.

> **Note**: In this version, to install the plugin, simply extract the archive to the `modules` folder 
> and register the router module in `index.js`