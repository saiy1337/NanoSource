//Helpers^
// gaycode v1
'using strict';

let _styleTag1 = document.createElement('style');
_styleTag1.id = 'nano-domTest-3';
document.head.appendChild(_styleTag1);
function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
let input = {
  'amt': 0,
  'str': "",
  'array': []
};
let click = false;
var aoc = false;
var aod = false;
var initialized = false;
var handler;
let guild;
let channel;
let handle;
let scrollMenu = false;
let saveChanges = false;
let clickedNanite = 0;
let mMenu = false;
let gifList = ['https://i.imgur.com/FLdcbL8.gif', 'https://i.imgur.com/8mOG9DM.gif', 'https://i.imgur.com/U3E3R57.gif']
let events = {
  'Friend Accepted': 'friend_Friend-Accepted',
  'Accepts Friend': 'friend_Accepts-Friend',
  'Received FR': 'friend_Received-FR',
  'Joined Server': 'guild_Joined-Server',
  'Left Server': 'guild_Left-Server',
  'Joined Group': 'group_Joined-Group',
  'User Messaged': 'group_User-Messaged',
}
let actions = {
  'Message': 'msg',
  'Create Group': 'createGroup',
  'Send Friend Request': 'sendFR'
}
class Helpers {

  constructor() {
    this.localChannelId = window.location.pathname.split('/')[3];


  }

  get _sendAsClydeRaw() {
    return NANO._sendAsClydeRaw;
  }
  get _fakeMessageRaw() {
    return NANO._fakeMessageRaw;
  }
  awaitResponse() {

  }



  get _sendFakeMessage(message) {
    return NANO.FakeMessage(message)

  }

  createElement(text) {
    return document.createRange().createContextualFragment(text);
  }
  createMenuItem(name, metaname, icon, mint = false) {

    if (this._modal) {
      let newMint = ``;
      if (mint == true) {
        newMint = `<div class="wrapper-232cHJ tabBadge-3smxHS" style="
        position: relative;
        right: 20px;
    ">new</div>`;
      }
      let menuItem = `<div class="channel-2QD9_O menuoption menu-option-nanite-${metaname}" style="
      width: 350px;
      margin-bottom: 10px;
  "><a href="/activity"><div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 31px;right: 5px;background-repeat: no-repeat;background-image: url(&quot;${icon}&quot;);"></div><div class="name-2WpE7M">${name}</div>${newMint}</a></div>`;
      document.querySelector('.menuspan').appendChild(NANO.Helpers.createElement(menuItem));
      /*  */
    }
  }
  createStatus(context, n) {
    if (this._modal && n != true) this.destroyModal();
    if (this._status) {
      while (this._status.hasChildNodes()) {
        this._status.removeChild(this._status.lastChild);
      }
      if (this._status.parentNode) {
        this._status.parentNode.removeChild(this._status);
      }
    }
    //splashBackground-2kw7XT wrapper-2tiaAq
    const root = document.querySelector('#app-mount > div.theme-dark.popouts-3dRSmE');
    this._status = document.createElement("div");
    this._status.className = "popout-3sVMXz popout-top-left status-popout";
    this._status.style = "box-shadow: 0 0 0 rgba(0,0,0,0), 0 0 0 rgba(0,0,0,0); z-index: 1000; overflow: hidden; visibility: visible; left: 80px; top: 1059.87px; height: 89px; width: 217px; transform: translateY(-100%) translateX(0%) translateZ(0px);";
    this._status.innerHTML = context;

    root.appendChild(this._status);
    setTimeout(() => {
      while (this._status.hasChildNodes()) {
        this._status.removeChild(this._status.lastChild);
      }
      if (this._status.parentNode) {
        this._status.parentNode.removeChild(this._status);
      }
    }, 5000);
  }

  createModal(content, height, width) {
    return new Promise((resolve, reject) => {
      const root = document.querySelector('#app-mount > div');
      //line-height: 0px
      //
      if (this._modal) this.destroyModal();
      this._modal = this.createElement(`
            <div class="theme-dark NANO-modal">
                <div class="callout-backdrop"></div>
                <div class="modal-1UGdnR" style="opacity: 1">
                    <div class="inner-1JeGVc NANO-modal-inner expanded">
                        <div class="modal-3HD5ck modal-1sor29 size-JLvFeT NANO-modal-inner-1" style="height: ${height}px; width: ${width}px;">
                            ${content}
                        </div>
                    </div>
                </div>
            </div>
        `);

      if (!this._hasSetKeyListener) {
        document.body.addEventListener('keyup', this._modalKeypress.bind(this));
        document.body.addEventListener('click', this.destroyModal.bind(this));
        this._hasSetKeyListener = true;
      }
      root.appendChild(this._modal);
      this._modal = root.querySelector('.NANO-modal');
      let backdrop = this._modal.querySelector('.callout-backdrop');
      setTimeout(() => {
        backdrop.style.opacity = 0.60;
      }, 1);
      this._modal.querySelector('.NANO-modal-inner').addEventListener('click', event => {
        event.stopPropagation();
      });
      let close = this._modal.querySelector('.NANO-modal-close-button');
      if (close) close.addEventListener('click', this.destroyModal.bind(this));
      resolve();
    });
  }
  makeNaniteList() {
    let testThis = this;
    this._nanites = document.querySelector('.small-1ChI_fNanites');
    console.log(document.querySelector('.small-1ChI_fNanites'));
    this._nanites.addEventListener('click', event => {

      NANO.consoleClient.write("getServers");
      if (this._naniteList) {
        this.destroyList();
        return;
      }
      new Promise((resolve, reject) => {//initiate-menu-options
        event.stopPropagation();
        let rank = ``;
        let extra = ``;
        let workshop = ``;

        if (NANO.rank) {
          if (NANO.rank == 'Overlord') {
            rank = '<ul class="root-3-B5F3 flex-1O1GKY wrap-ZIn9Iy rolesList-22qj2L endBodySection-Rf4s-7 marginBottom20-32qID7"><li class="role-2irmRk flex-1O1GKY alignCenter-1dQNNs" style="border-color: rgba(231, 76, 60, 0.6);margin-top: 15px;margin-left: 10px;"><button class="roleCircleButton-377y0l roleCircle-3xAZ1j flex-1O1GKY alignCenter-1dQNNs justifyCenter-3D2jYp" style="background-color: rgb(231, 76, 60);"><svg viewBox="0 0 12 12" name="Close" class="roleRemoveIcon-2-TeGW" width="12" height="12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="#ffffff" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg></button><div class="roleName-32vpEy">Overlord</div></li></ul>'

            /*   document.querySelector('.guild-1EfMGQ').innerHTML = `<div class = "wrapper-3JPufy accountBtn-2Nozo3">
                <button class = "inner-2Y6JuD accountBtnInner-sj5jLs testBTN" type = "button" style = "background-image: url("/assets/edbbf6107b2cd4334d582b26e1ac786d.png");">
                </button>
                </div>`;
                document.querySelector('.testBTN').addEventListener('click',(event)=>{
                  event.stopPropagation();
                  NANO.consoleClient.write('>test');
                }); */
            try {

              document.querySelector('.wrapper-2F3Zv8.small-5Os1Bb.avatar-3JE4B3.avatarSmall-3ACRaI').addEventListener('click', (event) => {
                event.stopPropagation();
                event.preventDefault();
                NANO.consoleClient.write('>test');
                NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
              <div class="item-1GzJrl item-status">
              <div class="statusIconText-3b4TkH">
              <span class="status status-nanite" style="margin-right: 14px;"></span>
              <div>Test</div>
              </div>
              <div class="helper-2c73HK">Test ran successfully!</div>
              </div>
              </div>`);
              });
            }
            catch (e) {

            }
          }
          else if (NANO.rank == 'Cyborg') {
            rank = `<ul class="root-3-B5F3 flex-1O1GKY wrap-ZIn9Iy rolesList-22qj2L endBodySection-Rf4s-7 marginBottom20-32qID7"><li class="role-2irmRk flex-1O1GKY alignCenter-1dQNNs" style="border-color: rgba(253, 111, 112, 0.6);margin-top: 15px;margin-left: 10px;"><button class="roleCircleButton-377y0l roleCircle-3xAZ1j flex-1O1GKY alignCenter-1dQNNs justifyCenter-3D2jYp" style="background-color: rgb(253, 111, 112);"><svg viewBox="0 0 12 12" name="Close" class="roleRemoveIcon-2-TeGW" width="12" height="12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="#ffffff" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg></button><div class="roleName-32vpEy">Cyborg</div></li></ul>`
          }
          else if (NANO.rank == 'Automaton') {
            rank = `<ul class="root-3-B5F3 flex-1O1GKY wrap-ZIn9Iy rolesList-22qj2L endBodySection-Rf4s-7 marginBottom20-32qID7"><li class="role-2irmRk flex-1O1GKY alignCenter-1dQNNs" style="border-color: rgba(9, 9, 9, 0.6);margin-top: 15px;margin-left: 10px;"><button class="roleCircleButton-377y0l roleCircle-3xAZ1j flex-1O1GKY alignCenter-1dQNNs justifyCenter-3D2jYp" style="background-color: rgb(9, 9, 9);"><svg viewBox="0 0 12 12" name="Close" class="roleRemoveIcon-2-TeGW" width="12" height="12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="#ffffff" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg></button><div class="roleName-32vpEy">Automaton</div></li></ul>`

          }
          else if (NANO.rank == 'Generator') {
            rank = `<ul class="root-3-B5F3 flex-1O1GKY wrap-ZIn9Iy rolesList-22qj2L endBodySection-Rf4s-7 marginBottom20-32qID7"><li class="role-2irmRk flex-1O1GKY alignCenter-1dQNNs" style="border-color: rgba(68,204,90, 0.6);margin-top: 15px;margin-left: 10px;"><button class="roleCircleButton-377y0l roleCircle-3xAZ1j flex-1O1GKY alignCenter-1dQNNs justifyCenter-3D2jYp" style="background-color: rgb(68,204,90);"><svg viewBox="0 0 12 12" name="Close" class="roleRemoveIcon-2-TeGW" width="12" height="12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="#ffffff" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg></button><div class="roleName-32vpEy">Generator</div></li></ul>`
          }
          else {
            extra = '';
            workshop = `<div style="
          height: 45px;
          " class="menuoption menu-option-nanite-workshop">
          <div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                                      <a class="" style="position: relative; bottom: 20px;">
              <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 25px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/vaTpgUa.png&quot;);"></div>
              <div class="name-2WpE7M channel-name">Workshop</div>
           </a>
          </div>
          </div>`;
            rank = `<ul class="root-3-B5F3 flex-1O1GKY wrap-ZIn9Iy rolesList-22qj2L endBodySection-Rf4s-7 marginBottom20-32qID7"><li class="role-2irmRk flex-1O1GKY alignCenter-1dQNNs" style="border-color: rgba(122,129,253, 0.6);"><button class="roleCircleButton-377y0l roleCircle-3xAZ1j flex-1O1GKY alignCenter-1dQNNs justifyCenter-3D2jYp" style="background-color: rgb(122,129,253);"><svg viewBox="0 0 12 12" name="Close" class="roleRemoveIcon-2-TeGW" width="12" height="12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="#ffffff" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg></button><div class="roleName-32vpEy">Nano</div></li></ul>`;
          }
        }
        if (NANO.rank != 'Generator') {


          /*<div class="indicator-1afSc8" style="left: 234px; top: 1020.87px;">
     <div class="animationContainer-C1kDfz animating-1Fb05y highPriority-2lg-eA">
        <div>
           <div class="top-3fo3zT animating-1Fb05y"></div>
           <div class="bottom-UE1eOv animating-1Fb05y"></div>
        </div>
        <div class="innerCircle-2Tsscg animating-1Fb05y highPriority-2lg-eA"></div>
        <div class="outerCircle-2K0c82 animating-1Fb05y highPriority-2lg-eA"></div>
     </div>
  </div> */
          NANO.Helpers.createModal(`<div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-1R_AjF" style="flex: 0 0 auto;">
<div class="flexChild-faoVW3" style="flex: 1 1 auto;">
<h4 class="title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh4-2vWMG5 marginReset-236NPn" style="line-height: 0px;text-align: center; font-size: 25px;"> NANO
</h4>
<div class="date-2WJGyu small-29zrCQ size12-3R0845 height16-2Lv3qA primary-jw0I4K" style="text-align: center; font-size: 15px;">Where the magic happens</div>
</div>
<svg class="close-18n9bP flexChild-faoVW3 NANO-modal-close-button" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="currentColor" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg>
</div>
<div class="scrollerWrap-2lJEkd content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d nanite-menu">
<div class="wrapper-1Rf91z"><div class="unreadMentionsIndicatorTop-gA6RCh"><div class="bar-30k2ka unreadMentionsBar-1VrBNe unread-1xRYoj active-1SSsBb" style="transform: translateY(-180%);"><span class="text-2e2ZyG"></span></div></div><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix scrollerWrap-1IAIlv scrollerThemed-2oenus themeGhostHairline-DBD-2d"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl scroller-2TZvBN"><div class="listItem-2P_4kh"><div class="pill-31IEus wrapper-sa6paO"><span class="item-2hkk8m" style="opacity: 0; height: 8px; transform: translate3d(-4px, 0px, 0px);"></span></div><div class="blobContainer-239gwq" draggable="true"><div class="wrapper-25eVIn"><svg width="48" height="48" viewBox="0 0 48 48" class="svg-1X37T1"><mask id="5bf6ac63-f085-4ac7-96c4-52be16d0eb49" fill="black" x="0" y="0" width="48" height="48"><path d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z" fill="white"></path><rect x="28" y="-4" width="24" height="24" rx="12" ry="12" transform="translate(20 -20)" fill="black"></rect><rect x="28" y="28" width="24" height="24" rx="12" ry="12" transform="translate(20 20)" fill="black"></rect></mask><foreignObject mask="url(#5bf6ac63-f085-4ac7-96c4-52be16d0eb49)" x="0" y="0" width="48" height="48"><a class="wrapper-1BJsBx" aria-label="droop" href="/channels/570232404263043072/570232404263043074" style=""><img class="icon-27yU2q" src="https://cdn.discordapp.com/icons/570232404263043072/3a7fcd29579a347baa259d7de065b1d1.webp?" alt="Server Icon" width="48" height="48"></a></foreignObject></svg><div class="badgeWrapper-3e8pMZ"></div></div></div></div><div class="listItem-2P_4kh"><div class="guildSeparator-3s64Iy"></div></div><div class="listItem-2P_4kh"><div class="pill-31IEus wrapper-sa6paO"><span class="item-2hkk8m" style="opacity: 1; height: 40px; transform: translate3d(0px, 0px, 0px);"></span></div><div class="blobContainer-239gwq" draggable="true"><div class="wrapper-25eVIn"><svg width="48" height="48" viewBox="0 0 48 48" class="svg-1X37T1"><mask id="08c7b734-0a38-41d5-8996-473818040cea" fill="black" x="0" y="0" width="48" height="48"><path d="M0 24C0 16.5449 0 12.8174 1.21793 9.87706C2.84183 5.95662 5.95662 2.84183 9.87706 1.21793C12.8174 0 16.5449 0 24 0C31.4551 0 35.1826 0 38.1229 1.21793C42.0434 2.84183 45.1582 5.95662 46.7821 9.87706C48 12.8174 48 16.5449 48 24C48 31.4551 48 35.1826 46.7821 38.1229C45.1582 42.0434 42.0434 45.1582 38.1229 46.7821C35.1826 48 31.4551 48 24 48C16.5449 48 12.8174 48 9.87706 46.7821C5.95662 45.1582 2.84183 42.0434 1.21793 38.1229C0 35.1826 0 31.4551 0 24Z" fill="white"></path><rect x="28" y="-4" width="24" height="24" rx="12" ry="12" transform="translate(20 -20)" fill="black"></rect><rect x="28" y="28" width="24" height="24" rx="12" ry="12" transform="translate(20 20)" fill="black"></rect></mask><foreignObject mask="url(#08c7b734-0a38-41d5-8996-473818040cea)" x="0" y="0" width="48" height="48"><a class="wrapper-1BJsBx" aria-label="drench" href="/channels/569651270646759426/569651270646759430" style=""><img class="icon-27yU2q" src="https://cdn.discordapp.com/icons/569651270646759426/025bf405092fa8ce0c7020a06782cd4d.webp?" alt="Server Icon" width="48" height="48"></a></foreignObject></svg><div class="badgeWrapper-3e8pMZ"></div></div></div></div><div class="listItem-2P_4kh"><div class="pill-31IEus wrapper-sa6paO"><span class="item-2hkk8m" style="opacity: 0; height: 8px; transform: translate3d(-4px, 0px, 0px);"></span></div><div class="blobContainer-239gwq" draggable="true"><div class="wrapper-25eVIn"><svg width="48" height="48" viewBox="0 0 48 48" class="svg-1X37T1"><mask id="09dc4314-238f-4ed4-bb4a-2b948ab5b7e3" fill="black" x="0" y="0" width="48" height="48"><path d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z" fill="white"></path><rect x="28" y="-4" width="24" height="24" rx="12" ry="12" transform="translate(20 -20)" fill="black"></rect><rect x="28" y="28" width="24" height="24" rx="12" ry="12" transform="translate(20 20)" fill="black"></rect></mask><foreignObject mask="url(#09dc4314-238f-4ed4-bb4a-2b948ab5b7e3)" x="0" y="0" width="48" height="48"><a class="wrapper-1BJsBx" aria-label="nan" href="/channels/570216860792913931/570216860792913935" style=""><img class="icon-27yU2q" src="https://cdn.discordapp.com/icons/570216860792913931/adf28be752499c4242de4c899285d4d6.webp?" alt="Server Icon" width="48" height="48"></a></foreignObject></svg><div class="badgeWrapper-3e8pMZ"></div></div></div></div><div class="listItem-2P_4kh"><div class="pill-31IEus wrapper-sa6paO"><span class="item-2hkk8m" style="opacity: 0; height: 8px; transform: translate3d(-4px, 0px, 0px);"></span></div><div class="blobContainer-239gwq" draggable="true"><div class="wrapper-25eVIn"><svg width="48" height="48" viewBox="0 0 48 48" class="svg-1X37T1"><mask id="2b07f1a0-01a0-4fb5-a5db-797eee841b01" fill="black" x="0" y="0" width="48" height="48"><path d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z" fill="white"></path><rect x="28" y="-4" width="24" height="24" rx="12" ry="12" transform="translate(20 -20)" fill="black"></rect><rect x="28" y="28" width="24" height="24" rx="12" ry="12" transform="translate(20 20)" fill="black"></rect></mask><foreignObject mask="url(#2b07f1a0-01a0-4fb5-a5db-797eee841b01)" x="0" y="0" width="48" height="48"><a class="wrapper-1BJsBx" aria-label="qua" href="/channels/570216793730187294/570216793730187296" style=""><img class="icon-27yU2q" src="https://cdn.discordapp.com/icons/570216793730187294/007b351aa17c60c1f21b868758b6be01.webp?" alt="Server Icon" width="48" height="48"></a></foreignObject></svg><div class="badgeWrapper-3e8pMZ"></div></div></div></div></div></div><div class="unreadMentionsIndicatorBottom-BXS58x"><div class="bar-30k2ka unreadMentionsBar-1VrBNe unread-1xRYoj active-1SSsBb" style="transform: translateY(180%);"><span class="text-2e2ZyG"></span></div></div></div>
<div class="channels-Ie2l6A vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="padding-right: 100px;">
<div class="privateChannels-1nO12o private-channels privateChannels0" style=" width: 330px;">


<div class="scrollerWrap-2lJEkd scrollerThemed-2oenus themeGhostHairline-DBD-2d scrollerFade-1Ijw5y menuDivWrap0" style="white-space: normal;">
<div class="scroller-2FKFPG menuDivWrap menuspan" style="margin-right: -100px;">




</div>
</div>

</div>

<div class="container-2Thooq" style="
width: 320px;
">
<div class="wrapper-2F3Zv8 small-5Os1Bb avatar-3JE4B3 avatarSmall-3ACRaI">
<div user="${NANO.username}" status="online" class="inner-1W0Bkn animate-2NjJXG" style="background-image: url(&quot;${NANO.avatar}&quot;);"></div>
<div class="online-2S838R status-oxiHuE small-5Os1Bb animate-iYrs3- status-2zcSVk status-2kJpnA"></div>
</div>
<div class="accountDetails-3k9g4n nameTag-m8r81H"><span class="username" style="
/* padding-top: 20px; */
position: relative;
top: 25px;
right: -5px;
margin-left: 10px;
">${NANO.username}</span>${rank}</div>
<div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 0 1 auto;"></div>
<div class="flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-2lU_20 value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX themeSwitch-0" tabindex="0" style="flex: 0 0 auto;"><input id="1" class="checkboxEnabled-CtinEn checkbox-2tyjJg" type="checkbox" tabindex="-1"></div>
</div>

</div>
<div class="image-3Y4mXQ margin-bottom-40 menu-bg" style="/* flex: 0 1 auto; */position: absolute;width: 380px;height: 282px;left: 450px;bottom: 200px;background-repeat: no-repeat;background-image: url(&quot;${gifList[Math.floor(Math.random() * (gifList.length - 1))]}&quot;);"></div>
<h4 class="title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh4-2vWMG5 marginReset-236NPn menu-title-0" style="line-height: 0px;padding-top: 40px;text-align: center;font-size: 35px;">Hello, ${NANO.username}.</h4>    
</div>`, 800, 890).then(() => {
              //<div class="switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX" tabindex="0"><input id="1" class="checkboxEnabled-CtinEn checkbox-2tyjJg" type="checkbox" tabindex="-1"></div>

              if (NANO.rank == 'Overlord') {
                NANO.Helpers.createMenuItem('Death', 'death', 'https://i.imgur.com/a4FtAzA.png', true);
                NANO.Helpers.createMenuItem('Scream', 'scream', 'https://i.imgur.com/aZirh7m.png', true);
              }
              NANO.Helpers.createMenuItem('Say', 'say', 'https://i.imgur.com/anoQKdW.png', true);
              NANO.Helpers.createMenuItem('Join', 'join', 'https://i.imgur.com/9gDwjFd.png', false);
              NANO.Helpers.createMenuItem('Leave', 'leave', 'https://i.imgur.com/dhBgt5w.png', false);
              NANO.Helpers.createMenuItem('Possess', 'possess', 'https://i.imgur.com/eB9sOJf.png', false);
              NANO.Helpers.createMenuItem('DM', 'dm', 'https://i.imgur.com/av9Ge0a.png', false);
              NANO.Helpers.createMenuItem('Assimilate', 'assimilate', 'https://i.imgur.com/C05Q1yF.png', false);
              NANO.Helpers.createMenuItem('User Attack', 'userattack', 'https://i.imgur.com/wh2oji9.png', false);
              NANO.Helpers.createMenuItem('Server Attack', 'serverattack', 'https://i.imgur.com/id1HTxu.png', false);
              NANO.Helpers.createMenuItem('Friendship', 'frspam', 'https://i.imgur.com/0eAdzU3.png', false);
              NANO.Helpers.createMenuItem('Channel Spy', 'sa-channels', 'https://i.imgur.com/eMZaBVc.png', false);
              NANO.Helpers.createMenuItem('Quick Embed', 'qbed', 'https://i.imgur.com/tyQJsqo.png', false);

              //
              function k1(k) {
                console.log('K1 TOUCHED');
                document.querySelector('.themeSwitch-0').addEventListener('click', event => {
                  event.stopPropagation();
                  if (k > 0) {
                    document.querySelector('.themeSwitch-0').className = `flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-2lU_20 value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX themeSwitch-0`;
                    document.querySelector('.themeSwitch-0').style = `flex: 0 0 auto;`;
                    k1(0);
                  }
                  else {
                    document.querySelector('.themeSwitch-0').className = `switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX themeSwitch-0`;
                    document.querySelector('.themeSwitch-0').style = ``;
                    k1(1);
                  }
                });
              }
              k1(0);
              function mouseOv() {

                let oldColor;

                for (let j = 0; j < 3; j++) {

                  if (document.querySelector('.menu-tab-' + j) != document.querySelector('.tab-selected')) {
                    document.querySelector('.menu-tab-' + j).addEventListener('click', event => {
                      if (document.querySelector('.menu-tab-' + j) == document.querySelector('.menu-tab-2')) { //IF QUANTUM TAB
                        mMenu = false;
                        console.log('TAB 2');
                        document.querySelector('.menu-title-0').innerHTML = 'Quantum';
                        document.querySelector('.menu-title-0').appendChild(NANO.Helpers.createElement(`<div class="date-2WJGyu small-29zrCQ size12-3R0845 height16-2Lv3qA primary-jw0I4K menu-title-1" style="text-align: center;font-size: 15px;padding: 50px 00px 0px 0px;">Bend reality to your will</div>`));
                        document.querySelector('.menu-bg').parentNode.appendChild(NANO.Helpers.createElement(`<div class="image-3Y4mXQ margin-bottom-40 menu-bg" style="position: absolute;width: 550px;height: 500px;left: 350px;bottom: 70px;background-repeat: no-repeat;background-image: url('https://i.imgur.com/NcdmKmU.gif');">
            </div>`));
                        document.querySelector('.menu-bg').parentNode.removeChild(document.querySelector('.menu-bg'));
                        document.querySelector('.menu-bg').style.left = `350px`;
                        try {
                          document.querySelector('.menuspan').parentNode.removeChild(document.querySelector('.menuspan'));
                        }
                        catch (e) {

                        }
                        document.querySelector('.quantumBook').style.backgroundImage = `url('https://i.imgur.com/d1Q3liY.png')`;
                        document.querySelector('.quantumBook').style.backroundRepeat = `no-repeat`;
                        document.querySelector('.menuDivWrap0').appendChild(NANO.Helpers.createElement(`<div class="scroller-2FKFPG menuDivWrap menuspan" style="padding-top: 20px;margin-right: -100px;">
            <div style="
            height: 45px;
            " class="menuoption menu-option-nanite-entanglement">
            <div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                                        <a class="" style="position: relative; bottom: 20px">
                <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 35px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/4b4h7Kq.png&quot;);"></div>
                <div class="name-2WpE7M channel-name">Entanglement</div>
             </a>
                </div>
              </div>
            <div style="
            height: 45px;
            " class="menuoption menu-option-nanite-outage">
            <div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                                        <a class="" style="position: relative; bottom: 20px">
                <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 35px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/mfO0ViH.png&quot;);"></div>
                <div class="name-2WpE7M channel-name">Outage</div>
                </a>
                </div>
              </div>
            </div>`));
                        //https://i.imgur.com/d1Q3liY.png
                      }
                      else if (document.querySelector('.menu-tab-' + j) == document.querySelector('.menu-tab-1')) { //IF NANITE TAB
                        let nanitePopout = false;
                        insertAfter(NANO.Helpers.createElement(`<div class="noShadow-321ZPm popout-3sVMXz popoutBottom-1YbShG popoutbottom" style="transform: translateX(-6.5%) translateY(-125%) translateZ(0px);"><div id="autocomplete-popout"><div class="autocomplete-shadow"></div><div class="autocomplete-arrow-wrapper"><div class="autocomplete-arrow"></div></div><header><div class="autocomplete-header-background"></div><div class="connectedAccounts-2-XP1G" style="
            padding-right: 50px;
        "><div class="wrapper-3JPufy accountBtn-2Nozo3"><button class="inner-2Y6JuD accountBtnInner-sj5jLs menu-tab-1-workshop" type="button" style="background-image: url(&quot;https://i.imgur.com/KjcSy6v.png&quot;);"></button></div></div><div class="connectedAccounts-2-XP1G"><div class="wrapper-3JPufy accountBtn-2Nozo3"><button class="inner-2Y6JuD accountBtnInner-sj5jLs menu-tab-1-auditlogs" type="button" style="background-image: url(&quot;https://i.imgur.com/qCl24uL.png&quot;);"></button></div></div></header></div></div>`),
                          document.querySelector('.menu-tab-1'));
                        setTimeout(() => nanitePopout = true, 200);
                        document.body.addEventListener('click', event => {
                          if (document.querySelector('.popoutbottom')) {
                            if (nanitePopout) document.querySelector('.popoutbottom').parentNode.removeChild(document.querySelector('.popoutbottom')); nanitePopout = false;
                          }
                        });
                        document.querySelector('.NANO-modal-inner').addEventListener('click', event => {
                          if (document.querySelector('.popoutbottom')) {
                            if (nanitePopout) document.querySelector('.popoutbottom').parentNode.removeChild(document.querySelector('.popoutbottom')); nanitePopout = false;
                          }
                        });

                        mMenu = false;
                        console.log('TAB 1');
                        document.querySelector('.menu-tab-1-auditlogs').addEventListener('click', event => {
                          if (document.querySelector('.popoutbottom')) {
                            document.querySelector('.popoutbottom').parentNode.removeChild(document.querySelector('.popoutbottom'));
                          }
                          document.querySelector('.menu-title-0').innerHTML = 'Nanites';
                          document.querySelector('.menu-title-0').appendChild(NANO.Helpers.createElement(`<div class="date-2WJGyu small-29zrCQ size12-3R0845 height16-2Lv3qA primary-jw0I4K menu-title-1" style="text-align: center;font-size: 15px;padding: 50px 00px 0px 0px;">Monitor your Nanites</div>`));
                          document.querySelector('.menu-bg').parentNode.appendChild(NANO.Helpers.createElement(`<div class="image-3Y4mXQ margin-bottom-40 menu-bg" style="/* flex: 0 1 auto; */position: absolute;width: 380px;height: 282px;left: 450px;bottom: 200px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/ToNtVxr.png&quot;);">
            </div>`));
                          document.querySelector('.menu-bg').parentNode.removeChild(document.querySelector('.menu-bg'));
                          document.querySelector('.menu-bg').style.left = `550px`;
                          try {
                            document.querySelector('.menuspan').parentNode.removeChild(document.querySelector('.menuspan'));

                          }
                          catch (e) {


                          }
                          document.querySelector('.privateChannels0').style.width = "345px";
                          for (let i in NANO.pendingNanites) {
                            document.querySelector('.menuDivWrap0').appendChild(NANO.Helpers.createElement(`<div class="custom-column guild-settings-audit-logs" style="width: 345px;"><div class="custom-container" style="
              width: 345px;
          "><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix scrollerThemed-2oenus themeGhost-28MSn0 scrollerTrack-1ZIpsv" style="width:;"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix custom-scroller" style="
          "><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto; padding-bottom: 60px;"><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 auditLog-3jNbM6 marginBottom8-AtZOdT" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 headerClickable-2IVFo9 header-GwIGlr" style="flex: 1 1 auto;"><div class="icon-RTGJu3 typeUpdate-2bwuHy targetMember-2iuwxX"></div><div class="image-33JSyf large-3ChYtB avatar-_VZUJy" style="background-image: url(&quot;https://cdn.discordapp.com/avatars/496597979663433729/823ce05de810b27ed4da5f2a7757c363.png?size=128&quot;);"></div><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 timeWrap-2DasL6" style="flex: 1 1 auto;"><div class="overflow-ellipsis flexChild-faoVW3" style="flex: 1 1 auto;"><span class="userHook-3AdCBF"><span>NANITE: COOKING</span></span></div><div class="timestamp-1mruiI">Yesterday at 7:31 PM</div></div><svg class="expand-1lx8E1 transition-27fFQS directionRight-O8AY4M" width="24" height="24" viewBox="0 0 24 24"><path class="expandForeground-1nZ4VR" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 10L12 15 17 10"></path></svg></div></div></div></div></div></div></div>`));
                          }
                        });
                      }
                      else {
                        console.log('TAB 0');
                        document.querySelector('.menu-title-0').innerHTML = `Hello, ${NANO.username}.`;
                        //document.querySelector('.menu-title-1').parentNode.removeChild(document.querySelector('.menu-title-1'));
                        document.querySelector('.menu-bg').parentNode.appendChild(NANO.Helpers.createElement(`<div class="image-3Y4mXQ margin-bottom-40 menu-bg" style="/* flex: 0 1 auto; */position: absolute;width: 380px;height: 282px;left: 450px;bottom: 200px;background-repeat: no-repeat;background-image: url(&quot;${gifList[Math.floor(Math.random() * (gifList.length - 1))]}&quot;);">
            </div>`));
                        document.querySelector('.menu-bg').parentNode.removeChild(document.querySelector('.menu-bg'));
                        document.querySelector('.menu-bg').style.left = `450px`;
                        if (mMenu == false) {
                          try {

                            while (document.querySelector('.menuDivWrap0').hasChildNodes()) {
                              document.querySelector('.menuDivWrap0').removeChild(document.querySelector('.menuDivWrap0').lastChild);
                              console.log('menuDivWrap test 0');
                            }
                          }
                          catch (e) {

                          }
                          mMenu = true;

                          document.querySelector('.quantumBook').style.backgroundImage = `url('https://i.imgur.com/lo7IiCL.png');`;
                          document.querySelector('.quantumBook').style.backroundRepeat = `no-repeat`;

                          document.querySelector('.menuDivWrap0').appendChild(NANO.Helpers.createElement(`<div class="scroller-2FKFPG menuDivWrap menuspan" style="margin-right: -100px;">
<div style="
height: 45px;
" class="menuoption menu-option-nanite-workshop">
<div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                            <a class="" style="position: relative; bottom: 20px;">
    <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 25px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/vaTpgUa.png&quot;);"></div>
    <div class="name-2WpE7M channel-name">Workshop</div>
 </a>
</div>
<div>
</div>
</div>
<div style="
height: 45px;
" class="menuoption menu-option-nanite-join">
<div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                            <a class="" style="position: relative; bottom: 20px;">
    <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 25px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/9gDwjFd.png&quot;);"></div>
    <div class="name-2WpE7M channel-name">Join</div>
 </a>
</div>
<div>
</div>
</div>
<div style="
height: 45px;
" class="menuoption menu-option-nanite-leave">
<div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                            <a class="" style="position: relative; bottom: 20px;">
    <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 25px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/dhBgt5w.png&quot;);"></div>
    <div class="name-2WpE7M channel-name">Leave</div>
 </a>
</div>
<div>
</div>
</div>
<div style="
height: 45px;
" class="menuoption menu-option-nanite-possess">
<div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                            <a class="" style="position: relative; bottom: 20px;">
    <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 25px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/eB9sOJf.png&quot;);"></div>
    <div class="name-2WpE7M channel-name">Possess</div>
 </a>
</div>
<div>
</div>
</div>
<div style="
height: 45px;
" class="menuoption menu-option-nanite-DM">
<div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                            <a class="" style="position: relative; bottom: 20px;">
    <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 25px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/av9Ge0a.png&quot;);"></div>
    <div class="name-2WpE7M channel-name">DM</div>
 </a>
</div>
<div>
</div>
</div>
<div style="
height: 45px;
" class="menuoption menu-option-nanite-assimilate">
<div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                            <a class="" style="position: relative; bottom: 20px;">
    <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 25px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/C05Q1yF.png&quot;);"></div>
    <div class="name-2WpE7M channel-name">Assimilate</div>
 </a>
</div>
<div>
</div>
</div>
<div style="
height: 45px;
" class="menuoption menu-option-nanite-userattack">
<div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                            <a class="" style="position: relative; bottom: 20px;">
    <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 25px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/wh2oji9.png&quot;);"></div>
    <div class="name-2WpE7M channel-name">User Attack</div>
 </a>
</div>
<div>
</div>
</div>
<div style="
height: 45px;
" class="menuoption menu-option-nanite-serverattack">
<div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                            <a class="" style="position: relative; bottom: 20px;">
    <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 25px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/id1HTxu.png&quot;);"></div>
    <div class="name-2WpE7M channel-name">Server Attack</div>
 </a>
</div>
</div>
<div style="
height: 45px;
" class="menuoption menu-option-nanite-frspam">
<div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                            <a class="" style="position: relative; bottom: 20px;">
    <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 25px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/0eAdzU3.png&quot;);"></div>
    <div class="name-2WpE7M channel-name">Friendship</div>
 </a>
</div>
<div>
</div>
</div>
<div style="
height: 45px;
" class="menuoption menu-option-nanite-sa-channels">
<div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                            <a class="" style="position: relative; bottom: 20px;">
    <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 25px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/eMZaBVc.png&quot;);"></div>
    <div class="name-2WpE7M channel-name">Channel Spy</div>
 </a>
</div>
<div></div>
</div>
</div>
<div style="
height: 45px;
" class="menuoption menu-option-nanite-qbed">
<div class="channel-2QD9_O btn-friends" style=" padding: 0 20 0 0; padding-left: 20; max-width: 800px; bottom: 50px;width: 500px;">
                            <a class="" style="position: relative; bottom: 13px">
    <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 25px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/tyQJsqo.png&quot;);"></div>
    <div class="name-2WpE7M channel-name">Quick Embed</div>
 </a>
</div>
<div>
</div>
</div>`));
                          setTimeout(() => {
                            try {

                              setupMainMenu();
                            }
                            catch (e) {

                            }
                          }, 1000)
                        }
                      }
                      document.querySelector('.menu-child-' + j).style.backgroundColor = "#2f3136";
                      document.querySelector('.menu-tab-' + j).className = `wrapperSelectedText-3dSUjC wrapper-KpKNwI menu-tab-${j} tab-selected`;
                      for (let ji = 0; ji < 3; ji++) {
                        if (document.querySelector('.menu-tab-' + ji) != document.querySelector('.menu-tab-' + j)) {
                          document.querySelector('.menu-child-' + ji).style.backgroundColor = "rgba(79, 84, 92, 0.6)";
                          document.querySelector('.menu-tab-' + ji).className = `wrapperSelectedText-3dSUjC wrapper-KpKNwI menu-tab-${ji}`;
                          mouseOv();
                        }
                      }
                    });
                    document.querySelector('.menu-tab-' + j).addEventListener('mouseover', event => {

                      console.log(j, ' SELECTED');
                      if (document.querySelector('.menu-tab-' + j) != document.querySelector('.tab-selected')) {
                        oldColor = document.querySelector('.menu-child-' + j).style.backgroundColor;
                        document.querySelector('.menu-child-' + j).style.backgroundColor = "rgba(32,34,37,.3)";
                      }
                    });
                    document.querySelector('.menu-tab-' + j).addEventListener('mouseout', event => {
                      console.log(j, 'UNSELECTED');

                      if (document.querySelector('.menu-tab-' + j) != document.querySelector('.tab-selected')) {
                        document.querySelector('.menu-child-' + j).style.backgroundColor = oldColor;
                      }
                    });
                  }
                }
              }
              mouseOv();
              let scrollerAmt;
              let repeaterAmt;

              function setupNanothreading() {
                let mouseIn = false;
                let nanoThreading = 0;
                var ebc = document.querySelector(".nanothreadingScrollerNotches");
                var ebd = document.querySelector(".nanothreadingScrollerProgress");
                ebc.addEventListener('mousemove', e => {
                  nanoThreading = e.pageX - ebc.getBoundingClientRect().left;
                  ebd.style.transform = `translateX(${Math.floor(nanoThreading).toString()}px)`;
                });
                ebc.addEventListener('mousein', e => {
                  mouseIn = true;
                });
                ebc.addEventListener('mouseout', e => {
                  if (mouseIn) NANO.consoleClient.write(`>threadSet ${nanoThreading}`);
                  mouseIn = false;
                });
              }
              function setupScroller() {
                scrollerAmt = document.querySelector('.naniteGrabber').style.left;
                scrollerAmt = scrollerAmt.replace('%', '');
                scrollerAmt = Math.floor(NANO.nanites * (Number(scrollerAmt) / 100)).toString();
                let mouseDown = false;
                var direction = "", oldx = 0, newX = 40;
                if (NANO.nanites <= 1) {
                  newX = 1;
                  document.querySelector('.naniteGrabber').style.left = NANO.nanites + '%';
                  document.querySelector('.nBarFill-23-gu-').style.width = NANO.nanites + '%';
                }
                document.querySelector('.naniteGrabber').addEventListener('mousedown', event => {
                  modalFunc()
                  console.log('naniteGrabber clicked');
                  direction = "", oldx = event.pageX;
                  mouseDown = true;
                });
                document.body.addEventListener('mouseup', event => {
                  console.log('naniteGrabber unclicked');
                  mouseDown = false;
                });
                function modalFunc() {
                document.querySelector('.NANO-modal').addEventListener('mousemove', e => {
                  if (mouseDown) {
                    console.log('naniteGrabber moved!');
                    if (e.pageX < oldx && newX > 0) {
                      //if clientX is less than oldx, find out how much left and subtract it from the percentage
                      newX = newX - ((oldx - e.pageX) / 5);
                      direction = "left";
                    } else if (e.pageX > oldx && newX < 100) {
                      //if pageX is more than oldx, find out how much right and add it to the percentage
                      newX = newX + ((e.pageX - oldx) / 5);
                      direction = "right";
                    }
                    //problem: everytime it moves, it's subtracting 
                    document.querySelector('.naniteGrabber').style.left = newX + '%';
                    document.querySelector('.nBarFill-23-gu-').style.width = newX + '%';
                    console.log(e.pageX, oldx, newX, direction);
                    //document.querySelector('.menu-subtext-1').innerHTML = e.pageX + ' oldx:' + oldx + ' newX:' + newX + ' dir:' + direction + ' pageX-oldx' + (e.pageX - oldx) + ' percentage:' + ((e.pageX - oldx)/100) ;
                    oldx = e.pageX;
                    scrollerAmt = document.querySelector('.naniteGrabber').style.left;
                    scrollerAmt = scrollerAmt.replace('%', '');
                    scrollerAmt = Math.floor(NANO.nanites * (Number(scrollerAmt) / 100)).toString();
                  }
                });
              }
              }
              function setupRepeater() {
                repeaterAmt = document.querySelector('.repeatGrabber').style.left;
                repeaterAmt = repeaterAmt.replace('%', '');
                //repeaterAmt = Math.floor((Number(repeaterAmt)/100)).toString();
                let mouseDown = false;
                var direction = "", oldx = 0, newX = 0;
                document.querySelector('.repeatGrabber').addEventListener('mousedown', event => {
                  modalFunc();
                  console.log('repeatGrabber clicked');
                  direction = "", oldx = event.pageX;
                  mouseDown = true;
                });
                document.body.addEventListener('mouseup', event => {
                  console.log('repeatGrabber unclicked');
                  mouseDown = false;
                  document.querySelector('.repeatGrabber').removeChild(document.querySelector('.repeatTip'));
                });
                function modalFunc() {
                  document.querySelector('.NANO-modal').addEventListener('mousemove', e => {
                    if (mouseDown) {
                      console.log('repeatGrabber moved!');
                      if (e.pageX < oldx && newX > 0) {
                        //if clientX is less than oldx, find out how much left and subtract it from the percentage
                        newX = newX - ((oldx - e.pageX) / 5);
                        direction = "left";
                      } else if (e.pageX > oldx && newX < 100) {
                        //if pageX is more than oldx, find out how much right and add it to the percentage
                        newX = newX + ((e.pageX - oldx) / 5);
                        direction = "right";
                      }
                      //problem: everytime it moves, it's subtracting 
                      document.querySelector('.repeatGrabber').style.left = newX + '%';
                      document.querySelector('.rBarFill-23-gu-').style.width = newX + '%';
                      let rBottom = document.querySelector('.repeatGrabber').style.bottom;
                      rBottom = rBottom.replace('px', '');
                      if (newX < 0) newX = 0;
                      if (newX > 99) newX = 100;

                      if (!document.querySelector('.repeatTip')) {
                        document.querySelector('.repeatGrabber').appendChild(NANO.Helpers.createElement(`<div class="tooltip-1OS-Ti top-1pTh1F black-2bmmnj repeatTip">${Math.floor(newX)}</div>`));//bottom: 983px; left: 191.533px;  
                        document.querySelector('.repeatTip').style.left = -140 + '%';
                        document.querySelector('.repeatTip').style.bottom = (Math.floor(Number(rBottom) + 35)).toString() + 'px';
                      }
                      else {
                        document.querySelector('.repeatTip').style.left = -140 + '%';
                        document.querySelector('.repeatTip').style.bottom = (Math.floor(Number(rBottom) + 35)).toString() + 'px';
                        document.querySelector('.repeatTip').innerHTML = Math.floor(newX);
                      }
                      console.log(e.pageX, oldx, newX, direction);
                      //document.querySelector('.menu-subtext-1').innerHTML = e.pageX + ' oldx:' + oldx + ' newX:' + newX + ' dir:' + direction + ' pageX-oldx' + (e.pageX - oldx) + ' percentage:' + ((e.pageX - oldx)/100) ;
                      oldx = e.pageX;
                      repeaterAmt = document.querySelector('.repeatGrabber').style.left;
                      repeaterAmt = repeaterAmt.replace('%', '');
                      //repeaterAmt = Math.floor((Number(repeaterAmt)/100)).toString();
                    }
                  });
                }
              }
              function setupMainMenu() {

                let menuOptions = [];
                document.querySelectorAll('.menuoption').forEach(value => {
                  menuOptions.push(value);
                  value.addEventListener('click', event => {
                    new Promise((resolve, reject) => {
                      event.stopPropagation();
                      console.log('clicked', value.className);
                      for (var i = 0; i < document.querySelector('.menuspan').children.length; i++) {
                        for (var ii = 0; ii < document.querySelector('.menuspan').children[i].children.length; ii++) {
                          if (document.querySelector('.menuspan').children[i] != value) {
                            if (document.querySelector('.menuspan').children[i].firstElementChild.className.includes('channel')) {
                              document.querySelector('.menuspan').children[i].firstElementChild.className = 'channel-2QD9_O btn-friends';
                              document.querySelector('.menuspan').children[i].firstElementChild.firstElementChild.className = '';
                            }
                          }
                          else {
                            document.querySelector('.menuspan').children[i].firstElementChild.className = 'channel-2QD9_O selected-1HYmZZ btn-friends selected';
                            //document.querySelector('.menuspan').children[i].firstElementChild.firstElementChild.className = 'selectedLink-3dsNZ6';
                            //class="selectedLink-3dsNZ6"
                            if (document.querySelector('.menu-bg')) {
                              document.querySelector('.menu-bg').parentNode.removeChild(document.querySelector('.menu-bg'));
                            }
                            if (document.querySelector('.menu-title-0')) {
                              document.querySelector('.menu-title-0').parentNode.removeChild(document.querySelector('.menu-title-0'));
                            }
                            if (document.querySelector('.menu-right')) {
                              document.querySelector('.menu-right').parentNode.removeChild(document.querySelector('.menu-right'));
                            }
                          }
                        }
                      }
                    });
                  });
                });


                document.querySelector('.menu-option-nanite-say').addEventListener('click', event => {//
                  event.preventDefault();
                  event.stopPropagation();

                  document.querySelector('.nanite-menu').appendChild(NANO.Helpers.createElement(`
        <div class="scrollerWrap-2lJEkd content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d menu-right">
            <div class="scroller-2FKFPG inner-3wn6Q5 container-2zArDx content-8biNd">
            <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ" style="height: 285px;"><div class="image-1GzsFd margin-bottom-40" style="flex: 0 1 auto; width: 230px; height: 220px; background-image: url(&quot;/assets/94b5558353f1d01035a874f6eddf6d70.svg&quot;);"></div><div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;"><h4 class="title-2BxgL2">Say</h4><div class="text-GwUZgS margin-top-8">Make Nanites send any message to a server.</div></div></div>
            <div class="flex-spacer flex-vertical" style="position: relative;"><form><div class="channelTextArea-1LDbYG channelTextArea-rNsIhG"><div class="inner-zqa7da flex-1O1GKY innerNoAutocomplete-1WpcVO"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;"><button tabindex="3" type="button" class="attachButton-1UjEWA button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN"><div class="contents-18-Yxp attachButtonInner-1iyZ9F"><svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" class="attachButtonPlus-rUdX-B" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg></div></button><div class="attachButtonDivider-3Glu60"></div></div><div class="uploadInput-2lNPSo"><div class="file-input" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0; cursor: pointer;"></div></div><textarea rows="1" placeholder="Enter a message" tabindex="1" class="textArea-2Spzkt textArea-2Spzkt scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9 sayMSG" style="height: auto;"></textarea></div>
            </div></form></div><div class="marginTop40-i-78cZ"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT">Nanites</h5><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6" style="flex: 1 1 auto;"><div class="slider-1PF9SW marginTop4-2BNfKC flexChild-faoVW3"> <input type="number" class="input-2_ChIk" readonly="" value="40"><div class="track-11EASc"><div class="mark-1xjQqt" style="left: 0%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .10)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 20%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .20)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 40%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .40)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 60%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .60)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 80%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .80)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 100%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites)}</div><div class="markDash-3hAolZ"></div></div></div><div class="bar-2Qqk5Z"><div class="barFill-23-gu- nBarFill-23-gu-" style="width: 40%;"></div></div><div class="track-11EASc"><div class="grabber-3mFHz2 naniteGrabber" style="left: 40%; margin-top:0px;"></div></div></div></div></div>
            <div class="marginTop40-i-78cZ" style="
            margin-top: 0px;
        "><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT">Repeat</h5><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6" style="flex: 1 1 auto;"><div class="slider-1PF9SW marginTop4-2BNfKC flexChild-faoVW3"> <input type="number" class="input-2_ChIk" readonly="" value="40"><div class="track-11EASc"><div class="mark-1xjQqt" style="left: 0%;"><div class="markValue-2DwdXI">0</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 20%;"><div class="markValue-2DwdXI">20</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 40%;"><div class="markValue-2DwdXI">40</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 60%;"><div class="markValue-2DwdXI">60</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 80%;"><div class="markValue-2DwdXI">80</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 100%;"><div class="markValue-2DwdXI">??</div><div class="markDash-3hAolZ"></div></div></div><div class="bar-2Qqk5Z"><div class="barFill-23-gu- rBarFill-23-gu-" style="width: 0%;"></div></div><div class="track-11EASc"><div class="grabber-3mFHz2 repeatGrabber" style="left: 0%; margin-top:0px;"></div></div></div></div></div>
            <div style="flex: 1 1 auto;" class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy marginTop8-1DLZ1n">Nanothreading</h5>
            <div class="wrapper-3Z-vWm"><div class="container-3PXSwK" style="background: linear-gradient(to right, rgb(251, 184, 72), rgb(67, 181, 129));"><div class="progress-1IcQ3A nanothreadingScrollerProgress" style="transform: translateX(0px);"></div><div class="notches-1sAcEM nanothreadingScrollerNotches"></div></div></div></div>
            </div></div>`));
                  setupScroller();
                  setupRepeater();
                  setupNanothreading();
                  //
                  //
                  //getBoundingClientRect().left

                  setTimeout(() => {
                    var ebb = document.querySelector(".sayMSG");
                    var eArrays = [ebb];
                    var errors = [];
                    function say() {

                      NANO.consoleClient.write(">nite say 1-" + scrollerAmt + " " + ebb.value + ";" + repeaterAmt);
                      ebb.value = '';
                      NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
<span class="status status-nanite" style="margin-right: 14px;"></span>
<div>Say</div>
</div>
<div class="helper-2c73HK">Let their voices be heard!</div>
</div>
</div>`);
                    }
                    for (let i = 0; i < eArrays.length; i++) {
                      eArrays[i].addEventListener('keypress', event => {
                        /* event.preventDefault();
                        event.stopPropagation(); */

                        setTimeout(() => {
                          if (event.key === 'Enter') {
                            if (ebb.value.length <= 0) {
                              errors.push('message');
                            }
                            if (errors.length > 0) {
                              //console.log("You must fill all the input areas!");
                              NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
                  <div class="item-1GzJrl item-status">
                  <div class="statusIconText-3b4TkH">
                  <span class="status status-nanite" style="margin-right: 14px;"></span>
                  <div>Say</div>
                  </div>
                  <div class="helper-2c73HK">You must input a message!</div>
                  </div>
                  </div>`);
                            }
                            else {
                              say();
                            }
                          }
                          event.stopPropagation();
                        }, 0.3);
                      });
                    }

                  }, 200);
                });
                document.querySelector('.menu-option-nanite-join').addEventListener('click', event => {//
                  event.preventDefault();
                  event.stopPropagation();
                  document.querySelector('.nanite-menu').appendChild(NANO.Helpers.createElement(`
        <div class="scrollerWrap-2lJEkd content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d menu-right">
            <div class="scroller-2FKFPG inner-3wn6Q5 container-2zArDx content-8biNd">
            <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ" style="height: 285px;"><div class="image-1GzsFd margin-bottom-40" style="flex: 0 1 auto; width: 230px; height: 220px; background-image: url(&quot;/assets/712a0fd4d14a1caadd31cb0745e91238.svg&quot;);"></div><div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;"><h4 class="title-2BxgL2">Join</h4><div class="text-GwUZgS margin-top-8">Send Nanites to the desired server.</div></div></div>
            <div class="friends-table" style="position: relative;"><div class="friend-table-add-wrapper"><div class="friend-table-add-header"><div class="friends-table-add"><form class="wrapper-1cBijl"><input class="addFriendInput-4bcerK friendUsername" placeholder="Enter a Discord Server Invite" maxlength="37"><div class="addFriendHint-3Y70FX"></div><button type="submit" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeSmall-2cSMqn grow-q77ONN submitFriend"><div class="contents-18-Yxp">Join</div></button></form></div></div></div></div>
            <div class="marginTop40-i-78cZ"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT">Nanites</h5><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6" style="flex: 1 1 auto;"><div class="slider-1PF9SW marginTop4-2BNfKC flexChild-faoVW3"> <input type="number" class="input-2_ChIk" readonly="" value="40"><div class="track-11EASc"><div class="mark-1xjQqt" style="left: 0%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .10)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 20%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .20)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 40%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .40)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 60%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .60)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 80%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .80)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 100%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites)}</div><div class="markDash-3hAolZ"></div></div></div><div class="bar-2Qqk5Z"><div class="barFill-23-gu- nBarFill-23-gu-" style="width: 40%;"></div></div><div class="track-11EASc"><div class="grabber-3mFHz2 naniteGrabber" style="left: 40%; margin-top:0px;"></div></div></div></div></div>
            <div style="flex: 1 1 auto;" class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy marginTop8-1DLZ1n">Nanothreading</h5>
            <div class="wrapper-3Z-vWm"><div class="container-3PXSwK" style="background: linear-gradient(to right, rgb(251, 184, 72), rgb(67, 181, 129));"><div class="progress-1IcQ3A nanothreadingScrollerProgress" style="transform: translateX(0px);"></div><div class="notches-1sAcEM nanothreadingScrollerNotches"></div></div></div></div>
            </div></div>`));
                  setupScroller();

                  setupNanothreading();

                  setTimeout(() => {
                    var ebb = document.querySelector(".friendUsername");
                    var ebc = document.querySelector(".submitFriend");
                    var eArrays = [ebb];
                    var errors = [];
                    ebc.addEventListener('click', event => {
                      event.preventDefault();
                      event.stopPropagation();
                      if (ebb.value.length <= 0) {
                        errors.push('invite');
                      }
                      if (errors.length > 0) {
                        //console.log("You must fill all the input areas!");
                        NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
            <div class="item-1GzJrl item-status">
            <div class="statusIconText-3b4TkH">
            <span class="status status-nanite" style="margin-right: 14px;"></span>
            <div>Join</div>
            </div>
            <div class="helper-2c73HK">You must input an invite!</div>
            </div>
            </div>`);
                      }
                      else {
                        NANO.consoleClient.write(">nite join 1-" + scrollerAmt + " " + ebb.value);
                        ebb.value = '';
                        NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
<span class="status status-nanite" style="margin-right: 14px;"></span>
<div>Join</div>
</div>
<div class="helper-2c73HK">Inviting Nanites to the party...</div>
</div>
</div>`);
                      }
                    });
                    for (let i = 0; i < eArrays.length; i++) {
                      eArrays[i].addEventListener('keypress', event => {
                        setTimeout(() => {
                          if (event.code === 'Enter') {
                            if (ebb.value.length <= 0) {
                              errors.push('invite');
                            }
                            if (errors.length > 0) {
                              //console.log("You must fill all the input areas!");
                              NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
                  <div class="item-1GzJrl item-status">
                  <div class="statusIconText-3b4TkH">
                  <span class="status status-nanite" style="margin-right: 14px;"></span>
                  <div>Join</div>
                  </div>
                  <div class="helper-2c73HK">You must input an invite!</div>
                  </div>
                  </div>`);
                            }
                            else {
                              NANO.consoleClient.write(">nite join 1-" + scrollerAmt + " " + ebb.value);
                              ebb.value = '';
                              NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
 <span class="status status-nanite" style="margin-right: 14px;"></span>
 <div>Join</div>
</div>
<div class="helper-2c73HK">Inviting Nanites to the party...</div>
</div>
</div>`);
                            }
                          }
                          event.stopPropagation();
                        }, 0.3);
                      });
                    }

                  }, 200);
                });
                document.querySelector('.menu-option-nanite-possess').addEventListener('click', event => {

                  event.preventDefault();
                  event.stopPropagation();

                  let contentArray = [];
                  //event.stopPropagation();
                  //if(click == true) return;
                  let content = `<div class="nanites-wrapper">
    <div class="scroller-wrap">
        <div class="guilds scroller">
            <div class="guild">
                <div draggable="true">
                    <div class="guild-inner" draggable="false" style="border-radius: 25px;"><a draggable="false" class="avatar-small" style="background-image: url(&quot;https://cdn.discordapp.com/icons/413417616867196939/b3f6cdb1d10f44a72f1b63bf21314a02.webp&quot;);"></a></div>
                </div>
            </div>
            </div>
    </div>
</div>`;
                  let accountRet = ``;
                  if (NANO.possessed == true) {
                    accountRet = `<div class="container-2td-dC" style="
        margin: auto;
        right: 45px;
    "><div class="dragfix-1wSxtO" draggable="true"><div class="wrapper-2lTRaf borderRadiusRet" style="border-radius: 25px;"><a aria-label="ITL Testing Facility" href=""><div class="icon-3o6xvg guildIcon-VlWW86 iconSizeLarge-161qtT iconInactive-98JN5i" style="background-image: url(&quot;${NANO.avatar}&quot;);"></div></a></div></div></div>
     <div class="divider-3573oO dividerDefault-3rvLe-" style="
        width: 85%;
        "></div>`;
                  }
                  let contentPosVertical = 0;
                  let contentPos = [];
                  //NANO.nanites = [1,1,1,1];
                  function runNaniteRet() {
                    for (let i = 0; i < Number(NANO.nanites); i++) {
                      let img = 'https://i.imgur.com/ToNtVxr.png';
                      if (NANO.checkedNanites && NANO.checkedNanites[i] == 0) {
                        img = 'https://i.imgur.com/L9mGKdY.png'
                      }
                      /* if (i == NANO.nanitePostion) {
                        //console.log(i, NANO.nanitePostion);
                        img = 'https://i.imgur.com/qbk8Hki.jpg';
                      } */
                      let contentPosHorizontal = 0;//(i * 5);
                      if (i % 5 == 0) {
                        //contentPosHorizontal = contentPosHorizontal - 50;

                        contentPosHorizontal = 25;
                      }
                      contentPos.push(contentPosHorizontal);
                      contentArray.push(`
    <div class="scroller-wrap">
        <div class="guilds scroller">
            <div class="guild">
                <div draggable="true">
			<div class="guild-inner" draggable="false" style="top: -45px; border-radius: 25px; position: absolute; "><a draggable="false" class="avatar-small-nanite" style="background-image: url(&quot;${img}&quot;);"></a></div>
                </div>
            </div>
            </div>
    </div>`);
                    }
                    contentArray.push(`
    <div class="guilds-wrapper-nanites">
    <div class="scroller-wrap">
        <div class="add-nites scroller">
				<button class="guild-1EfMGQ guildsAdd-21_IdK nanites-add guilds-add-nanites" style="top: -45px;"><span class="guildsAddInner-1KMFy- guilds-add-inner-nanites">+</span></button>
            </div>
			</div>
    </div>`);
                    console.log(contentArray);
                    document.querySelector('.nanite-menu').appendChild(NANO.Helpers.createElement(`
    <div class="scrollerWrap-2lJEkd content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d menu-right">
        <div class="scroller-2FKFPG inner-3wn6Q5 container-2zArDx content-8biNdA">
        ${accountRet}
    </div></div>`));

                    setTimeout(() => {
                      var ef;
                      if (NANO.possessed == true) {
                        ef = document.querySelector('.borderRadiusRet');
                        ef.addEventListener('mouseover', event => {
                          for (let i = 25; i > 15; i -= 0.05) {
                            //setTimeout(()=>{

                            ef.style.borderRadius = `${i}px`;
                            //}, i * );
                          }
                        });
                        ef.addEventListener('mouseout', event => {
                          for (let i = 15; i < 25; i += 0.05) {

                            ef.style.borderRadius = `${i}px`;
                          }

                        });
                        ef.addEventListener('click', event => {

                          setTimeout(() => {
                            NANO.consoleClient.write("switch-main");
                          }, 400);
                        });
                      }
                      var ec = document.querySelector('.content-8biNdA');
                      for (let i = 0; i < contentArray.length; i++) {
                        var ed = document.createElement("div");
                        ed.className = "nanites-wrapper";
                        if (i < 5) {

                          ed.style.right = "23px";
                        }
                        console.log('NANO TEST -1');
                        ed.innerHTML = contentArray[i];
                        ec.appendChild(ed);


                        var ee = document.getElementsByTagName("a");
                        console.log('NANO TEST 0');
                        if (NANO.checkedNanites != null) {
                          console.log('NANO TEST 1');
                          if (NANO.checkedNanites[i] && NANO.checkedNanites[i] == 1) {
                            console.log('NANO TEST 2');
                            if (i != NANO.nanitePostion) {
                              console.log('NANO TEST 3',ee[i],ee[i].className);
                              if (ee[i].className && ee[i].className.includes('avatar-small-nanite')) {
                                console.log('NANO TEST 4', ee[i]);
                                ee[i].addEventListener('mouseover', event => {
                                  ee[i].style.backgroundSize = "60px 60px";
                                  ee[i].style.height = "60px";
                                  ee[i].style.width = "60px";
                                  console.log('testing-in');
                                });
                                ee[i].addEventListener('mouseout', event => {
                                  ee[i].style.backgroundSize = "50px 50px";
                                  ee[i].style.height = "50px";
                                  ee[i].style.width = "50px";
                                  console.log('testing-out');
                                });
                                ee[i].addEventListener('click', event => {
                                  event.stopPropagation();
                                  console.log('testing-clicked');
                                  NANO.possessed = true;
                                  NANO.consoleClient.write(">setNanite " + i);
                                  setTimeout(() => {
                                    NANO.consoleClient.write("switch-" + i);
                                  }, 400);


                                  NANO._naniteList0 = document.createElement("div");

                                  document.querySelector('.content-8biNdA').appendChild(NANO._naniteList0);
                                });

                                ee[i].addEventListener('keyup', event => {

                                });
                              }
                              else {
                                if (document.querySelector('.guilds-add-nanites')) {
                                  console.log('TEST TOLL');
                                  NANO._addNanites = document.querySelector('.guilds-add-nanites');
                                  NANO._addNanites.addEventListener('click', () => {
                                    NANO.Helpers.destroyModal();
                                    setTimeout(() => {
                                      if (NANO.rank == 'Overlord') {
                                        function makeid() {
                                          var text = "";
                                          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                                          for (var i = 0; i < 8; i++)
                                            text += possible.charAt(Math.floor(Math.random() * possible.length));

                                          return text;
                                        }
                                        let ticket = makeid();
                                        NANO.pendingNanites[ticket] = { 'status': 0 };
                                        NANO.promiseCommand(`createNanite-${ticket};`).then((ret) => {
                                          if (ret == 1) {
                                            NANO.pendingNanites[ticket].status++;
                                          }
                                          else if (ret == 0) {

                                          }
                                        });
                                      }
                                      else {


                                        NANO.Helpers.createModal(`<div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-1R_AjF" style="flex: 0 0 auto;">
              <h4 class="h4-AQvcAz title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh4-2vWMG5 marginReset-236NPn">Checkpoint</h4>
              </div>
              <div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d" style="
              padding-left: 30px;
              ">
              
              <div>
              <h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT" style="margin-bottom: 4px;">Command Locked</h5>
              <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 switchItem-2hKKKK" style="flex: 1 1 auto;">
              <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6" style="flex: 1 1 auto;">
              <div class="flexChild-faoVW3" style="flex: 1 1 auto;"><label for="2" class="titleDefault-a8-ZSr title-31JmR4">This command has been locked for: Updating Matrix.</label></div>
              </div>
              </div>
              </div></div>
              <div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 footer-2yfCgX" style="flex: 0 0 auto;">
              <button type="button" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN okayButton">
              <div class="contents-18-Yxp">Okay</div>
              </button>
              </div>`, 241, 490).then(() => {
                                            document.querySelector('.okayButton').addEventListener('click', event => {
                                              NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
                  <div class="item-1GzJrl item-status">
                  <div class="statusIconText-3b4TkH">
                     <span class="status status-nanite" style="margin-right: 14px;"></span>
                     <div>Sorry!</div>
                  </div>
                  <div class="helper-2c73HK">You reached a checkpoint!</div>
                  </div>
                  </div>`);
                                            });
                                          });
                                      }
                                    }, 300);
                                    /*  */
                                  });
                                }
                                else{
                                 // i--;
                                }
                              }
                            }
                            else {
                              if (ee[i].className && ee[i].className.includes('avatar-small-nanite')) {
                                aoc = true;
                                ee[i].addEventListener('mouseover', event => {
                                  ee[i].style.backgroundSize = "60px 60px";
                                  ee[i].style.height = "60px";
                                  ee[i].style.width = "60px";
                                  //console.log('testing-in');
                                });
                                ee[i].addEventListener('mouseout', event => {
                                  ee[i].style.backgroundSize = "50px 50px";
                                  ee[i].style.height = "50px";
                                  ee[i].style.width = "50px";
                                  //console.log('testing-out');
                                });
                                ee[i].addEventListener('click', event => {
                                  if (aod != true) {
                                    aod = true;
                                    // NANO.Helpers.destroyModal();
                                    NANO.consoleClient.write("switch-main");
                                  }
                                });
                              }
                              else{}

                            }
                          }
                        }
                      }

                      if (document.querySelector('.guilds-add-nanites')) {
                        console.log('NANO TEST 5');
                        NANO._addNanites = document.querySelector('.guilds-add-nanites');
                        NANO._addNanites.addEventListener('click', () => {
                          NANO.Helpers.destroyModal();
                          setTimeout(() => {

                            if (NANO.rank == 'Overlord') {
                              function makeid() {
                                var text = "";
                                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                                for (var i = 0; i < 8; i++)
                                  text += possible.charAt(Math.floor(Math.random() * possible.length));

                                return text;
                              }
                              for (let al = 0; al < 1; al++) {
                                setTimeout(() => {

                                  let ticket = makeid();
                                  NANO.pendingNanites[ticket] = { 'status': 0 };
                                  NANO.promiseCommand(`createNanite-${ticket};`).then((ret) => {
                                    if (ret == 1) {
                                      NANO.pendingNanites[ticket].status++;
                                    }
                                    else if (ret == 0) {

                                    }
                                  });
                                }, 1000 * al);
                              }

                            }
                            else {

                              NANO.Helpers.createModal(`<div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-1R_AjF" style="flex: 0 0 auto;">
                <h4 class="h4-AQvcAz title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh4-2vWMG5 marginReset-236NPn">Checkpoint</h4>
                </div>
                <div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d" style="
                padding-left: 30px;
                ">
                
                <div>
                <h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT" style="margin-bottom: 4px;">Command Locked</h5>
                <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 switchItem-2hKKKK" style="flex: 1 1 auto;">
                <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6" style="flex: 1 1 auto;">
                <div class="flexChild-faoVW3" style="flex: 1 1 auto;"><label for="2" class="titleDefault-a8-ZSr title-31JmR4">This command has been locked for: Updating Matrix.</label></div>
                </div>
                </div>
                </div></div>
                <div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 footer-2yfCgX" style="flex: 0 0 auto;">
                <button type="button" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN okayButton">
                <div class="contents-18-Yxp">Okay</div>
                </button>
                </div>`, 241, 490).then(() => {
                                  document.querySelector('.okayButton').addEventListener('click', event => {
                                    NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
                    <div class="item-1GzJrl item-status">
                    <div class="statusIconText-3b4TkH">
                       <span class="status status-nanite" style="margin-right: 14px;"></span>
                       <div>Sorry!</div>
                    </div>
                    <div class="helper-2c73HK">You reached a checkpoint!</div>
                    </div>
                    </div>`);
                                  });
                                });
                            }
                          }, 300);
                          /* */
                        });
                      }
                      if (aoc == true) {
                        ec.appendChild(this.createElement(`<button type="submit" class="button-2t3of8-nanites-main lookFilled-luDKDo colorRed-3HTNPV sizeMedium-2VGNaF grow-25YQ8u"><div class="contents-18-Yxp">Main</div></button>`));

                        let newElement = document.querySelector('.button-2t3of8-nanites-main');
                        newElement.addEventListener('click', event => {
                          if (aod != true) {
                            aod = true;
                            NANO.Helpers.destroyModal();
                            NANO.consoleClient.write("switch-main");
                          }
                        });
                      }
                    }, 200);
                    setTimeout(() => {
                      click = true;
                    }, 800);
                  }
                  NANO.possessFunction = runNaniteRet;
                  if (NANO.nanites && NANO.checkedNanites != null) {
                    runNaniteRet();
                  }
                  else if (NANO.checkedNanites == null) {
                    let percentageRet = `<div class="wrapper-1u09nF" role="progressbar" aria-label="Percentage Nanites are loading" style="
    margin: auto;
"><svg viewBox="25 25 50 50" class="svg-3yO_hc" aria-hidden="true"><circle class="background-yZEZik path-3H_ZFA" cx="50" cy="50" r="20"></circle><circle class="foreground-2aE44H path-3H_ZFA percentageCircle" cx="50" cy="50" r="20" stroke="rgb(155, 171, 229)" stroke-dasharray="${NANO.percentageNanites}, 126"></circle></svg><aside class="usageInfo-2WQAwr" aria-hidden="true">0%</aside></div>`;
                    document.querySelector('.nanite-menu').appendChild(NANO.Helpers.createElement(`
    <div class="scrollerWrap-2lJEkd content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d menu-right">
        ${percentageRet}</div>`));
                  }
                  //onmouseover
                  //contentArray.push(`<button class="guild guilds-add"><span class="guilds-add-inner">+</span></button>`);
                  /*<div class="modal-1UGdnR" style="opacity: 1;"><div class="inner-1JeGVc"><div class="container-3qKHyN"><div class="quickswitcher-3JagVE"><input class="input-2VB9rf" type="text" placeholder="Where would you like to go?" value="@"><div class="emptyState-2gL-9T"><div class="emptyStateNote-ZYTetQ">Can?t seem to find what you?re looking for?</div><div class="emptyStateCTA-veJ2Cu"><a class="anchor-3Z-8Bb" href="https://support.discordapp.com/hc/en-us/articles/115000070311" rel="noreferrer noopener" target="_blank">Learn more about Quick Switcher</a></div></div><div class="tipsWithoutResults-lGY-De"><div class="tipsListNav-2AYmjC"><div class="keybindShortcut-1BD6Z1 dark-2P8byF keybindShortcutQuickSwitcher-1-Xs5c keybindShortcut-1BD6Z1 keybindShortcutTipsNav-1mb0yH keybindShortcutQuickSwitcher-1-Xs5c keybindShortcut-1BD6Z1"><span>tab</span></div> or <div class="keybindShortcut-1BD6Z1 dark-2P8byF keybindShortcutQuickSwitcher-1-Xs5c keybindShortcut-1BD6Z1 keybindShortcutTipsNav-1mb0yH keybindShortcutQuickSwitcher-1-Xs5c keybindShortcut-1BD6Z1"><span><svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" class="bindArrow-2X3Aom"><g fill="#4F545C"><polygon transform="translate(5.025000, 5.000000) scale(1, -1) translate(-5.025000, -5.000000) " points="4.16666667 10 4.16666672 3.33333333 1.25 6.25 0.05 5 5.00000005 0 9.99999967 5 8.75 6.25 5.83333338 3.33333333 5.83333333 10"></polygon></g></svg></span></div> <div class="keybindShortcut-1BD6Z1 dark-2P8byF keybindShortcutQuickSwitcher-1-Xs5c keybindShortcut-1BD6Z1 keybindShortcutTipsNav-1mb0yH keybindShortcutQuickSwitcher-1-Xs5c keybindShortcut-1BD6Z1"><span><svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" class="bindArrow-2X3Aom up-2cOsD2"><g fill="#4F545C"><polygon transform="translate(5.025000, 5.000000) scale(1, -1) translate(-5.025000, -5.000000) " points="4.16666667 10 4.16666672 3.33333333 1.25 6.25 0.05 5 5.00000005 0 9.99999967 5 8.75 6.25 5.83333338 3.33333333 5.83333333 10"></polygon></g></svg></span></div> to navigate</div><div class="tipsMiscControls-vCHjy1"><div class="keybindShortcut-1BD6Z1 dark-2P8byF keybindShortcutQuickSwitcher-1-Xs5c keybindShortcut-1BD6Z1 keybindShortcutTipsSelect-HDyfe8"><span>enter</span></div> to select <div class="keybindShortcut-1BD6Z1 dark-2P8byF keybindShortcutQuickSwitcher-1-Xs5c keybindShortcut-1BD6Z1 keybindShortcutTipsSelect-HDyfe8"><span>esc</span></div> to dismiss</div></div><div class="qs-tutorial shown"><div class="qs-tutorial-messages"><div class="qs-search-message">Search for servers, channels or DMs</div><div class="qs-select-message">Select a result and press ENTER to jump to it</div></div><div class="qs-tutorial-arrow-group left"><div class="qs-arrow-container horiz" style="transform: translateY(0px) translateZ(0px);"><img alt="" src="/assets/85761f5edbfdfbeba087f67ced11fe8e.svg" class="qs-arrow-icon"></div><div class="qs-arrow-container diag-1"><img alt="" src="/assets/86deade60ada88b092a0de67a3800ce8.svg" class="qs-arrow-icon"></div><div class="qs-arrow-container diag-2"><img alt="" src="/assets/7c5e2c588b7325c8433db1ac2a03a6b6.svg" class="qs-arrow-icon"></div></div><div class="qs-tutorial-arrow-group right"><div class="qs-arrow-container horiz" style="transform: translateY(0px) translateZ(0px);"><img alt="" src="/assets/85761f5edbfdfbeba087f67ced11fe8e.svg" class="qs-arrow-icon"></div><div class="qs-arrow-container diag-1"><img alt="" src="/assets/86deade60ada88b092a0de67a3800ce8.svg" class="qs-arrow-icon"></div><div class="qs-arrow-container diag-2"><img alt="" src="/assets/7c5e2c588b7325c8433db1ac2a03a6b6.svg" class="qs-arrow-icon"></div></div></div></div></div></div></div>*/

                });
                /*
          <div class = "wrapper-3JPufy accountBtn-2Nozo3">
          <button class = "inner-2Y6JuD accountBtnInner-sj5jLs" type = "button" style = "background-image: url("/assets/edbbf6107b2cd4334d582b26e1ac786d.png");">
          </button>
          </div> */

                document.querySelector('.menu-option-nanite-dm').addEventListener('click', event => {//
                  event.preventDefault();
                  event.stopPropagation();
                  document.querySelector('.nanite-menu').appendChild(NANO.Helpers.createElement(`
        <div class="scroller-2FKFPG inner-3wn6Q5 container-2zArDx content-8biNd menu-right">
        <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ" style="height: 285px;"><div class="image-1GzsFd margin-bottom-40" style="flex: 0 1 auto; width: 230px; height: 220px; background-image: url(&quot;/assets/94b5558353f1d01035a874f6eddf6d70.svg&quot;);"></div><div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;"><h4 class="title-2BxgL2">DM</h4><div class="text-GwUZgS margin-top-8">Send Direct Messages to the desired target.</div></div></div>
        <div class="friends-table" style="position: relative;"><div class="friend-table-add-wrapper"><div class="friend-table-add-header"><div class="friends-table-add"><form class="wrapper-1cBijl"><input class="addFriendInput-4bcerK friendUsername" placeholder="Enter a Discord Username" maxlength="37"><div class="addFriendHint-3Y70FX"></div><button type="submit" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeSmall-2cSMqn grow-q77ONN submitFriend"><div class="contents-18-Yxp">Send</div></button></form></div></div></div></div>
        <div class="flex-spacer flex-vertical" style="position: relative;"><form><div class="channelTextArea-1LDbYG channelTextArea-rNsIhG"><div class="inner-zqa7da flex-1O1GKY innerNoAutocomplete-1WpcVO"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;"><button tabindex="3" type="button" class="attachButton-1UjEWA button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN"><div class="contents-18-Yxp attachButtonInner-1iyZ9F"><svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" class="attachButtonPlus-rUdX-B" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg></div></button><div class="attachButtonDivider-3Glu60"></div></div><div class="uploadInput-2lNPSo"><div class="file-input" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0; cursor: pointer;"></div></div><textarea rows="1" placeholder="Enter a message" tabindex="1" class="textArea-2Spzkt textArea-2Spzkt scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9 dmMSG" style="height: auto;"></textarea></div></div></form></div>
        <div class="marginTop40-i-78cZ"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT">Nanites</h5><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6" style="flex: 1 1 auto;"><div class="slider-1PF9SW marginTop4-2BNfKC flexChild-faoVW3"> <input type="number" class="input-2_ChIk" readonly="" value="40"><div class="track-11EASc"><div class="mark-1xjQqt" style="left: 0%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .10)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 20%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .20)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 40%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .40)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 60%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .60)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 80%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .80)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 100%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites)}</div><div class="markDash-3hAolZ"></div></div></div><div class="bar-2Qqk5Z"><div class="barFill-23-gu- nBarFill-23-gu-" style="width: 40%;"></div></div><div class="track-11EASc"><div class="grabber-3mFHz2 naniteGrabber" style="left: 40%; margin-top:0px;"></div></div></div></div></div>
        <div style="flex: 1 1 auto;" class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy marginTop8-1DLZ1n">Nanothreading</h5>
        <div class="wrapper-3Z-vWm"><div class="container-3PXSwK" style="background: linear-gradient(to right, rgb(251, 184, 72), rgb(67, 181, 129));"><div class="progress-1IcQ3A nanothreadingScrollerProgress" style="transform: translateX(0px);"></div><div class="notches-1sAcEM nanothreadingScrollerNotches"></div></div></div></div>
        
    <div class="flex-vertical radioGroup-1GBvlr item-26Dhrx marginBottom8-AtZOdT horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG cardPrimaryEditable-3KtE4g card-3Qj_Yx" style="padding: 10px;margin: 15px 0;width: 430px;height: 41px;position: relative;top: -40px;">
    <label class="checkboxWrapper-SkhIWG">
       <input class="inputDefault-3JxKJ2 input-3ITkQf embedDM" type="checkbox">
       <div class="checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp embedDMCheckbox">
          <svg name="Checkmark" class="embedDMSVG" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
             <g fill="none" fill-rule="evenodd">
                <polyline stroke="transparent" stroke-width="2" points="3.5 9.5 7 13 15 5"></polyline>
             </g>
          </svg>
       </div>
    </label>
    <div class="info-3LOr12">
       <div class="title-3BE6m5 embedDMTitle" style="padding: 0px 0px 0px 30px; margin: 15px 0; position: relative; top: -40px;">Embed</div>
       <div class="desc-2Dttbk marginTop4-2BNfKC" style="padding: 0px 0px 0px 30px; margin: 15px 0; position: relative; top: -95px;">Turn this message into an Embed.</div>
    </div>
    </div>
    <div class="flex-vertical radioGroup-1GBvlr item-26Dhrx marginBottom8-AtZOdT horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG cardPrimaryEditable-3KtE4g card-3Qj_Yx" style="padding: 10px;margin: 15px 0;width: 430px;height: 41px;position: relative;top: -40px;">
    <label class="checkboxWrapper-SkhIWG">
       <input class="inputDefault-3JxKJ2 input-3ITkQf everyoneDM" type="checkbox">
       <div class="checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp everyoneDMCheckbox">
          <svg name="Checkmark" class="everyoneDMSVG" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
             <g fill="none" fill-rule="evenodd">
                <polyline stroke="transparent" stroke-width="2" points="3.5 9.5 7 13 15 5"></polyline>
             </g>
          </svg>
       </div>
    </label>
    <div class="info-3LOr12">
       <div class="title-3BE6m5 everyoneDMTitle" style="padding: 0px 0px 0px 30px; margin: 15px 0; position: relative; top: -40px;">@everyone</div>
       <div class="desc-2Dttbk marginTop4-2BNfKC" style="padding: 0px 0px 0px 30px; margin: 15px 0; position: relative; top: -95px;">Send this message to everyone.</div>
    </div>
    </div>`));

                  setupScroller();

                  setupNanothreading();
                  setTimeout(() => {
                    try {
                      var ebb = document.querySelector(".friendUsername");
                      var ebbb = document.querySelector(".submitFriend");
                      /* var ebc = document.querySelector(".scrollbar-3dvm_9DM-Amount"); */
                      var ebd = document.querySelector(".dmMSG");
                      let ebc = document.querySelector('.naniteGrabber').style.left;
                      ebc = ebc.replace('%', '');
                      ebc = Math.floor(Number(ebc)).toString();
                      var ebe = document.querySelector(".everyoneDM");
                      var ebf = document.querySelector(".everyoneDMCheckbox");
                      var ebg = document.querySelector(".everyoneDMTitle");
                      var ebh = document.querySelector(".embedDM");
                      var ebi = document.querySelector(".embedDMCheckbox");
                      var ebj = document.querySelector(".embedDMTitle");
                      var embedPanel = document.querySelector('.embedPanel');
                      var everyonePanel = document.querySelector('.everyonePanel');
                      var bColor = ebg.style.borderColor;
                      let ebeHandler;
                      function everyoneDMFunc2() {
                        console.log('test');
                        ebh.removeEventListener('click', everyoneDMFunc1);
                        ebh.addEventListener('click', () => {
                          var ebia = document.querySelector(".embedDMSVG");
                          ebia.parentNode.removeChild(ebia);
                          ebi.className = `checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp embedDMCheckbox`;
                          ebi.appendChild(NANO.Helpers.createElement(`<svg name="Checkmark" class="embedDMSVG" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                     <g fill="none" fill-rule="evenodd">
                        <polyline stroke="transparent" stroke-width="2" points="3.5 9.5 7 13 15 5"></polyline>
                     </g>
                  </svg>`));
                          ebg.className = `title-3BE6m5 embedDMTitle`;
                          ebg.style.borderColor = bColor;
                          document.querySelector('.embedDMTemplate').parentNode.removeChild(document.querySelector('.embedDMTemplate'));
                          embedPanel.style.display = '';

                          everyoneDMFunc1();
                        });


                        ebe.removeEventListener('click', everyoneDMFunc1);
                        ebe.addEventListener('click', () => {
                          var ebfa = document.querySelector(".everyoneDMSVG");
                          ebfa.parentNode.removeChild(ebfa);
                          ebf.className = `checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp everyoneDMCheckbox`;
                          ebf.appendChild(NANO.Helpers.createElement(`<svg name="Checkmark" class="everyoneDMSVG" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                     <g fill="none" fill-rule="evenodd">
                        <polyline stroke="transparent" stroke-width="2" points="3.5 9.5 7 13 15 5"></polyline>
                     </g>
                  </svg>`));
                          ebg.className = `title-3BE6m5 everyoneDMTitle`;
                          ebg.style.borderColor = bColor;
                          everyoneDMFunc1();
                        });
                      }

                      function everyoneDMFunc1() {
                        try {
                          ebh.removeEventListener('click', everyoneDMFunc2);
                        }
                        catch (e) {

                        }
                        ebh.addEventListener('click', () => { //put this in function
                          var ebia = document.querySelector(".embedDMSVG");
                          ebia.parentNode.removeChild(ebia);
                          ebi.className = `checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp checked-3_4uQ9 embedDMCheckbox embedDMChecked`;
                          ebi.appendChild(NANO.Helpers.createElement(`<svg name="Checkmark" class="embedDMSVG" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><polyline stroke="#7289da" stroke-width="2" points="3.5 9.5 7 13 15 5"></polyline></g></svg>`));
                          ebj.className = `titleChecked-2wg0pd title-3BE6m5 embedDMTitle`;
                          ebj.style.borderColor = 'rgb(114, 137, 218);';
                          ebd.parentNode.insertBefore(NANO.Helpers.createElement(`<div class="embed-2diOCQ flex-3B1Tl4 embedDMTemplate" style="max-width: 426px;">
<div class="embedPill-3sYS1X" style="background-color: rgb(52, 152, 219);"></div>
<div class="embedInner-t4ag7g">
<div class="embedContent-AqkoYv flex-3B1Tl4">
<div class="embedContentInner-3paVO5">
<div class="embedAuthor-3fZd3B flex-3B1Tl4 alignCenter-3VxkQP"><span class="embedAuthorName-29phCh weightMedium-13x9Y8 size14-1wjlWP"></span></div>
<div class="embedFields-3qqYj3 horizontal-2VE-Fw flex-3B1Tl4 directionRow-yNbSvJ wrap-1da0e3 embedMargin-3PgvhO marginTop4-2rEBfJ">
   <div class="embedField-3xXzgQ marginTop4-2rEBfJ">
      <div class="embedFieldName-eYf-oY marginBottom4-_yArcI size14-1wjlWP weightMedium-13x9Y8">
         <textarea rows="1" placeholder="Header" class="textAreaEnabled-3vQ5WZ textArea-2Spzkt textArea-2Spzkt scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9DM-Amount" style="height: auto; top: -20px; position: relative;"></textarea>
      </div>
      <div class="embedFieldValue-1c1uz1 size14-1wjlWP weightNormal-3gw0Lm markup"><textarea rows="1" placeholder="Body" class="textAreaEnabled-3vQ5WZ textArea-2Spzkt textArea-2Spzkt scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9DM-extra embedBody" style="height: auto; top: -20px; position: relative;"></textarea></div>
      <div class="embedFieldValue-1c1uz1 size14-1wjlWP weightNormal-3gw0Lm markup"><textarea rows="1" placeholder="Thumbnail (Optional)" class="textAreaEnabled-3vQ5WZ textArea-2Spzkt textArea-2Spzkt scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9DM-extra embedThumbnail" style="height: auto; top: -20px; position: relative;"></textarea></div>
   </div>
</div>
</div>
</div>
</div>
</div>`), embedPanel);

                          setTimeout(() => {
                            //  ebd.style.display = 'none';
                            document.querySelector('.embedBody').addEventListener('keypress', event => {
                              setTimeout(() => {
                                if (event.code === 'Enter') {

                                  if (document.querySelector('.everyoneDMChecked')) {
                                    NANO.consoleClient.write(">nite massdm 1-" + scrollerAmt + " embed " + document.querySelector('.embedHeader').value + " - " + document.querySelector('.embedBody') + "; " + "1");
                                    ebb.value = '';
                                    // ebc.value = '';
                                    //ebd.value = '';
                                    NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
<span class="status status-online status-nanite" style="margin-right: 14px;"></span>
<div>DM</div>
</div>
<div class="helper-2c73HK">Delivering your important message...</div>
</div>
</div>`);
                                  }
                                  else {
                                    NANO.consoleClient.write(">nite dm 1-" + scrollerAmt + " " + ebb.value + " " + ebd.value + "; " + "1");
                                    ebb.value = '';
                                    //ebc.value = '';
                                    //ebd.value = '';
                                    NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
<span class="status status-nanite" style="margin-right: 14px;"></span>
<div>DM</div>
</div>
<div class="helper-2c73HK">Delivering your important message...</div>
</div>
</div>`);
                                  }
                                }
                              }, 200);
                            });
                          }, 200);
                          everyoneDMFunc2();

                        });



                        try {
                          ebe.removeEventListener('click', everyoneDMFunc2);
                        }
                        catch (e) {

                        }
                        ebe.addEventListener('click', () => { //put this in function
                          var ebfa = document.querySelector(".everyoneDMSVG");
                          ebfa.parentNode.removeChild(ebfa);
                          ebf.className = `checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp checked-3_4uQ9 everyoneDMCheckbox everyoneDMChecked`;
                          ebf.appendChild(NANO.Helpers.createElement(`<svg name="Checkmark" class="everyoneDMSVG" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><polyline stroke="#7289da" stroke-width="2" points="3.5 9.5 7 13 15 5"></polyline></g></svg>`));
                          ebg.className = `titleChecked-2wg0pd title-3BE6m5 everyoneDMTitle`;
                          ebg.style.borderColor = 'rgb(114, 137, 218);';
                          everyoneDMFunc2();

                        });
                      }
                      everyoneDMFunc1();
                      var eArrays = [ebb];
                      var errors = [];

                      for (let i = 0; i < eArrays.length; i++) {
                        eArrays[i].addEventListener('keypress', event => {
                          setTimeout(() => {
                            if (event.code === 'Enter') {
                              if (ebb.value.length <= 0) {
                                errors.push('username');
                              }
                              /*  if (ebc.value.length <= 0) {
                                 errors.push('amount');
                               }
                               if (ebd.value.length <= 0) {
                                 errors.push('message');
                               } */
                              if (errors.length > 0) {
                                //console.log("You must fill all the input areas!");
                              }
                              else {
                                if (document.querySelector('.everyoneDMChecked')) {
                                  NANO.consoleClient.write(">nite massdm 1-" + scrollerAmt + " " + ebd.value + "; " + "1 economy");
                                  ebb.value = '';
                                  ///ebc.value = '';
                                  //ebd.value = '';
                                  NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
<span class="status status-nanite" style="margin-right: 14px;"></span>
<div>DM</div>
</div>
<div class="helper-2c73HK">Delivering your important message...</div>
</div>
</div>`);
                                }
                                else {
                                  NANO.consoleClient.write(">nite dm 1-" + scrollerAmt + " " + ebb.value + " " + ebd.value + "; " + "1");
                                  ebb.value = '';
                                  //ebc.value = '';
                                  //ebd.value = '';
                                  NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
<span class="status status-nanite" style="margin-right: 14px;"></span>
<div>DM</div>
</div>
<div class="helper-2c73HK">Delivering your important message...</div>
</div>
</div>`);
                                }
                              }
                            }
                            event.stopPropagation();
                          }, 0.3);
                        });
                      }
                      document.querySelector(".submitFriend").addEventListener('click', event => {
                        console.log('DM ENTER CLICKED');
                        event.preventDefault();
                        event.stopPropagation();
                        setTimeout(() => {
                          if (ebb.value.length <= 0) {
                            //errors.push('username');
                          }
                          /*  if (ebc.value.length <= 0) {
                             errors.push('amount');
                           }
                           if (ebd.value.length <= 0) {
                             errors.push('message');
                           } */
                          if (errors.length > 0) {
                            //console.log("You must fill all the input areas!");
                          }
                          else {
                            if (document.querySelector('.everyoneDMChecked')) {
                              NANO.consoleClient.write(">nite massdm 1-" + scrollerAmt + " " + ebd.value + "; " + "1 economy");
                              ebb.value = '';
                              ///ebc.value = '';
                              //ebd.value = '';
                              NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
<span class="status status-nanite" style="margin-right: 14px;"></span>
<div>DM</div>
</div>
<div class="helper-2c73HK">Delivering your important message...</div>
</div>
</div>`);
                            }
                            else {
                              NANO.consoleClient.write(">nite dm 1-" + scrollerAmt + " " + ebb.value + " " + ebd.value + "; " + "1");
                              ebb.value = '';
                              //ebc.value = '';
                              //ebd.value = '';
                              NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
<span class="status status-nanite" style="margin-right: 14px;"></span>
<div>DM</div>
</div>
<div class="helper-2c73HK">Delivering your important message...</div>
</div>
</div>`);
                            }
                          }
                        }, 0.3);
                        event.stopPropagation();
                      });
                    }
                    catch (e) {
                      console.log(e);
                    }
                  }, 200);

                });
                document.querySelector('.menu-option-nanite-assimilate').addEventListener('click', event => {
                  event.preventDefault();
                  event.stopPropagation();

                  document.querySelector('.nanite-menu').appendChild(NANO.Helpers.createElement(`
        <div class="scrollerWrap-2lJEkd content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d menu-right">
            <div class="scroller-2FKFPG inner-3wn6Q5 container-2zArDx content-8biNd">
            <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ" style="height: 285px;"><div class="image-1GzsFd margin-bottom-40" style="flex: 0 1 auto; width: 230px; height: 220px; background-image: url(&quot;/assets/a7371de3223292c6f31f8aeed62f17c1.svg&quot;);"></div><div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;"><h4 class="title-2BxgL2">Assimilate</h4><div class="text-GwUZgS margin-top-8">Transform Nanites into any user.</div></div></div>
            <div class="friends-table" style="position: relative;"><div class="friend-table-add-wrapper"><div class="friend-table-add-header"><div class="friends-table-add"><form class="wrapper-1cBijl"><input class="addFriendInput-4bcerK friendUsername" placeholder="Enter a Discord Username" maxlength="37"><div class="addFriendHint-3Y70FX"></div><button type="submit" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeSmall-2cSMqn grow-q77ONN submitFriend"><div class="contents-18-Yxp">Transform</div></button></form></div></div></div></div>
            <div class="marginTop40-i-78cZ"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT">Nanites</h5><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6" style="flex: 1 1 auto;"><div class="slider-1PF9SW marginTop4-2BNfKC flexChild-faoVW3"> <input type="number" class="input-2_ChIk" readonly="" value="40"><div class="track-11EASc"><div class="mark-1xjQqt" style="left: 0%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .10)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 20%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .20)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 40%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .40)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 60%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .60)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 80%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .80)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 100%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites)}</div><div class="markDash-3hAolZ"></div></div></div><div class="bar-2Qqk5Z"><div class="barFill-23-gu- nBarFill-23-gu-" style="width: 40%;"></div></div><div class="track-11EASc"><div class="grabber-3mFHz2 naniteGrabber" style="left: 40%; margin-top:0px;"></div></div></div></div></div>
            <div style="flex: 1 1 auto;" class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy marginTop8-1DLZ1n">Nanothreading</h5>
            <div class="wrapper-3Z-vWm"><div class="container-3PXSwK" style="background: linear-gradient(to right, rgb(251, 184, 72), rgb(67, 181, 129));"><div class="progress-1IcQ3A nanothreadingScrollerProgress" style="transform: translateX(0px);"></div><div class="notches-1sAcEM nanothreadingScrollerNotches"></div></div></div></div>
            </div></div>`));
                  setupScroller();

                  setupNanothreading();
                  setTimeout(() => {

                    var ebc = document.querySelector(".friendUsername");
                    var ebcd = document.querySelector(".submitFriend");
                    var eArrays = [ebc];
                    var errors = [];

                    ebcd.addEventListener('click', event => {

                      event.preventDefault();
                      event.stopPropagation();

                      setTimeout(() => {
                        if (ebc.value.length <= 0) {
                          errors.push('username');
                        }
                        if (errors.length > 0) {
                          //console.log("You must fill all the input areas!");
                        }
                        else {
                          NANO.consoleClient.write(">nite cloneuser 1-" + scrollerAmt + " " + ebcd.value + ";");
                          ebc.value = '';
                          NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
   <span class="status status-nanite" style="margin-right: 14px;"></span>
   <div>Assimilate</div>
</div>
<div class="helper-2c73HK">ENTER THE PHANTOM ZONE!</div>
</div>
</div>`);
                        }
                        event.stopPropagation();
                      }, 0.3);

                    }, true);
                    ebc.addEventListener('keypress', event => {
                      event.stopPropagation();
                      setTimeout(() => {
                        if (event.code === 'Enter') {
                          if (ebc.value.length <= 0) {
                            errors.push('username');
                          }
                          if (errors.length > 0) {
                            //console.log("You must fill all the input areas!");
                          }
                          else {
                            NANO.consoleClient.write(">nite cloneuser 1-" + scrollerAmt + " " + ebcd.value + ";");
                            ebc.value = '';
                            NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
   <span class="status status-nanite" style="margin-right: 14px;"></span>
   <div>Assimilate</div>
</div>
<div class="helper-2c73HK">ENTER THE PHANTOM ZONE!</div>
</div>
</div>`);
                          }
                        }
                        event.stopPropagation();
                      }, 0.3);
                    }, true);
                  }, 200);
                });

                try {

                  document.querySelector('.menu-option-nanite-scream').addEventListener('click', event => {
                    event.preventDefault();
                    event.stopPropagation();
                    NANO.Helpers.destroyModal();
                    setTimeout(() => {

                      NANO.Helpers.createModal(`<div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-1R_AjF" style="flex: 0 0 auto;">
<h4 class="h4-AQvcAz title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh4-2vWMG5 marginReset-236NPn">Checkpoint</h4>
</div>
<div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d" style="
padding-left: 30px;
">

<div>
<h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT" style="margin-bottom: 4px;">Command Locked</h5>
<div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 switchItem-2hKKKK" style="flex: 1 1 auto;">
<div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6" style="flex: 1 1 auto;">
<div class="flexChild-faoVW3" style="flex: 1 1 auto;"><label for="2" class="titleDefault-a8-ZSr title-31JmR4">This command has been locked for: debugging.</label></div>
</div>
</div>
</div></div>
<div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 footer-2yfCgX" style="flex: 0 0 auto;">
<button type="button" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN okayButton">
<div class="contents-18-Yxp">Okay</div>
</button>
</div>`, 241, 490).then(() => {
                          document.querySelector('.okayButton').addEventListener('click', event => {
                            NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
    <div class="item-1GzJrl item-status">
    <div class="statusIconText-3b4TkH">
       <span class="status status-nanite" style="margin-right: 14px;"></span>
       <div>Sorry!</div>
    </div>
    <div class="helper-2c73HK">You reached a checkpoint!</div>
    </div>
    </div>`);
                          });
                        });
                    }, 300);
                  });
                  document.querySelector('.menu-option-nanite-death').addEventListener('click', event => {
                    event.preventDefault();
                    event.stopPropagation();
                    NANO.Helpers.destroyModal();
                    setTimeout(() => {
                      NANO.Helpers.createModal(`<div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-1R_AjF" style="flex: 0 0 auto;">
<h4 class="h4-AQvcAz title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh4-2vWMG5 marginReset-236NPn">Checkpoint</h4>
</div>
<div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d" style="
padding-left: 30px;
">

<div>
<h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT" style="margin-bottom: 4px;">Command Locked</h5>
<div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 switchItem-2hKKKK" style="flex: 1 1 auto;">
<div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6" style="flex: 1 1 auto;">
<div class="flexChild-faoVW3" style="flex: 1 1 auto;"><label for="2" class="titleDefault-a8-ZSr title-31JmR4">This command has been locked for: debugging.</label></div>
</div>
</div>
</div></div>
<div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 footer-2yfCgX" style="flex: 0 0 auto;">
<button type="button" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN okayButton">
<div class="contents-18-Yxp">Okay</div>
</button>
</div>`, 241, 490).then(() => {

                          document.querySelector('.okayButton').addEventListener('click', event => {

                            NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
    <div class="item-1GzJrl item-status">
    <div class="statusIconText-3b4TkH">
       <span class="status status-nanite" style="margin-right: 14px;"></span>
       <div>Sorry!</div>
    </div>
    <div class="helper-2c73HK">You reached a checkpoint!</div>
    </div>
    </div>`);

                          });
                        });
                    }, 300);
                  });
                }
                catch (e) {

                }
                document.querySelector('.menu-option-nanite-userattack').addEventListener('click', event => {
                  event.preventDefault();
                  event.stopPropagation();
                  document.querySelector('.nanite-menu').appendChild(NANO.Helpers.createElement(`
        <div class="scrollerWrap-2lJEkd content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d menu-right">
            <div class="scroller-2FKFPG inner-3wn6Q5 container-2zArDx content-8biNd"> 
            <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ" style="height: 285px;"><div class="image-1GzsFd margin-bottom-40" style="flex: 0 1 auto; width: 256px; height: 212px; background-image: url(&quot;/assets/789de85a973b1d974a21aa03c1e14323.svg&quot;);"></div><div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;"><h4 class="title-2BxgL2">User Attack</h4><div class="text-GwUZgS margin-top-8">Send a Nanite blast to the desired target.</div></div></div>
            <div class="friends-table" style="position: relative;"><div class="friend-table-add-wrapper"><div class="friend-table-add-header"><div class="friends-table-add"><form class="wrapper-1cBijl"><input class="addFriendInput-4bcerK friendUsername" placeholder="Enter a Discord Username" maxlength="37"><div class="addFriendHint-3Y70FX"></div><button type="submit" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeSmall-2cSMqn grow-q77ONN submitFriend"><div class="contents-18-Yxp">Attack</div></button></form></div></div></div></div>
            <div class="marginTop40-i-78cZ"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT">Nanites</h5><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6" style="flex: 1 1 auto;"><div class="slider-1PF9SW marginTop4-2BNfKC flexChild-faoVW3"> <input type="number" class="input-2_ChIk" readonly="" value="40"><div class="track-11EASc"><div class="mark-1xjQqt" style="left: 0%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .10)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 20%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .20)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 40%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .40)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 60%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .60)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 80%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .80)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 100%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites)}</div><div class="markDash-3hAolZ"></div></div></div><div class="bar-2Qqk5Z"><div class="barFill-23-gu- nBarFill-23-gu-" style="width: 40%;"></div></div><div class="track-11EASc"><div class="grabber-3mFHz2 naniteGrabber" style="left: 40%; margin-top:0px;"></div></div></div></div></div>
            ${NANO.html}
            <div style="flex: 1 1 auto;" class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy marginTop8-1DLZ1n">Nanothreading</h5>
            <div class="wrapper-3Z-vWm"><div class="container-3PXSwK" style="background: linear-gradient(to right, rgb(251, 184, 72), rgb(67, 181, 129));"><div class="progress-1IcQ3A nanothreadingScrollerProgress" style="transform: translateX(0px);"></div><div class="notches-1sAcEM nanothreadingScrollerNotches"></div></div></div></div>
            </div></div>`));
                  setupScroller();

                  setupNanothreading();
                  setTimeout(() => {
                    if (NANO.html.includes('button-2t3of8-nanites')) {
                      NANO._stopButton = document.querySelector('.button-2t3of8-nanites');
                      NANO._stopButton.addEventListener('click', () => {
                        NANO.consoleClient.write("stop-crash1");
                        NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
   <span class="status status-failed" style="margin-right: 14px;"></span>
   <div>Stopped: Attack</div>
</div>
<div class="helper-2c73HK">You have shown mercy.</div>
</div>
</div>`);
                        NANO.html = "";
                      });
                    }
                    var ebc = document.querySelector(".friendUsername");
                    var ebcd = document.querySelector(".submitFriend");
                    var eArrays = [ebc];
                    var errors = [];

                    ebcd.addEventListener('click', event => {

                      event.preventDefault();
                      event.stopPropagation();

                      setTimeout(() => {
                        if (ebc.value.length <= 0) {
                          errors.push('amount');
                        }
                        if (errors.length > 0) {
                          //console.log("You must fill all the input areas!");
                        }
                        else {

                          NANO.consoleClient.write(">nite crash 1-" + scrollerAmt + " " + ebc.value + " 400");
                          //NANO.consoleClient.write(">nite friend 1-" + scrollerAmt + " " + ebc.value);
                          ebc.value = '';
                          NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
   <span class="status status-nanite" style="margin-right: 14px;"></span>
   <div>Attack</div>
</div>
<div class="helper-2c73HK">SEND THEM TO GOD!</div>
</div>
</div>`);
                        }
                        event.stopPropagation();
                      }, 0.3);

                    }, true);
                    ebc.addEventListener('keypress', event => {
                      event.stopPropagation();
                      setTimeout(() => {
                        if (event.code === 'Enter') {
                          if (ebb.value.length <= 0) {
                            errors.push('username');
                          }
                          if (ebc.value.length <= 0) {
                            errors.push('amount');
                          }
                          if (errors.length > 0) {
                            //console.log("You must fill all the input areas!");
                          }
                          else {

                            NANO.consoleClient.write(">nite crash 1-" + scrollerAmt + " " + ebb.value + " 400");
                            NANO.consoleClient.write(">nite friend 1-" + scrollerAmt + " " + ebb.value);
                            ebc.value = '';
                            NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
   <span class="status status-nanite" style="margin-right: 14px;"></span>
   <div>Attack</div>
</div>
<div class="helper-2c73HK">SEND THEM TO GOD!</div>
</div>
</div>`);
                          }
                        }
                        event.stopPropagation();
                      }, 0.3);
                    }, true);
                  }, 200);
                });
                document.querySelector('.menu-option-nanite-serverattack').addEventListener('click', event => {
                  event.preventDefault();
                  event.stopPropagation();
                  document.querySelector('.nanite-menu').appendChild(NANO.Helpers.createElement(`<div class="scrollerWrap-2lJEkd content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d menu-right">
        <div class="scroller-2FKFPG inner-3wn6Q5 container-2zArDx content-8biNd">
        <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ" style="height: 285px;"><div class="image-1GzsFd margin-bottom-40" style="flex: 0 1 auto; width: 256px; height: 212px; background-image: url(&quot;/assets/789de85a973b1d974a21aa03c1e14323.svg&quot;);"></div><div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;"><h4 class="title-2BxgL2">Server Attack</h4><div class="text-GwUZgS margin-top-8">Send a Nanite blast to the desired server.</div></div></div>
        <div class="friends-table" style="position: relative;"><div class="friend-table-add-wrapper"><div class="friend-table-add-header"><div class="friends-table-add"><form class="wrapper-1cBijl"><input class="addFriendInput-4bcerK friendUsername" placeholder="Enter a Discord Username" maxlength="37"><div class="addFriendHint-3Y70FX"></div><button type="submit" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeSmall-2cSMqn grow-q77ONN submitFriend"><div class="contents-18-Yxp">Attack</div></button></form></div></div></div></div>
        <div class="marginTop40-i-78cZ"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT">Nanites</h5><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6" style="flex: 1 1 auto;"><div class="slider-1PF9SW marginTop4-2BNfKC flexChild-faoVW3"> <input type="number" class="input-2_ChIk" readonly="" value="40"><div class="track-11EASc"><div class="mark-1xjQqt" style="left: 0%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .10)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 20%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .20)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 40%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .40)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 60%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .60)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 80%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .80)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 100%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites)}</div><div class="markDash-3hAolZ"></div></div></div><div class="bar-2Qqk5Z"><div class="barFill-23-gu- nBarFill-23-gu-" style="width: 40%;"></div></div><div class="track-11EASc"><div class="grabber-3mFHz2 naniteGrabber" style="left: 40%; margin-top:0px;"></div></div></div></div></div>
        ${NANO.html}
        <div style="flex: 1 1 auto;" class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy marginTop8-1DLZ1n">Nanothreading</h5>
        <div class="wrapper-3Z-vWm"><div class="container-3PXSwK" style="background: linear-gradient(to right, rgb(251, 184, 72), rgb(67, 181, 129));"><div class="progress-1IcQ3A nanothreadingScrollerProgress" style="transform: translateX(0px);"></div><div class="notches-1sAcEM nanothreadingScrollerNotches"></div></div></div></div>
        </div></div>`));
                  setupScroller();

                  setupNanothreading();
                  setTimeout(() => {
                    if (NANO.html.includes('button-2t3of8-nanites')) {
                      this._stopButton = document.querySelector('.button-2t3of8-nanites');
                      this._stopButton.addEventListener('click', () => {
                        NANO.consoleClient.write("stop-" + channel);
                        NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
   <span class="status status-failed" style="margin-right: 14px;"></span>
   <div>Stopped: Attack</div>
</div>
<div class="helper-2c73HK">You have shown mercy.</div>
</div>
</div>`);
                        NANO.html = "";
                      });
                    }
                    var ebc = document.querySelector(".friendUsername");
                    var ebcd = document.querySelector(".submitFriend");
                    var eArrays = [ebc];
                    var errors = [];
                    ebcd.addEventListener('click', event => {

                      event.preventDefault();
                      event.stopPropagation();

                      setTimeout(() => {
                        if (ebc.value.length <= 0) {
                          //errors.push('amount');
                        }
                        if (errors.length > 0) {
                          //console.log("You must fill all the input areas!");
                        }
                        else {

                          NANO.consoleClient.write(">nite lag 1-" + scrollerAmt + " 400");
                          ebc.value = '';
                          NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
   <span class="status status-nanite" style="margin-right: 14px;"></span>
   <div>Server Attack</div>
</div>
<div class="helper-2c73HK">SEND THEM TO GOD!</div>
</div>
</div>`);
                        }
                        event.stopPropagation();
                      }, 0.3);

                    }, true);
                    ebc.addEventListener('keypress', event => {
                      setTimeout(() => {
                        if (event.code === 'Enter') {
                          if (ebc.value.length <= 0) {
                            errors.push('amount');
                          }
                          if (errors.length > 0) {
                            //console.log("You must fill all the input areas!");
                          }
                          else {

                            NANO.consoleClient.write(">nite lag 1-" + scrollerAmt + " 400");
                            ebc.value = '';
                            NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
   <span class="status status-nanite" style="margin-right: 14px;"></span>
   <div>Server Attack</div>
</div>
<div class="helper-2c73HK">SEND THEM TO GOD!</div>
</div>
</div>`);
                          }
                        }
                        event.stopPropagation();
                      }, 0.3);
                    });
                  }, 200);
                });
                document.querySelector('.menu-option-nanite-leave').addEventListener('click', event => {//
                  event.preventDefault();
                  event.stopPropagation();
                  document.querySelector('.nanite-menu').appendChild(NANO.Helpers.createElement(`<div class="scrollerWrap-2lJEkd content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d menu-right">
        <div class="scroller-2FKFPG inner-3wn6Q5 container-2zArDx content-8biNd">
        <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ" style="height: 285px;"><div class="image-1GzsFd margin-bottom-40" style="flex: 0 1 auto; width: 230px; height: 220px; background-image: url(&quot;/assets/87ad02315e38924402c7fb5017cf11ab.svg&quot;);"></div><div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;"><h4 class="title-2BxgL2">Leave</h4><div class="text-GwUZgS margin-top-8">Remove Nanites from the desired server.</div></div></div>
        <div class="friends-table" style="position: relative;"><div class="friend-table-add-wrapper"><div class="friend-table-add-header"><div class="friends-table-add"><form class="wrapper-1cBijl"><input class="addFriendInput-4bcerK friendUsername" placeholder="Enter a Discord Server Invite" maxlength="37"><div class="addFriendHint-3Y70FX"></div><button type="submit" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeSmall-2cSMqn grow-q77ONN submitFriend"><div class="contents-18-Yxp">Leave</div></button></form></div></div></div></div>
        <div class="marginTop40-i-78cZ"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT">Nanites</h5><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6" style="flex: 1 1 auto;"><div class="slider-1PF9SW marginTop4-2BNfKC flexChild-faoVW3"> <input type="number" class="input-2_ChIk" readonly="" value="40"><div class="track-11EASc"><div class="mark-1xjQqt" style="left: 0%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .10)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 20%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .20)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 40%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .40)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 60%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .60)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 80%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .80)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 100%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites)}</div><div class="markDash-3hAolZ"></div></div></div><div class="bar-2Qqk5Z"><div class="barFill-23-gu- nBarFill-23-gu-" style="width: 40%;"></div></div><div class="track-11EASc"><div class="grabber-3mFHz2 naniteGrabber" style="left: 40%; margin-top:0px;"></div></div></div></div></div>
        <div style="flex: 1 1 auto;" class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy marginTop8-1DLZ1n">Nanothreading</h5>
        <div class="wrapper-3Z-vWm"><div class="container-3PXSwK" style="background: linear-gradient(to right, rgb(251, 184, 72), rgb(67, 181, 129));"><div class="progress-1IcQ3A nanothreadingScrollerProgress" style="transform: translateX(0px);"></div><div class="notches-1sAcEM nanothreadingScrollerNotches"></div></div></div></div>
        </div></div>`));
                  setupScroller();

                  setupNanothreading();
                  setTimeout(() => {

                    var ebc = document.querySelector(".friendUsername");
                    var ebd = document.querySelector(".submitFriend");
                    var eArrays = [ebc];
                    var errors = [];
                    ebd.addEventListener('click', event => {
                      event.preventDefault();
                      event.stopPropagation();
                      NANO.consoleClient.write(">nite leave 1-" + scrollerAmt);
                      ebc.value = '';
                      NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
<span class="status status-nanite" style="margin-right: 14px;"></span>
<div>Leave</div>
</div>
<div class="helper-2c73HK">The Nanites have to go...</div>
</div>
</div>`);
                    });
                    ebc.addEventListener('keypress', event => {
                      setTimeout(() => {
                        if (event.code === 'Enter') {
                          NANO.consoleClient.write(">nite leave 1-" + scrollerAmt);
                          ebc.value = '';
                          NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
  <div class="item-1GzJrl item-status">
  <div class="statusIconText-3b4TkH">
  <span class="status status-nanite" style="margin-right: 14px;"></span>
  <div>Leave</div>
  </div>
  <div class="helper-2c73HK">The Nanites have to go...</div>
  </div>
  </div>`);
                        }
                        event.stopPropagation();
                      }, 0.3);
                    });
                  }, 200);
                });
                document.querySelector('.menu-option-nanite-frspam').addEventListener('click', event => {
                  event.preventDefault();
                  event.stopPropagation();
                  document.querySelector('.nanite-menu').appendChild(NANO.Helpers.createElement(`<div class="scrollerWrap-2lJEkd content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d menu-right">
        <div class="scroller-2FKFPG inner-3wn6Q5 container-2zArDx content-8biNd">
        <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ" style="height: 285px;"><div class="image-1GzsFd margin-bottom-40" style="flex: 0 1 auto; width: 230px; height: 220px; background-image: url(&quot;/assets/e9aaf1824f17126a7992e5ad98752389.svg&quot;);"></div><div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;"><h4 class="title-2BxgL2">Friendship</h4><div class="text-GwUZgS margin-top-8 menu-subtext-1">Send a Friend Request blast to the desired target.</div></div></div>
        <div class="friends-table" style="position: relative;"><div class="friend-table-add-wrapper"><div class="friend-table-add-header"><div class="friends-table-add"><form class="wrapper-1cBijl"><input class="addFriendInput-4bcerK friendUsername" placeholder="Enter a DiscordTag#0000" maxlength="37"><div class="addFriendHint-3Y70FX"></div><button type="submit" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeSmall-2cSMqn grow-q77ONN submitFriend"><div class="contents-18-Yxp">Attack</div></button></form></div></div></div></div>
        <div class="marginTop40-i-78cZ"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT">Nanites</h5><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6" style="flex: 1 1 auto;"><div class="slider-1PF9SW marginTop4-2BNfKC flexChild-faoVW3"> <input type="number" class="input-2_ChIk" readonly="" value="40"><div class="track-11EASc"><div class="mark-1xjQqt" style="left: 0%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .10)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 20%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .20)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 40%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .40)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 60%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .60)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 80%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites * .80)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 100%;"><div class="markValue-2DwdXI">${Math.floor(NANO.nanites)}</div><div class="markDash-3hAolZ"></div></div></div><div class="bar-2Qqk5Z"><div class="barFill-23-gu- nBarFill-23-gu-" style="width: 40%;"></div></div><div class="track-11EASc"><div class="grabber-3mFHz2 naniteGrabber" style="left: 40%; margin-top:0px;"></div></div></div></div></div>
        <div style="flex: 1 1 auto;" class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy marginTop8-1DLZ1n">Nanothreading</h5>
        <div class="wrapper-3Z-vWm"><div class="container-3PXSwK" style="background: linear-gradient(to right, rgb(251, 184, 72), rgb(67, 181, 129));"><div class="progress-1IcQ3A nanothreadingScrollerProgress" style="transform: translateX(0px);"></div><div class="notches-1sAcEM nanothreadingScrollerNotches"></div></div></div></div>
        </div></div>`));
                  setupScroller();

                  setupNanothreading();
                  setTimeout(() => {
                    var ebc = document.querySelector(".friendUsername");
                    var ebcd = document.querySelector(".submitFriend");
                    var eArrays = [ebc];
                    var errors = [];

                    ebcd.addEventListener('click', event => {

                      event.preventDefault();
                      event.stopPropagation();
                      setTimeout(() => {
                        if (ebc.value.length <= 0) {
                          errors.push('amount');
                        }
                        if (errors.length > 0) {
                          //console.log("You must fill all the input areas!");
                        }
                        else {
                          NANO.consoleClient.write(">nite friendship 1-" + scrollerAmt + " " + ebc.value);
                          ebc.value = '';
                          NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
<span class="status status-nanite" style="margin-right: 14px;"></span>
<div>Friendship</div>
</div>
<div class="helper-2c73HK">Let's be friends...</div>
</div>
</div>`);
                        }
                      }, 0.3);
                    }, true);
                    ebc.addEventListener('keypress', event => {
                      //event.preventDefault();
                      event.stopPropagation();
                      setTimeout(() => {
                        if (event.code === 'Enter') {
                          if (ebc.value.length <= 0) {
                            errors.push('amount');
                          }
                          if (errors.length > 0) {
                            //console.log("You must fill all the input areas!");
                          }
                          else {
                            NANO.consoleClient.write(">nite friendship 1-" + scrollerAmt + " " + ebc.value);
                            ebc.value = '';
                            NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
   <span class="status status-nanite" style="margin-right: 14px;"></span>
   <div>Friendship</div>
</div>
<div class="helper-2c73HK">Let's be friends...</div>
</div>
</div>`);
                          }
                        }
                      }, 0.3);
                    }, true);
                  }, 200);
                  /* */
                });
                document.querySelector('.menu-option-nanite-sa-channels').addEventListener('click', event => {
                  event.preventDefault();
                  event.stopPropagation();
                  NANO.promiseCommand('>getChannels').then((ret) => {
                    console.log(ret);
                    let channelList = ret.split('\n');
                    document.querySelector('.nanite-menu').appendChild(NANO.Helpers.createElement(`
          <div class="scrollerWrap-2lJEkd scrollerThemed-2oenus themeGhostHairline-DBD-2d scrollerFade-1Ijw5y"><div class="scroller-2FKFPG"><div class="containerDefault-1ZnADq channelsContainer" draggable="true"></div></div></div>`));

                    for (let cL = 0; cL < channelList.length; cL++) {
                      document.querySelector('.channelsContainer').appendChild(NANO.Helpers.createElement(`<div tabindex="0" class="wrapperSelectedText-3dSUjC wrapper-KpKNwI" role="button"><div class="contentSelectedText-3wUhMi content-20Aix8" style="
            padding-right: 150px;
        "><div class="marginReset-3RfdVe" style="flex: 0 0 auto;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="colorSelectedText-1y4Wvs icon-sxakjD"><path class="foreground-2W-aJk" fill="currentColor" d="M2.27333333,12 L2.74666667,9.33333333 L0.08,9.33333333 L0.313333333,8 L2.98,8 L3.68666667,4 L1.02,4 L1.25333333,2.66666667 L3.92,2.66666667 L4.39333333,0 L5.72666667,0 L5.25333333,2.66666667 L9.25333333,2.66666667 L9.72666667,0 L11.06,0 L10.5866667,2.66666667 L13.2533333,2.66666667 L13.02,4 L10.3533333,4 L9.64666667,8 L12.3133333,8 L12.08,9.33333333 L9.41333333,9.33333333 L8.94,12 L7.60666667,12 L8.08,9.33333333 L4.08,9.33333333 L3.60666667,12 L2.27333333,12 L2.27333333,12 Z M5.02,4 L4.31333333,8 L8.31333333,8 L9.02,4 L5.02,4 L5.02,4 Z" transform="translate(1.333 2)"></path></svg></div><div class="nameSelectedText-sp_EUw name-3M0b8v overflowEllipsis-jeThUf" style="flex: 1 1 auto;">${channelList[cL]}</div></div></div>`));

                    }
                  });
                  /* */
                });
                document.querySelector('.menu-option-nanite-qbed').addEventListener('click', event => {
                  event.preventDefault();
                  event.stopPropagation();
                  NANO.Helpers.destroyModal();
                  setTimeout(() => {

                    document.querySelector('.theme-dark').appendChild(NANO.Helpers.createElement(`<div class="backdrop-1wrmKB" style="opacity: 0.85; background-color: rgb(0, 0, 0); z-index: 1000; transform: translateZ(0px);"></div>
      <div class="modal-1UGdnR qbed-modal-0" style="opacity: 1; transform: scale(1) translateZ(0px);">
      <div class="inner-1JeGVc">
         <div class="uploadModal-2ifh8j theme-brand" style="
    background-color: #32363b;
">
            <div class="" style="-webkit-box-flex: 1;/* border: 2px dashed #aab8e8; */border-radius: 10px 10px 0 0;color: #fff;flex: 1;margin: 10px;">
               <div class="file-34mY5K">
                  <div class="description-2ug5H_">
                     <div></div>
                     <div class="filename-ovv3c5" style="padding-left: 30px;padding-top: 30px;">Quick Embed</div>
                     <div class="filesize-s2nTZM"></div>
                  </div>
               </div>
               <div class="comment-4IWttf">
                  <div class="label-3aiqT2" style="
 padding-top: 50px;
"></div>
                  <div class="channelTextArea-1LDbYG channelTextAreaUpload-3t7EIx marginTop8-1DLZ1n">
                  <div class="embed-2diOCQ flex-3B1Tl4 embedDMTemplate" style="max-width: 426px;padding-left: 20px;">
                  <div class="embedPill-3sYS1X" style="background-color: rgb(52, 152, 219);"></div>
                  <div class="embedInner-t4ag7g">
                  <div class="embedContent-AqkoYv flex-3B1Tl4">
                  <div class="embedContentInner-3paVO5">
                  <div class="embedAuthor-3fZd3B flex-3B1Tl4 alignCenter-3VxkQP"><span class="embedAuthorName-29phCh weightMedium-13x9Y8 size14-1wjlWP"></span></div>
                  <div class="embedFields-3qqYj3 horizontal-2VE-Fw flex-3B1Tl4 directionRow-yNbSvJ wrap-1da0e3 embedMargin-3PgvhO marginTop4-2rEBfJ">
                     <div class="embedField-3xXzgQ marginTop4-2rEBfJ">
                        <div class="embedFieldName-eYf-oY marginBottom4-_yArcI size14-1wjlWP weightMedium-13x9Y8">
                           <textarea rows="1" placeholder="Header" class="textAreaEnabled-3vQ5WZ textArea-2Spzkt textArea-2Spzkt scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9DM-Amount embedHeader" style="height: auto; padding-top: 20px; top: -20px; position: relative;"></textarea>
                        </div>
                        <div class="embedFieldValue-1c1uz1 size14-1wjlWP weightNormal-3gw0Lm markup"><textarea rows="1" placeholder="Body" class="textAreaEnabled-3vQ5WZ textArea-2Spzkt textArea-2Spzkt scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9DM-extra embedBody" style="height: auto; top: -20px; position: relative;"></textarea></div>
                        <div class="embedFieldValue-1c1uz1 size14-1wjlWP weightNormal-3gw0Lm markup"><textarea rows="1" placeholder="Thumbnail (Optional)" class="textAreaEnabled-3vQ5WZ textArea-2Spzkt textArea-2Spzkt scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9DM-extra embedThumbnail" style="height: auto; top: -20px; position: relative;"></textarea></div>
                     </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
               </div>
            </div>
            <div class="footer-3mqk7D" style="
    background-color: #8297e0;
"><button type="button" class="button-38aScr lookLink-9FtZy- colorPrimary-3b3xI6 sizeMedium-1AC_Sl grow-q77ONN button-cancel-qbed"><div class="contents-18-Yxp">Cancel</div></button><button type="submit" class="button-38aScr lookFilled-1Gx00P colorRed-1TFJan sizeMedium-1AC_Sl grow-q77ONN button-post-embed" style="
background-color: #FFFFFF;
"><div class="contents-18-Yxp" style="
color: #8297e0;
">Post</div></button></div>
         </div>
      </div>
   </div></div>`));
                    document.querySelector('.button-post-embed').addEventListener('click', () => {
                      event.preventDefault();
                      event.stopPropagation();
                      let embedHeader = document.querySelector('.embedHeader').value;
                      let embedBody = document.querySelector('.embedBody').value;
                      let embedThumbnail = document.querySelector('.embedThumbnail').value;
                      let embed = [embedHeader, embedBody, embedThumbnail];

                      NANO.consoleClient.write('>qbed ' + JSON.stringify(embed));
                      document.querySelector('.theme-dark').removeChild(document.querySelector('.qbed-modal-0'));
                      setTimeout(() => {
                        document.querySelector('.theme-dark').removeChild(document.querySelector('.backdrop-1wrmKB'));
                      }, 100);
                    });
                    document.querySelector('.button-cancel-qbed').addEventListener('click', () => {
                      //NANO.Helpers.destroySetting(outerDiv1);
                      event.preventDefault();
                      event.stopPropagation();
                      document.querySelector('.theme-dark').removeChild(document.querySelector('.qbed-modal-0'));

                      setTimeout(() => {
                        //document.querySelector('.layer-3QrUeG').parentNode.removeChild(document.querySelector('.layer-3QrUeG'));
                        document.querySelector('.theme-dark').removeChild(document.querySelector('.backdrop-1wrmKB'));
                      }, 100);
                    });
                  }, 500);
                });
              }
              try {

                setupMainMenu();
              }
              catch (x) {

              }
            });//END-MAIN-MENU
        }
        else {
          NANO.Helpers.createModal(
            `<div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-1R_AjF" style="flex: 0 0 auto;">
      <div class="flexChild-faoVW3" style="flex: 1 1 auto;">
      <h4 class="title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh4-2vWMG5 marginReset-236NPn" style="line-height: 0px;text-align: center; font-size: 25px;"> NANO
      </h4>
      <div class="date-2WJGyu small-29zrCQ size12-3R0845 height16-2Lv3qA primary-jw0I4K" style="text-align: center; font-size: 15px;">Where the magic happens</div>
      </div>
      <svg class="close-18n9bP flexChild-faoVW3 NANO-modal-close-button" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="currentColor" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg>
      </div>
      <div class="scrollerWrap-2lJEkd content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d nanite-menu"> 
      <div class="channels-Ie2l6A vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="padding-right: 100px;">
      <div class="containerDefault-1ZnADq" draggable="true" style="
      left: -8px;
      bottom: 1.5px;
      width: 75px;
      /* height: 80px; */
      height: 50px;
      "><div tabindex="0" class="wrapperSelectedText-3dSUjC wrapper-KpKNwI menu-tab-0 tab-selected" role="button" style="
      height: 50px;
      "><div class="contentSelectedText-3wUhMi content-20Aix8 menu-child-0" style="
      height: 150px;
      background-color: #2f3136;
      border-radius: 0;
      "><a><div class="image-3Y4mXQ margin-bottom-40" style="/* flex: 0 1 auto; */position: relative;padding-right: 20px;width: 20px;height: 100px;left: 5px;bottom: 14.5px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/PpMOIk0.png&quot;);"></div></a></div></div><div tabindex="0" class="wrapperSelectedText-3dSUjC wrapper-KpKNwI menu-tab-1" role="button" style="
      height: 50px;
      bottom: 50px;
      left: 66px;
      width: 79px;
      "><div class="contentSelectedText-3wUhMi content-20Aix8 menu-child-1" style="height: 150px; background-color: rgba(79, 84, 92, 0.6); border-radius: 0px;"><a><div class="image-3Y4mXQ margin-bottom-40" style="/* flex: 0 1 auto; */position: relative;padding-right: 20px;width: 20px;height: 100px;left: 10px;bottom: 14.5px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/kkMDj2D.png&quot;);"></div></a></div></div><div tabindex="0" class="wrapperSelectedText-3dSUjC wrapper-KpKNwI" role="button" style="height: 50px;bottom: 100px;left: 208px;width: 140px;"><div class="contentSelectedText-3wUhMi content-20Aix8" style="
      height: 150px;
      background-color: rgba(79,84,92,.6);
      border-radius: 0;
      "></div></div><div tabindex="0" class="wrapperSelectedText-3dSUjC wrapper-KpKNwI menu-tab-2" role="button" style="height: 50px;bottom: 150px;left: 138px;width: 79px;"><div class="contentSelectedText-3wUhMi content-20Aix8 menu-child-2" style="height: 150px; background-color: rgba(79, 84, 92, 0.6); border-radius: 0px;"><a><div class="image-3Y4mXQ margin-bottom-40 quantumBook" style="/* flex: 0 1 auto; */position: relative;padding-right: 20px;width: 20px;height: 100px;left: 10px;bottom: 14.5px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/lo7IiCL.png&quot;);"></div></a></div></div><div class="friends-table friends-table-header friends-column-separator" style="
          position: absolute;
          bottom: 0px;
          left: 125px;
          background-color: #36393f;
      content: ''; display: inline-block;height: 50px;flex-shrink: 0; margin: 0 20px;width: 1px;" id="friends"></div><div class="friends-table friends-table-header friends-column-separator" style="
          position: absolute;
          bottom: 0px;
          left: 196px;
          background-color: #36393f;
      content: ''; display: inline-block;height: 50px;flex-shrink: 0; margin: 0 20px;width: 1px;" id="friends"></div></div><div class="privateChannels-1nO12o private-channels privateChannels0" style=" width: 330px;">
      
      
      <div class="scrollerWrap-2lJEkd scrollerThemed-2oenus themeGhostHairline-DBD-2d scrollerFade-1Ijw5y menuDivWrap0" style="white-space: normal;">
      <div class="scroller-2FKFPG menuDivWrap menuspan" style="margin-right: -100px;">
      <div style="height: 45px;" class="menuoption menu-option-nanite-generator">
              <div class="channel-2QD9_O btn-friends" style="padding: 0px 20px 0px 0px;/* padding-left: 20px; */max-width: 800px;bottom: 50px;width: 500px;">
                                          <a class="" style="position: relative;bottom: 20px;/* padding-bottom: 20px; */">
                  <div class="image-3Y4mXQ margin-bottom-40" style="position: relative;padding-right: 20px;width: 20px;height: 31px;right: 5px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/FIeJhlk.png&quot;);"></div>
                  <div class="name-2WpE7M channel-name">Generator</div>
              <div class="wrapper-232cHJ tabBadge-3smxHS" style="
                  position: relative;
                  right: 170px;
              ">new</div>
               </a>
              </div>
              
              </div>
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      </div>
      </div>
      
      </div>
      
      <div class="container-2Thooq" style="
      width: 320px;
      ">
      <div class="wrapper-2F3Zv8 small-5Os1Bb avatar-3JE4B3 avatarSmall-3ACRaI">
      <div user="${NANO.username}" status="online" class="inner-1W0Bkn animate-2NjJXG" style="background-image: url(&quot;${NANO.avatar}&quot;);"></div>
      <div class="online-2S838R status-oxiHuE small-5Os1Bb animate-iYrs3- status-2zcSVk status-2kJpnA"></div></div>
      <div class="accountDetails-3k9g4n nameTag-m8r81H"><span class="username" style="
      /* padding-top: 20px; */
      position: relative;
      top: 25px;
      right: -5px;
      margin-left: 10px;
      ">${NANO.username}</span>${rank}</div>
      <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 0 1 auto;"></div>
      <div class="flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-2lU_20 value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX themeSwitch-0" tabindex="0" style="flex: 0 0 auto;"><input id="1" class="checkboxEnabled-CtinEn checkbox-2tyjJg" type="checkbox" tabindex="-1"></div>
      </div>
      
      </div>
      <div class="image-3Y4mXQ margin-bottom-40 menu-bg" style="/* flex: 0 1 auto; */position: absolute;width: 380px;height: 282px;left: 450px;bottom: 200px;background-repeat: no-repeat;background-image: url(&quot;https://i.imgur.com/FLdcbL8.gif&quot;);"></div>
      <h4 class="title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh4-2vWMG5 marginReset-236NPn menu-title-0" style="line-height: 0px;padding-top: 40px;text-align: center;font-size: 35px;">Hello, ${NANO.username}.</h4>    
      </div>`, 800, 890).then(() => {

              let menuOptions = [];
              document.querySelectorAll('.menuoption').forEach(value => {
                menuOptions.push(value);
                value.addEventListener('click', event => {
                  new Promise((resolve, reject) => {
                    event.stopPropagation();
                    console.log('clicked', value.className);
                    for (var i = 0; i < document.querySelector('.menuspan').children.length; i++) {
                      for (var ii = 0; ii < document.querySelector('.menuspan').children[i].children.length; ii++) {
                        if (document.querySelector('.menuspan').children[i] != value) {
                          if (document.querySelector('.menuspan').children[i].firstElementChild.className.includes('channel')) {
                            document.querySelector('.menuspan').children[i].firstElementChild.className = 'channel-2QD9_O btn-friends';
                            document.querySelector('.menuspan').children[i].firstElementChild.firstElementChild.className = '';
                          }
                        }
                        else {
                          document.querySelector('.menuspan').children[i].firstElementChild.className = 'channel-2QD9_O selected-1HYmZZ btn-friends selected';
                          //document.querySelector('.menuspan').children[i].firstElementChild.firstElementChild.className = 'selectedLink-3dsNZ6';
                          //class="selectedLink-3dsNZ6"
                          if (document.querySelector('.menu-bg')) {
                            document.querySelector('.menu-bg').parentNode.removeChild(document.querySelector('.menu-bg'));
                          }
                          if (document.querySelector('.menu-title-0')) {
                            document.querySelector('.menu-title-0').parentNode.removeChild(document.querySelector('.menu-title-0'));
                          }
                          if (document.querySelector('.menu-right')) {
                            document.querySelector('.menu-right').parentNode.removeChild(document.querySelector('.menu-right'));
                          }
                        }
                      }
                    }
                  });
                });
              });
              let scrollerAmt;
              let genAmt = 100;
              function setupScroller() {

                scrollerAmt = 100;
                scrollerAmt = Math.floor((scrollerAmt / 100)).toString();
                let mouseDown = false;
                var direction = "", oldx = 0, newX = 40;
                document.querySelector('.naniteGrabber').addEventListener('mousedown', event => {
                  console.log('naniteGrabber clicked');
                  direction = "", oldx = event.pageX;
                  mouseDown = true;
                });
                document.body.addEventListener('mouseup', event => {
                  console.log('naniteGrabber unclicked');
                  mouseDown = false;
                });
                document.querySelector('.NANO-modal').addEventListener('mousemove', e => {
                  if (mouseDown) {
                    console.log('naniteGrabber moved!');
                    if (e.pageX < oldx && newX > 0) {
                      //if clientX is less than oldx, find out how much left and subtract it from the percentage
                      newX = newX - ((oldx - e.pageX) / 5);
                      direction = "left";
                    } else if (e.pageX > oldx && newX < 100) {
                      //if pageX is more than oldx, find out how much right and add it to the percentage
                      newX = newX + ((e.pageX - oldx) / 5);
                      direction = "right";
                    }
                    //problem: everytime it moves, it's subtracting 
                    document.querySelector('.naniteGrabber').style.left = newX + '%';
                    document.querySelector('.nBarFill-23-gu-').style.width = newX + '%';
                    console.log(e.pageX, oldx, newX, direction);
                    //document.querySelector('.menu-subtext-1').innerHTML = e.pageX + ' oldx:' + oldx + ' newX:' + newX + ' dir:' + direction + ' pageX-oldx' + (e.pageX - oldx) + ' percentage:' + ((e.pageX - oldx)/100) ;
                    oldx = e.pageX;
                    scrollerAmt = document.querySelector('.naniteGrabber').style.left;
                    scrollerAmt = 100;
                    scrollerAmt = Math.floor((scrollerAmt / 100)).toString();
                  }
                });
              }

              function setupNanothreading() {

                var ebc = document.querySelector(".nanothreadingScrollerNotches");
                var ebd = document.querySelector(".nanothreadingScrollerProgress");
                let newX = 0;
                let oldx = 0;
                let direction = '';
                let mouseOver = false;
                /* ebc.addEventListener('mouseover', e=>{
                  mouseOver = true;
                  console.log('mouseover');
                });
                ebc.addEventListener('mouseout', e=>{
                  mouseOver = false;
                  console.log('mouseout');
                }); */
                //document.querySelector('.NANO-modal')
                ebc.addEventListener('mousemove', e => {
                  // if(mouseOver){

                  if (e.pageX < oldx && newX > 0) {
                    //if clientX is less than oldx, find out how much left and subtract it from the percentage
                    newX = newX - ((oldx - e.pageX) / 5);
                    direction = "left";
                  } else if (e.pageX > oldx && newX < 100) {
                    //if pageX is more than oldx, find out how much right and add it to the percentage
                    newX = newX + ((e.pageX - oldx) / 5);
                    direction = "right";
                  }
                  //problem: everytime it moves, it's subtracting 
                  ebd.style.transform = `translateX(${Math.floor(e.pageX - ebc.getBoundingClientRect().left).toString()}px)`;
                  console.log(e.pageX, oldx, newX, direction, ebd.style.transform, `translateX(${Math.floor((newX * 9)).toString()}px);`, "x:");
                  //document.querySelector('.menu-subtext-1').innerHTML = e.pageX + ' oldx:' + oldx + ' newX:' + newX + ' dir:' + direction + ' pageX-oldx' + (e.pageX - oldx) + ' percentage:' + ((e.pageX - oldx)/100) ;
                  oldx = e.pageX;
                  // }
                });
              }
              document.querySelector('.menu-option-nanite-generator').addEventListener('click', event => {
                document.querySelector('.nanite-menu').appendChild(NANO.Helpers.createElement(`<div class="scrollerWrap-2lJEkd content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d menu-right">
          <div class="scroller-2FKFPG inner-3wn6Q5 container-2zArDx content-8biNd">
          <div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ" style="height: 285px;"><div class="image-1GzsFd margin-bottom-40" style="flex: 0 1 auto;width: 130px;height: 190px;background-image: url(&quot;/assets/308e587f3a68412f137f7317206e92c2.svg&quot;);"></div><div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;"><h4 class="title-2BxgL2">Generator</h4><div class="text-GwUZgS margin-top-8">Generate Nanites en masse.</div></div></div>
          <div class="friends-table" style="position: relative;"><div class="friend-table-add-wrapper"><div class="friend-table-add-header"><div class="friends-table-add"><form class="wrapper-1cBijl"><input class="addFriendInput-4bcerK friendUsername" placeholder="Enter a username" maxlength="37"><div class="addFriendHint-3Y70FX"></div><button type="submit" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeSmall-2cSMqn grow-q77ONN submitFriend"><div class="contents-18-Yxp">Generate</div></button></form></div></div></div></div>
          <div class="marginTop40-i-78cZ"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT">Nanites</h5><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6" style="flex: 1 1 auto;"><div class="slider-1PF9SW marginTop4-2BNfKC flexChild-faoVW3"> <input type="number" class="input-2_ChIk" readonly="" value="40"><div class="track-11EASc"><div class="mark-1xjQqt" style="left: 0%;"><div class="markValue-2DwdXI">${Math.floor(genAmt * .10)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 20%;"><div class="markValue-2DwdXI">${Math.floor(genAmt * .20)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 40%;"><div class="markValue-2DwdXI">${Math.floor(genAmt * .40)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 60%;"><div class="markValue-2DwdXI">${Math.floor(genAmt * .60)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 80%;"><div class="markValue-2DwdXI">${Math.floor(genAmt * .80)}</div><div class="markDash-3hAolZ"></div></div><div class="mark-1xjQqt" style="left: 100%;"><div class="markValue-2DwdXI">${Math.floor(genAmt)}</div><div class="markDash-3hAolZ"></div></div></div><div class="bar-2Qqk5Z"><div class="barFill-23-gu- nBarFill-23-gu-" style="width: 40%;"></div></div><div class="track-11EASc"><div class="grabber-3mFHz2 naniteGrabber" style="left: 40%; margin-top:0px;"></div></div></div></div></div>
         </div></div>`));
                setupScroller();

                setupNanothreading();
                setTimeout(() => {
                  var ebc = document.querySelector(".friendUsername");
                  var ebcd = document.querySelector(".submitFriend");
                  var eArrays = [ebc];
                  var errors = [];
                  let chkPt = () => {
                    NANO.Helpers.createModal(`
              <div data-focus-lock-disabled="disabled" class="inner-1JeGVc">
              <form class="modal-3HD5ck container-SaXBYZ sizeSmall-Sf4iOi">
                 <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-1R_AjF" style="flex: 0 0 auto;">
                    <h4 class="h4-AQvcAz title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 header-3OkTu9">Checkpoint</h4>
                 </div>
                 <div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix content-2BXhLs scrollerThemed-2oenus themeGhostHairline-DBD-2d">
                    <div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl inner-3wn6Q5 content-KhOrDM">
                       <div class="medium-zmzTW- size16-14cGz5 height20-mO2eIN primary-jw0I4K">This command has been locked for: Testing scroller-server relationship.</div>
                    </div>
                 </div>
                 <div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 footer-2yfCgX" style="flex: 0 0 auto;">
                    <button type="submit" class="button-38aScr lookFilled-1Gx00P colorRed-1TFJan sizeMedium-1AC_Sl grow-q77ONN okayButton">
                       <div class="contents-18-Yxp">Okay</div>
                    </button>
                    <button type="button" class="button-38aScr lookLink-9FtZy- colorPrimary-3b3xI6 sizeMedium-1AC_Sl grow-q77ONN angryButton">
                       <div class="contents-18-Yxp">Man, fuck this</div>
                    </button>
                 </div>
              </form>
           </div>`, 241, 490).then(() => {
                        document.querySelector('.angryButton').addEventListener('click', event => {
                          event.preventDefault();
                          event.stopPropagation();
                        });
                        document.querySelector('.okayButton').addEventListener('click', event => {
                          event.preventDefault();
                          event.stopPropagation();
                          NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
                  <div class="item-1GzJrl item-status">
                  <div class="statusIconText-3b4TkH">
                     <span class="status status-nanite" style="margin-right: 14px;"></span>
                     <div>Sorry!</div>
                  </div>
                  <div class="helper-2c73HK">You reached a checkpoint!</div>
                  </div>
                  </div>`);
                        });
                      });
                  }
                  let generate = () => {
                    NANO.consoleClient.write(">generator " + scrollerAmt);
                    ebc.value = '';
                    NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
<div class="item-1GzJrl item-status">
<div class="statusIconText-3b4TkH">
<span class="status status-nanite" style="margin-right: 14px;"></span>
<div>Generator</div>
</div>
<div class="helper-2c73HK">SPEEEED IT UP Y'ALL!</div>
</div>
</div>`);
                  };
                  ebcd.addEventListener('click', event => {

                    event.preventDefault();
                    event.stopPropagation();
                    setTimeout(() => {
                      if (ebc.value.length <= 0) {
                        errors.push('amount');
                      }
                      if (errors.length > 0) {
                        NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
  <div class="item-1GzJrl item-status">
  <div class="statusIconText-3b4TkH">
  <span class="status status-nanite" style="margin-right: 14px;"></span>
  <div>Generator</div>
  </div>
  <div class="helper-2c73HK">You must fill all input areas!</div>
  </div>
  </div>`);
                        //console.log("You must fill all the input areas!");
                      }
                      else {
                        chkPt();
                        //generate();
                      }
                    }, 0.3);
                  }, true);
                  ebc.addEventListener('keypress', event => {
                    // console.log(event);
                    //event.preventDefault();
                    event.stopPropagation();
                    setTimeout(() => {
                      if (event.code === 'Enter') {
                        if (ebc.value.length <= 0) {
                          errors.push('amount');
                        }
                        if (errors.length > 0) {
                          NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
      <div class="item-1GzJrl item-status">
      <div class="statusIconText-3b4TkH">
      <span class="status status-nanite" style="margin-right: 14px;"></span>
      <div>Generator</div>
      </div>
      <div class="helper-2c73HK">You must fill all input areas!</div>
      </div>
      </div>`);
                          //console.log("You must fill all the input areas!");
                        }
                        else {
                          chkPt();
                          //generate();
                        }
                      }
                    }, 0.3);
                  }, true);
                }, 200);
                /* */
              });
            });
        }
      });

    });
  }
  editButtons() {

    console.log('CREATING EDIT BUTTONS');
    document.querySelector('.naniteEdit').addEventListener('click', event => {
      //NANO.consoleClient.write('>nite setAvatar ' + i + ' ' +  + ' ' + );
      //NANO.naniteAvatar = document.querySelector('.naniteAvatarEdit').style.backgroundImage;
      while (document.querySelector('.userSettingsAccount-2eMFVR').hasChildNodes()) {
        document.querySelector('.userSettingsAccount-2eMFVR').removeChild(document.querySelector('.userSettingsAccount-2eMFVR').lastChild)
      }
      document.querySelector('.userSettingsAccount-2eMFVR').appendChild(NANO.Helpers.createElement(`<div class="flex-vertical">
   <div class="userInfoEditing-1Juv0S cardPrimaryEditable-2IQ7-V card-3DrRmC">
      <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;">
         <div class="avatarColumn-1UZyLL" style="flex: 0 1 auto;">
            <div class="avatar-uploader">
               <div class="avatar-uploader-inner naniteAvatarEdit" style="background-image: url('https://im-01.gifer.com/ZKZg.gif');">
                  <div class="avatar-uploader-hint">Change
                     Avatar
                  </div>
                  <div class="file-input" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0; cursor: pointer;"></div>
                  <div class="avatar-uploader-indicator flex-center"></div>
               </div>
               <a class="remove-button">Remove</a>
            </div>
            <div class="marginTop8-2gOa2N statusRed-1ZlXmf"></div>
         </div>
         <div class="flexChild-faoVW3" style="flex: 1 1 auto;">
            <div class="marginBottom20-2Ifj-2">
               <h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT">Username<span class="required-15-TOo statusRed-1ZlXmf">*</span></h5>
               <div class="inputWrapper-31_8H8 vertical-V37hAW flex-1O1GKY directionColumn-35P_nr">
                  <div class="input-2YozMi size16-3IvaX_ multiInput-1pqSK- flexCenter-28Hs0n flex-3B1Tl4 justifyCenter-29N31w alignCenter-3VxkQP undefined undefined justifyBetween-1d1Hto undefined undefined alignCenter-3VxkQP">
                     <div class="inputWrapper-31_8H8 vertical-V37hAW flex-1O1GKY directionColumn-35P_nr multiInputFirst-16Lbcj"><input type="text" class="inputDefault-_djjkz input-cIJ7To size16-14cGz5 multiInputField-3ZB4zY naniteUsername" name="username" value="" placeholder="" maxlength="999"></div>
                  </div>
               </div>
            </div>
            <div class="marginBottom20-2Ifj-2">
               <h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT">Profile Picture<span class="required-15-TOo statusRed-1ZlXmf">*</span></h5>
               <div class="inputWrapper-31_8H8 vertical-V37hAW flex-1O1GKY directionColumn-35P_nr"><input type="text" class="inputDefault-_djjkz input-cIJ7To size16-14cGz5 nanitePFP" name="pfp" value="" placeholder="" maxlength="999"></div>
            </div>
      </div>
      <div class="divider-1G01Z9 marginTop20-3UscxH marginBottom20-2Ifj-2"></div>
      <div class="flex-lFgbSz flex-3B1Tl4 horizontal-2BEEBe horizontal-2VE-Fw flex-3B1Tl4 directionRow-yNbSvJ justifyEnd-1ceqOU alignCenter-3VxkQP noWrap-v6g9vO" style="flex: 1 1 auto;">
         <div class="flexChild-faoVW3" style="flex: 1 1 auto;">
            <button type="button" class="button-2t3of8 lookOutlined-1c5nhl colorRed-3HTNPV sizeSmall-3g6RX8 grow-25YQ8u">
               <div class="contents-18-Yxp">Disable Nanite</div>
            </button>
         </div>
         <div class="flexChild-faoVW3" style="flex: 0 1 auto;">
            <div>
               <button type="button" class="button-2t3of8 lookLink-3VWONr colorPrimary-2KuK5O sizeMin-1Wh1KC grow-25YQ8u">
                  <div class="contents-18-Yxp cancelNaniteEdit">Cancel</div>
               </button>
            </div>
         </div>
         <div class="flexChild-faoVW3" style="flex: 0 1 auto;">
            <button type="button" class="button-2t3of8 lookFilled-luDKDo colorGreen-22At8E sizeSmall-3g6RX8 grow-25YQ8u saveNaniteEdit0">
               <div class="contents-18-Yxp saveNaniteEdit">Save</div>
            </button>
         </div>
      </div>
   </div>
					</div>`));


      console.log('EDITING Nanite!');

      document.querySelector('.saveNaniteEdit0').addEventListener('click', event => {
        console.log('SAVE NANITE EDIT');
        NANO.consoleClient.write('>nite setAvatar ' + clickedNanite + ' ' + document.querySelector('.nanitePFP').value + ' ' + document.querySelector('.naniteUsername').value);
      });
    });
  }
  createConsole() {
    var insertedNodes = [];
    let oldGuild;
    let oldChannel;
    let guild1;
    let channel1;
    let setAt = false;
    window.onload = function () {
      function init0() {

        try {
          if (initialized == true) return;
          initialized = true;
          //console.log(e.target);
          var ex = document.querySelector('#app-mount > div.app-19_DXt.platform-win > div > div.layers-3iHuyZ.flex-vertical.flex-spacer > div > div > div.guilds-wrapper > div.scroller-wrap > div > div.guild.active > div > a');
          if (ex) {
            ex.innerHTML = `<div class="nano-icon"></div>`;
          }
          var naniteRoot = document.querySelector('#app-mount > div.app-19_DXt.platform-win > div > div.layers-3iHuyZ.flex-vertical.flex-spacer > div > div > div.flex-1xMQg5.flex-1O1GKY.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.base-3dtUhz > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.spacer-29U_x8 > div.channels-Ie2l6A.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr > div.container-2Thooq > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6');

          var naniteButton = document.createElement("div");
          naniteButton.innerHTML = `<div class="">
<button class="iconButtonDefault-2cKx7- iconButton-3V4WS5 button-2b6hmh small-1ChI_fNanites" style="background-image: url(&quot;https://i.imgur.com/t2aNWj4.png&quot;);">
</button>
</div>`;
          naniteRoot.appendChild(naniteButton);
          NANO.Helpers.makeNaniteList();
          setTimeout(() => {
            if (NANO.nanites)
              NANO.consoleClient.write(">nite deploy 1-" + NANO.nanites);
            //backdrop.style.opacity = 0.60;
          }, 1);
        }
        catch (e) {
          setTimeout(() => {
            console.log('RETRYING INIT');
            init0();
          }, 350);
        }
      }
      init0();
    }
    document.addEventListener("DOMNodeInserted", function (e) {//channel detect

      if (document.querySelector('.name-3YKhmS') && document.querySelector('.name-3YKhmS').parentElement.className == 'header-2o-2hj') {
        let root = document.querySelector('.innerNoAutocomplete-1WpcVO');
        if (root) {

          if (document.querySelector('.channelName-3stJzi') && channel != document.querySelector('.channelName-3stJzi').childNodes[1].nodeValue) {
            if (document.querySelector('.svgEveryone')) {
              //console.log(channel);
              //root.removeChild(document.querySelector('.svgEveryone'));
              setAt = false;
            }
          }
          if (setAt == false) {
            try {
              console.log('SET AT HIT!');
              setAt = true;
              setTimeout(() => {
                if (document.querySelector('.svgEveryone')) {
                  document.querySelector('.svgEveryone').parentNode.removeChild(document.querySelector('.svgEveryone'));
                }
                root = document.querySelector('.innerNoAutocomplete-1WpcVO');

                channel = document.querySelector('.iconVisibility-1bOqu7 .content-3at_AU .name-3_Dsmg').childNodes[1].nodeValue;
                let svgEveryone = document.createElement('div');
                svgEveryone.className = 'svgEveryone';
                svgEveryone.innerHTML = `<svg class="iconInactive-g2AXfB icon-1R19_H iconMargin-2YXk4F" name="Mention" width="16" height="16" viewBox="0 0 24 24" style="
   position: absolute;
   right: 40px;
   top: 11px;
   ">
   <path fill="currentColor" class="iconForeground-3y9f0B" fill-rule="evenodd" d="M12.2608,9.57136 C11.91424,9.57136 11.6072,9.67136 11.3464,9.87136 C11.0856,10.07136 10.86432,10.32496 10.68208,10.63568 C10.5,10.94288 10.36432,11.2856 10.26784,11.65712 C10.17488,12.02864 10.12496,12.38944 10.12496,12.73216 C10.12496,12.90352 10.14288,13.08576 10.17856,13.28224 C10.21424,13.47504 10.2856,13.6536 10.39632,13.82144 C10.50352,13.9856 10.64624,14.12144 10.82128,14.22864 C10.99632,14.33584 11.22848,14.38944 11.51776,14.38944 C11.91056,14.38944 12.24272,14.2928 12.51776,14.1 C12.7928,13.9072 13.01776,13.66416 13.1928,13.36784 C13.36784,13.07504 13.4928,12.7536 13.57504,12.41088 C13.6536,12.068 13.6928,11.75008 13.6928,11.46432 C13.6928,11.23568 13.67136,11.01072 13.62864,10.78576 C13.58576,10.56432 13.51088,10.36432 13.4,10.18224 C13.2928,10.00368 13.14288,9.85728 12.9536,9.74288 C12.76784,9.62864 12.53584,9.57136 12.2608,9.57136 L12.2608,9.57136 Z M18.57808,16.8728 C18.84672,17.16224 18.84672,17.63168 18.55136,17.89328 C17.81248,18.54608 16.96928,19.0408 16.02144,19.37504 C14.8464,19.7928 13.6072,20 12.30352,20 C11.05696,20 9.92128,19.80352 8.9,19.4072 C7.87856,19.0144 7.00352,18.46416 6.28208,17.7608 C5.55712,17.05728 4.99632,16.21424 4.59632,15.23216 C4.19648,14.24992 4,13.17856 4,12.01792 C4,10.87136 4.21792,9.81072 4.6536,8.83568 C5.08928,7.86064 5.68208,7.01424 6.43568,6.29632 C7.18928,5.57856 8.06784,5.01776 9.07856,4.60704 C10.08208,4.20352 11.16064,4 12.30352,4 C13.28912,4 14.2464,4.14288 15.17136,4.42864 C16.1,4.7144 16.92144,5.1464 17.63936,5.71792 C18.35712,6.29296 18.92864,7.0072 19.35712,7.86784 C19.78576,8.72864 20,9.73936 20,10.9 C20,11.76064 19.88224,12.52144 19.64288,13.17856 C19.40368,13.8392 19.08592,14.38928 18.68592,14.83568 C18.28592,15.28208 17.83232,15.61408 17.31792,15.83568 C16.80368,16.05712 16.26448,16.16768 15.70016,16.16768 C15.1216,16.16768 14.65728,16.032 14.30736,15.76064 C13.96096,15.48912 13.78592,15.14272 13.78592,14.72848 L13.67872,14.72848 C13.46096,15.07136 13.12864,15.39984 12.67872,15.70704 C12.2288,16.01424 11.67872,16.1712 11.02512,16.1712 C10.03936,16.1712 9.27872,15.84976 8.74288,15.20336 C8.2072,14.55696 7.93936,13.72112 7.93936,12.6856 C7.93936,12.08192 8.03936,11.48912 8.24288,10.89984 C8.4464,10.31056 8.73584,9.78912 9.11072,9.32848 C9.48576,8.87136 9.93568,8.49984 10.45712,8.22128 C10.97856,7.94272 11.55712,7.80352 12.19648,7.80352 C12.74656,7.80352 13.21088,7.91776 13.58928,8.1464 C13.96432,8.37504 14.21088,8.65712 14.32864,8.98576 L14.35008,8.98576 L14.38288,8.82512 C14.46144,8.4384 14.8448,8.12512 15.23936,8.12512 L15.74656,8.12512 C16.14128,8.12512 16.3952,8.43792 16.31408,8.824 L15.60736,12.19296 C15.57872,12.39296 15.53936,12.6144 15.48944,12.8608 C15.43952,13.10384 15.4144,13.33232 15.4144,13.55024 C15.4144,13.79312 15.46096,13.99664 15.55744,14.16448 C15.65024,14.3288 15.836,14.41104 16.11088,14.41104 C16.6752,14.41104 17.14304,14.11088 17.51456,13.50752 C17.8824,12.904 18.068,12.0968 18.068,11.07888 C18.068,10.21824 17.9216,9.45392 17.63232,8.7896 C17.34288,8.12176 16.93936,7.56464 16.42512,7.11104 C15.91088,6.66112 15.29648,6.31824 14.58928,6.0896 C13.87872,5.86096 13.10368,5.74672 12.26448,5.74672 C11.35008,5.74672 10.5144,5.90736 9.75376,6.22896 C8.99296,6.5504 8.34304,6.9968 7.8072,7.56112 C7.27152,8.12896 6.85376,8.79328 6.55728,9.56112 C6.25728,10.32544 6.10736,11.15408 6.10736,12.04336 C6.10736,12.98976 6.26448,13.84336 6.5752,14.604 C6.88592,15.36464 7.32528,16.0112 7.88944,16.5504 C8.4536,17.0896 9.1288,17.50048 9.91088,17.78624 C10.69312,18.07184 11.55728,18.21472 12.49664,18.21472 C13.67168,18.21472 14.6824,18.02912 15.5288,17.65408 C16.16528,17.37488 16.76304,17.01264 17.32304,16.56944 C17.632,16.3248 18.08192,16.3384 18.35056,16.62768 L18.57808,16.8728 L18.57808,16.8728 Z"></path>
</svg>`;
                root.appendChild(svgEveryone);
                document.querySelector('.svgEveryone').addEventListener('click', () => {
                  NANO.consoleClient.write('>getEveryone');
                });
              }, 300);
            }
            catch (e) {

            }
          }
        }
        guild1 = document.querySelector('.name-3YKhmS');
        channel1 = document.querySelector('.iconVisibility-1bOqu7 .content-3at_AU .name-3_Dsmg');
        guild = guild1.firstChild.nodeValue;
        setTimeout(() => {
          if (document.querySelector('.iconVisibility-1bOqu7 .content-3at_AU .name-3_Dsmg')) {
            channel = document.querySelector('.iconVisibility-1bOqu7 .content-3at_AU .name-3_Dsmg').innerHTML;
            console.log('CONDITION 0 MET');
          }
          //console.log(guild, channel);
          if (oldGuild != guild || oldChannel != channel) {
            console.log('CONDITION 1 MET');
            oldGuild = null;
            oldChannel = null;
            NANO.consoleClient.write('setGuild-' + guild + "=" + channel + ")");

          }
          if (!oldGuild) {
            oldGuild = guild;
            oldChannel = channel;
            console.log('CONDITION 2 MET');
            NANO.consoleClient.write('setGuild-' + guild + "=" + channel + ")");
          }

        }, 1000);

      }
      else {
        setAt = false;
      }
      //if(e.target == document.querySelector('.app-19_DXt')){

      //}
      //console.log(e.target);
      if (e.target == document.querySelector('.container-3gCOGc')) {
        function init0() {

          try {
            if (document.querySelector('.small-1ChI_fNanites')) return;
            //console.log(e.target);

            var naniteRoot = document.querySelector('#app-mount > div.app-19_DXt.platform-win > div > div.layers-3iHuyZ.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.spacer-1fA9zc > div > div > div.flex-1xMQg5.flex-1O1GKY.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.base-3dtUhz > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.spacer-29U_x8.firefoxFixScrollFlex-cnI2ix > div.channels-Ie2l6A.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr > div.container-2Thooq > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6');

            var naniteButton = document.createElement("div");
            naniteButton.innerHTML = `<div class="">
          <button class="iconButtonDefault-2cKx7- iconButton-3V4WS5 button-2b6hmh small--aHOfS small-1ChI_fNanites" style="background-image: url(&quot;https://i.imgur.com/t2aNWj4.png&quot;);">
          </button>
          </div>`;
            naniteRoot.appendChild(naniteButton);
            NANO.Helpers.makeNaniteList();
            setTimeout(() => {
              if (NANO.nanites)
                NANO.consoleClient.write(">nite deploy 1-" + NANO.nanites);
              //backdrop.style.opacity = 0.60;
            }, 1);
          }
          catch (e) {
            setTimeout(() => {
              console.log('RETRYING INIT', e);
              init0();
            }, 350);
          }
        }
        init0();
        if (!document.querySelector('.consoleTab')) {

          const root = document.querySelector('.tabBar-1E2ExX.flexChild-faoVW3.topPill-30KHOu');

          this._console = document.createElement("div");
          this._console.className = "separator-gCa7yv";
          root.appendChild(this._console);
          this._console = document.createElement("div");
          this._console.appendChild(document.createTextNode("Console"));
          this._console.className = "itemDefault-3Jdr52 item-PXvHYJ notSelected-1N1G5p item-3HpYcP primary-3j8BhM consoleTab";
          root.appendChild(this._console);


          var c = this._console.parentNode.childNodes;
          for (let i = 0; i < c.length; i++) {
            if (c[i] != this._console || c[i] != this._nanites) {
              c[i].addEventListener('click', event => {
                this._console.className = "itemDefault-3Jdr52 item-PXvHYJ notSelected-1N1G5p item-3HpYcP primary-3j8BhM consoleTab";
                //c[i].className = "tab-bar-item selected";
              });
            }
          }
          this._console.addEventListener('click', event => {
            event.stopPropagation();
            var d = root.childNodes;
            var eb = document.querySelector('.friendsTable-133bsv');
            var eba;
            /* for (let i = 0; i < d.length; i++) {
              if(d[i] != this._console && d[i] != this._nanites && d[i].textContent.toLowerCase().includes('block')){
                var eb = d[i];
              }
            } */
            var ea = document.querySelector('.text-GwUZgS.marginTop8-1DLZ1n');
            for (let i = 0; i < c.length; i++) {
              if (c[i].className.includes("selected")) {
                c[i].className = "itemDefault-3Jdr52 item-PXvHYJ notSelected-1N1G5p item-3HpYcP primary-3j8BhM consoleTab";
              }
            }
            this._console.className = "itemSelected-1qLhcL item-PXvHYJ selected-3s45Ha item-3HpYcP consoleTab";
            if (!ea) {
              eb.addEventListener('click', event => {
                event.stopPropagation();
              });
            }
            while (eb.hasChildNodes()) {
              eb.removeChild(eb.lastChild);
            }
            eb.className = "friends-empty section-console-open";
            eb.style = "opacity: 1;";
            eb.innerHTML = `
    <div class="markup" style="word-wrap: break-word; white-space: pre-wrap; margin-top: 6px; color: hsla(0,0%,100%,.7);">
    <pre class="pre-console" style="background: #7289da; border-color: #7186d8; max-width: 100%; margin-top: 6px; box-sizing: border-box; border-radius: 5px; border: 2px solid #f3f3f3; white-space: pre-wrap; width: 800px; height: 350px;">
		<code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljsConsole" style= "background: #2f3136;width: 750px;height: 300px;left: 2%;position: relative;">

















</code>
</pre>
    </div>
</div>
	<form>
    <div class="channelTextAreaEnabled-iusU9o channelTextArea-1LDbYG channelTextArea-rNsIhGConsole" style="width: 800px;">
        <div class="innerEnabled-3g80kR inner-zqa7da flex-1O1GKY innerNoAutocomplete-1WpcVOConsole">
            <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;">
            <svg class="attachButton-1UjEWA" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" class="attachButtonPlus-rUdX-B" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
            <div class="attachButtonDivider-3Glu60"></div>
        </div>
        <div class="uploadInput-2lNPSo">
            <div class="file-input" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0; cursor: pointer;"></div>
        </div><textarea rows="1" placeholder="Enter a command..." class="textArea-2Spzkt textArea-2Spzkt scrollbarGhostHairline-1mSOM1 scrollbar-3dvm_9 scrollbar-3dvm_9Console" style="height: auto; top: -20px;"></textarea>
    </div>
    </div>
</form>`;
            NANO.console = eb.querySelector(".pre-console");

            eba = document.querySelector(".scrollbar-3dvm_9Console");
            eba.addEventListener('keypress', event => {
              //console.log(event);
              //NANO.console = eb.querySelector(".pre-console");
              setTimeout(() => {
                if (event.key === 'Enter') {
                  if (eba.value.length <= 75) {
                    NANO.input = eba.value;
                    NANO.consoleClient.write(">" + eba.value);
                    eba.value = '';
                    NANO.Helpers.createStatus(`<div class="menu-Sp6bN1 alt-3btY0e">
   <div class="item-1GzJrl item-status">
      <div class="statusIconText-3b4TkH">
         <span class="status status-nanite" style="margin-right: 14px;"></span>
         <div>Command</div>
      </div>
      <div class="helper-2c73HK">${eba.value}</div>
   </div>
   </div>`);
                  }
                }
                event.stopPropagation();
              }, 0.3);
            });
          });

        }
      }
      if (e.target.className == "tab-bar-item" && e.target != this._console) {//insertedNodes.push(e.target);

        //console.log(e.target);
      }

    },
      false);
  }

  gifMaker(node, frms, speed) {
    if (frms.length > 0) {
      console.log('ok-0');
      speed = (speed / 100) * 60;
      for (let i = 0; i < frms.length; i++) {
        setTimeout(() => {
          console.log('ok-1');
          node.style.backgroundImage = `url(${frms[i]})`;
        }, (i * 1000) / speed);
      }
    }
  }
  _modalKeypress(e) {
    /*let outerDiv1 = null;
    if (document.querySelector('.outerdiv')) {
      outerDiv1 = document.querySelector('.outerdiv');
      outerDiv1.className = "layer-3QrUeG";
    }
    if (e.code === 'Escape') NANO.Helpers.destroyModal();*/
    //if (e.code === 'Escape') NANO.Helpers.destroySetting(outerDiv1);
  }


  destroyList() {
    if (this._naniteList0) {
      click = false;
      //console.log('hi there again');
      while (this._naniteList0.hasChildNodes()) {
        this._naniteList0.removeChild(this._naniteList0.lastChild);
      }
      if (this._naniteList0.parentNode) {
        this._naniteList0.parentNode.removeChild(this._naniteList0);
      }
      this._hasSetKeyListener0 = false;
      this._naniteList0 = null;
      document.querySelector('.NANO-modal-inner').removeEventListener('click', this.destroyList.bind(this));
    }

    else if (this._naniteList) {
      click = false;
      while (this._naniteList.hasChildNodes()) {
        this._naniteList.removeChild(this._naniteList.lastChild);
      }
      this._naniteList.parentNode.removeChild(this._naniteList);
      this._naniteList = null;
      document.body.removeEventListener('click', this.destroyList.bind(this));
      //NANO.Helpers.makeNaniteList();
    }
  }

  destroyMenuScroller() {
    console.log('terminal 0n');
    if (document.querySelector('.Select-menu-outer')) {
      scrollMenu = false;
      console.log('terminal 1n');
      document.body.removeEventListener('click', handle);
      document.querySelector('.Select-menu-outer').parentNode.className = 'Select Select--single has-value';
      document.querySelector('.Select-menu-outer').parentNode.removeChild(document.querySelector('.Select-menu-outer'));

    }
    else {
      console.log('terminal 2');
      //document.body.removeEventListener('click', this.destroyMenuScroller.bind(this));

    }
  }
  destroyModal() {
    if (this._modal || this._naniteList) {
      var eb = document.querySelector('#app-mount > div:nth-child(5)');
      var ebx = document.querySelector('#app-mount > div:nth-child(5) > div.backdrop-1ocfXc');
      if (ebx) {
        while (eb.hasChildNodes()) {
          eb.removeChild(eb.lastChild);
        }
      }
      let backdrop = this._modal.querySelector('.callout-backdrop');
      let inner = this._modal.querySelector('.NANO-modal-inner');
      let close = this._modal.querySelector('.NANO-modal-close-button');
      backdrop.style.opacity = 0;
      inner.classList.remove('expanded');
      setTimeout(() => {
        if (close) close.addEventListener('click', this.destroyModal.bind(this));
        document.body.removeEventListener('keyup', this._modalKeypress.bind(this));
        document.body.removeEventListener('click', this.destroyModal.bind(this));
        this._modal.parentNode.removeChild(this._modal);
        this._modal = null;
      }, 200);

    }
    else {
      setTimeout(() => {
        //                if (close) close.addEventListener('click', this.destroyModal.bind(this));
        document.body.removeEventListener('keyup', this._modalKeypress.bind(this));
        document.body.removeEventListener('click', this.destroyModal.bind(this));
      }, 200);
    }
  }


  destroySetting(outerDiv1) {
    if (this._setting) {
      NANO.consoleClient.write("init-");
      saveChanges = false;
      scrollMenu = false;
      try {
        console.log('s00');
        document.body.removeEventListener('click', handle);
        console.log('s01');
      }
      catch (e) {
        console.log(e);
      }
      while (this._setting.hasChildNodes()) {
        this._setting.removeChild(this._setting.lastChild);
      }
      this._setting.parentNode.removeChild(this._setting);
      outerDiv1.style = "opacity: 1;"
    }
  }

  sanitize(message) {
    return message.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;');
  }


  escape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }


  resolveMention(query) {
    let res = query.match(/<@!?[0-9]+>/g);
    if (!res) return null;
    return resolver.resolveUser(res[0].replace(/<|!|>|@/g, ''));
  }

  filterMessage(message) {
    if (r.mentionable) {
      message = message.replace(new RegExp(this.escape(`@${r.name}`), 'g'), r.toString());
    }
    return message;
  }
}

module.exports = Helpers;
//helpersjsend
