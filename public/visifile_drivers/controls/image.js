function(args) {
/*
is_app(true)
component_type("VB")
hash_algorithm("SHA256")
display_name("Image control")
description("This will return the image control")
base_component_id("image_control")
load_once_from_file(true)
visibility("PRIVATE")
read_only(true)
properties(
    [
        {
            id:     "image_data",
            name:   "Image",
            type:   "Image"
        }
        ,
        {
            id:     "text",
            name:   "Text",
            type:   "String"
        }
        ,
        {
            id:     "background_color",
            name:   "Background color",
            type:   "String"
        }
        ,
        {
            id:     "click_event",
            name:   "Clicked event",
            type:   "Event"
        }

    ]
)//properties
logo_url("/driver_icons/image.png")
*/

    Yazz.component({
      props: ["args", "name","refresh",  "runEvent"]
      ,
      template: `<img   v-bind:width='args.width + "px"'
                        v-bind:refresh='refresh'
                        alt='No image set'
                        v-bind:src='"" + args.image_data' />
                 `
      ,
      data: function() {
       return {
         msg: "..."
         }
     },
     methods: {
        event_callback: async function() {
        console.log("----- image_control, event_callback: function() = " + this.name)
            //eval("(function(){" + this.args.click_event + "})")()
            await this.runEvent({ display: "click",   code: this.args.click_event })
        }
     }

    })
}
