



document.querySelector("button").addEventListener("click", async (e) => {
  //Reset UI
  document.querySelector(".ping").classList.add("hide");
  document.querySelector(".loader-content").classList.add("hide");
  document.querySelector(".loader").classList.remove("hide");
  e.target.innerText = "Testing...";

  //measure ping
  let pingResult = "--";
  try {
    const pingStart = new Date().getTime();
    const response = await fetch("https://httpbin.org/get?cache=" + pingStart, {
      cache: "no-cache",
      mode: "no-cors", // Bypass CORS issues
    });
    const pingEnd = new Date().getTime();
    pingResult = pingEnd - pingStart;
    document.querySelector(".ping").textContent = `Ping: ${pingResult}ms`;
  } catch (e) {
    document.querySelector(".ping").textContent = "Ping: Failed";
  }

  var imageLink =
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Tokyo_Sky_Tree_2012.JPG",
    downloadSize = 8185374,
    time_start,
    time_end,
    downloadSrc = new Image();
  document.querySelector(".loader-content").classList.add("hide");
  document.querySelector(".loader").classList.remove("hide");
  time_start = new Date().getTime();
  var cacheImg = "?nn=" + time_start;
  downloadSrc.src = imageLink + cacheImg;
  console.log(downloadSrc);
  downloadSrc.onload = function () {
    //this function will trigger once the image loads
    time_end = new Date().getTime();
    var timeDuration = (time_end - time_start) / 1000,
      loadedBytes = downloadSize * 8;
    totalSpeed = loadedBytes / timeDuration / 1024 / 1024;
    document.querySelector(".content").innerHTML =
      totalSpeed + "<small>Mbps</small>";
    let i = 0,
      speedOut;
    const animate = () => {
      if (i < totalSpeed) {
        document.querySelector(".content").innerHTML =
          i.toFixed(2) + "<small>Mbps</small>";
        setTimeout(animate, 20);
        i++;
      } else {
        document.querySelector(".content").innerHTML =
          total + "<small>Mbps</small>";
      }
    };
    animate();
    document.querySelector(".ping").classList.remove("hide");
    document.querySelector(".loader-content").classList.remove("hide");
    document.querySelector(".loader-content").classList.add("result");
    document.querySelector(".loader").classList.add("hide");
    document.querySelector(".content").classList.remove("hide");
    e.target.innerText = "CHECK AGAIN";
    // console.log(totalSpeed);
    // console.log(timeDuration);
  };
});
