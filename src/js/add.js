function addItem(){
  var intent = document.getElementById('own').value;
  console.log("intent:",intent);
  var ul = document.getElementById('item');
  var li = document.createElement('li');
  li.setAttribute('class','newli');
  li.innerHTML = intent;
  ul.appendChild(li);
}
