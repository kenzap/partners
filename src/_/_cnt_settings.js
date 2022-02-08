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