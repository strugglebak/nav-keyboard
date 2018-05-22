// Initalize the keyboard
var keys = {
  0:['q','w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  1:['a','s', 'd', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  2:['z','x', 'c', 'v', 'b', 'n', 'm'],
  length: 3
};

var hash = {
  q: 'qq.com',
  w: 'weibo.com',
  e: 'ebay.com',
  r: 'renren.com',
  t: 'tt.com',
  y: 'uc.com',
  i: 'iqiyi.com',
  o: 'opera.com',
  p: undefined,
  a: 'acfun.com',
  s: 'sohu.com',
  d: 'developer.mozilla.org',
  z: 'zhihu.com',
  m: 'mcdonalds.com'
};

// Get the new hash from the localStorage
var hashLocalStorage = JSON.parse(localStorage.getItem('newUrl') || 'null');
// update the hash
if (hashLocalStorage) {
  hash = hashLocalStorage;
  console.log(hash);
}

// Generate the keyboard
for(var i = 0; i < keys.length; i++) {
  var span = document.createElement('span');
  wrapper.appendChild(span);

  for (var j = 0; j < keys[i].length; j++) {
    // add kbd
    var kbd = document.createElement('kbd');
    kbd.textContent = keys[i][j];
    span.appendChild(kbd);

    // add edit button
    var editButton = document.createElement('button');
    editButton.textContent = '编辑';
    editButton.id = keys[i][j];
    editButton.onclick = function(clickedBtn) {
      var buttonName = clickedBtn.target.id;
      // console.log(buttonId);
      var inputUrl = prompt('请输入一个新网址');
      // save the new website
      hash[buttonName] = inputUrl;
      // set the new hash in localStorage
      localStorage.setItem('newUrl',JSON.stringify(hash));
    }
    kbd.append(editButton);
  }
}

// Listen to the keyboard when user pressed
document.onkeypress = function(getKey) {
  website = hash[getKey['key']];
  // open the new blank website
  window.open('http://' + website, '_blank');
}
