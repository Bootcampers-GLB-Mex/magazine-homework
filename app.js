let all = document.body.getElementsByTagName("*");
let tags = {};
for (let i = 0, max = all.length; i < max; i++) {
  let tagname = all[i];
  tags[`${tagname.tagName}`] = tagname.innerText;
}

console.log(tags);
