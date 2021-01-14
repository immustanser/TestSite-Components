var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
import * as React from 'react';
import styles from './SpfxPnpCarousel.module.scss';
import { sp } from "@pnp/sp";
import { Carousel, CarouselButtonsLocation, CarouselButtonsDisplay } from "@pnp/spfx-controls-react/lib/Carousel";
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { SPComponentLoader } from '@microsoft/sp-loader';
import $ from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
var bannerArray = [];
var image;
var url;
var SpfxPnpCarousel = /** @class */ (function (_super) {
    __extends(SpfxPnpCarousel, _super);
    function SpfxPnpCarousel(props, state) {
        var _this = _super.call(this, props) || this;
        SPComponentLoader.loadCss("https://alphabold.sharepoint.com//Styles/css/top_ribbon_appear.css");
        sp.setup({
            spfxContext: _this.props.context
        });
        _this.state = {
            itemss: [
                {
                    id: "",
                    title: "",
                    description: "",
                    image: "",
                    viewbutton: false,
                    "Buttontext": "",
                    Attachments: "",
                    AttachmentFiles: ""
                }
            ],
            carouselElements: []
        };
        _this._getFiles();
        return _this;
    }
    // public async onInit(): Promise<any> {
    //   debugger;
    //   SPComponentLoader.loadCss("https://alphabold.sharepoint.com//Styles/css/top_ribbon_appear.css");
    //   // SPComponentLoader.loadCss(
    //   //   "https://ownix.sharepoint.com/DEVREPO/Styles/css/custom-fonts.min.css"
    //   // );
    //   return Promise.resolve();
    // }
    SpfxPnpCarousel.prototype._getFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items, banner, i, j, id, title, description, url_final, insert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.lists.getByTitle("bannerlist").items.select("*,Id,ID,Title,Description,Buttontext,Attachments,AttachmentFiles")
                            .expand("AttachmentFiles")
                            .filter('Attachments eq 1')
                            .get()];
                    case 1:
                        items = _a.sent();
                        debugger;
                        url = this.props.siteurl;
                        banner = [];
                        for (j = 0; j < items.length; j++) {
                            id = items[j].ID;
                            title = items[j].Title;
                            description = items[j].Description;
                            if (items[j].Description.length > 200) {
                                console.log("Inside the description greater than 200:--", items[j].Description);
                                description = items[j].Description.substring(0, 200) + "....";
                            }
                            if (items[j].Description.length < 200) {
                                console.log("Inside the description less than 200:--", items[j].Description);
                                description = items[j].Description;
                            }
                            url_final = url + "/Lists/bannerlist/Attachments/" + id + "/" + items[j].AttachmentFiles[0].FileName;
                            image = url_final;
                            insert = {
                                id: id,
                                title: title,
                                description: description,
                                image: image
                            };
                            bannerArray.push(insert);
                            banner.push(React.createElement("div", { key: i },
                                React.createElement("div", null,
                                    React.createElement("a", { href: "#" },
                                        React.createElement("img", { className: [styles.imageCarousal].join(' '), src: url_final, alt: "banner" })),
                                    React.createElement("div", { className: styles.titleDescriptionContainer },
                                        React.createElement("h2", null,
                                            React.createElement("small", null, "Alphabold"),
                                            React.createElement("br", null),
                                            title),
                                        React.createElement("p", null, description)),
                                    React.createElement("div", { className: styles.bottomTitleLinkContainer },
                                        React.createElement("a", { href: "https://ownix.sharepoint.com/WebpartsTest/Lists/bannerlist/EditForm.aspx?ID=3" }, title)))));
                        }
                        //let url = this.props.context.pageContext.web.absoluteUrl.replace(this.props.context.pageContext.web._serverRelativeUrl, "") + element.FileRef;
                        this.setState({ carouselElements: banner });
                        return [2 /*return*/];
                }
            });
        });
    };
    SpfxPnpCarousel.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reactHandler, handler, userId;
            var _this = this;
            return __generator(this, function (_a) {
                console.log("HEYY");
                $("body").addClass("hideribbon");
                $('body').addClass('Landingpagelayout');
                bannerArray = [];
                reactHandler = this;
                url = this.props.siteurl;
                handler = this;
                debugger;
                sp.web.lists.getByTitle("bannerlist").items
                    .select("*,Id,ID,Title,Description,Buttontext,Attachments,AttachmentFiles")
                    .expand("AttachmentFiles")
                    .filter('Attachments eq 1')
                    .get().then(function (response) {
                    console.log("items in state:---", _this.state.itemss);
                    console.log("Showing ID:---", _this.state.itemss[0]);
                    //  if(response.length > 0){
                    //    flag =true
                    //  }
                    url = _this.props.siteurl;
                    for (var i = 0; i < response.length; i++) {
                        var id = response[i].ID;
                        var title = response[i].Title;
                        var description = response[i].Description;
                        if (response[i].Description.length > 200) {
                            console.log("Inside the description greater than 200:--", response[i].Description);
                            description = response[i].Description.substring(0, 200) + "....";
                        }
                        if (response[i].Description.length < 200) {
                            console.log("Inside the description less than 200:--", response[i].Description);
                            description = response[i].Description;
                        }
                        var url_final = url + "/Lists/bannerlist/Attachments/" + id + "/" + response[i].AttachmentFiles[0].FileName;
                        image = url_final;
                        var insert = {
                            id: id,
                            title: title,
                            description: description,
                            image: image
                        };
                        bannerArray.push(insert);
                    }
                    reactHandler.setState({
                        itemss: bannerArray
                    });
                    console.log("After loading in Array", _this.state.itemss);
                    // response.forEach((listItem: any) =>
                    //  {
                    //      handler.setState({
                    //        items: listItem            
                    //      });
                    //  });    
                });
                return [2 /*return*/];
            });
        });
    };
    SpfxPnpCarousel.prototype.render = function () {
        return (React.createElement("div", { className: styles.spfxPnpCarousel },
            React.createElement(Carousel, { contentContainerStyles: styles.carouselImageContent, buttonsLocation: CarouselButtonsLocation.top, buttonsDisplay: CarouselButtonsDisplay.block, 
                //isInfinite={true}
                element: this.state.carouselElements, onMoveNextClicked: function (index) { console.log("Next button clicked: " + index); }, onMovePrevClicked: function (index) { console.log("Prev button clicked: " + index); } })));
    };
    __decorate([
        autobind
    ], SpfxPnpCarousel.prototype, "_getFiles", null);
    return SpfxPnpCarousel;
}(React.Component));
export default SpfxPnpCarousel;
//# sourceMappingURL=SpfxPnpCarousel.js.map