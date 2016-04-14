window.onload = function(){

	//获取所需DOM元素
	var input = document.getElementById("number");
	var leftin = document.getElementById("LeftIn");
	var rightin = document.getElementById("RightIn");
	var leftout = document.getElementById("LeftOut");
	var rightout = document.getElementById("RightOut");
	var result = document.getElementsByClassName("result")[0];
	var resultList = document.getElementsByTagName("li");

	var numReg = /^[0-9]+$/;
	//四个插入删除事件
	var eventhandler = {

		leftIn:function(){
			var value = input.value;
			if(numReg.test(value)){
				var oLi = document.createElement("li");
				var textnode = document.createTextNode(value);
				oLi.appendChild(textnode);
				result.insertBefore(oLi, result.childNodes[0]);
				input.value=""; 
			}
			else{
				alert("请输入正确的阿拉伯数字");
				input.value=""; 
				return false;
			}
		},

		rightIn:function(){
			var value = input.value;
			if(numReg.test(value)){
				var oLi = document.createElement("li");
				var textnode = document.createTextNode(value);
				oLi.appendChild(textnode);
				result.appendChild(oLi);
				input.value=""; 
			}
			else{
				alert("请输入正确的阿拉伯数字");
				input.value=""; 
				return false;
			}
		},

		leftOut:function(){
			if(resultList.length){
				var delvalue = resultList[0].innerText;
				var msg = confirm("你确定删除数字"+delvalue+"吗");
				if(msg == true){
					result.removeChild(resultList[0]);
				}	
			}
			else{
				alert("队列中没有数字");
				return false;
			}
		},

		rightOut:function(){
			if(resultList.length){
				var delvalue = resultList[resultList.length-1].innerText;
				var msg = confirm("你确定删除数字"+delvalue+"吗");
				if(msg == true){
					result.removeChild(resultList[resultList.length-1]);
				}
			}
			else{
				alert("队列中没有数字");
				return false;
			}
		},
	}

	//跨浏览器绑定事件
	function addListener(element,eventName,handler){
	  if(element.addEventListener){
	    element.addEventListener(eventName,handler,false);
	  }
	  else if(element.attachEvent){
	    element.attachEvent('on' + eventName,handler);
	  }
	  else{
	    element['on' + eventName] = handler;
	  }
	}

	//点击数字删除
	result.onmouseover = function(){
		var NewList = result.getElementsByTagName("li");
		for(var i=0; i<NewList.length; i++){
			NewList[i].index = i;
			NewList[i].onclick = function(){
				result.removeChild(NewList[this.index]);
			}
		}
	}
	//绑定事件
	addListener(leftin,'click',eventhandler.leftIn);
	addListener(rightin,'click',eventhandler.rightIn);
	addListener(leftout,'click',eventhandler.leftOut);
	addListener(rightout,'click',eventhandler.rightOut);
	
}