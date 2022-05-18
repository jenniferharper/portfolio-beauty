console.clear();
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);

/////---------- Navigation
//////hamburger and menu changes/////
$('.navbar-toggler').click(function(){
  $(this).toggleClass('open');
});


$('.nav-item a').click(function() {
   $('.navbar-toggler').removeClass('open');
});

$('.nav-link').on('click',function() {
  $('.navbar-collapse').collapse('hide');
});

//////scroll change nav/////
var scrollUp = document.querySelector('.navbar');

// adds bg color when start scrolling
ScrollTrigger.create({
  id:'scrolling-down',
  start: 'top top-=50',
  toggleClass: {className: 'nav--scrolled', targets: scrollUp,}
});


ScrollTrigger.create({
  start: 'top top-=40',
  toggleClass: {className: 'nav--up', targets: scrollUp},
  onUpdate: ({direction}) => {
    if (direction == -1) {
    scrollUp.classList.remove('nav--up');
    } else {
    scrollUp.classList.add('nav--up');
  }}
});


ScrollTrigger.matchMedia({  
  //tablet/mobile
  "(max-width: 992px)": function() {
    gsap.set(".reveal div",{
      yPercent: 0,
      opacity:1,
    })
  },
  // desktop
  "(min-width: 992px)": function() {
    ///////////////////reveal testimonials///////////////////////////
    let revealContainers = document.querySelectorAll(".reveal");
    let cols = 3;
    for (let i = 0; i < revealContainers.length; i += cols) {
      let containers = []
      for (let j = 0; j < cols; j++) {
        containers.push(revealContainers[i + j]);
      }    
      createTrigger(containers);
    }
    function createTrigger(containers) {     
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containers[0],
          start: "top bottom-=100",
          toggleActions: 'play none none reverse',
        }
      })        
      containers.forEach((container, i) => {
        let image = container.querySelector(".reveal div");
        let subTl = gsap.timeline()         
         .from(image, {
            yPercent: -100,
            opacity:0,
          });        
        tl.add(subTl, i * 0);
      });    
    }   
  },
	
  ///////// all 
  "all": function() {


    // //background image amination
    gsap.set('.zoom', {scale:1.5, transformOrigin:'50% 50%'},0);	
    const zoom = document.querySelectorAll('.zoom');

    zoom.forEach((section, index) => {
      gsap.to(zoom, {
        scale:1,
        ease:Power1.easeInOut,
        duration:1,
        scrollTrigger: {
          trigger: section,
            start: 'top bottom-=200',
            toggleActions: 'play none none none',
        }
      });  
    })

      // //background image amination
      gsap.set('.zoom-other', {backgroundSize:'150%', transformOrigin:'50% 50%'},0);
      const zoomOther = document.querySelectorAll('.zoom-other');  
      zoomOther.forEach((section, index) => {
        gsap.to(zoomOther, {
          backgroundSize:'100%',
          ease:Power1.easeInOut,
          duration:1,
          scrollTrigger: {
            trigger: section,
              start: 'top bottom-=200',
              toggleActions: 'play none none none',
          }
        });  
      })


    /////////////////hero arrows /////////////////////////
    gsap.set(".arrow-wrap path",{
      stroke:'#f1353d',
      strokeWidth:5,
      fill:'none',
      strokeLinecap:'round',
      strokeMiterlimit:10,
    })

    let arrows = gsap.timeline({delay:0.5, start:'top top'})

    arrows.from('.arrow-wrap .stem', {
      drawSVG: '0% 0%',
      ease: "none",
      opacity:0,
      duration:1,
      stagger:0.7,
    },0);

    arrows.from('.arrow-wrap .cap', {
      drawSVG: '50% 50%',
      ease: "none",
      opacity:0,
      duration:0.5,
      stagger:0.7
    },0.8);

    arrows.from('.arrow', {
      delay:2,
      scale:1.25,
      repeat:-1,
      yoyo:true,
      transformOrigin:'50% 50%',
    },2);
    
    //////////////////////////////////////////

        // //split text titles
        var text = gsap.utils.toArray(".enterText");
        text.forEach((el) => {
            var splitWords = new SplitText(el, {type: "words,chars"});
            chars = splitWords.chars;
    
            var splitTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: "top bottom-=100",
                end: "bottom top",
                toggleActions: "play none none none",
              }
            });
            splitTimeline.from(chars, {
                opacity:0,
                duration: 0.5,
                yPercent: 100,
                ease: "back.out",
                stagger: 0.02
            });
        });
        //////////////

  }	
}); 


    ///////////////////site preloader////////////////////////
    var imgLoad = imagesLoaded('.wrapper');
    var progressBar = $(".c-preloader__progress"),
        count = $(".c-preloader__count"),
        images = $("img").length,
        loadedCount = 0,
        loadingProgress = 0,
        tlProgress = gsap.timeline();
     
    imgLoad.on( 'progress', function( instance, image ) {
        loadProgress();
    });
     
    function loadProgress(imgLoad, image) {
    
        loadedCount++;
      
        loadingProgress = (loadedCount/images);
        console.log(loadingProgress);
    
        gsap.to(tlProgress, 1, {progress:loadingProgress});
    }
    
    var tlProgress = gsap.timeline({
        paused: true,
        onUpdate: countPercent,
        onComplete: loadComplete
    });
     
    tlProgress
      .set(".c-preloader",{ transformOrigin:'0 0'},0)
      .set('.hero', {yPercent:10},0)
      .to('html',{overflow:'hidden'},0)
      .to(progressBar, 1, {width:"100%"},0)      
      .to(count, 0.5, {autoAlpha:0},1)

    
    
    function countPercent() {
          var newPercent = (tlProgress.progress()*100).toFixed();
          count.text(newPercent + "%");
    }
    
    function loadComplete() {
      mySplitText = new SplitText(".hero h1", { type: "words,chars" }),
      chars = mySplitText.chars;
    
      var tlEnd =  gsap.timeline({});
      tlEnd
        .to('html',{overflow:'visible'},0)
        .to(".c-preloader", 0.5, { height:0},0)
        .to('.hero',0.5,  {yPercent:0},'-=0.5')
        .from(chars, {
          opacity:0,
          duration: 0.5,
          yPercent: 100,
          ease: "back.out",
          stagger: 0.05
        });
    }