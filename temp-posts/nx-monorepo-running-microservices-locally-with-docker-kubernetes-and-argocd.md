---
title: 'NX monorepo: Deploy and Run microservices locally with Docker, Kubernetes and ArgoCD'
excerpt: "Step-by-step guide on how to run node.js microservices with Docker, Kubernetes and ArgoCD inside NX monorepo"
coverImage: '/assets/blog/recoil-gear/recoil-gear.jpeg'
date: '2022-01-03T16:43:32.340Z'
tags: ["nx", "microservices", "kebernetes", "argocd"]
author:
  name: Ruslan Elishaev
  picture: '/assets/blog/authors/ruslan.png'
ogImage:
  url: '/assets/blog/mongodb-atlas-how-to-create/cover.webp'
---
### We are going to install the  following

- [**NX**](https://nx.dev/) - Nx is build system with first class monorepo support and powerful integrations.
- [**Docker**](https://www.docker.com/) - Docker is an open source containerization platform.
- [**kubectl**](https://kubernetes.io/docs/tasks/tools/) - The Kubernetes command-line tool
- [**minikube**](https://minikube.sigs.k8s.io/docs/start/) - minikube is local Kubernetes
- [**virtualbox**](https://www.virtualbox.org/wiki/Linux_Downloads) - VirtualBox is a general-purpose full virtualizer for x86 hardware, targeted at server, desktop and embedded use.

## Install on macOS

```shell
npm install -g nx
brew update
brew install kubectl
brew cask install docker
brew cask install minikube
brew cask install virtualbox
```

## Install on Linux (Debian)

install **_NX_**

```shell
npm install -g nx
```

To install docker, follow the instructions here: https://docs.docker.com/engine/install/ubuntu/

Install docker-compose

```shell
sudo apt install docker-compose
```

Docker Desktop works on Mac and Windows only. A proper alternative is dockstation app: https://dockstation.io/

To install kubectl follow the instructions here: https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

To install minikube follow the instructions here: https://minikube.sigs.k8s.io/docs/start/

To install virtualbox follow the instructions here: https://www.virtualbox.org/wiki/Linux_Downloads

### Check if installed properly

```shell
kubectl version --client
docker --version
docker-compose --version
docker-machine --version
minikube version
```

## Install NX workspace

```shell
npx create-nx-workspace
```

Choose desired name for your project
```shell
✔ Workspace name (e.g., org name)     · nx-monorepo-microservices
```

Choose **_express_** as starter template
```shell
 What to create in the new workspace 
 
  apps              [an empty workspace with no plugins with a layout that works best for building apps]
  core              [an empty workspace with no plugins set up to publish npm packages (similar to yarn workspaces)]
  ts                [an empty workspace with the JS/TS plugin preinstalled]
  react             [a workspace with a single React application]
  angular           [a workspace with a single Angular application]
  next.js           [a workspace with a single Next.js application]
  gatsby            [a workspace with a single Gatsby application]
  nest              [a workspace with a single Nest application]
❯ express           [a workspace with a single Express application]
  web components    [a workspace with a single app built using web components]
  react-native      [a workspace with a single React Native application]
  react-express     [a workspace with a full stack application (React + Express)]
  angular-nest      [a workspace with a full stack application (Angular + Nest)]

```

Choose App name for the microservice
```shell
 Application name                    › svc-products 
```

Choose **_No_** for **_Use Nx Cloud?_**
```shell
✔ Use Nx Cloud? (It's free and doesn't require registration.) · No
```

### Generate more **_express_** microservices

```shell
nx generate @nrwl/express:application svc-cart
```
<br/>

```shell
nx generate @nrwl/express:application svc-user
```

## Create Dockerfile for each microservice
> Create the Dockerfile in the root of each microservice app. 

_apps/svc-cart_
```shell
FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/svc-cart .
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --production
# dependencies that express needs
RUN npm install reflect-metadata tslib rxjs express
CMD node ./main.js
```

### NX is ready! 🚀
![nx-microservices](/assets/blog/nx-microservices.png)

### Run docker desktop standalone app
![docker](/assets/blog/docker.png)

[//]: #
### Start the kubernetes cluster with minikube ([minikube is local Kubernetes](https://minikube.sigs.k8s.io/docs/start/))

```shell
minikube start
```

### Check if minikube node is ready

```shell
kubectl get nodes
```

You should see something like that

```shell
NAME       STATUS    ROLES     AGE       VERSION
minikube   Ready     master    40s        v1.14.0
```

## Build docker images of express microservices

```shell
nx build svc-cart && nx build svc-products && nx build svc-user
```
<br />

```shell
docker build -f ./apps/svc-cart/Dockerfile . -t svc-cart
docker build -f ./apps/svc-products/Dockerfile . -t svc-products
docker build -f ./apps/svc-user/Dockerfile . -t svc-user
```

[//]: # (> You can run the above commands with NX IDE extension &#40;vscode or intellij&#41;)

### Check whether docker images has been created

```shell
docker images --format "table {{.ID}}\t{{.Tag}}\t{{.Repository}}"
```

You should see something like that

```shell
IMAGE ID       TAG       REPOSITORY
9d280d1feec7   latest    svc-user
01a97cac7c74   latest    svc-products
73de4fa41b44   latest    svc-cart
8768eddc4356   v0.0.25   gcr.io/k8s-minikube/kicbase
```

## Deploy to Kubernetes

You can run the following commands with NX IDE extension (vscode or intellij)

```shell
nx run svc-cart:kubernetesDeploy 

nx run svc-products:kubernetesDeploy 

nx run svc-user:kubernetesDeploy 
```

### Check if pods are running

```shell
kubectl get pods
```

```shell
NAME                           READY   STATUS    RESTARTS   AGE
svc-cart-8b6dfcfb4-tzccw       1/1     Running   0          39m
svc-products-5b9d7478b-5r5zq   1/1     Running   0          14m
svc-user-5c59cb6776-gdt2h      1/1     Running   0          5m54s
```

### Check if services are running

```shell
kubectl get services
```

```shell
kubernetes             ClusterIP   10.96.0.1        <none>        443/TCP        18h
svc-cart-service       NodePort    10.99.159.203    <none>        80:32180/TCP   25m
svc-products-service   NodePort    10.105.26.125    <none>        80:30915/TCP   16m
svc-user-service   
```

## Access services outside the node (minikube is able to create tunnel )

```shell
minikube service svc-cart-service --url
```

You will see something like that:

```shell
🏃  Starting tunnel for service svc-cart-service.
|-----------|------------------|-------------|------------------------|
| NAMESPACE |       NAME       | TARGET PORT |          URL           |
|-----------|------------------|-------------|------------------------|
| default   | svc-cart-service |             | http://127.0.0.1:53401 |
|-----------|------------------|-------------|------------------------|
http://127.0.0.1:53401
❗  Because you are using a Docker driver on darwin, the terminal needs to be open to run it.
```

**Open up** http://127.0.0.1:53401/api in your browser

You should see the following JSON response: 
```json
{"message":"Welcome to svc-cart!"}
```

🚀 🚀 🚀 **Open another terminal instance and run another service** 🚀 🚀 🚀


## Monitor services with minikube dashboard
```shell
minikube dashboard
```
![minikube](/assets/blog/minikube.png)

<br/>
<br/>



## **Deploy services locally with ArgoCD**

### Install Argo CD with kubectl
```shell
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### Download Argo CD CLI
macOS:
```shell
brew install argocd
```

Linux and Windows:
https://argoproj.github.io/argo-cd/cli_installation/

### Expose ArgoCD API Server
```shell
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
```

### Config ArgoCD CLI with username admin and password admin
```shell
kubectl -n argocd patch secret argocd-secret \
    -p '{"stringData": {"admin.password": "$2a$10$mivhwttXM0U5eBrZGtAG8.VSRL1l9cZNAmaSaqotIzXRBRwID1NT.",
        "admin.passwordMtime": "'$(date +%FT%T)'"
    }}'
argocd login localhost:8080 --username admin --password admin --insecure
```

### Expose ArgoCD UI
```shell
kubectl port-forward svc/argocd-server -n argocd 8080:443 
```

## Finally, open ArgoCD UI in your browser
[https://localhost:8080/](https://localhost:8080/)

![argocd login](/assets/blog/argocd-login.png)

## Login
**user**: ```admin``` <br/>
**password**: ```admin```
![argocd](/assets/blog/argocd.png)


Create new App by Clicking on **_NEW APP_** button

### Fill out the fields

**_Application Name_**: `cart-service` <br/>
**_Project_**: `default` <br/>
**_Repository URL_**: [https://github.com/ruslan-byondxr/node-ms-deployment](https://github.com/ruslan-byondxr/node-ms-deployment)

<br/>

We are going to use separate git repo for our deployment config files, It's best practice.
> The use of a different Git repository to hold your kubernetes manifests (separate from your application source code), is highly recommended. See best practices for further rationale. https://argoproj.github.io/argo-cd/user-guide/best_practices/

**_Path_**: `svc-cart` <br/>
**_Cluster URL_**: `https://kubernetes.default.svc` <br/>
**_Namespace_**: `microservices`<br/>

Click on **_Create_**



You should see The service:
![argocd](/assets/blog/argocd-svc.png)


🔥 Click on **_SYNC_**

## Access microservice locally
```shell
kubectl port-forward -n microservices svc/svc-cart 7000:8080
```

Open up your browser: [http://localhost:7000/api](http://localhost:7000/api)

You should see the following JSON response:
```json
{"message":"Welcome to svc-cart!"}
```