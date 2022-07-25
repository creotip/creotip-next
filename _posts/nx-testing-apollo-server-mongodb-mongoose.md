---
title: 'NX: Integration testing Apollo GraphQL and MongoDB Mongoose with Jest '
excerpt: 'How to test microservices with Jest, Apollo GraphQL,  '
coverImage: '/assets/blog/apollo-test.jpeg'
date: '2022-06-06T07:22:22.645Z'
tags: ["graphql", "mongodb", "testing", "apollo"]
author:
    name: Ruslan Elishaev
    picture: '/assets/blog/authors/ruslan.png'
ogImage:
    url: '/assets/blog/apollo-test.jpeg'
---

Contents
--------


<ul>
  <li><a href="#install_nx">Install NX and initialize a new project</a></li>
  <li><a href="#create_app">Create an Apollo Server Express app</a>
    <ul>
        <li><a href="#define_mongoose_schema">Define Mongoose schema and model</a></li>
    </ul>
  </li>
  <li><a href="#create_db">Create MongoDB database instance</a></li>
  <li><a href="#create_apollo_server">Create Apollo Server</a></li>
  <li><a href="#running_apollo_server">Running the Apollo server</a>
      <ul>
        <li><a href="#create_new_product">Create a new product in the database with Apollo Studio</a></li>
        <li><a href="#query_products">Query the products</a></li>
    </ul>  
  </li>
  <li><a href="#integration_testing">Integration testing Apollo Server and Mongoose with Jest and mongodb-memory-server</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ul>



<br/>

In the previous NX article, we learned how to [deploy and run microservices locally with Docker and Kubernetes](https://creotip.io/posts/nx-monorepo-running-microservices-locally-with-docker-kubernetes).
In this article, we will learn how to construct simple integration tests for microservices that was built with apollo-server-express and MongoDB Mongoose within [NX](https://nx.dev) monorepo build system.


<div id="install_nx">

## Install NX and initialize a new project

Create a Node workspace:
```shell
npx create-nx-workspace --preset=express
```

Choose *Workspace name* and *Application name* 

```shell
➜  npx create-nx-workspace --preset=express
Need to install the following packages:
  create-nx-workspace
Ok to proceed? (y) y
✔ Workspace name (e.g., org name)     · nx-testing-apollo-mongoose
✔ Application name                    · svc-products
✔ Set up distributed caching using Nx Cloud (It's free and doesn't require registration.) · No


 >  NX   Nx is creating your v14.4.3 workspace.

   To make sure the command works reliably in all environments, and that the preset is applied correctly,
   Nx will run "npm install" several times. Please wait.

✔ Installing dependencies with npm
✔ Nx has successfully created the workspace.

```

Install the following dependencies:

- [apollo-server-express](https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express)
- [graphql](https://www.graphql.org/)
- [mongoose](https://mongoosejs.com/)
- [graphql-compose](https://github.com/graphql-compose/graphql-compose)
- [graphql-compose-mongoose](https://github.com/graphql-compose/graphql-compose-mongoose)
- [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server)
- [chalk](https://github.com/chalk/chalk)


```shell
yarn add apollo-server-express graphql mongoose graphql-compose graphql-compose-mongoose mongodb-memory-server-core chalk
```


</div>


<div id="create_app">

## Create an Apollo Server Express app

In the previous section we generated a new app called "svc-products". Now, let's modify it. <br/>


<div id="define_mongoose_schema">

### Define Mongoose schema and model
First we will define the structure of the app by designing a GraphQL schema. <br/>
Create a new file in with the following content:

```typescript
// apps/svc-products/src/app/schema.ts

import mongoose from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'

export interface IProduct {
  title: string
  price: number
  description: string
  category: string
  image: string
}

export interface IProductDocument extends IProduct, mongoose.Document {}

export const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})

export const Product = mongoose.model<IProductDocument>('Product', ProductSchema)

const customizationOptions = {}

export const ProductTC = composeMongoose(Product, customizationOptions)

schemaComposer.Query.addFields({
  productOne: ProductTC.mongooseResolvers.findOne(),
  productMany: ProductTC.mongooseResolvers.findMany(),
  productCount: ProductTC.mongooseResolvers.count(),
})

schemaComposer.Mutation.addFields({
  productCreateOne: ProductTC.mongooseResolvers.createOne(),
  productUpdateOne: ProductTC.mongooseResolvers.updateOne(),
  productUpdateMany: ProductTC.mongooseResolvers.updateMany(),
  productRemoveOne: ProductTC.mongooseResolvers.removeOne(),
})

export const schema = schemaComposer.buildSchema()


```
This code snippet defines a simple, valid Mongoose schema and model.

1. The `composeMongoose` function converts the Mongoose model to a GraphQL schema.
2. The `schemaComposer` function adds the needed CRUD operations to the GraphQL schema. 
3. Finally, the `schemaComposer.buildSchema()` function builds the final GraphQL schema for our use.

</div>
</div>


<div id="create_db">

### Create MongoDB database instance

There is already an article in my blog on [how to free mongodb atlas cloud database](https://creotip.io/posts/how-to-create-mongo-db-).
After you have created a database instance, get the connection string and pass it to your dotenv file.

Add to your `.env`  file in the root of your nx monorepo:

```text
MONGODB_URI=mongodb+srv://your_username:somepassword@cluster0.jdx0tj3.mongodb.net/?retryWrites=true&w=majority
MONGODB_NAME=shop
```

</div>

<div id="create_apollo_server">

### Create Apollo Server 

We are going to create an Apollo Server instance and connect to our MongoDB database with help of the `mongoose` library. 

```typescript
// apps/svc-products/src/main.ts
import { ApolloError, ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import * as express from 'express'
import * as http from 'http'
import { blueBright, green, magentaBright, redBright } from 'chalk'
import { schema } from './app/schema'
import mongoose from 'mongoose'

const mongodbURI = process.env.MONGODB_URI
const dbName = process.env.MONGODB_NAME

export const connectDB = async (mongodbURI: string, dbName: string) => {
  if (!mongodbURI || !dbName) {
    return Promise.reject('MongoDB URI or DB Name is not defined')
  }
  try {
    await mongoose.connect(mongodbURI, { autoIndex: false, dbName }, (error) => {
      if (error) {
        console.log(redBright(error))
      }
    })
    console.log(blueBright('🐣 mongodb database started'))
    console.log(green(`🙉 dbURL `, mongodbURI))
    console.log(green(`🙉 dbName `, dbName))
    return mongoose.connection
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function startApolloServer() {
  try {
    await connectDB(mongodbURI, dbName)

    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
      schema: schema,
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    await server.start()

    server.applyMiddleware({ app })

    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))

    console.log(magentaBright`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  } catch (err) {
    throw new ApolloError('Something went wrong in Apollo')
  }
}

const server = startApolloServer()

export default server


```

The above code snippet accomplish the following:

1. Creates a `connectDB` function that connects to the MongoDB database.
2. Creates a `startApolloServer` function that connects to the MongoDB database and creates an Apollo Server instance.


Now we are ready to move forward. Let's start the server.

</div>

<div id="running_apollo_server">

### Running the Apollo server 

Execute the following command to start the server:

```bash
nx run svc-products:serve
```

Output:
```shell
> nx run svc-products:serve

chunk (runtime: main) main.js (main) 3.96 KiB [entry] [rendered]
webpack compiled successfully (e34854b72ff99845)
Debugger listening on ws://localhost:9229/a8e0aa33-08e4-4f13-87c3-5300c370626d
Debugger listening on ws://localhost:9229/a8e0aa33-08e4-4f13-87c3-5300c370626d
For help, see: https://nodejs.org/en/docs/inspector
🐣 mongodb database started
🙉 dbURL  mongodb+srv://your_username:somepassword@cluster0.jxhz0o4.mongodb.net/?retryWrites=true&w=majority
🙉 dbName  shop
🚀 Server ready at http://localhost:4000/graphql

```

> Open the browser and navigate to [http://localhost:4000/graphql](http://localhost:4000/graphql). <br/>
You should see the Apollo studio app, which allows us to run queries and mutations.

![apollo studio](/assets/blog/apollo-studio.png)

</div>


<div id="create_new_product">


### Create a new product in the database with _**Apollo Studio**_


Let's create our first product. We will use the `productCreateOne` mutation.

1. While on the **_Apollo Studio app_**, click on **_mutations_** button.
2. Click on **_productCreateOne_** button.
3. Click on **_record_** button under **_Arguments_** section.
4. Select all fields under **_Input Fields_** section.
5. In the **_Variables_** area of the app, fill the **_record_** object properties with the values you want to create.<br/>    Example product object:
    ```json
    {
      "record": {
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.99,
        "category": "men's clothing",
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
      }
    }
    ```
6. On the sidebar click on the back button.
7. Select the **_record_** field under **_Fields_** section
8. Select all fields under **_Fields_** section.
9. Click on the blue **_Mutation_** button.


You should see the succeeded operation in the **_Response_** area.

![apollo studio mutations](/assets/blog/apollo-studio-2.png)

You can create few more products now.



Here is how it looks on MongoDB Atlas:
![apollo studio mutations](/assets/blog/mongodb-atlas-products.png)

</div>


<div id="query_products">

### Query the products 

Now we have few products in our data set. Let's query them.

1. While on the **_Apollo Studio app_**, go back to the root of the **_Documentation_** tab.
2. Click on Query field
3. Click on **_productMany_** button and choose all fields under **_Fields_** section.
4. Click on the blue **_Query_** button.

Basically the Query should look like this:

```graphql
query Query {
  productMany {
    title
    price
    description
    category
    image
    _id
  }
}
```

And here is the Response:

```json
{
  "data": {
    "productMany": [
      {
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.99,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "_id": "62d6b1998fb10a613f67a021"
      },
      {
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "lim-fitting style, contrast raglan long sleeve, three-button henley placket",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "_id": "62d6c9e28fb10a613f67a023"
      }
    ]
  }
}
```

</div>

<div id="integration_testing">

###  Integration testing **_Apollo Server_** and **_Mongoose_** with **_Jest_** and **_mongodb-memory-server_**


Create a new file `main.spec.ts` and add the following code:

```typescript
// apps/svc-products/src/main.spec.ts
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import * as mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import { connectDB } from './main'
import type { IProduct } from './app/schema'
import { ProductModel, schema } from './app/schema'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import * as express from 'express'
import * as http from 'http'

jest.setTimeout(20000)
jest.retryTimes(3)

let mongod: MongoMemoryServer
let server: ApolloServer

const mockDBName = 'shop'

beforeAll(async () => {
	let mongoUri = ''
	mongod = await MongoMemoryServer.create()
	mongoUri = mongod.getUri()
	await connectDB(mongoUri, mockDBName)

	const app = express()
	const httpServer = http.createServer(app)

	server = new ApolloServer({
		schema,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	})
})

async function closeMongoConnection(
	mongod: MongoMemoryServer,
	mongooseConnection: mongoose.Connection
) {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, 2000)
		try {
			mongod?.stop().then(() => {
				mongooseConnection.close().then(() => {
					resolve()
				})
			})
		} catch (err) {
			console.error(err)
		}
	})
}

afterAll(async () => {
	await closeMongoConnection(mongod, mongoose.connection)
	await server.stop()
})

describe('Integration test with apollo server and MongoMemoryServer', () => {
  
	const mockProduct: IProduct & { _id: string } = {
		title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
		price: 109.99,
		description:
			'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
		category: "men's clothing",
		image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
		_id: '62d6b1998fb10a613f67a021',
	}

	const publishedProduct = new ProductModel(mockProduct)

	it('should return valid result', async () => {
    
		await publishedProduct.save()
		const result = await server.executeOperation({ 
          query: `
            query Query {
              productMany {
                title
                price
                description
                category
                image
                _id
              }
            }
			`,
		})

		expect(result.data.productMany).toHaveLength(1)
		expect(result.data.productMany[0]).toMatchObject(mockProduct)
	})
})

```

</div>

The code above allows us to test the **_Apollo Server_** service with **_Mongoose_** and **_MongoDB Memory Server_**.
MongoDB In-Memory Server is a tool that allows us to create a local MongoDB instance from within nodejs, for testing or mocking purposes.

The following  steps are taken:

1. In _**beforeAll()**_ function we are getting the **_MongoDB Memory Server_** URI and connecting to **_Mongoose_**. Then Apollo server is created. _**beforeAll()**_ function is executed before any of the tests in this file run.
2. In _**afterAll()**_ function we are closing the connection to **_Mongoose_**, **_MongoDB Memory Server_** and **_Apollo Server_**. _**afterAll()**_ function is called after all tests in the file have completed.
3. **_describe()_** function is the test suite. 
4. _**it()**_ function is the actual test. The code is straightforward, simple and understandable. The api call is executed with the help of Apollo's [**_executeOperation()_**](https://www.apollographql.com/docs/apollo-server/v2/testing/testing/#executeoperation) function.

Check the repository: <br/>
https://github.com/creotip/nx-testing-apollo-mongoose


<div id="conclusion">

## Conclusion

In the development process, integration testing is crucial.
On the surface, tests appear to take an excessive amount of time. However, tests are a critical factor in the development process, and they will save you a lot of time in the future.



</div>



