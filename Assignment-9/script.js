let kgRef = document.getElementById("kg");
let gRef = document.getElementById("g");

let convertFromKg = () => {
  let kg = kgRef.value;
  gRef.value = (kg * 1000);
};

let convertFromG = () => {
  let g = gRef.value;
  kgRef.value = (g / 1000);
};


kgRef.addEventListener("input", convertFromKg);
gRef.addEventListener("input", convertFromG);
window.addEventListener("load", convertFromKg);