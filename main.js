// Initalize the keyboard
var keys = {
  0:['q','w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  1:['a','s', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
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
  a: 'acfun.cn',
  s: 'sohu.com',
  d: 'developer.mozilla.org',
  z: 'zhihu.com',
  b: 'bilibili.com',
  m: 'mcdonalds.com'
};

// Get the new hash from the localStorage
var hashLocalStorage = JSON.parse(localStorage.getItem('newUrl') || 'null');
// update the hash
if (hashLocalStorage) {
  hash = hashLocalStorage;
}

// Generate the keyboard
for(var i = 0; i < keys.length; i++) {
  // var span = document.createElement('span');
  // wrapper.appendChild(span);
  var div = document.createElement('div');
  div.className = 'row';
  wrapper.appendChild(div);

  for (var j = 0; j < keys[i].length; j++) {
    // add kbd
    var kbd = document.createElement('kbd');
    kbd.className = 'key';
    // kbd.textContent = keys[i][j];
    div.appendChild(kbd);

    // add text in span
    var span = document.createElement('span');
    span.className = 'keytext'
    span.textContent = keys[i][j];
    kbd.appendChild(span);

    // add edit button
    var editButton = document.createElement('button');
    editButton.textContent = '编辑';
    editButton.id = keys[i][j];
    editButton.onclick = function(clickedElement) {
      var buttonName = clickedElement.target.id;
      var inputUrl = prompt('请输入一个新网址');
      if (inputUrl === null) {
        return ;
      }
      // save the new website
      hash[buttonName] = inputUrl;

      // update the favivon of the website
      newFavicon = clickedElement.target.nextSibling;
      if (newFavicon.className === 'iconfont icon-cry') { // iconfont node
        newFavicon = newFavicon.nextSibling;
      }

      newFavicon.src = 'http://' + inputUrl + '/favicon.ico';
      newFavicon.hidden = false;

      console.log(newFavicon);
      newFavicon.onerror = function(error) {
        error.target.hidden = true;
        }
      // set the new hash in localStorage
      localStorage.setItem('newUrl', JSON.stringify(hash));
    }
    kbd.append(editButton);

    // add the icon of the website
    var iconImg = document.createElement('img');
    if (hash[keys[i][j]]) { // if the hash has the right website
      iconImg.src = 'http://' + hash[keys[i][j]] + '/favicon.ico';
    } else { // undefined or null
      //add icon label which can display default img when can not get the favicon
      var iconNoImg = document.createElement('i');
      iconNoImg.className = 'iconfont icon-cry';
      kbd.appendChild(iconNoImg);
    }
    kbd.append(iconImg);
    // listen to the http image request error event
    iconImg.onerror = function(error) {
      error.target.hidden = true;
    }
  }
}

// Listen to the keyboard when user pressed
document.onkeypress = function(getKey) {
  website = hash[getKey['key']];
  // open the new blank website
  window.open('http://' + website, '_blank');
}
