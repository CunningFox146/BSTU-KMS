(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


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


(lib.hover = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhXBYQgkgkAAg0QAAgzAkgkQAkgkAzAAQA0AAAkAkQAkAkAAAzQAAA0gkAkQgkAkg0AAQgzAAgkgkg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.hover, new cjs.Rectangle(-12.4,-12.4,24.8,24.8), null);


// stage content:
(lib.station = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		stage.enableMouseOver();
		
		const BASIC_COLOR = "black";
		const HOVER_COLOR = "red";
		const HOVER_SCALE = 1.5;
		
		// JS круто, спасибо наследованию контекста
		var CreateHint = (number) => {
			var text = this["Text_" + number];
			var hover = this["Hover_" + number];
			
			hover.alpha = 0.1;
			hover.stop();
			
			console.log(hover);
				
			hover.addEventListener("mouseover", () => {
				text.color = HOVER_COLOR;
				text.scale = HOVER_SCALE;
				
				text.setTransform(text.x, text.y, HOVER_SCALE, HOVER_SCALE);
			});
			hover.addEventListener("mouseout", () => {
				text.color = BASIC_COLOR;
				text.setTransform(text.x, text.y, 1, 1);
			});
			
			text.addEventListener("mouseover", () => {
				hover.alpha = 0.75;
				hover.shape.graphics._fill.style = "red"
			});
			text.addEventListener("mouseout", () => {
				hover.alpha = 0.1;
				hover.shape.graphics._fill.style = "black"
				//hover.goToAndStop(0);
			});
		}
		
		for (var i = 1; i <= 13; i++){
			CreateHint(i);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Hover
	this.Hover_12 = new lib.hover();
	this.Hover_12.name = "Hover_12";
	this.Hover_12.parent = this;
	this.Hover_12.setTransform(123.6,90.5);

	this.Hover_11 = new lib.hover();
	this.Hover_11.name = "Hover_11";
	this.Hover_11.parent = this;
	this.Hover_11.setTransform(123,185.5);

	this.Hover_8 = new lib.hover();
	this.Hover_8.name = "Hover_8";
	this.Hover_8.parent = this;
	this.Hover_8.setTransform(123,219.6);

	this.Hover_2 = new lib.hover();
	this.Hover_2.name = "Hover_2";
	this.Hover_2.parent = this;
	this.Hover_2.setTransform(122.9,273.9);

	this.Hover_13 = new lib.hover();
	this.Hover_13.name = "Hover_13";
	this.Hover_13.parent = this;
	this.Hover_13.setTransform(121.7,365.3);

	this.Hover_1 = new lib.hover();
	this.Hover_1.name = "Hover_1";
	this.Hover_1.parent = this;
	this.Hover_1.setTransform(407.2,409);

	this.Hover_5 = new lib.hover();
	this.Hover_5.name = "Hover_5";
	this.Hover_5.parent = this;
	this.Hover_5.setTransform(407.2,365.3);

	this.Hover_10 = new lib.hover();
	this.Hover_10.name = "Hover_10";
	this.Hover_10.parent = this;
	this.Hover_10.setTransform(407.2,337.1);

	this.Hover_9 = new lib.hover();
	this.Hover_9.name = "Hover_9";
	this.Hover_9.parent = this;
	this.Hover_9.setTransform(407.2,306.9);

	this.Hover_7 = new lib.hover();
	this.Hover_7.name = "Hover_7";
	this.Hover_7.parent = this;
	this.Hover_7.setTransform(407.9,277.3);

	this.Hover_6 = new lib.hover();
	this.Hover_6.name = "Hover_6";
	this.Hover_6.parent = this;
	this.Hover_6.setTransform(407.9,247.2);

	this.Hover_3 = new lib.hover();
	this.Hover_3.name = "Hover_3";
	this.Hover_3.parent = this;
	this.Hover_3.setTransform(407.9,216.4);

	this.Hover_4 = new lib.hover();
	this.Hover_4.name = "Hover_4";
	this.Hover_4.parent = this;
	this.Hover_4.setTransform(407.9,21.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.Hover_4},{t:this.Hover_3},{t:this.Hover_6},{t:this.Hover_7},{t:this.Hover_9},{t:this.Hover_10},{t:this.Hover_5},{t:this.Hover_1},{t:this.Hover_13},{t:this.Hover_2},{t:this.Hover_8},{t:this.Hover_11},{t:this.Hover_12}]}).wait(1));

	// Text
	this.Text_13 = new cjs.Text("text1", "25px 'Roboto'");
	this.Text_13.name = "Text_13";
	this.Text_13.lineHeight = 32;
	this.Text_13.parent = this;
	this.Text_13.setTransform(512.7,418.7);

	this.Text_2 = new cjs.Text("text1", "25px 'Roboto'");
	this.Text_2.name = "Text_2";
	this.Text_2.lineHeight = 32;
	this.Text_2.parent = this;
	this.Text_2.setTransform(512.7,45.4);

	this.Text_3 = new cjs.Text("text1", "25px 'Roboto'");
	this.Text_3.name = "Text_3";
	this.Text_3.lineHeight = 32;
	this.Text_3.parent = this;
	this.Text_3.setTransform(512.7,79.3);

	this.Text_4 = new cjs.Text("text1", "25px 'Roboto'");
	this.Text_4.name = "Text_4";
	this.Text_4.lineHeight = 32;
	this.Text_4.parent = this;
	this.Text_4.setTransform(512.7,113.2);

	this.Text_5 = new cjs.Text("text1", "25px 'Roboto'");
	this.Text_5.name = "Text_5";
	this.Text_5.lineHeight = 32;
	this.Text_5.parent = this;
	this.Text_5.setTransform(512.7,147.1);

	this.Text_6 = new cjs.Text("text1", "25px 'Roboto'");
	this.Text_6.name = "Text_6";
	this.Text_6.lineHeight = 32;
	this.Text_6.parent = this;
	this.Text_6.setTransform(512.7,181);

	this.Text_7 = new cjs.Text("text1", "25px 'Roboto'");
	this.Text_7.name = "Text_7";
	this.Text_7.lineHeight = 32;
	this.Text_7.parent = this;
	this.Text_7.setTransform(512.7,214.9);

	this.Text_8 = new cjs.Text("text1", "25px 'Roboto'");
	this.Text_8.name = "Text_8";
	this.Text_8.lineHeight = 32;
	this.Text_8.parent = this;
	this.Text_8.setTransform(512.7,248.8);

	this.Text_9 = new cjs.Text("text1", "25px 'Roboto'");
	this.Text_9.name = "Text_9";
	this.Text_9.lineHeight = 32;
	this.Text_9.parent = this;
	this.Text_9.setTransform(512.7,282.7);

	this.Text_10 = new cjs.Text("text1", "25px 'Roboto'");
	this.Text_10.name = "Text_10";
	this.Text_10.lineHeight = 32;
	this.Text_10.parent = this;
	this.Text_10.setTransform(512.7,316.6);

	this.Text_11 = new cjs.Text("text1", "25px 'Roboto'");
	this.Text_11.name = "Text_11";
	this.Text_11.lineHeight = 32;
	this.Text_11.parent = this;
	this.Text_11.setTransform(512.7,350.5);

	this.Text_12 = new cjs.Text("text1", "25px 'Roboto'");
	this.Text_12.name = "Text_12";
	this.Text_12.lineHeight = 32;
	this.Text_12.parent = this;
	this.Text_12.setTransform(512.7,384.4);

	this.Text_1 = new cjs.Text("text1", "25px 'Roboto'");
	this.Text_1.name = "Text_1";
	this.Text_1.lineHeight = 32;
	this.Text_1.parent = this;
	this.Text_1.setTransform(512.7,11.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.Text_1},{t:this.Text_12},{t:this.Text_11},{t:this.Text_10},{t:this.Text_9},{t:this.Text_8},{t:this.Text_7},{t:this.Text_6},{t:this.Text_5},{t:this.Text_4},{t:this.Text_3},{t:this.Text_2},{t:this.Text_13}]}).wait(1));

	// bg
	this.instance = new lib.pianomechanics();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(512,342,1024,684);
// library properties:
lib.properties = {
	id: 'A3EB77F8F674D74987ADE9FB72E182DF',
	width: 1024,
	height: 684,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/pianomechanics.png?1633262214180", id:"pianomechanics"}
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
	getStage: function() { return exportRoot.getStage(); },
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



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;