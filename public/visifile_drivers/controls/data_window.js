function(args) {
/*
is_app(true)
control_type("VB")
display_name("Data Window control")
description("This will return the data window control")
base_component_id("data_window_control")
load_once_from_file(true)
visibility("PRIVATE")
read_only(true)
properties(
    [
        {
            id:     "text",
            name:   "Text",
            type:   "String"
        }
        ,
        {
            id:         "width",
            name:       "Width",
            default:    350,
            type:       "Number"
        }
        ,
        {
            id:     "limit",
            name:   "Limit",
            type:   "Number",
            default_expression: "(typeof $RETURNED_ROWS_LIMIT !== 'undefined')?eval('$RETURNED_ROWS_LIMIT'):100",
        }
        ,
        {
            id:         "height",
            name:       "Height",
            default:    300,
            type:       "Number"
        }
        ,
        {
            id:     "background_color",
            name:   "Background color",
            type:   "String"
        }
        ,

        {
            id:         "has_details_ui",
            name:       "Has details UI?",
            type:       "Boolean",
            default:    true,
            hidden:     true
        }
        ,
        {
            id:     "changed_event",
            name:   "Changed event",
            type:   "Event"
        }
        ,
        {
            id:         "is_container",
            name:       "Is Container?",
            type:       "Boolean",
            default:    true,
            hidden:     true
        }
        ,
        {
            id:         "hide_children",
            name:       "Hide Children?",
            type:       "Boolean",
            default:    false,
            hidden:     true
        }
        ,
        {
            id:         "setData",
            snippet:    `setData([{a: 1, b: "c"},{a: 2, b: "d"}])`,
            name:       "setData",
            type:       "Action"
        }
        ,
        {
            id:         "resetColumns",
            snippet:    `resetColumns()`,
            name:       "resetColumns",
            type:       "Action"
        }
        ,
        {
            id:     "addColumn",
            name:   "addColumn",
            type:   "Action"
        }
        ,
        {
            id:     "source_type",
            name:   "Data Source Type",
            type:   "String",
            default: "postgres"
        }
        ,
        {
            id:     "sql",
            name:   "SQL",
            type:   "String",
            default: "SELECT * FROM pg_catalog.pg_tables;"
        }
        ,
        {
            id:      "user",
            name:    "USER",
            type:    "String",
            default_expression: "(typeof $POSTGRES_USER !== 'undefined')?eval('$POSTGRES_USER'):'postgres'"
        }
        ,
        {
            id:     "password",
            name:   "Password",
            type:   "String",
            default_expression: "(typeof $POSTGRES_PASSWORD !== 'undefined')?eval('$POSTGRES_PASSWORD'):'password'",
        }
        ,
        {
            id:     "database",
            name:   "Database",
            type:   "String",
            default_expression: "(typeof $POSTGRES_DATABASE !== 'undefined')?eval('$POSTGRES_DATABASE'):'postgres'",
        }
        ,
        {
            id:     "port",
            name:   "Port",
            type:   "Number",
            default_expression: "(typeof $POSTGRES_PORT !== 'undefined')?eval('$POSTGRES_PORT'):5432",
        }
        ,
        {
            id:     "host",
            name:   "Host",
            type:   "String",
            default_expression: "(typeof $POSTGRES_HOST !== 'undefined')?$POSTGRES_HOST:'localhost'",
        }

        ,
        {
            id:     "result",
            name:   "result",
            type:   "Array",
            default:    []
        }
        ,
        {
            id:         "executeSql",
            pre_snippet: `await `,
            snippet:    `executeSql()`,
            name:       "executeSql",
            type:       "Action",
            help:       `<div>Help text for
                            <b>executeSql</b> function
                            <div>The SQL is store in the "sql" property</div>
                         </div>`
        }
        ]
)//properties
logo_url("/driver_icons/data_window.png")
*/

    Vue.component("data_window_control",{
      props: ["meta","name","args","refresh","design_mode"]
      ,
      template:
`<div   v-bind:style='"width:100%;overflow-y:auto;height:100%;color:black;"
        v-bind:refresh='refresh'>


    <div v-bind:style='"height:100%;width:100%; border: 0px;color:black;"'
         v-if='design_mode == "detail_editor"'>
            SQL Builder

        <ul class="nav nav-pills">
            <li class="nav-item" style="width:20%;">
                <a  v-bind:class='"nav-link " + ((designDetailTab == "connection")?"active":"")'
                    v-on:click="designDetailTab = 'connection';"
                    href="#">
                    Data source connection
                </a>
            </li>

            <li class="nav-item" style="width:20%;">
                <a    v-bind:class='"nav-link " + ((designDetailTab == "schema")?"active":"")'
                      v-on:click="designDetailTab = 'schema';"
                      href="#">Schema and tables</a>
            </li>

            <li class="nav-item" style="width:20%;">
                <a    v-bind:class='"nav-link " + ((designDetailTab == "columns")?"active":"")'
                      v-on:click="designDetailTab = 'columns';"
                      href="#">Columns</a>
            </li>

            <li class="nav-item" style="width:20%;">
                <a    v-bind:class='"nav-link " + ((designDetailTab == "where")?"active":"")'
                      v-on:click="designDetailTab = 'where';"
                      href="#">Where</a>
            </li>
        </ul>


        <div v-if='designDetailTab == "connection"'  >
            connection tab

            <select  @change='alert($event)'>
                  <option   v-for='propVal in ["postgres","csv"]'
                            v-bind:value="propVal"
                            v-bind:selected='(propVal == "postgres")'>

                        {{propVal}}

                  </option>
            </select>


        </div>




        <div v-if='designDetailTab == "schema"'  >
           schema tab
           <div   v-for='table in tables'
                  v-on:click="args.sql = 'select * from ' + table"
           >

                 {{table}}

           </div>
        </div>




        <div v-if='designDetailTab == "columns"'  >
            columns tab
        </div>





        <div v-if='designDetailTab == "where"'  >
            where tab
        </div>

    </div>











    <div v-else>


        <div v-bind:style='"height:100%;width:100%; border: 0px;" +
                           "background-color: "+    args["background_color"]  +  ";"'
             v-if='design_mode == false'>

             <div    ref="exampletable"></div>


        </div>




         <div v-bind:style='"height:100%;width:100%; border: 0px;" +
                            "background-color:white;color:black;"'
              v-else>


                     <b>SQL:</b>
                        {{args.sql}}
         </div>

     </div>





</div>`
      ,


      data: function() {
       return {
         selected_index:     null
         ,
         columnDefinitions: [ ]
         ,
         data:              [ ]
         ,
         tables:            [ ]
         ,
         designDetailTab: "connection"
       }
     }
     ,


     watch: {
       // This would be called anytime the value of the input changes
       refresh: function(newValue, oldValue) {
           //console.log("refresh: " + this.args.text)
           if (isValidObject(this.args)) {
               this.getTables()
               //alert(JSON.stringify(this.tables,null,2))
           }
       }
     }
     ,


     mounted: async function() {
         registerComponent(this)

         if (isValidObject(this.args)) {
         }

         if (this.design_mode == false) {
             this.table = new Tabulator(this.$refs.exampletable, {
                    width:                    this.args.width
                    ,
                    height:                    this.args.height
                    ,
                    tables:                    []
                    ,
                    data:                      this.data
                    ,
                	layout:                    "fitColumns"
                    ,
                	responsiveLayout:          "hide"
                    ,
                	tooltips:                   true
                    ,
                	addRowPos:                 "top"
                    ,
                	history:                    true
                    ,
                	pagination:                "local"
                    ,
                	paginationSize:             7
                    ,
                	movableColumns:             true
                    ,
                	resizableRows:              true
                    ,
                    tableNames:              []
                    ,

                	initialSort:                [
                                            	]
                    ,

                	columns:                    this.columnDefinitions
                });

         }
         if (this.design_mode) {
             await this.getTables()

         }

         if (!this.design_mode) {

             var results = await this.executeSql()
             //alert(JSON.stringify(results,null,2))
             await this.setData(results.value)
         }

      }
      ,


      methods: {

            changedFn: function() {
                if (isValidObject(this.args)) {
                }
            }


            ,
            resetColumns: async function(data) {
                this.table.setColumns([])
            }
            ,
            addColumn: async function(colData) {
                this.table.addColumn(colData, true, "name");
            }
            ,

            runEventHandler: function() {
                this.$emit('send', {
                                                type:               "subcomponent_event",
                                                control_name:        this.args.name,
                                                sub_type:           "changed",
                                                code:                this.args.changed_event
                                            })
            }
            ,
            setData: async function(data) {
                this.data = data
                this.table.setData(data)

                var keysOfData = new Object()
                if ((this.columnDefinitions == null)  || (this.columnDefinitions.length == 0)) {
                    for (var rr = 0 ; rr < data.length; rr ++) {
                        var dfg = Object.keys(data[rr])
                        for (var qq = 0 ; qq < dfg.length; qq ++) {
                            keysOfData[dfg[qq]] = true
                        }
                    }
                }

                var dfg2 = Object.keys(keysOfData)
                for (var qq2 = 0 ; qq2 < dfg2.length; qq2 ++) {
                    this.addColumn({title:dfg2[qq2], field:dfg2[qq2]})
                }

            }
            ,






            getTables: async function() {
                console.log("In getTables")

                if (this.design_mode) {
                    var result = await callFunction(
                                        {
                                            driver_name: "postgres_server",
                                            method_name: "postgres_sql"  }
                                            ,{
                                                user:            this.args.user,
                                                password:        this.args.password,
                                                database:        this.args.database,
                                                host:            this.args.host,
                                                port:            this.args.port,
                                                get_tables:      true
                                             })


                   //alert("executeSql: " + JSON.stringify(result,null,2))
                   console.log(JSON.stringify(result,null,2))
                   if (result.value) {
                       this.tables = []
                       //alert(JSON.stringify(result.value.value,null,2))
                       for (var i=0;i<result.value.value.length;i++) {
                           this.tables.push(result.value.value[i].name)

                       }
                   }


                }
            }
            ,





            executeSql: async function() {
                if (!this.design_mode) {
                    var result = await callFunction(
                                        {
                                            driver_name: "postgres_server",
                                            method_name: "postgres_sql"  }
                                            ,{
                                                sql:             this.args.sql,
                                                user:            this.args.user,
                                                password:        this.args.password,
                                                database:        this.args.database,
                                                host:            this.args.host,
                                                port:            this.args.port,
                                                limit:           this.args.limit
                                             })


                   //alert("executeSql: " + JSON.stringify(result,null,2))
                   console.log(JSON.stringify(result,null,2))
                   if (result.value) {
                        this.args.result = result.value.result

                        return result.value
                   }


               }
                this.args.result = []
                this.changedFn()
                return {}
            }











        }

    })
}
