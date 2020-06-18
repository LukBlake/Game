var FPS = 60;
var then, now, elapsed, fpsDelay;

function startAnimation(FPS) {
  fpsDelay = 1000 / FPS;
  then = window.performance.now();
  animation(then);
}

function animation(Time) {
  window.requestAnimationFrame(animation);
  now = Time;
  elapsed = now - then;
  if(elapsed > fpsDelay){
    then = now - (elapsed % fpsDelay);
    update();
    draw();
  }
}

startAnimation(FPS);