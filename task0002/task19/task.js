window.onload = function(){

	//获取所需DOM元素
	var input = document.getElementById("number");
	var leftin = document.getElementById("LeftIn");
	var rightin = document.getElementById("RightIn");
	var leftout = document.getElementById("LeftOut");
	var rightout = document.getElementById("RightOut");
	var result = document.getElementsByClassName("result")[0];
	var resultList = document.getElementsByTagName("li");
	var sortNum = document.getElementById("sortnum");
	var random = document.getElementById("random");
	var insort = false;

	var numReg = /^[0-9]+$/;
	//四个插入删除事件
	var eventhandler = {

		leftIn:function(){
			var value = input.value;
			if(numReg.test(value) && value>=10&&value<=100){
				var oLi = document.createElement("li");
				var list = result.getElementsByTagName("li");
				if(list.length+1 > 60){
					alert("数量最多为60，已超出");
				}
				else{
					result.insertBefore(oLi, result.childNodes[0]);
					list[0].style.height = value*3 + "px";
					list[0].title = value;
					input.value="";
				} 
			}
			else{
				alert("请输入正确的10~100的阿拉伯数字");
				input.value=""; 
				return false;
			}
		},

		rightIn:function(){
			var value = input.value;
			if(numReg.test(value)  && value>=10&&value<=100){
				var oLi = document.createElement("li");
				var list = result.getElementsByTagName("li");
				if(list.length+1 > 60){
					alert("数量最多为60，已超出");
				}
				else{
					result.appendChild(oLi);
					list[list.length - 1].style.height = value*3 + "px";
					list[list.length - 1].title = value;
					input.value=""; 
				}
			}
			else{
				alert("请输入正确的10~100的阿拉伯数字");
				input.value=""; 
				return false;
			}
		},

		leftOut:function(){
			if(resultList.length){
				var delvalue = resultList[0].title;
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
				var delvalue = resultList[resultList.length-1].title;
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

		sortnumber:function(){
			console.log(insort);
			var b = result.getElementsByTagName("li");
			var swap,i=0,j=0;
			if(insort){
				alert("别闹");
			}
			insort = true;
			function settime(){
			if(i<b.length){
				if(j<b.length-i-1){
					b[j].style.background = "#FF96D7";
					b[j+1].style.background = "#FF96D7";
					if(parseInt(b[j].title) > parseInt(b[j+1].title))
					{
						swap = b[j];
						b[j] = b[j+1];
						b[j+1] = swap;
						result.insertBefore(b[j+1], b[j]);
						b[j].style.background = 'red';
						j++
						setTimeout(settime, 100);
					}
					else{
						b[j].style.background = 'red';
						j++;
						setTimeout(settime, 100);
					}
				}
				else{
					i++;
					b[j].style.background = 'red';
					j=0;
					setTimeout(settime, 100);
				}
			}
			return insort = false;
		}
		settime();

	},

		random:function(){
			result.innerHTML = "";
			var list = result.getElementsByTagName("li");
			for(var i=0; i<20; i++){
				var oLi = document.createElement("li");
				var x=Math.round(Math.random()*80+10);
				oLi.style.height = x*3 + "px"
				oLi.title = x;
				result.appendChild(oLi);
			}
		}
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
	addListener(sortNum,'click',eventhandler.sortnumber);
	addListener(random,'click',eventhandler.random);
	
}