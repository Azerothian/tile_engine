/*All code copyright 2010 by John Graham unless otherwise attributed*/

//this array tells the tile engine which offset in the tiles.png image to use
tilesArray = [ 
							71,71,70,71,71,71,71,71,71,
							135,135,92,135,135,135,135,135,135,
							72,72,90,72,72,72,72,72,72,
							134,134,91,134,134,134,134,134,134,
							71,71,70,71,71,71,71,71,71,
							71,71,70,71,71,71,71,71,71,
							71,71,70,71,71,71,71,71,71,
							71,71,70,71,71,71,71,71,71,
							71,71,70,71,71,71,71,71,71,
							71,71,70,71,71,71,71,71,71,
							135,135,92,135,135,135,135,135,135,
							72,72,90,72,72,72,72,72,72,
							134,134,91,134,134,134,134,134,134,
							70,70,70,70,70,70,70,70,70,
							71,71,71,71,71,71,71,71,71,
							71,27,71,71,71,49,50,71,71,
							71,22,73,71,71,66,66,73,71,
							71,71,71,71,71,71,71,71,71,
							71,71,70,71,71,71,71,71,71,
							135,135,92,135,135,135,135,135,135,
							72,72,90,72,72,72,72,72,72,
							134,134,91,134,134,134,134,134,134,
							70,70,70,70,70,70,70,70,70,
							71,71,71,71,71,71,71,71,71,
							71,27,71,71,71,49,50,71,71,
							71,22,73,71,71,66,66,73,71,
							71,71,71,71,71,71,71,71,71,
							71,71,70,71,71,71,71,71,71,
							135,135,92,135,135,135,135,135,135,
							72,72,90,72,72,72,72,72,72,
							134,134,91,134,134,134,134,134,134,
							70,70,70,70,70,70,70,70,70,
							71,71,71,71,71,71,71,71,71,
							71,27,71,71,71,49,50,71,71,
							71,22,73,71,71,66,66,73,71,
							71,71,71,71,71,71,71,71,71
						];

Message.addMessage(tilesArray.length + ' Total Tiles to Load');

//function to detect canvas support by alterebro (http://code.google.com/p/browser-canvas-support/)
var canvas_support = {
	canvas_compatible : false,
	check_canvas : function() {
		try {
			this.canvas_compatible = !!(document.createElement('canvas').getContext('2d')); // S60
			} catch(e) {
			this.canvas_compatible = !!(document.createElement('canvas').getContext); // IE
		} 
		return this.canvas_compatible;
	}
} 

var Game = {
	gameTimer: 0, //holds id of main game timer
	tileEngine: 0, //holds tile engine object
	fps: 0, //target fps for game loop
	initGame: function() { //initialize game
		Game.fps = 2500; //set target fps to 25
		Game.createTiles();
		Message.addMessage("Tiles Ready");
		Game.startTimer(); //start game loop
		Message.addMessage("Main Loop Started");
	},
	startTimer: function(){ //start game loop
		var interval = 1000 / Game.fps;
		Game.gameTimer = setInterval(Game.runLoop, interval);
	},
	runLoop: function(){ //code to run on each game loop
		Game.tileEngine.drawFrame();
		FPS.fps_count++;  //increments frame for fps display
		Tracker.updateTracker(Game.tileEngine.x, Game.tileEngine.y);
	},
	createTiles: function(){ //create and initialize tile engine
		Game.tileEngine = newTileEngine(); //create tile engine object
		var obj = new Object(); //create tile engine initializer object
		obj.canvas = document.getElementById('main_canvas');
		obj.ctx = obj.canvas.getContext('2d');
		
		obj.init_x = 0;
		obj.init_y = 0;
		
		obj.tileWidth = 32;
		obj.tileHeight = 32;
		obj.tilesWide = 9;
		obj.tilesHigh = 900;
		
		obj.zoneTilesWide = 3;
		obj.zoneTilesHigh = 3;
		
		obj.sourceFiles = 'tiles.png';
		obj.sourceTileCounts = 254;
		obj.sourceTileAccross = 22;
		obj.tilesArray = tilesArray;
		
		Game.tileEngine.setMapAttributes(obj);
		Game.tileEngine.init();  //initialize tile engine object
	}
};

if(canvas_support.check_canvas()){  //check canvas support before intializing
	Game.initGame(); //initialize game object
}
else {
	Message.addMessage('Your Browser Does not support this demo!');	
}
