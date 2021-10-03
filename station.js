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


(lib.text_9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.498)").s().p("AgFBIQgFgDgDgGQgCgGAAgMIAAhKIgSAAIAAgEQAHgDAHgGQAHgHAFgIQADgFAEgMIAEAAIAAAkIAaAAIAAAJIgaAAIAABHQAAALADAEQADAEAFAAQAEAAAEgDQAEgCACgFIAFAAQgFAMgIAGQgHAGgJAAQgFAAgFgDg");
	this.shape.setTransform(14,1.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.498)").s().p("AgWA4IgGgCQgDAAgCADIgEAAIAAgnIAEAAQAEARAKAIQAJAJALAAQAJAAAFgFQAFgFAAgHQAAgIgGgGQgGgGgQgJQgSgHgGgHQgFgHAAgLQAAgOAJgJQAKgJAPAAQAFAAAKACIAIACIADgBIADgDIAEAAIAAAmIgEAAQgFgSgHgHQgHgGgLAAQgIAAgFAEQgGAFAAAFQAAAHAEAFQAEAFAMAGIAQAIQAZALAAAUQAAAPgLAKQgMAJgOAAQgJAAgOgDg");
	this.shape_1.setTransform(5.6,2.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.498)").s().p("AggAsQgOgQAAgbQAAgbAOgQQAPgQAVAAQATAAAMAMQAMAMAAAVIhMAAQAAAYAMAOQAMAOAQAAQALAAAIgGQAIgGAFgOIAEACQgCARgNANQgMAOgTAAQgTAAgOgPgAgUgqQgIAIgBAOIAzAAQgBgLgCgEQgDgHgGgEQgGgEgGAAQgKAAgIAIg");
	this.shape_2.setTransform(-4.8,2.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.498)").s().p("AgFBIQgFgDgDgGQgCgGAAgMIAAhKIgSAAIAAgEQAHgDAHgGQAHgHAFgIQADgFAEgMIAEAAIAAAkIAaAAIAAAJIgaAAIAABHQAAALADAEQADAEAFAAQAEAAAEgDQAEgCACgFIAFAAQgFAMgIAGQgHAGgJAAQgFAAgFgDg");
	this.shape_3.setTransform(-13.8,1.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.text_9, new cjs.Rectangle(-19.4,-15.8,39,31.7), null);


(lib.hover = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(93,72,113,0.498)").s().p("AiWCWQg/g9ABhZQgBhYA/g+QA+g/BYABQBZgBA9A/QBAA+gBBYQABBZhAA9Qg9BAhZgBQhYABg+hAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.hover, new cjs.Rectangle(-21.3,-21.3,42.7,42.7), null);


// stage content:
(lib.station = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		stage.enableMouseOver(60);
		
		// JS круто, спасибо наследованию контекста
		var CreateHint = (number) => {
			var text = this["Text_" + 9];
			var hover = this["Hover_" + number];
		
			text.visible = false;
			hover.alpha = 0.1;
			hover.addEventListener("mouseover", () => text.visible = true);
			hover.addEventListener("mouseout", () => text.visible = false);
		}
		
		for (var i = 1; i <= 13; i++){
			CreateHint(i);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Text
	this.Text_9 = new lib.text_9();
	this.Text_9.name = "Text_9";
	this.Text_9.parent = this;
	this.Text_9.setTransform(560.5,66.2);

	this.timeline.addTween(cjs.Tween.get(this.Text_9).wait(1));

	// Buttons
	this.Hover_13 = new lib.hover();
	this.Hover_13.name = "Hover_13";
	this.Hover_13.parent = this;
	this.Hover_13.setTransform(119.8,367,0.663,0.569);

	this.Hover_2 = new lib.hover();
	this.Hover_2.name = "Hover_2";
	this.Hover_2.parent = this;
	this.Hover_2.setTransform(122,273.7,0.663,0.569);

	this.Hover_8 = new lib.hover();
	this.Hover_8.name = "Hover_8";
	this.Hover_8.parent = this;
	this.Hover_8.setTransform(122,219.1,0.663,0.569);

	this.Hover_11 = new lib.hover();
	this.Hover_11.name = "Hover_11";
	this.Hover_11.parent = this;
	this.Hover_11.setTransform(122,183.2,0.663,0.569);

	this.Hover_12 = new lib.hover();
	this.Hover_12.name = "Hover_12";
	this.Hover_12.parent = this;
	this.Hover_12.setTransform(122,89.6,0.663,0.569);

	this.Hover_4 = new lib.hover();
	this.Hover_4.name = "Hover_4";
	this.Hover_4.parent = this;
	this.Hover_4.setTransform(407.5,21.7,0.663,0.569);

	this.Hover_1 = new lib.hover();
	this.Hover_1.name = "Hover_1";
	this.Hover_1.parent = this;
	this.Hover_1.setTransform(406.5,408.5,0.663,0.569);

	this.Hover_5 = new lib.hover();
	this.Hover_5.name = "Hover_5";
	this.Hover_5.parent = this;
	this.Hover_5.setTransform(406.5,363.7,0.663,0.569);

	this.Hover_10 = new lib.hover();
	this.Hover_10.name = "Hover_10";
	this.Hover_10.parent = this;
	this.Hover_10.setTransform(406.5,336.2,0.663,0.569);

	this.Hover_3 = new lib.hover();
	this.Hover_3.name = "Hover_3";
	this.Hover_3.parent = this;
	this.Hover_3.setTransform(406.5,215.9,0.663,0.569);

	this.Hover_6 = new lib.hover();
	this.Hover_6.name = "Hover_6";
	this.Hover_6.parent = this;
	this.Hover_6.setTransform(406.5,246.7,0.663,0.569);

	this.Hover_7 = new lib.hover();
	this.Hover_7.name = "Hover_7";
	this.Hover_7.parent = this;
	this.Hover_7.setTransform(406.5,277.8,0.663,0.663);

	this.Hover_9 = new lib.hover();
	this.Hover_9.name = "Hover_9";
	this.Hover_9.parent = this;
	this.Hover_9.setTransform(407.1,307.2,0.632,0.632,0,0,0,0,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.Hover_9},{t:this.Hover_7},{t:this.Hover_6},{t:this.Hover_3},{t:this.Hover_10},{t:this.Hover_5},{t:this.Hover_1},{t:this.Hover_4},{t:this.Hover_12},{t:this.Hover_11},{t:this.Hover_8},{t:this.Hover_2},{t:this.Hover_13}]}).wait(1));

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
		{src:"images/pianomechanics.png?1633255882812", id:"pianomechanics"}
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