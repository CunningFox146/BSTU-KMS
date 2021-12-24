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
(lib.animation_small = function(mode,startPosition,loop) {
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
	this.RestartBtn.setTransform(605.15,322.9,0.5,0.5);
	new cjs.ButtonHelper(this.RestartBtn, 0, 1, 2, false, new lib.Restart(), 3);

	this.PauseBtn = new lib.Pause();
	this.PauseBtn.name = "PauseBtn";
	this.PauseBtn.setTransform(540.25,322.8,0.5,0.5,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.PauseBtn, 0, 1, 2, false, new lib.Pause(), 3);

	this.PlayBtn = new lib.Play();
	this.PlayBtn.name = "PlayBtn";
	this.PlayBtn.setTransform(506.45,354.2,0.5,0.5,0,0,0,62.8,62.8);
	new cjs.ButtonHelper(this.PlayBtn, 0, 1, 2, false, new lib.Play(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.PlayBtn},{t:this.PauseBtn},{t:this.RestartBtn}]}).wait(1137));

	// Слой_2
	this.instance = new lib.Нота("synched",0);
	this.instance.setTransform(562.6,-51,0.5,0.5,0,0,0,30.6,-897.7);

	this.instance_1 = new lib.Нота("synched",0);
	this.instance_1.setTransform(77.8,-61.75,0.5,0.5,0,0,0,30.5,-897.7);

	this.instance_2 = new lib.Нота("synched",27);
	this.instance_2.setTransform(77.8,-61.75,0.5,0.5,0,0,0,30.5,-897.7);

	this.instance_3 = new lib.Нота("synched",53);
	this.instance_3.setTransform(562.6,-51,0.5,0.5,0,0,0,30.6,-897.7);

	this.instance_4 = new lib.Нота("synched",53);
	this.instance_4.setTransform(77.8,-61.75,0.5,0.5,0,0,0,30.5,-897.7);

	this.instance_5 = new lib.Нота("synched",76);
	this.instance_5.setTransform(77.8,-61.75,0.5,0.5,0,0,0,30.5,-897.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1,p:{regX:30.5,x:77.8,y:-61.75,startPosition:0}},{t:this.instance,p:{regX:30.6,x:562.6,y:-51}}]},991).to({state:[{t:this.instance_2,p:{x:77.8,y:-61.75,startPosition:27,regX:30.5}},{t:this.instance_1,p:{regX:30.6,x:562.6,y:-51,startPosition:27}},{t:this.instance,p:{regX:30.5,x:306.4,y:-83.95}}]},27).to({state:[{t:this.instance_4,p:{regX:30.5,x:77.8,y:-61.75,startPosition:53}},{t:this.instance_3,p:{regX:30.6,x:562.6,y:-51,startPosition:53}},{t:this.instance_2,p:{x:306.4,y:-83.95,startPosition:26,regX:30.5}},{t:this.instance_1,p:{regX:30.6,x:90.1,y:-70.95,startPosition:0}},{t:this.instance,p:{regX:30.5,x:495.85,y:-70.95}}]},26).to({state:[{t:this.instance_5},{t:this.instance_4,p:{regX:30.6,x:562.6,y:-51,startPosition:76}},{t:this.instance_3,p:{regX:30.5,x:306.4,y:-83.95,startPosition:49}},{t:this.instance_2,p:{x:90.1,y:-70.95,startPosition:23,regX:30.6}},{t:this.instance_1,p:{regX:30.5,x:495.85,y:-70.95,startPosition:23}},{t:this.instance,p:{regX:30.6,x:319.45,y:-51}}]},23).wait(70));

	// Слой_17
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(9,1,1).p("EAZOhUMMAv5ApvIHEGFIQTOAIHEGEIAdAZEBpUgIwQgWgNgTgWIlOkcInFmAIwYt6InEmAMg0fgrJEAMOhNtMA0dAo8IHGF7IQhNwIHGF7IA2AtEAJJhJwMAy3AoIIG4GAIQAOCIG3F+IGHFXEgS2hMWMBCeAzDIGuF8IP1N+IGqF4EgBShGsMA0sAq2IGrGBIPoOKIGmF/IFxFNEAE7hHgMAzjAoQIG2F/IP+N/IG0F9IBGA9EgfThNrMBKWA3dIGmF9IPkOFIGhF4IHAGWEglThMEMBMsA4UIGrF3IPyN5IGkFxEhCvhEPMBUYA/JIGZFtIPfN0IGSFlIGeFyEhBPhQrMBazBGQIGeFxIPjN3IGXFsIG0GDEgwfhONMBS+A9xIGdF6IPYOGIGWF1IGzGPEg5nhPuMBXdBCaIGQF/IO7OUIGIF4EhClgYgMAzIApsIF6FjIOvN4IFtFWIGMF1Eg7XgLQMAntAfRIF5FgIOwN0IFqFUICJB/EhKGAIvIeibZIFlFWIOYNwQjFnBEZGKQBkCLCeDzICKCDEhGTAHMIdva7IFlFaIOQN2IFVFLIApAoIEQEIIDTDNEhRDAOTIabdQIFRFbINrOEIE+FIIHMHZEhMdALJIb0cZIFGFnINLOeIE1FTIA5BAEhCFAA4MAi3Aa7IFvFdIOiNyIFgFOIAZAXID4DqIDFC9EhFcADRMAinAa+IFyFWIOuNpIFiFJIC1CoEg+vgIkMAnDAfSIFsFnIOTOBIFcFYIABAAIEIEEIDUDQEhBhgEQMAmvAdEIFsFhIOYN/IFeFTIByBwEhGphBgMBUhA+9IGfFlIPxNlIGXFfEg+7hIEMBUDBAoIGWFyIPUN+IGOFrEhFZg8QMBPAA8kIGNFuIPJN6IGEFmIGGFnEhFhgkqMA+8Av4IF8FqIOqOBIFxFfIAZAYIDLDAIDFC+EhHcg4QMBMxA7cIGCFxIOwOIIF4FnEhD9gwfMBFFA2gIGAFvIOtOGIF0FlIAvAtIBIBGIFfFQEhHBgs0MBD3A1vIGAFqIO4N7IF3FeIB+B2EhC3gcmMA4PAqiIGHFgIPKNpIF6FVIBqBfEhb2ASrIfVc3IFgFKIOaNiIFNE4IC5CuEhpTAb9Idcd6IFJFLINxNwIE0E2ICmClEhhPAZAIcyb4IFnE+IO3NKIFTEsIDfDF");
	this.shape.setTransform(183.6125,208.675,0.5,0.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#666666").s().p("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");
	this.shape_1.setTransform(280.3237,325.5954,0.5,0.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CC0000").s().p("EhzWA+5MAthgepIHbk/IH8lWIF5j/IF+kAIFFjbIDBiBIFvj4IDnibIEci/IDFiFIEDiuIEMi1IE1jQIEEiuIDZiTIEUi6IENi0IERi4IESi4IDwijIDfiXIEdi+IERi5IEqjJIE6jUIDqieIEljEIDyijIFEjbIDiiXIErjKIHGF8InGl8IEQi4IHFGBInFmBIEMizIHDGEInDmEIEBiuIEYH6IhWA4IkKCwIkPCzIk5DOIm4mAIG4GAIjkCXIm2mAIG2GAIlQDcImqmBIGqGBIjuCdImul7IGuF7IktDHImml+IGmF+IjlCXImrl3IGrF3IlIDYImdl7IGdF7Ik2DNImRl/IGRF/IkECrImelxIGeFxIkkC/ImXlyIGXFyIjcCSImaltIGaFtIjrCbImfllIGfFlIkkDAImNltIGNFtIkcC8ImClxIGCFxIkPCyImAlvIGAFvIkSC1ImClqIGCFqIjgCTIl7lqIF7FqIj4CkImHlgIGHFgIlBDUIl7lkIF7FkIkOCxIl5lgIF5FgIkPCzIltllIFtFlIjGCBIlslhIFsFhIkZC6IlvlcIFvFcIjkCVIlylWIFyFWIl9D8IlklaIFkFaIi/B9IlmlWIFmFWIlkDrIlHlmIFHFmIl0D1IlRlbIFRFbIlqDuIlglKIFgFKIn2FKIlmk+IFmE+In3FMIlKlLIFKFLMgyrAhXgEhMIBDfIZOwTII+lzIHYkyIE6jLIFVjcIGxkZQjFnBEZGLIBkhBIGZkIIDZiMIEOivIDBh9IEtjCIENiuIFdjiIDYiMIDtiZIEGiqIETiwIE1jIIFMjWIDZiMIDRiHIEyjHIDdiOIFSjaIFjjlIDXiMIE9jNIDiiSIFmjnIDmiVIFajfIEGiqIEFioIIflfIEYH5IlyDqInFmEIHFGEIkGClInEmBIHEGBIkFCkInFl7IHFF7IlpDjIm2l/IG2F/IjpCSImzl8IGzF8IlzDpImml+IGmF+IjdCMImrl4IGrF4QgVACgTAIQgqAQgXApIjeCLImhl5IGhF5IjUCFImklyIGkFyIlwDoImXl1IGXF1IlhDdImIl4IGIF4IjNCCImYlsIGYFsIiTBcQgtgIgoAQQgtATgZAtQgJARgGARImNlrIGNFrIjMCCImSlmIGSFmIh9BOQgPACgNAGQglAOgXAhImWlfIGWFfIldDcImFllIGFFlIlDDKIl3lnIF3FnIkVCvIl1lmIF1FmIgsAbQgXACgTAIQgrASgYApIhrBDIl3lfIF3FfIjzCZIlxlfIFxFfIjPCCIl6lVIF6FVIlqDkIltlXIFtFXIkRCrIlplUIFpFUIk5DFIldlXIFdFXIgCABIgBABQgJACgIAEQggAMgVAaIh3BMIlelUIFeFUIkNCoIlflNIFfFNIjWCIIlilJIFiFJImnEKIlUlLIFUFLIi3BzQiejzhjiKQBjCKCeDzInSEmIk0lUIE0FUIlKDPIk/lHIE/FHIktC8IlMk4IFME4InREmIlTksIFTEsIpdF8Ik0k1IE0E1IyOLegEBtlgp6gEBI7g1OgEBGug+YgEBK+hBQgEBPKhEDg");
	this.shape_2.setTransform(164.275,290.6125,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},947).wait(190));

	// Слой_18
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,1,1).p("EA/shqFIpJGsMAlZAvrIRhWWIiqOdMjH9CBAISOMaEDV7BWBIhrtrMg4lhVjMgMYg42MAGPg0nITuj0EA/shqFMBV2gQlEBb8gzuIkfOAMjLMCIaIWlPZEDSEBgOIzyjWMg/Ug3cIzJAAMhigA7HMhURAd8EDSEBgOMhDkhSsIw5l/MjIjB28EjV6BsEMEW1ix1IPrQ5MkEVCv+gEDSEBgOID3qNMiWPjAG");
	this.shape_3.setTransform(150.575,184.85,0.5,0.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CC8857").s().p("EiTPBRaMEW0ix1IPrQ6MkEVCv9g");
	this.shape_4.setTransform(-62.75,270.1375,0.5,0.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("EhwlBDhMDLMiIaIEeuAIRhWWIiqOdMjH8CA/g");
	this.shape_5.setTransform(140.4875,284.6,0.5,0.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CCCCCC").s().p("EA4HAFqIQ6F+MBDjBSsIzxjWMg/Ug3cIzJAAMhigA7HMhURAd8gEgFzhr+MBV1gQmMgGOA0nMAMXA42MA4lBVjIBsNrg");
	this.shape_6.setTransform(372.9375,190.9375,0.5,0.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#999999").s().p("EiZiBn4MDH8iA/ICqudIxh2WMglXgvrIJHmsMCWQDAFIj4KOMhDjhStIw6l9MjIiB26g");
	this.shape_7.setTransform(343.7875,217.475,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},947).wait(190));

	// Слой_14
	this.instance_6 = new lib.Молоточек();
	this.instance_6.setTransform(190.3,431.65,0.3852,0.3852,-12.4887,0,0,107.2,1380.1);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(577).to({_off:false},0).wait(13).to({rotation:-1.5436,x:190.35,y:431.7},20).to({rotation:-12.4887,x:190.3,y:431.65},10).wait(46).to({rotation:-1.5436,x:190.35,y:431.7},20).to({rotation:-12.4887,x:190.3,y:431.65},10).wait(70).to({regY:1380.2,rotation:-14.9798,x:297.35,y:621.5},14).wait(5).to({regY:1380.3,rotation:-27.3974},4).to({regX:107,regY:1380.2,rotation:-9.4534,x:297.3},8).to({regX:107.2,regY:1380.4,rotation:-10.9365,x:297.4,y:621.55},2).to({regX:107,regY:1380.2,rotation:-9.4534,x:297.3,y:621.5},2).wait(6).to({regX:107.2,rotation:-14.9798,x:297.35},4).wait(1).to({regY:1380.3,rotation:-27.3974},4).to({regX:107,regY:1380.2,rotation:-9.4534,x:297.3},8).to({regX:107.2,regY:1380.4,rotation:-10.9365,x:297.4,y:621.55},2).to({regX:107,regY:1380.2,rotation:-9.4534,x:297.3,y:621.5},2).wait(6).to({regX:107.2,rotation:-14.9798,x:297.35},4).wait(1).to({regY:1380.3,rotation:-27.3974},4).to({regX:107,regY:1380.2,rotation:-9.4534,x:297.3},8).to({regX:107.2,regY:1380.4,rotation:-10.9365,x:297.4,y:621.55},2).to({regX:107,regY:1380.2,rotation:-9.4534,x:297.3,y:621.5},2).wait(6).to({regX:107.2,rotation:-14.9798,x:297.35},4).wait(1).to({regY:1380.3,rotation:-27.3974},4).to({regX:107,regY:1380.2,rotation:-9.4534,x:297.3},8).to({regX:107.2,regY:1380.4,rotation:-10.9365,x:297.4,y:621.55},2).to({regX:107,regY:1380.2,rotation:-9.4534,x:297.3,y:621.5},2).wait(6).to({regX:107.2,rotation:-14.9798,x:297.35},4).wait(1).to({regY:1380.3,rotation:-27.3974},4).to({regX:107,regY:1380.2,rotation:-9.4534,x:297.3},8).to({regX:107.2,regY:1380.4,rotation:-10.9365,x:297.4,y:621.55},2).to({regX:107,regY:1380.2,rotation:-9.4534,x:297.3,y:621.5},2).wait(6).to({regX:107.2,rotation:-14.9798,x:297.35},4).wait(1).to({regY:1380.3,rotation:-27.3974},4).to({regX:107,regY:1380.2,rotation:-9.4534,x:297.3},8).to({regX:107.2,regY:1380.4,rotation:-10.9365,x:297.4,y:621.55},2).to({regX:107,regY:1380.2,rotation:-9.4534,x:297.3,y:621.5},2).wait(6).to({regX:107.2,rotation:-14.9798,x:297.35},4).to({_off:true},1).wait(190));

	// Слой_12
	this.instance_7 = new lib.заглушка();
	this.instance_7.setTransform(236.95,422.55,0.5,0.5,0,0,0,46.3,580.5);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(577).to({_off:false},0).wait(13).to({regX:48,regY:582.6,rotation:-19.1958,x:237.75,y:423.55},20).wait(10).to({regX:46.3,regY:580.5,rotation:0,x:236.95,y:422.55},16).wait(30).to({regX:48,regY:582.6,rotation:-19.1958,x:237.75,y:423.55},20).wait(10).to({regX:46.3,regY:580.5,rotation:0,x:236.95,y:422.55},16).wait(54).to({regX:48,regY:582.6,rotation:-19.1958,x:237.75,y:423.55},0).to({regX:46.3,regY:580.5,rotation:0,x:374.7,y:569.8},14).wait(13).to({regX:46.2,regY:580.6,rotation:-11.4396,x:374.65,y:569.85},3).wait(11).to({regX:46.3,regY:580.5,rotation:0,x:374.7,y:569.8},4).wait(9).to({regX:46.2,regY:580.6,rotation:-11.4396,x:374.65,y:569.85},3).wait(11).to({regX:46.3,regY:580.5,rotation:0,x:374.7,y:569.8},4).wait(9).to({regX:46.2,regY:580.6,rotation:-11.4396,x:374.65,y:569.85},3).wait(11).to({regX:46.3,regY:580.5,rotation:0,x:374.7,y:569.8},4).wait(9).to({regX:46.2,regY:580.6,rotation:-11.4396,x:374.65,y:569.85},3).wait(11).to({regX:46.3,regY:580.5,rotation:0,x:374.7,y:569.8},4).wait(9).to({regX:46.2,regY:580.6,rotation:-11.4396,x:374.65,y:569.85},3).wait(11).to({regX:46.3,regY:580.5,rotation:0,x:374.7,y:569.8},4).wait(9).to({regX:46.2,regY:580.6,rotation:-11.4396,x:374.65,y:569.85},3).wait(11).to({regX:46.3,regY:580.5,rotation:0,x:374.7,y:569.8},4).to({_off:true},1).wait(190));

	// Слой_13
	this.instance_8 = new lib.Струны();
	this.instance_8.setTransform(361.9,214.2,0.5,0.5,0,0,0,20.8,466.1);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(577).to({_off:false},0).wait(189).to({x:498.65},14).wait(140).to({_off:true},27).wait(190));

	// Слой_6
	this.instance_9 = new lib._3_1();
	this.instance_9.setTransform(322.4,436.25,0.5,0.5,-2.4908,0,0,12.6,555.5);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(408).to({_off:false},0).to({regX:12.7,rotation:-13.7555,x:322.45},14).to({regX:12.8,rotation:-16.4599,x:322.5},10).wait(11).to({regX:12.7,rotation:-13.7555,x:322.45},8).to({regX:12.6,rotation:-2.4908,x:322.4},6).wait(26).to({regX:12.7,rotation:-13.7555,x:322.45},13).to({regX:12.8,rotation:-16.4599,x:322.5},10).wait(11).to({regX:12.7,rotation:-13.7555,x:322.45},8).to({regX:12.6,rotation:-2.4908,x:322.4},6).to({_off:true},46).wait(560));

	// Слой_9
	this.instance_10 = new lib._3_3();
	this.instance_10.setTransform(124.1,282,0.6509,1.1886,0,0,0,26.4,84.7);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(408).to({_off:false},0).wait(123).to({_off:true},46).wait(560));

	// Слой_7
	this.instance_11 = new lib._3_2();
	this.instance_11.setTransform(124.85,208.15,0.7716,0.7716,3.0788,0,0,54.1,455.5);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(408).to({_off:false},0).wait(14).to({rotation:-9.3861,x:124.8,y:208.2},10).wait(11).to({rotation:-9.3861},0).to({rotation:3.0788,x:124.85,y:208.15},8).to({rotation:3.0788},6).wait(39).to({rotation:-9.3861,x:124.8,y:208.2},10).wait(11).to({rotation:-9.3861},0).to({rotation:3.0788,x:124.85,y:208.15},8).to({rotation:3.0788},6).to({_off:true},46).wait(560));

	// Слой_10
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#666666").ss(18,1,1).p("AxNxzUgKEAo3AuSgGB");
	this.shape_8.setTransform(336.5265,227.9835,0.5,0.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#666666").ss(18,1,1).p("Aoao4QlJUlW6jR");
	this.shape_9.setTransform(335.3108,227.8558);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#666666").ss(18,1,1).p("AoNo2QlQUtWqjg");
	this.shape_10.setTransform(334.0671,227.7248);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#666666").ss(18,1,1).p("AoBo1QlWU3Wbjx");
	this.shape_11.setTransform(332.8271,227.5915);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#666666").ss(18,1,1).p("An0o0QleVBWMkC");
	this.shape_12.setTransform(331.5754,227.4682);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#666666").ss(18,1,1).p("AnoozQlkVKV9kR");
	this.shape_13.setTransform(330.3195,227.3647);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#666666").ss(18,1,1).p("AnboyQlsVTVukh");
	this.shape_14.setTransform(329.0595,227.2593);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#666666").ss(18,1,1).p("AnPoxQlyVdVfky");
	this.shape_15.setTransform(327.8035,227.1793);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#666666").ss(18,1,1).p("AnCowQl5VmVPlC");
	this.shape_16.setTransform(326.5088,227.0829);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#666666").ss(18,1,1).p("Am1ovQmAVvVAlS");
	this.shape_17.setTransform(325.2358,227.0018);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#666666").ss(18,1,1).p("AmoouQmHV4Uxli");
	this.shape_18.setTransform(323.9584,226.9362);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#666666").ss(18,1,1).p("AmbouQmOWCUily");
	this.shape_19.setTransform(322.6764,226.8694);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#666666").ss(18,1,1).p("AmOotQmVWLUTmD");
	this.shape_20.setTransform(321.3989,226.8096);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#666666").ss(18,1,1).p("AmCotQmbWUUDmS");
	this.shape_21.setTransform(320.1079,226.763);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#666666").ss(18,1,1).p("ArrxZUgNEAs8AnqgNF");
	this.shape_22.setTransform(318.8024,226.6986,0.5,0.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#666666").ss(18,1,1).p("Al6o4QmNWtTimT");
	this.shape_23.setTransform(319.0826,224.8229);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#666666").ss(18,1,1).p("Al/pFQl4W9TPmD");
	this.shape_24.setTransform(319.345,222.9169);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#666666").ss(18,1,1).p("AmEpRQljXNS9l1");
	this.shape_25.setTransform(319.5839,221.058);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#666666").ss(18,1,1).p("AmJpeQlOXdSqll");
	this.shape_26.setTransform(319.8282,219.1779);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#666666").ss(18,1,1).p("AmOpqQk5XsSYlV");
	this.shape_27.setTransform(320.0624,217.3367);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#666666").ss(18,1,1).p("AmTp3QkkX8SGlG");
	this.shape_28.setTransform(320.2859,215.5084);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#666666").ss(18,1,1).p("AmXqEQkPYMRzk3");
	this.shape_29.setTransform(320.4976,213.6674);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#666666").ss(18,1,1).p("AmcqRQj6YcRhko");
	this.shape_30.setTransform(320.6798,211.8717);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#666666").ss(18,1,1).p("AmhqfQjkYsROkY");
	this.shape_31.setTransform(320.8643,210.0564);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#666666").ss(18,1,1).p("AtL1ZUgGfAx4Ah4gIQ");
	this.shape_32.setTransform(321.0313,208.2642,0.5,0.5);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#666666").ss(18,1,1).p("AmfqbQjqYoRSkc");
	this.shape_33.setTransform(320.8342,210.517);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#666666").ss(18,1,1).p("AmaqLQkEYURqkv");
	this.shape_34.setTransform(320.5942,212.768);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#666666").ss(18,1,1).p("AmUp6QkfYASBlC");
	this.shape_35.setTransform(320.342,215.0459);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#666666").ss(18,1,1).p("AmIpbQlTXZSvlp");
	this.shape_36.setTransform(319.7816,219.6551);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#666666").ss(18,1,1).p("AmCpLQltXFTGl8");
	this.shape_37.setTransform(319.4701,221.9859);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#666666").ss(18,1,1).p("Al7o7QmJWxTemP");
	this.shape_38.setTransform(319.1503,224.3449);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#666666").ss(18,1,1).p("AmTotQmSWHUYl8");
	this.shape_39.setTransform(321.831,226.8284);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#666666").ss(18,1,1).p("AmxovQmCVyU7lX");
	this.shape_40.setTransform(324.8251,226.9846);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#666666").ss(18,1,1).p("AnsozQliVHWCkM");
	this.shape_41.setTransform(330.724,227.3925);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#666666").ss(18,1,1).p("AoJo2QlSUxWljm");
	this.shape_42.setTransform(333.6481,227.6773);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#666666").ss(18,1,1).p("AoZo3QlJUlW4jS");
	this.shape_43.setTransform(335.2258,227.8431);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#666666").ss(18,1,1).p("AoLo2QlRUvWojj");
	this.shape_44.setTransform(333.8706,227.7069);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#666666").ss(18,1,1).p("An+o1QlYU5WYj0");
	this.shape_45.setTransform(332.5366,227.5638);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#666666").ss(18,1,1).p("AnwozQlgVDWHkG");
	this.shape_46.setTransform(331.1799,227.4318);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#666666").ss(18,1,1).p("AnjoyQlnVNV3kX");
	this.shape_47.setTransform(329.8365,227.3276);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#666666").ss(18,1,1).p("AnVoxQlvVXVnkp");
	this.shape_48.setTransform(328.4622,227.2158);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#666666").ss(18,1,1).p("AnIowQl2VhVXk6");
	this.shape_49.setTransform(327.109,227.1212);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#666666").ss(18,1,1).p("Am6ovQl9VrVGlM");
	this.shape_50.setTransform(325.7246,227.0283);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#666666").ss(18,1,1).p("AmsovQmFV2U2ld");
	this.shape_51.setTransform(324.3613,226.96);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#666666").ss(18,1,1).p("AmeouQmMWAUllv");
	this.shape_52.setTransform(322.9754,226.8837);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#666666").ss(18,1,1).p("AmRotQmTWJUVmA");
	this.shape_53.setTransform(321.6018,226.8153);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#666666").ss(18,1,1).p("AmCotQmbWUUEmR");
	this.shape_54.setTransform(320.1965,226.7697);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8}]},408).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},11).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_8}]},26).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_32}]},11).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_8}]},1).to({state:[]},46).wait(560));

	// Слой_5
	this.instance_12 = new lib.ПилотВерх();
	this.instance_12.setTransform(316.05,49.35,0.6029,0.6029,0,0,0,79,84.5);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(229).to({_off:false},0).wait(8).to({regY:84.4,y:-13.45},30).to({regY:84.5,y:49.35},29).wait(9).to({regY:84.4,y:-13.45},26).wait(2).to({regY:84.5,y:49.35},29).to({_off:true},46).wait(729));

	// Слой_4
	this.instance_13 = new lib.ПилотНиз();
	this.instance_13.setTransform(325.2,273.6,0.6029,0.6029,0,0,0,177.6,278.2);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(229).to({_off:false},0).to({y:267.9},8).to({y:205.1},30).to({y:273.6},29).to({y:267.9},9).to({y:205.1},26).wait(2).to({y:273.6},29).to({_off:true},46).wait(729));

	// Слой_3
	this.instance_14 = new lib.Анимация1("synched",0);
	this.instance_14.setTransform(279.6,340.6,0.7282,0.7282);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(82).to({startPosition:0},0).to({regX:0.1,regY:0.1,scaleX:0.5878,scaleY:0.5878,x:279.65,y:340.65},10).to({scaleX:0.4504,scaleY:0.4504,x:279.7,y:328.4},32).wait(39).to({regX:0,regY:0,scaleX:0.7282,scaleY:0.7282,x:279.6,y:340.6},0).to({regX:0.1,regY:0.1,scaleX:0.5878,scaleY:0.5878,x:279.65,y:340.65},10).to({scaleX:0.4504,scaleY:0.4504,x:279.7,y:328.4},32).to({_off:true},23).wait(909));

	// Слой_1
	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#000000").ss(1,1,1).p("EBAmgcnIQkAAMAAAA5LI0TAAEAtmgcnII/AAAZT8nIKSAAEAolANnIAAO9I0SAAI0TAAAUTNnIAAO9EA83ANnIAAO9I0SAAEgjjgcnIPRAAAlA8nIKBAAIKRAAEg83AckI0SAAMAAAg5LIOpAAIKBAAIK6AAEg83ANnIAAO9AAANnIAAAtIAAOPA0SckI0SAAI0TAAEgokANnIAAO9A0O8jMAAAA5L");
	this.shape_55.setTransform(297.8,207.6125,0.5,0.5);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.lf(["#282828","#000000"],[0,1],-32,0,32.1,0).s().p("AAAVIIlAAAMAAAgqPIKBAAMAAAAqPg");
	this.shape_56.setTransform(167.9625,183.5875,0.5,0.5);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.lf(["#282828","#000000"],[0,1],-32,0,32.1,0).s().p("AApVIIlpAAMAAAgqPIKBAAMAAAAqPg");
	this.shape_57.setTransform(100.9875,183.5875,0.5,0.5);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.lf(["#282828","#000000"],[0,1],-32,0,32.1,0).s().p("AAAVIIAAAAIlAAAMAAAgqPIKBAAMAAAAqPg");
	this.shape_58.setTransform(297.8125,183.5875,0.5,0.5);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.lf(["#282828","#000000"],[0,1],-32,0,32.1,0).s().p("ABSVIImSAAMAAAgqPIKBAAMAAAAqPg");
	this.shape_59.setTransform(488.4875,183.5875,0.5,0.5);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.lf(["#282828","#000000"],[0,1],-32,0,32.1,0).s().p("AAAVIIlAAAMAAAgqPIKBAAMAAAAqPg");
	this.shape_60.setTransform(427.6625,183.5875,0.5,0.5);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.lf(["#282828","#000000"],[0,1],-32,0,32.1,0).s().p("AAAVIIlAAAMAAAgqPIKBAAMAAAAqPg");
	this.shape_61.setTransform(362.7375,183.5875,0.5,0.5);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("EA83AcmIAAu8IDwAAMAAAgqPIQjAAMAAAA5LgEAolAcmIAAu8IFBAAMAAAgqPII/AAMAAAAqPIGSAAIAAO8gAUTcmIAAu8IAAO8I0TAAIAAgBIAAuOIAAgtIFBAAMAAAgqPIKRAAMAAAAqPIFBAAIFAAAMAAAgqPIKRAAMAAAAqPIFBAAIAAO8gEgokAcmIAAu8IFBAAMAAAgqPIPRAAMAAAA5LgEg83AcmIAAu8IEZAAMAAAgqPIK5AAMAAAAqPIFBAAIAAO8gEhRJAcmMAAAg5LIOpAAMAAAAqPIFpAAIAAO8gEAolANqgEg83ANqg");
	this.shape_62.setTransform(297.8,207.5,0.5,0.5);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#000000").ss(1,1,1).p("EBAmgcnIQkAAMAAAA5LI0TAAEAtmgcnII/AAAZT8nIKSAAEAolAckI0SAAI0TAAAUTNnIAAO9EAolANnIAAO9EA83ANnIAAO9I0SAAEgjjgcnIPRAAAAA8nIFBAAIKRAAAlA8nIFAAAMAAAAqOIAAAtIAAOPEg83AckI0SAAMAAAg5LIOpAAIKBAAIK6AAEg83ANnIAAO9A0SckI0SAAEgokANnIAAO9I0TAAA0O8jMAAAA5L");
	this.shape_63.setTransform(297.8,207.6125,0.5,0.5);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("EA91AVIImTAAMAAAgqPIKCAAMAAAAqPgEApiAVIIlAAAMAAAgqPIKBAAMAAAAqPgAVQVIIlBAAMAAAgqPIKCAAMAAAAqPgAA9VIIgBAAMAAAgqPMAAAAqPIk+AAMAAAgqPIE+AAIFCAAMAAAAqPgEgnnAVIIlAAAMAAAgqPIKBAAMAAAAqPgEg75AVIIlqAAMAAAgqPIKCAAMAAAAqPg");
	this.shape_64.setTransform(294.7375,183.5875,0.5,0.5);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("EA83AcmIAAu8IDwAAMAAAgqPIQjAAMAAAA5LgEAolAcmIAAu8IAAO8I0SAAIAAu8IAAO8I0TAAIAAgBIAAuOIAAgtIFBAAMAAAgqPIKRAAMAAAAqPIFBAAIFAAAMAAAgqPIKRAAMAAAAqPIFBAAIFBAAMAAAgqPII/AAMAAAAqPIGSAAIAAO8gEgokAcmIAAu8IFBAAMAAAgqPIPRAAMAAAA5LgEg83AcmIAAu8IAAO8I0SAAMAAAg5LIOpAAMAAAAqPIFpAAIEZAAMAAAgqPIK5AAMAAAAqPIFBAAIAAO8gEA83ANqgEgokANqg");
	this.shape_65.setTransform(297.8,207.5,0.5,0.5);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#000000").ss(1,1,1).p("EBAmgcnIQkAAMAAAA5LI0TAAEAtmgcnII/AAAZT8nIKSAAEAolANnIAAO9I0SAAI0TAAAUTNnIAAO9EA83ANnIAAO9I0SAAEgjjgcnIPRAAAAA8nIFBAAIKRAAAlA8nIFAAAMAAAAqOIAAAtIAAOPEg83AckI0SAAMAAAg5LIOpAAIKBAAIK6AAEg83ANnIAAO9A0SckI0SAAI0TAAEgokANnIAAO9A0O8jMAAAA5L");
	this.shape_66.setTransform(297.8,207.6125,0.5,0.5);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("EA83AcmIAAu8IDwAAMAAAgqPIQjAAMAAAA5LgEAolAcmIAAu8IAAO8I0SAAIAAu8IFAAAMAAAgqPIKRAAMAAAAqPIFBAAIFBAAMAAAgqPII/AAMAAAAqPIGSAAIAAO8gAAAcmIAAgBIAAuOIAAgtIFBAAMAAAgqPIKRAAMAAAAqPIFBAAIAAO8gEgokAcmIAAu8IFBAAMAAAgqPIPRAAMAAAA5LgEg83AcmIAAu8IAAO8I0SAAMAAAg5LIOpAAMAAAAqPIFpAAIEZAAMAAAgqPIK5AAMAAAAqPIFBAAIAAO8gEA83ANqgAUTNqgEgokANqg");
	this.shape_67.setTransform(297.8,207.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55}]}).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63}]},82).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63}]},10).to({state:[{t:this.shape_67},{t:this.shape_64},{t:this.shape_66}]},71).to({state:[{t:this.shape_67},{t:this.shape_64},{t:this.shape_66}]},10).to({state:[]},55).wait(909));

	// Piano
	this.instance_15 = new lib.Клавиша();
	this.instance_15.setTransform(265.3,116.1,0.5,0.5,0,0,0,64.9,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(92).to({regY:0.1,scaleY:0.4674,y:116.15},32).wait(39).to({regY:0,scaleY:0.5,y:116.1},0).wait(10).to({regY:0.1,scaleY:0.4674,y:116.15},32).to({_off:true},23).wait(909));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-215,-431,1051.2,1430.4);
// library properties:
lib.properties = {
	id: '9CED2F8263B1C54A86059CC4467D3082',
	width: 640,
	height: 360,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/icons8onefinger96.png", id:"icons8onefinger96"},
		{src:"sounds/_1.mp3", id:"_1"},
		{src:"sounds/_3.mp3", id:"_3"},
		{src:"sounds/_4.mp3", id:"_4"},
		{src:"sounds/_7.mp3", id:"_7"},
		{src:"sounds/_5.mp3", id:"_5"},
		{src:"sounds/_2.mp3", id:"_2"},
		{src:"sounds/_6.mp3", id:"_6"}
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