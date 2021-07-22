class Table extends HTMLElement {
  constructor(...args) {
    super();
    let argumentos = [...args][0];
    this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
    // SETTING ATRIBUTES
    this.table_id = Math.random().toString(36).substring(7);
    this.table_id_short = this.table_id.toString().slice(0,3);
    this.setAttribute(`table-id-${this.table_id_short}`, this.table_id);
    this.setAttribute(`table-n-${this.table_id_short}`, argumentos['table-nuber']);
    this.setAttribute(`is_occupied-${this.table_id_short}`, 'no');
    this.setAttribute(`is_reserved-${this.table_id_short}`, false);
    this.setAttribute(`is_reserved-${this.table_id_short}`, false);
    this.setAttribute(`order_counts-${this.table_id_short}`, 0);
    this.setAttribute(`titular-${this.table_id_short}`, argumentos['table-owner']);

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
                    background:#000000;
                    color:#FFFFFF;
                    padding:5px;
                    display:flex;
                    flex-direction:row;
                    align-items:center;
                    width:70vw;
                    height:8vh;
                    border: 1px solid #FFFFFF;
                    border-radius:5px;
                  }
                  .table-n{
                    width:20%;
                    background:blue;
                    text-align:center;
                  }
                  .table-status{
                    width:50%;
                    margin-left:5px;
                    margin-right:5px;
                    background: #6D4C41;
                  }
                  .table-actions{
                    width:50%;
                    background:orange;
                    text-align:right;
                    padding:0.2% ;
                    display:flex;
                    flex-direction:row;
                    align-items:center;
                  }
                  .table-actions>i{
                    margin:5px;
                  }
                  /* Tooltip container */
                  .tooltip {
  cursor:pointer;
                    margin:5px;
  position: relative;
  display: inline-block;
  // border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
  padding:5px;
}
/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}
/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-left: auto; 
margin-right: 0;
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
                  <div class="table-n">MESA: ${this.getAttribute(`table-num-${this.table_id_short}`)}</div>
                  <div class="table-status">
                  <marquee scrollamount="${Math.floor(Math.random() * 5) + 2}">${this.getAttribute(`${this.table_id_short}-is_occupied`)}</marquee>
                  </div>
                  <div class="table-actions">
                    <div class="tooltip reservar">
                      <i class="fa fa-ticket"></i>
                      <span class="tooltiptext">Reservar</span>
                    </div>
                      <div class="tooltip cancelar-reservar"  style="visibility:hidden;">
                      <i class="fa fa-window-close"></i>
                      <span class="tooltiptext">Canselar Reserva</span>
                      </div>
                    <div class="tooltip">
                      <i class="fa fa-user"></i>
                      <span class="tooltiptext">Titular: ${this.getAttribute('titular')}</span>
                    </div>
                    <div class="tooltip">
                      <i class="fa fa-plus"></i>
                      <span class="tooltiptext">Nueva Orden</span>
                    </div>
                    <div class="tooltip">
                      <i class="fa fa-list-alt"></i>
                      <span class="tooltiptext">Detalles</span>
                    </div>
                    <!-- Rounded switch -->
                    <label class="switch">
                      <input id='table-status-chager' type="checkbox">
                      <span class="slider round"></span>
                    </label>
                    <div class="tooltip remover-mesa">
                      <i class="fa fa-trash"></i>
                      <span class="tooltiptext">Remover Mesa</span>
                    </div>
                  </div>                    
                </div>
            `;
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));

  }
  static get observedAttributes() {
    return [
      'is_occupied',
      'is_reserved',
      'is_reserved'
    ];
  }
  connectedCallback() {
    // Remove table.
    this.shadowRoot.querySelector('.remover-mesa').addEventListener('click', (ev) => {
      console.log('click en remover mesa!')
      this.remove();
    })
    // Book the table.
    this.shadowRoot.querySelector('.reservar').addEventListener('click', (ev) => {

      this.shadowRoot.querySelector('.switch').style.visibility = 'hidden';
      this.shadowRoot.querySelector('.reservar').style.visibility = 'hidden';
      this.shadowRoot.querySelector('.cancelar-reservar').style.visibility = 'visible';

    })
    // Cancel booking.
    this.shadowRoot.querySelector('.cancelar-reservar').addEventListener('click', (ev) => {
      this.shadowRoot.querySelector('.reservar').style.visibility = 'visible';
      console.log("CANCEL BOOKING!")
      this.shadowRoot.querySelector('.table-status').innerHTML = `
      <marquee scrollamount="${Math.floor(Math.random() * 5) + 2}"> Libre </marquee>
      `;
      this.shadowRoot.querySelector('.switch').style.visibility = 'visible';
    })
    // If you change the state of the table.
    this.shadowRoot.querySelector("#table-status-chager").addEventListener('click', (ev) => {
      let status = this.getAttribute('is_occupied')==='no'? 'si':'no';
      this.setAttribute('is_occupied',status);
      
    })
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case 'is_occupied':
        console.log("estado cambio!");
        this.shadowRoot.querySelector('.table-status').innerHTML = `<marquee scrollamount="${Math.floor(Math.random() * 5) + 2}">${this.getAttribute('is_occupied')}</marquee>`;
        break;

      default:
        break;
    }
  }


}
class Restaurant extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('table-id', Math.random().toString(36).substring(7));
    this.attachShadow({ mode: 'open' });
    this.rest_cfg = {
      tables: [],
    }
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
                /* The Modal (background) */
                .modal {
                  display: none; /* Hidden by default */
                  position: fixed; /* Stay in place */
                  z-index: 1; /* Sit on top */
                  left: 0;
                  top: 0;
                  width: 100%; /* Full width */
                  height: 100%; /* Full height */
                  overflow: auto; /* Enable scroll if needed */
                  background-color: rgb(0,0,0); /* Fallback color */
                  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
                }
                /* Modal Content/Box */
                .modal-content {
                  background-color: #fefefe;
                  margin: 15% auto; /* 15% from the top and centered */
                  padding: 20px;
                  border: 1px solid #888;
                  width: 80%; /* Could be more or less, depending on screen size */
                }
                /* The Close Button */
                .close {
                  color: #aaa;
                  float: right;
                  font-size: 28px;
                  font-weight: bold;
                }
                .close:hover,
                .close:focus {
                  color: black;
                  text-decoration: none;
                  cursor: pointer;
                } 
                .form_new_table{
                  display:flex;
                  flex-direction:column;
                  
                }
                .controles{
                  margin-bottom:15vh;
                }
                #btn_crear_mesa{
                  margin-top:30px;
                  width:20%;
                  margin-right: 0;
                  margin-left:auto;              
                  display:block;
                }
                </style>
                <div class="restaurant-content">
                    <h3>Restaurant</h3>          
                    <div class="controles">
                        <button id="add_new_table"><span><i class="fa fa-plus-circle"></i> Nueva Mesa</span></button>
                    </div>     
                    <div class="tables-container"></div>
                    <!-- The Modal -->
                    <div id="new_table_modal" class="modal">
                      <!-- Modal content -->
                      <div class="modal-content">
                        <span class="close"><i class="fa fa-window-close"></i></span>
                        <h3>Open a Table</h3><br><hr>
                        <div class="form_new_table">
                          <label for="table-owner">Dueño</label>
                          <input type="text" name="table-owner" id="table-owner">
                          <label for="table-number">N° Mesa</label>
                          <select name="table-number" id="table-number">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                          <button id="btn_crear_mesa">
                          <i class="fa fa-check"></i> Aceptar
                        </button>
                        </div>
                      </div>
                    </div>
                </div>
            `;
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }
  static get observedAttributes() {
    return [''];
  }
  render() {
    this.shadowRoot.querySelector('.tables-container').innerHTML = '';
    for (let i of this.rest_cfg.tables) {


      this.shadowRoot.querySelector('.tables-container').appendChild(i);
    }
  }


  connectedCallback() {
    // Get the modal
    let modal = this.shadowRoot.querySelector("#new_table_modal");
    // Get the <span> element that closes the modal
    let span = this.shadowRoot.querySelector(".close");
    this.shadowRoot.querySelector('#add_new_table').addEventListener('click', (ev) => {
      // When the user clicks on the button, open the modal
      modal.style.display = "block";
      // Focus in input field.
      this.shadowRoot.querySelector('#table-owner').focus();
      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = "none";
      }
      // When the user clicks anywhere outside of the modal, close it
      modal.addEventListener('click', (ev) => {
        if (ev.target == modal) {
          modal.style.display = "none";
        }
      })


    })
    this.shadowRoot.querySelector('#btn_crear_mesa').addEventListener('click', (ev) => {

      // console.log("TABLES CONT : ", this.rest_cfg.tables.length);
      let table_configuration = {
        'table-nuber': this.shadowRoot.querySelector('#table-number').value,
        'table-owner': this.shadowRoot.querySelector('#table-owner').value,
      };
      // ADD NEW TABLE TO STACK
      this.rest_cfg.tables.push(new Table(table_configuration));
      modal.style.display = "none";
      // console.log("TABLES CONT : ", this.rest_cfg.tables.length);

      this.render();
      this.shadowRoot.querySelector('#table-number').value = 0;
      this.shadowRoot.querySelector('#table-owner').value = 0;

    })
  }
  attributeChangedCallback(name, oldVal, newVal) {
  }
}
customElements.define('rest-container', Restaurant);
customElements.define('rest-table', Table);
