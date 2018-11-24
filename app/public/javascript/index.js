$(document).ready(function()
{   

    $(".animal-button").click(function(event)
    {   // generic event handler for .animal button
        event.preventDefault();

        // if the client device is a mobile device (iPhone or Android) I can assume that it has a
		// small display and is not appropriate for displaying the enrichment log (which can be quite
		// lengthy).  Such a device is probably being used to sign an animal in or out of its kennel
		// and its users wants to load cagepage.html rather than log.html.
		//
		// So I need to know if the client device is a mobile device.  Or rather if the device has a
        // small display.  But what's a small display?  We'll use the Bootstrap breakpoint, 572px.

        var isMobile = false;
        if (document.body.offsetWidth < 572) isMobile = true;

        // and we also need to know which .animal-button was clicked

        var animal = $(this).attr("animal");
        document.cookie = "animal-cookie=" + animal;

        if (isMobile)
            open("/cagepage", "_self");
        else
            open("/log", "_self");
    })
})