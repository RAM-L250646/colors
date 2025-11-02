// initialize variables
const b = document.getElementById("b");
const text = document.getElementById("color");
const saved = document.getElementById("saved");
let intcolor, hexcolor, next;
let key, mouse;
key = " "; // random starting color

// key detection
document.addEventListener("keydown", (e) => {
  if (!e.repeat) {key = e.key;}
});
// click detectioin
document.addEventListener("mousedown", (e) => {mouse = e.button;});

const intToRGB = (int) => {
    return [
      (int & 0xff0000) >> 16,
      (int & 0xff00) >> 8,
      (int & 0xff)
      ];
}

const avg = (nums) => {
  let [total, amt] = [0, 0];
  for (const i of nums) {total += i; amt++;}
  return total/amt;
}

// each frame
tick = setInterval(() => {
    if (key == " " || mouse == 0) {
      intcolor = Math.round(Math.random()*0xffffff);
      hexcolor = "#"+intcolor.toString(16).padStart(6, '0'); // int -> hex
      next = 1;
    }

    if (key == "s") {
      p = document.createElement("p");
      p.style.background = hexcolor;
      p.innerHTML = hexcolor;
      p.style.color = avg(intToRGB(intcolor)) > 127 ? "#000000" : "#ffffff";
      saved.appendChild(p);
      delete(p);
    }
  
    if (next == 1) { // only if mouse or space has been pressed to avoid weird looking artifacts
      b.style.background = hexcolor;
      text.innerHTML = hexcolor;
      text.style.color = avg(intToRGB(intcolor)) > 127 ? "#000000" : "#ffffff"
    }

    [next, mouse, key] = [0, -1, ""]; // reset key, next, and mouse
})
