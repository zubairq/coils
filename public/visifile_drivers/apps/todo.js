async function(args) {
/*
base_component_id("todo")
is_app(true)
display_name("Todo App")
visibility("PUBLIC")
component_type("APP")
description("This will create a demo todo app")
load_once_from_file(true)
logo_url("/driver_icons/todo.png")
read_only(true)
created_timestamp(1669781806972)
updated_timestamp(1669781806972)
*/
Yazz.component({
//Vue.component("todo", {
    template: `<div   class="containerclass"
                      style='width:100%;height:100%;padding:20px;background-color:white;--fontresizable: 5cqw;'>
    <div>
      Todo List<br>
      <div style='color:red'>{{info_message}}</div>
      <input id=add v-model="new_item"></input>
      <button v-on:click='add_item(new_item)'>Add</button>
      <div style="overflow: auto; height: 70%;" >


        <li v-for='item in items'>
          <button v-on:click='delete_item(item.id)'>x</button> {{item.name}}
        </li>
      </div>
    </div>
    </div>
    `
    ,
    data: function() {
        return {
            items: [],
            new_item: "",
            info_message: ""
        }
    }
    ,
    mounted: async function() {
        this.items = sql("select id,name from items")
        //alert(JSON.stringify(this.items,null,2))
    },
    methods: {
        add_item: async function(x) {
            this.info_message = ""
            if (x == "") {
                this.info_message = "You must add some text"
                return
            }

            sql("insert into items (id,name) values (" + new Date().getTime() + " ,'" + x + "')")
            this.items = sql("select id,name from items")
            this.new_item = ""
        }
        ,
        delete_item: async function(x) {
            this.info_message = ""
            sql("delete from items where id = ?",[x] )
            this.items = sql("select id,name from items")
        }

    }
})

    /*
    allowAccessToAppBaseComponentIds([""])
    allowAccessToAppTypes(["database_reader"])
    sqlite(
    {
     migrations:
     [
         {
           name: "Create the initial item table"
           ,
           up: ["CREATE TABLE items (id	TEXT, name	TEXT);",
                "alter TABLE items add column time INTEGER;"]
         }
         ,
         {
           name: "Add a column for the user name"
           ,
           up: ["alter TABLE items add column user TEXT;"]
         }
     ]
    }
    )//sqlite
   grant_full_db_access_to(["todo_app_reader"])


    database(
    {
        11:
        {
            timestamp_ms:	11,
            name: 		    "create table X",
            up: 			[ "create table x ()" ],
            down: 		    [ "drop table X" ]
        }
        ,
        453:
        {
            timestamp_ms:	453,
            name: 		    "create table Y",
            up:			    [
                                "create table Y (int x)",
                                "create index pls"
                            ],
            down: 		    [
                                "drop table Y",
                                "drop index pls"
                            ]
        }
        ,
        678867:
        {
            timestamp_ms:	678867,
            name:			"create table Z",
            up: 			[ "create table Z ()" ],
            down:			[ "drop table Z" ]
        }
    })//database

   */
}
