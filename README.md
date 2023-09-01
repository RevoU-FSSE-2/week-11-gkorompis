# [ELEVEN]()

Building Mongodb, ExpressJS, Typscript, NodeJS stack for Reporting Portal Service using AWS resources.

## 1. Project Overview

Eleven streamlines user access with a simple sign-in process and enables hassle-free service requests. It also offers convenient file report retrieval, making it a versatile platform for efficient service management and data access.

## 2. Contents
1. [Project Overview](#1-project-overview)
2. [Contents](#2-contents)
3. [API Documentation](#3-api-documentation)
4. [Server-side Build and Deployment](#4-server-side-build-and-deployment)
    1. [Setting up virtual machine AWS EC2 and Docker](#41-setting-up-virtual-machine-aws-ec2-and-docker)
    2. [Build connection to mongodb with Docker](#42-build-connection-to-mongodb-with-docker)
    3. [Deploying build into AWS Lambda and AWS API Gateway](#43-deploying-build-into-aws-lambda-and-aws-api-gateway)



## 3. API Documentation
### 3.1 Dependencies
The server-side application is hosted by AWS API Gateway, and follows this requirement:
```javascript
 "dependencies": {
    "@types/body-parser": "^1.19.2",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/jsonwebtoken": "^9.0.2",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "ioredis": "^5.3.2",
    "jsonwebtoken": "^9.0.1",
    "mysql2": "^3.6.0",
    "serverless-http": "^3.2.0",
    "typescript": "^5.1.6"
}
```

### 3.2 BaseURL and Resources

#### General Syntax
```http
<base URL>/<resource>
```
```javascript
//header required for all header except for post users
{
    "Authorization": "bearer <jwt_token>"
}
```

#### Base URL
```http
https://gedldowmye.execute-api.ap-southeast-3.amazonaws.com/prod/
```

#### OpenAPI Documentation

Full documentation can be found [here.](https://gedldowmye.execute-api.ap-southeast-3.amazonaws.com/prod/api-docs/)

## 4. Server-side Build and Deployment
### 4.1 Setting up virtual machine AWS EC2 and Docker

To set up EC2 instance follow this workflow:
1. Login to AWS console, and then access "EC2" resource in Service bar.
2. Once EC2 dashboard is fully rendered, click "Launch Instance"
3. Provide name to label EC2 Instance
4. Select the desired amazon machine image (AMI) to build the virtual machine, in this project "Ubuntu Server 22.04 LTS (HVM)" image is selected.
5. Select the type of image architecture, in this project "64bit(x86)" is selected.
6. Select instance type, in this project "t3.micro" is selected. This instance type caters to 2 vCPU and 1 GiB Memory.
7. Create new key pair to login, in this project ".pem" file is created.
8. Configure security group to network setting depending on the use case, in this project only SSH traffic from anywhere is allowed as default.
9. Lastly, configure storage to be provisioned, in this project 8 GiB gp2 is selected. Finally click launch instance.
10. Once has been launched, EC2 can be access using SSH protocol via Public IPv4 address
```
chmod 400 <pem_file_name>.pem
ssh -i <pem_file_name>.pem ubuntu@<ipv4_address>
```
11. Once set up, you can download this repository into your EC2 instance.
```
git clone https://github.com/RevoU-FSSE-2/week-9-gkorompis
cd week-10-gkorompis
```
12. Install Docker
```
# assuming you git clone the repository into your user's home directory (~), and you are using linux operation system Ubuntu from AWS EC2
chmod 777 ~/week-10-gkorompis/workflow/install_docker.sh
~/week-10-gkorompis/workflow/install_docker.sh
sudo usermod -aG docker $USER
sudo service docker restart
```

### 4.2 Build connection to mongodb with Docker
1. Direct to working directory
```
cd ~/week-10-gkorompis/workflow/BuildMongoDB
```
2. Build Image
```
docker build . -t w10-mongo:1.0
```
3. 
```
docker run -p 3002:3002 w10-mongo:1.0
```
4. on new terminal tab, stop the container manuall once new collection creation is successful
```
docker stop <container_id>
```


sudo usermod -aG docker $USER
sudo service docker restart

### 4.3 Deploying build into AWS Lambda and AWS API Gateway

1. After login to you AWS console, direct to AWS lambda resource.
<img width="1397" alt="5 2 1" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/8ccfb003-6f99-48bc-bb46-5493a9b79c91">

2. Click "Create function", name your function and then "Create function" again.
<img width="1397" alt="5 2 2" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/f348631d-2439-439d-85ee-78208557a665">

3. Direct to your newly created function, select option "Upload From", and then select ".zip file".
<img width="1354" alt="5 2 3" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/d8606751-b48b-42c0-b417-30cf6c7469f5">

4. Upload the zip file from previous step into aws lambda placeholder.
5. After that, direct to AWS API Gateway resource from menubar or concole.
6. Click "Create API", choose api type "REST API" (not private), and the click "Build".
7. After naming your API, click "create api", and then create resource.
<img width="1415" alt="5 2 7 1" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/4e0109c7-39b2-4a6e-af29-26c078d9e179">

<img width="1399" alt="5 2 7" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/ef62dfbc-1483-4ccc-b369-e9c16cf6f4c0">

8. Tick configure as proxy resource, as well as enable API Gateway CORS, and then click "Create resource".
<img width="1400" alt="5 2 8" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/c8e6a2be-ae0f-472e-bdba-00ad63dae675">

9. Connect API Gateway with your lambda function by typing your function name, and then click "Save".
<img width="1399" alt="5 2 9" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/0007f388-aec8-438c-ba49-a0c118a5181e">

10. You can test your api, if all good, then click "Actions", and then "Deploy Api"
<img width="1404" alt="5 2 10" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/97df6514-b7ea-4fa5-b05b-5c71bf5494db">

11. After naming your API deployment stage, and then click "Deploy"
<img width="1395" alt="5 2 11" src="https://github.com/RevoU-FSSE-2/week-8-gkorompis/assets/52250424/7cd54f2b-9eab-4592-a726-7adcc4ab31be">

12. Your Base URL is ready, usually will be appeared on the top of the page.
