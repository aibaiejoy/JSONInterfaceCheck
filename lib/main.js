requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        module:"lib/module",
        port : "lib/port",
        data:"data"
    }
});

require(["jquery","module/deal"], function($, deal) {
    $(function() {
		require(["port/myPort", "data/kanData"], function(myPort, data){

    		test("测试根据接口获取数据是否正确", function(){
                var resultData = deal.get(myPort.kanData, data.kanData);
                
                equal( resultData.countTotal                       ,    true,           "countTotal" )
                equal( resultData.pageNo                           ,    1,       "pageNo" )
                equal( resultData.pageSize                         ,    12,       "pageSize" )
                equal( resultData.result.length                    ,    data.kanData.result.length,       "result.length" )
                equal( resultData.result[0].tlength                ,    data.kanData.result[0].tlength,       "tlength" )
                equal( resultData.result[0]["name"]                ,    data.kanData.result[0]["name"],       "name" )
                equal( resultData.result[0].recommendCount         ,    data.kanData.result[0].speaker["name"],       "recommendCount" )
                equal( resultData.result[0].speaker["name"]        ,    data.kanData.result[0].speaker["name"],       "speaker['name']" )
                equal( resultData.result[0].viewCount              ,    data.kanData.result[0].viewCount,       "viewCount" )

                equal( resultData.result[1].tlength                ,    data.kanData.result[1].tlength,       "tlength" )
                equal( resultData.result[1]["name"]                ,    data.kanData.result[1]["name"],       "name" )
                equal( resultData.result[1].recommendCount         ,    data.kanData.result[1].speaker["name"],       "recommendCount" )
                equal( resultData.result[1].speaker["name"]        ,    data.kanData.result[1].speaker["name"],       "speaker['name']" )
                equal( resultData.result[1].viewCount              ,    data.kanData.result[1].viewCount,       "viewCount" )

                equal( resultData.result[2].tlength                ,    data.kanData.result[2].tlength,       "tlength" )
                equal( resultData.result[2]["name"]                ,    data.kanData.result[2]["name"],       "name" )
                equal( resultData.result[2].recommendCount         ,     data.kanData.result[2].speaker["name"],       "recommendCount" )
                equal( resultData.result[2].speaker["name"]        ,    data.kanData.result[2].speaker["name"],       "speaker['name']" )
                equal( resultData.result[2].viewCount              ,    data.kanData.result[2].viewCount,       "viewCount" )

            });
        });

        require(["port/Test_port", "data/kanData"], function(myPort, data){
            test("测试deal.isType的相关方法", function(){
                var type = function(item){
                    return /\d{2}:\d{2}:\d{2}/.test( item );
                }
                sourceValue = "12:30:00";

                ok( deal.isType( type, sourceValue ), "12:30符合时间格式" );
                equal( true, deal.isType( "string", "1" ), "数值1" );


            })
            test("测试数据类型是否匹配", function(){
                var resultData = deal.typeMatch(myPort.kanData, data.kanData, function(portValue, key, sourceValue, result){
                    ok( deal.isType( portValue, sourceValue ), (key + " 类型为 " + portValue + ",  " + sourceValue) );
                });
            });
        });    
    });
});