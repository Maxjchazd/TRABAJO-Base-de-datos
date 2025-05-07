const $$DomBasic = function () {
  this.querySelector = function (selector) {
    return document.querySelector(selector);
  };
  this.createElement = function (nameElement) {
    return document.createElement(nameElement);
  };

  this.addElement = function (parent, child) {
    parent.appendChild(child);
  };

  this.removeChild = function (parent, child) {
    parent.removeChild(child);
  };
};
const $d = new $$DomBasic();

const $$DomControls = function () {
  this.createAndAppend = function (parent, nameElement) {
    let child = $d.createElement(nameElement);
    $d.addElement(parent, child);
    return child;
  };
  this.addInput = function (parent, type) {
    const input = this.createAndAppend(parent, "input");
    input.type = type;
    return input;
  };

  this.img = function (parent, src) {
    let img = this.createAndAppend(parent, "img");
    img.src = src;
    return img;
  };

  this.icono = function (parent, clase) {
    let icono = this.createAndAppend(parent, "i");
    icono.classList.add(clase); // Agrega la clase al icono
    return icono;
  };

  this.div = function (parent) {
    return this.createAndAppend(parent, "div");
  };

  this.label = function (parent, innertext, forId) {
    let label = this.createAndAppend(parent, "label");
    label.textContent = innertext;
    label.htmlFor = forId;
    return label;
  };

  this.hx = function (parent, hx, text) {
    let title = this.createAndAppend(parent, hx);
    title.textContent = text;
    return title;
  };

 
  /*----------GENERAL---------------------*/
  this.addInputForm = function (type, textlabel, idInput) {
    formBody = $d.querySelector(".form__body");
    const label = this.label(formBody, textlabel, idInput);
    const input = this.addInput(formBody, type);
    input.id = idInput;
    input.required = true;
    return input;
  };

  this.form = function ( title, submitText) {
    const containerMain=$d.querySelector("main")
    // container Form
    const formContainer = this.div(containerMain);
    formContainer.classList.add("form__container");
    // Form
    const form = this.createAndAppend(formContainer, "form");
    form.classList.add("form");
    //  Form__Header
    const formHeader = this.div(form);
    formHeader.classList.add("form__header");
    //  Form__TitleContainer
    const titleContainer = this.div(formHeader);
    titleContainer.classList.add("form__title-container");
    //  Form__Title
    const formTitle = this.hx(titleContainer, "h4", title);
    formTitle.classList.add("form__title");
    // Form__ImageContainer
    const iconoContainer = this.div(formHeader);
    iconoContainer.classList.add("form__icono-container");
    // Form__Image
    const formIcono = this.icono(iconoContainer, "bi");
    formIcono.classList.add("bi-x-square-fill");
    // section-body
    const formBody = this.div(form);
    formBody.classList.add("form__body");
    // --------------- Form__ButtonsContainer
    const buttonsContainer = this.div(form);
    buttonsContainer.classList.add("form__buttons-container");
    // -------------- Form__Input (modificador submit)
    const submitInput = this.addInput(buttonsContainer, "submit");
    submitInput.value = submitText;
    submitInput.classList.add("form__input__button", "form__input--submit");
    // ------------------Form__Input (modificador reset)
    const resetInput = this.addInput(buttonsContainer, "reset");
      resetInput.value = "Cancelar";
    resetInput.classList.add("form__input__button", "form__input--reset");

    return formContainer;
  };
};
const $dc = new $$DomControls();

const $$DomSectionBasic = function () {
  this.main = function (parentSelector) {
    const parent = $d.querySelector(parentSelector);
    const parentMain = $dc.createAndAppend(parent, "div");
    parentMain.classList.add("container__main");
    const main = $dc.createAndAppend(parentMain, "main");
    main.classList.add("main");

  };
    this.nav = function (parentSelector) {
        const parent = $d.querySelector(parentSelector);
        const parentNav = $dc.createAndAppend(parent, "div");
        parentNav.className = "container__nav";

        const nav = $dc.createAndAppend(parentNav, "nav");
        nav.classList.add("navBar");

        const contenedorButton = $dc.createAndAppend(nav, "div");
        contenedorButton.classList.add("nav__buttons");

        const loginRegContainer = $dc.createAndAppend(nav, "div");
        loginRegContainer.classList.add("nav__login-reg");

        const contenedorButtonLogin = $dc.createAndAppend(loginRegContainer, "div");
        contenedorButtonLogin.classList.add("nav__button--login");

        const contenedorButtonReg = $dc.createAndAppend(loginRegContainer, "div");
        contenedorButtonReg.classList.add("nav__button--reg");

        return nav;
    };


  this.clearSection = function (section) {
    const sectionForClear = $d.querySelector(section);
    sectionForClear.innerHTML = "";
  };

  this.home=function(){
    $ds.clearSection("main");
    isTable = false;
    const containerMain=$d.querySelector("main")
    const imgContainer= $dc.createAndAppend(containerMain,"div");
    imgContainer.className="main__img"
    const img=$dc.img(imgContainer,"/Imagenes/PortadaPE.jpg")
    }









  this.header = function (parentSelector, textTitle) {
    const parentHeader = $d.querySelector(parentSelector);
    const containerHeader =$dc.div(parentHeader);
    containerHeader.className="container__header"
    const header = $dc.createAndAppend(containerHeader, "header");
    header.classList.add("header");
    const containerLogo = $dc.createAndAppend(header, "div");
    containerLogo.classList.add("header__logo");
    $dc.img(containerLogo,"/Imagenes/logo_header_tupac.png")
    containerTitle = $dc.createAndAppend(header, "div");
    containerTitle.classList.add("header__title");
    const title = $dc.hx(containerTitle, "h1", textTitle);
    const containerSwitch = $dc.createAndAppend(header, "div");
    containerSwitch.classList.add("header__switch");
  };
  
};


const $ds = new $$DomSectionBasic();

const $$DomNav = function () {
  this.makeButton = function (text, event) {
    const parent = $d.querySelector(".nav__buttons");
    const a = $dc.createAndAppend(parent, "a");
    a.textContent = text;
    a.onclick = event;
    return a;
  };

  this.makeButtonLogin = function (text, event) {
    const parent = $d.querySelector(".nav__button--login");
    const a = $dc.createAndAppend(parent, "a");
    a.textContent = text;
    a.onclick = event;
    return a;
    };

    this.makeButtonReg = function (text, event) {
        const parent = $d.querySelector(".nav__button--reg");
        const a = $dc.createAndAppend(parent, "a");
        a.textContent = text;
        a.onclick = event;
        return a;
    };




    this.makeDropDown = function (text, arraytext, arrayEvent) {
        const parent = $d.querySelector(".nav__buttons");
        const menuItem = $dc.createAndAppend(parent, "div");
        menuItem.className = "nav__dropdown";
        const container__a = $dc.createAndAppend(menuItem, "div");
        container__a.className = "container__a";
        const btnfirst = $dc.createAndAppend(container__a, "a");
        btnfirst.textContent = text;
        btnfirst.className = "nav__dropdown-toggle";
        const menuDropDown = $dc.createAndAppend(menuItem, "div");
        menuDropDown.className = "nav__dropdown-content";
        for (var i = 0; i < arraytext.length; i++) {
            const btn = $dc.createAndAppend(menuDropDown, "a");
            btn.textContent = arraytext[i];
            btn.onclick = arrayEvent[i];
      }
  };


  };


const $dn = new $$DomNav();

