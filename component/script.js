

class Table extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('table-status', false);
    this.setAttribute('table-id', Math.random().toString(36).substring(7));
    this.attachShadow({ mode: 'open' });
    this.table_cfg = {
      number: Math.random().toString(36).substring(3),
      occupied: false,
      table_id: this.getAttribute('table-id'),
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
                  .table-content{
                    background:#000000;
                    color:#FFFFFF;
                    padding:5px;
                    display:flex;
                    flex-direction:row;
                    align-items:center;
                    width:50vw;
                    height:5vh;
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
                  }
                  .table-actions{
                    width:30%;
                    background:orange;
                    text-align:right;
                    padding:5px;
                    display:flex;
                    flex-direction:row;
                  }
                  .table-actions>i{
                    margin:5px;
                  }
                  /* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
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
                </style>
                <div class="table-content">
                  <div class="table-n">${parseInt(Math.random()*10,10)}</div>
                  <div class="table-status">
                  <marquee>${this.table_cfg.occupied!=true? 'Ocupado':'Libre'}</marquee>
                  </div>
                  <div class="table-actions">
                    <div class="tooltip"><i class="fa fa-ticket"></i>
                      <span class="tooltiptext">Reservar</span>
                    </div>
                    <i class="fa fa-user"></i>
                    <i class="fa fa-plus"></i>
                    <i class="fa fa-list-alt"></i>
                    <i class="fa fa-cogs"></i>
                  </div>                    
                </div>
            `;
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));




  }

  static get observedAttributes() {
    return ['table-status'];
  }
  connectedCallback() {

  }

  attributeChangedCallback(name, oldVal, newVal) {

  }


}




customElements.define('rest-table', Table);
