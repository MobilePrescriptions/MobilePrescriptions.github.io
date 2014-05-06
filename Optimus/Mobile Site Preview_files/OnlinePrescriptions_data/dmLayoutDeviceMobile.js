/**
 * THIS FILE HOLDS ALL THE LAYOUTS COMPONENTS FOR MOBILE DEVICES
 */

;(function( $ ) {
	
	// holds each menu item height
	var _menuItemHeight = 0;
	
	//cached Selected Menu Element
	var cachedSelectedMenuElement = undefined;
	
	/***********************************************************
	 * GENERAL NAVIGATION
	 ************************************************************/
	function generalNavigation() {
		this.element = null;
		this.isMatrix = false;
		this.isInsideList = false;
		this.afterAjaxCommand = null;
	}
	
	// implement the common component interface
	generalNavigation.prototype = jQuery.extend(true, {}, layoutDeviceComponentInterface);
	
	/**
	 * initialize the object on ready
	 */
	generalNavigation.prototype.onReadyPreviewMode = function() {
		this.elementSelector = ".dmNav:not(.hiddenNavPlaceHolder *)";
		this.element = $(this.elementSelector);
		this.isMatrix = ($(".hasDmMatrixNav").length > 0);
		this.isInsideList = ($(".hasDmInsideListNav").length > 0);
		
		this.afterAjaxCommand = function() {
			this.element = $(this.elementSelector);
			initSlideDownHandler();
			initBackBtn();
			$.layoutDevice.components.dmNav.cssCalculations();		
		};
		initBackBtn();
		initSlideDownHandler();
		
		function initSlideDownHandler() {
			if($.DM.isCurrentHomePage()) {
				$("#innerBar").addClass("dmDisplay_None");
			}
			else {
				$("#innerBar").removeClass("dmDisplay_None display_None");
				
				// even if user hides it, always show the inner bar on inner pages when list navigation is used
				if ($.layoutDevice.components.dmNav.isInsideList)
					$("#innerBar").show();
			}
		}
	    
	    Parameters.AfterMoreLessCommand = function() {
	    	$.layoutDevice.components.dmNav.cssCalculations();
	    };
	};
	
	/**
	 * initialize the object on ready (NEE mode)
	 */
	generalNavigation.prototype.onReadyEditorMode = function() {
		this.onReadyPreviewMode();	
	};
	
	/**
	 * initialize the object on load
	 */
	generalNavigation.prototype.onLoadPreviewMode = function() {
	    this.cssCalculations();
	};
	
	/**
	 * initialize the object on load (NEE mode)
	 */
	generalNavigation.prototype.onLoadEditorMode = function() {
	    this.onLoadPreviewMode();
	};
	
	generalNavigation.prototype.cssCalculations = function() {
	    if(this.isMatrix) {
	      
	      //clean CSS from menu items
	      this.element.children().css({'transform':'','-o-transform':'' ,'-moz-transform':'','-ms-transform':'','top':''});
	      this.element.children("li").removeClass('dmMatrixOdd dmMatrixEven dmTopLeft dmTopRight dmBottomRight dmBottomLeft clearShadow');
	      
	      //count visible elements
	      var elemCount = this.element.children('li:visible').length;
	      
	      //clean classNames
	      this.element.children('li').removeClass('leftCol centerCol rightCol');
	      
	      switch(parseInt($.layoutManager.getCurrentVariation())) {
	      case 1: 
	        //calculate and apply width to matrix elements
	        //this.element.children("li").width((this.element.width()-16)/3);
	        var counter = 0 ;
	        while(counter < elemCount/3){
	            this.element.children('li:visible').not('.dmHideFromNav').eq(counter*3).addClass('leftCol').nextAll('li:visible').not('.dmHideFromNav').eq(0).addClass('centerCol').nextAll('li:visible').not('.dmHideFromNav').eq(0).addClass('rightCol');
	            counter++;
	        }
	        break;
	          
	      case 2:
	        if(this.element.children('span').length <= 0) {
	           this.element.append('<span style="display:block;clear:both"></span>');   
	        }
	        
	        //calculate and apply width to matrix elements
	        //this.element.children("li").width(this.element.width()/3);
	        
	        //divide and conquer
	        this.element.children("li:visible").eq(0).addClass('dmTopLeft');
	        this.element.children("li:visible").eq(2).addClass('dmTopRight');
	        if(elemCount % 3 == 0) {
	            this.element.children("li:visible").eq(-1).addClass('dmBottomRight');
	            this.element.children("li:visible").eq(-3).addClass('dmBottomLeft');   
	        }
	        else if(elemCount % 3 == 2){
	            this.element.children("li:visible").eq(-2).addClass('dmBottomLeft');   
	        }
	        else {
	            this.element.children("li:visible").eq(-1).addClass('dmBottomLeft');
	        }
	        
	        break;
	          
	      case 3:
	        //this.element.children("li").width((this.element.width()-5)/2);
	        this.element.children("li:visible").filter(':even').addClass('dmMatrixEven');
	        this.element.children("li:visible").filter(':odd').addClass('dmMatrixOdd');
	        break;
	       
	      case 4:
	        //calculate and apply width to matrix elements
	        //this.element.children("li").width((this.element.width()-15)/2);
	        this.element.children("li:visible").filter(':even').addClass('dmMatrixEven');
	        this.element.children("li:visible").filter(':odd').addClass('dmMatrixOdd');
	        break;
	
	      case 5:
	        if(this.element.children('span').length <= 0) {
	           this.element.append('<span style="display:block;clear:both"></span>');   
	        }
	        
	        //apply width to list elements
	        //$(this.element).children("li").width((this.element.width())/2);
	        
	        //divide and conquer
	        this.element.children("li:visible").filter(':even').addClass('dmMatrixEven');
	        this.element.children("li:visible").filter(':odd').addClass('dmMatrixOdd');
	        if(elemCount % 2 == 0) {
	           this.element.children("li:visible").eq(-1).addClass('clearShadow');
	            this.element.children("li:visible").eq(-2).addClass('clearShadow');
	        }
	        else if(elemCount % 2 != 0) {
	            this.element.children("li:visible").eq(-1).addClass('clearShadow');
	            this.element.children("li:visible").eq(-2).removeClass('clearShadow');
	        }
	        break;
	      }
	    }
	};
	
	
	/***********************************************************
	 * FIX HEAD
	 ************************************************************/
	function fixHead() {
		this.element = null;
		this.afterAjaxCommand = null;
	}
	
	// implement the common component interface
	fixHead.prototype = jQuery.extend(true, {}, layoutDeviceComponentInterface);
	
	/**
	 * initialize the object on ready
	 */
	fixHead.prototype.onReadyPreviewMode = function() {
		this.element = $("#fixHead");
	//	this.element.css('width',$(window).width() - parseInt(this.element.css('padding-left'))*2  + 'px');
		if (Parameters.IsHeaderSkinny) {
			this.element.addClass('fixedHeaderLimitSize');
		} else {
			this.element.removeClass('fixedHeaderLimitSize');
		}
		// initialize the back button
		this.afterAjaxCommand = function() {initBackBtn();};
		initBackBtn();
	};
	
	/**
	 * initialize the object on ready (NEE mode)
	 */
	fixHead.prototype.onReadyEditorMode = function() {
		this.onReadyPreviewMode();
	};
	
	/**
	 * initialize the object on load
	 */
	fixHead.prototype.onLoadPreviewMode = function() {
		
	};
	
	/**
	 * initialize the object on load (NEE mode)
	 */
	fixHead.prototype.onLoadEditorMode = function() {
		
	};
	
	/***********************************************************
	 * FIX FOOT
	 ************************************************************/
	function fixFoot() {
		this.element = null;
	}
	
	// implement the common component interface
	fixFoot.prototype = jQuery.extend(true, {}, layoutDeviceComponentInterface);
	
	/**
	 * initialize the object on ready
	 */
	fixFoot.prototype.onReadyPreviewMode = function() {
		this.element = $("#fixFoot");	
		
		// prevent accidents scrolling on older androids
		this.element.unbind("touchmove").bind("touchmove", function(e) {
			e.preventDefault();
			e.stopPropagation();
		});
	};
	
	/**
	 * initialize the object on ready (NEE mode)
	 */
	fixFoot.prototype.onReadyEditorMode = function() {
		this.onReadyPreviewMode();
	};
	
	/**
	 * initialize the object on load
	 */
	fixFoot.prototype.onLoadPreviewMode = function() {
		
	};
	
	/**
	 * initialize the object on load (NEE mode)
	 */
	fixFoot.prototype.onLoadEditorMode = function() {
		
	};
	
	/***********************************************************
	 * ISCROLL BODY
	 ************************************************************/
	function iscrollBody() {
		this.element = null;
		this.iscrollObject = null;
		this.isUseIscroll = true;
		this.isBodyScrollable = false;
		this.afterAjaxCommand = null;
	}
	
	// implement the common component interface
	iscrollBody.prototype = jQuery.extend(true, {}, layoutDeviceComponentInterface);
	
	/**
	 * initialize the object
	 */
	iscrollBody.prototype.onReadyPreviewMode = function() {
		var $body;
		this.element = $("#iscrollBody");
		
//		if($.layoutManager.isNee()) {
//			this.isUseIscroll = false;
//		}
//		
//		if($.layoutManager.isMobileBrowser() && !$.layoutManager.isWebkitMobileBrowser()) {
//			this.isUseIscroll = false;
//		}
//		
//		if($.layoutManager.detectUserAgent().indexOf('iPhone')>=0)
//        {
//        	this.isUseIscroll = false;
//        }
//        
//        if(!$.layoutManager.isMobileBrowser())
//    	{
//        	this.isUseIscroll = false;
//    	}
//		if (!Parameters.IsHeaderFixed && ($.layoutDevice.components.fixHead || $.layoutDevice.components.upperTabs) && !$.layoutDevice.components.fixFoot ) {
//			this.isUseIscroll = false;
//		} 
//	
//		if($("[dmTemplateid='INSIDELIST'], [dmTemplateid='MatrixLayout']").length > 0) {
//			this.isUseIscroll = false;
//		}
		
		// don't use iscroll anymore
		this.isUseIscroll = false;
		
		this.isBodyScrollable = !this.isUseIscroll;
		
		if (((Parameters.IsHeaderFixed && ($.layoutDevice.components.fixHead || $.layoutDevice.components.upperTabs)) || $.layoutDevice.components.fixFoot ) && (($.layoutManager.isMobileBrowser() && $.layoutManager.isWebkitMobileBrowser()) || (!$.layoutManager.isMobileBrowser()))) {
			this.isBodyScrollable = false;
		} 
		$body = $("body");
		if(this.isBodyScrollable) {
           	     $body.addClass("dmScollableBody").removeClass("dmNoScollableBody");
		}
		else {
	            $body.css("overflow", "hidden");
	            $body.removeClass("dmScollableBody").addClass("dmNoScollableBody");
		}

		
		this.afterAjaxCommand = function() {
        	   var backToTop = $("#dmBackToTop");
        	   if(this.isUseIscroll == true && this.iscrollObject.getScrollY() < 0) {
        		backToTop.css("opacity", "0");
                	backToTop.css("visibility", "hidden");
        		this.iscrollObject.scrollToElement($("#site_content").get(0), 300);
        	   }
        };
        
        if(this.isUseIscroll) {
    	    this.initIscroll();
        }
	};
	
	/**
	 * initialize the object (NEE mode)
	 */
	iscrollBody.prototype.onReadyEditorMode = function() {
		this.onReadyPreviewMode();
	};
	
	/**
	 * Initialize the iscroll object
	 */
	iscrollBody.prototype.initIscroll = function() {
		
		if(this.iscrollObject == null) {
			// initialize the iscroll object
			this.iscrollObject = new iScroll('iscrollBody',{bounce: false,
				onBeforeScrollStart : function (e) {
				    var nodeType = e.explicitOriginalTarget ? e.explicitOriginalTarget.nodeName.toLowerCase():(e.target ? e.target.nodeName.toLowerCase():'');
		
				    if(nodeType !='select' && nodeType !='option' && nodeType !='input' && nodeType!='textarea') {
				         e.preventDefault();
				    }
				}	
			});
		}
		else {
			this.iscrollObject.refresh();
		}
	};
	
	/**
	 * initialize the object on load
	 */
	iscrollBody.prototype.onLoadPreviewMode = function() {
		if(this.isUseIscroll) {
			this.initIscroll();
		}
	};
	
	/**
	 * initialize the object on load (NEE mode)
	 */
	iscrollBody.prototype.onLoadEditorMode = function() {
	
	};
	
	/**
	 * refresh the iscroll object
	 */
	iscrollBody.prototype.refresh = function() {
		if(!$.layoutManager.isNee() && this.isUseIscroll) {
			this.initIscroll();
		}
	};
	
	/***********************************************************
	*                  SLIDE UP NAV                         
	************************************************************/
	function slideUpNav() {
		this.element = null;
		this.iscrollObject = null;
		
		var self = this;
		/**
		 * actually slide up the nav
		 */
		this.slideUpNavHandlerImpl = function (withAnimation, forceClose, forceOpen) {
			
			if(withAnimation == null) {
				withAnimation = true;
			}
			if(forceClose == null) {
				forceClose = false;
			}
			if(forceOpen == null) {
				forceOpen = false;
			}
			
			self.element.unbind("webkitTransitionEnd").off("transitionend").off("oTransitionEnd").off("msTransitionEnd");
			$(document).off("touchmove.fix");
			
			if($.layoutManager.detectUserAgent().indexOf('iPhone') < 0) {
				self.element.css("display", "block");
				
			}
			else {
				self.element.css("bottom", (0-this.element.outerHeight(true) - $(document).scrollTop())+"px");
			}
				
			_menuItemHeight = $('.dmNavigation .dmSub').outerHeight(true);
			
			if(!withAnimation) {
				self.element.css({"-webkit-transition-duration":"0s",
					"-moz-transition-duration":"0s",
					"-o-transition-duration":"0s",
					"-ms-transition-duration":"0s"});
			}
			else {
				self.element.css({"-webkit-transition-duration":".5s",
					"-moz-transition-duration":".5s",
					"-o-transition-duration":".5s",
					"-ms-transition-duration":".5s"});
			}
			
			if($.layoutManager.isIOS7()) {
				// only iphone SAFARI with IOS7
				if($.layoutManager.detectUserAgent() == "iPhone") {
					
					if($.layoutManager.isPortrait()) {
						self.element.css("margin-bottom", "0px");
						var contentAreaHeight = $(window).height() - $("#fixHead").outerHeight();
						var fixFootOffset = $(".fixedFooterContainer").offset();
						self.element.offset({top : fixFootOffset.top - contentAreaHeight, left : 0});
					}
					else {
						self.element.css("margin-bottom", "113px");
					}
				}
				// only iphone CHROME with IOS7
				else if($.layoutManager.detectUserAgent() == "iPhone-chrome") {
					if($.layoutManager.isPortrait()) {
						$('#slideUpNav').css("margin-bottom", "");
					}
					else {
						$('#slideUpNav').css("margin-bottom", "49px");
					}
				}
			}
			
			self.element.stop();
			
			var itemsStackHeight = this.element.children('ul.dmNavigation').outerHeight(true);
			var menuTotalHeight = this.element.outerHeight(true);
			
			self.element.hide();
			
			//open the menu
			if((self.element.length > 0 && (self.element.hasClass("dmSlideNavClose")) && !forceClose) || (forceOpen)) {	
				
				self.element.removeClass("dmSlideNavClose");
				self.element.addClass("dmSlideNavOpen");
				
				if($.layoutManager._is_nee) {
					$(".inlineEditorNewSelectionBarsLocked, .inlineEditorNewSelectionBarsSelected, .inlineEditorNewContext").addClass("inlineEditorBarsLowZindex");
				}
				
				self.element.show();
				
				$.layoutManager.hideAllSubItems();
				
			    //slide up (open menu)
				$.layoutManager.setSelected($('.slideUpTrigger'),true).siblings('li').removeClass('dmNavItemSelected');
				
				function _uponTransitionEndSlideUpOpen(e) {
					$(document).off("touchmove.fix").on("touchmove.fix", function(e) {
						if($(e.target).is(".dmSlideNavOpen") || !$(e.target).is("#slideUpNav, #slideUpNav *")) {
							e.preventDefault();
							return false;
						}
					});
					self.element.unbind("webkitTransitionEnd").unbind("transitionend").unbind("oTransitionEnd").unbind("msTransitionEnd");
				}
				
				self.element.off("webkitTransitionEnd").on("webkitTransitionEnd", _uponTransitionEndSlideUpOpen);
				self.element.off("transitionend").on("transitionend", _uponTransitionEndSlideUpOpen);
				self.element.off("oTransitionEnd").on("oTransitionEnd", _uponTransitionEndSlideUpOpen);
				self.element.off("msTransitionEnd").on("msTransitionEnd", _uponTransitionEndSlideUpOpen);
				
				self.element.css({"-webkit-transition-duration":".5s",
						"-moz-transition-duration":".5s",
						"-o-transition-duration":".5s",
						"-ms-transition-duration":".5s"});
				
			    
			    var heightToScroll = this.element.outerHeight(true);
			    
			    if($.layoutManager.detectUserAgent() == "iPhone" && !$.layoutManager.isIOS7()) {
			    	heightToScroll -= 11;
			    }
			    
			    // case we use slide navigation animation
			    if($.layoutManager._layoutParams._navigationAnimationStyle == 'slide') {
			    	self.element.css({'-webkit-transform' : 'translate3d(0px, '+(0 - heightToScroll)+'px, 0px)',
						 '-o-transform' : 'translate(0px, '+(0 - heightToScroll)+'px)',
						 '-moz-transform' : 'translate(0px, '+(0 - heightToScroll)+'px)',
						 '-ms-transform' : 'translate(0px, '+(0 - heightToScroll)+'px)'});
			    }
				// case we use scale navigation animation
				else if($.layoutManager._layoutParams._navigationAnimationStyle == 'scale') {
					self.element.css({'-webkit-transform' : 'scale3d(1, 1, 1) translate3d(0px, '+(0 - heightToScroll)+'px, 0px)',
						'-o-transform' : 'scale(1, 1) translate(0px, '+(0 - heightToScroll)+'px)',
						'-moz-transform' : 'scale(1, 1) translate(0px, '+(0 - heightToScroll)+'px)',
						'-ms-transform' : 'scale(1,1) translate(0px, '+(0 - heightToScroll)+'px)',
						'-webkit-transform-origin' : '0% 100%',
						 '-moz-transform-origin' : '0% 100%',
						 '-o-transform-origin' : '0% 100%',
						 '-ms-transform-origin' : '0% 100%'
					});
				}
				
			    $.layoutManager.openAppropriateSub();
				
				
			}
			// close the menu
			else if ((self.element.hasClass("dmSlideNavOpen") && !forceOpen) || (forceClose)) {
			
				if (itemsStackHeight < menuTotalHeight) {
					self.element.children('ul.dmNavigation').css('bottom','0px');
				}
				
				self.element.addClass("dmSlideNavClose");
				self.element.removeClass("dmSlideNavOpen");
				
				if($.layoutManager._is_nee) {
					$(".inlineEditorNewSelectionBarsLocked, .inlineEditorNewSelectionBarsSelected, .inlineEditorNewContext").removeClass("inlineEditorBarsLowZindex");
				}
				
				function _uponTransitionEndSlideUp() {
					self.element.unbind("webkitTransitionEnd").unbind("transitionend").unbind("oTransitionEnd").unbind("msTransitionEnd");
					self.element.css("display", "none");
				}
				
				if(withAnimation) {
					self.element.unbind("webkitTransitionEnd").bind("webkitTransitionEnd", _uponTransitionEndSlideUp);
					self.element.unbind("transitionend").bind("transitionend", _uponTransitionEndSlideUp);
					self.element.unbind("oTransitionEnd").bind("oTransitionEnd", _uponTransitionEndSlideUp);
					self.element.unbind("msTransitionEnd").bind("msTransitionEnd", _uponTransitionEndSlideUp);
				}
				
			    //slide down (close menu)
			    if ($('.slideUpTrigger').css("display") !== "none"){
			    	$.layoutManager.setSelected($('.slideUpTrigger'),false);	
			    }
				
				
			    // case we use slide navigation animation
			    if($.layoutManager._layoutParams._navigationAnimationStyle == 'slide') {
			    	self.element.css({'-webkit-transform' : 'translate3d(0px, 0px, 0px)',
					 	 '-o-transform' : 'translate(0px, 0px)',
						 '-moz-transform' : 'translate(0px, 0px)',
						 '-ms-transform' : 'translate(0px, 0px)'});
			    }
				// case we use scale navigation animation
				else if($.layoutManager._layoutParams._navigationAnimationStyle == 'scale') {
					self.element.css({'-webkit-transform' : 'scale3d(1, 0, 1) translate3d(0px, 0px, 0px)',
						'-o-transform' : 'scale(1, 0) translate(0px, 0px)',
						'-moz-transform' : 'scale(1, 0) translate(0px, 0px)',
						'-ms-transform' : 'scale(1, 0) translate(0px, 0px)',
						'-webkit-transform-origin' : '0% 100%',
						 '-moz-transform-origin' : '0% 100%',
						 '-o-transform-origin' : '0% 100%',
						 '-ms-transform-origin' : '0% 100%'
					});
				}
			    
			    if(!withAnimation) {
//			    	if($.layoutManager.isIOS7()) {
//			    		_uponTransitionEndSlideUp();
//			    	}
				}
				
			    $.layoutManager.hideAllSubItems();
				
				if(forceClose) {
					$.layoutManager.markCurrentSelectedNavigation();
				}
				else {
					$.layoutManager.markCurrentSelectedNavigation(true);
				}
				
				if($.layoutManager.isMobileBrowser() && !$.layoutManager.isWebkitMobileBrowser()) {
					self.element.hide();
				}
								
			}
		};
	}
	
	// implement the common component interface
	slideUpNav.prototype = jQuery.extend(true, {}, layoutDeviceComponentInterface);
	
	/**
	 * initialize the object on ready
	 */
	slideUpNav.prototype.onReadyPreviewMode = function() {
		this.element = $("#slideUpNav");
		$('#iscrollBody').addClass('noTransition');
		this.element.addClass("dmSlideNavClose");
		if($('#innerBar:visible').length === 0 && $.layoutManager.getCurrentLayout() !== 10 && $.layoutManager.getCurrentLayout() !== 1){
	    	this.element.find('.dmNavWrapper').removeClass('dmNavWrapper');
	    }
	};
	
	/**
	 * initialize the object on ready (NEE mode)
	 */
	slideUpNav.prototype.onReadyEditorMode = function() {
		this.onReadyPreviewMode();
	};
	
	/**
	 * initialize the iscroll object
	 */
	slideUpNav.prototype.initIscroll = function() {
		// destroy iscroll if exists
		if(this.iscrollObject != null) {
			this.iscrollObject.refresh();
		}
		else {
			// initialize the iscroll object
			this.iscrollObject = new iScroll('slideUpNav',{bounce: false});
		}
	};
	
	/**
	 * load method which runs both on nee mode and preview mode
	 */
	slideUpNav.prototype.initLoadGlobal = function() {
		var _self = this;
		// initialize events
		if($.layoutManager._is_touch_device) {
			$('.slideUpTrigger').unbind('touchstart.t').bind('touchstart.t'	,function(e){
		 		_self.slideUpNavHandlerImpl();
		 		e.preventDefault();
		 		e.stopPropagation();
		 	});
		}
		else {
			$('.slideUpTrigger').unbind('click.c').bind('click.c',function(e){
		 		_self.slideUpNavHandlerImpl();
		 		e.preventDefault();
		 		e.stopPropagation();
		 	});
		}
	};
	
	/**
	 * initialize the object on load
	 */
	slideUpNav.prototype.onLoadPreviewMode = function() {
		// initialize the iscroll object
		this.initIscroll();
		this.initLoadGlobal();
	};
	
	/**
	 * initialize the object on load (NEE mode)
	 */
	slideUpNav.prototype.onLoadEditorMode = function() {
	//		this.element.css("bottom", components.fixFoot.element.height()-this.element.height() + "px");
		this.initIscroll();
		this.initLoadGlobal();
	};
	
	/**
	 * refresh the iscroll object
	 */
	slideUpNav.prototype.refresh = function() {
		this.initIscroll();
	};
	
	
	
	/***********************************************************
	                UPPER TABS 
	 ************************************************************/
	function upperTabs() {
		this.element = null;
	}
	
	// implement the common component interface
	upperTabs.prototype = jQuery.extend(true, {}, layoutDeviceComponentInterface);
	
	/**
	 * initialize the object on ready
	 */
	upperTabs.prototype.onReadyPreviewMode = function() {
		this.element = $("#upperTabs");
		this.element.children("li:visible").eq(-1).addClass('dmLastVisible');
	//	switch(parseInt($.layoutManager.getCurrentVariation())) {
	//	   case 3:
	//	       this.element.children("li:visible").eq(-1).addClass('dmLastVisible');
	//	       break;
	//	   default:
	//	       break;   
	//	}
	};
	
	/**
	 * initialize the object on ready (NEE mode)
	 */
	upperTabs.prototype.onReadyEditorMode = function() {
		this.onReadyPreviewMode();
	};
	
	/**
	 * initialize the object on load
	 */
	upperTabs.prototype.initLoadGlobal = function() {
	};
	
	/**
	 * initialize the object on load (NEE mode)
	 */
	upperTabs.prototype.onLoadEditorMode = function() {
		this.initLoadGlobal();
	};
	
	/**
	 * initialize the object on load
	 */
	upperTabs.prototype.onLoadPreviewMode = function() {
		this.initLoadGlobal();
	};
	
	
	/*********************************************
	 *         END OF MOBILE COMPONENTS
	 *********************************************/
	
	/*********************************************
	 *     MOBILE COMPONENTS PRIVATE METHODS
	 *********************************************/
	
	/**
	 * calculate the actual content area height (substracting the fixed parts)
	 */
	function initDimentionsGlobal() {
		var ret = {};
		var heightCalc = $(window).height();
		if($.layoutDevice.components.iscrollBody) {
			heightCalc -= $.layoutDevice.getTopFixedElementsOffset();
			heightCalc -= $.layoutDevice.getBottomFixedElementsOffset();
		}
		
		ret.fixedParts = heightCalc;
		
		heightCalc -= $("#hcontainer").outerHeight(true);
		heightCalc -= $("#ad").outerHeight(true);
		ret.innerParts = heightCalc;
		return ret;
	}
	
	/**
	 * initialize some mobile components dimensions
	 */
	function initDimentionsNee  () {
        var calc = initDimentionsGlobal(),
            heightCalc = calc.fixedParts,
            $dmBody = $(".dmBody"),
		    innerPartsHeightCalc = calc.innerParts;

        var footerHeight = $('.dmFooterContainer').height(),
            headerHeight = $('.dmHeader').height();

        innerPartsHeightCalc -= (footerHeight + headerHeight);

		if(!$.DM.isBodyScrollable()) {
			$.layoutDevice.components.iscrollBody.element.height(heightCalc);
			$dmBody.css("min-height", innerPartsHeightCalc + "px");
		}
		else {
			$dmBody.css("min-height", innerPartsHeightCalc + "px");
		}
		
		if($.layoutDevice.components.slideDownNav) {
			if(!$.layoutDevice.components.iscrollBody.isBodyScrollable) {
				$.layoutDevice.components.slideDownNav.element.show();
				$.layoutDevice.components.slideDownNav.element.height(heightCalc);
				$.layoutDevice.components.slideDownNav.element.hide();
			}
		}
		if($.layoutDevice.components.slideUpNav) {
			$.layoutDevice.components.slideUpNav.element.height(heightCalc);
		}
	}
	
	
	/**
	 * initialize elements dimensions to support iscroll
	 */
	function initDimentions  () {
		var calc = initDimentionsGlobal(),
		heightCalc = calc.fixedParts,
		specialCaseHeight = null,
		$dmBody = $(".dmBody"),
		innerPartsHeightCalc = calc.innerParts;
		
		if($.layoutManager.detectUserAgent() == 'iPhone') {
			// case it's an iphone BUT NOT IN WEB APP MODE (HOME SCREEN APP)
			if((!(("standalone" in window.navigator) && window.navigator.standalone))) {
				heightCalc += 61;
			}
			
			if($.layoutManager.isIOS7()) {
				heightCalc -= 11;
				specialCaseHeight = heightCalc - 49; // slidedown nav goes below the bottom toolbar, so we need to shorten it 
			}
			
			if($.layoutManager.isIOS7() && !$.layoutManager.isPortrait() && $.layoutDevice.components.fixHead && $.layoutDevice.components.fixFoot) {
				heightCalc -= ($.layoutDevice.components.fixHead.element.outerHeight() + 13);
			}
			
//			hideAdressBar();
		}
		
		
		
		if(!$.DM.isBodyScrollable()) {
			$.layoutDevice.components.iscrollBody.element.height(heightCalc);
            $dmBody.css("min-height", innerPartsHeightCalc + "px");
		}
		else {
            $dmBody.css("min-height", innerPartsHeightCalc + "px");
		}
		
		if(!$.DM.isBodyScrollable()) {
			$.layoutDevice.components.iscrollBody.element.height(heightCalc);
		}
		
		if($.layoutDevice.components.slideDownNav) {
			if(!$.layoutDevice.components.iscrollBody.isBodyScrollable) {
				$.layoutDevice.components.slideDownNav.element.height(specialCaseHeight ? specialCaseHeight : heightCalc);
			}
	    }
		if($.layoutDevice.components.slideUpNav) {
			$.layoutDevice.components.slideUpNav.element.height(heightCalc);
		}
	}
	
	/**
	 * initialize back button
	 */
	function initBackBtn() {
		if($.DM.needToShowBackToHome()) {
			$('#dmBackBtn').css({'opacity':'0','display':'block'});
				$('#dmBackBtn').css('opacity','1');
		}
		else {
			$('#dmBackBtn').css({'opacity':'0','display':'none'});
		}
		$("#dmBackBtn").unbind('click.back').bind('click.back',function() {
			if(Parameters.AllowAjax) {
				// close all navigations menu (in case any is opened)
				$.layoutManager.closeAllOpenedNavs();
				// display the previous page
				$.DM.showPrevPageFromCache();
			}
			else {
				if ($.layoutManager.isNee()){
					var backToURL= parent.jQuery.dmfw.getFromPreviewHistory();
					if (backToURL) {
						parent.jQuery.dmfw.previewNavigateTo({url : backToURL});
					} else {
						parent.jQuery.dmfw.previewNavigateTo({page : {alias:'home'}});
					}
				} else {
					if(parent.jQuery.dmfw != null) {
						var backToURL= parent.jQuery.dmfw.getFromPreviewHistory();
						if (backToURL) {
							self.location.href = backToURL;
						} else {
							self.location.href = $.DM.getHomeLink();
						}
					}
					else {
						self.history.back();
					}
				}
			}
		});
	}
	
	/**
	 * fix navigation behavior
	 */
	function behaviourFix () {
		/**
		 * this line is critical !
		 * took me a lot of time figuring this one out, 
		 * without it you get unwanted strange behaviour when dragging the fixed header/footer.
		 */
		$('#dm,.dm_wrapper,#dmStyle_outerContainer, .dmInner, .dmLayoytWrapper').bind('touchmove', function(e){
			e.preventDefault();
		});
	}
	
	/**
	 * toggle fixed - not fixed header
	 */
	function disableFixedHeader() {
		if ($.layoutDevice.components.fixHead && !$.layoutDevice.components.fixFoot)  {
			$('body').css('overflow','auto');
			$('body').addClass("dmBodyNoIscroll");
			$('body').removeClass("dmBodyUseIscroll");
			$("body").addClass("dmScollableBody");
			$("body").removeClass("dmNoScollableBody");
			$('#iscrollBody').css('height','');
			if($.layoutDevice.components.iscrollBody) {
				$.layoutDevice.components.iscrollBody.isUseIscroll = false;
				$.layoutDevice.components.iscrollBody.isBodyScrollable = true;
			}
		}
	}
	
	function lastListItemStyle() {
	    $('#slideDownNav ul.dmNavigation').children('li:visible').eq(-1).addClass('lastListItem');
	}
	
	/**
	 * initialize on ready - always runs
	 */
	function initOnReadyGlobal() {
		var $body = $("body");
		
		$body.addClass("dmLayoutBody");
		
		 if(Parameters.IsHeaderFixed) {
			$body.addClass("iOSFixed");
			if($.layoutManager.isIOS7()) {
				$body.addClass("iOS7Fixed");
			}
			$(".dmBodyNoIscroll.iOSFixed #iscrollBody").css("margin-top", $(".fixedPart").css("height"));
			setTimeout(function(){$(".dmBodyNoIscroll.iOSFixed #iscrollBody").css("margin-top", $(".fixedPart").css("height"));}, 1000);
			setTimeout(function(){$(".dmBodyNoIscroll.iOSFixed #iscrollBody").css("margin-top", $(".fixedPart").css("height"));}, 2000);	
		}
		 
		_menuItemHeight = $('.dmNavigation .dmSub').outerHeight(true);
		
		$.layoutManager.initHomeLinkAnchor();
		
		$.layoutManager.markCurrentSelectedNavigation();

		Parameters.AfterAjaxCommand = function(data) {
			
//			$.layoutManager.initNavigation();
			
			$.layoutManager.initHomeLinkAnchor();
			
			if($.layoutDevice.components.slideDownNav) {
				$.layoutDevice.components.slideDownNav.onLoadPreviewMode();
			}
			if($.layoutDevice.components.slideUpNav) {
				$.layoutDevice.components.slideUpNav.onLoadPreviewMode();
			}
			// call afterAjaxCommand on each component which has one
			for (var key in $.layoutDevice.components) {
				if($.layoutDevice.components[key] != null) {
					if($.layoutDevice.components[key].afterAjaxCommand) {
						$.layoutDevice.components[key].afterAjaxCommand(data);
					}	
				}
			}
			
			$.layoutManager.markCurrentSelectedNavigation();
			
			var finished = new Array();
			
			// recalculate the iscroll budy after all the images finished loading (IMPORTANT - YARON)
			var images = $("#" + FIRST_CONTAINER_ID).find("img");
		    (function checkImages() {
		      var done = true;
		      $.each(images, function(index) {
		    	 if(finished[index] === false && this.complete) {
		    		 setTimeout("$.layoutManager.getLayoutElement().iscrollBody.onLoadPreviewMode();", 0);
		    	 }
		    	 finished[index] = this.complete;
		         done = done && this.complete;
		         return done;
		      });
		      if(done) {
		    	if($.layoutDevice.components.iscrollBody) {
		    		if($.layoutDevice.components.iscrollBody.isUseIscroll) {
		    			finished = null;
		    			setTimeout("$.layoutManager.getLayoutElement().iscrollBody.onLoadPreviewMode();", 0);
		    		}
		  		}
		      } else {
		        setTimeout(checkImages, 100);
		      }
		    })();
		};
		lastListItemStyle();
		if (!Parameters.IsHeaderFixed) {
			disableFixedHeader();
		}
	}
	
	/**
	 * initialize stuff on DOM ready when NOT running under NEE
	 */
	function initOnReady (event) {
		initOnReadyGlobal();
		
		for (var key in $.layoutDevice.components) {
			if($.layoutDevice.components[key] != null) {
				$.layoutDevice.components[key].onReadyPreviewMode();
			}
		}
	
		initDimentions();
	}
	
	/**
	 * initialize on ready when running under NEE
	 */
	function initOnReadyNee(event) {
		var dmfw = parent.jQuery.dmfw;
        initOnReadyGlobal();
		if(dmfw) {
            dmfw.hideLoadingInEmulator();
            dmfw.addToPreviewHistory(window.location.href);
        }

		for (var key in $.layoutDevice.components) {
			if($.layoutDevice.components[key] != null) {
				$.layoutDevice.components[key].onReadyEditorMode();
			}
		}
		initDimentionsNee();
	}
	
	/**
	 * hides the address bar
	 */
	function hideAdressBar () {
		//for iPhone
		setTimeout(function(){
			 window.scrollTo(0, 1);
		}, 1);
	}
	
	/**
	 * initialize on load - always runs
	 */
	function initOnLoadGlobal() {
		if($.layoutDevice.components.iscrollBody) {
			if ($.layoutDevice.components.iscrollBody.isUseIscroll) {
				behaviourFix();
			}	
		}
		
		$.layoutManager.hideAllSubItems();
		
		$.layoutManager.closeAllOpenedNavs();
		if (!Parameters.IsHeaderFixed) {
			disableFixedHeader();
		}
		$.layoutManager.finalizeMenu();
	}
	
	
	/**
	 * initialize on load when running under NEE
	 */
	function initOnLoadNee(event) {
		initDimentionsNee();
		for (var key in $.layoutDevice.components) {
			if($.layoutDevice.components[key] != null) {
				$.layoutDevice.components[key].onLoadEditorMode();
			}
		}
		initOnLoadGlobal();	
	}
	
	/**
	 * initialize stuff on DOM load when NOT running under NEE
	 */
	function initOnLoad (event) {
		initDimentions();
		for (var key in $.layoutDevice.components) {
			if($.layoutDevice.components[key] != null) {
				$.layoutDevice.components[key].onLoadPreviewMode();
			}
		}
		initOnLoadGlobal();
		setTimeout("$.layoutManager.reinitIscroll();", 1000);
	}
	
	/**
	 * THIS API INTERFACE MUST BE IMPLEMENTED ON EVERY NEW DEVICE (MOBILE,TABLET,DESKTOP)
	 */
	// implement the common api to have all the needed methods
	$.extend({layoutDevice : $.extend(true, {}, layoutDeviceInterface)});
	
	// override the methods we need to override
	$.extend($.layoutDevice , {
		/**
		 * holds the device type parameter (mobile/tablet/desktop)
		 */
		type : 'mobile',
		
		/**
		 * holds all the layout supported components
		 */
		components : {
			iscrollBody : new iscrollBody(),
			fixHead : new fixHead(),
			fixFoot : new fixFoot(),
			slideUpNav : new slideUpNav(),
			upperTabs : new upperTabs(),
			dmNav : new generalNavigation()
		},
		
		/**
		 * fires when the preview is ready
		 * @param editorMode - true if we run inside an editor
		 * @param event
		 */
		onReady : function(editorMode, event) {
			$("body").addClass("dmMobileBody");
			if(editorMode) {
				initOnReadyNee(event);
			}
			else {
				initOnReady(event);
			}
		},
		
		/**
		 * fires when the preview window is loaded
		 * @param editorMode - true if we run inside an editor
		 * @param event
		 */
		onLoad : function(editorMode, event) {
			if(editorMode) {
				initOnLoadNee(event);
			}
			else {
				initOnLoad(event);
			}
		},
		
		/**
		 * get the total height of fixed elements at the top
		 * @returns {Number}
		 */
		getTopFixedElementsOffset : function() {
			var offset = 0,
				slideRightNav = $("#slideRightNav"); 
			
			if (slideRightNav.length > 0)
				return slideRightNav.outerHeight();
			// the height should include margins and paddings
			if($.layoutDevice.components.fixHead && Parameters.IsHeaderFixed) {
				offset += $.layoutDevice.components.fixHead.element.outerHeight(true);
			}
			if($.layoutDevice.components.upperTabs && Parameters.IsHeaderFixed) {
				offset += $.layoutDevice.components.upperTabs.element.outerHeight(true);
			}
			if($.layoutDevice.components.innerBar && !($.layoutDevice.components.innerBar.element.is("#site_content *")) && $.layoutDevice.components.innerBar.element.is(":visible")) {
				offset += $.layoutDevice.components.innerBar.element.outerHeight(true);
			}
			return offset;
		},
		
		/**
		 * get the total height of fixed elements at the bottom
		 * @returns {Number}
		 */
		getBottomFixedElementsOffset : function() {
			var offset = 0;
			// the height should include margins and paddings
			if($.layoutDevice.components.fixFoot && $.layoutDevice.components.fixFoot.element != null) {
				offset += $.layoutDevice.components.fixFoot.element.outerHeight(true);
			}
			return offset;
		},
		 
		/**
		 * initialize the inner bar component
		 */
		initInnerBar : function(data) {
			if($.DM.isCurrentHomePage() || $(".dmShowInnerBar").length == 0) {
				$("#innerBar").addClass("dmDisplay_None");
				if($.layoutManager.getCurrentLayout() !== 10 && $.layoutManager.getCurrentLayout() !== 1){
					$("#slideDownNav .dmNavWrapper").removeClass("dmNavWrapper");	
				}
			}
			else {
				initBackBtn();
				$("#innerBar").removeClass("dmDisplay_None");
				$("#innerBar").removeClass("display_None");
				
				// set the title
				$.layoutManager.initInnerPageTitle(data);
			}
		}
		
	} );
	
	/**
	 * END OF COMMON DEVICES API
	 */
	
	/**
	 * DO NOT ADD CODE BELLOW HERE
	 */
	
})( jQuery );