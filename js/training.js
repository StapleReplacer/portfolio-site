jQuery(function($) {
  $(function() {
      

    
    
    ////////////////////////////////////////////
    //
    //Module 1 - Activity 1 - Click lists
    //
    /////////////////////////////////////////////

    if(document.getElementById("module-1-activity-1") !== null) {

        $("input[type='checkbox']").change(
            function() {
                var thisList = $(this).closest('.click-list');
                var checkedInList = $(thisList).find("input:checked").length;
                var thisButton = $(this).closest('.click-list').find(".btn");
                
                if(!$(thisList).hasClass('answer')){
                    if(checkedInList > 0 ){
                        $(thisButton).each(function(){
                            $(this).removeClass('disabled');
                        });
                    }
                }
            }
        )

        $(".click-list .btn").click(
            function(){
                var thisList = $(this).closest('.click-list');
                var checkBoxes = $(thisList).find("input[type='checkbox']");

                if(!$(this).hasClass('disabled')){
                    $(thisList).toggleClass('answer');
                    $(this).addClass('disabled');

                    $(checkBoxes).each(function(){
                        if($(this).closest('li').hasClass('correct')){
                            $(this).prop('checked', true);
                        }else{
                            $(this).prop('checked', false);
                        };
                        $(this).prop('disabled', true);
                    });
                    var revealAnswer = $(thisList).find('.reveal-answer');
                    $(revealAnswer).css('opacity', '0').removeClass('hide').fadeTo('slow', 1);
                }
            }
        )
    };










    ////////////////////////////////////////////////////
    //Module 1 - Activity 2 - SVG
    //Uses:
    //elements with a class of .shape for the rollover regions that fade out on rollover
    //elements with a class of .anim that are related to the .shape regions that fade up on rollover
    //Associates by taking the ID on the current shape and checks for anim elements that have a corrosponding class 
    /////////////////////////////////////////////////////
    
    if(document.getElementById("module-1-activity-2") !== null) {

        //set the anim-content divs to display none so that they don't take up space in the DOM
        $(".anim-content").each(function() {
            $( this ).css('display','none').css('opacity', '0');
        });

        //remove the default functionality of clicking the link
        $("#shapes > a").click(function() {
            return false;
        }); 

        //just in case - controll how the cursor should function on rolling over
        $(".shape").hover(
        function() {
            if(!$( this ).hasClass('current')) {
            $( this ).css( 'cursor', 'pointer' );
            }
        },
        function() {
            $( this ).css( 'cursor', 'default' );
        }
        );

        //run the meat and potatoes -- we are using focus instead of click to make the SVG keyboard accessible
        $(".shape-wrapper").focus( 
        function() {

            //get the shape within this focussed link in the SVG
            var shapes = $( this ).children(".shape");
            var targetShape = shapes[0];

            //remove the marquee around the focussed links
            $("#shapes > a").css('outline', '0');

            //Scroll to the top of the svg
            $('html, body').animate({
                scrollTop: $("#svg").offset().top - 40
            }, 400);

            //If we are not clicking on the current open link
            if(!$(targetShape).hasClass('current')) {
            
                //reset all the shapes to on and not current
                $(".shape").each(function() {
                    if ($( this ).css('opacity') < 1)  {
                        $( this ).fadeTo('slow', 1);
                        $( this ).removeClass('current');
                    }
                });

                //reset all anim elements to off
                $(".anim").each(function() {
                    if ($( this ).css('opacity') > 0)  {
                        $( this ).fadeTo('slow', 0);
                    }
                });

                //reset all anim-content elements to off
                $(".anim-content").each(function() {
                    if ($( this ).css('display') == 'block') {
                        $( this ).fadeTo('slow','0').css('display','none');
                    }
                })

                //hide this shape and make it current
                $(targetShape).fadeTo('slow', 0);
                $(targetShape).css( 'cursor', 'default' );
                $(targetShape).addClass('current');

                //get the id of this shape
                var caller = $(targetShape).attr('id');

                //create the association from this shape with its related anim elements and switch them on
                $("." + caller).each(function() {
                    if ($( this ).css('display') == 'none') {
                        $( this ).css('display','block')
                    }
                    if ($( this ).css('opacity') < 1)  {
                    $( this ).delay(300).fadeTo('slow', 1);
                    }
                });
            }
        }
        );
    };











    /////////////////////////////////////////////////////////////
    //
    //module 2 Acticity 2 - true/false
    //
    /////////////////////////////////////////////////////////////

    if(document.getElementById("module-2-activity-2") !== null){

        $(".answer").each(function() {
            $( this ).css('display','none').css('opacity', '0');
        });
        
        $(".true-false").click(
            function(){
                
                var thisQuestion = $(this).closest('.question-answer');

                $(thisQuestion).addClass('answered');

                $(thisQuestion).children('.answer').each(function(){
                    $(this).css('display','inline-block').fadeTo('slow', 1);
                });

                $(thisQuestion).find('.true-false').each(function(){
                    $(this).prop('disabled', true); 
                });
            });
    };











    /////////////////////////////////////////////////////////////
    //
    //module 2 Activity 3 - slide show
    //
    /////////////////////////////////////////////////////////////
    if(document.getElementById("module-2-activity-3") !== null){

        //As we are setting the position of the slides they are removed from the document flow, 
        //So we need to find their height so as to position the pagination below the slide.
        var thisSlideShowHeight = $('#slide-show li').height();

        //Give the ul a padding equal to its height to force pagination below.
        $('#slide-show').css('padding-bottom', thisSlideShowHeight);

        //create an array of each slide in the UL
        var thisSlideShowItems = $('#slide-show li');

        //We are setting the position of the child slides to overlay each other so the parent ul needs a position of relative
        $('#slide-show').css('position','relative');
        
        //hide and position all the slides in the slideshow
        thisSlideShowItems.each(function(){
            $(this).css('display','none')
            $(this).css('opacity', '0');
            $(this).css('position','absolute');
            $(this).css('top','0').css('left','0');
        });

        //take the first slide and show it again by default
        $(thisSlideShowItems[0]).fadeTo('slow', 1);

        //if there is more than one slide
        if(thisSlideShowItems.length > 0) {

            //create the pagination
            $('#slide-show').after( "<div id='slide-controls' class='text-center'><ul id='slide-pagination' class='pagination'></ul></div>" );

            //set a current variable
            var current = 0;

            //We need to create a pagination number for each slide in the ul
            //iterate through each slide
            thisSlideShowItems.each(function() {

                //add 1 to the current variable to account for the array numbering starting at 0
                var currentUpOne = current + 1;
                
                //for the first 5 slides
                if (currentUpOne <= 5){ 
                    //create a visible number within the pagination with a related ID
                    $('#slide-pagination').append("<li class='pagination-number'><a id='" + current + "' href='#'>" + currentUpOne +"</a></li>");
                //for any subsequent slides
                }else {
                    //create a hidden number within the pagination with a related ID
                    $('#slide-pagination').append("<li class='pagination-number hidden'><a id='" + current + "' href='#'>" + currentUpOne +"</a></li>");
                };

                //increment the current variable before looping
                current++;
            });

            //make the first number in the pagination active
            $('#slide-pagination li:first-child').attr('id', 'active');
            $('#slide-pagination li:first-child').addClass('active');

            //place a next link after the pagination links
            $('#slide-pagination').append("<li><a id='next-pagination' href='#'>next &#62;</a></li>");

            ////////////////////
            //Functions required for pagination interaction and slides
            ////////////////////

            function animate_pagination_next(thisSlideShowItems, newCurrentLinkNumber, currentLinkNumber) {

                var range = newCurrentLinkNumber + 6;
                currentLinkNumber = currentLinkNumber + 1;
                console.log(newCurrentLinkNumber);
                console.log(currentLinkNumber);

                if (newCurrentLinkNumber % 5 === 0){
                    var i = 1;
                    $('#slide-pagination .pagination-number').each(function(){

                        if (i < newCurrentLinkNumber){
                            $(this).addClass('hidden');
                        };

                        if (i >= newCurrentLinkNumber && i < range ) {
                            $(this).removeClass('hidden');
                        };
                        i++;
                    });
                };
            };

            function animate_pagination_previous(thisSlideShowItems, newCurrentLinkNumber, currentLinkNumber) {
                
                var range = newCurrentLinkNumber - 6;
                currentLinkNumber = currentLinkNumber + 1;
                console.log(newCurrentLinkNumber);
                console.log(currentLinkNumber);
                
                if(newCurrentLinkNumber == currentLinkNumber - 1 && currentLinkNumber % 5 === 0) {
                    var i = 1;
                    $('#slide-pagination .pagination-number').each(function(){

                        if (i < range || i > currentLinkNumber){
                            $(this).addClass('hidden');
                        };

                        if (i <= currentLinkNumber && i > range ) {
                            $(this).removeClass('hidden');
                        };
                        i++;
                    });
                }else if(newCurrentLinkNumber % 5 === 0){
                    var i = 1;
                    $('#slide-pagination .pagination-number').each(function(){

                        if (i < range || i > newCurrentLinkNumber){
                            $(this).addClass('hidden');
                        };

                        if (i <= newCurrentLinkNumber && i > range ) {
                            $(this).removeClass('hidden');
                        };
                        i++;
                    });
                };
            };
            
            function remove_active() {
                //remove the active class from all pagination
                $('#slide-pagination li').each(function() {
                    $(this).removeClass('active');
                    $(this).removeAttr('id');
                });
            };

            function add_active(obj) {
                //make the selected link active
                $(obj).closest('li').addClass('active');
                $(obj).closest('li').attr('id','active');
            };

            function associate_slide(obj) {
                //Associate the target slide to the ID of the link that has been clicked (and make it a true number variable)
                return parseInt($(obj).attr('id'));
            };

            function add_remove_previous(currentLinkNumber) {
                //if the link clicked is not the first one in the list then place a previous link before the pagination links
                if(document.getElementById("previous-pagination") == null && currentLinkNumber > 1 ){
                    $('#slide-pagination').prepend("<li><a id='previous-pagination' href='#'>&#60; previous</a></li>");

                }else if(document.getElementById("previous-pagination") && currentLinkNumber == 1 ){
                    $('#previous-pagination').closest('li').remove();
                };
            };

            function add_remove_next(currentLinkNumber){
                //if the link clicked is the last one in the list then remove the next link after the pagination links
                if(document.getElementById("next-pagination") == null && currentLinkNumber < thisSlideShowItems.length){
                    $('#slide-pagination').append("<li><a id='next-pagination' href='#'>next &#62;</a></li>");
                    
                }else if(document.getElementById("next-pagination") && currentLinkNumber == thisSlideShowItems.length){
                    $('#next-pagination').closest('li').remove();
                };
            };

            function fade_out_all(thisSlideShowItems){
                //Fade out all slides in the slideshow
                thisSlideShowItems.each(function() {
                    $(this).fadeTo('slow', 0 );
                });
            };

            function show_slide(thisSlideShowItems, targetSlide){
                //Get the height of the slide we are about to fade up
                var thisSlideShowHeight = $(thisSlideShowItems[targetSlide]).height();
                
                //Reset the padding to push the pagination below the slide we are fading up
                $('#slide-show').css('padding-bottom', thisSlideShowHeight);

                //Fade up the selected slide
                $(thisSlideShowItems[targetSlide]).fadeTo('slow', 1);
            }
            
            

            
            //When selecting a link in the pagination
            $('#slide-pagination').on('click', 'li a', function() {

                var CallingId = $(this).attr('id');
                
                if (CallingId == 'previous-pagination'){
                    //find the current active link
                    var currentLinkNumber = parseInt($('#slide-pagination #active a').attr('id'));

                    //decrement by 1
                    var targetLinkNumber = currentLinkNumber -1;
                    var targetObj = $('#slide-pagination li #' + targetLinkNumber + '').closest('li');
                    var targetLink = $('#slide-pagination li #' + targetLinkNumber + '');

                    remove_active();
                    add_active(targetObj);
                    var targetSlide = associate_slide(targetLink);                    
                    var newCurrentLinkNumber = targetSlide + 1;
                    add_remove_previous(newCurrentLinkNumber);
                    add_remove_next(newCurrentLinkNumber);
                    fade_out_all(thisSlideShowItems);
                    show_slide(thisSlideShowItems, targetSlide);
                    animate_pagination_previous(thisSlideShowItems, newCurrentLinkNumber, currentLinkNumber);
                    $(targetLink).focus();
                    
                    //turn off default link functionality
                    return false;

                }else if (CallingId == 'next-pagination') {
                    //find the current active link
                    var currentLinkNumber = parseInt($('#slide-pagination #active a').attr('id'));
                    
                    //increment by 1
                    var targetLinkNumber = currentLinkNumber +1;
                    var targetObj = $('#slide-pagination li #' + targetLinkNumber + '').closest('li');
                    var targetLink = $('#slide-pagination li #' + targetLinkNumber + '');

                    remove_active();
                    add_active(targetObj);
                    var targetSlide = associate_slide(targetLink);                    
                    var newCurrentLinkNumber = targetSlide + 1;
                    add_remove_previous(newCurrentLinkNumber);
                    add_remove_next(newCurrentLinkNumber);
                    fade_out_all(thisSlideShowItems);
                    show_slide(thisSlideShowItems, targetSlide);
                    animate_pagination_next(thisSlideShowItems, newCurrentLinkNumber, currentLinkNumber);
                    $(targetLink).focus();

                    //turn off default link functionality
                    return false;
                    
                }else {
                    //find the current active link
                    var currentLinkNumber = parseInt($('#slide-pagination #active a').attr('id'));
                                       
                    remove_active();
                    add_active(this);
                    var targetSlide = associate_slide(this);                    
                    var newCurrentLinkNumber = targetSlide + 1;
                    add_remove_previous(newCurrentLinkNumber);
                    add_remove_next(newCurrentLinkNumber);
                    fade_out_all(thisSlideShowItems);
                    show_slide(thisSlideShowItems, targetSlide);
                    animate_pagination_next(thisSlideShowItems, newCurrentLinkNumber, currentLinkNumber);
                    return false;
                };
            });

            //When clicking a link in the pagination remove default action
            $('#slide-pagination').on('click', 'li a', function() { 
                return false;
            });
        };
    };
  });  
});