title = "Jumper";

description = `Jump to surfaces
`;

characters = [

];



options = {
	viewSize: {x: 200, y: 120},
	theme: 'shapeDark',
	isPlayingBgm: true,
  	isReplayEnabled: true,
  	seed: 2,

	//options = {viewSize: {x: 100, y: 150}}
};



let t, v;
let isJumping ;
let angle ;
let width;
let space;
let scr;
let playerCollision;
let floaters;
let player;
let floaterAddDist;
let fy;

function update() {
	if (ticks === 0 ) {
		fy = 30; // how high platform goes
		floaters = [];
		t = vec(30,70);
		isJumping = angle = width = space = 0;
		player = {
		  p: vec(105, 10),
		  v: vec(),
		  on: undefined,
		};
		floaterAddDist = 0;
	  }
	  if (floaterAddDist <= 0) {
		const r = rnd(10, 20);
		if (fy < 50 + r) {
		  fy = 50 + r + (50 + r - fy);
		} else if (fy > 100 - r) {
		  fy = 100 - r - (fy - (100 - r));
		}
		floaters.push({
		  cp: vec(105, fy),
		  p: vec(),
		  a: rnd(PI * 4),
		  r,
		  v: rnd(0.05, 0.1) * difficulty,
		  isValid: true,
		});
		fy += rnds(20);
		floaterAddDist += rnd(20, 40);
	  }
	  let sc = difficulty * 0.1;
	  if (player.p.x > 30) {
		sc += (player.p.x - 20) * 0.1;
	  }
	  floaterAddDist -= sc;
	//   color("light_black");
	//   rect(0, 0, 99, 5);
	  floaters = floaters.filter((f) => {
		f.cp.x -= sc;
		if (f.cp.x < -10) {
		  return false;
		}
		color(f.isValid ? "blue" : "light_blue");
		f.p.set(f.cp.x + 50, f.cp.y + sin(f.a) * f.r); // +50 extends distance
		box(f.p, 20, 5);
		f.a += f.v;
		return true;
	  });
	   player.p.x -= sc;
	   addScore(sc);
		

	 
	//  if (width + space < 0) {
	//  	width = 200;
	//  	space = rnd(0, 150);
	//    }
	   color("blue");
	   rect(1, 90, 50, 3);
	//   rect(width + space, 50, 100, 1);
	//   rect(width + space, 100, 150, 1);
	//   rect(width + space, 150, 200, 1);
	//   box(width + space, 160, 250, 1);
	   color("green");
	  
	   const playerCollision = box(t, 5, 5);
	    if (t.x < 0 || t.y > 120 || t.y < -5) {
	  	//play("lucky");
	  	end();
	    }
		for (;;) {
			if (!box(t, 5,5).isColliding.rect.blue) {
			  break;
			}
			t.x--;
			t.y--;
			v.set();
			
		  }
		 if (playerCollision.isColliding.rect.blue) {
			
		floaters.forEach((f) => {
			if (abs(f.p.x - player.p.x) < 12) {
			  player.on = f;
			}
		  }); 
			  isJumping = angle = 0;
			  player.x--;
		 	  v.set();
		 	}
	   if (isJumping) {
		   t.add(v);
		   v.y += 0.2;
		     if (playerCollision.isColliding.rect.blue) {
			
		 	// floaters.forEach((f) => {
		 	// 	if (abs(f.p.x - player.p.x) < 12) {
		 	// 	  player.on = f;
			// 	}
		 	//   }); 
			   isJumping = angle = 0;
		 	 }
			  if (input.isPressed) {
				bar(t, 30, 1, (angle -0.5), 0);
			  }
			  if (input.isJustReleased) {
				//play("jump");
				isJumping = 1;
				v = vec(5).rotate(angle);
			  }
			} else {
		if (input.isPressed) {
	 	bar(t, 30, 1, (angle -0.05), 0);
		//v = vec(5).rotate(angle);
	 	  }
	 	  if (input.isJustReleased) {
	 		//play("jump");
	 		isJumping = 1;
	 		v = vec(5).rotate(angle);
		   }
			}


			// player.on.isValid = false;
    	  //player.on = undefined;
		  //play('jump');
	 	  
	//  	if (playerCollision.isColliding.rect.blue) {
	//  	  isJumping = angle = 0;
	// 	   floaters.forEach((f) => {
	// 		         if (abs(f.p.x - player.p.x) < 12) {
	// 		           player.on = f;
	// 		         }
	// 				});
		  
	// 	}
	//    } else {
	//  	if (input.isPressed) {
	//  	  bar(t, 20, 1, (angle -= 0.05), 0);
	//  	}
	//  	if (input.isJustReleased) {
	//  	  play("jump");
	//  	  isJumping = 1;
	//  	  v = vec(4).rotate(angle);
	  	
	    
		// if (player.on != null) {
		// 	player.p.y = player.on.p.y - 6;
		//   } else {
		// 	player.v.y += input.isPressed ? 0.05 : 0.2;
		// 	player.p.add(player.v);
		//   }
	   t.x -= sc = clamp(t.x - 600, 0, 99) * 0.1 + difficulty;
	   width -= sc;
	   score += sc;
}
