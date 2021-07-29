class Table extends HTMLElement {
  constructor() {
    super();
    // this.attachShadow({ mode: 'open' });
    this._root = this.attachShadow({ mode: 'closed' });
    this.template = document.createElement('template');
    // Table configuration.
    this.table_cfg = {};
    this.marquee_msg = 'MESA LIBRE';
    // SETTING ATRIBUTES
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
                .table-container {
                  background: #01A4E8;
                  width: 90vw;
                  height: 10vh;
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
                }
                .table-data {
                  background: #ff9800;
                  width: 20%;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: left;
                }
                .table-status {
                  background: #f44336;
                  width: 40%;
                  height: 100%;
                  padding: 0 5px 0 5px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  color:#FFFFFF;
                }
                .table-actions {
                  background: #000000;
                  width: 40%;
                  height: 100%;
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
                  padding-right: 2%;
                }
                .table-actions>i {
                  margin: 5px;
                  cursor: pointer;
                  font-size: 1.5rem;
                  color: #FFFFFF;
                }
                .table-actions>i:last-child {
                  color: #FDD835;
                  margin-left:10%;
                }
                .table-actions>i:hover {
                  color: #F57C00;
                }
                /* SLIDER */
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
                  background-color: #43A047;
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
                input:checked+.slider {
                  background-color: #ef5350;
                }
                input:focus+.slider {
                  box-shadow: 0 0 1px #ef5350;
                }
                input:checked+.slider:before {
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
                // Pin remove.
              </style>
                <div class="table-container">
                <div class="table-data">
                  <center>
                    <span>N: 3</span>
                  </center>
                  <span>Lillian Walker</span>
                </div>
                <div class="table-status">
                  <marquee id="marquee-msg" scrollamount="${Math.floor(Math.random() * 5) + 1}">${this.marquee_msg}</marquee>
                </div>
                <div class="table-actions">
                  <i id="table-config" class="fa fa-cogs"></i>
                  <i id="table-reserve" class="fa fa-ticket"></i>
                  <i id="table-cancel-booking" class="fa fa-window-close"></i>
                  <i id="table-new-order" class="fa fa-plus-circle"></i>
                  <i id="table-see-account" class="fa fa-list"></i>
                  <!-- Rounded switch -->
                  <label class="switch">
                    <input id="table-status-changer" type="checkbox">
                    <span class="slider round"></span>
                  </label>
                  <i id="table-delete-table" class="fa fa-trash"></i>
                </div>
              </div>
            `;
    // this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this._root.appendChild(this.template.content.cloneNode(true));
  }
  static get observedAttributes() {
    return [''];
  }
  update_marquee(msg) {
    switch (msg) {
      case 'reservado':
        // this.shadowRoot.querySelector('#marquee-msg').innerHTML = 'Mesa Reservada';
        this._root.querySelector('#marquee-msg').innerHTML = 'MESA RESERVADA';
        break;
      case 'ocupado':
        // this.shadowRoot.querySelector('#marquee-msg').innerHTML = 'Mesa Ocupada';
        this._root.querySelector('#marquee-msg').innerHTML = 'MESA OCUPADA';
        break;
      case 'libre':
        // this.shadowRoot.querySelector('#marquee-msg').innerHTML = 'Mesa Libre';
        this._root.querySelector('#marquee-msg').innerHTML = 'MESA LIBRE';
        break;
      default:
        break;
    }
  }
  connectedCallback() {
    // If you click on the Cancel Reservation button.
    this._root.querySelector("#table-cancel-booking").addEventListener('click', (ev) => {
      // Remove the red color.
      this._root.querySelector("#table-cancel-booking").style.color = '#FFFFFF';
      // Show the button to reserve.
      this._root.querySelector("#table-reserve").style.visibility = "visible";
      // Show the switch.
      this._root.querySelector('.switch').style.visibility = "visible";
      this.update_marquee('libre');
    })
    // If you click on the Book button.
    this._root.querySelector("#table-reserve").addEventListener('click', (ev) => {
      // Hide this button.
      this._root.querySelector("#table-reserve").style.visibility = "hidden";
      // Hide the slider.
      this._root.querySelector('.switch').style.visibility = "hidden";
      // Put red the cancel reserve button.
      this._root.querySelector('#table-cancel-booking').style.color = 'red';
      this.update_marquee('reservado');
    })
    this._root.querySelector('#table-status-changer').addEventListener('change', (ev) => {
      // Control events with the slider.
      if (this._root.querySelector('#table-status-changer').checked) {
        console.log("ESTA EN ON")
        // Hide button for reservation and cancel reservation.
        this._root.querySelector("#table-reserve").style.visibility = "hidden";
        this._root.querySelector("#table-cancel-booking").style.visibility = "hidden";
        this.update_marquee('ocupado');
      } else {
        console.log("ESTA EN OFF")
        // Put visible the BOOK and Cancel Reservation buttons.
        this._root.querySelector("#table-reserve").style.visibility = "visible";
        this._root.querySelector("#table-cancel-booking").style.visibility = "visible";
        this.update_marquee('libre');
      }
    })
    // Remove aggregate table.
    this._root.querySelector('#table-delete-table').addEventListener('click', (ev) => {
      this.remove();
    })
  }
  attributeChangedCallback(name, oldVal, newVal) {
  }
}
class Resto extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'closed' });
    this.template = document.createElement('template');
    // Table configuration.
    this.resto_cfg = {
      'tables': [],
    };
    this.marquee_msg = 'MESA LIBRE';
    // SETTING ATRIBUTES
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
    <style media='screen'>
    * {
      margin: 0;
      padding: 0;
    }
    .container{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items:center;
    }
    .menu_container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
      // position:fixed;
    }
    /* Mesas Container */
    .mesas_container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items:center;
      width: 100%;
      height: 100%;
      background: #ff9800;
      margin-top: 1rem;
    }
    .mesas_stats{
      width: 100%;
      height: 10vh;
      background: #9C27B0;
      color: whitesmoke;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .tooltip>i {
      color: #FB8C00;
      font-size: 1rem;
      /* padding:20px; */
    }
    /* Tooltip container */
    .tooltip {
      cursor:pointer;
      position: relative;
      display: inline-block;
      margin: .2rem;
      padding: .5rem;
      width: 50%;
      height: 5%;
      background: #d32f2f;
      text-align: center;
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
      /* Position the tooltip text - see examples below! */
      position: absolute;
      z-index: 1;
    }
    /* Show the tooltip text when you mouse over the tooltip container */
    .tooltip:hover .tooltiptext {
      visibility: visible;
    }
  </style>
  <div class="container">
  <div class="menu_container">
    <div class="tooltip" id="new_table">
      <i class="fa fa-plus-circle"></i>
      <span class="tooltiptext">Nueva Mesa</span>
    </div>
    <div class="tooltip">
      <i class="fa fa-list-alt"></i>
      <span class="tooltiptext">Listar Mesas</span>
    </div>
    <div class="tooltip">
      <i class="fa fa-list-ol"></i>
      <span class="tooltiptext">Listar Ordenes</span>
    </div>
  </div>
  <div class="mesas_container">
    <div class="mesas_stats">
      <span class="stats" id="title_total">Total</span>
    </div>
    <div class="mesas">
    </div>
  </div>  
</div>
            `;
    this._root.appendChild(this.template.content.cloneNode(true));
  }
  static get observedAttributes() {
    return [''];
  }
  update_title(){
    this._root.querySelector('#title_total').innerHTML = '';
    this._root.querySelector('#title_total').innerHTML = `Total Mesas: ${this.resto_cfg.tables.length}`;

  }
  render(){
    this._root.querySelector('.mesas').innerHTML = '';
    for(let i of this.resto_cfg.tables){
      this._root.querySelector('.mesas').appendChild(i);
    }
  }
  connectedCallback() {
    this._root.querySelector('#new_table').addEventListener('click',(ev)=>{
      this.resto_cfg.tables.push(new Table());
      // Update title and render tables.
      this.update_title();
      this.render();
    })
   }
}
// COMPONENTS
customElements.define('rest-table', Table);
customElements.define('rest-cont', Resto);
