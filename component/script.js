


class Table extends HTMLElement {
  constructor() {
    super();
    this.table_cfg = {
      occupied: false,
      table_id :this.getAttribute('table-id'),
    }
    this.setAttribute('table-status',false);
    this.setAttribute('table-id', Math.random().toString(36).substring(7)); 
    this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
    this.template.innerHTML = `
                <head>
                <!-- Awesome Fonts -->
                <link
                  href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                  rel="stylesheet"
                  integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
                  crossorigin="anonymous"
                />
                </head>
                <style>    
                    .table-content{
                        margin:3px;
                        width:20vw;
                        height:20vh;
                        background:#6D4C41;
                        color:#FFFFFF;
                        border-radius:5px;
                    }
                    .table-botonera{
                      width:100%;
                      height:30%;
                      display: flex;
                      justify-content: center;
                      /* align-self: center;    <---- REMOVE */
                      align-items: center;   /* <---- NEW    */
                      // background: silver;
                    }
                    .table-botonera>span{
                      margin:5px;
                    }
                    .table-botonera>span>i{
                      font-size:1.5rem;
                      cursor:pointer;
                    }
                    
                    .occupied{
                        background:red;
                        border-radius:50%;
                        margin:2px;
                        height: 26px;
                      width: 26px;
                    }
                    .free{
                        background:green;
                        height: 26px;
                        width: 26px;
                        border-radius:50%;
                        margin:2px;
                    }
                    /* The switch - the box around the slider */
                    .switch {
                      position: relative;
                      display: inline-block;
                      width: 60px;
                      height: 34px;
                    }
                    
                    /* Hide default HTML checkbox */
                    .switch input {
                      opacity: 0;
                      width: 0;
                      height: 0;
                    }
                    
                    /* The slider */
                    .slider {
                      position: absolute;
                      cursor: pointer;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;
                      background-color: #ccc;
                      -webkit-transition: .4s;
                      transition: .4s;
                    }
                    
                    .slider:before {
                      position: absolute;
                      content: "";
                      height: 26px;
                      width: 26px;
                      left: 4px;
                      bottom: 4px;
                      background-color: white;
                      -webkit-transition: .4s;
                      transition: .4s;
                    }
                    
                    input:checked + .slider {
                      background-color: #2196F3;
                    }
                    
                    input:focus + .slider {
                      box-shadow: 0 0 1px #2196F3;
                    }
                    
                    input:checked + .slider:before {
                      -webkit-transform: translateX(26px);
                      -ms-transform: translateX(26px);
                      transform: translateX(26px);
                    }
                    
                    /* Rounded sliders */
                    .slider.round {
                      border-radius: 34px;
                    }
                    
                    .slider.round:before {
                      border-radius: 50%;
                    } 
                </style>
                <div class="table-content">
                    <div class="table-botonera">
                        <span id="table-status" class="${(this.table_cfg.occupied == true) ? 'occupied' : 'free'}"></span>
                        <!-- Rounded switch -->
                        <label class="switch">
                          <input type="checkbox" id="change_table_status">
                          <span class="slider round"></span>
                        </label>
                        <span>
                          <i class="fa fa-search" aria-hidden="true"></i>
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
            `;
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));


    this.checkEvent = new CustomEvent("close_table", {
      bubbles: true,
      cancelable: false,
      composed: true,
      table_id: this.table_cfg.table_id,
    });


  }

  static get observedAttributes() {
    return ['table-status'];
  }
  connectedCallback() {
    this.shadowRoot.querySelector("#change_table_status").addEventListener('click', (ev) => {
      this.table_cfg.occupied = !this.table_cfg.occupied;

      this.shadowRoot.querySelector("#table-status").className = (this.table_cfg.occupied == true) ? 'occupied' : 'free';


    })
    this.shadowRoot.querySelector(".fa-trash").addEventListener('click', (ev) => {
      console.log("CLICK EN TRASH ICON!");
      // console.log(this.getAttribute('table-id'))
      // Emitir el evento.
      this.dispatchEvent(this.checkEvent);
  

    })
  }

  attributeChangedCallback(name, oldVal, newVal) {

  }


}





class Restaurant extends HTMLElement {
  constructor() {
    super();
    this.restaurant_config = {
      'tables': [],

    }
    this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
    this.template.innerHTML = `
    <head>
    <!-- Awesome Fonts -->
    <link
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      rel="stylesheet"
      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
      crossorigin="anonymous"
    />
    </head>
                <style>    
                .restaurant-container{
                    display:flex;
                    flex-direction:row;

                }
                .botonera1{
                    width:20%;
                    background:red;
                    display:flex;
                    flex-direction:column;
                    padding:5px;
                    cursor: pointer;

                  }
                  .botonera_item{
                  padding:35px;

                }
                .botonera_item:hover{
                  background:black;
                  color:white;
                }
                .content{
                    display:flex;
                    flex-direction:row;
                    flex-wrap:wrap;
                    background:orange;
                }
                </style>
                <div class="restaurant-container">
                    <div class="botonera1">
                      <div class="botonera_item" id="nueva_mesa">
                        <i class="fa fa-plus"></i> <span class="item_title">Nueva Mesa</span>
                      </div>
                      <div class="botonera_item">
                        <i class="fa fa-users"></i> <span class="item_title">Meseros</span>
                      </div>
                      <div class="botonera_item">
                        <i class="fa fa-table"></i> <span class="item_title">Mesas</span>
                      </div>
                    </div>
                    <div class="content">

               
                
                    
                </div>


            </div>
            `;
    this.test_tables();
  }

  static get observedAttributes() {
    return ['tables-count'];
  }
  test_tables() {
    for (let i of [...Array(parseInt(this.getAttribute('tables-count'),10)).keys()]) {
      this.restaurant_config.tables.push(new Table());
    }
  }

  render(){
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.shadowRoot.querySelector('.content').innerHTML ='';
    for(let i of this.restaurant_config.tables){
      this.shadowRoot.querySelector('.content').appendChild(i);
  
    }

  }
  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('#nueva_mesa').addEventListener('click',(ev)=>{
      this.restaurant_config.tables.push(new Table());
      this.render();
      
    })
    this.addEventListener("close_table", function (e) {
      console.log('listend to check event');
      let table_id = e.originalTarget.getAttribute('table-id');
      for(let i of this.restaurant_config.tables){
        if(i.getAttribute('table-id')==table_id){
            let indx = this.restaurant_config.tables.indexOf(i);
            this.restaurant_config.tables.splice(indx,1);
            console.log('tamaño del las mesaa', this.restaurant_config.tables.length);
            console.log(this.restaurant_config.tables.length);
            // this.setAttribute('tables-count', this.restaurant_config.tables.lenght);
        }

      }
      console.log(this.restaurant_config.tables);
  });
  }
  attributeChangedCallback(name, oldVal, newVal) {
    console.log(name);
    console.log(this.getAttribute('tables-count'))
  }

}

customElements.define('table-wc', Table);
customElements.define('restaurant-wc', Restaurant);
