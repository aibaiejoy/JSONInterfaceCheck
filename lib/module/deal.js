/**
 *  @description 
 *		依赖datatool.formater 
 *		使用接口从目标数据中提取数据。
 *  @param {JSON} port 用来提取数据的接口文件，接口规范参考readme
 *  @param {JSON} source 源数据
 *  @return {JSON} 返回提取的数据
 *  @auth {李光} 115176236@163.com
 *  @site https://github.com/aibaiejoy/dataInterfaceCheck
 *  	
 */
define(["jquery", "./formater"], function($, formater) {
	var keys = ["order"];

	/*
	 *	@des get data mixed by port;
	 */
	var get = function(port, source){
			
		var mixData = {}, queue = [];
		
		$.each(port, function(k, v){
			var isKey = $.inArray(k, keys) > -1;
			
			if( !isKey && $.isArray(v) ){
				mixData[k] = [];
				
				for(var i = 0, l = source[k].length; i < l; i++){
					mixData[k].push( get(port[k][0], source[k][i]) ); 
				}
				
			}else if( !isKey && $.isPlainObject( v ) ){
				mixData[k] = get(port[k], source[k]) ; 
			}else if( !isKey ) {
				if(typeof v === "function"){
					//这里可以使用jquery的队列，我在这里只是简单的做了个队列
					queue.push({"target":mixData, "fn":v, "k": k, "source":source});
				}else{
					mixData[k] =  source[k] ;
				}	
			}
		});

		/*
		 * 执行队列中的函数。	
		 */
		for(var i = 0, l = queue.length; i < l; i++){
			var el = queue[i];
			el.target[el.k] = el.fn.call(el.target, el.source[el.k]);
		}
		
		return mixData;

	};

	/*
     *	 遍历接口，根据接口提取数据，将接口值，接口属性名，提取后的值，回传到match。
	*/

	var typeMatch = function(port, source, match){

		$.each(port, function(k, v){
			
			if( $.isArray(v) ){
				
				for(var i = 0, l = source[k].length; i < l; i++){
					typeMatch( port[k][0], source[k][i], match ); 
				}
				
			}else if( $.isPlainObject( v ) ){
				typeMatch( port[k], source[k], match ) ; 
			}else {
				match( v, k, source[k] );
			}
		});
	}

	/*
	* @des 判断item的类型是否为type的值
	* @return boolean
	* @para type ["boolean", "number", "string", "function", "array", "date", "regexp"],
	* 		或者自定义的检测函数，返回boolean
	* @para item 要检查的值
	* 
	*/
	var isType = function(type, item){

		var basicType = ["boolean", "number", "string", "function", "array", "date", "regexp"],
			customType = ["YY-MM-DD"]
		
		if( ~$.inArray(type, basicType) ){
			return type == $.type( item );
		}else if( $.type(type) == "function" ){
			try{
				return type( item );
			}catch(e){
				
			}
		}
	}

	return {
		"get":get,
		"typeMatch":typeMatch,
		"isType" : isType
	};
})

