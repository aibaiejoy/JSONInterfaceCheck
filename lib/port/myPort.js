define(function(){
	return {
		"kanData":{
			"countTotal": "boolean",
			"pageNo": "number",
			"pageSize": "number",
			"result":[{
				//"coverPath": "img",							//这个是前台要的
				"tlength": "string",								//这个是前台要的
				"name": "string",								//这个是前台要的
				"recommendCount": function(v){
					//console.log(this.speaker.name)			//这里可以访问还未读取出来的this.speaker.name原理是，函数加入队列，在其他属性读取完开始执行。
					return this.speaker.name
				},												//这个是前台要的
				"speaker": {								
					"name": "string"							//这个是前台要的
				},
				"viewCount": "number",
				
			}]
		}
	}
})