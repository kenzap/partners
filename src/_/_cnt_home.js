import { link } from "../_/_helpers.js"

export const homeContent = (__) => {

    return `
    <div class="dash-menu container">
        <div class="d-flex justify-content-between bd-highlight mb-3">
            <nav class="bc" aria-label="breadcrumb"><ol class="breadcrumb mt-2 mb-0"><li class="breadcrumb-item">Dashboard</li></ol></nav>
        </div> 
        <div class="row">
            <div class="col-lg-4 grid-margin stretch-card mb-4">
                <div class="card border-white shadow-sm p-sm-2 anm br" data-ext="pages">
                <div class="card-body">
                    <div class="d-flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" fill="currentColor" class="bi bi-pencil-square me-3 mr-md-0 mr-lg-4 text-primary" viewBox="0 0 16 16" style="min-width: 32px;">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                    </svg>
                    <div class="mr-4 mr-md-0 mr-lg-4 text-left text-lg-left">
                        <h5 class="card-title mb-0">Pages</h4>
                        <p class="card-description mt-1 mb-0">Update content of your website. Create new pages or update existing layouts.</p>
                        <div class="link-group">
                        <a class="mt-2 text-md-tight" href="${ link('/pages/') }" data-ext="pages">Edit</a>
                        </div>
                    </div>
                    </div>                  
                </div>
                </div>
            </div>

            <div class="col-lg-4 grid-margin stretch-card mb-4 d-none">
                <div class="card border-white shadow-sm p-sm-2 anm br" data-ext="settings">
                <div class="card-body">
                    <div class="d-flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" fill="currentColor" class="bi bi-pencil-square me-3 mr-md-0 mr-lg-4 text-primary" viewBox="0 0 16 16" style="min-width: 32px;">
                        <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"/>
                    </svg>
                    <div class="mr-4 mr-md-0 mr-lg-4 text-left text-lg-left">
                        <h5 class="card-title mb-0">Style &amp; Settings</h4>
                        <p class="card-description mt-1 mb-0">Adjust visual feel and look of this site. Change colors, fonts, etc.</p>
                        <div class="link-group">
                        <a class="mt-2 text-md-tight" href="#" data-ext="settings">Customize</a>
                        </div>
                    </div>
                    </div>                  
                </div>
                </div>
            </div>

            <div class="col-lg-4 grid-margin stretch-card mb-4">
                <div class="card border-white shadow-sm p-sm-2 anm br" data-ext="domain">
                <div class="card-body">
                    <div class="d-flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" fill="currentColor" class="bi bi-pencil-square me-3 mr-md-0 mr-lg-4 text-primary" viewBox="0 0 16 16" style="min-width: 32px;">
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                    </svg>
                    <div class="mr-4 mr-md-0 mr-lg-4 text-left text-lg-left">
                        <h5 class="card-title mb-0">${ __('Domain Name') }</h4>
                        <p class="card-description mt-1 mb-0">Update domain name settings of this site. Connect your domain name.</p>
                        <div class="link-group">
                        <a class="mt-2 text-md-tight" href="${ link('/domain/') }" data-ext="domain">Settings</a>
                        </div>
                    </div>
                    </div>                  
                </div>
                </div>
            </div>

            <div class="col-lg-4 grid-margin stretch-card mb-4 d-none">
                <div class="card border-white shadow-sm p-sm-2 anm br" data-ext="navigation">
                <div class="card-body">
                    <div class="d-flex flex-row">
                    <div class="mr-4 mr-md-0 mr-lg-4 text-left text-lg-left">
                        <h5 class="card-title mb-0">Navigation Menu</h4>
                        <p class="card-description mt-1 mb-0">Set up header and footer navigation menus of this site.</p>
                        <div class="link-group">
                        <a class="mt-2 text-md-tight" href="#" data-ext="navigation">Edit</a>
                        </div>
                    </div>
                    </div>                  
                </div>
                </div>
            </div>

            <div class="col-lg-4 grid-margin stretch-card mb-4">
                <div class="card border-white shadow-sm p-sm-2 anm br" data-ext="users">
                <div class="card-body">
                    <div class="d-flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" fill="currentColor" class="bi bi-pencil-square me-3 mr-md-0 mr-lg-4 text-primary" viewBox="0 0 16 16" style="min-width: 32px;">
                        <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                        <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
                    </svg>
                    <div class="mr-4 mr-md-0 mr-lg-4 text-left text-lg-left">
                        <h5 class="card-title mb-0">${ __('Access & API keys') }</h4>
                        <p class="card-description mt-1 mb-0">Grant new user or revoke existing user access to this cloud space.</p>
                        <div class="link-group">
                        <a class="mt-2 text-md-tight" href="${ link('/access/') }" data-ext="users">${ __('Manage') }</a>
                        </div>
                    </div>
                    </div>                  
                </div>
                </div>
            </div>

            <div class="col-lg-4 grid-margin stretch-card mb-4">
                <div class="card border-white shadow-sm p-sm-2 anm br" data-ext="products">
                <div class="card-body">
                    <div class="d-flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" fill="currentColor" class="bi bi-pencil-square me-3 mr-md-0 mr-lg-4 text-primary" viewBox="0 0 16 16" style="min-width: 32px;">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                        </svg>
                        <div class="mr-4 mr-md-0 mr-lg-4 text-left text-lg-left">
                            <h5 class="card-title mb-0">${ __('E-commerce') }</h4>
                            <p class="card-description mt-1 mb-0">${ __('Create and organize products used in e-commerce and checkout.') }</p>
                            <div class="link-group">
                                <a class="mt-2 me-2 text-md-tight" href="${ link('https://ecommerce.kenzap.cloud') }" data-ext="ecommerce-settings">${ __('Menu') }</a>
                                <a class="mt-2 text-md-tight" href="${ link('https://ecommerce.kenzap.cloud/product-list/') }" data-ext="ecommerce-products">${ __('Products') }</a>
                            </div>
                            <!-- <a class="link text-right mt-2 text-md-tight text-lg-right" href="#" >${ __('Continue') }</a> -->
                        </div>
                    </div>                  
                </div>
                </div>
            </div>


            <div class="col-lg-4 grid-margin stretch-card mb-4">
                <div class="add-card border-white p-sm-2 anm br" data-ext="products">
                    <div class="card-body">
                        <div class="d-flex flex-row justify-content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" style="color:#ccc;" class="bi bi-plus-circle justify-content-center p-3" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                            </svg>
                        </div>                  
                    </div>
                </div>
            </div>
 
        </div>
    </div>

    <div class="modal" tabindex="-1">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title d-flex align-items-center"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-modal"></button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
                </div>
            </div>
        </div>
    </div>

    <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center">
        <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive"
            aria-atomic="true" data-bs-delay="3000">
            <div class="d-flex">
                <div class="toast-body"></div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                    aria-label="Close"></button>
            </div>
        </div>
    </div>

    `;
}