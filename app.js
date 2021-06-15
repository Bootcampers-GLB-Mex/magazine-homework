let all = document.body.getElementsByTagName("*");
var tags = {};
for (var i = 0, max = all.length; i < max; i++) {
  var tagname = all[i];
  tags[`${tagname.tagName}`] = tagname.innerText;
}

console.log(tags);
