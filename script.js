const servers = [
  "https://google.com",
  "https://cloudflare.com",
  "https://httpbin.org",
];
async function measurePing() {
  let bestPing = Infinity;

  for (const server of servers) {
    try {
      const start = Date.now();
      await fetch(server, { cache: "no-cache", mode: "no-cors" });
      const ping = Date.now() - start;
      if (ping < bestPing) bestPing = ping;
    } catch (error) {
      console.error(`Failed to ping ${server}`);
    }
    console.log(server);
  }

  return bestPing !== Infinity ? bestPing : null;
}

document.querySelector("button").addEventListener("click", async (e) => {
  //Reset UI
  document.querySelector(".ping").classList.add("hide");
  document.querySelector(".loader-content").classList.add("hide");
  document.querySelector(".loader").classList.remove("hide");
  e.target.innerText = "Testing...";

  //measure ping
  let pingResult = "--";
  try {
    const ping = await measurePing();
    if (ping !== null) {
      pingResult = ping;
      document.querySelector(".ping").textContent = `Ping: ${pingResult}ms`;
    } else {
      document.querySelector(".ping").textContent = "Ping: Failed";
    }
  } catch (error) {
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
  // console.log(downloadSrc);
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
