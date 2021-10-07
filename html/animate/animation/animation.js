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



(lib.icons8onefinger96 = function() {
	this.initialize(img.icons8onefinger96);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,96,96);// helper functions:

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


(lib.Restart = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","rgba(0,0,0,0)"],[0,1],2,-8,0,2,-8,72.2).s().p("Am7G8Qi4i4ABkEQgBkDC4i4QC4i4EDABQEEgBC4C4QC3C4AAEDQAAEEi3C4Qi4C3kEAAQkDAAi4i3g");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FFFFFF","rgba(0,0,0,0)"],[0,1],2,-8,0,2,-8,72.2).s().p("Am7G7Qi4i3ABkEQgBkDC4i4QC4i3EDgBQEEABC4C3QC3C4AAEDQAAEEi3C3Qi4C5kEAAQkDAAi4i5g");
	this.shape_1.setTransform(0,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).wait(2));

	// Слой_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AiXgGIH7k7IAAKDgAljE4IAApSICwAAIAAJSg");
	this.shape_2.setTransform(2.95,0.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AiXgGIH7k7IAAKDgAljE4IAApRICwAAIAAJRg");
	this.shape_3.setTransform(2.95,6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2}]}).to({state:[{t:this.shape_3}]},2).wait(2));

	// Слой_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,1,1).p("AJ0AAQAAEEi4C4Qi4C4kEAAQkDAAi4i4Qi4i4AAkEQAAkDC4i4QC4i4EDAAQEEAAC4C4QC4C4AAEDg");

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.rf(["#FF91E2","#C0C5E2","#FFC78A"],[0,1,1],0,-0.5,0,0,-0.5,64.6).s().p("Am7G8Qi4i4ABkEQgBkDC4i4QC4i4EDABQEEgBC4C4QC3C4AAEDQAAEEi3C4Qi4C3kEAAQkDAAi4i3g");

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.rf(["#FF91E2","#C0C5E2","#FFC78A"],[0,1,1],0,-0.5,0,0,-0.5,64.6).s().p("Am7G7Qi4i3ABkEQgBkDC4i4QC4i3EDgBQEEABC4C3QC3C4AAEDQAAEEi3C3Qi4C5kEAAQkDAAi4i5g");
	this.shape_6.setTransform(0,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4,p:{y:0}}]}).to({state:[{t:this.shape_5},{t:this.shape_4,p:{y:0}}]},1).to({state:[{t:this.shape_6},{t:this.shape_4,p:{y:5}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63.7,-63.7,127.5,132.5);


(lib.Play = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","rgba(0,0,0,0)"],[0,1],2,-8,0,2,-8,72.2).s().p("Am7G8Qi4i4ABkEQgBkDC4i4QC4i4EDABQEEgBC4C4QC3C4AAEDQAAEEi3C4Qi4C3kEAAQkDAAi4i3g");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FFFFFF","rgba(0,0,0,0)"],[0,1],2,-8,0,2,-8,72.2).s().p("Am7G7Qi4i3ABkEQgBkDC4i4QC4i3EDgBQEEABC4C3QC3C4AAEDQAAEEi3C3Qi4C5kEAAQkDAAi4i5g");
	this.shape_1.setTransform(0,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).wait(2));

	// Слой_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AlznXILnHOIrnHhg");
	this.shape_2.setTransform(13.1,0.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(2).to({y:5.775},0).wait(2));

	// Слой_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,1,1).p("AJ0AAQAAEEi4C4Qi4C4kEAAQkDAAi4i4Qi4i4AAkEQAAkDC4i4QC4i4EDAAQEEAAC4C4QC4C4AAEDg");

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.rf(["#FF91E2","#C0C5E2","#FFC78A"],[0,1,1],0,-0.5,0,0,-0.5,64.6).s().p("Am7G8Qi4i4ABkEQgBkDC4i4QC4i4EDABQEEgBC4C4QC3C4AAEDQAAEEi3C4Qi4C3kEAAQkDAAi4i3g");

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.rf(["#FF91E2","#C0C5E2","#FFC78A"],[0,1,1],0,-0.5,0,0,-0.5,64.6).s().p("Am7G7Qi4i3ABkEQgBkDC4i4QC4i3EDgBQEEABC4C3QC3C4AAEDQAAEEi3C3Qi4C5kEAAQkDAAi4i5g");
	this.shape_5.setTransform(0,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3,p:{y:0}}]}).to({state:[{t:this.shape_4},{t:this.shape_3,p:{y:0}}]},1).to({state:[{t:this.shape_5},{t:this.shape_3,p:{y:5}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63.7,-63.7,127.5,132.5);


(lib.Pause = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","rgba(0,0,0,0)"],[0,1],2,-8,0,2,-8,72.2).s().p("Am7G8Qi4i4ABkEQgBkDC4i4QC4i4EDABQEEgBC4C4QC3C4AAEDQAAEEi3C4Qi4C3kEAAQkDAAi4i3g");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FFFFFF","rgba(0,0,0,0)"],[0,1],2,-8,0,2,-8,72.2).s().p("Am7G7Qi4i3ABkEQgBkDC4i4QC4i3EDgBQEEABC4C3QC3C4AAEDQAAEEi3C3Qi4C5kEAAQkDAAi4i5g");
	this.shape_1.setTransform(0,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).wait(2));

	// Слой_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AApEKIAAoTICcAAIAAITgAjEEKIAAoTICcAAIAAITg");
	this.shape_2.setTransform(-0.775,-0.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(2).to({y:5.475},0).wait(2));

	// Слой_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,1,1).p("AJ0AAQAAEEi4C4Qi4C4kEAAQkDAAi4i4Qi4i4AAkEQAAkDC4i4QC4i4EDAAQEEAAC4C4QC4C4AAEDg");

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.rf(["#FF91E2","#C0C5E2","#FFC78A"],[0,1,1],0,-0.5,0,0,-0.5,64.6).s().p("Am7G8Qi4i4ABkEQgBkDC4i4QC4i4EDABQEEgBC4C4QC3C4AAEDQAAEEi3C4Qi4C3kEAAQkDAAi4i3g");

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.rf(["#FF91E2","#C0C5E2","#FFC78A"],[0,1,1],0,-0.5,0,0,-0.5,64.6).s().p("Am7G7Qi4i3ABkEQgBkDC4i4QC4i3EDgBQEEABC4C3QC3C4AAEDQAAEEi3C3Qi4C5kEAAQkDAAi4i5g");
	this.shape_5.setTransform(0,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3,p:{y:0}}]}).to({state:[{t:this.shape_4},{t:this.shape_3,p:{y:0}}]},1).to({state:[{t:this.shape_5},{t:this.shape_3,p:{y:5}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63.7,-63.7,127.5,132.5);


(lib.заглушка = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(1,1,1).p("Aztg4QAVhDA2g2QBXhXB7AAQAGAAAHAAIAAAAIQ/AAIAAjcIDbAAIAAqRIIHAAIIIAAMAAAAjrIpgAAImvAAIAApBIjbAAIAAjtIw6AAQgCAAgDABQgHAAgGAAQh7AAhXhXQgigigUgmQgNACgNAAQgwAAghghQgigiAAgvQAAgwAiggQAhgiAwAAQADAAACAAQAsACAgAgQAhAgAAAwQAAAvghAiQgYAYgfAH");
	this.shape.setTransform(138.15,121.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFFFFF","#7D7D7D","#000000"],[0,0.176,1],-14,0,14.1,0).s().p("EgCMAhdMAAAhC5IEYAAMAAABC5g");
	this.shape_1.setTransform(56.35,368.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhQBRQghgigBgvQABgvAhghQAigiAuAAIAFAAQAtADAfAfQAiAhgBAvQABAvgiAiQgYAYgfAHQgNACgNABQgugBgighg");
	this.shape_2.setTransform(11.45,127.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#926737","#FF8C46"],[0,1],-70.5,0,69.3,0).s().p("AmXEpQh7AAhXhXQgighgUgnQAfgHAYgYQAhgiAAgvQAAgvghghQgggfgsgDQAVhDA2g2QBXhXB7AAIANAAIAAAAIQ/AAIAAJQIw6AAIgFABIgNAAg");
	this.shape_3.setTransform(81.275,124.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#926737","#FF8C46"],[0,1],-10.9,0,11,0).s().p("AhsINIAAjtIAApQIAAjcIDZAAIAAQZg");
	this.shape_4.setTransform(161.5,125.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#FFBD68","#FFEAAD"],[0,1],13.3,0,47.4,0).s().p("AnZRUIJeAAMAAAgjsIoHAAINchGMAAAAm9g");
	this.shape_5.setTransform(263.025,124.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#926737","#FF8C46"],[0,1],-51.9,0,52,0).s().p("AhXR2ImvAAIAApBIAAwZIAAqRIIGAAIIHAAMAAAAjrg");
	this.shape_6.setTransform(224.375,121.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.заглушка, new cjs.Rectangle(-1,0,311.5,582.9), null);


(lib._3_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Ajdm6Qgpg9AAhPQAAhsBNhOQBNhNBsAAQBtAABMBNQA4A4AQBIQAEAUABAVQABAIAAAJQAAAIgBAJQgDBAghA2IAAUNIm/AAAjdm5IAAgBAjeNOIABzmQgBgOABgU");
	this.shape.setTransform(26.25,84.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgrAtQgTgTAAgaQAAgZATgTQASgSAZAAQAaAAATASQASATAAAZQAAAagSATQgTASgaAAQgZAAgSgSg");
	this.shape_1.setTransform(27.1,25.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#926633").s().p("AjdNOIgBAAIABzmIAAghIAAAAQgog/gBhOQAAhtBOhMQBMhOBsAAQBtAABNBOQA3A3AQBIQAEAUABAVIAAARIAAARQgDBBghA0IAAUOgAgjp+QgTATAAAaQAAAaATATQASASAZAAQAaAAATgSQASgTAAgaQAAgagSgTQgTgSgaAAQgZAAgSASg");
	this.shape_2.setTransform(26.25,84.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._3_3, new cjs.Rectangle(-1,-1,54.5,171.1), null);


(lib._3_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("A2WKvMAAAgyrIHPAAMAAAAyrgAqXW+IAAMWIwqEpIAA9OIErAAAvHKvIEwAAIAAH1IajAAIAAj7IK2AAAZ2fUIpqAAIAAoWI6jAAAqXSkIAAEa");
	this.shape.setTransform(173,255.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#926737","#FF8C46"],[0,1],-119.7,0,119.7,0).s().p("AH3IVIAAoVI6jAAIAAkZIajAAIAAj7IK2AAIhMQpg");
	this.shape_1.setTransform(226.3,402.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#926737","#FF8C46"],[0,1],-53.3,0,53.3,0).s().p("AoUumIEsAAIHNAAIEwAAIAAH1IAAEaIAAMUIwpEqg");
	this.shape_2.setTransform(53.3,417.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#926737","#FF8C46"],[0,1],-23.1,0,23.2,0).s().p("AjmZWMAAAgyrIHNAAMAAAAyrg");
	this.shape_3.setTransform(53.075,162.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FBD492").s().p("Ai7JPIBGiAIBMwpIAAg6ICzAAQCNMDkBImg");
	this.shape_4.setTransform(350.2476,409.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._3_2, new cjs.Rectangle(-1,-1,370.1,513.5), null);


(lib._3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AhLq7IgMgIAElngIlwjbEAQ4gpCIMZHYIx8eLImwkBMgcCAwjIlzjWMAcFgwo");
	this.shape.setTransform(187.325,296.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFFFFF","#FFFFFF","#7D7D7D","#000000"],[0,0,0.69,1],-108.3,0,108.3,0).s().p("Aw6WpMAcEgwoIFxDcMgcCAwig");
	this.shape_1.setTransform(108.3,393);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#926737","#FF8C46"],[0,1],-98,0,98.1,0).s().p("ApXOwIlxjbIgLgIIA0g0QBbheBYhmQJAqfFnvmIMaHYIx8eJg");
	this.shape_2.setTransform(276.6,154.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AmlSjIAAAAIABAAIgBABIAAgBgAtAOhQLPq0I42QIF5D+IABADIAAABIgCADIAAADIgBAAIAAABIgaBLQloPlo/KhQhYBlhcBfIg0A0QgvAugxAsIACACQgFACgCAEIgBACIgCADg");
	this.shape_3.setTransform(214.925,118.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._3_1, new cjs.Rectangle(-1,0,376.7,560.4), null);


(lib.Струны = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(18,1,1).p("EAAAhIEMAAACQJ");
	this.shape.setTransform(37,468.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#333333").ss(13,1,1).p("EAAAhIEMAAACQJ");
	this.shape_1.setTransform(16.2,461.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#333333").ss(9,1,1).p("EAAAhIEMAAACQJ");
	this.shape_2.setTransform(0,461.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Струны, new cjs.Rectangle(-4.5,-6.5,50.5,945.3), null);


(lib.ПилотНиз = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AsI9gIAAt9ITUAAIAAN9IihLmIkrAAIkIAAIk2AAgAAAU1IbvAAIAAWpMg3dAAAIAA2pIXmAAg");
	this.shape.setTransform(177.525,278.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFD45E","#FDD49D"],[0,1],0,30.6,0,-71.5).s().p("ACeMyIkIAAIk1AAIjLrnIAAt8ITVAAIAAN8IiiLng");
	this.shape_1.setTransform(161.7,81.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#FFFFFF","#9F9F9F","#999999","#000000"],[0,0.243,0.4,1],-13.2,0,13.3,0).s().p("AiDTYMAAAgmvIEHAAMAAAAmvg");
	this.shape_2.setTransform(164.25,287.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#926737","#FF8C46"],[0,1],0,27.4,0,-72.8).s().p("A7uLVIAA2oIXmAAIEIAAIbvAAIAAWog");
	this.shape_3.setTransform(177.525,483.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ПилотНиз, new cjs.Rectangle(-1,-1,357.1,558.4), null);


(lib.ПилотВерх = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AKsg7IBrAAIAAOHI4tAAIAAuHICDAAIAAsQIU/AAIAAMQI0/AA");
	this.shape.setTransform(79.075,84.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#926737","#FF8C46"],[0,1],-2.1,-29.7,1.5,21.7).s().p("AqfGIIAAsPIU/AAIAAMPg");
	this.shape_1.setTransform(80.25,39.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#329E6F","#009E6F","#AFD180"],[0,0,1],1.1,-32.6,-1.2,41).s().p("AsWHEIAAuHICDAAIU/AAIBrAAIAAOHg");
	this.shape_2.setTransform(79.075,123.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ПилотВерх, new cjs.Rectangle(-1,-1,160.2,170.9), null);


(lib.НотаВнутр = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC33").ss(16,1,1).p("Ai7NoIAA7PQJLBclMOt");
	this.shape.setTransform(120.7789,87.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00CC33").s().p("AmEDzQihgPAAhRQAAhRChhjQChhlDjg9QDkg9ChAOQAwAEAhALQBOAXACA3IAAACQAABRihBkQihBljkA9Qi4AyiMAAQghAAgfgDg");
	this.shape_1.setTransform(55,197.2241);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.НотаВнутр, new cjs.Rectangle(0,-8,147.6,229.8), null);


(lib.Молоточек = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("EgBZiruIeeAAQAbAAAbAAQIHAAGWBOQCRAcCCAmQHyCRAADMQAADMnyCRQhtAgh4AZQmnBXokAAQgbAAgbAAMgs/AAAIr6AAIAAD7MgmsAAAIAA1BMAmsAAAIAABsIAAPaEgBZiruQFZiCHGhzQWZlsIDiTQICiUIfGoQIeGoAAIgQAAIgp9F5Qp9F4nDjHQnCjG7bh1QwZhHkojWEgb0iruIabAAEgveiYZMAAAFQiIqXAAMAAAlQi");
	this.shape.setTransform(425.725,1178.5216);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#926737","#FF8C46"],[0,1],-33.1,-0.1,33.2,-0.1).s().p("EgFLCoRMAAAlQiIKXAAMAAAFQig");
	this.shape_1.setTransform(88.675,1280.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#926737","#FF8C46"],[0,1],-123.8,0,123.8,0).s().p("AzVKgIAA0/MAmrAAAIAABsIAAPZIAAD6g");
	this.shape_2.setTransform(123.8,135.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#926737","#FF8C46"],[0,1],-316.1,0,269.6,0).s().p("AOxHtMgs/AAAIr6AAIAAvZIacAAIedAAIA2AAQIHAAGWBOQCRAcCDAmQHxCRAADLQAADMnxCRQhuAgh4AZQmmBXolAAIg2AAg");
	this.shape_3.setTransform(517.3,128.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF3333").s().p("AnDGxQB4gZBtggQHxiRAAjMQAAjLnxiQQiCgmiRgdIARgSQCoinDuAAQDsAACoCnQCoCoAADtQAADuioCoQioCnjsAAQjaABifiNg");
	this.shape_4.setTransform(759.525,126);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFCC").s().p("AORSEQnCjG7ah2QwbhGknjWMAs/AAAIA2AAQIkAAGnhYQCfCNDaAAQDtAACoioQCoioAAjuQAAjsioioQioiojtAAQjuAAioCoIgRASQmXhPoGAAIg2ABI+eAAQFaiDHGhzQWYlrICiUQIDiTIfGoQIeGoAAIfQAAIgp9F4QmhD3lRAAQiyAAichFg");
	this.shape_5.setTransform(587.65,122.4508);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Молоточек, new cjs.Rectangle(-1,-1,853.5,2359.1), null);


(lib.Клавиша = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AFJ8lIvRAAMAAAA5LIURAAIAAu8");
	this.shape.setTransform(64.925,183);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Клавиша, new cjs.Rectangle(-1,-1,131.9,368), null);


(lib.Анимация1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.icons8onefinger96();
	this.instance.setTransform(-114.15,-149.75,2.3781,3.1198);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-114.1,-149.7,228.3,299.5);


(lib.Нота = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.НотаВнутр();
	this.instance.setTransform(73.8,106.9,1,1,0,0,0,73.8,106.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.0745,skewX:29.9992,skewY:51.4693,x:365.95,y:-360.25},29,cjs.Ease.sineIn).to({regX:73.7,regY:106.8,scaleX:1.1322,skewX:-13.4985,skewY:-40.4929,x:-282.35,y:-894.2},31,cjs.Ease.sineIn).to({regX:73.8,scaleX:1.0214,skewX:29.9992,skewY:41.7603,x:318.85,y:-1359.85},29,cjs.Ease.sineIn).to({regX:73.9,scaleX:1.1414,skewX:-14.9992,skewY:-43.8203,x:-61.45,y:-1838.8},30,cjs.Ease.sineIn).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-372.6,-2007.9,845.4000000000001,2229.7000000000003);


// stage content:
(lib.animation = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,2,222,401,570,773,883,991];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		this.PlayBtn.addEventListener("click", ()=>this.play());
		this.PauseBtn.addEventListener("click", ()=>this.stop());
		this.RestartBtn.addEventListener("click", ()=>this.gotoAndStop(0));
		this.stop();
	}
	this.frame_2 = function() {
		playSound("_1");
	}
	this.frame_222 = function() {
		playSound("_2");
	}
	this.frame_401 = function() {
		playSound("_3");
	}
	this.frame_570 = function() {
		playSound("_4");
	}
	this.frame_773 = function() {
		playSound("_5");
	}
	this.frame_883 = function() {
		playSound("_6");
	}
	this.frame_991 = function() {
		playSound("_7");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2).call(this.frame_2).wait(220).call(this.frame_222).wait(179).call(this.frame_401).wait(169).call(this.frame_570).wait(203).call(this.frame_773).wait(110).call(this.frame_883).wait(108).call(this.frame_991).wait(146));

	// BUTTONS
	this.RestartBtn = new lib.Restart();
	this.RestartBtn.name = "RestartBtn";
	this.RestartBtn.setTransform(1210.3,645.8);
	new cjs.ButtonHelper(this.RestartBtn, 0, 1, 2, false, new lib.Restart(), 3);

	this.PauseBtn = new lib.Pause();
	this.PauseBtn.name = "PauseBtn";
	this.PauseBtn.setTransform(1080.45,645.55);
	new cjs.ButtonHelper(this.PauseBtn, 0, 1, 2, false, new lib.Pause(), 3);

	this.PlayBtn = new lib.Play();
	this.PlayBtn.name = "PlayBtn";
	this.PlayBtn.setTransform(1012.95,708.45,1,1,0,0,0,62.8,62.8);
	new cjs.ButtonHelper(this.PlayBtn, 0, 1, 2, false, new lib.Play(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.PlayBtn},{t:this.PauseBtn},{t:this.RestartBtn}]}).wait(1137));

	// Слой_2
	this.instance = new lib.Нота("synched",0);
	this.instance.setTransform(1125.15,-102.05,1,1,0,0,0,30.5,-897.8);

	this.instance_1 = new lib.Нота("synched",0);
	this.instance_1.setTransform(155.6,-123.55,1,1,0,0,0,30.5,-897.8);

	this.instance_2 = new lib.Нота("synched",27);
	this.instance_2.setTransform(155.6,-123.55,1,1,0,0,0,30.5,-897.8);

	this.instance_3 = new lib.Нота("synched",53);
	this.instance_3.setTransform(1125.15,-102.05,1,1,0,0,0,30.5,-897.8);

	this.instance_4 = new lib.Нота("synched",53);
	this.instance_4.setTransform(155.6,-123.55,1,1,0,0,0,30.5,-897.8);

	this.instance_5 = new lib.Нота("synched",76);
	this.instance_5.setTransform(155.6,-123.55,1,1,0,0,0,30.5,-897.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1,p:{x:155.6,y:-123.55,startPosition:0}},{t:this.instance,p:{x:1125.15,y:-102.05}}]},991).to({state:[{t:this.instance_2,p:{x:155.6,y:-123.55,startPosition:27}},{t:this.instance_1,p:{x:1125.15,y:-102.05,startPosition:27}},{t:this.instance,p:{x:612.8,y:-168}}]},27).to({state:[{t:this.instance_4,p:{x:155.6,y:-123.55,startPosition:53}},{t:this.instance_3,p:{x:1125.15,y:-102.05,startPosition:53}},{t:this.instance_2,p:{x:612.8,y:-168,startPosition:26}},{t:this.instance_1,p:{x:180.15,y:-141.95,startPosition:0}},{t:this.instance,p:{x:991.7,y:-141.95}}]},26).to({state:[{t:this.instance_5},{t:this.instance_4,p:{x:1125.15,y:-102.05,startPosition:76}},{t:this.instance_3,p:{x:612.8,y:-168,startPosition:49}},{t:this.instance_2,p:{x:180.15,y:-141.95,startPosition:23}},{t:this.instance_1,p:{x:991.7,y:-141.95,startPosition:23}},{t:this.instance,p:{x:638.85,y:-102.05}}]},23).wait(70));

	// Слой_17
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(9,1,1).p("EAZOhUMMAv5ApvIHEGFIQTOAIHEGEIAdAZEBpUgIwQgWgNgTgWIlOkcInFmAIwYt6InEmAMg0fgrJEAMOhNtMA0dAo8IHGF7IQhNwIHGF7IA2AtEAJJhJwMAy3AoIIG4GAIQAOCIG3F+IGHFXEgS2hMWMBCeAzDIGuF8IP1N+IGqF4EgBShGsMA0sAq2IGrGBIPoOKIGmF/IFxFNEAE7hHgMAzjAoQIG2F/IP+N/IG0F9IBGA9EgfThNrMBKWA3dIGmF9IPkOFIGhF4IHAGWEglThMEMBMsA4UIGrF3IPyN5IGkFxEhCvhEPMBUYA/JIGZFtIPfN0IGSFlIGeFyEg5nhPuMBXdBCaIGQF/IO7OUIGIF4EhBPhQrMBazBGQIGeFxIPjN3IGXFsIG0GDEgwfhONMBS+A9xIGdF6IPYOGIGWF1IGzGPEhClgYgMAzIApsIF6FjIOvN4IFtFWIGMF1Eg7XgLQMAntAfRIF5FgIOwN0IFqFUICJB/EhKGAIvIeibZIFlFWIOYNwQjFnBEZGKQBkCLCeDzICKCDEhGTAHMIdva7IFlFaIOQN2IFVFLIApAoIEQEIIDTDNEhRDAOTIabdQIFRFbINrOEIE+FIIHMHZEhMdALJIb0cZIFGFnINLOeIE1FTIA5BAEhCFAA4MAi3Aa7IFvFdIOiNyIFgFOIAZAXID4DqIDFC9EhFcADRMAinAa+IFyFWIOuNpIFiFJIC1CoEg+vgIkMAnDAfSIFsFnIOTOBIFcFYIABAAIEIEEIDUDQEhBhgEQMAmvAdEIFsFhIOYN/IFeFTIByBwEhGphBgMBUhA+9IGfFlIPxNlIGXFfEg+7hIEMBUDBAoIGWFyIPUN+IGOFrEhFZg8QMBPAA8kIGNFuIPJN6IGEFmIGGFnEhFhgkqMA+8Av4IF8FqIOqOBIFxFfIAZAYIDLDAIDFC+EhHcg4QMBMxA7cIGCFxIOwOIIF4FnEhD9gwfMBFFA2gIGAFvIOtOGIF0FlIAvAtIBIBGIFfFQEhHBgs0MBD3A1vIGAFqIO4N7IF3FeIB+B2EhC3gcmMA4PAqiIGHFgIPKNpIF6FVIBqBfEhb2ASrIfVc3IFgFKIOaNiIFNE4IC5CuEhpTAb9Idcd6IFJFLINxNwIE0E2ICmClEhhPAZAIcyb4IFnE+IO3NKIFTEsIDfDF");
	this.shape.setTransform(367.225,417.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#666666").s().p("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");
	this.shape_1.setTransform(560.6473,651.1909);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CC0000").s().p("EhzWA+5MAthgepIHbk/IH8lWIF5j/IF+kAIFFjbIDBiBIFvj4IDnibIEci/IDFiFIEDiuIEMi1IE1jQIEEiuIDZiTIEUi6IENi0IERi4IESi4IDwijIDfiXIEdi+IERi5IEqjJIE6jUIDqieIEljEIDyijIFEjbIDiiXIErjKIHGF8InGl8IEQi4IHFGBInFmBIEMizIHDGEInDmEIEBiuIEYH6IhWA4IkKCwIkPCzIk5DOIm4mAIG4GAIjkCXIm2mAIG2GAIlQDcImqmBIGqGBIjuCdImul7IGuF7IktDHImml+IGmF+IjlCXImrl3IGrF3IlIDYImdl7IGdF7Ik2DNImRl/IGRF/IkECrImelxIGeFxIkkC/ImXlyIGXFyIjcCSImaltIGaFtIjrCbImfllIGfFlIkkDAImNltIGNFtIkcC8ImClxIGCFxIkPCyImAlvIGAFvIkSC1ImClqIGCFqIjgCTIl7lqIF7FqIj4CkImHlgIGHFgIlBDUIl7lkIF7FkIkOCxIl5lgIF5FgIkPCzIltllIFtFlIjGCBIlslhIFsFhIkZC6IlvlcIFvFcIjkCVIlylWIFyFWIl9D8IlklaIFkFaIi/B9IlmlWIFmFWIlkDrIlHlmIFHFmIl0D1IlRlbIFRFbIlqDuIlglKIFgFKIn2FKIlmk+IFmE+In3FMIlKlLIFKFLMgyrAhXgEhMIBDfIZOwTII+lzIHYkyIE6jLIFVjcIGxkZQjFnBEZGLIBkhBIGZkIIDZiMIEOivIDBh9IEtjCIENiuIFdjiIDYiMIDtiZIEGiqIETiwIE1jIIFMjWIDZiMIDRiHIEyjHIDdiOIFSjaIFjjlIDXiMIE9jNIDiiSIFmjnIDmiVIFajfIEGiqIEFioIIflfIEYH5IlyDqInFmEIHFGEIkGClInEmBIHEGBIkFCkInFl7IHFF7IlpDjIm2l/IG2F/IjpCSImzl8IGzF8IlzDpImml+IGmF+IjdCMImrl4IGrF4QgVACgTAIQgqAQgXApIjeCLImhl5IGhF5IjUCFImklyIGkFyIlwDoImXl1IGXF1IlhDdImIl4IGIF4IjNCCImYlsIGYFsIiTBcQgtgIgoAQQgtATgZAtQgJARgGARImNlrIGNFrIjMCCImSlmIGSFmIh9BOQgPACgNAGQglAOgXAhImWlfIGWFfIldDcImFllIGFFlIlDDKIl3lnIF3FnIkVCvIl1lmIF1FmIgsAbQgXACgTAIQgrASgYApIhrBDIl3lfIF3FfIjzCZIlxlfIFxFfIjPCCIl6lVIF6FVIlqDkIltlXIFtFXIkRCrIlplUIFpFUIk5DFIldlXIFdFXIgCABIgBABQgJACgIAEQggAMgVAaIh3BMIlelUIFeFUIkNCoIlflNIFfFNIjWCIIlilJIFiFJImnEKIlUlLIFUFLIi3BzQiejzhjiKQBjCKCeDzInSEmIk0lUIE0FUIlKDPIk/lHIE/FHIktC8IlMk4IFME4InREmIlTksIFTEsIpdF8Ik0k1IE0E1IyOLegEBtlgp6gEBI7g1OgEBGug+YgEBK+hBQgEBPKhEDg");
	this.shape_2.setTransform(328.55,581.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},947).wait(190));

	// Слой_18
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,1,1).p("EA/shqFIpJGsMAlZAvrIRhWWIiqOdMjH9CBAISOMaEDV7BWBIhrtrMg4lhVjMgMYg42MAGPg0nITuj0EA/shqFMBV2gQlEBb8gzuIkfOAMjLMCIaIWlPZEDSEBgOIzyjWMg/Ug3cIzJAAMhigA7HMhURAd8EDSEBgOMhDkhSsIw5l/MjIjB28EjV6BsEMEW1ix1IPrQ5MkEVCv+gEDSEBgOID3qNMiWPjAG");
	this.shape_3.setTransform(301.15,369.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CC8857").s().p("EiTPBRaMEW0ix1IPrQ6MkEVCv9g");
	this.shape_4.setTransform(-125.5,540.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("EhwlBDhMDLMiIaIEeuAIRhWWIiqOdMjH8CA/g");
	this.shape_5.setTransform(280.975,569.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#999999").s().p("EiZiBn4MDH8iA/ICqudIxh2WMglXgvrIJHmsMCWQDAFIj4KOMhDjhStIw6l9MjIiB26g");
	this.shape_6.setTransform(687.575,434.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CCCCCC").s().p("EA4HAFqIQ6F+MBDjBSsIzxjWMg/Ug3cIzJAAMhigA7HMhURAd8gEgFzhr+MBV1gQmMgGOA0nMAMXA42MA4lBVjIBsNrg");
	this.shape_7.setTransform(745.875,381.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},947).wait(190));

	// Слой_14
	this.instance_6 = new lib.Молоточек();
	this.instance_6.setTransform(380.55,863.3,0.7704,0.7704,-12.4887,0,0,107,1380);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(577).to({_off:false},0).wait(13).to({regX:107.2,rotation:-1.5436,x:380.65,y:863.35},20).to({regX:107,rotation:-12.4887,x:380.55,y:863.3},10).wait(46).to({regX:107.2,rotation:-1.5436,x:380.65,y:863.35},20).to({regX:107,rotation:-12.4887,x:380.55,y:863.3},10).wait(70).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},14).wait(5).to({regY:1380.2,rotation:-27.3984,y:1243.05},4).to({regX:107,rotation:-9.4543,x:594.65,y:1243},8).to({regX:107.1,rotation:-10.9373,x:594.7,y:1243.05},2).to({regX:107,rotation:-9.4543,x:594.65,y:1243},2).wait(6).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},4).wait(1).to({regY:1380.2,rotation:-27.3984,y:1243.05},4).to({regX:107,rotation:-9.4543,x:594.65,y:1243},8).to({regX:107.1,rotation:-10.9373,x:594.7,y:1243.05},2).to({regX:107,rotation:-9.4543,x:594.65,y:1243},2).wait(6).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},4).wait(1).to({regY:1380.2,rotation:-27.3984,y:1243.05},4).to({regX:107,rotation:-9.4543,x:594.65,y:1243},8).to({regX:107.1,rotation:-10.9373,x:594.7,y:1243.05},2).to({regX:107,rotation:-9.4543,x:594.65,y:1243},2).wait(6).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},4).wait(1).to({regY:1380.2,rotation:-27.3984,y:1243.05},4).to({regX:107,rotation:-9.4543,x:594.65,y:1243},8).to({regX:107.1,rotation:-10.9373,x:594.7,y:1243.05},2).to({regX:107,rotation:-9.4543,x:594.65,y:1243},2).wait(6).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},4).wait(1).to({regY:1380.2,rotation:-27.3984,y:1243.05},4).to({regX:107,rotation:-9.4543,x:594.65,y:1243},8).to({regX:107.1,rotation:-10.9373,x:594.7,y:1243.05},2).to({regX:107,rotation:-9.4543,x:594.65,y:1243},2).wait(6).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},4).wait(1).to({regY:1380.2,rotation:-27.3984,y:1243.05},4).to({regX:107,rotation:-9.4543,x:594.65,y:1243},8).to({regX:107.1,rotation:-10.9373,x:594.7,y:1243.05},2).to({regX:107,rotation:-9.4543,x:594.65,y:1243},2).wait(6).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},4).to({_off:true},1).wait(190));

	// Слой_12
	this.instance_7 = new lib.заглушка();
	this.instance_7.setTransform(473.8,845.1,1,1,0,0,0,46.2,580.5);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(577).to({_off:false},0).wait(13).to({regX:48,regY:582.5,rotation:-19.1958,x:475.6,y:847.05},20).wait(10).to({regX:46.2,regY:580.5,rotation:0,x:473.8,y:845.1},16).wait(30).to({regX:48,regY:582.5,rotation:-19.1958,x:475.6,y:847.05},20).wait(10).to({regX:46.2,regY:580.5,rotation:0,x:473.8,y:845.1},16).wait(54).to({regX:48,regY:582.5,rotation:-19.1958,x:475.6,y:847.05},0).to({regX:46.2,regY:580.5,rotation:0,x:749.3,y:1139.65},14).wait(13).to({rotation:-11.4396},3).wait(11).to({rotation:0},4).wait(9).to({rotation:-11.4396},3).wait(11).to({rotation:0},4).wait(9).to({rotation:-11.4396},3).wait(11).to({rotation:0},4).wait(9).to({rotation:-11.4396},3).wait(11).to({rotation:0},4).wait(9).to({rotation:-11.4396},3).wait(11).to({rotation:0},4).wait(9).to({rotation:-11.4396},3).wait(11).to({rotation:0},4).to({_off:true},1).wait(190));

	// Слой_13
	this.instance_8 = new lib.Струны();
	this.instance_8.setTransform(723.8,428.45,1,1,0,0,0,20.8,466.2);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(577).to({_off:false},0).wait(189).to({x:997.35},14).wait(140).to({_off:true},27).wait(190));

	// Слой_6
	this.instance_9 = new lib._3_1();
	this.instance_9.setTransform(644.75,872.35,1,1,-2.4916,0,0,12.5,555.4);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(408).to({_off:false},0).to({regX:12.7,rotation:-13.7561,x:644.9,y:872.45},14).to({regY:555.5,scaleX:0.9999,scaleY:0.9999,rotation:-16.4599,x:644.95,y:872.5},10).wait(11).to({regY:555.4,scaleX:1,scaleY:1,rotation:-13.7561,x:644.9,y:872.45},8).to({regX:12.5,rotation:-2.4916,x:644.75,y:872.35},6).wait(26).to({regX:12.7,rotation:-13.7561,x:644.9,y:872.45},13).to({regY:555.5,scaleX:0.9999,scaleY:0.9999,rotation:-16.4599,x:644.95,y:872.5},10).wait(11).to({regY:555.4,scaleX:1,scaleY:1,rotation:-13.7561,x:644.9,y:872.45},8).to({regX:12.5,rotation:-2.4916,x:644.75,y:872.35},6).to({_off:true},46).wait(560));

	// Слой_9
	this.instance_10 = new lib._3_3();
	this.instance_10.setTransform(248.2,564.05,1.3018,2.3772,0,0,0,26.4,84.7);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(408).to({_off:false},0).wait(123).to({_off:true},46).wait(560));

	// Слой_7
	this.instance_11 = new lib._3_2();
	this.instance_11.setTransform(249.6,416.35,1.5433,1.5433,3.0788,0,0,54.1,455.5);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(408).to({_off:false},0).wait(14).to({rotation:-9.3867},10).wait(11).to({rotation:-9.3867},0).to({rotation:3.0788},8).to({rotation:3.0788},6).wait(39).to({rotation:-9.3867},10).wait(11).to({rotation:-9.3867},0).to({rotation:3.0788},8).to({rotation:3.0788},6).to({_off:true},46).wait(560));

	// Слой_10
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#666666").ss(18,1,1).p("AxNxzUgKEAo3AuSgGB");
	this.shape_8.setTransform(673.0529,455.967);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#666666").ss(18,1,1).p("Aw0xwUgKSApJAt0gGh");
	this.shape_9.setTransform(670.5715,455.6742);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#666666").ss(18,1,1).p("AwbxuUgKgApdAtWgHC");
	this.shape_10.setTransform(668.0918,455.4057);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#666666").ss(18,1,1).p("AwCxrUgKuApvAs4gHi");
	this.shape_11.setTransform(665.5964,455.133);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#666666").ss(18,1,1).p("AvqxoUgK7AqBAsZgIC");
	this.shape_12.setTransform(663.1008,454.8973);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#666666").ss(18,1,1).p("AvQxmUgLJAqUAr7gIi");
	this.shape_13.setTransform(660.5891,454.6794);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#666666").ss(18,1,1).p("Au3xkUgLXAqnArdgJD");
	this.shape_14.setTransform(658.0772,454.4857);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#666666").ss(18,1,1).p("AuexjUgLkAq6Aq+gJj");
	this.shape_15.setTransform(655.5486,454.3012);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#666666").ss(18,1,1).p("AuExhUgLzArMAqggKD");
	this.shape_16.setTransform(652.9852,454.1159);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#666666").ss(18,1,1).p("AtrxfUgMAArfAqCgKk");
	this.shape_17.setTransform(650.4478,453.9699);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#666666").ss(18,1,1).p("AtRxeUgMOAryApjgLE");
	this.shape_18.setTransform(647.893,453.8304);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#666666").ss(18,1,1).p("As4xdUgMbAsEApFgLj");
	this.shape_19.setTransform(645.3381,453.7045);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#666666").ss(18,1,1).p("AsexbUgMqAsWAongME");
	this.shape_20.setTransform(642.7652,453.5762);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#666666").ss(18,1,1).p("AsExaUgM3AspAoIgMk");
	this.shape_21.setTransform(640.1923,453.4846);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#666666").ss(18,1,1).p("ArrxZUgNEAs8AnqgNF");
	this.shape_22.setTransform(637.6049,453.3972);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#666666").ss(18,1,1).p("Ar1xyUgMbAtcAnGgMm");
	this.shape_23.setTransform(638.1416,449.5849);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#666666").ss(18,1,1).p("AsAyLUgLwAt8AmggMH");
	this.shape_24.setTransform(638.6517,445.8077);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#666666").ss(18,1,1).p("AsKyjUgLGAuaAl7gLo");
	this.shape_25.setTransform(639.1591,442.074);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#666666").ss(18,1,1).p("AsTy8UgKdAu6AlXgLJ");
	this.shape_26.setTransform(639.6478,438.348);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#666666").ss(18,1,1).p("AsdzWUgJzAvaAkygKq");
	this.shape_27.setTransform(640.1166,434.64);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#666666").ss(18,1,1).p("AsnzwUgJIAv6AkNgKM");
	this.shape_28.setTransform(640.5478,430.9581);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#666666").ss(18,1,1).p("Asw0KUgIeAwaAjngJt");
	this.shape_29.setTransform(640.971,427.309);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#666666").ss(18,1,1).p("As50kUgH0Aw5AjCgJO");
	this.shape_30.setTransform(641.3688,423.7044);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#666666").ss(18,1,1).p("AtC0+UgHKAxYAiegIv");
	this.shape_31.setTransform(641.7216,420.1064);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#666666").ss(18,1,1).p("AtL1ZUgGfAx4Ah4gIQ");
	this.shape_32.setTransform(642.0626,416.5284);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#666666").ss(18,1,1).p("AtA03UgHUAxQAingI3");
	this.shape_33.setTransform(641.6441,420.9955);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#666666").ss(18,1,1).p("As10XUgIJAwpAjVgJd");
	this.shape_34.setTransform(641.1732,425.5035);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#666666").ss(18,1,1).p("Aspz2UgI+AwBAkDgKE");
	this.shape_35.setTransform(640.6679,430.0517);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#666666").ss(18,1,1).p("AsRy2UgKnAuyAlggLR");
	this.shape_36.setTransform(639.5242,439.2687);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#666666").ss(18,1,1).p("AsFyXUgLbAuLAmOgL3");
	this.shape_37.setTransform(638.9076,443.9376);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#666666").ss(18,1,1).p("Ar4x4UgMQAtkAm8gMe");
	this.shape_38.setTransform(638.2717,448.6469);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#666666").ss(18,1,1).p("AsnxcUgMlAsRAoygL5");
	this.shape_39.setTransform(643.6385,453.6307);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#666666").ss(18,1,1).p("AtjxfUgMEArlAp3gKu");
	this.shape_40.setTransform(649.6089,453.9192);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#666666").ss(18,1,1).p("AvZxnUgLEAqOAsFgIY");
	this.shape_41.setTransform(661.4159,454.7524);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#666666").ss(18,1,1).p("AwTxsUgKkApiAtLgHM");
	this.shape_42.setTransform(667.2462,455.2984);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#666666").ss(18,1,1).p("AwyxwUgKTApLAtxgGk");
	this.shape_43.setTransform(670.3757,455.6547);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#666666").ss(18,1,1).p("AwXxtUgKiApfAtRgHG");
	this.shape_44.setTransform(667.6988,455.3455);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#666666").ss(18,1,1).p("Av9xqUgKwApzAswgHp");
	this.shape_45.setTransform(665.0051,455.0776);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#666666").ss(18,1,1).p("AvixoUgK/AqIAsQgIM");
	this.shape_46.setTransform(662.3278,454.8379);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#666666").ss(18,1,1).p("AvHxlUgLOAqbArvgIv");
	this.shape_47.setTransform(659.6231,454.595);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#666666").ss(18,1,1).p("AusxjUgLdAqvArPgJR");
	this.shape_48.setTransform(656.9005,454.3889);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#666666").ss(18,1,1).p("AuQxiUgLsArEAqugJ0");
	this.shape_49.setTransform(654.1681,454.2013);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#666666").ss(18,1,1).p("At1xgUgL7ArYAqOgKX");
	this.shape_50.setTransform(651.4255,454.0313);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#666666").ss(18,1,1).p("AtZxeUgMKArrAptgK5");
	this.shape_51.setTransform(648.6814,453.862);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#666666").ss(18,1,1).p("As+xdUgMYAsAApMgLc");
	this.shape_52.setTransform(645.9447,453.7332);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#666666").ss(18,1,1).p("AsixcUgMoAsUAosgL/");
	this.shape_53.setTransform(643.1711,453.6116);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#666666").ss(18,1,1).p("AsGxaUgM2AsoAoLgMi");
	this.shape_54.setTransform(640.3959,453.4893);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8}]},408).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},11).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_8}]},26).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},11).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_8}]},1).to({state:[]},46).wait(560));

	// Слой_5
	this.instance_12 = new lib.ПилотВерх();
	this.instance_12.setTransform(632.05,98.55,1.2058,1.2058,0,0,0,79,84.4);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(229).to({_off:false},0).wait(8).to({y:-27},30).to({y:98.55},29).wait(9).to({y:-27},26).wait(2).to({y:98.55},29).to({_off:true},46).wait(729));

	// Слой_4
	this.instance_13 = new lib.ПилотНиз();
	this.instance_13.setTransform(650.35,547.3,1.2058,1.2058,0,0,0,177.5,278.2);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(229).to({_off:false},0).to({y:535.85},8).to({y:410.3},30).to({y:547.3},29).to({y:535.85},9).to({y:410.3},26).wait(2).to({y:547.3},29).to({_off:true},46).wait(729));

	// Слой_3
	this.instance_14 = new lib.Анимация1("synched",0);
	this.instance_14.setTransform(559.2,681.2,1.4564,1.4564);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(82).to({startPosition:0},0).to({scaleX:1.1756,scaleY:1.1756,x:559.25},10).to({regX:0.1,regY:0.1,scaleX:0.9008,scaleY:0.9008,x:559.4,y:656.85},32).wait(39).to({regX:0,regY:0,scaleX:1.4564,scaleY:1.4564,x:559.2,y:681.2},0).to({scaleX:1.1756,scaleY:1.1756,x:559.25},10).to({regX:0.1,regY:0.1,scaleX:0.9008,scaleY:0.9008,x:559.4,y:656.85},32).to({_off:true},23).wait(909));

	// Слой_1
	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#000000").ss(1,1,1).p("EBAmgcnIQkAAMAAAA5LI0TAAEAtmgcnII/AAAZT8nIKSAAEAolANnIAAO9I0SAAI0TAAAUTNnIAAO9EA83ANnIAAO9I0SAAEgjjgcnIPRAAAlA8nIKBAAIKRAAEg83AckI0SAAMAAAg5LIOpAAIKBAAIK6AAEg83ANnIAAO9AAANnIAAAtIAAOPA0SckI0SAAI0TAAEgokANnIAAO9A0O8jMAAAA5L");
	this.shape_55.setTransform(595.6,415.225);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.lf(["#282828","#000000"],[0,1],-32,0,32.1,0).s().p("AAAVIIAAAAIlAAAMAAAgqPIKBAAMAAAAqPg");
	this.shape_56.setTransform(595.625,367.175);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.lf(["#282828","#000000"],[0,1],-32,0,32.1,0).s().p("ABSVIImSAAMAAAgqPIKBAAMAAAAqPg");
	this.shape_57.setTransform(976.975,367.175);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.lf(["#282828","#000000"],[0,1],-32,0,32.1,0).s().p("AAAVIIlAAAMAAAgqPIKBAAMAAAAqPg");
	this.shape_58.setTransform(855.325,367.175);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.lf(["#282828","#000000"],[0,1],-32,0,32.1,0).s().p("AAAVIIlAAAMAAAgqPIKBAAMAAAAqPg");
	this.shape_59.setTransform(725.475,367.175);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.lf(["#282828","#000000"],[0,1],-32,0,32.1,0).s().p("AAAVIIlAAAMAAAgqPIKBAAMAAAAqPg");
	this.shape_60.setTransform(335.925,367.175);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.lf(["#282828","#000000"],[0,1],-32,0,32.1,0).s().p("AApVIIlpAAMAAAgqPIKBAAMAAAAqPg");
	this.shape_61.setTransform(201.975,367.175);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("EA83AcmIAAu8IDwAAMAAAgqPIQjAAMAAAA5LgEAolAcmIAAu8IFBAAMAAAgqPII/AAMAAAAqPIGSAAIAAO8gAUTcmIAAu8IAAO8I0TAAIAAgBIAAuOIAAgtIFBAAMAAAgqPIKRAAMAAAAqPIFBAAIFAAAMAAAgqPIKRAAMAAAAqPIFBAAIAAO8gEgokAcmIAAu8IFBAAMAAAgqPIPRAAMAAAA5LgEg83AcmIAAu8IEZAAMAAAgqPIK5AAMAAAAqPIFBAAIAAO8gEhRJAcmMAAAg5LIOpAAMAAAAqPIFpAAIAAO8gEAolANqgEg83ANqg");
	this.shape_62.setTransform(595.6,415);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#000000").ss(1,1,1).p("EBAmgcnIQkAAMAAAA5LI0TAAEAtmgcnII/AAAZT8nIKSAAEAolAckI0SAAI0TAAAUTNnIAAO9EAolANnIAAO9EA83ANnIAAO9I0SAAEgjjgcnIPRAAAAA8nIFBAAIKRAAAlA8nIFAAAMAAAAqOIAAAtIAAOPEg83AckI0SAAMAAAg5LIOpAAIKBAAIK6AAEg83ANnIAAO9A0SckI0SAAEgokANnIAAO9I0TAAA0O8jMAAAA5L");
	this.shape_63.setTransform(595.6,415.225);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("EA91AVIImTAAMAAAgqPIKCAAMAAAAqPgEApiAVIIlAAAMAAAgqPIKBAAMAAAAqPgAVQVIIlBAAMAAAgqPIKCAAMAAAAqPgAA9VIIgBAAMAAAgqPMAAAAqPIk+AAMAAAgqPIE+AAIFCAAMAAAAqPgEgnnAVIIlAAAMAAAgqPIKBAAMAAAAqPgEg75AVIIlqAAMAAAgqPIKCAAMAAAAqPg");
	this.shape_64.setTransform(589.475,367.175);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("EA83AcmIAAu8IDwAAMAAAgqPIQjAAMAAAA5LgEAolAcmIAAu8IAAO8I0SAAIAAu8IAAO8I0TAAIAAgBIAAuOIAAgtIFBAAMAAAgqPIKRAAMAAAAqPIFBAAIFAAAMAAAgqPIKRAAMAAAAqPIFBAAIFBAAMAAAgqPII/AAMAAAAqPIGSAAIAAO8gEgokAcmIAAu8IFBAAMAAAgqPIPRAAMAAAA5LgEg83AcmIAAu8IAAO8I0SAAMAAAg5LIOpAAMAAAAqPIFpAAIEZAAMAAAgqPIK5AAMAAAAqPIFBAAIAAO8gEA83ANqgEgokANqg");
	this.shape_65.setTransform(595.6,415);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#000000").ss(1,1,1).p("EBAmgcnIQkAAMAAAA5LI0TAAEAtmgcnII/AAAZT8nIKSAAEAolANnIAAO9I0SAAI0TAAAUTNnIAAO9EA83ANnIAAO9I0SAAEgjjgcnIPRAAAAA8nIFBAAIKRAAAlA8nIFAAAMAAAAqOIAAAtIAAOPEg83AckI0SAAMAAAg5LIOpAAIKBAAIK6AAEg83ANnIAAO9A0SckI0SAAI0TAAEgokANnIAAO9A0O8jMAAAA5L");
	this.shape_66.setTransform(595.6,415.225);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("EA83AcmIAAu8IDwAAMAAAgqPIQjAAMAAAA5LgEAolAcmIAAu8IAAO8I0SAAIAAu8IFAAAMAAAgqPIKRAAMAAAAqPIFBAAIFBAAMAAAgqPII/AAMAAAAqPIGSAAIAAO8gAAAcmIAAgBIAAuOIAAgtIFBAAMAAAgqPIKRAAMAAAAqPIFBAAIAAO8gEgokAcmIAAu8IFBAAMAAAgqPIPRAAMAAAA5LgEg83AcmIAAu8IAAO8I0SAAMAAAg5LIOpAAMAAAAqPIFpAAIEZAAMAAAgqPIK5AAMAAAAqPIFBAAIAAO8gEA83ANqgAUTNqgEgokANqg");
	this.shape_67.setTransform(595.6,415);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55}]}).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63}]},82).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63}]},10).to({state:[{t:this.shape_67},{t:this.shape_64},{t:this.shape_66}]},71).to({state:[{t:this.shape_67},{t:this.shape_64},{t:this.shape_66}]},10).to({state:[]},55).wait(909));

	// Piano
	this.instance_15 = new lib.Клавиша();
	this.instance_15.setTransform(530.6,232.2,1,1,0,0,0,64.9,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(92).to({regY:0.1,scaleY:0.9348,y:232.3},32).wait(39).to({regY:0,scaleY:1,y:232.2},0).wait(10).to({regY:0.1,scaleY:0.9348,y:232.3},32).to({_off:true},23).wait(909));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-428.9,-862.1,2100.2,2861);
// library properties:
lib.properties = {
	id: '9CED2F8263B1C54A86059CC4467D3082',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/icons8onefinger96.png", id:"icons8onefinger96"},
		{src:"sounds/_1.mp3", id:"_1"},
		{src:"sounds/_5.mp3", id:"_5"},
		{src:"sounds/_3.mp3", id:"_3"},
		{src:"sounds/_2.mp3", id:"_2"},
		{src:"sounds/_4.mp3", id:"_4"},
		{src:"sounds/_6.mp3", id:"_6"},
		{src:"sounds/_7.mp3", id:"_7"}
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
an.compositions['9CED2F8263B1C54A86059CC4467D3082'] = {
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