---
title: 'How to create free mongodb cloud database with mongodb atlas'
excerpt: 'Create free mongodb cloud database with mongodb atlas and use it in your react application'
coverImage: '/assets/blog/dynamic-routing/cover.jpg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: Ruslan Elishaev
  picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpg'
---


- sign in to atlas:
  https://www.mongodb.com/cloud/atlas

- Choose free deployment option
- Create cluster with your favorite cloud provider. Click create
- Wait few minutes for cluster provisioning
- While on Database deployments screen, click on "Browse data".
- On the next screen click on "Add my own data"
- Choose Database name and Collection name. For example "my_db" for Database name and "products" for Collection name. Click "Create".
- On the left pane (sidebar), click on "Database Access". Click on "Add new database user". Choose username and password. Click "Add user".
- On the left pane (sidebar), click on "Network Access". Click on "Add IP Address" and add to the "Access List Entry" the following ip: 8.8.8.8
- Repeat the same with another ip: 0.0.0.0/0
- Repeat the same, but choose "ADD CURRENT IP ADDRESS"
- On the left pane (sidebar), click on "Databases", then click on "Connect". Choose "Connect your application". Choose DRIVER node.js, choose VERSION 4.0 or later.

<img width="808" alt="Screen Shot 2021-10-05 at 20 47 05" src="https://user-images.githubusercontent.com/88276747/136075839-a70517ee-1fe3-4434-b8b6-36ddd553fc8a.png">

### Copy connection URI string and replace password and database name:

Before:

```shell
mongodb+srv://your_username:<password>@cluster0.fwmwb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

After:

```shell
mongodb+srv://your_username:somepassword@cluster0.fwmwb.mongodb.net/my_db?retryWrites=true&w=majority
```

### Copy URI string to your .env file (Remember to add .env file to .gitignore)

```shell
MONGODB_URI=mongodb+srv://your_username:somepassword@cluster0.fwmwb.mongodb.net/my_db?retryWrites=true&w=majority
```

### Use URI string for mongodb connection.

**mongoose example:**

```javascript
import * as mongoose from 'mongoose'
import { blueBright, redBright, green } from 'chalk'

const mongodbURI = process.env.MONGODB_URI
const dbName = process.env.MONGODB_NAME

const connectOptions = {
  autoIndex: false,
}

const connectDB = async () => {
  try {
    await mongoose.connect(
      mongodbURI,
      { ...connectOptions, dbName },
      (error) => {
        if (error) {
          console.log(redBright(error))
        }
      }
    )
    console.log(blueBright('🐣 mongodb database started'))
    console.log(green(`🙉 dbURL `, mongodbURI))
  } catch (error) {
    console.log(error)
  }
}
```
