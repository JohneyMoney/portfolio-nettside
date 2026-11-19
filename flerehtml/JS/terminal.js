let output, input;

function startSpill(knapp, fil) {
  const terminal = knapp.parentElement.querySelector(".terminal");
  output = terminal.querySelector(".output");
  input = terminal.querySelector(".input");
  output.textContent = "";
  input.focus();
  import("./" + fil + "?" + Date.now()); // starter spillet på nytt hver gang
}

console.log = function (tekst) {
  output.textContent += tekst + "\n";
  output.scrollTop = output.scrollHeight;
};

window.prompt = function (sporsmaal) {
  output.textContent += sporsmaal;
  return new Promise(function (svar) {
    input.onkeydown = function (e) {
      if (e.key === "Enter") {
        output.textContent += input.value + "\n";
        svar(input.value);
        input.value = "";
      }
    };
  });
};