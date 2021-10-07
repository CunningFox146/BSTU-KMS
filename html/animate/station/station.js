(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.pianomechanics = function() {
	this.initialize(img.pianomechanics);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,684);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Pointer13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(10,1,1).p("A+YlVMA8xAKr");
	this.shape.setTransform(194.5,34.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pointer13, new cjs.Rectangle(-5,-5,399,78.4), null);


(lib.Pointer12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(10,1,1).p("AeQYJMg8fgwR");
	this.shape.setTransform(193.575,154.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pointer12, new cjs.Rectangle(-5,-5,397.2,319), null);


(lib.Pointer11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(10,1,1).p("A+SuCMA8lAcF");
	this.shape.setTransform(193.85,89.875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pointer11, new cjs.Rectangle(-5,-5,397.7,189.8), null);


(lib.Pointer10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(10,1,1).p("AoFAbIQLg1");
	this.shape.setTransform(51.75,2.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pointer10, new cjs.Rectangle(-5,-5,113.5,15.5), null);


(lib.Pointer9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(10,1,1).p("AoFAuIQLhb");
	this.shape.setTransform(51.75,4.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pointer9, new cjs.Rectangle(-5,-5,113.5,19.2), null);


(lib.Pointer8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(10,1,1).p("AeTDdMg8lgG5");
	this.shape.setTransform(193.85,22.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pointer8, new cjs.Rectangle(-5,-5,397.7,54.2), null);


(lib.Pointer7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(10,1,1).p("AoBDtIQDnZ");
	this.shape.setTransform(51.425,23.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pointer7, new cjs.Rectangle(-5,-5,112.9,57.4), null);


(lib.Pointer6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(10,1,1).p("AICj/IwDH/");
	this.shape.setTransform(51.425,25.575);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pointer6, new cjs.Rectangle(-5,-5,112.9,61.2), null);


(lib.Pointer5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(10,1,1).p("AIGv3IwLfv");
	this.shape.setTransform(51.75,101.575);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pointer5, new cjs.Rectangle(-5,-5,113.5,213.2), null);


(lib.Pointer4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(10,1,1).p("AoBoTIQDQn");
	this.shape.setTransform(51.425,53.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pointer4, new cjs.Rectangle(-5,-5,112.9,116.4), null);


(lib.Pointer2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(10,1,1).p("A+SQsMA8lghX");
	this.shape.setTransform(193.9,106.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pointer2, new cjs.Rectangle(-5,-5,397.8,223.5), null);


(lib.Pointer1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(10,1,1).p("AoFd4MAQLg7v");
	this.shape.setTransform(51.75,191.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pointer1, new cjs.Rectangle(-5,-5,113.5,392.5), null);


(lib.Pointer = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(10,1,1).p("AoBJiIQDzD");
	this.shape.setTransform(51.425,61.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pointer, new cjs.Rectangle(-5,-5,112.9,132.1), null);


(lib.hover = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhXBYQgkgkAAg0QAAgzAkgkQAkgkAzAAQA0AAAkAkQAkAkAAAzQAAA0gkAkQgkAkg0AAQgzAAgkgkg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hover, new cjs.Rectangle(-12.4,-12.4,24.8,24.8), null);


// stage content:
(lib.station = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
		stage.enableMouseOver();
		
		const BASIC_COLOR = "black";
		const HOVER_COLOR = "red";
		const HOVER_SCALE = 1.5;
		
		const TEXT = [
			"Молоточковый механизм",
			"Шпиллер",
			"Шультер",
			"Молоточек",
			"Плечо шпиллера",
			"Котрфенгер",
			"Фенгер",
			"Шультер",
			"Бентик",
			"Шлейф бентика",
			"Демпфельгальтер",
			"Демпферная колодочка",
			"Демпферная ложка",
		]
		
		let CreateHint = (number) => {
			let text = this["Text_" + number];
			let hover = this["Hover_" + number];
			let pointer = this["Pointer_" + number];
		
			pointer.visible = false;
			
			hover.alpha = 0.1;
			hover.stop();
			
			text.text = TEXT[number - 1];
				
			hover.addEventListener("click", () => createjs.Sound.play("Sound_" + number ));
			text.addEventListener("click", () => createjs.Sound.play("Sound_" + number));
			
			hover.addEventListener("mouseover", () => {
				//createjs.Sound.play("test");
				text.color = HOVER_COLOR;
				text.scale = HOVER_SCALE;
				
				text.setTransform(text.x, text.y, HOVER_SCALE, HOVER_SCALE);
				
				pointer.visible = true;
			});
			hover.addEventListener("mouseout", () => {
				text.color = BASIC_COLOR;
				text.setTransform(text.x, text.y, 1, 1);
				pointer.visible = false;
			});
			
			text.addEventListener("mouseover", () => {
				//createjs.Sound.play("test");
				hover.alpha = 0.75;
				hover.shape.graphics._fill.style = "red"
				pointer.visible = true;
			});
			text.addEventListener("mouseout", () => {
				hover.alpha = 0.1;
				hover.shape.graphics._fill.style = "black"
				pointer.visible = false;
				//hover.goToAndStop(0);
			});
		}
		
		for (let i = 1; i <= 13; i++){
			CreateHint(i);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Actions
	this.text = new cjs.Text("Чтоб прослушать названия, нажмите на текст или номер.", "20px 'Arial Narrow'", "#282828");
	this.text.textAlign = "right";
	this.text.lineHeight = 25;
	this.text.lineWidth = 220;
	this.text.parent = this;
	this.text.setTransform(1022,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Pointer
	this.Pointer_11 = new lib.Pointer11();
	this.Pointer_11.name = "Pointer_11";
	this.Pointer_11.setTransform(316.8,275.4,1,1,0,0,0,193.8,89.9);

	this.Pointer_12 = new lib.Pointer12();
	this.Pointer_12.name = "Pointer_12";
	this.Pointer_12.setTransform(317.15,244.95,1,1,0,0,0,193.6,154.5);

	this.Pointer_13 = new lib.Pointer13();
	this.Pointer_13.name = "Pointer_13";
	this.Pointer_13.setTransform(316.2,399.45,1,1,0,0,0,194.5,34.2);

	this.Pointer_2 = new lib.Pointer2();
	this.Pointer_2.name = "Pointer_2";
	this.Pointer_2.setTransform(316.8,167.2,1,1,0,0,0,193.9,106.8);

	this.Pointer_5 = new lib.Pointer5();
	this.Pointer_5.name = "Pointer_5";
	this.Pointer_5.setTransform(459,263.6,1,1,0,0,0,51.8,101.5);

	this.Pointer_10 = new lib.Pointer10();
	this.Pointer_10.name = "Pointer_10";
	this.Pointer_10.setTransform(459,334.3,1,1,0,0,0,51.8,2.7);

	this.Pointer_9 = new lib.Pointer9();
	this.Pointer_9.name = "Pointer_9";
	this.Pointer_9.setTransform(459.65,299.1,1,1,0,0,0,51.8,4.6);

	this.Pointer_7 = new lib.Pointer7();
	this.Pointer_7.name = "Pointer_7";
	this.Pointer_7.setTransform(459.25,253.6,1,1,0,0,0,51.4,23.7);

	this.Pointer_6 = new lib.Pointer6();
	this.Pointer_6.name = "Pointer_6";
	this.Pointer_6.setTransform(459.25,221.6,1,1,0,0,0,51.4,25.6);

	this.Pointer_4 = new lib.Pointer4();
	this.Pointer_4.name = "Pointer_4";
	this.Pointer_4.setTransform(459.25,79.6,1,1,0,0,0,51.4,53.1);

	this.Pointer_1 = new lib.Pointer1();
	this.Pointer_1.name = "Pointer_1";
	this.Pointer_1.setTransform(459,217.7,1,1,0,0,0,51.8,191.2);

	this.Pointer_3 = new lib.Pointer();
	this.Pointer_3.name = "Pointer_3";
	this.Pointer_3.setTransform(459.25,155.3,1,1,0,0,0,51.4,61);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.Pointer_3},{t:this.Pointer_1},{t:this.Pointer_4},{t:this.Pointer_6},{t:this.Pointer_7},{t:this.Pointer_9},{t:this.Pointer_10},{t:this.Pointer_5},{t:this.Pointer_2},{t:this.Pointer_13},{t:this.Pointer_12},{t:this.Pointer_11}]}).wait(1));

	// Hover
	this.Pointer_8 = new lib.Pointer8();
	this.Pointer_8.name = "Pointer_8";
	this.Pointer_8.setTransform(316.8,241.7,1,1,0,0,0,193.8,22.1);

	this.Hover_12 = new lib.hover();
	this.Hover_12.name = "Hover_12";
	this.Hover_12.setTransform(123.55,90.45);

	this.Hover_11 = new lib.hover();
	this.Hover_11.name = "Hover_11";
	this.Hover_11.setTransform(123,185.5);

	this.Hover_8 = new lib.hover();
	this.Hover_8.name = "Hover_8";
	this.Hover_8.setTransform(123,219.6);

	this.Hover_2 = new lib.hover();
	this.Hover_2.name = "Hover_2";
	this.Hover_2.setTransform(122.9,273.9);

	this.Hover_13 = new lib.hover();
	this.Hover_13.name = "Hover_13";
	this.Hover_13.setTransform(121.7,365.25);

	this.Hover_1 = new lib.hover();
	this.Hover_1.name = "Hover_1";
	this.Hover_1.setTransform(407.2,408.95);

	this.Hover_5 = new lib.hover();
	this.Hover_5.name = "Hover_5";
	this.Hover_5.setTransform(407.2,365.25);

	this.Hover_10 = new lib.hover();
	this.Hover_10.name = "Hover_10";
	this.Hover_10.setTransform(407.2,337.05);

	this.Hover_9 = new lib.hover();
	this.Hover_9.name = "Hover_9";
	this.Hover_9.setTransform(407.2,306.9);

	this.Hover_7 = new lib.hover();
	this.Hover_7.name = "Hover_7";
	this.Hover_7.setTransform(407.85,277.3);

	this.Hover_6 = new lib.hover();
	this.Hover_6.name = "Hover_6";
	this.Hover_6.setTransform(407.85,247.15);

	this.Hover_3 = new lib.hover();
	this.Hover_3.name = "Hover_3";
	this.Hover_3.setTransform(407.85,216.35);

	this.Hover_4 = new lib.hover();
	this.Hover_4.name = "Hover_4";
	this.Hover_4.setTransform(407.85,21.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.Hover_4},{t:this.Hover_3},{t:this.Hover_6},{t:this.Hover_7},{t:this.Hover_9},{t:this.Hover_10},{t:this.Hover_5},{t:this.Hover_1},{t:this.Hover_13},{t:this.Hover_2},{t:this.Hover_8},{t:this.Hover_11},{t:this.Hover_12},{t:this.Pointer_8}]}).wait(1));

	// Text
	this.Text_13 = new cjs.Text("text1", "25px 'Arial Narrow'");
	this.Text_13.name = "Text_13";
	this.Text_13.lineHeight = 30;
	this.Text_13.parent = this;
	this.Text_13.setTransform(512.7,418.65);

	this.Text_2 = new cjs.Text("text1", "25px 'Arial Narrow'");
	this.Text_2.name = "Text_2";
	this.Text_2.lineHeight = 30;
	this.Text_2.parent = this;
	this.Text_2.setTransform(512.7,45.4);

	this.Text_3 = new cjs.Text("text1", "25px 'Arial Narrow'");
	this.Text_3.name = "Text_3";
	this.Text_3.lineHeight = 30;
	this.Text_3.parent = this;
	this.Text_3.setTransform(512.7,79.3);

	this.Text_4 = new cjs.Text("text1", "25px 'Arial Narrow'");
	this.Text_4.name = "Text_4";
	this.Text_4.lineHeight = 30;
	this.Text_4.parent = this;
	this.Text_4.setTransform(512.7,113.2);

	this.Text_5 = new cjs.Text("text1", "25px 'Arial Narrow'");
	this.Text_5.name = "Text_5";
	this.Text_5.lineHeight = 30;
	this.Text_5.parent = this;
	this.Text_5.setTransform(512.7,147.1);

	this.Text_6 = new cjs.Text("text1", "25px 'Arial Narrow'");
	this.Text_6.name = "Text_6";
	this.Text_6.lineHeight = 30;
	this.Text_6.parent = this;
	this.Text_6.setTransform(512.7,181);

	this.Text_7 = new cjs.Text("text1", "25px 'Arial Narrow'");
	this.Text_7.name = "Text_7";
	this.Text_7.lineHeight = 30;
	this.Text_7.parent = this;
	this.Text_7.setTransform(512.7,214.9);

	this.Text_8 = new cjs.Text("text1", "25px 'Arial Narrow'");
	this.Text_8.name = "Text_8";
	this.Text_8.lineHeight = 30;
	this.Text_8.parent = this;
	this.Text_8.setTransform(512.7,248.8);

	this.Text_9 = new cjs.Text("text1", "25px 'Arial Narrow'");
	this.Text_9.name = "Text_9";
	this.Text_9.lineHeight = 30;
	this.Text_9.parent = this;
	this.Text_9.setTransform(512.7,282.7);

	this.Text_10 = new cjs.Text("text1", "25px 'Arial Narrow'");
	this.Text_10.name = "Text_10";
	this.Text_10.lineHeight = 30;
	this.Text_10.parent = this;
	this.Text_10.setTransform(512.7,316.6);

	this.Text_11 = new cjs.Text("text1", "25px 'Arial Narrow'");
	this.Text_11.name = "Text_11";
	this.Text_11.lineHeight = 30;
	this.Text_11.parent = this;
	this.Text_11.setTransform(512.7,350.5);

	this.Text_12 = new cjs.Text("text1", "25px 'Arial Narrow'");
	this.Text_12.name = "Text_12";
	this.Text_12.lineHeight = 30;
	this.Text_12.parent = this;
	this.Text_12.setTransform(512.7,384.4);

	this.Text_1 = new cjs.Text("text1", "25px 'Arial Narrow'");
	this.Text_1.name = "Text_1";
	this.Text_1.lineHeight = 30;
	this.Text_1.parent = this;
	this.Text_1.setTransform(512.7,11.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.Text_1},{t:this.Text_12},{t:this.Text_11},{t:this.Text_10},{t:this.Text_9},{t:this.Text_8},{t:this.Text_7},{t:this.Text_6},{t:this.Text_5},{t:this.Text_4},{t:this.Text_3},{t:this.Text_2},{t:this.Text_13}]}).wait(1));

	// bg
	this.instance = new lib.pianomechanics();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(512,342,512,342);
// library properties:
lib.properties = {
	id: 'A3EB77F8F674D74987ADE9FB72E182DF',
	width: 1024,
	height: 684,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/pianomechanics.png", id:"pianomechanics"},
		{src:"sounds/Sound_1.mp3", id:"Sound_1"},
		{src:"sounds/Sound_10.mp3", id:"Sound_10"},
		{src:"sounds/Sound_12.mp3", id:"Sound_12"},
		{src:"sounds/Sound_2.mp3", id:"Sound_2"},
		{src:"sounds/Sound_3.mp3", id:"Sound_3"},
		{src:"sounds/Sound_8.mp3", id:"Sound_8"},
		{src:"sounds/Sound_13.mp3", id:"Sound_13"},
		{src:"sounds/Sound_7.mp3", id:"Sound_7"},
		{src:"sounds/Sound_4.mp3", id:"Sound_4"},
		{src:"sounds/Sound_11.mp3", id:"Sound_11"},
		{src:"sounds/Sound_9.mp3", id:"Sound_9"},
		{src:"sounds/Sound_5.mp3", id:"Sound_5"},
		{src:"sounds/Sound_6.mp3", id:"Sound_6"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['A3EB77F8F674D74987ADE9FB72E182DF'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;