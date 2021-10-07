(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"animation_atlas_1", frames: [[1143,0,859,1344],[0,0,1141,1582]]},
		{name:"animation_atlas_2", frames: [[753,0,622,1166],[0,0,751,1120],[1534,1481,505,489],[1026,1481,506,490],[1377,988,515,491],[1377,0,523,492],[0,1481,515,491],[517,1481,507,490],[1377,494,523,492]]},
		{name:"animation_atlas_3", frames: [[1002,490,487,487],[1491,490,400,584],[0,1471,402,573],[1001,0,490,488],[971,1468,474,486],[487,982,482,487],[502,491,498,489],[1002,979,487,487],[0,0,505,489],[404,1471,402,573],[1491,1076,400,584],[1493,0,477,486],[0,982,485,487],[507,0,492,488],[0,491,500,489]]},
		{name:"animation_atlas_4", frames: [[808,0,470,485],[1618,487,404,557],[0,0,402,571],[808,487,403,563],[932,1052,405,552],[407,1539,458,484],[0,573,466,485],[1618,1046,404,557],[404,0,402,571],[1213,487,403,563],[0,1060,405,552],[1280,0,470,485],[468,1052,462,485]]},
		{name:"animation_atlas_5", frames: [[865,0,452,484],[0,0,406,544],[0,1092,406,542],[818,972,410,521],[408,1030,408,532],[857,1543,442,483],[1319,0,449,484],[816,486,452,484],[0,546,406,544],[408,486,406,542],[1270,486,408,532],[1230,1020,410,521],[408,0,455,484],[408,1564,447,484]]},
		{name:"animation_atlas_6", frames: [[1727,0,254,809],[854,0,435,483],[1258,1474,415,494],[414,998,413,506],[0,0,410,519],[412,485,412,511],[1244,970,414,502],[830,1478,426,482],[1291,0,434,483],[826,485,435,483],[829,970,413,506],[0,521,410,519],[414,1506,414,502],[0,1042,412,511],[1263,485,433,483],[412,0,440,483]]},
		{name:"animation_atlas_7", frames: [[838,1435,142,129],[989,1244,79,107],[838,1244,149,189],[838,736,253,253],[838,991,251,251],[1099,0,101,1891],[427,494,384,410],[835,0,262,734],[417,0,416,492],[0,1474,418,482],[0,0,415,494],[0,980,416,492],[0,496,425,482],[418,980,418,482],[982,1435,96,96]]}
];


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



(lib.CachedBmp_120 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_106 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_114 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_123 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_118 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["animation_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["animation_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["animation_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["animation_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["animation_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["animation_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(img.CachedBmp_95);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2080,735);


(lib.CachedBmp_44 = function() {
	this.initialize(img.CachedBmp_44);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2080,735);


(lib.CachedBmp_85 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["animation_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(img.CachedBmp_43);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2080,735);


(lib.CachedBmp_78 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["animation_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["animation_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["animation_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["animation_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["animation_atlas_4"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["animation_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["animation_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["animation_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["animation_atlas_4"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["animation_atlas_4"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["animation_atlas_4"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["animation_atlas_4"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["animation_atlas_6"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["animation_atlas_4"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["animation_atlas_5"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["animation_atlas_4"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["animation_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.icons8onefinger96 = function() {
	this.initialize(ss["animation_atlas_7"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["animation_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["animation_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["animation_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(img.CachedBmp_46);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1705,4716);


(lib.CachedBmp_1 = function() {
	this.initialize(img.CachedBmp_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2963,2321);


(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,5478,3240);// helper functions:

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
	this.instance = new lib.CachedBmp_118();
	this.instance.setTransform(-62.75,-62.75,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({y:-57.75},0).wait(2));

	// Слой_3
	this.instance_1 = new lib.CachedBmp_120();
	this.instance_1.setTransform(-32.65,-31.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({y:-26.2},0).wait(2));

	// Слой_1
	this.instance_2 = new lib.CachedBmp_123();
	this.instance_2.setTransform(-63.25,-63.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({y:-58.25},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63.2,-63.2,126.5,131.5);


(lib.Play = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.instance = new lib.CachedBmp_118();
	this.instance.setTransform(-62.75,-62.75,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({y:-57.75},0).wait(2));

	// Слой_3
	this.instance_1 = new lib.CachedBmp_114();
	this.instance_1.setTransform(-24.15,-46.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({y:-41.45},0).wait(2));

	// Слой_1
	this.instance_2 = new lib.CachedBmp_123();
	this.instance_2.setTransform(-63.25,-63.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({y:-58.25},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63.2,-63.2,126.5,131.5);


(lib.Pause = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.instance = new lib.CachedBmp_118();
	this.instance.setTransform(-62.75,-62.75,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({y:-57.75},0).wait(2));

	// Слой_3
	this.instance_1 = new lib.CachedBmp_106();
	this.instance_1.setTransform(-20.45,-26.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({y:-21.15},0).wait(2));

	// Слой_1
	this.instance_2 = new lib.CachedBmp_123();
	this.instance_2.setTransform(-63.25,-63.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({y:-58.25},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63.2,-63.2,126.5,131.5);


(lib.заглушка = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_53();
	this.instance.setTransform(-0.5,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.заглушка, new cjs.Rectangle(-0.5,0,311,583), null);


(lib._3_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_52();
	this.instance.setTransform(-0.45,-0.45,0.2103,0.2103);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._3_3, new cjs.Rectangle(-0.4,-0.4,53.4,170.1), null);


(lib._3_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_51();
	this.instance.setTransform(-0.45,-0.45,0.324,0.324);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._3_2, new cjs.Rectangle(-0.4,-0.4,369.59999999999997,512.5), null);


(lib._3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_50();
	this.instance.setTransform(-0.5,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._3_1, new cjs.Rectangle(-0.5,0,375.5,560), null);


(lib.Струны = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_49();
	this.instance.setTransform(-4.5,-6.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Струны, new cjs.Rectangle(-4.5,-6.5,50.5,945.5), null);


(lib.ПилотНиз = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_48();
	this.instance.setTransform(-0.45,-0.45,0.4147,0.4147);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ПилотНиз, new cjs.Rectangle(-0.4,-0.4,356.2,557.3), null);


(lib.ПилотВерх = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_47();
	this.instance.setTransform(-0.45,-0.45,0.4147,0.4147);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ПилотВерх, new cjs.Rectangle(-0.4,-0.4,159.20000000000002,170), null);


(lib.Молоточек = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_46();
	this.instance.setTransform(-0.5,-0.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Молоточек, new cjs.Rectangle(-0.5,-0.5,852.5,2358), null);


(lib.Клавиша = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_45();
	this.instance.setTransform(-0.5,-0.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Клавиша, new cjs.Rectangle(-0.5,-0.5,131,367), null);


(lib.Анимация1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.icons8onefinger96();
	this.instance.setTransform(-114.15,-149.75,2.3781,3.1198);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-114.1,-149.7,228.3,299.5);


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

	// Слой_17
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(-409.75,-126.05,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(947).to({_off:false},0).wait(190));

	// Слой_18
	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(-1068.45,-440.25,0.5,0.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(947).to({_off:false},0).wait(190));

	// Слой_14
	this.instance_2 = new lib.Молоточек();
	this.instance_2.setTransform(380.55,863.3,0.7704,0.7704,-12.4887,0,0,107,1380);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(577).to({_off:false},0).wait(13).to({regX:107.2,rotation:-1.5436,x:380.65,y:863.35},20).to({regX:107,rotation:-12.4887,x:380.55,y:863.3},10).wait(46).to({regX:107.2,rotation:-1.5436,x:380.65,y:863.35},20).to({regX:107,rotation:-12.4887,x:380.55,y:863.3},10).wait(70).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},14).wait(5).to({regY:1380.2,rotation:-27.3984,y:1243.05},4).to({regX:107,rotation:-9.4543,x:594.65,y:1243},8).to({regX:107.1,rotation:-10.9373,x:594.7,y:1243.05},2).to({regX:107,rotation:-9.4543,x:594.65,y:1243},2).wait(6).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},4).wait(1).to({regY:1380.2,rotation:-27.3984,y:1243.05},4).to({regX:107,rotation:-9.4543,x:594.65,y:1243},8).to({regX:107.1,rotation:-10.9373,x:594.7,y:1243.05},2).to({regX:107,rotation:-9.4543,x:594.65,y:1243},2).wait(6).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},4).wait(1).to({regY:1380.2,rotation:-27.3984,y:1243.05},4).to({regX:107,rotation:-9.4543,x:594.65,y:1243},8).to({regX:107.1,rotation:-10.9373,x:594.7,y:1243.05},2).to({regX:107,rotation:-9.4543,x:594.65,y:1243},2).wait(6).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},4).wait(1).to({regY:1380.2,rotation:-27.3984,y:1243.05},4).to({regX:107,rotation:-9.4543,x:594.65,y:1243},8).to({regX:107.1,rotation:-10.9373,x:594.7,y:1243.05},2).to({regX:107,rotation:-9.4543,x:594.65,y:1243},2).wait(6).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},4).wait(1).to({regY:1380.2,rotation:-27.3984,y:1243.05},4).to({regX:107,rotation:-9.4543,x:594.65,y:1243},8).to({regX:107.1,rotation:-10.9373,x:594.7,y:1243.05},2).to({regX:107,rotation:-9.4543,x:594.65,y:1243},2).wait(6).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},4).wait(1).to({regY:1380.2,rotation:-27.3984,y:1243.05},4).to({regX:107,rotation:-9.4543,x:594.65,y:1243},8).to({regX:107.1,rotation:-10.9373,x:594.7,y:1243.05},2).to({regX:107,rotation:-9.4543,x:594.65,y:1243},2).wait(6).to({regX:107.1,regY:1380.1,rotation:-14.9809,x:594.7,y:1242.95},4).to({_off:true},1).wait(190));

	// Слой_12
	this.instance_3 = new lib.заглушка();
	this.instance_3.setTransform(473.8,845.1,1,1,0,0,0,46.2,580.5);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(577).to({_off:false},0).wait(13).to({regX:48,regY:582.5,rotation:-19.1958,x:475.6,y:847.05},20).wait(10).to({regX:46.2,regY:580.5,rotation:0,x:473.8,y:845.1},16).wait(30).to({regX:48,regY:582.5,rotation:-19.1958,x:475.6,y:847.05},20).wait(10).to({regX:46.2,regY:580.5,rotation:0,x:473.8,y:845.1},16).wait(54).to({regX:48,regY:582.5,rotation:-19.1958,x:475.6,y:847.05},0).to({regX:46.2,regY:580.5,rotation:0,x:749.3,y:1139.65},14).wait(13).to({rotation:-11.4396},3).wait(11).to({rotation:0},4).wait(9).to({rotation:-11.4396},3).wait(11).to({rotation:0},4).wait(9).to({rotation:-11.4396},3).wait(11).to({rotation:0},4).wait(9).to({rotation:-11.4396},3).wait(11).to({rotation:0},4).wait(9).to({rotation:-11.4396},3).wait(11).to({rotation:0},4).wait(9).to({rotation:-11.4396},3).wait(11).to({rotation:0},4).to({_off:true},1).wait(190));

	// Слой_13
	this.instance_4 = new lib.Струны();
	this.instance_4.setTransform(723.8,428.45,1,1,0,0,0,20.8,466.2);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(577).to({_off:false},0).wait(189).to({x:997.35},14).wait(140).to({_off:true},27).wait(190));

	// Слой_6
	this.instance_5 = new lib._3_1();
	this.instance_5.setTransform(644.75,872.35,1,1,-2.4916,0,0,12.5,555.4);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(408).to({_off:false},0).to({regX:12.7,rotation:-13.7561,x:644.9,y:872.45},14).to({regY:555.5,scaleX:0.9999,scaleY:0.9999,rotation:-16.4599,x:644.95,y:872.5},10).wait(11).to({regY:555.4,scaleX:1,scaleY:1,rotation:-13.7561,x:644.9,y:872.45},8).to({regX:12.5,rotation:-2.4916,x:644.75,y:872.35},6).wait(26).to({regX:12.7,rotation:-13.7561,x:644.9,y:872.45},13).to({regY:555.5,scaleX:0.9999,scaleY:0.9999,rotation:-16.4599,x:644.95,y:872.5},10).wait(11).to({regY:555.4,scaleX:1,scaleY:1,rotation:-13.7561,x:644.9,y:872.45},8).to({regX:12.5,rotation:-2.4916,x:644.75,y:872.35},6).to({_off:true},46).wait(560));

	// Слой_9
	this.instance_6 = new lib._3_3();
	this.instance_6.setTransform(248.2,564.05,1.3018,2.3772,0,0,0,26.4,84.7);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(408).to({_off:false},0).wait(123).to({_off:true},46).wait(560));

	// Слой_7
	this.instance_7 = new lib._3_2();
	this.instance_7.setTransform(249.6,416.35,1.5433,1.5433,3.0788,0,0,54.1,455.5);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(408).to({_off:false},0).wait(14).to({rotation:-9.3867},10).wait(11).to({rotation:-9.3867},0).to({rotation:3.0788},8).to({rotation:3.0788},6).wait(39).to({rotation:-9.3867},10).wait(11).to({rotation:-9.3867},0).to({rotation:3.0788},8).to({rotation:3.0788},6).to({_off:true},46).wait(560));

	// Слой_10
	this.instance_8 = new lib.CachedBmp_42();
	this.instance_8.setTransform(542.35,332.95,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_4();
	this.instance_9.setTransform(541.8,332.95,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_5();
	this.instance_10.setTransform(541.2,332.95,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_6();
	this.instance_11.setTransform(540.65,332.95,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_7();
	this.instance_12.setTransform(540.05,332.95,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_8();
	this.instance_13.setTransform(539.4,332.95,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_9();
	this.instance_14.setTransform(538.8,332.95,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_39();
	this.instance_15.setTransform(538.15,332.95,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_11();
	this.instance_16.setTransform(537.45,332.95,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_12();
	this.instance_17.setTransform(536.8,332.95,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_13();
	this.instance_18.setTransform(536.05,332.95,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_14();
	this.instance_19.setTransform(535.35,332.95,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_15();
	this.instance_20.setTransform(534.6,332.95,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_16();
	this.instance_21.setTransform(533.85,332.95,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_36();
	this.instance_22.setTransform(533.1,332.95,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_18();
	this.instance_23.setTransform(534.15,326.7,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_19();
	this.instance_24.setTransform(535.2,320.45,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_20();
	this.instance_25.setTransform(536.2,314.25,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_21();
	this.instance_26.setTransform(537.2,308,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_32();
	this.instance_27.setTransform(538.1,301.75,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_23();
	this.instance_28.setTransform(539,295.5,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_24();
	this.instance_29.setTransform(539.85,289.25,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_25();
	this.instance_30.setTransform(540.6,283.05,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_26();
	this.instance_31.setTransform(541.35,276.8,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_28();
	this.instance_32.setTransform(542,270.55,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_29();
	this.instance_33.setTransform(541.2,278.35,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_30();
	this.instance_34.setTransform(540.25,286.15,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_31();
	this.instance_35.setTransform(539.2,293.95,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_33();
	this.instance_36.setTransform(536.95,309.55,0.5,0.5);

	this.instance_37 = new lib.CachedBmp_34();
	this.instance_37.setTransform(535.7,317.35,0.5,0.5);

	this.instance_38 = new lib.CachedBmp_35();
	this.instance_38.setTransform(534.45,325.15,0.5,0.5);

	this.instance_39 = new lib.CachedBmp_37();
	this.instance_39.setTransform(534.85,332.95,0.5,0.5);

	this.instance_40 = new lib.CachedBmp_38();
	this.instance_40.setTransform(536.55,332.95,0.5,0.5);

	this.instance_41 = new lib.CachedBmp_40();
	this.instance_41.setTransform(539.6,332.95,0.5,0.5);

	this.instance_42 = new lib.CachedBmp_41();
	this.instance_42.setTransform(541.05,332.95,0.5,0.5);

	this.instance_43 = new lib.CachedBmp_92();
	this.instance_43.setTransform(542.35,332.95,0.5,0.5);

	this.instance_44 = new lib.CachedBmp_55();
	this.instance_44.setTransform(541.75,332.95,0.5,0.5);

	this.instance_45 = new lib.CachedBmp_56();
	this.instance_45.setTransform(541.15,332.95,0.5,0.5);

	this.instance_46 = new lib.CachedBmp_57();
	this.instance_46.setTransform(540.5,332.95,0.5,0.5);

	this.instance_47 = new lib.CachedBmp_58();
	this.instance_47.setTransform(539.85,332.95,0.5,0.5);

	this.instance_48 = new lib.CachedBmp_59();
	this.instance_48.setTransform(539.2,332.95,0.5,0.5);

	this.instance_49 = new lib.CachedBmp_60();
	this.instance_49.setTransform(538.5,332.95,0.5,0.5);

	this.instance_50 = new lib.CachedBmp_61();
	this.instance_50.setTransform(537.75,332.95,0.5,0.5);

	this.instance_51 = new lib.CachedBmp_62();
	this.instance_51.setTransform(537.05,332.95,0.5,0.5);

	this.instance_52 = new lib.CachedBmp_63();
	this.instance_52.setTransform(536.3,332.95,0.5,0.5);

	this.instance_53 = new lib.CachedBmp_64();
	this.instance_53.setTransform(535.55,332.95,0.5,0.5);

	this.instance_54 = new lib.CachedBmp_65();
	this.instance_54.setTransform(534.75,332.95,0.5,0.5);

	this.instance_55 = new lib.CachedBmp_66();
	this.instance_55.setTransform(533.95,332.95,0.5,0.5);

	this.instance_56 = new lib.CachedBmp_86();
	this.instance_56.setTransform(533.1,332.95,0.5,0.5);

	this.instance_57 = new lib.CachedBmp_68();
	this.instance_57.setTransform(534.15,326.7,0.5,0.5);

	this.instance_58 = new lib.CachedBmp_69();
	this.instance_58.setTransform(535.2,320.45,0.5,0.5);

	this.instance_59 = new lib.CachedBmp_70();
	this.instance_59.setTransform(536.2,314.25,0.5,0.5);

	this.instance_60 = new lib.CachedBmp_71();
	this.instance_60.setTransform(537.2,308,0.5,0.5);

	this.instance_61 = new lib.CachedBmp_82();
	this.instance_61.setTransform(538.1,301.75,0.5,0.5);

	this.instance_62 = new lib.CachedBmp_73();
	this.instance_62.setTransform(539,295.5,0.5,0.5);

	this.instance_63 = new lib.CachedBmp_74();
	this.instance_63.setTransform(539.85,289.25,0.5,0.5);

	this.instance_64 = new lib.CachedBmp_75();
	this.instance_64.setTransform(540.6,283.05,0.5,0.5);

	this.instance_65 = new lib.CachedBmp_76();
	this.instance_65.setTransform(541.35,276.8,0.5,0.5);

	this.instance_66 = new lib.CachedBmp_78();
	this.instance_66.setTransform(542,270.55,0.5,0.5);

	this.instance_67 = new lib.CachedBmp_79();
	this.instance_67.setTransform(541.2,278.35,0.5,0.5);

	this.instance_68 = new lib.CachedBmp_80();
	this.instance_68.setTransform(540.25,286.15,0.5,0.5);

	this.instance_69 = new lib.CachedBmp_81();
	this.instance_69.setTransform(539.2,293.95,0.5,0.5);

	this.instance_70 = new lib.CachedBmp_83();
	this.instance_70.setTransform(536.95,309.55,0.5,0.5);

	this.instance_71 = new lib.CachedBmp_84();
	this.instance_71.setTransform(535.7,317.35,0.5,0.5);

	this.instance_72 = new lib.CachedBmp_85();
	this.instance_72.setTransform(534.45,325.15,0.5,0.5);

	this.instance_73 = new lib.CachedBmp_87();
	this.instance_73.setTransform(534.85,332.95,0.5,0.5);

	this.instance_74 = new lib.CachedBmp_88();
	this.instance_74.setTransform(536.55,332.95,0.5,0.5);

	this.instance_75 = new lib.CachedBmp_89();
	this.instance_75.setTransform(538.15,332.95,0.5,0.5);

	this.instance_76 = new lib.CachedBmp_90();
	this.instance_76.setTransform(539.6,332.95,0.5,0.5);

	this.instance_77 = new lib.CachedBmp_91();
	this.instance_77.setTransform(541.05,332.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_8}]},408).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_32}]},11).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_42}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_43}]},26).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_46}]},1).to({state:[{t:this.instance_47}]},1).to({state:[{t:this.instance_48}]},1).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_50}]},1).to({state:[{t:this.instance_51}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_53}]},1).to({state:[{t:this.instance_54}]},1).to({state:[{t:this.instance_55}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_57}]},1).to({state:[{t:this.instance_58}]},1).to({state:[{t:this.instance_59}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_61}]},1).to({state:[{t:this.instance_62}]},1).to({state:[{t:this.instance_63}]},1).to({state:[{t:this.instance_64}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_66}]},11).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_61}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_72}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_73}]},1).to({state:[{t:this.instance_74}]},1).to({state:[{t:this.instance_75}]},1).to({state:[{t:this.instance_76}]},1).to({state:[{t:this.instance_77}]},1).to({state:[{t:this.instance_43}]},1).to({state:[]},46).wait(560));

	// Слой_5
	this.instance_78 = new lib.ПилотВерх();
	this.instance_78.setTransform(632.05,98.55,1.2058,1.2058,0,0,0,79,84.4);
	this.instance_78._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_78).wait(229).to({_off:false},0).wait(8).to({y:-27},30).to({y:98.55},29).wait(9).to({y:-27},26).wait(2).to({y:98.55},29).to({_off:true},46).wait(729));

	// Слой_4
	this.instance_79 = new lib.ПилотНиз();
	this.instance_79.setTransform(650.35,547.3,1.2058,1.2058,0,0,0,177.5,278.2);
	this.instance_79._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_79).wait(229).to({_off:false},0).to({y:535.85},8).to({y:410.3},30).to({y:547.3},29).to({y:535.85},9).to({y:410.3},26).wait(2).to({y:547.3},29).to({_off:true},46).wait(729));

	// Слой_3
	this.instance_80 = new lib.Анимация1("synched",0);
	this.instance_80.setTransform(559.2,681.2,1.4564,1.4564);

	this.timeline.addTween(cjs.Tween.get(this.instance_80).wait(82).to({startPosition:0},0).to({scaleX:1.1756,scaleY:1.1756,x:559.25},10).to({regX:0.1,regY:0.1,scaleX:0.9008,scaleY:0.9008,x:559.4,y:656.85},32).wait(39).to({regX:0,regY:0,scaleX:1.4564,scaleY:1.4564,x:559.2,y:681.2},0).to({scaleX:1.1756,scaleY:1.1756,x:559.25},10).to({regX:0.1,regY:0.1,scaleX:0.9008,scaleY:0.9008,x:559.4,y:656.85},32).to({_off:true},23).wait(909));

	// Слой_1
	this.instance_81 = new lib.CachedBmp_43();
	this.instance_81.setTransform(75.7,231.5,0.5,0.5);

	this.instance_82 = new lib.CachedBmp_95();
	this.instance_82.setTransform(75.7,231.5,0.5,0.5);

	this.instance_83 = new lib.CachedBmp_44();
	this.instance_83.setTransform(75.7,231.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_81}]}).to({state:[{t:this.instance_82}]},82).to({state:[{t:this.instance_83}]},10).to({state:[{t:this.instance_82}]},71).to({state:[{t:this.instance_82}]},10).to({state:[]},55).wait(909));

	// Piano
	this.instance_84 = new lib.Клавиша();
	this.instance_84.setTransform(530.6,232.2,1,1,0,0,0,64.9,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_84).wait(92).to({regY:0.1,scaleY:0.9348,y:232.3},32).wait(39).to({regY:0,scaleY:1,y:232.2},0).wait(10).to({regY:0.1,scaleY:0.9348,y:232.3},32).to({_off:true},23).wait(909));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-428.4,-80.2,2099,2079.5);
// library properties:
lib.properties = {
	id: '9CED2F8263B1C54A86059CC4467D3082',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_95.png", id:"CachedBmp_95"},
		{src:"images/CachedBmp_44.png", id:"CachedBmp_44"},
		{src:"images/CachedBmp_43.png", id:"CachedBmp_43"},
		{src:"images/CachedBmp_46.png", id:"CachedBmp_46"},
		{src:"images/CachedBmp_1.png", id:"CachedBmp_1"},
		{src:"images/CachedBmp_2.png", id:"CachedBmp_2"},
		{src:"images/animation_atlas_1.png", id:"animation_atlas_1"},
		{src:"images/animation_atlas_2.png", id:"animation_atlas_2"},
		{src:"images/animation_atlas_3.png", id:"animation_atlas_3"},
		{src:"images/animation_atlas_4.png", id:"animation_atlas_4"},
		{src:"images/animation_atlas_5.png", id:"animation_atlas_5"},
		{src:"images/animation_atlas_6.png", id:"animation_atlas_6"},
		{src:"images/animation_atlas_7.png", id:"animation_atlas_7"},
		{src:"sounds/_1.mp3", id:"_1"},
		{src:"sounds/_3.mp3", id:"_3"},
		{src:"sounds/_4.mp3", id:"_4"},
		{src:"sounds/_6.mp3", id:"_6"},
		{src:"sounds/_2.mp3", id:"_2"},
		{src:"sounds/_5.mp3", id:"_5"},
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