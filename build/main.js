webpackJsonp([0],{

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var event_data_1 = __webpack_require__(15);
var user_data_1 = __webpack_require__(8);
var storage_1 = __webpack_require__(42);
var core_2 = __webpack_require__(7);
var Tools = __webpack_require__(2);
var widget_1 = __webpack_require__(183);
var htmleditor_1 = __webpack_require__(184);
var Maintools_1 = __webpack_require__(2);
var settings_1 = __webpack_require__(23);
var WidgetstorePage = /** @class */ (function () {
    function WidgetstorePage(navCtrl, navParams, loadingCtrl, settings, eventData, userData, viewCtrl, storage, translate, modalCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.settings = settings;
        this.eventData = eventData;
        this.userData = userData;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.widgets = [];
        this.query = "";
        this.close = false;
        this.widget = null;
        this.categories = "";
        this._filter = "";
        this._query = "";
        this._defaultCategories = "";
        if (navCtrl.canGoBack())
            this.close = true;
        this.categories = this.translate.instant("WIDGET.CATEGORIESFILTER");
        if (this.navParams.get("widgetFilter") != null) {
            this._defaultCategories = this.navParams.get("widgetFilter");
            this._filter = this._defaultCategories;
        }
    }
    WidgetstorePage.prototype.ionViewWillEnter = function () {
        Maintools_1.toast(this.toastCtrl, this.navParams.get("message"), this.translate);
        this.refresh();
    };
    WidgetstorePage.prototype.refresh = function () {
        var vm = this;
        var l = Maintools_1.loading(vm);
        this.userData.getwidgets(null).subscribe(function (resp) {
            vm.widgets = [];
            l.dismiss();
            resp.items.forEach(function (w) {
                w.qrcode = "";
                if (w.description.indexOf("PROFIL.") == 0)
                    w.description = vm.translate.instant(w.description, vm.userData.user.lang);
                w.tag = w.description + " " + w.title + " " + w.activity;
                if (Tools.isFavorite(vm.userData.user, w)) {
                    w.tag = w.tag + " favorite";
                    w.favorite = true;
                }
                vm.widgets.push(w);
            });
        });
    };
    WidgetstorePage.prototype.addWidget = function () {
        var _this = this;
        var vm = this;
        var title = vm.translate.instant("WIDGETSTORE.NEWWIDGET_TITLE");
        var desc = vm.translate.instant("WIDGETSTORE.NEWWIDGET_DESCRIPTION");
        vm.userData.getwidgetfrommodel(title, desc).subscribe(function (r) {
            vm.widget = r;
            vm.widget.parentid = vm.widgets[0].id;
            Tools.openModal(_this.modalCtrl, htmleditor_1.HtmleditorPage, { user: vm.userData.user.id, widget: vm.widget, mode: "clone" }, function (resp) {
                if (resp != null && resp.widget != undefined)
                    vm.userData.sendwidget(resp.widget).subscribe(function (r) {
                        vm.refresh();
                    });
            });
        });
    };
    WidgetstorePage.prototype.filterFavorite = function () {
        var vm = this;
        vm.query = "favorite";
    };
    ;
    WidgetstorePage.prototype.openWidget = function (link) {
        var _this = this;
        var vm = this;
        if (vm.navParams.get("from") == "AddeventAdvancedPage") {
            this.viewCtrl.dismiss(link);
            return;
        }
        if (vm.navParams.get("screen") == undefined) {
            this.userData.getwidget(link.id, true).subscribe(function (resp) {
                if (resp != null) {
                    Tools.openModal(_this.modalCtrl, widget_1.WidgetPage, { widget: resp, user: _this.userData.user, event: _this.eventData.event, preview: true }, function (resp) {
                        vm.refresh();
                    });
                }
            });
        }
        else {
            this.viewCtrl.dismiss(link);
        }
    };
    ;
    WidgetstorePage.prototype.onclose = function () {
        this.viewCtrl.dismiss();
    };
    WidgetstorePage.prototype.updateTextQuery = function () {
        //this._filter="";
        this.updateQuery();
    };
    WidgetstorePage.prototype.updateQuery = function () {
        this._query = "";
        if (this._filter.length > 0)
            this._query = this._filter;
        if (this.query.length > 0)
            this._query = this.query;
        if (this._filter.length > 0 && this.query.length > 0)
            this._query = this.query + " AND " + this._filter;
        this._query = this._query.trim();
    };
    WidgetstorePage.prototype.updateFilter = function (f) {
        this._filter = f.value.replace(",", " AND ");
        this.updateQuery();
    };
    WidgetstorePage = __decorate([
        core_1.Component({
            selector: 'page-widgetstore',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\widgetstore\widgetstore.html"*/'<!--\n  Generated template for the WidgetstorePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle [menu]="false" title="WIDGETSTORE.TITLE">\n    <!--<shifubutton *ngIf="navCtrl.canGoBack()" icon="close" (click)="onclose()"></shifubutton>-->\n    <shifubutton icon="close" (click)="onclose()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n<ion-content no-padding>\n  <tuto label="WIDGETSTORE.TUTO"></tuto>\n  <ion-list no-lines no-border>\n    <ion-list-header text-wrap>\n      {{"LIB.FILTER" | translate}}:<br>\n      <shifubuttongroup\n              labels="{{categories}}"\n              values="music,photo,message,bet,survey,people,presentation,commands"\n              [default]="_defaultCategories"\n              (onchange)="updateFilter($event)">\n      </shifubuttongroup>\n    </ion-list-header>\n      <ion-item shifuid="widget" *ngFor="let widget of widgets | filter: \'tag\':query | filter: \'activity\':_filter" (click)="openWidget(widget)">\n        <ion-avatar item-start>\n          <img src="{{widget.picture}}">\n        </ion-avatar>\n        {{widget.title}}&nbsp;<ion-icon *ngIf="widget.favorite" name="star"></ion-icon>\n          <p text-warp>\n            {{widget.description}}\n          </p>\n      </ion-item>\n  </ion-list>\n</ion-content>\n\n\n<ion-footer>\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" id="txtSearch" [(ngModel)]="query"  (ionChange)="updateQuery()" placeholder="{{\'WIDGETSTORE.SEARCH\' | translate }}">\n    </ion-searchbar>\n    <ion-buttons end>\n      <shifubutton *ngIf="settings.version>=1" id="btnFavorite" icon="star" (click)="filterFavorite()"></shifubutton>\n      <shifubutton id="btnAddWidget" icon="add-circle" (click)="addWidget()"></shifubutton>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\widgetstore\widgetstore.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_2.NavController, ionic_angular_1.NavParams, ionic_angular_2.LoadingController, settings_1.SettingsProvider,
            event_data_1.EventDataProvider, user_data_1.UserData, ionic_angular_1.ViewController, storage_1.Storage,
            core_2.TranslateService, ionic_angular_2.ModalController, ionic_angular_1.ToastController])
    ], WidgetstorePage);
    return WidgetstorePage;
}());
exports.WidgetstorePage = WidgetstorePage;
//# sourceMappingURL=widgetstore.js.map

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var Tools = __webpack_require__(2);
var core_2 = __webpack_require__(7);
var user_data_1 = __webpack_require__(8);
var Maintools_1 = __webpack_require__(2);
var Maintools_2 = __webpack_require__(2);
var Maintools_3 = __webpack_require__(2);
var api_1 = __webpack_require__(16);
var settings_1 = __webpack_require__(23);
var MusicserverPage = /** @class */ (function () {
    function MusicserverPage(userData, translate, toastCtrl, navCtrl, navParams, api, settings, viewCtrl) {
        var _this = this;
        this.userData = userData;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.settings = settings;
        this.viewCtrl = viewCtrl;
        this.description = "";
        this.services = [];
        this.musicServer = 3;
        this.streamingPlatforms = [];
        this.streamingPlatforms_sel = "";
        this.from = "";
        var token_deezer = "deezer";
        if (Maintools_3.getEnv() == 0)
            token_deezer = "deezer_local"; //modification pour tester deezer en local
        var availableOffers = [
            { "label": "Spotify", "value": "0", "description": "MUSICSERVER.SPOTIFYDESCRIPTION", token: "spotify", minTarif: 0, minVersion: 1 },
            { "label": "Deezer", "value": "1", "description": "MUSICSERVER.DEEZERDESCRIPTION", token: token_deezer, minTarif: 0, minVersion: 1 },
            { "label": "Vos MP3", "value": "2", "description": "MUSICSERVER.MULTIPLEDESCRIPTION", token: "drive", minTarif: 4, minVersion: 2 },
            { "label": "Youtube", "value": "3", "description": "MUSICSERVER.YOUTUBEDESCRIPTION", minTarif: 3, minVersion: 1 },
            { "label": "Manuel", "value": "4", "description": "MUSICSERVER.PERSODESCRIPTION", minTarif: 3, minVersion: 1 }
        ];
        availableOffers.forEach(function (t) {
            //if(t.minTarif<=this.userData.user.tarif.tarif && version>=t.minVersion)
            _this.streamingPlatforms.push(t);
        });
        this.from = this.navParams.get("from");
        this.streamingPlatforms_sel = this.streamingPlatforms[this.userData.user.musicServer];
        this.services = Tools.getAllServices(this.settings.services, "spotify,deezer", this.settings.version);
        this.musicServer = this.userData.user.musicServer;
    }
    MusicserverPage.prototype.selectPlatform = function (event) {
        var _this = this;
        var vm = this;
        var item = this.streamingPlatforms[this.musicServer];
        if (item != null) {
            this.description = item.description;
            vm.userData.user.musicServer = Number(event.value);
            if (item.hasOwnProperty("token")) {
                setTimeout(function () {
                    Tools.openGeneral(item.token, vm.userData.user).then(function (resp) {
                        if (resp) {
                            vm.userData.get().subscribe(function (u) {
                                vm.userData.user.musicServer = Number(event.value);
                                vm.userData.user.accessTokens = u.accessTokens;
                                vm.userData.clearPlaylist();
                                setTimeout(function () {
                                    vm.api.getcloudplaylist(vm.userData.user.id, false).subscribe(function (rep) {
                                        if (rep != null) {
                                            vm.userData.playlist = rep.items;
                                            vm.userData.playlistFrom = vm.userData.user.id;
                                        }
                                    });
                                }, 5000);
                            });
                        }
                    }, function () {
                        Maintools_3.toast(_this.toastCtrl, "ERROR.GENERAL", _this.translate);
                    });
                }, 1000);
            }
        }
    };
    MusicserverPage.prototype.valide = function () {
        var _this = this;
        var err = "ERROR.NOACCESS";
        if (this.userData.user.accessTokens != undefined) {
            if (this.userData.user.musicServer == Maintools_1.MUSICSERVER_SPOTIFY && this.userData.user.accessTokens.spotify != undefined)
                err = "";
            if (this.userData.user.musicServer == Maintools_2.MUSICSERVER_DEEZER && (this.userData.user.accessTokens.deezer != undefined || this.userData.user.accessTokens.deezer_local != undefined))
                err = "";
        }
        if (this.userData.user.musicServer == Maintools_1.MUSICSERVER_YOUTUBE || this.userData.user.musicServer == Maintools_2.MUSICSERVER_LOCAL)
            err = "";
        if (this.userData.user.musicServer == Maintools_2.MUSICSERVER_PERSO)
            err = "";
        if (err.length > 0)
            Maintools_3.toast(this.toastCtrl, err, this.translate);
        else {
            this.userData.senduser("musicServer").subscribe(function (rep) {
                if (rep != null) {
                    if (rep.message.length == 0)
                        _this.viewCtrl.dismiss({ user: rep, musicServer: _this.userData.user.musicServer });
                    else
                        Maintools_3.toast(_this.toastCtrl, rep.message, _this.translate);
                }
            });
        }
    };
    MusicserverPage = __decorate([
        core_1.Component({
            selector: 'page-musicserver',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\musicserver\musicserver.html"*/'<ion-header>\n  <shifutitle [back]="true" help="#">\n    <shifubutton id="btnSaveMusicServer" icon="checkmark" (click)="valide()"></shifubutton>\n    <shifubutton *ngIf="from!=\'home\'" id="btnNoMusic" label="LIB.NOMUSIC" icon="close" (click)="viewCtrl.dismiss({user:null})"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n<ion-content padding>\n  <tuto label="PERSO.TUTO_PLATFORM"></tuto>\n  <tuto [if]="musicServer==3" label="MUSICSERVER.TUTO_WARNINGYOUTUBE"></tuto>\n\n  <div style="width:100%;text-align: center;">\n    {{\'PERSO.MUSICSERVER\' | translate}}<br><br>\n    <ion-segment [(ngModel)]="musicServer" color="primary" (ionChange)="selectPlatform($event)">\n      <ion-segment-button name="optMusicServer" *ngFor="let item of streamingPlatforms" value="{{item.value}}">\n        {{item.label}}\n      </ion-segment-button>\n    </ion-segment>\n\n    <br>\n    <span style="font-size: medium" *ngIf="messages!=null && message.length>0" >{{message | translate}}</span><br>\n\n    {{description | translate}}<br><br>\n\n    <img *ngIf="musicServer==0" src="./assets/img/archi_spotify.svg"  style="width:80%;left:10%;">\n    <img *ngIf="musicServer==1" src="./assets/img/archi_multiple.svg" style="width:80%;left:10%;">\n    <img *ngIf="musicServer==2" src="./assets/img/archi_multiple.svg" style="width:80%;left:10%;">\n    <img *ngIf="musicServer==3" src="./assets/img/archi_youtube.svg"  style="width:80%;left:10%;">\n    <img *ngIf="musicServer==4" src="./assets/img/archi_perso.svg"  style="width:80%;left:10%;">\n\n    <br>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\musicserver\musicserver.html"*/,
        }),
        __metadata("design:paramtypes", [user_data_1.UserData, core_2.TranslateService, ionic_angular_1.ToastController,
            ionic_angular_1.NavController, ionic_angular_1.NavParams, api_1.ApiProvider, settings_1.SettingsProvider,
            ionic_angular_1.ViewController])
    ], MusicserverPage);
    return MusicserverPage;
}());
exports.MusicserverPage = MusicserverPage;
//# sourceMappingURL=musicserver.js.map

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var user_data_1 = __webpack_require__(8);
var api_1 = __webpack_require__(16);
var Maintools_1 = __webpack_require__(2);
var public_profil_1 = __webpack_require__(54);
var addevent_1 = __webpack_require__(82);
var core_2 = __webpack_require__(7);
var event_data_1 = __webpack_require__(15);
/**
 * Generated class for the ClosedeventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ClosedeventPage = /** @class */ (function () {
    function ClosedeventPage(userData, api, alertCtrl, loadingCtrl, eventData, viewCtrl, navCtrl, toastCtrl, translate, navParams, modalCtrl) {
        this.userData = userData;
        this.api = api;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.eventData = eventData;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.orderby = {};
        this.event = {};
        this.users = [];
        this.winner = {};
        this.songs = [];
        this.photos = [];
        this.user = {};
        this.messages = [];
        this.surveys = [];
        this.questions = [];
        this.bets = [];
        this.presentations = [];
        this.loteries = [];
        this.allmessages = "";
        this.hInterval = null;
        this.save = null; //Permet d'enregistrer l'identificant de eventData.event pour ne pas risquer de l'écraser
        var vm = this;
        vm.orderby = { critere: "creditEvent" };
        this.event = this.navParams.get("event");
    }
    ClosedeventPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var vm = this;
        if (vm.eventData.event != null)
            vm.save = vm.eventData.event.id;
        vm.eventData.event.id = vm.event.id;
        this.api.getpresents(this.event.id, true).subscribe(function (resp) {
            vm.users = resp.items;
            var rc = false;
            resp.items.forEach(function (item) {
                if (item.id == _this.userData.user.id)
                    rc = true;
            });
            if (rc == false)
                _this.viewCtrl.dismiss({ message: 'ERROR.NOTAUTHORIZED' });
            //vm.users=$filter("orderBy")(resp.result.items,"creditEvent",true);
            if (vm.event.activities.indexOf("bets") > -1) { //Si l'evt incluait des paris
                if (vm.user.hasOwnProperty("length") && vm.users.length > 0) {
                    vm.winner = vm.users[0];
                    vm.users.splice(0, 1);
                }
            }
            vm.api.getplayedsong(vm.event.id).subscribe(function (res) {
                vm.songs = res.items;
            });
            vm.api.slideshow(vm.event.id, null).subscribe(function (res2) {
                vm.photos = res2.items;
            });
        });
        vm.api.getloteries(vm.event.id).subscribe(function (resp) {
            vm.loteries = resp.items;
        });
        vm.api.getbets(vm.event.id).subscribe(function (resp) {
            vm.surveys = [];
            vm.bets = [];
            if (resp.items != undefined)
                resp.items.forEach(function (bet) {
                    if (bet.type == 4)
                        vm.bets.push(bet);
                    if (bet.type == 5)
                        vm.surveys.push(bet);
                    if (bet.type == 9)
                        vm.questions.push(bet);
                });
        });
        vm.allmessages = "";
        vm.api.getlastmessages(vm.event.id, 500).subscribe(function (resp) {
            vm.messages = resp.items;
            resp.items.forEach(function (i) { vm.allmessages += i + "\n"; });
        });
        vm.eventData.getpresentations().subscribe(function (resp) {
            vm.presentations = [];
            resp.items.forEach(function (p) { if (p.ended)
                vm.presentations.push(p); });
        });
        if (vm.save != null)
            vm.eventData.event.id = vm.save;
    };
    ClosedeventPage.prototype.openProfil = function (user) {
        Maintools_1.openModal(this.modalCtrl, public_profil_1.PublicProfilPage, { userid: user.id });
    };
    /**
     * Créé un événement depuis un modele
     * @param evt
     */
    ClosedeventPage.prototype.createEvent = function (evt) {
        var _this = this;
        var vm = this;
        this.userData.initevent(evt).subscribe(function (modele) {
            modele.option = { title: modele.title, address: modele.address, date: modele.date, teaser: modele.description };
            modele.dtStart = Number(modele.dtStart);
            modele.dtEnd = Number(modele.dtEnd);
            Maintools_1.openModal(_this.modalCtrl, addevent_1.AddeventPage, { user: _this.userData.user, lat: evt.lat, lng: evt.lng, zoom: 5, modele: modele }, function () {
                vm.viewCtrl.dismiss();
            });
        });
    };
    ClosedeventPage.prototype.uploadto = function (service) {
        var _this = this;
        var vm = this;
        Maintools_1.openGeneral(service, this.userData.user).then(function () {
            var loader = Maintools_1.loading(vm, "Photo Transfert ...", _this.photos.length);
            vm.userData.uploadto(vm.event.id, service).subscribe(function (resp) {
                loader.dismiss();
                Maintools_1.toast(vm.toastCtrl, resp.message, vm.translate);
            });
        });
    };
    ClosedeventPage.prototype.createPlaylist = function (service) {
        var _this = this;
        var l = Maintools_1.loading(this, "Playlist transfert ...", 60);
        this.api.createplaylist(this.event.id, this.userData.user.id, service).subscribe(function (r) {
            if (r.errorCode == 0)
                Maintools_1.toast(_this.toastCtrl, "Playlist transférée");
            else
                Maintools_1.toast(_this.toastCtrl, "ERROR.GENERAL");
            l.dismiss();
        });
    };
    ;
    ClosedeventPage.prototype.downloadAll = function () {
        if (this.event.closed)
            Maintools_1.openWindow(this.event.zipAlbum);
        else
            Maintools_1.toast(this.toastCtrl, "ERROR.EVENTMUSTBEFINISHED", this.translate);
    };
    ;
    ClosedeventPage.prototype.scrollTo = function (elementId) {
        var yOffset = document.getElementById(elementId);
        if (yOffset != null)
            this.content.scrollTo(0, yOffset.offsetTop, 2000);
    };
    ClosedeventPage.prototype.downloadTheMovie = function () {
        Maintools_1.openWindow(this.event.theMovie);
    };
    ClosedeventPage.prototype.download = function (pres) {
        Maintools_1.openWindow(pres.support, "download");
    };
    ClosedeventPage.prototype.copyMessage = function () {
        Maintools_1.toast(this.toastCtrl, "LIB.TEXTINCLIPBOARD", this.translate);
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Content),
        __metadata("design:type", ionic_angular_1.Content)
    ], ClosedeventPage.prototype, "content", void 0);
    ClosedeventPage = __decorate([
        core_1.Component({
            selector: 'page-closedevent',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\closedevent\closedevent.html"*/'<!--\n  Generated template for the ClosedeventPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <shifutitle (onclose)="viewCtrl.dismiss()" title="{{event.title}}">\n  </shifutitle>\n\n</ion-header>\n\n\n<ion-content no-padding>\n\n  <ion-item text-center no-border no-margin no-lines>\n    <ion-grid><ion-row>\n      <ion-col col-6 text-left>\n        <shifuflyer style="display:inline" text-center width="150px" [flyer]="event.flyer"><br>\n          <shifubutton [small]="true" label="CLOSEDEVENT.USEASMODEL" (click)="createEvent(event)"></shifubutton>\n        </shifuflyer>\n      </ion-col>\n      <ion-col text-right>\n        <span *ngIf="event.nBets>0">\n          {{bets.length}}&nbsp;{{"LIB.BET" | translate}}&nbsp;\n          <ion-icon  style="font-size:large" name="arrow-dropdown" (click)="scrollTo(\'cardSurvey\')"></ion-icon><br>\n        </span>\n\n        <span *ngIf="event.nMessages>0">\n          {{messages.length}}&nbsp;messages&nbsp;\n          <ion-icon  style="font-size:large" name="arrow-dropdown" (click)="scrollTo(\'cardMessage\')"></ion-icon>\n          <br>\n        </span>\n\n        <span *ngIf="event.nPhotos>0">\n          {{photos.length}}&nbsp;photos&nbsp;\n          <ion-icon  style="font-size:large" name="arrow-dropdown" (click)="scrollTo(\'cardPhoto\')"></ion-icon>\n          <br>\n        </span>\n\n        <span *ngIf="event.nSongs>0">\n          {{songs.length}}&nbsp;{{"CLOSEDEVENT.PUSHSONG" | translate}}s&nbsp;\n          <ion-icon  style="font-size:large" name="arrow-dropdown" (click)="scrollTo(\'cardSong\')"></ion-icon>\n          <br>\n        </span>\n\n        <span *ngIf="presentations.length>0">\n          {{presentations.length}}&nbsp;{{"LIB.PRESENTATION" | translate}}&nbsp;\n          <ion-icon  style="font-size:large" name="arrow-dropdown" (click)="scrollTo(\'cardPres\')"></ion-icon>\n          <br>\n        </span>\n\n        <!--<br><br><shifubutton *ngIf="event.theMovie.length>0" label="LIB.THEMOVIE" (click)="downloadTheMovie()"></shifubutton>-->\n      </ion-col>\n    </ion-row>\n    </ion-grid>\n\n    <br>\n\n  </ion-item>\n\n  <!--<div style="width:100%;text-align: center;" *ngIf="users.length>2 && event.activities.indexOf(\'bets\')>-1">-->\n    <!--<br><span style="font-size: xx-large">The winner with {{winner.creditEvent | number:0}}&nbsp;-->\n        <!--<img src="/img/money.png" class="money-small"></span>-->\n    <!--<br>-->\n    <!--<br>-->\n    <!--<img style="width: 100px;" src="{{winner.picture}}">-->\n    <!--<br>-->\n    <!--{{winner.firstname}}&nbsp;-->\n  <!--</div>-->\n\n  <shifucard title="Participants" *ngIf="users.length>1">\n    <shifuprofil [light]="true" *ngFor="let user of users" [user]="user"></shifuprofil>\n  </shifucard>\n\n\n  <!-- Affichage des messages sous forme de conversation -->\n  <shifucard id="cardMessage" title="Messages"\n             *ngIf="messages.length>0" icon="copy"\n             ngxClipboard [cbContent]="all_messages"\n             (onclick)="copyMessage()">\n\n    <ion-item *ngFor="let item of messages" [hidden]="item.photo.length!=0 || item.text.length==0">\n      <ion-avatar item-start>\n        <shifuimageprofil [user]="item.from"></shifuimageprofil>\n      </ion-avatar>\n      <p>\n        {{item.text}}\n      </p>\n    </ion-item>\n    <shifubutton *ngIf="user.id==event.owner_id" label="LIB.DOWNLOAD" (click)="downloadMessage()"></shifubutton>\n  </shifucard>\n\n  <shifucard id="cardSong" title="LIB.PLAYLIST" *ngIf="songs.length>0">\n    <ion-list no-lines no-margin no-padding>\n      <ion-list-header *ngIf="event.musicServer==0 || event.musicServer==1">\n        {{\'CLOSEDEVENT.CREATEPLAYLIST\' | translate }}<br>\n        <shifubutton *ngIf="event.musicServer==1" label="Deezer" size="100" (click)="createPlaylist(\'deezer\')"></shifubutton>\n        <shifubutton *ngIf="event.musicServer==0" label="Spotify" size="100" (click)="createPlaylist(\'spotify\')"></shifubutton>\n        <!--<shifubutton label="Winamp" size="100" (click)="createPlaylist(\'Winamp\')"></shifubutton>-->\n      </ion-list-header>\n      <ion-item *ngFor="let song of songs">\n        <ion-thumbnail item-start>\n          <img class="photo-style" src="{{song.picture}}" style="width:80px;height:80px;">\n        </ion-thumbnail>\n        {{song.title}}\n        <span name="author" style="font-size: x-small"><br>by {{song.author}}</span>\n        <shifunote [object]="song" item-end></shifunote>\n      </ion-item>\n    </ion-list>\n  </shifucard>\n\n  <shifucard id="cardPhoto" title="Gallery&nbsp;{{photos.length}}&nbsp;photos"\n             *ngIf="photos.length>0" [showButton]="event.zipAlbum!=null" icon="download" (onclick)="downloadAll()">\n    <div style="width:100%;text-align: center">\n      <!--<shifubutton [small]="true" icon="arrow-round-forward" size="80" label="GDrive" icon="ion-android-download" (click)="uploadto(\'drive\')"></shifubutton>-->\n      <!--<shifubutton [small]="true" icon="arrow-round-forward" size="80" label="Facebook" icon="ion-android-download" (click)="uploadto(\'fb_publish\')"></shifubutton>-->\n    </div>\n\n    <div style="width:100%;">\n      <div *ngFor="let photo of photos" style="position:relative;margin:5px;display:inline-block;max-width: 25%;max-height: 200px;" >\n        <img style="position:absolute;z-index:100;left:10%;top:10%;width:8px;height: 10px;" src="./assets/img/personne.png" (click)="openProfil(photo.from)">\n        <a download href="{{photo.url}}" target="_blank"><img style="width:100%;height:100%;z-index: 0;" src="{{photo.photo}}" class="photo-style"></a>\n      </div>\n    </div>\n    <br>\n  </shifucard>\n\n  <shifucard id="cardSurvey" title="LIB.SURVEYS" *ngIf="surveys.length>0">\n    <ion-item *ngFor="let survey of surveys">\n      {{survey.title}}\n      <p style="margin-left:5px" *ngFor="let option of survey.options">\n        {{option.total}} -\n        <img *ngIf="option.lib.indexOf(\'http\')==0" [src]="option.lib" style="display:inline;margin:5px;width:50px;height:50px;" class="image-photo">\n        <span *ngIf="option.lib.indexOf(\'http\')!=0">{{option.lib}}</span>\n      </p>\n    </ion-item>\n  </shifucard>\n\n  <shifucard id="cardQuestion" title="LIB.QUESTION" *ngIf="questions.length>0">\n    <ion-item *ngFor="let question of questions">\n      {{question.title}}\n      <p style="margin-left:5px" *ngFor="let vote of question.votes">\n        {{vote.description}}:{{vote.text}}\n      </p>\n    </ion-item>\n  </shifucard>\n\n  <shifucard id="cardLoterie" title="LIB.LOTERIE" *ngIf="loteries.length>0">\n    <ion-item *ngFor="let lot of loteries">\n      <ion-thumbnail item-start>\n        <img [src]="lot.picture" style="width: 100px">\n      </ion-thumbnail>\n      <p>{{lot.title}}</p>\n      {{"LIB.WINNER" | translate}}:{{lot.winner_name}}\n    </ion-item>\n  </shifucard>\n\n\n  <shifucard id="cardPres" title="LIB.PRESENTATION" *ngIf="presentations.length>0">\n    <ion-item *ngFor="let p of presentations">\n      <ion-avatar item-start>\n        <shifuimageprofil [user]="p.from"></shifuimageprofil>\n      </ion-avatar>\n      <p>{{p.title}}<br>{{p.text}}</p>\n      <shifubutton item-end [small]="true" icon="download" (click)="download(p)"></shifubutton>\n    </ion-item>\n  </shifucard>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\closedevent\closedevent.html"*/,
        }),
        __metadata("design:paramtypes", [user_data_1.UserData, api_1.ApiProvider, ionic_angular_2.AlertController, ionic_angular_2.LoadingController, event_data_1.EventDataProvider,
            ionic_angular_1.ViewController, ionic_angular_1.NavController, ionic_angular_1.ToastController, core_2.TranslateService,
            ionic_angular_1.NavParams, ionic_angular_2.ModalController])
    ], ClosedeventPage);
    return ClosedeventPage;
}());
exports.ClosedeventPage = ClosedeventPage;
//# sourceMappingURL=closedevent.js.map

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(105);
__webpack_require__(533);
var Main = __webpack_require__(2);
var ionic_angular_1 = __webpack_require__(3);
var Tools = __webpack_require__(2);
var Maintools_1 = __webpack_require__(2);
var settings_1 = __webpack_require__(23);
/*
 Generated class for the EventDataProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
var EventDataProvider = /** @class */ (function () {
    function EventDataProvider(events, http, settings) {
        this.events = events;
        this.http = http;
        this.settings = settings;
        this.hTimer = null;
        this.online = true;
        this.event = { activities: [], laCarte: "", Cashiers: [], Moderators: [], Preparators: [] };
        this.currentSong = null;
        this.lastOrder = { presentation: 0, user: 0, charts: 0, playlist: 0, sanity: 0, tweet: 0, music: 0, event: 0, photo: 0, message: 0 };
        this.socketServerAddress = null;
        this.handle = null;
        var vm = this;
        for (var _i = 0, _a = ["presentation", "user", "screen", "charts", "playlist", "sanity", "tweet", "music", "event", "photo", "command", "message", "bets"]; _i < _a.length; _i++) {
            var order = _a[_i];
            //this.orders.set(order,new BehaviorSubject<any[]>(null));
            vm.lastOrder[order] = 0;
        }
    }
    EventDataProvider.prototype.update = function () {
        var _this = this;
        Maintools_1.$$("Traitement de l'ordre 'Event'");
        this.http.get(Main.api("getevent", "event=" + this.event.id)).subscribe(function (data) {
            _this.event = data;
            if (_this.event.closed)
                _this.events.publish("event:logout", _this.event);
        });
    };
    EventDataProvider.prototype.quit = function () {
        this.event = { activities: [], laCarte: "", Cashiers: [], Moderators: [], Preparators: [] };
        this.lastOrder = { presentation: 0, user: 0, charts: 0, playlist: 0, sanity: 0, tweet: 0, music: 0, event: 0, photo: 0 };
        ;
        clearInterval(this.hTimer);
        this.hTimer = null;
    };
    EventDataProvider.prototype.ngOnDestroy = function () {
        this.quit();
    };
    // private getOrders(order:string) {
    //   return this.orders.get(order).asObservable();
    // }
    // awaitData(order:string) {
    //   if(!this.fetching){// && !goog.isDef(this.orders.getValue())){
    //     this.refresh();
    //   }
    //   return this.getOrders(order);
    // }
    EventDataProvider.prototype.refreshOrder = function (data) {
        var vm = this;
        this.fetching = true;
        if (this.event.id != undefined && this.event.id != null) {
            // this.http.get(Main.api("getorders","event="+vm.event.id))
            //   .timeout(500)
            //
            //   .subscribe((data) => {
            if (data == null)
                vm.events.publish("event:logout", null);
            else {
                //IMPORTANT : Les nouveaux ordre doivent être reporté à de nombreux endroits dans ce fichier
                for (var _i = 0, _a = ["presentation", "user", "screen", "charts", "playlist", "sanity", "tweet", "music", "event", "photo", "command", "message", "bets"]; _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (vm.lastOrder[key] == null)
                        vm.lastOrder[key] = 0;
                    if (data.dtLastOrder.hasOwnProperty(key) && data.dtLastOrder[key] > vm.lastOrder[key]) {
                        vm.lastOrder[key] = data.dtLastOrder[key];
                        vm.fetching = false;
                        Tools.$$("Diffusion de " + key);
                        vm.events.publish(key);
                        if (key == "event") {
                            if (this.settings.mustRefresh("event", Maintools_1.DELAY_TO_REFRESH)) {
                                this.update();
                            }
                        }
                    }
                }
            }
        }
    };
    EventDataProvider.prototype.initSocketServerAddress = function (func) {
        var _this = this;
        if (this.socketServerAddress == null)
            this.http.get(Tools.api("infoserver", null)).subscribe(function (resp) {
                if (resp != null && resp.socketserver != undefined) {
                    _this.socketServerAddress = resp.socketserver.replace("http", "ws");
                    func();
                }
                else
                    func();
            });
        else
            func();
    };
    EventDataProvider.prototype.searchSocketServer = function (id, userid) {
        var _this = this;
        var vm = this;
        if (this.socket == null) {
            this.initSocketServerAddress(function () {
                _this.socket = new WebSocket(_this.socketServerAddress + '/chat');
                _this.socket.onmessage = function (evt) {
                    var message = evt.data;
                    if (message != null && message.length > 0 && message.indexOf("{") == 0)
                        vm.refreshOrder({ dtLastOrder: JSON.parse(message) });
                };
                _this.socket.onopen = function (evt) {
                    Maintools_1.$$("Socket open");
                    _this.socket.send(userid + "," + id);
                };
                _this.socket.onclose = function (evt) {
                    Maintools_1.$$("Socket close");
                    _this.socket = null;
                    //On va chercher a se reconnecter
                    clearTimeout(_this.handle);
                    _this.searchSocketServer(id, userid);
                    _this.handle = setTimeout(function () { _this.searchSocketServer(id, userid); }, 10000);
                };
                _this.socket.onerror = function (err) {
                    Maintools_1.$$("Socket error");
                    _this.socket = null;
                    _this.socketServerAddress = null; //Rend le server de socket obsolete, on va en demander un nouveau
                    clearTimeout(_this.handle);
                    _this.searchSocketServer(id, userid);
                    _this.handle = setTimeout(function () { _this.searchSocketServer(id, userid); }, 10000);
                };
            });
        }
        else {
            clearTimeout(this.handle);
            this.handle = setTimeout(function () { _this.searchSocketServer(id, userid); }, 10000);
        }
    };
    /**
     * Configure le provider pour traiter le nouvel événement
     * @param {string} id
     * @param {string} userid
     * @param {any} func
     */
    EventDataProvider.prototype.join = function (id, userid, func) {
        if (func === void 0) { func = null; }
        this.searchSocketServer(id, userid); //On se connecte au serveur de socket
        var vm = this;
        this.http.get(Main.api("getevent", "event=" + id))
            .subscribe(function (rep) {
            vm.event = rep;
            if (func != null)
                func();
        });
    };
    // loadaround(lat:number,lng:number,distance:number){
    //   return this.http.get(Main.api("geteventsaround","lat="+lat+"&lng="+lng+"&distance="+distance));
    // }
    EventDataProvider.prototype.add = function (userid, event) {
        return this.http.post(Main.api("addevent", "user=" + userid), event);
    };
    /**
     * Création d'un événement basic sur la base des modeles
     * @param userid
     * @param event
     * @returns {Observable<any>}
     */
    EventDataProvider.prototype.addbasic = function (userid, title, delay, duration, activities, flyer, address, lat, lng, dest) {
        if (delay === void 0) { delay = 0; }
        if (duration === void 0) { duration = 8; }
        if (activities === void 0) { activities = "music,message,photo"; }
        if (flyer === void 0) { flyer = ""; }
        if (address === void 0) { address = ""; }
        if (lat === void 0) { lat = null; }
        if (lng === void 0) { lng = null; }
        if (dest === void 0) { dest = "HomePage"; }
        return this.http.get(Main.api("addbasicevent", "dest="
            + dest + "&lat=" + lat + "&lng=" + lng + "&address=" + encodeURIComponent(address) + "&email="
            + userid + "&flyer=" + flyer + "&title=" + title + "&activities=" + activities + "&delay=" + delay + "&duration=" + duration));
    };
    EventDataProvider.prototype.slideshow = function (delay) {
        if (delay === void 0) { delay = 1e9; }
        return this.http.get(Main.api("slideshow", "event=" + this.event.id + "&delay=" + delay));
    };
    EventDataProvider.prototype.deletemessage = function (idmessage, userid) {
        return this.http.get(Main.api("delmessage", "user=" + userid + "&event=" + this.event.id + "&message=" + idmessage));
    };
    EventDataProvider.prototype.validatemessage = function (idmessage, tags) {
        if (tags === void 0) { tags = ""; }
        return this.http.get(Main.api("validatemessage", "message=" + idmessage + "&tags=" + tags));
    };
    EventDataProvider.prototype.validebet = function (idbet, result) {
        return this.http.get(Main.api("validebet", "event=" + this.event.id + "&bet=" + idbet + "&result=" + result));
    };
    EventDataProvider.prototype.addlegend = function (idmessage, text) {
        if (text === void 0) { text = ""; }
        return this.http.get(Main.api("addlegend", "message=" + idmessage + "&text=" + text + "&event=" + this.event.id));
    };
    EventDataProvider.prototype.getinvites = function () {
        return this.http.get(Main.api("getinvites", "event=" + this.event.id));
    };
    EventDataProvider.prototype.makeLoterieAvailable = function (idlot, value) {
        return this.http.get(Main.api("makeloterieavailable", "loterie=" + idlot + "&value=" + value + "&event=" + this.event.id));
    };
    EventDataProvider.prototype.updaterole = function (user, role, bDel) {
        return this.http.get(Main.api("updaterole", "event=" + this.event.id + "&user=" + user + "&role=" + role + "&delete=" + bDel));
    };
    EventDataProvider.prototype.getpresents = function (all, target) {
        if (all === void 0) { all = true; }
        if (target === void 0) { target = ""; }
        return this.http.get(Main.api("getpresents", "event=" + this.event.id + "&all=" + all + "&target=" + target));
    };
    EventDataProvider.prototype.getlastmessages = function (messages) {
        return this.http.get(Main.api("getlastmessages", "event=" + this.event.id + "&nmessages=" + messages + "&type=1"));
    };
    EventDataProvider.prototype.getscheduledmessages = function (messages) {
        return this.http.get(Main.api("getscheduledmessages", "event=" + this.event.id + "&nmessages=" + messages + "&type=1"));
    };
    EventDataProvider.prototype.djplay = function (song) {
        return this.http.get(Main.api("djplay", "event=" + this.event.id + "&song=" + song.id));
    };
    EventDataProvider.prototype.shareevent = function (message, dest, from, name, evt) {
        if (evt === void 0) { evt = null; }
        if (evt == null)
            evt = this.event;
        return this.http.get(Main.api("shareevent", "event=" + evt.id + "&message=" + message + "&dests=" + dest + "&from=" + from + "&name=" + name));
    };
    EventDataProvider.prototype.getlastphoto = function (userid, toVote, offset, size) {
        if (toVote === void 0) { toVote = false; }
        if (offset === void 0) { offset = 0; }
        if (size === void 0) { size = 5; }
        return this.http.get(Main.api("getlastmessages", "offset=" + offset + "&tovote=" + toVote + "&event=" + this.event.id + "&nmessages=" + size + "&user=" + userid + "&type=0"));
    };
    EventDataProvider.prototype.closeevent = function (userid) {
        return this.http.get(Main.api("closeevent", "event=" + this.event.id + "&user=" + userid));
    };
    EventDataProvider.prototype.sendinvitetofollower = function (max) {
        if (max === void 0) { max = 50; }
        return this.http.get(Main.api("sendinvitetofollower", "event=" + this.event.id + "&max=" + max));
    };
    EventDataProvider.prototype.sendinvitetofollowers = function (event, max) {
        return this.http.get(Main.api("sendinvitetofollower", "event=" + event + "&max=" + max));
    };
    EventDataProvider.prototype.getorders = function (idEvent) {
        return this.http.get(Main.api("getorders", "event=" + idEvent));
    };
    EventDataProvider.prototype.getplaylist = function (idEvent) {
        return this.http.get(Main.api("getplaylist", "event=" + idEvent));
    };
    EventDataProvider.prototype.searchcloud = function (q, userid, eventid) {
        return this.http.get(Main.api("searchcloud", "query=" + q + "&user=" + userid + "&event=" + eventid));
    };
    EventDataProvider.prototype.searchlocal = function (q, userid, eventid) {
        return this.http.get(Main.api("searchlocal", "query=" + q + "&user=" + userid + "&event=" + eventid));
    };
    EventDataProvider.prototype.getcommands = function (userid) {
        if (userid === void 0) { userid = null; }
        return this.http.get(Main.api("getcommands", "event=" + this.event.id + "&user=" + userid));
    };
    EventDataProvider.prototype.searchstream = function (q, eventid) {
        return this.http.get(Main.api("searchstream", "query=" + q + "&event=" + eventid));
    };
    EventDataProvider.prototype.addsong = function (song) {
        return this.http.post(Main.api("addsong", "event=" + this.event.id), song).timeout(15000);
    };
    EventDataProvider.prototype.addsongsauto = function (nsongs) {
        return this.http.get(Main.api("addsongsauto", "event=" + this.event.id + "&nsongs=" + nsongs));
    };
    EventDataProvider.prototype.updatecommand = function (commandid, status) {
        return this.http.get(Main.api("updatecommand", "command=" + commandid + "&status=" + status));
    };
    EventDataProvider.prototype.lastphoto = function (userid, all) {
        return this.http.get(Main.api("lastphoto", "event=" + this.event.id + "&user=" + userid + "&all=" + all));
    };
    EventDataProvider.prototype.sendphoto = function (photo) {
        return this.http.post(Main.api("sendphoto", "event=" + this.event.id), photo);
    };
    EventDataProvider.prototype.sendmessage = function (delay, message) {
        return this.http.post(Main.api("sendmessage", "delay=" + delay + "&event=" + this.event.id), message);
    };
    EventDataProvider.prototype.getuserslikeme = function (target) {
        return this.http.get(Main.api("getuserslikeme", "event=" + this.event.id + "&target=" + target));
    };
    EventDataProvider.prototype.sendcustomercommand = function (command) {
        return this.http.post(Main.api("sendcustomercommand", "event=" + this.event.id), command);
    };
    EventDataProvider.prototype.updateevent = function (fields, evt) {
        if (evt === void 0) { evt = null; }
        if (evt == null)
            evt = this.event;
        return this.http.post(Main.api("updateevent", "event=" + evt.id + "&field=" + fields), evt);
    };
    EventDataProvider.prototype.getloteries = function (userid) {
        return this.http.get(Main.api("getloteries", "event=" + this.event.id + "&user=" + userid)).timeout(5000);
    };
    EventDataProvider.prototype.getbets = function (userid, actif, pattern, tags) {
        if (actif === void 0) { actif = true; }
        if (pattern === void 0) { pattern = false; }
        if (tags === void 0) { tags = ""; }
        return this.http.get(Main.api("getbets", "tags=" + tags + "&actif=" + actif + "&pattern=" + pattern + "&event=" + this.event.id + "&user=" + userid)).timeout(4000);
    };
    EventDataProvider.prototype.nextsong = function (sc) {
        return this.http.get(Main.api("nextsong", "event=" + this.event.id + "&sc=" + sc));
    };
    EventDataProvider.prototype.sendbet = function (newbet) {
        return this.http.post(Main.api("sendbet", "event=" + this.event.id), newbet);
    };
    EventDataProvider.prototype.startbet = function (newbet) {
        return this.http.get(Main.api("startbet", "event=" + this.event.id + "&bet=" + newbet.id));
    };
    EventDataProvider.prototype.addloterie = function (lot) {
        return this.http.post(Main.api("addloterie", "event=" + this.event.id), lot);
    };
    EventDataProvider.prototype.has = function (act) {
        return this.event.activities.indexOf(act.toLowerCase()) > -1;
    };
    EventDataProvider.prototype.sendRespons = function (idbet, user, freetext) {
        var v = { text: freetext, from: user };
        return this.http.post(Main.api("sendrespons", "bet=" + idbet + "&event=" + this.event.id + "&user=" + user), v);
    };
    EventDataProvider.prototype.stopcurrentsong = function () {
        return this.http.get(Main.api("stopcurrentsong", "event=" + this.event.id));
    };
    EventDataProvider.prototype.sendpresentation = function (pres) {
        return this.http.post(Main.api("sendpresentation", "event=" + this.event.id), pres);
    };
    EventDataProvider.prototype.getpresentations = function () {
        return this.http.get(Main.api("getpresentations", "event=" + this.event.id));
    };
    EventDataProvider.prototype.activepresentation = function (pres, active) {
        return this.http.get(Main.api("activepresentation", "event=" + this.event.id + "&pres=" + pres.id + "&active=" + active));
    };
    EventDataProvider.prototype.delpresentation = function (id) {
        return this.http.get(Main.api("delpresentation", "event=" + this.event.id + "&presentation=" + id));
    };
    EventDataProvider.prototype.gotopage = function (pres) {
        return this.http.get(Main.api("gotopage", "event=" + this.event.id + "&pres=" + pres.id + "&page=" + pres.page));
    };
    //Retourne le nombre d'utilisateur qui possede des crédits
    EventDataProvider.prototype.getnuserswithscoin = function (func) {
        var _this = this;
        this.getpresents(true).subscribe(function (presents) {
            var rc = 0;
            presents.items.forEach(function (present) {
                if (present.jetons[_this.event.owner_id] > 0)
                    rc++;
            });
            func(rc);
        });
    };
    EventDataProvider = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ionic_angular_1.Events, http_1.HttpClient, settings_1.SettingsProvider])
    ], EventDataProvider);
    return EventDataProvider;
}());
exports.EventDataProvider = EventDataProvider;
//# sourceMappingURL=event-data.js.map

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
__webpack_require__(536);
var Tools = __webpack_require__(2);
var Maintools_1 = __webpack_require__(2);
__webpack_require__(538);
var http_1 = __webpack_require__(105);
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ApiProvider = /** @class */ (function () {
    function ApiProvider(http) {
        this.http = http;
    }
    ApiProvider.prototype.delFollower = function (owner, follower) {
        return this.http.get(Tools.api("delfollower", "follower=" + follower + "&user=" + owner));
    };
    ApiProvider.prototype.getavatar = function (category, index) {
        if (index === void 0) { index = null; }
        return this.http.get(Tools.api("getavatar", "index=" + index + "&category=" + category));
    };
    ApiProvider.prototype.getcloudplaylist = function (user, force) {
        if (force === void 0) { force = false; }
        return this.http.get(Tools.api("getcloudplaylist", "user=" + user + "&force=" + force));
    };
    ApiProvider.prototype.blacklist = function (owner, user, bAdd) {
        return this.http.get(Tools.api("blacklist", "owner=" + owner + "&user=" + user + "&add=" + bAdd));
    };
    ApiProvider.prototype.addFollower = function (owner, follower) {
        return this.http.get(Tools.api("addfollower", "follower=" + follower + "&user=" + owner));
    };
    ApiProvider.prototype.termofuse = function (lang) {
        if (lang === void 0) { lang = "fr"; }
        return this.http.get(Tools.api("termofuse", "lang=" + lang));
    };
    ApiProvider.prototype.get = function (id) {
        return this.http.get(Tools.api("getuser", "user=" + id));
    };
    ApiProvider.prototype.getevent = function (id) {
        return this.http.get(Tools.api("getevent", "event=" + id));
    };
    ApiProvider.prototype.loadinsquare = function (userid, latmin, lngmin, latmax, lngmax) {
        return this.http.get(Tools.api("geteventsinsquare", "user=" + userid + "&latmin=" + latmin + "&lngmin=" + lngmin + "&latmax=" + latmax + "&lngmax=" + lngmax));
    };
    ApiProvider.prototype.getloteries = function (eventid) {
        return this.http.get(Tools.api("getloteries", "event=" + eventid));
    };
    ApiProvider.prototype.getbets = function (eventid) {
        return this.http.get(Tools.api("getbets", "actif=false&event=" + eventid))
            .timeout(4000);
    };
    ApiProvider.prototype.closestevents = function (lat, lng) {
        return this.http.get(Tools.api("closestevents", "lat=" + lat + "&lng=" + lng));
    };
    ApiProvider.prototype.getphotofromuser = function (userid, eventid, max) {
        if (eventid === void 0) { eventid = null; }
        if (max === void 0) { max = 30; }
        return this.http.get(Tools.api("getphotofromuser", "user=" + userid + "&event=" + eventid + "&max=" + max));
    };
    ApiProvider.prototype.geteventsfrom = function (id, limit, onlyOwner, onlyActif) {
        if (limit === void 0) { limit = 15; }
        if (onlyOwner === void 0) { onlyOwner = false; }
        if (onlyActif === void 0) { onlyActif = false; }
        return this.http.get(Tools.api("geteventsfrom", "user=" + id + "&limit=" + limit + "&onlyOwner=" + onlyOwner + "&onlyActif=" + onlyActif));
    };
    ApiProvider.prototype.createplaylist = function (eventid, userid, service) {
        return this.http.get(Tools.api("createplaylist", "event=" + eventid + "&user=" + userid + "&service=" + service));
    };
    ApiProvider.prototype.getpresents = function (id, all) {
        if (all === void 0) { all = true; }
        return this.http.get(Tools.api("getpresents", "event=" + id + "&all=" + all));
    };
    ApiProvider.prototype.sendtemplate = function (dest, from, template, params) {
        return this.http.post(Tools.api("sendtemplate", "from=" + from + "&dest=" + dest + "&template=" + template), params);
    };
    ApiProvider.prototype.getqrcode = function (url, size) {
        if (size === void 0) { size = 50; }
        return this.http.get(Tools.api("getqrcode", "url=" + encodeURIComponent(url) + "&size=" + size, false));
    };
    ApiProvider.prototype.urlshortener = function (url) {
        return this.http.get(Tools.api("shortener", "url=" + encodeURIComponent(url), false));
    };
    ApiProvider.prototype.chargecredits = function (user, target, credits) {
        return this.http.get(Tools.api("chargecredits", "user=" + user + "&target=" + target + "&credits=" + credits));
    };
    ApiProvider.prototype.getlastmessages = function (id, messages) {
        return this.http.get(Tools.api("getlastmessages", "event=" + id + "&nmessages=" + messages + "&type=1"));
    };
    ApiProvider.prototype.slideshow = function (id, delay) {
        if (delay === void 0) { delay = 1e9; }
        return this.http.get(Tools.api("slideshow", "event=" + id + "&delay=" + delay));
    };
    ApiProvider.prototype.getplaylist = function (idEvent) {
        return this.http.get(Tools.api("getplaylist", "event=" + idEvent));
    };
    ApiProvider.prototype.getplayedsong = function (idEvent) {
        return this.http.get(Tools.api("getplayedsong", "event=" + idEvent));
    };
    ApiProvider.prototype.getcharts = function (catalogue) {
        if (catalogue === void 0) { catalogue = ""; }
        return this.http.get(Tools.api("getcharts", "catalogue=" + catalogue));
    };
    ApiProvider.prototype.checkservers = function () {
        return this.http.get(Tools.api("checkservers", "password=hh4271"));
    };
    ApiProvider.prototype.getcatalogues = function () {
        return this.http.get(Tools.api("getcatalogues", ""));
    };
    ApiProvider.prototype.uploadimage = function (onlyContent, p) {
        return this.http.post(Tools.api("uploadimage", "onlycontent=" + onlyContent), p);
    };
    ApiProvider.prototype.connectToServer = function (types, useragent, func, func_error) {
        if (types == null)
            types = "prod";
        var type_array = types.split(",");
        for (var i = 0; i < type_array.length; i++) {
            var type = type_array[i];
            Tools.setServer(type);
            this.http.get(Tools.api("infoserver", "useragent=" + encodeURIComponent(useragent))).subscribe(function (resp) {
                if (resp != null) {
                    if (resp.socketserver == undefined || resp.root == undefined) {
                        Maintools_1.$$("Le serveur n'est pas pret : ", resp);
                        func_error("Server not ready");
                    }
                    else {
                        resp.socketserver = resp.socketserver.replace("http:", "ws:").replace("https:", "wss:");
                        func(resp);
                    }
                }
            }, function (err) {
                Maintools_1.$$("Connexion unavailable : " + err);
                if (func_error != null)
                    func_error(err);
            });
        }
    };
    ApiProvider.prototype.avatargenerator = function (pseudo, female, save) {
        if (save === void 0) { save = false; }
        return this.http.get(Tools.api("avatargenerator", "save=" + save + "&pseudo=" + pseudo + "&female=" + female));
    };
    ApiProvider.prototype.gettemplates = function () {
        return this.http.get(Tools.api("gettemplates", ""));
    };
    ApiProvider.prototype.loadtheme = function (theme_url) {
        return this.http.get(Tools.api("loadtheme", "url=" + theme_url));
    };
    ApiProvider.prototype.getAvatars = function (gal) {
        return this.http.get(Tools.api("getavatars", "category=" + gal));
    };
    ApiProvider.prototype.getAvatarsPro = function (nbr, text) {
        var s = "";
        if (text == null)
            return null;
        if (text.length > 0)
            s = text.substr(0, 1).toUpperCase();
        if (text.length > 1)
            s = s + text.substr(1, 1).toLowerCase();
        return this.http.get(Tools.api("getavatars_pro", "number=" + nbr + "&text=" + text));
    };
    ApiProvider = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ApiProvider);
    return ApiProvider;
}());
exports.ApiProvider = ApiProvider;
//# sourceMappingURL=api.js.map

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var core_2 = __webpack_require__(7);
var selevent_1 = __webpack_require__(182);
var user_data_1 = __webpack_require__(8);
var Main = __webpack_require__(2);
var loginemail_1 = __webpack_require__(186);
var api_1 = __webpack_require__(16);
var Maintools_1 = __webpack_require__(2);
var storage_1 = __webpack_require__(42);
var event_data_1 = __webpack_require__(15);
var loginavatar_1 = __webpack_require__(190);
var settings_1 = __webpack_require__(23);
var LoginPage = /** @class */ (function () {
    function LoginPage(navParams, api, eventData, navCtrl, userData, storage, loadingCtrl, settings, platform, translate, modalCtrl, events, alertCtrl, toastCtrl, plt) {
        var _this = this;
        this.navParams = navParams;
        this.api = api;
        this.eventData = eventData;
        this.navCtrl = navCtrl;
        this.userData = userData;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.settings = settings;
        this.platform = platform;
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.plt = plt;
        this.test = { value: 10 };
        this.temp_user = null;
        this.env = 1;
        this.welcome_message = "";
        this.backimage = "";
        this.connexion = "";
        this.allowAnonymous = true;
        this.pseudo = "";
        this.settings.loadtheme();
        this.connexion = navParams.get("connexion");
        this.storage.get("anonymous").then(function (anonym) {
            if (anonym != null)
                _this.allowAnonymous = (anonym == "true");
        });
    }
    LoginPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var vm = this;
        this.storage.get("server").then(function (r) {
            Main.$$("Demande de connexion a " + r);
            _this.api.connectToServer(r, _this.platform.userAgent(), function (rep) {
                var temp = JSON.parse(rep.services);
                _this.settings.services = { 'services': [] };
                temp.services.forEach(function (s) {
                    if (s.mode == null || s.mode != "dev" || Maintools_1.isLocal())
                        _this.settings.services.services.push(s);
                });
                _this.eventData.socketServerAddress = rep.socketserver;
                vm.env = Main.getEnv();
                _this.userData.load(function (ok) {
                    if (ok) {
                        Main.$$("Chargement du user ok");
                        _this.userData.get().subscribe(function (rep) {
                            Main.$$("Récupération du compte ", rep);
                            if (rep == null || rep.temp) { //On connait le joueur
                                Main.$$("Effacement de la clé user");
                                _this.storage.remove("user");
                                _this.ionViewDidEnter();
                                return;
                            }
                            else {
                                Main.$$("Reconnexion automatique de ", rep);
                                _this.nextScreen(rep);
                                return;
                            }
                        }, function (err) {
                            Main.$$("Erreur de récupération du compte");
                            vm.userData.setId(null);
                            vm.createTempUser();
                        });
                    }
                    else { //On ne connait pas le participant sur ce device
                        if (_this.settings.autologin > 0)
                            _this.anonymousPrompt(null, _this.settings.autologin);
                        else {
                            if (_this.settings.login_email.length > 0) {
                                _this.showEmailLogin();
                            }
                            else {
                                Main.$$("Chargement du user KO !");
                                vm.createTempUser();
                                _this.storage.get("flyer").then(function (flyer) {
                                    if (flyer != null && flyer != "undefined") {
                                        vm.backimage = flyer;
                                        var img = new Image();
                                        img.onload = function () {
                                            vm.container.nativeElement.style.backgroundImage = "url(\"" + flyer + "\")";
                                            vm.container.nativeElement.style.backgroundSize = "cover";
                                            if ((screen.availWidth - img.width) / 2 < 0) {
                                                vm.container.nativeElement.style.backgroundPositionX = (screen.availWidth - img.width) / 2 + "px";
                                                vm.container.nativeElement.style.backgroundPositionY = (screen.availHeight - img.height) / 2 + "px";
                                            }
                                            vm.container.nativeElement.style.backgroundRepeat = "no-repeat";
                                            vm.container.nativeElement.style.filter = "grayscale(70%);blur(2px);saturate(90%)";
                                        };
                                        img.src = flyer;
                                    }
                                    else
                                        vm.backimage = "";
                                    vm.storage.remove("flyer");
                                });
                            }
                        }
                    }
                });
            }, function (err) {
                Maintools_1.$$("Probleme de connexion au serveur :" + err);
                setTimeout(function () {
                    _this.ionViewDidEnter();
                }, 5000);
            });
        });
        this.storage.get("type").then(function (r) {
            if (r == "create_event")
                _this.welcome_message = "LOGIN.WELCOMECREATEEVENT";
        });
    };
    /**
     * Connexion à l'écran principal
     * @param u
     */
    LoginPage.prototype.nextScreen = function (u) {
        var _this = this;
        Main.$$("NextScreen. Vérification de la possibilité de connexion a l'écran principal pour ", u);
        this.storage.remove("anonymous");
        this.userData.setId(u.id);
        var l = Maintools_1.loading(this, "Connexion ...");
        this.userData.canlogin().subscribe(function (r) {
            Maintools_1.toast(_this.toastCtrl, r.message, _this.translate);
            l.dismiss();
            if (r.message == "") {
                Main.$$("Pas de probleme de connexion. Connexion avec ", u);
                _this.events.publish("user:login", u);
            }
        }, function () { l.dismiss(); });
    };
    LoginPage.prototype.showEmailLogin = function () {
        var _this = this;
        Maintools_1.openModal(this.modalCtrl, loginemail_1.LoginemailPage, null, function (r) {
            if (r != null) {
                _this.nextScreen(r);
            }
        });
    };
    LoginPage.prototype.facebook_login = function () {
        if (Maintools_1.getEnv() == 1)
            this.ServiceLogin("facebook");
        else
            this.ServiceLogin("fb_local");
    };
    /**
     * Service de connexion
     * @param token_name
     * @constructor
     */
    LoginPage.prototype.ServiceLogin = function (token_name) {
        var _this = this;
        Maintools_1.$$("Connexion a " + token_name);
        var vm = this;
        Main.openGeneral(token_name, vm.temp_user).then(function (id) {
            vm.userData.get(id).subscribe(function (resp) {
                if (resp == null) {
                    vm.events.publish("user:loggout");
                    return;
                }
                if (resp.hasOwnProperty("accessTokens") && resp.accessTokens[token_name] != null && resp.accessTokens[token_name].token != null) {
                    var l = Maintools_1.loading(_this);
                    vm.userData.setId(resp.id);
                    vm.userData.user["profil"] = Main.PROFIL_PERSO;
                    if (vm.navParams.get("profil") === "pro")
                        vm.userData.user.profil = Main.PROFIL_PROPRIVE;
                    if (vm.navParams.get("profil") === "public")
                        vm.userData.user.profil = Main.PROFIL_PROPUBLIC;
                    vm.userData.senduser("profil").subscribe(function (resp2) {
                        l.dismiss();
                        vm.nextScreen(vm.userData.user);
                        return;
                    }, function (error) { l.dismiss(); return; });
                }
                else {
                    if (l != null)
                        l.dismiss();
                    Maintools_1.toast(_this.toastCtrl, "ERROR.RETRY", _this.translate);
                    Main.$$("Error : " + token_name + " ne retourne pas de token");
                }
            });
        });
    };
    ;
    LoginPage.prototype.createTempUser = function () {
        Main.$$("Create Temp user");
        var vm = this;
        //var obj={device: this.plt.userAgent(), time: new Date().getTime(), lang: this.plt.lang(),app_name:this.settings.app_name};
        var obj = { device: this.plt.userAgent(), time: new Date().getTime(), lang: "fr", app_name: this.settings.app_name };
        this.userData.add(obj, "temp")
            .subscribe(function (temp_user) {
            Main.$$("Temp user created");
            vm.userData.setId(temp_user.id);
            vm.temp_user = temp_user;
            vm.events.publish("platform:ready");
        }, function (err) {
            setTimeout(function () {
                Main.$$("En attente de connexion");
                Main.toast(vm.toastCtrl, "En attente de connexion");
                vm.createTempUser();
                return;
            }, 5000);
        });
    };
    LoginPage.prototype.loginTest = function () {
        var _this = this;
        this.userData.login("hhoareau@gmail.com", "4271").subscribe(function (res) {
            _this.navCtrl.push(selevent_1.SeleventPage, { user: res });
        });
    };
    LoginPage.prototype.anonymousPrompt = function (flyer, autologin) {
        var _this = this;
        if (flyer === void 0) { flyer = ""; }
        if (autologin === void 0) { autologin = 0; }
        Maintools_1.openModal(this.modalCtrl, loginavatar_1.LoginavatarPage, { autologin: autologin, pseudo: true, flyer: flyer, message: "INFO.ANONYMOUSLIMIT" }, function (avatar) {
            if (avatar != null)
                _this.userData.add({ picture: avatar.picture, pseudo: avatar.pseudo, computer_id: "computer", lang: _this.plt.lang() }, "anonymous").subscribe(function (res) {
                    if (res)
                        _this.nextScreen(res);
                });
        });
    };
    LoginPage.prototype.openShifumixWebSite = function () {
        Maintools_1.openWindow("http://shifumix.com");
    };
    __decorate([
        core_1.ViewChild("container"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginPage.prototype, "container", void 0);
    LoginPage = __decorate([
        core_1.Component({
            selector: 'page-user',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\login\login.html"*/'<ion-content no-margin no-padding>\n  <div #container\n       style="position:absolute;top:0px;left:0px;opacity: 0.7;z-index:0;margin:0px;padding:0px;width:100%;height:100%">\n  </div>\n\n      <div *ngIf="backimage.length==0 && settings.ihm!=\'pro\'" class="logo" style="margin-top:20px;" >\n        <a href="shifumix.com">\n          <img [src]="settings.logo" style="width:60%" alt="Shifumix logo" >\n        </a>\n      </div>\n\n    <div *ngIf="temp_user==null" style="text-align: center;width:100%;background: none;" >\n      <img style="width:15%;margin-top:100px;" src="./assets/img/wait.gif"><br><br>\n      Connect to server ...\n      <br><br><br>\n      <tuto position="center" label="TIPS.LOGIN%%20"></tuto>\n    </div>\n\n    <div style="width:100%;text-align: center;" *ngIf="temp_user!=null">\n      <tuto position="center" [icon]="false" label="LOGIN.TUTO" help="connexion_shifumix"></tuto>\n      <h2>{{welcome_message | translate}}</h2>\n\n      <ion-buttons>\n        <button clear ion-button icon-only  id="btnGoogle" (click)="ServiceLogin(\'contact\')">\n          <img\n            title="Se connecter avec son compte Google"\n            src="./assets/img/google.png"\n            style="width:250px;height:52px;">\n        </button>\n\n\n        <div *ngIf="settings.ihm!=\'pro\'">\n          <br><br>\n          <button\n            ion-button icon-only clear\n            (click)="facebook_login()"\n            title="Se connecter avec son compte Facebook">\n            <br>\n            <img src="./assets/img/facebookLoginButton.png" style="width:248px;height:40px;">\n          </button>\n        </div>\n\n        <br><br>\n\n        <button id="btnLinkedin" ion-button clear icon-only (click)="ServiceLogin(\'linkedin\')">\n          <img\n            src="./assets/img/linkedin.png"\n            style="margin-top:5px;width:242px;height:40px"\n          >\n        </button>\n\n        <br><br>\n\n        <button id="btnShowEmailLogin"  clear (click)="showEmailLogin()" ion-button icon-only>\n          <img\n            width="243"\n            src="./assets/img/button_signin_email.svg"\n          >\n        </button>\n\n        <br><br>\n\n        <shifubutton\n          id="cmdAnonymousLogin"\n          *ngIf="allowAnonymous==true"\n          label="LOGIN.FASTAUTHENT"\n          size="235"\n          (click)="anonymousPrompt()">\n        </shifubutton>\n\n\n      </ion-buttons>\n      <!--<br><br><br>-->\n      <!--<shifubutton-->\n        <!--*ngIf="env==1"-->\n        <!--id="btnFacebookLogin"-->\n        <!--icon="ion-social-facebook"-->\n        <!--label="Facebook"-->\n        <!--size="120"-->\n        <!--(click)="ServiceLogin(\'facebook\')">-->\n      <!--</shifubutton><br>-->\n\n\n      <!--<shifubutton *ngIf="env==0"-->\n                   <!--id="btnFacebookLocalLogin"-->\n                   <!--label="Facebook local"-->\n                   <!--size="120"-->\n                   <!--(click)="ServiceLogin(\'fb_local\')">-->\n        <!--Facebook local-->\n      <!--</shifubutton>-->\n      <!--<br>-->\n\n        <!--<ion-row>-->\n          <!--<ion-col>-->\n            <!--<shifubutton-->\n              <!--icon="ion-music-note"-->\n              <!--size="120"-->\n              <!--label="Spotify"-->\n              <!--*ngIf="temp_user!=null"-->\n              <!--(click)="ServiceLogin(\'spotify\')">-->\n            <!--</shifubutton>-->\n          <!--</ion-col>-->\n\n          <!--<ion-col>-->\n            <!--<shifubutton-->\n              <!--size="120" style="margin:10px;"-->\n              <!--label="Deezer"-->\n              <!--icon="ion-music-note"-->\n              <!--*ngIf="env==1 && temp_user!=null"-->\n              <!--(click)="ServiceLogin(\'deezer\')">-->\n            <!--</shifubutton>-->\n\n            <!--<shifubutton-->\n              <!--size="120" style="margin:10px;"-->\n              <!--label="Deezer_loc"-->\n              <!--icon="ion-music-note"-->\n              <!--*ngIf="env==0 && temp_user!=null"-->\n              <!--(click)="ServiceLogin(\'deezer_local\')">-->\n            <!--</shifubutton>-->\n          <!--</ion-col>-->\n        <!--</ion-row>-->\n\n\n      <!--<shifubutton-->\n        <!--label="Instagram"-->\n        <!--size="120"-->\n        <!--icon="instagram"-->\n        <!--*ngIf="temp_user!=null"-->\n        <!--(click)="ServiceLogin(\'instagram\')">-->\n      <!--</shifubutton>-->\n      <!--<br>-->\n\n\n      <div *ngIf="version>1">\n        <shifubutton\n          label="Twitter local" size="120"\n          icon="ion-social-twitter"\n          size="120"\n          *ngIf="env==0"\n          (click)="ServiceLogin(\'twitter_local\')">\n        </shifubutton>\n        <br>\n\n        <shifubutton\n          label="Deezer"\n          size="120"\n          *ngIf="env==0.5"\n          (click)="ServiceLogin(\'deezer_preprod\')">\n          Deezer Preprod\n        </shifubutton>\n\n        <br><br>\n        <shifubutton\n          icon="ion-social-codepen"\n          *ngIf="version>1  && temp_user!=null"\n          label="Slack"\n          (click)="ServiceLogin(\'slack\')">\n        </shifubutton>\n        <br><br>\n      </div>\n\n      <shifubutton\n        label="GitHub"\n        style="width:150px"\n        *ngIf="version>1"\n        (click)="ServiceLogin(\'github\')">\n        Github\n      </shifubutton>\n\n      <span style="display:block;font-size:x-small;position:absolute;top:95%;left:5%"\n            (click)="openShifumixWebSite()">{{settings.app_name}}&nbsp;-&nbsp;{{settings.app_version}}\n      </span>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [ionic_angular_2.NavParams, api_1.ApiProvider, event_data_1.EventDataProvider,
            ionic_angular_2.NavController, user_data_1.UserData, storage_1.Storage,
            ionic_angular_1.LoadingController, settings_1.SettingsProvider,
            ionic_angular_1.Platform, core_2.TranslateService, ionic_angular_1.ModalController,
            ionic_angular_2.Events, ionic_angular_1.AlertController, ionic_angular_1.ToastController,
            ionic_angular_1.Platform])
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
//# sourceMappingURL=login.js.map

/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var geolocation_1 = __webpack_require__(231);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var addevent_1 = __webpack_require__(82);
var perso_1 = __webpack_require__(83);
var Tools = __webpack_require__(2);
var user_data_1 = __webpack_require__(8);
var storage_1 = __webpack_require__(42);
var platform_browser_1 = __webpack_require__(21);
var public_profil_1 = __webpack_require__(54);
var Maintools_1 = __webpack_require__(2);
var api_1 = __webpack_require__(16);
var invite_1 = __webpack_require__(46);
var core_2 = __webpack_require__(7);
/**
 * Generated class for the SeleventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SeleventPage = /** @class */ (function () {
    function SeleventPage(navCtrl, navParams, events, toastCtrl, alertCtrl, api, translate, storage, sanitizer, modalCtrl, loadingCtrl, userData, geolocation) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.api = api;
        this.translate = translate;
        this.storage = storage;
        this.sanitizer = sanitizer;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userData = userData;
        this.geolocation = geolocation;
        this.target = null;
        this.eventsonmap = [];
        this.markers = [];
        this.circles = [];
        this.event_code = null;
        this.preview = { title: "" };
        this.location = {};
        this.map = null;
        this.bestforme = [];
        this.handle = null;
        this.laCarte = null;
        this.handle2 = null;
        this.message = "";
        this.from = "";
        this.todo = null;
        this.lastrefresh = 0;
        this.dtCGU = 0;
        var vm = this;
        this.storage.get("todo").then(function (r) {
            vm.todo = r;
            _this.storage.get("location_lat").then(function (r) {
                vm.location.lat = r;
                _this.storage.get("location_lng").then(function (r) {
                    vm.location.lng = r;
                    _this.storage.get("location_zoom").then(function (r) {
                        vm.location.zoom = r;
                        _this.storage.get("message").then(function (r) {
                            vm.message = r;
                            _this.storage.get("from").then(function (r) {
                                vm.from = r;
                                _this.storage.remove("location_lat");
                                _this.storage.remove("location_lng");
                                _this.storage.remove("location_zoom");
                                _this.storage.remove("message");
                                _this.storage.remove("from");
                            });
                        });
                    });
                });
            });
        });
    }
    //Lancement au téléchargement
    SeleventPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var vm = this;
        //On vérifie qu'on ne doit pas se positionner directement sur une zone contenu dans une invitation
        if (vm.location.lat != undefined) {
            vm.initMap(Number(vm.location.lat), Number(vm.location.lng), Number(vm.location.zoom), function () {
                vm.initTarget();
                vm.location = {};
                vm.showEventsOnMap();
            });
        }
        else {
            setTimeout(function () {
                if (_this.userData.user.email != null && _this.userData.user.email.length > 0 && _this.userData.user.acceptLocalize) {
                    vm.localize(vm.geolocation).then(function (zoom) {
                        if (vm.todo == "survey")
                            vm.addEvent("survey");
                        Maintools_1.$$("Evaluation du zoom : " + zoom);
                        if (zoom > -1) {
                            vm.initMap(vm.userData.user.lat, vm.userData.user.lng, zoom, function () {
                                vm.initTarget();
                                vm.showEventsOnMap();
                            });
                        }
                        else
                            Tools.$$("Aucun événement proche, donc pas de carte");
                    }, function (err) {
                        vm.initMap(vm.userData.user.lat, vm.userData.user.lng, 8, function () {
                            vm.initTarget();
                            vm.showEventsOnMap();
                        });
                    });
                }
            }, 1000);
        }
    };
    SeleventPage.prototype.refreshPreview = function () {
        this.preview["address"] = this.preview["address"] + " ";
    };
    SeleventPage.prototype.inviteEvent = function (evt) {
        Maintools_1.openModal(this.modalCtrl, invite_1.InvitePage, { event: evt });
    };
    SeleventPage.prototype.initMap = function (lat, lng, zoom, func) {
        var vm = this;
        if (this.userData.user.email.length == 0) { //on rejete les utilisateurs anonymes
            func();
            return;
        }
        if (vm.map == null)
            vm.map = new google.maps.Map(vm.mapElement.nativeElement, { center: { lat: lat, lng: lng }, zoom: zoom });
        //Initialisation des événements de la carte
        vm.map.addListener("center_changed", function (evt) {
            vm.initTarget();
            setTimeout(function () { vm.showEventsOnMap(); }, 500);
        });
        vm.map.addListener("zoom_changed", function (evt) {
            vm.showEventsOnMap();
        });
        vm.map.setOptions({
            disableDefaultUI: true,
            rotateControl: false,
            clickableIcons: false
        });
        setTimeout(func, 500);
    };
    SeleventPage.prototype.initTarget = function (force, func) {
        if (force === void 0) { force = false; }
        if (func === void 0) { func = null; }
        var vm = this;
        if (vm.map != null) {
            var pos = vm.map.getCenter();
            if (vm.target != null && !force) {
                vm.target.setPosition(pos);
                if (func != null)
                    func();
            }
            else {
                setTimeout(function () {
                    vm.target = new google.maps.Marker({
                        user: vm.userData.user,
                        position: pos,
                        icon: "./assets/img/me.png",
                        name: "You",
                        draggable: true,
                        map: vm.map
                    });
                    if (func != null)
                        func();
                }, 500);
            }
        }
        else {
            Maintools_1.$$("La carte est null");
            if (func != null)
                func();
        }
    };
    SeleventPage.prototype.openTrajet = function (preview) {
        var mypos = this.userData.user.lat + "," + this.userData.user.lng;
        Maintools_1.openWindow("https://www.google.com/maps/dir/'" + mypos + "'/'" + preview.lat + "," + preview.lng + "'");
    };
    SeleventPage.prototype.showLaCarte = function (evt) {
        this.laCarte = evt.laCarte;
    };
    SeleventPage.prototype.logout_shifumix = function () {
        this.storage.remove("login");
        this.storage.remove("user");
        this.storage.remove("login_email");
        this.storage.remove("login_password");
        this.userData.logout();
        this.clearMap();
        this.navCtrl.pop();
    };
    ;
    SeleventPage.prototype.openprofil = function () {
        this.navCtrl.push(perso_1.PersoPage, { user: this.userData.user });
    };
    ;
    SeleventPage.prototype.calcZoom = function (lat, lng) {
        var _this = this;
        return new Promise(function (resolve) {
            var zoom;
            _this.api.closestevents(lat, lng).subscribe(function (events) {
                zoom = 18;
                if (events.items.length == 0)
                    zoom = -1;
                else {
                    var distanceMin = events.items[0].distanceInMeterFrom;
                    zoom = 8;
                    //TODO: calcul du zoom en fonction de la distance à refaire car ça n'est pas proportionnel
                    // if (distanceMin == 0)
                    //   zoom = 15;
                    // else
                    //   zoom = Math.round(700000 / distanceMin);
                    if (zoom < 3)
                        zoom = 3;
                    if (_this.userData.user.precision > 10000 && zoom < 8)
                        zoom = 8;
                    if (zoom > 40)
                        zoom = -1;
                }
                resolve(zoom);
            });
        });
    };
    SeleventPage.prototype.localize = function (geolocation) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, zoom, position, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Maintools_1.$$("Déclenchement de la localisation");
                        vm = this;
                        if (vm.userData.user.lat == undefined)
                            vm.userData.user.lat = 48;
                        if (vm.userData.user.lng == undefined)
                            vm.userData.user.lng = 2;
                        vm.userData.user.precision = 100000;
                        if (geolocation == null)
                            geolocation = navigator.geolocation;
                        if (!geolocation) return [3 /*break*/, 9];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 8]);
                        return [4 /*yield*/, geolocation.getCurrentPosition({
                                enableHighAccuracy: true,
                                timeout: 15 * 1000,
                                maximumAge: 60 * 60 * 1000
                            })];
                    case 2:
                        position = _a.sent();
                        Maintools_1.$$("Géolocalisation ok", position.coords);
                        vm.userData.user.lat = position.coords.latitude;
                        vm.userData.user.lng = position.coords.longitude;
                        vm.userData.user["dtLastPosition"] = position.timestamp;
                        vm.userData.user["precision"] = position.coords.accuracy;
                        return [4 /*yield*/, vm.calcZoom(position.coords.latitude, position.coords.longitude)];
                    case 3:
                        zoom = _a.sent();
                        if (zoom != -1)
                            zoom = 15;
                        return [3 /*break*/, 8];
                    case 4:
                        error_1 = _a.sent();
                        Maintools_1.$$("Probleme de géolocalisation", error_1);
                        if (!(error_1.code == 1)) return [3 /*break*/, 5];
                        Maintools_1.$$("L'utilisateur refuse de donner sa position");
                        this.confirmLocalize(false);
                        zoom = -1;
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, vm.calcZoom(vm.userData.user.lat, vm.userData.user.lng)];
                    case 6:
                        zoom = _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        Maintools_1.$$("Pas de géolocalisation disponible");
                        this.confirmLocalize(false);
                        return [4 /*yield*/, vm.calcZoom(vm.userData.user.lat, vm.userData.user.lng)];
                    case 10:
                        zoom = _a.sent();
                        _a.label = 11;
                    case 11: return [2 /*return*/, zoom];
                }
            });
        });
    };
    SeleventPage.prototype.onEnterCode = function (code) {
        var _this = this;
        if (code.value != "")
            this.userData.findeventbycode(code.value).subscribe(function (evt) {
                if (evt != null)
                    _this.joinEvent(evt, "code");
                else {
                    if (code.value != null && code.value.length > 0)
                        Maintools_1.toast(_this.toastCtrl, "OLDEVENTS.NOEVENTFORTHISCODE", _this.translate);
                }
            });
    };
    SeleventPage.prototype.joinEventByCode = function () {
        var _this = this;
        Maintools_1.showPopup({ title: "OLDEVENTS.EVENTCODETITLE", placeholder: "000000", confirmButton: "LIB.OK", cancelButton: "LIB.CANCEL", type: "number", translate: this.translate }, this.alertCtrl, function (res) {
            _this.onEnterCode({ value: res });
        });
    };
    SeleventPage.prototype.centerOnLocation = function () {
        var vm = this;
        //si la distance minimum  à l'evenement est elevée on désactive la localisation
        vm.localize(this.geolocation).then(function (zoom) {
            vm.map.setCenter({ lat: vm.userData.user.lat, lng: vm.userData.user.lng });
            if (vm.map.getZoom() != zoom)
                vm.map.setZoom(zoom);
        });
    };
    ;
    SeleventPage.prototype.openPublicProfil = function (id) {
        Tools.openModal(this.modalCtrl, public_profil_1.PublicProfilPage, { userid: id, follower: this.userData.user.id });
    };
    /**
     * permet de rejoindre un événement par le carte ou par code (type_invite)
     * @param evt
     * @param {string} type_invite
     * @returns {boolean}
     */
    SeleventPage.prototype.joinEvent = function (evt, type_invite) {
        var _this = this;
        if (type_invite === void 0) { type_invite = "map"; }
        if (evt == undefined)
            return false;
        if (evt.hasOwnProperty("password") && evt.password.length > 0 && evt.owner_id != this.userData.user.id)
            Tools.showPopup({
                title: "SELEVENT.PRIVATE",
                placeholder: "password",
                confirmButton: "LIB.OK",
                cancelButton: "LIB.CANCEL",
                type: "text", translate: this.translate
            }, this.alertCtrl, function (password) {
                _this.events.publish("event:login", { user: _this.userData.user, event: evt, password: password, type_invite: type_invite });
            });
        else
            this.events.publish("event:login", { user: this.userData.user, event: evt, type_invite: type_invite });
    };
    ;
    SeleventPage.prototype.clearMap = function () {
        var vm = this;
        if (vm.markers != undefined && vm.markers.length > 0) {
            vm.markers.forEach(function (marker) {
                marker.setMap(null);
            });
            vm.circles.forEach(function (circle) { circle.setMap(null); });
            vm.markers = [];
            vm.circles = [];
        }
    };
    ;
    SeleventPage.prototype.showEventsOnMap = function (pos, func) {
        var _this = this;
        if (pos === void 0) { pos = null; }
        if (func === void 0) { func = null; }
        var vm = this;
        if (vm.map != null && vm.map.getBounds() != undefined) {
            if (pos != null) {
                vm.map.setCenter(pos);
            }
            //Eviter les appels redondants
            var now = new Date().getTime();
            if (now - vm.lastrefresh < 3000)
                return;
            vm.lastrefresh = now;
            vm.urlInvitation = Tools.DOMAIN_APPLI + "/index.html?location_lat=" + vm.map.getCenter().lat() + "&location_lng=" + vm.map.getCenter().lng() + "&location_zoom=" + vm.map.getZoom();
            var p2 = vm.map.getBounds().getNorthEast();
            var p1 = vm.map.getBounds().getSouthWest();
            //On considere que l'utilisateur se déplace avec la carte
            this.userData.user.lat = vm.map.getCenter().lat();
            this.userData.user.lng = vm.map.getCenter().lng();
            this.userData.senduser("position").subscribe(function () { });
            this.api.loadinsquare(this.userData.user.id, p1.lat(), p1.lng(), p2.lat(), p2.lng()).subscribe(function (resp) {
                vm.clearMap();
                vm.eventsonmap = [];
                if (resp != null && resp.items != undefined) {
                    Tools.$$("ShowEventsOnMap:" + resp.items.length + " items");
                    resp.items.forEach(function (evt) {
                        //Pour chaque événement on calcul sa distance à l'utilisateur
                        if (vm.userData.user.lat != null && vm.userData.user.lat != undefined) {
                            evt["distance"] = 1000 * Tools.distance(vm.userData.user.lat, vm.userData.user.lng, evt.lat, evt.lng);
                        }
                        var icon = "./assets/img/party.png";
                        evt.delay = "";
                        if (evt.dtStart > new Date().getTime()) {
                            icon = "./assets/img/invitation.png";
                            evt.delay = Tools.getDelay(evt.dtStart, vm.userData.user.lang);
                        }
                        if (vm.markers == undefined)
                            vm.markers = [];
                        if (evt.visibleOnMap || evt.owner_id == vm.userData.user.id) {
                            //Positionnement de chaque événement
                            vm.markers.push(new google.maps.Marker({
                                position: { lat: evt.lat, lng: evt.lng },
                                user: vm.userData.user,
                                title: evt.title,
                                caption: evt.title,
                                evt: evt,
                                icon: icon,
                                map: vm.map,
                                id: evt.Id,
                                max_size: new google.maps.Size(30, 30)
                            }));
                            var size = 0;
                            if (evt.hasOwnProperty("presents"))
                                size = evt.presents.length;
                            if (size > 0)
                                vm.circles.push(new google.maps.Circle({
                                    center: { lat: evt.lat, lng: evt.lng },
                                    map: vm.map,
                                    strokeColor: '#FF0000',
                                    strokeOpacity: 0.1,
                                    fillColor: '#FF0000',
                                    fillOpacity: 0.1,
                                    radius: size * 10
                                }));
                            vm.markers[vm.markers.length - 1].addListener("dblclick", function () {
                                vm.joinEvent(this.evt, "map");
                            });
                            if (evt.password.length > 0)
                                evt.icon = "key";
                            else
                                evt.icon = "";
                            vm.eventsonmap.push(evt);
                        }
                    });
                }
                else {
                    vm.eventsonmap = [];
                }
            });
        }
        setTimeout(function () {
            _this.userData.bestEventsForMe().subscribe(function (bests) {
                vm.bestforme = [];
                if (bests != null) {
                    bests.items.forEach(function (it) {
                        var result = true;
                        vm.eventsonmap.forEach(function (e) {
                            if (result && e.id == it.id)
                                result = false;
                        });
                        if (result)
                            vm.bestforme.push(it);
                    });
                }
            });
        }, 2000);
        clearTimeout(this.handle);
        this.handle = setTimeout(function () {
            if (vm.navCtrl.getActive().name == "SeleventPage")
                vm.showEventsOnMap();
        }, 1000 * 60 * 15); //Refresh toutes les 30 secondes
        if (func != null)
            func();
    };
    ;
    SeleventPage.prototype.showEventForMe = function () {
        var vm = this;
        this.userData.bestEventsForMe().subscribe(function (r) {
            if (r != null && r.items.length > 0) {
                var zone_1 = new google.maps.LatLngBounds();
                //calcul du square pour representé les événements interessant
                if (r.items.length == 1) {
                    vm.map.setCenter({ lat: r.items[0].lat, lng: r.items[0].lng });
                }
                else {
                    r.items.forEach(function (item) {
                        zone_1.extend({ lat: item.lat, lng: item.lng });
                    });
                    vm.map.fitBounds(zone_1);
                    setTimeout(function () {
                        vm.showEventsOnMap();
                    }, 500);
                }
            }
        });
    };
    SeleventPage.prototype.zoomOut = function () {
        this.map.setZoom(this.map.getZoom() - 2);
    };
    /**
     * Ajoute un événement
     * @param {string} todo
     */
    SeleventPage.prototype.addEvent = function (todo) {
        var _this = this;
        if (todo === void 0) { todo = ""; }
        var vm = this;
        var pos = { lat: this.userData.user.lat, lng: this.userData.user.lng };
        var zoom = 8;
        if (this.userData.user.precision < 10000)
            zoom = 16; //Si la géolocalisation a fonctionnée
        if (this.map != null) {
            pos = { lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng() };
            zoom = this.map.getZoom();
        }
        Tools.openModal(this.modalCtrl, addevent_1.AddeventPage, {
            todo: todo,
            user: this.userData.user,
            precision: this.userData.user.precision,
            lat: pos.lat,
            lng: pos.lng,
            zoom: zoom
        }, function (evt) {
            //if(vm.todo!="survey")vm.ionViewWillEnter();
            if (evt != undefined) {
                if (vm.todo == "survey") {
                    vm.events.publish("event:login");
                    return;
                }
                else {
                    if (_this.userData.user.email.length == 0 || evt.visibleOnMap == false) {
                        _this.events.publish("oldevents:open");
                        //this.navCtrl.setRoot(OldeventsPage);
                    }
                    else {
                        zoom = 18;
                        vm.initMap(evt.lat, evt.lng, zoom, function () {
                            vm.initTarget(false, function () {
                                setTimeout(function () {
                                    vm.showEventsOnMap({ lat: evt.lat, lng: evt.lng }, function () {
                                    });
                                }, 1000);
                            });
                        });
                    }
                }
            }
        });
    };
    SeleventPage.prototype.showEvent = function (evt) {
        this.preview = evt;
    };
    SeleventPage.prototype.shareZone = function () {
        Maintools_1.openModal(this.modalCtrl, invite_1.InvitePage, { url: this.urlInvitation, from: this.userData.user, tab: "home" });
    };
    SeleventPage.prototype.centerOnEvent = function (lt, lg) {
        var _this = this;
        if (this.target == null)
            this.initTarget(false, function () {
                if (_this.target = null)
                    _this.target.setPosition({ lat: lt, lng: lg });
            });
    };
    SeleventPage.prototype.confirmLocalize = function (rep) {
        this.userData.user.acceptLocalize = rep;
        this.userData.senduser("acceptLocalize").subscribe(function () { });
        this.ionViewDidEnter();
    };
    __decorate([
        core_1.ViewChild('mapCanvas'),
        __metadata("design:type", core_1.ElementRef)
    ], SeleventPage.prototype, "mapElement", void 0);
    SeleventPage = __decorate([
        core_1.Component({
            selector: 'page-selevent',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\selevent\selevent.html"*/'<ion-header>\n\n  <shifutitle title="SELEVENT.TITLE" back="false">\n    <shifubutton size="110" [small]="true"\n                 *ngIf="eventsonmap.length+bestforme.length>0"\n                 tips="Rejoindre un événement en utilisant son code"\n                 id="btnByCode" label="OLDEVENTS.JOINBYCODE"\n                 icon="calculator" (click)="joinEventByCode()"></shifubutton>\n    <shifubutton\n      [small]="true"\n      label="LIB.EVENT"\n      tips="Créer votre propre événement"\n      id="btnAddEvent" shifuid="btnAddEvent"\n      icon="add-circle" (click)="addEvent()"></shifubutton>\n  </shifutitle>\n\n</ion-header>\n\n<ion-content no-padding>\n  <!--<tuto delay="40" position="title" -->\n  <!--show="btnByCode" -->\n  <!--[if]="userData.user.email==undefined || userData.user.email.length==0" -->\n  <!--label="SELEVENTS.TUTO_ANONYMOUS">-->\n  <!---->\n  <!--<shifubutton-->\n  <!--tips="Créer votre propre événement"-->\n  <!--shifuid="btnAddEvent" icon="add-circle"-->\n  <!--label="SELEVENT.CREATE" (click)="addEvent()">-->\n  <!--</shifubutton>-->\n\n  <!--</tuto>-->\n\n  <div class="item" style="text-align: center;">\n\n\n    <br>\n\n    <tuto position="title"\n          [if]="userData.user.email!=null && userData.user.email.length>0 && userData.user.acceptLocalize==null"\n          label="SELEVENT.ASKFORLOCALISATION">\n      <shifubutton id="btnConfirmYes" label="LIB.YES" (click)="confirmLocalize(true)"></shifubutton>&nbsp;\n      <shifubutton id="btnConfirmNo" label="LIB.NO" (click)="confirmLocalize(false)"></shifubutton>\n    </tuto>\n\n    <shifubutton\n      *ngIf="userData.user.acceptLocalize!=true && userData.user.email!=null && userData.user.email.length>0"\n      label="SELEVENT.ASKLOCALISE" id="cmdAskLocalize"\n      (click)="confirmLocalize(true)">\n    </shifubutton>\n\n    <div style="position:relative;width:100%;">\n      <div #mapCanvas [hidden]="map==null" id="map_canvas"></div>\n      <div *ngIf="map!=null">\n        <shifubutton [small]="true" id="btnLocalize" style="display: block;position: absolute;left: 20px;top: 5px;" icon="locate" (click)="centerOnLocation()"></shifubutton>\n        <shifubutton [small]="true" id="btnZoomOut" style="display: block;position: absolute;left: 20px;top: 35px;" icon="eye" (click)="showEventForMe()"></shifubutton>\n        <shifubutton\n          *ngIf="userData.user.connexions.length>10"\n          [small]="true" id="btnShare"\n          style="display: block;position: absolute;left: 20px;top: 65px;"\n          icon="person-add" ngxClipboard [cbContent]="urlInvitation" (click)="shareZone()"></shifubutton>\n      </div>\n    </div>\n\n\n\n    <!--<button id="btnZoomOff" style="display: block;position: absolute;left: 30px;top: 65px;" class="button button-small icon button-stable" (click)="zoomOff(-1)">-->\n    <!--<i class="ion-plus-circled"></i>-->\n    <!--</button>-->\n\n    <!--<button id="btnZoomOn" style="display: block;position: absolute;left: 60px;top: 65px;" class="button button-small icon button-stable" (click)="zoomOff(1)">-->\n    <!--<i class="ion-minus-circled"></i>-->\n    <!--</button>-->\n\n  </div>\n\n  <ion-item *ngIf="laCarte!=null">\n    <img src="{{laCarte}}" style="width:100%;max-width:600px;max-height:1000px;" (click)="laCarte=null">\n  </ion-item>\n\n  <!-- events on the map -->\n\n\n  <shifucard title="SELEVENT.EVENTS" [visible]="eventsonmap!=undefined && eventsonmap.length>0">\n    <tuto [if]="eventsonmap.length>0" label="SELEVENT.TUTO_EVENTSAVAILABLE"></tuto>\n    <span *ngIf="userData.user.acceptLocalize && map==null">\n        Aucun événement proche de vous pour l\'instant\n      </span>\n\n    <div *ngFor="let evt of eventsonmap" style="display:inline-block;width:42%;margin:8px;vertical-align: top;">\n      <shifuflyer shifuid="eventFlyer" [reverse]="true" [icon]="evt.icon" size="100%" flyer="{{evt.flyer}}" (onflip)="centerOnEvent(evt.lat,evt.lng)">\n        <div style="margin:5px;display:inline-block;vertical-align: middle; width:100%;text-align: center">\n          <br>\n          <shifubutton\n            shifuid="btnJoin" size="100"\n            [hidewhenclick]="true"\n            [small]="true" label="LIB.JOIN" (click)="joinEvent(evt,\'map\')"></shifubutton><br><br>\n\n          <shifubutton name="btnPubliProfil" *ngIf="evt.owner_id!=userData.user.id" [small]="true" icon="person" (click)="openPublicProfil(evt.owner_id)"></shifubutton>\n          <shifubutton shifuid="btnInvite" [small]="true" icon="person-add" (click)="inviteEvent(evt)"></shifubutton>\n\n          <span *ngIf="userData.user.connexions.length>5">\n              <shifubutton shifuid="openTrajet" *ngIf="evt.address!=null && evt.address.length>0" [small]="true" icon="navigate" (click)="openTrajet(evt)"></shifubutton>\n              <shifubutton shifuid="btnLaCarte" *ngIf="evt.laCarte!=undefined && evt.laCarte.length>0" [small]="true" icon="beer" (click)="showLaCarte(evt)"></shifubutton><br>\n            </span>\n\n          <span style="width:100%" *ngIf="evt.owner_id!=userData.user.id && userData.user.jetons!=undefined && userData.user.jetons[evt.owner_id]!=undefined && userData.user.jetons[evt.owner_id]>0">\n              <br>{{\'SELEVENT.JETONS\' | translate}}&nbsp;{{userData.user.jetons[evt.owner_id]}}&nbsp;<img src="./assets/img/money.png" style="width:15px;display:inline;">\n            </span>\n          <span *ngIf="evt.startJetons>0">+{{evt.startJetons}}<img src="./assets/img/money.png" style="width:15px;display:inline;"></span>\n\n          <span *ngIf="evt.opened"><br>{{\'LIB.ENDIN\' | translate}}<shifutimer [end]="evt.dtEnd"></shifutimer></span>\n          <span *ngIf="!evt.opened"><br>{{\'LIB.STARTIN\' | translate}}<shifutimer [end]="evt.dtStart"></shifutimer></span>\n        </div>\n      </shifuflyer>\n    </div>\n  </shifucard>\n\n  <shifucard title="SELEVENT.EVENTBYCODE" [visible]="eventsonmap.length+bestforme.length==0">\n    <ion-item text-center text-wrap>\n      Pour rejoindre un événement, saisissez son code<br>\n      <shifunumpad prefix="E-" (onenter)="onEnterCode($event)"></shifunumpad>\n      <br><br><br>\n      <tuto start="10" show="btnAddEvent" label="ou créez votre propre événement"></tuto>\n    </ion-item>\n  </shifucard>\n\n  <shifucard\n    *ngIf="bestforme.length>0 && userData.user.email!=undefined && userData.user.email.length>0"\n    id="BestForMe"\n    title="OLDEVENTS.BESTEVENTFORME"\n    tuto="OLDEVENTS.TUTO_BESTFORME">\n\n    <div *ngFor="let event of bestforme" style="position:relative;display:inline-block;width:150px;margin:5px;text-align: center;">\n      <div *ngIf="userData.user.jetons[event.owner_id]>0" style="font-size:large;">\n        {{userData.user.jetons[event.owner_id]}}<img src="./assets/img/money.png" class="small-money">\n      </div>\n\n      <shifuflyer shifuid="eventFlyer" style="marge:5px" [reverse]="true" [closed]="event.closed" [flyer]="event.flyer" size="100%">\n        <shifubutton\n          shifuid="btnJoin"\n          tips="Rejoindre un événement en utilisant le code a 6 chiffres de ce dernier"\n          [small]="true"\n          label="LIB.JOIN"\n          (click)="joinEvent(event)">\n        </shifubutton><br>\n        <br>\n        <br>{{event.address}}\n      </shifuflyer>\n    </div>\n  </shifucard>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\selevent\selevent.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.NavParams, ionic_angular_2.Events, ionic_angular_1.ToastController,
            ionic_angular_2.AlertController, api_1.ApiProvider, core_2.TranslateService,
            storage_1.Storage, platform_browser_1.DomSanitizer, ionic_angular_1.ModalController, ionic_angular_2.LoadingController,
            user_data_1.UserData, geolocation_1.Geolocation])
    ], SeleventPage);
    return SeleventPage;
}());
exports.SeleventPage = SeleventPage;
//# sourceMappingURL=selevent.js.map

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var Tools = __webpack_require__(2);
var htmleditor_1 = __webpack_require__(184);
var user_data_1 = __webpack_require__(8);
var platform_browser_1 = __webpack_require__(21);
var Maintools_1 = __webpack_require__(2);
var core_2 = __webpack_require__(7);
var event_data_1 = __webpack_require__(15);
var api_1 = __webpack_require__(16);
var WidgetPage = /** @class */ (function () {
    function WidgetPage(modalCtrl, userData, alertCtrl, eventData, viewCtrl, navCtrl, toastCtrl, events, api, navParams, domSanitizer, translate) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.userData = userData;
        this.alertCtrl = alertCtrl;
        this.eventData = eventData;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.api = api;
        this.navParams = navParams;
        this.domSanitizer = domSanitizer;
        this.translate = translate;
        this.hWndMusicPlayer = null;
        this.url = null;
        this.widgetPreview = null;
        this.widget = { qrcode: "", width: 400, height: 200, onlythisevent: true, _public: false, favorite: false, shorturl: "" };
        this.user = {};
        this.event = {};
        this.widget_link = "";
        this.newevent_link = "";
        this.screen_titles = "";
        this.screen_ids = "";
        this.widget = navParams.get("widget");
        this.widget.code = Tools.extract(this.widget.code, "<body>", "</body>");
        this.user = navParams.get("user");
        this.event = navParams.get("event");
        this.widget.favorite = Tools.isFavorite(this.user, this.widget);
        this.widget.onlythisevent = true;
        if (this.userData.user.currentEvent != undefined && this.userData.user.currentEvent.length > 0 && this.navParams.get("preview")) {
            var sep = "?";
            if (this.widget.long_url.indexOf("?") > 0)
                sep = "&";
            this.widgetPreview = this.domSanitizer.bypassSecurityTrustResourceUrl(this.widget.long_url + sep + "event=" + this.userData.user.currentEvent);
            setTimeout(function () { _this.widget.preview = "ok"; }, 5000);
        }
        //dest=PhotoPage&flyer=https://www.rapid-cadeau.com/9229-large_default/cube-photos-rotatif.jpg&activities=photo,message&widget=photocube
        var duration = Math.round((this.eventData.event.dtEnd - this.eventData.event.dtStart) / (3600 * 1000));
        var url = Maintools_1.DOMAIN_SERVER + "/createeventandrunwidget.html" +
            "?duration=" + duration +
            "&autologin=" + this.eventData.event.autologin +
            "&lat=" + this.eventData.event.lat + "&lng=" + this.eventData.event.lng +
            "&title=" + encodeURI(this.eventData.event.title) +
            "&widget=" + this.widget.name +
            "&public=" + this.eventData.event.visibleOnMap +
            "&activities=" + this.eventData.event.activities +
            "&flyer=" + this.eventData.event.templateFlyer;
        //this.newevent_link=url;
        this.api.urlshortener(url).subscribe(function (r) {
            _this.newevent_link = r.url;
        });
        if (this.eventData.event.id == null) {
            this.widget_link = Maintools_1.DOMAIN_SERVER + "/widgets/freeScreen.html?widget=" + this.widget.name + "&user=" + this.userData.user.id + "&sc=" + this.userData.user.secretCode;
        }
        else {
            this.widget_link = Maintools_1.DOMAIN_SERVER + "/widgets/freeScreen.html?widget=" + this.widget.name + "&event=" + this.eventData.event.id + "&user=" + this.userData.user.id + "&sc=" + this.userData.user.secretCode;
        }
        this.userData.get().subscribe(function (rep) {
            _this.userData.user = rep;
            for (var p in _this.userData.user.screens) {
                _this.screen_ids = _this.userData.user.screens[p].id + ",";
                _this.screen_titles += _this.userData.user.screens[p].title + ",";
            }
        });
    }
    WidgetPage.prototype.ionViewDidLoad = function () {
    };
    WidgetPage.prototype.editHTML = function () {
        var vm = this;
        if (this.widget.owner == this.userData.user.id)
            Tools.openModal(this.modalCtrl, htmleditor_1.HtmleditorPage, { user: this.userData.user.id, widget: this.widget, mode: "edit" }, function (resp) {
                if (resp != null) {
                    vm.widget = resp.widget;
                    vm.saveWidget();
                }
            });
        else
            this.clone();
    };
    WidgetPage.prototype.clone = function () {
        this.widget.title = this.widget.title + "_copy";
        this.widget.parentid = this.widget.id;
        this.widget.id = "";
        this.widget.owner = this.userData.user.id;
        this.widget.description = "";
        this.widget.score = 0;
        var vm = this;
        Tools.openModal(this.modalCtrl, htmleditor_1.HtmleditorPage, { user: this.userData.user.id, widget: this.widget, mode: "edit" }, function (resp) {
            if (resp != undefined) {
                vm.widget = resp.widget;
                vm.saveWidget();
            }
            else
                vm.viewCtrl.dismiss();
        });
    };
    WidgetPage.prototype.delWidget = function () {
        var _this = this;
        this.userData.delwidget(this.widget.id).subscribe(function (resp) {
            _this.viewCtrl.dismiss();
        });
    };
    WidgetPage.prototype.widgetPerso = function () {
        // this.userData.sendwidgetbymail(this.widget.widget).subscribe(()=> {
        //   Tools.toast(this.toastCtrl,"WIDGET.CHECKYOUREMAIL");
        // });
    };
    WidgetPage.prototype.changeFavorite = function () {
        // if(this.widget.favorite)
        //   this.userData.addtofavoritewidget(this.widget.id).subscribe((res) => {this.user=res;});
        // else
        //   this.userData.delfavoritewidget(this.widget.id).subscribe((res) => {
        //     this.user=res;
        //   });
    };
    WidgetPage.prototype.changePublic = function () {
        this.userData.sendwidget(this.widget).subscribe(function () { });
    };
    WidgetPage.prototype.saveWidget = function () {
        var vm = this;
        vm.userData.sendwidget(this.widget).subscribe(function (r) {
            vm.viewCtrl.dismiss({ refresh: true });
        });
    };
    WidgetPage.prototype.openLink = function () {
        if (this.eventData.event == undefined || this.eventData.event.owner_id != this.userData.user.id)
            Maintools_1.toast(this.toastCtrl, "WIDGET.WARNINGNOACTIFEVENT", this.translate);
        if (this.widget.state != "" && this.widget.state != undefined) {
            //$state.go(url.state);
        }
        else {
            var h = window.screen.availHeight;
            var w = window.screen.availWidth;
            // if(this.widget.long_url.indexOf("MusicPlayer")>0){
            //   this.hWndMusicPlayer=Tools.openMusicPlayer(this.event,this.event.secretCode,this.userData.user.lang);
            // }else{
            var handle = window.open(this.widget.url, "_blank", "titlebar=no,status=no,menubar=no,height=" + h + ",width=" + w);
            // }
        }
        this.viewCtrl.dismiss({ refresh: true });
    };
    ;
    WidgetPage.prototype.enterScreenCode = function () {
        var _this = this;
        Maintools_1.askforaddscreen(this, this.widget.name, function (res, widget) {
            _this.userData.user.code = res;
            _this.userData.user.widgetToAdd = widget;
            _this.userData.senduser("code,widgetToAdd").subscribe(function () {
                _this.viewCtrl.dismiss({ refresh: false });
            });
        });
    };
    WidgetPage.prototype.setOnScreen = function (screens) {
        var _this = this;
        this.userData.setwidgetonscreen(screens.value, this.widget.id).subscribe(function () {
            _this.viewCtrl.dismiss({ refresh: false });
        });
    };
    WidgetPage.prototype.confirmCopy = function () {
        Maintools_1.toast(this.toastCtrl, 'WIDGET.URLINCLIPBOARD', this.translate);
    };
    WidgetPage.prototype.showScreen = function () {
        for (var k in this.userData.user.screens) {
            var s = this.userData.user.screens[k];
            s.title = s.title + " ";
            this.userData.updatescreen(s).subscribe(function (r) { });
        }
    };
    WidgetPage = __decorate([
        core_1.Component({
            selector: 'page-widget',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\widget\widget.html"*/'\n<ion-header>\n  <shifutitle [back]="true" title="iWall">\n    <shifubutton icon="checkmark" (click)="saveWidget()"></shifubutton>\n    <shifubutton icon="close" (click)="viewCtrl.dismiss({refresh:false})"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n<ion-content padding>\n  <tuto label="WIDGET.TUTO"></tuto>\n  <div class="item" style="width:100%;text-align: center;">\n    <span style="font-size: xx-large">{{widget.title}}</span><br>\n    <label style="font-size: small">{{widget.description | translate}}</label><br><br>\n    <!--<label style="font-size: x-small">{{widget.name}}</label><br><br>-->\n\n    <div *ngIf="widget.preview==\'ok\'" style="position:relative;width:100%;overflow:scroll !important;-webkit-overflow-scrolling:touch !important">\n      <iframe style="width:100%;height:250px;" [src]="widgetPreview" scrolling="yes" >\n      </iframe>\n      <div style="position:absolute;left:3px;top:3px;color: grey;">Preview</div>\n    </div>\n\n    <div *ngIf="widget.preview.indexOf(\'http\')==0" style="position:relative;width:100%;height:300px;">\n      <img style="width:100%" src="{{widget.preview}}">\n    </div>\n\n  </div>\n  <br>\n\n  <ion-item no-lines no-border *ngIf="screen_ids!=null && screen_ids.length>0">\n    <ion-label text-wrap>{{\'WIDGET.VIEWONFIRSTSCREEN\' | translate}}</ion-label>\n    <shifubutton item-end id="btnShowScreen" icon="eye" (click)="showScreen()"></shifubutton>\n  </ion-item>\n  <ion-item no-lines no-border *ngIf="screen_ids!=null && screen_ids.length>0">\n    <shifubuttongroup\n      size="80"\n      id="screen_list"\n      [labels]="screen_titles"\n      [values]="screen_ids"\n      (onchange)="setOnScreen($event)">\n    </shifubuttongroup>\n  </ion-item>\n\n\n  <ion-item no-lines no-border>\n    <ion-label text-wrap>{{\'WIDGET.OPENONTHISSCREEN\' | translate}}</ion-label>\n    <shifubutton item-end id="btnOpen" icon="open" (click)="openLink()"></shifubutton>\n  </ion-item>\n\n  <ion-item no-lines no-border>\n    <ion-label text-wrap>{{\'WIDGET.VIEWONSCREEN\' | translate}}</ion-label>\n    <shifubutton item-end icon="open" (click)="enterScreenCode()"></shifubutton>\n  </ion-item>\n\n  <ion-item no-lines no-border>\n    <ion-label text-wrap>{{\'WIDGET.WIDGETLINK\' | translate}}</ion-label>\n    <shifubutton item-end icon="open" ngxClipboard [cbContent]="widget_link" (click)="confirmCopy()"></shifubutton>\n  </ion-item>\n\n\n  <ion-item *ngIf="userData.user.connexions.length>10" no-lines no-border text-center>\n    {{\'WIDGET.VIEWONPHONE\' | translate}}<br>\n    <img\n      [hidden]="widget.qrcode.length==0"\n      src="{{widget.qrcode}}"\n      style="width:150px;height:150px"\n      ngxClipboard [cbContent]="widget.url"\n    >\n  </ion-item>\n\n  <br>\n\n  <shifucard [visible]="userData.user.connexions.length>40" title="ADDEVENT.ADVANCED">\n\n    <ion-item text-center no-border no-line *ngIf="userData.user.email.length>0">\n      <shifubutton [small]="true" id="btnEdit" margin="10" size="100" icon="build" label="LIB.EDIT" (click)="editHTML()"></shifubutton>\n    </ion-item>\n\n\n    <div *ngIf="widget.owner==userData.user.id">\n      <ion-item text-center>\n        <shifubutton size="100" icon="trash" label="LIB.DELETE" (click)="delWidget()"></shifubutton>\n        <shifubutton size="100" icon="copy" label="WIDGET.CLONE" (click)="clone()"></shifubutton>\n      </ion-item>\n\n      <shifucheckbox id="favorite" [(ngModel)]="widget.favorite" label="WIDGET.FAVORITE"></shifucheckbox>\n      <!-- un utilisateur gratuit ne peut pas mettre son widget en ligne -->\n      <shifucheckbox id="public" *ngIf="userData.user.tarif.tarif!=0" [(ngModel)]="widget._public" label="WIDGET.PUBLIC"></shifucheckbox>\n    </div>\n\n\n    <shifucheckbox\n      tips="Le widget adopte le style du conteneur"\n      help="inherit_contener_style"\n      id="parenstyle"\n      [(ngModel)]="widget.parentstyle"\n      label="WIDGET.PARENTSTYLE">\n    </shifucheckbox>\n    <!--<shifucheckbox id="onlythisevent" [(ngModel)]="widget.onlythisevent" label="WIDGET.ONLYFORTHISEVENT"></shifucheckbox>-->\n\n    <ion-item no-lines align-items-center>\n      <shifubutton [small]="true" icon="link" label="WIDGET.NEWEVENT" ngxClipboard [cbContent]="newevent_link" (click)="confirmCopy()"></shifubutton>\n    </ion-item>\n  </shifucard>\n\n  <!--<div class="card" *ngIf="userData.user.connexions>5">-->\n    <!--<div class="item item-divider">-->\n      <!--{{\'WIDGET.IFRAME\' | translate }}-->\n    <!--</div>-->\n    <!--&lt;!&ndash;<div class="item">&ndash;&gt;-->\n      <!--<ion-toggle id="inpourcent" [(ngModel)]="widget.inpourcent" toggle-class="toggle-calm">{{\'WIDGET.INPOURCENT\' | translate}}</ion-toggle>-->\n\n      <!--<div class="item range">-->\n        <!--<span class="input-label">{{"LIB.WIDTH" | translate}}-->\n          <!--<span [hidden]="widget.inpourcent">{{widget.width*10}}px</span>-->\n          <!--<span *ngIf="widget.inpourcent">{{widget.width}}%</span>-->\n        <!--</span>-->\n        <!--<input id="width" type="range" [(ngModel)]="widget.width" min="0" max="100" step="10">-->\n      <!--</div>-->\n\n      <!--<shifurange label="LIB.HEIGHT" min="0" max="600" step="10" [(ngModel)]="widget.height"></shifurange>-->\n\n      <!--<br>-->\n      <!--<div style="width:100%;text-align: center;">-->\n        <!--<button-->\n          <!--class="button button-positive icon-left ion-social-wordpress"-->\n          <!--style="width:150px"-->\n          <!--*ngIf="version>1"-->\n          <!--(click)="create_iframe(\'wordpress\')">-->\n          <!--Wordpress-->\n        <!--</button>-->\n        <!--&nbsp;-->\n        <!--<button-->\n          <!--class="button button-positive icon-left ion-ios-box"-->\n          <!--style="width:150px"-->\n          <!--*ngIf="version>1"-->\n          <!--(click)="create_iframe(\'wix\')">-->\n          <!--Wix-->\n        <!--</button>-->\n        <!--<shifubutton-->\n          <!--icon="ion-ios-box"-->\n          <!--width="150"-->\n          <!--label="Iframe"-->\n          <!--(click)="create_iframe(\'html\')">-->\n        <!--</shifubutton>-->\n\n      <!--</div>-->\n    <!--</div>-->\n  <!--</div>-->\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\widget\widget.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_2.ModalController, user_data_1.UserData, ionic_angular_2.AlertController, event_data_1.EventDataProvider,
            ionic_angular_1.ViewController, ionic_angular_1.NavController, ionic_angular_1.ToastController, ionic_angular_1.Events, api_1.ApiProvider,
            ionic_angular_1.NavParams, platform_browser_1.DomSanitizer, core_2.TranslateService])
    ], WidgetPage);
    return WidgetPage;
}());
exports.WidgetPage = WidgetPage;
//# sourceMappingURL=widget.js.map

/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var Tools = __webpack_require__(2);
var api_1 = __webpack_require__(16);
var Maintools_1 = __webpack_require__(2);
var image_creator_1 = __webpack_require__(38);
var core_2 = __webpack_require__(7);
var HtmleditorPage = /** @class */ (function () {
    function HtmleditorPage(modalCtrl, api, translate, navCtrl, navParams, viewCtrl, alertCtrl) {
        this.modalCtrl = modalCtrl;
        this.api = api;
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.widget = {};
        this.code = "";
        this.categories = "";
        this.widget = navParams.get("widget");
        var vm = this;
        var id = vm.widget.id;
        if (id == "")
            id = vm.widget.parentid;
        this.categories = this.translate.instant("WIDGET.CATEGORIES");
        if (this.widget.code.indexOf("<body>") > 0)
            this.code = Tools.extract(this.widget.code, "<body>", "</body>");
        else
            this.code = this.widget.code;
    }
    HtmleditorPage.prototype.saveWidget = function () {
        if (this.code.indexOf("<body>") > -1)
            this.code = Tools.extract(this.code, "<body>", "</body>");
        this.widget.code = this.code;
        if (this.widget.id == "")
            this.widget.id = "widget" + new Date().getTime();
        this.viewCtrl.dismiss({ widget: this.widget });
    };
    ;
    HtmleditorPage.prototype.quit = function () {
        var _this = this;
        Maintools_1.showConfirm("LIB.CANCELMODIF", this.alertCtrl, this.translate, function () { return _this.viewCtrl.dismiss(); });
    };
    HtmleditorPage.prototype.updateWidgetPicture = function () {
        var vm = this;
        Maintools_1.openModal(this.modalCtrl, image_creator_1.ImageCreatorPage, {}, function (resp) {
            if (resp != null)
                vm.widget.picture = resp.value;
        });
    };
    HtmleditorPage.prototype.updateAct = function (f) {
        this.widget.activity = f.value;
    };
    HtmleditorPage = __decorate([
        core_1.Component({
            selector: 'page-htmleditor',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\htmleditor\htmleditor.html"*/'<!--\n  Generated template for the HtmleditorPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle title="HTMLEDITOR.TITLE" help="iwall_builder">\n    <shifubutton id="btnSaveWidgetCode" icon="checkmark" label="LIB.SAVE" (click)="saveWidget()"></shifubutton>\n    <shifubutton id="btnClose" icon="close" (click)="quit()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n<ion-content padding>\n  <tuto label="HTMLEDITOR.TUTO"></tuto>\n\n\n  <ion-row no-padding>\n    <ion-col col-2>\n      <div style="position:relative">\n        <img style="margin:5px;" id="selfile" src="{{widget.picture}}" >\n        <shifubutton [small]="true" icon="build" (click)="updateWidgetPicture()" style="position:absolute;left:35%;top:35%"></shifubutton>\n      </div>\n    </ion-col>\n    <ion-col text-right>\n      <shifuinput [(ngModel)]="widget.title" label="LIB.TITLE" focus></shifuinput>\n    </ion-col>\n  </ion-row>\n\n  <shifuinput id="txtDescription" [(ngModel)]="widget.description" label="WIDGET.DESCRIPTION"></shifuinput><br>\n\n  {{\'LIB.CATEGORY\' | translate}}:\n  <ion-item text-center no-border no-lines text-wrap>\n    <shifubuttongroup labels="{{categories}}" values="music,photo,message,bet,survey,loterie,command,others" default="{{widget.category}}" (onchange)="updateAct($event)"></shifubuttongroup>\n  </ion-item>\n\n\n  <shifucard [visible]="true" title="HTMLEDITOR.WIDGETCODE">\n    <div ace-editor\n         [theme]="\'clouds\'"\n         [mode]="\'html\'"\n         [(text)]="code" style="min-height: 200px; width:100%; overflow: auto;">\n    </div>\n  </shifucard>\n  <br>\n  <!--<div style="width:100%;text-align: center">-->\n    <!--<shifubutton label="HTMLEDITOR.SENDBYEMAIL" icon="ion-email" (click)="sendByEmail()"></shifubutton>&nbsp;-->\n    <!--<shifubutton label="LIB.PREVIEW" (click)="preview()"></shifubutton>-->\n  <!--</div>-->\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\htmleditor\htmleditor.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.ModalController, api_1.ApiProvider, core_2.TranslateService,
            ionic_angular_1.NavController, ionic_angular_1.NavParams,
            ionic_angular_1.ViewController, ionic_angular_1.AlertController])
    ], HtmleditorPage);
    return HtmleditorPage;
}());
exports.HtmleditorPage = HtmleditorPage;
//# sourceMappingURL=htmleditor.js.map

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var user_data_1 = __webpack_require__(8);
var ionic_angular_3 = __webpack_require__(3);
var Tools = __webpack_require__(2);
var core_2 = __webpack_require__(7);
var widgetstore_1 = __webpack_require__(106);
var Maintools_1 = __webpack_require__(2);
var event_data_1 = __webpack_require__(15);
/**
 * Generated class for the ScreensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ScreensPage = /** @class */ (function () {
    function ScreensPage(events, navCtrl, loadingCtrl, navParams, userData, eventData, modalCtrl, toastCtrl, alertCtrl, translate) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.eventData = eventData;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.screens = [];
        this.handle = null;
        this.showAddEvent = false;
        this.l = null;
    }
    ScreensPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var vm = this;
        this.events.subscribe("screen", function () { _this.refresh(); });
        this.events.subscribe("user", function () { _this.refresh(); });
        //this.handle = setInterval(function () {vm.refresh();}, 10000);
        if (this.navParams.get("code") != null) {
            vm.searchScreen(this.navParams.get("code"), this.navParams.get("widget"), function () {
                setTimeout(function () {
                    if (vm.eventData.event.id == undefined) {
                        Maintools_1.$$("Demande de connexion par l'écran screen");
                        vm.events.publish("user:login", _this.userData.user);
                    }
                }, 1000);
            });
        }
        if (this.navParams.get("widget") != null) {
            Tools.showPopup({
                subtitle: "S-######",
                placeholder: "######",
                title: "PROFIL.ENTERCODE",
                confirmButton: "LIB.OK",
                cancelButton: "LIB.CANCEL",
                type: "number",
                translate: this.translate
            }, this.alertCtrl, function (res) {
                if (res != null) {
                    _this.searchScreen(res, _this.navParams.get("widget"));
                }
            });
        }
        this.refresh();
    };
    ScreensPage.prototype.ionViewWillLeave = function () {
        clearInterval(this.handle);
    };
    ScreensPage.prototype.searchScreen = function (code, widget, func) {
        if (widget === void 0) { widget = ""; }
        if (func === void 0) { func = null; }
        var vm = this;
        vm.userData.user.code = code;
        vm.userData.user.widgetToAdd = widget;
        var l = Maintools_1.loading(this);
        vm.userData.senduser("code,widgetToAdd").subscribe(function () {
            l.dismiss();
            //TODO: code à optimiser pour avoir un traitement synchrone (voir la fonction addwidgettoscreen
            setTimeout(function () { vm.refresh(); if (func != null)
                func(); }, 3000);
            setTimeout(function () { vm.refresh(); }, 8000);
        });
    };
    ScreensPage.prototype.addscreen = function (code, widget) {
        var _this = this;
        if (widget === void 0) { widget = null; }
        if (this.userData.user.tarif.max_openscreen <= this.screens.length)
            Maintools_1.toast(this.toastCtrl, "SCREEN.ERROR_MAXSCREEN", this.translate);
        else {
            if (code.value == "") {
                Maintools_1.askforaddscreen(this, widget, function (res, widget) { _this.searchScreen(res, widget); });
            }
            else {
                this.searchScreen(code.value, widget);
            }
        }
    };
    /**
     *
     * @param screen
     */
    ScreensPage.prototype.changeWidget = function (screen) {
        var _this = this;
        var vm = this;
        Tools.openModal(this.modalCtrl, widgetstore_1.WidgetstorePage, { screen: screen.id, message: "SCREEN.CHOOSEWIDGET" }, function (widget) {
            if (widget != null) {
                vm.userData.setwidgetonscreen(screen.id, widget.id).subscribe(function (res) {
                    if (_this.eventData.event.id == null)
                        setTimeout(function () { _this.refresh(); }, 1500);
                });
            }
        });
    };
    ScreensPage.prototype.refresh = function () {
        var _this = this;
        Maintools_1.$$("Rafraichissement des écrans");
        var vm = this;
        this.userData.get().subscribe(function (r) {
            if (r != null)
                _this.userData.user = r;
            vm.screens = [];
            if (vm.userData.user.hasOwnProperty("screens"))
                for (var key in vm.userData.user.screens) {
                    var obj = vm.userData.user.screens[key];
                    obj.widget = obj.id;
                    obj.id = key;
                    if (!vm.navParams.hasOwnProperty("event") || obj.idEvent == vm.navParams.get("event")) {
                        vm.screens.push(obj);
                        if (vm.userData == undefined || vm.userData.user == undefined || vm.userData.user.currentEvent == null)
                            vm.showAddEvent = true;
                    }
                }
        });
    };
    ScreensPage.prototype.editScreen = function (screen) {
        var index = this.screens.indexOf(screen);
        var vm = this;
        Maintools_1.showPopup({
            title: "SCREEN.NAMEFORSCREEN",
            confirmButton: "LIB.OK",
            cancelButton: "LIB.CANCEL",
            default: screen.title,
            type: "text",
            translate: this.translate
        }, this.alertCtrl, function (res) {
            vm.screens[index].title = res;
            vm.userData.updatescreen(vm.screens[index]).subscribe(function (r) { });
        });
    };
    ScreensPage.prototype.deleteScreen = function (screen) {
        var vm = this;
        this.userData.deleteScreen(screen.id).subscribe(function (resp) {
            vm.refresh();
        });
    };
    ScreensPage.prototype.viewScreen = function (screen) {
        screen.title = screen.title + " "; //Permet de forcer l'affichage du nom
        this.userData.updatescreen(screen).subscribe(function (r) { });
    };
    ScreensPage.prototype.openFreeScreen = function () {
        var _this = this;
        var code = "" + (Maintools_1.tirage(900000) + 100000);
        Maintools_1.openWindow(Maintools_1.DOMAIN_SERVER + "/widgets/freeScreen.html?code=" + code);
        setTimeout(function () {
            _this.searchScreen(code);
        }, 5000);
    };
    ScreensPage = __decorate([
        core_1.Component({
            selector: 'page-screens',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\screens\screens.html"*/'<!--\n  Generated template for the ScreensPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle [back]="true" title="LIB.SCREENS"  help="#">\n    <shifubutton [small]="true" id="btnNewScreen" icon="desktop" (click)="openFreeScreen()"></shifubutton>\n    <shifubutton [small]="true" id="btnAddScreen" icon="add-circle" label="LIB.SCREEN" (click)="addscreen({value:\'\'})"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n<ion-content no-padding no-line>\n  <!--<tuto [if]="screens.length>0" label="SCREEN.TUTO"></tuto>-->\n  <tuto [if]="screens!=undefined && screens.length==0"\n        label="SCREEN.TUTOADDSCREEN">\n  </tuto>\n\n  <tuto [if]="screens!=undefined && screens.length==0" start="10"\n        label="Vous pouvez aussi ouvrir un écran partagé sur ce device" show="btnNewScreen">\n  </tuto>\n\n  <tuto [if]="screens.length>0" start="20"\n        label="pour chaque écran vous pouvez modifier l\'iWall, changer le nom, le supprimer ... etc ..."\n        show="btnNewScreen">\n  </tuto>\n\n  <ion-grid>\n  <ion-row *ngFor="let screen of screens">\n    <ion-col>{{screen.title}}<br>\n      <span style="font-size: small">{{screen.description}}</span>\n    </ion-col>\n\n    <ion-col col-auto text-right>\n      <shifubutton name="btnChangeWidget" [small]="true" icon="build" tips="iWall" (click)="changeWidget(screen)"></shifubutton>\n      <shifubutton name="btnDeleteWidget" [small]="true" icon="trash" tips="Trash" (click)="deleteScreen(screen)"></shifubutton>\n      <shifubutton name="btnEditWidget"   [small]="true" icon="create" tips="Edit" (click)="editScreen(screen)"></shifubutton>\n      <shifubutton name="btnViewWidget"   [small]="true" icon="eye" tips="Show" (click)="viewScreen(screen)"></shifubutton>\n    </ion-col>\n  </ion-row>\n  </ion-grid>\n\n\n  <ion-item text-center no-lines>\n    <shifunumpad prefix="S-" (onenter)="addscreen($event)"></shifunumpad>\n  </ion-item>\n\n\n  <tuto [if]="showAddEvent" label="SCREEN.TUTOADDEVENT">\n    <shifubutton label="LIB.CREATEEVENT" icon="add-circle" (click)="events.publish(\'event:add\')"></shifubutton>\n  </tuto>\n\n\n  <!--<ion-item no-border *ngIf="searching">-->\n    <!--{{\'SCREENS.WAITING\' | translate}}&nbsp;<img src="./assets/img/wait.gif" style="width:30px">-->\n  <!--</ion-item>-->\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\screens\screens.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_2.Events, ionic_angular_1.NavController, ionic_angular_2.LoadingController,
            ionic_angular_1.NavParams, user_data_1.UserData, event_data_1.EventDataProvider,
            ionic_angular_1.ModalController, ionic_angular_1.ToastController,
            ionic_angular_3.AlertController, core_2.TranslateService])
    ], ScreensPage);
    return ScreensPage;
}());
exports.ScreensPage = ScreensPage;
//# sourceMappingURL=screens.js.map

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var user_data_1 = __webpack_require__(8);
var Main = __webpack_require__(2);
var core_2 = __webpack_require__(7);
var Maintools_1 = __webpack_require__(2);
var settings_1 = __webpack_require__(23);
/**
 * Generated class for the LoginemailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginemailPage = /** @class */ (function () {
    function LoginemailPage(navCtrl, navParams, alertCtrl, userData, viewCtrl, settings, toastCtrl, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.userData = userData;
        this.viewCtrl = viewCtrl;
        this.settings = settings;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.showpassword = false;
        this.password_ressended = false;
        this.login_user = { email: "", pseudo: "", password: "", lang: "en" };
    }
    LoginemailPage.prototype.ionViewDidLoad = function () {
        this.login_user.lang = navigator.language;
        if (this.settings.login_email.length > 0) {
            this.login_user.email = this.settings.login_email;
            this.email_login(13);
            this.settings.login_email = "";
        }
    };
    LoginemailPage.prototype.add = function (emailserver) {
        this.login_user.email = this.login_user.email + emailserver;
        this.email_login(13);
    };
    LoginemailPage.prototype.email_login = function (keycode) {
        var _this = this;
        if (keycode != 13)
            return;
        var vm = this;
        if (vm.login_user.email.indexOf("@") == -1)
            vm.login_user.email += "@gmail.com";
        this.userData.getuserbyemail(vm.login_user.email).subscribe(function (resp) {
            if (resp == null) { //Le compte n'est pas encore créé
                var pseudo = _this.navParams.get("pseudo");
                if (pseudo == null)
                    pseudo = vm.login_user.email.split("@")[0];
                if (pseudo.indexOf(".") > -1)
                    pseudo = pseudo.split(".")[0];
                // Main.showPopup({
                //   title: "LOGIN.PSEUDO",
                //   default: pseudo,
                //   confirmButton: "LIB.OK",
                //   cancelButton: "LIB.CANCEL",
                //   type: "text",translate:vm.translate
                // }, this.alertCtrl, function (pseudo) {
                //   vm.showpassword=true;
                //   if(vm.navParams.get("from")=="PersoPage"){
                //     vm.userData.user.firstname=pseudo;
                //     vm.userData.senduser("firstname").subscribe(()=>{});
                //   } else {
                var id = null;
                if (vm.userData.user != null)
                    id = vm.userData.user.id;
                vm.userData.add({
                    id: id,
                    pseudo: pseudo,
                    email: vm.login_user.email,
                    lang: vm.login_user.lang
                }, "mail").subscribe(function (data) { }, function (error) {
                    console.log(error.status);
                });
                //
                // }
            }
            vm.showpassword = true;
        });
    };
    ;
    LoginemailPage.prototype.password_login = function (keycode) {
        var _this = this;
        if (keycode != 13)
            return;
        var vm = this;
        this.userData.loginbyemail(vm.login_user.email, vm.login_user.password).subscribe(function (resp) {
            if (resp == null) {
                _this.password_ressended = false;
                Main.toast(vm.toastCtrl, "LOGIN.WRONGPASSWORD");
            }
            else {
                vm.viewCtrl.dismiss(resp);
            }
        });
    };
    ;
    LoginemailPage.prototype.resend_password = function () {
        var _this = this;
        Maintools_1.toast(this.toastCtrl, "Secret code sended");
        this.userData.resend_password(this.login_user.email, false).subscribe(function () {
            _this.login_user.password = "";
        });
    };
    ;
    LoginemailPage.prototype.checkemail = function () {
        var vm = this;
        var s = vm.login_user.email.toLowerCase();
        var h = null;
        if (s.indexOf("gmail.com") != -1)
            h = window.open("https://mail.google.com/mail/", "_blank");
        if (s.indexOf("yahoo.com") != -1)
            h = window.open("https://mail.yahoo.com", "_blank");
        if (s.indexOf("hotmail.com") != -1)
            h = window.open("https://hotmail.com", "_blank");
        if (h == null)
            window.open(s.split("@")[1], "_blank");
    };
    ;
    LoginemailPage.prototype.valide = function () {
        if (this.showpassword)
            this.email_login(13);
        else
            this.password_login(13);
    };
    LoginemailPage = __decorate([
        core_1.Component({
            selector: 'page-loginemail',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\loginemail\loginemail.html"*/'<!--\n  Generated template for the LoginemailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <shifutitle [menu]="false" [back]="true" title="Email Login">\n    <shifubutton [small]="true" id="btnCancel" icon="close" (click)="viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n\n</ion-header>\n\n<ion-content padding text-center>\n\n  <shifuinput id="txtEmail" type="email" [hidden]="showpassword"\n              [(ngModel)]="login_user.email"\n              style="font-size:medium;"\n              label="Email"\n              (keypress)="email_login($event.keyCode)"></shifuinput>\n  <br>\n  <ion-buttons *ngIf="login_user.email.length>3 && !showpassword">\n    <shifubutton label="@gmail.com" [small]="true" color="secondary" (click)="add(\'@gmail.com\')"></shifubutton>\n    <shifubutton label="@hotmail.com" [small]="true" color="secondary"  (click)="add(\'@hotmail.com\')"></shifubutton>\n    <shifubutton label="@yahoo.com" [small]="true" color="secondary"  (click)="add(\'@yahoo.com\')"></shifubutton>\n  </ion-buttons>\n  <br>\n\n  <ion-buttons>\n  <shifubutton [hidden]="showpassword" label="valide" id="btnValideUser" class="button icon ion-arrow-right-a" (click)="email_login(13)"></shifubutton>\n  </ion-buttons>\n\n  <br>\n\n  <div *ngIf="showpassword" class="item-input item-button-right">\n\n    <span style="font-size: xx-large">{{login_user.email}}</span><br>\n\n    <shifuinput id="txtPseudo" type="text" [hidden]="showpassword"\n                [(ngModel)]="login_user.pseudo"\n                style="font-size:medium;" label="Pseudo"></shifuinput>\n\n    <div style="width: 100%;text-align: center;" (click)="checkemail()">\n      <span style="font-size: small;font-style: italic">{{\'LOGIN.CODESENDED\' | translate}}</span><br><br>\n      {{\'LIB.CHECKYOUREMAIL\' | translate}}\n    </div>\n\n    <br>\n\n    <shifuinput id="txtPassword" type="text" size="4"\n                label="LIB.SECRETCODE"\n                [(ngModel)]="login_user.password"\n                style="font-size: large;"\n                (keypress)="password_login($event.keyCode)"></shifuinput>\n\n\n    <br>\n    <shifubutton label="LIB.LOGIN" id="btnLogin" style="margin-bottom: 5px" (click)="password_login(13)"></shifubutton>\n  </div>\n  <br>\n  <div *ngIf="showpassword && password_ressended==false" class="item" (click)="resend_password()">\n    <label style="text-decoration: underline;font-style: italic;">{{\'LOGIN.SENDPASSWORD\' | translate}}</label>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\loginemail\loginemail.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.NavParams, ionic_angular_1.AlertController,
            user_data_1.UserData, ionic_angular_1.ViewController, settings_1.SettingsProvider,
            ionic_angular_1.ToastController, core_2.TranslateService])
    ], LoginemailPage);
    return LoginemailPage;
}());
exports.LoginemailPage = LoginemailPage;
//# sourceMappingURL=loginemail.js.map

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var user_data_1 = __webpack_require__(8);
var event_data_1 = __webpack_require__(15);
var Maintools_1 = __webpack_require__(2);
var invite_1 = __webpack_require__(46);
var image_creator_1 = __webpack_require__(38);
var core_2 = __webpack_require__(7);
var closedevent_1 = __webpack_require__(108);
var presentations_1 = __webpack_require__(188);
/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilPage = /** @class */ (function () {
    function ProfilPage(navCtrl, navParams, events, translate, modalCtrl, toastCtrl, alertCtrl, eventData, userData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.eventData = eventData;
        this.userData = userData;
        this.streamingDevices = [];
        this.autologin = { value: false };
        this.autologin.value = (this.eventData.event.autologin == 2);
    }
    ProfilPage.prototype.selImage = function () {
        var vm = this;
        Maintools_1.openModal(this.modalCtrl, image_creator_1.ImageCreatorPage, { ratio: 3 / 2, upload: true }, function (rep) {
            if (rep != null) {
                vm.eventData.event.welcomePicture = rep.value;
            }
        });
    };
    ProfilPage.prototype.openInvite = function () {
        Maintools_1.openModal(this.modalCtrl, invite_1.InvitePage);
    };
    ProfilPage.prototype.ionViewWillLeave = function () {
        this.updateEvent();
    };
    ProfilPage.prototype.upgradeEvent = function () {
        var _this = this;
        this.userData.upgradeTarif().subscribe(function (rep) {
            Maintools_1.toast(_this.toastCtrl, rep.message, _this.translate);
        });
    };
    ProfilPage.prototype.updateEvent = function () {
        var _this = this;
        this.eventData.event.autologin = 0;
        if (this.autologin.value)
            this.eventData.event.autologin = 2;
        this.eventData.updateevent("title,autologin,allowAnonymous,visibleOnMap,startJetons,welcomePicture,welcomeDuration,selfservice,loc_query,hTag,needValidate,minCreditToJoin,minDistance,minScoreToJoin,maxOnline,linkToOwner,laCarte,selfservice").subscribe(function (rep) {
            if (rep != null)
                _this.userData.user = rep;
        });
    };
    ProfilPage.prototype.openEventSum = function () {
        Maintools_1.openModal(this.modalCtrl, closedevent_1.ClosedeventPage, { event: this.eventData.event });
    };
    ProfilPage.prototype.openPresentations = function () {
        Maintools_1.openModal(this.modalCtrl, presentations_1.PresentationsPage, {});
    };
    ProfilPage = __decorate([
        core_1.Component({
            selector: 'page-profil',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\profil\profil.html"*/'<ion-header>\n  <shifutitle title="LIB.EVENTMASTER"  help="#">\n  </shifutitle>\n</ion-header>\n\n\n<ion-content no-padding>\n  <tuto label="PROFIL.TUTO" *ngIf="userData.user.id!=eventData.event.owner_id"></tuto>\n  <!--<div class="card">-->\n    <!--<div class="item item-divider item-button-right">-->\n      <!--{{userData.user.firstname}}-->\n      <!--<button style="padding-bottom: 15px;" class="button button-icon ion-settings" (click)="openProfil()" title="{{\'PROFIL.CHANGESETTINGS\' | translate}}"></button>-->\n    <!--</div>-->\n\n  <!--<div style="width: 100%;text-align: center" *ngIf="userData.user.id!=eventData.event.owner_id && eventData.event.laCarte.length>0">-->\n    <!--<shifubutton label="LIB.COMMAND" (click)="openCommand()"></shifubutton><br><br>-->\n  <!--</div>-->\n\n\n  <!---->\n  <!--</div>-->\n\n  <!--<shifucheckbox id="chkFollow" *ngIf="userData.user.id!=eventData.event.owner_id" label="PROFIL.FOLLOWER" [(ngModel)]="follow" (click)="updateFollow()"></shifucheckbox>-->\n  <!--<shifubutton label="LIB.INVITE" (click)="openInvite()"></shifubutton>-->\n\n  <tuto label="PROFIL.TUTOADMIN" ></tuto>\n\n  <!-- Parametres avances -->\n\n        <shifurange\n                    *ngIf="userData.user.email!=null && userData.user.email.length>0"\n                    unite="iCoin"\n                    icon="logo-usd"\n                    label="ADDEVENT.STARTJETONS"\n                    min="0" max="100" step="1"\n                    id="txtStartJetons"\n                    [(ngModel)]="eventData.event.startJetons"\n                    (onchange)="updateEvent()">\n        </shifurange>\n\n        <br>\n\n        <shifuinput\n          fontsize="x-large"\n          id="txtTitle" label="LIB.TITLE"\n          [(ngModel)]="eventData.event.title"></shifuinput><br>\n\n        <!--<shifuinput *ngIf="eventData.event.hTag.length>0" label="LIB.HTAG" [(ngModel)]="eventData.event.hTag"></shifuinput>-->\n\n        <!--<div style="width:100%;text-align: center" *ngIf="eventData.event.money==0">-->\n          <!--<shifubutton size="200px" label="PROFIL.PASSTOPREMIUM"  (click)="premiumEvent()"></shifubutton><br><br>-->\n        <!--</div>-->\n\n        <!--<shifurange icon="logo-usd" [(ngModel)]="eventData.event.minCreditToJoin" unite="credits" label="ADDEVENT.MINCREDIT" min="0" max="300" step="10"></shifurange>-->\n\n        <!--<shifucheckbox label="PROFIL.NEEDTOBECLOSE" id="chkDistance" [(ngModel)]="eventData.event.enableDistance" (change)="clickDistance()"></shifucheckbox>-->\n\n        <!--<div *ngIf="eventData.event.enableDistance">-->\n          <!--<shifurange  label="ADDEVENT.MINDISTANCE" unite="km"-->\n                       <!--[(ngModel)]="eventData.event.minDistance" label="ADDEVENT.MINDISTANCE"-->\n                       <!--min="0.1" max="5" step="0.1">-->\n          <!--</shifurange>-->\n        <!--</div>-->\n\n        <shifucheckbox *ngIf="userData.user.tarif.tarif>0 && userData.user.email.length>0"\n                       id="chkVisibility" label="ADDEVENT.VISIBLEONMAP" [(ngModel)]="eventData.event.visibleOnMap"\n                       (onchange)="updateEvent()">\n        </shifucheckbox>\n\n        <shifucheckbox *ngIf="eventData.event.visibleOnMap==true" id="chkAllowAnonymous" label="ADDEVENT.ALLOWANONYMOUS"\n                       [(ngModel)]="eventData.event.allowAnonymous" (onchange)="updateEvent()">\n        </shifucheckbox>\n\n        <shifucheckbox *ngIf="!eventData.event.visibleOnMap || eventData.event.allowAnonymous" id="chkAutoLogin" label="ADDEVENT.AUTOLOGIN"\n                 [(ngModel)]="autologin.value" (onchange)="updateEvent()">\n        </shifucheckbox>\n        <!--<shifurange *ngIf="userData.user.connexions.length>20"-->\n                    <!--id="txtMinScore" label="ADDEVENT.MINSCORE"-->\n                    <!--unite="reputation" [(ngModel)]="eventData.event.minScoreToJoin"-->\n                    <!--min="-10" max="50" step="1"></shifurange>-->\n\n  <ion-item text-center no-lines no-border>\n    <shifubutton id="cmdSum" label="LIB.SUMMARIZE" icon="eye" (click)="openEventSum()"></shifubutton>\n  </ion-item>\n\n\n        <shifubutton\n          label="PROFIL.UPGRADEEVENT"\n          *ngIf="userData.user.connexions.length>10 && userData.user.tarif.tarif==0"\n          (click)="upgradeEvent()">\n        </shifubutton>\n\n        <!--<div class="item" style="text-align: center" *ngIf="eventData.event.activities.indexOf(\'music\')>-1">-->\n        <!--<shifubutton-->\n        <!--style="width: 120px"-->\n        <!--label="PROFIL.STARTNEXT_EVENT"-->\n        <!--*ngIf="eventData.event.dtStart<now && eventData.event.nSongs>0 && !eventData.event.hasOwnProperty(\'currentSong\') && eventData.event.musicPlayer!=\'?\' && eventData.event.musicServer<2"-->\n        <!--(click)="startEvent()"></shifubutton>-->\n        <!--<shifubutton [small]="true" icon="ion-play" (click)="openPlayer()" *ngIf="eventData.event.musicServer>1"></shifubutton>-->\n        <!--<button-->\n        <!--style="width: 120px"-->\n        <!--class="button button-small icon-left ion-music-note button-positive"-->\n        <!--*ngIf="eventData.event.dtStart<now && eventData.event.nSongs==0"-->\n        <!--(click)="changePlatform()">{{\'PROFIL.CHANGE_PLAYERTYPE\' | translate}}-->\n        <!--</button>-->\n        <!--<div *ngIf="eventData.event.musicServer==0 && userData.user.accessTokens.hasOwnProperty(\'spotify\') && streamingDevices.length>1">-->\n        <!--<label class="item item-input item-select">-->\n        <!--<div class="item-button-left input-label">-->\n        <!--<button style="display: inline" class="button ion-refresh button-icon" (click)="refreshDeviceList()"></button>-->\n        <!--Player-->\n        <!--</div>-->\n        <!--<select ng-options="x.name for x in streamingDevices" [(ngModel)]="streamingDevices_sel" (change)="changeDevice(streamingDevices_sel)">-->\n        <!--</select>-->\n        <!--</label>-->\n        <!--</div>-->\n\n        <!--<div *ngIf="eventData.event.dtStart<now && eventData.event.musicPlayer==\'?\'">-->\n        <!--<img src="/img/wait.gif">&nbsp;-->\n        <!--Waiting for player {{streamingPlatform}}-->\n        <!--</div>-->\n\n        <!--<div *ngIf="eventData.event.dtStart<now && eventData.event.musicPlayer!=\'?\'">-->\n        <!--Music playing on {{eventData.event.musicPlayer}}-->\n        <!--</div>-->\n        <!--</div>-->\n\n\n\n        <!--<ion-item *ngIf="eventData.event.activities.indexOf(\'music\')>-1 && !eventData.event.limitSearchToOwnerPlaylist && eventData.event.musicServer==2">-->\n        <!--<div class="item item-divider">{{\'PROFIL.SEARCHSOURCE\' | translate}}</div>-->\n        <!--<ion-checkbox *ngFor="let item of srcList" [(ngModel)]="item.checked" ng-checked="item.checked" (change)="updateSource()">-->\n        <!--{{ item.text }}-->\n        <!--</ion-checkbox>-->\n        <!--</ion-item>-->\n\n        <!--<div class="item text-center">-->\n\n           <!--<shifubutton *ngIf="userData.user.connexions.length>20" icon="ion-link" margin="10" label="PROFIL.LINKTOWIDGET" (click)="enterCode(false)"></shifubutton>&nbsp; -->\n          <!--<br>-->\n\n        <!--</div>-->\n\n  <shifucard text-center title="ADDEVENT.WELCOMESCREEN" label="ADDEVENT.WELCOMEPICTURE" (onclick)="selImage()">\n    <tuto [if]="eventData.event.welcomePicture!=null && eventData.event.welcomePicture.length>0" label="PROFIL.TUTO_WELCOMEPICTURE"></tuto>\n    <div *ngIf="eventData.event.welcomePicture!=null && eventData.event.welcomePicture.length>0">\n      <img\n        src="{{eventData.event.welcomePicture}}"\n        style="max-width:200px;display:inline-block;"\n        class="image-photo">\n      <shifurange\n        unite="secondes" step="1" min="0" max="10"\n        id="txtWelcomeDuration" icon="time"\n        label="ADDEVENT.WELCOMEDURATION"\n        [(ngModel)]="eventData.event.welcomeDuration">\n      </shifurange>\n    </div>\n  </shifucard>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\profil\profil.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_2.NavController,
            ionic_angular_2.NavParams,
            ionic_angular_1.Events,
            core_2.TranslateService,
            ionic_angular_2.ModalController,
            ionic_angular_2.ToastController,
            ionic_angular_1.AlertController,
            event_data_1.EventDataProvider,
            user_data_1.UserData])
    ], ProfilPage);
    return ProfilPage;
}());
exports.ProfilPage = ProfilPage;
//# sourceMappingURL=profil.js.map

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var api_1 = __webpack_require__(16);
var event_data_1 = __webpack_require__(15);
var core_2 = __webpack_require__(7);
var user_data_1 = __webpack_require__(8);
var Maintools_1 = __webpack_require__(2);
var Maintools_2 = __webpack_require__(2);
var addpresentation_1 = __webpack_require__(321);
var settings_1 = __webpack_require__(23);
var remote_1 = __webpack_require__(322);
var addbets_1 = __webpack_require__(189);
/**
 * Generated class for the PresentationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PresentationsPage = /** @class */ (function () {
    function PresentationsPage(events, navCtrl, navParams, loadingCtrl, api, alertCtrl, modalCtrl, toastCtrl, eventData, userData, settings, viewCtrl, translate) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.api = api;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.eventData = eventData;
        this.userData = userData;
        this.settings = settings;
        this.viewCtrl = viewCtrl;
        this.translate = translate;
        this.presentations = [];
    }
    PresentationsPage_1 = PresentationsPage;
    PresentationsPage.prototype.refresh = function () {
        var _this = this;
        if (!this.settings.mustRefresh(PresentationsPage_1.name))
            return;
        //if(this.userData.selectTab!=undefined && this.userData.selectTab!=PresentationsPage.name)return;
        Maintools_2.$$("Récupération des presentations");
        this.eventData.getpresentations().subscribe(function (res) {
            var b = false;
            for (var i = 0; i < _this.presentations.length; i++)
                if (res.items[i].id != _this.presentations[i].id)
                    b = true;
            if (res.items.length != _this.presentations.length || b)
                _this.presentations = [];
            Maintools_2.$$("Appel du refresh", res);
            var bAlreadyActivate = false;
            res.items.forEach(function (p) {
                if (p.active && !p.ended)
                    bAlreadyActivate = true;
                //Gere la possibilité de voter
                p.canVote = true;
                if (p.votes != null) {
                    p.votes.forEach(function (v) {
                        if (v.from == _this.userData.user.id)
                            p.canVote = false;
                    });
                }
                p.title_complete = Maintools_2.getDate(p.dtStart, "FR-fr", true) + " - " + p.title;
                if (!p.ended) {
                    if (p.pages != null)
                        p.title_complete += " (" + p.page + "/" + p.pages.length + ")";
                }
                else
                    p.title_complete += " - " + _this.translate.instant("LIB.TERMINATED");
                if (!bAlreadyActivate && !p.ended && !p.inTreatment && !p.active && _this.eventData.event.Moderators.indexOf(_this.userData.user.id) > -1) {
                    bAlreadyActivate = true;
                    p.canActivate = true;
                }
                for (var i = 0; i < _this.presentations.length; i++) {
                    if (_this.presentations[i].id == p.id) {
                        _this.presentations[i].active = p.active;
                        _this.presentations[i].ended = p.ended;
                        _this.presentations[i].inTreatment = p.inTreatment;
                        _this.presentations[i].canActivate = p.canActivate;
                        _this.presentations[i].page = p.page;
                        _this.presentations[i].dtEnd = Number(p.dtEnd);
                        _this.presentations[i].dtStart = Number(p.dtStart);
                        _this.presentations[i].votes = p.votes;
                        _this.presentations[i].title_complete = p.title_complete;
                        break;
                    }
                }
                if (i >= _this.presentations.length)
                    _this.presentations.push(p);
            });
        });
    };
    PresentationsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        Maintools_2.$$("ionViewDidEnter");
        setTimeout(function () { _this.refresh(); }, Maintools_2.DELAY_TO_REFRESH);
    };
    PresentationsPage.prototype.ionViewDidLoad = function () {
        Maintools_2.$$("ionViewDidLoad");
        Maintools_1.subscribe("presentation", this);
    };
    PresentationsPage.prototype.addPresentation = function (evt) {
        var _this = this;
        Maintools_2.openModal(this.modalCtrl, addpresentation_1.AddpresentationPage, null, function (res) {
            if (res != null) {
                var message = "Presentation upload";
                if (res.mega > 10)
                    message = message + " ... it will take more than one minute";
                var l = Maintools_2.loading(_this, message);
                _this.eventData.sendpresentation(res).subscribe(function (res) {
                    if (res == null)
                        Maintools_1.toast(_this.toastCtrl, "ERROR.PRESENTATIONUPLOAD", _this.translate);
                    l.dismiss();
                });
            }
        });
    };
    PresentationsPage.prototype.setCurrentPresentation = function (pres, bStart) {
        var _this = this;
        this.eventData.activepresentation(pres, bStart).subscribe(function (rep) {
            if (rep.code != 200)
                Maintools_1.toast(_this.toastCtrl, rep.message, _this.translate);
        });
    };
    PresentationsPage.prototype.removePres = function (pres) {
        this.eventData.delpresentation(pres.id).subscribe(function () { });
    };
    PresentationsPage.prototype.download = function (pres) {
        Maintools_1.openWindow(pres.support, "download");
    };
    PresentationsPage.prototype.updateEvent = function () {
        this.eventData.updateevent("maxPresDuration,pricePerMinute,priceToPresent,canDownloadBeforePresentation,delayBetweenPresentationInMinutes").subscribe(function (r) { });
    };
    /**
     * Modifie les priorités des présentation (donc l'ordre de passage)
     * @param pres
     * @param {Number} sens
     */
    PresentationsPage.prototype.changePriority = function (pres, sens) {
        var _this = this;
        pres.priority = pres.priority + sens;
        this.eventData.sendpresentation(pres).subscribe(function () {
            Maintools_1.toast(_this.toastCtrl, "Priorité modifiée");
            _this.presentations = [];
        });
    };
    PresentationsPage.prototype.onSetScore = function (step, pres) {
        var _this = this;
        pres.canVote = false;
        var vote = { target: pres.id, event: this.eventData.event.id, from: this.userData.user.id, value: step, description: "" };
        this.userData.sendvote(pres.id, vote).subscribe(function () {
            Maintools_1.toast(_this.toastCtrl, "Vote enregistré");
        });
    };
    PresentationsPage.prototype.changeDuration = function (pres) {
        var _this = this;
        Maintools_1.showPopup({
            title: "Nouvelle durée (en minutes)",
            placeholder: "",
            confirmButton: "LIB.OK",
            cancelButton: "LIB.CANCEL",
            type: "number",
            translate: this.translate
        }, this.alertCtrl, function (res) {
            res = Number(res);
            if (res != null && res < 600 && res > 0) {
                pres.dtEnd = Number(pres.dtStart) + res * 1000 * 60;
                _this.eventData.sendpresentation(pres).subscribe(function () {
                    Maintools_1.toast(_this.toastCtrl, "Durée modifiée");
                    _this.presentations = [];
                });
            }
        });
    };
    PresentationsPage.prototype.openRemote = function (pres) {
        Maintools_2.openModal(this.modalCtrl, remote_1.RemotePage, { pres: pres });
    };
    PresentationsPage.prototype.addQuestion = function (pres) {
        var _this = this;
        Maintools_1.showPopup({
            title: "LIB.QUESTION",
            confirmButton: "LIB.OK",
            cancelButton: "LIB.CANCEL",
            translate: this.translate,
            type: "text"
        }, this.alertCtrl, function (res) {
            if (res != null) {
                var message = {
                    text: pres.title + ":" + res,
                    photo: "",
                    type: Maintools_1.TYPE_MESSAGE,
                    title: pres.title,
                    tag: "message question presentation " + _this.eventData.event.id,
                    from: _this.userData.user
                };
                _this.eventData.sendmessage(0, message).subscribe(function (resp) {
                    if (resp == null) {
                        Maintools_1.toast(_this.toastCtrl, "MESSAGE.ERRORLIMIT", _this.translate);
                    }
                    else {
                        Maintools_1.toast(_this.toastCtrl, "PRESENTATION.QUESTIONADDTOMESSAGE");
                    }
                });
            }
        });
    };
    PresentationsPage.prototype.addSurvey = function () {
        Maintools_2.openModal(this.modalCtrl, addbets_1.AddbetsPage, { type: 5 }, function () {
        });
    };
    var PresentationsPage_1;
    PresentationsPage = PresentationsPage_1 = __decorate([
        core_1.Component({
            selector: 'page-presentations',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\presentations\presentations.html"*/'<!--\n  Generated template for the PresentationsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle title="Presentations" help="#">\n    <shifubutton\n      id="cmdAddPresentation"\n      *ngIf="eventData.event.priceToPresent==0 || eventData.event.pricePerMinute==true || userData.user.jetons[eventData.event.owner_id]>=eventData.event.priceToPresent"\n      icon="add-circle"\n      (click)="addPresentation()">\n    </shifubutton>\n  </shifutitle>\n</ion-header>\n\n<ion-content no-lines no-border>\n\n  <tuto [position]="center"\n        label="Ajouter votre présentation pour vous inscrire à l\'ordre du jour"\n        show="cmdAddPresentation">\n  </tuto>\n\n  <shifucard title="LIB.EVENTMASTER"\n             icon="desktop"\n             (onclick)="events.publish(\'open:widget\',\'presentation\')"\n             *ngIf="userData.user.id==eventData.event.owner_id">\n\n    <shifucheckbox label="PRESENTATION.DONWLOADBEFOREPRES"\n                   [(ngModel)]="eventData.event.canDownloadBeforePresentation"\n                   (onchange)="updateEvent()"></shifucheckbox>\n\n    <shifurange\n      icon="time" (onchange)="updateEvent()"\n      [(ngModel)]="eventData.event.delayBetweenPresentationInMinutes"\n      unite="minutes"\n      label="PRESENTATION.DELAYBETWEENPRESENTATION" min="1" max="60" step="1">\n    </shifurange>\n\n    <shifurange\n      icon="time" (onchange)="updateEvent()"\n      [(ngModel)]="eventData.event.maxPresDuration"\n      unite="minutes"\n      label="PRESENTATION.MAXPRESDURATION" min="2" max="300" step="1">\n    </shifurange>\n\n    <shifurange\n      icon="money" (onchange)="updateEvent()"\n      [(ngModel)]="eventData.event.priceToPresent"\n      unite="icoins"\n      label="PRESENTATION.PRICETOPRESENT" min="0" max="100" step="1">\n    </shifurange>\n\n    <shifucheckbox label="PRESENTATION.PRICEPERMINUTE"\n                   [(ngModel)]="eventData.event.pricePerMinute"\n                   (onchange)="updateEvent()"></shifucheckbox>\n\n\n  </shifucard>\n\n\n  <ion-list no-lines no-border>\n    <shifucard\n      [showButton]="pres.canActivate==true"\n      [visible]="!pres.ended && (pres.from.id==userData.user.id || pres.active)"\n      [title]="pres.title_complete"\n      name="presentation"\n      label="LIB.START"\n      (onclick)="setCurrentPresentation(pres,true)"\n      *ngFor="let pres of presentations">\n\n      <ion-item *ngIf="pres.from.id!=userData.user.id" no-lines>\n        <shifuimageprofil [withname]="true" item-start [user]="pres.from"></shifuimageprofil>\n        <span *ngIf="pres.text!=undefined && pres.text.length>0">\n          <br>{{pres.text}}\n        </span>\n      </ion-item>\n\n      <ion-item *ngIf="pres.from.id==userData.user.id && !pres.ended && !pres.active && !pres.inTreatment" no-lines>\n        Vous commencez dans <shifutimer [end]="pres.dtStart"></shifutimer>\n      </ion-item>\n\n\n      <ion-item *ngIf="pres.ended" no-lines>\n        Présentation terminée\n      </ion-item>\n\n\n      <span *ngIf="pres.inTreatment && pres.from.id==userData.user.id">\n          <img src="./assets/img/wait.gif" style="width:15px;display:inline;">&nbsp;Préparation de la présentation\n        </span>\n\n      <ion-item text-center *ngIf="pres.active && !pres.ended" style="font-size: large">\n        <img *ngIf="pres.from.id!=userData.user.id"\n             class="image-photo"\n             [src]="pres.pages[pres.page-1]"\n             style="display:inline-block;width:80%;max-width:250px;">\n        <br>\n      </ion-item>\n\n      <ion-item no-lines no-margin>\n          <span *ngIf="eventData.event.Moderators.indexOf(userData.user.id)>-1 && pres.priority>0">\n            {{"LIB.PRIORITY" | translate}}:{{pres.priority}}\n          </span>\n\n        <ion-buttons item-end>\n\n          <shifubutton\n            *ngIf="pres.ended==false && pres.active && pres.from.id==userData.user.id"\n            label="LIB.REMOTE" [small]="true"\n            icon="calculator"\n            (click)="openRemote(pres)">\n          </shifubutton>\n\n\n          <shifubutton\n            *ngIf="!pres.ended && !pres.active && (eventData.event.Moderators.indexOf(userData.user.id)>-1)"\n            [small]="true"\n            icon="close"\n            [hidewhenclick]="true"\n            (click)="removePres(pres)">\n          </shifubutton>\n\n          <shifubutton\n            *ngIf="eventData.event.Moderators.indexOf(userData.user.id)>-1 || (pres.from.id!=userData.user.id && eventData.event.canDownloadBeforePresentation || pres.ended)"\n            [small]="true"\n            item-end\n            icon="download"\n            (click)="download(pres)">\n          </shifubutton>\n\n          <span *ngIf="!pres.active && !pres.ended && eventData.event.Moderators.indexOf(userData.user.id)>-1 && !pres.inTreatment">\n          <shifubutton\n            *ngIf="pres.priority>0"\n            [hidewhenclick]="true"\n            [small]="true" icon="arrow-up"\n            (click)="changePriority(pres,-1)">\n          </shifubutton>\n\n          <shifubutton\n            [hidewhenclick]="true"\n            [small]="true" icon="arrow-down"\n            (click)="changePriority(pres,+1)">\n          </shifubutton>\n\n            <shifubutton\n              [small]="true"\n              icon="time"\n              (click)="changeDuration(pres)">\n            </shifubutton>\n\n            <shifubutton\n              [small]="true"\n              icon="help"\n              (click)="addSurvey()">\n            </shifubutton>\n        </span>\n\n          <div *ngIf="pres.active && !pres.ended && pres.from.id!=userData.user.id">\n\n            <!--L\'organisateur ne peut pas voter, il a suffisament de chose a gérer comme ça-->\n            <shifubutton\n              *ngIf="pres.canVote && userData.user.id!=eventData.event.owner_id"\n              [small]="true"\n              name="btnLike"\n              icon="thumbs-up"\n              (click)="onSetScore(1,pres)">\n            </shifubutton>\n\n            <shifubutton\n              *ngIf="pres.canVote  && userData.user.id!=eventData.event.owner_id"\n              [small]="true"\n              name="btnDislike"\n              icon="thumbs-down"\n              (click)="onSetScore(-1,pres)">\n            </shifubutton>\n\n            <shifubutton\n              [small]="true"\n              name="btnAddQuestion"\n              icon="help"\n              (click)="addQuestion(pres)">\n            </shifubutton>\n          </div>\n\n\n          <shifubutton\n            *ngIf="pres.active && eventData.event.Moderators.indexOf(userData.user.id)>-1"\n            [hidewhenclick]="true"\n            [small]="true"\n            icon="hand"\n            label="Stop"\n            (click)="setCurrentPresentation(pres,false)"></shifubutton>\n        </ion-buttons>\n\n      </ion-item>\n\n\n    </shifucard>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\presentations\presentations.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_2.Events,
            ionic_angular_1.NavController,
            ionic_angular_1.NavParams,
            ionic_angular_2.LoadingController,
            api_1.ApiProvider,
            ionic_angular_2.AlertController,
            ionic_angular_2.ModalController,
            ionic_angular_1.ToastController,
            event_data_1.EventDataProvider,
            user_data_1.UserData,
            settings_1.SettingsProvider,
            ionic_angular_1.ViewController,
            core_2.TranslateService])
    ], PresentationsPage);
    return PresentationsPage;
}());
exports.PresentationsPage = PresentationsPage;
//# sourceMappingURL=presentations.js.map

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var Maintools_1 = __webpack_require__(2);
var user_data_1 = __webpack_require__(8);
var event_data_1 = __webpack_require__(15);
var core_2 = __webpack_require__(7);
var image_creator_1 = __webpack_require__(38);
/**
 * Generated class for the AddbetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddbetsPage = /** @class */ (function () {
    function AddbetsPage(modalCtrl, viewCtrl, translate, navCtrl, navParams, toastCtrl, eventData, userData, loadingCtrl, alertCtrl) {
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.eventData = eventData;
        this.userData = userData;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.bets = [];
        this.newbet = { tags: [], picture: "", enabled: true, text_option: "", nVotes: 1, startDelay: 0, title: "", pattern: false, options: [], minAmount: 1, cagnotte: 0 };
        this.options = [];
        this.formtitle = "";
        this.user = {};
        this.minStartDelay = 0;
        this.patterns = [];
        this.alias = "";
        var vm = this;
        vm.now = new Date().getTime();
        if (this.eventData.event.needValidate) {
            this.minStartDelay = 5;
            this.newbet.startDelay = this.minStartDelay;
        }
        vm.newbet.tags = this.eventData.event.tags;
        if (vm.newbet.tags == undefined)
            vm.newbet.tags = [];
        if (vm.eventData.event.dtStart > new Date().getTime())
            vm.newbet.maxdelay = Math.min((vm.eventData.event.dtEnd - vm.eventData.event.dtStart) / 60000, 120); //Un pari ne peut aller au dela de la fin de l'evenement
        else
            vm.newbet.maxdelay = Math.min((vm.eventData.event.dtEnd - new Date().getTime()) / 60000, 120); //Un pari ne peut aller au dela de la fin de l'evenement
        vm.newbet.type = this.navParams.get("type");
        if (vm.newbet.type == 4)
            vm.formtitle = "LIB.BET";
        if (vm.newbet.type == 5)
            vm.formtitle = "LIB.SURVEY";
        if (vm.newbet.type == 9)
            vm.formtitle = "LIB.QUESTION";
        vm.newbet.delay = Math.min(10, (vm.eventData.event.dtEnd - vm.now) / 60000 - 2);
        vm.getDtStart();
    }
    AddbetsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userData.get().subscribe(function (rep) { return _this.user = rep; });
        this.refresh_pattern();
    };
    AddbetsPage.prototype.getDtEnd = function () {
        this.newbet.dtEnd = Number(this.newbet.dtStart) + (Number(this.newbet.delay) + 1) * 1000 * 60;
    };
    ;
    AddbetsPage.prototype.up = function (opt) {
        var i = this.options.indexOf(opt);
        if (i > 0) {
            var s = this.options[i - 1];
            this.options.splice(i - 1, 1);
            this.options.splice(i, 0, s);
        }
    };
    AddbetsPage.prototype.delOption = function (opt) {
        if (opt.indexOf("http") != 0)
            this.newbet.text_option = opt;
        this.options.splice(this.options.indexOf(opt), 1);
    };
    AddbetsPage.prototype.getDtStart = function () {
        var vm = this;
        var start = Math.max(new Date().getTime(), Number(vm.eventData.event.dtStart));
        vm.newbet.dtStart = start + (Number(vm.newbet.startDelay) * 1000 * 60);
        vm.getDtEnd();
    };
    ;
    // del_pattern(index){
    //   var vm=this;
    //   vm.userData.removebet(vm.patterns[index].id,function(resp){
    //     vm.showRespons(resp);
    //     if(vm.user.message.length==0)vm.patterns.splice(index,1);
    //     setTimeout(function(){vm.$apply();},200);
    //   });
    // };
    AddbetsPage.prototype.sendnewbet = function () {
        var _this = this;
        var vm = this;
        vm.newbet.from = vm.user;
        vm.newbet.enabled = false;
        var l = Maintools_1.loading(this);
        vm.eventData.sendbet(vm.newbet).subscribe(function (resp) {
            l.dismiss();
            if (resp.message == "")
                Maintools_1.toast(vm.toastCtrl, "ADDBET.PUBLISHING", _this.translate);
            else
                Maintools_1.toast(vm.toastCtrl, resp.message, vm.translate);
            vm.viewCtrl.dismiss();
        });
    };
    /**
     *
     */
    AddbetsPage.prototype.addbet = function () {
        var vm = this;
        this.getDtStart();
        vm.options.forEach(function (s) {
            var obj = { lib: s, total: 0, quot: 0 };
            vm.newbet.options.push(obj);
        });
        if (vm.newbet.addtags != null && vm.newbet.addtags.length > 0) {
            vm.newbet.addtags = vm.newbet.addtags.replace(new RegExp(',', 'g'), " ").replace(new RegExp(';', 'g'), " ");
            vm.newbet.tags = vm.newbet.addtags.split(" ");
        }
        if (vm.newbet.pattern) {
            Maintools_1.showPopup({
                title: "ADDBET.PATTERNTITLE",
                value: "",
                confirmButton: "Ok",
                cancelButton: "LIB.CANCEL",
                type: "text"
            }, vm.alertCtrl, function (res) {
                if (res.length > 0) {
                    vm.newbet.patternTitle = res;
                    vm.sendnewbet();
                }
            });
        }
        else
            vm.sendnewbet();
    };
    ;
    AddbetsPage.prototype.optionImage = function () {
        var vm = this;
        Maintools_1.openModal(this.modalCtrl, image_creator_1.ImageCreatorPage, { ratio: 1, upload: true }, function (rep) {
            if (rep != null && rep.value != null) {
                vm.newbet.text_option = rep.value;
                vm.addOption();
            }
        });
    };
    AddbetsPage.prototype.selImage = function () {
        var vm = this;
        Maintools_1.openModal(this.modalCtrl, image_creator_1.ImageCreatorPage, { ratio: 1, upload: true }, function (rep) {
            if (rep != null) {
                vm.newbet.picture = rep.value;
            }
        });
    };
    AddbetsPage.prototype.addOption = function () {
        var vm = this;
        if (vm.newbet.text_option.length > 0) {
            if (vm.options.indexOf(vm.newbet.text_option) > -1) {
                Maintools_1.toast(vm.toastCtrl, "ADDBET.OPTIONALREADYEXIST", vm.translate);
            }
            else {
                if (vm.newbet.text_option.indexOf("#") > -1) {
                    vm.newbet.pattern = true;
                    Maintools_1.$$("Le pari est marqué comme pattern");
                }
                if (vm.newbet.text_option.indexOf("http") == 0) {
                    if (vm.newbet.tags.indexOf("image") == -1)
                        vm.newbet.tags.push("image");
                }
                else {
                    if (vm.newbet.tags.indexOf("text") == -1)
                        vm.newbet.tags.push("text");
                }
                vm.options.push(vm.newbet.text_option);
                vm.newbet.text_option = "";
            }
        }
    };
    ;
    AddbetsPage.prototype.addAlias = function (s) {
        var alias = "";
        s += " ";
        var rc = [];
        for (var i = 0; i < s.length; i++)
            if (s[i] == "#") {
                var j = s.indexOf(" ", i + 1);
                var new_alias = (s.substr(i + 1, j - i - 1));
                if (alias.indexOf(new_alias + "=") == -1) {
                    /*
                    showPopup({
                            title: $translate.instant("BETS.ALIASVALUE")+" "+new_alias,
                            value: "",
                            confirmButton: "Ok",
                            cancelButton: $translate.instant("LIB.CANCEL"),
                            type: "text"
                        }, vm, $ionicPopup,
                        function (res) {
                            if(res.length>0)
                                alias+="#"+new_alias+"="+res+";";
                        });
                    */
                    var res = prompt("BETS.ALIASVALUE" + " " + new_alias);
                    alias += "#" + new_alias + "=" + res + ";";
                }
            }
        return rc;
    };
    /**
     * @param s
     * @returns la chaine avec les alias remplacé
     */
    AddbetsPage.prototype.replaceAlias = function (s) {
        var vm = this;
        vm.addAlias(s);
        vm.alias.split(";").forEach(function (alias) {
            if (alias.length > 0)
                s = s.replace(alias.split("=")[0], alias.split("=")[1]);
        });
        return s;
    };
    AddbetsPage.prototype.selPattern = function (index) {
        // var vm=this;
        // var alias="";
        // vm.newbet.patternUse=vm.patterns[index].id;
        // vm.newbet.title=vm.replaceAlias(vm.patterns[index].title);
        // vm.options.clear();
        // vm.patterns[index].options.forEach(function(opt){
        //   vm.newbet.text_option=vm.replaceAlias(opt.lib);
        //   vm.addOption();
        // });
    };
    ;
    AddbetsPage.prototype.refresh_pattern = function () {
        // vm.eventData.getbets(vm.user.id,false,true,vm.newbet.tags,function(resp){
        //   if(resp.result.hasOwnProperty("items")){
        //     $$("Récupération des pattern");
        //     vm.patterns=resp.result.items.splice(0,20); //On se limite à l'affichage de 20 patterns
        //     setTimeout(function(){vm.$apply();},200);
        //   }
        // });
    };
    ;
    AddbetsPage.prototype.addbetEnAttente = function () {
        this.newbet.startDelay = 1e6;
        this.getDtStart();
        this.addbet();
    };
    __decorate([
        core_1.ViewChild("inputOption"),
        __metadata("design:type", core_1.ElementRef)
    ], AddbetsPage.prototype, "inputOption", void 0);
    AddbetsPage = __decorate([
        core_1.Component({
            selector: 'page-addbets',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addbets\addbets.html"*/'<!--\n  Generated template for the AddbetsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <shifutitle title="{{formtitle}}" help="#">\n    <shifubutton [small]="true" icon="clock" label="LIB.PENDING" id="btnEnAttente" *ngIf="(options.length>1 || newbet.type==9) && newbet.title.length>0 && newbet.enabled" (click)="addbetEnAttente()"></shifubutton>\n    <shifubutton [small]="true" icon="checkmark" label="LIB.PUBLISH" id="btnSave" *ngIf="(options.length>1 || newbet.type==9) && newbet.title.length>0 && newbet.enabled" (click)="addbet()"></shifubutton>\n    <shifubutton [small]="true" id="btnCancel" icon="close" (click)="viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n\n<ion-content no-padding>\n\n  <tuto label="ADDBETS.TUTO" show="txtTitle"></tuto>\n  <ion-input autofocus\n             style="font-size: large;"\n             max="60" min="3"\n             text-center placeholder="{{\'ADDBETS.TITLE\' | translate}}" id="txtTitle"\n             [(ngModel)]="newbet.title"></ion-input>\n\n  <ion-row *ngIf="options.length<eventData.event.limitOptions && newbet.type!=9">\n    <ion-col>\n      <shifuinput\n        size="80" #inputOption\n        *ngIf="newbet.tags.indexOf(\'image\')==-1"\n        name="add_opt"\n        [(ngModel)]="newbet.text_option" (onenter)="addOption()" placeholder="{{\'ADDBETS.NEWOPTION\' | translate}}"></shifuinput>\n    </ion-col>\n    <ion-col col-2 text-right margin-right="5px">\n      <shifubutton id="btnOptionImage" icon="image" *ngIf="newbet.text_option.length==0 && newbet.tags.indexOf(\'text\')==-1" (click)="optionImage()"></shifubutton>\n      <shifubutton id="btnAddOption" icon="add-circle" *ngIf="newbet.tags.indexOf(\'image\')==-1 && newbet.text_option.length>0" (click)="addOption()" (onenter)="addOption()"></shifubutton>\n    </ion-col>\n  </ion-row>\n\n  <ion-list no-padding no-margin no-lines no-border *ngIf="options.length>0">\n    <ion-item *ngFor="let opt of options">\n      <span item-start style="font-size:medium" *ngIf="opt.indexOf(\'http\')!=0">{{opt}}</span>\n      <ion-thumbnail item-start *ngIf="opt.indexOf(\'http\')==0"><img class="image-photo" src="{{opt}}"></ion-thumbnail>\n      <ion-buttons item-end>\n        <shifubutton [small]="true" item-end name="btnDelete" icon="close" (click)="delOption(opt)"></shifubutton>\n        <shifubutton [small]="true" item-end name="btnUp" icon="arrow-up" (click)="up(opt)"></shifubutton>\n      </ion-buttons>\n\n    </ion-item>\n  </ion-list>\n\n\n  <div *ngIf="options.length>1 || (newbet.type==9 && newbet.title.length>5)">\n\n    <div style="text-align: center;width:100%" *ngIf="newbet.tags.indexOf(\'image\')==-1">\n      <img *ngIf="newbet.picture.length>0" src="{{newbet.picture}}" style="width:80%;" class="image-photo" (click)="selImage()"><br>\n      <shifubutton label="Illustration" id="btnAddImage" *ngIf="newbet.picture.length==0" icon="image" (click)="selImage()"></shifubutton><br>\n      <br>\n    </div>\n\n    <div class="item text-center" style="font-size:x-large;text-align: center;">\n      {{newbet.dtStart | date: "HH:mm"}} <img src="./assets/img/arrow_right.png" style="width:15px;"/> {{newbet.dtEnd | date: "HH:mm"}}\n    </div>\n\n    <shifurange\n      *ngIf="userData.user.connexions.length>5" icon="time"\n      id="txtStartBet"\n      label="ADDBETS.STARTBET" unite="min"\n      [(ngModel)]="newbet.startDelay" min="minStartDelay"\n      max="{{eventData.event.duration*60}}" step="1"\n      (onmove)="getDtStart()">\n    </shifurange>\n\n    <shifurange\n      icon="time" id="txtEndBet" label="ADDBETS.ENDBET"\n      unite="min" [(ngModel)]="newbet.delay" min="1"\n      max="{{newbet.maxdelay}}"  step="1"\n      (onmove)="getDtEnd()">\n    </shifurange>\n\n    <shifurange\n      *ngIf="\n\n       newbet.type==5"\n      icon="checkmark" id="txtNbVotes" unite="vote"\n      label="ADDBETS.NBVOTE" [(ngModel)]="newbet.nVotes"\n      step="1" min="1" max="10">\n    </shifurange>\n\n    <shifurange\n      *ngIf="newbet.type==9"\n      icon="checkmark" id="txtNbRespons" unite="LIB.RESPONS"\n      label="ADDBETS.NBRESPONS" [(ngModel)]="newbet.nVotes"\n      step="1" min="1" max="15">\n    </shifurange>\n\n    <shifurange\n      *ngIf="userData.user.connexions.length>2 && newbet.type==4"\n      icon="usd" id="txtCagnotte" unite="credits"\n      label="ADDBET.CAGNOTTE" [(ngModel)]="newbet.cagnotte"\n      step="1" min="0" max="{{eventData.event.owner.jetons[userData.user.id]}}">\n    </shifurange>\n\n    <shifurange\n      *ngIf="newbet.type==4 && userData.user.connexions.length>5" icon="usd"\n      id="txtMinAmount" unite="credits" label="ADDBET.MINAMOUNT"\n      [(ngModel)]="newbet.minAmount" step="1" min="0" max="20">\n    </shifurange>\n\n    <shifuinput\n      *ngIf="userData.user.connexions.length>10"\n      label="ADDBETS.DESCRIPTION" id="txtText" [(ngModel)]="newbet.text">\n    </shifuinput>\n  </div>\n\n\n  <br>\n  <div *ngIf="patterns!=undefined && patterns.length>0">\n    <div style="width:100%;text-align: center">{{\'ADDBETS.PATTERNLISTTITLE\' | translate }}</div>\n    <ion-list *ngFor="let pattern of patterns">\n      <ion-item class="item item-icon-left item-icon-right">\n        <i name="btnSelect" class="icon ion-arrow-right-a" (click)="selPattern($index)"></i>\n        {{pattern.patternTitle}}\n        <i name="btnDelete" class="icon ion-trash-b" *ngIf="pattern.from.id === user.id" (click)="del_pattern($index)"></i>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addbets\addbets.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_2.ModalController, ionic_angular_1.ViewController, core_2.TranslateService,
            ionic_angular_2.NavController, ionic_angular_1.NavParams, ionic_angular_1.ToastController,
            event_data_1.EventDataProvider, user_data_1.UserData, ionic_angular_1.LoadingController,
            ionic_angular_2.AlertController])
    ], AddbetsPage);
    return AddbetsPage;
}());
exports.AddbetsPage = AddbetsPage;
//# sourceMappingURL=addbets.js.map

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var core_2 = __webpack_require__(7);
var Maintools_1 = __webpack_require__(2);
var user_data_1 = __webpack_require__(8);
var api_1 = __webpack_require__(16);
var settings_1 = __webpack_require__(23);
var platform_browser_1 = __webpack_require__(21);
/**
 * Generated class for the LoginavatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginavatarPage = /** @class */ (function () {
    function LoginavatarPage(sanitizer, navCtrl, navParams, alertCtrl, api, viewCtrl, userData, settings, toastCtrl, translate, platform) {
        this.sanitizer = sanitizer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.api = api;
        this.viewCtrl = viewCtrl;
        this.userData = userData;
        this.settings = settings;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.platform = platform;
        this.pseudo = "";
        this.from = "";
        this.picture = "./assets/img/wait.gif";
        this.currentCategory = "";
        this.message = "";
        this.index = 0;
        this.female = false;
        this.items = [];
        this.avatars = [];
        this.size = 6;
        this.notRobot = false;
        this.handle = null;
        this.sel_category = "";
        this.index = Maintools_1.tirage(20);
        if (this.settings.isLocal || this.navParams.get("from") == "perso")
            this.notRobot = true;
    }
    LoginavatarPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.sel_category = "figurinepop";
        if (this.settings.ihm == "pro") {
            if (this.pseudo == null || this.pseudo.length == 0)
                this.pseudo = "MonPseudo";
            this.sel_category = "pro";
        }
        this.changeCategory({ value: this.sel_category });
        this.message = this.navParams.get("message");
        setTimeout(function () { _this.message = ""; }, 3000);
        this.random(this.sel_category, function () {
            if (_this.navParams.get("autologin") == 2)
                _this.anonymousLogin();
        });
        this.size = 4 * 2;
    };
    LoginavatarPage.prototype.random = function (category, func) {
        var _this = this;
        if (func === void 0) { func = null; }
        this.currentCategory = category;
        if (category != "pro") {
            this.api.getavatar(category).subscribe(function (rep) {
                _this.picture = rep.url;
                _this.pseudo = rep.name;
                if (func != null)
                    func();
            });
        }
    };
    LoginavatarPage.prototype.anonymousLogin = function () {
        var _this = this;
        if (this.pseudo.length > 0) {
            if (this.currentCategory == "pixels")
                this.gen_avatar(true, function () {
                    _this.viewCtrl.dismiss({ picture: _this.picture, pseudo: _this.pseudo });
                });
            else
                this.viewCtrl.dismiss({ picture: this.picture, pseudo: this.pseudo });
        }
    };
    LoginavatarPage.prototype.selAvatar = function (rep) {
        this.picture = rep.url;
        if (rep.title != null && rep.title.length > 0)
            this.pseudo = rep.title;
    };
    LoginavatarPage.prototype.changeAvatar = function (sens) {
        if (this.index + sens > 0)
            this.index += sens * this.size;
        if (this.index + this.size > this.avatars.length)
            this.index = this.avatars.length - 20;
        if (this.index < 0)
            this.index = 0;
        this.items = [];
        for (var k = 0; k < Math.min(this.size, this.avatars.length); k++) {
            if (k + this.index < this.avatars.length)
                this.items.push({
                    title: this.avatars[k + this.index][1],
                    picture: this.avatars[k + this.index][2]
                });
        }
    };
    LoginavatarPage.prototype.changeCategory = function (evt) {
        var _this = this;
        this.currentCategory = evt.value;
        if (evt.value == "pixels") {
            var pseudos = ["loulou", "riri", "fifi", "coco", "kevin", "bryan", "gégé"];
            this.pseudo = pseudos[Maintools_1.tirage(pseudos.length)];
            this.change_sexe("Male");
            this.gen_avatar(true);
        }
        else {
            this.picture = "";
            if (this.currentCategory == "pro") {
                this.api.getAvatarsPro(36, this.pseudo).subscribe(function (rep) {
                    _this.avatars = [];
                    var items = rep.avatars.split("#;#");
                    items.forEach(function (s) {
                        _this.avatars.push(["pro", "", _this.sanitizer.bypassSecurityTrustResourceUrl(s)]);
                    });
                    _this.index = 0;
                    _this.changeAvatar(0);
                });
            }
            else {
                this.api.getAvatars(evt.value).subscribe(function (rep) {
                    _this.avatars = rep.items;
                    _this.index = Maintools_1.tirage(rep.items.length - 20);
                    _this.changeAvatar(0);
                    _this.refresh_avatar();
                });
            }
        }
    };
    LoginavatarPage.prototype.gen_avatar = function (save, func) {
        var _this = this;
        if (func === void 0) { func = null; }
        this.api.avatargenerator(this.pseudo, this.female, save).subscribe(function (r) {
            if (r != null)
                _this.picture = r.url;
            if (func != null)
                func();
        });
    };
    LoginavatarPage.prototype.change_sexe = function (val) {
        this.female = false;
        if (val.value == "Female")
            this.female = true;
        this.gen_avatar(false);
    };
    LoginavatarPage.prototype.refresh_avatar = function () {
        var _this = this;
        if (this.pseudo != null && this.pseudo.indexOf("@gtest.com") > -1)
            this.notRobot = true;
        if (this.currentCategory == "pixels" || this.currentCategory == "pro") {
            clearTimeout(this.handle);
            this.handle = setTimeout(function () {
                if (_this.currentCategory == "pixels")
                    _this.gen_avatar(false);
                else
                    _this.changeCategory({ value: "pro" });
            }, 1000);
        }
    };
    LoginavatarPage.prototype.resolved = function (event) {
        this.notRobot = true;
    };
    LoginavatarPage.prototype.openGallery = function (gal) {
        var size = 40;
        var start = Math.max(1, this.index);
    };
    __decorate([
        core_1.ViewChild("container"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginavatarPage.prototype, "container", void 0);
    LoginavatarPage = __decorate([
        core_1.Component({
            selector: 'page-loginavatar',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\loginavatar\loginavatar.html"*/'<!--\n  Generated template for the LoginavatarPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <shifutitle [menu]="false" [back]="true" title="LOGINAVATAR.TITLE">\n    <shifubutton *ngIf="notRobot && pseudo.length>0" id="cmdSave"\n                 [small]="true" label="LIB.SAVE"\n                 (click)="anonymousLogin()"></shifubutton>\n    <shifubutton id="cmdClose" [small]="true" id="btnClose" icon="close" (click)="this.viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n\n</ion-header>\n\n\n<ion-content text-center #container no-padding style="background-size: cover ;vertical-align: middle;background-position:0% 0%;background-repeat:no-repeat;">\n\n  <ion-item *ngIf="message!=null && message.length>0" text-center text-wrap no-lines>{{message | translate}}<br></ion-item>\n\n    <shifubuttongroup\n      id="btnCategory"\n      [exclude]="true"\n      labels="FunkoPop,Pokemon,Emoticons,Pixels,Pro"\n      values="figurinepop,pokemon,emoji,pixels,pro"\n      [default]="sel_category"\n      (onchange)="changeCategory($event)">\n    </shifubuttongroup>\n\n  <ion-item no-padding no-margin no-lines text-center text-wrap style="height:250px">\n    <img style="width:70%;margin:15%;" [src]="picture" *ngIf="currentCategory==\'pixels\'">\n    <shifugallery *ngIf="currentCategory!=\'pixels\'"\n                  size="20%"\n                  [images]="items"\n                  (onclick)="selAvatar($event)">\n    </shifugallery>\n  </ion-item>\n    <ion-item no-lines no-padding no-margin *ngIf="currentCategory!=\'pixels\'" text-center >\n          <ion-icon style="font-size: 50px;" name="arrow-dropleft" color="secondary" (click)="changeAvatar(-5)"></ion-icon>\n          &nbsp;&nbsp;&nbsp;\n          <ion-icon style="font-size: 50px;" name="arrow-dropright" color="secondary" (click)="changeAvatar(5)"></ion-icon>\n    </ion-item>\n\n\n  <shifubuttongroup\n    *ngIf="currentCategory==\'random\'"\n    [exclude]="true" labels="LIB.MALE,LIB.FEMALE"\n    values="Male,Female"\n    (onchange)="change_sexe($event)">\n  </shifubuttongroup>\n\n  <shifuinput\n    id="txtPseudo"\n    *ngIf="navParams.data.pseudo==true || settings.ihm==\'pro\'" size="30"\n    label="Votre pseudo ?" [(ngModel)]="pseudo"\n    (onchange)="refresh_avatar()"\n    (onenter)="anonymousLogin()">\n  </shifuinput><br>\n\n  <ion-item text-center no-lines>\n    <re-captcha\n            style="display:inline-block"\n            *ngIf="notRobot==false"\n            (resolved)="resolved($event)"\n            siteKey="6Lcqr20UAAAAABiUyOK8i2AD52Gvg81YrsJdvxSV">\n    </re-captcha>\n\n    <shifubutton\n            *ngIf="notRobot && pseudo.length>0"\n            label="LIB.SAVE"\n            (click)="anonymousLogin()">\n    </shifubutton><br>\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\loginavatar\loginavatar.html"*/,
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer,
            ionic_angular_2.NavController, ionic_angular_2.NavParams, ionic_angular_2.AlertController, api_1.ApiProvider,
            ionic_angular_1.ViewController, user_data_1.UserData, settings_1.SettingsProvider,
            ionic_angular_1.ToastController, core_2.TranslateService, ionic_angular_1.Platform])
    ], LoginavatarPage);
    return LoginavatarPage;
}());
exports.LoginavatarPage = LoginavatarPage;
//# sourceMappingURL=loginavatar.js.map

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var labels_1 = __webpack_require__(314);
exports.REFRESH_INTERVAL = 10; //10 secondes de rafraichissement
exports.IMAGE_PROXY = "https://images.weserv.nl/?url=/";
exports.DELAY_TO_REFRESH = 500;
exports.ADMIN_PASSWORD = "hh4271";
exports.ORDER_BETS = "bets";
exports.ORDER_CHARTS = "charts";
exports.ORDER_TWEET = "tweet";
exports.ORDER_CHARTSCREDIT = "charts_credit";
exports.ORDER_USER = "user";
exports.ORDER_BOARD = "board";
exports.ORDER_ALERT = "alert";
exports.ORDER_PLAYLIST = "playlist";
exports.ORDER_SCREEN = "screen";
exports.ORDER_COMMAND = "command";
exports.ORDER_EVENT = "event";
exports.ORDER_STOPREMOTEPLAYER = "stopremoteplayer";
exports.ORDER_PLAYREMOTEPLAYER = "playremoteplayer";
exports.ORDER_PHOTO = "photo";
exports.ORDER_SANITY = "sanity";
exports.TORRENT = 0;
exports.DEEZER = 1;
exports.SPOTIFY = 2;
exports.LOCAL = 4;
exports.YOUTUBE = 3;
exports.CLOUD_DRIVE = 5;
exports.CLOUD_DROPBOX = 6;
exports.CLOUD_MEGA = 7;
exports.TYPE_MESSAGE = 1;
exports.TYPE_PHOTO = 0;
exports.TYPE_VIDEO = 2;
exports.TYPE_SONG = 3;
exports.TYPE_BET = 4;
exports.TYPE_SONDAGE = 5;
exports.TYPE_QUESTION = 9;
exports.INVITE_GENERAL = 1;
exports.INVITE_BET = 4;
exports.INVITE_SURVEY = 5;
exports.INVITE_PHOTO = 2;
exports.INVITE_PLAYLIST = 3;
exports.PROFIL_PERSO = 0; //Correspond à un perso
exports.PROFIL_PROPRIVE = 1; //Correspond à l'evenementiel d'une entreprise
exports.PROFIL_PROPUBLIC = 4; //Correspond à un cafetier, restaurateur
exports.PROFIL_ADMIN = 10; //Correspond à un cafetier, restaurateur
exports.MUSICSERVER_SPOTIFY = 0;
exports.MUSICSERVER_DEEZER = 1;
exports.MUSICSERVER_LOCAL = 2;
exports.MUSICSERVER_YOUTUBE = 3;
exports.MUSICSERVER_PERSO = 4;
exports.email = null;
exports.user = null;
exports.from = null;
exports.myevent = null;
exports.DOMAIN_APPLI = window.location.origin + window.location.pathname.substr(0, window.location.pathname.length - 1);
exports.DOMAIN_SERVER = 'https://shifumixweb.appspot.com:443';
exports.SOCKET_SERVER = 'wss://localhost:4567';
exports.VERSION_API = "/v1";
exports.ROOT_API = exports.DOMAIN_SERVER + "/_ah/api";
var DEEZER_KEY = "190762";
var DEFAULT_ACTIVITIES = ["survey", "message", "music", "photo", "command"];
var DELAY_TUTO = 10; //10 minutes
var REFRESH_DELAY = 5000;
var DEBUG = true;
exports.SPOTIFY_SERVER = 0;
exports.DEEZER_SERVER = 1;
exports.LOCAL_SERVER = 2;
exports.YOUTUBE_SERVER = 3;
/**
 * Created by hhoar on 10/18/2017.
 */
/**
 * Définition des modes de fonctionnement
 * @param {string} type
 */
function setServer(type) {
    //localStorage.setItem("server",type);
    //DOMAIN_APPLI = "http://shifumixweb.appspot.com:443";
    //Fonctionnement server : mode standard
    exports.DOMAIN_APPLI = window.location.origin + window.location.pathname.substr(0, window.location.pathname.length - 1);
    exports.DOMAIN_SERVER = 'https://shifumixweb.appspot.com:443';
    exports.VERSION_API = "/v1";
    if (type == "local")
        exports.DOMAIN_SERVER = "http://localhost:8080";
    if (type == "beta") {
        exports.DOMAIN_SERVER = 'https://v0-dot-shifumixweb.appspot.com:443';
    }
    //DOMAIN_APPLI = "http://81.220.41.19:8000";
    exports.ROOT_API = exports.DOMAIN_SERVER + "/_ah/api";
}
exports.setServer = setServer;
function getCGU() {
}
exports.getCGU = getCGU;
function extract(str, start, end) {
    var i = str.indexOf(start) + start.length;
    var j = str.length;
    if (i < start.length)
        i = 0;
    if (end.length > 0) {
        j = str.indexOf(end, i);
        if (j == -1)
            return ("");
    }
    return (str.substring(i, j));
}
exports.extract = extract;
function getParam() {
    var vars = {};
    window.location.href.replace(location.hash, '')
        .replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function (m, key, value) { return vars[key] = value !== undefined ? value : ''; });
    return vars;
}
exports.getParam = getParam;
// function informe(s, waiting, zone) {
//   if (document.body == null)return;
//
//   zone = zone || "lblMessage";
//
//   if (s == null || s == undefined) {
//     s = this.getParam()["message"];
//     if (s != undefined)
//       while (s.indexOf("%20") != -1)s = s.replace("%20", " ");
//   }
//
//   /*
//    if($scope!=undefined && $scope.message!=undefined){
//    $scope.message=s;
//    return;
//    }
//    */
//
//   var lblMessage = document.getElementById(zone);
//   if (lblMessage == null) {
//     document.body.innerHTML = "<div id='" + zone + "'></div>" + document.body.innerHTML;
//     lblMessage = document.getElementById(zone);
//   }
//
//   lblMessage.innerHTML = "<img id='pctWaiting' src='../img/wait.gif'>";
//   var pctWaiting = document.getElementById("pctWaiting");
//   var idTimeout = 0
//
//   if (waiting) {
//     pctWaiting.style.visibility = "visible";
//     window.clearTimeout(idTimeout);
//   } else {
//     pctWaiting.style.visibility = "hidden";
//     idTimeout = window.setTimeout(function () {
//       lblMessage.innerHTML = "";
//     }, 4000);
//   }
//
//   if (s == undefined) s = "";
//   s = s.replace("%danger", "<img class='small-icon' src='/img/danger.gif'>");
//   lblMessage.innerHTML += s;
// }
function $(id) {
    return document.getElementById(id);
}
exports.$ = $;
function $$(s, obj) {
    if (obj === void 0) { obj = undefined; }
    if (s == null)
        return;
    var dt = new Date().getMinutes() + ":" + new Date().getSeconds();
    if (s.indexOf("!") == 0)
        alert(s.substr(1));
    var message = dt + " : " + s;
    console.log(message);
    //Sortie sur l'écran du terminal
    if (getParam().debug == "screen") {
        if ($("console") == null) {
            var _div = document.createElement('div');
            _div.id = "console";
            _div.style.cssText = "display:block;position:absolute;left:0;top:0;width:200px;height:200px;z-index:100;backgroundColor:none;opacity:0.5;";
            document.body.appendChild(_div);
        }
        $("console").innerHTML = $("console").innerHTML + "<br>" + message;
    }
    if (obj != undefined && obj != null)
        console.log(obj);
    // if (obj != undefined && obj!=null) {
    //   var rc = "";
    //   for (var p in obj)rc += p + ":" + obj[p] + " ";
    //   console.log(rc);
    // }
}
exports.$$ = $$;
function base64ToArrayBuffer(base64) {
    base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
    var binaryString = atob(base64);
    var len = binaryString.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}
exports.base64ToArrayBuffer = base64ToArrayBuffer;
function addText(ctx, x, y, color, textsize, text, maxlx) {
    ctx.lineWidth = 1;
    ctx.fillStyle = color;
    ctx.lineStyle = color;
    //ctx.font=textsize+"px sans-serif";
    ctx.font = (textsize) + "px 'Architects Daughter'";
    var metrics = ctx.measureText(text);
    metrics.height = textsize;
    if (maxlx && metrics.width > maxlx) {
        var pos = text.length / 2;
        while (text.substring(pos, pos + 1) != " " && pos > 0)
            pos--;
        var s = text.substring(0, pos);
        ctx.fillText(s, x - 5, y);
        ctx.fillText(text.substring(pos + 1), x - 5, y + textsize + 4);
        metrics.height += textsize + 4;
    }
    else
        ctx.fillText(text, x - 5, y + textsize / 2);
    return (metrics);
}
/**
 * Inscription d'un onglet aux événements pour déclenchement du refresh de la fenêtre
 * @param {string} event
 * @param vm
 */
function subscribe(event, vm, delay) {
    if (delay === void 0) { delay = exports.DELAY_TO_REFRESH; }
    vm.events.subscribe(event, function () {
        $$("Appel de refresh pour " + event);
        clearTimeout(vm.handleRefresh);
        vm.handleRefresh = setTimeout(function () { vm.refresh(); }, delay);
    });
}
exports.subscribe = subscribe;
function resize_image(i, maxlen, angle) {
    var ratio = Math.max(i.width, i.height);
    ratio = maxlen / ratio;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    var radian = angle * Math.PI / 180;
    var lx = i.width;
    var ly = i.height;
    canvas.width = lx * ratio;
    canvas.height = ly * ratio;
    ctx.rotate(radian);
    //ctx.scale(ratio,ratio);
    //ctx.rect(0,0,lx*2,ly*2);
    ctx.drawImage(i, 0, 0, lx, ly, 0, 0, lx * ratio, ly * ratio);
    //return ctx.getImageData(0,0,maxlen,maxlen);
    return canvas.toDataURL("image/png");
}
function iOS() {
    var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ];
    if (!!navigator.platform) {
        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()) {
                return true;
            }
        }
    }
    return false;
}
//http://stackoverflow.com/questions/2303690/resizing-an-image-in-an-html5-canvas
//returns a function that calculates lanczos weight
function lanczosCreate(lobes) {
    return function (x) {
        if (x > lobes)
            return 0;
        x *= Math.PI;
        if (Math.abs(x) < 1e-16)
            return 1;
        var xx = x / lobes;
        return Math.sin(x) * Math.sin(xx) / x / xx;
    };
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
function distance_spherique(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //noinspection UnnecessaryLocalVariableJS
    var d = R * c; // Distance in km
    return d;
}
// function wait(ms) {
//   var start = new Date().getTime();
//   var end = start;
//   while (end < start + ms) {
//     end = new Date().getTime();
//   }
// }
/*
 var androidPayPaymentMethod = {
 supportedMethods: ['https://android.com/pay'],
 data: {
 merchantName: 'Shifumix',
 merchantId: '11381708135174882060',
 environment: 'TEST',
 allowedCardNetworks: ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'],
 paymentMethodTokenizationParameters: {
 tokenizationType: 'GATEWAY_TOKEN',
 parameters: {
 'gateway': 'stripe',
 'stripe:publishableKey': 'xx_demo_xxxxxxxxxxxxxxxxxxxxxxxx',
 'stripe:version': '2016-07-06',
 },
 },
 },
 };
 var visaPayPaymentMethod = {
 supportedMethods: ['visa'],
 data:{
 paymentMethodTokenizationParameters: {
 tokenizationType: 'GATEWAY_TOKEN',
 parameters: {
 'gateway': 'stripe',
 'stripe:publishableKey': 'pk_live_P5118hSqA6cV0kipKmMmd9Wu',
 'stripe:version': '2016-07-06',
 },
 }
 }};
 */
//Array.prototype.insert = function (index, item) {this.splice(index, 0, item);};
function loadLink(url, type, type_doc) {
    var x = document.createElement("LINK");
    x.setAttribute("rel", type_doc);
    x.setAttribute("type", type);
    x.setAttribute("href", url);
    document.head.appendChild(x);
}
function loadScript(url, callback, func_failed) {
    if (func_failed === void 0) { func_failed = null; }
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.addEventListener("readystatechange", callback);
    script.onerror = func_failed;
    script.onload = callback;
    head.appendChild(script);
}
function objToStrMap(obj) {
    var strMap = new Map();
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var k = _a[_i];
        strMap.set(k, obj[k]);
    }
    return strMap;
}
function MapToStr(obj) {
    var rc = "";
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var k = _a[_i];
        rc += k + "=" + obj[k] + "&";
    }
    return rc.substr(0, rc.length - 1);
}
function api(service, param, encode) {
    if (encode === void 0) { encode = true; }
    if (encode)
        param = encodeURI(param);
    return (exports.ROOT_API + '/shifumix' + exports.VERSION_API + "/" + service + "?" + param);
}
exports.api = api;
function httpGet(service, func, func_error, asynchron) {
    if (func_error === void 0) { func_error = null; }
    if (asynchron === void 0) { asynchron = true; }
    if (asynchron == undefined)
        asynchron = true;
    var xhr = new XMLHttpRequest();
    if (service.indexOf("http") != 0)
        service = exports.ROOT_API + '/shifumix' + exports.VERSION_API + '/' + service;
    xhr.open('GET', service, asynchron);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var resp = { status: xhr.status, result: "" };
            if (xhr.status != 404 && xhr.responseText.length > 0) {
                if (xhr.responseText.indexOf("{") == 0)
                    resp.result = JSON.parse(xhr.responseText);
                else
                    resp.result = xhr.responseText;
            }
            if (func != undefined)
                func(resp);
        }
        else if (func_error != undefined)
            func_error(xhr);
    };
    xhr.send();
}
exports.httpGet = httpGet;
function _hasPopupBlocker(poppedWindow) {
    var result = false;
    try {
        if (typeof poppedWindow == 'undefined') {
            // Safari with popup blocker... leaves the popup window handle undefined
            result = true;
        }
        else if (poppedWindow && poppedWindow.closed) {
            // This happens if the user opens and closes the client window...
            // Confusing because the handle is still available, but it's in a "closed" state.
            // We're not saying that the window is not being blocked, we're just saying
            // that the window has been closed before the test could be run.
            result = false;
        }
        else if (poppedWindow && poppedWindow.test) {
            // This is the actual test. The client window should be fine.
            result = false;
        }
        else {
            // Else we'll assume the window is not OK
            result = true;
        }
    }
    catch (err) {
        //if (console) {
        //    console.warn("Could not access popup window", err);
        //}
    }
    return result;
}
function trunc(n) {
    var s = n + ".0";
    return Number(s.split(".")[0]);
}
/**
 * shoz the delay between a date and now with a perfect format
 * @param dtStart
 * @param lang
 * @param label_day
 * @returns {*}
 */
function getDelay(dtStart, lang, label_day, serverNow) {
    if (lang === void 0) { lang = "en"; }
    if (label_day === void 0) { label_day = "jours"; }
    if (serverNow === void 0) { serverNow = null; }
    if (dtStart == undefined)
        return "";
    if (serverNow == null)
        serverNow = new Date().getTime();
    var delay = Math.abs(dtStart - serverNow);
    if (delay > 24 * 3600 * 1000) {
        var nbJours = trunc(delay / (24 * 3600 * 1000));
        return nbJours + " " + label_day;
    }
    if (lang == undefined)
        lang = "fr";
    var affichage = new Date(delay).toUTCString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    if (affichage.indexOf("00:") == 0)
        affichage = affichage.split(":")[1] + ":" + affichage.split(":")[2];
    else
        affichage = affichage.split(":")[0] + "h" + affichage.split(":")[1];
    return affichage;
}
exports.getDelay = getDelay;
function message(s) {
    if (s.substr(0, 1) == "!")
        s = "<img src='./assets/img/wait.gif'>" + s.substr(1, s.length - 1);
    var zone = document.getElementById("message");
    if (zone != null)
        zone.innerHTML = s;
}
var hTimeout;
function _copy(obj1) {
    return Object.assign({}, obj1);
}
exports._copy = _copy;
function transfert(obj1, obj2, strict_copy) {
    if (strict_copy === void 0) { strict_copy = true; }
    if (obj1 == undefined)
        return null;
    if (obj2 == undefined)
        obj2 = JSON.parse(JSON.stringify(obj1));
    else {
        for (prop in obj1)
            obj2[prop] = JSON.parse(JSON.stringify(obj1[prop]));
        if (strict_copy)
            for (var prop in obj2)
                if (!obj1.hasOwnProperty(prop))
                    delete obj2[prop];
    }
    return obj2;
}
exports.transfert = transfert;
function init() {
    if (gapi.client == null) {
        hTimeout = setTimeout(init, 10000);
    }
    else {
        clearTimeout(hTimeout);
        gapi.load("client", function () {
            gapi.client.load('shifumix', exports.VERSION_API, function () {
                exports.shifumix = gapi.client["shifumix"];
                //gapi.client.get('urlshortener', 'v1',function(){
                //  gapi.client.get('youtube', 'v3', function() {
                //setTimeout(function(){start()},1500);
                //return;
                //});
                //});
                $$("gapi loaded. Start call");
            }, exports.ROOT_API);
        });
    }
}
// export function removeWhite(src:string,func) {
//   let canvas:any  = document.createElement("canvas");
//   let ctx:any = canvas.getContext("2d");
//
//   let img=document.createElement("img");
//   img.src=src;
//   img.onload=()=>{
//
//     canvas.height = img.height;
//     canvas.width = img.width;
//
//     ctx.drawImage(img,0,0);
//
//     var imgd = ctx.getImageData(0, 0, img.width, img.height)
//     let pix = imgd.data
//     newColor = {r:0,g:0,b:0, a:0};
//
//     for (var i = 0, n = pix.length; i <n; i += 4) {
//       let r = pix[i];
//       let  g = pix[i+1];
//       let  b = pix[i+2];
//
//       if(r == 255&& g == 255 && b == 255){
//         // Change the white to the new color.
//         pix[i] = newColor.r;
//         pix[i+1] = newColor.g;
//         pix[i+2] = newColor.b;
//         pix[i+3] = newColor.a;
//       }
//     }
//
//     ctx.putImageData(imgd, 0, 0);
//     func(canvas.toDataURL("image/png"));
//   }
//
// }
// function adduser(infos,method,func=null){
//   var s=JSON.stringify(infos);
//   try{
//     shifumix.adduser({user_object:s,method:method}).then(func);
//   } catch (e){
//     httpGet("adduser?user_object="+JSON.stringify(infos)+"&method="+method,func);
//   }
// }
//
// function autoconnexion(user,event,type_invite,sc,func){
//   shifumix.autoconnexion({user:user,type_invite:type_invite,event:event,sc:sc}).then(func);
// }
//
// function delevent(event,user,func){
//   shifumix.delevent({event:event,user:user}).then(func);
// }
//
// function closeevent(event,id,func){
//   shifumix.closeevent({event:event,user:id}).then(func);
// }
//
// function startevent(event,player,func){
//   shifumix.startevent({event:event,player:player}).then(func);
// }
//
// function getcurrentsong(evt,func){
//   shifumix.getcurrentsong({event:evt}).then(func);
// }
//
// function getsongtoplay(evt,playerid,sc,func){
//   try{
//     shifumix.getsongtoplay({event:evt,playerid:playerid,sc:sc}).then(func);
//   } catch (e){
//     httpGet("getsongtoplay?event="+evt,func);
//   }
// }
// function getvideotoplay(evt,playerid,sc,func){
//   shifumix.getsongtoplay({event:evt,playerid:playerid,sc:sc,filter:YOUTUBE}).then(func);
// }
//
//
// function gettopsongs(evt,nbr,func){
//   shifumix.gettopsongs({event:evt,nombre:nbr}).then(func);
// }
//
// function setspotifyplayer(evt,deviceid,name,func){
//   shifumix.setspotifyplayer({event:evt,deviceid:deviceid,devicename:name}).then(func);
// }
//
//
// function getmagnets(torrents,func){
//   shifumix.getmagnets({torrents:torrents}).then(func);
// }
//
// function addScore(user,score,func){
//   shifumix.addscore({user:user,score:score}).then(func);
// }
/**
 * supprime un token d'access
 * @param user
 * @param token
 * @param func
 * @return Retourne le user
 */
// function revoketoken(user,token,func){
//   shifumix.revoketoken({user:user,token:token}).then(func);
// }
//
// function getplayedsong(event,func){
//   shifumix.getplayedsong({event:event}).then(func);
// }
/**
 * permet de rejoindre un evenemnt
 * @param event
 * @param email
 * @param password
 * @param message
 * @param from
 * @param dest ecran de destination
 * @param position
 * @param type_invite
 * @param func
 */
function join(items, sep) {
    var rc = "";
    items.forEach(function (it) {
        rc += it + sep;
    });
    return rc.substring(0, rc.length - 1);
}
exports.join = join;
// function join(event,email,password,message,from,position,type_invite,dest,func){
//   try{
//     shifumix.join({ type_invite:type_invite,
//       position:position,dest:dest,
//       event:event,user:email,
//       password:password,from:from,message:message}).then(func);
//   } catch (e){
//     httpGet("join?event="+event+"&user="+email+"&password="+password+"&from="+from,func);
//   }
// }
//
//
// function getwidgets(user,activities,func){
//   shifumix.getwidgets({user:user,activities:activities}).then(func);
// }
//
//
// function querymusic(query,func){
//   shifumix.querymusic({query:query}).then(func);
// }
//
// function geteventfiles(event,func){
//   shifumix.geteventfiles({event:event}).then(func);
// }
//
// function findeventwithcode(code,func){
//   shifumix.findeventwithcode({code:code}).then(func);
// }
//
//
// export function getuser(user,func){
//   shifumix.getuser({user:user}).then(func);
// }
//
// function updatetarif(user,tarif,func){
//   shifumix.updatetarif({user:user,tarif:tarif}).then(func);
// }
//
// function getAllTarifs(func){
//   shifumix.getalltarifs().then(func);
// }
//
// function getwidget(widget,func){
//   shifumix.getwidget({widget:widget}).then(func);
// }
//
// function addtofavoritewidget(widget,user,func){
//   shifumix.addtofavoritewidget({widget:widget,user:user}).then(func);
// }
//
// function delfavoritewidget(widget,user,func){
//   shifumix.delfavoritewidget({widget:widget,user:user}).then(func);
// }
//
//
// function initevent(user,modele,func){
//   if(modele==null)
//     shifumix.initevent({user:user}).then(func);
//   else{
//     var req= gapi.client.request({
//       path: ROOT_API+'/shifumix/'+VERSION_API+'/initeventwithmodele',
//       method: 'POST',
//       params: {user:user},
//       body:modele
//     }).then(func);
//   }
// }
//
// function sharefile(svg,user,func){
//   var req= gapi.client.request({
//     path: ROOT_API+'/shifumix/'+VERSION_API+'/sharefile',
//     method: 'POST',
//     params: {user:user},
//     body:svg
//   }).then(func);
// }
//
//
// export function fusion(obj,func){
//   shifumix.fusion(obj).then(func);
// }
//
//
//
// function openAccess(service,user,func){
//   shifumix.openaccess({service:service,user:user}).then(func);
// }
//
//
//
// function getdevices(event,func){
//   shifumix.getdevices({event:event}).then(func);
// }
//
// function addboardtophoto(event,func){
//   shifumix.addboardtophoto({event:event}).then(func);
// }
//
// function sendcustomercommand(event,command,func){
//   var req= gapi.client.request({
//     path: ROOT_API+'/shifumix/'+VERSION_API+'/sendcustomercommand',
//     method: 'POST',
//     params: {event:event},
//     body:command
//   }).then(func);
// }
//
// /*
//  function getmenu(event,func){
//  shifumix.getmenu({event:event}).then(func);
//  }
//  */
//
//
// function autostartwithspotify(event,delay,func){
//   shifumix.autostartwithspotify({event:event,delay:delay}).then(func);
// }
//
//
// function loginbyemail(email,password,func){
//   try{
//     shifumix.loginbyemail({email:email,password:password}).then(func);
//   } catch (e){
//     httpGet("loginbyemail?email="+email+"&password="+password,func);
//   }
// }
//
// function sharebet(userid,betid,dest,url,func){
//   try{
//     shifumix.sharebet({url:url,user:userid,dest:dest,bet:betid}).then(func);
//   } catch (e){
//     httpGet("sharebet?user="+userid+"&bet="+betid,func);
//   }
// }
//
// function sharephoto(userid,photoid,dest,url,func){
//   try{
//     shifumix.sharephoto({user:userid,dest:dest,photo:photoid,url:url}).then(func);
//   } catch (e){
//     httpGet("sharephoto?user="+userid+"&photo="+photoid,func);
//   }
// }
//
//
// function removebet(userid,betid,func){
//   try{
//     shifumix.removebet({user:userid,bet:betid}).then(func);
//   } catch (e){
//     httpGet("removebet?user="+userid+"&bet="+betid,func);
//   }
// }
//
// function closebet(userid,betid,func){
//   shifumix.closebet({user:userid,bet:betid}).then(func);
// }
//
//
// /*
//  function getMessages(event,dt,func){
//  shifumix.getmessages({event:event,date:dt}).then(func);
//  }
//  */
//
// function getMessage(message,func){
//   shifumix.getmessage({message:message}).then(func);
// }
//
//
//
//
// function getImageForFlyer(user,source,query,lat,lng,func){
//   shifumix.getimageforflyer({user:user,source:source,query:query,lat:lat,lng:lng}).then(func);
// }
//
//
// function getphotofromdelay(event,delay,func){
//   shifumix.getphotofromdelay({event:event,delay:delay}).then(func);
// }
//
//
// function resetSecretCode(event,func){
//   shifumix.resetsecretcode({event:event}).then(func);
// }
//
//
// function delmessage(userid,id,func){
//   shifumix.delmessage({user:userid,message:id}).then(func);
// }
//
// function validatemessage(id,tags,func){
//   shifumix.validatemessage({message:id,tags:tags}).then(func);
// }
//
// function validate(loterie,user,func){
//   shifumix.validate({loterie:loterie,user:user}).then(func);
// }
//
//
// function blacklist(user,func){
//   shifumix.blacklist({user:user}).then(func);
// }
//
// function getPresents(event,all,func){
//   try{
//     shifumix.getpresents({event:event,all:all}).then(func);
//   } catch (e){
//     httpGet("getpresents?event="+event+"&all="+all,func);
//   }
// }
//
// function addfriendsemail(user,email,func){
//   try{
//     shifumix.addfriendsemail({user:user,email:email}).then(func);
//   } catch (e){
//     httpGet("addfriendsemail?user="+user+"&email="+email,func);
//   }
// }
//
// function delfriendsemail(user,email,func){
//   try{
//     shifumix.delfriendsemail({user:user,email:email}).then(func);
//   } catch (e){
//     httpGet("delfriendsemail?user="+user+"&email="+email,func);
//   }
// }
//
//
// function addFollower(user,idfollower,func){
//   try{
//     shifumix.addfollower({user:user,follower:idfollower}).then(func);
//   } catch (e){
//     httpGet("addfollower?user="+user+"&follower="+email,func);
//   }
// }
//
// function getFacebookPageAndEvents(user,func){
//   shifumix.getfacebookpageandevents({user:user}).then(func);
// }
//
// function getstory(event,tags,dtLastConnexion,func){
//   shifumix.getstory({event:event,tags:tags,since:dtLastConnexion}).then(func);
// }
//
// /*
//  function checkspotify(event,func){
//  shifumix.checkspotify({event:event}).then(func);
//  }
//  */
//
//
// function getflyer(event,func){
//   try{
//     shifumix.getflyer({event:event}).then(func);
//   } catch (e){
//     httpGet("getflyer?event="+event,func);
//   }
// }
//
// function geteventinfos(event,func) {
//   shifumix.geteventinfos({event: event}).then(func);
// }
//
//
// function encodeimage(url,func) {
//   shifumix.encodeimage({url: url}).then(func);
// }
//
// function rotatephoto(photoid,angle,event,func) {
//   shifumix.rotatephoto({event:event,photo:photoid,angle:angle}).then(func);
// }
//
//
// // function createplaylist(event,service,func) {
// //   shifumix.createplaylist({event: event,service:service}).then(func);
// // }
//
// function delFollower(user,idfollower,func){
//   try{
//     shifumix.delfollower({user:user,follower:idfollower}).then(func);
//   } catch (e){
//     httpGet("delfollower?user="+user+"&follower="+email,func);
//   }
// }
//
// function getBets(user,event,onlyActif,bPattern,tags,func){
//   var sTags=tags.join(";");
//   try{
//     shifumix.getbets({user:user,event:event,actif:onlyActif,pattern:bPattern,tags:sTags}).then(func);
//
//   } catch (e){
//     httpGet("getbets?event="+event,func);
//   }
// }
//
// function addOrder(event,order,func){
//   try{
//     shifumix.addorder({event:event,order:order}).then(func);
//   } catch (e){
//     httpGet("addorder?event="+event+"&order="+order,func);
//   }
// }
/**
 * retourne la derniere photo publié
 * @param event
 * @param all si faux uniquement les photos validées sont retournées
 * @param func
 */
function getLastPhoto(user, event, all, func) {
    try {
        exports.shifumix.lastphoto({ user: user, all: all, event: event }).then(func);
    }
    catch (e) {
        httpGet("lastphoto?event=" + event, func);
    }
}
function getplaylist(event, func) {
    exports.shifumix.getplaylist({ event: event }).then(func);
}
function delwidget(user, widget, func) {
    exports.shifumix.delwidget({ user: user, widget: widget }).then(func);
}
function shareevent(idmessage, event, dests, from, name, func) {
    exports.shifumix.shareevent({
        event: event,
        dests: dests,
        from: from,
        name: name,
        message: idmessage
    }).then(func);
}
function mailtosend(readonly, func) {
    try {
        exports.shifumix.mailtosend({ readonly: readonly, password: 'hh4271' }).then(func);
    }
    catch (e) {
        httpGet("mailtosend?password=hh4271&readonly=" + readonly, func);
    }
}
function slideshow(delay, event, func) {
    try {
        exports.shifumix.slideshow({ delay: delay, event: event }).then(func);
    }
    catch (e) {
        httpGet("slideshow?event=" + event + "&delay=" + delay, func);
    }
}
/**
 *
 * @param event
 * @param delay en seconde
 * @param func
 */
function getdraws(event, x, y, lx, ly, func) {
    x = Math.round(x);
    y = Math.round(y);
    lx = Math.round(lx);
    ly = Math.round(ly);
    exports.shifumix.getdraws({ event: event, x: x, y: y, lx: lx, ly: ly }).then(func);
}
function stopcurrentsong(event, func) {
    exports.shifumix.stopcurrentsong({ event: event }).then(func);
}
function zipphotos(event, func) {
    exports.shifumix.zipphotos({ event: event }).then(func);
}
function addsongsauto(event, number, func) {
    exports.shifumix.addsongsauto({ event: event, nsongs: number }).then(func);
}
function quit(iduser, event, func) {
    exports.shifumix.quit({ user: iduser, event: event }).then(func);
}
function updateevent(event, field, value, func) {
    exports.shifumix.updateevent({ event: event, value: value, field: field }).then(func);
}
function updateevent_sync(event, field, value) {
    if (value == null)
        httpGet("updateevent?event=" + event + "&field=" + field, null, null, false);
    else
        httpGet("updateevent?event=" + event + "&field=" + field + "&value=" + value, null, null, false);
}
function raz(complete, func) {
    try {
        exports.shifumix.raz({ complete: complete }).then(func);
    }
    catch (e) {
        httpGet("raz?complete=" + complete, func);
    }
}
function setreputation(betid, userid, note, func) {
    try {
        exports.shifumix.setreputation({ user: userid, bet: betid, value: note }).then(func);
    }
    catch (e) {
        httpGet("setreputation?user=" + userid + "&bet=" + betid, func);
    }
}
function razlocalfile(computer_id, func) {
    exports.shifumix.razlocalfile({ server: computer_id }).then(func);
}
function sanity(event, delayMin, options, func) {
    var libOpt = "";
    if (options != undefined)
        libOpt = "&options=" + options;
    if (event == null || event == undefined)
        httpGet(exports.DOMAIN_SERVER + "/sanity?delay=" + delayMin + libOpt, func);
    else
        httpGet(exports.DOMAIN_SERVER + "/sanity?event=" + event + libOpt, func);
}
function gettweetsfromhtag(event, func) {
    exports.shifumix.gettweetsfromhtag({ event: event }).then(func);
}
function geteventsaround(pos, distance, func) {
    try {
        exports.shifumix.geteventsaround({ lat: pos.lat, lng: pos.lng, distance: distance }).then(function (resp) {
            if (resp.status == 200)
                func(resp.result.items);
        });
    }
    catch (e) {
        httpGet("geteventsaround?lat=48&lng=2", func);
    }
}
function geteventssince(sinceInHour, func) {
    exports.shifumix.geteventssince({ since: sinceInHour }).then(func);
}
function allserver(func) {
    httpGet("allserver?password=hh4271", function (resp) {
        if (resp.status == 200 && resp.result.hasOwnProperty("items"))
            func(resp.result.items);
        else
            func([]);
    });
}
function geteventsinsquare(sq, func) {
    try {
        exports.shifumix.geteventsinsquare({
            latmin: sq.getSouthWest().lat(),
            latmax: sq.getNorthEast().lat(),
            lngmin: sq.getSouthWest().lng(),
            lngmax: sq.getNorthEast().lng()
        }).then(func);
    }
    catch (e) {
        httpGet("geteventsinsquare?latmin=48&lngmin=2&latmax=49&lngmax=3", func);
    }
}
function shorturl(url, func) {
    //gapi.client.setApiKey(GOOGLE_API_KEY);
    //gapi.client.urlshortener.url.insert({longUrl:url}).then(func);
    //gapi.client.setApiKey(null);
    //url=encodeURIComponent(url);
    //shifumix.shortener({url:url}).then(function(resp){func(decodeURIComponent(resp.result.url));});
}
function closeplayer(event, razfile, func) {
    httpGet("closeplayer?event=" + event + "&razfile=" + razfile, func, null, false);
}
function geteventsfrom(iduser, filter, limit, func) {
    exports.shifumix.geteventsfrom({ user: iduser, filter: filter, limit: limit }).then(function (resp2) {
        if (resp2.status == 200)
            func(resp2.result.items);
    });
}
function getpersowidgets(user, func) {
    exports.shifumix.getpersowidgets({ user: user }).then(func);
}
function getrandomserver(type, func) {
    if (type === void 0) { type = "socket"; }
    exports.shifumix.getrandomserver({ password: "hh4271", type: type }).then(func);
}
function checkevent(event, func) {
    exports.shifumix.checkevent({ event: event }).then(func);
}
function loadcontacts(user, func) {
    exports.shifumix.loadcontacts({ user: user }).then(func);
}
function geteventspresent(user, func) {
    exports.shifumix.geteventspresent({ user: user }).then(function (resp2) {
        if (resp2.status == 200)
            func(resp2.result.items);
    });
}
function getevent(id, user, func) {
    if (user == null || user == undefined)
        exports.shifumix.getevent({ event: id }).then(func);
    else
        exports.shifumix.getevent({ event: id, user: user.id, lat: user.lat, lng: user.lng }).then(func);
}
function clearboard(event, url, func) {
    exports.shifumix.clearboard({ event: event, url: url }).then(func);
}
function getorders(id, user, func) {
    if (user == null || user == undefined)
        exports.shifumix.getorders({ event: id }).then(func);
    else
        exports.shifumix.getorders({ event: id, user: user.id }).then(func);
}
var boundary = '-------314159265358979323846';
var delimiter = "\r\n--" + boundary + "\r\n";
var close_delim = "\r\n--" + boundary + "--";
function httpPost(service, params, body, jauge, func) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', exports.ROOT_API + '/shifumix/' + exports.VERSION_API + '/' + service + "?" + params, true);
    /*
     xhr.upload.addEventListener("progress", function(e) {
     jauge.value=parseFloat(e.loaded / e.total * 100).toFixed(2);
     }, false);
     */
    xhr.onreadystatechange = function (e) {
        var obj = { result: "", status: 0 };
        if (xhr.readyState == 4) {
            if (xhr.responseText.length > 0)
                obj.result = JSON.parse(xhr.responseText);
            obj.status = 200;
            func(obj);
        }
    };
    xhr.send(JSON.stringify(body));
}
// function senduserphoto(user,photo,func){
//   var req= gapi.client.request({
//     path: ROOT_API+'/shifumix/'+VERSION_API+'/senduserphoto',
//     method: 'POST',
//     params: {user:user},
//     body:photo
//   }).then(func);
// }
//
// function senddraw(event,user,points,func_success){
//   var req= gapi.client.request({
//     path: ROOT_API+'/shifumix/'+VERSION_API+'/senddraw',
//     method: 'POST',
//     params: {event:event,user:user},
//     body:points
//   }).then(func_success);
// }
//
//
// function sendphoto(event,photo,func_success,func_rejected=undefined,func_progress=undefined){
//   var req= gapi.client.request({
//     path: ROOT_API+'/shifumix/'+VERSION_API+'/sendphoto',
//     method: 'POST',
//     params: {event:event},
//     body:photo
//   }).then(func_success,func_rejected,func_progress);
// }
//
// /**
//  * Tranforme un fichier base64 d'image en url contenant le fichier
//  * @param user
//  * @param photo
//  * @param func_success
//  * @param func_rejected
//  * @param func_progress
//  */
// function sendflyer(user,photo,func_success,func_rejected,func_progress){
//   var req= gapi.client.request({
//     path: ROOT_API+'/shifumix/'+VERSION_API+'/sendflyer',
//     method: 'POST',
//     params: {user:user},
//     body:photo
//   }).then(func_success,func_rejected,func_progress);
// }
//
//
//
// function sendvote(idmessage,vote,func_success,func_rejected,func_progress){
//   var req= gapi.client.request({
//     path: ROOT_API+'/shifumix/'+VERSION_API+'/sendvote',
//     method: 'POST',
//     params: {message:idmessage},
//     body:vote
//   }).then(func_success,func_rejected,func_progress);
// }
//
//
// function sendwidget(user,widget,func){
//   var req= gapi.client.request({
//     path: ROOT_API+'/shifumix/'+VERSION_API+'/sendwidget',
//     method: 'POST',
//     params: {user:user},
//     body:widget
//   }).then(func);
// }
//
//
// function sendbet(event,bet,func_success,func_rejected,func_progress){
//   var req= gapi.client.request({
//     path: ROOT_API+'/shifumix/'+VERSION_API+'/sendbet',
//     method: 'POST',
//     params: {event:event},
//     body:bet
//   }).then(func_success,func_rejected,func_progress);
// }
//
//
// function buyticket(loterie,user,somme,func){
//   shifumix.buyticket({loterie:loterie,user:user,somme:somme}).then(func);
// }
// function getloteries(event,user,func){
//   shifumix.getloteries({event:event,user:user}).then(func);
// }
// function sendwidgetbymail(widget,user,func){
//   shifumix.sendwidgetbymail({widget:widget,user:user}).then(func);
// }
//
// function addloterie(event,loterie,func_success,func_rejected,func_progress){
//   var req= gapi.client.request({
//     path: ROOT_API+'/shifumix/'+VERSION_API+'/addloterie',
//     method: 'POST',
//     params: {event:event},
//     body:loterie
//   }).then(func_success,func_rejected,func_progress);
// }
//
//
// function uploadfiles(list,user,func,func_error) {
//   var req = gapi.client.request({
//     path: ROOT_API + '/shifumix/'+VERSION_API+'/uploadfiles',
//     method: 'POST',
//     params: {user: user},
//     body: list
//   }).then(func, func_error);
// }
//
// function addsong(id,song,func,err_func){
//   gapi.client.request({
//     path: ROOT_API+'/shifumix/'+VERSION_API+'/addsong',
//     method: 'POST',
//     params: {event:id},
//     body:song
//   }).then(func,err_func);
// }
//
// function searchtorrent(query,func){
//   shifumix.searchtorrent({query:query}).then(func);
// }
//
//
// function refreshtoken(user,service,func){
//   shifumix.refreshtoken({user:user,service:service}).then(func);
// }
//
// function sendinvitetofollower(event,max,func){
//   shifumix.sendinvitetofollower({event:event,max:max}).then(func);
// }
//
// function getsvg(event,tags,notags,services,template,func){
//   var req = gapi.client.request({
//     path: ROOT_API + '/shifumix/'+VERSION_API+'/getsvg',
//     method: 'POST',
//     params:{event:event,tags:tags,notags:notags,services:services} ,
//     body: template
//   }).then(func);
// }
//
// function searchlocal(user,query,event,func){
//   gapi.client.setApiKey(null);
//   shifumix.searchlocal({user:user,query:query,event:event}).then(func);
// }
//
// function searchstream(query,event,func){
//   gapi.client.setApiKey(null);
//   shifumix.searchstream({query:query,event:event}).then(func);
// }
//
//
// function searchcloud(query,user,event,func){
//   gapi.client.setApiKey(null);
//   shifumix.searchcloud({query:query,user:user,event:event}).then(func);
// }
/*

function searchvideo(query,max_result,func){
  gapi.client.setApiKey(GOOGLE_API_KEY);
  gapi.client.youtube.search.list({
    q: query,
    order: 'relevance',
    videoDuration:'short',
    type:'video',
    part: 'id,snippet',
    format: '5',
    maxResults: max_result
  }).then(function(resp){
    gapi.client.setApiKey(null);
    func(resp.result.items);
  },function(err){
    console.log(err);
    gapi.client.setApiKey(null);
  });
}
*/
// export function senduser(user,update,func){
//   var req= gapi.client.request({
//     path: ROOT_API+'/shifumix/'+VERSION_API+'/senduser',
//     method: 'POST',
//     body:user,
//     params:{update:update}
//   });
//   req.execute(func);
// }
// function addevent(user,event,func,err_func){
//   try{
//     var req= gapi.client.request({
//       path: ROOT_API+'/shifumix/'+VERSION_API+'/addevent',
//       method: 'POST',
//       params: {user:user},
//       body:event
//     }).then(func,err_func);
//   }
//   catch (e){
//     err_func();
//   }
//
// }
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
/*
 function utf8_to_b64(str) {
 return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1 : number) {
 return String.fromCharCode('0x'+p1);
 }));
 }
 */
function to2D(p) {
    var x = p.lng;
    var y = Math.atan(Math.sin(p.lat));
    return { x: x, y: y };
}
/*
 function showEventIn(evt,user_pos,max_size){
 var code="";
 var d="";

 var link="<a href='javascript:setEvent(\""+evt.Id+"\",false)'>";
 if(evt.flyer.length>0)
 code=link+"<img style='max-width:"+max_size+"px;' src='"+evt.flyer+"'>";
 else
 code=link+"<h3>"+evt.title+d+"</h3><br>";

 code+="</a>";

 return code;
 }
 */
/**
 * Initialisation des variables global user & myevent sur la base du stockage local
 * @param translater
 */
function initGlobal(translater, user) {
    //On utilise la langue du navigateur si la langue du user n'est pas disponible
    if (translater != undefined) {
        if (user == null)
            translater.use(navigator.language);
        else
            translater.use(user.lang);
    }
}
/**
 * Montre l'état des ordres du serveur stocker sur le client
 * @param orders
 */
// function showOrders(orders=undefined){
//   if(orders==undefined)orders=JSON.parse(localStorage.serverOrders).dtLastOrder;
//   var rc=("users="+getDelay(orders["users"]));
//   rc+=" bets="+getDelay(orders["bets"]);
//   rc+=" event="+getDelay(orders["event"]);
//   rc+=" photo="+getDelay(orders["photo"]);
//   rc+=" tweet="+getDelay(orders["tweet"]);
//   rc+=" playlist="+getDelay(orders["playlist"]);
//   rc+=" charts="+getDelay(orders["charts"]);
//   rc+=" charts_credit="+getDelay(orders["charts_credit"]);
//   rc+=" stopremoteplayer="+getDelay(orders["stopremoteplayer"]);
//   rc+=" playremoteplayer="+getDelay(orders["remoteplayer"]);
//   $$(rc);
// }
/**
 * Met a jour sur le client l'état des ordres présent sur le serveur
 * @param idevent
 * @param func
 */
// function refresh_orders(idevent,userid,func=undefined,func_error=undefined){
//   $$("Récuperation des orders depuis le serveur");
//   getorders(idevent,userid,function(r){
//     if(r.status==200){
//       localStorage.setItem("serverOrders",JSON.stringify(r.result));
//       showOrders();
//       if(func!=undefined)func(r.result);
//     }else{
//       $$("Impossible de récupérer les ordres");
//       if(func_error!=undefined)func_error();
//     }
//   });
// }
var hIntervalOrder = null;
/**
 * Vérifie si un ordre est arrivé depuis la dernière écoute ou avec firebase
 * @param order ordre a analysé, si null, tous les ordres sont inspectés
 * @param scope doit contenir l'event et l'user si en mode auto et une référence a firebase si en mode manual
 * @param func appelé à la fin du process avec l'ordre, retourne la date de mise a jour de l'order

 function checkOrder(order,scope,func){
  if(localStorage.scaling=="auto")
    scope.hIntervalOrder=setInterval(function(){
      if(!scope.event.hasOwnProperty("id")){
        clearInterval(scope.hIntervalOrder);
        return;
      }
      refresh_orders(scope.event.id,null,function(resp){
        if(order==null)order="bets,event,playlist,photo,charts,tweet,user,board";
        order.split(",").forEach(function(o){
          if(isPresent(o,scope))
            func(o);
        });
      });
    },REFRESH_DELAY);
  else {
    if(order==null)order="";
    if(order.split(",").length>1)
      order.split(",").forEach(function(order){
        order="/"+order;
        scope.base.ref('orders/' + scope.event.id + '/dtLastOrder'+order).on('value',function(snapshot) {func(order);});
      })
    else{
      order="/"+order;
      scope.base.ref('orders/' + scope.event.id + '/dtLastOrder'+order).on('value',function(snapshot) {func(order);});
    }

  }
}
 */
//Check if an order must be executed
// function isPresent(o,$scope){
//   if(!$scope.hasOwnProperty("orders")){
//     if(localStorage.hasOwnProperty("serverOrders")){
//       $scope.orders=JSON.parse(localStorage.serverOrders).dtLastOrder;
//       return true;
//     }
//     return false;
//   }
//
//   o=o.toLowerCase();
//   var clientOrder=0;
//   if($scope.orders.hasOwnProperty(o))clientOrder=Number($scope.orders[o]);
//
//   var serverOrders=null;
//   if(window.localStorage.hasOwnProperty("serverOrders"))
//     serverOrders=JSON.parse(window.localStorage.getItem("serverOrders")).dtLastOrder;
//
//   if(serverOrders!=null && Number(serverOrders[o])>clientOrder){
//     $scope.orders[o]=serverOrders[o];
//     return true;
//   }
//   else
//     return false;
// }
// function getInvite(idEvent,size){
//   shorturl(DOMAIN_SERVER+"/index.html?event="+idEvent,function(short){
//     /*
//      new QRCode(document.getElementById("qrcode"), {
//      text: short.result.id,
//      width: size,
//      height: size,
//      correctLevel : QRCode.CorrectLevel.H
//      });
//      */
//     var elt_url=document.getElementById("url");
//     if(elt_url!=null)elt_url.innerHTML="<h2>"+short.result.id+"</h2>";
//   });
// }
//
//
// function contain(user,l_user){
//   for(var i=0;i<l_user.length;i++)
//     if(l_user[i].id==user.id)return true;
//
//   return false;
// }
/*
 function refresh_user(iduser,$translate,$ionicLoading,func){
 getuser(iduser,function(resp){
 if(resp.status==200) {
 user=resp.result;
 if (user.message.length > 0) {
 toast(user.message, $ionicLoading, $translate);
 user.message = "";
 senduser(user, "message");
 }
 if (func != undefined)func(user);
 }
 });
 }*/
/**
 * Appel de getEvent
 * @param idevent
 * @param func
 * @param func_quit est appelée si on doit quitter l'event
 * @param func_error est appelée si getEvent retourne une error
 */
// function refresh_event(idevent,func,func_quit,func_error){
//   $$("Appel de getEvent");
//   getevent(idevent,user,function(resp) {
//     if(resp.status!=200) {
//       if (func_error != undefined)
//         if(func_error!=undefined)func_error();
//         else
//         if(func_quit!=undefined)func_quit();
//     }else{
//       myevent = resp.result;
//       window.localStorage.setItem("event",JSON.stringify(myevent));
//       func(myevent);
//     }
//   });
// }
function showPopup(popup, alertCtrl, func) {
    if (popup.placeholder == undefined)
        popup.placeholder = "";
    if (popup.cancelButton == undefined)
        popup.cancelButton = "Cancel";
    if (popup.confirmButton == undefined)
        popup.confirmButton = "Ok";
    if (popup.value == undefined)
        popup.value = "''";
    if (popup.subtitle == undefined)
        popup.subtitle = "";
    if (popup.default == undefined)
        popup.default = "";
    if (popup.type == undefined)
        popup.type = "text";
    if (popup.translate != undefined) {
        popup.cancelButton = popup.translate.instant(popup.cancelButton);
        popup.confirmButton = popup.translate.instant(popup.confirmButton);
        popup.title = popup.translate.instant(popup.title);
        if (popup.hasOwnProperty("placeholder") && popup.placeholder.length > 0)
            popup.placeholder = popup.translate.instant(popup.placeholder);
    }
    var alert = alertCtrl.create({
        title: popup.title,
        subTitle: popup.subtitle,
        inputs: [{ value: popup.default, type: popup.type, name: 'value', placeholder: popup.placeholder }],
        buttons: [
            { text: popup.cancelButton, role: 'cancel', handler: function (data) { func(null); } },
            { text: popup.confirmButton, handler: function (data) {
                    func(data.value);
                }
            }
        ]
    });
    alert.present();
}
exports.showPopup = showPopup;
;
function contain(evts, evt) {
    if (evts != null)
        evts.forEach(function (e) {
            if (e.id === evt.id)
                return true;
        });
    return false;
}
exports.contain = contain;
/**
 * Chargement d'une fenetre d'attente
 * @param vm designe la fenetre courrante, doit contenir un objet loadingCtrl
 * @param {string} message
 * @param {number} delayInSec
 * @returns {Loading}
 */
function loading(vm, message, delayInSec) {
    if (message === void 0) { message = "Please wait..."; }
    if (delayInSec === void 0) { delayInSec = 60; }
    if (vm.translate != null)
        message = vm.translate.instant(message);
    if (vm.loadingCtrl == undefined)
        throw ("Erreur:loadingCtrl not defined");
    var loading = vm.loadingCtrl.create({ content: message });
    loading.present();
    if (delayInSec > 0)
        setTimeout(function () { loading.dismiss(); }, delayInSec * 1000);
    return loading;
}
exports.loading = loading;
function showConfirm(message, alertCtrl, translate, func_yes, func_no, forceYes) {
    if (func_no === void 0) { func_no = null; }
    if (forceYes === void 0) { forceYes = false; }
    if (forceYes)
        func_yes();
    else {
        message = translate.instant(message);
        var alert_1 = alertCtrl.create({
            title: 'Confirm',
            message: message,
            buttons: [
                { text: 'Cancel', role: 'cancel', handler: function () { if (func_no != null)
                        func_no(); } },
                { text: 'Ok', handler: function () { func_yes(); } }
            ]
        });
        alert_1.present();
    }
}
exports.showConfirm = showConfirm;
// function showModal($ionicModal,$scope,src,func){
//   if(DOMAIN.indexOf("localhost")>0){
//     if(func!=undefined)func();
//     return;
//   }
//
//   if(localStorage.getItem("notuto")=="true"){
//     if(func!=undefined)func();
//     return;
//   }
//
//   var template="/modal.html";
//   if(src.indexOf(".svg")!=src.length-3){
//     template="/modal_text.html";
//     $scope.text=src;
//   }else{
//     $scope.imageSrc="./assets/img/"+src;
//   }
//
//   $ionicModal.fromTemplateUrl(template, {
//     scope: $scope,
//     animation: 'slide-in-up'
//   }).then(function(modal) {
//     $scope.modal = modal;
//     $scope.modal.show();
//   });
//
//   setTimeout(function(){
//     $scope.modal.remove();
//   },5000);
//
//   $scope.closeModal=function(){
//     $scope.modal.hide();
//   };
//
//   $scope.$on('$destroy', function() {
//     $scope.modal.remove();
//   });
//
//   $scope.$on('modal.hidden', function(){
//     if(func!=undefined)func();
//   });
// };
function resizeBase64Img(base64, maxsize, quality, func) {
    if (base64 == null || base64 == "") {
        $$("Probleme d'image vide");
        func();
    }
    var canvas = document.createElement("canvas");
    var img = new Image();
    img.onload = function () {
        var ratio = 1;
        if (maxsize != null)
            ratio = maxsize / Math.max(img.width, img.height);
        if (ratio <= 1) {
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            var context = canvas.getContext("2d");
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            var rc = canvas.toDataURL("image/jpeg", quality);
        }
        else
            rc = base64;
        func(rc);
    };
    img.src = base64;
}
exports.resizeBase64Img = resizeBase64Img;
function cropToSquare(base64, quality, func) {
    if (quality === void 0) { quality = 1; }
    var img = new Image();
    img.onload = function () {
        var i = this;
        var l = Math.min(i.width, i.height);
        var x = (i.width - l) / 2;
        var y = (i.height - l) / 2;
        cropBase64Img(base64, x, y, l, l, quality, func, null);
    };
    img.src = base64;
}
exports.cropToSquare = cropToSquare;
//TODO: faire le crop
function cropBase64Img(base64, x, y, width, height, quality, func, func_error) {
    if (quality === void 0) { quality = 1; }
    try {
        var canvas = document.createElement("canvas");
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = function () {
            canvas.width = width;
            canvas.height = height;
            var context = canvas.getContext("2d");
            context.drawImage(img, x, y, width, height, 0, 0, width, height);
            var rc = canvas.toDataURL("image/jpeg", quality);
            func(rc);
        };
        img.src = base64;
    }
    catch (e) {
        if (func_error != null)
            func_error(e);
    }
}
exports.cropBase64Img = cropBase64Img;
function isMobile() {
    var s = navigator.platform;
    return (s.indexOf("Win32") == -1);
}
/**
 * Affiche un message pendant un delay limité. Le message peut être sous la forme d'un objet
 * @param msg contenu du message
 * @param $ionicLoading (optionnel)
 * @param $translate optionel, permet la traduction
 * @param func fonction callback
 */
function toast(ctrl, msg, translate, func, position, durationInSec) {
    if (translate === void 0) { translate = null; }
    if (func === void 0) { func = undefined; }
    if (position === void 0) { position = "bottom"; }
    if (durationInSec === void 0) { durationInSec = 3; }
    if (ctrl == null || msg == null)
        return;
    if (msg.indexOf(".") > 0 && translate != null)
        msg = translate.instant(msg);
    var toast = ctrl.create({
        message: msg,
        duration: durationInSec * 1000,
        position: position
    });
    toast.present();
    if (func != undefined)
        func();
    /*
    if(msg==undefined || msg.length==0){
      if(func!=undefined)func();
      return;
    }
  
    var obj={text:"",delay:2000,image:"",html:""};
    if(typeof msg==="string"){
      obj.text=msg;
      obj.delay=2000;
      obj.image="";
    }
    else obj=msg;
  
  
    if($translate!=undefined)
      obj.text=$translate.instant(obj.text);
  
    obj.html="<div style='text-align:center'>";
    if(obj.image!=undefined && obj.image.length>0)obj.html+="<img src="+obj.image+"'/img'><br>";
    obj.html+=obj.text+"</div>";
  
    if($ionicLoading==undefined){
      var div=document.createElement("div");
      div.style.position="fixed" //TODO: a terminer ="position: fixed;left:50%;height:50%;width:100px;z-index:99;";
      div.innerHTML=obj.html;
      document.appendChild(div);
      setTimeout(function(){
        document.removeChild(div);
        if(func!=undefined)func();
      },4000);
    } else{
      $ionicLoading.show({template:obj.html,duration:obj.delay});
      if(func!=undefined)setTimeout(func,4000);
    }
    */
}
exports.toast = toast;
;
function hashCode(s) {
    return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
}
exports.hashCode = hashCode;
;
function showModalHTML(src, func) {
    $$("Affichage de " + src);
    var dialog = document.createElement("div");
    src = "<span style='font-size:xx-large;'>" + src + "</span>";
    dialog.innerHTML = "<div style='margin-top:10%;margin-left:10%;width:70%;" +
        "color: white;border-color:white;border-style:solid;background-color: grey;font: 12px Architect Daughter;" +
        "padding:10px;border-radius: 25px;text-align: center;'>" + src + "<br><br><br><br><img src='/img/quit.png'></div>";
    dialog.id = "mydialog";
    dialog.style.textAlign = "center";
    dialog.style.backgroundColor = "black"; //"opacity":"0.8","width:100%";height:100%;position:fixed;left:0px;top:0px;z-index:9;";
    document.body.appendChild(dialog);
    setTimeout(function () {
        dialog.addEventListener("mousedown", function () {
            document.body.removeChild(document.getElementById("mydialog"));
            if (func != undefined)
                func();
        });
        setTimeout(function () {
            document.body.removeChild(document.getElementById("mydialog"));
            if (func != undefined)
                func();
        }, 3000);
    }, 1000);
}
;
/**
 * Fonction de traduction interne à l'application. Principalement utilisé par les widgets
 * @param lang
 * @param lib
 * @returns le libellé resultat
 */
function translate(lang, lib, libs) {
    if (lang === void 0) { lang = null; }
    if (lang == null)
        lang = navigator.language.substr(0, 2);
    if (lang == null)
        lang = "en";
    if (libs == null)
        $$("You must get labels.js");
    for (var i = 0; i < libs.length; i++) {
        var l = libs[i];
        if (l.lang == lang) {
            var s = l.labels[lib];
            if (s == undefined)
                return (lib);
            else
                return (s);
        }
    }
}
;
/*/Ppermet de n'exécuter des actes qu'une fois pour un client
 function addHistory(user,histo) {
 if (user.history.indexOf(hashCode(histo)) == -1) {
 user.history += ";" + hashCode(histo);
 senduser(user, "history", function (resp) {
 localStorage.setItem("user", JSON.stringify(resp));
 });
 return true;
 }
 return false;
 }*/
/**
 * Permet l'affichage d'un ecran de tuto dont le nom du fichier est dans img
 * @param user
 * @param img
 * @param $ionicModal
 * @param $scope
 * @param $translate
 * @param func

 function tuto(user,img,$ionicModal,$scope,$translate,func){
    if(user==undefined)return;

    var params="";
    if(img.indexOf("|")>0){
        params=img.split("|")[1].split(",");
        img=img.split("|")[0];
    }

    if(!user.hasOwnProperty("history") || user.history.indexOf(hashCode(img))==-1 || getParam()["playtuto"]=="true"){
        $$("Affichage du tuto "+img);

        user.history+=";"+hashCode(img);
        senduser(user,"history",function(resp){transfert(resp,$scope.user);});

        setTimeout(function(){
            if(img.indexOf(".svg")>0)
                img=img.split(".")[0]+"_"+user.lang+"."+img.split(".")[1];
            else{
                var old=img;
                if($translate==null)
                    img=translate(user.lang,img,Libs);
                else{
                    img=$translate.instant(img);
                    if(img==old){
                        $translate.use("en");
                        img=$translate.instant(img);
                    }
                }
            }

            for(var i=0;i<params.length;i++)
                img=img.replace("$"+(i+1),params[i]);

            if($scope!=undefined && $scope.hasOwnProperty("tuto")){
                if($scope.tuto.length>0)sep="<br>"; else sep="";
                $scope.tuto+=sep+img;
                $scope.$apply();
            }
            else{
                if($ionicModal!=undefined && $scope!=undefined)
                    showModal($ionicModal,$scope,img,func);
                else
                    showModalHTML(img,func);
            }
        },1500);
    }
};
 */
/**
 *
 * @param longurl
 * @param size
 * @param whiteColor peut etre "white" ou #FFFFFF
 * @param param argument repassé à la fonction résultat appelée
 * @param func appelé en resultat, elle recoit l'imag du QRcode, l'url courte et param
 */
function getQRCode(longurl, size, whiteColor, param, func) {
    var div = document.createElement("div");
    /*
     shorturl(longurl,function(rep){
     new QRCode(div, {
     text: rep.result.id,
     width: size,
     colorDark : "#000000",
     colorLight : whiteColor,
     height: size,
     correctLevel: QRCode.CorrectLevel.H
     });
     */
    var rep = { result: { id: "" } };
    var elt = div.getElementsByTagName("canvas")[0];
    func(elt.toDataURL("image/jpeg", 0.5), rep.result.id, param);
}
exports.getQRCode = getQRCode;
function buildGrid(cels) {
    var rows = Math.round(Math.sqrt(cels) - 0.5) + 1;
    var rc = "<table style='width:100%;text-align:center;vertical-align: middle;border-color: #000000 ;'>";
    for (var i = 0; i < rows; i++) {
        rc += "<tr>";
        for (var j = 0; j < rows; j++) {
            var id = "cel" + (i * rows + j);
            rc += "<td><div id='" + id + "'></div></td>";
        }
        rc += "</tr>";
    }
    return rc + "</table>";
}
;
function tirage(max) {
    return Math.round(Math.random() * max);
}
exports.tirage = tirage;
;
function openMusicPlayer(evt, secretCode, lang) {
    var h = window.screen.availHeight;
    var w = window.screen.availWidth;
    var widget = "MusicPlayer.html";
    if (evt.musicServer == exports.YOUTUBE)
        widget = "widgetVideo.html";
    var url = exports.DOMAIN_SERVER + "/widgets/" + widget + "?event=" + evt.id + "&sc=" + secretCode + "&lang=" + lang;
    url = url.replace("https", "http");
    if (evt.musicServer == exports.DEEZER_SERVER)
        url += "&filter=deezer";
    var hwnd = this.openWindow(url, "_blank", "titlebar=no,status=no,height=500,width=430,menubar=no");
    hwnd.moveTo(0, 0);
    return hwnd;
}
exports.openMusicPlayer = openMusicPlayer;
/**
 *
 * @param param
 * @param func
 * @param func_none
 */
// function findEvents(param,delay,func) {
//   if(param.hasOwnProperty("raz"))localStorage.clear();
//   if(localStorage.hasOwnProperty("event"))
//     param.event=localStorage.event;
//
//   if (!param.hasOwnProperty("event")) {
//     var password = "";
//     var username = param.user;
//     if (username == undefined)username = localStorage.username;
//     if (username !=null ) {
//       getuser(username,function(r){
//         if(r.status==200){
//           var user= r.result;
//           httpGet("geteventsfrom?user="+username,function (resp){
//             var rc=[];
//             if(resp.status==204){
//               adduser({email:username,lang:navigator.language},"mail");
//               func(rc,user);
//             }else{
//               $$("Récuperation des events",resp);
//               var now = new Date().getTime();
//
//               if(resp.status==200 && resp.result.hasOwnProperty("items")){
//                 resp.result.items.forEach(function (event) {
//                   if (event.dtEnd > now-delay*1000*60)
//                     rc.push(event);
//                 });
//               }
//               func(rc,user);
//             }
//           },null,false);
//         }
//       });
//     }
//   }
//   else{
//     getevent(param.event,null,function(resp){
//       var rc=[];
//       rc.push(resp.result);
//       func(rc,null);
//     });
//   }
// }
// function findActifEvent(param,func,func_none=undefined) {
//   findEvents(param, 0, function (events) {
//     var rc = null;
//     events.forEach(function (event) {
//       if (rc==null && event.opened && !event.closed) {
//         rc = event;
//       }
//     });
//
//     if (rc == null) {
//       if (func_none != undefined) func_none()
//     }
//     else
//       func(rc);
//   });
// }
//
//
// function findNextEvent(username,func,func_none) {
//   if(username==null)username=localStorage.username;
//   var delay=1E15;
//   $$("Recherche du prochain évenement pour "+username);
//   httpGet("geteventsfrom?user="+username,function (resp) {
//     var now = new Date().getTime();
//     var rc = null;
//     if(resp.status==200 && resp.result.hasOwnProperty("items")) {
//       resp.result.items.forEach(function (event) {
//         if (event.dtStart - now < delay && event.dtEnd > now) {
//           delay = event.dtStart - now;
//           rc = event;
//           $$("Evénement identifié: ", event);
//         }
//       },null,false);
//     }
//     if (rc == null){
//       $$("Aucun évenement identifié pour "+username);
//       func_none();
//     }
//     else
//       func(rc);
//   });
// }
//
function getLastOrder(orders) {
    var max = 0;
    var rc = "";
    for (var prop in orders)
        if (prop != "sanity" && orders[prop] > max) {
            max = orders[prop];
            rc = prop;
        }
    return rc;
}
function instantEvent(title) {
    var evt = { title: title, address: "",
        dtEnd: new Date().getTime() + 8 * 3600 * 1000,
        dtStart: new Date().getTime(), flyer: "./assets/img/flyers/flyerdemo.jpg", lat: 48, lng: 2, password: "", activities: ["bets", "survey", "music", "photo"] };
    return evt;
}
;
function sortList(elts, key) {
    var rc = false;
    do {
        rc = false;
        for (var i = 0; i < elts.length - 1; i++) {
            if (Number(elts[i][key]) < Number(elts[i + 1][key])) {
                var s = elts[i];
                elts[i] = elts[i + 1];
                elts[i + 1] = s;
                rc = true;
            }
        }
    } while (rc);
    return elts;
}
//Gestion des tags
function delTag(obj, tag) {
    obj.tags.splice(obj.tags.indexOf(tag), 1);
}
function addTag(obj) {
    if (obj.tags == undefined)
        obj.tags = [];
    obj.newtag = obj.newtag.trim().toLowerCase();
    if (obj.tags.indexOf(obj.newtag) == -1) {
        obj.tags.push(obj.newtag);
    }
    obj.newtag = "";
}
function SignInController($scope) {
    // This flag we use to show or hide the button in our HTML.
    $scope.signedIn = false;
    // Here we do the authentication processing and error handling.
    // Note that authResult is a JSON object.
    $scope.processAuth = function (authResult) {
        // Do a check if authentication has been successful.
        if (authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;
            //     ...
            // Do some work [1].
            //     ...
        }
        else if (authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;
            // Report error.
        }
    };
    // When callback is received, we need to process authentication.
    $scope.signInCallback = function (authResult) {
        $scope.$apply(function () {
            $scope.processAuth(authResult);
        });
    };
    /* Render the sign in button.
    $scope.renderSignInButton = function() {
      gapi.signin.render('signInButton',
        {
          'callback': $scope.signInCallback, // function handling the callback.
          'clientid': '[CLIENT_ID from Google developer console]', // CLIENT_ID from developer console which has been explained earlier.
          'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                            // as their explanation is available in Google+ API Documentation.
          'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
          'cookiepolicy': 'single_host_origin'
        }
      );
    };*/
    // Start function in this example only renders the sign in button.
    $scope.start = function () {
        $scope.renderSignInButton();
    };
    // Call start function on get.
    $scope.start();
}
// function generateUUID(){
//   var d = new Date().getTime();
//   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     var r = (d + Math.random()*16)%16 | 0;
//     d = Math.floor(d/16);
//     return (c=='x' ? r : (r&0x3|0x8)).toString(16);
//   });
//   return uuid;
// }
// function getComputerId(){
//   if(!localStorage.hasOwnProperty("computer_id") || localStorage.computer_id.length==0)localStorage.computer_id=generateUUID();
//   localStorage.setItem("musicPlayer",localStorage.computer_id);
//   return localStorage.computer_id;
// }
//
//
// //Fonction générale pour le replacement des tags
// function _tag(html,tag,value) {
//   html=String(html).replace("{{"+tag+"}}","<"+tag+"></"+tag+">");
//   var i=html.indexOf("<"+tag+">");
//   if(i>-1){
//     var j=html.indexOf("</"+tag+">");
//     html=html.substr(0,i+tag.length+2)+value+html.substr(j);
//   }
//   return html;
// };
//
//
// function _tagAll(html,tag,value) {
//   while(html.indexOf("<"+tag+"></"+tag+">")>-1)html=_tag(html,tag,value);
//   return html;
// };
/**
 * Montre le timer pour un pari/sondage
 * @param bet
 * @param elt
 */
function showBetTimer(bet, elt) {
    if (bet.dtEnd > new Date().getTime())
        elt.innerHTML = getDelay(bet.dtEnd);
    else
        elt.innerHTML = "";
}
;
/**
 * Montre le nombre de joueur d'un pari
 * @param bet
 * @param elt
 */
// function shownPlayer(bet,elt){
//   var rc="";
//   for(var i=0;i<bet.nPlayers;i++)
//     rc+="<img style='display:inline;width:20px;margin-top:3px;' src='/img/personne.png'>";
//
//   if(bet.nPlayers>0)
//     elt.innerHTML=rc+"&nbsp;"+bet.nPlayers;
//   else
//     elt.innerHTML="";
// };
//
//
// function showTimer(bet,elt){
//   if(bet==undefined || !bet.visible)return(elt);
//
//   if(Number(bet.dtEnd)>Number(new Date().getTime()))
//     elt=_tag(elt,"timer",getDelay(bet.dtEnd));
//   else
//     elt=_tag(elt,"timer","");
//
//   return elt;
// };
/**
 * Charge les paris d'un evenement
 * @param evt
 * @param func
 */
// function loadBets(evtid,func){
//   getBets(null,evtid,false,false,[],function(rep){
//     if(rep.result.hasOwnProperty("items")){
//       var bets=rep.result.items;
//
//       for(var i=0;i<bets.length;i++){
//         var bet=bets[i];
//         var endDelay=(bet.dtEnd-new Date().getTime())/1000;
//         bet.visible=(endDelay>-60 && endDelay<60*60);
//
//         //On ajoute des options vides au pari pour permettre l'effacement automatique
//         if(bet.options.length<10)
//           for(var j=0;j<10-bet.options.length;j++)
//             bet.options.push({lib:"",total:"",quot:""});
//
//         if (bet.visible && !bet.hasOwnProperty("qrcode")){
//           bet.qrcode="";
//           getQRCode(DOMAIN_APPLI+ "/index.html?event=" + bet.idEvent + "&bet=" + bet.id, 200, "#777777",i,function (code,url,i) {
//             bets[i].qrcode=code;
//           });
//         }
//       }
//       setTimeout(function() {func(bets);},2000);
//     }
//   });
// };
/**
 * Retourne le pari visible suivant
 * @param currBet
 * @param bets
 * @returns {*}
 */
function nextBet(currBet, bets) {
    if (nBetVisible(bets) == 0)
        return 0;
    do {
        currBet++;
        if (currBet == bets.length)
            currBet = 0;
    } while (currBet < bets.length && !bets[currBet].visible);
    return currBet;
}
function nBetVisible(bets) {
    var rc = 0;
    if (bets.length == 0)
        return 0;
    bets.forEach(function (bet) {
        if (bet.visible)
            rc++;
    });
    return rc;
}
/*
 function installEvents(idEvent,showBet,$scope){
 //Chargement des paris
 $scope.hLoad=setInterval(function(){
 refresh_orders(idEvent,
 function(){
 if(isPresent("bets",$scope)){
 loadBets(idEvent,function(res){$scope.bets=res;});
 }
 }
 );
 },5000);

 //Changement de pari visible
 $scope.hChange=setInterval(function(){
 if(nBetVisible($scope.bets)>0){
 $scope.currBet=nextBet($scope.currBet,bets);
 }
 },10000);

 //Affichage du timer
 $scope.hTimer=setInterval(function(){
 showBet($scope.bets[$scope.currBet]);
 },1000);

 return $scope;
 };
 */
/**
 * Initialisation du scope pour les pages bets
 */
// function initScope(idEvent,showBet,$scope){
//   $scope={};
//   $scope.currBet=0;
//   $scope.bets=[];
//   loadBets(idEvent,function(res){
//     $scope.bets=res;
//     showBet($scope.bets[0]);
//     //installEvents(idEvent,showBet,$scope);
//   });
// }
/**
 * Convert a bet in HTML
 * @param bet
 * @returns HTML version of the bet
 function getBetInHtml(bet){
    var rc="<div name='bet' id='"+bet.id+"' title='"+bet.dtEnd+"' style='display:inline-block; text-align:center;width: 90%;'>";

    rc+="<span style='font-size:3em'>"+bet.title+"</span><br><br>";
    rc+="<div style='width: 100%;text-align:center'><table style='padding: 5px;width:90%;'>";
    rc+="<tr><td></td><td style='text-align: right;'><span style='font-size: x-large'>&nbsp;</span></td></tr>";
    var opts=[];
    for(var j=0;j<bet.options.length;j++){
        var i=0;
        while(i<opts.length && bet.options[j].total<opts[i].total)i++;
        opts.insert(i,bet.options[j]);
    }

    var i=0;
    opts.forEach(function(opt) {
        var size="xx-large";
        i++;
        if(i==1 && bet.type==5)size="3em";
        rc += "<tr>";

        rc += "<td style='text-align: left;'><span style='font-size: 3em;color:white;'>";
        if(opt.total>0)rc+= opt.total + "#unite";
        rc += "</span></td>";

        rc += "<td style='width: 80%;text-align: left;'><span style='font-size: "+size+";'>"+ opt.lib +"</span></td>";

        rc+="</tr>";
    });
    if(bet.type==5)rc=rc.replace(new RegExp('#unite', 'g'),"&nbsp;<span style='font-size:medium'>votes</span>");
    if (bet.type == 4)rc = rc.replace(new RegExp('#unite', 'g'), "&nbsp;<img src='/img/money.png' class='money'>");
    rc+="</table></div>";

    return rc;
};
 */
/**
 * Integre le pari dans une page template de pari
 * @param bet
 * @param temp le code HTML du template
 * @returns le code HTML après remplacement
 */
// function showBetFromTemplate(bet,elt) {
//   $$("entrée dans showBetFromTemplate");
//   var unite="votes";
//   if(bet.type==4)unite="<img style='display:inline' src='/img/money.png' class='money'>";
//
//   var s=_tag(elt.innerHTML,"bet",bet.title);
//   for(var i=1;i<=bet.options.length;i++){
//     $$("affichage de l'option "+i);
//     s=_tag(s,"quot"+i,bet.options[i-1].quot);
//     s=_tag(s,"option"+i,bet.options[i-1].lib);
//     s=_tag(s,"score"+i,bet.options[i-1].total);
//   }
//   s=_tag(s,"money",unite);
//   s=_tag(s,"qrcode","<img src='"+bet.qrcode+"' style='display: inline-block;border-color: white;border-style: solid;'>");
//
//   s=showTimer(bet,s);
//
//   elt.innerHTML=s;
// };
//
//
// function hideBet(elt){
//   var s=_tag(elt.innerHTML,"title","");
//
//   for(var i=1;i<=15;i++){
//     s=_tag(s,"quot"+i,"");
//     s=_tag(s,"option"+i,"");
//     s=_tag(s,"score"+i,"");
//   }
//
//   s=_tagAll(s,"money","");
//   s=_tagAll(s,"qrcode","");
//   s=_tagAll(s,"timer","");
//
//   elt.innerHTML=s;
// };
// function getSyncScriptParams() {
//   var scripts = document.getElementsByTagName('script');
//   var lastScript = scripts[scripts.length-1];
//   var scriptName = lastScript;
//   return {
//     event: scriptName.getAttribute('event'),
//     user : scriptName.getAttribute('user')
//   };
// }
/**
 * Retourne le type d'environnement d'execution du serveur
 * le client peut être installé en local mais ce qui compte c'est le serveur utilisé
 * @param domain
 * @return {number}
 */
function getEnv(domain) {
    if (domain === void 0) { domain = exports.DOMAIN_SERVER; }
    if (domain.indexOf("localhost") > -1)
        return 0; //dev
    if (domain.indexOf("v0-dot") > -1)
        return 0.5; //pre-prod
    return 1; //prod
}
exports.getEnv = getEnv;
function isLocal() {
    return (getEnv() == 0);
}
exports.isLocal = isLocal;
function getAllServices(services, filter, level, version) {
    /*
    var temp = [
      {version: 0, text: "Deezer", token: "deezer",minLevel:0},
      {version: 0, text: "Deezer local", token: "deezer_local",minLevel:0},
      {version: 0, text: "Deezer preprod", "token": "deezer_preprod",minLevel:0},
      {version: 0, text: "Spotify", token: "spotify",minLevel:0},
      {version: 1, text: "Google Calendar", token: "calendar", extra: "immediate=false",minLevel:10},
      {version: 0, text: "Google Contact", token: "contact", extra: "immediate=false",minLevel:0},
      {version: 0, text: "Google Drive", token: "drive", extra: "immediate=false",minLevel:0},
      {version: 0, text: "Facebook", token: "facebook",minLevel:0},
      {version: 1, text: "Fb_publish", token: "fb_publish",minLevel:0},
      {version: 0, text: "Fb local", token: "fb_local",minLevel:0},
      {version: 0, text: "SalesForce", token: "salesforce",minLevel:0},
      {version: 0, text: "Fb preprod", token: "fb_preprod",minLevel:0},
      {version: 0, text: "Linkedin", token: "linkedin",minLevel:0},
      {version: 2, text: "Instagram", token: "instagram",minLevel:10},
      {version: 1, text: "Slack", token: "slack",minLevel:0},
      {version: 1, text: "Twitter", token: "twitter",minLevel:0},
      {version: 1, text: "Twitter_local", "token": "twitter_local",minLevel:0},
      {version: 2, text: "Github", "scope": "user:email", "token": "github",minLevel:20},
      {version: 2, text: "Wix", "scope": "basic+follower_list", token: "instagram",minLevel:20}
    ];
    */
    if (filter === void 0) { filter = ""; }
    if (level === void 0) { level = 0; }
    if (version === void 0) { version = 1; }
    var temp = services.services;
    var rc = [];
    temp.forEach(function (it) {
        if (it.description == undefined)
            it.description = it.token.toUpperCase() + ".DESCRIPTION";
        if (it.version == undefined)
            it.version = 0;
        if (it.minLevel == undefined)
            it.minLevel = 0;
        it.text = it.name;
        if (it.version >= version && level >= it.minLevel && (getEnv() == 0 || it.name.indexOf("local") == -1)) //On n'inclue pas les services version local sur la prod
            rc.push(it);
    });
    var rc2 = [];
    if (filter == undefined)
        filter = "";
    var filters = filter.split(",");
    rc.forEach(function (item) {
        if (item.name.indexOf("preprod") == -1 || exports.DOMAIN_SERVER.indexOf("v0-dot") != -1)
            if (version >= item.version && (filter === "" || filters.indexOf(item.token) > -1)) {
                if ((getEnv() > -1 && item.name.indexOf("local") > -1) || item.name.indexOf("local") == -1)
                    rc2.push(item);
            }
    });
    return rc2;
}
exports.getAllServices = getAllServices;
/**
 * Retourne l'ensemble des widgets disponibles
 * @param evt
 * @param $translate
 * @param filter
 * @returns List des wigets
 */
function getAllWidget(user, $translate, filter, func) {
    var links = [];
    if (filter == null)
        filter = "";
    getpersowidgets(user, function (resp) {
        if (resp.status == 200)
            resp.result.items.forEach(function (w) {
                if (w.activity == "" || filter == "" || filter.indexOf(w.activity) > -1)
                    links.push({ title: w.title, widget: w.name, description: w.description, url: w.code });
            });
        links.forEach(function (lk) {
            if (typeof $translate != 'function')
                lk.description = translate("en", lk.description, labels_1.getLibs());
            else
                lk.description = $translate.instant(lk.description);
        });
        /*
         if(filter==undefined)
         func(links)
         else {
         var rc2=[];
         links.forEach(function(item){
         if(filter.indexOf(item.widget)>-1){rc2.push(item);}
         });
         func(rc2);
         }
         */
        func(links);
    });
}
var hInterval = null;
function openGeneral(item, user) {
    return new Promise(function (resolve, reject) {
        if (user != null && user.accessTokens != undefined && user.accessTokens[item] != null)
            resolve(user.id);
        else {
            var url_1 = exports.DOMAIN_SERVER + "/connectTo?user=" + user.id + "&service=" + item;
            $$("ouverture de " + url_1);
            var hwnd = openWindow(url_1, "Login", "menubar=0,status=0");
            window.addEventListener("message", function (event) {
                if (event.origin !== url_1.split("/connect")[0] && event.origin.indexOf("shifumixweb") == -1)
                    reject();
                else {
                    resolve(event.data);
                }
            }, false);
        }
    });
}
exports.openGeneral = openGeneral;
function showUser(vm, u) {
    vm.navCtrl.push("public_profil", { user: u.id });
}
exports.showUser = showUser;
function openModal(modalCtrl, page, arg, func) {
    if (arg === void 0) { arg = {}; }
    if (func === void 0) { func = null; }
    var profileModal = modalCtrl.create(page, arg);
    profileModal.onDidDismiss(function (data) {
        if (func != null)
            func(data);
    });
    profileModal.present();
}
exports.openModal = openModal;
function setStyleFromParams(params, elt) {
    if (elt == undefined)
        elt = document.body;
    var parent = null;
    if (window.frameElement != null)
        parent = window.frameElement.parentElement;
    if (elt.tagName == "BODY" && parent != null) {
        for (var i = 0; i < 50; i++)
            if (parent.style[i] != undefined) {
                var prop = parent.style[i];
                elt.style[prop] = parent.style[prop];
            }
    }
    //TODO: a completer et documenter
    if (params.hasOwnProperty("bkcolor"))
        elt.style.backgroundColor = params.bkcolor;
    if (params.hasOwnProperty("backgroundColor"))
        elt.style.backgroundColor = params.backgroundColor;
    if (params.hasOwnProperty("color"))
        elt.style.color = params.color;
    if (params.hasOwnProperty("style"))
        elt.style = params.style;
    if (params.hasOwnProperty("backgroundImage"))
        elt.style.backgroundImage(params.backgroundImage);
}
function openHelp(location) {
    var helpDomain = "https://shifumix.com/www/?page_id=14";
    var url = null;
    if (location.indexOf("#") == 0) {
        location = location.substr(1);
        var pages = {
            "homepage": "creer_playlist",
            "addloteriepage": "organiser_tombola",
            "addeventpage": "creer_un_evenement",
            "messagespage": "poster_des_messages",
            "screenspage": "afficher_iwall",
            "loginpage": "connexion_shifumix",
            "musicserverpage": "diffuser_musique_shifumix",
            "addbetspage": "publier_sondages",
            "oldeventspage": "acceder_evenement_termine",
            "login_avatar": "login_avatar",
            "invitepage": "inviter_participants"
        };
        if (!pages.hasOwnProperty(location))
            url = helpDomain + "#" + location.toLowerCase();
        else
            url = helpDomain + "#" + pages[location.toLowerCase()];
    }
    else {
        if (location.indexOf("http") != 0)
            url = helpDomain + "#" + location;
        else
            url = location;
    }
    openWindow(url, "help", "");
}
exports.openHelp = openHelp;
;
/**
 * vérifie l'environnement
 * @param $scope
 * @param $translate
 * @param $ionicHistory
 */
// export function checkEnvironnement($scope, $translate = null, $state = null) {
//   $scope.user = {};
//   $scope.event = {};
//
//
//   if ($translate != null) {
//     if ($scope.user != null && $scope.user.hasOwnProperty("lang"))
//       $translate.use($scope.user.lang);
//     else {
//       var lang = window.navigator.language.split("-")[0];
//       $$("Utilisation de la langue du navigateur:" + lang);
//       $translate.use(lang);
//     }
//   }
//
//   if (!$scope.hasOwnProperty("goBack"))
//     $scope.goBack = function () {
//       this.navCtrl.pop();
//     };
//
//   //Gestion des events
//   /*
//   $scope.quitEvent = function () {
//     quit($scope.user.id, $scope.event.id, function (resp) {
//       transfert(resp.result,$scope.user);
//       if($scope.event.closed)
//         $state.go("closedEvent",{from:"event",event:$scope.event.id},{reload:false});
//       else
//         $state.go("selEvent",{},{reload:true});
//     });
//   */
//
//   //Permet de montrer l'utilisateur
//   $scope.showUser = function (u) {
//     this.navCtrl.push("public_profil", {user: u.id, from: "tab.charts"});
//   };
//
//   $scope.now = new Date().getTime();
//   $scope.message = "";
//   $scope.version = version;
// }
function openWindow(url, title, option) {
    if (title === void 0) { title = "_blank"; }
    if (option === void 0) { option = ""; }
    if (option == undefined)
        option = "location=no, titlebar=no, menubar=no, status=no, scrollbars=no, menubar=no, left=50, top=50, width=400, height=600, center=yes";
    if (title == undefined)
        title = "_blank";
    return window.open(url, title, option);
}
exports.openWindow = openWindow;
function onCopy(tc, translate) {
    toast(tc, "WIDGET.URLINCLIPBOARD", translate);
}
exports.onCopy = onCopy;
/**
 * Creer un objet song depuis l'objet [origin,text,author,picture,computer,duration]
 * @param song
 * @param user
 * @param event
 * @returns {{}}
 */
function createSong(song, user, event) {
    var s = {};
    s["title"] = song.title.replace("\"", "").replace("\"", "").replace("\"", "");
    s["from"] = user;
    s["type"] = 3;
    s["shortTitle"] = s["title"];
    s["idEvent"] = event.id;
    s["origin"] = song.origin;
    s["text"] = song.text;
    s["author"] = song.author;
    s["picture"] = song.picture;
    s["computer"] = song.computer;
    s["dtPlay"] = null;
    s["Id"] = event.id + "_" + song.text;
    s["duration"] = song.duration;
    s["playlist"] = "Search";
    s["tag"] = s["playlist"] + " " + s["title"] + " " + s["author"];
    return s;
}
exports.createSong = createSong;
;
/**
 *
 * @param user
 * @param func
 */
function preparePlaylist(response, func) {
    var rc = [];
    var titre = [];
    for (var i = 0; i < response.length; i++) {
        var s = response[i];
        if (titre.indexOf(s.playlist) == -1)
            titre.push(s.playlist);
        s.order = i;
        s.id = s.text;
        s.author = s.artist;
        s.title = s.title.replace(new RegExp("'", 'g'), " ");
        rc.push(s);
    }
    func(rc, titre);
}
exports.preparePlaylist = preparePlaylist;
/**
 * charge la playlist en local
 * @param user
 * @param force écrase la playlist précédente
 * @param func
 */
// function loadPlaylist(user,force,func){
//   if(force==true)localStorage.removeItem("playlist");
//   if(!localStorage.hasOwnProperty("playlist")){
//     getcloudplaylist(user,true,function(resp){
//       if(resp.status!=200 || !resp.result.hasOwnProperty("items")){
//         localStorage.removeItem("playlist");
//         localStorage.removeItem("playlist_owner");
//       }
//       else{
//         localStorage.setItem("playlist",JSON.stringify(resp.result.items));
//         localStorage.setItem("playlist_owner",user);
//       }
//
//       if(func!=undefined)func(resp.result.items.length);
//     });
//   }
// }
/**
 * Permet de vérifier la configuration entre l'utilisateur et le choix de la plate-forme
 * cette fonction est utile car parfois on pert le token
 * @param user
 * @returns {*}
 */
function checkConfig(user) {
    if ((!user.hasOwnProperty("accessTokens") || !user.accessTokens.hasOwnProperty("spotify")) && user.musicServer == 0)
        return "ERROR.SPOTIFYCONFIG";
    return "";
}
function startFullScreen(doc) {
    doc.addEventListener("click", function () {
        var docElm = doc.documentElement;
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
    });
}
var iter = 0;
/**
 * Fonction appelé au début de chaque widget pour le préparer
 * @param body
 * @returns {boolean}
 */
// function prepareWidget(doc,params) {
//
//   //if(navigator.hasOwnProperty("connection") && navigator.connection.type=="none")return false;
//   var idEvent = null;
//
//   doc.body.className = "public-style";
//   localStorage.removeItem("event");
//   setStyleFromParams(params, doc.body);
//   startFullScreen(doc);
//
//   if (params.hasOwnProperty("title")) doc.title = params.title;
//   doc.documentElement.style.overflow = 'hidden';
//
//   //Récuperation des parametres du serveur
//   infoserver(function (resp) {
//     localStorage.scaling = resp.result.scaling;
//   });
//
//   findActifEvent(params, function (evt) {
//     loadTemplate(null, document, evt);
//   });
//
//
//   $$("Surveillance de l'état de l'événement");
//   doc.hInterval=setInterval(function() {
//       if (doc.hasOwnProperty("event") && doc.event!=null && doc.event.id!=undefined) {
//         getevent(doc.event.id, null,  function (resp) {
//           if (resp.result.closed) {
//             doc.event=null;
//             clearInterval(doc.hInterval);
//             var url = "./winners.html";//?from=" + encodeURIComponent(location.href);
//             if (getParam().hasOwnProperty("event")) url += "?event=" + getParam().event;
//             if (getParam().hasOwnProperty("user")) url += "?user=" + getParam().user;
//             doc.location.href = url;
//           }
//         });
//       } else {
//         findActifEvent(getParam(),  function (evt) {
//           $$("L'event du document du widget est ", evt);
//           doc.event = evt;
//           loadTemplate(null, document, evt);
//         },  function () {
//           $$("Pas d'événement actif");
//           doc.event = null;
//           //location.href="/promo.html?event="+getParam().user;
//         });
//       }
//     }
//     ,10000);
//
//   //window.$scope={};
//   return true;
// }
/**
 * créé une photo pour envoyer
 * @param user
 * @param contenu
 * @param text
 * @param tags
 * @return {{}}
 */
function createPhoto(user, contenu, text, tags) {
    if (text === void 0) { text = ""; }
    if (tags === void 0) { tags = ""; }
    var photo = {
        text: text,
        tags: [],
        from: user,
        legend: "",
        format: "jpeg",
        anonymous: user.anonymous,
        photo: contenu,
        type: exports.TYPE_PHOTO
    };
    if (contenu == "")
        $$("Probleme de contenu sur la photo");
    if (tags == undefined)
        photo.tags = [];
    else
        photo.tags = tags.split(",");
    return photo;
}
exports.createPhoto = createPhoto;
;
// function send(event, photo, success, failure) {
//   var max_photo_size = 1400;
//   setTimeout(function () {
//     if (photo.photo.length == 0 || photo.photo.indexOf("http") == 0) {
//       sendphoto(event, photo, success);
//     } else {
//       resizeBase64Img(photo.photo, max_photo_size, 1, function (newImg) {
//         photo.photo = newImg;
//         sendphoto(event, photo, success, failure, function (code) {
//           console.log(code);
//         });
//       });
//     }
//   }, 200);
// }
function loadTemplate(tagNames, doc, evt) {
    if (tagNames == null)
        tagNames = "shifu-commandlist,shifu-playlist,shifu-slideshow,shifu-betoptions,shifu-video,shifu-board,shifu-chart,shifu-bet,shifu-timer,shifu-story,shifu-twittertimeline,shifu-socialwall,shifu-svgwall";
    var tags = tagNames.split(",");
    var rc = false;
    tags.forEach(function (tag) {
        var elts = doc.getElementsByTagName(tag.toLowerCase());
        for (var i = 0; i < elts.length; i++) {
            var elt = elts[i];
            var params = getParam();
            for (var field in params) {
                elt[field] = params[field];
            }
            // firebase.initializeApp({
            //   apiKey: "AIzaSyAV9yqZFPq70JxOz9zY2n1YjqNftiFx4Qk",
            //   authDomain: "shifumixweb.firebaseapp.com",
            //   databaseURL: "https://shifumixweb.firebaseio.com",
            //   projectId: "shifumixweb",
            //   storageBucket: "shifumixweb.appspot.com",
            //   messagingSenderId: "59986393005"
            // });
            //
            // elt.base = firebase.database();
            elt.event = evt;
            rc = true;
        }
    });
    return rc;
}
/**
 * Charge les objets des widgets
 * @param doc
 * @param evt
 * @param delay
 */
// function showBets(doc, evt, delay) {
//   if (delay == undefined) delay = 10000;
//
//   function _showbet() {
//     if (doc.bets.length > 0) {
//       var elts = [];
//       elts.push(doc.getElementsByTagName("shifu-bet"));
//       elts.push(doc.getElementsByTagName("shifu-betoptions"));
//       elts.push(doc.getElementsByTagName("shifu-timer"));
//
//       for (var i = 0; i < elts.length; i++) {
//         if (elts[i][0].tagName == 'SHIFU-TIMER') elts[i][0].start = doc.bets[doc.currentBet].dtStart;
//         if (elts[i][0].tagName == 'SHIFU-BET' || elts[i][0].tagName == 'SHIFU-BETOPTIONS') elts[i][0].bet = doc.bets[doc.currentBet];
//       }
//     }
//
//     if (doc.currentBet < doc.bets.length - 1)
//       doc.currentBet++;
//     else {
//       doc.currentBet = 0;
//       loadBets(evt.id, function (resp) {
//         doc.bets = resp;
//       });
//     }
//   };
//
//   loadBets(evt.id, function (resp) {
//     doc.bets = resp;
//     _showbet();
//   });
//   setInterval(_showbet, delay);
// }
// function imageSelector(userid, source, query, state, lat, lng) {
//   "use strict";
//   getImageForFlyer(userid, source, query, lat, lng, function (resp) {
//     if (resp.status == 200) {
//       localStorage.images = JSON.stringify(resp.result.items);
//       state.go("imageSelector");
//
//     } else {
//       //
//     }
//   });
// }
function isFavorite(user, widget) {
    if (user.hasOwnProperty("favoriteWidget") && user.favoriteWidget.indexOf(widget.id) > -1)
        return true;
    return false;
}
exports.isFavorite = isFavorite;
function distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //noinspection UnnecessaryLocalVariableJS
    var d = R * c; // Distance in km
    return d;
}
exports.distance = distance;
function distancePlane(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}
exports.distancePlane = distancePlane;
function reduce(pts) {
    var somme = distancePlane(pts[0], pts[1]) + distancePlane(pts[1], pts[2]);
    if (somme == distancePlane(pts[0], pts[2]))
        return [pts[0], pts[2]];
    else
        return pts;
}
exports.reduce = reduce;
function reduce_list(points) {
    var reduce_points = [];
    if (points.length < 3)
        return points;
    for (var i = 0; i < points.length - 3; i = i + 3) {
        reduce([points[i], points[i + 1], points[i + 2]]).forEach(function (p) {
            reduce_points.push(p);
        });
    }
    if (points.length - i > 1) //Ajout les points manquants
        points.slice(i).forEach(function (p) {
            reduce_points.push(p);
        });
    return reduce_points;
}
exports.reduce_list = reduce_list;
function renderDraw(canvas, draws) {
    var ctx = canvas.getContext("2d");
    var started = false;
    draws.forEach(function (draw) {
        if (draw.command == "C")
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (draw.hasOwnProperty("points")) {
            ctx.beginPath();
            ctx.moveTo(draw.points[0].x, draw.points[0].y);
            ctx.strokeStyle = draw.color;
            ctx.lineWidth = draw.pencil + "px";
            for (var i = 1; i < draw.points.length; i++) {
                var pt = draw.points[i];
                ctx.lineTo(pt.x, pt.y);
            }
            ctx.stroke();
        }
    });
}
exports.renderDraw = renderDraw;
function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}
/**
 * Compare la date du dernier ordre local avec le server
 * @param local
 * @param server
 * @returns {string}
 */
function compare(local, server) {
    for (var order in server)
        if (!local.hasOwnProperty(order) || local[order] < server[order]) {
            local[order] = server[order];
            return order;
        }
    return null;
}
/*
 function mustBeRefresh(scope,currentView,func){
 firebase.database().ref('orders/' + scope.event.id + '/dtLastOrder').once("value").then(function(snapshot){
 order=compare(scope.orders,snapshot.val());
 if(order=="playlist" && currentView.stateName=="tabs.home")func();
 if(order=="photo" && currentView.stateName=="tabs.photos")func();
 if(order=="charts" && currentView.stateName=="tabs.charts")func();
 if(order=="user" && currentView.stateName=="tabs.profil")func();
 if(order=="event" && currentView.stateName=="tabs.home")func();
 if(order=="bets" && currentView.stateName=="tabs.bets")func();
 });
 }
 */
function getDelayInDays(dtStart) {
    return Math.round((new Date().getTime() - dtStart) / (3600 * 1000 * 24));
}
exports.getDelayInDays = getDelayInDays;
function getDelayInMinutes(dt) {
    return Math.round((dt - new Date().getTime()) / (60 * 1000));
}
exports.getDelayInMinutes = getDelayInMinutes;
function radians(degrees) {
    return degrees * Math.PI / 180;
}
;
function drawRotated(canvas, image, degrees) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(degrees * Math.PI / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.restore();
}
function rotate(src, angle, quality, func) {
    if (angle == 0)
        func(src);
    else {
        var img = new Image();
        img.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = img.height;
            canvas.height = img.width;
            drawRotated(canvas, this, angle);
            var rc = canvas.toDataURL("image/jpeg", quality);
            func(rc);
        };
        img.src = src;
    }
}
exports.rotate = rotate;
function isFacebookApp() {
    var ua = navigator.userAgent || navigator.vendor;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}
function geocode(googlemaps, address, func) {
    var geocoder = new googlemaps.Geocoder();
    geocoder.geocode({ 'address': address }, function (infos) {
        if (infos.length == 1)
            func({ lat: infos[0].geometry.location.lat(), lng: infos[0].geometry.location.lng() });
        else
            func();
    });
    func();
}
exports.geocode = geocode;
function reverse_geocode(googlemaps, lat, lng, func) {
    var pos = new googlemaps.LatLng(lat, lng);
    var geocoder = new googlemaps.Geocoder();
    geocoder.geocode({ location: pos }, function (results, status) {
        if (status === googlemaps.GeocoderStatus.OK) {
            if (results[0])
                func(results[0].formatted_address);
            else
                func("");
        }
        else
            func("");
    });
}
exports.reverse_geocode = reverse_geocode;
/**
 * Evenement par defaut
 * @param {Number} lat
 * @param {Number} lng
 * @param user
 * @returns {any}
 */
// export function createEvent(lat: Number, lng: Number, user): any {
//   let dtStart = Date.now();
//   let newevent = {
//     title: user.firstname + "'s party",
//     description: "",
//     owner: user,
//     option: {title: true, date: true, address: true, teaser: true},
//     startJetons: 0,
//     visibleOnMap: (user.email.length > 0),
//     website: user.website,
//     lat: lat, lng: lng,
//     dtStart: dtStart,
//     dtStartLocal: new Date(dtStart).toISOString(),
//     activities: DEFAULT_ACTIVITIES,
//     dtEnd: dtStart + Number(8) * 60 * 1000 * 60,
//     duration: 8,
//     address: ""
//   };
//
//   //if (typeEvent == 1) {newevent.activities = ["bets", "loterie", "board"];duration = 2;}
//   //if (typeEvent == 2) {newevent.activities = ["survey"];duration = 2;}
//   //if (typeEvent == 3) {duration = 8;newevent.activities = ["photo"];}
//
//   return newevent;
// }
/**
 * Generate code pour connexion au widget
 * @param elt
 * @param elt_qrcode
 */
// function generateCode(elt, elt_qrcode:any) {
//   var code = tirage(999999).toString(0);
//   localStorage.setItem("code", code);
//   document.getElementById(elt).innerHTML = code;
//   if (elt_qrcode != undefined)
//     getQRCode(DOMAIN_APPLI + "/index.html?code=" + code, 200, "#777777", null, function (code, shorturl) {
//       $(elt_qrcode).src = code;
//     });
//   return code;
// }
function encode(obj) {
    var s = JSON.stringify(obj);
    return btoa(s.normalize());
}
exports.encode = encode;
function restart() {
    //TODO: fonction à compléter car ne dois pas fonctionner sur Android et Ios
    document.location.reload();
}
exports.restart = restart;
function iif(condition, ifTrue, ifFalse) {
    if (ifTrue === void 0) { ifTrue = ""; }
    if (ifFalse === void 0) { ifFalse = ""; }
    if (condition)
        return ifTrue;
    else
        return ifFalse;
}
exports.iif = iif;
/**
 * Construit les tabulation en fonction de l'evenement
 * @param user
 * @param event
 * @returns {any[]}
 */
function buildTabs(user, event, ihm) {
    if (ihm === void 0) { ihm = ""; }
    var tabs = [];
    if (event.activities.indexOf("music") > -1)
        tabs.push({
            name: "music",
            tabTitle: "LIB.MUSIC",
            root: "HomePage",
            tabUrl: "music",
            tabIcon: "musical-notes"
        });
    if (event.activities.indexOf("photo") > -1)
        tabs.push({
            name: "photo",
            tabTitle: "Photos",
            root: "PhotosPage",
            tabUrl: "music",
            tabIcon: "camera"
        });
    if (event.activities.indexOf("command") > -1
        && (event.laCarte != "" || (event.Preparators.indexOf(user.id) > -1)))
        tabs.push({
            name: "command",
            tabTitle: "LIB.COMMAND",
            root: "Command",
            tabUrl: "commands",
            tabIcon: "beer"
        });
    if (event.activities.indexOf("message") > -1)
        tabs.push({
            name: "message",
            tabTitle: "Messages",
            root: "MessagesPage",
            tabUrl: "messages",
            tabIcon: "chatbubbles"
        });
    if (event.activities.indexOf("loterie") > -1 || event.activities.indexOf("bets") > -1 || event.activities.indexOf("survey") > -1)
        tabs.push({
            name: "bet",
            tabTitle: iif(ihm == "pro", "LIB.SURVEY", "LIB.GAMES"),
            root: "BetsPage",
            tabUrl: "games",
            tabIcon: "baseball"
        });
    if (event.activities.indexOf("presentation") > -1)
        tabs.push({
            name: "presentation",
            tabTitle: "LIB.PRESENTATION",
            root: "PresentationsPage",
            tabUrl: "presentations",
            tabIcon: "albums"
        });
    tabs.push({ name: "charts", tabTitle: "People", root: "ChartsPage", tabUrl: "charts", tabIcon: "people" });
    return tabs;
}
exports.buildTabs = buildTabs;
function autoRotate(src, quality, func) {
    var image = new Image();
    image.onload = function () {
        EXIF.getData(this, function () {
            var tags = EXIF.getAllTags(this);
            var angle = 0;
            switch (tags.Orientation) {
                case 8:
                    angle = -90;
                    break;
                case 3:
                    angle = 180;
                    break;
                case 6:
                    angle = 90;
                    break;
            }
            rotate(src, angle, quality, func);
        });
    };
    image.src = src;
}
exports.autoRotate = autoRotate;
/**
 * fonction utilisé pour ajouter un ecran
 */
function askforaddscreen(vm, widget, func) {
    if (widget === void 0) { widget = null; }
    showPopup({ title: "PROFIL.ENTERCODE",
        confirmButton: "LIB.OK",
        cancelButton: "LIB.CANCEL",
        type: "number",
        translate: vm.translate }, vm.alertCtrl, function (res) {
        if (res != null) {
            func(res, widget);
        }
    });
}
exports.askforaddscreen = askforaddscreen;
;
function notif(notif, message, translate) {
    if (notif != null && notif.permission == "granted") {
        if (translate != null) {
            message.body = translate.instant(message.body);
            message.title = translate.instant(message.title);
        }
        notif.create(message.title, message).subscribe(function () { }, function () { });
    }
}
exports.notif = notif;
function getDate(dtStart, lang, onlyHour) {
    if (dtStart === void 0) { dtStart = null; }
    if (lang === void 0) { lang = "FR-fr"; }
    if (onlyHour === void 0) { onlyHour = false; }
    if (dtStart == null)
        dtStart = new Date().getTime();
    var rc = "";
    var dt = new Date();
    dt.setTime(dtStart);
    if (onlyHour) {
        rc = dt.toLocaleTimeString(lang);
        rc = rc.split(":")[0] + "h" + rc.split(":")[1];
    }
    else
        rc = dt.toLocaleString(lang);
    return rc;
}
exports.getDate = getDate;
//# sourceMappingURL=Maintools.js.map

/***/ }),

/***/ 228:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 228;

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var api_1 = __webpack_require__(16);
var Maintools_1 = __webpack_require__(2);
/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var SettingsProvider = /** @class */ (function () {
    //Designe l'adresse du theme
    function SettingsProvider(platform, api) {
        this.platform = platform;
        this.api = api;
        this.app_name = "Shifumix";
        this.app_version = "0.6.001";
        this.version = 0;
        this.lastSearchImage = "\#";
        this.lastImages = [];
        this.musicChartsItems = null;
        this.code = null;
        this.ihm = "perso";
        this.autologin = 0;
        this.connexion = "";
        this.login_email = "";
        this.lastyear = "";
        this.lastcatalogue = "";
        this.lastquery = "";
        this.dest = "";
        this.logo = "./assets/img/logo440diskonly.png";
        this.isLocal = false;
        this.about_url = "https://shifumixweb.appspot.com/about.html";
        this.forum_url = "https://www.tapatalk.com/groups/shifumix/forum-f2/";
        this.feedback_url = "https://feedback.userreport.com/ef6875fa-89ce-4b14-8917-b702aec7c6cc/";
        this.blog_url = "https://shifumixwww.wixsite.com/shifumix/blog";
        this.theme = "";
        this.services = null;
        this.lastRefresh = []; //Dernier rafraichissement de la page
        this.version = Number(this.app_version.substr(0, this.app_version.lastIndexOf(".") - 1));
        this.ihm = platform.getQueryParam("ihm");
        if (this.ihm == null)
            this.ihm = "perso";
        this.connexion = platform.getQueryParam("connexion");
        if (this.connexion == null)
            this.connexion = "";
        this.autologin = platform.getQueryParam("autologin");
        if (this.autologin == null)
            this.autologin = 0;
        this.login_email = platform.getQueryParam("login_email");
        if (this.login_email == null)
            this.login_email = "";
        this.theme = platform.getQueryParam("theme");
        if (this.theme == null)
            this.theme = "";
        this.isLocal = (Maintools_1.DOMAIN_APPLI.indexOf("localhost") > -1);
    }
    //test : http://localhost:8101/?server=local&theme=http://localhost:8080/assets/data/theme_google.json
    /**
     * Charge un theme, sera utile pour faire une déclinaison en marque blanche
     */
    SettingsProvider.prototype.loadtheme = function () {
        var _this = this;
        if (this.theme.length > 0) {
            this.api.loadtheme(this.theme).subscribe(function (th) {
                _this.logo = th.logo;
                _this.app_name = th.app_name;
                _this.about_url = th.about_url;
                _this.forum_url = th.forum_url;
                _this.feedback_url = th.feedback_url;
                _this.blog_url = th.blog_url;
            });
        }
    };
    /**
     * Permet d'évitement les échos d'order (notamment le double déclenchement du onSave de presentation)
     * @param {string} page
     * @param {boolean} force
     * @param {number} delay
     * @returns {boolean}
     */
    SettingsProvider.prototype.mustRefresh = function (page, delayInMilliseconds) {
        if (delayInMilliseconds === void 0) { delayInMilliseconds = 2; }
        if ((new Date().getTime() - this.lastRefresh[page]) < delayInMilliseconds)
            return false;
        this.lastRefresh[page] = new Date().getTime();
        return true;
    };
    SettingsProvider = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ionic_angular_1.Platform, api_1.ApiProvider])
    ], SettingsProvider);
    return SettingsProvider;
}());
exports.SettingsProvider = SettingsProvider;
//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 274:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 274;

/***/ }),

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by u016272 on 19/09/2016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function getLibs() {
    var libs = []; //Libellés liés aux RH
    libs.push({
        'lang': 'en',
        'labels': {
            'MUSICSERVER.PERSODESCRIPTION': "You are the DJ, you choose the music but you can use the shifumix playlist to be inspired",
            'MUSICSERVER.SPOTIFYDESCRIPTION': "To start the music, run spotify on a device and click on start in the profil screen",
            'MUSICSERVER.DEEZERDESCRIPTION': "Connect a computer to your audio system and open http://player.shifumix.com on it",
            'MUSICSERVER.MULTIPLEDESCRIPTION': "Multiple use Deezer, Youtube and MP3 files (on your Google Drive) as music. Connect a computer to your audio system and open http://player.shifumix.com on it",
            'MUSICSERVER.YOUTUBEDESCRIPTION': "Connect a computer to your audio system and open http://video.shifumix.com on it",
            'PERSO.MUSICSERVER': "What is your musical catalog ?",
            'ADDEVENT.TITLE': 'Make your event',
            'ADDEVENT.VISIBLEONMAP': "Public event",
            'ADDEVENT.USEFACEBOOK': "Use facebook as model for your event ?",
            'LIB.ADDRESS': 'Address',
            'ADDEVENT.DEFAULTADDRESSCHANGE': 'Your address has been changed',
            'LIB.DURATION': 'Duration',
            'LIB.RANDOM': "Random",
            'LIB.STARTIN': "Start in",
            'LIB.PERSONS': "People",
            'LIB.VIEW': "View",
            'LIB.CHARTS': "Charts",
            'LIB.WEBLINK': "Image URL",
            'LIB.UPLOAD': "Upload",
            'LIB.UPLOADING': "Uploading",
            'LIB.NOTHING': "Nothing",
            'LIB.FILTER': "Filter",
            'LIB.WIDGET': "iWall",
            'LIB.FAVORITE': "Favorite",
            'LIB.PARTICIPANTS': "presents",
            'LIB.SONG': "song",
            'LIB.BOARD': "Board",
            'LIB.AUTOEVENT': "Simplified Event",
            'LIB.LEGEND': "Legend",
            'LIB.SAVE': 'Save',
            'LIB.BEGININ': "Start in",
            'LIB.DESCRIPTION': "Description",
            'LIB.TEASER': "Teaser",
            'LIB.SETTINGS': "Settings",
            'LIB.INVITE': "Invite",
            'LIB.TITLE': "Title",
            'LIB.VALIDATE': "Validate",
            'LIB.CREDITS': "credits",
            'LIB.DEBITS': "debits",
            'LIB.REPUTATION': "reputation",
            'LIB.SCREENCODE': "Screen Code",
            'LIB.CLEAR': "Clear",
            'LIB.UPDATE': "update",
            'LIB.MODERATOR': "Moderator",
            'LIB.PREPARATOR': "Preparator",
            'LIB.CASHIER': "Cashier",
            'LIB.EVENTMASTER': "Event Master",
            'LIB.ENDIN': "End in",
            'LIB.HTAG': "HTag",
            'LIB.YOUHAVE': "You have ",
            'LIB.TARIFS': "Tarifs",
            'LIB.ABO': "Subscription",
            'LIB.NEWEVENT': "New event",
            'LIB.ENGAGEMENT': "Commitment",
            'LIB.DAYS': "days",
            'LIB.OLDEVENTS': "Old events",
            'LIB.NEXTEVENTS': "Next events",
            'LIB.TERMINATED': "Terminated",
            'LIB.SCREEN': "Screen",
            'LIB.NOTORIETY': "notoriety",
            'LIB.LOGIN': "Login",
            'LIB.BUILDING': "Building of",
            'LIB.NOW': "Now",
            'LIB.JOIN': "Join",
            'LIB.FORTHISEVENT': "for this event",
            'LIB.CLEARACCOUNT': "Clear account",
            'LIB.TIRAGEDANS': "Tirage dans",
            'LIB.SUBSCRIBE': "Subscribe",
            'LIB.CAGNOTTE': "Start width",
            'LIB.NEXT': "Next",
            'LIB.EVENT': "Event",
            'LIB.EVENTCLOSING': "Event closing ?",
            'LIB.NOTRECOMMENDED': "Not recommended",
            'LIB.CHECKYOUREMAIL': "Check your email",
            'LOGIN.CODESENDED': "A secret code to connect to Shifumix has been send by email",
            'LOGIN.SENDPASSWORD': "Resend my secret code",
            'LOGIN.CONNEXIONINVITATION': "Connect you with ...",
            'SELEVENT.CREATE': 'New Event',
            'SELEVENT.NOEVENT': 'Create your Event !',
            'SELEVENT.WELCOME': 'Hello, Find an event !',
            'SELEVENT.LOCALIZING': 'Localization',
            "PERSO.NOSERVICE": "No service",
            "OLDEVENTS.EVENTCODETITLE": "Event code ?",
            "OLDEVENTS.NOEVENTFORTHISCODE": "No event for this code",
            "OLDEVENTS.JOINBYCODE": "By code",
            "INVITE.SENDTOME": "View on my mail",
            'PERSO.GIVEYOURPLATFORM': "Which is your service to listen music ?",
            'ADDEVENT.START': "Start",
            'SELEVENT.TOOFAR': "You are too far for this event",
            'SELEVENT.USELASTPOSITION': "No geolocalisation, Last position used",
            'SELEVENT.ENTERYOURCODE': "Enter your code",
            'SELEVENT.PRIVATE': "Private event. Enter the password",
            'PROFIL.PLAYER': "To play the playlist on your audio system",
            'PROFIL.GALLERY': "Connect this computer to a public display",
            'PROFIL.SLIDESHOW': "Connect this computer to a public display",
            'PROFIL.PHOTOSHOW': "Photos animation",
            'PROFIL.CHARTSSCORE': "See the charts in notoriety",
            'PROFIL.RESET_SECRETCODE': "Reset my code",
            'PROFIL.CHARTSCREDIT': "See the charts in money",
            'PROFIL.LOC_QUERY': "Text to ask localisation",
            'PROFIL.PROMOTION': "Inscription screen",
            'PROFIL.BETSURVEY': "Bet and Survey screen",
            'ADDEVENT.LABELSONG': "songs",
            'ADDEVENT.FINDFLYER': "Images for your flyer",
            'SURVEY.SHARE': "Survey / Bet shared",
            'HOME.ADDSONGONLYBYOWNER': 'Add song only by moderator',
            'HOME.ADDSONG': 'Track',
            'LIB.DOWNLOAD': "Download",
            'PHOTO.DELETED': "Photo deleted",
            'PHOTO.PREPAREPHOTO': "Preparing ...",
            'PHOTO.KEYWORDSEARCH': "#Htag to find image",
            'PHOTO.LABELMESSAGE': "Enter your message",
            'ADDEVENT.VISIBLE': "Event visible at",
            'ADDEVENT.VISIBILITY': "Event's Visibility",
            'ADDEVENT.SONGSBYDEFAULT': "Start playlist with ",
            'ADDEVENT.WELCOMESCREEN': "Welcome Page",
            'ADDEVENT.WELCOMEPICTURE': "Welcome Picture",
            'ADDEVENT.WELCOMEDURATION': "Duration for the welcome page",
            'ADDEVENT.BEGININ': "Begining of the event",
            'LIB.MYEVENTS': "My events",
            'BETS.NEEDVALIDATIONBEFORE': "Your game wait his validation.",
            'SELEVENT.EVENTS': "Events on map",
            'ADDEVENT.CHANGETEMPLATE': "Image",
            'BOARD.SENDPHOTO': "Photos",
            'SELEVENT.NOTENOUGHTSCORE': "Not enought score to create event",
            'SELEVENT.DEMOEVENT': "Evenement de démonstration en construction",
            'SELEVENT.FACEBOOKPAGES': "Your facebook pages",
            'PROFIL.CLOSE_EVENT': "Close This Event",
            'PROFIL.ANONYMOUS': "Anonymous",
            'PROFIL.CHANGE_PLAYERTYPE': "Music platform",
            "PHOTO.TAKEPICTURE": "Take a picture",
            'BETS.DELETE': "Pari deleted",
            'BETS.VOTESRESTANT': "votes available",
            'BETS.GAIN': "Gain between",
            'ADDEVENT.MAXGUEST': "Max guest",
            'ADDEVENT.CGU': "Conditions of use",
            'LIB.SIGNATURE': "Accept",
            'LIB.NEXTSLIDE': "Next slide",
            'ADDEVENT.FLYERPREVIEW': "Flyer preview",
            'ADDEVENT.ACTIVITIES': "Activities",
            'INVITE.MAIL': "Mail address of the person to invite",
            'ADDEVENT.DESCRIPTION': "Teaser of your event",
            'ADDEVENT.WEBSITE': "Web site of your event",
            'ADDEVENT.CHOOSEFILE': "Select an image file",
            'ADDEVENT.PLAYLISTLIMIT': "Playlist size",
            'ADDEVENT.PLAYLISTLIMITBYUSER': "Playlist limit by user",
            'ADDEVENT.PREPLAYLISTLIMIT': "Pre-playlist size",
            'ADDEVENT.MINDISTANCE': "Min distance to enter",
            'BETS.GAINS': "You can win ",
            'WIDGET.CATEGORIES': "Music,Photos,Messages,Bets,Surveys,Tombola,Orders,Others",
            'WIDGET.CATEGORIESFILTER': "Music,Photos,Messages,Bets,Survey,People,Presentation,Commands",
            'BETS.MESSAGEMISE': "Amount of your bet until ",
            'BETS.BETCLOSED': "Sorry ! the bet is closed now",
            'IMAGECREATOR.NOIMAGE': "No image, try another query",
            'PHOTO.ADDPHOTOONLYBYOWNER': 'Add photo only by moderators',
            'ADDBETS.TITLE': "Title (as question)",
            'OLDEVENTS.BESTEVENTFORME': "Iterested events",
            'ADDBETS.STARTBET': "Start in ",
            'PRESENTATION.PRICEPERMINUTE': "Price per minute",
            'PRESENTATION.MAXPRESDURATION': "Max presentation duration",
            'LOTERIE.BUYERS': "%1 gamer",
            'SELEVENT.LOGOUT': "Change profil",
            'SELEVENT.TITREPROFIL': "Your profil",
            'SELEVENT.TITLE': "Find events",
            'SELEVENT.NOTSTART': "Event not opened",
            'SELEVENT.FACEBOOKEVENTS': "Your facebook events & places",
            'INVITE.COPY': "Copy the link",
            'PERSO.QUERYAVATAR': "Type of avatar ?",
            'PERSO.CHOOSEAVATAR': "Choose your new avatar",
            'LIB.FOLLOWERS': "Followers",
            'MESSAGE.ENTERDELAY': "Delay to show the message",
            'MESSAGES.LIMITBYUSER': "Limit of message post by user",
            'MESSAGE.SCHEDULEDMESSAGE': "Scheduled messages",
            'LIB.LOTERIE': "Lotery",
            'INVITE.PERSONAL': "Personal",
            'INVITE.DEST': "Email to invited",
            'INVITE.SHARETITLE': "Invite your friends and followers",
            'INVITE.SENDINVITATION': "Share by mail",
            'SELEVENT.LOCALISE': "Find me",
            'INVITE.SEND': "Send",
            'PHOTO.DOWNLOAD': "Photos download",
            'ADDEVENT.APARTIRDE': "Start time",
            'INVITE.CANCEL': "probleme to invite",
            'SELEVENT.MYLASTEVENTS': "My last events",
            'WIDGET.DESCRIPTION': "iWall description 'beginning by 'a', 'an', 'the' ...",
            'WIDGET.CODE': "HTML code and javascript",
            'PRESENTATION.PRICETOPRESENT': "iCoin to present",
            'INVITE.YOURSELF': "you can't invite yourself",
            'INVITE.FOLLOWERS': "Invite my followers",
            'INVITE.CONFIRM': " receive invite in 1 minutes",
            'INVITE.FRIENDSTOINVITE': "Contacts",
            'INVITE.VIAFACEBOOK': "Send or share the event link on facebook",
            'ADDEVENT.MINCREDIT': "Min. credits",
            'ADDEVENT.MINSCORE': "Min. notoriety",
            'SEARCH.WAITING': "Searching",
            'SEARCH.CONFIRMADD': " songs added",
            'SEARCH.ADDAUTO': "Auto",
            'PERSO.RAZUSER': "You want delete your account from our database. It's irreversible. If you're sure, write 'yes'",
            'ERROR.SPOTIFYCONFIG': "You must refresh the Spotify service",
            'ERROR.NEEDSPOTIFYPREMIUMACCOUNT': "You need a spotify premium account to use spotify catalog",
            'ERROR.DEEZERCONFIG': "You must refresh the Deezer service",
            'PHOTO.WITHMESSAGE': "Photo with message",
            'ADDEVENT.HTAG': "Twitter hTAG",
            'CLOSEDEVENT.USEASMODEL': "Use it as model",
            'PROFIL.DELPHOTO': "Block",
            'PREPARE.NEWCARTE': "New menu",
            'PROFIL.ONLYPLAYLIST': "My playlist only",
            'PROFIL.VALIDATE': "Allow",
            'PROFIL.BLACKLIST': "Blacklist",
            'PROFIL.QUIT_EVENT': "Leave",
            'PROFIL.STARTNEXT_EVENT': "Start",
            'BETS.GIVESOMESCOINBEFORECREATEBETS': "No people can play to your bet because of iCoin.",
            'WIDGETSTORE.SEARCH': "iWall name",
            'PERSO.CHECKEVENT': "Check event",
            'PROFIL.SEARCHSOURCE': "Search source",
            'PERSO.EMAIL': "Your email",
            'PROFIL.GENERAL': "This plugin show any news in the event",
            'PROFIL.LINKTOWIDGET': "iWall",
            'PROFIL.PASSTOPREMIUM': "Premium Event",
            'MUSICSERVER.TITLE': "Music server",
            'PROFIL.ENTERCODE': "iWall code (6 digits)",
            'PROFIL.CONFIRMPASSTOPREMIUM': "Pass to premium, Are you sure ?",
            'PROFIL.PLAYLIST': "Share the current playlist on a screen",
            'PROFIL.VIDEOS': "Show the video playlist of your event",
            'PROFIL.NEEDTOBECLOSE': "Attendees need to be close",
            'PHOTO.ENTERMESSAGE': "Enter the message",
            'PHOTO.SENDED': "Photo sended",
            'PHOTO.NOTSENDED': "Photo not sended",
            'ERROR.BADPASSWORD': "Bad password",
            'ADDBETS.NEWOPTION': "New choice",
            'ADDBETS.NBVOTE': "Votes by user",
            'ADDBETS.ENDBET': "Duration",
            'ADDEVENT.INSTANTPARTY': "Full party",
            'ADDEVENT.EVENTDESCRIPTION': "Description of your event",
            'ADDEVENT.INSTANTBET': "Bets",
            'ADDEVENT.INSTANTSURVEY': "Survey",
            'ADDEVENT.INSTANTTITLE': "Create instant event",
            'ADDEVENT.USEMODELS': "Other templates",
            'OLDEVENTS.PARTICIPATEDEVENT': "Participated events",
            'ADDEVENT.SETTINGS': "Advanced settings",
            'ADDEVENT.SETDATES': "Start and duration",
            'ADDBET.CAGNOTTE': "Start bet with",
            'ADDBET.PUBLISHING': "Bet/survey online",
            'ERROR.SONGALLREADYPLAYED': "Song already played",
            'ADDBET.MINAMOUNT': "minimum bet at",
            'INVITE.CONTACTPROVIDER': "Contacts provider",
            'WIDGET.COPYCODE': "Copy the code",
            'WIDGET.TITLE': "Titre du iWall",
            'WIDGET.PERSO': "iWall personnalisation",
            'ADDBETS.DESCRIPTION': "Description (optionnal)",
            'ADDEVENT.NEEDLOC': "You must set a position for the event",
            'PRESENTATION.DELAYBETWEENPRESENTATION': "Delay between two presentation",
            'ADDEVENT.NEEDVALIDATE': "Content need moderation",
            'ADDEVENT.ACT_MUSIC': "Music playlist",
            'ADDEVENT.ACT_MESSAGE': "Public messages",
            'ADDEVENT.ACT_COMMAND': "Phone orders (experimental)",
            'ADDEVENT.ACT_BOARD': "Social board (experimental)",
            'ADDEVENT.ACT_LOTERIE': "Loterie / Tombola (experimental)",
            'ADDEVENT.INSTANTPHOTOPARTY': "Photos party",
            'ADDEVENT.ACT_PHOTO': "Photo sharing",
            'ADDEVENT.ADDRESS': "Address",
            'PROFIL.LINKTOOWNER': "Owner",
            'ADDEVENT.FLYERBUILDING': "Event building ...",
            'PROFIL.LOTERIE': "Show your tombola",
            'ADDEVENT.ACT_BETS': "Bets (expérimental)",
            'ADDEVENT.CHANGEDEFAULTADDRESS': "My address",
            'ADDEVENT.ACT_SONDAGE': "Instant survey",
            'HTMLEDITOR.TITLE': "HTML editor",
            'ADDBETS.OPTIONSLIST': "Choices / Options",
            'ERROR.ACTIVESSONGEXCEED': "Waiting for your songs has been played. You can also delete some song in the current playlist",
            'ERROR.PLAYLISTNUMBEREXCEED': "Playlist full",
            'ADDEVENT.LIBPASSWORD': "Password to connect",
            'WIDGETHOME.ENTERCODE': "Enter this code to connect to your event",
            'ADDEVENT.ADVANCESETTINGS': "Advance settings",
            'WIDGETSTORE.NEWWIDGET_TITLE': "My iWall title",
            'SCREEN.WARNINGNOSCREEN': "No new connexion, are you sure about the code you enter and the internet connexion of the screen ?",
            'WIDGETSTORE.NEWWIDGET_DESCRIPTION': "iWall description",
            'CHARTS.EARNCREDITS': "Earned Credits",
            'BETS.INFOLOTERIE': "You can play for only ",
            'CHARTS.EARNNOTORIETY': "Earned Notoriety",
            'CHARTS.TOTALCREDITS': "Total Credits",
            'PERSO.PROFILCHANGE': "Now, you can see the public events",
            'CHARTS.TOTALNOTORIETY': "General Notoriety",
            'GEN.VIEWNOTAVAILABLE': "Not available for this event",
            'LIB.HELLO': "Hello",
            'LIB.EVENTCODE': "Event code",
            'LIB.WITHHIM': "with him",
            'LIB.PROFIL': "Profil",
            'LIB.BET': "Bet",
            'LIB.PUBLISHONTWEETER': "Publish on tweeter",
            'LIB.CANCELMODIF': "Cancel your modifications",
            'LIB.DELETE': "Delete",
            'LIB.PRINT': "Print",
            'LIB.DAY': "days",
            'LIB.CLOSE': "Close",
            'LIB.MALE': "Male",
            'LIB.FEMALE': "Female",
            'LIB.FINDEVENTS': "Find events",
            'LIB.TRAJET': "Road",
            'LIB.PHOTO': "photo",
            'LIB.FOLLOW': "Receive his next events",
            'LIB.LOGOUT': "Log out",
            'LIB.LOCALISE': "My position",
            'LIB.DATE': "Date",
            'LIB.LOADING': "Loading ...",
            'LIB.SENDING': "Sending ...",
            'LIB.COMMAND': "Command",
            'LIB.ONGOING': "on going ...",
            'LIB.READY': "Ready",
            'LIB.PREPARE': "Prepare",
            'LIB.PAY': "Pay",
            'LIB.TAKED': "Taken",
            'LIB.QUESTION': "Brainstorm",
            'LIB.RESPONS': "Respons",
            'LIB.CANCELED': "Canceled",
            'LIB.PERSON': "Persons",
            'LIB.UNDO': "Undo",
            'LIB.TUTORIAL': "Tutorial",
            'LIB.ABOUT': "About",
            'LIB.PUBLISH': "Publish",
            'LIB.PENDING': "Pending",
            'LIB.MINUTES': "Minutes",
            'LIB.HOUR': "hrs",
            'LIB.EARNED': "You win",
            'LIB.TOTAL': "You have",
            'LIB.USE': "Use",
            'LIB.CATEGORY': "Category",
            'LIB.TOBET': "Bet",
            'LIB.MODELS': "templates",
            'LIB.PRIVACY': "Privacy",
            'LIB.PLAY': "Play",
            'LIB.OK': "Ok",
            'LIB.TEXTINCLIPBOARD': "Text in the clipboard",
            'LIB.YES': "Yes",
            'LIB.NO': "No",
            'LIB.OVER': "is over",
            'LIB.MYPROFIL': "My profil",
            'LIB.SUMMARIZE': "Summarize",
            'LIB.PEOPLE': "People",
            'LIB.PRESENTATION': "Presentations",
            'LIB.MUSIC': "Music",
            'LIB.GAMES': "Games",
            'LIB.SURVEYS': "Surveys",
            'LIB.WINNER': "Winner",
            'LIB.PASSWORD': "Password",
            'LIB.CLOSED': "Terminate",
            'LIB.AGREE': "Agree",
            'LIB.DISAGREE': "Disagree",
            'LIB.RAZ': "Reset my account",
            'LIB.TERMOFUSE': "Term of Use",
            'LIB.NEW': "New",
            'LIB.BUY': "Buy",
            'LIB.INVITATIONPERMANENT': "Standing invitation",
            'LIB.CANCEL': "Cancel",
            'LIB.SEARCH': "Search",
            'LIB.SURVEY': "Survey",
            'LIB.DATEFORMAT': "MM-dd hh:mm",
            'LIB.SEND': "Send",
            'LIB.REMOTE': "Remote",
            'LIB.COMMANDPANEL': "Commands waiting",
            'LIB.ERRORRETRY': "Treatment error, retry please",
            'LIB.ACCOUNT': "Account",
            'LIB.INVITATION': "invitation",
            'LIB.VOTE': "votes",
            'LIB.BY': "by",
            'LIB.COPY': "Copy",
            'LIB.MEETING': "Meeting",
            'LIB.PARTY': "Party",
            'LIB.FROM': "From",
            'LIB.TO': "at",
            'LIB.MODIFY': "Change",
            'LIB.TAGS': "tags",
            'LIB.START': "Start",
            'LIB.EDIT': "Edit",
            'LIB.WHO': "Who ?",
            'LIB.PHONE': "Phone",
            'LIB.NOMUSIC': "No music",
            'LIB.MULTIPLE': "Multiple",
            'LIB.FIRSTNAME': "Firstname",
            'LIB.SWALLSTORE': "sWALL store",
            'HOME.CONFIRMDELETE': "Delete this song ?",
            'HOME.ADDSONGAUTO': "Random",
            'LOGIN.WRONGPASSWORD': "Wrong secret code",
            'LOGIN.FASTAUTHENT': "Fast Login (Anonymous)",
            'LOGIN.PSEUDO': "Give a name for this event",
            'HOME.SONGDELETED': "Song deleted",
            'WIDGET.VIEWONSCREEN': "Show on another screen (with a code)",
            'WIDGET.OPENONTHISSCREEN': "Open the iWall on this screen",
            'SELEVENT.BLACKLIST': "Sorry, you can't enter. You are blacklisted by the owner of this event",
            'HOME.FULLPLAYLIST': "Playlist full",
            'ERROR.LOSTNETWORK': "Network not available",
            'HOME.WAITINGFORPLAYER': "Waiting for spotify player",
            'SELEVENT.NOTEXIST': "This event is closed",
            'ADDEVENT.TYPEEVENT': "Type of event ?",
            'SEARCH.PLAYLISTANALYSIS': "Loading your playlists",
            'BETS.NOTENOUGHTTIMETOBET': "Not enought delay to make a bet",
            "BETS.LOTERIEWAITINGVALIDATE": "Give the gift to a moderator to publish the loterie",
            'BETS.ADDBUTTON': "Make your bet / survey",
            'BETS.CANCELCONFIRMATION': "You don't choose any respons, the bet is canceled ?",
            'ADDEVENT.MINSONGSINPLAYLIST': "Minimal size of the playlist",
            'BETS.SHARED': "Bet shared",
            'ERROR.NOANONYMOUSINPUBLICEVENT': "Public event are not available for anonymous user",
            'BETS.LIMITOPTIONS': "Max options number by Survey/Bet",
            'BETS.YOUWIN': "You win !",
            'BETS.YOULOOSE': "Sorry, you loose",
            'SCREENS.WAITING': "Waiting for screen connexion",
            'BETS.WINLOTERIE': "Ask your present the organizer then press ",
            'BETS.SHARETITLE': "Sharing bet with your friends",
            'ADDEVENT.STARTJETONS': "Give some sCoin as start gift",
            'BETS.WAITPAY': "Waiting for the result to be payed",
            'PERSO.YOUROFFER': "Your offer",
            'ADDEVENT.EVENTADDRESS': "Event address",
            'PROFIL.FOLLOWER': "Follow the organiser",
            'SELEVENT.ASKLOCALISE': "Share my position with Shifumix",
            'PROFIL.CHANGESETTINGS': "Settings of your profil",
            'SELEVENT.CREATEEVENT': "Create your own event",
            'SELEVENT.CLOSE': "Event closed",
            "PERSO.PROFILTITLE": "Type of event",
            "PERSO.HOME": "Your website",
            'SELEVENT.JOIN': "to join an event",
            'SELEVENT.CHANGESETTINGS': "Set your Shifumix profil",
            'SELEVENT.AUTOCONNEXION': "Connexion event checking ...",
            'PROFIL.YOURTAGS': "Your tags",
            'CLOSEDEVENT.TITLE': "Closed event",
            'CLOSEDEVENT.CREATEPLAYLIST': "Save the playlist of this event",
            'PROFIL.MCTITLE': "Master of Ceremony",
            'PROFIL.WIDGETTITLE': "iWall to show your event",
            'HOME.ADDSONGAUTOTITLE': "How many songs to add automatically ?",
            'PROFIL.MULTIPHOTO': "3 last photo",
            'PROFIL.BOARD': "Share the social board",
            'PROFIL.CHARTS_RE': "Share the reputation chart",
            'LIB.PUBLISHONTWITTER': "Share on tweeter",
            'PROFIL.LASTTWEET': "The last message",
            'PROFIL.THREETWEET': "The last 3 messages",
            'PROFIL.SELFSERVICE': "Self-service",
            'CHARTS.GIVEALL': "Presents",
            'LOGIN.WELCOME': "Welcome on Shifumix",
            'CHARTS.GIVETOKENTOALLTITLE': "sCoin bonus to give to all guest",
            'LIB.AMOUNT': "Amount",
            'ADDEVENT.AUTOLOGIN': "No authentification required (auto-login)",
            'PHOTO.WAITFORVALIDATION': "Photo not shared, validation in progress ...",
            'WIDGETSTORE.TITLE': "iWall store",
            'SELEVENT.JETONS': "You have ",
            'BETS.EVALUATE': "Evaluate the bet's maker",
            'BETS.RESPONSE': "Response to win",
            "ADDLOTS.STARTBET": "Start play",
            "ADDLOTS.DURATION": "Duration",
            "ADDLOTS.MINCREDIT": "Minimum sCoin to start the toss",
            "ADDLOTS.MAXCREDITS": "Maximum sCoin per person",
            'LIB.MUSICCHARTS': "Music Charts",
            "ADDLOTS.TITLE": "Title of your item",
            "ADDLOTS.DESCRIPTION": "Description of your item",
            'PROFIL.RUNREMOTEPLAYER': "Play",
            'PROFIL.STOPREMOTEPLAYER': "Stop",
            'PROFIL.NEXTREMOTEPLAYER': "Next",
            'BETS.ADDONLYBYOWNER': 'Only moderator can add bets, survey and game',
            'SEARCH.LIBSEARCH': "Title + Artist to find",
            'SEARCH.PLAYLISTLOADING': "Playlists loading",
            'SEARCH.LIBBUTTON': "Search",
            'WIDGET.FAVORITE': "Add to my favorite iWall",
            'WIDGET.PUBLIC': "Public iWall",
            'PRESENTATION.QUESTIONADDTOMESSAGE': "Question added to message queue",
            'LIB.SECRETCODE': "Secret Code (4 digits)",
            'LIB.YOURCLOUD': "Your cloud",
            'WIDGET.CLONE': "Clone",
            'WIDGET.VIEWONPHONE': "See this sWall on a phone",
            'WIDGET.VIEWONFIRSTSCREEN': "View on your screens",
            'PERSO.HUMEUR': "A little sentence about you",
            'PERSO.CHANGEMUSICSERVER': "Music provider",
            'PRESENTATION.DONWLOADBEFOREPRES': "Download before presentation",
            'PERSO.GIVEEMAIL': "Register my email",
            'ERROR.USER_ALREADY_INVITED': "Person already invited",
            'INFO.SCORELOWTOADDSONG': "your score is very low to add new song",
            'INFO.ANONYMOUSLIMIT': "You can't create ou participate to public event (only private event). Your account is available only on this device and if you logout, you lost your account",
            'INFO.ANONYMELOGOUT': "Be careful, if you logout from your account, you lost all your events, profil informations. To avoid this, attach an email to this account",
            'SEARCH.NOSONGSINPLAYLIST': "No playlist available",
            'SEARCH.NOAVAILABLE': "Song not available for this event",
            'SEARCH.GOPLAYLIST': "My playlists",
            'ADDEVENT.ADVANCED': "Advanced settings",
            'SELEVENT.EVENTBYCODE': "Event by code",
            'ADDEVENT.BUILDINGYOUREVENT': "Building your event",
            'SEARCH.ADDALL': "Add All",
            "INVITE.EVENTCODE": "Invite event code",
            'WIDGET.IFRAME': "iWall building",
            'WIDGET.URL': "URL to send",
            'WIDGET.PARENTSTYLE': "iWall style inherited from parent",
            'WIDGET.OPEN': "Open",
            'WIDGET.HTML': "Edit",
            'WIDGET.ONLYFORTHISEVENT': "Only for this event",
            'WIDGET.INPOURCENT': "In pourcent",
            'SCREEN.NAMEFORSCREEN': "Name for the screen",
            'WIDGET.URLINCLIPBOARD': "link in the clipboard",
            'WIDGET.NEWEVENT': "New event template",
            'WIDGET.WIDGETLINK': "Paste the iWall link on your website",
            'LOGINAVATAR.TITLE': "Choose an avatar",
            'WIDGET.IFRAMEINCLIPBOARD': "iWall in the clipboard",
            'LIB.WIDTH': "Width",
            'TARIF.NEWUSERS': "New users since last payment",
            'LIB.DISCOUNT': "Discount",
            'LIB.HEIGHT': "Height",
            'LIB.PLAYLIST': "Playlist",
            'LIB.ACTORS': "Actors",
            'LIB.ACTRESS': "Actresses",
            'LIB.EMOJIS': "Emojis",
            'LIB.THEMOVIE': "The movie",
            'LIB.INVERSECOLOR': "Reverse color",
            'LIB.HYPERLINK': "Internet link",
            'PHOTO.SENDING': "Sending ...",
            'LIB.EVENTS': "Events",
            'LIB.MONEY': "€",
            'LIB.TARIF': "Tarif",
            'LIB.PRIORITY': "Priority",
            'TARIF.NEXTPAYMENT': "Next payment",
            'ERROR.NOTENOUGHTREPUTATIONTOJOIN': "Not enought reputation to join this event",
            'LOGIN.WELCOMECREATEEVENT': "Before to create your event, you must login",
            'ADDEVENT.GIVETITLE': "Give a title to your event",
            'INVITE.CHECKYOUREMAIL': "Check your email",
            'HTMLEDITOR.WIDGETCODE': "iWall HTML code",
            'BETS.VOTESENDING': "Vote sending",
            'BETS.NORESPONS': "No response available",
            'ADDEVENT.ALLOWANONYMOUS': "Allow anonymous user (not recommended)",
            'BETS.YOUMUSTGIVERESPONS': "Your bet is over. You must give the respons",
            'SELEVENT.ASKFORLOCALISATION': "I can propose some events around you if you share your position with me",
            'ADDBET.PATTERNTITLE': "Pattern title (explicit title)",
            'CLOSEDEVENT.PUSHSONG': "songs proposed",
            'ADDBETS.NBRESPONS': "Number of respons by user",
            'ERROR.ACTIFBETSEXCEED': "Actif bet exceed",
            'ERROR.NOTENOUGHCREDITS': "Not enough credits for this bets",
            'ERROR.NOACTIVEPLAYER': "No active player to play songs",
            'ERROR.NOTENOUGHTSCORE': "Not enough score to add song",
            'COMMAND.READY': "Your command is ready, take it on the bar",
            'COMMAND.READYWITHTABLE': "Your command is ready, waiting for a minute",
            'INFO.LASTBET': "Last actif bet",
            'SURVEY.SHARED': "Survey shared",
            'MESSAGES.YOURMESSAGE': "Write your message here",
            'BETS.BETSENDING': "Bet sending",
            'BETS.WINAMOUNT': "You win ",
            'CHARTS.BONUSFORNEWCOMER': "Newcomers",
            'CHARTS.GIVETONEWCOMERTITLE': "Amount for the new commers",
            'PUBLICPROFIL.GIVEEMAILTOFOLLOW': "To follow an organiser you must give your email (to receive the invitations)",
            'CHARTS.GIVESCOIN': "iCoin for",
            'SCREEN.CHOOSEWIDGET': "Choose a iWall for your screen",
            'BETS.LOSTAMOUNT': "You lose ",
            'LIB.SCREENS': "Shared screens",
            'BETS.NOTENOUGHTTIMETOSONG': "Unsufficient time to push another song",
            'BETS.ALIASVALUE': "Value for the alias : ",
            'ADDBETS.PATTERNLISTTITLE': "Bet pattern list",
            'CHARTS.ENDPARTY': "End:",
            'CHARTS.SHOWTOTAL': "See the total",
            'PERSO.TITLE': "Personnal settings",
            'PROFIL.LABELSERVICETIERS': "Optional services",
            'PERSO.LOCALFILE': "personnal songs",
            'BET.ONLYWHENSTART': "Share is not possible before start",
            'ERROR.RETRY': "Sorry, a little technical issue, please retry ...",
            'DEEZER.DESCRIPTION': "Use your Deezer playlists",
            'SPOTIFY.DESCRIPTION': "Use your Spotify playlists",
            'CALENDAR.DESCRIPTION': "Write yours events in your calendar",
            'CONTACT.DESCRIPTION': "Use your google contacts to send your invitation",
            'DRIVE.DESCRIPTION': "Use your google drive to share your musicv",
            'LINKEDIN.DESCRIPTION': "Use your Linkedln contacts to share your event",
            'FACEBOOK.DESCRIPTION': "Use your Facebook contacts to share your event",
            'SLACK.DESCRIPTION': "Create a slack channel for your event",
            'TWITTER.DESCRIPTION': "Publier vos événements sur twitter",
            'INSTAGRAM.DESCRIPTION': "Publier les photos sur Instragram",
            'PERSO.SCREENS': "Your screens",
            'PHOTOS.INFOVALIDATION': "Your photo will be visible for all participants after validation by the moderators",
            'TARIF.CHANGECONFIRMATION': "You are about to change your tarif. Are you sure ?",
            'SELEVENT.FREEEVENTS': "Available events",
            "SELEVENT.GEOLOCFAILED": "Localization failed",
            //Les tutos
            'PROFIL.TUTO_WELCOMEPICTURE': "Cette photo apparaitra en plein écran pour toutes les personnes qui entrent dans votre événement",
            'PHOTO.TUTOSTRONGMODERATE': "La modération forte des contenus impliquent que l'organisateur et les modérateurs est validés les photos et les sondages avant leur publication",
            'ADDPRESENTATION.TUTO': "Ajouter votre support au format pdf, powerpoint, video ou image pour illustrer votre présentation puis indiquer sa durée",
            'ADDEVENT.TUTOACTIVITIES': "Suivant le type d'événement vous décidez quelles sont les activités proposées aux participants",
            'ADDEVENT.TUTOWELCOMESCREEN': "Lorsqu'un nouveau participant entre dans un événement vous pouvez lui afficher un écran d'acceuil pendant quelques secondes",
            'ADDEVENT.TUTOEXPERT': "Fabriquer un lien pour simplifier la création d'événemenement du même type",
            'ADDEVENT.TUTOVISIBILITY': "Un événement public sera visible sur une carte et accessible à n'importe qui. Un événement privé n'est accessible que par l'usage d'un code et n'est pas visible sur une carte.",
            'PERSO.TUTO_PRIVACY': "Shifumix conserve quelques données privés pour gérer votre compte. Consulter l'aide pour savoir précisément ce qui est utilisé",
            'PERSO.TUTO_BLACKLIST': "Vous pouvez interdire l'accès a vos événements en gérant une liste de comptes interdits",
            'PERSO.TUTOSERVICETIERS': "Pour offrir des services complémentaires, Shifumix se connecte à d'autres services",
            'PERSO.TUTO_OFFER': "Votre offre tarifaire fixe le prix de votre abonnement Shifumix. Elle peut être modifiée ici",
            'OLDEVENTS.TUTO_MYEVENTS': "Vous n'avez participé à aucun événement.",
            'OLDEVENTS.TUTO_FIRSTEVENTS': "Vous avez créé votre premier événement, vous pouvez maintenant inviter des amis et / ou projeter cet événement sur un écran avec les iWall",
            'OLDEVENTS.TUTO_BESTFORME': "Retrouvez ici des événements qui pourrais vous interesser",
            'OLDEVENTS.TUTO_PARTICIPEDEVENTS': "Retrouvez ici les événements auxquels vous avez participés",
            'SCREEN.TUTOADDEVENT': "Pour utiliser votre écran connecté vous devez créer un événement",
            'PHOTO.TUTO_NOSTARTED_EVENT': "Le partage de photo n'est pas disponible tant que l'événement n'est pas commencé",
            'MESSAGES.TUTO_NOSTARTED_EVENT': "Le partage de message n'est pas disponible tant que l'événement n'est pas commencé",
            'LOGINAVATAR.TUTO': "Grâce à l'avatar vous pouvez rester anonyme, mais vous pouvez décider de remplacer par votre photo ou modifier votre pseudo ultérieurement",
            'MESSAGES.TUTO': "Vous pouvez partager des messages, des smiley avec l'ensemble des participants.",
            'SELEVENTS.TUTO_ANONYMOUS': "Bienvenue dans Shifumix.<br><br>Pour rejoindre un événement, saisissez son code<br><br><br>Ou créer votre propre événement",
            'OLDEVENTS.TUTO': "Retrouvez ici vos événements et ceux auxquels vous avez participé",
            'MESSAGES.TUTO_ADVANCED': "Faites glisser les messages sur le côté pour découvrir de nouvelles options : liker, supprimer ...",
            'OLDEVENTS.TUTO_FIRSTEVENT': "Sélectionner le flyer pour accéder aux options de l'événement",
            'PHOTOS.TUTO_NEEDVALIDATION': "Les photos peuvent être validées avant d'être partagée à tous les participants",
            'CUSTOMERCOMMAND.TUTO': "Cliquer directement sur la carte pour sélectionner ce que vous souhaiter commander",
            'CUSTOMERCOMMAND.TUTO_WITHITEM': "Envoyé votre commande en préparation lorsque votre sélection est terminée",
            'CUSTOMERCOMMAND.TUTO_PREPARE': "Vous serez informé ici lorsque votre commande sera prête",
            'IMAGECREATOR.TUTO': "Utiliser les images de votre téléphone ou d'internet (instagram, pixabay ... etc ...)",
            'IMAGECREATOR.TUTOWITHIMAGE': "Vous pouvez zoomer, recadrer ou pivoter l'image avant de l'utiliser dans Shifumix",
            'HTMLEDITOR.TUTO': "Editer directement vos iWall pour les personnaliser au maximum",
            'WIDGET.TUTO': "Vous choisissez ici l'écran sur lequel vous souhaitez projeter votre iWall",
            'WIDGETSTORE.TUTO': "Les iWall permettent de rendre visible vos événements sur n'importe quel écran connecté : smart TV, projecteur, ordinateur",
            'SCREENS.TUTO': "Vous pouvez gérer plusieurs écrans publiques votre téléphone, changer le widget qui s'affiche etc ...",
            'PERSO.TUTO_PLATFORM': "Avant de commencer le premier événement, il nécéssaire de choisir le catalogue à utiliser pour passer la musique.",
            'PERSO.TUTO_SCOREANDCREDIT': "Comme souvent pour les services communautaires, Shifumix vous attribue une réputation et des crédits pour les paris",
            'PERSO.TUTO_SERVICES': "Les services aditionnels vous permette d'étendre les possibilités de Shifumix : utiliser vos contacts, accéder à vos playlist, utiliser votre Google drive ...",
            'ADDLOTERIE.TUTO': "Pour créer une loterie, il faut au minimum un titre et une photo. Le lot doit être remis a l'organisateur pour que le jeu commence.",
            'HOME.RUNPLAYER_TUTO': "Pour entendre la playlist, vous devez lancer un player",
            'ADDEVENT.TUTO_DATETIME': "Chaque événement se définie également par une date de début et une date de fin (au délà de laquelle Shifumix quitte automatiquement l'événement)",
            'ADDEVENT.TUTO_SHIFUMIXTEMPLATE': "Utiliser les modèles proposé par Shifumix pour créer en 1 seul click votre événement Shifumix",
            'ADDEVENT.TUTO_MYEVENTS': "Utiliser mes anciens événements comme modèle pour créer des nouveaux",
            'ADDEVENT.TUTO_FLYER': "Vous pouvez afficher choisir d'afficher le texte ou pas et surtout modifier l'image du flyer",
            'ADDEVENT.TUTO_NAMEANDTEASER': "Donner un titre à votre événement. Vous pouvez également ajouter une phrase d'introduction, un teaser",
            'ADDEVENT.TUTO_SETTINGS': "Ici on détermine les activités d'un événement, son caractère privé ou public, sa page d'acceuil",
            'SELEVENT.TUTO': "Hello $1, Sélectionnez un événement sur la carte ou fabriquez en un",
            'ADDEVENT.TUTO_FACEBOOK': "Shifumix peut utiliser vos événements Facebook ou vos pages désignant des lieux comme model pour créer ses propres événements",
            'ADDEVENT.TUTO': "Voici une première version de votre événement, vous pouvez le personnaliser totalement (flyer, date, titre, activitées) depuis cet écran",
            'ADDEVENT.TUTO_VALIDATE': "Toutes les photos devront être validé par vous avant d'être diffusées",
            'HOME.TUTO': "Soyez le premier à ajouter vos titres dans la playlist de l'événement",
            'HOME.TUTOADMIN': "En tant qu'organisateur, vous pouvez ici régler différents paramétres liés à la musique, playlist, etc ...",
            'HOME.TUTOWITHMUSIC': "Voter pour ou contre les titres de la playlist pour changer l'ordre de passage, et ajouter les votres.",
            'HOME.TUTOADVANCED': "En faisant glisser les titres sur le côté, vous accéder rapidement à des informations supplémentaires",
            'LOGIN.TUTO': "Utilisez un de vos profils pour vous connecter",
            'PERSO.TUTO': "Personnalisé votre compte et étendez les possibilitées de Shifumix",
            'SEARCH.TUTO_ONLYOWNERPLAYLIST': "Pour cette événement, vous pouvez choisir vos titres parmis la playlist de l'organisateur",
            'PHOTO.TUTO': "Prenez une photo depuis votre téléphone, ajoutez un commentaire et partagez la avec tous les participants",
            'PHOTO.TUTOADMIN': "Partager vos photos mais surtout validez les photos des participants avant leur diffusion",
            'PHOTO.TUTO_VALIDATION': "La validation implique que l'ensemble des photos doivent être validées par l'organisateur avant d'être publiée",
            'PHOTO.TUTO_CANDELETE': "Même après partage, vous pouvez supprimer votre dernière photo",
            'INVITE.TUTO': "Faites flasher ce code pour inviter des amis. Vous pouvez également envoyer des invitations par mail, ou copier le lien ci-dessous en l'envoyer par SMS, Messenger ...",
            'PROFIL.TUTOADMIN': "Contrôler la soirée et lancer les écrans de partage de photo ou le DJ automatique",
            'PROFIL.TUTO': "Passez en anonyme ne pas divulguer votre identité dans les photos et musique proposée",
            'PROFIL.STORY': "Social Wall without Twitter (only visible in this event)",
            'SCREEN.TUTO': "Les écrans partagés que vous pilotez sont accessible ici. L'iWall utilisé est listé pour chaque écran, vous pouvez en choisir un autre a tout moment",
            'SCREEN.TUTOADDSCREEN': "Si vous disposez déjà d'un code pour piloter un écran, saisissez le ici, Sinon ouvrez la page http://w.shifumix.com sur l'écran que vous souhaitez piloter, puis saisissez le code affiché",
            'SELEVENT.TUTO_EVENTSAVAILABLE': "Pour participer à un des événements 'public' autour de vous, sélectionnez son flyer",
            'SELEVENT.TUTOJOIN': "Un événement est sélectionné, vous pouvez en faire partie un cliquant sur 'rejoindre'",
            'SELEVENT.TUTOFIRSTCONNEXION': "Bienvenue dans Shifumix. Selectionner un événement sur la carte ou créez en un nouveau",
            'MUSICSERVER.TUTO_WARNINGYOUTUBE': "Attention, youtube est un catalogue très large. Il est préférable de limiter l'ajout de nouveau titre aux modérateurs et de disposer d'un bloqueur de publicité",
            'SLIDESHOW.TUTO': "Ici vont défiler les photos partagées par les participants",
            'SEARCH.TUTO': "Rechercher un artist ou un titre parmis le catalogue de Deezer, YouTube ou votre propres titres",
            'SEARCH.TUTOSEL': "Cliquer sur le titre que vous souhaitez ajouter à la playlist",
            'CHARTS.TUTO': "Retrouver la liste des participants à l'événement, classé par 'like'. Vous pouvez en savoir plus sur eux en cliquant sur leur photo",
            'SELEVENT.TUTOPAY': "Pour rester sans pub, le fonctionnement de Shifumix implique une modeste contribution de votre part pour pouvoir continuer de créer des centaines d'événements",
            "PUBLICCHART.TUTO": "Affiche le classement des personnes connectées dans l'événement",
            'MUSICPLAYER.TUTO': "Vous êtes chez le DJ automatique, vous devez être raccordé à un système audio et avoir quelques titres dans la playlist",
            'BETS.TUTO': "Parier ou répondez au sondage directement dans Shifumix",
            'BETS.TUTO_CREATEYOURBETS': "Proposer un petit pari express à tous les participants",
            'BETS.TUTO_CREATEYOURSURVEY': "Proposer un petit sondage express à tous les participants",
            'PUBLICPROFIL.TUTO_CREDITS': "Vous pouvez créditer ou débiter des iCoin (la monnaie virtuelle de Shifumix) aux participants. Ces iCoin sont conservés après l'événement. Ils sont directement utilisables notamment pour les jeux",
            'PUBLICPROFIL.TUTO_ADMIN': "En tant que responsable de l'événement vous pouvez assigner des rôles à certains participants comme la possibilité d'encaisser, de modérer les contenus ou de préparer les commandes",
            'ADDBETS.TUTO': "Saisissez simplement un intitulé et les différents choix possibles pour créer instantannément un sondage ou un pari.",
            'ADDBETS.TUTO_VALIDE': "Votre pari est enregistré, en revanche en tant que créateur du pari, vous n'avez pas le droit d'y participer.",
            'ADDEVENT.TUTOVALIDATE': "La modération implique que vous devrez valider les photos, paris et sondages avant leur publication",
            'FIRSTPLAYER.TUTO': "Pour la première connexion, je lance automatiquement l'autoDJ. Vérifier le volume de votre ordinateur pour entendre le résultat.",
            "PUBLICBETS.TUTO": "Cette écran affiche l'ensemble des paris en cours et les paris venant de se terminer.",
            "INVITE.TUTO_COPYLINK": "Collez ce lien dans un SMS, sur facebook ou ailleurs pour inviter des amis",
            "TUTO.MUSICPLAYERRUN": "Cliquer sur le bord de l'écran pour lancer le DJ !",
            "TUTO.FIRSTEVENTCREATED": "Vous avez créé votre premier événement ! Vous pouvez y entrer ou envoyez des invitations en retournant son flyer",
            "TUTO.PHOTO_CANDELETE": "Même après avoir publié une photo vous pouvez encore la supprimer",
            "TUTO.CLOUDPLAYLIST": "Choisissez parmi un titre de vos playlist",
            'HOME.TUTOWITHMUSICANDPERSO': "En mode DJ, vous pouvez indiquer les titres qui passent en utilisant le bouton Play",
            "ADDEVENT.TUTOWARNINGJETONS": "Attention, si les options paris et loterie sont actives, vous devez vous assurer que vos participants disposeront de sCoin pour y participer",
            'TIPS.LOGIN0': "Les photos ou messages peuvent être postée en live sur tweeter",
            'TIPS.LOGIN1': "Organiser vos paris pendant un match de foot, Shifumix gère les mises, les quotes et la répartition des gains",
            'TIPS.LOGIN2': "Pour passer de la musique, Shifumix sait utiliser le catalogue de Spotify, Deezer, Youtube ainsi que vous titres sur Google Drive !",
            'TIPS.LOGIN3': "Avez Shifumix vous pouvez utiliser vos playlist Spotify, même si le catalogue utilisé pour l'événement est Deezer, et réciproquement !",
            'TIPS.LOGIN4': "Shifumix vous permet d'organiser simplement une tombola",
            'TIPS.LOGIN5': "Les photos des flyers peuvent venir d'Instagram, de vos photos et de n'importe quel lien internet",
            'TIPS.LOGIN6': "Même après avoir posté un message ou une photo vous pouvez la supprimer",
            'TIPS.LOGIN7': "Lors de la fin d'un événement, vous recevez un lien vous permettant de consulter cet événement même après sa fin",
            'TIPS.LOGIN8': "Vous pouvez directement télécharger la playlist d'un événement dans votre compte Spotify ou Deezer",
            'TIPS.LOGIN9': "Vous pouvez directement télécharger les photos d'un événement sur votre Google Drive",
            'TIPS.LOGIN10': "Faites glisser les titres de la playlist pour découvrir d'autres options",
            'TIPS.LOGIN11': "Découvrer qui vous like en cliquant sur votre score dans le classement",
            'TIPS.LOGIN12': "Ouvrez les profils des participants pour découvrir de nouvelles options",
            'TIPS.LOGIN13': "Fabriquez vos propres événements directement depuis vos événements Facebook ou votre agenda Google",
            'TIPS.LOGIN14': "Fidéliser vos participants en distribuant des iCoins pour gagner des lots",
            'TIPS.LOGIN15': "Vous pouvez limiter les nouveaux titres qui sont proposés à vos playlist",
            'TIPS.LOGIN16': "Récupérer des photos sur instagram (de votre compte ou celui des autres)",
            'TIPS.LOGIN17': "Vous pouvez limiter la taille de la playlist",
            'TIPS.LOGIN18': "Vous pouvez enregistrer vos sondages ou paris sans les publier, et les mettre en ligne quand vous le souhaitez",
            'TIPS.LOGIN19': "Fabriquez vos propres iWall depuis l'éditeur de Shifumix ou depuis votre éditeur favori",
            'TIPS.LOGIN20': "",
            'TIPS.LOGIN21': "",
            'TIPS.LOGIN22': ""
        }
    });
    libs.push({
        'lang': "fr",
        'labels': {
            'MUSICSERVER.PERSODESCRIPTION': "C'est toujours vous le DJ. Vous mettez la musique que vous voulez mais vous pouvez vous inspirer de la playlist Shifumix disponible sur votre téléphone",
            'MUSICSERVER.SPOTIFYDESCRIPTION': "Pour démarrer la musique, lancer spotify sur votre systeme audio et connectez vous a votre compte",
            'MUSICSERVER.DEEZERDESCRIPTION': "Connecter votre système audio à un ordinateur et ouvrer http://player.shifumix.com dessus",
            'MUSICSERVER.MULTIPLEDESCRIPTION': "Multiple source utilise Deezer, youtube et vos fichiers MP3 (sur Google Drive) comme catalogue. Connecter votre système audio à un ordinateur et ouvrer http://player.shifumix.com dessus",
            'MUSICSERVER.YOUTUBEDESCRIPTION': "Connecter votre système audio à un ordinateur et ouvrer http://video.shifumix.com dessus",
            'PERSO.MUSICSERVER': "Quel catalogue de musique utiliser ?",
            'PERSO.SCREENS': "Vos écrans",
            'WIDGET.CATEGORIES': "Musique,Photos,Messages,Paris,Sondages,Loterie,Commandes,Autres",
            'WIDGET.CATEGORIESFILTER': "Musique,Photos,Messages,Paris,Sondages,Participants,Présentations,Commandes",
            'LIB.BEGININ': " commence dans ",
            'ADDEVENT.TITLE': 'Votre événement',
            'ADDEVENT.USEFACEBOOK': "Utiliser facebook comme model ?",
            'SELEVENT.TITREPROFIL': "Mon profil",
            'LIB.ADDRESS': "Adresse",
            'ADDEVENT.APARTIRDE': "A partir de",
            'ADDEVENT.DEFAULTADDRESSCHANGE': 'Votre adresse par défaut est modifiée',
            'LIB.DURATION': 'Durée',
            'LIB.SAVE': 'Enregistrer',
            'LIB.STARTIN': "Commence dans",
            'LIB.COPY': "Copier",
            'LIB.SENDING': "Envoi ...",
            'LIB.NEXT': "Suivant",
            'LIB.OVER': "est terminée",
            'LIB.BUY': "Acheter",
            'LIB.SUMMARIZE': "Résumé",
            'LIB.PUBLISHONTWEETER': "Publier sur tweeter",
            'LIB.CLOSE': "Fermer",
            'LIB.UPLOAD': "Charge",
            'LIB.ERRORRETRY': "Erreur de traitement, recommencez",
            'LIB.UPLOADING': "Chargement",
            'LIB.PERSONS': "Participants",
            'PERSO.QUERYAVATAR': "Quel avatar (en anglais) ?",
            'LIB.YES': "Oui",
            'LIB.NO': "Non",
            'LIB.COMMAND': "Commander",
            'LIB.PRIORITY': "Priorité",
            'LIB.ONGOING': "En préparation ...",
            'LIB.PREPARE': "Préparer",
            'LIB.TAKED': "Retirée",
            'LIB.PAY': "Payer",
            'LIB.TEXTINCLIPBOARD': "Texte dans le presse-papier",
            'LIB.DATE': "Date",
            'LIB.TUTORIAL': "Tutoriel",
            'LIB.COMMANDPANEL': "Commandes en attentes",
            'LIB.ABOUT': "A propos de",
            'LIB.QUESTION': "Brainstorm",
            'LIB.CATEGORY': "Categorie",
            'LIB.CANCELED': "Annulée",
            'LIB.START': "Commence",
            'LIB.RANDOM': "Au hasard",
            'LIB.TITLE': "Titre",
            'LIB.PARTICIPANTS': "participants",
            'LIB.SONG': "titre",
            'LIB.INVITE': "Invite",
            'LIB.LOADING': "Chargement",
            'LIB.TRAJET': "Trajet",
            'LIB.BOARD': "Tableau",
            'LIB.TERMINATED': "Terminé",
            'LIB.DISCOUNT': "Remise",
            'LIB.EDIT': "Editer",
            'LIB.RESPONS': "Réponses",
            'LIB.CANCELMODIF': "Abandonner les modifications",
            'LIB.WIDGET': "sWALL",
            'LIB.SCREENS': "Vos écrans",
            'LIB.MULTIPLE': "Multiple",
            'LIB.SCREEN': "Ecran",
            'LIB.ACTORS': "Acteurs",
            'LIB.ACTRESS': "Actices",
            'LIB.EMOJIS': "Emoticones",
            'LIB.WITHHIM': "avec lui",
            'LIB.FOLLOWERS': "Fans",
            'LIB.FOLLOW': "Connaitre les prochains événements",
            'LIB.CLEAR': "Effacer",
            'LIB.RAZ': "Effacer mon compte",
            'LIB.TIRAGEDANS': "Tirage dans",
            'LIB.FAVORITE': "Favori",
            'LIB.VALIDATE': "Valider",
            'LIB.FROM': "De",
            'LIB.CHARTS': "Tops",
            'LIB.EVENTCODE': "Code événement",
            'LIB.WEBLINK': "URL de l'image",
            'LOTERIE.BUYERS': "%1 participant",
            'LIB.PUBLISH': "Publier",
            'LIB.PENDING': "En attente",
            'LIB.PROFIL': "Profil",
            'LIB.CLEARACCOUNT': "Effacer votre compte",
            'LIB.EARNED': "Gagnés",
            'LIB.EVENT': "Evénement",
            'LIB.PRINT': "Imprimer",
            'LIB.FORTHISEVENT': "Pour cet événement",
            'LIB.EVENTCLOSING': "Fermer l'événement ?",
            'LIB.ACCOUNT': "Montant disponible",
            'LIB.TOTAL': "Total",
            'LIB.WINNER': "Gagnant",
            'LIB.PERSON': "Participants",
            'LIB.DELETE': "Supprimer",
            'LIB.READY': "Prêt",
            'LIB.LOCALISE': "Me localiser",
            'LIB.TARIF': "Tarif",
            'LIB.MUSIC': "Musique",
            'LIB.LEGEND': "Légende",
            'LIB.INVERSECOLOR': "Inversion couleurs",
            'LIB.MYPROFIL': "Mon profil",
            'LIB.PEOPLE': "Participants",
            'LIB.SECRETCODE': "Code secret (4 chiffres)",
            'LIB.SCREENCODE': "Code écran",
            'LIB.HTAG': "HTag",
            'LIB.YOUHAVE': "Vous avez ",
            'LIB.GAMES': "Jeux",
            'LIB.VIEW': "Voir",
            'LIB.PLAY': "Jouer",
            'LIB.MODIFY': "Changer",
            'LIB.FILTER': "Filtre",
            'LIB.MINUTES': "Minutes",
            'LIB.AGREE': "Accord",
            'LIB.DISAGREE': "Pas d'accord",
            'LIB.TERMOFUSE': "Conditions générales",
            'LIB.NOTRECOMMENDED': "Non recommendé",
            'LIB.TO': "A",
            'LIB.NOMUSIC': "Pas de musique",
            'LIB.INVITATIONPERMANENT': "Invitation permanente",
            'LIB.YOURCLOUD': "Votre cloud",
            'LIB.PHONE': "Téléphone",
            'LIB.FINDEVENTS': "Rejoindre des événements",
            'LIB.ENDIN': "Fin dans",
            'LIB.PRESENTATION': "Présentations",
            'LIB.USE': "Utiliser",
            'LIB.UNDO': "Défaire",
            'LIB.PLAYLIST': "Playlist",
            'LIB.SURVEYS': "Sondages",
            'LIB.DESCRIPTION': "Description",
            'LIB.TEASER': "Teaser",
            'LIB.ABO': "Abonnement",
            'LIB.NEWEVENT': "Nouvel événement",
            'LIB.ENGAGEMENT': "Engagement",
            'LIB.DAYS': "jours",
            'LIB.EVENTMASTER': "Event Master",
            'LIB.INVITATION': "Invitation",
            'LIB.LOGOUT': "Se deconnecter",
            'LIB.NOTHING': "Aucun",
            'LIB.MALE': "Homme",
            'LIB.MEETING': "Réunion",
            'LIB.PARTY': "Fête",
            'LIB.FEMALE': "Femme",
            'LIB.HOUR': "hrs",
            'LIB.NEXTSLIDE': "Prochain slide",
            'LIB.REMOTE': "Télécommande",
            'ADDEVENT.FLYERBUILDING': "Fabrication de l'evénement",
            'LIB.THEMOVIE': "Le film",
            'LIB.OK': "Ok",
            'LIB.CREDITS': "Créditer",
            'LIB.DEBITS': "Débiter",
            'SELEVENT.NOEVENT': 'Créer votre événement !',
            'LIB.REPUTATION': "réputation",
            'LIB.LOGIN': "Se connecter",
            'LIB.JOIN': "Rejoindre",
            'LIB.HELLO': "Bonjour",
            'SELEVENT.EVENTBYCODE': "Evénement par code",
            'LIB.EVENTS': "Evénements",
            'LIB.SWALLSTORE': "sWALL disponibles",
            'INVITE.CHECKYOUREMAIL': "Vérifier votre email",
            'PERSO.RAZUSER': "Vous souhaitez supprimer votre compte de nos bases. C'est irréversible. Si vous êtes sûr, répondez 'yes'",
            'WIDGET.PARENTSTYLE': "Style du sWALL hérité de la fenêtre parent",
            'WIDGET.VIEWONSCREEN': "Afficher sur un autre écran (en utilisant le code affiché)",
            'WIDGET.OPENONTHISSCREEN': "Ouvrir directement sur cet écran",
            'CLOSEDEVENT.PUSHSONG': "titres ont été proposé",
            'ERROR.NOTENOUGHTREPUTATIONTOJOIN': "Réputation insuffisante pour cet événement",
            'ERROR.LOSTNETWORK': "Réseau non disponible",
            'ERROR.NEEDSPOTIFYPREMIUMACCOUNT': "L'usage du catalogue spotify nécessite de disposer d'un compte premium",
            'ADDEVENT.BUILDINGYOUREVENT': "Construction de votre événement",
            'LIB.SETTINGS': "Paramètres",
            'LIB.NOW': "Maintenant",
            'PERSO.EMAIL': "Votre email",
            'BETS.LIMITOPTIONS': "Max d'options par pari / sondage",
            'BETS.GIVESOMESCOINBEFORECREATEBETS': "Attention pour l'instant personne n'a d'iCoin pour participer à votre pari/loterie",
            'MESSAGE.ENTERDELAY': "Délai d'apparition du message",
            'SELEVENT.FACEBOOKPAGES': "Vos pages facebook",
            'LIB.CAGNOTTE': "Cagnotte",
            'LIB.BUILDING': "Construction de",
            'PRESENTATION.QUESTIONADDTOMESSAGE': "Question ajouté aux messages",
            'ERROR.BADPASSWORD': "Mot de passe incorrect",
            'ERROR.RETRY': "Désolé, un petit problème technique, recommencez ...",
            'WIDGET.VIEWONFIRSTSCREEN': "Voir sur vos écrans partagés",
            'WIDGET.NEWEVENT': "Nouveau modele d'événement",
            'PUBLICPROFIL.GIVEEMAILTOFOLLOW': "Pour suivre un organisateur vous devez enregistrer un email (pour recevoir les invitations)",
            'WIDGET.WIDGETLINK': "Afficher dans un site web",
            'LIB.CHECKYOUREMAIL': "Vérifiez votre boîte mail",
            'LOGIN.CONNEXIONINVITATION': "Connectez vous avec ...",
            'LOGIN.SENDPASSWORD': "Recevoir a nouveau mon code secret",
            'ADDEVENT.START': "Start",
            'HOME.ADDSONGAUTO': "Aléatoire",
            'WIDGET.VIEWONPHONE': "Voir ce sWall sur un téléphone",
            'PREPARE.NEWCARTE': "Nouvelle carte",
            'SCREEN.NAMEFORSCREEN': "Nom de l'écran",
            'ADDEVENT.FLYERPREVIEW': "Vue du flyer",
            'IMAGECREATOR.NOIMAGE': "Aucune image, essayer une autre requête",
            'ADDEVENT.EVENTDESCRIPTION': "Description de votre événement",
            'ADDEVENT.TYPEEVENT': "Quel type d'événement ?",
            'ERROR.SPOTIFYCONFIG': "Vous devez réactiver le service Spotify",
            'ERROR.DEEZERCONFIG': "Vous devez réactiver le service Deezer",
            'SELEVENT.ASKFORLOCALISATION': "Shifumix peut vous proposer les événements autour de vous si vous lui indiquez votre position",
            'ADDEVENT.ACTIVITIES': "Activitées",
            'ADDEVENT.MINCREDIT': "Crédit min.",
            'PRESENTATION.PRICEPERMINUTE': "Prix par minute de présentation",
            'PRESENTATION.MAXPRESDURATION': "Durée maximum possible par présentation",
            'PRESENTATION.DELAYBETWEENPRESENTATION': "Délai entre chaque présentation",
            'SELEVENT.BLACKLIST': "Désolé vous ne pouvez pas entrer. Vous êtes blacklisté par l'organisateur de cet événement",
            "OLDEVENTS.NOEVENTFORTHISCODE": "Aucun événement correspondant à ce code",
            'MESSAGES.YOURMESSAGE': "Ecrire votre message ici",
            'ADDEVENT.ADVANCED': "Paramètres avancés",
            'OLDEVENTS.PARTICIPATEDEVENT': "Les événements que j'ai fait",
            'CHARTS.BONUSFORNEWCOMER': "Nouveaux",
            'CHARTS.GIVESCOIN': "iCoin pour :",
            'ADDEVENT.MINSCORE': "Notoriété min.",
            'ADDBETS.STARTBET': "Démarre à ",
            'SEARCH.ADDAUTO': "Auto",
            'LOGIN.WELCOME': "Bienvenu sur Shifumix",
            "INVITE.SENDTOME": "Voir sur mon mail",
            'COMMAND.READY': "Votre commande est prête, vous devez la récupérer au bar / comptoire",
            'COMMAND.READYWITHTABLE': "Votre commande est prête, elle va vous être apportée",
            "INVITE.EVENTCODE": "Code d'invitation",
            "OLDEVENTS.EVENTCODETITLE": "Code de l'événement",
            "OLDEVENTS.JOINBYCODE": "Par code",
            'PRESENTATION.PRICETOPRESENT': "iCoin pour présenter",
            'ADDEVENT.USEMODELS': "Utiliser d'autres modèles",
            'ADDEVENT.SETTINGS': "Paramètres avancés",
            'ADDEVENT.SETDATES': "Début et durée",
            'SEARCH.PLAYLISTANALYSIS': "Chargement de vos playlists",
            'SELEVENT.ASKLOCALISE': "Indiquer ma position a Shifumix",
            'ERROR.USER_ALREADY_INVITED': "Personne déjà invitée",
            'PERSO.GIVEEMAIL': "Enregistrer mon email",
            'SELEVENT.NOTEXIST': "Evénement introuvable",
            'INVITE.MAIL': "Adresse mail de la personne à inviter",
            'LOGIN.FASTAUTHENT': "Connexion rapide & anonyme",
            'ADDEVENT.LIBPASSWORD': "Mot de passe nécéssaire",
            'ADDEVENT.VISIBILITY': "Visibilité de l'événement",
            'ADDEVENT.BEGININ': "Début de votre événement",
            'HOME.WAITINGFORPLAYER': "En recherche d'un player spotify",
            "PERSO.NOSERVICE": "Pas de service",
            'LOGIN.WELCOMECREATEEVENT': "Avant de créer votre événement vous devez vous authentifier",
            "BETS.LOTERIEWAITINGVALIDATE": "Porter votre lot à un modérateur pour mise en ligne de votre loterie",
            'PERSO.CHOOSEAVATAR': "Choisissez votre nouvel avatar",
            'PERSO.CHANGEMUSICSERVER': "Plateforme musicale",
            'ADDEVENT.GIVETITLE': "Donner un titre a votre événement",
            "PERSO.PROFILTITLE": "Quel type d'événement",
            'PHOTO.WAITFORVALIDATION': "Photo non publiée, validation en cours ...",
            'SEARCH.CONFIRMADD': " titres ajoutés",
            'MESSAGES.LIMITBYUSER': "Limites de post par participant",
            'TARIF.NEXTPAYMENT': "Prochain paiement",
            'ADDEVENT.EVENTADDRESS': "Adresse de l'événement",
            'ADDBET.CAGNOTTE': "Cagnotte de départ",
            'ADDEVENT.MINSONGSINPLAYLIST': "Taille minimum de la playlist",
            'ADDBETS.NBRESPONS': "Nombre de réponses possibles",
            'BETS.NEEDVALIDATIONBEFORE': "Votre loterie attend sa validation.",
            'INVITE.FOLLOWERS': "Inviter mes followers",
            'HTMLEDITOR.TITLE': "Editeur HTML",
            'ADDBET.MINAMOUNT': "Mise minimum",
            'ADDBETS.DESCRIPTION': "Description (optionelle)",
            'SCREEN.WARNINGNOSCREEN': "Nouvel écran non identifié, êtes vous sûr du code et de la connexion internet de l'écran à controller ?",
            'SELEVENT.CREATE': 'Nouveau',
            'LOGINAVATAR.TITLE': "Créer votre avatar",
            'SCREENS.WAITING': "En attente de la connexion avec l'écran",
            'SEARCH.NOAVAILABLE': "Titre non disponible sur le catalogue de cet événement",
            'SELEVENT.CHANGESETTINGS': "Modifier votre profil Shifumix",
            'SELEVENT.JETONS': "Vous avez ",
            'LOGIN.PSEUDO': "Votre pseudo pour cet événement",
            'SELEVENT.CREATEEVENT': "Fabriquer votre propre événement",
            'WIDGETHOME.ENTERCODE': "Entrer ce code pour con nts",
            'SELEVENT.WELCOME': 'Bonjour, Trouver un événement !',
            'SELEVENT.LOCALIZING': 'Localisation',
            'PRESENTATION.DONWLOADBEFOREPRES': "Téléchargement avant les présentations",
            'BET.ONLYWHENSTART': "Partage impossible avant le démarage",
            'ADDEVENT.PASSWORD': "Mot de passe",
            'CHARTS.GIVETONEWCOMERTITLE': "Montant a attribuer aux nouveaux arrivants",
            'ADDEVENT.LABELSONG': "titres",
            'TARIF.CHANGECONFIRMATION': "Vous êtes sur le point de changer d'offre. Etes vous sûr ?",
            'LIB.OLDEVENTS': "Evénements passés",
            'LIB.NEXTEVENTS': "Evénements prochains",
            'LIB.MUSICCHARTS': "Classements musicaux",
            'HOME.CONFIRMDELETE': "Supprimer ce titre ?",
            'HOME.ADDSONGAUTOTITLE': "Ajout automatique de combien de titre ?",
            'SCREEN.CHOOSEWIDGET': "Sélectionner un iWall pour votre écran",
            'HOME.ADDSONGONLYBYOWNER': 'Ajout de musique réservé aux modérateurs',
            'PHOTO.ADDPHOTOONLYBYOWNER': 'Partage de photo réservé aux modérateurs',
            'BETS.ADDONLYBYOWNER': 'Seuls les modérateurs peuvent ajouter des paris, sondages et jeux ',
            'OLDEVENTS.BESTEVENTFORME': "Evénements interessants",
            'ADDEVENT.SONGSBYDEFAULT': "Playlist de départ",
            'ADDEVENT.VISIBLEONMAP': "Evénement public",
            'ADDEVENT.CHANGETEMPLATE': "Image",
            'ADDEVENT.ALLOWANONYMOUS': "Autoriser les participant anonymes (non recommendé)",
            'ADDEVENT.VISIBLE': "Evénement visible a",
            'WIDGET.FAVORITE': "sWALL favori",
            'WIDGET.PUBLIC': "sWALL accessible de tous",
            'WIDGET.CLONE': "Cloner",
            'ADDEVENT.AUTOLOGIN': "Pas d'authentification",
            'CLOSEDEVENT.USEASMODEL': "Utiliser comme model",
            'PROFIL.SELFSERVICE': "Service au bar (Self-service)",
            'PROFIL.TUTO_WELCOMEPICTURE': "Cette photo apparaitra en plein écran pour toutes les personnes qui entrent dans votre événement",
            'WIDGET.DESCRIPTION': "Description du iWALL 'commencer par 'le', 'la', 'un' ...",
            'WIDGET.CODE': "Code HTML & javascript",
            'PHOTOS.INFOVALIDATION': "Dès validation par les modérateurs, votre photo sera visible pour l'ensemble des participants",
            'INFO.ANONYMOUSLIMIT': "Avec l'avatar vous restez totalement anonyme, vous pourrez modifier la photo ou le pseudo ultérieurement si vous le souhaitez",
            'INFO.ANONYMELOGOUT': "Attention, la deconnexion d'un compte anonyme entraine son effacement total",
            'MESSAGE.SCHEDULEDMESSAGE': "Messages programmés",
            'PERSO.HUMEUR': "Une petite phrase sur vous",
            "PERSO.HOME": "Votre site web",
            'PERSO.YOUROFFER': "Votre offre",
            'HOME.ADDSONG': 'Musique',
            'INVITE.PERSONAL': "Invitation personnelle",
            'INVITE.SHARETITLE': "Invitez vos amis",
            'ADDEVENT.HTAG': "Twitter hTAG",
            'ADDEVENT.WELCOMESCREEN': "Page d'accueil",
            'ADDEVENT.WELCOMEPICTURE': "Photo",
            'ADDEVENT.WELCOMEDURATION': "Durée d'affichage de la page",
            'INVITE.DEST': "Email à inviter",
            'ADDBETS.NBVOTE': "Votes par personne",
            'BETS.NOTENOUGHTTIMETOSONG': "Plus assez de temps pour ajouter de nouveau titre",
            'BET.RECUPMONEY': "You get some money about your bet",
            'BETS.MESSAGEMISE': "Montant de votre mise, jusqu'a ",
            'BETS.NOTENOUGHTTIMETOBET': "Plus assez de temps pour les paris / sondage",
            'SELEVENT.USELASTPOSITION': "Localisation impossible, utilisation de la dernière position",
            'SELEVENT.JOINFAILED': "impossible de ce joindre à cet évenement",
            'SELEVENT.ENTERYOURCODE': "Entrez votre code",
            'PERSO.PROFILCHANGE': "Vous avez maintenant accès aux événements public",
            'SELEVENT.JOIN': "pour rejoindre un événement",
            'SELEVENT.TITLE': "Les événements sur une carte",
            'ADDEVENT.ACT_LOTERIE': "Loterie / Tombola (expérimental)",
            'ADDEVENT.ACT_BOARD': "Tableau partagé (expérimental)",
            'ADDEVENT.ACT_MESSAGE': "Messages partagés",
            'ADDEVENT.ACT_COMMAND': "Commandes à distance (expérimental)",
            'ADDEVENT.INSTANTPHOTOPARTY': "Photos party",
            'ADDEVENT.MINDISTANCE': "Distance min.",
            'ADDEVENT.CGU': "Conditions générales d'utilisation",
            'LIB.SIGNATURE': "J'accepte les CGU",
            'LIB.LOTERIE': "Loterie",
            "ADDLOTS.STARTBET": "Début de la partie",
            "ADDLOTS.DURATION": "Durée",
            "ADDLOTS.MINCREDIT": "Mise minimum pour faire le tirage",
            "ADDLOTS.MAXCREDITS": "Mise maximum pour acheter",
            "ADDLOTS.TITLE": "Titre de votre partie",
            "ADDLOTS.DESCRIPTION": "Description de l'article",
            'PHOTO.LABELMESSAGE': "Saisissez votre message",
            'PHOTO.KEYWORDSEARCH': "#hTag désignant les images",
            'SELEVENT.NOTENOUGHTSCORE': "Réputation insuffisante pour créer un event",
            'SELEVENT.AUTOCONNEXION': "Vérification d'une connexion",
            'LIB.MYEVENTS': "Mes événements",
            'SELEVENT.CLOSE': "Evénement terminé",
            'SELEVENT.LOCALISE': "Me trouver",
            'SELEVENT.PRIVATE': "Evenement privé. Entrer le mot de passe",
            'ADDBET.PUBLISHING': "pari/sondage publié",
            'PROFIL.CLOSE_EVENT': "Clore l'événement",
            'PROFIL.LOTERIE': "Afficher une tombola, un tirage au sort",
            'PROFIL.LINKTOOWNER': "Lier par l'utilisateur",
            'PROFIL.LOC_QUERY': "Texte pour localiser le demandeur",
            'PROFIL.PASSTOPREMIUM': "Evénement premium",
            'PROFIL.CONFIRMPASSTOPREMIUM': "Etes vous sûr de passer en premium ?",
            'PROFIL.RESET_SECRETCODE': "Nouveau code secret",
            'PROFIL.ANONYMOUS': "Anonyme",
            'PROFIL.STARTNEXT_EVENT': "Start",
            'PROFIL.CHANGESETTINGS': "Paramètres de votre profil",
            'PROFIL.FOLLOWER': "Suivre l'organisateur",
            'PROFIL.QUIT_EVENT': "Partir",
            'PROFIL.PLAYER': "Jouer la playlist",
            'PROFIL.CHANGE_PLAYERTYPE': "Plateforme",
            'PROFIL.PHOTOSHOW': "Défilement progressif des photos",
            'PROFIL.GALLERY': "Afficher un pele mele des photos",
            'PROFIL.PROMOTION': "Ecran d'inscription",
            'PROFIL.VIDEOS': "Voir les vidéos de votre playlist en plein écran",
            'PROFIL.BETSURVEY': "Affichage des sondages et paris",
            'PROFIL.WIDGETTITLE': "sWALLs pour afficher l'événement",
            'PROFIL.SLIDESHOW': "Afficher un slideshow des photos",
            'PROFIL.CHARTSSCORE': "Classement en notoriété",
            'PROFIL.NEEDTOBECLOSE': "Les participants doivent être proches",
            'CLOSEDEVENT.TITLE': "Evenement clôt",
            'PROFIL.CHARTSCREDIT': "Classement en monnaie",
            "PHOTO.TAKEPICTURE": "Partager une photo",
            'ERROR.SONGALLREADYPLAYED': "Titre déjà joué",
            'ERROR.NOANONYMOUSINPUBLICEVENT': "Les événements public ne sont pas compatibles avec les anonymes",
            'WIDGETSTORE.TITLE': "Liste des sWALLs",
            'WIDGETSTORE.SEARCH': "Nom d'un sWALL",
            'ERROR.NOACTIVEPLAYER': "Aucun player actif pour jouer la musique",
            'PERSO.CHECKEVENT': "Vérification événement",
            'ADDEVENT.MAXGUEST': "Participants max",
            'ADDEVENT.INSTANTPARTY': "Auto Soirée",
            'ADDEVENT.INSTANTBET': "Auto Paris",
            'ADDEVENT.INSTANTSURVEY': "Auto Sondage",
            'TARIF.NEWUSERS': "Nouveaux utilisateur depuis dernier paiement",
            'ADDEVENT.INSTANTTITLE': "Création instantanné d'événement",
            'SELEVENT.LOGOUT': "Changer de profil",
            'SELEVENT.FACEBOOKEVENTS': "Vos endroits & événements Facebook",
            'ADDBET.NBVOTE': "Votes par utilisateur",
            'BETS.GAINS': "Vous pouvez gagner ",
            'ADDBETS.ENDBET': "Fermeture à ",
            'BETS.SHARETITLE': "Inviter des amis à parier",
            'ADDBET.PATTERNTITLE': "Titre du modèle (titre explicite)",
            'BETS.VOTESENDING': "A voté",
            'ERROR.ACTIFBETSEXCEED': "Nombre de pari actif maximum dépassé",
            'ERROR.NOTENOUGHCREDITS': "Pas assez de crédit pour cette cagnotte",
            'INFO.LASTBET': "Dernier pari actif possible",
            'ADDEVENT.DESCRIPTION': "Teaser de l'événement",
            'ADDEVENT.ADDRESS': "Adresse",
            'ADDEVENT.WEBSITE': "Site web de l'événement",
            'ADDEVENT.CHOOSEFILE': "Choisissez une image",
            'ADDEVENT.ACT_MUSIC': "Playlist communautaire",
            'ADDEVENT.CHANGEDEFAULTADDRESS': "Mon adresse",
            'ADDEVENT.ACT_PHOTO': "Partager des photos",
            'ADDEVENT.ACT_BETS': "Faire des paris (expérimental)",
            'ADDEVENT.PLAYLISTLIMIT': "Taille limite de la playlist",
            'ADDEVENT.PLAYLISTLIMITBYUSER': "Limite de titre par participant",
            'ADDEVENT.PREPLAYLISTLIMIT': "Limite de la playlist avant la soirée",
            'ADDEVENT.ACT_SONDAGE': "Proposer des sondages",
            'ADDBETS.NEWOPTION': "Nouveau choix",
            'ADDBETS.OPTIONSLIST': "Liste des choix",
            'ADDBETS.TITLE': "Titre (sous forme de question)",
            'ERROR.PLAYLISTNUMBEREXCEED': "Playlist remplie",
            'BETS.BETSENDING': "Mise enregistrée",
            'BETS.WINAMOUNT': "Vous gagnez ",
            'BETS.LOSTAMOUNT': "Vous perdez ",
            'LOGIN.WRONGPASSWORD': "Code secret incorrect",
            'LOGIN.CODESENDED': "Un code vous a été envoyé par email pour vous permettre de vous connecter à l'événement",
            'HOME.SONGDELETED': "Titre supprimé",
            'HOME.FULLPLAYLIST': "Playlist pleine",
            'CHARTS.ENDPARTY': "Fin:",
            'MUSICSERVER.TITLE': "Serveur de musique",
            'BETS.ALIASVALUE': "Valeur pour l'alias : ",
            'ADDBETS.PATTERNLISTTITLE': "Modeles de paris",
            'CHARTS.SHOWTOTAL': "Voir le total",
            'CHARTS.GIVEALL': "Présents",
            'CHARTS.GIVETOKENTOALLTITLE': "Bonus de sCoin à distribuer à tous les participants",
            'LIB.AMOUNT': "Montant",
            'PERSO.TITLE': "Réglages",
            'PERSO.GIVEYOURPLATFORM': "Quel service utilisez vous pour écouter de la musique ?",
            'PROFIL.LABELSERVICETIERS': "Services complémentaires",
            'PERSO.LOCALFILE': "titres persos",
            'PROFIL.RUNREMOTEPLAYER': "Play",
            'PROFIL.STOPREMOTEPLAYER': "Stop",
            'PROFIL.LINKTOWIDGET': "Attacher un sWALL",
            'PROFIL.ENTERCODE': "Code (6 chiffres) du sWALL",
            'PROFIL.SEARCHSOURCE': "Sources pour les recherches",
            'PROFIL.ONLYPLAYLIST': "Catalogue limité à mes playlist",
            'PROFIL.NEXTREMOTEPLAYER': "Suivant",
            'SEARCH.LIBSEARCH': "Titre ou artist a trouver",
            'SEARCH.LIBBUTTON': "Chercher",
            'SEARCH.GOPLAYLIST': "Mes playlists",
            'SEARCH.NOSONGSINPLAYLIST': "Aucune playlist disponible",
            'SEARCH.ADDALL': "Ajouter tout",
            'SEARCH.PLAYLISTLOADING': "chargement de vos playlists",
            'WIDGET.COPYCODE': "Copier le code",
            'WIDGET.PERSO': "Personnalisation",
            'LIB.BET': "Pari",
            'LIB.WHO': "Qui ?",
            'LIB.MONEY': "€",
            'LIB.TOBET': "Parier",
            'BETS.DELETE': "Pari supprimé",
            'LIB.SURVEY': "Sondage",
            'LIB.UPDATE': "mise à jour",
            'LIB.MODELS': "modeles",
            'LIB.MODERATOR': "Modérateur",
            'LIB.PRIVACY': "Confidentialité",
            'LIB.PREPARATOR': "Préparateur",
            'LIB.CASHIER': "Caisse",
            'LIB.PASSWORD': "Mot de passe",
            'LIB.CLOSED': "Terminé",
            'LIB.SUBSCRIBE': "Subscribe",
            'LIB.FIRSTNAME': "Prénom",
            'LIB.NOTORIETY': "notoriété",
            'ADDEVENT.ADVANCESETTINGS': "Paramètres avancés",
            'ERROR.ACTIVESSONGEXCEED': "Attendez que vos titres soient passés pour en poster de nouveaux, vous pouvez aussi en supprimer",
            'SURVEY.SHARE': "Sondage / pari envoyé",
            'BETS.VOTESRESTANT': "votes restant",
            'BETS.ADDBUTTON': "Creer un Pari / Sondage",
            'BETS.WAITPAY': "En attente du résultat pour paiement",
            'BETS.CANCELCONFIRMATION': "Vous n'avez choisi aucune réponse possible, le pari est donc annulé ?",
            'BETS.BETCLOSED': "Désolé, le pari est maintenant terminé",
            'BETS.SHARED': "Pari / Sondage envoyé",
            'BETS.YOUWIN': "Vous avez gagné",
            'BETS.YOULOOSE': "Désolé vous avez perdu cette fois",
            'BETS.WINLOTERIE': "Récupérer votre cadeau au près de l'organisateur puis valider : ",
            'BETS.INFOLOTERIE': "Vous pouvez y participer pour ",
            'BETS.YOUMUSTGIVERESPONS': "Votre pari est terminé. Vous devez indiquer la solution",
            'LIB.CANCEL': "Annule",
            'LIB.HYPERLINK': "Lien internet",
            'INVITE.COPY': "Copier le lien",
            'INVITE.SEND': "Envoyer",
            'ERROR.NOTENOUGHTSCORE': "Pas assez de score pour ajouter un titre",
            'INVITE.SENDINVITATION': "Partager par mail",
            'INVITE.CONTACTPROVIDER': "Vos contacts",
            'PHOTO.DOWNLOAD': "Télécharger mes photos",
            'INVITE.CANCEL': "Probleme pour envoyer l'invitation",
            'INVITE.YOURSELF': "Vous ne pouvez pas vous inviter vous même",
            'INVITE.VIAFACEBOOK': "Poster le lien de l'événement directement via facebook",
            'INVITE.CONFIRM': " recevra l'invitation dans 2 minutes",
            'INVITE.FRIENDSTOINVITE': "Vos contacts",
            'SEARCH.WAITING': "Recherche",
            'PROFIL.DELPHOTO': "Bloquer !",
            'PROFIL.VALIDATE': "Valider !",
            'PROFIL.BLACKLIST': "Blacklister",
            'PROFIL.MCTITLE': "Maitre de ceremony",
            'PROFIL.GENERAL': "Ecran partagé pour voir toute l'actualité de l'événement",
            'PROFIL.PLAYLIST': "Partager la playlist",
            'PROFIL.MULTIPHOTO': "Partager les 3 dernières photos",
            'PROFIL.BOARD': "Voir le tableau partagé",
            'PROFIL.CHARTS_RE': "Partager la playlist",
            'LIB.PUBLISHONTWITTER': "Partager sur tweeter",
            'PROFIL.LASTTWEET': "Le dernier message",
            'PROFIL.THREETWEET': "Les 3 derniers messages",
            'PHOTO.ENTERMESSAGE': "Entrer votre message",
            'PHOTO.WITHMESSAGE': "Photo avec un message",
            'PHOTO.SENDED': "Photo envoyée",
            'PHOTO.NOTSENDED': "Photo non envoyée",
            'SURVEY.SHARED': "Sondage envoyé",
            'ADDEVENT.NEEDLOC': "Vous devez préciser une position pour créer un événement",
            'SELEVENT.MYLASTEVENTS': "Mes derniers événements",
            'SELEVENT.NOTSTART': "L'événement n'est pas encore ouvert",
            'SELEVENT.FREEEVENTS': "Evénements disponibles",
            'SELEVENT.EVENTS': "Evénements de la carte",
            "SELEVENT.GEOLOCFAILED": "Echec de localisation",
            'LIB.DATEFORMAT': "dd/MM hh:mm",
            'LIB.PHOTO': "photo",
            'LIB.DAY': "jours",
            'LIB.SEND': "Envoyer",
            'PROFIL.STORY': "Mur social prive",
            'BETS.EVALUATE': "Evaluer le créateur du pari",
            'INFO.SCORELOWTOADDSONG': "Attention pour ajouter de nouveau titre, votre score est bas",
            'BETS.RESPONSE': "Réponse gagnante",
            'BETS.NORESPONS': "Aucune réponse gagnante",
            'PROFIL.YOURTAGS': "Vos tags",
            'CHARTS.EARNCREDITS': "Credits gagnés",
            'CHARTS.EARNNOTORIETY': "Notoriété gagnée",
            'CHARTS.TOTALCREDITS': "Crédits (total)",
            'CHARTS.TOTALNOTORIETY': "Notoriété",
            'WIDGET.IFRAME': "sWALL",
            'WIDGET.URL': "URL pour envoyer",
            'WIDGET.OPEN': "Ouvrir",
            'WIDGET.HTML': "Edit",
            'WIDGET.ONLYFORTHISEVENT': "Uniquement pour cet événement",
            'WIDGET.INPOURCENT': "En pourcentage",
            'LIB.WIDTH': "Longueur",
            'LIB.HEIGHT': "Hauteur",
            'BOARD.SENDPHOTO': "Photos",
            'WIDGET.URLINCLIPBOARD': "Lien dans le presse-papier",
            'WIDGET.IFRAMEINCLIPBOARD': "sWALL dans le presse-papier",
            'HTMLEDITOR.WIDGETCODE': "Code HTML du sWALL",
            'LIB.SEARCH': "Rechercher",
            'LIB.VOTE': "votes",
            'LIB.NEW': "New",
            'LIB.BY': "par",
            'LIB.TAGS': "tags",
            'GEN.VIEWNOTAVAILABLE': "Non disponible pour cet événement",
            'DEEZER.DESCRIPTION': "Utilisez vos playlist Deezer",
            'FB_PUBLISH.DESCRIPTION': "Publier vos photos sur facebook",
            'SPOTIFY.DESCRIPTION': "Utilisez vos playlist Spotify",
            'CALENDAR.DESCRIPTION': "Conserver les évenements dans votre agenda",
            'CONTACT.DESCRIPTION': "Inviter votre carnet d'adresse Google",
            'DRIVE.DESCRIPTION': "Utiliser la musique de votre Drive Google",
            'LINKEDIN.DESCRIPTION': "Inviter vos contacts pro",
            'FACEBOOK.DESCRIPTION': "Inviter vos contacts facebook",
            'SLACK.DESCRIPTION': "Publier vos événements sur Slack",
            'TWITTER.DESCRIPTION': "Publier vos événements sur twitter",
            'INSTAGRAM.DESCRIPTION': "Publier les photos sur Instragram",
        }
    });
    return libs;
}
exports.getLibs = getLibs;
//# sourceMappingURL=labels.js.map

/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ionic_angular_1 = __webpack_require__(3);
var core_1 = __webpack_require__(0);
var Tools = __webpack_require__(2);
var user_data_1 = __webpack_require__(8);
var Maintools_1 = __webpack_require__(2);
var core_2 = __webpack_require__(7);
var api_1 = __webpack_require__(16);
/**
 * Generated class for the AddeventModelePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddeventModelePage = /** @class */ (function () {
    function AddeventModelePage(viewCtrl, userData, api, loadingCtrl, toastCtrl, translate) {
        this.viewCtrl = viewCtrl;
        this.userData = userData;
        this.api = api;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.facebook_events = [];
        this.google_events = [];
        this.myevents = [];
        this.shifumix_template = [];
        this.typeModel = "shifumix_template";
        this.refresh();
    }
    AddeventModelePage.prototype.refresh = function () {
        var _this = this;
        //Pas de récupération pour l'instant des événements facebook suite a mise a jour côté facebook
        this.userData.getFacebookPageAndEvents().subscribe(function (events) {
            _this.facebook_events = events.items;
        });
        this.userData.geteventsfrom(true, 20).subscribe(function (resp) {
            _this.myevents = [];
            resp.items.forEach(function (evt) {
                evt.magiklink = Maintools_1.DOMAIN_SERVER + "/magiklink?event_model=" + evt.id;
                _this.myevents.push(evt);
            });
        });
        Maintools_1.$$("Récupération des modeles Shifumix");
        this.api.gettemplates().subscribe(function (res) {
            if (res != null) {
                _this.shifumix_template = [];
                res.templates.forEach(function (evt) {
                    if (evt.ihm == "pro")
                        evt.type = "pro";
                    else
                        evt.type = "perso";
                    if (evt.templateFlyer == null)
                        evt.templateFlyer = evt.flyer;
                    if (evt.templateTitle == null)
                        evt.templateTitle = evt.title;
                    if (evt.templateDescription == null)
                        evt.templateDescription = evt.title;
                    if (evt.templateFlyer != null) {
                        evt.title = evt.title.replace("%from", _this.userData.user.firstname);
                        if (_this.userData.user.address != undefined)
                            evt.address = evt.address.replace("%address", _this.userData.user.address);
                        evt.type = "basic";
                        _this.shifumix_template.push(evt);
                    }
                });
            }
        });
    };
    AddeventModelePage.prototype.connectTo = function (service) {
        var _this = this;
        Tools.openGeneral(service, this.userData.user).then(function () { _this.refresh(); });
    };
    AddeventModelePage.prototype.openFacebookEvents = function () { Tools.openWindow("https://www.facebook.com/events/discovery/"); };
    ;
    AddeventModelePage.prototype.openFacebookPages = function () { Tools.openWindow("https://www.facebook.com/pages/discovery/"); };
    ;
    AddeventModelePage.prototype.showFacebookEvents = function (events) {
        this.facebook_events = events;
    };
    ;
    AddeventModelePage.prototype.selectModele = function (modele) {
        var _this = this;
        if (modele.type == "basic")
            this.viewCtrl.dismiss(modele);
        else {
            this.userData.initevent(modele).subscribe(function (resp) {
                resp.option = { title: true, teaser: true, address: resp.address != "", date: true };
                resp.type = "oldevent";
                _this.viewCtrl.dismiss(resp); //Retourne l'evenement modele
            });
        }
    };
    ;
    AddeventModelePage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    AddeventModelePage.prototype.onCopy = function () {
        Maintools_1.onCopy(this.toastCtrl, this.translate);
    };
    AddeventModelePage = __decorate([
        core_1.Component({
            selector: 'page-addevent-modele',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addevent-modele\addevent-modele.html"*/'<!--\n  Generated template for the AddeventModelePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle title="LIB.MODELS">\n    <shifubutton icon="close" (click)="close()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n\n<ion-content no-padding no-border>\n  <ion-segment [(ngModel)]="typeModel" color="primary">\n    <!--<ion-segment-button value="facebook">Facebook</ion-segment-button>-->\n    <!--<ion-segment-button value="google">Google</ion-segment-button>-->\n    <ion-segment-button [hidden]="myevents.length==0" value="myevents">{{"LIB.MYEVENTS" | translate}}</ion-segment-button>\n    <ion-segment-button value="shifumix_template">Modeles Shifumix</ion-segment-button>\n  </ion-segment>\n\n  <ion-item no-border no-lines *ngIf="typeModel==\'facebook\'">\n    <tuto label="ADDEVENT.TUTO_FACEBOOK"></tuto>\n    <shifubutton label="facebook" *ngIf="facebook_events.length==0" (click)="connectTo(\'facebook\')"></shifubutton>\n    <div *ngFor="let evt of facebook_events" style="display:inline-block;margin:5px;width:28%;">\n      <shifuflyer [flyer]="evt.flyer">\n        <ion-item no-lines no-border text-center>\n          <shifubutton [small]="true" label="CLOSEDEVENT.USEASMODEL" (click)="selectModele(evt)"></shifubutton>\n        </ion-item>\n      </shifuflyer>\n    </div>\n  </ion-item>\n\n\n  <!--<ion-list *ngIf="typeModel==\'google\'">-->\n  <!--<shifubutton label="Googel Calendar" *ngIf="google_events.length==0" (click)="connectTo(\'calendar\')"></shifubutton>-->\n  <!--<ion-list-header *ngIf="google_events.length>0" (click)="openGoogleEvents()">{{"SELEVENT.GOOGLEEVENTSS" | translate}}</ion-list-header>-->\n  <!--<shifuevent *ngFor="let evt of google_events" (click)="selectModele(evt)" [event]="evt"></shifuevent>-->\n  <!--</ion-list>-->\n\n  <ion-item text-wrap no-border no-lines *ngIf="typeModel==\'myevents\'">\n    <tuto label="ADDEVENT.TUTO_MYEVENTS"></tuto>\n    <div *ngFor="let evt of myevents" style="display:inline-block;margin:5px;width:28%;">\n      <shifuflyer [flyer]="evt.flyer">\n        <ion-item no-lines no-border text-center>\n          <shifubutton [small]="true" label="LIB.USE" (click)="selectModele(evt)"></shifubutton><br><br>\n          <shifubutton [small]="true" label="LIB.AUTOEVENT" ngxClipboard [cbContent]="evt.magiklink" (click)="onCopy()"></shifubutton>\n        </ion-item>\n      </shifuflyer>\n    </div>\n  </ion-item>\n\n  <ion-item text-wrap no-border no-lines *ngIf="typeModel==\'shifumix_template\'">\n    <tuto label="ADDEVENT.TUTO_SHIFUMIXTEMPLATE"></tuto>\n    <div  *ngFor="let evt of shifumix_template" style="display:inline-block;margin:5px;padding:0px;width:30%;text-align: center;">\n      <div style="width:100%;font-size: xx-small;line-height: 0.9;margin-bottom: 3px;">{{evt.templateTitle}}</div>\n      <shifuflyer name="event_template" [flyer]="evt.templateFlyer">\n        <ion-item text-center padding-left="2px">\n          <div style="font-size:xx-small;line-height: 0.9;">{{evt.templateDescription}}</div><br>\n          <shifubutton name="cmdUse" [small]="true" icon="checkmark" (click)="selectModele(evt)"></shifubutton>\n        </ion-item>\n      </shifuflyer>\n    </div>\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addevent-modele\addevent-modele.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.ViewController,
            user_data_1.UserData, api_1.ApiProvider,
            ionic_angular_1.LoadingController,
            ionic_angular_1.ToastController,
            core_2.TranslateService])
    ], AddeventModelePage);
    return AddeventModelePage;
}());
exports.AddeventModelePage = AddeventModelePage;
//# sourceMappingURL=addevent-modele.js.map

/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var user_data_1 = __webpack_require__(8);
var core_2 = __webpack_require__(7);
var Maintools_1 = __webpack_require__(2);
var image_creator_1 = __webpack_require__(38);
var api_1 = __webpack_require__(16);
var widgetstore_1 = __webpack_require__(106);
/**
 * Generated class for the AddeventAdvancedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddeventAdvancedPage = /** @class */ (function () {
    function AddeventAdvancedPage(modalCtrl, translate, params, viewCtrl, userData, api, toastCtrl) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.translate = translate;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.userData = userData;
        this.api = api;
        this.toastCtrl = toastCtrl;
        this.magiklink = "";
        this.user = { connexions: [] };
        this.newevent = {};
        this.newevent = this.params.get("newevent");
        this.newevent["lst_activities"] = [];
        this.userData.get().subscribe(function (r) { return _this.user = r; });
        this.newevent.lst_activities = [
            { text: "ADDEVENT.ACT_MUSIC", checked: (this.newevent.activities.indexOf("music") > -1), value: "music" },
            { text: "ADDEVENT.ACT_PHOTO", checked: (this.newevent.activities.indexOf("photo") > -1), value: "photo" },
            { text: "ADDEVENT.ACT_MESSAGE", checked: (this.newevent.activities.indexOf("message") > -1), value: "message" },
            { text: "ADDEVENT.ACT_SONDAGE", checked: (this.newevent.activities.indexOf("survey") > -1), value: "survey" },
            { text: "ADDEVENT.ACT_COMMAND", checked: (this.newevent.activities.indexOf("command") > -1), value: "command" },
            { text: "ADDEVENT.ACT_BOARD", checked: (this.newevent.activities.indexOf("board") > -1), value: "board" },
            { text: "ADDEVENT.ACT_LOTERIE", checked: (this.newevent.activities.indexOf("loterie") > -1), value: "loterie" },
            { text: "ADDEVENT.ACT_BETS", checked: (this.newevent.activities.indexOf("bets") > -1), value: "bets" },
            { text: "ADDEVENT.ACT_PRESENTATION", checked: (this.newevent.activities.indexOf("presentation") > -1), value: "presentation" }
        ];
        this.refresh();
    }
    AddeventAdvancedPage_1 = AddeventAdvancedPage;
    AddeventAdvancedPage.prototype.refresh = function () {
        var vm = this;
        this.newevent.activities = [];
        this.newevent.lst_activities.forEach(function (item) {
            if (item.checked)
                vm.newevent.activities.push(item.value);
        });
        this.generateCreateEventLink();
    };
    AddeventAdvancedPage.prototype.save = function () {
        this.refresh();
        this.viewCtrl.dismiss(this.newevent);
    };
    AddeventAdvancedPage.prototype.selImage = function () {
        var vm = this;
        Maintools_1.openModal(this.modalCtrl, image_creator_1.ImageCreatorPage, { ratio: 3 / 2, upload: true }, function (rep) {
            if (rep != null) {
                vm.newevent.welcomePicture = rep.value;
            }
        });
    };
    AddeventAdvancedPage.prototype.generateCreateEventLink = function () {
        var _this = this;
        this.api.urlshortener(Maintools_1.DOMAIN_SERVER + "/magiklink?title=" + encodeURIComponent(this.newevent.title) +
            "&activities=" + this.newevent.activities.join(",") + "&flyer=" + this.newevent.templateFlyer + "&noprompt=true&autologin=1").subscribe(function (res) {
            if (res.url == null)
                _this.magiklink = res.long_url;
            else
                _this.magiklink = res.url;
        });
    };
    AddeventAdvancedPage.prototype.onCopy = function () {
        Maintools_1.onCopy(this.toastCtrl, this.translate);
    };
    AddeventAdvancedPage.prototype.setDefaultWidget = function () {
        var _this = this;
        Maintools_1.openModal(this.modalCtrl, widgetstore_1.WidgetstorePage, { from: AddeventAdvancedPage_1.name }, function (w) {
            _this.newevent.widgetDefault = w.name;
            Maintools_1.toast(_this.toastCtrl, "ADDEVENT.DEFAULTWIDGETSET", _this.translate);
        });
    };
    var AddeventAdvancedPage_1;
    AddeventAdvancedPage = AddeventAdvancedPage_1 = __decorate([
        core_1.Component({
            selector: 'page-addevent-advanced',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addevent-advanced\addevent-advanced.html"*/'<!--\n  Generated template for the AddeventAdvancedPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle title="ADDEVENT.ADVANCED" >\n    <shifubutton icon="checkmark" (click)="save()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n\n<ion-content no-padding>\n  <tuto [if]="userData.user.nEventCreated<2" label="ADDEVENT.TUTO_SETTINGS"></tuto>\n  <tuto [if]="(newevent.lst_activities[6].checked==false || newevent.lst_activities[6].checked==false) && newevent.startJetons==0" label="ADDEVENT.TUTOWARNINGJETONS"></tuto>\n\n  <!--<shifuinput label="ADDEVENT.STARTJETONS" type="number" id="txtStartJetons" [(ngModel)]="newevent.startJetons" *ngIf="userData.user.connexions.length>5" min="0"></shifuinput><br>-->\n\n  <shifucard *ngIf="userData.user.email!=\'\'" title="ADDEVENT.VISIBILITY">\n    <shifucheckbox *ngIf="userData.user.tarif.tarif!=0" id="chkVisibility" label="ADDEVENT.VISIBLEONMAP" [(ngModel)]="newevent.visibleOnMap"></shifucheckbox>\n    <shifuinput *ngIf="newevent.visibleOnMap==true" id="password" label="ADDEVENT.LIBPASSWORD" [(ngModel)]="newevent.password"></shifuinput>\n    <shifuinput label="ADDEVENT.HTAG" [(ngModel)]="newevent.hTag" *ngIf="newevent.visibleOnMap && userData.user.connexions.length>5"></shifuinput>\n    <shifuinput label="ADDEVENT.WEBSITE" id="txtWebSite" [(ngModel)]="newevent.website" *ngIf="userData.user.connexions.length>5" max="80"></shifuinput><br>\n  </shifucard>\n\n  <shifucard title="ADDEVENT.ACTIVITIES" tuto="ADDEVENT.TUTOACTIVITIES">\n    <shifucheckbox *ngFor="let act of newevent.lst_activities" [(ngModel)]="act.checked" label="{{act.text}}" (click)="refresh()"></shifucheckbox>\n  </shifucard>\n\n  <shifucard title="ADDEVENT.WELCOMESCREEN" tuto="ADDEVENT.TUTOWELCOMESCREEN" [visible]="false">\n    <div style="text-align: center;width:100%">\n      <img src="{{newevent.welcomePicture}}" style="width:80%;margin-left:10%;">\n      <shifubutton id="btnWelcomePicture" icon="images" label="ADDEVENT.WELCOMEPICTURE" (click)="selImage()"></shifubutton>\n      <shifurange unite="secondes" step="1" min="0" max="10" id="txtWelcomeDuration" icon="time" label="ADDEVENT.WELCOMEDURATION" [(ngModel)]="newevent.welcomeDuration"></shifurange>\n    </div>\n  </shifucard>\n\n  <shifucard title="LIB.EXPERT" [visible]="userData.user.connexion!=null && userData.user.connexion.length>50">\n    <tuto label="ADDEVENT.TUTOEXPERT"></tuto>\n    <shifubutton label="LIB.AUTOEVENT" ngxClipboard [cbContent]="magiklink" (click)="onCopy()"></shifubutton><br>\n    <shifubutton label="ADDEVENT.DEFAULTWIDGET" (click)="setDefaultWidget()"></shifubutton><br>\n  </shifucard>\n\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addevent-advanced\addevent-advanced.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.ModalController, core_2.TranslateService, ionic_angular_1.NavParams, ionic_angular_1.ViewController,
            user_data_1.UserData, api_1.ApiProvider, ionic_angular_1.ToastController])
    ], AddeventAdvancedPage);
    return AddeventAdvancedPage;
}());
exports.AddeventAdvancedPage = AddeventAdvancedPage;
//# sourceMappingURL=addevent-advanced.js.map

/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var user_data_1 = __webpack_require__(8);
/**
 * Generated class for the AddeventDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddeventDatePage = /** @class */ (function () {
    function AddeventDatePage(params, viewCtrl, userData) {
        var _this = this;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.userData = userData;
        this.delayFromStart = 0;
        this.delayFromEnd = 0;
        this.showStartIn = true;
        this.showDtStart = true;
        this.showDtEnd = true;
        this.offset = 0;
        this.startin = 0;
        this.dtHour = 18;
        this.duration = 8;
        this.user = { connexions: [] };
        this.newevent = {};
        this.newevent = this.params.get("newevent");
        this.offset = new Date().getTimezoneOffset() * 60 * 1000;
        this.duration = this.newevent.duration / (3600 * 1000);
        var dt = Number(this.newevent.dtStart);
        this.dtStartLocal = new Date(new Date(dt).getTime() - this.offset).toISOString();
        this.dtEndLocal = new Date(new Date(dt).getTime() - this.offset + this.newevent.duration).toISOString();
        this.userData.get().subscribe(function (r) {
            if (r != null)
                _this.user = r;
        });
    }
    AddeventDatePage.prototype.changeDate = function (evt) {
        this.showStartIn = false;
    };
    AddeventDatePage.prototype.moveDelay = function () {
        this.dtStartLocal = new Date(new Date().getTime() - this.offset + this.startin * 3600 * 1000).toISOString();
        this.dtEndLocal = new Date(new Date(this.dtStartLocal).getTime() + this.duration * 3600 * 1000).toISOString();
    };
    AddeventDatePage.prototype.changeDelayStart = function () { this.showDtStart = false; };
    AddeventDatePage.prototype.changeDelayEnd = function () { this.showDtEnd = false; };
    AddeventDatePage.prototype.save = function () {
        this.newevent.dtStart = new Date(this.dtStartLocal).getTime() + this.offset;
        this.newevent.dtEnd = new Date(this.dtEndLocal).getTime() + this.offset;
        this.newevent.duration = (this.newevent.dtEnd - this.newevent.dtStart);
        this.viewCtrl.dismiss(this.newevent);
    };
    AddeventDatePage.prototype.recalcDate = function () {
        if (new Date(this.dtStartLocal).getTime() > new Date(this.dtEndLocal).getTime())
            this.dtEndLocal = new Date(new Date(this.dtStartLocal).getTime() + 8 * 3600 * 1000).toISOString();
        if (!this.showStartIn)
            this.duration = Math.round((new Date(this.dtEndLocal).getTime() - new Date(this.dtStartLocal).getTime()) / (3600 * 1000));
        // if(this.showStartIn){
        //   this.dtStart=new Date(new Date().getTime()+this.startin*3600*1000).toISOString();
        //   this.delayFromStart=this.startin*60*1000;
        //   this.dtEndLocal=new Date(new Date(this.dtEnd).getTime()-new Date(this.dtEnd).getTimezoneOffset()*60*1000).toISOString();
        //   //;
        // }else{
        //   //this.delayFromStart=(new Date(this.dtStartLocal).getTime()-new Date().getTime())/60000+new Date(this.dtStart).getTimezoneOffset();
        //   //
        //   //this.delayFromEnd=(new Date(this.dtEndLocal).getTime()-new Date().getTime())/60000+new Date(this.dtStart).getTimezoneOffset()+this.duration*60;
        // }
    };
    ;
    AddeventDatePage = __decorate([
        core_1.Component({
            selector: 'page-addevent-date',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addevent-date\addevent-date.html"*/'<!--\n  Generated template for the AddeventDatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle [back]="true" title="Date">\n    <shifubutton id="btnSaveDate" icon="checkmark" (click)="save()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n\n<ion-content padding>\n  <tuto label="ADDEVENT.TUTO_DATETIME"></tuto>\n\n  <div class="item text-center" style="width:100%;font-size:x-large;vertical-align: middle;">\n\n    <!--<button id="btnNow" *ngIf="userData.user.connexions.length>15" class="button button-small button-positive" (click)="setNow()">{{\'LIB.NOW\' | translate }}</button><br><br>-->\n\n\n    <shifucard [visible]="true" title="LIB.START">\n      <ion-item  *ngIf="showDtStart">\n        <ion-label>Start</ion-label>\n        <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="dtStartLocal" (ionChange)="recalcDate()" (click)="changeDate($event)"></ion-datetime>\n      </ion-item>\n\n      <ion-item  *ngIf="showDtStart">\n        <ion-label>Hour</ion-label>\n        <ion-datetime displayFormat="HH:mm" [(ngModel)]="dtStartLocal" (ionChange)="recalcDate()" (click)="changeDate($event)"></ion-datetime>\n      </ion-item>\n\n      <shifurange id="txtStartIn" label="LIB.BEGININ" (click)="changeDelayStart()"\n                  [(ngModel)]="startin" *ngIf="showStartIn"\n                  unite="hrs" min="0" max="24" step="1" (onmove)="moveDelay()">\n      </shifurange>\n    </shifucard>\n\n\n    <shifucard [visible]="true"  title="LIB.END">\n      <ion-item *ngIf="showDtEnd">\n        <ion-label>End</ion-label>\n        <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="dtEndLocal" (ionChange)="recalcDate()" (click)="changeDate($event)"></ion-datetime>\n      </ion-item>\n\n\n      <ion-item  *ngIf="showDtEnd">\n        <ion-label>Hour</ion-label>\n        <ion-datetime displayFormat="HH:mm" [(ngModel)]="dtEndLocal" (ionChange)="recalcDate()" (click)="changeDate($event)"></ion-datetime>\n      </ion-item>\n\n\n      <shifurange id="txtDuration" label="LIB.DURATION" (click)="changeDelayEnd()"\n                  [(ngModel)]="duration" unite="hrs" *ngIf="showStartIn"\n                  min="1" max="15" step="1" (onmove)="moveDelay()">\n      </shifurange>\n\n    </shifucard>\n\n    <br><br>\n    <label *ngIf="!showStartIn">{{\'LIB.DURATION\' | translate}}&nbsp;{{this.duration}} hrs</label>\n\n\n\n  </div>\n\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addevent-date\addevent-date.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.NavParams, ionic_angular_1.ViewController, user_data_1.UserData])
    ], AddeventDatePage);
    return AddeventDatePage;
}());
exports.AddeventDatePage = AddeventDatePage;
//# sourceMappingURL=addevent-date.js.map

/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var user_data_1 = __webpack_require__(8);
var Tools = __webpack_require__(2);
var core_2 = __webpack_require__(7);
var Maintools_1 = __webpack_require__(2);
var image_creator_1 = __webpack_require__(38);
var AddeventFlyerPage = /** @class */ (function () {
    function AddeventFlyerPage(params, viewCtrl, userData, translate, alertCtrl, modalCtrl) {
        var _this = this;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.userData = userData;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.user = { connexions: [] };
        this.newevent = {};
        this.images = [];
        this.filter = "";
        this.textColor = "white";
        this.imagePlatform = function (service) {
            var vm = this;
            Tools.showPopup({
                title: "ADDEVENT.QUERY",
                confirmButton: "LIB.OK",
                cancelButton: "LIB.CANCEL",
                translate: this.translate,
                type: "text"
            }, this.alertCtrl, function (res) {
                vm.userData.getImageForFlyer(service, res, null, null).subscribe(function (resp) {
                    resp.items.forEach(function (p) {
                        vm.images.push({ picture: p.photo });
                    });
                });
            });
        };
        this.newevent = this.params.get("newevent");
        this.newevent.flyer = this.newevent.templateFlyer;
        this.onChangePicture();
        this.userData.get().subscribe(function (r) { return _this.user = r; });
    }
    AddeventFlyerPage.prototype.save = function () {
        this.viewCtrl.dismiss(this.newevent);
    };
    /**
     * Selection d'un nouveau template
     * @param img
     */
    // selImage(img) {
    //   this.newevent.templateFlyer = img.picture;
    //   this.images = [];
    //   this.onChangePicture();
    // };
    AddeventFlyerPage.prototype.updateFlyer = function (img) {
        this.newevent.flyer = img;
    };
    ;
    AddeventFlyerPage.prototype.defaultFlyer = function () {
        // this.userData.getImageForFlyer("server", null, null,null,function (resp) {
        //     resp.items.forEach(function (p) {
        //       this.images.push({picture: p.photo});
        //     });
        // });
    };
    ;
    AddeventFlyerPage.prototype.streetView = function () {
        // this.userData.getImageForFlyer("streetview", null, this.newevent.lat,this.newevent.lng,function (resp) {
        //     resp.items.forEach(function (p) {
        //       this.images.push({picture: p.photo});
        //     });
        // });
    };
    ;
    AddeventFlyerPage.prototype.selImage = function () {
        var vm = this;
        Maintools_1.openModal(this.modalCtrl, image_creator_1.ImageCreatorPage, { ratio: 3 / 2, upload: true }, function (rep) {
            if (rep != null) {
                vm.newevent.templateFlyer = rep.value;
                vm.onChangePicture();
            }
        });
    };
    // getImageForFlyer = function () {
    //   this.userDate.getImageForFlyer("local",null,null,null).subscribe((resp)=>{
    //       localStorage.images = JSON.stringify(resp.items);
    //       //$state.go("imageSelector", {}, {cache: false});
    //     }
    //   );
    // };
    AddeventFlyerPage.prototype.urlFlyer = function () {
        var vm = this;
        Tools.showPopup({ title: "ADDEVENT.URLFLYER",
            placeholder: "http://",
            translate: this.translate,
            type: "text" }, this.alertCtrl, function (res) {
            if (res != undefined) {
                vm.newevent.templateFlyer = res;
                for (var i = 0; i < 4; i++)
                    this.style_button[i] = "";
                vm.onChangePicture();
            }
        });
    };
    ;
    AddeventFlyerPage.prototype.changeOffset = function () {
        this.onChangePicture();
    };
    ;
    AddeventFlyerPage.prototype.onChangePicture = function () {
        var vm = this;
        var url = this.filter + this.newevent.templateFlyer;
        url = url.replace("url=/http://", "url=/");
        url = url.replace("url=/https://", "url=/");
        this.userData.makeFlyer(this.newevent, this.newevent.option.title, this.newevent.option.address, this.newevent.option.date, this.newevent.option.teaser, this.textColor, url).subscribe(function (resp) {
            vm.newevent.flyer = resp.photo;
            //if(resp.text.indexOf("url="))resp.text=resp.text.split("url=/")[1];
        });
        return;
        /*
         if (show_title) this.title = this.newevent.title; else this.title = "";
         if (show_address) this.address = this.newevent.address; else this.address = "";
         if (show_time){
         var sTime=new Date(this.newevent.dtStart).toLocaleTimeString(this.userData.user.lang + "-" + this.userData.user.lang.toUpperCase());
         this.date = new Date(this.newevent.dtStart).toLocaleDateString(this.userData.user.lang + "-" + this.userData.user.lang.toUpperCase())+" - "+sTime;
         }
         else
         this.date = "";
         if (show_teaser) this.description = this.newevent.description; else this.description = "";
         */
    };
    ;
    //Start when the window opened
    // this.newevent.offset = 0;
    // this.minOffset = -100;
    // this.images = [];
    // this.title = this.newevent.title;
    // this.font = "Calibri";
    // this.description = this.newevent.description;
    // this.date = new Date(this.newevent.dtStart).toLocaleDateString();
    // this.address = this.newevent.address;
    // this.color = "#ffffff";
    // this.onChangePicture();
    AddeventFlyerPage.prototype.inverse_color = function () {
        if (this.textColor == "white")
            this.textColor = "black";
        else
            this.textColor = "white";
        this.onChangePicture();
    };
    AddeventFlyerPage = __decorate([
        core_1.Component({
            selector: 'page-addevent-flyer',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addevent-flyer\addevent-flyer.html"*/'<ion-header>\n  <shifutitle title="Flyer">\n    <shifubutton id="btnSaveFlyer" icon="checkmark" (click)="save()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n<ion-content padding>\n  <tuto label="ADDEVENT.TUTO_FLYER" show="btnChangeTemplate"></tuto>\n\n  <ion-grid no-padding>\n    <ion-row>\n      <ion-col text-center>\n        <svgedit code="{{newevent.flyer}}" (click)="selImage()"></svgedit><br><br>\n\n      </ion-col>\n      <ion-col text-left>\n        <shifucheckbox id="btnTitle" label="Title" [(ngModel)]="newevent.option.title" (onchange)="onChangePicture()"></shifucheckbox><br>\n        <shifucheckbox *ngIf="newevent.address!=null && newevent.address.length>0" id="btnAddress" label="Address" [(ngModel)]="newevent.option.address" (onchange)="onChangePicture()"></shifucheckbox><br>\n        <shifucheckbox id="btnTime" label="Time" [(ngModel)]="newevent.option.date" (onchange)="onChangePicture()"></shifucheckbox><br>\n        <shifucheckbox *ngIf="newevent.description!=null && newevent.description.length>0" id="btnTeaser" label="Teaser" [(ngModel)]="newevent.option.teaser" (onchange)="onChangePicture()"></shifucheckbox>\n\n\n\n          <!--<shifubutton label="LIB.BLUR" (click)="blur()"></shifubutton>-->\n          <!--<shifubutton label="LIB.GRAYSCALE" (click)="grayscale()"></shifubutton>-->\n\n      </ion-col>\n      <ion-row>\n        <ion-col>\n          <shifubutton id="btnChangeTemplate" icon="images" label="ADDEVENT.CHANGETEMPLATE" (click)="selImage()"></shifubutton>\n        </ion-col>\n        <ion-col>\n          <shifubutton label="LIB.INVERSECOLOR" (click)="inverse_color()"></shifubutton>\n        </ion-col>\n      </ion-row>\n    </ion-row>\n\n  </ion-grid>\n\n  <br>\n  <span *ngIf="userData.user.connexions!=null && userData.user.connexions.length<10">\n    Pour une personnalisation total du flyer il est préférable d\'utiliser un logiciel de graphisme (type Gimp) puis de télécharger l\'image obtenue\n  </span>\n\n  <!--<ion-card *ngIf="images.length>0">-->\n    <!--<ion-card-header>-->\n      <!--{{"ADDEVENT.FINDFLYER" | translate}}-->\n    <!--</ion-card-header>-->\n    <!--<ion-card-content>-->\n      <!--<img *ngFor="let img of images"-->\n           <!--name="flyerImages"-->\n           <!--src="{{img.picture}}"-->\n           <!--style="margin: 5px;display:inline;width:100px;height:150px;"-->\n           <!--(click)="selImage(img)">-->\n    <!--</ion-card-content>-->\n  <!--</ion-card>-->\n\n\n\n  <!--<shifubutton id="btnLocal" size="150" icon="ion-android-map" (click)="streetView()" label="Local" *ngIf="userData.user.connexions.length>10"></shifubutton>-->\n  <!--<shifubutton id="btnGallery" size="150" icon="ion-image" label="Gallery" (click)="defaultFlyer()"></shifubutton>-->\n  <!--<shifubutton id="btnURL" size="150" icon="ion-link" label="URL" (click)="urlFlyer()"></shifubutton>-->\n  <!--<shifubutton id="btnPixabay"  size="150" icon="ion-image" (click)="imagePlatform(\'pixabay\')" label="PixaBay" *ngIf="userData.user.connexions.length>10"></shifubutton>-->\n  <!--<shifubutton id="btnInstagram" size="150" icon="ion-social-instagram" label="Instagram" (click)="imagePlatform(\'instagram\')"></shifubutton>-->\n\n  <!--<color label="{{\'LIB.COLOR\' | translate}}" size="200" update-color="updateColor(color)" start-color="#ffffff"></color><br><br>-->\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addevent-flyer\addevent-flyer.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.NavParams, ionic_angular_1.ViewController,
            user_data_1.UserData, core_2.TranslateService,
            ionic_angular_1.AlertController, ionic_angular_1.ModalController])
    ], AddeventFlyerPage);
    return AddeventFlyerPage;
}());
exports.AddeventFlyerPage = AddeventFlyerPage;
//# sourceMappingURL=addevent-flyer.js.map

/***/ }),

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var user_data_1 = __webpack_require__(8);
var Tools = __webpack_require__(2);
var Maintools_1 = __webpack_require__(2);
var core_2 = __webpack_require__(7);
var TarifsPage = /** @class */ (function () {
    function TarifsPage(viewCtrl, navCtrl, navParams, userData, alertCtrl, toastCtrl, translate) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.tarifs = [];
        this.newUsers = 0;
        this.reduction = 0;
    }
    TarifsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userData.getmynewusers(this.userData.user.tarif.dtLastPayment).subscribe(function (r) {
            if (r.items != undefined) {
                _this.newUsers = r.items.length;
                _this.reduction = _this.newUsers * 0.25;
            }
            _this.userData.getAllTarifs().subscribe(function (resp) {
                _this.tarifs = resp.items;
            });
        });
    };
    TarifsPage.prototype.selTarif = function (t) {
        var _this = this;
        Tools.showConfirm("TARIF.CHANGECONFIRMATION", this.alertCtrl, this.translate, function () {
            var index = _this.tarifs.indexOf(t);
            var vm = _this;
            _this.userData.updatetarif(_this.tarifs[index].tarif).subscribe(function (resp) {
                _this.userData.user = resp;
                Tools.toast(vm.toastCtrl, resp.message, vm.translate);
                _this.viewCtrl.dismiss();
            });
        }, function () { _this.viewCtrl.dismiss(); });
    };
    TarifsPage.prototype.openDoc = function (item) {
        Tools.openWindow(item.doc);
    };
    TarifsPage.prototype.pay = function () {
        var _this = this;
        Maintools_1.showPopup({ title: "Payment", placeholder: "", confirmButton: "LIB.OK", cancelButton: "LIB.CANCEL", type: "number", translate: this.translate }, this.alertCtrl, function (res) {
            if (res != null)
                _this.userData.creditaccount(res).subscribe(function (r) {
                    _this.userData.user = r;
                });
        });
    };
    TarifsPage = __decorate([
        core_1.Component({
            selector: 'page-tarifs',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\tarifs\tarifs.html"*/'<ion-header>\n  <shifutitle label="LIB.TARIFS">\n    <shifubutton id="btnClose" icon="close" (click)="viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n\n<ion-content padding>\n  <h1>{{userData.user.tarif.name}}</h1>\n\n  <ion-row>\n    <ion-col>\n      {{\'LIB.ACCOUNT\' | translate}}\n      <shifubutton [small]="true" label="Credit Card" (click)="pay()" id="btnPayment"></shifubutton>\n    </ion-col>\n    <ion-col text-right>{{userData.user.realCredits}}{{\'LIB.MONEY\' | translate}}</ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>{{\'TARIF.NEXTPAYMENT\' | translate}} <shifutimer [end]="userData.user.tarif.dtNextPayment"></shifutimer></ion-col>\n    <ion-col text-right>{{userData.user.tarif.recursive_cost}}{{\'LIB.MONEY\' | translate}}</ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>{{\'TARIF.NEWUSERS\' | translate}}</ion-col>\n    <ion-col text-right>{{newUsers}}&nbsp;<ion-icon name="person"></ion-icon></ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>{{\'LIB.DISCOUNT\' | translate}}</ion-col>\n    <ion-col text-right>{{reduction}}{{\'LIB.MONEY\' | translate}}</ion-col>\n  </ion-row>\n  <br>\n\n  <shifucard shifuid="tarif" [visible]="userData.user.tarif.label==item.label" [title]="item.label" *ngFor="let item of tarifs" icon="document" (onclick)="openDoc(item)">\n    {{\'LIB.ABO\' | translate}}:{{item.recursive_cost}}&nbsp;<img src="./assets/img/money.png" class="small-money"><br>\n    {{\'LIB.NEWEVENT\' | translate}}:{{item.newevent_cost}}&nbsp;<img src="./assets/img/money.png" class="small-money"><br>\n    <!--{{\'LIB.ENGAGEMENT\' | translate}}:{{item.engagement}}&nbsp;{{\'LIB.DAYS\' | translate}}<br>-->\n    <shifubutton shifuid="btnSubscribe" *ngIf="userData.user.tarif.label!=item.label" label="LIB.SUBSCRIBE" (click)="selTarif(item)"></shifubutton>\n  </shifucard>\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\tarifs\tarifs.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.ViewController, ionic_angular_1.NavController,
            ionic_angular_1.NavParams, user_data_1.UserData, ionic_angular_1.AlertController,
            ionic_angular_1.ToastController, core_2.TranslateService])
    ], TarifsPage);
    return TarifsPage;
}());
exports.TarifsPage = TarifsPage;
//# sourceMappingURL=tarifs.js.map

/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var user_data_1 = __webpack_require__(8);
var event_data_1 = __webpack_require__(15);
var Maintools_1 = __webpack_require__(2);
var core_2 = __webpack_require__(7);
/**
 * Generated class for the AddpresentationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddpresentationPage = /** @class */ (function () {
    function AddpresentationPage(navCtrl, navParams, translate, viewCtrl, userData, alertCtrl, eventData, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.viewCtrl = viewCtrl;
        this.userData = userData;
        this.alertCtrl = alertCtrl;
        this.eventData = eventData;
        this.toastCtrl = toastCtrl;
        this.newpres = null;
        this.costToPresent = 0;
        var maxduration = Math.min((this.eventData.event.dtEnd - new Date().getTime()) / 60000, this.eventData.event.maxPresDuration);
        var duration = maxduration / 2;
        if (duration > 3 * 60)
            duration = 3 * 60;
        this.newpres = {
            title: "",
            text: "",
            description: "",
            support: "",
            file: "",
            format: "",
            from: this.userData.user,
            duration: duration,
            dtStart: new Date().getTime(),
            dtEnd: new Date().getTime() + duration * 60000,
            maxdelay: maxduration
        };
        if (this.eventData.event.pricePerMinute)
            this.costToPresent = this.newpres.duration * this.eventData.event.priceToPresent;
        else
            this.costToPresent = this.eventData.event.priceToPresent;
    }
    AddpresentationPage.prototype.close = function () {
        this.newpres.dtEnd = this.newpres.dtStart + this.newpres.duration * 60000;
        this.viewCtrl.dismiss(this.newpres);
    };
    AddpresentationPage.prototype.setSupport = function (evt) {
        if (evt.mega > 20)
            Maintools_1.toast(this.toastCtrl, "FILE.TOOLARGE", this.translate);
        else {
            this.newpres.support = evt.value;
            this.newpres.file = evt.file;
            this.newpres.mega = evt.mega;
            this.newpres.size = evt.size;
            this.newpres.format = evt.format;
            if (this.newpres.title == "")
                this.newpres.title = this.newpres.file.split(".")[0];
        }
    };
    AddpresentationPage.prototype.openLink = function () {
        var _this = this;
        //https://docs.google.com/presentation/d/e/2PACX-1vTFt8CdePvpEPUXTapxUczbXGGfnrSw-2niRl9OnFGynMRJ9Vd0SDGdM538qD42FkjgzAqcOssAOBM0/pub?start=false&loop=false&delayms=3000&slide=id.g3a290a7570_0_175
        Maintools_1.showPopup({
            title: "URL du document",
            default: "",
            cancelButton: "LIB.CANCEL",
            confirmButton: "LIB.OK",
            type: "text",
            translate: this.translate
        }, this.alertCtrl, function (res) {
            if (res != null) {
                _this.newpres.support = res;
                _this.newpres.file = res;
                _this.newpres.format = res.substr(res.lastIndex("."));
            }
        });
    };
    AddpresentationPage.prototype.updateDuration = function () {
        if (this.eventData.event.pricePerMinute)
            this.costToPresent = Number(this.newpres.duration) * this.eventData.event.priceToPresent;
        else
            this.costToPresent = this.eventData.event.priceToPresent;
    };
    AddpresentationPage = __decorate([
        core_1.Component({
            selector: 'page-addpresentation',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addpresentation\addpresentation.html"*/'<!--\n  Generated template for the AddpresentationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <shifutitle title="Ajouter une presentation">\n    <shifubutton [small]="true" icon="checkmark"\n                 label="LIB.SAVE" id="btnSave"\n                 *ngIf="newpres.support.length>0 && newpres.title.length>0 && newpres.text.length>0"\n                 (click)="close()"></shifubutton>\n    <shifubutton [small]="true" id="btnCancel" icon="close" (click)="viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n\n<ion-content padding>\n  <tuto label="ADDPRESENTATION.TUTO" position="title" show="txtTitle"></tuto>\n  <br>\n  <ion-item text-center no-lines no-border no-margin>\n    <shifufile\n      id="btnTakeFile"\n      tips="Sélectionner un fichier sur votre téléphone"\n      size="50"\n      [hourglass]="true"\n      icon="add-circle"\n      (onTake)="setSupport($event)">\n    </shifufile>\n    <shifubutton size="50" icon="link" (click)="openLink()"></shifubutton><br>\n    <span *ngIf="newpres.file.length>0" style="font-size: small">{{newpres.file}}</span>\n  </ion-item>\n\n  <shifuinput label="LIB.TITLE" [focus]="true" style="font-size: x-large;" id="txtTitle" [(ngModel)]="newpres.title"></shifuinput>\n  <shifuinput label="LIB.TEASER" *ngIf="newpres.title.length>2" [(ngModel)]="newpres.text"></shifuinput>\n\n    <!--<div style="text-align: center;width:100%">-->\n      <!--<img *ngIf="newpres.picture.length>0" src="{{newpres.picture}}" style="width:80%;" class="image-photo" (click)="selImage()"><br>-->\n      <!--<shifubutton id="btnAddImage" *ngIf="newpres.picture.length==0" icon="image" (click)="selImage()"></shifubutton><br>-->\n      <!--<br>-->\n    <!--</div>-->\n\n    <ion-item *ngIf="eventData.event.priceToPresent>0" text-center no-lines style="font-size: x-large">\n      Price to present : {{costToPresent}}\n    </ion-item>\n\n    <shifurange\n      icon="time" id="txtDuration" label="LIB.DURATION"\n      unite="minutes" [(ngModel)]="newpres.duration" min="1"\n      max="{{newpres.maxdelay}}"  step="1"\n      (onchange)="updateDuration()"\n    >\n    </shifurange>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addpresentation\addpresentation.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.NavParams, core_2.TranslateService,
            ionic_angular_1.ViewController, user_data_1.UserData, ionic_angular_1.AlertController,
            event_data_1.EventDataProvider, ionic_angular_1.ToastController])
    ], AddpresentationPage);
    return AddpresentationPage;
}());
exports.AddpresentationPage = AddpresentationPage;
//# sourceMappingURL=addpresentation.js.map

/***/ }),

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var api_1 = __webpack_require__(16);
var core_2 = __webpack_require__(7);
var user_data_1 = __webpack_require__(8);
var event_data_1 = __webpack_require__(15);
var platform_browser_1 = __webpack_require__(21);
/**
 * Generated class for the RemotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RemotePage = /** @class */ (function () {
    function RemotePage(userData, eventData, viewCtrl, toastCtrl, events, api, navParams, domSanitizer, translate) {
        this.userData = userData;
        this.eventData = eventData;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.api = api;
        this.navParams = navParams;
        this.domSanitizer = domSanitizer;
        this.translate = translate;
        this.pres = null;
        this.pres = this.navParams.get("pres");
    }
    RemotePage.prototype.page = function (pres, sens) {
        if (pres.page > 0) {
            pres.page = pres.page + sens;
            this.eventData.gotopage(pres).subscribe(function () { });
        }
    };
    RemotePage = __decorate([
        core_1.Component({
            selector: 'page-remote',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\remote\remote.html"*/'<!--\n  Generated template for the RemotePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <shifutitle title="LIB.REMOTE">\n    <shifubutton [small]="true" id="btnClose" icon="close" (click)="viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n<ion-content padding text-center>\n\n\n      <ion-icon name="hourglass"></ion-icon>\n      <shifutimer style="font-size: larger" [end]="pres.dtEnd"></shifutimer>&nbsp;&nbsp;-&nbsp;\n      Page<span style="font-size: large">&nbsp;{{pres.page}}&nbsp;/&nbsp;{{pres.nPages}}</span>\n      <br>\n\n\n <img\n         class="image-photo"\n         [src]="pres.pages[pres.page-1]"\n         style="max-height:40%;">\n  <br>\n    <ion-item text-center no-lines no-border>\n        <ion-icon *ngIf="pres.page>1" style="font-size: 7em;" name="arrow-dropleft" (click)="page(pres,-1)"></ion-icon>\n        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n        <ion-icon *ngIf="pres.page<pres.nPages" style="font-size: 7em;" name="arrow-dropright" (click)="page(pres,1)"></ion-icon>\n        <br>\n    </ion-item>\n\n\n    <ion-item no-lines text-center *ngIf="pres.page<pres.nPages">\n        {{"LIB.NEXTSLIDE" | translate}}<br>\n        <img\n                class="image-photo"\n                [src]="pres.pages[pres.page]"\n                style="max-height:40%;width:90%;"\n                (click)="page(pres,1)">\n\n    </ion-item>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\remote\remote.html"*/,
        }),
        __metadata("design:paramtypes", [user_data_1.UserData,
            event_data_1.EventDataProvider,
            ionic_angular_1.ViewController,
            ionic_angular_1.ToastController,
            ionic_angular_1.Events,
            api_1.ApiProvider,
            ionic_angular_1.NavParams,
            platform_browser_1.DomSanitizer,
            core_2.TranslateService])
    ], RemotePage);
    return RemotePage;
}());
exports.RemotePage = RemotePage;
//# sourceMappingURL=remote.js.map

/***/ }),

/***/ 323:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var event_data_1 = __webpack_require__(15);
var user_data_1 = __webpack_require__(8);
var Maintools_1 = __webpack_require__(2);
var settings_1 = __webpack_require__(23);
var TabsPage = /** @class */ (function () {
    function TabsPage(events, navParams, settings, eventData, userData) {
        this.events = events;
        this.navParams = navParams;
        this.settings = settings;
        this.eventData = eventData;
        this.userData = userData;
        this.tabs = [];
        this.myindex = 0;
        this.refresh();
    }
    TabsPage.prototype.refresh = function () {
        Maintools_1.$$("Refresh des onglets");
        var vm = this;
        vm.tabs = [];
        this.tabs = Maintools_1.buildTabs(this.userData.user, this.eventData.event, Maintools_1.iif(this.settings.ihm == "pro", "pro", ""));
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.userData.user.connexions.length > 5)
                this.tabs[i].tabTitle = "";
            this.tabs[i].shifuid = this.tabs[i].name;
            if (this.tabs[i].name == vm.navParams.data.tabName)
                this.myindex = i;
        }
    };
    TabsPage.prototype.changeTab = function () {
        this.userData.selectTab = this.tabRef.getSelected().root;
        if (this.eventData.event.blacklist != undefined && this.eventData.event.blacklist.indexOf(this.userData.user.id) > -1)
            this.events.publish("event:logout", { message: "SELEVENT.BLACKLIST" });
    };
    __decorate([
        core_1.ViewChild('myTabs'),
        __metadata("design:type", ionic_angular_1.Tabs)
    ], TabsPage.prototype, "tabRef", void 0);
    TabsPage = __decorate([
        core_1.Component({template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\tabs-page\tabs-page.html"*/'<ion-tabs id="tabShifumix" #myTabs [selectedIndex]="myindex" (ionChange)="changeTab()">\n  <div *ngFor="let tab of tabs" id="{{tab.name}}">\n    <ion-tab\n             tabTitle="{{tab.tabTitle | translate}}"\n             [root]="tab.root"\n             tabIcon="{{tab.tabIcon}}"\n             tabUrlPath="{{tab.tabUrl}}">\n    </ion-tab>\n  </div>\n</ion-tabs>\n\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\tabs-page\tabs-page.html"*/
        }),
        __metadata("design:paramtypes", [ionic_angular_1.Events,
            ionic_angular_1.NavParams,
            settings_1.SettingsProvider,
            event_data_1.EventDataProvider,
            user_data_1.UserData])
    ], TabsPage);
    return TabsPage;
}());
exports.TabsPage = TabsPage;
//# sourceMappingURL=tabs-page.js.map

/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var storage_1 = __webpack_require__(42);
var login_1 = __webpack_require__(181);
var user_data_1 = __webpack_require__(8);
var TutorialPage = /** @class */ (function () {
    function TutorialPage(navCtrl, plt, menu, userData, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.plt = plt;
        this.menu = menu;
        this.userData = userData;
        this.storage = storage;
        this.showSkip = true;
        this.tutos = ["./assets/img/tuto1.svg", "./assets/img/tuto2.svg", "./assets/img/tuto3.svg"];
        this.type_tuto = "normal";
        this.storage.get("type").then(function (r) {
            _this.type_tuto = r;
        });
        var lang = plt.lang();
        if (lang == "en")
            this.tutos = ["./assets/img/tuto1.svg", "./assets/img/tuto2.svg", "./assets/img/tuto3.svg"];
        if (this.userData.user != undefined)
            this.userData.clearhisto().subscribe(function (r) {
                if (r != null)
                    _this.userData.user = r;
            });
    }
    TutorialPage.prototype.startApp = function () {
        var _this = this;
        this.navCtrl.setRoot(login_1.LoginPage).then(function () {
            _this.storage.set('hasSeenTutorial', 'true');
        });
    };
    TutorialPage.prototype.onSlideChangeStart = function (slider) {
        this.showSkip = !slider.isEnd();
    };
    TutorialPage.prototype.ionViewWillEnter = function () {
        this.slides.update();
    };
    TutorialPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    };
    TutorialPage.prototype.ionViewDidLeave = function () {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    };
    __decorate([
        core_1.ViewChild('slides'),
        __metadata("design:type", ionic_angular_1.Slides)
    ], TutorialPage.prototype, "slides", void 0);
    TutorialPage = __decorate([
        core_1.Component({
            selector: 'page-tutorial',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\tutorial\tutorial.html"*/'<ion-header no-border>\n  <ion-navbar>\n    <ion-buttons end *ngIf="showSkip">\n      <button id="btnSkip" ion-button (click)="startApp()" color="primary">Skip</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-slides #slides (ionSlideWillChange)="onSlideChangeStart($event)" pager>\n    <ion-slide *ngFor="let tuto of tutos">\n      <img width="100%" height="100%" [src]="tuto" class="slide-image">\n    </ion-slide>\n\n    <ion-slide>\n      <h2 class="slide-title">Ready to Play?</h2>\n      <button ion-button icon-end large clear (click)="startApp()">\n        Continue\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n    </ion-slide>\n\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\tutorial\tutorial.html"*/
        }),
        __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.Platform,
            ionic_angular_1.MenuController, user_data_1.UserData,
            storage_1.Storage])
    ], TutorialPage);
    return TutorialPage;
}());
exports.TutorialPage = TutorialPage;
//# sourceMappingURL=tutorial.js.map

/***/ }),

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var settings_1 = __webpack_require__(23);
var SupportPage = /** @class */ (function () {
    function SupportPage(navCtrl, viewCtrl, settings) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.settings = settings;
        this.view = "feedback";
    }
    SupportPage = __decorate([
        core_1.Component({
            selector: 'page-user',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\support\support.html"*/'<ion-header>\n  <shifutitle title="Support" menu="false">\n    <shifubutton icon="close" (click)="viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n<ion-content no-margin no-padding>\n\n  <ion-segment color="primary" [(ngModel)]="view">\n    <ion-segment-button [hidden]="settings.forum_url==null" id="cmdForum" value="forum">Forum</ion-segment-button>\n    <ion-segment-button [hidden]="settings.feedback_url==null"  id="cmdFeedback" value="feedback">Feedback</ion-segment-button>\n    <ion-segment-button [hidden]="settings.blog_url==null" id="cmdBlog" value="blog">Blog</ion-segment-button>\n  </ion-segment>\n\n\n  <iframe\n    *ngIf="view==\'forum\'"\n    [src]="settings.forum_url | safe"\n    style="width:100%;border-style: none;min-height:750px;">\n  </iframe>\n\n\n  <iframe\n    *ngIf="view==\'feedback\'"\n    [src]="settings.feedback_url | safe"\n    style="width:100%;border-style: none;min-height:750px;">\n  </iframe>\n\n  <iframe\n    *ngIf="view==\'blog\'"\n    [src]="settings.blog_url | safe"\n    style="width:100%;border-style: none;min-height:750px;">\n  </iframe>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\support\support.html"*/
        }),
        __metadata("design:paramtypes", [ionic_angular_1.NavController,
            ionic_angular_1.ViewController,
            settings_1.SettingsProvider])
    ], SupportPage);
    return SupportPage;
}());
exports.SupportPage = SupportPage;
//# sourceMappingURL=support.js.map

/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var event_data_1 = __webpack_require__(15);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var user_data_1 = __webpack_require__(8);
var Tools = __webpack_require__(2);
var search_1 = __webpack_require__(327);
var platform_browser_1 = __webpack_require__(21);
var public_profil_1 = __webpack_require__(54);
var Maintools_1 = __webpack_require__(2);
var Maintools_2 = __webpack_require__(2);
var invite_1 = __webpack_require__(46);
var musicserver_1 = __webpack_require__(107);
var core_2 = __webpack_require__(7);
var widget_1 = __webpack_require__(183);
var api_1 = __webpack_require__(16);
var ng_push_1 = __webpack_require__(84);
var HomePage = /** @class */ (function () {
    function HomePage(events, modalCtrl, navCtrl, navParams, api, eventData, userData, loadingCtrl, sanitizer, translate, notifs, alertCtrl, toastCtrl) {
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.eventData = eventData;
        this.userData = userData;
        this.loadingCtrl = loadingCtrl;
        this.sanitizer = sanitizer;
        this.translate = translate;
        this.notifs = notifs;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.songs = [];
        this.flyer = "";
        this.catalogues = [];
        this.lastRefresh = 0;
        this.toSend = [];
        this.handleToSend = null;
        this.handle = null;
        this.musicServers = ["Spotify", "Deezer", "Cloud", "YouTube", "Perso"];
        this.lastsong = "";
        //this.now=new Date().getTime();
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var vm = this;
        Tools.subscribe("playlist", this);
        this.delay = Tools.getDelay(this.eventData.event.dtStart, this.userData.user.lang, "LIB.DAY");
        this.api.getcatalogues().subscribe(function (r) {
            _this.catalogues = r.result.split(",");
        });
        if (this.eventData.event.owner_id == this.userData.user.id) {
            if (this.eventData.event.musicServer == null)
                this.openMusicServer();
            //Cas de la création d'un event par root avec musicServer=3
            if (this.eventData.event.musicServer == 0 && (this.userData.user.accessTokens == null || this.userData.user.accessTokens.spotify == null))
                this.openMusicServer();
        }
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () { _this.refresh(true); }, Maintools_1.DELAY_TO_REFRESH);
    };
    HomePage.prototype.openPublicProfile = function (item) {
        Tools.openModal(this.modalCtrl, public_profil_1.PublicProfilPage, { userid: item.from.id });
    };
    HomePage.prototype.addModerator = function () {
        this.events.publish("moderator:add");
    };
    HomePage.prototype.runPlayer = function () {
        var _this = this;
        if (this.eventData.event.musicServer == Maintools_2.MUSICSERVER_PERSO) {
            this.djplay(this.songs[0]);
            return;
        }
        this.userData.getwidgets("music").subscribe(function (resp) {
            var rc = null;
            resp.items.forEach(function (w) {
                if ((_this.eventData.event.musicServer != Maintools_2.MUSICSERVER_YOUTUBE && w.name == "player") || (_this.eventData.event.musicServer == Maintools_2.MUSICSERVER_YOUTUBE && w.name == "videos"))
                    rc = w;
            });
            if (rc != null)
                _this.userData.getwidget(rc.id, true).subscribe(function (resp) {
                    Maintools_1.openModal(_this.modalCtrl, widget_1.WidgetPage, { widget: resp, user: _this.userData.user, event: _this.eventData.event, preview: false });
                });
        });
    };
    HomePage.prototype.openMusicServer = function () {
        var _this = this;
        if (this.eventData.event.musicServer == Maintools_1.MUSICSERVER_LOCAL)
            this.userData.playlist.clear();
        Maintools_1.openModal(this.modalCtrl, musicserver_1.MusicserverPage, { from: "home" }, function (rep) {
            if (rep.user != null) {
                _this.userData.user = rep.user;
                _this.eventData.event.musicServer = rep.user.musicServer;
            }
        });
    };
    /**
     * Ajout des titres en récurents pour ajout multiple
     * @param vm
     * @param l_songs
     * @param position
     * @param func
     */
    HomePage.prototype.addsongs = function (vm, l_songs, position, func) {
        var _this = this;
        if (vm.songs.indexOf(l_songs[position]) == -1) {
            vm.songs.push(l_songs[position]);
            vm.lastsong = l_songs[position].Id;
            vm.eventData.addsong(l_songs[position]).subscribe(function (rep) {
                Tools.toast(vm.toastCtrl, rep.message, vm.translate);
                if (position < l_songs.length - 1 && _this.songs.length < _this.eventData.event.playlistLimits) {
                    vm.addsongs(vm, l_songs, position + 1, func);
                    return;
                }
                else
                    func();
            }, function (err) {
                Tools.toast(vm.toastCtrl, "LIB.ERRORRETRY", vm.translate);
                return;
            });
        }
    };
    HomePage.prototype.addsongauto = function () {
        var _this = this;
        Maintools_1.showPopup({
            title: this.translate.instant("HOME.ADDSONGAUTOTITLE"),
            value: 10,
            confirmButton: this.translate.instant("LIB.OK"),
            cancelButton: this.translate.instant("LIB.CANCEL"),
            type: "number"
        }, this.alertCtrl, function (res) {
            if (res > 0) {
                var l = Maintools_2.loading(_this);
                _this.eventData.addsongsauto(res).subscribe(function (r) {
                    if (l != null)
                        l.dismiss();
                    _this.refresh(true);
                }, function () {
                    if (l != null)
                        l.dismiss();
                });
            }
        });
    };
    HomePage.prototype.addsong = function (author) {
        var _this = this;
        if (author === void 0) { author = null; }
        var vm = this;
        var delay = (vm.eventData.event.dtEnd - new Date().getTime()) / 60000;
        if (delay < 3) { //On ne peut pas faire de pari quand il reste moins de 3 minutes
            Tools.toast(vm.toastCtrl, "BETS.NOTENOUGHTTIMETOSONG", this.translate);
        }
        else {
            if (vm.userData.user.score < vm.eventData.event.minScore)
                Tools.toast(vm.toastCtrl, "ERROR.NOTENOUGHTSCORE", this.translate, function () {
                    vm.navCtrl.push("ChartsPage", { type: "score" });
                });
            else {
                if (!this.eventData.event.opened && this.songs.length >= this.eventData.event.prePlaylistLimits) {
                    Tools.toast(vm.toastCtrl, "ADDEVENT.PREPLAYLISTLIMIT", this.translate);
                    return;
                }
                var l = null;
                Tools.openModal(this.modalCtrl, search_1.SearchPage, { query: author, catalogues: this.catalogues }, function (r) {
                    if (r) {
                        if (r.songs.length > 2)
                            l = Maintools_2.loading(_this);
                        vm.addsongs(vm, r.songs, 0, function () {
                            if (l != null)
                                l.dismiss();
                        });
                    }
                });
            }
        }
    };
    ;
    HomePage.prototype.searchArtist = function (song) {
        this.addsong(song.author);
    };
    HomePage.prototype.openInvite = function () {
        Maintools_1.openModal(this.modalCtrl, invite_1.InvitePage, { type: Tools.INVITE_PLAYLIST, event: this.eventData.event, from: this.userData.user, dest: "home" });
    };
    HomePage.prototype.openInfo = function (song) {
        if (song.url != "")
            Tools.openWindow(song.url, "_blank");
    };
    HomePage.prototype.updateEvent = function () {
        this.eventData.updateevent("minSongsInPlaylist,addSongOnlyByOwner,limitPlaylistSongsByUser,limitSearchToOwnerPlaylist,playlistLimits,prePlaylistLimits,musicServer").subscribe(function (r) { });
    };
    HomePage.prototype.delSong = function (song) {
        var index = this.songs.indexOf(song);
        var vm = this;
        if (song.from.id == vm.userData.user.id || vm.userData.user.id == vm.eventData.event.owner.id) {
            Tools.showConfirm("HOME.CONFIRMDELETE", vm.alertCtrl, this.translate, function () {
                vm.songs.splice(index, 1);
                vm.eventData.deletemessage(song.id, vm.userData.user.id).subscribe(function (resp) {
                    //vm.refresh();
                });
            });
        }
    };
    ;
    HomePage.prototype.onSetScore = function (step, song) {
        var _this = this;
        var index = this.songs.indexOf(song);
        var vm = this;
        var vote = { target: song.id, event: vm.eventData.event.id, from: vm.userData.user.id, value: step, description: "" };
        this.toSend.push(vote); //Ajout du vote à la liste
        vm.songs[index].canVote = false;
        vm.songs[index].score = vm.songs[index].score + step;
        if (this.handleToSend != null)
            clearTimeout(this.handleToSend);
        this.handleToSend = setTimeout(function () {
            vm.userData.sendvotes({ votes: _this.toSend }).subscribe(function (rep) {
                _this.toSend = [];
                if (rep == null)
                    Tools.toast(vm.toastCtrl, "ERROR.RETRY", vm.translate);
                else {
                    Tools.toast(vm.toastCtrl, vm.userData.user.message, vm.translate);
                    //if(vm.handle!=null)clearTimeout(vm.handle);
                    //vm.handle=setTimeout(() => {vm.refresh();},2000);
                }
            }, function (err) {
                Maintools_2.$$("error", err);
                Tools.toast(vm.toastCtrl, "ERROR.RETRY", vm.translate);
            });
        }, 2000); //Donc envoi des votes par paquet toutes les 2 secondes
    };
    ;
    HomePage.prototype.nextSong = function () {
        this.eventData.nextsong(this.eventData.event.secretCode).subscribe(function (r) { });
    };
    HomePage.prototype.refresh = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var vm = this;
        Maintools_2.$$("Appel de refresh sur HomePage");
        if (!force && this.userData.selectTab != undefined && this.userData.selectTab != "HomePage")
            return;
        Maintools_2.$$("Confirmation de refresh");
        this.eventData.update();
        this.eventData.getplaylist(vm.eventData.event.id).subscribe(function (resp) {
            if (resp != null) {
                if (resp.hasOwnProperty("items"))
                    vm.songs = resp.items;
                else
                    vm.songs = [];
                //S'il y a des titres
                var message = {};
                if (vm.songs.length > 0) {
                    vm.flyer = "";
                    for (var i = 0; i < vm.songs.length; i++) {
                        vm.songs[i].canVote = (vm.songs[i].from.id != vm.userData.user.id);
                        if (vm.songs[i].dtCreate > _this.lastRefresh && vm.songs[i].from.id != _this.userData.user.id) {
                            message = {
                                title: "Shifumix - Playlist",
                                body: "New track " + vm.songs[i].title + " from " + vm.songs[i].from.firstname,
                                image: vm.songs[i].picture,
                                vibrator: [200, 100, 200]
                            };
                            _this.lastRefresh = vm.songs[i].dtCreate;
                        }
                        if (vm.songs[i].canVote) {
                            if (vm.songs[i].hasOwnProperty("votes"))
                                vm.songs[i].votes.forEach(function (vote) {
                                    if (vm.songs[i].canVote && vote.from == vm.userData.user.id) {
                                        vm.songs[i].canVote = false;
                                    }
                                });
                        }
                    }
                    if (!force && message.hasOwnProperty("title"))
                        Tools.notif(_this.notifs, message, _this.translate);
                }
                if (vm.songs.length > 5 && vm.lastsong.length > 0) {
                    setTimeout(function () { vm.scrollTo(vm.lastsong); vm.lastsong = ""; }, 500);
                }
            }
        });
    };
    ;
    HomePage.prototype.scrollTo = function (elementId) {
        Maintools_2.$$("Recherche de " + elementId);
        var yOffset = document.getElementById(elementId);
        if (yOffset != null)
            this.content.scrollTo(0, yOffset.offsetTop, 2000);
    };
    HomePage.prototype.djplay = function (song) {
        var _this = this;
        if (this.eventData.event.musicServer == Maintools_2.MUSICSERVER_PERSO) {
            this.eventData.djplay(song).subscribe(function () {
                Maintools_1.toast(_this.toastCtrl, song.title + " is playing", _this.translate);
            });
        }
    };
    HomePage.prototype.stopcurrentsong = function () {
        this.eventData.stopcurrentsong().subscribe(function () { });
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Content),
        __metadata("design:type", ionic_angular_1.Content)
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        core_1.Component({
            selector: 'home',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\home\home.html"*/'<ion-header>\n  <shifutitle help="#" title="Music">\n    <span *ngIf="songs.length>=eventData.event.playlistLimits">{{\'HOME.FULLPLAYLIST\' | translate}}</span>\n\n    <div *ngIf="songs.length>3 && eventData.online && (!eventData.event.addSongOnlyByOwner || eventData.event.Moderators.indexOf(userData.user.id)>-1) && userData.user.score>=eventData.event.minScore && songs.length<eventData.event.playlistLimits">\n      <shifubutton [small]="true" id="btnAddSongFromCharts" label="LIB.CHARTS" icon="add-circle" (click)="addsong(\'charts\')">\n      </shifubutton>\n\n      <shifubutton [small]="true" id="btnAddSong" label="HOME.ADDSONG" icon="add-circle" (click)="addsong()">\n      </shifubutton>\n    </div>\n\n  </shifutitle>\n</ion-header>\n\n<ion-content>\n  <tuto\n    position="title"\n    [if]="userData.user.id==eventData.event.owner_id && songs.length==0 && eventData.event.musicServer==4"\n    label="">\n    Vous utiliser le mode manuel de Shifumix. C\'est vous qui mettez la musique en consultant éventuellement la playlist souhaitée.Vous pouvez passer en automatique en changeant de catalogue:<br>\n    <shifubutton item-end [small]="true" *ngIf="songs.length==0" icon="build" label="Change" (click)="openMusicServer()"></shifubutton>\n  </tuto>\n\n\n  <tuto [if]="userData.user.connexions.length>5 && songs.length>2"  label="HOME.TUTOADVANCED"></tuto>\n  <tuto [if]="eventData.event.currentSong==\'\' && eventData.event.opened && userData.user.id==eventData.event.owner_id && songs.length>0"  label="HOME.RUNPLAYER_TUTO"></tuto>\n  <tuto [if]="eventData.event.musicServer==4 && eventData.event.opened && userData.user.id==eventData.event.owner_id && songs.length>0"\n        label="Informer vos invités que vous allez jouer un titre de la playlist"\n        show="cmdPlayInPlaylist"></tuto>\n\n  <ion-item-sliding *ngIf="eventData.event.currentSong!=undefined">\n    <ion-item>\n      <ion-thumbnail item-start>\n        <img src="./assets/img/vinyl.gif">\n      </ion-thumbnail>\n      {{eventData.event.currentSong.title}}<br>\n      <span style="font-size: x-small">{{eventData.event.currentSong.author}}</span>\n      <ion-note item-end *ngIf="eventData.event.musicServer!=4 || userData.user.id!=eventData.event.owner_id">\n        <shifutimer [onlyPositif]="true" [end]="eventData.event.currentSong.dtEnd"></shifutimer>\n      </ion-note>\n\n      <shifubutton [small]="true" item-end *ngIf="eventData.event.currentSong!=null && eventData.event.musicServer==4 && userData.user.id==eventData.event.owner_id"\n                   icon="pause" [hidewhenclick]="true" (click)="stopcurrentsong()"></shifubutton>\n    </ion-item>\n\n    <ion-item-options>\n      <shifubutton *ngIf="userData.user.id==eventData.event.owner_id" icon="play" (click)="nextSong()"></shifubutton>\n      <shifubutton icon="info" (click)="openCurrentSong()"></shifubutton>\n    </ion-item-options>\n\n\n  </ion-item-sliding>\n\n  <ion-item text-center *ngIf="!eventData.event.opened">\n            <span style="font-size: x-large">\n                <span style="font-size:medium">{{eventData.event.title}}</span><br>\n                <span style="font-size:small">{{\'LIB.STARTIN\' | translate}}&nbsp;<shifutimer [end]="eventData.event.dtStart"></shifutimer></span>\n            </span>\n  </ion-item>\n\n  <div class="text-center">\n    <span *ngIf="userData.user.score<eventData.event.minScore">Score:{{userData.user.score}}&nbsp;:&nbsp;{{\'ERROR.NOTENOUGHTSCORE\' | translate}}</span>\n    <span *ngIf="userData.user.score>eventData.event.minScore && userData.user.score-5<eventData.event.minScore">Score={{userData.user.score}}&nbsp;:&nbsp;{{\'INFO.SCORELOWTOADDSONG\' | translate}}</span>\n  </div>\n\n  <ion-list id="playlist_list" no-lines *ngIf="songs.length>0" style="padding: 0px;margin: 0px;">\n\n    <tuto [if]="songs.length>0 && userData.user.id!=eventData.event.owner_id" label="HOME.TUTOWITHMUSIC"></tuto>\n    <tuto [if]="songs.length>0 && userData.user.id==eventData.event.owner_id && musicServer==4"\n          show="btnPlaySingle"\n          label="HOME.TUTOWITHMUSICANDPERSO">\n    </tuto>\n\n    <ion-item-sliding name="playlist_song" [id]="song.id" *ngFor="let song of songs" (dblclick)="djplay(song)">\n      <ion-item>\n        <ion-icon item-start >\n          <img style="box-shadow: 4px 4px 7px #bfbfbf;border: 1px #bfbfbf solid;width:60px;height:60px;" src="{{song.picture}}">\n        </ion-icon>\n\n        <p>{{song.shortTitle}} <span style="font-size: x-small" [hidden]="song.from.anonymous || song.vote==false"> by {{song.from.firstname}}</span></p>\n        <p><span style="font-size: x-small">{{song.author}}</span></p>\n\n        <div item-end *ngIf="song.canVote">\n          <shifubutton [small]="true" name="btnLike" icon="thumbs-up" (click)="onSetScore(1,song)"></shifubutton>\n          <shifubutton [small]="true" name="btnDislike"  icon="thumbs-down" (click)="onSetScore(-1,song)"></shifubutton>\n        </div>\n\n        <ion-note item-end [hidden]="song.canVote || (eventData.event.musicServer==4 && userData.user.id==eventData.event.owner_id)">\n          <shifunote [object]="song"></shifunote>\n        </ion-note>\n\n        <shifubutton item-end *ngIf="eventData.event.musicServer==4 && userData.user.id==eventData.event.owner_id"\n                     [small]="true" [hidewhenclick]="true" name="btnPlaySingle"\n                     icon="play" (click)="djplay(song)"></shifubutton>\n\n      </ion-item>\n      <ion-item-options>\n\n        <!--<div style="width:20px;" text-center *ngIf="song.duration>0" color="information" style="padding-left:5px;">-->\n          <!--<p text-center>{{song.duration}}</p>-->\n          <!--secondes-->\n        <!--</div>-->\n\n        <div style="width:10px;">\n\n        </div>\n\n        <button name="cmdInfoFrom" ion-button color="seconday" *ngIf="song.from.id!=userData.user.id" (click)="openPublicProfile(song)">\n          <ion-icon name="person"></ion-icon>\n        </button>\n\n        <button name="cmdPlay" ion-button color="seconday" *ngIf="eventData.event.musicServer==4 && eventData.event.Moderators.indexOf(userData.user.id)>-1" (click)="djplay(song)">\n          <ion-icon name="play"></ion-icon>\n        </button>\n\n\n        <button name="cmdDelSong" ion-button color="danger" *ngIf="song.from.id==userData.user.id || eventData.event.Moderators.indexOf(userData.user.id)>-1"  (click)="delSong(song)">\n          <ion-icon name="trash"></ion-icon>\n        </button>\n\n        <button name="cmdInfoSong" ion-button color="information" *ngIf="song.url!=\'\'" (click)="openInfo(song)">\n          <ion-icon name="information-circle"></ion-icon>\n        </button>\n\n        <button name="cmdSearchArtist" ion-button color="secondary" (click)="searchArtist(song)">\n          <ion-icon name="search"></ion-icon>\n        </button>\n      </ion-item-options>\n\n    </ion-item-sliding>\n  </ion-list>\n\n  <br>\n\n  <div style="text-align: center;width: 100%;" *ngIf="!eventData.event.addSongOnlyByOwner || eventData.event.owner_id==userData.user.id">\n    <br>\n    <shifubutton id="btnAddSong2"\n                 style="max-width:350px;"\n                 icon="add-circle"\n                 size="150"\n                 label="HOME.ADDSONG"\n                 *ngIf="eventData.online && userData.user.score>=eventData.event.minScore && songs.length<eventData.event.playlistLimits"\n                 (click)="addsong()">\n    </shifubutton>\n\n    <shifubutton id="btnAddSongAuto"\n                 style="max-width:350px;"\n                 size="150"\n                 icon="add-circle"\n                 label="HOME.ADDSONGAUTO"\n                 *ngIf="eventData.event.Moderators.indexOf(userData.user.id)>-1 && eventData.online && userData.user.score>=eventData.event.minScore && songs.length<5 && eventData.event.musicServer!=2"\n                 (click)="addsongauto()">\n    </shifubutton>\n\n\n  </div>\n  <br>\n\n\n  <!--Zone réserver au master de ceremony-->\n  <shifucard [visible]="(songs.length==0 && userData.user.connexions.length>10) || (songs.length>0 && eventData.event.currentSong==\'\')"\n             title="LIB.EVENTMASTER"  icon="desktop" (onclick)="events.publish(\'open:widget\',\'music\')"\n             *ngIf="userData.user.id==eventData.event.owner_id">\n    <tuto [if]="songs.length==0 && userData.user.connexions.length>5 && userData.user.id==eventData.event.owner_id" label="HOME.TUTOADMIN"></tuto>\n\n    <!--Player de la musique-->\n    <ion-item>\n      <ion-label item-start>\n        <span style="font-weight: 200">Catalogue:</span>&nbsp;{{musicServers[eventData.event.musicServer]}}\n        <span *ngIf="eventData.event.opened && eventData.event.musicServer==0" style="font-size:small">\n          <span *ngIf="eventData.event.musicPlayer!=\'?\'"><br>{{eventData.event.musicPlayer}}</span>\n          <span *ngIf="eventData.event.musicPlayer==\'?\'">\n            <br><img src="./assets/img/wait.gif" style="display:inline;width:15px;">&nbsp;{{\'HOME.WAITINGFORPLAYER\' | translate}}\n          </span>\n        </span>\n      </ion-label>\n      <shifubutton item-end [small]="true" *ngIf="songs.length==0" icon="build" label="Change" (click)="openMusicServer()"></shifubutton>\n      <shifubutton item-end [small]="true" *ngIf="songs.length>0 && eventData.event.musicServer!=0" icon="play" label="Play" (click)="runPlayer()"></shifubutton>\n    </ion-item>\n\n\n    <shifucheckbox *ngIf="userData.playlist.items!=undefined && userData.playlist.items.length>0" label="PROFIL.ONLYPLAYLIST"\n                   [(ngModel)]="eventData.event.limitSearchToOwnerPlaylist"\n                   (onchange)="updateEvent()"></shifucheckbox>\n\n\n    <div *ngIf="userData.user.connexions.length>5">\n      <shifucheckbox label="HOME.ADDSONGONLYBYOWNER" [(ngModel)]="eventData.event.addSongOnlyByOwner" (onchange)="updateEvent()"></shifucheckbox><br>\n      <ion-item no-border text-center>\n        <shifubutton [small]="true" icon="add-circle" label="LIB.MODERATOR" (click)="addModerator()"></shifubutton>\n      </ion-item>\n\n      <shifurange icon="list" (onchange)="updateEvent()" [(ngModel)]="eventData.event.playlistLimits" unite="songs" label="ADDEVENT.PLAYLISTLIMIT" min="20" max="100" step="5"></shifurange>\n      <shifurange icon="list" (onchange)="updateEvent()" [(ngModel)]="eventData.event.limitPlaylistSongsByUser" unite="songs" label="ADDEVENT.PLAYLISTLIMITBYUSER" min="3" max="30" step="1"></shifurange>\n      <shifurange *ngIf="!eventData.event.opened" icon="list" (onchange)="updateEvent()" [(ngModel)]="eventData.event.prePlaylistLimits" unite="songs" label=\'ADDEVENT.PREPLAYLISTLIMIT\' min="0" max="100" step="1"></shifurange>\n\n    </div>\n    <shifurange icon="list" (onchange)="updateEvent()"\n                [(ngModel)]="eventData.event.minSongsInPlaylist"\n                unite="songs" label=\'ADDEVENT.MINSONGSINPLAYLIST\'\n                min="0" max="10" step="1">\n    </shifurange>\n    <br>\n    <shifubutton [small]="true" icon="person-add" (click)="openInvite()"></shifubutton>\n  </shifucard>\n\n  <!--<img src="{{eventData.event.flyer | safe}}" style="width:80%;margin-left:10%">-->\n  <div style="width:80%;margin-left:10%;text-align: center;" *ngIf="songs.length<3 && userData.user.id!=eventData.event.owner_id">\n    <shifuflyer size="100%" [flyer]="eventData.event.flyer"></shifuflyer>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [ionic_angular_2.Events, ionic_angular_2.ModalController,
            ionic_angular_1.NavController, ionic_angular_1.NavParams, api_1.ApiProvider,
            event_data_1.EventDataProvider, user_data_1.UserData, ionic_angular_1.LoadingController,
            platform_browser_1.DomSanitizer, core_2.TranslateService, ng_push_1.PushNotificationsService,
            ionic_angular_2.AlertController, ionic_angular_1.ToastController])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var event_data_1 = __webpack_require__(15);
var user_data_1 = __webpack_require__(8);
var Tools = __webpack_require__(2);
__webpack_require__(540);
var Maintools_1 = __webpack_require__(2);
var api_1 = __webpack_require__(16);
var core_2 = __webpack_require__(7);
var settings_1 = __webpack_require__(23);
var musiccharts_1 = __webpack_require__(328);
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchPage = /** @class */ (function () {
    function SearchPage(viewCtrl, navCtrl, alertCtrl, api, settings, navParams, eventData, toastCtrl, translate, userData, loadingCtrl, modalCtrl) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.api = api;
        this.settings = settings;
        this.navParams = navParams;
        this.eventData = eventData;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.userData = userData;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.songs = [];
        this.playlists = [];
        this.env = 0;
        this.multiselect = false;
        this.selected = { value: "Search" };
        this.query = { value: "" };
        this.songs_search = [];
        this.showFilter = false;
        this.myfilter = "";
        this.playlist_titles = [];
        this.musicServerName = null;
        this.viewCharts = function () {
            Tools.openWindow('http://www.uk-charts.top-source.info/2000-to-2009.shtml');
        };
        var vm = this;
        this.musicServerName = ["Spotify", "Deezer", "Cloud", "YouTube", "Perso"];
        this.env = Tools.getEnv();
        this.songs = this.userData.lastSearchList;
        // if(this.settings.showMusicCharts==null)
        //   this.settings.showMusicCharts=(this.eventData.event.musicServer==3);
        if (vm.userData.playlist == undefined || vm.userData.playlist.items == undefined || vm.userData.playlist.items.length == 0 ||
            (this.eventData.event.limitSearchToOwnerPlaylist && vm.userData.playlistFrom != this.eventData.event.owner_id) ||
            (!this.eventData.event.limitSearchToOwnerPlaylist && vm.userData.playlistFrom == this.eventData.event.owner_id && vm.userData.user.id != this.eventData.event.owner_id)) {
            var id = this.userData.user.id;
            if (this.eventData.event.limitSearchToOwnerPlaylist)
                id = this.eventData.event.owner_id;
            var diag_1 = Maintools_1.loading(vm, "SEARCH.PLAYLISTANALYSIS");
            vm.api.getcloudplaylist(id, true).subscribe(function (rep) {
                vm.userData.playlist = rep;
                vm.userData.playlistFrom = id;
                diag_1.dismiss();
                vm.loadplaylist(rep);
            }, function (err) {
                Maintools_1.toast(vm.toastCtrl, "ERROR.GENERAL", vm.translate);
                diag_1.dismiss();
            });
        }
        else
            vm.loadplaylist(vm.userData.playlist);
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        var vm = this;
        if (vm.navParams.get("query") == null) {
            if (this.settings.lastquery != null && !this.settings.lastquery.startsWith("playlist")) {
                this.query.value = this.settings.lastquery;
                this.search(13);
            }
        }
        else {
            if (vm.navParams.get("query") == "charts")
                this.openMusicCharts();
            else {
                this.showFilter = false;
                this.query.value = vm.navParams.get("query");
                this.search(13);
            }
        }
    };
    SearchPage.prototype.valideFilter = function (code) {
        if (code == 13) {
            this.showFilter = false;
            this.query.value = this.myfilter;
            this.settings.lastcatalogue = "";
            this.settings.lastquery = this.myfilter;
            this.search(13);
        }
    };
    SearchPage.prototype.openPlaylistFrom = function (service) {
        var vm = this;
        Maintools_1.openGeneral(service, this.userData.user).then(function () {
            vm.api.getcloudplaylist(vm.userData.user.id, true).subscribe(function (rep) {
                if (rep != null) {
                    vm.userData.playlistFrom = vm.userData.user.id;
                    vm.userData.playlist = rep;
                    vm.loadplaylist(rep);
                }
            });
        });
    };
    SearchPage.prototype.loadplaylist = function (rep) {
        var _this = this;
        var vm = this;
        Tools.preparePlaylist(rep.items, function (songs, playlist_titles) {
            vm.playlists = playlist_titles;
            vm.playlist_titles = songs;
            if (vm.settings.lastquery != null && vm.settings.lastquery.startsWith("playlist")) {
                vm.selected = _this.settings.lastquery.replace("playlist:", "");
                vm.loadPlaylist_titles();
            }
        });
    };
    SearchPage.prototype.openSearch = function () {
        this.showFilter = !this.showFilter;
        if (!this.showFilter && this.myfilter.length > 0) {
            this.query.value = this.myfilter;
            this.search(13);
        }
    };
    SearchPage.prototype.loadPlaylist_titles = function () {
        var vm = this;
        this.songs = [];
        this.playlist_titles.forEach(function (title) {
            if (title.playlist == vm.selected)
                vm.addResult(title, vm.songs);
        });
        if (vm.songs.length > 0) {
            vm.showFilter = true;
            this.settings.lastquery = "playlist:" + vm.selected;
        }
    };
    /**
     * Ajoute un titre dans les résultat de la recherche
     * @param s
     * @param list
     * @returns {any}
     */
    SearchPage.prototype.addResult = function (s, list) {
        if (!s.hasOwnProperty("playlist"))
            s["playlist"] = "Search";
        s["selected"] = false;
        s["formatDuration"] = "";
        if (s.duration > 0)
            s["formatDuration"] = Maintools_1.getDelay(new Date().getTime() + s.duration * 1000);
        if (s.author == undefined)
            s.author = s.artist;
        s.tag = s.title + " " + s.artist;
        for (var i = 0; i < list.length; i++) {
            if (s.order <= list[i].order)
                break;
        }
        list.splice(i, 0, s);
        return list;
    };
    ;
    SearchPage.prototype.selectPlaylist = function () {
        var vm = this;
        vm.query.value = "";
    };
    SearchPage.prototype.goPerso = function () {
        var vm = this;
        this.navCtrl.push("perso", { filter: "deezer,spotify,drive", user: vm.userData.user.id, autoback: true, from: "search" });
    };
    ;
    SearchPage.prototype.add = function (song) {
        var s = Tools.createSong(song, this.userData.user, this.eventData.event);
        this.viewCtrl.dismiss({ songs: [s] });
    };
    ;
    SearchPage.prototype.valide = function () {
        var _this = this;
        var rc = [];
        this.songs.forEach(function (s) {
            if (s.selected) {
                rc.push(Tools.createSong(s, _this.userData.user, _this.eventData.event));
            }
        });
        this.viewCtrl.dismiss({ songs: rc });
    };
    /**
     * Fonction utilisé en récurence pour l'ajout de titre
     * @param k
     */
    SearchPage.prototype.addnewsong = function (k, mes) {
        var vm = this;
        var ls = vm.songs;
        //ls=$filter('filter')(vm.songs,{"playlist":vm.selected.value});
        this.eventData.addsong(Tools.createSong(ls[k], vm.userData.user, vm.eventData.event)).subscribe(function (resp) {
            if (resp.message != undefined && resp.message.length > 0) {
                mes = resp.message;
            }
            if (k < Math.min(ls.length, 50)) {
                vm.addnewsong(k + 1, mes);
            }
        });
    };
    ;
    // addAll(){
    //   var mes="";
    //   var vm=this;
    //   vm.addnewsong(0,mes);
    //   if(mes.length==0)
    //     Tools.toast(vm.toastCtrl,vm.songs.length+" "+"SEARCH.CONFIRMADD",this.translate);
    //   else
    //     Tools.toast(vm.toastCtrl,mes,this.translate);
    //
    //   vm.navCtrl.push("tabs.home",{action:"addall"});
    // }
    // addAuto(){
    //   var vm=this;
    //   this.eventData.addsongsauto(5).subscribe(resp => {
    //     vm.navCtrl.push("HomePage",{action:"addauto"});
    //   });
    // }
    /**
     * Déclenche la recherche des titres
     */
    SearchPage.prototype.search = function (keycode) {
        var _this = this;
        if (keycode != 13)
            return;
        var vm = this;
        if (vm.eventData.event.limitSearchToOwnerPlaylist) {
            return;
        }
        vm.selected = "Search";
        vm.myfilter = "";
        vm.songs = []; //Effacement de la recherche précédente
        var q = vm.query.value;
        if (q != null && q.length > 2) {
            if (vm.songs_search.length > 0)
                vm.songs_search = [];
            this.settings.lastquery = q;
            this.settings.lastcatalogue = "";
            if (vm.eventData.event.sources.indexOf("cloud") > -1)
                vm.eventData.searchcloud(q, vm.userData.user.id, vm.eventData.event.id).subscribe(function (resp) {
                    if (resp == null)
                        Maintools_1.toast(_this.toastCtrl, "ERROR.RETRY", _this.translate);
                    else {
                        resp.items.forEach(function (song) {
                            vm.songs = vm.addResult(song, vm.songs);
                        });
                    }
                });
            if (vm.eventData.event.sources.indexOf("local") > -1)
                vm.eventData.searchlocal(q, vm.userData.user.id, vm.eventData.event.id).subscribe(function (resp) {
                    if (resp == null)
                        Maintools_1.toast(_this.toastCtrl, "ERROR.RETRY", _this.translate);
                    else {
                        resp.items.forEach(function (song) {
                            vm.songs = vm.addResult(song, vm.songs);
                        });
                    }
                });
            if (vm.eventData.event.sources.indexOf("deezer") + vm.eventData.event.sources.indexOf("spotify") + vm.eventData.event.sources.indexOf("youtube") > -3) {
                vm.eventData.searchstream(q, vm.eventData.event.id).subscribe(function (resp) {
                    if (resp == null)
                        Maintools_1.toast(_this.toastCtrl, "ERROR.RETRY", _this.translate);
                    else {
                        resp.items.forEach(function (song) {
                            vm.songs = vm.addResult(song, vm.songs);
                        });
                    }
                });
            }
        }
    };
    ;
    SearchPage.prototype.cancel = function () { };
    ;
    SearchPage.prototype.showMultiSelect = function () {
        if (!this.multiselect)
            this.multiselect = true;
        else {
            this.songs.forEach(function (song) {
                song.selected = !song.selected;
            });
        }
    };
    SearchPage.prototype.openMusicCharts = function () {
        var _this = this;
        Maintools_1.openModal(this.modalCtrl, musiccharts_1.MusicchartsPage, { catalogues: this.navParams.get("catalogues") }, function (rep) {
            if (rep != null) {
                _this.songs = _this.addResult(rep, []);
                _this.viewCtrl.dismiss({ songs: _this.songs });
            }
        });
    };
    SearchPage = __decorate([
        core_1.Component({
            selector: 'page-search',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\search\search.html"*/'<!--\n  Generated template for the SearchPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <shifutitle title="LIB.SEARCH" menu="false" help="music_search">\n    <shifubutton [small]="true" *ngIf="eventData.event.limitSearchToOwnerPlaylist==false && eventData.event.musicServer!=2"  label="Charts"  id="btnCharts"  (click)="openMusicCharts()"></shifubutton>\n    <shifubutton [small]="true" id="btnCancel" icon="close"                       (click)="this.viewCtrl.dismiss()"></shifubutton>\n    <shifubutton [small]="true" id="btnSend" *ngIf="multiselect" icon="checkmark" (click)="valide()"></shifubutton>\n  </shifutitle>\n\n  <ion-toolbar no-border-top>\n    <ion-buttons end [hidden]="eventData.event.limitSearchToOwnerPlaylist">\n      <button ion-button (click)="openSearch()">\n        <span *ngIf="showFilter">Playlist</span>\n        <span style="font-size: small" *ngIf="!showFilter">Catalogue:<br>{{musicServerName[eventData.event.musicServer]}}</span>\n      </button>\n      <shifubutton [small]="true" *ngIf="eventData.event.Moderators.indexOf(userData.user.id)>-1" icon="checkbox" (click)="showMultiSelect()"></shifubutton>\n\n    </ion-buttons>\n\n    <ion-searchbar *ngIf="!showFilter" id="txtSearch"\n                    color="primary" placeholder="Search"\n                   [(ngModel)]="query.value"\n                   (keypress)="search($event.keyCode)"\n                   (ionCancel)="onCancel($event)"\n                   >\n    </ion-searchbar>\n    <ion-searchbar autofocus\n                   placeholder="Filter on playlist"\n                   *ngIf="showFilter"\n                   [(ngModel)]="myfilter"\n                   (keypress)="valideFilter($event.keyCode)">\n    </ion-searchbar>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <tuto [if]="eventData.event.limitSearchToOwnerPlaylist" label="SEARCH.TUTO_ONLYOWNERPLAYLIST"></tuto>\n  <tuto [if]="!eventData.event.limitSearchToOwnerPlaylist" label="Saisisser un artiste et/ou un titre" show="txtSearch"></tuto>\n\n  <ion-list>\n    <ion-item  name="song_result"  no-padding no-margin *ngFor="let song of songs |  filter: \'tag\':myfilter | orderBy: \'order\'" (click)="add(song)">\n      <ion-icon item-start>\n        <img style="box-shadow: 4px 4px 7px #bfbfbf;border: 1px #bfbfbf solid;width:60px;height:60px;" src="{{song.picture}}">\n      </ion-icon>\n      <span style="font-size: large">{{song.title}}</span>\n      <p>{{song.author}}</p>\n      <ion-note item-end>\n        {{song.formatDuration}}\n      </ion-note>\n      <ion-checkbox item-end *ngIf="multiselect" [(ngModel)]="song.selected"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n\n\n<ion-footer>\n  <ion-toolbar>\n      <ion-item *ngIf="playlists==undefined" item-start>Your playlists from : </ion-item>\n      <ion-buttons end *ngIf="playlists==undefined || playlists.length==0">\n        <shifubutton\n          id="btnSpotifyPlaylist"\n          *ngIf="userData.user.accessTokens==undefined || userData.user.accessTokens.spotify==undefined"\n          [small]="true" label="Spotify"\n          (click)="openPlaylistFrom(\'spotify\')">\n        </shifubutton>\n\n        <shifubutton\n          id="btnDeezerPlaylist"\n          *ngIf="userData.user.accessTokens==undefined || userData.user.accessTokens.deezer==undefined"\n          [small]="true" label="Deezer"\n          (click)="openPlaylistFrom(\'deezer\')">\n        </shifubutton>\n\n        <shifubutton *ngIf="env==0" [small]="true" label="Deezer_local" (click)="openPlaylistFrom(\'deezer_local\')"></shifubutton>\n      </ion-buttons>\n\n      <ion-item *ngIf="playlists!=undefined && playlists.length>0">\n        <ion-label>Vos playlists</ion-label>\n        <ion-select item-end interface="action-sheet" [(ngModel)]="selected" (ionChange)="loadPlaylist_titles()">\n          <ion-option *ngFor="let playlist of playlists" [value]="playlist">{{playlist}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n\n\n  </ion-toolbar>\n</ion-footer>\n\n<!--<div class="bar bar-footer bar-positive button-bar-inline">-->\n  <!--<shifubutton (click)="goPerso()" color="button-calm" label="SEARCH.GOPLAYLIST"></shifubutton>-->\n  <!--&nbsp;-->\n  <!--<shifubutton color="button-calm" hourglass="wait-addall" (click)="addAll()" *ngIf="event.owner_id==userData.user.id && songs.length>0" label="SEARCH.ADDALL"></shifubutton>-->\n  <!--&lt;!&ndash;-->\n  <!--<button class="button button-calm button-small" style="width:100px;" (click)="addAll()" *ngIf="event.owner_id==userData.user.id && songs.length>0">-->\n    <!--<img style="display:inline;max-width: 16px;" src="/img/hourglass.gif" *ngIf="hourglass">{{\'SEARCH.ADDALL\' | translate }}-->\n  <!--</button>-->\n  <!--&ndash;&gt;-->\n  <!--&nbsp;-->\n  <!--<shifubutton color="button-calm" (click)="addAll()" *ngIf="event.owner_id==userData.user.id && playlists.length==0 && userData.user.connexions.length>10" label="SEARCH.ADDAUTO"></shifubutton>-->\n  <!--<span *ngIf="songs.length>0" style="margin-top:5px;font-size: x-large">{{songs.length}}&nbsp;<i class="ion-disc"></i></span>-->\n<!--</div>-->\n\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\search\search.html"*/
        }),
        __metadata("design:paramtypes", [ionic_angular_1.ViewController, ionic_angular_2.NavController, ionic_angular_2.AlertController, api_1.ApiProvider, settings_1.SettingsProvider,
            ionic_angular_1.NavParams, event_data_1.EventDataProvider, ionic_angular_1.ToastController, core_2.TranslateService,
            user_data_1.UserData, ionic_angular_2.LoadingController, ionic_angular_1.ModalController])
    ], SearchPage);
    return SearchPage;
}());
exports.SearchPage = SearchPage;
//# sourceMappingURL=search.js.map

/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var settings_1 = __webpack_require__(23);
var api_1 = __webpack_require__(16);
var Maintools_1 = __webpack_require__(2);
var event_data_1 = __webpack_require__(15);
var user_data_1 = __webpack_require__(8);
/**
 * Generated class for the MusicchartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MusicchartsPage = /** @class */ (function () {
    function MusicchartsPage(navCtrl, navParams, api, eventData, userData, viewCtrl, alertCtrl, settings, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.eventData = eventData;
        this.userData = userData;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.settings = settings;
        this.loadingCtrl = loadingCtrl;
        this.songs = [];
        this.charts = [];
        this.catalogues = ["official-uk-songs", "Digital France"];
        this.catalogue_sel = "ChartsInFrance";
        this.year_sel = "";
        this.years = ["2001", "2002", "2011", "2017", "2018", "2019"];
        this.catalogues = this.navParams.get("catalogues");
        if (this.settings.lastcatalogue == "") {
            this.settings.lastcatalogue = this.catalogues[0];
            this.settings.lastyear = "" + (new Date().getFullYear() - 1);
        }
    }
    MusicchartsPage.prototype.ionViewDidLoad = function () {
        this.catalogue_sel = this.settings.lastcatalogue;
        this.year_sel = this.settings.lastyear;
        this.catalogue_change();
    };
    MusicchartsPage.prototype.catalogue_change = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        this.settings.lastcatalogue = this.catalogue_sel;
        this.settings.lastquery = "";
        if (this.settings.musicChartsItems == null || force) {
            var l = Maintools_1.loading(this);
            this.api.getcharts(this.catalogue_sel).subscribe(function (rep) {
                l.dismiss();
                if (rep != null) {
                    _this.settings.musicChartsItems = rep.items;
                    _this.charts = rep.items;
                    _this.years = [];
                    rep.items.forEach(function (s) {
                        var year = new Date(Number(s.dtStart)).getFullYear();
                        if (_this.years.indexOf("" + year) == -1)
                            _this.years.push("" + year);
                    });
                    _this.years.sort().reverse();
                    if (_this.year_sel == null || _this.years.indexOf(_this.year_sel) == -1)
                        _this.year_sel = _this.years[_this.years.length - 1];
                    _this.year_change();
                }
            });
        }
        else {
            this.charts = this.settings.musicChartsItems;
        }
    };
    MusicchartsPage.prototype.load_songs = function () {
    };
    /**
     * Récupération des tires
     */
    MusicchartsPage.prototype.year_change = function () {
        var _this = this;
        this.settings.lastyear = this.year_sel;
        this.songs = [];
        this.charts.forEach(function (song) {
            if (new Date(Number(song.dtStart)).getFullYear() == Number(_this.year_sel)) {
                var s = Maintools_1.createSong({
                    title: song.title,
                    text: song.id,
                    origin: -1,
                    author: song.artist,
                    duration: 0,
                    picture: song.picture,
                    computer: ""
                }, _this.userData.user, _this.eventData.event);
                s.position = song.position;
                var rc = false;
                for (var i = 0; i < _this.songs.length && !rc; i++) {
                    if (_this.songs[i].position > s.position) {
                        _this.songs.splice(i, 0, s);
                        rc = true;
                    }
                }
                if (!rc)
                    _this.songs.push(s);
            }
        });
    };
    MusicchartsPage.prototype.add = function (song) {
        var s = Maintools_1.createSong(song, this.userData.user, this.eventData.event);
        this.viewCtrl.dismiss(s);
    };
    ;
    MusicchartsPage.prototype.year_inc = function (step) {
        var y = this.year_sel;
        do {
            this.year_sel = "" + (Number(this.year_sel) + step);
        } while (this.years.indexOf(this.year_sel) == -1 && Number(this.year_sel) > 1950 && Number(this.year_sel) < 2030);
        if (this.years.indexOf(this.year_sel) == -1)
            this.year_sel = y;
        else
            this.year_change();
    };
    MusicchartsPage = __decorate([
        core_1.Component({
            selector: 'page-musiccharts',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\musiccharts\musiccharts.html"*/'<!--\n  Generated template for the MusicchartsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle title="LIB.MUSICCHARTS" menu="false" help="music_charts">\n    <shifubutton [small]="true" id="btnCancel" icon="close"  (click)="this.viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n\n</ion-header>\n\n\n<ion-content padding>\n\n\n  <div style="width:100%;height: 50px">\n\n    <ion-grid no-padding no-margin>\n      <ion-row align-items-center>\n        <ion-col col-6 text-left>\n          <ion-select no-padding style="font-size:medium;max-width:90%;width:90%;" interface="action-sheet" [(ngModel)]="catalogue_sel" (ionChange)="catalogue_change(true)">\n            <ion-option *ngFor="let c of catalogues" [value]="catalogue">{{c}}</ion-option>\n          </ion-select>\n        </ion-col>\n        <ion-col>\n          <ion-select no-padding style="text-align:right;font-size:medium;max-width:90%;width:90%;" interface="action-sheet" [(ngModel)]="year_sel" (ionChange)="year_change()">\n            <ion-option *ngFor="let y of years" [value]="y">{{y}}</ion-option>\n          </ion-select>\n        </ion-col>\n        <ion-col style="font-size: 50px;"  text-right col-3>\n          <ion-icon id="left_year" name="arrow-dropleft" (click)="year_inc(-1)"></ion-icon>&nbsp;\n          <ion-icon id="right_year" name="arrow-dropright" (click)="year_inc(+1)" ></ion-icon>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n\n\n\n    </div>\n\n  <ion-item  name="song_result"  *ngFor="let song of songs" (click)="add(song)">\n    <ion-note item-start style="font-size: xx-large;padding-right: 5px;">\n      #{{song.position}}\n    </ion-note>\n\n    <ion-icon item-end>\n      <img style="box-shadow: 4px 4px 7px #bfbfbf;border: 1px #bfbfbf solid;width:60px;height:60px;" src="{{song.picture}}">\n    </ion-icon>\n\n    <span style="font-size: large">{{song.title}}</span>\n    <p>{{song.author}}</p>\n\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\musiccharts\musiccharts.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.NavParams, api_1.ApiProvider,
            event_data_1.EventDataProvider, user_data_1.UserData, ionic_angular_1.ViewController,
            ionic_angular_1.AlertController, settings_1.SettingsProvider, ionic_angular_1.LoadingController])
    ], MusicchartsPage);
    return MusicchartsPage;
}());
exports.MusicchartsPage = MusicchartsPage;
//# sourceMappingURL=musiccharts.js.map

/***/ }),

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var camera_1 = __webpack_require__(229);
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var Tools = __webpack_require__(2);
var event_data_1 = __webpack_require__(15);
var user_data_1 = __webpack_require__(8);
var Maintools_1 = __webpack_require__(2);
var Maintools_2 = __webpack_require__(2);
var image_creator_1 = __webpack_require__(38);
var public_profil_1 = __webpack_require__(54);
var core_2 = __webpack_require__(7);
var ng_push_1 = __webpack_require__(84);
var api_1 = __webpack_require__(16);
var PhotosPage = /** @class */ (function () {
    function PhotosPage(events, navCtrl, navParams, loadingCtrl, api, alertCtrl, modalCtrl, toastCtrl, eventData, userData, translate, notifs, camera) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.api = api;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.eventData = eventData;
        this.userData = userData;
        this.translate = translate;
        this.notifs = notifs;
        this.camera = camera;
        this.options = { quality: 100, destinationType: this.camera.DestinationType.DATA_URL, encodingType: this.camera.EncodingType.JPEG, mediaType: this.camera.MediaType.PICTURE };
        this.lastphoto = { from: { id: "" }, photo: "", validate: true, text: "", canVote: false };
        this.lastRefresh = 0;
        this.photos = [];
        this.message = ""; //Message d'attente pendant l'envoi des photos
    }
    PhotosPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () { _this.refresh(true); }, Maintools_1.DELAY_TO_REFRESH);
    };
    PhotosPage.prototype.refreshEvent = function () {
        this.eventData.updateevent("addPhotoOnlyByOwner,needValidate").subscribe(function (r) { });
    };
    PhotosPage.prototype.addTag = function (idphoto) {
        var _this = this;
        Maintools_1.showPopup({ title: "PHOTO.ENTERMESSAGE", placeholder: "", confirmButton: "LIB.VALIDATE", cancelButton: "LIB.CANCEL", type: "text", translate: this.translate }, this.alertCtrl, function (res) {
            if (res != null) {
                _this.eventData.validatemessage(idphoto, res).subscribe(function (r) { _this.refresh(); });
            }
        });
    };
    PhotosPage.prototype.addModerator = function () {
        this.events.publish("moderator:add");
    };
    PhotosPage.prototype.validatephoto = function () {
        var _this = this;
        this.eventData.validatemessage(this.lastphoto.id).subscribe(function (r) { _this.refresh(); });
    };
    ;
    PhotosPage.prototype.sendphoto = function (photo, legend, func) {
        var _this = this;
        if (legend === void 0) { legend = ""; }
        if (func === void 0) { func = null; }
        var photo = Tools.createPhoto(this.userData.user, photo, legend, "photo");
        this.eventData.sendphoto(photo).subscribe(function (resp) {
            if (_this.eventData.event.needValidate && _this.userData.user.connexions.length < 10)
                Maintools_1.toast(_this.toastCtrl, "PHOTOS.INFOVALIDATION", _this.translate);
            _this.refresh(true);
            if (_this.photos.length > 0)
                _this.selLastPhoto(_this.photos[0]);
            if (func != null)
                func();
        }, function (err) {
            _this.refresh();
            if (func != null)
                func();
        });
    };
    ;
    PhotosPage.prototype.addFile = function () {
        var vm = this;
        Maintools_1.openModal(this.modalCtrl, image_creator_1.ImageCreatorPage, { ratio: 1, maxsize: 2500 }, function (resp) {
            if (resp != null) {
                vm.sendphoto(resp.value);
            }
        });
    };
    PhotosPage.prototype.refresh = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var vm = this;
        var showAllPhoto = (vm.userData.user.id == vm.eventData.event.owner.id || !vm.eventData.event.needValidate);
        if (!force && this.userData.selectTab != undefined && this.userData.selectTab != "PhotosPage")
            return;
        this.eventData.getlastphoto(this.userData.user.id, false, 0, 5).subscribe(function (r) {
            if (r != null && r.items.length > 0) {
                vm.photos = [];
                var message = {};
                r.items.forEach(function (photo) {
                    if (photo.dtCreate > _this.lastRefresh && photo.from.id != _this.userData.user.id) {
                        message = {
                            title: "Shifumix - photo",
                            body: "New photo from " + photo.from.firstname,
                            image: photo.photo,
                            vibrator: [200, 100, 200]
                        };
                        _this.lastRefresh = photo.dtCreate;
                    }
                    if (photo.validate || _this.eventData.event.Moderators.indexOf(_this.userData.user.id) > -1 || photo.from.id == _this.userData.user.id)
                        vm.photos.push(photo); //Si la photo est validé ou si l'on est moderateur ou si on est le propriétaire
                });
                if (!force && message.hasOwnProperty("title"))
                    Tools.notif(_this.notifs, message, _this.translate);
                //Recherche si la dernière photo sélectionner est bien dans la liste
                var rc = false;
                for (var pos = 0; pos < Math.min(5, vm.photos.length); pos++) {
                    if (vm.photos[pos].Id == vm.lastphoto.Id) {
                        rc = true;
                        break;
                    }
                }
                if (!rc || _this.userData.user.id == _this.eventData.event.owner_id)
                    pos = 0;
                vm.selLastPhoto(vm.photos[pos]); //Permet la mise a jour de la photo en cours de visu
            }
        });
    };
    PhotosPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.subscribe("photo", function () { _this.refresh(); });
    };
    PhotosPage.prototype.showUser = function (u) {
        Maintools_1.openModal(this.modalCtrl, public_profil_1.PublicProfilPage, { userid: u.id, from: "tab.photos" });
    };
    ;
    PhotosPage.prototype.onSetScore = function (id, step) {
        var _this = this;
        var vote = { event: this.eventData.event.id, from: this.userData.user.id, value: step, description: "" };
        this.lastphoto.canVote = false;
        this.userData.sendvote(id, vote).subscribe(function (rep) {
            if (rep != null) {
                if (_this.userData.user.message.length > 0)
                    Tools.toast(_this.toastCtrl, _this.userData.user.message, _this.translate);
                _this.refresh(true);
            }
        });
    };
    ;
    PhotosPage.prototype.getPhoto = function (event, withText, func) {
        var _this = this;
        if (withText === void 0) { withText = false; }
        if (func === void 0) { func = undefined; }
        if (event.value == undefined)
            return;
        this.message = "PHOTO.SENDING";
        setTimeout(function () {
            Maintools_2.autoRotate(event.value, 1, function (r) {
                _this.message = "PHOTO.SENDING";
                Maintools_2.cropToSquare(r, 0.75, function (resp) {
                    _this.message = "PHOTO.SENDING";
                    _this.sendphoto(resp, "", function () {
                        _this.message = "";
                    });
                });
            });
        }, 100);
    };
    PhotosPage.prototype.addmessage = function (id) {
        var _this = this;
        Maintools_1.showPopup({ title: "PHOTO.ENTERMESSAGE", default: this.lastphoto.text, placeholder: "", confirmButton: "LIB.VALIDATE", cancelButton: "LIB.CANCEL", type: "text", translate: this.translate }, this.alertCtrl, function (res) {
            if (res != null) {
                _this.eventData.addlegend(_this.lastphoto.id, res).subscribe(function (r) {
                    _this.lastphoto.text = res;
                    _this.refresh();
                });
            }
        });
    };
    PhotosPage.prototype.deleteMessage = function (id) {
        var _this = this;
        var vm = this;
        this.eventData.deletemessage(id, this.userData.getId()).subscribe(function (rep) {
            Maintools_1.toast(vm.toastCtrl, "PHOTO.DELETED", _this.translate);
            _this.refresh(true);
        });
    };
    PhotosPage.prototype.selLastPhoto = function (photo) {
        var vm = this;
        vm.lastphoto = photo;
        if (vm.lastphoto.hasOwnProperty("votes") && vm.lastphoto.from.id != vm.userData.user.id) {
            vm.lastphoto.canVote = true;
            vm.lastphoto.votes.forEach(function (vote) {
                if (vm.lastphoto.canVote && vote.from == vm.userData.user.id) {
                    vm.lastphoto.canVote = false;
                }
            });
        }
        else if (vm.lastphoto.from.id != vm.userData.user.id)
            vm.lastphoto.canVote = true;
    };
    PhotosPage.prototype.downloadPhotos = function (col) {
        col.items.forEach(function (photo) {
        });
    };
    ;
    PhotosPage.prototype.addtoblacklist = function (usertoblacklist, messageidtodelete) {
        this.deleteMessage(messageidtodelete);
        this.api.blacklist(this.userData.user.id, usertoblacklist, true).subscribe(function () { });
    };
    PhotosPage = __decorate([
        core_1.Component({
            selector: 'page-photos',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\photos\photos.html"*/'<!--\n  Generated template for the PhotosPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle title="Photos" help="#">\n    <!--<shifubutton [small]="true" id="btnSend" [hidden]="!eventData.online" icon="LIB.SEND" (click)="writemessage(13)"></shifubutton>-->\n  </shifutitle>\n</ion-header>\n\n<ion-content no-padding>\n  <tuto position="title" label="PHOTO.TUTO" show="btnTakeInstantPhoto"></tuto>\n  <tuto position="title" [if]="!eventData.event.opened" label="PHOTO.TUTO_NOSTARTED_EVENT"></tuto>\n  <tuto [if]="lastphoto!=undefined && lastphoto.validate==false && eventData.event.Moderators.indexOf(userData.user.id)>-1" label="PHOTO.TUTOADMIN"></tuto>\n\n  <ion-item text-center style="font-size: xx-large;" *ngIf="message!=null && message.length>0">\n    <img src="./assets/img/wait.gif" style="width:25px;">\n    {{message | translate}}\n  </ion-item>\n\n  <div\n    *ngIf="eventData.online && (eventData.event.opened || eventData.event.Moderators.indexOf(userData.user.id)>-1) && (eventData.event.Moderators.indexOf(userData.user.id)>-1 || !eventData.event.addPhotoOnlyByOwner)"\n    style="width:100%;text-align:center;margin-top:10px;">\n    <!--<shifucamera id="btnTakePhoto" icon="camera" (onTake)="getPhoto($event,true,false)"></shifucamera>-->\n    <shifubutton id="btnAddFile" label="Images" icon="images" (click)="addFile()"></shifubutton>\n    <shifucamera id="btnTakeInstantPhoto" button="Photo" icon="camera" (onTake)="getPhoto($event)"></shifucamera>\n  </div>\n\n  <!--Affichage de la derniere photo publiée-->\n  <tuto [if]="lastphoto.from.id==userData.user.id && lastphoto.photo!=null" label="TUTO.PHOTO_CANDELETE"></tuto>\n  <div *ngIf="lastphoto.photo!=null && lastphoto.text!=null && lastphoto.photo.length+lastphoto.text.length>0"\n       style="text-align: center;margin-top:10px;position:relative;">\n\n    <ion-item no-border no-lines>\n      <div *ngFor="let photo of photos"  style="margin:5px;position:relative;display:inline-block;width:50px;height:50px" (click)="selLastPhoto(photo)">\n        <img style="width:100%;height:100%;" shifuid="vignette" class="image-photo" [src]="photo.photo">\n        <div *ngIf="photo.validate==false" style="position:absolute;top:10px;left:0px;width:100%;text-align:center;font-size: xx-large">?</div>\n      </div>\n    </ion-item>\n\n    <div *ngIf="lastphoto.photo.length>0" style="position:relative;display:inline-block;width:90%;">\n      <div *ngIf="lastphoto.validate" style="position:absolute;left:10px;top:5px;display: block;z-index: 100;">\n          <shifubutton *ngIf="lastphoto.canVote" [small]="true" icon="thumbs-up" name="btnLike" (click)="onSetScore(lastphoto.id,1)"></shifubutton>\n          <shifubutton *ngIf="lastphoto.canVote" [small]="true" icon="thumbs-down" name="btnDislike" (click)="onSetScore(lastphoto.id,-1)"></shifubutton>\n\n          <shifubutton id="btnDelMessage" *ngIf="lastphoto.from.id==userData.user.id || eventData.event.Moderators.indexOf(userData.user.id)>-1"\n                     icon="trash" [small]="true"\n                     (click)="deleteMessage(lastphoto.id)"></shifubutton>\n\n          <shifubutton id="btnAddMessage" *ngIf="lastphoto.from.id==userData.user.id" icon="chatboxes" [small]="true"\n                     (click)="addmessage(lastphoto.id)"></shifubutton>\n\n          <shifubutton id="btnAddTag"\n                       *ngIf="userData.user.connexions.length>50 && (lastphoto.from.id==userData.user.id || eventData.event.Moderators.indexOf(userData.user.id)>-1)"\n                       icon="pricetag" [small]="true"\n                      (click)="addTag(lastphoto.id)">\n          </shifubutton>\n      </div>\n\n      <div\n        *ngIf="lastphoto.photo.length>0 && lastphoto.validate==false && eventData.event.Moderators.indexOf(userData.user.id)>-1"\n        style="display:block;position:absolute;top:8%;left:5%;width:20%">\n\n        <shifubutton [small]="true" size="80" margin="5" id="btnRemove" label="PROFIL.DELPHOTO" (click)="deleteMessage(lastphoto.id)"></shifubutton><br>\n        <shifubutton [small]="true" size="80" margin="5" id="btnValidate" label="PROFIL.VALIDATE" (click)="validatephoto()"></shifubutton><br>\n        <shifubutton [small]="true" size="80" margin="5" id="btnBlackList" label="PROFIL.BLACKLIST" (click)="addtoblacklist(lastphoto.from.id,lastphoto.id)"></shifubutton><br>\n      </div>\n\n      <div\n        *ngIf="lastphoto.photo.length>0 && lastphoto.validate==false && lastphoto.from.id==userData.user.id"\n        style="display:block;position:absolute;text-align:center;top:8%;left:10%;width:80%;font-size:large;">\n        <h1>{{\'PHOTO.WAITFORVALIDATION\' | translate}}</h1>\n      </div>\n\n      <div style="position:absolute;left:0px;text-align:center;width:100%;top:90%;display: block;z-index: 200;font-size: large;color:white;font-weight: 200;">\n        {{lastphoto.text}}\n      </div>\n      <div style="pointer-events:none;position:absolute;left:0px;text-align:right;width:100%;top:5px;display: block;z-index: 50;font-size: x-large;color:white;font-weight: 200;">\n        <span (click)="showUser(lastphoto.from)">&nbsp;by&nbsp;{{lastphoto.from.firstname}}</span><br>\n        <shifunote style="font-size:medium;" [object]="lastphoto"></shifunote>\n      </div>\n\n      <img class="image-photo" src="{{lastphoto.photo}}">\n      <br>\n    </div>\n  </div>\n\n  <shifucard [visible]="userData.user.connexions.length>5"\n             icon="desktop" (onclick)="events.publish(\'open:widget\',\'photo\')"\n             *ngIf="userData.user.id==eventData.event.owner_id"\n             title="LIB.EVENTMASTER">\n    <tuto [if]="eventData.event.needValidate" label="PHOTO.TUTO_VALIDATION"></tuto>\n    <shifucheckbox label="ADDEVENT.NEEDVALIDATE" id="chkValidate" [(ngModel)]="eventData.event.needValidate" (onchange)="refreshEvent()"></shifucheckbox>\n    <div *ngIf="userData.user.connexions.length>10">\n      <shifucheckbox label="PHOTO.ADDPHOTOONLYBYOWNER" [(ngModel)]="eventData.event.addPhotoOnlyByOwner" (onchange)="refreshEvent()"></shifucheckbox><br>\n      <ion-item no-line no-border text-center>\n        <shifubutton [small]="true" icon="add-circle" label="LIB.MODERATOR" (click)="addModerator()"></shifubutton>\n      </ion-item>\n    </div>\n  </shifucard>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\photos\photos.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.Events, ionic_angular_1.NavController, ionic_angular_1.NavParams, ionic_angular_1.LoadingController, api_1.ApiProvider,
            ionic_angular_1.AlertController, ionic_angular_1.ModalController, ionic_angular_1.ToastController,
            event_data_1.EventDataProvider, user_data_1.UserData, core_2.TranslateService, ng_push_1.PushNotificationsService,
            camera_1.Camera])
    ], PhotosPage);
    return PhotosPage;
}());
exports.PhotosPage = PhotosPage;
//# sourceMappingURL=photos.js.map

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var storage_1 = __webpack_require__(42);
var Maintools_1 = __webpack_require__(2);
var Maintools_2 = __webpack_require__(2);
var Maintools_3 = __webpack_require__(2);
var addbets_1 = __webpack_require__(189);
var invite_1 = __webpack_require__(46);
var addloterie_1 = __webpack_require__(331);
var event_data_1 = __webpack_require__(15);
var user_data_1 = __webpack_require__(8);
var platform_browser_1 = __webpack_require__(21);
var core_2 = __webpack_require__(7);
/**
 * Generated class for the BetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BetsPage = /** @class */ (function () {
    function BetsPage(events, modalCtrl, storage, navCtrl, navParams, toastCtrl, eventData, userData, translate, sanitizer, alertCtrl) {
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.eventData = eventData;
        this.userData = userData;
        this.translate = translate;
        this.sanitizer = sanitizer;
        this.alertCtrl = alertCtrl;
        this.bets = [];
        this.lot = { validation: false };
        this.bet = { from: {} };
        this.loteries = [];
        this.env = 0;
        this.now = new Date().getTime();
        this.end_loteries = [];
        this.loteries_forvalidation = [];
        this.bets_tovalidate = [];
        this.bets_toevaluate = [];
        this.env = Maintools_3.getEnv();
    }
    BetsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var vm = this;
        Maintools_2.subscribe("bets", this, 2000);
        this.storage.get("todo").then(function (r) {
            if (r == "survey") {
                _this.newbet(5);
                _this.storage.remove("todo");
            }
        });
    };
    BetsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () { _this.refresh(true); }, Maintools_1.DELAY_TO_REFRESH);
    };
    BetsPage.prototype.newbet = function (type) {
        var _this = this;
        this.fab.close();
        var vm = this;
        //On vérifie si quelqu'un a des crédits
        this.eventData.getnuserswithscoin(function (rc) {
            if (rc < 3 && type == 4)
                Maintools_2.toast(_this.toastCtrl, "BETS.GIVESOMESCOINBEFORECREATEBETS", _this.translate, null, "middle", 5);
            var delay = (vm.eventData.event.dtEnd - new Date().getTime()) / 60000;
            if (delay > 3) //On ne peut pas faire de pari quand il reste moins de 3 minutes
                Maintools_3.openModal(_this.modalCtrl, addbets_1.AddbetsPage, { type: type }, function () {
                    vm.refresh();
                });
            else
                Maintools_2.toast(vm.toastCtrl, "BETS.NOTENOUGHTTIMETOBETS");
        });
    };
    ;
    BetsPage.prototype.newloterie = function () {
        var _this = this;
        var vm = this;
        this.eventData.getnuserswithscoin(function (rc) {
            if (rc == 0)
                Maintools_2.toast(_this.toastCtrl, "BETS.GIVESOMESCOINBEFORECREATEBETS", _this.translate);
            var delay = (vm.eventData.event.dtEnd - new Date().getTime()) / 60000;
            if (delay > 3) //On ne peut pas faire de pari quand il reste moins de 3 minutes
                Maintools_3.openModal(_this.modalCtrl, addloterie_1.AddloteriePage, {}, function () {
                    vm.refresh();
                });
            else
                Maintools_2.toast(vm.toastCtrl, "BETS.NOTENOUGHTTIMETOBETS");
        });
    };
    ;
    BetsPage.prototype.updateEvent = function () {
        this.eventData.updateevent("addBetOnlyByOwner,limitOptions,needValidate").subscribe(function (r) { });
    };
    BetsPage.prototype.remove = function (bet) {
        var vm = this;
        var index = vm.bets.indexOf(bet);
        vm.userData.removebet(bet.id).subscribe(function (resp) {
            if (vm.userData.user.message.length == 0)
                vm.bets.splice(index, 1);
        });
    };
    ;
    BetsPage.prototype.close = function (bet) {
        var _this = this;
        this.userData.closebet(bet.id).subscribe(function (resp) {
            _this.refresh(true);
        });
    };
    ;
    BetsPage.prototype.shareBet = function (bet) {
        if (bet === void 0) { bet = null; }
        if (bet == null)
            Maintools_3.openModal(this.modalCtrl, invite_1.InvitePage, { from: this.userData.user, event: this.eventData.event });
        else
            Maintools_3.openModal(this.modalCtrl, invite_1.InvitePage, { from: this.userData.user, event: this.eventData.event, tab: "BetsPage", type: bet.type, message: bet.id });
    };
    ;
    BetsPage.prototype.getTotals = function (bet, id) {
        bet.votants = [];
        for (var i = 0; i < bet.options.length; i++)
            bet.options[i].totaluser = 0;
        if (bet.hasOwnProperty("votes")) {
            bet.votes.forEach(function (v) {
                bet.votants.push(v.from);
                if (v.from === id) {
                    var index = Number(v.description);
                    bet.options[index].totaluser += v.value;
                }
            });
        }
    };
    BetsPage.prototype.buy = function (l) {
        var vm = this;
        if (l.maxCredits == 1) //Dans ce cas la on parle plutôt d'une inscription
            vm.userData.buyticket(l.id, 1).subscribe(function (resp) {
                l.hasTicket = (resp.message == "");
                if (resp.message == "")
                    resp.message = "LIB.SUBSCRIBE";
                Maintools_2.toast(vm.toastCtrl, resp.message, vm.translate);
                vm.userData.user = resp;
            });
        else {
            Maintools_2.showPopup({
                title: vm.translate.instant("BETS.LOTERIE") + Math.round(vm.userData.user.credit),
                value: Math.min(10, Math.round(vm.userData.user.credit)),
                confirmButton: vm.translate.instant("LIB.BUY"),
                cancelButton: vm.translate.instant("LIB.CANCEL"),
                type: "number"
            }, vm.alertCtrl, function (res) {
                if (res > 0) {
                    vm.userData.buyticket(l.id, res).subscribe(function (resp) {
                        vm.userData.user = resp;
                        if (resp.message.length > 0)
                            Maintools_2.toast(vm.toastCtrl, resp.message);
                    });
                }
            });
        }
    };
    ;
    BetsPage.prototype.changeRespons = function (b, evt) {
        if (evt.keyCode == 13)
            this.sendRespons(b);
    };
    BetsPage.prototype.sendRespons = function (b) {
        var _this = this;
        if (b.freetext != undefined && b.freetext.length > 0)
            this.eventData.sendRespons(b.id, this.userData.user.id, b.freetext).subscribe(function () {
                _this.refresh(true);
            });
    };
    BetsPage.prototype.mise = function (b, opt) {
        var index = b.options.indexOf(opt);
        var vm = this;
        var v = { from: vm.userData.user.id, value: 1, description: index };
        if (b.type == Maintools_1.TYPE_BET) {
            v.value = 0;
            Maintools_2.showPopup({
                title: vm.translate.instant("BETS.MESSAGEMISE") + Math.round(vm.userData.user.jetons[vm.eventData.event.owner_id]),
                value: Math.min(10, Math.round(vm.userData.user.credit)),
                confirmButton: "LIB.BET",
                cancelButton: "LIB.CANCEL",
                type: "number", translate: vm.translate
            }, vm.alertCtrl, function (res) {
                v.value = res;
                if (v.value > 0) {
                    vm.userData.user.jetons[vm.eventData.event.owner_id] -= v.value;
                    b.options[index].totaluser += v.value;
                    vm.userData.sendvote(b.id, v).subscribe(function (resp) {
                        if (resp != null)
                            vm.userData.user = resp;
                    });
                }
            });
        }
        if (b.type == Maintools_1.TYPE_SONDAGE && b.canVote == true) {
            b.nRestVote--;
            b.options[index].total += v.value;
            b.canVote = (b.nRestVote > 0);
            vm.userData.sendvote(b.id, v).subscribe(function (resp) {
                if (resp != null)
                    vm.userData.user = resp;
            });
        }
    };
    ;
    BetsPage.prototype.validate = function (b) {
        var vm = this;
        var index = 0;
        for (index = 0; index < b.options.length; index++) {
            if (b.options[index].lib == b.result)
                break;
        }
        var i = 0;
        if (b.result == -1) {
            Maintools_3.showConfirm(vm.translate.instant("BETS.CANCELCONFIRMATION"), vm.alertCtrl, this.translate, function () {
                //vm.bets_tovalidate.splice(index,1);
                vm.eventData.validebet(b.id, -1).subscribe(function () {
                    vm.refresh(true);
                });
            }, function () {
                //tuto(vm.user,"BETS.TUTO_VALIDATE");
            });
        }
        else {
            //vm.bets_tovalidate.splice(index,1);
            vm.eventData.validebet(b.id, index).subscribe(function () {
                vm.refresh(true);
            });
        }
    };
    ;
    /**
     *
     * @param bets
     */
    BetsPage.prototype.programTimeout = function (bets) {
        var vm = this;
        var nextTimeout = null;
        bets.forEach(function (bet) {
            if (bet.dtStart > new Date().getTime()) {
                if (nextTimeout == null)
                    nextTimeout = bet.dtStart;
                else
                    nextTimeout = Math.min(bet.dtStart, nextTimeout);
            }
        });
        if (nextTimeout != null) {
            var delay = (nextTimeout - new Date().getTime());
            if (delay > 0) {
                Maintools_3.$$("refresh dans " + delay / 1000 + " secondes");
                setTimeout(function () {
                    vm.refresh(true, function () {
                        vm.programTimeout(bets);
                    });
                }, delay + 1000);
            }
        }
    };
    ;
    BetsPage.prototype.validateLoterie = function (lot) {
        var vm = this;
        vm.userData.validate(lot.id).subscribe(function (resp) {
            if (resp.message == "") {
                lot.validate = true;
                vm.refresh();
            }
        });
    };
    ;
    BetsPage.prototype.refresh = function (force, func) {
        var _this = this;
        if (force === void 0) { force = true; }
        if (func === void 0) { func = null; }
        var vm = this;
        this.now = new Date().getTime();
        if (!force && this.userData.selectTab != undefined && this.userData.selectTab != "BetsPage")
            return;
        /**
         * Chargement des loteries
         */
        vm.eventData.getloteries(vm.userData.user.id).subscribe(function (resp) {
            if (resp != null) {
                vm.loteries = [];
                vm.loteries_forvalidation = [];
                vm.end_loteries = [];
                resp.items.forEach(function (lot) {
                    //Ajoute la liste des participants
                    lot.buyers = [];
                    if (lot.tickets != undefined) {
                        for (var id in lot.tickets) {
                            if (lot.buyers.indexOf(id) == -1)
                                lot.buyers.push(id);
                        }
                    }
                    if (!lot.available) { //Indique que la loterie est en cours de validation
                        if (vm.userData.user.id == lot.from.id || vm.eventData.event.Moderators.indexOf(vm.userData.user.id) > -1)
                            vm.loteries_forvalidation.push(lot);
                    }
                    else {
                        if (lot.dtStart <= vm.now || lot.from.id == vm.userData.user.id) {
                            if (lot.dtEnd > vm.now) {
                                if (lot.maxCredits == 1) {
                                    if (lot.hasOwnProperty("tickets")) {
                                        if (lot.tickets.hasOwnProperty(vm.userData.user.id))
                                            lot.hasTicket = true;
                                        else
                                            lot.hasTicket = false;
                                    }
                                }
                                else
                                    lot.hasTicket = false;
                                vm.loteries.push(lot);
                            }
                            else {
                                //TODO: a corriger pour les questions de fuseau
                                var delay = (new Date().getTime() - lot.dtEnd) / 1000;
                                if (lot.status == 2 && lot.validate == false && (delay < 120 && lot.buyers.indexOf(vm.userData.user.id) > -1)) {
                                    vm.end_loteries.push(lot);
                                }
                            }
                        }
                    }
                });
            }
        });
        vm.eventData.getbets(vm.userData.getId(), false, false, "").subscribe(function (resp) {
            vm.bets = [];
            vm.bets_tovalidate = [];
            vm.bets_toevaluate = [];
            var nVote = 0;
            if (resp != undefined) {
                //vm.programTimeout(resp.items);
                for (var i = 0; i < resp.items.length; i++) {
                    var b = resp.items[i];
                    b.opened = (Number(b.status) > -1);
                    b.closed = (Number(b.status) >= 1);
                    /**
                     * Chargement des sondages
                     */
                    if (b.type == Maintools_1.TYPE_SONDAGE || b.type == Maintools_1.TYPE_QUESTION) {
                        if (b.options != undefined && b.options.length > 0)
                            b.optionByImage = (b.options[0].lib.indexOf("http") == 0);
                        if (!b.closed) {
                            b.canVote = true;
                            b.priority = 0;
                            nVote = 0;
                            if (b.hasOwnProperty("votes")) {
                                b.votes.forEach(function (v) {
                                    if (v.from === vm.userData.user.id)
                                        nVote++;
                                });
                                if (nVote >= b.nVotes) {
                                    b.canVote = false;
                                    b.priority = 1; //définie les priorités d'affichage
                                }
                            }
                            b.nRestVote = b.nVotes - nVote;
                            //Le moderateur peut voire le sondage / pari si la validation est nécessaire
                            if (b.opened ||
                                b.from.id == vm.userData.user.id ||
                                (vm.eventData.event.needValidate && vm.eventData.event.Moderators.indexOf(vm.userData.user.id) > -1)) {
                                vm.bets.push(b);
                            }
                        }
                    }
                    /**
                     * Chargement des paris
                     */
                    if (b.type == Maintools_1.TYPE_BET) {
                        var tot = [];
                        vm.getTotals(b, vm.userData.user.id);
                        b.options.forEach(function (opt) {
                            tot.push(opt.totaluser * opt.quot);
                        });
                        b.canVote = true;
                        b.gainMax = Math.max.apply(null, tot);
                        b.gainMin = Math.min.apply(null, tot);
                        if (b.dtEnd > vm.now && (b.dtStart < vm.now || b.from.id == vm.userData.user.id)) {
                            vm.bets.push(b);
                        }
                        if (b.status == 1 && (b.votants.indexOf(vm.userData.user.id) > -1 || b.from.id == vm.userData.user.id)) {
                            Maintools_3.$$("Pari à valider ", b);
                            b.result = -1;
                            vm.bets_tovalidate.push(b);
                        }
                        if (b.status == 2) {
                            Maintools_3.$$("Parieur à évaluer", b);
                            var index = Number(b.text);
                            if (index == -1)
                                b.lib_response = vm.translate.instant("BETS.NORESPONSE");
                            else
                                b.lib_response = vm.translate.instant("BETS.RESPONSE") + " : " + b.options[index].lib;
                            if ((!b.hasOwnProperty("reputations") || b.reputations.indexOf(vm.userData.user.id) == -1) && b.votants.indexOf(vm.userData.user.id) > -1)
                                vm.bets_toevaluate.push(b);
                        }
                    }
                    b.visibleCard = (_this.bets.length == 1 || (b.type == 5 && b.nRestVote > 0) || (b.type == 4) || (b.type == 9));
                }
                if (func != undefined)
                    func();
            }
        });
    };
    ;
    BetsPage.prototype.makeLoterieAvailable = function (lot, value) {
        var _this = this;
        this.eventData.makeLoterieAvailable(lot.id, value).subscribe(function (r) {
            _this.refresh(true);
        });
    };
    BetsPage.prototype.start = function (bet) {
        var _this = this;
        this.eventData.startbet(bet).subscribe(function () {
            setTimeout(function () { _this.refresh(true); }, 2000);
        });
    };
    BetsPage.prototype.closeLoterie = function (lot) {
        this.userData.closebet(lot.id).subscribe(function () { });
    };
    __decorate([
        core_1.ViewChild("fab"),
        __metadata("design:type", ionic_angular_1.FabContainer)
    ], BetsPage.prototype, "fab", void 0);
    BetsPage = __decorate([
        core_1.Component({
            selector: 'page-bets',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\bets\bets.html"*/'<!--\n  Generated template for the BetsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <shifutitle title="Games"  help="#">\n    <span *ngIf="userData.user.id!=eventData.event.owner_id">\n      <span style="font-size: large;">{{userData.user.jetons[eventData.event.owner_id]}}</span>\n      <img src="./assets/img/money.png" class="small-money">\n    </span>\n  </shifutitle>\n\n</ion-header>\n\n<ion-content no-padding>\n  <tuto position="title"\n        [if]="eventData.event.opened && eventData.event.activities.indexOf(\'survey\')>-1"\n        label="BETS.TUTO_CREATEYOURSURVEY" show="btnNewSurvey"\n        *ngIf="bets!=null && bets.length==0"></tuto>\n  <tuto position="title"\n        [if]="eventData.event.opened && eventData.event.activities.indexOf(\'bets\')>-1"\n        label="BETS.TUTO_CREATEYOURBETS" show="btnNewSurvey"\n        *ngIf="bets!=null && bets.length==0"></tuto>\n  <tuto label="BETS.TUTO" *ngIf="bets!=null && bets.length>0"></tuto>\n  <tuto label="BETS.SHARETITLE" *ngIf="bets!=null && bets.length>0 && eventData.event.presents.length==1">\n    <shifubutton label="LIB.INVITE" icon="add-people" (click)="shareBet()"></shifubutton>\n  </tuto>\n\n  <ion-fab #fab bottom right *ngIf="eventData.event.opened && eventData.event.activities!=undefined && (!eventData.event.addBetOnlyByOwner || eventData.event.Moderators.indexOf(userData.user.id)>-1)">\n    <button ion-fab color="primary"><ion-icon name="add-circle"></ion-icon></button>\n    <ion-fab-list *ngIf="eventData.event.activities!=undefined" side="top">\n      <button *ngIf="eventData.event.activities.indexOf(\'survey\')>-1 && (!eventData.event.addBetOnlyByOwner || eventData.event.owner_id==userData.user.id)"\n              ion-fab (click)="newbet(5)">\n        <ion-icon name="help"></ion-icon>\n        <div class="label">{{"LIB.SURVEY" | translate}}</div>\n      </button>\n\n      <button *ngIf="eventData.event.activities.indexOf(\'survey\')>-1 && (!eventData.event.addBetOnlyByOwner || eventData.event.owner_id==userData.user.id)"\n              ion-fab (click)="newbet(9)">\n        <ion-icon name="help"></ion-icon>\n        <div class="label">{{"LIB.QUESTION" | translate}}</div>\n      </button>\n\n      <button *ngIf="eventData.event.activities.indexOf(\'bets\')>-1 && (!eventData.event.addBetOnlyByOwner || eventData.event.owner_id==userData.user.id)"\n              ion-fab (click)="newbet(4)">\n        <ion-icon name="football"></ion-icon>\n        <div class="label">{{"LIB.BET" | translate}}</div>\n      </button>\n\n      <button *ngIf="eventData.event.activities.indexOf(\'loterie\')>-1 && (!eventData.event.addBetOnlyByOwner || eventData.event.owner_id==userData.user.id)"\n              ion-fab (click)="newloterie()" >\n        <ion-icon name="cube"></ion-icon>\n        <div class="label">{{"LIB.LOTERIE" | translate}}</div>\n      </button>\n\n    </ion-fab-list>\n  </ion-fab>\n\n\n  <ion-item no-lines text-center\n            *ngIf="eventData.event!=undefined && eventData.event.activities!=undefined && (!eventData.event.addBetOnlyByOwner || eventData.event.Moderators.indexOf(userData.user.id)>-1)">\n    <shifubutton size="90" id="btnNewSurvey"\n                 label="LIB.SURVEY" (click)="newbet(5)"\n                 tips="Créer un sondage sur la base d\'une liste de proposition ou d\'images"\n                 [small]="true"\n                 *ngIf="eventData.event.activities.indexOf(\'survey\')>-1">\n    </shifubutton>\n\n    <shifubutton size="90" id="btnNewQuestion"\n                 label="LIB.QUESTION" (click)="newbet(9)"\n                 tips="Poser une question ouvertes aux participants (plusieurs réponses possibles)"\n                 [small]="true"\n                 *ngIf="eventData.event.activities.indexOf(\'survey\')>-1">\n    </shifubutton>\n\n    <shifubutton size="90" id="btnNewBet"\n                 label="LIB.BET" (click)="newbet(4)"\n                 tips="Proposer un pari aux participants"\n                 [small]="true"\n                 *ngIf="eventData.event.activities.indexOf(\'bets\')>-1">\n    </shifubutton>\n\n    <shifubutton size="90" id="btnLoterie"\n                 label="LIB.LOTERIE" (click)="newloterie()"\n                 tips="Faire gagner un cadeau par tirage au sort"\n                 [small]="true"\n                 *ngIf="eventData.event.activities.indexOf(\'loterie\')>-1">\n    </shifubutton>\n\n  </ion-item>\n\n  <shifucard *ngIf="eventData.event.owner_id==userData.user.id"\n             [visible]="userData.user.connexions.length>5"\n             icon="desktop" (onclick)="events.publish(\'open:widget\',\'survey\')"\n             title="LIB.EVENTMASTER">\n    <!--<shifucheckbox *ngIf="eventData.event.visibleOnMap" label="LIB.PUBLISHONTWEETER" (onchange)="updateEvent()"></shifucheckbox>-->\n    <tuto label="PHOTO.TUTOSTRONGMODERATE" *ngIf="eventData.event.needValidate"></tuto>\n    <shifucheckbox label="ADDEVENT.NEEDVALIDATE" id="chkValidate" [(ngModel)]="eventData.event.needValidate" (onchange)="updateEvent()"></shifucheckbox>\n    <shifucheckbox\n      tips="N\'autoriser que les modérateurs à ajouter des paris dans votre événement"\n      label="BETS.ADDONLYBYOWNER"\n      [(ngModel)]="eventData.event.addBetOnlyByOwner"\n      (onchange)="updateEvent()"></shifucheckbox><br>\n    <shifurange label="BETS.LIMITOPTIONS" [(ngModel)]="eventData.event.limitOptions" min="2" max="10" unite="options"></shifurange>\n  </shifucard>\n\n\n  <!-- Loteries pour Validation de la remise -->\n  <shifucard no-padding no-margin [title]="lot.title" *ngFor="let lot of loteries_forvalidation">\n    <ion-item text-center no-border no-lines>\n      <img src="{{lot.picture}}" style="width:200px;">\n      <br>\n      {{lot.descrition}} by {{lot.from.firstname}}<br>\n      {{\'BETS.NEEDVALIDATIONBEFORE\' | translate}}:<shifutimer [end]="lot.dtStart"></shifutimer>\n      <br>\n      <shifubutton [small]="true" size="100" shifuid="btnValidate" *ngIf="eventData.event.Moderators.indexOf(userData.user.id)>-1" label="Validate" (click)="makeLoterieAvailable(lot,true)"></shifubutton>\n      <shifubutton [small]="true" size="100" label="LIB.CANCEL" (click)="makeLoterieAvailable(lot,false)"></shifubutton>\n    </ion-item>\n    <span *ngIf="lot.from.id==userData.user.id">{{\'BETS.LOTERIEWAITINGVALIDATE\' | translate}}<br></span>\n  </shifucard>\n\n\n  <!-- Loteries pour inscription -->\n  <shifucard [visible]="!lot.hasTicket" [title]="lot.title" *ngFor="let lot of loteries" icon="person-add" (onclick)="shareBet(lot)">\n    <ion-item text-center no-lines no-border>\n      <img *ngIf="lot.picture.length>0" src="{{lot.picture}}" class="image-photo" style="display:inline-block;width:70%;max-width:300px;"><br>\n\n      <div *ngIf="lot.description!=undefined && lot.description.length>0">\n        {{lot.description}}<br>\n      </div>\n\n      <shifubutton *ngIf="eventData.event.Moderators.indexOf(userData.user.id)>-1" [small]="true" size="100" label="LIB.CLOSE" (click)="closeLoterie(lot)"></shifubutton>\n\n      <div text-center *ngIf="lot.from.id!=userData.user.id && lot.maxCredits>1 && lot.dtEnd>now && ((lot.maxCredits==1 && !lot.hasTicket) || lot.maxCredits>1)">\n        {{\'BETS.INFOLOTERIE\' | translate}}&nbsp;1&nbsp;<img src="./assets/img/money.png" class="small-money"><br><br>\n        <shifubutton label="LIB.BUY" shifuid="btnBuy" (click)="buy(lot)"></shifubutton>\n      </div>\n\n\n      <div *ngIf="lot.from.id!=userData.user.id && lot.maxCredits==1 && lot.dtEnd>now && ((lot.maxCredits==1 && !lot.hasTicket) || lot.maxCredits>1)">\n        {{\'BETS.INFOLOTERIE\' | translate}}&nbsp;1&nbsp;<img src="./assets/img/money.png" class="small-money">\n\n        <br><br>\n\n        <shifubutton label="LIB.SUBSCRIBE" shifuid="btnSubscribe" (click)="buy(lot)"></shifubutton>\n      </div>\n    </ion-item>\n\n    <span *ngIf="lot.opened">{{"LIB.STARTIN" | translate}} <shifutimer [end]="lot.dtStart"></shifutimer></span>\n    <span *ngIf="!lot.opened">{{"LIB.TIRAGEDANS" | translate}}<shifutimer [end]="lot.dtEnd"></shifutimer></span>\n    <span *ngIf="lot.text.length>0">&nbsp;-&nbsp;{{lot.text}}</span>\n  </shifucard>\n\n  <!-- Loteries terminees -->\n  <div *ngIf="!lot.validation">\n    <shifucard [title]="lot.title" *ngFor="let lot of end_loteries">\n\n      <div *ngIf="lot.winner==userData.user.id">\n        {{\'BETS.YOUWIN\' | translate}}<br>\n        {{\'BETS.WINLOTERIE\' | translate}}\n        <shifubutton [small]="true" label="LIB.VALIDATE" (click)="validateLoterie(lot)"></shifubutton>\n      </div>\n      <span *ngIf="lot.from.id!=userData.user.id && lot.winner!=userData.user.id">{{"BETS.YOULOOSE" | translate}}</span>\n      <div *ngIf="lot.from.id==userData.user.id">\n        <ion-list *ngFor="let buyer of lot.buyers">\n          <ion-item>\n            {{buyer.firstname}}\n          </ion-item>\n        </ion-list>\n      </div>\n\n    </shifucard>\n  </div>\n\n\n  <!-- createur du pari à évaluer -->\n  <div *ngFor="let bet of bets_toevaluate">\n    <shifubet [bet]="bet" status="toevaluate"></shifubet>\n  </div>\n\n\n  <!-- Pari à valider -->\n\n  <shifucard [title]="bet.title" *ngFor="let bet of bets_tovalidate">\n      <ion-list no-lines no-margin radio-group *ngIf="bet.from.id==userData.user.id" [(ngModel)]="bet.result">\n        <ion-list-header>\n          {{\'BETS.YOUMUSTGIVERESPONS\' | translate}}:\n        </ion-list-header>\n        <ion-item margin-left="5px" *ngFor="let opt of bet.options">\n          <ion-label>{{opt.lib}}</ion-label>\n          <ion-radio [value]="opt.lib"></ion-radio>\n        </ion-item>\n      </ion-list><br>\n      <shifubutton item-right *ngIf="bet.from.id==userData.user.id" [small]="true" label="LIB.VALIDATE" (click)="validate(bet)"></shifubutton>\n\n\n    <ion-item *ngIf="bet.from.id!=userData.user.id" >\n      {{\'BETS.WAITPAY\' | translate}}<br>\n      {{"BETS.GAINS" | translate}}&nbsp;{{bet.gainMax | number:0}}&nbsp;<img class="small-money" src="./assets/img/money.png">\n    </ion-item>\n  </shifucard>\n\n\n\n\n\n  <!-- Pari à miser -->\n  <shifucard [visible]="bet.visibleCard" *ngFor="let bet of bets" title="{{bet.title}}" icon="person-add" (onclick)="shareBet(bet)">\n\n    <!--<span style="font-size: small" *ngIf="userData.user.id!=bet.from.id && bet.type==4">-->\n    <!--{{bet.from.score | number:0}}&nbsp;<ion-icon name="star"></ion-icon>-->\n    <!--</span>-->\n\n    <!--Affichage Brainstorm-->\n    <ion-item no-lines no-border *ngIf="bet.type==9 && bet.votes!=undefined &&  bet.votes.length>0">\n        <span no-lines no-border *ngFor="let vote of bet.votes">\n          <span *ngIf="vote.from==userData.user.id || bet.from.id==userData.user.id">\n            <span *ngIf="bet.from.id==userData.user.id" style="color:lightgrey">{{vote.description}}:</span>\n            {{vote.text}}<br>\n          </span>\n        </span>\n    </ion-item>\n\n    <!--Affichage du visuel du brainstorm-->\n    <div style="width:100%;text-align:center;" *ngIf="!bet.optionByImage && bet.picture!=undefined && bet.picture.length>0">\n      <img src="{{bet.picture}}" class="image-photo" style="display:inline-block;width:80%;max-width:300px;">\n      <br>\n    </div>\n\n    <!--Zone de réponse pour Brainstorm-->\n    <ion-item no-lines no-margin *ngIf="bet.type==9 && bet.canVote==true">\n      <ion-input name="txtRespons" placeholder="Votre réponse" [(ngModel)]="bet.freetext" autocorrect="on" (keypress)="changeRespons(bet,$event)"></ion-input>\n      <shifubutton item-end label="LIB.SEND" name="btnSendBrainstorm" (click)="sendRespons(bet)"></shifubutton>\n    </ion-item>\n\n\n    <div *ngIf="!bet.optionByImage || bet.type==4">\n      <ion-grid>\n        <ion-row align-items-center *ngFor="let opt of bet.options">\n          <ion-col col-auto>\n            <!-- zone de mise des Paris -->\n            <shifubutton name="btnBet" label="LIB.TOBET" [small]="true" (click)="mise(bet,opt)"\n                         *ngIf="(bet.from.id!=userData.user.id || userData.user.connexions.length<3) &&\n                                  bet.type==4 && !bet.closed && userData.user.jetons[eventData.event.owner_id]>0">\n            </shifubutton>\n\n            <!-- Boutons de vote des Sondages -->\n            <shifubutton [small]="true" name="btnVote"\n                         *ngIf="bet.type==5 && bet.canVote==true && !bet.closed && bet.opened"\n                         icon="arrow-round-forward" (click)="mise(bet,opt)">\n            </shifubutton>\n          </ion-col>\n\n          <ion-col>\n            {{opt.lib}}\n            <!--Les quotes ne sont pas affichés aux nouveaux -->\n            <span *ngIf="userData.user.connexions.length>10 && opt.quot>0 && bet.type==4" style="font-size: small;">({{opt.quot | number:0 }}/1)</span>\n          </ion-col>\n\n          <ion-col col-2>\n                        <span *ngIf="opt.totaluser>0 && bet.type==4" style="font-size: large;">\n                            {{opt.totaluser | number:0 }}&nbsp;<img src="./assets/img/money.png" style="display:inline;width:20px">\n                        </span>\n            <span *ngIf="bet.type==5 && opt.total>0" style="font-size: large">\n                {{opt.total | number:0 }}<ion-icon name="checkmark"></ion-icon>\n              </span>\n          </ion-col>\n\n        </ion-row>\n      </ion-grid>\n    </div>\n\n    <ion-item *ngIf="bet.optionByImage && bet.type==5" text-wrap>\n      <div *ngFor="let opt of bet.options"  style="position:relative;display:inline-block;" (click)="mise(bet,opt)">\n        <img class="image-photo" [src]="opt.lib" style="width:100px;height:100px;display:inline-block;">\n        <div style="font-size:large;color:white;position:absolute;left:10px;top:10px">\n          {{opt.total}}\n        </div>\n      </div>\n    </ion-item>\n\n    <!-- Zone réservée au créateur du pari -->\n    <ion-item shifuid="zone_bet_admin" no-lines *ngIf="(bet.from.id==userData.user.id) || (eventData.event.needValidate && eventData.event.Moderators.indexOf(userData.user.id)>-1)">\n      <ion-label *ngIf="bet.type==4 || bet.type==5">\n        {{bet.total}}&nbsp;\n        <img *ngIf="bet.type==4" src="./assets/img/money.png" class="money-small">\n        <ion-icon *ngIf="bet.type==5" name="checkmark"></ion-icon>\n        &nbsp;&nbsp;{{bet.nPlayers}}&nbsp;<img src="./assets/img/personne.png" class="money-small">\n      </ion-label>\n\n      <ion-item item-end>\n        <shifubutton size="80" *ngIf="bet.dtStart>eventData.event.dtEnd" [small]="true"\n                     name="btnStart" label="LIB.START" (click)="start(bet)"></shifubutton>\n        <shifubutton size="80" *ngIf="bet.opened" [small]="true" name="btnClose" label="LIB.CLOSE" (click)="close(bet)"></shifubutton>\n        <shifubutton size="80" *ngIf="bet.opened" [small]="true" name="btnDelete" label="LIB.CANCEL" (click)="remove(bet)"></shifubutton>\n      </ion-item>\n\n    </ion-item>\n\n\n    <ion-card-header no-margin padding="2px">\n\n        <span style="font-size: large" *ngIf="bet.opened">\n          <shifutimer [end]="bet.dtEnd"></shifutimer>\n        </span>\n\n        <span *ngIf="bet.from.id==userData.user.id && bet.opened==false && bet.closed==false && bet.dtStart<eventData.event.dtEnd" style="font-size: large">\n          {{"LIB.STARTIN" | translate}}\n          <shifutimer [end]="bet.dtStart"></shifutimer>\n        </span>\n\n        <span style="font-size: medium" *ngIf="bet.type==5 && bet.nRestVote>0 && bet.opened">\n          &nbsp;{{bet.nRestVote}}&nbsp;<ion-icon name="checkmark"></ion-icon>\n        </span>\n\n        <span style="width:50%;text-align: right;font-size: medium;" *ngIf="bet.gainMax>0 && bet.type==4">\n          {{"BETS.GAINS" | translate}}&nbsp;{{bet.gainMax | number:0}}\n          &nbsp;<img src="./assets/img/money.png" class="small-money">\n        </span>\n\n        <span style="text-align: right;font-size: medium;"\n              *ngIf="bet.gainMax==0 && bet.type==4 && bet.cagnotte>0">\n          {{"LIB.CAGNOTTE" | translate}}&nbsp;{{bet.cagnotte | number:0}}&nbsp;<img src="./assets/img/money.png" class="small-money">\n        </span>\n\n    </ion-card-header>\n\n  </shifucard>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\bets\bets.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_2.Events, ionic_angular_2.ModalController, storage_1.Storage,
            ionic_angular_1.NavController, ionic_angular_1.NavParams, ionic_angular_1.ToastController,
            event_data_1.EventDataProvider, user_data_1.UserData, core_2.TranslateService,
            platform_browser_1.DomSanitizer, ionic_angular_2.AlertController])
    ], BetsPage);
    return BetsPage;
}());
exports.BetsPage = BetsPage;
//# sourceMappingURL=bets.js.map

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var core_2 = __webpack_require__(7);
var user_data_1 = __webpack_require__(8);
var event_data_1 = __webpack_require__(15);
var Maintools_1 = __webpack_require__(2);
var image_creator_1 = __webpack_require__(38);
/**
 * Generated class for the AddloteriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddloteriePage = /** @class */ (function () {
    function AddloteriePage(modalCtrl, viewCtrl, translate, navCtrl, navParams, toastCtrl, eventData, userData, alertCtrl) {
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.eventData = eventData;
        this.userData = userData;
        this.alertCtrl = alertCtrl;
        this.newlot = { type: 6, question: "", respons: "", from: "", title: "", description: "", picture: "", dtStart: 0, startDelay: 5, delay: 10, minCredits: 0, maxCredits: 1 };
        this.now = new Date().getTime();
        this.mindelay = 3;
        this.getDtEnd = function () {
            this.newlot.dtEnd = Number(this.newlot.dtStart) + (Number(this.newlot.delay)) * 1000 * 60;
        };
        this.getDtStart = function () {
            var start = Math.max(this.now, Number(this.eventData.event.dtStart));
            this.newlot.dtStart = start + (Number(this.newlot.startDelay)) * 1000 * 60;
            this.getDtEnd();
        };
        //Pas de délai minimum de visibilité pour les modérateurs
        if (this.eventData.event.Moderators.indexOf(this.userData.user.id) > -1) {
            this.mindelay = 0;
            this.newlot.startDelay = 0;
        }
        this.newlot.question = this.translate.instant("LOTERIE.DEFAULTQUESTION");
        this.newlot.respons = this.translate.instant("LOTERIE.DEFAULTRESPONS");
        this.newlot.from = this.userData.user;
        if (this.eventData.event.dtStart > this.now) {
            this.newlot.maxdelay = (this.eventData.event.dtEnd - this.eventData.event.dtStart) / 60000; //Un pari ne peut aller au dela de la fin de l'evenement
        }
        else
            this.newlot.maxdelay = (this.eventData.event.dtEnd - this.now) / 60000; //Un pari ne peut aller au dela de la fin de l'evenement
        this.getDtStart();
    }
    AddloteriePage.prototype.addLot = function () {
        var vm = this;
        this.getDtStart();
        this.eventData.addloterie(this.newlot).subscribe(function (resp) {
            if (resp.message.length > 0) {
                Maintools_1.toast(vm.toastCtrl, resp.message, vm.translate);
            }
            vm.viewCtrl.dismiss();
        });
    };
    ;
    AddloteriePage.prototype.selImage = function () {
        var vm = this;
        Maintools_1.openModal(this.modalCtrl, image_creator_1.ImageCreatorPage, { ratio: 1, upload: true }, function (rep) {
            if (rep != null) {
                vm.newlot.picture = rep.value;
            }
        });
    };
    AddloteriePage = __decorate([
        core_1.Component({
            selector: 'page-addloterie',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addloterie\addloterie.html"*/'<!--\n  Generated template for the AddloteriePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <shifutitle title="LIB.LOTERIE" help="#">\n    <shifubutton [small]="true" icon="checkmark" id="btnSave" label="LIB.SAVE" *ngIf="(newlot.picture.length>0 || eventData.event.Moderators.indexOf(userData.user.id)>-1) && newlot.title.length>0" (click)="addLot()"></shifubutton>\n    <shifubutton [small]="true" id="btnCancel" icon="close" (click)="viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n\n</ion-header>\n\n\n<ion-content no-padding>\n  <tuto label="ADDLOTERIE.TUTO" show="txtTitle"></tuto>\n\n  <shifuinput size="80" [focus]="true" text-align="center" id="txtTitle" label="ADDLOTS.TITLE" [(ngModel)]="newlot.title"></shifuinput>\n  <shifuinput id="txtDescription" label="ADDLOTS.DESCRIPTION" [(ngModel)]="newlot.description"></shifuinput>\n\n  <ion-item text-center>\n    <img *ngIf="newlot.picture.length>0" src="{{newlot.picture}}" style="max-width:300px;width:80%;" class="image-photo" (click)="selImage()"><br>\n    <shifubutton id="btnAddImage" icon="image" (click)="selImage()"\n                 *ngIf="newlot.picture.length==0">\n    </shifubutton>\n    <br>\n    <span>De {{newlot.dtStart | date: "HH:mm"}} à {{newlot.dtEnd | date: "HH:mm"}}</span>\n  </ion-item>\n\n  <div *ngIf="(eventData.event.Moderators.indexOf(userData.user.id)>-1 || newlot.picture.length>0) && newlot.title.length>0">\n    <shifurange id="txtStart" label="ADDLOTS.STARTBET" unite="minutes" [(ngModel)]="newlot.startDelay" min="{{minDelay}}" max="60" step="1" (onchange)="getDtStart()"></shifurange>\n    <shifurange id="txtDuration" label="ADDLOTS.DURATION" unite="minutes" [(ngModel)]="newlot.delay" min="1" max="{{newlot.maxdelay}}" step="1" (onchange)="getDtEnd()"></shifurange>\n    <shifurange id="txtMinCredit" label="ADDLOTS.MINCREDIT" unite="credits" [(ngModel)]="newlot.minCredits" min="0" max="100" step="1"></shifurange>\n    <shifurange id="txtMaxCredit" label="ADDLOTS.MAXCREDITS" unite="credits" [(ngModel)]="newlot.maxCredits" min="1" max="100" step="1"></shifurange>\n\n    <!--<br>-->\n    <!--<shifuinput id="txtQuestion" label="ADDLOTS.QUESTION" [(ngModel)]="newlot.question"></shifuinput>-->\n    <!--<shifuinput id="txtRespons" label="ADDLOTS.RESPONS" [(ngModel)]="newlot.respons"></shifuinput>-->\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addloterie\addloterie.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.ModalController, ionic_angular_1.ViewController, core_2.TranslateService,
            ionic_angular_1.NavController, ionic_angular_1.NavParams, ionic_angular_1.ToastController,
            event_data_1.EventDataProvider, user_data_1.UserData,
            ionic_angular_1.AlertController])
    ], AddloteriePage);
    return AddloteriePage;
}());
exports.AddloteriePage = AddloteriePage;
//# sourceMappingURL=addloterie.js.map

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var user_data_1 = __webpack_require__(8);
var event_data_1 = __webpack_require__(15);
var Tools = __webpack_require__(2);
var core_2 = __webpack_require__(7);
var preparecommand_1 = __webpack_require__(333);
var Maintools_1 = __webpack_require__(2);
var storage_1 = __webpack_require__(42);
var ng_push_1 = __webpack_require__(84);
/**
 * Generated class for the CustomercommandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CustomercommandPage = /** @class */ (function () {
    function CustomercommandPage(modalCtrl, translate, alertCtrl, toastCtrl, notifs, navCtrl, navParams, events, eventData, userData, storage) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.notifs = notifs;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.eventData = eventData;
        this.userData = userData;
        this.storage = storage;
        this._DRAGGGING_STARTED = 0;
        this.lastMousePosition = { x: null, y: null };
        this.command = { status: 0, items: [] };
        this.commands = [];
        this.x = 0;
        this.y = 0;
        this.table = "";
        this.canCommand = true;
        this.env = 0;
        this.env = Maintools_1.getEnv();
        this.storage.get("table").then(function (r) { _this.table = r; });
        Maintools_1.subscribe("command", this);
    }
    CustomercommandPage.prototype.ionViewDidLoad = function () {
        if (this.userData.user.id == this.eventData.event.owner_id && this.eventData.event.laCarte.length == 0)
            this.openPrepare();
        else
            this.refresh();
    };
    CustomercommandPage.prototype.openPrepare = function () {
        Maintools_1.openModal(this.modalCtrl, preparecommand_1.PreparecommandPage, {}, function () {
        });
    };
    CustomercommandPage.prototype.razCommand = function () {
        this.command.items.forEach(function (item) {
            item.elt.parentNode.removeChild(item.elt);
        });
        this.command = {};
        this.command.items = [];
        this.refresh();
    };
    ;
    CustomercommandPage.prototype.askForTable = function () {
        var _this = this;
        if (this.eventData.event.selfService)
            this.send();
        else {
            var vm = this;
            if (this.command.table == undefined) {
                this.storage.get("table").then(function (rep) {
                    if (rep != null) {
                        _this.command.table = rep;
                        _this.eventData.sendcustomercommand(_this.command).subscribe(function (resp) {
                            _this.razCommand();
                        });
                    }
                    else {
                        Tools.showPopup({
                            title: _this.eventData.event.loc_query,
                            confirmButton: "LIB.OK",
                            cancelButton: "LIB.CANCEL",
                            type: "number",
                            translate: _this.translate
                        }, _this.alertCtrl, function (res) {
                            if (res != null) {
                                vm.command.table = res;
                                vm.send();
                            }
                        });
                    }
                });
            }
        }
    };
    CustomercommandPage.prototype.send = function () {
        var vm = this;
        this.command.idEvent = this.eventData.event.id;
        this.command.from = this.userData.user;
        this.command.type = 8;
        this.command.laCarte = this.eventData.event.laCarte;
        this.command.title = "Commande de " + this.userData.user.firstname + " à " + new Date().toLocaleTimeString();
        vm.eventData.sendcustomercommand(vm.command).subscribe(function (resp) {
            vm.razCommand();
        });
    };
    ;
    CustomercommandPage.prototype.cancel = function () {
        var elt = this.command.items[this.command.items.length - 1].elt;
        elt.remove();
        this.command.items.splice(this.command.items.length - 1, 1);
    };
    ;
    CustomercommandPage.prototype.clickRandom = function () {
        var x = Math.random() * this.lacarte.nativeElement.clientWidth;
        var y = Math.random() * this.lacarte.nativeElement.clientHeight;
        this.selCarte({
            preventDefault: function () { },
            offsetX: x,
            offsetY: y,
            target: {
                parentNode: this.lacarte.nativeElement.parentElement,
                clientWidth: this.lacarte.nativeElement.clientWidth,
                clientHeight: this.lacarte.nativeElement.clientHeight
            }
        });
    };
    CustomercommandPage.prototype.selCarte = function (event) {
        event.preventDefault();
        var size = 70;
        var offset = 0;
        if (event.pointers != undefined) {
            var x = event.pointers[0].offsetX;
            var y = event.pointers[0].offsetY;
            event.offsetX = x + offset;
            event.offsetY = y - offset;
        }
        var vm = this;
        var img = new Image();
        img.onload = function () {
            //this.command.paperSize={x:event.target.parentNode.clientWidth,y:event.target.parentNode.clientHeight};
            var that = event.target.parentNode.appendChild(img);
            that.style.position = "absolute";
            that.style.width = size + "px";
            that.style.height = size + "px";
            // var x=(event.target.offsetLeft+event.offsetX-size/2);
            // var y=(event.target.offsetTop+event.offsetY-size/2);
            vm.command.status = 0;
            var item = {
                x: 100 * ((event.offsetX) / event.target.clientWidth),
                y: 100 * ((event.offsetY) / event.target.clientHeight),
                elt: this
            };
            vm.command.items.push(item);
            that.style.left = (event.offsetX + vm.lacarte.nativeElement.offsetLeft - size / 2) + "px";
            that.style.top = (event.offsetY + vm.lacarte.nativeElement.offsetTop - size / 2) + "px";
        };
        img.src = "./assets/img/pin.png";
    };
    CustomercommandPage.prototype.refresh = function () {
        var _this = this;
        var vm = this;
        this.eventData.getcommands().subscribe(function (resp) {
            vm.commands = [];
            vm.canCommand = true;
            var i = 0;
            resp.items.forEach(function (item) {
                if (item.status == 1 || item.status == 2) {
                    if (item.from.id != vm.userData.user.id)
                        i++;
                    else {
                        vm.canCommand = false;
                        item.commandPrecedente = i;
                        i++;
                        var message = {
                            title: "LIB.COMMANDREADY",
                            body: "Votre commande est prete",
                            vibrator: [200, 100, 200]
                        };
                        if (item.status == 2)
                            Tools.notif(_this.notifs, message, _this.translate);
                        vm.commands.push(item);
                    }
                }
            });
        });
    };
    ;
    CustomercommandPage.prototype.mousedown = function (event) {
        this._DRAGGGING_STARTED = 1;
        if (event.touches != undefined) {
            event.offsetX = event.touches[0].clientX;
            event.offsetY = event.touches[0].clientY;
        }
        this.lastMousePosition = { x: event.offsetX, y: event.offsetY };
    };
    ;
    CustomercommandPage.prototype.mouseup = function (event) {
        this._DRAGGGING_STARTED = 0;
        //if(this.command.items.length==1)toast(this.toastCtrl,"CUSTOMERCOMMAND.TUTO_WITHITEM",this.translate);
    };
    ;
    CustomercommandPage.prototype.mousewheel = function (event) {
        if (event.deltaY > 0)
            event.target.style.width = (event.target.offsetWidth + 10) + "px";
        else
            event.target.width = event.target.offsetWidth - 10;
    };
    CustomercommandPage.prototype.mousemove = function (event) {
        event.preventDefault();
        var vm = this;
        var change_x = 0;
        var change_y = 0;
        if (event.touches != undefined) {
            event.offsetX = event.touches[0].clientX;
            event.offsetY = event.touches[0].clientY;
        }
        if (this._DRAGGGING_STARTED == 1) {
            var current_mouse_position = { x: event.offsetX, y: event.offsetY };
            change_x = current_mouse_position.x - vm.lastMousePosition.x;
            change_y = current_mouse_position.y - vm.lastMousePosition.y;
            /* Save mouse position */
            this.lastMousePosition = current_mouse_position;
            var limitX = event.target.parentElement.clientWidth - event.target.clientWidth;
            var limitY = event.target.parentElement.clientHeight - event.target.clientHeight;
            if (limitY > 0)
                limitY = 0;
            if (limitX > 0)
                limitX = 0;
            if (this.x + change_x > 0)
                change_x = -this.x; //|| this.x-change_x<this.lacarte.nativeElement.width
            if (this.y + change_y > 0)
                change_y = -this.y; //|| this.y-change_y<this.lacarte.nativeElement.height
            if (this.x + change_x < limitX)
                change_x = -this.x + limitX;
            if (this.y + change_y < limitY)
                change_y = -this.y + limitY;
            if (change_x != 0 || change_y != 0) {
                this.y = this.y + change_y;
                this.x = this.x + change_x;
                this.lacarte.nativeElement.style.top = this.y + "px";
                this.lacarte.nativeElement.style.left = this.x + "px";
                this.command.items.forEach(function (item) {
                    item.elt.style.left = (Number(item.elt.style.left.replace("px", "")) + change_x) + "px";
                    item.elt.style.top = (Number(item.elt.style.top.replace("px", "")) + change_y) + "px";
                });
            }
        }
    };
    __decorate([
        core_1.ViewChild("lacarte"),
        __metadata("design:type", core_1.ElementRef)
    ], CustomercommandPage.prototype, "lacarte", void 0);
    CustomercommandPage = __decorate([
        core_1.Component({
            selector: 'page-customercommand',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\customercommand\customercommand.html"*/'<ion-header no-border>\n  <shifutitle [title]="command.items.length+\' article(s)\'">\n      <shifubutton [small]="true" id="btnCancel" *ngIf="command.items.length>0" icon="undo" (click)="cancel()"></shifubutton>\n      <shifubutton [small]="true" id="btnSend" *ngIf="command.items.length>0 && eventData.event.opened" label="LIB.SEND" (click)="askForTable()"></shifubutton>\n      <shifubutton [small]="true" id="btnPrepare" *ngIf="eventData.event.owner_id==userData.user.id" label="LIB.PREPARE" (click)="openPrepare()"></shifubutton>\n      <shifubutton [small]="true" id="btnCommandRandom" *ngIf="env==0 && eventData.event.opened && commands.length==0 && eventData.event.laCarte.length>0" label="LIB.RANDOM" (click)="clickRandom()"></shifubutton>\n      <span *ngIf="userData.user.id!=eventData.event.owner_id">\n        <span style="font-size: x-large;color:white">{{userData.user.jetons[eventData.event.owner_id]}}</span>\n        <img src="./assets/img/money.png" style="width:15px;">\n      </span>\n  </shifutitle>\n</ion-header>\n\n<ion-content no-border no-margin no-padding scroll="false" class="has-subheader">\n  <tuto position="title"\n        [if]="command.items.length==0 && eventData.event.laCarte.length>0"\n        label="CUSTOMERCOMMAND.TUTO">\n  </tuto>\n\n  <ion-item *ngIf="commands.length>0" text-center>\n    <tuto label="CUSTOMERCOMMAND.TUTO_PREPARE"></tuto>\n    Actuellement {{commands.length}} commandes en attente<br><br>\n    <div *ngFor="let comm of commands">\n      <h2>Commande #{{comm.numeroCommand}} : <span style="font-size: small">{{comm.title}}</span></h2>\n      {{(comm.delayToPrepare/60+1) | number:"2.0-0"}}&nbsp;minutes<br><br>\n      <span style="font-size: x-large;background-color: #00a8c6">{{comm.text | translate}}</span>\n      <span *ngIf="comm.status==2 && comm.table==null" label="COMMAND.READY"></span>\n      <span *ngIf="comm.status==2 && comm.table!=null" label="COMMAND.READYWITHTABLE"></span>\n    </div>\n  </ion-item>\n\n    <div *ngIf="canCommand" style="display: inline-block;width:100%;height:100%;cursor:move;overflow: hidden;"\n         (mousemove)="mousemove($event)"\n         (touchmove)="mousemove($event)"\n         (touchend)="mouseup($event)"\n         (mouseup)="mouseup($event)"\n         (mousedown)="mousedown($event)"\n         (touchstart)="mousedown($event)"\n         (mousewheel)="mousewheel($event)">\n\n        <img #lacarte (click)="selCarte($event)"\n             [ngStyle]="{\'position\':\'relative\',\'z-index\': 0,\'overflow\':\'hidden\',\'max-width\':userData.user.zoomInitial,\'max-height\':userData.user.zoomInitial}"\n             src="{{eventData.event.laCarte}}">\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\customercommand\customercommand.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_2.ModalController, core_2.TranslateService, ionic_angular_2.AlertController,
            ionic_angular_1.ToastController, ng_push_1.PushNotificationsService,
            ionic_angular_1.NavController, ionic_angular_1.NavParams, ionic_angular_2.Events,
            event_data_1.EventDataProvider, user_data_1.UserData, storage_1.Storage])
    ], CustomercommandPage);
    return CustomercommandPage;
}());
exports.CustomercommandPage = CustomercommandPage;
//# sourceMappingURL=customercommand.js.map

/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var event_data_1 = __webpack_require__(15);
var Maintools_1 = __webpack_require__(2);
var image_creator_1 = __webpack_require__(38);
var user_data_1 = __webpack_require__(8);
var invite_1 = __webpack_require__(46);
var core_2 = __webpack_require__(7);
var api_1 = __webpack_require__(16);
/**
 * Generated class for the PreparecommandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PreparecommandPage = /** @class */ (function () {
    function PreparecommandPage(viewCtrl, api, translate, alertCtrl, toastCtrl, modalCtrl, userData, events, navCtrl, navParams, eventData) {
        this.viewCtrl = viewCtrl;
        this.api = api;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.userData = userData;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.eventData = eventData;
        this.commands = [];
        this.command = { items: [] };
        this.user = {};
        var vm = this;
    }
    PreparecommandPage.prototype.ionViewDidLoad = function () {
        Maintools_1.subscribe("command", this);
        this.refresh();
    };
    PreparecommandPage.prototype.updateCommand = function (command, status) {
        var _this = this;
        this.eventData.updatecommand(command.id, status).subscribe(function (resp) { _this.refresh(); });
    };
    ;
    PreparecommandPage.prototype.refresh = function () {
        var vm = this;
        this.eventData.getcommands().subscribe(function (resp) {
            vm.commands = [];
            resp.items.forEach(function (r) {
                for (var i = 0; i < r.items.length; i++) {
                    r.items[i].x = r.items[i].x + "%";
                    r.items[i].y = r.items[i].y + "%";
                    r.order = i;
                }
                vm.commands.push(r);
            });
        });
    };
    ;
    PreparecommandPage.prototype.generateTableQRCode = function () {
        var vm = this;
        Maintools_1.openModal(this.modalCtrl, invite_1.InvitePage, { dest: "command" }, function () {
            Maintools_1.toast(vm.toastCtrl, "LIB.INVITE");
        });
    };
    PreparecommandPage.prototype.updateEvent = function () {
        this.eventData.updateevent("laCarte,selfservice,loc_query").subscribe(function (rep) { });
    };
    PreparecommandPage.prototype.uploadLaCarte = function () {
        var _this = this;
        Maintools_1.openModal(this.modalCtrl, image_creator_1.ImageCreatorPage, { upload: true, ratio: 13 / 9, autocrop: true, maxsize: 800 }, function (res) {
            if (res != null) {
                _this.eventData.event.laCarte = res.value;
                _this.eventData.event.activities.push("command");
                _this.eventData.updateevent("laCarte,activities").subscribe(function (r) { });
            }
        });
    };
    PreparecommandPage.prototype.pay = function (command) {
        var vm = this;
        Maintools_1.showPopup({ title: "LIB.COST", confirmButton: "LIB.OK", cancelButton: "LIB.CANCEL", type: "number", translate: this.translate }, this.alertCtrl, function (res) {
            if (res != null) {
                res = Math.abs(res);
                vm.api.chargecredits(vm.eventData.event.owner_id, command.from.id, -res).subscribe(function (r) {
                    vm.refresh();
                    vm.updateCommand(command, 5);
                });
            }
        });
    };
    PreparecommandPage = __decorate([
        core_1.Component({
            selector: 'page-preparecommand',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\preparecommand\preparecommand.html"*/'<!--\n  Generated template for the PreparecommandPage page.\n\n  See http://ionicframe work.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <shifutitle help="#" title="LIB.COMMAND">\n    <shifubutton id="btnClose" icon="close" (click)="viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n\n</ion-header>\n\n<ion-content no-padding>\n  <tuto label="CUSTOMERCOMMAND.TUTO"></tuto>\n  <tuto label="Vous devez charger un menu pour que la commande à distance soit possible"\n        [if]="eventData.event.laCarte.length==0"\n        show="btnTakePhoto"\n  ></tuto>\n\n  <ion-item text-center *ngIf="commands.length==0">Aucune commande en attente</ion-item>\n\n  <shifucard title="Commande #{{command.numeroCommand}} de {{command.from.firstname}} : {{command.text | translate}} - {{command.items.length}}&nbsp;articles&nbsp;"\n             label="LIB.READY" (onclick)="updateCommand(command,2)"\n             [showButton]="command.status==1"\n             [visible]="command.order==0"\n             *ngFor="let command of commands">\n    <div style="width:100%;text-align: center;vertical-align: middle;">\n      <span *ngIf="command.status>1">({{command.from.jetons[eventData.event.owner_id]}}&nbsp;<img src="./assets/img/money.png" class="small-money">)</span>\n\n      <span *ngIf="!eventData.event.selfService">Table:{{command.table}}</span>\n\n      <br>\n      <shifubutton name="btnReady" size="80" [small]="true" *ngIf="command.status==1" label="LIB.READY" (click)="updateCommand(command,2)"></shifubutton>\n      <shifubutton name="btnCancel" size="80"   [small]="true" *ngIf="command.status==1" label="LIB.CANCEL" (click)="updateCommand(command,3)"></shifubutton>\n      <shifubutton name="btnTake" size="80"   [small]="true" *ngIf="command.status==2" label="LIB.TAKED" (click)="updateCommand(command,4)"></shifubutton>\n      <shifubutton name="btnPay" size="80" [small]="true" *ngIf="command.status==2" label="LIB.PAY" (click)="pay(command)"></shifubutton>\n      <br><br>\n    </div>\n\n    <div style="display:inline-block;width:96%;left:2%;position:relative;" *ngIf="command.status==1">\n      <img style="width:100%;z-index: 0;" src="{{command.laCarte}}">\n      <img *ngFor="let item of command.items"\n           [ngStyle]="{\'z-index\':100,\'width\':\'50px\',\'height\':\'50px\',\'top\':item.y,\'left\':item.x,\'position\':\'absolute\',\'transform\': \'translate(-25px,-25px)\'}"\n           src="./assets/img/pin.png">\n    </div>\n\n  </shifucard>\n  <br>\n\n  <!-- 4 : correspond au PROFIL_PROPUBLIC -->\n  <shifucard\n    [visible]="commands.length==0"\n    title="LIB.EVENTMASTER"\n    *ngIf="eventData.event.owner_id==userData.user.id"\n    icon="desktop"\n    (onclick)="events.publish(\'open:widget\',\'command\')">\n\n    <ion-item text-center no-line>\n\n      <shifubutton icon="person-add" (click)="generateTableQRCode()"></shifubutton>\n\n      <img *ngIf="eventData.event.laCarte.length>0" class="image-photo" src="{{eventData.event.laCarte}}" style="max-width:90%;"><br>\n      <shifubutton\n              size="200"\n              id="btnTakePhoto"\n              icon="image"\n              label="PREPARE.NEWCARTE"\n              (click)="uploadLaCarte()">\n      </shifubutton>\n    </ion-item>\n    <br>\n    <div *ngIf="eventData.event.laCarte.length>0">\n      <shifucheckbox label="PROFIL.SELFSERVICE" [(ngModel)]="eventData.event.selfService" (onchange)="updateEvent()"></shifucheckbox>\n      <div [hidden]="eventData.event.selfService">\n        <shifuinput label="PROFIL.LOC_QUERY" (onenter)="updateEvent()" [(ngModel)]="eventData.event.loc_query" placeholder="Table ?"></shifuinput>\n      </div>\n    </div>\n  </shifucard>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\preparecommand\preparecommand.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.ViewController, api_1.ApiProvider, core_2.TranslateService, ionic_angular_2.AlertController, ionic_angular_1.ToastController, ionic_angular_1.ModalController, user_data_1.UserData, ionic_angular_2.Events, ionic_angular_1.NavController, ionic_angular_1.NavParams, event_data_1.EventDataProvider])
    ], PreparecommandPage);
    return PreparecommandPage;
}());
exports.PreparecommandPage = PreparecommandPage;
//# sourceMappingURL=preparecommand.js.map

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var Tools = __webpack_require__(2);
var event_data_1 = __webpack_require__(15);
var user_data_1 = __webpack_require__(8);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var Maintools_1 = __webpack_require__(2);
var core_2 = __webpack_require__(7);
/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MessagesPage = /** @class */ (function () {
    function MessagesPage(events, navCtrl, navParams, toastCtrl, translate, alertCtrl, eventData, userData) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.eventData = eventData;
        this.userData = userData;
        this.message = { type: Tools.TYPE_MESSAGE, text: "", tags: ["message"] };
        this.messages = [];
        this.emoji = {};
        this.scheduled_messages = [];
        this.toggled = false;
        this.messageLimitByUser = 0;
        this.message.text = translate.instant("MESSAGES.YOURMESSAGE");
    }
    MessagesPage.prototype.setPopupAction = function (fn) {
        this.openPopup = fn;
    };
    MessagesPage.prototype.setScore = function (mes, step) {
        var _this = this;
        var vote = { event: this.eventData.event.id, from: this.userData.user.id, value: step, description: "" };
        mes.canVote = false;
        this.userData.sendvote(mes.id, vote).subscribe(function (rep) {
            if (rep != null)
                _this.userData.user = rep;
        });
    };
    ;
    MessagesPage.prototype.ionViewDidLoad = function () {
        Tools.subscribe("message", this);
    };
    MessagesPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () { _this.refresh(true); }, Maintools_1.DELAY_TO_REFRESH);
        setTimeout(function () { _this.removeDefaultMessage(); }, 1500);
    };
    MessagesPage.prototype.writemessage = function (key) {
        if (key == 13) {
            this.openPopup(false);
            this.sendmessage();
        }
    };
    MessagesPage.prototype.sendmessage = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = -1; }
        if (this.message.text.length == 0)
            return;
        this.message.from = this.userData.user;
        this.message.anonymous = this.userData.user.anonymous;
        this.message.photo = "";
        if (delay <= 0) //Les messages sont imédiatement ajoutés pour donner l'ilusion d'un envoi rapide
            this.messages.splice(0, 0, JSON.parse(JSON.stringify(this.message)));
        else {
            this.message.dtStart = new Date().getTime() + delay * 60 * 1000;
            this.scheduled_messages.splice(0, 0, JSON.parse(JSON.stringify(this.message)));
        }
        this.eventData.sendmessage(delay, this.message).subscribe(function (resp) {
            if (resp == null) {
                Maintools_1.toast(_this.toastCtrl, "MESSAGE.ERRORLIMIT", _this.translate);
            }
        });
        this.message.text = "";
    };
    MessagesPage.prototype.programMessage = function () {
        var _this = this;
        Maintools_1.showPopup({ title: "MESSAGE.ENTERDELAY", placeholder: "", confirmButton: "LIB.OK", cancelButton: "LIB.CANCEL", type: "number", translate: this.translate }, this.alertCtrl, function (res) {
            _this.sendmessage(Number(res));
        });
    };
    MessagesPage.prototype.deleteMessage = function (id) {
        var _this = this;
        var vm = this;
        this.eventData.deletemessage(id, this.userData.getId()).subscribe(function (rep) {
            Maintools_1.toast(vm.toastCtrl, "MESSAGE.DELETED", _this.translate);
            vm.refresh();
        });
    };
    MessagesPage.prototype.deleteScheduledMessage = function (item) {
        var vm = this;
        this.eventData.deletemessage(item.id, vm.userData.user.id).subscribe(function () {
            vm.refresh(true);
        });
    };
    MessagesPage.prototype.refresh = function (force) {
        if (force === void 0) { force = false; }
        var vm = this;
        if (!force && this.userData.selectTab != undefined && this.userData.selectTab != "MessagesPage")
            return;
        Maintools_1.$$("Récupération des derniers messages");
        this.eventData.getlastmessages(30).subscribe(function (resp) {
            if (resp.items.length > 0) {
                vm.messages = [];
                resp.items.forEach(function (item) {
                    if (item.hasOwnProperty("votes") && item.from.id != vm.userData.user.id) {
                        item.canVote = true;
                        item.votes.forEach(function (vote) {
                            if (item.canVote && vote.from == vm.userData.user.id) {
                                item.canVote = false;
                            }
                        });
                    }
                    else if (item.from.id != vm.userData.user.id)
                        item.canVote = true;
                    vm.messages.push(item);
                });
            }
        });
        this.eventData.getscheduledmessages(20).subscribe(function (resp) {
            if (resp.items.length > 0)
                vm.scheduled_messages = resp.items;
            else
                vm.scheduled_messages = [];
        });
    };
    MessagesPage.prototype.openContextMenu = function (evt, item) {
        //TODO: en chantier
        evt.preventDefault();
        evt.stopPropagation();
        var swipeAmount = 194; //set your required swipe amount
        item.startSliding(swipeAmount);
        item.moveSliding(swipeAmount);
        item.setElementClass('active-options-right', true);
        item.setElementClass('active-swipe-right', true);
    };
    MessagesPage.prototype.updateLimitByUser = function () {
        this.eventData.updateevent("messageLimitByUser").subscribe(function () { });
    };
    MessagesPage.prototype.changeLimitByUser = function () {
        this.eventData.event.messageLimitByUser[1] = 1;
    };
    MessagesPage.prototype.getFocus = function () {
        this.openPopup(false);
    };
    MessagesPage.prototype.removeDefaultMessage = function () {
        if (this.message.text == this.translate.instant("MESSAGES.YOURMESSAGE"))
            this.message.text = "";
    };
    MessagesPage = __decorate([
        core_1.Component({
            selector: 'page-messages',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\messages\messages.html"*/'<!--\n  Generated template for the MessagesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle title="Messages"  help="#">\n  </shifutitle>\n</ion-header>\n\n<ion-content no-padding>\n\n  <tuto position="title" [if]="eventData.event.opened || eventData.event.Moderators.indexOf(userData.user.id)>-1" show="send" label="MESSAGES.TUTO"></tuto>\n  <tuto position="title" [if]="!eventData.event.opened" label="MESSAGES.TUTO_NOSTARTED_EVENT"></tuto>\n  <tuto position="title" [if]="userData.user.connexions.length>5 && messages.length>3" label="MESSAGES.TUTO_ADVANCED"></tuto>\n\n  <ion-grid>\n    <ion-row align-items-center *ngIf="eventData.online && eventData.event.opened">\n      <ion-col col-auto text-left>\n        <!--<emoji-mart (emojiClick)="handleSelection($event)"></emoji-mart>-->\n        <ion-icon\n          id="btnSmiley"\n          style="padding-left: 0px;margin: 0px;font-size: x-large;"\n          color="light"\n          name="happy"\n          color="primary"\n          (click)="openPopup(null)">\n        </ion-icon>\n      </ion-col>\n      <ion-col text-left>\n\n        <emoji-input\n          id="txtMessage"\n          [inputClass]="\'input_class\'"\n          [(model)]="message.text"\n          [autofocus]="true"\n          [popupAnchor]="\'top\'"\n          [closeAfterSelection]="false"\n          (blur)="getFocus()"\n          (focus)="getFocus()"\n          (keyup)="writemessage($event.keyCode)"\n          (setPopupAction)="setPopupAction($event)">\n        </emoji-input>\n      </ion-col>\n      <ion-col col-1 text-right>\n        <ion-icon *ngIf="message.text.length==0" id="send" style="font-size:2em;color:lightgrey"></ion-icon>\n        <ion-icon *ngIf="message.text.length>0" color="primary" style="font-size:2em;" id="btnSend" name="send" (click)="writemessage(13)"></ion-icon>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n  <shifucard [visible]="userData.user.connexions.length>5"\n             *ngIf="userData.user.id==eventData.event.owner_id"\n             title="LIB.EVENTMASTER"\n             icon="desktop" (onclick)="events.publish(\'open:widget\',\'message\')">\n\n    <shifubutton *ngIf="eventData.event.messageLimitByUser[1]==0" label="MESSAGES.LIMITBYUSER" id="btnLimitMessage" (click)="changeLimitByUser()"></shifubutton>\n    <shifurange *ngIf="eventData.event.messageLimitByUser[1]>0"\n                label="MESSAGES.LIMITBYUSER"\n                (onchange)="updateLimitByUser()"\n                icon="chatbubbles"\n                min="0" max="200" unite="messages"\n                [(ngModel)]="eventData.event.messageLimitByUser[1]">\n    </shifurange>\n\n    <shifubutton *ngIf="message.text.length>0" id="btnProgram" icon="timer" (click)="programMessage()"></shifubutton>\n\n    <ion-list no-lines no-border>\n      <ion-item-sliding *ngFor="let item of scheduled_messages">\n        <ion-item name="scheduled_message">\n          <ion-avatar item-start>\n            <shifuimageprofil size="40px" [user]="item.from"></shifuimageprofil>\n          </ion-avatar>\n          <span item-left>{{item.text}} - <shifutimer [end]="item.dtStart"></shifutimer></span>\n          <shifubutton [small]="true" item-end icon="trash" (click)="deleteScheduledMessage(item)"></shifubutton>\n        </ion-item>\n      </ion-item-sliding>\n    </ion-list>\n\n  </shifucard>\n\n  <!--</ion-col>-->\n  <!--<ion-col col-1 text-right>-->\n  <!--<img *ngIf="event.opened==true && message.text.length>0" id="btnSendMessage" src="./assets/img/send.png" style="width: 30px;height:30px;" (click)="sendmessage()">-->\n  <!--<img [hidden]="message.text.length>0" src="./assets/img/send.png" style="opacity:0.2;width: 30px;height:30px;">-->\n  <!--</ion-col>-->\n   <!--</ion-row>-->\n\n  <!--<div *ngIf="eventData.event.liveEmojis!=undefined">-->\n\n  <!--</div>-->\n\n  <!--<shifucard *ngIf="eventData.event.owner_id==userData.user.id" title="LIB.EVENTMASTER">-->\n    <!--<shifucheckbox label="LIB.PUBLISHONTWEETER" (onchange)="updateEvent()"></shifucheckbox>-->\n  <!--</shifucard>-->\n\n\n  <!-- Affichage des messages sous forme de conversation -->\n  <ion-list no-lines no-border>\n    <ion-item-sliding #slidingItem *ngFor="let item of messages">\n      <ion-item name="item_messages">\n        <ion-avatar item-start>\n          <shifuimageprofil [follower]="userData.user.id" size="40px" [user]="item.from" [me]="userData.user.id==item.from.id"></shifuimageprofil>\n        </ion-avatar>\n        <span item-left>{{item.text}}</span>\n        <img item-end class="image-photo" style="width:60px" *ngIf="item.photo.length>0" [src]="item.photo">\n      </ion-item>\n      <ion-item-options padding="3px" side="left">\n        <ion-icon color="primary" name="cmdLikeMessage" style="font-size: xx-large" *ngIf="item.canVote" name="thumbs-up" (click)="setScore(item,1)"></ion-icon>&nbsp;&nbsp;\n        <ion-icon color="primary" name="cmdDislikeMessage" style="font-size: xx-large" *ngIf="item.canVote" name="thumbs-down" (click)="setScore(item,-1)"></ion-icon>&nbsp;&nbsp;\n        <ion-icon color="primary" name="cmdDeleteMessage" style="font-size: xx-large"\n                  *ngIf="eventData.event.Moderators.indexOf(userData.user.id)>-1 || item.from.id==userData.user.id"\n                  name="trash" (click)="deleteMessage(item.id)">\n        </ion-icon>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\messages\messages.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.Events, ionic_angular_2.NavController, ionic_angular_2.NavParams, ionic_angular_2.ToastController, core_2.TranslateService,
            ionic_angular_1.AlertController, event_data_1.EventDataProvider, user_data_1.UserData])
    ], MessagesPage);
    return MessagesPage;
}());
exports.MessagesPage = MessagesPage;
//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var Tools = __webpack_require__(2);
var user_data_1 = __webpack_require__(8);
var event_data_1 = __webpack_require__(15);
var Maintools_1 = __webpack_require__(2);
var ionic_angular_2 = __webpack_require__(3);
var invite_1 = __webpack_require__(46);
var public_profil_1 = __webpack_require__(54);
var core_2 = __webpack_require__(7);
var wholikeme_1 = __webpack_require__(336);
var api_1 = __webpack_require__(16);
/**
 * Generated class for the ChartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChartsPage = /** @class */ (function () {
    function ChartsPage(events, navCtrl, navParams, translate, loadingCtrl, toastCtrl, modalCtrl, alertCtrl, api, eventData, userData) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.api = api;
        this.eventData = eventData;
        this.userData = userData;
        this.user = { connexions: [] };
        this.orderby = { critere: "scoreEvent" };
        this.users = [];
        this.invites = [];
        this.delay = "";
        this.target = null;
    }
    ChartsPage.prototype.update = function (critere, index) {
        this.orderby = critere;
    };
    ChartsPage.prototype.showUser = function (person) {
        Maintools_1.openModal(this.modalCtrl, public_profil_1.PublicProfilPage, { userid: person.id, follower: this.userData.user.id });
    };
    ChartsPage.prototype.changeEvent = function () {
        this.eventData.updateevent("maxOnline").subscribe(function (rep) { });
    };
    ChartsPage.prototype.ionViewDidLoad = function () {
        Tools.subscribe("charts", this);
        if (this.navParams.get("message") != undefined)
            Maintools_1.toast(this.toastCtrl, this.navParams.get("message"), this.translate);
    };
    ChartsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () { _this.refresh(true); }, 500);
    };
    ChartsPage.prototype.openInvite = function () {
        var delay = Tools.getDelayInMinutes(this.eventData.event.dtEnd);
        if (delay > 10)
            Maintools_1.openModal(this.modalCtrl, invite_1.InvitePage, { from: this.userData.user, event: this.eventData.event });
        else
            Maintools_1.toast(this.toastCtrl, "ERROR.NOTENOUGHTTIME", this.translate);
    };
    ChartsPage.prototype.setTarget = function (u) {
        this.target = u;
        this.refresh();
    };
    ChartsPage.prototype.clearTarget = function () {
        this.target = null;
        this.refresh();
    };
    ChartsPage.prototype.openWholikeme = function (target) {
        Maintools_1.openModal(this.modalCtrl, wholikeme_1.WholikemePage, { target: target });
    };
    ChartsPage.prototype.refresh = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (!force && this.userData.selectTab != undefined && this.userData.selectTab != "ChartsPage")
            return;
        this.delay = Tools.getDelay(this.eventData.event.dtEnd);
        var id = "";
        if (this.target != null)
            id = this.target.id;
        this.eventData.getinvites().subscribe(function (r) { _this.invites = r; });
        this.eventData.getpresents(true, id).subscribe(function (resp) {
            //this.users=$filter("orderBy")(resp.result.items,$scope.orderby.critere,true);
            if (resp != null) {
                _this.users = [];
                resp.items.forEach(function (it) {
                    it.total = it.nbDislike - it.nbLike; //Permet le classement inversé
                    _this.users.push(it);
                });
            }
        });
    };
    ;
    ChartsPage.prototype.GiveToAll = function () {
        var _this = this;
        Maintools_1.showPopup({ title: "CHARTS.GIVETOKENTOALLTITLE", placeholder: "LIB.AMOUNT", confirmButton: "LIB.OK", cancelButton: "LIB.CANCEL", type: "number", translate: this.translate }, this.alertCtrl, function (res) {
            if (res != null)
                _this.api.chargecredits(_this.userData.user.id, _this.eventData.event.id, res).subscribe(function (r) { });
        });
    };
    ChartsPage.prototype.GiveToNewcomer = function () {
        var _this = this;
        Maintools_1.showPopup({ title: "CHARTS.GIVETONEWCOMERTITLE", placeholder: "LIB.AMOUNT", confirmButton: "LIB.OK", cancelButton: "LIB.CANCEL", type: "number", translate: this.translate }, this.alertCtrl, function (res) {
            if (res != null) {
                _this.eventData.event.startJetons = res;
                _this.eventData.updateevent("startJetons").subscribe(function (r) { });
            }
        });
    };
    ChartsPage = __decorate([
        core_1.Component({
            selector: 'page-charts',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\charts\charts.html"*/'<!--\n  Generated template for the ChartsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle title="LIB.PERSONS">\n    <shifubutton [small]="true" *ngIf="eventData.online" icon="person-add" (click)="openInvite()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n<!--TODO: a voir qui fera l\'entrance-->\n<ion-content no-padding no-lines>\n\n  <tuto position="title" label="CHARTS.TUTO"></tuto>\n\n  <shifucard *ngIf="userData.user.id==eventData.event.owner_id"\n             icon="desktop" (onclick)="events.publish(\'open:widget\',\'people\')"\n             title="LIB.EVENTMASTER">\n\n    <ion-item>\n      {{\'CHARTS.GIVESCOIN\' | translate}}:\n      <shifubutton [small]="true" size="100" item-end id="cmdGiveToAll" label="CHARTS.GIVEALL" (click)="GiveToAll()"></shifubutton>\n      <shifubutton [small]="true" size="100" item-end id="cmdGiveToNew" label="CHARTS.BONUSFORNEWCOMER" (click)="GiveToNewcomer()"></shifubutton>\n    </ion-item>\n\n    <shifurange id="txtMaxOnline" icon="person" *ngIf="userData.user.connexions.length>20 && users.length/userData.user.tarif.max_guests>0.6"\n                label="ADDEVENT.MAXGUEST" unite="{{\'LIB.PERSON\' | translate}}"\n                [(ngModel)]="eventData.event.maxOnline"\n                min="0" max="userData.user.tarif.max_guests" step="1"\n                (onchange)="changeEvent()"></shifurange>\n\n    <ion-list no-lines *ngIf="invites!=null && invites.length>0">\n      <ion-list-header>Invites</ion-list-header>\n      <ion-item *ngFor="let user of invites">\n        <ion-avatar item-start>\n          <shifuimageprofil [follower]="userData.user.id" [user]="user"></shifuimageprofil>\n        </ion-avatar>\n        <span style="font-size: large;">{{user.firstname}}</span>\n      </ion-item>\n    </ion-list>\n\n\n  </shifucard>\n\n\n  <ion-item text-center *ngIf="target!=null">\n    <shifubutton label="Clear" (click)="clearTarget()"></shifubutton>\n    <h1>{{target.firstname}} aime :</h1>\n  </ion-item>\n\n  <ion-list id="present_users" no-lines no-border>\n    <!--<ion-list-header>-->\n      <!--<shifubutton id="btnCredit" label="Score" (click)="update(\'creditEvent\',0)">{{\'LIB.CREDITS\' | translate}}</shifubutton>-->\n      <!--<shifubutton id="btnScore" label="Credit" (click)="update(\'scoreEvent\',1)">{{\'LIB.NOTORIETY\' | translate}}</shifubutton>-->\n    <!--</ion-list-header>-->\n\n    <ion-item-sliding *ngFor="let user of users | orderBy : \'total\' " style="padding: 4px;">\n      <ion-item *ngIf="target==null || user.id!=target.id">\n\n        <ion-avatar item-start>\n          <shifuimageprofil [me]="user.id==userData.user.id" [follower]="userData.user.id" shifuid="users" [user]="user"></shifuimageprofil>\n          <!--<shifuimageprofil style="opacity: 0.5" *ngIf="!user.online" [follower]="userData.user.id" shifuid="users" [user]="user"></shifuimageprofil>-->\n        </ion-avatar>\n        <span *ngIf="user.online" style="font-size: large;">{{user.firstname}}</span>\n        <span *ngIf="!user.online" style="font-size: large;color:darkgrey;">{{user.firstname}}</span>\n        <span *ngIf="user.id==eventData.event.owner_id" style="font-size: small">(Master)</span>\n        <span *ngIf="user.id!=eventData.event.owner_id && eventData.event.Moderators.indexOf(user.id)>-1" style="font-size: small">(Moderateur)</span>\n\n\n        <span *ngIf="userData.user.id==eventData.event.owner_id && user.jetons!=undefined && user.id!=userData.user.id">\n          ({{user.jetons[eventData.event.owner_id]}}&nbsp;<img src="./assets/img/money.png" style="width:15px;">)\n        </span>\n\n\n        <ion-note item-end style="font-size: large">\n          <shifunote shifuid="notesPerson" [object]="user" (click)="openWholikeme(user)"></shifunote>\n          <!--<span *ngIf="orderby.critere==\'scoreEvent\'" style="font-size:large"><span *ngIf="user.scoreEvent>0">+</span>{{user.scoreEvent | number:"1.0"}}</span>&nbsp;-->\n          <!--<span *ngIf="orderby.critere==\'creditEvent\'" style="font-size:large"><span *ngIf="user.creditEvent>0">+</span>{{user.creditEvent | number:"1.0"}}</span>&nbsp;<img src="./assets/img/money.png" class="money-small">-->\n        </ion-note>\n\n      </ion-item>\n      <ion-item-options>\n        <!--<span *ngIf="orderby.critere==\'scoreEvent\'" style="font-size:large">{{user.score | number:"1.0"}}</span>&nbsp;-->\n        <!--<span *ngIf="orderby.critere==\'creditEvent\'" style="font-size:large">{{user.credit | number:"1.0"}}</span>-->\n        <button ion-button color="seconday" (click)="setTarget(user)">\n          {{\'LIB.WHO\' | translate}}\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\charts\charts.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.Events, ionic_angular_2.NavController, ionic_angular_2.NavParams,
            core_2.TranslateService, ionic_angular_1.LoadingController, ionic_angular_1.ToastController,
            ionic_angular_2.ModalController, ionic_angular_1.AlertController, api_1.ApiProvider,
            event_data_1.EventDataProvider, user_data_1.UserData])
    ], ChartsPage);
    return ChartsPage;
}());
exports.ChartsPage = ChartsPage;
//# sourceMappingURL=charts.js.map

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var event_data_1 = __webpack_require__(15);
var core_2 = __webpack_require__(7);
/**
 * Generated class for the WholikemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WholikemePage = /** @class */ (function () {
    function WholikemePage(navCtrl, navParams, viewCtrl, translate, loadingCtrl, modalCtrl, alertCtrl, eventData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.eventData = eventData;
        this.target = {};
        this.users = [];
    }
    WholikemePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.target = this.navParams.get("target");
        this.eventData.getuserslikeme(this.target.id).subscribe(function (r) {
            if (r.items != undefined) {
                _this.users = [];
                r.items.forEach(function (it) {
                    it.total = it.nbDislike - it.nbLike; //Permet le classement inversé
                    if (it.nbDislike > 0 || it.nbLike > 0)
                        _this.users.push(it);
                });
            }
            else
                _this.viewCtrl.dismiss();
        });
    };
    WholikemePage = __decorate([
        core_1.Component({
            selector: 'page-wholikeme',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\wholikeme\wholikeme.html"*/'<!--\n  Generated template for the WholikemePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle label="WHOLIKEME.TITLE">\n    <shifubutton [small]="true" id="btnClose" icon="close" (click)="viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n\n<ion-content no-padding>\n  <h1>Qui aime {{target.firstname}} ?</h1>\n  <ion-item *ngFor="let user of users | orderBy : \'total\'">\n    <ion-avatar item-start>\n      <shifuimageprofil shifuid="users" [user]="user"></shifuimageprofil>\n    </ion-avatar>\n    <span style="font-size: large;">{{user.firstname}}</span>\n    <ion-note item-end style="font-size: large" >\n      <shifunote [object]="user"></shifunote>\n    </ion-note>\n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\wholikeme\wholikeme.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.NavParams, ionic_angular_1.ViewController,
            core_2.TranslateService, ionic_angular_1.LoadingController,
            ionic_angular_1.ModalController, ionic_angular_1.AlertController,
            event_data_1.EventDataProvider])
    ], WholikemePage);
    return WholikemePage;
}());
exports.WholikemePage = WholikemePage;
//# sourceMappingURL=wholikeme.js.map

/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var api_1 = __webpack_require__(16);
var user_data_1 = __webpack_require__(8);
var Maintools_1 = __webpack_require__(2);
var closedevent_1 = __webpack_require__(108);
var core_2 = __webpack_require__(7);
var addevent_1 = __webpack_require__(82);
var invite_1 = __webpack_require__(46);
/**
 * Generated class for the OldeventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OldeventsPage = /** @class */ (function () {
    function OldeventsPage(navCtrl, userData, alertCtrl, api, navParams, loadingCtrl, translate, eventBus, toastCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.userData = userData;
        this.alertCtrl = alertCtrl;
        this.api = api;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.eventBus = eventBus;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.events = [];
        this.myevents = [];
    }
    OldeventsPage.prototype.ionViewDidLoad = function () {
        this.refresh();
    };
    OldeventsPage.prototype.refresh = function () {
        var _this = this;
        //var l=loading(this,"Loading",3);
        //Récupération des meilleurs événements pour moi
        var vm = this;
        vm.api.geteventsfrom(this.userData.user.id, 20, false).subscribe(function (r) {
            if (r != null && r.items != undefined) {
                vm.myevents = [];
                vm.events = [];
                r.items.forEach(function (evt) {
                    if (evt.owner_id == _this.userData.user.id)
                        vm.myevents.push(evt);
                    else {
                        //L'événement ne doit pas être dans les événements conseillés pour moi
                        vm.events.push(evt);
                    }
                });
            }
        });
    };
    OldeventsPage.prototype.deleteEvent = function (evt) {
        var _this = this;
        Maintools_1.$$("Suppression de " + evt.id);
        this.userData.delevent(evt.id).subscribe(function (r) {
            _this.refresh();
        });
    };
    OldeventsPage.prototype.joinEvent = function (evt) {
        var vm = this;
        var param = { event: evt, user: vm.userData.user, type: 1, url: "index.html?event=" + evt.id + "&from=" + vm.userData.user.id };
        vm.eventBus.publish("event:login", param);
    };
    OldeventsPage.prototype.openEvent = function (evt) {
        Maintools_1.openModal(this.modalCtrl, closedevent_1.ClosedeventPage, { event: evt });
    };
    OldeventsPage.prototype.addEvent = function () {
        var _this = this;
        Maintools_1.openModal(this.modalCtrl, addevent_1.AddeventPage, { user: this.userData.user }, function (evt) {
            _this.refresh();
        });
    };
    OldeventsPage.prototype.inviteEvent = function (evt) {
        Maintools_1.openModal(this.modalCtrl, invite_1.InvitePage, { event: evt });
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Content),
        __metadata("design:type", ionic_angular_1.Content)
    ], OldeventsPage.prototype, "content", void 0);
    OldeventsPage = __decorate([
        core_1.Component({
            selector: 'page-oldevents',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\oldevents\oldevents.html"*/'<!--\n  Generated template for the OldeventsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle title="LIB.MYEVENTS" help="#">\n    <shifubutton\n      [small]="true" size="110"\n      tips="Créer votre propre événement" [small]="events.length+myevents.length>0"\n      id="btnAddEvent" icon="add-circle"\n      label="SELEVENT.CREATE" (click)="addEvent()">\n    </shifubutton>\n\n  </shifutitle>\n</ion-header>\n\n<ion-content no-padding>\n  <tuto position="title" [if]="myevents.length>0" help="tuto_myfirstevent" label="OLDEVENTS.TUTO_FIRSTEVENTS"></tuto>\n\n  <ion-item text-wrap no-lines text-center *ngIf="events.length+myevents.length==0">\n    {{"OLDEVENTS.TUTO" | translate}}<br>\n  </ion-item>\n\n  <div *ngIf="events.length+myevents.length>0">\n    <tuto [if]="userData.user.nEventCreated>0" label="TUTO.FIRSTEVENTCREATED"></tuto>\n\n    <shifucard [visible]="myevents.length>0" id="MyEvents" title="LIB.MYEVENTS">\n      <div *ngFor="let event of myevents" style="display:inline-block;width:150px;margin:5px;">\n        <shifuflyer style="marge:5px" [closed]="event.closed" [flyer]="event.flyer" size="100%">\n          <div style="width:100%;text-align: center">\n            <br>\n            <ion-buttons *ngIf="event.closed==false">\n              <shifubutton shifuid="btnJoin" label="LIB.JOIN" (click)="joinEvent(event)"></shifubutton><br><br>\n              <shifubutton shifuid="btnInvite" icon="person-add" (click)="inviteEvent(event)"></shifubutton>\n            </ion-buttons>\n            <ion-item text-center *ngIf="event.closed==false">\n              {{\'LIB.EVENTCODE\' | translate}}<br>\n              {{event.code}}\n            </ion-item>\n\n            <ion-buttons *ngIf="event.closed==true">\n              <shifubutton shifuid="btnDelete" [small]="true" icon="trash" (click)="deleteEvent(event)"></shifubutton>\n              <shifubutton shifuid="btnView" [small]="true" icon="eye" (click)="openEvent(event)"></shifubutton>\n            </ion-buttons>\n\n          </div>\n        </shifuflyer>\n      </div>\n    </shifucard>\n  </div>\n\n  <shifucard *ngIf="events.length>0" [visible]="true" id="ParticipedEvents"  title="OLDEVENTS.PARTICIPATEDEVENT" tuto="OLDEVENTS.TUTO_PARTICIPEDEVENTS">\n    <div *ngFor="let event of events" style="display:inline-block;width:150px;margin:5px;">\n      <shifuflyer style="marge:5px" [closed]="event.closed" [flyer]="event.flyer" size="100%">\n        <ion-item text-center no-border no-lines>\n          <shifubutton *ngIf="event.closed" [small]="true" label="LIB.VIEW" (click)="openEvent(event)"></shifubutton>\n          <shifubutton *ngIf="!event.closed" [small]="true" label="LIB.JOIN" (click)="joinEvent(event)"></shifubutton>\n        </ion-item>\n      </shifuflyer>\n    </div>\n  </shifucard>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\oldevents\oldevents.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_2.NavController, user_data_1.UserData, ionic_angular_1.AlertController,
            api_1.ApiProvider, ionic_angular_1.NavParams, ionic_angular_1.LoadingController,
            core_2.TranslateService, ionic_angular_2.Events, ionic_angular_1.ToastController,
            ionic_angular_2.ModalController])
    ], OldeventsPage);
    return OldeventsPage;
}());
exports.OldeventsPage = OldeventsPage;
//# sourceMappingURL=oldevents.js.map

/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var settings_1 = __webpack_require__(23);
var AboutPage = /** @class */ (function () {
    function AboutPage(settings, viewCtrl) {
        this.settings = settings;
        this.viewCtrl = viewCtrl;
        this.version = "";
    }
    AboutPage = __decorate([
        core_1.Component({
            selector: 'page-about',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\about\about.html"*/'<ion-header>\n  <shifutitle title="LIB.ABOUT">\n  </shifutitle>\n</ion-header>\n\n<ion-content text-center>\n  <ion-item text-center no-lines>\n    {{settings.app_name}} - version {{settings.app_version}}\n  </ion-item>\n  <iframe\n    [src]="settings.about_url  | safe"\n    width="94%"\n    style="margin:3%;border: none;"\n    height="80%">\n  </iframe>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [settings_1.SettingsProvider, ionic_angular_1.ViewController])
    ], AboutPage);
    return AboutPage;
}());
exports.AboutPage = AboutPage;
//# sourceMappingURL=about.js.map

/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WelcomePage = /** @class */ (function () {
    function WelcomePage(navParams, viewCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.image = "";
        this.image = this.navParams.get("image");
    }
    WelcomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.navParams.get("duration") > 0)
            setTimeout(function () {
                _this.viewCtrl.dismiss();
            }, this.navParams.get("duration"));
    };
    WelcomePage = __decorate([
        core_1.Component({
            selector: 'page-welcome',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\welcome\welcome.html"*/'<!--\n  Generated template for the WelcomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content no-padding no-border no-margin no-bounce>\n  <img src="{{image}}" style="height:100%;" (click)="viewCtrl.dismiss()">\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\welcome\welcome.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.NavParams, ionic_angular_1.ViewController])
    ], WelcomePage);
    return WelcomePage;
}());
exports.WelcomePage = WelcomePage;
//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var core_2 = __webpack_require__(7);
var platform_browser_1 = __webpack_require__(21);
var user_data_1 = __webpack_require__(8);
/**
 * Generated class for the TermOfUsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TermOfUsePage = /** @class */ (function () {
    function TermOfUsePage(navCtrl, navParams, translate, domSanitizer, userData, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.domSanitizer = domSanitizer;
        this.userData = userData;
        this.viewCtrl = viewCtrl;
    }
    TermOfUsePage.prototype.ionViewDidEnter = function () {
        this.page.nativeElement.contentDocument.body.innerHTML = this.navParams.get("CG");
    };
    __decorate([
        core_1.ViewChild("page"),
        __metadata("design:type", core_1.ElementRef)
    ], TermOfUsePage.prototype, "page", void 0);
    TermOfUsePage = __decorate([
        core_1.Component({
            selector: 'page-term-of-use',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\term-of-use\term-of-use.html"*/'<!--\n  Generated template for the TermOfUsePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <shifutitle label="LIB.TERMOFUSE">\n    <shifubutton id="btnAgree" icon="checkmark" label="LIB.AGREE" (click)="viewCtrl.dismiss(true)"></shifubutton>\n    <shifubutton id="btnDisagree" icon="close" label="LIB.DISAGREE" (click)="viewCtrl.dismiss(false)"></shifubutton>\n  </shifutitle>\n\n</ion-header>\n\n\n<ion-content no-padding no-border no-lines overflow-scroll="true">\n    <iframe style="width:100%;height: 100%" #page></iframe>\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\term-of-use\term-of-use.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.NavParams,
            core_2.TranslateService, platform_browser_1.DomSanitizer,
            user_data_1.UserData, ionic_angular_1.ViewController])
    ], TermOfUsePage);
    return TermOfUsePage;
}());
exports.TermOfUsePage = TermOfUsePage;
//# sourceMappingURL=term-of-use.js.map

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__(355);
var app_module_1 = __webpack_require__(475);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var Maintools_1 = __webpack_require__(2);
var Maintools_2 = __webpack_require__(2);
var Maintools_3 = __webpack_require__(2);
var user_data_1 = __webpack_require__(8);
var core_2 = __webpack_require__(7);
var api_1 = __webpack_require__(16);
var settings_1 = __webpack_require__(23);
var ImageCreatorPage = /** @class */ (function () {
    function ImageCreatorPage(navCtrl, navParams, api, toastCtrl, viewCtrl, userData, loadingCtrl, translate, alertCtrl, settings) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.userData = userData;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.settings = settings;
        this.images = [];
        this.valide = false;
        this.img = { src: "" };
        this.imgHD = { src: "" };
        this.x = 0;
        this.y = 0;
        this.scale = 1;
        this.width = 0;
        this.height = 0;
        this.ech = 100;
        this.angle = 0;
        this.lastdist = 0;
        this._DRAGGGING_STARTED = 0;
        this._LAST_MOUSE_POSITION = { x: null, y: null };
    }
    ImageCreatorPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var ratio = this.navParams.data.ratio;
        if (ratio == null)
            ratio = 1;
        var h = (this.cadre.nativeElement.clientWidth * ratio);
        this.cadre.nativeElement.style.height = h + "px";
        this.cadre.nativeElement.style.width = this.cadre.nativeElement.clientWidth + "px";
        if (this.settings.lastImages.length > 0)
            this.images = this.settings.lastImages;
        else {
            this.userData.getPreviousImages(20).subscribe(function (rep) {
                if (rep != null) {
                    _this.images = [];
                    rep.items.forEach(function (img) {
                        if (img.title.indexOf(".svg") == -1)
                            _this.images.push(img);
                    });
                }
            });
        }
    };
    /**
     *
     * @param event
     */
    ImageCreatorPage.prototype.mousemove = function (event) {
        event.preventDefault();
        var dist = 0;
        var change_x = 0;
        var change_y = 0;
        if (event.touches != undefined) {
            if (event.touches.length == 1) {
                event.offsetX = event.touches[0].clientX;
                event.offsetY = event.touches[0].clientY;
            }
            if (event.touches.length == 2) {
                dist = Math.abs(event.touches[0].clientX - event.touches[1].clientX) + Math.abs(event.touches[0].clientY - event.touches[1].clientY);
            }
        }
        if (this._DRAGGGING_STARTED == 1) {
            var current_mouse_position = { x: event.offsetX, y: event.offsetY };
            change_x = current_mouse_position.x - this._LAST_MOUSE_POSITION.x;
            change_y = current_mouse_position.y - this._LAST_MOUSE_POSITION.y;
            /* Save mouse position */
            this._LAST_MOUSE_POSITION = current_mouse_position;
            if (event.touches != undefined && event.touches.length == 2) {
                if (dist > this.lastdist)
                    this.mousewheel({ wheelDelta: 1 });
                else
                    this.mousewheel({ wheelDelta: -1 });
                this.lastdist = dist;
            }
            else {
                if (event.target.parentElement != null) {
                    var limitX = event.target.parentElement.clientWidth - event.target.clientWidth;
                    var limitY = event.target.parentElement.clientHeight - event.target.clientHeight;
                    if (limitY > 0)
                        limitY = 0;
                    if (limitX > 0)
                        limitX = 0;
                    if (this.x + change_x > 0)
                        change_x = -this.x; //|| this.x-change_x<this.lacarte.nativeElement.width
                    if (this.y + change_y > 0)
                        change_y = -this.y; //|| this.y-change_y<this.lacarte.nativeElement.height
                    if (this.x + change_x < limitX)
                        change_x = -this.x + limitX;
                    if (this.y + change_y < limitY)
                        change_y = -this.y + limitY;
                }
                if (change_x != 0 || change_y != 0) {
                    this.y = this.y + change_y;
                    this.x = this.x + change_x;
                    this.img.style.top = this.y + "px";
                    this.img.style.left = this.x + "px";
                }
            }
        }
    };
    ImageCreatorPage.prototype.mousewheel = function (event) {
        if (this.img.src.length > 0) {
            if (event.wheelDelta > 0)
                this.scale += 0.01;
            else {
                if (this.img.width + this.x < this.img.parentElement.clientWidth)
                    return;
                if (this.img.height + this.y < this.img.parentElement.clientHeight)
                    return;
                this.scale -= 0.01;
            }
            this.ech = this.scale * 100;
            this.img.style.width = (this.width * this.scale) + "px";
            this.img.style.height = (this.height * this.scale) + "px";
        }
    };
    ImageCreatorPage.prototype.mousedown = function (event) {
        this._DRAGGGING_STARTED = 1;
        if (event.touches != undefined) {
            if (event.touches.length == 1) {
                event.offsetX = event.touches[0].clientX;
                event.offsetY = event.touches[0].clientY;
                this._LAST_MOUSE_POSITION = { x: event.offsetX, y: event.offsetY };
            }
            else {
                this.lastdist = Math.abs(event.touches[0].clientX - event.touches[1].clientX) + Math.abs(event.touches[0].clientY - event.touches[1].clientY);
            }
        }
    };
    ImageCreatorPage.prototype.mouseup = function (event) {
        this._DRAGGGING_STARTED = 0;
    };
    ImageCreatorPage.prototype.onChange = function (fileInput) {
        var vm = this;
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                vm.loadImage(e.target.result);
            };
            reader.readAsDataURL(fileInput.target.files[0]);
        }
    };
    ImageCreatorPage.prototype.rotateImage = function (angle) {
        var vm = this;
        this.angle = this.angle + angle;
        this.scale = 1;
        this.x = 0;
        this.y = 0;
        Maintools_3.rotate(this.img.src, this.angle, 0.3, function (resp) {
            vm.img.src = resp;
        });
    };
    ImageCreatorPage.prototype.getMyCloudFile = function () {
        var vm = this;
        var loader = Maintools_2.loading(vm);
        Maintools_3.openGeneral("instagram", this.userData.user).then(function () {
            vm.userData.getImagesFromMyCloud().subscribe(function (rep) {
                loader.dismiss();
                rep.items.forEach(function (p) {
                    vm.images.push(p);
                });
            }, function (err) {
                loader.dismiss();
            });
        });
    };
    ImageCreatorPage.prototype.imagePlatform = function (service) {
        var vm = this;
        vm.images = [];
        Maintools_3.showPopup({
            title: "PHOTO.KEYWORDSEARCH",
            default: this.settings.lastSearchImage,
            confirmButton: "LIB.OK",
            cancelButton: "LIB.CANCEL",
            translate: this.translate,
            type: "text"
        }, this.alertCtrl, function (res) {
            if (res != null) {
                res = res.replace("\#", "");
                var loader_1 = Maintools_2.loading(vm);
                vm.userData.getImageForFlyer(service, res, null, null).subscribe(function (resp) {
                    loader_1.dismiss();
                    if (resp.items.length == 0) {
                        Maintools_3.toast(vm.toastCtrl, "IMAGECREATOR.NOIMAGE", vm.translate);
                    }
                    else {
                        resp.items.forEach(function (p) {
                            vm.images.push(p);
                        });
                        vm.settings.lastImages = vm.images;
                        vm.settings.lastSearchImage = res;
                    }
                }, function (err) {
                    loader_1.dismiss();
                });
            }
        });
    };
    ;
    /**
     * Fonction principal appelé pour le chargement de la preview par toutes les sources
     * @param {string} src
     */
    ImageCreatorPage.prototype.loadImage = function (src, func) {
        if (func === void 0) { func = null; }
        this.imgHD.src = src;
        var vm = this;
        Maintools_3.resizeBase64Img(src, null, 0.3, function (src) {
            vm.x = 0;
            vm.y = 0;
            vm.scale = 1;
            if (vm.img.src.length > 0) {
                if (vm.img.parentElement == vm.cadre.nativeElement)
                    vm.cadre.nativeElement.removeChild(vm.img);
            }
            vm.img = new Image();
            vm.img.onload = function () {
                vm.valide = true;
                vm.width = this.width;
                vm.height = this.height;
                vm.scale = Math.max(vm.cadre.nativeElement.clientWidth / this.width, vm.cadre.nativeElement.clientHeight / this.height);
                vm.ech = vm.scale * 100;
                this.style.maxWidth = "10000px";
                this.style.maxHeight = "10000px";
                var lx = this.width * vm.scale;
                var ly = this.height * vm.scale;
                this.style.width = lx + "px";
                this.style.height = ly + "px";
                vm.cadre.nativeElement.appendChild(this);
                vm.cadre.nativeElement.style.visibility = "visible";
                this.style.position = "relative";
                //Permet un cadrage initial sur le centre de l'image
                var x = (vm.cadre.nativeElement.clientWidth - lx) / 4;
                var y = (vm.cadre.nativeElement.clientHeight - ly) / 4;
                //this.style.left=vm.x+"px";
                //this.style.top=vm.y+"px"
                vm.mousedown({});
                vm.mousemove({ preventDefault: function () { }, target: this, offsetX: x, offsetY: y, touches: [] });
                vm.mouseup({});
                if (func != null)
                    func();
            };
            if (src.indexOf("http") == 0) {
                vm.api.uploadimage(true, Maintools_1.createPhoto(vm.userData.user, src)).subscribe(function (resp) {
                    vm.img.crossOrigin = "anonymous";
                    vm.img.src = resp.content;
                    if (func != null)
                        func();
                }, function (err) {
                    Maintools_1.$$("erreur d'upload" + err);
                    func();
                });
            }
            else
                vm.img.src = src;
        });
    };
    ImageCreatorPage.prototype.addLink = function () {
        var vm = this;
        Maintools_3.showPopup({
            title: "LIB.WEBLINK",
            confirmButton: "LIB.OK",
            cancelButton: "LIB.CANCEL",
            translate: this.translate,
            type: "text"
        }, this.alertCtrl, function (res) {
            vm.api.uploadimage(true, Maintools_1.createPhoto(vm.userData.user, res)).subscribe(function (res) {
                if (res == null)
                    Maintools_3.toast(vm.toastCtrl, "ERROR.BADFORMAT", vm.translate);
                else
                    vm.loadImage(res.content);
            });
        });
    };
    //Fonction de récupération de l'image
    ImageCreatorPage.prototype.selImage = function (img) {
        var _this = this;
        this.images = [];
        var l = Maintools_2.loading(this, this.translate.instant("LIB.UPLOADING"));
        this.api.uploadimage(true, Maintools_1.createPhoto(this.userData.user, img.photo)).subscribe(function (res) {
            _this.loadImage(res.content, function () {
                l.dismiss();
            });
        }, function (err) {
            Maintools_3.toast(_this.toastCtrl, "LIB.ERRORRETRY", _this.translate);
            l.dismiss();
        });
    };
    ImageCreatorPage.prototype.getPhoto = function (event, withText, instantpost, func) {
        if (withText === void 0) { withText = false; }
        if (instantpost === void 0) { instantpost = true; }
        if (func === void 0) { func = undefined; }
        var vm = this;
        var l = Maintools_2.loading(this);
        setTimeout(function () {
            Maintools_1.autoRotate(event.value, 1.0, function (res) {
                vm.loadImage(res, function () {
                    l.dismiss();
                });
            });
        }, 100);
    };
    ImageCreatorPage.prototype.close = function () {
        var _this = this;
        var vm = this;
        this.img.crossOrigin = "anonymous";
        var s = this.img.src;
        var quality = 1e6 / s.length;
        if (quality > 1)
            quality = 1;
        var x = -this.x / this.scale;
        var y = -this.y / this.scale;
        var lx = Math.min(this.cadre.nativeElement.offsetWidth / this.scale, this.img.width / this.scale);
        var ly = Math.min(this.cadre.nativeElement.offsetHeight / this.scale, this.img.height / this.scale);
        //if(getEnv()==0)s=s.replace("http://localhost:8080","");
        //On repart de la source
        var loader = Maintools_2.loading(this);
        setTimeout(function () {
            Maintools_3.rotate(_this.imgHD.src, _this.angle, 1.0, function (res) {
                Maintools_1.cropBase64Img(res, x, y, lx, ly, 0.5, function (resp) {
                    if (vm.navParams.get("upload")) {
                        var p = Maintools_1.createPhoto(vm.userData.user, resp);
                        vm.api.uploadimage(false, p).subscribe(function (resp) {
                            loader.dismiss();
                            vm.viewCtrl.dismiss({ value: resp.url });
                        }, function (err) {
                            Maintools_3.toast(vm.toastCtrl, "LIB.ERRORRETRY", vm.translate);
                            loader.dismiss();
                            vm.viewCtrl.dismiss();
                        });
                    }
                    else {
                        loader.dismiss();
                        vm.viewCtrl.dismiss({ value: resp });
                    }
                }, function (r) {
                    Maintools_3.toast(vm.toastCtrl, "LIB.ERRORRETRY", vm.translate);
                    loader.dismiss();
                    vm.viewCtrl.dismiss();
                });
            });
        }, 100);
    };
    __decorate([
        core_1.ViewChild("cadre"),
        __metadata("design:type", core_1.ElementRef)
    ], ImageCreatorPage.prototype, "cadre", void 0);
    ImageCreatorPage = __decorate([
        core_1.Component({
            selector: 'page-image-creator',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\image-creator\image-creator.html"*/'<!--\n  Generated template for the ImageCreatorPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n<shifutitle title="Images">\n  <shifubutton id="btnSaveImage" [hidewhenclick]="true" [small]="true" id="btnValide" *ngIf="valide" label="LIB.SAVE" icon="checkmark" (click)="close()"></shifubutton>\n  <shifubutton [small]="true" id="btnCancel" icon="close" (click)="viewCtrl.dismiss()"></shifubutton>\n</shifutitle>\n</ion-header>\n\n<ion-content padding>\n\n  <tuto position="title" [if]="images.length==0" label="IMAGECREATOR.TUTO"></tuto>\n  <tuto position="title" [if]="images.length>0" label="IMAGECREATOR.TUTOWITHIMAGE"></tuto>\n\n  <div style="width:100%;text-align: center;">\n\n    <div *ngIf="userData.user.connexions.length>20">\n      <shifucamera shifuid="btnTakePhoto" sizeiconwidth="20px"\n                   tips="Prendre une photo avec son appareil"\n                   sizeiconheight="20px" icon="camera"\n                   (onTake)="getPhoto($event,true,false)"></shifucamera>\n\n      <shifubutton\n        shifuid="btnAddCloudFile"\n        icon="image"\n        tips="Selectionner une photo depuis des banques d\'images publique (Instagram, ...)"\n        (click)="imagePlatform(\'pixabay,fotocommunity,instagram\')">\n      </shifubutton>\n\n      <shifubutton\n        shifuid="btnAddLink"\n        icon="link"\n        tips="Prendre directement une photo depuis son lien internet (URL)"\n        (click)="addLink()">\n      </shifubutton>\n\n      <shifubutton\n        *ngIf="userData.user.connexions.length>50"\n        tips="Sélectionner une photo de mon cloud (Instagram, Google Drive)"\n        shifuid="btnMyFile"  icon="person"\n        (click)="getMyCloudFile()">\n      </shifubutton>\n\n      <!--<shifubutton id="btnCloud" icon="cloud-upload" (click)="getFiles()"></shifubutton>-->\n      <shifucamera\n        shifuid="btnTakeFile"\n        tips="Sélectionner une photo stockée sur mon téléphone"\n        [onlyfile]="true"\n        icon="phone-portrait"\n        (onTake)="getPhoto($event,true,false)">\n      </shifucamera>\n\n    </div>\n\n    <div *ngIf="userData.user.connexions.length<=20">\n      <shifucamera size="130" shifuid="btnTakePhoto" sizeiconwidth="20px" sizeiconheight="20px" button="Photo" icon="camera" (onTake)="getPhoto($event,true,false)"></shifucamera>\n      <shifubutton size="130" shifuid="btnAddCloudFile" icon="image" label="Internet" (click)="imagePlatform(\'pixabay,fotocommunity,instagram\')"></shifubutton>\n      <shifucamera size="130" shifuid="btnTakeFile" [onlyfile]="true" button="LIB.PHONE" icon="phone-portrait" (onTake)="getPhoto($event,true,false)"></shifucamera>\n    </div>\n\n    <br>\n      <img *ngFor="let img_item of images"\n           name="flyerImages"\n           src="{{img_item.photo}}"\n           style="display:inline;width:20%;"\n           class="image-photo"\n           (click)="selImage(img_item)">\n\n    <div #cadre class="image-photo"\n         style="visibility:hidden;margin-top:5px;margin-bottom:5px;cursor:move;overflow: hidden;display:inline-block;width:90%;box-shadow: 3px 3px 5px #bfbfbf;border:1px solid #efeef4;"\n         (mousemove)="mousemove($event)"\n         (touchmove)="mousemove($event)"\n         (touchend)="mouseup($event)"\n         (mouseup)="mouseup($event)"\n         (mousedown)="mousedown($event)"\n         (mousewheel)="mousewheel($event)"\n         (touchstart)="mousedown($event)">\n    </div>\n\n    <div *ngIf="img.src.length>0" style="width:100%;text-align: center;">\n      <tuto label="IMAGECREATOR.TUTOWITHIMAGE"></tuto>\n      <shifubutton icon="add-circle" (click)="mousewheel({wheelDelta:+1})"></shifubutton>\n      <!--<shifubutton icon="./assets/img/rotate_left.png" id="btnRotateLeft" (click)="rotateImage(-90)"></shifubutton>-->\n      <!--<shifubutton icon="./assets/img/rotate_right.png" id="btnRotateRight" (click)="rotateImage(+90)"></shifubutton>-->\n      <shifubutton icon="remove-circle" (click)="mousewheel({wheelDelta:-1})"></shifubutton>\n    </div>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\image-creator\image-creator.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_2.NavController, ionic_angular_2.NavParams, api_1.ApiProvider, ionic_angular_2.ToastController,
            ionic_angular_2.ViewController, user_data_1.UserData, ionic_angular_1.LoadingController,
            core_2.TranslateService, ionic_angular_1.AlertController,
            settings_1.SettingsProvider])
    ], ImageCreatorPage);
    return ImageCreatorPage;
}());
exports.ImageCreatorPage = ImageCreatorPage;
//# sourceMappingURL=image-creator.js.map

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var Tools = __webpack_require__(2);
var user_data_1 = __webpack_require__(8);
var event_data_1 = __webpack_require__(15);
var Maintools_1 = __webpack_require__(2);
var core_2 = __webpack_require__(7);
var api_1 = __webpack_require__(16);
/**
 * Generated class for the InvitePage page.
 *
 * Parametres : url,event,from,message,type,tab (tab destinataire)
 */
var InvitePage = /** @class */ (function () {
    function InvitePage(viewCtrl, toastCtrl, navCtrl, alertCtrl, navParams, api, loadingCtrl, userData, translate, eventData) {
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.api = api;
        this.loadingCtrl = loadingCtrl;
        this.userData = userData;
        this.translate = translate;
        this.eventData = eventData;
        this.email = { dest: "", personal: false };
        this.autologin = { value: false };
        this.numberOfInvitation = 0;
        this.qrcode = "";
        this.url = "";
        this.forceAnonymous = true;
        this.event = null;
        //Chargement des contacts
        if (this.userData.friends.length == 0)
            userData.loadcontacts();
        //Initialisation de l'event
        this.event = navParams.get("event");
        if (this.event == null)
            this.event = this.eventData.event;
    }
    InvitePage.prototype.ionViewDidLoad = function () {
        this.autologin.value = (this.event.autologin == 2);
        this.refresh();
    };
    InvitePage.prototype.refresh = function (large_url) {
        if (large_url === void 0) { large_url = null; }
        var vm = this;
        if (large_url == null)
            large_url = this.navParams.get("url");
        if (large_url == null) {
            var l = Maintools_1.loading(this);
            this.userData.shareevent(this.event.id, this.navParams.get("message"), this.navParams.get("tab"), "link", this.forceAnonymous).subscribe(function (r) {
                l.dismiss();
                if (r != null) {
                    vm.qrcode = r.qrcode;
                    vm.url = r.url;
                }
            });
        }
        else {
            //On charge juste le QRCOde puisqu'on a déjà une url
            this.api.getqrcode(large_url + "&anonymous=" + this.forceAnonymous, 150).subscribe(function (r) {
                if (r != null) {
                    vm.qrcode = r.photo;
                    vm.url = r.title;
                }
            });
        }
    };
    InvitePage.prototype.copyLink = function () {
        Maintools_1.toast(this.toastCtrl, "INVITE.TUTO_COPYLINK", this.translate);
    };
    InvitePage.prototype.del_email = function (index) {
        //delfriendsemail(vm.userData.user.id,vm.userData.user.friendsEmail[index]);
        //vm.userData.user.friendsEmail.splice(index,1);
    };
    ;
    InvitePage.prototype.sendInvitationToFollower = function () {
        var _this = this;
        var vm = this;
        if (this.eventData.event == null)
            this.eventData.event = this.event;
        this.eventData.sendinvitetofollower(vm.numberOfInvitation).subscribe(function (resp) {
            if (resp != null) {
                vm.userData.user = resp;
                Tools.toast(_this.toastCtrl, resp.message, _this.translate);
            }
        });
    };
    ;
    InvitePage.prototype.openContactProvider = function () {
        var vm = this;
        this.navCtrl.push("Perso", { filter: "facebook,contact", user: vm.userData.user.id, autoback: true, from: "invite" });
    };
    ;
    InvitePage.prototype.addEmail = function () {
        var vm = this;
        Tools.showPopup({
            title: "INVITE.EMAIL",
            placeholder: "@",
            translate: this.translate,
            type: "email"
        }, this.alertCtrl, function (res) {
            if (res != null)
                vm.sendInvitations({ email: res });
        });
    };
    InvitePage.prototype.sendInvitations = function (dest) {
        if (this.navParams.data.template != null) {
            var obj = { qrcode: this.qrcode, url: this.url };
            this.api.sendtemplate(this.userData.user.email, this.userData.user.id, this.navParams.data.template, obj).subscribe(function () { });
        }
        else {
            var vm = this;
            //if(dest==undefined)dest={email:vm.email.dest};
            if (dest.email.indexOf("facebook") == 0) {
                //clipboard.copyText(vm.url);
                var hwnd = Maintools_1.openWindow("https://www.facebook.com/" + dest.email.replace("facebook", ""));
                //TODO: voir si on dispose de l'adresse publique pour ecrire
                // setTimeout(function(){
                //   var name=hwnd.location.href.replace("https://www.facebook.com/");
                //   hwnd.location.href="https://www.facebook.com/messages/t/"+name+"/";
                // },500);
            }
            else {
                vm.eventData.shareevent(vm.navParams.get("message"), dest.email, vm.userData.user.id, dest.name, this.event).subscribe(function (resp) {
                    if (resp.error == undefined || resp.error.length == 0) {
                        var lib = dest.name;
                        if (lib == null)
                            lib = dest.email;
                        Maintools_1.toast(vm.toastCtrl, "INVITE.CONFIRM", vm.translate);
                        vm.userData.addfriendsemail(dest.email).subscribe(function (resp) {
                        });
                    }
                    else
                        Maintools_1.toast(vm.toastCtrl, resp.error, vm.translate);
                });
            }
        }
        //vm.email.dest="";
    };
    ;
    InvitePage.prototype.sendMe = function () {
        this.sendInvitations({ email: this.userData.user.email, name: this.userData.user.firstname });
        Maintools_1.toast(this.toastCtrl, "INVITE.CHECKYOUREMAIL", this.translate);
    };
    InvitePage.prototype.makePermanentInvitation = function () {
        var _this = this;
        Maintools_1.showConfirm("INVITE.CONFIRMEPERMANENTEINVITATION", this.alertCtrl, this.translate, function () {
            _this.userData.makePermanentInvitation("music").subscribe(function (rep) {
                Maintools_1.toast(_this.toastCtrl, "INVITE.CHECKYOUREMAIL", _this.translate);
            });
        });
    };
    InvitePage.prototype.updateEvent = function () {
        var _this = this;
        if (this.autologin.value)
            this.event.autologin = 2;
        else
            this.event.autologin = 0;
        this.eventData.updateevent("autologin", this.event).subscribe(function () {
            _this.refresh();
        });
    };
    InvitePage.prototype.printCode = function () {
        var wnd = Tools.openWindow("", "Print");
        wnd.document.body.innerHTML = document.getElementById("printable").innerHTML;
        wnd.document.body.style.height = "100%";
        wnd.document.body.style.textAlign = "center";
        wnd.print();
        wnd.close();
    };
    InvitePage = __decorate([
        core_1.Component({
            selector: 'page-invite',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\invite\invite.html"*/'<!--\n  Generated template for the InvitePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <shifutitle [menu]="false" title="{{\'INVITE.SHARETITLE\' | translate}}" help="inviter_participants">\n    <shifubutton [small]="true" id="btnClose" icon="close" (click)="viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n<ion-content no-padding>\n  <tuto label="INVITE.TUTO"></tuto>\n\n  <!-- Invitation des followers -->\n  <shifucard title="INVITE.FOLLOWERS" label="LIB.SEND"\n             *ngIf="userData.user.followers!=undefined && userData.user.followers.length>0 && userData.user.tarif.tarif!=0"\n             (onclick)="sendInvitationToFollower()">\n\n\n    <label *ngIf="userData.user.tarif.cost_byfollower>0" id="lblMontant" style="margin-left:20px;width:150px" class="input-label">{{ \'LIB.INVITATION\' | translate }}s\n      &nbsp;&nbsp;{{numberOfInvitation*userData.user.tarif.cost_byfollower}}&nbsp;{{"LIB.MONEY" | translate}}\n      ({{"LIB.ACCOUNT" | translate}}:{{userData.user.realCredits}}&nbsp;{{"LIB.MONEY" | translate}})\n    </label>\n\n    <shifurange unite="person" icon="person" id="txtnumberOfInvitation" [(ngModel)]="numberOfInvitation" min="1" max="{{userData.user.followers.length}}" step="1"></shifurange>\n  </shifucard>\n\n  <div id="printable" style="visibility:hidden;height:0px;width: 100%;text-align: center;">\n    <br>\n    <span style="font-size: xx-large">{{event.title}}</span><br><br><br>\n    <div style="text-align:center;display:inline-block;position:relative;width:80%;">\n      <img src="{{qrcode}}" style="width:100%;display:inline-block;"><br><br>\n    </div>\n    <br>\n    <ion-item no-lines text-center *ngIf="event!=undefined && event.code!=undefined">\n      {{"INVITE.EVENTCODE" | translate}}<br>\n      <span style="font-size: xx-large">{{event.code}}</span>\n    </ion-item>\n  </div>\n\n\n  <ion-item text-center>\n    <div style="width: 100%;text-align: center;">\n      <span style="font-size: x-large">{{event.title}}</span><br><br>\n      <div style="text-align:center;display:inline-block;position:relative;width:50%;">\n        <img src="./assets/img/wait.gif" style="width:100px" *ngIf="qrcode.length==0">\n        <img src="{{qrcode}}" style="display:inline-block;" ngxClipboard [cbContent]="url" (click)="copy(false)"><br>\n      </div>\n      <br>\n      <ion-item no-lines text-center *ngIf="event!=undefined && event.code!=undefined">\n        {{"INVITE.EVENTCODE" | translate}}<br>\n        <span style="font-size: xx-large">{{event.code}}</span>\n      </ion-item>\n    </div>\n\n    <br>\n    <ion-item no-margin text-center no-lines no-border>\n      <shifubutton size="120" [small]="true" label="LIB.PRINT" icon="print" (click)="printCode()"></shifubutton>\n      <shifubutton size="120" [small]="true" style="margin-bottom:5px;"\n                   id="btnCopy" icon="link" label="LIB.COPY" ngxClipboard [cbContent]="url"\n                   (click)="copyLink()">\n      </shifubutton>\n    </ion-item>\n\n    <shifucheckbox *ngIf="event.owner_id==userData.user.id && (!event.visibleOnMap || event.allowAnonymous)" id="chkAutoLogin" label="ADDEVENT.AUTOLOGIN"\n                   [(ngModel)]="autologin.value" (onchange)="updateEvent()">\n    </shifucheckbox>\n\n    <shifubutton *ngIf="userData.user.email.length>0 && userData.user.connexions.length>10" size="200" label="LIB.INVITATIONPERMANENT" (click)="makePermanentInvitation()"></shifubutton>\n  </ion-item>\n\n  <!--<shifucheckbox *ngIf="!event.visibleOnMap" label="INVITE.FORCEANONYMOUS" [(ngModel)]="forceAnonymous" (onchange)="refresh()"></shifucheckbox>-->\n\n  <!--<shifucheckbox label="INVITE.PERSONAL" *ngIf="userData.user.connexions.length>10" [(ngModel)]="email.personal"></shifucheckbox>-->\n\n  <shifucard [visible]="userData.friends.length>0" id="cardInvite"  title="INVITE.FRIENDSTOINVITE" icon="person-add" (onclick)="addEmail()">\n      <shifuinput *ngIf="userData.friends.length>15" placeholder="LIB.FILTER" size="3" type="text" [(ngModel)]="friendfilter"></shifuinput>\n      <ion-list no-border no-margin no-padding>\n        <ion-item *ngFor="let friend of userData.friends | filter: \'name\':friendfilter">\n          <ion-avatar item-start>\n            <img *ngIf="friend.picture.length>0" src="{{friend.picture}}">\n          </ion-avatar>\n            <ion-label>{{friend.name}}</ion-label>\n          <ion-icon\n            item-end\n            color="primary"\n            name="mail" (click)="sendInvitations(friend)"\n            ngxClipboard [cbContent]="url">\n          </ion-icon>\n\n          <!--<i name="btnDelete" class="icon ion-trash-b" *ngIf="friend.origin==\'shifumix\'" (click)="del_email($index)"></i>-->\n        </ion-item>\n    </ion-list>\n  </shifucard>\n\n\n  <br>\n  <!--<div class="text-center" *ngIf="friends.length==0 && userData.user.connexions.length>5">-->\n    <!--<button id="btnContact" style="margin-bottom: 6px;" class="button button-positive" (click)="openContactProvider()" >-->\n      <!--{{\'INVITE.CONTACTPROVIDER\' | translate}}-->\n    <!--</button>-->\n  <!--</div>-->\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\invite\invite.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.ViewController, ionic_angular_1.ToastController,
            ionic_angular_1.NavController, ionic_angular_1.AlertController,
            ionic_angular_1.NavParams, api_1.ApiProvider, ionic_angular_1.LoadingController,
            user_data_1.UserData, core_2.TranslateService,
            event_data_1.EventDataProvider])
    ], InvitePage);
    return InvitePage;
}());
exports.InvitePage = InvitePage;
//# sourceMappingURL=invite.js.map

/***/ }),

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__(21);
var core_1 = __webpack_require__(0);
var camera_1 = __webpack_require__(229);
var geolocation_1 = __webpack_require__(231);
var file_1 = __webpack_require__(483);
var ionic_angular_1 = __webpack_require__(3);
var storage_1 = __webpack_require__(42);
var app_component_1 = __webpack_require__(527);
var about_1 = __webpack_require__(338);
var about_popover_1 = __webpack_require__(543);
var perso_1 = __webpack_require__(83);
var login_1 = __webpack_require__(181);
var selevent_1 = __webpack_require__(182);
var addevent_1 = __webpack_require__(82);
var tabs_page_1 = __webpack_require__(323);
var tutorial_1 = __webpack_require__(324);
var support_1 = __webpack_require__(325);
var screens_1 = __webpack_require__(185);
var public_profil_1 = __webpack_require__(54);
var tarifs_1 = __webpack_require__(320);
var widget_1 = __webpack_require__(183);
var widgetstore_1 = __webpack_require__(106);
var search_1 = __webpack_require__(327);
var photos_1 = __webpack_require__(329);
var musicserver_1 = __webpack_require__(107);
var invite_1 = __webpack_require__(46);
var htmleditor_1 = __webpack_require__(184);
var closedevent_1 = __webpack_require__(108);
var addbets_1 = __webpack_require__(189);
var addloterie_1 = __webpack_require__(331);
var bets_1 = __webpack_require__(330);
var board_1 = __webpack_require__(544);
var charts_1 = __webpack_require__(335);
var home_1 = __webpack_require__(326);
var user_data_1 = __webpack_require__(8);
var core_2 = __webpack_require__(7);
var event_data_1 = __webpack_require__(15);
var profil_1 = __webpack_require__(187);
var order_by_1 = __webpack_require__(545);
var filter_1 = __webpack_require__(546);
var loginemail_1 = __webpack_require__(186);
var addevent_date_1 = __webpack_require__(318);
var addevent_advanced_1 = __webpack_require__(317);
var addevent_flyer_1 = __webpack_require__(319);
var customercommand_1 = __webpack_require__(332);
var preparecommand_1 = __webpack_require__(333);
var addevent_modele_1 = __webpack_require__(316);
var ngx_clipboard_1 = __webpack_require__(547);
var focusme_1 = __webpack_require__(549);
var shifubutton_1 = __webpack_require__(550);
var shifuinput_1 = __webpack_require__(551);
var shifurange_1 = __webpack_require__(552);
var tuto_1 = __webpack_require__(558);
var shifuimagefile_1 = __webpack_require__(559);
var shifugroup_1 = __webpack_require__(560);
var shifutitle_1 = __webpack_require__(561);
var shifuwait_1 = __webpack_require__(562);
var shifucheckbox_1 = __webpack_require__(563);
var shifucamera_1 = __webpack_require__(564);
var svgedit_1 = __webpack_require__(565);
var safe_1 = __webpack_require__(566);
var shifucard_1 = __webpack_require__(567);
var messages_1 = __webpack_require__(334);
var api_1 = __webpack_require__(16);
var shifuflyer_1 = __webpack_require__(568);
var shifuevent_1 = __webpack_require__(569);
var shifuprofil_1 = __webpack_require__(570);
var shifutimer_1 = __webpack_require__(571);
var shifuimageprofil_1 = __webpack_require__(572);
var oldevents_1 = __webpack_require__(337);
var image_creator_1 = __webpack_require__(38);
//import {ImageUploadModule} from "angular2-image-upload";
var ng2_ace_editor_1 = __webpack_require__(573);
var shifunote_1 = __webpack_require__(579);
var app_version_1 = __webpack_require__(580);
var shifubet_1 = __webpack_require__(581);
var wholikeme_1 = __webpack_require__(336);
var network_1 = __webpack_require__(339);
var welcome_1 = __webpack_require__(340);
var term_of_use_1 = __webpack_require__(341);
var shifubuttongroup_1 = __webpack_require__(582);
var loginavatar_1 = __webpack_require__(190);
var settings_1 = __webpack_require__(23);
var ng_push_1 = __webpack_require__(84);
var musiccharts_1 = __webpack_require__(328);
var presentations_1 = __webpack_require__(188);
var shifufile_1 = __webpack_require__(583);
var addpresentation_1 = __webpack_require__(321);
var shifudate_1 = __webpack_require__(584);
var remote_1 = __webpack_require__(322);
var shifugallery_1 = __webpack_require__(585);
var ng_recaptcha_1 = __webpack_require__(586);
var shifunumpad_1 = __webpack_require__(591);
var http_1 = __webpack_require__(105);
//import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji'
//import { PickerModule } from '@ctrl/ngx-emoji-mart'
var ng_emoji_picker_1 = __webpack_require__(592);
//voir l'orginal : https://github.com/ionic-team/ionic-conference-app/blob/master/src/app/app.component.ts
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                //ComponentsModule
                shifubutton_1.ShifubuttonComponent,
                shifufile_1.ShifufileComponent,
                shifunumpad_1.ShifunumpadComponent,
                shifubuttongroup_1.ShifubuttongroupComponent,
                shifuinput_1.ShifuinputComponent,
                shifubet_1.ShifubetComponent,
                shifunote_1.ShifunoteComponent,
                shifudate_1.ShifudateComponent,
                shifuimageprofil_1.ShifuimageprofilComponent,
                shifurange_1.ShifurangeComponent,
                shifutimer_1.ShifutimerComponent,
                shifutimer_1.ShifutimerComponent,
                shifugallery_1.ShifugalleryComponent,
                tuto_1.TutoComponent,
                shifuimagefile_1.ShifuimagefileComponent,
                shifucard_1.ShifucardComponent,
                shifuflyer_1.ShifuflyerComponent,
                shifugroup_1.ShifugroupComponent,
                shifutitle_1.ShifutitleComponent,
                shifuwait_1.ShifuwaitComponent,
                shifucheckbox_1.ShifucheckboxComponent,
                shifucamera_1.ShifucameraComponent,
                svgedit_1.SvgeditComponent,
                shifuprofil_1.ShifuprofilComponent,
                shifuevent_1.ShifueventComponent,
                //DirectivesModule,
                focusme_1.FocusmeDirective,
                ng2_ace_editor_1.AceEditorDirective,
                //PipesModule,
                order_by_1.OrderByPipe,
                filter_1.FilterPipe,
                safe_1.SafePipe,
                app_component_1.ConferenceApp,
                about_1.AboutPage,
                wholikeme_1.WholikemePage,
                home_1.HomePage,
                perso_1.PersoPage,
                loginemail_1.LoginemailPage,
                screens_1.ScreensPage,
                public_profil_1.PublicProfilPage,
                term_of_use_1.TermOfUsePage,
                tarifs_1.TarifsPage,
                widget_1.WidgetPage,
                widgetstore_1.WidgetstorePage,
                search_1.SearchPage,
                photos_1.PhotosPage,
                addpresentation_1.AddpresentationPage,
                presentations_1.PresentationsPage,
                loginavatar_1.LoginavatarPage,
                remote_1.RemotePage,
                image_creator_1.ImageCreatorPage,
                musicserver_1.MusicserverPage,
                musiccharts_1.MusicchartsPage,
                invite_1.InvitePage,
                htmleditor_1.HtmleditorPage,
                closedevent_1.ClosedeventPage,
                welcome_1.WelcomePage,
                addbets_1.AddbetsPage,
                addevent_date_1.AddeventDatePage,
                addevent_modele_1.AddeventModelePage,
                addevent_flyer_1.AddeventFlyerPage,
                addevent_advanced_1.AddeventAdvancedPage,
                customercommand_1.CustomercommandPage,
                preparecommand_1.PreparecommandPage,
                addloterie_1.AddloteriePage,
                bets_1.BetsPage,
                board_1.BoardPage,
                charts_1.ChartsPage,
                messages_1.MessagesPage,
                login_1.LoginPage,
                profil_1.ProfilPage,
                selevent_1.SeleventPage,
                oldevents_1.OldeventsPage,
                addevent_1.AddeventPage,
                about_popover_1.PopoverPage,
                tabs_page_1.TabsPage,
                tutorial_1.TutorialPage,
                support_1.SupportPage
            ],
            exports: [
                //ComponentsModule
                shifubutton_1.ShifubuttonComponent,
                shifufile_1.ShifufileComponent,
                shifunote_1.ShifunoteComponent,
                shifubet_1.ShifubetComponent,
                shifuflyer_1.ShifuflyerComponent,
                shifuinput_1.ShifuinputComponent,
                shifurange_1.ShifurangeComponent,
                shifucard_1.ShifucardComponent,
                shifugallery_1.ShifugalleryComponent,
                shifutimer_1.ShifutimerComponent,
                shifuimageprofil_1.ShifuimageprofilComponent,
                tuto_1.TutoComponent,
                shifuimagefile_1.ShifuimagefileComponent,
                shifugroup_1.ShifugroupComponent,
                shifubuttongroup_1.ShifubuttongroupComponent,
                shifutitle_1.ShifutitleComponent,
                shifuwait_1.ShifuwaitComponent,
                shifucheckbox_1.ShifucheckboxComponent,
                shifucamera_1.ShifucameraComponent,
                shifunumpad_1.ShifunumpadComponent,
                svgedit_1.SvgeditComponent,
                shifudate_1.ShifudateComponent,
                shifuprofil_1.ShifuprofilComponent,
                shifuevent_1.ShifueventComponent,
                focusme_1.FocusmeDirective,
                ng2_ace_editor_1.AceEditorDirective,
                order_by_1.OrderByPipe,
                filter_1.FilterPipe,
                safe_1.SafePipe,
                core_2.TranslateModule,
            ],
            imports: [
                core_2.TranslateModule.forRoot(),
                ng_emoji_picker_1.EmojiPickerModule,
                //PickerModule,
                //EmojiModule,
                ng_recaptcha_1.RecaptchaModule.forRoot(),
                //  ImageUploadModule.forRoot(),
                platform_browser_1.BrowserModule,
                //UICarouselModule,
                ng_push_1.PushNotificationsModule,
                ngx_clipboard_1.ClipboardModule,
                http_1.HttpClientModule,
                ionic_angular_1.IonicModule.forRoot(app_component_1.ConferenceApp, {}, {
                    links: [
                        { component: login_1.LoginPage, name: 'LoginPage', segment: 'login' },
                        { component: tabs_page_1.TabsPage, name: 'TabsPage', segment: 'tabs' },
                        { component: perso_1.PersoPage, name: 'PersoPage', segment: 'perso' },
                        { component: about_1.AboutPage, name: 'About', segment: 'about' },
                        { component: welcome_1.WelcomePage, name: 'Welcome', segment: 'welcome' },
                        { component: term_of_use_1.TermOfUsePage, name: 'TermOfUse', segment: 'tmu' },
                        { component: tutorial_1.TutorialPage, name: 'Tutorial', segment: 'tutorial' },
                        { component: support_1.SupportPage, name: 'SupportPage', segment: 'support' },
                        { component: loginavatar_1.LoginavatarPage, name: 'LoginavatarPage', segment: 'support' },
                        { component: public_profil_1.PublicProfilPage, name: 'PublicProfil', segment: 'publicprofil' },
                        { component: tarifs_1.TarifsPage, name: 'Tarifs', segment: 'tarifs' },
                        { component: image_creator_1.ImageCreatorPage, name: 'ImageCreator', segment: 'imagecreator' },
                        { component: widget_1.WidgetPage, name: 'Widget', segment: 'widget' },
                        { component: widgetstore_1.WidgetstorePage, name: 'Widgetstore', segment: 'widgetstore' },
                        { component: search_1.SearchPage, name: 'Search', segment: 'tab/:event/music/search' },
                        { component: photos_1.PhotosPage, name: 'PhotosPage', segment: 'tab/photos' },
                        { component: presentations_1.PresentationsPage, name: 'PresentationsPage', segment: 'presentations' },
                        { component: addpresentation_1.AddpresentationPage, name: 'AddPresentationsPage', segment: 'presentation/add' },
                        { component: musicserver_1.MusicserverPage, name: 'Musicserver', segment: 'musicserver' },
                        { component: invite_1.InvitePage, name: 'Invite', segment: 'invite/:event' },
                        { component: htmleditor_1.HtmleditorPage, name: 'Htmleditor', segment: 'editor/widget' },
                        { component: home_1.HomePage, name: 'HomePage', segment: 'home' },
                        { component: customercommand_1.CustomercommandPage, name: 'Command', segment: 'command' },
                        { component: remote_1.RemotePage, name: 'RemotePage', segment: 'presentation/remote' },
                        { component: preparecommand_1.PreparecommandPage, name: 'Preparecommand', segment: 'command/prepare' },
                        { component: profil_1.ProfilPage, name: 'Profil', segment: 'perso' },
                        { component: closedevent_1.ClosedeventPage, name: 'Closedevent', segment: 'close' },
                        { component: loginemail_1.LoginemailPage, name: 'Loginemail', segment: 'login' },
                        { component: addbets_1.AddbetsPage, name: 'Perso', segment: 'perso' },
                        { component: wholikeme_1.WholikemePage, name: 'Wholikeme', segment: 'wholikeme' },
                        { component: addevent_1.AddeventPage, name: 'Perso', segment: 'login' },
                        { component: selevent_1.SeleventPage, name: 'SeleventPage', segment: 'selevent' },
                        { component: oldevents_1.OldeventsPage, name: 'OldeventsPage', segment: 'oldevents' },
                        { component: addloterie_1.AddloteriePage, name: 'Addloterie', segment: 'perso' },
                        { component: bets_1.BetsPage, name: 'BetsPage', segment: 'tab/bets' },
                        { component: board_1.BoardPage, name: 'BoardPAge', segment: 'tab/board' },
                        { component: charts_1.ChartsPage, name: 'ChartsPage', segment: 'tab/charts' },
                        { component: messages_1.MessagesPage, name: 'MessagesPage', segment: 'tab/messages' },
                        { component: screens_1.ScreensPage, name: 'ScreensPage', segment: 'screens' }
                    ]
                }),
                storage_1.IonicStorageModule.forRoot({ name: "shifumix_storage", driverOrder: ['localstorage'] })
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                app_component_1.ConferenceApp,
                welcome_1.WelcomePage,
                loginavatar_1.LoginavatarPage,
                about_1.AboutPage,
                perso_1.PersoPage,
                profil_1.ProfilPage,
                login_1.LoginPage,
                tarifs_1.TarifsPage,
                image_creator_1.ImageCreatorPage,
                widgetstore_1.WidgetstorePage,
                widget_1.WidgetPage,
                screens_1.ScreensPage,
                presentations_1.PresentationsPage,
                addpresentation_1.AddpresentationPage,
                loginemail_1.LoginemailPage,
                about_popover_1.PopoverPage,
                tabs_page_1.TabsPage,
                tutorial_1.TutorialPage,
                term_of_use_1.TermOfUsePage,
                support_1.SupportPage,
                public_profil_1.PublicProfilPage,
                search_1.SearchPage,
                photos_1.PhotosPage,
                musicserver_1.MusicserverPage,
                musiccharts_1.MusicchartsPage,
                invite_1.InvitePage,
                wholikeme_1.WholikemePage,
                customercommand_1.CustomercommandPage,
                preparecommand_1.PreparecommandPage,
                home_1.HomePage,
                messages_1.MessagesPage,
                htmleditor_1.HtmleditorPage,
                closedevent_1.ClosedeventPage,
                addbets_1.AddbetsPage,
                remote_1.RemotePage,
                selevent_1.SeleventPage,
                oldevents_1.OldeventsPage,
                addevent_1.AddeventPage,
                addevent_date_1.AddeventDatePage,
                addevent_modele_1.AddeventModelePage,
                addevent_flyer_1.AddeventFlyerPage,
                addevent_advanced_1.AddeventAdvancedPage,
                addloterie_1.AddloteriePage,
                bets_1.BetsPage,
                board_1.BoardPage,
                charts_1.ChartsPage,
            ],
            providers: [
                { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler },
                user_data_1.UserData,
                network_1.Network,
                app_version_1.AppVersion,
                camera_1.Camera,
                file_1.File,
                geolocation_1.Geolocation,
                event_data_1.EventDataProvider,
                api_1.ApiProvider,
                settings_1.SettingsProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var storage_1 = __webpack_require__(42);
var labels_1 = __webpack_require__(314);
var login_1 = __webpack_require__(181);
var tabs_page_1 = __webpack_require__(323);
var tutorial_1 = __webpack_require__(324);
var support_1 = __webpack_require__(325);
var user_data_1 = __webpack_require__(8);
var selevent_1 = __webpack_require__(182);
var home_1 = __webpack_require__(326);
var photos_1 = __webpack_require__(329);
var bets_1 = __webpack_require__(330);
var invite_1 = __webpack_require__(46);
var event_data_1 = __webpack_require__(15);
var profil_1 = __webpack_require__(187);
var core_2 = __webpack_require__(7);
var screens_1 = __webpack_require__(185);
var platform_browser_1 = __webpack_require__(21);
var customercommand_1 = __webpack_require__(332);
var widgetstore_1 = __webpack_require__(106);
var messages_1 = __webpack_require__(334);
var charts_1 = __webpack_require__(335);
var Maintools_1 = __webpack_require__(2);
var Maintools_2 = __webpack_require__(2);
var Maintools_3 = __webpack_require__(2);
var oldevents_1 = __webpack_require__(337);
var api_1 = __webpack_require__(16);
var public_profil_1 = __webpack_require__(54);
var about_1 = __webpack_require__(338);
var network_1 = __webpack_require__(339);
var welcome_1 = __webpack_require__(340);
var term_of_use_1 = __webpack_require__(341);
var closedevent_1 = __webpack_require__(108);
var addevent_1 = __webpack_require__(82);
var settings_1 = __webpack_require__(23);
var perso_1 = __webpack_require__(83);
var presentations_1 = __webpack_require__(188);
core_1.enableProdMode();
var ConferenceApp = /** @class */ (function () {
    function ConferenceApp(network, events, modalCtrl, userData, menu, platform, api, toastCtrl, storage, translate, eventData, domSanitizer, settings, alertCtrl, loadingCtrl, app) {
        var _this = this;
        this.network = network;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.userData = userData;
        this.menu = menu;
        this.platform = platform;
        this.api = api;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.translate = translate;
        this.eventData = eventData;
        this.domSanitizer = domSanitizer;
        this.settings = settings;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.jetons = 0;
        this.appPages = [];
        this.loggedInPages = [
            { title: 'LIB.FINDEVENTS', name: 'SeleventPage', component: selevent_1.SeleventPage, icon: 'compass', visible: true },
            { title: 'LIB.MYEVENTS', name: 'OldeventsPage', component: oldevents_1.OldeventsPage, icon: 'list', visible: true },
            { title: 'LIB.SCREENS', name: 'ScreensPage', component: screens_1.ScreensPage, icon: 'desktop', visible: true },
            { title: 'LIB.LOGOUT', name: "LoginPage", component: login_1.LoginPage, icon: 'log-out', logsOut: true, visible: true },
        ];
        this.loggedInPagesWithEvent = [
            { title: 'LIB.SCREENS', name: 'ScreensPage', component: screens_1.ScreensPage, icon: 'desktop', onlyAdmin: true, visible: true }
        ];
        this.loggedOutPages = [
            { title: 'LIB.LOGIN', name: 'LoginPage', component: login_1.LoginPage, icon: 'log-in', visible: true }
        ];
        platform.ready().then(function () {
            // this.cache.setDefaultTTL(60 * 60 * 12);
            // this.cache.setOfflineInvalidate(false);
            translate.setDefaultLang("en");
            translate.use(_this.platform.lang());
            labels_1.getLibs().forEach(function (libs) {
                translate.setTranslation(libs.lang, libs.labels, true);
            });
            app._setDisableScroll(true);
            _this.initPages();
            domSanitizer.bypassSecurityTrustUrl("https://storage.googleapis.com/");
            //Récuperation des parametres de l'url
            var mode = platform.getQueryParam("mode");
            _this.storage.set("notuto", platform.getQueryParam("notuto"));
            _this.storage.set("withplayer", platform.getQueryParam("withplayer"));
            _this.storage.set("inviteEvent", platform.getQueryParam("inviteEvent"));
            _this.storage.set("from", platform.getQueryParam("from"));
            _this.storage.set("from", platform.getQueryParam("login"));
            _this.storage.set("sc", platform.getQueryParam("sc"));
            _this.storage.set("location_lat", platform.getQueryParam("location_lat"));
            _this.storage.set("location_lng", platform.getQueryParam("location_lng"));
            _this.storage.set("location_zoom", platform.getQueryParam("location_zoom"));
            _this.storage.set("flyer", decodeURIComponent(platform.getQueryParam("flyer")));
            _this.settings.code = platform.getQueryParam("code");
            _this.settings.dest = platform.getQueryParam("dest");
            _this.storage.set("profil", platform.getQueryParam("profil"));
            _this.storage.set("widgetFilter", platform.getQueryParam("widgetFilter"));
            _this.storage.set("server", platform.getQueryParam("server"));
            _this.storage.set("for", platform.getQueryParam("for"));
            _this.storage.set("type", platform.getQueryParam("type"));
            _this.storage.set("todo", platform.getQueryParam("todo"));
            _this.storage.set("type_invite", platform.getQueryParam("type_invite"));
            //this.storage.set("connexion", platform.getQueryParam("connexion"));
            _this.storage.set("message", platform.getQueryParam("message"));
            _this.storage.set("instantEvent", platform.getQueryParam("instantEvent"));
            //this.storage.set("dest", platform.getQueryParam("dest"));
            _this.storage.set("scaling", platform.getQueryParam("scaling"));
            if (platform.getQueryParam("raz") == "true")
                _this.storage.remove("user");
            _this.storage.set("anonymous", platform.getQueryParam("anonymous"));
            var vm = _this;
            _this.platform.setQueryParams("");
            Maintools_3.$$("Analyse du reseau");
            var disconnectSubscription = _this.network.onDisconnect().subscribe(function () {
                Maintools_3.toast(vm.toastCtrl, "ERROR.LOSTNETWORK", vm.translate);
                vm.eventData.online = false;
            });
            _this.network.onConnect().subscribe(function () {
                vm.eventData.online = true;
            });
            Maintools_3.$$("Check if the user has already seen the tutorial");
            _this.storage.get('hasSeenTutorial').then(function (hasSeenTutorial) {
                var vm = _this;
                //Dans certains cas, on cherche a afficher uniquement la page public du profil
                _this.api.connectToServer(platform.getQueryParam("server"), _this.platform.userAgent(), function (rep) {
                    _this.eventData.socketServerAddress = rep.socketserver;
                }, function (err) { Maintools_3.$$("error", err); });
                if (platform.getQueryParam("follower")) {
                    _this.api.connectToServer(platform.getQueryParam("server"), _this.platform.userAgent(), function (r) {
                        _this.eventData.socketServerAddress = r.socketserver;
                        vm.nav.setRoot(public_profil_1.PublicProfilPage, { userid: platform.getQueryParam("userid"), follower: platform.getQueryParam("follower") });
                    }, function (err) { Maintools_3.$$("error", err); });
                }
                else {
                    _this.rootPage = login_1.LoginPage;
                }
            });
            _this.enableMenu("loggedOutMenu"); //Cohérent du fait de l'usage d'une promesse au dessucs
            _this.listenToLoginEvents(); //Gestionnaire d'événement
            clearTimeout(_this.handleUser);
            _this.handleUser = setTimeout(function () {
                _this.events.subscribe("user", function () {
                    _this.userData.get().subscribe(function (r) {
                        _this.userData.user = r;
                        if (_this.userData.user.jetons != null && _this.eventData.event != null && _this.eventData.event.owner_id != null)
                            _this.jetons = _this.userData.user.jetons[_this.eventData.event.owner_id];
                    });
                });
            }, 1000);
        });
    }
    ConferenceApp.prototype.initPages = function () {
        this.appPages = [
            { title: 'LIB.SETTINGS', name: 'Profil', component: tabs_page_1.TabsPage, tabComponent: profil_1.ProfilPage, icon: 'settings', activity: '', onlyAdmin: true, visible: true },
            { title: 'LIB.MUSIC', name: 'TabsPage', component: tabs_page_1.TabsPage, tabComponent: home_1.HomePage, index: 0, icon: 'musical-notes', activity: 'music', onlyAdmin: false, visible: true },
            { title: 'Photos', name: 'TabsPage', component: tabs_page_1.TabsPage, tabComponent: photos_1.PhotosPage, index: 1, icon: 'camera', activity: 'photo', onlyAdmin: false, visible: true },
            { title: 'LIB.PLAY', name: 'TabsPage', component: tabs_page_1.TabsPage, tabComponent: bets_1.BetsPage, index: 2, icon: 'baseball', activity: 'bets,survey,loterie', onlyAdmin: false, visible: true },
            { title: 'LIB.COMMAND', name: 'TabsPage', component: tabs_page_1.TabsPage, tabComponent: customercommand_1.CustomercommandPage, index: 3, icon: 'beer', activity: 'command', onlyAdmin: false, visible: true },
            { title: 'Message', name: 'TabsPage', component: tabs_page_1.TabsPage, tabComponent: messages_1.MessagesPage, index: 4, icon: 'chatbubbles', activity: 'message', onlyAdmin: false, visible: true },
            { title: 'LIB.PRESENTATION', name: 'TabsPage', component: tabs_page_1.TabsPage, tabComponent: presentations_1.PresentationsPage, index: 5, icon: 'albums', activity: 'presentation', onlyAdmin: false, visible: true },
            { title: 'LIB.PEOPLE', name: 'TabsPage', component: tabs_page_1.TabsPage, tabComponent: charts_1.ChartsPage, index: 6, icon: 'people', activity: '', onlyAdmin: false, visible: true }
        ];
    };
    ConferenceApp.prototype.inviteEvent = function () {
        Maintools_3.openModal(this.modalCtrl, invite_1.InvitePage, { from: this.userData.user, event: this.eventData.event });
    };
    ConferenceApp.prototype.openPageByName = function (l_pages, pageName, params) {
        if (params === void 0) { params = {}; }
        if (pageName == null) {
            this.openPage(l_pages[0], params);
        }
        else {
            pageName = pageName.toLowerCase();
            var result = null;
            l_pages.forEach(function (p) {
                if (p.name.toLowerCase() == pageName || (p.name == "TabsPage" && p.tabComponent.name.toLowerCase() == pageName))
                    result = p;
            });
            if (result == null) {
                Maintools_3.$$("page " + pageName + " introuvable");
                this.openPage(l_pages[1], params);
            }
            else
                this.openPage(result, params);
        }
    };
    ConferenceApp.prototype.openPage = function (page, params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        if (page.tabComponent != undefined)
            Maintools_3.$$("Ouveture de : " + page.name + " avec tab=" + page.tabComponent.name);
        else
            Maintools_3.$$("Ouveture de : " + page.name);
        if (page.logsOut === true) {
            // Give the menu time to close before changing to logged out
            this.events.publish("user:logout", {});
            return;
        }
        // the nav component was found using @ViewChild(Nav)
        // setRoot on the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        var index = 0;
        if (page.hasOwnProperty("index")) {
            //Recalcul de l'index en fonction des icons visibles
            var i = 0;
            Maintools_1.buildTabs(this.userData.user, this.eventData.event).forEach(function (p) {
                if (p.tabIcon == page.icon)
                    index = i;
                i++;
            });
            params = { tabIndex: index, tabName: page.tabComponent.name };
            //params={tabIndex:page.index,tabName:page.tabComponent.name};
            if (page.tabComponent != undefined)
                this.userData.selectTab = page.tabComponent.name;
        }
        // If we are already on tabs
        if (this.nav.getActiveChildNavs().length && page.index != undefined) {
            //just change the selected tab
            // don't setRoot again, this maintains the history stack of the
            // tabs even if changing them from the menu
            this.nav.getActiveChildNavs()[0].select(index);
        }
        else {
            // Set the root of the nav with params if it's a tab index
            this.nav.setRoot(page.name, params, {}, function () {
                if (_this.nav.getActiveChildNavs().length > 0)
                    _this.nav.getActiveChildNavs()[0].select(index);
            }).catch(function (err) {
                Maintools_3.$$("Didn't set nav root: " + err);
            });
        }
    };
    ConferenceApp.prototype.openTutorial = function () {
        this.nav.setRoot(tutorial_1.TutorialPage);
    };
    ConferenceApp.prototype.openSupport = function () {
        Maintools_3.openModal(this.modalCtrl, support_1.SupportPage);
    };
    ConferenceApp.prototype.openAbout = function () {
        this.nav.setRoot(about_1.AboutPage);
    };
    ConferenceApp.prototype.checkInvitation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vm, evt, resp, idEvent, evt_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = this;
                        evt = null;
                        return [4 /*yield*/, this.userData.autoconnexion(this.settings.connexion).toPromise()];
                    case 1:
                        resp = _a.sent();
                        Maintools_3.$$("autoconnexion retourne", resp);
                        if (!(resp != null)) return [3 /*break*/, 5];
                        vm.userData.user = resp;
                        if (!(vm.userData.user.hasOwnProperty("currentEvent") && vm.userData.user.currentEvent.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, vm.api.getevent(vm.userData.user.currentEvent).toPromise()];
                    case 2:
                        evt = _a.sent();
                        vm.storage.remove("inviteEvent");
                        vm.storage.remove("for");
                        return [2 /*return*/, evt];
                    case 3:
                        if (!(vm.userData.user.message.length > 0)) return [3 /*break*/, 5];
                        if (!vm.userData.user.message.startsWith("SELEVENT.CLOSED")) return [3 /*break*/, 5];
                        idEvent = vm.userData.user.message.replace("SELEVENT.CLOSED:", "");
                        return [4 /*yield*/, vm.api.getevent(idEvent).toPromise()];
                    case 4:
                        evt_1 = _a.sent();
                        vm.storage.remove("inviteEvent");
                        //TODO: a tester
                        Maintools_3.openModal(vm.modalCtrl, closedevent_1.ClosedeventPage, { event: evt_1, user: vm.userData.user }, function () { });
                        _a.label = 5;
                    case 5: return [2 /*return*/, evt];
                }
            });
        });
    };
    ConferenceApp.prototype.closeEvent = function () {
        var vm = this;
        Maintools_3.showConfirm("LIB.EVENTCLOSING", this.alertCtrl, this.translate, function () {
            vm.eventData.closeevent(vm.userData.user.id).subscribe(function (resp) {
                vm.userData.user = resp;
                var delay = Number(resp.message) - new Date().getTime();
                // if(delay<10000)
                //   vm.events.publish("event:logout");
                // else {
                Maintools_3.toast(vm.toastCtrl, "End in " + Maintools_3.getDelay(Number(vm.userData.user.message)));
                // }
            });
        });
    };
    /**
     * Condition d'affichage de chaque option dans le menu
     * @param {PageInterface} p
     * @returns {boolean}
     */
    ConferenceApp.prototype.showPage = function (p) {
        var _this = this;
        if (this.eventData.event == null || this.eventData.event.activities.length == 0)
            return false;
        if (p.activity.length > 0) {
            var bc = false;
            p.activity.split(",").forEach(function (a) {
                if (!bc && _this.eventData.event.activities.indexOf(a) > -1)
                    bc = true;
            });
            if (!bc)
                return false;
        }
        if (p.activity == "command" && this.eventData.event.laCarte.length == 0 && this.eventData.event.Preparators.indexOf(this.userData.user.id) == -1)
            return false;
        if (p.onlyAdmin)
            if (this.userData.user.id != this.eventData.event.owner_id)
                return false;
        return true;
    };
    ConferenceApp.prototype.findPage = function (pages, name) {
        var rc = null;
        pages.forEach(function (p) {
            if (p.name.toLowerCase() == name.toLowerCase()) {
                rc = p;
            }
        });
        return rc;
    };
    ConferenceApp.prototype.checkCGU = function (func_CGU_ok, func_CGU_ko) {
        var _this = this;
        Maintools_3.$$("Vérification de signature des CGUs");
        this.api.termofuse(this.userData.user.lang).subscribe(function (r) {
            if (Number(r.dtCGU) > _this.userData.user.dtSignatureCGU && _this.userData.user.email != null && _this.userData.user.email.length > 0) {
                Maintools_3.openModal(_this.modalCtrl, term_of_use_1.TermOfUsePage, { CG: r.body }, function (rep) {
                    if (rep) {
                        _this.userData.user.dtSignatureCGU = new Date().getTime();
                        _this.userData.senduser("dtSignatureCGU").subscribe(function (u) {
                            if (u != null)
                                _this.userData.user = u;
                        });
                        func_CGU_ok();
                    }
                    else {
                        func_CGU_ko();
                    }
                });
            }
            else
                func_CGU_ok();
        });
    };
    /**
     * Création d'un événement par défaut (quand le champs dest designe un page et qu'aucun n'événement n'existe)
     */
    ConferenceApp.prototype.createDefaultEvent = function (dest, func) {
        var _this = this;
        var vm = this;
        var event_name = "party";
        if (this.settings.ihm == "pro")
            event_name = "meeting";
        Maintools_2.showPopup({ title: "ADDEVENT.GIVETITLE", default: this.userData.user.firstname + "' " + event_name, confirmButton: "LIB.OK", type: "text", translate: this.translate }, this.alertCtrl, function (res) {
            Maintools_3.$$("Il n'y a auncun évenement actif, on créé un evénement par défaut:", event);
            vm.eventData.addbasic(_this.userData.user.id, res, 0, 8 * 60, "music,message,photo", "", _this.userData.user.lat, _this.userData.user.lng).subscribe(function (rep) {
                if (rep.error.length == 0) {
                    var l = Maintools_2.loading(_this);
                    setTimeout(function () {
                        l.dismiss();
                        _this.api.getevent(rep.event).subscribe(function (evt) { func(evt); });
                    }, 2000);
                }
                else
                    Maintools_3.toast(_this.toastCtrl, rep.message, _this.translate);
            });
        });
    };
    ConferenceApp.prototype.joinEvent = function (dest, evt) {
        this.events.publish("event:login", { event: evt, user: this.userData.user, type: 1, url: "index.html?event=" + evt.id + "&from=" + this.userData.user.id, dest: dest });
    };
    /**
     * Souscription aux principaux événements
     */
    ConferenceApp.prototype.listenToLoginEvents = function () {
        var _this = this;
        Maintools_3.$$("Enregistrement des 4 principaux événements : event:login, user:login, event:logout, user:logout");
        var vm = this;
        this.events.subscribe("user:refresh", function (user) {
            Maintools_3.$$("L'utilisateur a recupere un mail, on met a jour le menu");
            _this.loggedInPages[3].visible = (user.email.length > 0);
            if (user.currentEvent.length > 0)
                vm.enableMenu("loggedInMenuWithEvent");
            else {
                vm.enableMenu("loggedInMenu");
            }
        });
        /**
         * Connexion de l'utilisateur
         */
        this.events.subscribe("user:login", function (user) {
            vm.userData.get(user.id).subscribe(function (user) {
                _this.userData.user = user;
                _this.translate.use(user.lang);
                Maintools_3.$$("L'utilisateur vient de se connecter : ", _this.userData.user);
                _this.toastCtrl.create({
                    message: _this.translate.instant("LOGIN.WELCOME") + ", " + _this.userData.user.firstname,
                    duration: 1500,
                    position: 'bottom'
                }).present();
                vm.enableMenu("loggedInMenu");
                _this.storage.set('user', vm.userData.user.id); //Stockage sur le device
                _this.checkCGU(function () {
                    Maintools_3.$$("Récupération du code d'écran s'il y en a un et traitement");
                    if (_this.settings.code != null) {
                        Maintools_3.$$("Mise a jour du user avec le code de l'écran pour assusrer le ratachement", _this.settings);
                        vm.userData.user.code = _this.settings.code;
                        vm.userData.senduser("code").subscribe(function () { _this.settings.code = null; });
                    }
                    _this.checkInvitation().then(function (evt) {
                        if (_this.userData.user.currentView.length > 0)
                            _this.settings.dest = _this.userData.user.currentView;
                        if (_this.settings.dest != null && evt == null) {
                            Maintools_3.$$("Débranchement demandé vers " + _this.settings.dest);
                            Maintools_3.$$("On essaye de récupérer un événement");
                            _this.api.geteventsfrom(_this.userData.user.id, 1, true, true).subscribe(function (evts_actifs) {
                                if (evts_actifs == undefined || evts_actifs.items.length == 0) {
                                    _this.events.publish("screen:add");
                                }
                                else {
                                    Maintools_3.$$("l'utilisateur a des événements actifs, on se connect au premier");
                                    _this.joinEvent(_this.settings.dest, evts_actifs.items[0]);
                                }
                            });
                        }
                        if (evt != null) {
                            Maintools_3.$$("Invitation à un événement ", evt);
                            _this.joinEvent(_this.settings.dest, evt);
                        }
                        else {
                            Maintools_3.$$("Pas d'invitation à un événement particulier");
                            vm.openPageByName(vm.loggedInPages, "SeleventPage");
                        }
                    });
                }, function () { _this.events.publish("user:logout"); });
            });
        });
        /**
         * Quit l'événements
         */
        this.events.subscribe("event:logout", function (param) {
            var vm = _this;
            if (param == null)
                param = {};
            vm.userData.quitEvent().subscribe(function (resp) {
                if (resp != null) {
                    Maintools_3.toast(_this.toastCtrl, param.message, _this.translate);
                    _this.initPages();
                    vm.enableMenu("loggedInMenu");
                    var p = _this.findPage(vm.loggedInPages, "OldEventsPage");
                    vm.openPage(p);
                    vm.userData.user = resp;
                    setTimeout(function () { vm.eventData.quit(); }, 1000);
                }
                else
                    _this.events.publish("user:logout");
            });
            //this.events.publish("event:logout",{id:this.eventData.event.id});
        });
        this.events.subscribe("moderator:add", function () {
            var index = _this.findPage(_this.appPages, "ChartsPage");
            vm.openPage(_this.appPages[index], { message: "CHARTS.CHOOSEMODERATOR" });
        });
        /**
         * Déconnexion de l'utilisateur
         * user:logout
         */
        this.events.subscribe('user:logout', function () {
            Maintools_3.$$("Demande de deconnexion du l'utilisateur");
            Maintools_3.showConfirm("INFO.ANONYMELOGOUT", _this.alertCtrl, _this.translate, function () {
                var vm = _this;
                _this.enableMenu('loggedOutMenu');
                vm.userData.logout().subscribe(function () {
                    var url = location.href;
                    if (url.indexOf("?") > -1)
                        url = url.substr(0, location.href.indexOf("?"));
                    if (url.indexOf("#/") > -1)
                        url = url.substr(0, url.indexOf("#/"));
                    if (Maintools_1.isLocal())
                        url = url + "?server=local";
                    //url=url+"/#/login";
                    Maintools_2.openWindow(url, "_self");
                });
            }, function () {
                vm.openPage(_this.loggedInPages[2]);
            }, (_this.userData.user.email.length > 0));
        });
        this.events.subscribe('oldevents:open', function () {
            _this.openPage(_this.loggedInPages[1]);
        });
        this.events.subscribe("open:widget", function (params) {
            Maintools_3.openModal(_this.modalCtrl, widgetstore_1.WidgetstorePage, { widgetFilter: params });
        });
        /**
         * Connexion à un événement event:login
         */
        this.events.subscribe("event:login", function (params) {
            Maintools_3.$$("Demande de connexion a ", params.event);
            var l = Maintools_2.loading(_this, "Connexion " + params.event.title);
            vm.userData.join(params.event.id, params.password, "", "", vm.userData.user.lat + "," + vm.userData.user.lng, "", vm.userData.user.currentView)
                .subscribe(function (rep) {
                l.dismiss();
                if (rep != null) {
                    vm.userData.user = rep; //On récupére une mise a jour du user
                    if (rep.message.length == 0) { //Pas de message d'alerte
                        //On met a jour eventData.event avec l'evement
                        vm.eventData.join(params.event.id, _this.userData.user.id, function (rep) {
                            if (vm.userData.user.jetons != undefined)
                                vm.jetons = vm.userData.user.jetons[vm.eventData.event.owner_id];
                            Maintools_3.$$("Suppression des options non présentes dans l'événements");
                            var rc = [];
                            var i = 0;
                            vm.enableMenu('loggedInMenuWithEvent');
                            var dest = vm.userData.user.currentView.toLowerCase(); //Récupere les meilleurs vue du serveur
                            if (dest == "undefined" || dest == null || dest.length == 0)
                                dest = params.dest;
                            if (dest == "undefined" || dest == null || dest.length == 0) {
                                dest = null;
                                vm.appPages.forEach(function (page) {
                                    if (dest == null && _this.showPage(page)) {
                                        dest = page.tabComponent.name;
                                    }
                                });
                            }
                            if (vm.eventData.event.welcomePicture.length > 0) {
                                Maintools_3.openModal(vm.modalCtrl, welcome_1.WelcomePage, { image: vm.eventData.event.welcomePicture, duration: vm.eventData.event.welcomeDuration * 1000 }, function () {
                                    _this.openPageByName(vm.appPages, dest);
                                });
                            }
                            else
                                _this.openPageByName(vm.appPages, dest);
                        });
                    }
                    else {
                        Maintools_3.toast(_this.toastCtrl, rep.message, _this.translate);
                        Maintools_3.$$("Refus de connexion");
                        _this.events.publish("event:logout");
                    }
                }
                else {
                    Maintools_3.$$("non reponse de join");
                }
            });
        });
        this.events.subscribe("screen:add", function (params) {
            _this.openPageByName(_this.loggedInPagesWithEvent, screens_1.ScreensPage.name, params);
        });
        this.events.subscribe("event:add", function (params) {
            _this.openPageByName(_this.loggedInPages, addevent_1.AddeventPage.name, params);
        });
    };
    ConferenceApp.prototype.enableMenu = function (menuName) {
        this.menu.enable(false, 'loggedInMenuWithEvent');
        this.menu.enable(false, 'loggedInMenu');
        this.menu.enable(false, 'loggedOutMenu');
        this.menu.enable(true, menuName);
        if (menuName == "loggedInMenu" && this.userData.user != null) {
            if (this.userData.user.email == null || this.userData.user.email.length == 0)
                this.loggedInPages[3].title = this.translate.instant("LIB.CLEARACCOUNT");
            else
                this.loggedInPages[3].title = this.translate.instant("LIB.LOGOUT");
        }
    };
    ConferenceApp.prototype.isActive = function (page) {
        var childNav = this.nav.getActiveChildNavs()[0];
        // Tabs are a special case because they have their own navigation
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
                return 'primary';
            }
            return;
        }
        if (this.nav.getActive() && this.nav.getActive().name === page.name) {
            return 'primary';
        }
        return;
    };
    ConferenceApp.prototype.openProfil = function () {
        Maintools_3.openModal(this.modalCtrl, perso_1.PersoPage, { from: null });
    };
    ConferenceApp.prototype.openTrajet = function () {
        var mypos = this.userData.user.lat + "," + this.userData.user.lng;
        Maintools_2.openWindow("https://www.google.com/maps/dir/'" + mypos + "'/'" + this.eventData.event.lat + "," + this.eventData.event.lng + "'");
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav),
        __metadata("design:type", ionic_angular_1.Nav)
    ], ConferenceApp.prototype, "nav", void 0);
    ConferenceApp = __decorate([
        core_1.Component({template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\app\app.template.html"*/'<ion-split-pane>\n\n  <!-- logged out menu -->\n  <ion-menu id="loggedOutMenu" [content]="content">\n\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>Menu</ion-title>\n        <ion-icon style="font-size:xx-large;margin-right: 15px" shifuid="btnHideMenu" menuToggle="left" name="arrow-dropleft"></ion-icon>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content class="outer-content">\n      <ion-list>\n        <button shifuid="buttonMenu" ion-item menuClose *ngFor="let p of loggedOutPages" (click)="openPage(p)">\n          <ion-icon item-start [title]="p.icon" [name]="p.icon" [color]="isActive(p)"></ion-icon>\n          <span style="font-weight: 200">{{p.title | translate}}</span>\n        </button>\n      </ion-list>\n\n      <ion-list style="font-weight: 200">\n        <button ion-item menuClose (click)="openTutorial()"><ion-icon item-start name="hammer"></ion-icon>{{\'LIB.TUTORIAL\' | translate}}</button>\n        <button ion-item menuClose (click)="openAbout()"><ion-icon item-start name="help"></ion-icon>{{\'LIB.ABOUT\' | translate}}&nbsp;{{settings.app_name}}</button>\n      </ion-list>\n    </ion-content>\n  </ion-menu>\n\n\n\n\n\n  <!-- logged in menu -->\n  <ion-menu id="loggedInMenu" [content]="content">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title item-start>{{userData.user.firstname}}</ion-title>\n        <ion-icon style="font-size:xx-large;margin-right: 15px" shifuid="btnHideMenu" menuToggle="left" name="arrow-dropleft"></ion-icon>\n      </ion-toolbar>\n\n    </ion-header>\n\n    <ion-content class="outer-content">\n      <ion-list>\n        <ion-list-header no-margin no-padding>\n          <ion-row>\n            <ion-col col-3>\n              <shifuimageprofil [me]="true" size="70px" [user]="userData.user"></shifuimageprofil>\n            </ion-col>\n            <ion-col text-center style="font-weight: 200;">\n              {{userData.user.email}}<br><br>\n              <shifubutton [small]="true" label="LIB.SETTINGS" (click)="openProfil()"></shifubutton>\n            </ion-col>\n          </ion-row>\n        </ion-list-header>\n        <button ion-item menuClose *ngFor="let p of loggedInPages" [hidden]="!p.visible" (click)="openPage(p)">\n          <ion-icon item-start [name]="p.icon" [title]="p.icon" [color]="isActive(p)"></ion-icon>\n          <span style="font-weight: 200">{{p.title | translate}}</span>\n        </button>\n      </ion-list>\n\n      <ion-list>\n        <!--<button ion-item menuClose (click)="openTutorial()"><ion-icon item-start name="hammer"></ion-icon>{{\'LIB.TUTORIAL\' | translate}}</button>-->\n        <button ion-item menuClose (click)="openAbout()"><ion-icon item-start name="help"></ion-icon>{{\'LIB.ABOUT\' | translate}}&nbsp;{{settings.app_name}}</button>\n        <button ion-item menuClose (click)="openSupport()"><ion-icon item-start name="build"></ion-icon>Support</button>\n      </ion-list>\n\n    </ion-content>\n\n  </ion-menu>\n\n\n  <!-- logged in menu with event -->\n  <ion-menu id="loggedInMenuWithEvent" [content]="content">\n\n    <ion-header>\n      <ion-toolbar>\n        <ion-title item-left>{{eventData.event.title}}</ion-title>\n        <ion-icon style="font-size:xx-large;margin-right: 15px" shifuid="btnHideMenu" menuToggle="left" name="arrow-dropleft"></ion-icon>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content class="outer-content">\n      <ion-list>\n      <ion-list-header>\n        <ion-row no-padding no-margin>\n          <ion-col text-left>\n            <shifuflyer [flyer]="eventData.event.flyer" height="165px" width="110px">\n              <div style="margin:10px;font-size: x-small">\n                Photos:{{eventData.event.nPhotos}}<br>\n                Songs:{{eventData.event.nSongs}}<br>\n                Messages:{{eventData.event.nMessages}}<br><br><br>\n                Fin dans {{(eventData.event.dtEnd-eventData.event.serverNow)/(60000*60) | number:\'1.0-0\'}}h{{((eventData.event.dtEnd-eventData.event.serverNow)/60000)%60 | number:\'1.0-0\'}}<br>\n                <br>\n                <shifubutton name="openTrajet"\n                             *ngIf="eventData.event.address!=null && eventData.event.address.length>0"\n                             [small]="true" icon="navigate" (click)="openTrajet()">\n                </shifubutton>\n              </div>\n            </shifuflyer>\n          </ion-col>\n          <ion-col text-center>\n            <span *ngIf="(jetons==null || jetons==0) && eventData.event.dtEnd-eventData.event.serverNow<60*1000*60">\n              {{\'LIB.ENDIN\' | translate}}<shifutimer [server]="eventData.event.serverNow" [end]="eventData.event.dtEnd"></shifutimer>\n            </span>\n\n            <shifubutton id="btnInvite" [small]="true" size="85" label="Invite" icon="person-add" (click)="inviteEvent()"></shifubutton><br>\n            <shifubutton [hidewhenclick]="true" id="btnQuitEvent" [small]="true" size="85" label="Quit" icon="log-out" (click)="events.publish(\'event:logout\')"></shifubutton><br>\n            <div *ngIf="userData.user!=undefined && userData.user.id==eventData.event.owner_id">\n              <shifubutton id="btnWidgets" [small]="true" size="85" label="iWall" icon="browsers" (click)="events.publish(\'open:widget\')"></shifubutton><br>\n              <shifubutton [hidewhenclick]="true" id="btnClose" [small]="true" size="85" label="Close" icon="close" (click)="closeEvent()"></shifubutton>\n            </div>\n\n          </ion-col>\n        </ion-row>\n\n      </ion-list-header>\n      <button ion-item menuClose *ngFor="let p of appPages" (click)="openPage(p)" [hidden]="!showPage(p)">\n          <ion-icon item-start [title]="p.icon" [name]="p.icon" [color]="isActive(p)"></ion-icon>\n        <span style="font-weight: 200">{{p.title | translate}}</span>\n      </button>\n      </ion-list>\n\n      <ion-list>\n        <ion-list-header>\n          <ion-row>\n            <ion-col>\n              <shifuimageprofil id="imgProfil" [me]="true" [user]="userData.user"></shifuimageprofil>\n            </ion-col>\n            <ion-col text-start>\n              <span style="font-size: medium" *ngIf="jetons>0">\n              {{jetons}}&nbsp;<img src="./assets/img/money.png" style="width:15px;">\n            </span>\n              <shifunote [object]="userData.user"></shifunote>\n            </ion-col>\n          </ion-row>\n        </ion-list-header>\n        <div *ngFor="let p of loggedInPagesWithEvent">\n          <button ion-item menuClose *ngIf="!p.onlyAdmin || userData.user.id==eventData.event.owner_id" (click)="openPage(p)">\n            <ion-icon item-start [title]="p.icon" [name]="p.icon" [color]="isActive(p)"></ion-icon>\n            <span style="font-weight: 200">{{p.title | translate}}</span>\n          </button>\n        </div>\n      </ion-list>\n\n      <ion-list>\n        <!--<button ion-item menuClose (click)="openTutorial()"><ion-icon item-start name="hammer"></ion-icon>{{\'LIB.TUTORIAL\' | translate}}</button>-->\n        <button ion-item menuClose (click)="openAbout()"><ion-icon item-start name="help"></ion-icon>{{\'LIB.ABOUT\' | translate}}&nbsp;{{settings.app_name}}</button>\n        <button ion-item menuClose (click)="openSupport()"><ion-icon item-start name="build"></ion-icon>Support</button>\n      </ion-list>\n\n    </ion-content>\n\n  </ion-menu>\n\n\n  <!-- main navigation -->\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false" main name="app"></ion-nav>\n\n</ion-split-pane>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\app\app.template.html"*/
        }),
        __metadata("design:paramtypes", [network_1.Network,
            ionic_angular_1.Events,
            ionic_angular_1.ModalController,
            user_data_1.UserData,
            ionic_angular_1.MenuController,
            ionic_angular_2.Platform,
            api_1.ApiProvider, ionic_angular_2.ToastController,
            storage_1.Storage,
            core_2.TranslateService,
            event_data_1.EventDataProvider,
            platform_browser_1.DomSanitizer,
            settings_1.SettingsProvider,
            ionic_angular_1.AlertController,
            ionic_angular_1.LoadingController,
            ionic_angular_1.App])
    ], ConferenceApp);
    return ConferenceApp;
}());
exports.ConferenceApp = ConferenceApp;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var Tools = __webpack_require__(2);
var user_data_1 = __webpack_require__(8);
var api_1 = __webpack_require__(16);
var event_data_1 = __webpack_require__(15);
var Maintools_1 = __webpack_require__(2);
var core_2 = __webpack_require__(7);
var perso_1 = __webpack_require__(83);
/**
 * Parametres : userid,reader
 */
var PublicProfilPage = /** @class */ (function () {
    function PublicProfilPage(api, eventData, userData, translate, viewCtrl, navCtrl, toastCtrl, modalCtrl, navParams, alertCtrl) {
        this.api = api;
        this.eventData = eventData;
        this.userData = userData;
        this.translate = translate;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.old_events = [];
        this.next_events = [];
        this.follow = false;
        this.reader = null;
        this.roles = [false, false, false, false];
        this.photos = [];
        this.jetons = 0;
        this.reader_jetons = 0;
        this.user = { id: "", firstname: "", picture: "", score: 0 }; //celui qui lit le profil
        this.openWebsite = function (user) {
            Tools.openWindow(user.home, user.firstname + " website");
        };
        this.refresh();
    }
    PublicProfilPage.prototype.refresh = function () {
        var _this = this;
        var vm = this;
        this.reader = vm.navParams.get("follower");
        var target = vm.navParams.get("userid"); //la target
        if (this.reader != null)
            this.api.get(this.reader).subscribe(function (rep) {
                if (rep != null && rep.jetons != undefined)
                    _this.reader_jetons = rep.jetons[target];
                if (vm.eventData.event != undefined) {
                    vm.roles[1] = vm.eventData.event.Moderators.indexOf(target) > -1;
                    vm.roles[2] = vm.eventData.event.Cashiers.indexOf(target) > -1;
                    vm.roles[3] = vm.eventData.event.Preparators.indexOf(target) > -1;
                }
            });
        this.api.get(target).subscribe(function (rep) {
            vm.user = rep;
            if (rep.jetons != undefined && rep.jetons[vm.reader] != undefined)
                vm.jetons = rep.jetons[vm.reader];
            if (vm.user.readers == undefined)
                vm.user.readers = [];
            if (vm.user.followers != undefined)
                vm.follow = vm.user.followers.indexOf(vm.reader) > -1;
            vm.api.getphotofromuser(_this.user.id).subscribe(function (resp) {
                vm.photos = resp.items;
            });
            vm.api.geteventsfrom(_this.user.id).subscribe(function (evts) {
                evts.items.forEach(function (evt) {
                    var now = new Date().getTime();
                    if (evt.dtEnd < now)
                        vm.old_events.push(evt);
                    if (evt.dtStart > now)
                        vm.next_events.push(evt);
                });
            });
        });
    };
    PublicProfilPage.prototype.updaterole = function (role) {
        var _this = this;
        this.eventData.updaterole(this.user.id, role, !this.roles[role]).subscribe(function (r) {
            if (r != null) {
                _this.eventData.event = r;
                Maintools_1.toast(_this.toastCtrl, _this.user.firstname + " " + _this.translate.instant("LIB.UPDATE"));
                _this.refresh();
            }
        });
    };
    // joinEvent(evt){
    //   if(evt.dtEnd<this.now)
    //     this.viewCtrl.dismiss({event:evt.id});
    //   else
    //     this.viewCtrl.dismiss({event:evt.id});
    // };
    PublicProfilPage.prototype.updateFollow = function () {
        var _this = this;
        if (this.userData.user.email.length == 0) {
            Maintools_1.toast(this.toastCtrl, "PUBLICPROFIL.GIVEEMAILTOFOLLOW", this.translate);
            setTimeout(function () {
                Maintools_1.openModal(_this.modalCtrl, perso_1.PersoPage, {}, function () {
                    if (_this.userData.user.email.length > 0)
                        _this.updateFollow();
                    else
                        _this.follow = false;
                });
            }, 2000);
        }
        if (!this.follow)
            this.api.delFollower(this.user.id, this.reader).subscribe(function (rep) { });
        else
            this.api.addFollower(this.user.id, this.reader).subscribe(function (rep) { });
        ;
    };
    ;
    PublicProfilPage.prototype.addBlacklist = function () {
        var _this = this;
        this.api.blacklist(this.navParams.get("follower"), this.navParams.get("userid"), true).subscribe(function (r) {
            if (r != null)
                Maintools_1.toast(_this.toastCtrl, _this.user.firstname + " " + _this.translate.instant("PUBLICPROFIL.ADDTOBLACKLIST"));
        });
    };
    PublicProfilPage.prototype.chargeCredits = function (u, credit) {
        if (credit === void 0) { credit = true; }
        var vm = this;
        var title = "LIB.CREDITS";
        if (!credit)
            title = "LIB.DEBITS";
        Maintools_1.showPopup({ title: title, confirmButton: "LIB.OK", cancelButton: "LIB.CANCEL", type: "number", translate: this.translate }, this.alertCtrl, function (res) {
            if (!credit)
                res = -res;
            if (res != null)
                vm.api.chargecredits(vm.eventData.event.owner_id, u.id, res).subscribe(function (r) {
                    vm.refresh();
                });
        });
    };
    PublicProfilPage = __decorate([
        core_1.Component({
            selector: 'page-public-profil',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\public-profil\public-profil.html"*/'<!--\n  Generated template for the PublicProfilPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <shifutitle title="Public profil">\n    <shifubutton id="btnClose" icon="close" (click)="viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n\n</ion-header>\n\n\n<ion-content no-padding>\n  <tuto [if]="userData.user.connexions.length>5 && eventData.event.Cashiers!=undefined && eventData.event.Cashiers.indexOf(userData.user.id)>-1" label="PUBLICPROFIL.TUTO_CREDITS"></tuto>\n  <shifuprofil [user]="user" [openprofil]="false">\n    <div *ngIf="reader!=undefined && user.id!=reader">\n      <shifucheckbox id="chkFollow" label="LIB.FOLLOW" [(ngModel)]="follow" (onchange)="updateFollow()"></shifucheckbox><br>\n      <span *ngIf="reader_jetons>0">{{"LIB.YOUHAVE" | translate}}&nbsp;\n        {{reader_jetons}}<img src="./assets/img/money.png" class="money-small">\n        &nbsp;{{"LIB.WITHHIM" | translate}}\n    </span><br>\n      <span style="margin-left:5px">\n        <shifubutton item-end id="btnCredit" [small]="true" *ngIf="eventData.event.Cashiers!=undefined && eventData.event.Cashiers.indexOf(userData.user.id)>-1" icon="add" (click)="chargeCredits(user,true)"></shifubutton>\n        <shifubutton item-end id="btnDebit" [small]="true" *ngIf="eventData.event.Cashiers!=undefined && eventData.event.Cashiers.indexOf(userData.user.id)>-1" icon="remove" (click)="chargeCredits(user,false)"></shifubutton>\n      </span>\n    </div>\n\n\n\n    <ion-item *ngIf="eventData.event.id!=undefined && user.id!=reader">\n\n      <!--<span style="font-size: medium">-->\n      <!--{{"LIB.ACCOUNT" | translate}}:{{jetons_in_event}}&nbsp;<img src="./assets/img/money.png" class="money-small">-->\n      <!--</span>-->\n\n\n    </ion-item>\n  </shifuprofil>\n\n  <div *ngIf="userData.user.id!=undefined && user.id!=userData.user.id">\n    <tuto [if]="eventData.event.owner_id==userData.user.id && user.id!=userData.user.id" label="PUBLICPROFIL.TUTO_ADMIN"></tuto>\n    <shifucard title="Roles" *ngIf="userData.user.id==eventData.event.owner_id && user.id!=userData.user.id">\n      <shifucheckbox id="chkModerator" label="LIB.MODERATOR" [(ngModel)]="roles[1]" (onchange)="updaterole(1)"></shifucheckbox>\n      <shifucheckbox id="chkCashier" label="LIB.CASHIER" [(ngModel)]="roles[2]"  (onchange)="updaterole(2)"></shifucheckbox>\n      <shifucheckbox id="chkPreparator" label="LIB.PREPARATOR" [(ngModel)]="roles[3]"  (onchange)="updaterole(3)"></shifucheckbox>\n    </shifucard>\n\n    <div *ngIf="eventData.event.owner_id==userData.user.id" style="text-align: center;width:100%">\n      <shifubutton id="btnBlacklist" label="Blacklist" (click)="addBlacklist(user.id)"></shifubutton>\n    </div>\n\n  </div>\n\n  <br>\n  <img *ngFor="let photo of photos" class="vignette" src="{{photo.photo}}">\n\n\n  <shifucard [id]="NextEvents" title="LIB.NEXTEVENTS" *ngIf="next_events.length>0" >\n    <div *ngFor="let evt of next_events" style="display:inline-block;width:150px;margin:5px;">\n      <shifuevent [event]="evt"></shifuevent>\n    </div>\n  </shifucard>\n\n  <!--<shifucard [id]="MyEvents" title="LIB.OLDEVENTS" *ngIf="old_events.length>0" >-->\n  <!--<div *ngFor="let evt of old_events" style="display:inline-block;width:150px;margin:5px;">-->\n  <!--<shifuevent [event]="evt"></shifuevent>-->\n  <!--</div>-->\n  <!--</shifucard>-->\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\public-profil\public-profil.html"*/,
        }),
        __metadata("design:paramtypes", [api_1.ApiProvider, event_data_1.EventDataProvider, user_data_1.UserData, core_2.TranslateService,
            ionic_angular_1.ViewController, ionic_angular_1.NavController, ionic_angular_1.ToastController, ionic_angular_1.ModalController,
            ionic_angular_1.NavParams, ionic_angular_1.AlertController])
    ], PublicProfilPage);
    return PublicProfilPage;
}());
exports.PublicProfilPage = PublicProfilPage;
//# sourceMappingURL=public-profil.js.map

/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var PopoverPage = /** @class */ (function () {
    function PopoverPage(viewCtrl, navCtrl, app, modalCtrl) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.app = app;
        this.modalCtrl = modalCtrl;
    }
    PopoverPage.prototype.support = function () {
        this.app.getRootNav().push('SupportPage');
        this.viewCtrl.dismiss();
    };
    PopoverPage.prototype.close = function (url) {
        window.open(url, '_blank');
        this.viewCtrl.dismiss();
    };
    PopoverPage = __decorate([
        core_1.Component({
            template: "\n    <ion-list>\n      <button ion-item (click)=\"close('http://ionicframework.com/docs/v2/getting-started')\">Learn Ionic</button>\n      <button ion-item (click)=\"close('http://ionicframework.com/docs/v2')\">Documentation</button>\n      <button ion-item (click)=\"close('http://showcase.ionicframework.com')\">Showcase</button>\n      <button ion-item (click)=\"close('https://github.com/ionic-team/ionic')\">GitHub Repo</button>\n      <button ion-item (click)=\"support()\">Support</button>\n    </ion-list>\n  "
        }),
        __metadata("design:paramtypes", [ionic_angular_1.ViewController,
            ionic_angular_1.NavController,
            ionic_angular_1.App,
            ionic_angular_1.ModalController])
    ], PopoverPage);
    return PopoverPage;
}());
exports.PopoverPage = PopoverPage;
//# sourceMappingURL=about-popover.js.map

/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
/**
 * Generated class for the BoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BoardPage = /** @class */ (function () {
    function BoardPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    BoardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BoardPage');
    };
    BoardPage = __decorate([
        core_1.Component({
            selector: 'page-board',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\board\board.html"*/'<!--\n  Generated template for the BoardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>board</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\board\board.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.NavParams])
    ], BoardPage);
    return BoardPage;
}());
exports.BoardPage = BoardPage;
//# sourceMappingURL=board.js.map

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Generated class for the OrderByPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var OrderByPipe = /** @class */ (function () {
    function OrderByPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    OrderByPipe.prototype.transform = function (array, field) {
        array.sort(function (a, b) {
            if (a[field] < b[field]) {
                return -1;
            }
            else if (a[field] > b[field]) {
                return 1;
            }
            else {
                return 0;
            }
        });
        return array;
    };
    OrderByPipe = __decorate([
        core_1.Pipe({
            name: 'orderBy',
        })
    ], OrderByPipe);
    return OrderByPipe;
}());
exports.OrderByPipe = OrderByPipe;
//# sourceMappingURL=order-by.js.map

/***/ }),

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    /**
   * Takes a value and makes it lowercase.
   */
    FilterPipe.prototype.transform = function (items, field, value) {
        if (!items)
            return [];
        if (!value || value.length == 0)
            return items;
        return items.filter(function (it) {
            var rc = true;
            var values = value.split(" AND ");
            values.forEach(function (v) {
                v = v.trim();
                if (rc && it[field].toLowerCase().indexOf(v.toLowerCase()) == -1)
                    rc = false;
            });
            return rc;
        });
    };
    FilterPipe = __decorate([
        core_1.Pipe({
            name: 'filter',
        })
    ], FilterPipe);
    return FilterPipe;
}());
exports.FilterPipe = FilterPipe;
//# sourceMappingURL=filter.js.map

/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Generated class for the FocusmeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
var FocusmeDirective = /** @class */ (function () {
    function FocusmeDirective(el) {
        this.el = el;
        setTimeout(function () {
            el.nativeElement.focus();
        }, 100);
    }
    FocusmeDirective = __decorate([
        core_1.Directive({
            selector: '[focusme]' // Attribute selector
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], FocusmeDirective);
    return FocusmeDirective;
}());
exports.FocusmeDirective = FocusmeDirective;
//# sourceMappingURL=focusme.js.map

/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(7);
/**
 * Generated class for the ShifubuttonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifubuttonComponent = /** @class */ (function () {
    function ShifubuttonComponent(translate) {
        this.translate = translate;
        this.icon = "";
        this.small = false;
        this.hidewhenclick = false;
        this.tips = "";
        this.outline = false;
        this.color = "primary";
        this.size = "";
        this.label = "";
        this.fontsize = "normal";
        this.sizeicon = "large";
        this.paddingLeftRight = "12px";
        this.size_number = 0;
        this.beclick = false;
        this.height = "35px";
    }
    ShifubuttonComponent.prototype.ngOnInit = function () {
        //Les boutons icones ont tous la meme taille
        if (this.label.length == 0 && this.icon.length > 0 && this.size.length == 0)
            this.size = "40px";
        if (this.small) {
            this.paddingLeftRight = "6px";
            this.sizeicon = "large";
            this.fontsize = "small";
            this.height = "30px";
        }
        else {
            this.sizeicon = "x-large";
            this.fontsize = "normal";
        }
        if (!this.size.endsWith("px"))
            this.size = this.size + "px";
        this.size_number = Number(this.size.replace("px", ""));
        if (this.label.indexOf(".") > -1)
            this.label = this.translate.instant(this.label);
    };
    ShifubuttonComponent.prototype.onclick = function () {
        var _this = this;
        this.beclick = true;
        setTimeout(function () { _this.beclick = false; }, 10000);
    };
    __decorate([
        core_1.Input('icon'),
        __metadata("design:type", String)
    ], ShifubuttonComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input('small'),
        __metadata("design:type", Boolean)
    ], ShifubuttonComponent.prototype, "small", void 0);
    __decorate([
        core_1.Input('hidewhenclick'),
        __metadata("design:type", Boolean)
    ], ShifubuttonComponent.prototype, "hidewhenclick", void 0);
    __decorate([
        core_1.Input('tips'),
        __metadata("design:type", String)
    ], ShifubuttonComponent.prototype, "tips", void 0);
    __decorate([
        core_1.Input('outline'),
        __metadata("design:type", Boolean)
    ], ShifubuttonComponent.prototype, "outline", void 0);
    __decorate([
        core_1.Input('color'),
        __metadata("design:type", String)
    ], ShifubuttonComponent.prototype, "color", void 0);
    __decorate([
        core_1.Input('size'),
        __metadata("design:type", String)
    ], ShifubuttonComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input('label'),
        __metadata("design:type", String)
    ], ShifubuttonComponent.prototype, "label", void 0);
    ShifubuttonComponent = __decorate([
        core_1.Component({
            selector: 'shifubutton',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifubutton\shifubutton.html"*/'<!-- Generated template for the ShifubuttonComponent component -->\n<button [color]="color"\n        [outline]="outline"\n        [ngStyle]="{\'width\':size,\'font-size\':fontsize,\n                    \'padding-left\':paddingLeftRight,\'padding-right\':paddingLeftRight,\n                    \'padding-top\':\'0px\',\'padding-bottom\':\'0px\',\n                    \'margin\':\'2px\',\'height\':height}"\n        [small]="small"\n        title="{{tips}}"\n        ion-button\n        (click)="onclick()"\n>\n\n    <div *ngIf="icon.length>0 && (hidewhenclick==false || (beclick==false && hidewhenclick==true))">\n      <ion-icon [ngStyle]="{\'font-size\':sizeicon}" *ngIf="icon.indexOf(\'assets\')==-1" name="{{icon}}"></ion-icon>\n      <img *ngIf="icon.indexOf(\'assets\')>-1" src="{{icon}}" [ngStyle]="{\'width\':(size_number*0.9)+\'px\',\'font-size\':fontsize}">\n    </div>\n\n    <div *ngIf="label.length>0 && icon.length>0  && (hidewhenclick==false || (beclick==false && hidewhenclick==true)) ">&nbsp;&nbsp;</div>\n    <div *ngIf="label.length>0  && (hidewhenclick==false || (beclick==false && hidewhenclick==true)) ">\n      {{label | translate }}\n    </div>\n\n  <div *ngIf="hidewhenclick && beclick">\n    <img src="./assets/img/wait.gif" style="width:18px;">\n  </div>\n\n</button>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifubutton\shifubutton.html"*/
        }),
        __metadata("design:paramtypes", [core_2.TranslateService])
    ], ShifubuttonComponent);
    return ShifubuttonComponent;
}());
exports.ShifubuttonComponent = ShifubuttonComponent;
//# sourceMappingURL=shifubutton.js.map

/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
/**
 * Generated class for the ShifuinputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifuinputComponent = /** @class */ (function () {
    function ShifuinputComponent() {
        this.placeholder = "";
        this.label = "";
        this.size = 300;
        this.fontsize = "normal";
        this.elt = "";
        this.clearInput = false;
        this.align = "left"; //ou right ou center
        this._type = "text";
        this.focus = false;
        this.onchange = new core_1.EventEmitter();
        this.onclick = new core_1.EventEmitter();
        this.onblur = new core_1.EventEmitter();
        this.onenter = new core_1.EventEmitter();
        this.len_text = 0;
    }
    ShifuinputComponent.prototype.onkeypress = function (evt) {
        if (evt.keyCode == 13) {
            this.onenter.emit({ value: this.myinput.value });
            return;
        }
        else {
            this.onchange.emit();
        }
        if (this.myinput.value != null)
            this.len_text = this.myinput.value.length;
        else
            this.len_text = 0;
        if (this.len_text > this.size) {
            this.myinput.value = this.myinput.value.substring(0, this.size - 1);
            this.len_text = this.myinput.value.length;
            evt.preventDefault();
        }
    };
    ShifuinputComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.myinput.setElementStyle("font-size", this.fontsize);
        this.myinput.setElementStyle("text-align", this.align);
        if (this.focus) {
            //this.myinput.setElementAttribute("autofocus","");
            setTimeout(function () {
                _this.myinput.setFocus();
            }, 500);
        }
    };
    __decorate([
        core_1.Input('placeholder'),
        __metadata("design:type", String)
    ], ShifuinputComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input('label'),
        __metadata("design:type", String)
    ], ShifuinputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input('size'),
        __metadata("design:type", Number)
    ], ShifuinputComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input('fontsize'),
        __metadata("design:type", String)
    ], ShifuinputComponent.prototype, "fontsize", void 0);
    __decorate([
        core_1.Input('elt'),
        __metadata("design:type", String)
    ], ShifuinputComponent.prototype, "elt", void 0);
    __decorate([
        core_1.Input('clearInput'),
        __metadata("design:type", Object)
    ], ShifuinputComponent.prototype, "clearInput", void 0);
    __decorate([
        core_1.Input('align'),
        __metadata("design:type", String)
    ], ShifuinputComponent.prototype, "align", void 0);
    __decorate([
        core_1.Input('type'),
        __metadata("design:type", String)
    ], ShifuinputComponent.prototype, "_type", void 0);
    __decorate([
        core_1.Input('focus'),
        __metadata("design:type", Boolean)
    ], ShifuinputComponent.prototype, "focus", void 0);
    __decorate([
        core_1.Output('onchange'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifuinputComponent.prototype, "onchange", void 0);
    __decorate([
        core_1.Output('onclick'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifuinputComponent.prototype, "onclick", void 0);
    __decorate([
        core_1.Output('onblur'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifuinputComponent.prototype, "onblur", void 0);
    __decorate([
        core_1.Output('onenter'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifuinputComponent.prototype, "onenter", void 0);
    __decorate([
        core_1.ViewChild("myinput"),
        __metadata("design:type", ionic_angular_1.TextInput)
    ], ShifuinputComponent.prototype, "myinput", void 0);
    ShifuinputComponent = __decorate([
        core_1.Component({
            selector: 'shifuinput',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuinput\shifuinput.html"*/'<!-- Generated template for the ShifuinputComponent component -->\n<ion-item style="font-weight: 200">\n  <ion-label (click)="clickLabel()" color="primary" floating>{{label | translate }}</ion-label>\n    <ion-input\n                #myinput\n                id="{{elt}}" type="{{_type}}"\n                max="{{size}}"\n                (ionBlur)="onblur.emit()"\n                [clearInput]="clearInput"\n                placeholder=\'{{placeholder | translate}}\'\n                (keyup)="onkeypress($event)">\n    </ion-input>\n</ion-item>\n<span style="font-size: x-small;color:lightgray;" *ngIf="size-len_text<20">\n      {{len_text}}/{{size}}\n</span>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuinput\shifuinput.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ShifuinputComponent);
    return ShifuinputComponent;
}());
exports.ShifuinputComponent = ShifuinputComponent;
//# sourceMappingURL=shifuinput.js.map

/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(32);
var noop_1 = __webpack_require__(342);
var core_2 = __webpack_require__(7);
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return ShifurangeComponent; }),
    multi: true
};
var ShifurangeComponent = /** @class */ (function () {
    function ShifurangeComponent(translate) {
        this.translate = translate;
        this.onchange = new core_1.EventEmitter();
        this.onmove = new core_1.EventEmitter();
        this.label = "";
        this.min = 0;
        //@Input("elt") elt:string="";
        this.icon = "";
        this.max = 100;
        this.step = 1;
        this.unite = "";
        this.innerValue = '';
        this.handle = null;
        //Placeholders for the callbacks which are later provided
        //by the Control Value Accessor
        this.onTouchedCallback = noop_1.noop;
        this.onChangeCallback = noop_1.noop;
    }
    Object.defineProperty(ShifurangeComponent.prototype, "value", {
        //get accessor
        get: function () {
            return this.innerValue;
        },
        //set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
                this.onChangeValue();
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    ShifurangeComponent.prototype.changeValue = function (score) {
        this.writeValue(this.innerValue + score);
        this.onChangeValue();
    };
    ShifurangeComponent.prototype.onChangeValue = function () {
        var vm = this;
        vm.onmove.emit();
        if (this.handle != null) {
            clearTimeout(this.handle);
            this.handle = null;
        }
        this.handle = setTimeout(function () {
            vm.onchange.emit({ value: vm.value });
        }, 1000);
    };
    ShifurangeComponent.prototype.writeValue = function (obj) {
        if (obj !== this.innerValue) {
            this.innerValue = obj;
        }
    };
    ShifurangeComponent.prototype.registerOnChange = function (fn) { this.onChangeCallback = fn; };
    ShifurangeComponent.prototype.registerOnTouched = function (fn) { this.onTouchedCallback = fn; };
    ShifurangeComponent.prototype.ngOnInit = function () {
        if (this.label.indexOf(".") > -1)
            this.label = this.translate.instant(this.label);
    };
    __decorate([
        core_1.Output('onchange'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifurangeComponent.prototype, "onchange", void 0);
    __decorate([
        core_1.Output('onmove'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifurangeComponent.prototype, "onmove", void 0);
    __decorate([
        core_1.Input("label"),
        __metadata("design:type", String)
    ], ShifurangeComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input("min"),
        __metadata("design:type", Number)
    ], ShifurangeComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input("icon"),
        __metadata("design:type", String)
    ], ShifurangeComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input("max"),
        __metadata("design:type", Number)
    ], ShifurangeComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input("step"),
        __metadata("design:type", Number)
    ], ShifurangeComponent.prototype, "step", void 0);
    __decorate([
        core_1.Input("unite"),
        __metadata("design:type", String)
    ], ShifurangeComponent.prototype, "unite", void 0);
    ShifurangeComponent = __decorate([
        core_1.Component({
            selector: 'shifurange',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifurange\shifurange.html"*/'<!-- Generated template for the ShifurangeComponent component -->\n<ion-row text-left no-padding style="margin-top:20px;margin-bottom:20px">\n  <ion-col margin-left="5px" >\n    <ion-label\n            style="font-weight: 200;font-size:medium;" no-margin no-padding>\n      {{label | translate }}\n    </ion-label>\n\n    <ion-range  no-margin no-padding min="{{min}}" max="{{max}}" step="{{step}}" [(ngModel)]="value" color="secondary">\n      <ion-icon range-left small name="{{icon}}" (click)="changeValue(-1)"></ion-icon>\n      <ion-icon range-right name="{{icon}}" (click)="changeValue(+1)"></ion-icon>\n    </ion-range>\n  </ion-col>\n  <ion-col *ngIf="unite.length>0" no-margin no-padding text-center col-2>\n    <span *ngIf="value<100" no-margin style="font-size: xx-large">\n      <ion-input type="number" text-center no-padding no-margin style="text-align: center" [(ngModel)]="value"></ion-input>\n    </span>\n\n    <span *ngIf="value>100" no-margin no-padding style="font-size: x-large;padding-bottom:6px;">\n      <ion-input  type="number" text-center style="text-align: center" [(ngModel)]="value"></ion-input>\n    </span>\n    <p style="margin:0px;padding:0px;font-size: x-small">{{unite | translate}}</p>\n  </ion-col>\n</ion-row>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifurange\shifurange.html"*/,
            providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_2.TranslateService])
    ], ShifurangeComponent);
    return ShifurangeComponent;
}());
exports.ShifurangeComponent = ShifurangeComponent;
//# sourceMappingURL=shifurange.js.map

/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var user_data_1 = __webpack_require__(8);
var Tools = __webpack_require__(2);
var storage_1 = __webpack_require__(42);
var Maintools_1 = __webpack_require__(2);
var core_2 = __webpack_require__(7);
/**
 * Generated class for the TutoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var TutoComponent = /** @class */ (function () {
    function TutoComponent(renderer, userData, storage, translate) {
        this.renderer = renderer;
        this.userData = userData;
        this.storage = storage;
        this.translate = translate;
        this.label = "";
        this._if = true;
        this.icon = "";
        this.help = "";
        this.eltToShow = "";
        this.delay = 15;
        this.pseudo = "";
        this.start = 0.2;
        this.position = "relative"; //Peut être a titre pour centrer le message
        this.show = false;
        this.alignText = "left";
        this.labels = [];
    }
    TutoComponent.prototype.getPosition = function (el) {
        var xPos = 0;
        var yPos = 0;
        while (el) {
            if (el.tagName == "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;
                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            }
            else {
                // for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }
            el = el.offsetParent;
        }
        return {
            x: xPos,
            y: yPos
        };
    };
    TutoComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.label.indexOf("%%") > -1) {
            this.label = this.label.split("%%")[0] + Maintools_1.tirage(Number(this.label.split("%%")[1]));
        }
        if (this.label.length > 0)
            this.label = this.translate.instant(this.label);
        var vm = this;
        var code = Tools.hashCode(this.label);
        if (this.icon.length == 0 || this.position == "title")
            this.alignText = "center";
        if (this._if && this.label.length > 0) {
            setTimeout(function () {
                _this.storage.get(_this.pseudo + ":" + _this.label).then(function (rep) {
                    if ((vm.userData.user.history == undefined && rep == null) || (vm.userData.user.history != undefined && vm.userData.user.history.indexOf(code) == -1)) {
                        vm.show = true;
                        vm.userData.user.history += ";" + Tools.hashCode(_this.label);
                        vm.userData.senduser("history").subscribe(function () { });
                        //Fait clignoter l'element designé
                        var elt = document.getElementById(vm.eltToShow);
                        if (elt == null) {
                            var l_elts = document.getElementsByName(vm.eltToShow);
                            if (l_elts.length > 0)
                                elt = l_elts[0];
                        }
                        if (elt != null) {
                            elt.style.animationName = "clignote";
                            elt.style.animationDuration = "1s";
                            elt.style.animationIterationCount = "5";
                        }
                        if (vm.userData.user.history == undefined)
                            vm.storage.set(_this.pseudo + ":" + _this.label, "viewed");
                        else {
                            setTimeout(function () {
                                vm.show = false;
                            }, _this.delay * 1000);
                        }
                    }
                    //Decoupe du label
                    _this.labels = _this.label.split("<br>");
                });
            }, this.start * 1000);
        }
    };
    TutoComponent.prototype.onMouseUp = function () {
        var _this = this;
        setTimeout(function () { _this.show = false; }, 500);
    };
    TutoComponent.prototype.onHelp = function () {
        if (this.help.length > 0)
            Maintools_1.openHelp(this.help);
    };
    __decorate([
        core_1.Input('label'),
        __metadata("design:type", String)
    ], TutoComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input('if'),
        __metadata("design:type", Boolean)
    ], TutoComponent.prototype, "_if", void 0);
    __decorate([
        core_1.Input('icon'),
        __metadata("design:type", String)
    ], TutoComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input('help'),
        __metadata("design:type", String)
    ], TutoComponent.prototype, "help", void 0);
    __decorate([
        core_1.Input('show'),
        __metadata("design:type", String)
    ], TutoComponent.prototype, "eltToShow", void 0);
    __decorate([
        core_1.Input('delay'),
        __metadata("design:type", Number)
    ], TutoComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input('pseudo'),
        __metadata("design:type", String)
    ], TutoComponent.prototype, "pseudo", void 0);
    __decorate([
        core_1.Input('start'),
        __metadata("design:type", Number)
    ], TutoComponent.prototype, "start", void 0);
    __decorate([
        core_1.Input('position'),
        __metadata("design:type", String)
    ], TutoComponent.prototype, "position", void 0);
    TutoComponent = __decorate([
        core_1.Component({
            selector: 'tuto',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\tuto\tuto.html"*/'<ion-item\n  text-center text-wrap no-border no-lines no-margin no-padding\n  style="background-color:transparent;font-weight: 200;padding-left:10px;padding-right:10px;"\n  (mouseup)="onMouseUp()"\n  *ngIf="position==\'title\' && show">\n  <span style="font-size:small;" text-wrap *ngFor="let line of labels">{{line}}<br></span>\n  <ng-content></ng-content>\n</ion-item>\n\n<ion-item *ngIf="position==\'relative\' && show"\n          no-border no-lines text-center text-wrap (click)="show=false"\n          style="background-color: transparent;padding:3px;">\n\n    <ion-icon\n            *ngIf="icon!=undefined && icon.length>0"\n            style="font-size: xx-large;padding:3px;"\n            [name]="icon">\n    </ion-icon>\n\n  <span (click)="onHelp()" style="font-size: small;font-weight: 200;">\n    {{label | translate}}\n    &nbsp;<ion-icon *ngIf="help.length>0"  name="help-circle"></ion-icon>\n    <br>\n  </span>\n\n  <!--<ion-icon style="font-size: large;" name="close-circle"></ion-icon>-->\n</ion-item>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\tuto\tuto.html"*/
        }),
        __metadata("design:paramtypes", [core_1.Renderer2, user_data_1.UserData, storage_1.Storage, core_2.TranslateService])
    ], TutoComponent);
    return TutoComponent;
}());
exports.TutoComponent = TutoComponent;
//# sourceMappingURL=tuto.js.map

/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Generated class for the ShifuimagefileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifuimagefileComponent = /** @class */ (function () {
    function ShifuimagefileComponent() {
        console.log('Hello ShifuimagefileComponent Component');
        this.text = 'Hello World';
    }
    ShifuimagefileComponent = __decorate([
        core_1.Component({
            selector: 'shifuimagefile',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuimagefile\shifuimagefile.html"*/'<!-- Generated template for the ShifuimagefileComponent component -->\n<div>\n  {{text}}\n</div>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuimagefile\shifuimagefile.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ShifuimagefileComponent);
    return ShifuimagefileComponent;
}());
exports.ShifuimagefileComponent = ShifuimagefileComponent;
//# sourceMappingURL=shifuimagefile.js.map

/***/ }),

/***/ 560:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Generated class for the ShifugroupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifugroupComponent = /** @class */ (function () {
    function ShifugroupComponent() {
        this.labels = [];
    }
    __decorate([
        core_1.Input('labels'),
        __metadata("design:type", Array)
    ], ShifugroupComponent.prototype, "labels", void 0);
    ShifugroupComponent = __decorate([
        core_1.Component({
            selector: 'shifugroup',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifugroup\shifugroup.html"*/'<!-- Generated template for the ShifugroupComponent component -->\n<ion-segment color="primary" (ionChange)="segmentChanged($event)" *ngFor="let item of labels" >\n  <ion-segment-button [value]="item.value">\n    {{item.label}}\n  </ion-segment-button>\n</ion-segment>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifugroup\shifugroup.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ShifugroupComponent);
    return ShifugroupComponent;
}());
exports.ShifugroupComponent = ShifugroupComponent;
//# sourceMappingURL=shifugroup.js.map

/***/ }),

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var Tools = __webpack_require__(2);
var ionic_angular_1 = __webpack_require__(3);
/**
 * Generated class for the ShifutitleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifutitleComponent = /** @class */ (function () {
    function ShifutitleComponent(navCtrl) {
        this.navCtrl = navCtrl;
        this.label = "";
        this.title = "";
        this.menu = true;
        this.back = true;
        this.help = "";
        this.onclickbutton = new core_1.EventEmitter();
        this.onclose = new core_1.EventEmitter();
        this.close = false;
    }
    ShifutitleComponent.prototype.ngOnInit = function () {
        if (this.onclose.observers.length > 0)
            this.close = true;
    };
    ShifutitleComponent.prototype.showHelp = function () {
        if (this.help == "#") {
            Tools.openHelp("#" + this.navCtrl.getActive().id);
        }
        else
            Tools.openHelp(this.help);
    };
    ShifutitleComponent.prototype.navBarButton = function () {
        this.onclickbutton.next({ value: "go" });
    };
    __decorate([
        core_1.Input("label"),
        __metadata("design:type", String)
    ], ShifutitleComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input("title"),
        __metadata("design:type", String)
    ], ShifutitleComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input("menu"),
        __metadata("design:type", Boolean)
    ], ShifutitleComponent.prototype, "menu", void 0);
    __decorate([
        core_1.Input("back"),
        __metadata("design:type", Boolean)
    ], ShifutitleComponent.prototype, "back", void 0);
    __decorate([
        core_1.Input("help"),
        __metadata("design:type", String)
    ], ShifutitleComponent.prototype, "help", void 0);
    __decorate([
        core_1.Output('onclick'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifutitleComponent.prototype, "onclickbutton", void 0);
    __decorate([
        core_1.Output('onclose'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifutitleComponent.prototype, "onclose", void 0);
    ShifutitleComponent = __decorate([
        core_1.Component({
            selector: 'shifutitle',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifutitle\shifutitle.html"*/'<!-- Generated template for the ShifutitleComponent component -->\n<ion-navbar>\n  <ion-buttons left>\n    <button id="btnMenu" *ngIf="!close && menu" ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-buttons>\n\n    <span style="font-size: medium;font-weight: 200;">{{title | translate}}</span>\n    &nbsp;\n    <ion-icon *ngIf="help.length>0" (click)="showHelp()" name="help-circle"></ion-icon>\n\n  <ion-buttons end>\n    <ng-content></ng-content>\n    <shifubutton *ngIf="close" icon="close" (click)="onclose.emit()"></shifubutton>\n  </ion-buttons>\n</ion-navbar>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifutitle\shifutitle.html"*/
        }),
        __metadata("design:paramtypes", [ionic_angular_1.NavController])
    ], ShifutitleComponent);
    return ShifutitleComponent;
}());
exports.ShifutitleComponent = ShifutitleComponent;
//# sourceMappingURL=shifutitle.js.map

/***/ }),

/***/ 562:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Generated class for the ShifuwaitComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifuwaitComponent = /** @class */ (function () {
    function ShifuwaitComponent() {
        console.log('Hello ShifuwaitComponent Component');
        this.text = 'Hello World';
    }
    ShifuwaitComponent = __decorate([
        core_1.Component({
            selector: 'shifuwait',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuwait\shifuwait.html"*/'<!-- Generated template for the ShifuwaitComponent component -->\n<div>\n  {{text}}\n</div>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuwait\shifuwait.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ShifuwaitComponent);
    return ShifuwaitComponent;
}());
exports.ShifuwaitComponent = ShifuwaitComponent;
//# sourceMappingURL=shifuwait.js.map

/***/ }),

/***/ 563:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(7);
var forms_1 = __webpack_require__(32);
var noop_1 = __webpack_require__(342);
var Tools = __webpack_require__(2);
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return ShifucheckboxComponent; }),
    multi: true
};
var ShifucheckboxComponent = /** @class */ (function () {
    function ShifucheckboxComponent(translate) {
        this.translate = translate;
        this.label = "";
        this.tips = "";
        this.help = "";
        this.onchange = new core_1.EventEmitter();
        this.onclick = new core_1.EventEmitter();
        this.innerValue = '';
        //Placeholders for the callbacks which are later provided
        //by the Control Value Accessor
        this.onTouchedCallback = noop_1.noop;
        this.onChangeCallback = noop_1.noop;
    }
    Object.defineProperty(ShifucheckboxComponent.prototype, "value", {
        //get accessor
        get: function () {
            return this.innerValue;
        },
        //set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
                this.onchange.emit();
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    ShifucheckboxComponent.prototype.changeevent = function (evt) {
        this.onchange.emit();
    };
    ShifucheckboxComponent.prototype.writeValue = function (obj) {
        if (obj !== this.innerValue) {
            this.innerValue = obj;
        }
    };
    ShifucheckboxComponent.prototype.registerOnChange = function (fn) { this.onChangeCallback = fn; };
    ShifucheckboxComponent.prototype.registerOnTouched = function (fn) { this.onTouchedCallback = fn; };
    ShifucheckboxComponent.prototype.ngOnInit = function () {
        if (this.label.indexOf(".") > -1)
            this.label = this.translate.instant(this.label);
    };
    ShifucheckboxComponent.prototype.showHelp = function () {
        Tools.openHelp(this.help);
    };
    __decorate([
        core_1.Input('label'),
        __metadata("design:type", String)
    ], ShifucheckboxComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input('tips'),
        __metadata("design:type", String)
    ], ShifucheckboxComponent.prototype, "tips", void 0);
    __decorate([
        core_1.Input('help'),
        __metadata("design:type", String)
    ], ShifucheckboxComponent.prototype, "help", void 0);
    __decorate([
        core_1.Output('onchange'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifucheckboxComponent.prototype, "onchange", void 0);
    __decorate([
        core_1.Output('onclick'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifucheckboxComponent.prototype, "onclick", void 0);
    ShifucheckboxComponent = __decorate([
        core_1.Component({
            selector: 'shifucheckbox',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifucheckbox\shifucheckbox.html"*/'<ion-item no-margin no-lines no-border>\n  <ion-label title="{{tips}}" text-wrap style="font-size: medium;font-weight: 200;">\n    {{label}}\n    <ion-icon *ngIf="help.length>0" (click)="showHelp()" name="help-circle"></ion-icon>\n  </ion-label>\n  <ion-toggle [(ngModel)]="value"></ion-toggle>\n</ion-item>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifucheckbox\shifucheckbox.html"*/,
            providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_2.TranslateService])
    ], ShifucheckboxComponent);
    return ShifucheckboxComponent;
}());
exports.ShifucheckboxComponent = ShifucheckboxComponent;
//# sourceMappingURL=shifucheckbox.js.map

/***/ }),

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(7);
/**
 * Generated class for the ShifucameraComponent component.
 *
 * see https://angular-2-training-book.rangle.io/handout/directives/ng_style_directive.html
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifucameraComponent = /** @class */ (function () {
    function ShifucameraComponent(translate) {
        this.translate = translate;
        this.sizeiconwidth = "30px";
        this.sizeiconheight = "30px";
        this.icon = "";
        this.tips = "";
        this.onlyFile = false;
        this.photo = "";
        this.size = "";
        this.button = "";
        this.onTake = new core_1.EventEmitter();
        if (!this.sizeiconheight.endsWith("px"))
            this.sizeiconheight += "px";
        if (!this.sizeiconwidth.endsWith("px"))
            this.sizeiconwidth += "px";
        if (this.button.indexOf(".") > -1)
            this.button = this.translate.instant(this.button);
    }
    ShifucameraComponent.prototype.onChange = function (event) {
        var vm = this;
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            vm.onTake.emit({ value: this.result });
        };
        reader.readAsDataURL(file);
    };
    ShifucameraComponent.prototype.takePhoto = function () {
        this.inputElement.nativeElement.click();
    };
    __decorate([
        core_1.Input("sizeiconwidth"),
        __metadata("design:type", String)
    ], ShifucameraComponent.prototype, "sizeiconwidth", void 0);
    __decorate([
        core_1.Input("sizeiconheight"),
        __metadata("design:type", String)
    ], ShifucameraComponent.prototype, "sizeiconheight", void 0);
    __decorate([
        core_1.Input("icon"),
        __metadata("design:type", String)
    ], ShifucameraComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input("tips"),
        __metadata("design:type", String)
    ], ShifucameraComponent.prototype, "tips", void 0);
    __decorate([
        core_1.Input("onlyfile"),
        __metadata("design:type", Boolean)
    ], ShifucameraComponent.prototype, "onlyFile", void 0);
    __decorate([
        core_1.Input("photo"),
        __metadata("design:type", String)
    ], ShifucameraComponent.prototype, "photo", void 0);
    __decorate([
        core_1.Input("size"),
        __metadata("design:type", String)
    ], ShifucameraComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input("button"),
        __metadata("design:type", String)
    ], ShifucameraComponent.prototype, "button", void 0);
    __decorate([
        core_1.Output('onTake'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifucameraComponent.prototype, "onTake", void 0);
    __decorate([
        core_1.ViewChild('inputElement'),
        __metadata("design:type", core_1.ElementRef)
    ], ShifucameraComponent.prototype, "inputElement", void 0);
    ShifucameraComponent = __decorate([
        core_1.Component({
            selector: 'shifucamera',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifucamera\shifucamera.html"*/'<!-- Generated template for the ShifucameraComponent component -->\n<div title="{{tips}}" style="display:inline;padding: 0px;margin: 0px;font-size:small">\n  <input *ngIf="!onlyFile" #inputElement type="file" capture="camera" accept="image/*" id="camera" style="visibility: hidden;width:0px;height: 0px;" (change)="onChange($event)"/>\n  <input *ngIf="onlyFile" #inputElement type="file" accept="image/*" style="visibility: hidden;width:0px;height: 0px;" (change)="onChange($event)"/>\n  <img *ngIf="photo.length>0" [src]="photo" [ngStyle]="{\'width\':sizeiconwidth,\'height\':sizeiconheight}" (click)="takePhoto()">\n  <shifubutton *ngIf="photo.length==0" size="{{size}}" icon="{{icon}}" (click)="takePhoto()" label="{{button}}"></shifubutton>\n</div>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifucamera\shifucamera.html"*/
        }),
        __metadata("design:paramtypes", [core_2.TranslateService])
    ], ShifucameraComponent);
    return ShifucameraComponent;
}());
exports.ShifucameraComponent = ShifucameraComponent;
//# sourceMappingURL=shifucamera.js.map

/***/ }),

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(21);
/**
 * Generated class for the SvgeditComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var SvgeditComponent = /** @class */ (function () {
    function SvgeditComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.code = "";
        this.shadow = false;
        this.width = "150px";
        this.height = "225px";
    }
    SvgeditComponent.prototype.ngOnChanges = function (changes) {
        this.flyer.nativeElement.innerHTML = this.code;
        if (this.shadow)
            this.flyer.nativeElement.className = "flyer-shadow";
    };
    __decorate([
        core_1.Input("code"),
        __metadata("design:type", String)
    ], SvgeditComponent.prototype, "code", void 0);
    __decorate([
        core_1.Input("shadow"),
        __metadata("design:type", Boolean)
    ], SvgeditComponent.prototype, "shadow", void 0);
    __decorate([
        core_1.Input("width"),
        __metadata("design:type", String)
    ], SvgeditComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input("height"),
        __metadata("design:type", String)
    ], SvgeditComponent.prototype, "height", void 0);
    __decorate([
        core_1.ViewChild('flyer'),
        __metadata("design:type", core_1.ElementRef)
    ], SvgeditComponent.prototype, "flyer", void 0);
    SvgeditComponent = __decorate([
        core_1.Component({
            selector: 'svgedit',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\svgedit\svgedit.html"*/'<div #flyer [ngStyle]="{\'margin\':\'0px\',\'display\':\'inline-block\',\'width\':width,\'height\':height}">\n</div>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\svgedit\svgedit.html"*/
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], SvgeditComponent);
    return SvgeditComponent;
}());
exports.SvgeditComponent = SvgeditComponent;
//# sourceMappingURL=svgedit.js.map

/***/ }),

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(21);
/**
 * Generated class for the SafePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var SafePipe = /** @class */ (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafePipe = __decorate([
        core_1.Pipe({
            name: 'safe',
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], SafePipe);
    return SafePipe;
}());
exports.SafePipe = SafePipe;
//# sourceMappingURL=safe.js.map

/***/ }),

/***/ 567:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(7);
var Maintools_1 = __webpack_require__(2);
/**
 * Generated class for the ShifucardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifucardComponent = /** @class */ (function () {
    function ShifucardComponent(translate) {
        this.translate = translate;
        this.visible = false;
        this.label = "";
        this.showButton = true;
        this.icon = "";
        this.tuto = "";
        this.id = "";
        this.help = "";
        this.title = "";
        this.color = "primary";
        this.onclick = new core_1.EventEmitter();
    }
    ShifucardComponent.prototype.click = function () {
        this.visible = true;
        if (this.onclick != undefined)
            this.onclick.emit();
    };
    ShifucardComponent.prototype.flipVisibility = function () {
        this.visible = !this.visible;
    };
    ShifucardComponent.prototype.onHelp = function () {
        Maintools_1.openHelp(this.help);
    };
    __decorate([
        core_1.Input("visible"),
        __metadata("design:type", Boolean)
    ], ShifucardComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input("label"),
        __metadata("design:type", String)
    ], ShifucardComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input('showButton'),
        __metadata("design:type", Boolean)
    ], ShifucardComponent.prototype, "showButton", void 0);
    __decorate([
        core_1.Input("icon"),
        __metadata("design:type", String)
    ], ShifucardComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input("tuto"),
        __metadata("design:type", String)
    ], ShifucardComponent.prototype, "tuto", void 0);
    __decorate([
        core_1.Input("id"),
        __metadata("design:type", String)
    ], ShifucardComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input("help"),
        __metadata("design:type", String)
    ], ShifucardComponent.prototype, "help", void 0);
    __decorate([
        core_1.Input("title"),
        __metadata("design:type", String)
    ], ShifucardComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input("color"),
        __metadata("design:type", String)
    ], ShifucardComponent.prototype, "color", void 0);
    __decorate([
        core_1.Output('onclick'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifucardComponent.prototype, "onclick", void 0);
    ShifucardComponent = __decorate([
        core_1.Component({
            selector: 'shifucard',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifucard\shifucard.html"*/'<!-- Generated template for the ShifucardComponent component -->\n<ion-card style="margin-left: 8px;">\n  <ion-card-title no-margin no-padding>\n        <ion-item>\n          <ion-label style="font-weight: 200" (click)="flipVisibility()" color="{{color}}">\n            <ion-icon *ngIf="visible" name="arrow-dropup"></ion-icon>\n            <ion-icon *ngIf="!visible" name="arrow-dropdown"></ion-icon>\n            &nbsp;\n            {{title | translate}}&nbsp;\n            <ion-icon color="{{color}}" *ngIf="help.length>0" (click)="onHelp()" name="help-circle"></ion-icon>\n          </ion-label>\n\n          <shifubutton name="buttonCard" item-end [small]="true"\n                       *ngIf="label.length>0 && showButton"\n                       label="{{label | translate}}"\n                       (click)="click()">\n          </shifubutton>\n\n          <ion-icon item-end *ngIf="icon.length>0 && showButton" color="{{color}}" name="{{icon}}" (click)="click()"></ion-icon>\n        </ion-item>\n\n  </ion-card-title>\n\n  <ion-card-content [hidden]="!visible" style="margin-left:8px;margin-bottom:5px;" no-padding>\n    <tuto *ngIf="visible && tuto.length>0" label="{{tuto}}"></tuto>\n    <ng-content></ng-content>\n  </ion-card-content>\n</ion-card>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifucard\shifucard.html"*/
        }),
        __metadata("design:paramtypes", [core_2.TranslateService])
    ], ShifucardComponent);
    return ShifucardComponent;
}());
exports.ShifucardComponent = ShifucardComponent;
//# sourceMappingURL=shifucard.js.map

/***/ }),

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
/**
 * TODO : integrer https://davidwalsh.name/css-flip
 */
var ShifuflyerComponent = /** @class */ (function () {
    // side:number=0;
    function ShifuflyerComponent() {
        this.icon = "";
        this.flyer = "";
        this.size = "";
        this.closed = false;
        this.reverse = false;
        this.autoreturn = 0;
        // @Output('onflip') onflip:  EventEmitter<any>=new EventEmitter();
        this.showSVG = false;
        this.width = "";
        this.height = "";
        if (this.width.length == 0)
            this.width = this.size;
    }
    ShifuflyerComponent.prototype.flip = function (obj) {
        if (this.reverse)
            obj.parentNode.classList.toggle('hover');
    };
    ShifuflyerComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.card.nativeElement.clientWidth > 0) {
                _this.height = (_this.card.nativeElement.clientWidth * (3 / 2)) + "px";
                _this.width = _this.card.nativeElement.clientWidth + "px";
            }
        }, 100);
    };
    ShifuflyerComponent.prototype.ngOnChanges = function (changes) {
        if (this.flyer != undefined) {
            if (this.flyer.indexOf("<?xml") == 0) {
                this.showSVG = true;
                this.flyerPaper.nativeElement.innerHTML = this.flyer;
            }
            else {
                if (this.flyer.indexOf("getfile?code") == -1)
                    this.flyerPaper.nativeElement.innerHTML = "<img style='position:absolute;top:0px;left:0px;height:100%;' src='" + this.flyer + "'>";
                else
                    this.flyerPaper.nativeElement.innerHTML = "<object height='100%' width='100%' type='image/svg+xml' data='" + this.flyer + "'>";
            }
        }
        else {
            this.flyerPaper.nativeElement.innerHTML = "<br><br><br><div style='width:100%;text-align: center'><img src='./assets/img/wait.gif' style='width:50px'></div>";
        }
    };
    __decorate([
        core_2.Input("icon"),
        __metadata("design:type", String)
    ], ShifuflyerComponent.prototype, "icon", void 0);
    __decorate([
        core_2.Input("flyer"),
        __metadata("design:type", String)
    ], ShifuflyerComponent.prototype, "flyer", void 0);
    __decorate([
        core_2.Input("size"),
        __metadata("design:type", String)
    ], ShifuflyerComponent.prototype, "size", void 0);
    __decorate([
        core_2.Input("closed"),
        __metadata("design:type", Boolean)
    ], ShifuflyerComponent.prototype, "closed", void 0);
    __decorate([
        core_2.Input("reverse"),
        __metadata("design:type", Boolean)
    ], ShifuflyerComponent.prototype, "reverse", void 0);
    __decorate([
        core_2.Input("autoreturn"),
        __metadata("design:type", Number)
    ], ShifuflyerComponent.prototype, "autoreturn", void 0);
    __decorate([
        core_1.ViewChild("card"),
        __metadata("design:type", core_2.ElementRef)
    ], ShifuflyerComponent.prototype, "card", void 0);
    __decorate([
        core_1.ViewChild('flyerPaper'),
        __metadata("design:type", core_2.ElementRef)
    ], ShifuflyerComponent.prototype, "flyerPaper", void 0);
    __decorate([
        core_2.Input("width"),
        __metadata("design:type", Object)
    ], ShifuflyerComponent.prototype, "width", void 0);
    __decorate([
        core_2.Input("height"),
        __metadata("design:type", Object)
    ], ShifuflyerComponent.prototype, "height", void 0);
    ShifuflyerComponent = __decorate([
        core_2.Component({
            selector: 'shifuflyer',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuflyer\shifuflyer.html"*/'\n  <div #card class="flip-container" (mouseenter)="flip($event.target)" (touchstart)="flip($event.target)"\n       [ngStyle]="{\'width\':width,\'height\':height}">\n\n    <div class="flipper">\n\n      <div class="front flyer-shadow" [ngStyle]="{\'position\':\'relative\',\'width\':width,\'height\':height}">\n\n        <img *ngIf="closed" src="./assets/img/closed.svg"\n             style="width: 100%;height:100%;z-index: 100;position:absolute;display:block;left:0px;top:0px;">\n\n        <ion-icon name="{{icon}}"\n                  *ngIf="icon.length>0"\n                  style="position:absolute;display:block;left:5px;top:5px;z-index:200;">\n        </ion-icon>\n\n        <div #flyerPaper style="position:absolute;left:0px;top:0px;height:100%;width:100%;"></div>\n      </div>\n\n      <div class="back flyer-shadow" [ngStyle]="{\'width\':width,\'height\':height,\'padding\':\'0px\',\'margin\':\'0px\'}">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuflyer\shifuflyer.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ShifuflyerComponent);
    return ShifuflyerComponent;
}());
exports.ShifuflyerComponent = ShifuflyerComponent;
//# sourceMappingURL=shifuflyer.js.map

/***/ }),

/***/ 569:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var Maintools_1 = __webpack_require__(2);
var ionic_angular_1 = __webpack_require__(3);
var core_2 = __webpack_require__(7);
/**
 * Generated class for the ShifueventComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifueventComponent = /** @class */ (function () {
    //@Input("user") user:any; //Va permettre de changer l'affichage
    function ShifueventComponent(modalCtrl, translate) {
        this.modalCtrl = modalCtrl;
        this.translate = translate;
        this.lang = "fr";
        this.now = 0;
        this.delay = "";
        this.now = new Date().getTime();
    }
    ShifueventComponent.prototype.ngOnInit = function () {
        this.delay = Maintools_1.getDelay(this.event.dtStart, this.lang);
    };
    __decorate([
        core_1.Input("event"),
        __metadata("design:type", Object)
    ], ShifueventComponent.prototype, "event", void 0);
    __decorate([
        core_1.Input("lang"),
        __metadata("design:type", String)
    ], ShifueventComponent.prototype, "lang", void 0);
    ShifueventComponent = __decorate([
        core_1.Component({
            selector: 'shifuevent',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuevent\shifuevent.html"*/'<!-- Generated template for the ShifueventComponent component -->\n\n  <shifuflyer [closed]="event.closed" style="margin-bottom:10px" height="150px" width="100px" *ngIf="event.flyer!=undefined && event.flyer.length>0" [flyer]="event.flyer">\n\n    <span *ngIf="event.dtStart<=now">{{event.dtStart | date:\'dd/MM/yy\'}}</span>\n\n    {{event.description}}<br>\n    <!--<span *ngIf="event.delay.length>0"><br>{{\'ADDBETS.STARTBET\' | translate}}&nbsp;{{event.delay}}</span>-->\n    <span *ngIf="event.minScoreToJoin>0"><br>Min reputation: {{event.minScoreToJoin}}</span>\n    <span *ngIf="event.minCreditToJoin>0"><br>Min credit: {{event.minCreditToJoin}}</span>\n    <span *ngIf="event.nPresents>3"><br>Presents: {{event.nPresents}}</span>\n    <!--<span *ngIf="event.totalCredits>0"><br>Total: {{event.totalCredits}}<img src="./assets/img/money.png"></span>-->\n    <br>\n\n    <ion-item *ngIf="event.dtStart>now">\n      {{\'LIB.STARTIN\' | translate}}&nbsp;{{delay}}\n    </ion-item>\n    <ng-content></ng-content>\n  </shifuflyer>\n\n\n\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuevent\shifuevent.html"*/
        }),
        __metadata("design:paramtypes", [ionic_angular_1.ModalController, core_2.TranslateService])
    ], ShifueventComponent);
    return ShifueventComponent;
}());
exports.ShifueventComponent = ShifueventComponent;
//# sourceMappingURL=shifuevent.js.map

/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var Maintools_1 = __webpack_require__(2);
/**
 * Generated class for the ShifuprofilComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifuprofilComponent = /** @class */ (function () {
    function ShifuprofilComponent() {
        this.user = {};
        this.light = false;
        this.openprofil = true;
    }
    ShifuprofilComponent.prototype.openSocial = function () {
        if (this.user.home != null && this.user.home.length > 0)
            Maintools_1.openWindow(this.user.home);
    };
    __decorate([
        core_1.Input("user"),
        __metadata("design:type", Object)
    ], ShifuprofilComponent.prototype, "user", void 0);
    __decorate([
        core_1.Input("light"),
        __metadata("design:type", Boolean)
    ], ShifuprofilComponent.prototype, "light", void 0);
    __decorate([
        core_1.Input("openprofil"),
        __metadata("design:type", Boolean)
    ], ShifuprofilComponent.prototype, "openprofil", void 0);
    ShifuprofilComponent = __decorate([
        core_1.Component({
            selector: 'shifuprofil',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuprofil\shifuprofil.html"*/'<!-- Generated template for the ShifuprofilComponent component -->\n\n  <shifucard [visible]="true" *ngIf="!light" title="{{user.firstname}}">\n    <ion-grid no-border no-lines>\n      <ion-row align-items-start>\n        <ion-col col-auto align-self-start>\n          <shifuimageprofil [openprofil]=[openprofil] *ngIf="!user.anonymous" size="100px" [user]="user"></shifuimageprofil>\n          <img *ngIf="user.anonymous"  src="./assets/img/anonymous.jpg">\n        </ion-col>\n        <ion-col align-self-start>\n          <span *ngIf="user.description!=undefined && user.description.length>0">{{user.description}}<br></span>\n          <!--<shifunote [object]="user"></shifunote><br>-->\n          <ng-content></ng-content>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </shifucard>\n\n  <ion-item *ngIf="light">\n    <ion-avatar item-start>\n      <shifuimageprofil *ngIf="!user.anonymous" size="50px" [user]="user"></shifuimageprofil>\n      <img *ngIf="user.anonymous"  src="./assets/img/anonymous.jpg">\n    </ion-avatar>\n    <p (click)="openSocial()">{{user.firstname}}</p>\n    <shifunote [object]="user" end></shifunote><br>\n  </ion-item>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuprofil\shifuprofil.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ShifuprofilComponent);
    return ShifuprofilComponent;
}());
exports.ShifuprofilComponent = ShifuprofilComponent;
//# sourceMappingURL=shifuprofil.js.map

/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var Maintools_1 = __webpack_require__(2);
/**
 * Generated class for the ShifutimerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifutimerComponent = /** @class */ (function () {
    function ShifutimerComponent() {
        this.label = "";
        this.end = 0;
        this.server = null;
        this.noSecond = false;
        this.onlyPositif = false;
        this.handle = null;
        this.delay = "";
        var vm = this;
        this.handle = setInterval(function () {
            vm.refresh();
        }, 1000);
    }
    ShifutimerComponent.prototype.refresh = function () {
        if (this.end < new Date().getTime()) {
            if (this.handle != null) {
                clearInterval(this.handle);
                this.handle = null;
            }
        }
        else {
            if (!this.onlyPositif || this.end > new Date().getTime()) {
                var out = Maintools_1.getDelay(this.end, "fr", "jours", this.server);
                if (this.noSecond)
                    out = out.split(":")[0];
                if (this.label != "")
                    this.delay = this.label + " " + out;
                else
                    this.delay = out;
            }
        }
    };
    __decorate([
        core_1.Input("label"),
        __metadata("design:type", String)
    ], ShifutimerComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input("end"),
        __metadata("design:type", Number)
    ], ShifutimerComponent.prototype, "end", void 0);
    __decorate([
        core_1.Input("server"),
        __metadata("design:type", Number)
    ], ShifutimerComponent.prototype, "server", void 0);
    __decorate([
        core_1.Input("noSecond"),
        __metadata("design:type", Boolean)
    ], ShifutimerComponent.prototype, "noSecond", void 0);
    __decorate([
        core_1.Input("onlyPositif"),
        __metadata("design:type", Boolean)
    ], ShifutimerComponent.prototype, "onlyPositif", void 0);
    ShifutimerComponent = __decorate([
        core_1.Component({
            selector: 'shifutimer',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifutimer\shifutimer.html"*/'<!-- Generated template for the ShifutimerComponent component -->\n<span>\n  {{delay}}\n</span>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifutimer\shifutimer.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ShifutimerComponent);
    return ShifutimerComponent;
}());
exports.ShifutimerComponent = ShifutimerComponent;
//# sourceMappingURL=shifutimer.js.map

/***/ }),

/***/ 572:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var Maintools_1 = __webpack_require__(2);
var public_profil_1 = __webpack_require__(54);
var ionic_angular_1 = __webpack_require__(3);
var perso_1 = __webpack_require__(83);
/**
 * Generated class for the ShifuimageprofilComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifuimageprofilComponent = /** @class */ (function () {
    function ShifuimageprofilComponent(modalCtrl) {
        this.modalCtrl = modalCtrl;
        this.user = {}; //Celui qui est consulté
        this.me = false;
        this.withName = false;
        this.openprofil = true;
        this.follower = null; //Celui qui consulte le profil
        this.size = "40px";
        this.fontsize = "xx-large";
        this.toggle = false;
        this.firstname = "";
    }
    ShifuimageprofilComponent.prototype.ngOnInit = function () {
        if (this.user.firstname != null)
            this.firstname = this.user.firstname.substr(0, Math.min(15, this.user.firstname.length));
        var taille = this.size.replace("px", "");
        if (Number(taille) > 50)
            this.fontsize = (Number(taille) / 15) + "em";
    };
    ShifuimageprofilComponent.prototype.openProfil = function () {
        if (this.openprofil == false)
            return;
        if (this.me)
            Maintools_1.openModal(this.modalCtrl, perso_1.PersoPage, { from: null });
        else
            Maintools_1.openModal(this.modalCtrl, public_profil_1.PublicProfilPage, { userid: this.user.id, follower: this.follower });
    };
    __decorate([
        core_1.Input("user"),
        __metadata("design:type", Object)
    ], ShifuimageprofilComponent.prototype, "user", void 0);
    __decorate([
        core_1.Input("me"),
        __metadata("design:type", Boolean)
    ], ShifuimageprofilComponent.prototype, "me", void 0);
    __decorate([
        core_1.Input("withname"),
        __metadata("design:type", Boolean)
    ], ShifuimageprofilComponent.prototype, "withName", void 0);
    __decorate([
        core_1.Input("openprofil"),
        __metadata("design:type", Boolean)
    ], ShifuimageprofilComponent.prototype, "openprofil", void 0);
    __decorate([
        core_1.Input("follower"),
        __metadata("design:type", String)
    ], ShifuimageprofilComponent.prototype, "follower", void 0);
    __decorate([
        core_1.Input("size"),
        __metadata("design:type", String)
    ], ShifuimageprofilComponent.prototype, "size", void 0);
    ShifuimageprofilComponent = __decorate([
        core_1.Component({
            selector: 'shifuimageprofil',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuimageprofil\shifuimageprofil.html"*/'<!-- Generated template for the ShifuimageprofilComponent component -->\n<div *ngIf="user.picture!=undefined && !user.anonymous" style="display:inline" (click)="openProfil()">\n  <img *ngIf="user.picture.indexOf(\'http\')==0"\n       [ngStyle]="{\'width\':size}"\n       [src]="user.picture">\n\n\n  <img class="avatar-small"\n       src="/img/anonymous.jpg"\n       style="width: 50px;height: 50px;"\n       *ngIf="user.anonymous">\n\n  <span [hidden]="user.picture.indexOf(\'http\')==0"\n        [ngStyle]="{\'font-size\': fontsize}">\n    {{user.picture}}\n  </span>\n\n  <span *ngIf="withName" style="font-size: xx-small;">{{fistname}}</span>\n\n</div>\n\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifuimageprofil\shifuimageprofil.html"*/
        }),
        __metadata("design:paramtypes", [ionic_angular_1.ModalController])
    ], ShifuimageprofilComponent);
    return ShifuimageprofilComponent;
}());
exports.ShifuimageprofilComponent = ShifuimageprofilComponent;
//# sourceMappingURL=shifuimageprofil.js.map

/***/ }),

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Generated class for the ShifunoteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifunoteComponent = /** @class */ (function () {
    function ShifunoteComponent() {
        this.object = { nbLike: 0, nbDislike: 0 };
    }
    __decorate([
        core_1.Input("object"),
        __metadata("design:type", Object)
    ], ShifunoteComponent.prototype, "object", void 0);
    ShifunoteComponent = __decorate([
        core_1.Component({
            selector: 'shifunote',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifunote\shifunote.html"*/'<!-- Generated template for the ShifunoteComponent component -->\n\n<span *ngIf="object.nbLike>0">\n  {{object.nbLike}}&nbsp;<ion-icon name="thumbs-up"></ion-icon>\n</span>\n\n<span *ngIf="object.nbLike>0 && object.nbDislike>0">\n  &nbsp;/&nbsp;\n</span>\n\n<span *ngIf="object.nbDislike>0">\n  {{object.nbDislike}}&nbsp;<ion-icon name="thumbs-down"></ion-icon>\n</span>\n\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifunote\shifunote.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ShifunoteComponent);
    return ShifunoteComponent;
}());
exports.ShifunoteComponent = ShifunoteComponent;
//# sourceMappingURL=shifunote.js.map

/***/ }),

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var user_data_1 = __webpack_require__(8);
var core_2 = __webpack_require__(7);
/**
 * Generated class for the ShifubetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifubetComponent = /** @class */ (function () {
    function ShifubetComponent(userData, translate) {
        this.userData = userData;
        this.translate = translate;
        this.status = "show";
        this.onchange = new core_1.EventEmitter();
    }
    ShifubetComponent.prototype.vote = function (bet, note) {
        var _this = this;
        this.userData.setreputation(bet.id, note).subscribe(function () {
            _this.onchange.emit();
        });
    };
    ;
    __decorate([
        core_1.Input('bet'),
        __metadata("design:type", Object)
    ], ShifubetComponent.prototype, "bet", void 0);
    __decorate([
        core_1.Input('status'),
        __metadata("design:type", String)
    ], ShifubetComponent.prototype, "status", void 0);
    __decorate([
        core_1.Output('onchange'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifubetComponent.prototype, "onchange", void 0);
    ShifubetComponent = __decorate([
        core_1.Component({
            selector: 'shifubet',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifubet\shifubet.html"*/'<!-- Generated template for the ShifubetComponent component -->\n<shifucard *ngIf="status==\'toevaluate\'" [title]="bet.title">\n  <ion-grid>\n    <ion-row>\n      <ion-col text-left>\n        {{bet.lib_response}}&nbsp;<br>\n        <span *ngIf="bet.gains[userData.user.id]>0" style="font-size: x-large">{{\'BETS.WINAMOUNT\' | translate}}&nbsp;{{bet.gains[userData.user.id] | number:0}}&nbsp;<img src="./assets/img/money.png" class="small-money"></span>\n        <span *ngIf="bet.gains[userData.user.id]<0" style="font-size: x-large">{{\'BETS.LOSTAMOUNT\' | translate}}&nbsp;{{bet.gains[userData.user.id]*(-1)  | number:0 }}&nbsp;<img src="./assets/img/money.png" class="small-money"></span>\n        <br>\n        {{\'BETS.EVALUATE\' | translate}}&nbsp;:&nbsp;{{bet.from.firstname}}\n      </ion-col>\n      <ion-col col-2 text-right>\n        <shifubutton [small]="true" name="btnVotePos" style="margin:2px;" icon="thumb-up"  (click)="vote(bet,1)"></shifubutton><br>\n        <shifubutton [small]="true" name="btnVoteNeg" style="margin:2px;" icon="thumb-down" (click)="vote(bet,-1)"></shifubutton>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</shifucard>\n\n<shifucard *ngIf="status==\'show\'" title="bet.title">\n  {{bet.lib_response}}<br>\n</shifucard>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifubet\shifubet.html"*/
        }),
        __metadata("design:paramtypes", [user_data_1.UserData, core_2.TranslateService])
    ], ShifubetComponent);
    return ShifubetComponent;
}());
exports.ShifubetComponent = ShifubetComponent;
//# sourceMappingURL=shifubet.js.map

/***/ }),

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(7);
/**
 * Generated class for the ShifubuttongroupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifubuttongroupComponent = /** @class */ (function () {
    function ShifubuttongroupComponent(translate) {
        this.translate = translate;
        this.onchange = new core_1.EventEmitter();
        this.size = "80px";
        this.fontsize = "normal";
        this.labels = null;
        this.images = null;
        this.exclude = false;
        this.values = "";
        this._default = "";
        this.buttons = [];
        this.realValues = [];
    }
    Object.defineProperty(ShifubuttongroupComponent.prototype, "default", {
        get: function () {
            return this._default;
        },
        set: function (val) {
            this._default = val;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    ShifubuttongroupComponent.prototype.refresh = function () {
        if (this.labels != null && this.labels.length > 0 && this.labels[this.labels.length - 1] == ",")
            this.labels = this.labels.substr(0, this.labels.length - 1);
        this.buttons = [];
        var size = 0;
        if (this.images == null) {
            if (this.labels.length > 0)
                size = this.labels.split(",").length;
        }
        else {
            if (this.images.length > 0)
                size = this.images.split(",").length;
        }
        for (var i = 0; i < size; i++) {
            var selected = this._default.indexOf(this.values.split(",")[i]) > -1;
            var bt = {
                value: this.values.split(",")[i],
                selected: selected,
                borderstyle: "none",
                opacity: "0.5"
            };
            if (this.labels != null)
                bt.label = this.translate.instant(this.labels.split(",")[i]);
            if (this.images != null) {
                bt.src = this.images.split(",")[i];
                if (selected) {
                    bt.borderstyle = "solid";
                    bt.opacity = "1";
                }
            }
            this.buttons.push(bt);
        }
    };
    ShifubuttongroupComponent.prototype.ngOnInit = function () {
        //Transfert les valeurs transmise dans des tableaux
        this.refresh();
    };
    ShifubuttongroupComponent.prototype.switch = function (bt) {
        if (this.exclude) {
            this.buttons.forEach(function (b) { b.selected = false; });
        }
        bt.selected = !bt.selected;
        var rc = "";
        this.buttons.forEach(function (bt) {
            if (bt.selected)
                rc = rc + bt.value + ",";
        });
        if (rc.endsWith(","))
            rc = rc.substr(0, rc.length - 1);
        this._default = rc;
        this.refresh();
        this.onchange.emit({ value: rc });
    };
    __decorate([
        core_1.Output('onchange'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifubuttongroupComponent.prototype, "onchange", void 0);
    __decorate([
        core_1.Input('size'),
        __metadata("design:type", String)
    ], ShifubuttongroupComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input('fontsize'),
        __metadata("design:type", String)
    ], ShifubuttongroupComponent.prototype, "fontsize", void 0);
    __decorate([
        core_1.Input('labels'),
        __metadata("design:type", String)
    ], ShifubuttongroupComponent.prototype, "labels", void 0);
    __decorate([
        core_1.Input('images'),
        __metadata("design:type", String)
    ], ShifubuttongroupComponent.prototype, "images", void 0);
    __decorate([
        core_1.Input('exclude'),
        __metadata("design:type", Boolean)
    ], ShifubuttongroupComponent.prototype, "exclude", void 0);
    __decorate([
        core_1.Input('values'),
        __metadata("design:type", String)
    ], ShifubuttongroupComponent.prototype, "values", void 0);
    __decorate([
        core_1.Input("default"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ShifubuttongroupComponent.prototype, "default", null);
    ShifubuttongroupComponent = __decorate([
        core_1.Component({
            selector: 'shifubuttongroup',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifubuttongroup\shifubuttongroup.html"*/'<!-- Generated template for the ShifubuttongroupComponent component -->\n<div *ngIf="images==null">\n  <div style="display:inline-block" *ngFor="let bt of buttons">\n    <button\n            ion-button\n            name="btn" small\n            [ngStyle]="{\'width\': size,\'font-size\':fontsize}"\n            color="secondary" [outline]="!bt.selected"\n            (click)="switch(bt)" (tap)="switch(bt)">\n      {{ bt.label }}\n    </button>\n  </div>\n</div>\n\n<div *ngIf="images!=null">\n  <div *ngFor="let bt of buttons"\n       [ngStyle]="{\n              \'text-align\':\'center\',\n              \'margin\':\'5px\',\n              \'display\':\'inline-block\',\n              \'border-color\':\'grey\',\n              \'border-width\':\'thin\',\n              \'width\': size,\n              \'height\':size,\n              \'border-style\':bt.borderstyle,\n              \'opacity\':bt.opacity\n              }">\n\n    <img style="width:100%;"\n         [src]="bt.src"\n         name="btn"\n         (click)="switch(bt)"\n    ><br>\n\n    <span *ngIf="bt.label!=null">{{ bt.label }}</span>\n\n  </div>\n</div>\n\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifubuttongroup\shifubuttongroup.html"*/
        }),
        __metadata("design:paramtypes", [core_2.TranslateService])
    ], ShifubuttongroupComponent);
    return ShifubuttongroupComponent;
}());
exports.ShifubuttongroupComponent = ShifubuttongroupComponent;
//# sourceMappingURL=shifubuttongroup.js.map

/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(7);
var api_1 = __webpack_require__(16);
var ionic_angular_1 = __webpack_require__(3);
var Maintools_1 = __webpack_require__(2);
/**
 * Generated class for the ShifufileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifufileComponent = /** @class */ (function () {
    function ShifufileComponent(loadingCtrl, translate, api) {
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.api = api;
        this.size = "";
        this.icon = "";
        this.tips = "";
        this.hourglass = false;
        this.label = "";
        this.onTake = new core_1.EventEmitter();
    }
    ShifufileComponent.prototype.onChange = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var reader = new FileReader();
        var l = null;
        if (this.hourglass)
            l = Maintools_1.loading(this);
        reader.onload = function () {
            if (l != null)
                l.dismiss();
            var type = file.type;
            if (type == "") {
                var pos = file.name.lastIndexOf(".") + 1;
                if (pos > -1)
                    type = "application/" + file.name.substr(pos);
                else
                    type = "application/octet-stream";
            }
            _this.onTake.emit({ length: file.size, size: file.size, mega: file.size / (1024 * 1024), value: reader.result, file: file.name, format: type });
        };
        setTimeout(function () {
            reader.readAsDataURL(file);
        }, 500);
    };
    ShifufileComponent.prototype.takePhoto = function () {
        this.inputElement.nativeElement.click();
    };
    __decorate([
        core_1.Input("size"),
        __metadata("design:type", String)
    ], ShifufileComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input("icon"),
        __metadata("design:type", String)
    ], ShifufileComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input("tips"),
        __metadata("design:type", String)
    ], ShifufileComponent.prototype, "tips", void 0);
    __decorate([
        core_1.Input("hourglass"),
        __metadata("design:type", Boolean)
    ], ShifufileComponent.prototype, "hourglass", void 0);
    __decorate([
        core_1.Input("label"),
        __metadata("design:type", String)
    ], ShifufileComponent.prototype, "label", void 0);
    __decorate([
        core_1.Output('onTake'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifufileComponent.prototype, "onTake", void 0);
    __decorate([
        core_1.ViewChild('inputElement'),
        __metadata("design:type", core_1.ElementRef)
    ], ShifufileComponent.prototype, "inputElement", void 0);
    ShifufileComponent = __decorate([
        core_1.Component({
            selector: 'shifufile',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifufile\shifufile.html"*/'<!-- Generated template for the ShifufileComponent component -->\n<div title="{{tips}}" style="display:inline;padding: 0px;margin: 0px;font-size:small">\n  <input #inputElement type="file" accept="*/*" style="visibility: hidden;width:0px;height: 0px;" (change)="onChange($event)"/>\n  <shifubutton [hidewhenclick]="hourglass" size="{{size}}" icon="{{icon}}" (click)="takePhoto()" label="{{label}}"></shifubutton>\n</div>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifufile\shifufile.html"*/
        }),
        __metadata("design:paramtypes", [ionic_angular_1.LoadingController,
            core_2.TranslateService,
            api_1.ApiProvider])
    ], ShifufileComponent);
    return ShifufileComponent;
}());
exports.ShifufileComponent = ShifufileComponent;
//# sourceMappingURL=shifufile.js.map

/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var Maintools_1 = __webpack_require__(2);
/**
 * Generated class for the ShifudateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifudateComponent = /** @class */ (function () {
    function ShifudateComponent() {
        this.lang = "fr-FR";
        this.dt = 0;
        this.onlyHour = false;
        this.text = "";
    }
    ShifudateComponent.prototype.ngOnInit = function () {
        this.text = Maintools_1.getDate(this.dt, this.lang, this.onlyHour);
    };
    __decorate([
        core_1.Input("lang"),
        __metadata("design:type", String)
    ], ShifudateComponent.prototype, "lang", void 0);
    __decorate([
        core_1.Input("value"),
        __metadata("design:type", Number)
    ], ShifudateComponent.prototype, "dt", void 0);
    __decorate([
        core_1.Input("onlyHour"),
        __metadata("design:type", Boolean)
    ], ShifudateComponent.prototype, "onlyHour", void 0);
    ShifudateComponent = __decorate([
        core_1.Component({
            selector: 'shifudate',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifudate\shifudate.html"*/'<!-- Generated template for the ShifudateComponent component -->\n<span *ngIf="text.length>0">\n  {{text}}\n</span>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifudate\shifudate.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ShifudateComponent);
    return ShifudateComponent;
}());
exports.ShifudateComponent = ShifudateComponent;
//# sourceMappingURL=shifudate.js.map

/***/ }),

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(21);
/**
 * Generated class for the ShifugalleryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifugalleryComponent = /** @class */ (function () {
    function ShifugalleryComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.images = [];
        this.size = "20%";
        this.margin = "5px";
        this.onclick = new core_1.EventEmitter();
    }
    //
    // ngOnInit(){
    //   debugger
    //   for(var i=0;i<this.images.length;i++)
    //     this.images[i].picture=this.sanitizer.bypassSecurityTrustUrl(this.images[i].picture)
    // }
    ShifugalleryComponent.prototype.selImage = function (sel_image, evt) {
        var _this = this;
        if (sel_image.hasOwnProperty("src")) {
            var img = new Image();
            img.onload = function () {
                _this.onclick.emit({ picture: img.src, src: sel_image.src });
            };
            img.src = sel_image.src;
        }
        else {
            document.getElementsByName("image_items").forEach(function (e) {
                e.parentNode.style.backgroundColor = "white";
            });
            evt.currentTarget.parentNode.style.backgroundColor = "lightgrey";
            this.onclick.emit({ "picture": sel_image.picture, "url": sel_image.picture, "title": sel_image.title });
        }
    };
    __decorate([
        core_1.Input("images"),
        __metadata("design:type", Array)
    ], ShifugalleryComponent.prototype, "images", void 0);
    __decorate([
        core_1.Input("size"),
        __metadata("design:type", String)
    ], ShifugalleryComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input("margin"),
        __metadata("design:type", String)
    ], ShifugalleryComponent.prototype, "margin", void 0);
    __decorate([
        core_1.Output('onclick'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifugalleryComponent.prototype, "onclick", void 0);
    ShifugalleryComponent = __decorate([
        core_1.Component({
            selector: 'shifugallery',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifugallery\shifugallery.html"*/'<!-- Generated template for the ShifugalleryComponent component -->\n\n<div style="margin:0px;padding:0px;display:inline-block;height:100%;width:100%;">\n  <div *ngFor="let img_item of images"\n       [ngStyle]="{\'display\':\'inline-block\',\'width\':size,\'height\':size,\'margin\':margin}">\n    <img\n      name="image_items" style="width: 100%;height:100%;"\n      [src]="img_item.picture"\n      (click)="selImage(img_item,$event)">\n  </div>\n</div>\n\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifugallery\shifugallery.html"*/
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], ShifugalleryComponent);
    return ShifugalleryComponent;
}());
exports.ShifugalleryComponent = ShifugalleryComponent;
//# sourceMappingURL=shifugallery.js.map

/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * Generated class for the ShifunumpadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShifunumpadComponent = /** @class */ (function () {
    function ShifunumpadComponent() {
        this.code = "";
        this.prefix = "";
        this.onenter = new core_1.EventEmitter();
    }
    ShifunumpadComponent.prototype.addKey = function (v) {
        this.code += v;
        if (this.code.length == 6) {
            this.onenter.emit({ value: this.code });
            this.clearCode();
        }
    };
    ShifunumpadComponent.prototype.clearCode = function () {
        this.code = "";
    };
    __decorate([
        core_1.Input("prefix"),
        __metadata("design:type", Object)
    ], ShifunumpadComponent.prototype, "prefix", void 0);
    __decorate([
        core_1.Output('onenter'),
        __metadata("design:type", core_1.EventEmitter)
    ], ShifunumpadComponent.prototype, "onenter", void 0);
    ShifunumpadComponent = __decorate([
        core_1.Component({
            selector: 'shifunumpad',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifunumpad\shifunumpad.html"*/'<!-- Generated template for the ShifunumpadComponent component -->\n<div style="display:inline-block;width:180px" no-lines text-center>\n  <ion-item no-lines text-center no-padding>\n\n    <span style="font-size: 30px;" *ngIf="code.length==0">{{prefix}}######</span>\n    <span style="font-size: 30px;" *ngIf="code.length>0">{{prefix}}{{code}}</span>\n  </ion-item>\n\n  <ion-grid no-padding no-margin no-lines>\n    <ion-row align-items-center *ngFor="let i of [0,1,2]">\n      <ion-col *ngFor="let j of [0,1,2]">\n        <shifubutton name="btnNumpad" color="secondary" size="45" label="{{i*3+j+1}}" (click)="addKey(i*3+j+1)"></shifubutton>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col><shifubutton name="btnNumpadClear" color="secondary" size="45" label="C" (click)="clearCode()"></shifubutton></ion-col>\n      <ion-col><shifubutton name="btnNumpad" color="secondary" size="45" label="0" (click)="addKey(0)"></shifubutton></ion-col>\n      <ion-col><shifubutton name="btnNumpadValid" color="secondary" size="45" icon="checkmark" (click)="onenter.emit({value:code})"></shifubutton></ion-col>\n    </ion-row>\n  </ion-grid>\n</div>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\components\shifunumpad\shifunumpad.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ShifunumpadComponent);
    return ShifunumpadComponent;
}());
exports.ShifunumpadComponent = ShifunumpadComponent;
//# sourceMappingURL=shifunumpad.js.map

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var storage_1 = __webpack_require__(42);
var http_1 = __webpack_require__(105);
var Main = __webpack_require__(2);
var util_1 = __webpack_require__(5);
var UserData = /** @class */ (function () {
    /**
     *
     * @param {Events} events
     * @param {Storage} storage
     * @param {HttpClient} http
     */
    function UserData(events, storage, http) {
        this.events = events;
        this.storage = storage;
        this.http = http;
        this.HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
        this.lastSearchList = [];
        this.user = { tarif: { tarif: 3 }, connexions: [] };
        this.playlist = { items: [] };
        this.playlistFrom = "";
        this.friends = [];
        this.selectTab = "";
    }
    /**
     *
     * @param {string} event
     * @param {string} password
     * @param {string} message : message (bet,message, photo) sur lequel se connecter
     * @param {string} from
     * @param position
     * @param type_invite
     * @param {string} dest
     * @returns {Observable<any>}
     */
    UserData.prototype.join = function (event, password, message, from, position, type_invite, dest) {
        if (dest === void 0) { dest = ""; }
        return this.http.get(Main.api("join", "dest=" + dest + "&event=" + event + "&user=" + this.user.id + "&password=" + password + "&from=" + from + "&position=" + position + "&message=" + message + "&type_invite=" + type_invite));
    };
    UserData.prototype.clearPlaylist = function () {
        this.playlist = [];
        this.playlistFrom = "";
        this.lastSearchList = [];
    };
    UserData.prototype.add = function (user, method) {
        if (method === void 0) { method = "mail"; }
        return this.http.post(Main.api("adduser", "method=" + method), user);
    };
    /**
     *
     * @return {Promise<any>|Promise<boolean>|Promise<TResult2|boolean>|Promise<TResult|any>}
     */
    UserData.prototype.load = function (func) {
        var _this = this;
        this.storage.get("user").then(function (id) {
            if (id == null || util_1.isUndefined(id))
                func(false);
            else {
                _this.user.id = id;
                func(true);
            }
        }).catch(function (err) {
            console.log(err);
            func(false);
        });
    };
    UserData.prototype.get = function (id) {
        if (id === void 0) { id = null; }
        if (id != null)
            this.user.id = id;
        return this.http.get(Main.api("getuser", "user=" + this.user.id));
    };
    UserData.prototype.login = function (email, password) {
        return this.http.get(Main.api("loginbyemail", "email=" + email + "&password=" + password));
    };
    UserData.prototype.logout = function () {
        Main.$$("Demande de déconnexion, effacement des clé");
        this.storage.clear();
        return this.http.get(Main.api("logout", "user=" + this.user.id));
    };
    ;
    UserData.prototype.setId = function (id) {
        this.user.id = id;
    };
    ;
    UserData.prototype.getId = function () {
        return this.user.id;
    };
    ;
    UserData.prototype.checkHasSeenTutorial = function () {
        return this.storage.get(this.HAS_SEEN_TUTORIAL).then(function (value) {
            return value;
        });
    };
    ;
    UserData.prototype.deleteScreen = function (screen) {
        return this.http.get(Main.api("deleteScreen", "user=" + this.user.id + "&screen=" + screen));
    };
    UserData.prototype.calclikes = function () {
        return this.http.get(Main.api("calclikes", "user=" + this.user.id));
    };
    UserData.prototype.delwidget = function (widgetid) {
        return this.http.get(Main.api("delwidget", "widget=" + widgetid + "&user=" + this.user.id));
    };
    UserData.prototype.addfriendsemail = function (email) {
        return this.http.get(Main.api("addfriendsemail", "email=" + email + "&user=" + this.user.id));
    };
    UserData.prototype.makePermanentInvitation = function (dest) {
        return this.http.get(Main.api("makepermanentinvitation", "dest=" + dest + "&user=" + this.user.id));
    };
    UserData.prototype.loadcontacts = function () {
        var vm = this;
        this.http.get(Main.api("loadcontacts", "user=" + this.user.id)).subscribe(function (resp) {
            if (resp != null && resp.hasOwnProperty("items")) {
                vm.friends = [];
                resp.items.forEach(function (friend) {
                    vm.friends.push({ email: friend.email, name: friend.name, picture: friend.picture });
                });
            }
        });
    };
    UserData.prototype.uploadto = function (idevent, service) {
        if (service === void 0) { service = "drive"; }
        return this.http.get(Main.api("uploadto", "event=" + idevent + "&user=" + this.user.id + "&service=" + service)).timeout(100000);
    };
    UserData.prototype.getPreviousImages = function (size) {
        if (size === void 0) { size = 20; }
        return this.http.get(Main.api("getpreviousimages", "user=" + this.user.id + "&size=" + size));
    };
    UserData.prototype.updatescreen = function (screen) {
        return this.http.post(Main.api("updatescreen", "user=" + this.user.id), screen);
    };
    UserData.prototype.shareevent = function (event, message, tab, destinataires, anonymous) {
        if (message === void 0) { message = ""; }
        if (tab === void 0) { tab = "home"; }
        if (destinataires === void 0) { destinataires = "link"; }
        if (anonymous === void 0) { anonymous = true; }
        return this.http.get(Main.api("shareevent", "event=" + event + "&tab=" + tab + "&message=" + message + "&from=" + this.user.id + "&dests=" + destinataires + "&anonymous=" + anonymous));
    };
    UserData.prototype.creditaccount = function (amount) {
        return this.http.get(Main.api("creditaccount", "amount=" + amount + "&user=" + this.user.id));
    };
    UserData.prototype.getmynewusers = function (dt) {
        return this.http.get(Main.api("getmynewusers", "user=" + this.user.id + "&since=" + dt));
    };
    UserData.prototype.updatetarif = function (tarif) {
        return this.http.get(Main.api("updatetarif", "user=" + this.user.id + "&tarif=" + tarif));
    };
    UserData.prototype.senduser = function (fields, user) {
        if (user === void 0) { user = null; }
        if (user == null)
            user = this.user;
        return this.http.post(Main.api("senduser", "update=" + fields), this.user);
    };
    /**
     * ajoute un widget à un screen donnée
     * @param {string} widget
     * @param {string} screen
     * @returns {Observable<Object>}
     */
    UserData.prototype.addwidgettoscree = function (widget, code) {
        return this.http.get(Main.api("addwidgettoscreen", "widget=" + widget + "&code=" + code + "&user=" + this.user));
    };
    UserData.prototype.fusion = function (email) {
        return this.http.get(Main.api("fusion", "email=" + email));
    };
    UserData.prototype.delevent = function (event) {
        return this.http.get(Main.api("delevent", "user=" + this.user.id + "&event=" + event));
    };
    UserData.prototype.sendvote = function (id, vote) {
        return this.http.post(Main.api("sendvote", "message=" + id), vote);
    };
    UserData.prototype.sendvotes = function (votes) {
        return this.http.post(Main.api("sendvotes", ""), votes);
    };
    UserData.prototype.sendwidget = function (widget) {
        return this.http.post(Main.api("sendwidget", "user=" + this.user.id), widget);
    };
    UserData.prototype.getwidget = function (widget, code) {
        if (code === void 0) { code = false; }
        return this.http.get(Main.api("getwidget", "user=" + this.user.id + "&widget=" + widget + "&code=" + code));
    };
    UserData.prototype.getwidgetfrommodel = function (title, description) {
        return this.http.get(Main.api("getwidgetfrommodel", "user=" + this.user.id + "&title=" + title + "&description=" + description));
    };
    UserData.prototype.bestEventsForMe = function (filter) {
        if (filter === void 0) { filter = ""; }
        return this.http.get(Main.api("besteventsforme", "user=" + this.user.id + "&filter=" + filter));
    };
    UserData.prototype.quitEvent = function () {
        return this.http.get(Main.api("quit", "user=" + this.user.id));
    };
    UserData.prototype.autoconnexion = function (connexion) {
        return this.http.get(Main.api("autoconnexion", "connexion=" + connexion + "&user=" + this.user.id));
    };
    UserData.prototype.getwidgets = function (activities) {
        return this.http.get(Main.api("getwidgets", "user=" + this.user.id + "&activities=" + activities));
    };
    UserData.prototype.resend_password = function (email, reinit) {
        if (reinit === void 0) { reinit = false; }
        return this.http.get(Main.api("resend_password", "user=" + email + "&reinit=" + reinit));
    };
    UserData.prototype.loginbyemail = function (email, password) {
        return this.http.get(Main.api("loginbyemail", "email=" + email + "&password=" + password));
    };
    UserData.prototype.getuserbyemail = function (email) {
        return this.http.get(Main.api("getuser", "user=" + email));
    };
    UserData.prototype.getAllTarifs = function () {
        return this.http.get(Main.api("getalltarifs", ""));
    };
    UserData.prototype.getFacebookPageAndEvents = function () {
        return this.http.get(Main.api("getfacebookpageandevents", "user=" + this.user.id));
    };
    UserData.prototype.geteventsfrom = function (filter, limit) {
        if (filter === void 0) { filter = false; }
        if (limit === void 0) { limit = 20; }
        return this.http.get(Main.api("geteventsfrom", "filter=" + filter + "&limit=" + limit + "&user=" + this.user.id));
    };
    UserData.prototype.revoketoken = function (service) {
        return this.http.get(Main.api("revoketoken", "token=" + service + "&user=" + this.user.id));
    };
    UserData.prototype.setwidgetonscreen = function (screen, widget) {
        return this.http.get(Main.api("setwidgetonscreen", "screen=" + screen + "&widget=" + widget + "&user=" + this.user.id));
    };
    UserData.prototype.getImageForFlyer = function (source, query, lat, lng) {
        if (source === void 0) { source = "local"; }
        if (query === void 0) { query = ""; }
        if (lat === void 0) { lat = null; }
        if (lng === void 0) { lng = null; }
        return this.http.get(Main.api("getimageforflyer", "user=" + this.user.id + "&source=" + source + "&query=" + query + "&lat=" + lat + "&lng=" + lng)).timeout(5000);
    };
    UserData.prototype.getImagesFromMyCloud = function (source) {
        if (source === void 0) { source = ""; }
        return this.http.get(Main.api("getimagesfrommycloud", "user=" + this.user.id + "&source=" + source))
            .timeout(10000);
    };
    UserData.prototype.canlogin = function () {
        return this.http.get(Main.api("canlogin", "user=" + this.user.id));
    };
    UserData.prototype.getUsersBlacklist = function () {
        return this.http.get(Main.api("getusersblacklist", "user=" + this.user.id));
    };
    UserData.prototype.closebet = function (betid) {
        return this.http.get(Main.api("closebet", "user=" + this.user.id + "&bet=" + betid));
    };
    UserData.prototype.validate = function (idloterie) {
        return this.http.get(Main.api("validate", "user=" + this.user.id + "&loterie=" + idloterie));
    };
    UserData.prototype.setreputation = function (message, note) {
        return this.http.get(Main.api("setreputation", "user=" + this.user.id + "&bet=" + message + "&value=" + note));
    };
    UserData.prototype.removebet = function (bet) {
        return this.http.get(Main.api("removebet", "user=" + this.user.id + "&bet=" + bet));
    };
    UserData.prototype.clearhisto = function () {
        return this.http.get(Main.api("clearhisto", "user=" + this.user.id));
    };
    UserData.prototype.buyticket = function (message, somme) {
        if (somme === void 0) { somme = 0; }
        return this.http.get(Main.api("buyticket", "user=" + this.user.id + "&loterie=" + message + "&somme=" + somme));
    };
    UserData.prototype.upgradeTarif = function () {
        return this.http.get(Main.api("upgradetarif", "user=" + this.user.id));
    };
    UserData.prototype.razme = function () {
        return this.http.get(Main.api("razme", "user=" + this.user.id));
    };
    UserData.prototype.initdefaultevent = function (version, lat, lng, precision, type_event) {
        if (type_event === void 0) { type_event = "public"; }
        if (lat == null && lng == null || precision > 10000)
            return this.http.get(Main.api("initevent", "type=" + type_event + "&version=" + version + "&user=" + this.user.id));
        else
            return this.http.get(Main.api("initevent", "type=" + type_event + "&version=" + version + "&user=" + this.user.id + "&lat=" + lat + "&lng=" + lng));
    };
    UserData.prototype.initevent = function (modele) {
        return this.http.post(Main.api("initeventwithmodele", "user=" + this.user.id), modele);
    };
    UserData.prototype.sendflyer = function (photo) {
        return this.http.post(Main.api("sendflyer", "user=" + this.user.id), photo);
    };
    UserData.prototype.makeFlyer = function (evt, show_title, show_address, show_time, show_teaser, color, url_image) {
        if (show_title === void 0) { show_title = true; }
        if (show_address === void 0) { show_address = true; }
        if (show_time === void 0) { show_time = true; }
        if (show_teaser === void 0) { show_teaser = true; }
        if (color === void 0) { color = "white"; }
        if (url_image === void 0) { url_image = ""; }
        if (!evt.hasOwnProperty("title") || !evt.hasOwnProperty("dtStart")) {
            return;
        }
        var address = " ";
        if (show_address) {
            address = evt.address;
            if (address.length > 30) {
                var pos = address.indexOf(",");
                if (pos > 15) {
                    address = address.substr(0, pos) + "\n" + address.substr(pos + 1);
                }
            }
        }
        var txtDtStart = "";
        if (show_time) {
            var dt = new Date();
            dt.setTime(evt.dtStart);
            txtDtStart = dt.toLocaleDateString() + " " + dt.getHours() + ":" + dt.getMinutes();
        }
        var teaser = " ";
        if (show_teaser && evt.hasOwnProperty("description"))
            teaser = evt.description;
        var title = " ";
        if (show_title)
            title = evt.title;
        var obj = {
            title: { text: title, size: 15, color: color },
            address: { text: address, size: 10, color: color },
            teaser: { text: teaser, size: 12, color: color },
            date: { text: txtDtStart, size: 10, color: color },
            templateFlyer: evt.templateFlyer
        };
        return this.http.post(Main.api("makeflyer", "user=" + this.user.id + "&url=" + url_image), obj);
    };
    UserData.prototype.findeventbycode = function (res) {
        return this.http.get(Main.api("findeventbycode", "code=" + res + "&user=" + this.user.id));
    };
    UserData.prototype.addtofavoritewidget = function (id) {
    };
    UserData.prototype.delfavoritewidget = function (id) {
    };
    UserData.prototype.sendwidgetbymail = function (widget) {
    };
    UserData.prototype.getusersifollow = function () {
        return this.http.get(Main.api("getusersifollow", "user=" + this.user.id));
    };
    UserData = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ionic_angular_1.Events, storage_1.Storage, http_1.HttpClient])
    ], UserData);
    return UserData;
}());
exports.UserData = UserData;
//# sourceMappingURL=user-data.js.map

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var Tools = __webpack_require__(2);
var event_data_1 = __webpack_require__(15);
var user_data_1 = __webpack_require__(8);
var addevent_modele_1 = __webpack_require__(316);
var addevent_advanced_1 = __webpack_require__(317);
var addevent_date_1 = __webpack_require__(318);
var addevent_flyer_1 = __webpack_require__(319);
var musicserver_1 = __webpack_require__(107);
var Maintools_1 = __webpack_require__(2);
var core_2 = __webpack_require__(7);
var image_creator_1 = __webpack_require__(38);
var api_1 = __webpack_require__(16);
var settings_1 = __webpack_require__(23);
/**
 * Generated class for the AddeventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddeventPage = /** @class */ (function () {
    function AddeventPage(modalCtrl, translate, viewCtrl, loadingCtrl, navParams, eventData, toastCtrl, api, settings, userData) {
        this.modalCtrl = modalCtrl;
        this.translate = translate;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.eventData = eventData;
        this.toastCtrl = toastCtrl;
        this.api = api;
        this.settings = settings;
        this.userData = userData;
        this.newevent = { address: "", option: { title: true, date: true, address: true, teaser: true } };
        this.showTypeEvent = true;
        this.activities = "Music,Photos,Messages,Sondages,Paris,Loterie,Presentation";
        this.showAddEventButton = true;
        this.delay = "";
        this.defaultActivities = "";
        this.defaultTypeOfEvent = "";
        this.delayToStart = 0;
    }
    AddeventPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var zoom = this.navParams.get("zoom");
        if (zoom == null)
            zoom = 10;
        if (zoom < 15)
            zoom = 15;
        this.userData.initdefaultevent(this.settings.version, this.navParams.get("lat"), this.navParams.get("lng"), this.navParams.get("precision")).subscribe(function (r) {
            r.option = { title: true, date: true, address: true, teaser: true };
            _this.newevent = r;
            _this.updateCategorie(_this.defaultTypeOfEvent);
            _this.defaultActivities = Maintools_1.join(_this.newevent.activities, ",");
            if (_this.navParams.get("modele") != null)
                _this.newevent = _this.navParams.get("modele");
            _this.newevent.duration = _this.newevent.dtEnd - _this.newevent.dtStart;
            _this.newevent.type = "";
            _this.computeAddress(r);
            _this.refreshDelay();
            _this.initMap(r.lat, r.lng, zoom);
        });
        if (this.settings.ihm == "pro")
            this.defaultTypeOfEvent = "meeting";
        else
            this.defaultTypeOfEvent = "";
    };
    AddeventPage.prototype.computeAddress = function (evt, delay) {
        var _this = this;
        if (evt === void 0) { evt = null; }
        if (delay === void 0) { delay = 0; }
        if (this.userData.user.email.length > 0)
            setTimeout(function () {
                if (evt == null)
                    evt = _this.newevent;
                Tools.reverse_geocode(google.maps, evt.lat, evt.lng, function (addr) {
                    _this.newevent.address = addr;
                    _this.refreshFlyer();
                });
            }, delay * 1000);
        else {
            this.newevent.address = "";
            this.newevent.option.address = false;
            this.refreshFlyer();
        }
    };
    AddeventPage.prototype.initTarget = function () {
        var vm = this;
        var pos = vm.map.getCenter();
        if (vm.target != null) {
            vm.target.setPosition(pos);
        }
        else {
            vm.target = new google.maps.Marker({
                icon: "./assets/img/party.png",
                position: pos,
                name: "Soiree",
                draggable: true,
                map: vm.map
            });
        }
    };
    AddeventPage.prototype.refreshDelay = function () {
        if (this.newevent.dtStart - new Date().getTime() > 20000)
            this.delay = Maintools_1.getDelay(this.newevent.dtStart, this.userData.user.lang);
        else
            this.delay = "";
    };
    /**
     * Initialise la carte google map avec un léger décalage
     * @param {number} lat
     * @param {number} lng
     * @param {number} zoom
     * @param {any} func
     */
    AddeventPage.prototype.initMap = function (lat, lng, zoom, func) {
        if (func === void 0) { func = null; }
        var mapEle = this.mapElement.nativeElement;
        var vm = this;
        vm.map = new google.maps.Map(mapEle, { center: { lat: lat, lng: lng }, zoom: zoom });
        vm.map.addListener("mousedown", function (evt) { vm.newevent.address = ""; });
        vm.map.addListener("mouseup", function (evt) {
            var pos = this.getCenter();
            vm.newevent.lat = pos.lat();
            vm.newevent.lng = pos.lng();
            Tools.reverse_geocode(google.maps, pos.lat(), pos.lng(), function (addr) {
                vm.newevent.address = addr;
                vm.refreshFlyer();
            });
        });
        vm.map.addListener("bounds_changed", function (evt) {
            vm.initTarget();
            var pos = vm.map.getCenter();
            if (pos != undefined) {
                vm.newevent.lat = pos.lat();
                vm.newevent.lng = pos.lng();
            }
        });
        vm.map.setOptions({
            disableDefaultUI: true,
            rotateControl: false,
            clickableIcons: false
        });
        vm.initTarget();
        setTimeout(function () {
            if (func != null)
                func();
        }, 500);
    };
    AddeventPage.prototype.searchAddress = function (code) {
        var vm = this;
        if (code == 13) {
            var address = this.newevent.address;
            if (address != null && address.length > 0) {
                Tools.geocode(google.maps, address, function (pos) {
                    vm.map.setCenter(pos);
                    vm.newevent.address = address;
                    vm.refreshFlyer();
                });
            }
        }
    };
    AddeventPage.prototype.refreshFlyer = function (func) {
        var _this = this;
        if (func === void 0) { func = null; }
        if (this.newevent.templateFlyer == null) {
            if (this.newevent.activities.indexOf("bets") > -1)
                this.newevent.templateFlyer = "bets";
            if (this.newevent.activities.indexOf("photo") > -1)
                this.newevent.templateFlyer = "photo";
            if (this.newevent.activities.indexOf("music") > -1)
                this.newevent.templateFlyer = "music";
            if (this.newevent.type == "meeting")
                this.newevent.templateFlyer = "pro";
        }
        this.userData.makeFlyer(this.newevent, this.newevent.option.title, this.newevent.option.address, this.newevent.option.date, this.newevent.option.teaser, "white", this.newevent.templateFlyer).subscribe(function (resp) {
            _this.newevent.flyer = resp.photo;
            _this.newevent.templateFlyer = resp.text;
            if (func != null)
                func();
        });
    };
    ;
    AddeventPage.prototype.quitAddEvent = function (bCreateEvent) {
        var _this = this;
        if (bCreateEvent === void 0) { bCreateEvent = true; }
        var vm = this;
        if (bCreateEvent) {
            var l = Maintools_1.loading(this, this.translate.instant("ADDEVENT.BUILDINGYOUREVENT"), 20);
            vm.eventData.add(vm.userData.user.id, vm.newevent).subscribe(function (resp) {
                _this.userData.user = resp;
                Maintools_1.toast(vm.toastCtrl, resp.message, vm.translate);
                if (resp.message == "") {
                    setTimeout(function () { l.dismiss(); vm.viewCtrl.dismiss(vm.newevent); }, 100);
                }
                else
                    vm.viewCtrl.dismiss();
            });
        }
        else
            vm.viewCtrl.dismiss();
    };
    /**
     * Fabrique l'événement
     */
    AddeventPage.prototype.createEvent = function () {
        var _this = this;
        var vm = this;
        this.showAddEventButton = false;
        vm.refreshFlyer(function () {
            var photo = { from: _this.userData.user, idEvent: _this.newevent.id, photo: _this.newevent.flyer, format: "jpeg" };
            _this.userData.sendflyer(photo).subscribe(function (resp) {
                vm.newevent.flyer = resp.url;
                //Si l'option music est active on demande la plateforme
                if (vm.newevent.activities.indexOf("music") > -1 && vm.userData.user.musicServer == undefined) {
                    Maintools_1.openModal(_this.modalCtrl, musicserver_1.MusicserverPage, { message: "" }, function (rep) {
                        if (rep.user == null)
                            vm.newevent.activities.splice(vm.newevent.activities.indexOf("music"), 1);
                        vm.quitAddEvent(true);
                    });
                }
                else
                    _this.quitAddEvent(true);
            }, function (err) {
                Maintools_1.toast(vm.toastCtrl, "ERROR.GENERAL", vm.translate);
                vm.quitAddEvent(false);
            });
        });
    };
    ;
    AddeventPage.prototype.addEvent_advanced = function () {
        var _this = this;
        this.fab.close();
        Tools.openModal(this.modalCtrl, addevent_advanced_1.AddeventAdvancedPage, { newevent: this.newevent }, function (data) {
            if (data != null) {
                _this.newevent = data;
                _this.defaultActivities = Maintools_1.join(data.activities, ",");
            }
        });
    };
    ;
    AddeventPage.prototype.addEvent_flyer = function () {
        var _this = this;
        this.fab.close();
        Tools.openModal(this.modalCtrl, addevent_flyer_1.AddeventFlyerPage, { newevent: this.newevent }, function (data) { if (data != null)
            _this.newevent = data; });
    };
    ;
    AddeventPage.prototype.addEvent_date = function () {
        var _this = this;
        Tools.openModal(this.modalCtrl, addevent_date_1.AddeventDatePage, { newevent: this.newevent }, function (data) {
            _this.fab.close();
            if (data != null)
                _this.newevent = data;
            _this.refreshDelay();
            _this.refreshFlyer();
        });
    };
    ;
    AddeventPage.prototype.openModele = function () {
        var _this = this;
        this.fab.close();
        Tools.openModal(this.modalCtrl, addevent_modele_1.AddeventModelePage, { newevent: this.newevent }, function (data) {
            if (data != null) {
                _this.showTypeEvent = false;
                if (data.type == "basic") {
                    _this.newevent.type = data.type;
                    _this.newevent.templateFlyer = data.templateFlyer;
                    _this.newevent.activities = [];
                    data.activities.split(",").forEach(function (a) { _this.newevent.activities.push(a); });
                    _this.newevent.title = data.title;
                    _this.newevent.autologin = data.autologin;
                    _this.newevent.musicserver = data.musicserver;
                    if (data.duration == null)
                        data.duration = 8 * 60;
                    _this.newevent.dtStart = Number(_this.newevent.dtStart);
                    _this.defaultActivities = data.activities;
                    _this.newevent.dtEnd = _this.newevent.dtStart + Number(data.duration * 60000);
                }
                else {
                    _this.defaultActivities = data.activities.join(",");
                    _this.newevent = data;
                }
                _this.searchAddress(13);
                _this.refreshDelay();
                _this.refreshFlyer();
                Maintools_1.$$("newevent=", _this.newevent);
            }
        });
    };
    /**
     *
     */
    AddeventPage.prototype.changeDefaultAddress = function () {
        var _this = this;
        this.userData.user.defaultAddress = this.newevent.address;
        this.userData.senduser("defaultAddress", this.userData.user).subscribe(function (rep) {
            _this.searchAddress(13);
        });
    };
    /**
     *
     */
    AddeventPage.prototype.selImage = function () {
        var vm = this;
        Maintools_1.openModal(this.modalCtrl, image_creator_1.ImageCreatorPage, { ratio: 3 / 2, upload: true }, function (rep) {
            if (rep != null) {
                vm.newevent.templateFlyer = rep.value;
                vm.refreshFlyer();
            }
        });
    };
    AddeventPage.prototype.refreshTemplateFlyer = function () {
        this.newevent.templateFlyer = null;
        this.refreshFlyer();
    };
    AddeventPage.prototype.updateAct = function (e) {
        this.newevent.activities = e.value.split(",");
    };
    AddeventPage.prototype.updateCategorie = function (val) {
        this.newevent.type = val.value;
        if (val.value == "meeting") {
            this.newevent.title = this.userData.user.firstname + "' meeting";
            this.newevent.activities = ["presentation", "message", "survey"];
        }
        else {
            this.newevent.title = this.userData.user.firstname + "' party";
            this.newevent.activities = ["music", "photo", "message", "survey"];
        }
        this.newevent.templateFlyer = null;
        this.refreshFlyer();
    };
    __decorate([
        core_1.ViewChild('mapCanvas'),
        __metadata("design:type", core_1.ElementRef)
    ], AddeventPage.prototype, "mapElement", void 0);
    __decorate([
        core_1.ViewChild("fab"),
        __metadata("design:type", ionic_angular_1.FabContainer)
    ], AddeventPage.prototype, "fab", void 0);
    AddeventPage = __decorate([
        core_1.Component({
            selector: 'page-addevent',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addevent\addevent.html"*/'<!--\n  Generated template for the AddeventPage page.\n-->\n<ion-header>\n\n  <shifutitle title="ADDEVENT.TITLE" [menu]="false"  help="#">\n    <shifubutton [hidewhenclick]="true" [small]="true" id="btnSaveEvent" icon="checkmark" label="LIB.SAVE" (click)="createEvent()"></shifubutton>\n    <shifubutton id="cmdClose" [small]="true" icon="close" (click)="viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n\n</ion-header>\n\n\n<ion-content no-padding text-center>\n\n  <tuto position="title" help="tuto_createevent" label="ADDEVENT.TUTO"></tuto>\n  <tuto position="title" start="15" label="Vous pouvez également utilisé un des modèles pour créer rapidement un événement" show="cmdUseModel"></tuto>\n\n  <ion-fab #fab bottom right>\n    <button id="btnFab" ion-fab color="primary"><ion-icon name="settings"></ion-icon></button>\n    <ion-fab-list side="top">\n      <button ion-fab class="option" id="btnModele" (click)="openModele()">\n        <ion-icon name="brush"></ion-icon>\n        <div class="label">{{\'ADDEVENT.USEMODELS\' | translate}}</div>\n      </button>\n      <button ion-fab id="btnAdvanced" (click)="addEvent_advanced()">\n        <ion-icon name="cog"></ion-icon>\n        <div class="label">{{\'ADDEVENT.SETTINGS\' | translate}}</div>\n      </button>\n\n      <button ion-fab id="btnFlyer" (click)="addEvent_flyer()">\n        <ion-icon name="image"></ion-icon>\n        <div class="label">Flyer</div>\n      </button>\n\n      <button ion-fab id="btnDate" (click)="addEvent_date()">\n        <ion-icon name="calendar"></ion-icon>\n        <div class="label">{{\'ADDEVENT.SETDATES\' | translate}}</div>\n      </button>\n\n    </ion-fab-list>\n  </ion-fab>\n\n  <shifuinput\n    align="center"\n    fontsize="x-large"\n    [focus]="true"\n    text-center\n    [clearInput]="true"\n    size="50"\n    id="txtTitle"\n    placeholder="{{\'LIB.TITLE\' | translate}}"\n    [(ngModel)]="newevent.title"\n    (ionBlur)="refreshFlyer()" max="40">\n  </shifuinput>\n\n\n  <div style="width: 100%;text-align: center;" *ngIf="showTypeEvent && userData.user.connexions.length<=20">\n\n    <br><br>{{"ADDEVENT.TYPEEVENT" | translate}}<br>\n    <shifubuttongroup\n            [exclude]="true"\n            labels="LIB.MEETING,LIB.PARTY"\n            images="./assets/img/meeting.png,./assets/img/party_large.png"\n            size="30%"\n            values="meeting,party"\n            [default]="defaultTypeOfEvent"\n            (onchange)="updateCategorie($event)">\n    </shifubuttongroup><br>\n    <shifubutton\n      id="cmdUseModel"\n      tips="Construire rapidement un événement en utilisant des modéles ou d\'autres événements"\n      label="ADDEVENT.USEMODELS"\n      (click)="openModele()">\n    </shifubutton>\n  </div>\n\n\n  <shifuinput\n          label="ADDEVENT.DESCRIPTION"\n          id="txtDescription"\n          *ngIf="userData.user.connexions.length>3"\n          [(ngModel)]="newevent.description" text-center\n          (ionBlur)="refreshFlyer()" >\n  </shifuinput>\n\n\n  <div style="width: 100%;text-align: center;" *ngIf="userData.user.connexions.length>20">\n    <br>\n    <span *ngIf="userData.user.connexions!=null && userData.user.connexions.length<40">\n      {{"ADDEVENT.ACTIVITIES" | translate}}<br>\n    </span>\n    <br>\n    <shifubuttongroup\n            labels="{{activities}}"\n            size="80px" fontsize="x-small"\n            values="music,photo,message,survey,bet,loterie,presentation"\n            [default]="defaultActivities"\n            (onchange)="updateAct($event)">\n    </shifubuttongroup>\n  </div>\n\n  <div *ngIf="newevent.duration/(3600*1000)<4" id="zoneDate"\n       style="width:100%;text-align: center;font-size: large;">\n    <br>\n    {{\'LIB.DURATION\' | translate}}:&nbsp;{{newevent.duration/(3600*1000) | number:"1.0-0"}} hrs<br>\n    <span style="font-size: medium" [hidden]="delay==undefined || delay.length==0">{{"LIB.STARTIN" | translate}}&nbsp;{{delay}}</span>\n  </div>\n\n\n  <shifucard title="ADDEVENT.FLYERPREVIEW" icon="refresh"\n             [visible]="(newevent.type!=undefined && newevent.type.length>0) || userData.user.connexions.length>3"\n             (onclick)="refreshTemplateFlyer()">\n    <!--Ici on doit mettre la hauteur car l\'apparition du card implique d\'avoir fixé la hauteur préalablement-->\n    <span *ngIf="userData.user.connexions.length<4">\n      Retournez le flyer pour modifier la date de votre événement ou le flyer lui même<br><br>\n    </span>\n    <div style="height:330px;width:300px;display:inline-block;">\n      <shifuflyer id="theFlyer" height="300px" width="200px" [reverse]="false" [flyer]="newevent.flyer">\n        <br><br>\n        <shifubutton tips="Modifier la photo du flyer" id="btnFlyer2" [small]="true" icon="build" label="Flyer" (click)="addEvent_flyer()"></shifubutton>\n        <br><br><br>\n        <span *ngIf="userData.user.connexions.length<10">{{\'ADDEVENT.BEGININ\' | translate}}</span><br>\n        <span (click)="addEvent_date()" text-right>{{newevent.dtStart | date: "dd/MM - HH:mm"}}<br></span>\n        <shifubutton\n          tips="Modifier la date de début et la durée de l\'événement"\n          [small]="true" icon="build" label="LIB.DATE"\n          (click)="addEvent_date()">\n        </shifubutton>\n        <br><br>\n      </shifuflyer>\n    </div>\n  </shifucard>\n\n\n  <shifucard title="ADDEVENT.EVENTADDRESS" [visible]="userData.user.email.length>0 && newevent.address.length>0" icon="checkmark" (onclick)="changeDefaultAddress()">\n    <ion-item no-padding no-border no-margin no-lines>\n      <ion-searchbar id="txtAddress"\n                     [(ngModel)]="newevent.address"\n                     (ionBlur)="searchAddress(13)"\n                     (keypress)="searchAddress($event.keyCode)">\n      </ion-searchbar>\n    </ion-item>\n\n    <div\n      #mapCanvas (mouseup)="computeAddress(null,2)"\n      style="margin:0px;padding:0px;width:100%;text-align: center;"\n      id="map_canvas">\n    </div>\n\n  </shifucard>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\addevent\addevent.html"*/,
        }),
        __metadata("design:paramtypes", [ionic_angular_2.ModalController, core_2.TranslateService,
            ionic_angular_1.ViewController, ionic_angular_2.LoadingController,
            ionic_angular_1.NavParams, event_data_1.EventDataProvider,
            ionic_angular_1.ToastController, api_1.ApiProvider, settings_1.SettingsProvider,
            user_data_1.UserData])
    ], AddeventPage);
    return AddeventPage;
}());
exports.AddeventPage = AddeventPage;
//# sourceMappingURL=addevent.js.map

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ionic_angular_1 = __webpack_require__(3);
var ionic_angular_2 = __webpack_require__(3);
var user_data_1 = __webpack_require__(8);
var Main = __webpack_require__(2);
var screens_1 = __webpack_require__(185);
var musicserver_1 = __webpack_require__(107);
var core_2 = __webpack_require__(7);
var Maintools_1 = __webpack_require__(2);
var Maintools_2 = __webpack_require__(2);
var image_creator_1 = __webpack_require__(38);
var tarifs_1 = __webpack_require__(320);
var api_1 = __webpack_require__(16);
var loginemail_1 = __webpack_require__(186);
var profil_1 = __webpack_require__(187);
var loginavatar_1 = __webpack_require__(190);
var ng_push_1 = __webpack_require__(84);
var settings_1 = __webpack_require__(23);
/**
 * Generated class for the PersoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PersoPage = /** @class */ (function () {
    function PersoPage(modalCtrl, navCtrl, toastCtrl, notifs, navParams, userData, alertCtrl, viewCtrl, translate, events, api, settings) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.notifs = notifs;
        this.navParams = navParams;
        this.userData = userData;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.translate = translate;
        this.events = events;
        this.api = api;
        this.settings = settings;
        this.images = [];
        this.friends = [];
        this.email = "";
        this.n_connexions = 0;
        this.services = [];
        this.from = "";
        this.tarifs = ["Basic", "Pro", "Premium", "Pilote"];
        this.users_blacklist = [];
        this.users_follow = [];
        this.toggled = false;
        this.profils = [
            { "lib": "Perso", "value": Main.PROFIL_PERSO, "help": "" },
            { "lib": "Public", "value": Main.PROFIL_PROPUBLIC, "help": "" },
            { "lib": "Entreprise", "value": Main.PROFIL_PROPRIVE, "help": "" }
        ];
        this.updatePersoPhoto = function (res) {
            var vm = this;
            Maintools_2.autoRotate(res.value, 0.3, function (photo) {
                vm.userData.sendflyer(Maintools_2.createPhoto(vm.userData.user, photo)).subscribe(function (r) {
                    vm.userData.user.picture = r.url;
                });
            });
        };
        this.from = this.navParams.get("from");
        this.services = Main.getAllServices(this.settings.services, navParams.get("filter"), this.userData.user.connexions.length, this.settings.version);
        this.n_connexions = this.userData.user.connexions.length;
    }
    PersoPage.prototype.handleSelection = function (event) {
        this.userData.user.picture = event.char;
        this.toggled = !this.toggled;
        this.updateUser();
    };
    PersoPage.prototype.creditAccount = function () {
        if (Maintools_2.getEnv() == 0) {
            this.userData.user.realCredits += 20;
            this.userData.senduser("realCredits").subscribe(function () { });
        }
    };
    PersoPage.prototype.selImage = function () {
        var vm = this;
        Maintools_1.openModal(this.modalCtrl, image_creator_1.ImageCreatorPage, { maxsize: 600 }, function (resp) {
            if (resp != null)
                vm.userData.sendflyer(Maintools_2.createPhoto(vm.userData.user, resp.value)).subscribe(function (r) {
                    vm.userData.user.picture = r.url;
                });
        });
    };
    PersoPage.prototype.opentarifs = function () {
        Maintools_1.openModal(this.modalCtrl, tarifs_1.TarifsPage, { user: this.userData.user }, function (r) {
        });
    };
    PersoPage.prototype.setPopupAction = function (fn) {
        this.openPopup = fn;
    };
    PersoPage.prototype.ionViewDidLoad = function () {
        this.refreshList();
        if (!this.userData.user.hasOwnProperty("followers"))
            this.userData.user["followers"] = [];
        //vm.refreshList(this.userData.user);
        for (var i = 0; i < 20; i++)
            this.userData.user.connexions.push(i);
    };
    PersoPage.prototype.openHome = function () {
        Maintools_1.openWindow(this.userData.user.home);
    };
    PersoPage.prototype.openScreens = function () {
        this.navCtrl.push(screens_1.ScreensPage, { user: this.userData.user.id });
    };
    PersoPage.prototype.updateUser = function () {
        //if(this.userData.user.email!=this.email && this.email.length>0)this.userData.user.email=this.email;
        this.userData.senduser("home,picture,musicServer,profil,tags,firstname,publicPatterns,picture,defaultAddress,humeur").subscribe(function (rep) { });
    };
    PersoPage.prototype.ionViewWillLeave = function () {
        this.updateUser();
    };
    PersoPage.prototype.openMusicServer = function () {
        var vm = this;
        Main.openModal(this.modalCtrl, musicserver_1.MusicserverPage, { user: this.userData.user }, function (user) {
            vm.userData.user = user;
            vm.updateUser();
        });
    };
    PersoPage.prototype.isActive = function (item) {
        if (item.checked)
            return "primary";
        else
            return "secondary";
    };
    PersoPage.prototype.openTarifs = function () {
        Maintools_1.openModal(this.modalCtrl, tarifs_1.TarifsPage, {}, function (resp) {
        });
    };
    PersoPage.prototype.onClickService = function (service) {
        var vm = this;
        if (!service.checked) {
            Main.openGeneral(service.token, this.userData.user).then(function () {
                //On récupére une mise a jour de l'utilisateur pour vérifier s'il a la connexion
                vm.updateUser();
                vm.userData.get().subscribe(function (resp) {
                    if (resp != null) {
                        //TODO: a trouver mieux
                        if (vm.userData.user.email != null && vm.userData.user.email.length == 0 && resp.email.length > 0) {
                            Maintools_2.toast(vm.toastCtrl, "PERSO.PROFILCHANGE", vm.translate);
                            vm.events.publish("user:refresh", resp);
                        }
                        vm.userData.user = resp;
                        vm.refreshList(service);
                    }
                });
            });
        }
        else {
            vm.userData.revoketoken(service.token).subscribe(function (r) {
                vm.userData.user = r;
                if (service.token == "deezer" || service.token == "spotify")
                    vm.userData.clearPlaylist();
                vm.userData.playlist = [];
                vm.refreshList(service);
            });
        }
    };
    ;
    PersoPage.prototype.refreshList = function (new_service) {
        var _this = this;
        if (new_service === void 0) { new_service = ""; }
        this.userData.getUsersBlacklist().subscribe(function (resp) {
            if (resp != null)
                _this.users_blacklist = resp.items;
        });
        this.userData.getusersifollow().subscribe(function (resp) {
            if (resp != null)
                _this.users_follow = resp.items;
        });
        this.services.forEach(function (service) {
            var status = _this.userData.user.hasOwnProperty("accessTokens") && _this.userData.user.accessTokens.hasOwnProperty(service.token);
            service.checked = status;
        });
        if (new_service == "contact" || new_service == "facebook")
            this.userData.loadcontacts();
    };
    ;
    PersoPage.prototype.razUser = function () {
        var _this = this;
        var vm = this;
        Maintools_1.showPopup({ title: "PERSO.RAZUSER", placeholder: "", confirmButton: "OK", cancelButton: "LIB.CANCEL", type: "text", translate: this.translate }, this.alertCtrl, function (res) {
            if (res == "yes")
                _this.userData.razme().subscribe(function (r) {
                    vm.events.publish("user:logout");
                });
        });
    };
    PersoPage.prototype.removeFromBlacklist = function (user) {
        var _this = this;
        this.api.blacklist(this.userData.user.id, user.id, false).subscribe(function () {
            _this.refreshList();
        });
    };
    PersoPage.prototype.resetSecretCode = function () {
        //TODO: a completer
    };
    PersoPage.prototype.showPrivacy = function () {
        Maintools_1.openWindow(Maintools_1.DOMAIN_SERVER + "/privacy.html?lang=" + this.userData.user.lang);
    };
    PersoPage.prototype.showHelp = function () {
        Maintools_1.openWindow(Maintools_1.DOMAIN_SERVER + "/help_for_options.html?lang=" + this.userData.user.lang);
    };
    PersoPage.prototype.giveEmail = function () {
        var _this = this;
        Maintools_1.openModal(this.modalCtrl, loginemail_1.LoginemailPage, { from: profil_1.ProfilPage.name, pseudo: this.userData.user.firstname }, function (res) {
            if (res != null) {
                _this.userData.user.firstname = res.firstname;
                _this.userData.user.email = res.email;
                _this.updateUser();
                _this.userData.senduser("email").subscribe(function (r) {
                    if (r.message.length == 0) {
                        Maintools_2.toast(_this.toastCtrl, "PERSO.PROFILCHANGE", _this.translate);
                        _this.userData.user = r;
                    }
                    else
                        Maintools_2.toast(_this.toastCtrl, r.message, _this.translate);
                });
            }
        });
    };
    PersoPage.prototype.selAvatar = function () {
        var _this = this;
        Maintools_1.openModal(this.modalCtrl, loginavatar_1.LoginavatarPage, { pseudo: false, from: "perso" }, function (rep) {
            if (rep != null)
                _this.userData.user.picture = rep.picture;
        });
    };
    PersoPage.prototype.enableNotifications = function () {
        this.notifs.requestPermission();
    };
    PersoPage.prototype.removeUserFollow = function (user) {
        var _this = this;
        this.api.delFollower(this.userData.user.id, user.id).subscribe(function () {
            setTimeout(function () { _this.refreshList(); }, 1000);
        });
    };
    PersoPage = __decorate([
        core_1.Component({
            selector: 'page-perso',template:/*ion-inline-start:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\perso\perso.html"*/'<ion-header>\n  <shifutitle [menu]="false" title="PERSO.TITLE"  help="#">\n    <shifubutton id="btnClose" icon="checkmark" (click)="viewCtrl.dismiss()"></shifubutton>\n  </shifutitle>\n</ion-header>\n\n<ion-content no-padding no-margin>\n\n  <shifucard [visible]="true" [hidden]="from==\'search\'" title="{{userData.user.firstname}}" [showButton]="userData.user.email.length==0" label="PERSO.GIVEEMAIL" (onclick)="giveEmail()">\n    <ion-item text-center no-margin no-border no-padding no-lines>\n      <shifuimageprofil [openprofil]="false" style="display:inline-block" size="150px" [user]="userData.user"></shifuimageprofil>\n      <br>\n      <!--<shifubutton icon="happy" (click)="toggled = !toggled"-->\n                   <!--[(emojiPickerIf)]="toggled" [emojiPickerDirection]="\'top\'"-->\n                   <!--(emojiPickerSelect)="handleSelection($event)">-->\n      <!--</shifubutton>-->\n      <shifucamera id="selfile" icon="camera" sizeiconwidth="10px" sizeiconheight="10px" (onTake)="updatePersoPhoto($event)"></shifucamera>\n      <shifubutton  id="btnProfilPicture" icon="images" (click)="selImage()"></shifubutton>\n      <shifubutton  id="btnProfilAvatar" icon="person" (click)="selAvatar()"></shifubutton>\n    </ion-item>\n\n    <shifuinput size="40" id="txtFirstname" label="LIB.FIRSTNAME" [(ngModel)]="userData.user.firstname"></shifuinput>\n    <!--<shifucheckbox id="chkAnonymous" label="PROFIL.ANONYMOUS" *ngIf="userData.user.connexions.length>30" [(ngModel)]="userData.user.anonymous"></shifucheckbox>-->\n\n    <ion-item no-margin no-lines no-border *ngIf="n_connexions>10">\n      <shifuinput size="80" id="txtHumeur"  label="PERSO.HUMEUR" [(ngModel)]="userData.user.humeur"></shifuinput>\n      <shifuinput size="100" id="txtHome"  label="PERSO.HOME" [(ngModel)]="userData.user.home" (onenter)="openHome()"></shifuinput>\n      <shifuinput size="150" id="txtAddress" label="LIB.ADDRESS" [(ngModel)]="userData.user.defaultAddress"></shifuinput>\n    </ion-item>\n\n    <!--<div style="width:100%;text-align: center;" *ngIf="userData.user.nEventCreated>0">-->\n      <!--<shifubutton  id="btnMusicServer" label="PERSO.CHANGEMUSICSERVER" (click)="openMusicServer()"></shifubutton>-->\n    <!--</div>-->\n  </shifucard>\n\n  <shifucard title="Preferences">\n    <shifucheckbox id="btnNotifications" label="Notifications" (onclick)="enableNotifications()"></shifucheckbox>\n  </shifucard>\n\n  <!--<shifucard title="PERSO.CHOOSEAVATAR" *ngIf="images!=null && images.length>0">-->\n    <!--<div class="item item-text-wrap">-->\n      <!--<img *ngFor="let img of images"-->\n           <!--src="{{img.photo}}"-->\n           <!--style="margin: 3px;display:inline;"-->\n           <!--class="avatar-large"-->\n           <!--(click)="selImage(img)">-->\n    <!--</div>-->\n    <!---->\n  <!--</shifucard>-->\n\n\n  <shifucard [hidden]="from==\'search\'"  [visible]="false" tuto="PERSO.TUTO_OFFER" title="PERSO.YOUROFFER" icon="help" (onclick)="showHelp()">\n        <ion-label no-border no-margin no-padding (click)="creditAccount()">\n          <!--on ne montre pas le crédit si on est en tarif pilote-->\n          <span *ngIf="userData.user.tarif!=undefined && userData.user.tarif.tarif!=3">{{\'LIB.ACCOUNT\' | translate}}:&nbsp;{{userData.user.realCredits | number:"2.1-5"}}&nbsp;{{\'LIB.MONEY\' | translate}}&nbsp;</span><br>\n          <span style="font-size: xx-large">{{userData.user.tarif.label}}</span>\n        </ion-label>\n\n          <shifubutton  *ngIf="userData.user.tarif!=undefined && userData.user.tarif.tarif!=3" item-end id="btnTarifs" label="LIB.MODIFY" (click)="openTarifs()"></shifubutton>\n  </shifucard>\n\n\n  <!--\n        <div class="text-center" *ngIf="userData.user.realcredit<20">\n          <div id="paypal-button"></div>&nbsp;\n          <button *ngIf="paymentAvailable" class="button icon-left ion-ios-pie button-positive button-small" (click)="googlePaiement()">\n            {{\'LIB.BUY\' | translate}}\n          </button>\n        </div>\n              -->\n\n\n  <!--\n  <div style="text-align: center" *ngIf="userData.user.nLocalFile>0">\n    {{userData.user.nLocalFile}}&nbsp;{{\'PERSO.LOCALFILE\' | translate }}\n  </div>\n           -->\n\n    <!--\n    <tuto label="PERSO.TUTO_SERVICES"></tuto>\n    -->\n  <shifucard title="PROFIL.LABELSERVICETIERS" tuto="PERSO.TUTOSERVICETIERS" [visible]="userData.user.connexions.length>20" icon="help" (onclick)="showHelp()">\n    <ion-list no-border no-margin no-lines>\n      <ion-item *ngFor="let item of services">\n        <ion-label style="font-size: small" text-wrap>{{item.token.toUpperCase()+".DESCRIPTION" | translate}}</ion-label>\n        <button name="btnServices" style="width: 100px" ion-button [color]="isActive(item)" item-end (click)="onClickService(item)">{{ item.text }}</button>\n      </ion-item>\n    </ion-list>\n  </shifucard>\n\n  <shifucard title="Blacklist" tuto="PERSO.TUTO_BLACKLIST" *ngIf="users_blacklist!=null && users_blacklist.length>0">\n    <ion-list>\n      <ion-item *ngFor="let user of users_blacklist">\n        <ion-avatar item-start>\n          <shifuimageprofil shifuid="users" [user]="user"></shifuimageprofil>\n        </ion-avatar>\n        {{user.firstname}}&nbsp;\n        <button ion-button item-end icon="cancel" (click)="removeFromBlacklist(user)">{{"LIB.DELETE" | translate}}</button>\n      </ion-item>\n    </ion-list>\n  </shifucard>\n\n  <shifucard title="Following" tuto="PERSO.TUTO_FOLLOWING" *ngIf="users_follow!=null && users_follow.length>0">\n    <ion-list>\n      <ion-item *ngFor="let user of users_follow">\n        <ion-avatar item-start>\n          <shifuimageprofil shifuid="users" [user]="user"></shifuimageprofil>\n        </ion-avatar>\n        {{user.firstname}}&nbsp;\n        <button ion-button item-end icon="cancel" (click)="removeUserFollow(user)">{{"LIB.DELETE" | translate}}</button>\n      </ion-item>\n    </ion-list>\n  </shifucard>\n\n\n\n\n  <shifucard [visible]="userData.user!=null && userData.user.connexions.length>30" tuto="PERSO.TUTO_PRIVACY" *ngIf="userData.user.email!=null && userData.user.email.length>0" title="LIB.PRIVACY" icon="help" (onclick)="showPrivacy()">\n    <ion-item text-center no-margin>\n      <!--<shifubutton [small]="true" size="150" *ngIf="userData.user.connexions.length>50"-->\n                   <!--(click)="resetSecretCode()"-->\n                   <!--label="PROFIL.RESET_SECRETCODE"></shifubutton>\n      -->\n      <shifubutton [small]="true" size="150" label="LIB.RAZ" (click)="razUser()"></shifubutton><br>\n    </ion-item>\n  </shifucard>\n\n\n\n  <br>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\hhoareau\IdeaProjects\shifumixClient\src\pages\perso\perso.html"*/
        }),
        __metadata("design:paramtypes", [ionic_angular_2.ModalController, ionic_angular_1.NavController, ionic_angular_1.ToastController, ng_push_1.PushNotificationsService,
            ionic_angular_1.NavParams, user_data_1.UserData, ionic_angular_2.AlertController, ionic_angular_1.ViewController,
            core_2.TranslateService, ionic_angular_2.Events, api_1.ApiProvider, settings_1.SettingsProvider])
    ], PersoPage);
    return PersoPage;
}());
exports.PersoPage = PersoPage;
//# sourceMappingURL=perso.js.map

/***/ })

},[354]);
//# sourceMappingURL=main.js.map