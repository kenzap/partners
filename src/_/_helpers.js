export const link = (slug) => {
    
    let urlParams = new URLSearchParams(window.location.search);
    let sid = urlParams.get('sid') ? urlParams.get('sid') : "";

    let postfix = slug.indexOf('?') == -1 ? '?sid='+sid : '&sid='+sid;

    return slug + postfix;
}

export const getSiteId = () => {
    
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('sid') ? urlParams.get('sid') : "";

    return id;
}

export const getProductId = () => {
    
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id') ? urlParams.get('id') : "";
    return id;
}

export const getProductIdFromLink = () => {
    
    let url = new URL(window.location.href);
    let id = url.pathname.trim().split('/').slice(-2)[0];
    return id;
}

export const getPageNumber = () => {

    let url = window.location.href.split('/');
    let page = url[url.length-1];
    let pageN = 1;
    if(page.indexOf('page')==0){
      pageN = page.replace('page', '').replace('#', '');
    }
    // console.log(pageN);
    return parseInt(pageN);
}

export const getPagination = (meta, cb) => {

    if(typeof(meta) === 'undefined'){ document.querySelector("#listing_info").innerHTML = 'no records to display'; return; }

    let offset = meta.limit+meta.offset;
    if(offset>meta.total_records) offset = meta.total_records;

    document.querySelector("#listing_info").innerHTML = "Showing "+(1+meta.offset)+" to "+(offset)+" of "+meta.total_records+" entries";

    let pbc = Math.ceil(meta.total_records / meta.limit);
    // console.log(pbc);
    document.querySelector("#listing_paginate").style.display = (pbc < 2) ? "none" : "block";

    // page 1 

    // page 3
    // 1 2

    // page 5
    // 2 3 4 .. 

    let page = getPageNumber(); 
    let html = '<ul class="pagination d-flex justify-content-end pagination-flat">';
    html += '<li class="paginate_button page-item previous" id="listing_previous"><a href="#" aria-controls="order-listing" data-type="prev" data-page="0" tabindex="0" class="page-link"><span aria-hidden="true">&laquo;</span></li>';
    let i = 0;
    while(i<pbc){

        i++; 
        if(((i >= page-3) && (i <= page)) || ((i <= page+3) && (i >=page))){

            html += '<li class="paginate_button page-item '+((page==i)?'active':'')+'"><a href="#" aria-controls="order-listing" data-type="page" data-page="'+i+'" tabindex="0" class="page-link">'+(page==i?'..':i)+'</a></li>';      
        }
    }  
    html += '<li class="paginate_button page-item next" id="order-listing_next"><a href="#" aria-controls="order-listing" data-type="next" data-page="2" tabindex="0" class="page-link"><span aria-hidden="true">&raquo;</span></a></li>';
    html += '</ul>'

    document.querySelector("#listing_paginate").innerHTML = html;

    let page_link = document.querySelectorAll(".page-link");
    for (const l of page_link) {
        l.addEventListener('click', function(e) {

            let p = parseInt(getPageNumber());
            let ps = p;
            switch(l.dataset.type){ 
                case 'prev': p-=1; if(p<1) p = 1; break;
                case 'page': p=l.dataset.page; break;
                case 'next': p+=1; if(p>pbc) p = pbc; break;
            }
            
            // update url
            if (window.history.replaceState) {

                let url = window.location.href.split('/page');
                let urlF = (url[0]+'/page'+p).replace('//page', '/page');

                // prevents browser from storing history with each change:
                window.history.replaceState("kenzap-cloud", document.title, urlF);
            }

            // only refresh if page differs
            if(ps!=p) cb();
            
            e.preventDefault();
            return false;
        });
    }
}

export const formatStatus = (st) => {

    st = parseInt(st); 
    switch(st){ 
      case 0: return '<div class="badge bg-warning text-dark fw-light">Draft</div>';
      case 1: return '<div class="badge bg-primary fw-light">Published</div>';
      case 3: return '<div class="badge bg-secondary fw-light">Unpublished</div>';
      default: return '<div class="badge bg-secondary fw-light">Drafts</div>';
    }
}

export const formatPrice = (price) => {

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD", });
    if(typeof(price) === 'undefined' || price == '') price = 0;
    price = parseFloat(price);
    price = formatter.format(price);
    return price;
}

export const formatTime = (timestamp) => {
	
    let a = new Date(timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year; // + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

export const getCookie = (cname) => {

    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// parse backend error to frontend
export const parseApiError = (data) => {

    // alert(data.reason);
    // return; 
    switch(data.code){

        // for user to resignin
        // case 401: location.href="https://auth.kenzap.com/?redirectF.php?referral="+window.location.href; break;
        case 401: if(window.location.href.indexOf('localhost')!=-1){ alert('Please update user token'); }else{ location.href='https://auth.kenzap.com/?app=65432108792785&redirect='+window.location.href; } break;
        default: alert(data.reason); break;
    }
}

// init breadcrumbs navigation
export const initBreadcrumbs = (data) => {

    let html = '<ol class="breadcrumb mt-2 mb-0">';
    for(let bc of data){
        
        if(typeof(bc.link) === 'undefined'){

            html += `<li class="breadcrumb-item">${ bc.text }</li>`;
        }else{

            html += `<li class="breadcrumb-item"><a href="${ bc.link }">${ bc.text }</a></li>`;
        }
    }
    html += '</ol>';
    
    document.querySelector(".bc").innerHTML = html;
}

/**
 * Simulate a click event.
 * @public
 * @param {Element} elem  the element to simulate a click on
 */
 export const simulateClick = (elem) => {
     
	// Create our event (with options)
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
};

// nums only validation
export const numsOnly = (e, max) => {

    // Only ASCII charactar in that range allowed 
    var ASCIICode = (e.which) ? e.which : e.keyCode 
    if (ASCIICode > 31 && ASCIICode != 46 && (ASCIICode < 48 || ASCIICode > 57)) 
    return false; 

    if(parseFloat(e.target.value)>max) 
    return false; 

    let dec = e.target.value.split('.');
    if(dec.length>1)
    if(dec[1].length>1)
        return false;
    
    return true; 
}

export const onClick = (sel, fn) => {

    // console.log('onClick');
    if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

        e.removeEventListener('click', fn, true);
        e.addEventListener('click', fn, true);
    }
}

export const onKeyUp = (sel, fn) => {

    if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

        e.removeEventListener('keyup', fn, true);
        e.addEventListener('keyup', fn, true);
    }
}

export const onChange = (sel, fn) => {

    // console.log('onChange');
    if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

        e.removeEventListener('change', fn, true);
        e.addEventListener('change', fn, true);
    }
}

// time elapsed since creation 
export const timeConverter = (UNIX_timestamp) => {

    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year; // + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

// time elapsed since creation 
export const timeConverterAgo = (now, time) => {

    console.log(now + " " + time);

    now = parseInt(now);
    time = parseInt(time);

    console.log(now + " " + time);

    // parse as elapsed time
    let past = now - time;
    if(past < 60) return 'moments ago';
    if(past < 3600) return parseInt(past / 60) + ' minutes ago';
    if(past < 86400) return parseInt(past / 60 / 24) + ' hours ago';

    // process as normal date
    var a = new Date(time * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year; // + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

export const toast = (text) => {

    let toast = new bootstrap.Toast(document.querySelector('.toast'));
    document.querySelector('.toast .toast-body').innerHTML = text;  
    toast.show();
}