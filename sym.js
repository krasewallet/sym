var sym = function(){
	this.init();	
};

sym.prototype.init = function(){
	this.order = [];
	this.stack = {};
	this.ptr = 0
	this.callback = null;
}

sym.prototype.push = function(name,fn,args,callback){
	if (false == name in this.order){
		this.stack[name] = {
			"fn":fn,					//调用的函数
			"args":args,				//函数参数
			"callback":callback,
			"data":{},					//暂存数据(output)
			"index": this.order.length  //索引
		};
		this.order.push(name);
	}
	else{
		this.stack[name].fn = fn;
		this.stack[name].args = args;
	}
};

sym.prototype.next = function(data){
	//save data,call callback function
	var name = this.order[this.ptr];
	this.stack[name].data = data;
	try{
		if( this.stack[name].callback)
			this.stack[name].callback(data);
	}
	catch(e){
		this.callback ? this.callback(e,data) : null;
	}

	this.ptr += 1;
	if(this.ptr < this.order.length){
		//call next
		name = this.order[this.ptr];
		try{
			this.run(name);
		}
		catch(e){
			this.callback ? this.callback(e,data) : null;
		}
	}
	else{
		this.callback ? this.callback(null,data) : null;
	}
};

sym.prototype.done = function(callback){
	this.callback = callback;
}

sym.prototype.run = function(name){
	var fn = this.stack[name].fn;
	var args = this.stack[name].args
	try{
		fn.apply(this,args);
	}
	catch(e){
		this.callback ? this.callback(e,null) : null;
	}
};

sym.prototype.clear = function(){
	this.init();
}

var _sym = window.sym;
sym.noConflict = function(){
	if(window.sym === sym){
		window.sym = _sym;
	}
	return sym;
}