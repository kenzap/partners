// js dependencies
import { getSiteId, getCookie, parseApiError, onClick, initBreadcrumbs, toast, link, timeConverter } from "../_/_helpers.js"
import { showLoader, hideLoader, initHeader, initFooter } from "../_/_ui.js"
import { homeContent } from "../_/_cnt_home.js"

// where everything happens
const _this = {

    state: {
        firstLoad: true,
        response: null,
        responseSingle: null,
        query:{
            by_country: {
                type:       'find',
                key:        'analytics',
                fields:     ['cc'],
                count:      ['cc'],
                term:{
                    field:  'created',
                    relation:'>',
                    type:   'numeric',
                    value:  (Math.floor(Date.now() / 1000)) - 60 * 60 * 24 * 30 // last 30 days
                },
                groupby: [
                    {
                        field: 'cc'
                    }
                ],
                sortby: {
                    field: 'cc_count',
                    order: 'DESC'
                },
                offset: 0,
                limit:  300
            },
            by_sessions: {
                type:       'find',
                key:        'analytics',
                fields:     ['ymd'],
                count:      ['ymd'],
                term:[
                    {
                        field:  'created',
                        relation:'>',
                        type:   'numeric',
                        value:  (Math.floor(Date.now() / 1000)) - 60 * 60 * 24 * 30  // last 30 days
                    },
                    {
                        field:  'tag',
                        relation:'=',
                        type:   'string',
                        value:   'session:5s'
                    },
                ],
                groupby: [
                    {
                        field: 'ymd'
                    }
                ],
                sortby: {
                    field: 'ymd_count',
                    order: 'DESC'
                },
                offset: 0,
                limit:  31
            },
            by_all: {
                type:       'find',
                key:        'analytics',
                fields:     ['ymd'],
                count:      ['ymd'],
                term:[
                    {
                        field:  'created',
                        relation:'>',
                        type:   'numeric',
                        value:  (Math.floor(Date.now() / 1000)) - 60 * 60 * 24 * 30  // last 30 days
                    }
                ],
                groupby: [
                    {
                        field: 'ymd'
                    }
                ],
                sortby: {
                    field: 'ymd_count',
                    order: 'DESC'
                },
                offset: 0,
                limit:  31
            },
            by_device: {
                type:       'find',
                key:        'analytics',
                fields:     ['device'],
                count:      ['device'],
                term:{
                    field:  'created',
                    relation:'>',
                    type:   'numeric',
                    value: (Math.floor(Date.now() / 1000)) - 60 * 60 * 24 * 30  // last 30 days
                },
                groupby: [
                    {
                        field: 'device'
                    }
                ],
                sortby: {
                    field: 'device_count',
                    order: 'DESC'
                },
                offset: 0,
                limit:  300
            },
            top_views: {
                type:       'find',
                key:        'analytics',
                fields:     ['url','tid'],
                count:      ['tid'],
                term:{
                    field:  'created',
                    relation:'>',
                    type:   'numeric',
                    value:  (Math.floor(Date.now() / 1000)) - 60 * 60 * 24 * 30  // last 30 days
                },
                groupby: [
                    {
                        field: 'tid'
                    }
                ],
                sortby: {
                    field: 'tid_count',
                    order: 'DESC'
                },
                offset: 0,
                limit:  5
            },
        },
        formatter: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: "USD",
        }),
        modalCont: null,
    },
    init: () => {
        
        _this.getData(); 
    },
    getData: () => {

        // show loader during first load
        if (_this.state.firstLoad) showLoader();

        // do API query
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/plain',
                'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
                'Kenzap-Header': localStorage.hasOwnProperty('header'),
                'Kenzap-Token': getCookie('kenzap_token'),
                'Kenzap-Sid': getSiteId(),
            },
            body: JSON.stringify({
                query: {
                    user: {
                        type:       'authenticate',
                        fields:     ['avatar'],
                        token:      getCookie('kenzap_token')
                    },
                    locale: {
                        type:       'locale',
                        id:         getCookie('lang')
                    },
                    by_country: _this.state.query.by_country,
                    by_sessions: _this.state.query.by_sessions,
                    by_all: _this.state.query.by_all,
                    by_device: _this.state.query.by_device,
                    top_views: _this.state.query.top_views,
                    dashboard: {
                        type:       'dashboard',
                    }
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            // hide UI loader
            hideLoader();

            if(response.success){

                _this.getStats();

                // init header
                initHeader(response);

                // get core html content 
                _this.loadHomeStructure();  

                // render table
                _this.renderPage(response);

                // bind content listeners
                _this.initListeners();
            
                // initiate footer
                _this.initFooter();

                // first load
                _this.state.firstLoad = false;

                // cache results
                _this.state.response = response;

            }else{

                parseApiError(response);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },
    getDataSingle: (query, cb) => {

        showLoader();

        // do API query
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/plain',
                'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
                'Kenzap-Header': localStorage.hasOwnProperty('header'),
                'Kenzap-Token': getCookie('kenzap_token'),
                'Kenzap-Sid': getSiteId(),
            },
            body: JSON.stringify({
                query: query
            })
        })
        .then(response => response.json())
        .then(response => {

            // hide UI loader
            hideLoader();

            if(response.success){

                _this.state.responseSingle = response;

                cb.call();

            }else{

                parseApiError(response);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },
    getStats: () => {

        // init params
        let ym = '2022-01';
        let params = new URLSearchParams();
        params.append("cmd", "get_affiliate_stats");
        params.append("ym", ym);
        params.append("token", getCookie('kenzap_token'));

        // do API query
        fetch('https://api.kenzap.com/v1/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/x-www-form-urlencoded',
            },
            body: params
        })
        .then(response => response.json())
        .then(response => {

            if(response.success){

                // map with stats
                document.querySelector("#c_count").innerHTML = response.total_clients;
                document.querySelector("#e_total").innerHTML = _this.state.formatter.format(response.total_amount/100);
                document.querySelector("#e_total_p").innerHTML = _this.state.formatter.format(response.balance);
    
                // load coupons and referrals
                if(typeof(response.referrals) !== 'undefined') _this.loadReferrals(response.time, response.referrals);

            }else{

                parseApiError(response);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },
    renderPage: (response) => {

        let d = document;
        let html = '';

        html += `
        <div class="col-lg-4 grid-margin stretch-card mb-3">
            <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >
                <div class="card-body">
                    <h6 class="card-title mb-3">${ __('Transactions') }</h6>
                    <div class="d-flex flex-row bd-highlight">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-people text-primary" viewBox="0 0 16 16">
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                        </svg>
                        <div class="mr-4 mr-md-0 mr-lg-4 ms-3 text-left text-lg-left">
                            <h4 id="c_count" class="card-title mb-0"></h4>
                            <p class="text-muted">${ __('Total number of successfull financial transactions.') }</p> 
                        </div>
                    </div>    
                </div>
                <div class="card-footer">
                    <a href="#" class="bt float-end text-uppercase view-invoices" data-bs-toggle="modal" data-bs-target=".modal">${ __('View invoices') }</a>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>`;

        html += `
        <div class="col-lg-4 grid-margin stretch-card mb-3">
            <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >
                <div class="card-body">
                    <h6 class="card-title mb-3">${ __('Total earned') }</h6>
                    <div class="d-flex flex-row bd-highlight">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-piggy-bank text-primary" viewBox="0 0 16 16">
                            <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z"/>
                            <path fill-rule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="d-none bi bi-bank text-primary" viewBox="0 0 16 16">
                            <path d="M8 .95 14.61 4h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.379l.5 2A.5.5 0 0 1 15.5 17H.5a.5.5 0 0 1-.485-.621l.5-2A.5.5 0 0 1 1 14V7H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 4h.89L8 .95zM3.776 4h8.447L8 2.05 3.776 4zM2 7v7h1V7H2zm2 0v7h2.5V7H4zm3.5 0v7h1V7h-1zm2 0v7H12V7H9.5zM13 7v7h1V7h-1zm2-1V5H1v1h14zm-.39 9H1.39l-.25 1h13.72l-.25-1z"/>
                        </svg>
                        <div class="mr-4 mr-md-0 mr-lg-4 ms-3 text-left text-lg-left">
                            <h4 id="e_total" class="card-title mb-0"></h4>
                            <p class="text-muted">${ __('Total all time earned amount calculated in USD.') }</p> 
                        </div>
                    </div>    
                </div>
                <div class="card-footer">
                    <a href="mailto:finance@kenzap.com" class="bt float-end text-uppercase " >${ __('help?') }</a>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>`;

        html += `
        <div class="col-lg-4 grid-margin stretch-card mb-3">
            <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >
                <div class="card-body">
                    <h6 class="card-title mb-3">${ __('Pending payout') }</h6>
                    <div class="d-flex flex-row bd-highlight">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-clock-history text-primary" viewBox="0 0 16 16">
                            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                        <div class="mr-4 mr-md-0 mr-lg-4 ms-3 text-left text-lg-left">
                            <h4 id="e_total_p" class="card-title mb-0 p"></h4>
                            <p class="text-muted">${ __('This and last month earnings pending payout.') }</p> 
                        </div>
                    </div>    
                </div>
                <div class="card-footer">
                    <a href="#" class="bt float-end text-uppercase view-summary">${ __('Summary') }</a>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>`;



        html += `
        <div class="col-lg-4 grid-margin stretch-card mb-3">
            <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >
                <div class="card-body">
                    <h6 class="card-title mb-3">${ __('Views by country') }</h6>
                    <div id="geo-chart"></div>      
                </div>
                <div class="card-footer">
                    <p class="text-muted float-start mb-0 mt-0">${ __('Last 30 days') }</p>
                    <a href="#" class="bt float-end text-uppercase geo-chart-custom" data-bs-toggle="modal" data-bs-target=".modal">${ __('Customize') }</a>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>`;

        html += `
        <div class="col-lg-4 grid-margin stretch-card mb-3">
            <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >
                <div class="card-body">
                    <h6 class="card-title mb-3">${ __('User sessions') }</h6>
                    <div id="content-chart"></div>  
                </div>
                <div class="card-footer">
                    <p class="text-muted float-start mb-0 mt-0">${ __('Last 30 days') }</p>
                    <a href="#" class="bt float-end text-uppercase content-chart-custom" data-bs-toggle="modal" data-bs-target=".modal">${ __('Customize') }</a>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>`;        
        
        html += `
        <div class="col-lg-4 grid-margin stretch-card mb-3">
            <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >
                <div class="card-body">
                    <h6 class="card-title mb-3">${ __('Device breakdown') }</h6>
                    <div id="pie-chart"></div>               
                </div>
                <div class="card-footer">
                    <p class="text-muted float-start mb-0 mt-0">${ __('Last 30 days') }</p>
                    <a href="#" class="bt float-end text-uppercase pie-chart-custom" data-bs-toggle="modal" data-bs-target=".modal">${ __('Customize') }</a>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>`;



        html += `
        <div class="col-lg-4 grid-margin stretch-card mb-3">
            <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >
                <div class="card-body">
                    <h6 class="card-title mb-3">${ __('Top content') }</h6>
                    <div id="top-views"></div>               
                </div>
                <div class="card-footer">
                    <p class="text-muted float-start mb-0 mt-0">${ __('Last 30 days') }</p>
                    <a href="#" class="bt float-end text-uppercase top-views-custom" data-bs-toggle="modal" data-bs-target=".modal">${ __('Customize') }</a>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>`;

        html += `
        <div class="col-lg-4 grid-margin stretch-card mb-3">
            <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >
                <div class="card-body">
                    <h6 class="card-title mb-3">${ __('Coupons') }</h6>
                    <div id="coupons"></div>               
                </div>
                <div class="card-footer">
                    <a target="_blank" class="float-start" href="https://kenzap.com/post/kenzap-affiliate-program-getting-started" class="bt">${ __('Help') }</a>
                    <a target="_blank" class="float-end add-coupon" href="#" class="bt">${ __('+ coupon') }</a>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>`;

        html += `
        <div class="col-lg-4 grid-margin stretch-card mb-3">
            <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >
                <div class="card-body">
                    <h6 class="card-title mb-3">${ __('Link Referrals') }</h6>
                    <div id="referrals"></div>               
                </div>
                <div class="card-footer">
                    <a target="_blank" class="float-start" href="https://kenzap.com/post/kenzap-affiliate-program-getting-started" class="bt">${ __('Help') }</a>
                    <a target="_blank" class="float-end add-referral" href="#" class="bt">${ __('+ referral') }</a>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>`;

        d.querySelector(".dash-menu .row").innerHTML = html;


        d.querySelector(".dash-menu .row").innerHTML = html;

        _this.drawByCountry(response, '#geo-chart');

        _this.drawByDevice(response, '#pie-chart');

        _this.drawBySessions(response, '#content-chart');

        _this.drawTopViews(response, '#top-views');

        // initiate breadcrumbs
        initBreadcrumbs(
            [
                { link: link('https://dashboard.kenzap.cloud'), text: __('Dashboard') },
                { text: __('Partners Analytics') }
            ]
        );
    },
    loadReferrals: (time, list) => {

        let htmlc = '';
        let htmlr = '';
        for (var i in list) {

            if(list[i].type==1){

                htmlc +='\
                <tr>\
                    <td class="py-1 pl-0">\
                        <div class="d-flex align-items-center">\
                            <div class="mt-1 mb-1">\
                                <p class="mb-0">'+list[i].coupon+' <a target="_blank" href="https://api.kenzap.com/v1/?cmd=get_affiliate_summary&ida='+list[i].id+'&ym=" data-id="'+list[i].id+'" title="View statistics" style="color:#9b9b9b;font-size:16px;" class="mdi mdi-trending-up menu-icon ref-stats"></a></p>\
                                <p class="mb-0 text-muted text-small">'+list[i].desc+' <a target="_blank" href="#" data-id="'+list[i].id+'" data-desc="'+list[i].desc+'" style="color:#9b9b9b;font-size:16px;" class="mdi mdi-pencil menu-icon ref-desc"></a></p>\
                            </div>\
                        </div>\
                    </td>\
                    <td>\
                        '+_this.getBadge(time, list[i].until)+'\
                    </td>\
                    <td>\
                        <a class="text-secondary" href="https://account.kenzap.com/profile/" id="ref-menu-'+i+'" data-bs-toggle="dropdown" aria-expanded="false">\
                            <svg data-id="'+list[i].id+'"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical menu-icon po" viewBox="0 0 16 16">\
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\
                            </svg>\
                        </a>\
                        <ul class="dropdown-menu dropdown-menu-end" data-popper-placement="left-start" aria-labelledby="ref-menu-'+i+'">\
                            <li><a class="dropdown-item ref-menu" data-type="view" data-id="'+list[i].id+'" href="https://dashboard.kenzap.cloud/">' + __('View stats') + '</a></li>\
                            <li><a class="dropdown-item ref-menu" data-type="edit" data-id="'+list[i].id+'" data-desc="'+list[i].desc+'" href="https://account.kenzap.cloud/profile/">' + __('Edit') + '</a></li>\
                            <li><hr class="dropdown-divider"></li>\
                            <li><a class="dropdown-item ref-menu" data-type="remove" data-id="'+list[i].id+'" href="#">' + __('Remove') + '</a></li>\
                        </ul>\
                    </td>\
                </tr>';
            }else{

                htmlr +='\
                <tr>\
                    <td class="py-1 pl-0">\
                        <div class="d-flex align-items-center">\
                            <div class="mt-1 mb-1">\
                                <p class="mb-0">'+list[i].id+' <a target="_blank" href="https://api.kenzap.com/v1/?cmd=get_affiliate_summary&ida='+list[i].id+'&ym=" data-id="'+list[i].id+'" title="View statistics" style="color:#9b9b9b;font-size:16px;" class="mdi mdi-trending-up menu-icon ref-stats"></a></p>\
                                <p class="mb-0 text-muted text-small">'+list[i].desc+' <a target="_blank" href="#" data-id="'+list[i].id+'" data-desc="'+list[i].desc+'" style="color:#9b9b9b;font-size:16px;" class="mdi mdi-pencil menu-icon ref-desc"></a></p>\
                            </div>\
                        </div>\
                    </td>\
                    <td>\
                        <label class="badge bg-success">' + __('Active') + '</label>\
                    </td>\
                    <td>\
                        <a class="text-secondary" href="https://account.kenzap.com/profile/" id="ref-menu-'+i+'" data-bs-toggle="dropdown" aria-expanded="false">\
                            <svg data-id="'+list[i].id+'"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical menu-icon po" viewBox="0 0 16 16">\
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\
                            </svg>\
                        </a>\
                        <ul class="dropdown-menu dropdown-menu-end" data-popper-placement="left-start" aria-labelledby="ref-menu-'+i+'">\
                            <li><a class="dropdown-item ref-menu" data-type="view" data-id="'+list[i].id+'" href="https://dashboard.kenzap.cloud/">' + __('View stats') + '</a></li>\
                            <li><a class="dropdown-item ref-menu" data-type="edit" data-id="'+list[i].id+'" data-desc="'+list[i].desc+'" href="https://account.kenzap.cloud/profile/">' + __('Edit') + '</a></li>\
                            <li><hr class="dropdown-divider"></li>\
                            <li><a class="dropdown-item ref-menu" data-type="remove" data-id="'+list[i].id+'" href="#">' + __('Remove') + '</a></li>\
                        </ul>\
                    </td>\
                </tr>';
            }
        }

        if (htmlc == ''){ document.querySelector("#coupons").innerHTML = '<div class="col-12 results">' + __('No coupons to display') + '</div>'; } else { document.querySelector("#coupons").innerHTML = '<div class="table-responsive table-nav"><table class="table table-hover table-borderless align-middle table-p-list">'+htmlc+'</table></div>'; }
        if (htmlr == ''){ document.querySelector("#referrals").innerHTML = '<div class="col-12 results">' + __('No referral codes to display') + '</div>'; } else { document.querySelector("#referrals").innerHTML = '<div class="table-responsive table-nav"><table class="table table-hover table-borderless align-middle table-p-list">'+htmlr+'</table></div>'; }

        onClick('.ref-menu', _this.listeners.referrals);
    },
    getBadge: (time, until) => {

        if(time>until){
          return '<label class="badge bg-danger">Expired</label>';
        }
    
        if(time<until){
          return '<label class="badge bg-success" title="Valid till '+(new Date(until * 1000).toLocaleDateString())+'">Active</label>';
        }
    },
    drawByDevice: (response, cont) => {

        if(response['by_country'] == null) return;

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
  
        let dataArr = [[__('Country'), __('Visits')]];
        response['by_device'].forEach( el => { dataArr.push([el.device, el.device_count]); });

        function drawChart() {
  
          var data = google.visualization.arrayToDataTable(dataArr);
          var options = {
            // title: 'My Daily Activities',
            legend: { position: 'bottom' }
          };
  
          var chart = new google.visualization.PieChart(document.querySelector(cont));
  
          chart.draw(data, options);
        }
    },
    drawBySessions: (response, cont) => {
        
        if(response['by_sessions'] == null) return;

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(() => {
            
            let dataArr = [[__('Day'), __('Sessions'), __('All interactions')]];
            let resall = response['by_sessions'].concat(response['by_all']);
 
            let i = 0;
            while(i < resall.length){

                let ymd = response['by_sessions'][i] != null ? response['by_sessions'][i].ymd : resall[i].ymd;
                let c1 = response['by_sessions'][i] != null ? response['by_sessions'][i].ymd_count : resall[i].ymd_count;
                let c2 = response['by_all'][i] != null ? response['by_all'][i].ymd_count : resall[i].ymd_count;
                
                dataArr.push([ymd, c1, c2]);

                i++;
                // dataArr.push([el.ymd, el.ymd_count, el.ymd_coun, response['by_all'][i].ymd_count]); i++;

            }
            
            let data = google.visualization.arrayToDataTable(dataArr);

            // var data = google.visualization.arrayToDataTable([
            //     ['Year', 'Sales', 'Expenses'],
            //     ['2004',  1000,      400],
            //     ['2005',  1170,      460],
            //     ['2006',  660,       1120],
            //     ['2007',  1030,      540]
            // ]);
    
            let options = {
                // title: 'User Activity',
                curveType: 'function',
                legend: { position: 'bottom' }
         
            };
    
            let chart = new google.visualization.LineChart(document.querySelector(cont));

            chart.draw(data, options);
        });
    },
    drawByCountry: (response, cont) => {
        
        if(response['by_country'] == null) return;

        google.charts.load('current', { 'packages':['geochart'], });
        google.charts.setOnLoadCallback(drawRegionsMap);
    
        let dataArr = [[__('Country'), __('Visits')]];
        response['by_country'].forEach( el => { dataArr.push([el.cc, el.cc_count]); });

        function drawRegionsMap() {

            var data = google.visualization.arrayToDataTable(dataArr);
            var options = {};
            var chart = new google.visualization.GeoChart(document.querySelector(cont));
            chart.draw(data, options);
        }
    },
    drawTopViews: (response, cont) => {

        if(response['top_views'] == null) return;

        let html = `
        <div class="table-responsive table-nav">
            <table class="table table-hover table-borderless align-middle table-striped table-p-list">
                <thead>
                    <tr>
                        <th>${ __('Link') }</th>
                        <th>${ __('Views') }</th>
                    </tr>
                </thead>
                <tbody class="list">`;

                response['top_views'].map( el => {
                    html += `
                        <tr>
                            <td>
                                <a href="${ el.url }" target="_blank">${ el.url.replace('https://','') }</a>
                            </td>
                            <td>
                                <b>${ el.tid_count }</b>
                            </td>
                        </tr>`;
                    });

                html += `  
                </tbody>
            </table>
        </div>`;

        document.querySelector(cont).innerHTML = html;
    },
    initListeners: () => {

        // prevents reinitializing listeners twice
        if(!_this.state.firstLoad) return;

        // modal success button
        onClick('.modal .btn-primary', _this.listeners.modalSuccessBtn);

        onClick('.view-invoices', _this.listeners.viewInvoices);

        onClick('.view-summary', _this.listeners.viewSummary);
        
        onClick('.geo-chart-custom', _this.listeners.geoChartCustom);

        onClick('.content-chart-custom', _this.listeners.contentChartCustom);

        onClick('.pie-chart-custom', _this.listeners.pieChartCustom);

        onClick('.top-views-custom', _this.listeners.topViewsCustom);

        onClick('.add-coupon', _this.listeners.addCoupon);

        onClick('.add-referral', _this.listeners.addReferral);
    },
    // TODO
    listeners: {

        referrals: (e) => {

            e.preventDefault();
            
            let id = e.currentTarget.dataset.id;
            switch(e.currentTarget.dataset.type){

                case 'view': 

                    window.open("https://api.kenzap.com/v1/?cmd=get_affiliate_summary&ida="+id+"&ym=", "_blank");
                    
                break;
                case 'edit': 

                    let modal = document.querySelector(".modal");
                    _this.state.modalCont = new bootstrap.Modal(modal);
         
                    let desc = e.currentTarget.dataset.desc;

                    let html = `
                    <div class="form-group">\
                        <label for="minput2" class=" ">${ __('Description') }</label>\
                        <textarea id="minput2" rows="3" class="form-control" id="disp-text">${ desc }</textarea>\
                        <p class="text-muted">${ __('Ex.: For posts under facebook groups') }</p>\
                    </div>`;
        
                    modal.querySelector(".modal-dialog").classList.remove("modal-fullscreen");
                    modal.querySelector(".modal-title").innerHTML = __('Update referral details');
                    modal.querySelector(".btn-primary").style.display = 'block';
                    modal.querySelector(".btn-primary").innerHTML = __('Update');
                    modal.querySelector(".btn-secondary").innerHTML = __('Close');
                    modal.querySelector(".modal-body").innerHTML = html;

                    _this.state.modalCont.show();

                    _this.listeners.modalSuccessBtnFunc = (e) => {
        
                        let minput2 = document.querySelector("#minput2").value;
                        if(minput2.length<2){ alert("Please provide a description"); e.preventDefault(); return false; }
                
                        // init params
                        let params = new URLSearchParams();
                        params.append("cmd", "update_coupon");
                        params.append("id", id);
                        params.append("p1", minput2);
                        params.append("token", getCookie('kenzap_token'));

                        // do API query
                        fetch('https://api.kenzap.com/v1/', {
                            method: 'post',
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/x-www-form-urlencoded',
                            },
                            body: params
                        })
                        .then(response => response.json())
                        .then(response => {

                            if(response.success){

                                _this.getStats();

                                toast(__('Changes applied'))

                            }else{

                                parseApiError(response);
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                        
                        
                        _this.state.modalCont.hide();
                    }

                break;
                case 'remove': 
                
                    let c = confirm(__("Are you sure you want to permanently remove this code and its related statistics?"));
                    if(c){
                        
                        // init params
                        let params = new URLSearchParams();
                        params.append("cmd", "remove_coupon");
                        params.append("id", id);
                        params.append("token", getCookie('kenzap_token'));

                        // do API query
                        fetch('https://api.kenzap.com/v1/', {
                            method: 'post',
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/x-www-form-urlencoded',
                            },
                            body: params
                        })
                        .then(response => response.json())
                        .then(response => {

                            if(response.success){

                                _this.getStats();

                                toast(__('Successfully removed'));

                            }else{

                                parseApiError(response);
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    }
                break;
            }
        },
        addCoupon: (e) => {

            e.preventDefault();
  
            let modal = document.querySelector(".modal");
            _this.state.modalCont = new bootstrap.Modal(modal);
 
            let html = `
                <div class="form-group">
                  <label for="minput1" class="form-label">${ __('Coupon Name') }</label>
                  <input id="minput1" type="text" maxlength="16" minlength="6" class="form-control" onkeyup="this.value = this.value.toUpperCase();">
                  <p class="text-muted">${ __('Ex.: KENZAPSALE2020') }</p>
                  <br>
                  <label for="minput2" class="form-label">${ __('Description') }</label>
                  <textarea id="minput2" rows="1" class="form-control" id="disp-text"></textarea>
                  <p class="text-muted">${ __('Ex.: For posts under facebook groups') }</p>
                  <br>
                  <label for="minput3" class="form-label">Validity</label>
                  <select id="minput3" name="minput3" style="width:100%;padding:8px;border-color:#e9e8ef;">
                    <option value="2592000">${ __('1 month') }</option>
                    <option value="7776000">${ __('3 months') }</option>
                    <option value="15552000">${ __('6 months') }</option>
                    <option value="31104000">${ __('12 months') }</option>
                    <option value="46656000">${ __('18 months') }</option>
                  </select>
                  <p class="text-muted">${ __('Period after which coupon expires.') }</p>
                </div>`;

            modal.querySelector(".modal-dialog").classList.remove("modal-fullscreen");
            modal.querySelector(".modal-title").innerHTML = __('Create New Coupon');
            modal.querySelector(".btn-primary").style.display = 'block';
            modal.querySelector(".btn-primary").innerHTML = __('Create');
            modal.querySelector(".btn-secondary").innerHTML = __('Close');
            modal.querySelector(".modal-body").innerHTML = html;

            _this.state.modalCont.show();

            _this.listeners.modalSuccessBtnFunc = (e) => {
        
                let minput1 = document.querySelector("#minput1").value;;
                if(minput1.length<6){ alert( __("Please provide a longer coupon name") ); e.preventDefault(); return false; }
        
                let minput2 = document.querySelector("#minput2").value;
                if(minput2.length<2){ alert( __("Please provide a description") ); e.preventDefault(); return false; }
        
                // init params
                let params = new URLSearchParams();
                params.append("cmd", "create_coupon");
                params.append("p0", minput1);
                params.append("p1", minput2);
                params.append("p2", document.querySelector("#minput3").value);
                params.append("p3", 1);
                params.append("token", getCookie('kenzap_token'));

                // do API query
                fetch('https://api.kenzap.com/v1/', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/x-www-form-urlencoded',
                    },
                    body: params
                })
                .then(response => response.json())
                .then(response => {

                    if(response.success){

                        _this.getStats();

                        toast(__('New coupon added succesfully'))
                        
                    }else{

                        parseApiError(response);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                
                
                _this.state.modalCont.hide();
            }
        },
        addReferral: (e) => {

            e.preventDefault();
  
            let modal = document.querySelector(".modal");
            _this.state.modalCont = new bootstrap.Modal(modal);
 
            let html = `
            <div class="form-group">
                <label for="minput2" class=" ">${ __('Description') }</label>
                <textarea id="minput2" rows="2" class="form-control" id="disp-text"></textarea>
                <p class="text-muted">${ __('Ex.: For posts under facebook groups. Referral ID is generated automatically by the system.') }</p>
            </div>`;

            modal.querySelector(".modal-dialog").classList.remove("modal-fullscreen");
            modal.querySelector(".modal-title").innerHTML = __('Create Referral Code');
            modal.querySelector(".btn-primary").style.display = 'block';
            modal.querySelector(".btn-primary").innerHTML = __('Create');
            modal.querySelector(".btn-secondary").innerHTML = __('Close');
            modal.querySelector(".modal-body").innerHTML = html;

            _this.state.modalCont.show();

            _this.listeners.modalSuccessBtnFunc = (e) => {
        
                let minput2 = document.querySelector("#minput2").value;
                if(minput2.length<2){ alert( __("Please provide a description") ); e.preventDefault(); return false; }
        
                // init params
                let params = new URLSearchParams();
                params.append("cmd", "create_coupon");
                params.append("p1", minput2);
                params.append("p3", 2);
                params.append("token", getCookie('kenzap_token'));

                // do API query
                fetch('https://api.kenzap.com/v1/', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/x-www-form-urlencoded',
                    },
                    body: params
                })
                .then(response => response.json())
                .then(response => {

                    if(response.success){

                        _this.getStats();

                        toast(__('New coupon added succesfully'))
                        
                    }else{

                        parseApiError(response);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                
                _this.state.modalCont.hide();
            }
        },
        geoChartCustom: (e) => {

            e.preventDefault();
            _this.listeners.loadReport('by_country');
        },
        contentChartCustom: (e) => {

            e.preventDefault();
            _this.listeners.loadReport('by_sessions');
        },
        pieChartCustom: (e) => {

            e.preventDefault();
            _this.listeners.loadReport('by_device');
        },
        topViewsCustom: (e) => {

            e.preventDefault();
            _this.listeners.loadReport('top_views');
        },
        rangePickerClick: (chart) => {

            // space selection listener
            for(let sdr of document.querySelectorAll('.sdr')){

                sdr.addEventListener('click', (e) => {
                
                    e.preventDefault();

                    document.querySelector('.r-select').innerHTML = e.currentTarget.innerHTML;

                    let query = {};
                    let cb = null;
                    switch(chart){

                        case 'by_country':

                            _this.state.query.by_country.term.value = (Math.floor(Date.now() / 1000)) - 60 * 60 * 24 * parseInt(e.currentTarget.dataset.reports);
                            query = { 'by_country': _this.state.query.by_country };
                            cb = () => { _this.drawByCountry(_this.state.responseSingle, '#modal-chart'); }
                            break;
                        case 'by_sessions':

                            _this.state.query.by_sessions.term[0].value = (Math.floor(Date.now() / 1000)) - 60 * 60 * 24 * parseInt(e.currentTarget.dataset.reports);
                            _this.state.query.by_all.term[0].value = (Math.floor(Date.now() / 1000)) - 60 * 60 * 24 * parseInt(e.currentTarget.dataset.reports);
                            query = { 'by_sessions': _this.state.query.by_sessions, 'by_all':  _this.state.query.by_all };
                            cb = () => { _this.drawBySessions(_this.state.responseSingle, '#modal-chart'); }
                            break;
                        case 'by_device':

                            _this.state.query.by_device.term.value = (Math.floor(Date.now() / 1000)) - 60 * 60 * 24 * parseInt(e.currentTarget.dataset.reports);
                            query = { 'by_device': _this.state.query.by_device }
                            cb = () => { _this.drawByDevice(_this.state.responseSingle, '#modal-chart'); }
                            break;
                        case 'top_views':

                            _this.state.query.top_views.term.value = (Math.floor(Date.now() / 1000)) - 60 * 60 * 24 * parseInt(e.currentTarget.dataset.reports);
                            query = { 'top_views': _this.state.query.top_views }
                            cb = () => { _this.drawTopViews(_this.state.responseSingle, '#modal-chart'); }   
                            break;
                    }

                    _this.getDataSingle(query, cb);
                });
            }
        },
        loadReport: (type) => {

            let modal = document.querySelector(".modal");
            _this.state.modalCont = new bootstrap.Modal(modal);
            modal.querySelector(".modal-dialog").classList.add("modal-fullscreen");
            let html = `
            <div class="ms-2 dropdown">
			    <button class="btn btn-sm btn-outline-secondary dropdown-toggle border-0 r-select" type="button" id="spaceSelect" data-bs-toggle="dropdown" aria-expanded="false" data-id="1000000">${ __('Last 30 days') }</button>
			    <ul class="dropdown-menu spaceSelectList" aria-labelledby="spaceSelect" data-bs-popper="none">
                    <li><a data-id="1000000" data-reports="1" class="sdr dropdown-item" href="#">${ __('Today') }</a></li>
                    <li><a data-id="1000444" data-reports="7" class="sdr dropdown-item" href="#">${ __('Last 7 days') }</a></li>
                    <li><a data-id="1000452" data-reports="30" class="sdr dropdown-item" href="#">${ __('Last 30 days') }</a></li>
                    <li><a data-id="1000452"  data-reports="365" class="sdr dropdown-item" href="#">${ __('Last year') }</a></li>
                </ul>
			</div>`;

            modal.querySelector(".modal-title").innerHTML = __('Views by country') + " " + html;
            modal.querySelector(".btn-primary").style.display = 'none';
            modal.querySelector(".btn-secondary").innerHTML = __('Close');
            modal.querySelector(".modal-body").innerHTML = `<div id="modal-chart"></div>`;

            // by country
            switch(type){

                case 'by_country':
                    _this.drawByCountry(_this.state.response, '#modal-chart');
                    break;
                case 'by_sessions':
                    _this.drawBySessions(_this.state.response, '#modal-chart');
                    break;
                case 'by_device':
                    _this.drawByDevice(_this.state.response, '#modal-chart');
                    break;
                case 'top_views':
                    _this.drawTopViews(_this.state.response, '#modal-chart');
                    break;
            }

            _this.listeners.rangePickerClick(type);
        },
        viewInvoices: (e) => {

            e.preventDefault();

            showLoader();

            let modal = document.querySelector(".modal");
            _this.state.modalCont = new bootstrap.Modal(modal);
            modal.querySelector(".modal-dialog").classList.add("modal-fullscreen");
            let html = `
            <div class="ms-2 dropdown">
			    <button class="btn btn-sm btn-outline-secondary dropdown-toggle border-0 r-select" type="button" id="spaceSelect" data-bs-toggle="dropdown" aria-expanded="false" data-id="1000000">${ __('Last 30 days') }</button>
			    <ul class="dropdown-menu spaceSelectList" aria-labelledby="spaceSelect" data-bs-popper="none">
                    <li><a data-id="1000000" data-reports="1" class="sdr dropdown-item" href="#">${ __('This month') }</a></li>
                    <li><a data-id="1000444" data-reports="7" class="sdr dropdown-item" href="#">${ __('Last month') }</a></li>
                </ul>
			</div>`;

            modal.querySelector(".modal-title").innerHTML = __('Invoices') + " " + html;
            modal.querySelector(".btn-primary").style.display = 'none';
            modal.querySelector(".btn-secondary").innerHTML = __('Close');
            modal.querySelector(".modal-body").innerHTML = `<div id="modal-chart"></div>`;

            // do API query
            let params = new URLSearchParams();
            let ym = '';

            params.append("cmd", "get_invoice_list");
            params.append("ym", ym);
            params.append("token", getCookie('kenzap_token'));
    
            // do API query
            fetch('https://api.kenzap.com/v1/', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/x-www-form-urlencoded',
                },
                body: params
            })
            .then(response => response.json())
            .then(response => {
    
                // hide UI loader
                hideLoader();
    
                if(response.success){

                    let inv_list = '';

                    if(typeof(response.invoices)==="undefined") response.invoices = [];

                    if(response.invoices.length==0){

                        modal.querySelector("#modal-chart").innerHTML = '<div style="text-align:center;margin-top:100px;font-size:30px;color:rgba(0,0,0, .3);font-weight:800;text-shadow:1px 1px rgba(255,255,255,0.3);">' + __('No invoices to display') + '</div>';
                        return;
                    }

                    // map invoices
                    for(var i in response.invoices){

                        inv_list += '\
                        <tr>\
                            <td><a target="_blank" href="https://api.kenzap.com/v1/?cmd=get_invoice&id='+response.invoices[i].id+'&token='+getCookie('kenzap_token')+'"><b>#'+response.invoices[i].id+'</b></a></td>\
                            <td>'+_this.getAmount(response.types, response.invoices[i])+'</td>\
                            <td>'+_this.getOper(i, response.invoices)+'</td>\
                            <td>'+timeConverter(response.invoices[i].created)+'</td>\
                            <td><a target="_blank" href="https://api.kenzap.com/v1/?cmd=get_invoice&id='+response.invoices[i].id+'&token='+getCookie('kenzap_token')+'" style="color:#111;font-size:20px;" class="mdi mdi-printer menu-icon"></a></td>\
                        </tr>';
                    }

                    let html = `
                    <div class="table-responsive table-nav">
                        <table class="table table-hover table-borderless align-middle table-striped table-p-list">
                            <thead>
                                <tr>
                                    <th>${ __('ID') }</th>
                                    <th>${ __('Amount') }</th>
                                    <th>${ __('Status') }</th>
                                    <th>${ __('Date') }</th>
                                    <th>${ __('Print') }</th>
                                </tr>
                            </thead>
                            <tbody class="list"> ${ inv_list }</tbody>
                        </table>
                    </div>`;
            
                    modal.querySelector("#modal-chart").innerHTML = html;
    
                }else{
    
                    parseApiError(response);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        },
        viewSummary: (e) => {
        
            let date = new Date();
            let ym = date.getFullYear()+''+(date.getMonth()+"".length == 1 ? "0"+date.getMonth() : date.getMonth());
            window.open(
                'https://api.kenzap.com/v1/?cmd=get_summary&ym='+ym,
                '_blank'
            );
        },
        modalSuccessBtn: (e) => {
            
            _this.listeners.modalSuccessBtnFunc(e);
        },
        modalSuccessBtnFunc: null
    },
    getAmount: (types, inv) => {

        let t = 'p';
        if(types[inv.type]['c']==-1) t = 'n';
        if(types[inv.type]['s']==-1) t = 'n';
    
        return "<div class='iv-"+t+"'>$"+(Math.round(parseFloat(inv.amount))/100).toFixed(2)+'</div>';
    },
    getOper: (i, inv) => {

        var oper = inv[i].status;
        if(inv[i].type=='CKF' || inv[i].type=='CPF' || inv[i].type=='KF' || inv[i].type=='FF' || inv[i].type=='BF' || inv[i].type=='IF' || inv[i].type=='FAF' || inv[i].type=='FBF') oper = 3;
        var oper_txt = "";
        switch(oper){
        case 0: 
        oper_txt = '<div class="badge badge-warning">Processing</div>';
        break;
        case 1: 
        oper_txt = '<div class="badge badge-success">Processed</div>';
        break;
        case 3: 
        oper_txt = '<div class="badge badge-danger">Refund</div>';
        break;
        } 
        return oper_txt;
    },
    loadHomeStructure: () => {

        if(!_this.state.firstLoad) return;

        // get core html content 
        document.querySelector('#contents').innerHTML = homeContent(__);
    },
    initFooter: () => {
        
        initFooter(__('Copyright © '+new Date().getFullYear()+' <a class="text-muted" href="https://kenzap.com/" target="_blank">Kenzap</a>. All rights reserved.'), __('Kenzap Cloud Services - Dashboard'));
    }
}

_this.init();
