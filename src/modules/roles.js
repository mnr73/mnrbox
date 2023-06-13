class roles{
	status = {
		'dead': false,
		'getOut': false,
		'beSimple': false,
	}


	setUser(userName,userId){
		this.status.userName = userName
		this.status.userId = userId
	}

	targets(){
		console.log(this.constructor.name);
		console.log(this.roleName);
		console.log(this.info);
	}

	targetBy(){
		console.log(this.status);
	}
}

class godFather extends roles{
	roleName = "گاد فادر"
	roleComponent = "GodFather"
}

export {godFather};