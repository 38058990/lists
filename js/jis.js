$(function(){
    function initHtml(json){
        var dat =  '<tr title ="'+json.id+'">' 
        +'<td>'+'<input type="checkbox" class="ckBox">' + '<span>'+ json.id +'</span>' +'</td>'
        +'<td>'+'<input class="inp" type="text" value="'+json.cla+'"disabled>'+'</td>'
        +'<td>'+'<input class="inp" type="text" value="'+json.cap+'"disabled>'+'</td>'
        +'<td>'+'<input class="inp" type="text" value="'+json.gra+'"disabled>'+'</td>'
        +'<td>'+'<input class="inp" type="text" value="'+json.sta+'"disabled>'+'</td>'
        +'<td>'+'<input class="inp" type="text" value="'+json.est+'"disabled>'+'</td>'
        +'<td>'+'<input class="inp" type="text" value="'+json.set+'"disabled>'+'</td>'
        +'<td>'+'<input class="inp" type="text" value="'+json.bra+'"disabled>'+'</td>'
        +'<td>'+'<input type="button" class="del" value="删除" title ="'+json.id+'">'+'</td>'
        +'</tr>'
        return dat;
        //导入数据
    }
     
    function initPage(data){ 
        $("tbody").html('');
       $.each(data,function(key,val){
            $("tbody").append(initHtml(val));
        }) 
    }
    
    initPage(data);   
    
//渲染页面
    
    $("body").on("click",".del",function(){
        var id = parseInt($(this).attr("title"));
        var ind =
        $(this).parent("td").parent("tr").index();
            for(var i = 0; i < data.length; i ++){
                if(id == data[i].id){
                    data.splice(i,1);  
                $("tbody tr").eq(ind).remove();
            }  
        }
    })
    
    var id_ = null;
    
    $.each(data, function(key, val){    
        if(id_ < val.id){
            id_ = val.id;
        }
    })
    //点击删除
    
    function refreshHtml(data,class_){
        data.unshift({
            id : class_.id,
            cla: $(class_.cla).val(),
            cap: $(class_.cap).val(),
            gra: $(class_.gra).val(),     
            sta: $(class_.sta).val(),
            est: $(class_.est).val(),
            set: $(class_.set).val(),
            bra: $(class_.bra).val()
        })
   //通过添加相对应的输入框内容     
        $(".ent[type='text']").val('');
        initPage(data);                              
    }
    
    $(".btn").on("click",function(){
        id_ = id_ + 1;                          
        refreshHtml(data,{id: id_,cla:'.cla',cap:'.cla',gra:'.gra',sta:'.sta',est:'.est',set:'.set',bra:'.bra'});
    })
    //录入内容
    
    
    function dealList(data, status, fun){
        if(status){    //正排序
            var emp = null; 
            for(var i = 0; i < data.length; i ++){
                for (var k = i + 1;k < data.length; k ++){
                    if(data[i].id > data[k].id){
                        emp = data[i];
                        data[i] = data[k];
                        data[k] = emp;
                    }
                }
            }
        }else{     //反排序
            for(var i = 0; i < data.length; i ++){
                for (var k = i + 1;k < data.length; k ++){
                    if(data[i].id < data[k].id){
                        emp = data[i];
                        data[i] = data[k];
                        data[k] = emp;
                    }
                }
            }
        }
        
        fun();
    }
     
    
    //定义排序方法
    
    
    
    
    
    $(".arr").on("click",function(){
        if($(this).hasClass("h")){
            dealList(data,true,function(){
                initPage(data);
            })
            $(this).removeClass("h");
        }else{
            dealList(data,false,function(){
                initPage(data);
            })
            $(this).addClass("h");
        }
    })
    //点击排序
    
    
    //点击全选
      var inp =0;
        $(".chk-a").on("click",function(){
            if(inp == 0){
              $(".ckBox").attr("checked",true);
                inp = 1
            }else{
                $(".ckBox").attr("checked",false);
                inp = 0
            } 
        })
        
        
        //点击修改
    $("body").on("click", "td", function(){
        $(this).children("input[type='text']").removeAttr("disabled");
	 })
	
    $("body").on("blur", "td", function(){
        $(this).children("input[type='text']").attr("disabled", true);
	 })	
    
    
    
    //上下键移动
    
    
    $(window).keydown(function(e){
		var key = e.keyCode;
		switch(key){
		    case 38:  //上键移动
				index = $("tr.bak").index();
				if(index > 0){
					index --;
				}
				$("tbody tr").eq(index).addClass("bak").siblings("tr").removeClass("bak");
			break;
			case 40: //下键移动
				index = $("tr.bak").index();
				if(index < $('tbody tr').length - 1){
					index ++;
				}
				$("tbody tr").eq(index).addClass("bak").siblings("tr").removeClass("bak");	
			break;
			case 46:   //del键删除
                index = $("tr.bak").index();
                     var id = $(this).parent("id").parent("tr").index();
		                  for(var i = 0; i < data.length; i ++){
                            if(id == data[i].id){
                                data.splice(i, 1);
                                $("tbody tr").eq(id).remove();
                            }			
                        }
                    $("tbody tr").eq(index).remove();
                    if(index < $('tbody tr').length - 1){
                     $("tbody tr").eq(index).addClass("bak")
                }else{
                     $("tbody tr").eq(index).addClass("bak")
                };
                
			break;
            case 13:   //回车键选中
                index = $("tr.bak").index();
                   if($(".ckBox").eq(index).is(":checked")){
                    $(".ckBox").eq(index).attr("checked",false)
                    }else{
                    $(".ckBox").eq(index).attr("checked",true);
                } 
                
            break;
		}
	})
    //点击删除选中
     $(".delete").on("click",function(){
         if(inp == 1){
             $("body").html("");
             data = [];
         }else{
             $("td input[type='checkbox']:checked").each(function(){
                 var id = $(this).parent("td").attr("title");
		                  for(var i = 0; i < data.length; i ++){
                            if(id == data[i].id){   
                                data.splice(i, 1);
                            }			
                        }		
             })
          $("td input[type='checkbox']:checked").parent().parent().remove();
         }
     })   
  
     
})