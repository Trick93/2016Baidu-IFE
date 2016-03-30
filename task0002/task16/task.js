/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 function trim(str){ //删除两端的空格
 	return str.replace(/(^\s*)||(\s*$)/g, "")
 }
 function add(name,value){
 	var regName = /^[A-Za-z\u4e00-\u9fa5]{0,}$/;
 	var regValue = /^[0-9]{0,}$/;
 	if(name == "" ||!regName.test(name)){
 		alert("城市名必须为中英文字符");
 		return false;
 	}
 	else if(value == ""||!regValue.test(value)){
 		alert("空气质量指数必须为整数");
 		return false;
 	}
 	else{
 		document.getElementById("aqi-city-input").value = "";
 		document.getElementById("aqi-value-input").value = "";
 		return true;
 	}	
 }

function addAqiData() {
	var name = trim(document.getElementById("aqi-city-input").value);
	var value = trim(document.getElementById("aqi-value-input").value);
	if(add(name,value)){
		if(Object.keys(aqiData).length === 0){
			document.getElementById("aqi-table").innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
			}
	console.log(aqiData);
	aqiData[name] = value;
	renderAqiList(name,value)
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList(name,value) {
	var tr = document.createElement("tr");
	var city = document.createElement("td");
	city.innerHTML = name;
	var weather = document.createElement("td");
	weather.innerHTML = value;
	var operate = document.createElement("td");
	var btn = document.createElement("button");
	btn.innerHTML = "删除"; 
	btn.onclick = function(){
		delBtnHandle(tr);
	}
	operate.appendChild(btn);
	tr.appendChild(city);
	tr.appendChild(weather);
	tr.appendChild(operate);
	document.getElementById("aqi-table").appendChild(tr);
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();

}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(tr) {
  // do sth.
  document.getElementById("aqi-table").removeChild(tr);
  delete aqiData[name];
}

function init() {

	document.getElementById("add-btn").onclick = addBtnHandle;
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();