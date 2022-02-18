/*settings required for:
showing lines and predictions
*/

window.onload = function() {
  let input_ball_radius = document.getElementById('gui-form-ball-radius');
  let input_ball_speed = document.getElementById('gui-form-ball-speed');
  let input_paddle_speed = document.getElementById('gui-form-paddle-speed');
  let input_fps = document.getElementById('gui-form-fps');

  //fps to speed conversion required for all speed values
  input_ball_radius.value = ball.r;
  input_ball_speed.value = ball.speed * (fps/10);
  input_paddle_speed.value = paddleLeft.speed * (fps/10);
  input_fps.value = fps;


  let toggle_settings = false;
  document.getElementById('settings-button').onclick = function() {
    toggle_settings = !toggle_settings;
    if(toggle_settings) document.getElementById('gui-container').style.display = 'none';
    if(!toggle_settings) document.getElementById('gui-container').style.display = 'table';
  }

  let toggle_isTargetting = false;
  let button_isTargetting = document.getElementById('gui-isTargetting-button');
  button_isTargetting.onclick = function() {
    toggle_isTargetting = !toggle_isTargetting;
    opp_isTargetting = toggle_isTargetting;
    if(toggle_isTargetting) button_isTargetting.style.backgroundColor = 'green';
    if(!toggle_isTargetting) button_isTargetting.style.backgroundColor = 'white';
  }

  let toggle_isDynamicMove = false;
  let button_isDynamicMove = document.getElementById('gui-isDynamicMove-button');
  button_isDynamicMove.onclick = function() {
    toggle_isDynamicMove = !toggle_isDynamicMove;
    opp_isDynamicMove = toggle_isDynamicMove;
    if(toggle_isDynamicMove) button_isDynamicMove.style.backgroundColor = 'green';
    if(!toggle_isDynamicMove) button_isDynamicMove.style.backgroundColor = 'white';
  }

  let toggle_isShowVisual = false;
  let button_isShowVisual = document.getElementById('gui-isShowVisual-button');
  button_isShowVisual.onclick = function() {
    toggle_isShowVisual = !toggle_isShowVisual;
    paddleRight.isShowVisual = toggle_isShowVisual;
    paddleLeft.isShowVisual = toggle_isShowVisual;
    if(toggle_isShowVisual) button_isShowVisual.style.backgroundColor = 'green';
    if(!toggle_isShowVisual) button_isShowVisual.style.backgroundColor = 'white';
  }

  let toggle_isLeftAI = true;
  let button_isLeftAI = document.getElementById('gui-isLeftAI-button');
  //be true on startup
  paddleLeft.isAI = toggle_isLeftAI;
  if(toggle_isLeftAI) button_isLeftAI.style.backgroundColor = 'green';
  if(!toggle_isLeftAI) button_isLeftAI.style.backgroundColor = 'white';
  button_isLeftAI.onclick = function() {
    toggle_isLeftAI = !toggle_isLeftAI;
    paddleLeft.isAI = toggle_isLeftAI;
    if(toggle_isLeftAI) button_isLeftAI.style.backgroundColor = 'green';
    if(!toggle_isLeftAI) button_isLeftAI.style.backgroundColor = 'white';
  }

  let toggle_isRightAI = false;
  let button_isRightAI = document.getElementById('gui-isRightAI-button');
  button_isRightAI.onclick = function() {
    toggle_isRightAI = !toggle_isRightAI;
    paddleRight.isAI = toggle_isRightAI;
    if(toggle_isRightAI) button_isRightAI.style.backgroundColor = 'green';
    if(!toggle_isRightAI) button_isRightAI.style.backgroundColor = 'white';
  }

  document.getElementById('settings-exit').onclick = function() {
    toggle_settings = !toggle_settings;
    if(toggle_settings) document.getElementById('gui-container').style.display = 'none';
    if(!toggle_settings) document.getElementById('gui-container').style.display = 'table';
  }

  document.getElementById('settings-apply').onclick = function() {
    let input_ball_radius_int = parseInt(document.getElementById('gui-form-ball-radius').value, 10);
    let input_ball_speed_int = parseInt(document.getElementById('gui-form-ball-speed').value, 10);
    let input_paddle_speed_int = parseInt(document.getElementById('gui-form-paddle-speed').value, 10);
    let input_fps_int = parseInt(document.getElementById('gui-form-fps').value, 10);

    if(!isNaN(input_fps_int)) {
      fps = input_fps_int;
      frameRate(fps);
    }
    if(!isNaN(input_ball_radius_int)) {
      ball.r = input_ball_radius_int;
    }
    if(!isNaN(input_ball_speed_int)) {
      ball.speed = input_ball_speed_int / (fps/10);
    }
    if(!isNaN(input_paddle_speed_int)) {
      paddleLeft.speed = input_paddle_speed_int / (fps/10);
      paddleRight.speed = input_paddle_speed_int / (fps/10);
    }
  }
}
