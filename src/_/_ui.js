// initiate header and related scripts
export const initHeader = (response) => {

  // cache header from backend
  if(response.header) localStorage.setItem('header', response.header);

  // load header to html if not present
  if(!document.querySelector("#k-script")){

      let child = document.createElement('div');
      child.innerHTML = localStorage.getItem('header');
      child = child.firstChild;
      document.body.prepend(child);

      // run header scripts
      Function(document.querySelector("#k-script").innerHTML).call('test');
  }

  // load locales if present
  if(response.locale) window.i18n.init(response.locale); 
}

// show loader
export const showLoader = () => {

    let el = document.querySelector(".loader");
    if (el) el.style.display = 'block';
}

// hide loader
export const hideLoader = () => {

    let el = document.querySelector(".loader");
    if (el) el.style.display = 'none';
}

// hide loader
export const initFooter = (left, right) => {

    document.querySelector("footer .row").innerHTML = `
    <div class="d-sm-flex justify-content-center justify-content-sm-between">
        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">${left}</span>
        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">${right}</span>
    </div>`;
}

// categories input tags
export const simpleTags = (element) => {

    if (!element) {
        throw new Error("DOM Element is undifined! Please choose HTML target element.")
    }

    let DOMParent = element
    let DOMList
    let DOMInput
    let dataAttribute
    let arrayOfList

    function DOMCreate() {
        let ul = document.createElement("ul")
        let input = document.createElement("input")

        input.setAttribute('placeholder', 'new category');

        DOMParent.appendChild(ul)
        DOMParent.appendChild(input)

        // first child is <ul>
        DOMList = DOMParent.firstElementChild
        // last child is <input>
        DOMInput = DOMParent.lastElementChild
    }

    function DOMRender() {
        // clear the entire <li> inside <ul>
        DOMList.innerHTML = ""

        // render each <li> to <ul>
        arrayOfList.forEach((currentValue, index) => {

            if (currentValue) {

                let li = document.createElement("li")
                li.innerHTML = `${currentValue} <a>&times;</a>`
                li.querySelector("a").addEventListener("click", function () {
                    onDelete(index)
                })

                DOMList.appendChild(li)
            }
        })

        setAttribute()
    }

    function onKeyUp() {
        DOMInput.addEventListener("keyup", function (event) {
            let text = this.value.trim()

            // check if ',' or 'enter' key was press
            if (text.includes(",") || event.keyCode === 13) {
                // check if empty text when ',' is remove
                if (text.replace(",", "") !== "") {
                    // push to array and remove ','
                    arrayOfList.push(text.replace(",", ""))
                }
                // clear input
                this.value = ""
            }

            DOMRender()
        })
    }

    function onDelete(id) {
        arrayOfList = arrayOfList.filter(function (currentValue, index) {
            if (index === id) {
                return false
            }
            return currentValue
        })

        DOMRender()
    }

    function getAttribute() {
        dataAttribute = DOMParent.getAttribute("data-simple-tags")
        dataAttribute = dataAttribute.split(",")

        // store array of data attribute in arrayOfList
        arrayOfList = dataAttribute.map((currentValue) => {
            return currentValue.trim()
        })
    }

    function setAttribute() {
        DOMParent.setAttribute("data-simple-tags", arrayOfList.toString())
    }

    getAttribute()
    DOMCreate()
    DOMRender()
    onKeyUp()
}

// html product list loader
export const productListContent = (__) => {

    return `
    <div class="container">

        <div class="d-flex justify-content-between bd-highlight mb-3">
            <nav class="bc" aria-label="breadcrumb"></nav>
            <button class="btn btn-primary btn-add" type="button">${ __('Add product') }</button>
        </div>
 
        <div class="row">
            <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
                <div class="card border-white shadow-sm">
                    <div class="card-body">
                        <div class="no-footer">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-borderless align-middle table-striped table-p-list" style="min-width: 800px;">
                                            <thead>
                                                
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 col-md-5">
                                <div class="dataTables_info mt-3 text-secondary fw-lighter" id="listing_info" role="status" aria-live="polite">&nbsp;</div>
                                </div>
                                <div class="col-sm-12 col-md-7">
                                <div class="dataTables_paginate paging_simple_numbers mt-3" id="listing_paginate"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

}

// html product list loader
export const productEditContent = (__) => {

    return `
    <div class="container p-edit">
        <div class="mb-3">
            <nav class="bc" aria-label="breadcrumb"></nav>
        </div>
        <div class="row">
            <div class="col-lg-9 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
                <div class="sections" id="sections" role="tablist" style="width:100%;">

                    <div class="row">
                    <div class="col-12 grid-margin stretch-card">
                        <div class="card border-white shadow-sm p-sm-3">
                        <div class="card-body">

                            <div class="landing_status"></div>
                            <input type="hidden" class="form-control" id="landing-slug" value="">

                            <h4 id="elan" class="card-title mb-4">Description</h4>

                            <div id="placeholders" >

                            <div class="mb-3">
                                <label class="banner-title-l form-label" for="p-title">Title</label>
                                <input type="text" class="form-control inp" id="p-title" placeholder="Sushi set..">
                                <p class="card-description">
                                <a target="_blank" style="float:right;margin-top:4px;display:none;" href="https://kenzap.com/post/kenzap-marketplace-listing-title-guidelines/">Title guidelines.</a>
                                </p>
                            </div>

                            <div class="mb-3">
                                <label class="banner-descshort-l form-label" for="p-sdesc">Short Description</label>
                                <textarea class="form-control inp" id="p-sdesc" placeholder="  " maxlength="120" rows="2"></textarea>
                            </div>

                            <div class="mb-3">
                                <label class="banner-descshort-l form-label" for="desc">Images</label>
                                <div class="clearfix"></div>
                                <div class="ic"></div>
                                <div class="clearfix"></div>
                            </div>

                            <div class="mb-3">
                                <div class="clearfix"></div>
                                <div style="clear:both;margin-top:16px;"></div>
                                <label class="banner-descshort-l form-label" for="p-desc">Description</label>
                                <textarea class="form-control inp" id="p-ldesc" placeholder=" " maxlength="2000" rows="10"></textarea>
                            </div>

                            <div class="mb-3 mw" >
                                <div class="list-wrapper">
                                <ul class="d-flex flex-column-reverse features">
                                </ul>
                                </div>
                                <p class="card-description"> </p>
                            </div>

                            <div class="bg-light price_group mt-3 mb-3 p-4">
                                <h4 class="card-title mb-3">Price</h4>
                                <div class="price_group_base">
                                <div class="mb-3 mw" >
                                    <div class="input-group">

                                        <div id="p-price-c">
                                            <label for="p-price" class="form-label">Price normal <span class="lang"></span></label>
                                            <div class="input-group">

                                            <span class="input-group-text">$</span>
                                            <input id="p-price" type="text" class="form-control inp" placeholder="55.00" autocomplete="off" >

                                            </div>
                                        </div>
                                        <div id="p-priced-c">
                                            <label for="p-priced" class="form-label">Discounted <span class="lang"></span></label>
                                            <input id="p-priced" type="text" class="form-control inp" placeholder="45.00" autocomplete="off" >
                                        </div>

                                    </div>
                                    <div class="add-mix-ctn"><a class="add-mix-block" href="#" data-action="add">+ add variation</a></div>
                                </div>

                                <div class="variation-blocks">

                                </div>

                                <div style='margin:24px 0 48px;border-bottom:0px solid #ccc;'></div>

                                <div class="mb-3 mw" >
                                    <h4 id="elan" class="card-title">Inventory</h4>
                                    <label for="p-sku" class="form-label">SKU <span class="lang"></span></label>
                                    <div class="input-group">
                                    <input id="p-sku" type="text" style="width:100%;" class="form-control inp" placeholder="" maxlength="200">
                                    <p class="card-description">
                                        SKU hint
                                    </p>
                                    </div>
                                </div>

                                </div>
                            </div>
                            </div>

                            <div class="desc-repeater-cont">

                            </div>

                            <p class="card-description"> &nbsp;</p>

                        </div>
                        </div>
                    </div>

                    </div>

                </div>
            </div>
            <div class="col-lg-3 grid-margin grid-margin-lg-0 grid-margin-md-0">

                <div class="row">
                <div class="col-12 grid-margin stretch-card">
                    <div class="card border-white shadow-sm p-sm-3">
                    <div class="card-body">

                        <h4 class="card-title" style="display:none;">General</h4>
                        <div class="landing_status"></div>
                        <input type="hidden" class="form-control" id="landing-slug" value="">

                        <h4 id="elan" class="card-title mb-4">Status</h4>
                        <div id="status-cont" class="mb-3">

                        <div class="col-sm-12">
                            <div class="form-check">
                            <label class="form-check-label status-publish form-label">
                                <input type="radio" class="form-check-input" name="p-status" id="p-status1" value="1" >
                                Published
                            </label>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="form-check">
                            <label class="form-check-label status-draft form-label">
                                <input type="radio" class="form-check-input" name="p-status" id="p-status0" value="0" >
                                Draft
                            </label>
                            </div>
                        </div>
                        </div>

                        <h4 id="elan" class="card-title mb-4">Categories</h4>
                        <div id="p-cats" class="simple-tags mb-4" data-simple-tags=""></div>
                        <div class="clearfix"> </div>

                        <div class="d-grid gap-2">
                        <button class="btn btn-primary btn-save" type="button">Save</button>
                        </div>

                    </div>
                    </div>
                </div>
                </div>

            </div>
            </div>
            </div>



            </div>
            </div>
            </div>


        <div class="modal p-modal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-primary"></button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
                </div>
            </div>
          </div>
        </div>
        
        <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center" >   
          <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
            <div class="d-flex">  
              <div class="toast-body"></div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        </div>
    `;
}

export const settingsContent = (__) => {

    return `
    <div class="container p-edit">
        <div class="d-flex justify-content-between bd-highlight mb-3">
            <nav class="bc" aria-label="breadcrumb"></nav>
            <button class="btn btn-primary btn-save" type="button">${ __('Save changes') }</button>
        </div>
        <div class="row">
            <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
              <div class="card border-white shadow-sm p-sm-3">
                <nav class="nav tab-content mb-4" role="tablist">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-link active" id="nav-notifications-link" data-bs-toggle="tab" data-bs-target="#nav-notifications" type="button" role="tab" aria-controls="nav-notifications" aria-selected="true" href="#">${ __('Notifications') }</a>
                        <a class="nav-link" id="nav-currency-link" data-bs-toggle="tab" data-bs-target="#nav-currency" type="button" role="tab" aria-controls="nav-currency" aria-selected="true" href="#">${ __('Currency') }</a>
                        <a class="nav-link" id="nav-payout-link" data-bs-toggle="tab" data-bs-target="#nav-payout" type="button" role="tab" aria-controls="nav-payout" aria-selected="true"  href="#">${ __('Payout') }</a>
                        <a class="nav-link" id="nav-tax-link" data-bs-toggle="tab" data-bs-target="#nav-tax" type="button" role="tab" aria-controls="nav-tax" aria-selected="true"  href="#">${ __('Tax') }</a>
                    </div>
                </nav>
                <div class="card-body tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-notifications" role="tabpanel" aria-labelledby="nav-notifications-link">
                    <h4 id="gen" class="card-title mb-4">${ __('Notification settings') }</h4>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('New order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_new_order" class="form-control inp" name="notify_new_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_new_order_emails" type="text" class="form-control inp" name="notify_new_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Cancelled order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_cancel_order" class="form-control inp" name="notify_cancel_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_cancel_order_emails" type="text" class="form-control inp" name="notify_cancel_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Processing order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_proc_order" class="form-control inp" name="notify_proc_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_proc_order_emails" type="text" class="form-control inp" name="notify_proc_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Refunded order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_refunded_order" class="form-control inp" name="notify_refunded_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_refunded_order_emails" type="text" class="form-control inp" name="notify_refunded_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Refunded order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_completed_order" class="form-control inp" name="notify_completed_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_completed_order_emails" type="text" class="form-control inp" name="notify_completed_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>

                    <br>
                    <hr>
                    <br>
                    <br>
                    </div>
                    <div class="tab-pane fade" id="nav-currency" role="tabpanel" aria-labelledby="nav-currency-link">
                    <h4 id="gen" class="card-title mb-4">${ __('Currency settings') }</h4>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Currency') }</label>
                          <div class="col-sm-9">
                            <select id="currency" class="form-control inp" name="currency" data-type="select">
                              <?php include('inc/select-currencies.php'); ?>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Currency symbol') }</label>
                          <div class="col-sm-9">
                            <input id="currency_symb" type="text" class="form-control inp" name="currency_symb" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Currency position') }</label>
                          <div class="col-sm-9">
                            <select id="currency_symb_loc" class="form-control inp" name="currency_symb_loc" data-type="select">
                              <option value="left">${ __('Left') }</option>
                              <option value="right">${ __('Right') }</option>
                              <option value="left_space">${ __('Left with space') }</option>
                              <option value="right_space">${ __('Right with space') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">

                      </div>
                    </div>

                    <br>
                    <hr>
                    <br>
                    <br>
                    </div>
                    <div class="tab-pane fade" id="nav-tax" role="tabpanel" aria-labelledby="nav-tax-link">
                    <h4 id="tax" class="card-title mb-4">${ __('Your tax informatio') }</h4>
                    <p class="card-description"> ${ __('Invoice info (this information will be not revealed public)') } </p>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Tax ID') }</label>
                          <div class="col-sm-9">
                            <input id="vat" type="text" class="form-control inp" name="vat" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Email') }</label>
                          <div class="col-sm-9">
                            <input id="email" type="email" class="form-control inp" name="email" data-type="email">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Company') }</label>
                          <div class="col-sm-9">
                            <input id="company" type="text" class="form-control inp inp" name="company" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Type') }</label>
                          <div class="col-sm-4">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input inp" name="entity_type" id="entity_type" value="individual" data-type="radio">
                                ${ __('Individual') }
                                <i class="input-helper"></i></label>
                            </div>
                          </div>
                          <div class="col-sm-5">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input inp" name="entity_type" id="entity_type" value="business" data-type="radio">
                                ${ __('Business') }
                                <i class="input-helper"></i></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-description">
                        ${ __('Address') }
                    </p>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label"> ${ __('Address 1') }</label>
                          <div class="col-sm-9">
                            <input id="addr1" type="text" class="form-control inp" name="addr1" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('State') }</label>
                          <div class="col-sm-9">
                            <input id="state" type="text" class="form-control inp" name="state" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Address 2') }</label>
                          <div class="col-sm-9">
                            <input id="addr2" type="text" class="form-control inp" name="addr2" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Postcode') }</label>
                          <div class="col-sm-9">
                            <input id="post" type="text" class="form-control inp" name="post" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('City') }</label>
                          <div class="col-sm-9">
                            <input id="city" type="text" class="form-control inp" name="city" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Country') }</label>
                          <div class="col-sm-9">
                            <select id="country" class="form-control inp" name="country" data-type="select">
                              <?php include('inc/select-countries.php'); ?>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <br>
                    <hr>
                    <br>
                    <br>
                    </div>
                    <div class="tab-pane fade" id="nav-payout" role="tabpanel" aria-labelledby="nav-payout-link">
                    <h4 id="payout" class="card-title mb-4" title="payouts">${ __('Payout data') }</h4>
                    <p class="card-description">${ __('This information is used to process your earnings as part of Kenzap Affiliate or Kenzap Designing programs.') }</p>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Bank account holder\'s name') }</label>
                          <div class="col-sm-9">
                            <input id="y1" type="text" class="form-control inp" name="y1" minlength="2" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('IBAN/Account Nr.') }</label>
                          <div class="col-sm-9">
                            <input id="y2" type="text" class="form-control inp" name="y2" minlength="2" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('SWIFT Code') }</label>
                          <div class="col-sm-9">
                            <input id="y3" type="text" class="form-control inp" name="y3" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Bank name') }</label>
                          <div class="col-sm-9">
                            <input id="y4" type="text" class="form-control inp" name="y4" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Bank branch city') }</label>
                          <div class="col-sm-9">
                            <input id="y5" type="text" class="form-control inp" name="y5" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Bank branch country') }</label>
                          <div class="col-sm-9">
                            <select id="y6" class="form-control inp" name="y6" data-type="select">
                              <?php include('inc/countries.php'); ?>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>

                </div>
              </div>
            </div>
        </div>
    </div>
    
    <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center" >   
      <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
        <div class="d-flex">  
          <div class="toast-body"></div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
    `;
}

export const homeContent = (__) => {

    return `
        <div class="container p-edit">
            <div class="d-flex justify-content-between bd-highlight mb-3">
                <nav class="bc" aria-label="breadcrumb"></nav>
                
            </div>
            <div class="row">
                <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
                    <div class="card border-white shadow-sm p-sm-3">
                        <nav class="nav flex-column">
                            <a class="nav-link active fs-4" aria-current="page" href="/product-list/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list-stars me-3" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"></path>
                            <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z"></path>
                            </svg>Product list</a>

                            <hr>
                                               
                            <a class="nav-link fs-4" href="/orders/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart-check mb-1 me-3" viewBox="0 0 16 16">
                            <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                            </svg>Orders</a>

                            <hr>
                                                
                            <a class="nav-link fs-4" href="/settings/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-gear mb-1 me-3" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"></path>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"></path>
                            </svg>Settings</a>

                            <hr>
                                                
                            <a class="nav-link fs-4 disabled" href="/analytics/" tabindex="-1" aria-disabled="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-graph-up me-3" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"></path>
                            </svg>Analytics</a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export const ordersContent = (__) => {

    return `
      <div class="container ec-orders">
        <div class="d-flex justify-content-between bd-highlight mb-3">
            <nav class="bc" aria-label="breadcrumb"></nav>
        </div>
        <div class="row">
          <div class="col-md-12 page-title">
            <div class="st-opts st-table mb-3 dropdown">
                <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="order-status" data-id="status" data-value="all" data-bs-toggle="dropdown" aria-expanded="false">
                  All
                </a>
                <ul class="dropdown-menu" aria-labelledby="order-status">
                  <li><a class="dppi dropdown-item" data-key="" href="#" >All</a></li>
                  <li><a class="dppi dropdown-item" data-key="new" href="#" >New</a></li>
                  <li><a class="dppi dropdown-item" data-key="processing" href="#" >Processing</a></li>
                  <li><a class="dppi dropdown-item" data-key="completed" href="#" >Completed</a></li>
                  <li><a class="dppi dropdown-item" data-key="canceled" href="#" >Canceled</a></li>
                  <li><a class="dppi dropdown-item" data-key="failed" href="#" >Failed</a></li>
                </ul>
            </div>
            <div class="st-opts" >
              <div class="input-group-sm mb-0 justify-content-start" >
                <input id="usearch" type="text" class="inp form-control" placeholder="${ __('Search order') }">
              </div>
              <!-- <a id="viewSum" href="#" style="margin-left:16px;">view summary</a> -->
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
            <div class="card border-white shadow-sm">
              <div class="card-body">
 
                <div class="table-responsive">
                  <table class="table table-hover table-borderless align-middle table-striped table-p-list">
                    <thead>
                      <tr>

                        <th>From</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Time</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody class="list">

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal order-modal" tabindex="-1">
        <div class="modal-dialog ">
          <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary"></button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
              </div>
          </div>
        </div>
      </div>

      <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center" >   
        <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
          <div class="d-flex">  
            <div class="toast-body"></div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    `;
}
