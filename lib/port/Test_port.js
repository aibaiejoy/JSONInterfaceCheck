define(function(){
	return {
		"kanData":{
			"countTotal": "boolean",
			"pageNo": "number",
			"pageSize": "number",
			"result":[{
				//"coverPath": "img",							//这个是前台要的
				"tlength": function(item){
					return /\d{2}:\d{2}:\d{2}/.test( item );
				},								//这个是前台要的
				"name": "string",								//这个是前台要的
				"recommendCount": "number",												//这个是前台要的
				"speaker": {								
					"name": "string"							//这个是前台要的
				},
				"viewCount": "number",
				
			}]
		}
	}
})