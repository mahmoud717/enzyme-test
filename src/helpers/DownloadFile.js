import * as images from "../assets/img";
import Planet from "../components/Planet/Planet";
import ReactDOMServer from "react-dom/server";
const handleDownload = (planets) => {
  const renderedPlanets = planets.map((name, i) => {
    return ReactDOMServer.renderToString(
      <Planet
        key={Math.random()}
        id={i}
        name={name}
        img={images[name].default}
      />
    );
  });

  const contents = `
    <!DOCTYPE html> 
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Planets</title>
        <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
        />
      </head>
      <body style="margin: 0;">
        <div class="flex flex-col p-10 items-center justify-items-center">
          <div class="text-6xl mb-20">
            <h1>Planetarium</h1>
          </div>
          <div class="planets mt-20  w-3/4 max-w-3xl overflow-y-scroll h-100">${renderedPlanets}</div>
        </div>
      </body>
    </html>
  `;
  const blob = new Blob([contents], { type: "text/html" });
  let link = document.createElement("a");
  link.download = "snippet.html";
  link.href = window.URL.createObjectURL(blob);
  link.onclick = function (e) {
    // revokeObjectURL needs a delay to work properly
    const that = this;
    setTimeout(function () {
      window.URL.revokeObjectURL(that.href);
    }, 1500);
  };

  link.click();
  link.remove();
};
export default handleDownload;
