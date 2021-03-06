import * as React from 'react';
import styles from './SpfxPnpCarousel.module.scss';
import { ISpfxPnpCarouselProps } from './ISpfxPnpCarouselProps';
import { ISpfxPnpCarouselState } from './ISpfxPnpCarouselState';
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

export default class SpfxPnpCarousel extends React.Component<ISpfxPnpCarouselProps, ISpfxPnpCarouselState> {
  constructor(props: ISpfxPnpCarouselProps, state: ISpfxPnpCarouselState) {


    super(props);

    SPComponentLoader.loadCss("https://ownix.sharepoint.com/devrepo/Styles/css/top_ribbon_appear.css");
    

    sp.setup({
      spfxContext: this.props.context
    });
    this.state = {
      itemss: [
        {
          id:"",
          title:"",
          description:"",
          image:"",
          viewbutton:false,
          "Buttontext":"",
          Attachments:"",
          AttachmentFiles:""
        }],
      carouselElements: []
    }
    this._getFiles();
  }


  // public async onInit(): Promise<any> {
  //   debugger;
  //   SPComponentLoader.loadCss("https://alphabold.sharepoint.com//Styles/css/top_ribbon_appear.css");
  //   // SPComponentLoader.loadCss(
  //   //   "https://ownix.sharepoint.com/DEVREPO/Styles/css/custom-fonts.min.css"
  //   // );
  //   return Promise.resolve();
  // }

  @autobind
  private async _getFiles() {
    const items: any[] = await sp.web.lists.getByTitle("bannerlist").items.select("*,Id,ID,Title,Description,Buttontext,Attachments,AttachmentFiles")
    .expand("AttachmentFiles")
    .filter('Attachments eq 1')
    .get();

    debugger;


    url=this.props.siteurl;

    let banner: any[] = [];
    let i: number;

    for(var j=0; j<items.length; j++)
    {
      var id=items[j].ID;
      var title = items[j].Title;
       var description=items[j].Description;
      if(items[j].Description.length>300)
      {
         console.log("Inside the description greater than 300:--",items[j].Description);  
         description=items[j].Description.substring(0,300) + "....";
      }
  
      if(items[j].Description.length<200)
      {
       console.log("Inside the description less than 300:--",items[j].Description);  
  
           description=items[j].Description;
      }
  
  
      var url_final=url+"/Lists/bannerlist/Attachments/"+id+"/"+items[j].AttachmentFiles[0].FileName;
       image=url_final;
      const insert=
      {
        id,
        title,
        description,
        image
      };
      bannerArray.push(insert);


      banner.push(<div key={i} >
        <div>
        
        <a href="#">
            <img className={[styles.imageCarousal].join(' ')} src={url_final} alt="banner" />
          </a>
          <div className={styles.titleDescriptionContainer}>
            <h2>
              <small>ALPHABOLD</small>
              <br></br>
              {title}
              <span></span>
              </h2>
            <p>{description}</p>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className={styles.bottomTitleLinkContainer}>
              <a href="https://alphabold.sharepoint.com/WebpartsTest/Lists/bannerlist/EditForm.aspx?ID=3">
                <button className={styles.bottomTitleLinkButton}>
                  {title}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>);


      
     }
  


    



      //let url = this.props.context.pageContext.web.absoluteUrl.replace(this.props.context.pageContext.web._serverRelativeUrl, "") + element.FileRef;

      

    this.setState({ carouselElements: banner });
  }

  public async componentDidMount(){    

    console.log("HEYY");
    $("body").addClass("hideribbon");
    $('body').addClass('Landingpagelayout');

    bannerArray=[];
 
    var reactHandler = this;
    url=this.props.siteurl;
    var handler=this;
    //let WEB = new Web(url+"/");
    let userId;
    
   debugger;
 
   sp.web.lists.getByTitle("bannerlist").items
   .select("*,Id,ID,Title,Description,Buttontext,Attachments,AttachmentFiles")
   .expand("AttachmentFiles")
   .filter('Attachments eq 1')
   .get().then((response) => {
 
    console.log("items in state:---",this.state.itemss);
    console.log("Showing ID:---",this.state.itemss[0]);
    
    //  if(response.length > 0){
    //    flag =true
    //  }
    url=this.props.siteurl;
    for(var i=0; i<response.length; i++)
    {
     var id=response[i].ID;
     var title = response[i].Title;
      var description=response[i].Description;
     if(response[i].Description.length>200)
     {
        console.log("Inside the description greater than 200:--",response[i].Description);  
        description=response[i].Description.substring(0,200) + "....";
     }
 
     if(response[i].Description.length<200)
     {
      console.log("Inside the description less than 200:--",response[i].Description);  
 
          description=response[i].Description;
     }
 
 
     var url_final=url+"/Lists/bannerlist/Attachments/"+id+"/"+response[i].AttachmentFiles[0].FileName;
      image=url_final;
     const insert=
     {
       id,
       title,
       description,
       image
     };
     bannerArray.push(insert);
    }
 
    reactHandler.setState({
      itemss:  bannerArray     
    });
 
    console.log("After loading in Array",this.state.itemss);
 
    // response.forEach((listItem: any) =>
    //  {
    //      handler.setState({
    //        items: listItem            
    //      });
    //  });    
   });
  
 }    
 

  public render(): React.ReactElement<ISpfxPnpCarouselProps> {
    return (
      <div className={styles.spfxPnpCarousel}>
        <Carousel contentContainerStyles={styles.carouselImageContent}
          buttonsLocation={CarouselButtonsLocation.center}
          buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
          isInfinite={true}
          prevButtonStyles={styles.preslide}
          nextButtonStyles={styles.nextslide}
          pauseOnHover={true}
          interval={3000}
          element={this.state.carouselElements}
          onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
          onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
        />
      </div>
    );
  }
}