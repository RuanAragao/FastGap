// FASTGAP - GUSTAVO COSTA - @GustavoCostaW

//ms
var transitionSpeed = 160;

//easing default
var easing = "snap";

//effects array
var effects = new Array();

//events
function events(){
    //listener buttons menu .botoes-app class
	$("#page").on('click','.botoes-app',function(){

		/* effects, for select one effect, define one effect[0] and effect[1] 
		view more on http://ricostacruz.com/jquery.transit/ */ 
		switch($(this).data("url")) {
			//pg1
			case "page1.html" :
			effects[0] = {opacity:0};
			effects[1] = {opacity:1};
			break;
			//pg2
			case "page2.html" :
			effects[0] = {x:window.innerWidth,opacity:0};
			effects[1] = {x:0,opacity:1};
			break;
			//pg3
			case "page3.html" :
			effects[0] = { rotateY: '180deg',opacity:0};
			effects[1] = { rotateY: '0deg',opacity:1};
			break;
			//pg4
			case "page4.html" :
			effects[0] = { scale:0};
			effects[1] = { scale:1};
			break;
			//pg5
			case "page5.html" :
			effects[0] = { rotate:'+=20deg',x:window.innerWidth};
			effects[1] = { rotate:'0deg',x:0};
			break;
			//default
			default:
			effects[0] = {opacity:0};
			effects[1] = {opacity:1};
			easing = "snap";
		}

		// save var in clicked button
		page = $(this).data("url");
		//transition effect one 
		$('#page').transition(effects[0],transitionSpeed,easing,startTransition);
			
		function startTransition(){
			//ajax load new page
			$.get("pages/"+page,function(data){
				// add content in #page
				$("#iscroll").html(data);
				//scroll
				myScroll = new IScroll('#iscroll',{ scrollbars: true, mouseWheel: true, interactiveScrollbars: true });

				if(page == "page1.html"){
					//carrousel starts in page 1
					$("#carrousel-app").owlCarousel({
						  items:1,
						  autoPlay:true,
					      slideSpeed : 300,
					      paginationSpeed : 400,
					      singleItem: true
					 });
				}

				//show back button
				$("#voltar").show();

				//back transition effect  two
				$('#page').transition(effects[1],transitionSpeed,easing);
			})
		}
	});

	// back button clicked
	$("#voltar").click(function(){
		//back button hide
		$("#voltar").hide();
		//effect one
		$('#page').transition( effects[0] ,transitionSpeed,easing,endTransition);

		function endTransition(){
			//load home page
			$.get("pages/home.html",function(data){
				// add content in #page
				$("#iscroll").html(data);
				//scroll
				myScroll = new IScroll('#iscroll',{ scrollbars: true, mouseWheel: true, interactiveScrollbars: true });

				//back effect two
				$('#page').transition(effects[1],transitionSpeed,easing);
			})
		}		
	});

	//PANE MENU
    $("#page").on('click','#menu-select',function(){
            if(!$("menu").hasClass("actived-menu")){
                    $('menu').transition({x:0},transitionSpeed,easing);
                    $('#voltar,#header-index').transition({x:$("menu").width()},transitionSpeed,easing);
                    $("menu").addClass("actived-menu");
            }
            else{
                    $('menu').transition({x:-$("menu").width()},transitionSpeed,easing);
                    $('#voltar,#header-index').transition({x:0},transitionSpeed,easing);
                    $("menu").removeClass("actived-menu");
            }

    })

}