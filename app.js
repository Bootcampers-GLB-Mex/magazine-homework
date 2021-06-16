const doc1 = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Staatliches&family=Work+Sans:wght@300;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    
    <title>Magazine Cover</title>
    
</head>
<body>
    <div class="container">
        <div class="wrapper">
            <header class="header">
                <p>NAOMI WALDER TALKS LIFE AFTER MARCH FOR OUR LIVES</p>
                <h1>PORTRAIT</h1>
                <span class="date">JUNE 2021</span>
            </header>
            <div class="content-box">
                <aside class="left-aside">
                    <article class="article-1">
                        <span>IN FOCUS</span>
                        <h3>TALES OF THE CITY</h3>
                        <p>Behind the scenes look at the long history of the Metro</p>
                    </article>
                    <article class="article-2">
                        <h3>FUGITIVE BANKER TELLS ALL</h3>
                    </article>
                    <article class="article-3">
                        <h3>HIGHER RAINBOWS</h3>
                        <p>D.C. couple starts a LGBT-history Instagram</p>
                    </article>
                </aside>
                <main>
                    <img class= "model-img" src="css/img/model.png" alt="" height="820px">
                </main>
                <aside class="right-aside">
                    <article class="article-1">
                        <h6>EXCLUSIVE</h6>
                        <h2>DANN GHUNDI</h2>
                    </article>
                </aside>
            </div>
            <footer>
                <img class="barcode-img" src="css/img/qr-code.png" height="50px" alt="">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam quidem iusto, atque.</p>
            </footer>
        </div>

    </div>
</body>
</html>
`;

const doc2 = ` 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>National Geographic | Magazine</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <main class="magazine">
        <small class="magazine__url">Nationalgeographic.com/magazine |
          <span class="magazine__date">August 2009</span>
        </small>

        <h1 class="magazine__title">National Geographic</h1>

        <section class="magazine__highlight">
          <h2 class="highlight__title">
            Yellowstone
            <span class="highlight__title-bold">Supervolcano</span>
          </h2>
          <p class="highlight__subtitle">What lies beneath the park</p>
        </section>

        <section class="magazine__topics">
          <h3 class="topics__title topics__title--principal">
            <span class="span__block">Heaven</span>
            for Salmon
            <span class="topics__page">28</span>
          </h3>

          <div class="divider"></div>

          <h3 class="topics__title topics__title--secondary">
            Nature's scam artist
            <span class="topics__page">70</span>
          </h3>

          <div class="divider"></div>

          <h3 class="topics__title topics__title--principal">
            <span class="span__block">Can Venice</span>
            Be Saved?
            <span class="topics__page">88</span>
          </h3>

          <div class="divider"></div>

          <h3 class="topics__title topics__title--secondary">
            Camel Beauty Queens
            <span class="topics__page">114</span>
          </h3>
        </section>
      </main>
    </div>

    <footer class="attribution">
      <figure class="attribution__image">
        <img
          src="https://pbs.twimg.com/profile_images/1401622184561233925/lEX0bCs5_400x400.jpg"
          alt="Profile picture"
          class="image"
        />
      </figure>
      <div class="attribution__url">
        With &hearts; by
        <a class="url" href="https://github.com/alexcamachogz">Alex Camacho</a>
      </div>
    </footer>
  </body>
</html>

`;

function getTags(HTMLAsString) {
  const doc = new DOMParser().parseFromString(HTMLAsString, "text/html");

  let toReturn = {
    mainTitle: "",
    subTitle: "",
    date: "No date",
    articles: "No articles",
    sign: "No sign"
  };

  function getMainTitle() {
    const title = doc.getElementsByTagName("h1")[0].innerText;
    toReturn.mainTitle = title;
  }

  function getSubtitle() {
    const subtitle = doc
      .getElementsByTagName("h1")[0]
      .parentNode.getElementsByTagName("p").innerText;
    toReturn.subTitle = subtitle === undefined ? "No subtitle" : subtitle;
  }

  function toArray(obj) {
    return Array.from(obj);
  }

  function cleanString(str) {
    return str.replace(/\s+/g, " ").trim();
  }

  function getArticles() {
    const hTags = ["h2", "h3", "h4", "h5", "h6"];
    let articleCounter = 0;
    let articles = {};

    hTags.forEach((tag) => {
      let headTag = doc.getElementsByTagName(tag);

      if (headTag) {
        toArray(headTag).forEach((h) => {
          articleCounter++;
          const text = h.parentNode.querySelector("p")
            ? h.parentNode.querySelector("p").innerText
            : "No text";
          articles[`article_${articleCounter}`] = {
            Title: cleanString(h.innerText),
            Content: cleanString(text)
          };
        });
      }
    });
    toReturn["articles"] = articles;
  }

  function getDate() {
    const dateClass = ["magazine__date", "date", "magazine__header__date"];

    dateClass.forEach((tag) => {
      const dateByClass = doc.getElementsByClassName(tag);
      if (dateByClass[0] !== undefined) {
        toReturn["date"] = cleanString(dateByClass[0].innerText);
      }
    });
  }

  function getSign() {
    const signClass = ["attribution__url", "attribution", "sign"];
    signClass.forEach((tag) => {
      const signByClass = doc.getElementsByClassName(tag);
      if (signByClass[0] !== undefined) {
        toReturn["sign"] = cleanString(signByClass[0].innerText);
      }
    });
  }

  getMainTitle();
  getSubtitle();
  getArticles();
  getDate();
  getSign();

  return toReturn;
}
console.log(getTags(doc1));
console.log(getTags(doc2));

//  Referencias:

// https://stackoverflow.com/questions/12980648/map-html-to-json
// https://stackoverflow.com/questions/3103962/converting-html-string-into-dom-elements

// Revista 1: https://codesandbox.io/s/zealous-pine-ymlz7?file=/index.html:0-2193
// Revista 2: https://codesandbox.io/s/magazine-cover-db3jh?file=/index.html:0-2276
