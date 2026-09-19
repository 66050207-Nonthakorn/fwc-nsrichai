const balloon = document.getElementById('balloon');
const colors = ['red', 'green', 'blue'];
let size = 200;
let color = 0;

function render() {
  balloon.style.width = `${size}px`;
  balloon.style.height = `${size}px`;
  balloon.style.backgroundColor = colors[color];
}

function grow() {
  size = size + 10 > 420 ? 200 : size + 10;
  color = (color + 1) % colors.length;
  render();
}

balloon.addEventListener('click', grow);
balloon.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    grow();
  }
});

balloon.addEventListener('mouseleave', () => {
  size = Math.max(200, size - 5);
  color = (color + colors.length - 1) % colors.length;
  render();
});
