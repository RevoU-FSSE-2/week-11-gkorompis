# [HowMuch!]()

Building MERN/PERN stack m-banking APP using AWS resources.

## 1. Project Overview

## 2. Contents
1. [Documentation Contents](#1-documentation-contents)
4. [Server-side Build and Deployment](#4-server-side-build-and-deployment)
    1. Setting up virtual machine AWS EC2 and Docker
    2. [Build connection to mongodb with Docker](#)
    3. Build connection to MySQL AWS RDS server with Docker
    4. Setting up REDIS AWS Elasticache
## 3. API Documentations
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