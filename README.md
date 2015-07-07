# sym
create a stack used to synchronous function call in javascript

How To Use
*if you want to use the sym.js,the function must write like this:
	function fn(args){
		/*
			write your code
		*/
		/*where need call next function with output*/
			this.next(output);
	}
1. create a stack
	var stack = new sym();
2. push function to run
	stack.push(name,fn,args,callback);
3. bind callback when stack run finished
	stack.done(callback);
	*callback has to params err,data:
		err : exception info when stack error
		data : last function's output by using this.next
4. run function in stack
	stack.run(name); /*indicate the start position*/
