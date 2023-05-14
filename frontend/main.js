window.onload = function () {
  getSideDish();
  setInterval("getSideDish()", 10000);
};

function getSideDish() {
  // APIGatewayのURL
  const url = ``;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();

  xhr.onreadystatechange = (e) => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // jsonをオブジェクトに変更
      const jsonObj = JSON.parse(xhr.responseText);
      // タイトル
      document.getElementById("av-title").textContent =
        jsonObj.result.items[0].title;
      // 出演者情報
      if (typeof jsonObj.result.items[0].iteminfo.actress != "undefined") {
        document.getElementById("av-actress").textContent =
          jsonObj.result.items[0].iteminfo.actress[0].name;
      }
      // 画像
      document.getElementById("av-image").src =
        jsonObj.result.items[0].imageURL.large;
    }
  };
}
