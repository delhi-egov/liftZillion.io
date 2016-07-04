# Delhi Government Lift Approval Process Automation System

This is a SailsJs Project, it will contain:
* **Core Backend**
* **Dashboard for the Postal Office/Admin Office**


# Please follow these Rules for Contribution
* **Please Refer to this [guide](http://rogerdudler.github.io/git-guide/) if you are stuck with Git**
* **Do Not Push to the master branch**
* **Checkout to another branch as soon as you clone the project, preferably name the branch as your own name in lowercase**

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisities

What things you need to install the software and how to install them

```
NodeJS
npm
bower
sailsjs
mongodb(Optional-Project can be tested with sails disk)
Postman Client for Testing the APIs
```

### Installing

A step by step series of examples that tell you have to get a development env running


* **Go inside the project directory**
* **npm install**

## Deployment

Run the server:


```
npm start or sails lift
```

## Built With

* Webstorm - IDE
* [ZillionAngular Yeoman Generator](https://github.com/naqvijafar91/angularjs-generator)
* MafiaPower

## APIS
Delhi government Project


	* Login
	*
		* Admin
		* Deputy Electrical inspector
		* Inspector
		* Applicant

	* Registration
	*
		* Applicant

	* Notification before inspector Arrives
	*
		* Change through table status to arriving

	* DB Schema
	*
		* Applicant
		* Form A (FA)
		* Deputy Electrical Inspector (DEI)
		* Inspector
		* Inspection Report (IR)
		* Through Table



##DB Layer handling

	* Form A -> Assigned by DEI -> Inspector
	*
		* Change Form Status
		* Entry in through Table (Inspector Id, Form Id, Default Status)
		* Notify Inspector and Applicant

	* Form A Before Update
	*
		* if(status == rejected) allow update and status -> pending else err()
		*


	* Inspector Report
	*
		* Can be updated only Once

	* Inspector Report On update
	*
		* Change form status in through table
		* Change form




	* Form Flags
	*
		* status = ['pending', 'assigned', 'rejected', 'recheck', 'confirmed']
		* isReportReceived = false
		*
			* Can assign or reject if pending if !confirmed
			* Can recheck if isReportReceived == true and status == assigned if !confirmed
			* Can confirm if isReportReceived == true and status == assigned if !confirmed


	* Through Table Record Flags
	*
		* InspectorStatus = ['pending', 'accepted', 'completed']

## Postman Api

[Click me](https://www.getpostman.com/collections/2508762fdc58eadae55f)


## Authors

* **Jafar Naqvi** - *Initial work* - [Jafar Naqvi](https://github.com/naqvijafar91)


## License

This project is licensed under the MIT License

## Acknowledgments

* [Zillion](http://zillion.io)

