!function(u){function e(e){for(var t,n,r=e[0],s=e[1],a=e[2],i=0,o=[];i<r.length;i++)n=r[i],l[n]&&o.push(l[n][0]),l[n]=0;for(t in s)Object.prototype.hasOwnProperty.call(s,t)&&(u[t]=s[t]);for(d&&d(e);o.length;)o.shift()();return h.push.apply(h,a||[]),c()}function c(){for(var e,t=0;t<h.length;t++){for(var n=h[t],r=!0,s=1;s<n.length;s++){var a=n[s];0!==l[a]&&(r=!1)}r&&(h.splice(t--,1),e=i(i.s=n[0]))}return e}var n={},l={0:0},h=[];function i(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return u[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=u,i.c=n,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="../dist/";var t=window.webpackJsonp=window.webpackJsonp||[],r=t.push.bind(t);t.push=e,t=t.slice();for(var s=0;s<t.length;s++)e(t[s]);var d=r;h.push([10,1]),c()}({10:function(e,t,n){"use strict";n.r(t);var r=n(1),s=n(9),a=(n(11),r.a.start()),i=n(16);a.load(Object(s.a)(i))},11:function(e,t,n){var r=n(12);"string"==typeof r&&(r=[[e.i,r,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};n(14)(r,s);r.locals&&(e.exports=r.locals)},12:function(e,t,n){(e.exports=n(13)(!1)).push([e.i,"body {\n  background-color: #f5f5f5;\n  font-size: 13px; }\n\n.header-top .inner {\n  padding: 15px 0;\n  color: #333; }\n\n.navbar {\n  background-color: #fff;\n  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.03), 1px 1px 2px 2px rgba(0, 0, 0, 0.03);\n  -webkit-box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.03), 1px 1px 2px 2px rgba(0, 0, 0, 0.03);\n  -moz-box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.03), 1px 1px 2px 2px rgba(0, 0, 0, 0.03); }\n\n.nav-link {\n  padding: 10px 22px !important; }\n\n.nav-link i,\n.nav-link span {\n  display: inline-block;\n  height: 100%;\n  font-size: 18px; }\n\n.content {\n  padding: 25px 0; }\n\ntable td {\n  white-space: nowrap; }\n\n.table td,\n.table th {\n  padding: 0.3rem; }\n\n.table.inverse tbody td {\n  background-color: #f5f5f5 !important;\n  border-color: #fff !important; }\n\n.card {\n  border-radius: 0;\n  -moz-border-radius: 0;\n  -webkit-border-radius: 0; }\n\n.card-body {\n  padding: 1.3rem 1.8rem !important; }\n\n.form-control {\n  border-radius: 0; }\n\n.error {\n  color: brown; }\n\n.btn {\n  border-radius: 0;\n  -moz-border-radius: 0;\n  -webkit-border-radius: 0;\n  padding: 0.375rem 1rem; }\n\n.btn i {\n  font-size: 12px; }\n\n.modal-content {\n  border-radius: 0;\n  -moz-border-radius: 0;\n  -webkit-border-radius: 0; }\n\n.breadcrumb {\n  background: none;\n  padding: 1rem 0 0;\n  margin: 0; }\n\n.breadcrumb-item {\n  font-size: 15px; }\n\n.collapsible .card-header {\n  padding: 0 !important; }\n\n.card-header .btn-link {\n  text-decoration: none;\n  display: block;\n  cursor: pointer; }\n\n.no-btm-pad {\n  padding-bottom: 0 !important; }\n\nselect#source-account[disabled] {\n  border: none !important;\n  background-color: transparent !important;\n  padding: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none; }\n\n/* -------------slide down animation------------- */\n.slide-down,\n.slide-up {\n  max-height: 0;\n  overflow-y: hidden;\n  transition: max-height 0.5s ease-in-out; }\n\n.slide-down {\n  max-height: 10em; }\n\n/* Range slider */\n.slidecontainer {\n  width: 100%; }\n\n.slider {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n       appearance: none;\n  width: 100%;\n  height: 39px;\n  background: #d3d3d3;\n  outline: none;\n  opacity: 0.7;\n  transition: opacity 0.2s; }\n\n.slider::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 25px;\n  height: 39px;\n  background: #007bff;\n  cursor: pointer; }\n\n.slider::-moz-range-thumb {\n  width: 25px;\n  height: 25px;\n  background: #007bff;\n  cursor: pointer; }\n\n.slider:hover {\n  opacity: 1; }\n\n.balance-table {\n  border: none;\n  width: 250px;\n  font-size: 16px; }\n\n.table.sticky-table {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  background: #f5f5f5; }\n\n/** loading indicator styles **/\n.lds-ellipsis {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 11px; }\n\n.lds-ellipsis div {\n  position: absolute;\n  top: 0;\n  width: 11px;\n  height: 11px;\n  border-radius: 50%;\n  background: #0c1e3e;\n  -webkit-animation-timing-function: cubic-bezier(0, 1, 1, 0);\n          animation-timing-function: cubic-bezier(0, 1, 1, 0); }\n\n.lds-ellipsis div:nth-child(1) {\n  left: 6px;\n  -webkit-animation: lds-ellipsis1 0.6s infinite;\n          animation: lds-ellipsis1 0.6s infinite; }\n\n.lds-ellipsis div:nth-child(2) {\n  left: 6px;\n  -webkit-animation: lds-ellipsis2 0.6s infinite;\n          animation: lds-ellipsis2 0.6s infinite; }\n\n.lds-ellipsis div:nth-child(3) {\n  left: 26px;\n  -webkit-animation: lds-ellipsis2 0.6s infinite;\n          animation: lds-ellipsis2 0.6s infinite; }\n\n.lds-ellipsis div:nth-child(4) {\n  left: 45px;\n  -webkit-animation: lds-ellipsis3 0.6s infinite;\n          animation: lds-ellipsis3 0.6s infinite; }\n\n@-webkit-keyframes lds-ellipsis1 {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes lds-ellipsis1 {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@-webkit-keyframes lds-ellipsis3 {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1); }\n  100% {\n    -webkit-transform: scale(0);\n            transform: scale(0); } }\n\n@keyframes lds-ellipsis3 {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1); }\n  100% {\n    -webkit-transform: scale(0);\n            transform: scale(0); } }\n\n@-webkit-keyframes lds-ellipsis2 {\n  0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n  100% {\n    -webkit-transform: translate(19px, 0);\n            transform: translate(19px, 0); } }\n\n@keyframes lds-ellipsis2 {\n  0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n  100% {\n    -webkit-transform: translate(19px, 0);\n            transform: translate(19px, 0); } }\n",""])},16:function(e,t,n){var r={"./history_controller.js":17,"./send_controller.js":37,"./staking_controller.js":38};function s(e){var t=a(e);return n(t)}function a(e){var t=r[e];if(t+1)return t;var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}s.keys=function(){return Object.keys(r)},s.resolve=a,(e.exports=s).id=16},17:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return h});var a=n(1),r=n(2),i=n.n(r);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var h=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),u(this,c(t).apply(this,arguments))}var n,r,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(t,a["b"]),n=t,s=[{key:"targets",get:function(){return["stickyTableHeader","historyTable","nextPageButton","loadingIndicator","errorMessage"]}}],(r=[{key:"connect",value:function(){window.addEventListener("resize",this.alignTableHeaderWithStickyHeader.bind(this)),this.alignTableHeaderWithStickyHeader()}},{key:"alignTableHeaderWithStickyHeader",value:function(){this.stickyTableHeaderTarget.style.width="".concat(this.historyTableTarget.clientWidth,"px");var n=this.historyTableTarget.querySelector("tr").querySelectorAll("td");this.stickyTableHeaderTarget.querySelector("tr").querySelectorAll("th").forEach(function(e,t){e.style.width="".concat(n[t].clientWidth,"px")})}},{key:"initialize",value:function(){this.hide(this.nextPageButtonTarget),this.nextBlockHeight=this.nextPageButtonTarget.getAttribute("data-next-block-height"),this.checkScrollPos()}},{key:"checkScrollPos",value:function(){this.windowScrolled({target:document})}},{key:"windowScrolled",value:function(e){var t=e.target.scrollingElement,n=t.scrollTop;(this.makeTableHeaderSticky(n),!this.isLoading&&this.nextBlockHeight)&&(n+t.clientHeight>=.95*t.scrollHeight&&(this.isLoading=!0,this.fetchMoreTxs()))}},{key:"makeTableHeaderSticky",value:function(e){var t=this.historyTableTarget.parentElement.offsetTop;this.stickyTableHeaderTarget.classList.contains("d-none")&&t<=e?this.show(this.stickyTableHeaderTarget):e<t&&this.hide(this.stickyTableHeaderTarget)}},{key:"fetchMoreTxs",value:function(){this.show(this.loadingIndicatorTarget);var n=this;i.a.get("/next-history-page?start=".concat(this.nextBlockHeight)).then(function(e){var t=e.data;t.success?(n.hide(n.errorMessageTarget),n.nextBlockHeight=t.nextBlockHeight,n.displayTxs(t.txs),n.isLoading=!1,n.checkScrollPos()):n.setErrorMessage(t.message)}).catch(function(){n.setErrorMessage("A server error occurred")}).then(function(){n.isLoading=!1,n.hide(n.loadingIndicatorTarget)})}},{key:"displayTxs",value:function(e){var n=["Sent","Received","Transferred"],r=this.historyTableTarget.querySelectorAll("tr").length,t=e.map(function(e){return"<tr>\n                  <td>".concat(++r,"</td>\n                  <td>").concat(e.formatted_time,"</td>\n                  <td>").concat((t=e.direction,0<=t&&t<n.length?n[t]:"Unclear"),'</td>\n                  <td style="text-align: right">').concat(e.amount,'</td>\n                  <td style="text-align: right">').concat(e.fee,"</td>\n                  <td>").concat(e.type,'</td>\n                  <td><a href="/transaction-details/').concat(e.hash,'">').concat(e.hash,"</a></td>\n              </tr>");var t});this.historyTableTarget.innerHTML+=t.join("")}},{key:"setErrorMessage",value:function(e){this.errorMessageTarget.innerHTML=e,this.show(this.errorMessageTarget)}},{key:"hide",value:function(e){e.classList.add("d-none")}},{key:"show",value:function(e){e.classList.remove("d-none")}}])&&o(n.prototype,r),s&&o(n,s),t}()},37:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return h});var a=n(1),r=n(2),i=n.n(r);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var h=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),u(this,c(t).apply(this,arguments))}var n,r,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(t,a["b"]),n=t,s=[{key:"targets",get:function(){return["errorMessage","successMessage","form","sourceAccount","spendUnconfirmed","destinations","destinationTemplate","address","amount","removeDestinationButton","useCustom","fetchingUtxos","utxoSelectionProgressBar","customInputsTable","changeOutputs","numberOfChangeOutputs","useRandomChangeOutputs","generateOutputsButton","generatedChangeOutputs","changeOutputTemplate","changeOutputPercentage","changeOutputAmount","errors","nextButton","walletPassphrase","passwordError"]}}],(r=[{key:"initialize",value:function(){this.newDestination()}},{key:"newDestination",value:function(){if(this.destinationFieldsValid()){var e=document.importNode(this.destinationTemplateTarget.content,!0);this.destinationsTarget.appendChild(e),1<this.destinationCount()&&this.show(this.removeDestinationButtonTarget)}}},{key:"destinationFieldsValid",value:function(){this.clearMessages();var e=!0,t=!0,n=!1,r=void 0;try{for(var s,a=this.addressTargets[Symbol.iterator]();!(t=(s=a.next()).done);t=!0){if(""===s.value.value){this.showError("Destination address should not be empty"),e=!1;break}}}catch(e){n=!0,r=e}finally{try{t||null==a.return||a.return()}finally{if(n)throw r}}var i=!0,o=!1,u=void 0;try{for(var c,l=this.amountTargets[Symbol.iterator]();!(i=(c=l.next()).done);i=!0){var h=c.value,d=parseFloat(h.value);if(isNaN(d)||d<=0){this.showError("Amount must be a non-zero positive number"),e=!1;break}}}catch(e){o=!0,u=e}finally{try{i||null==l.return||l.return()}finally{if(o)throw u}}return e}},{key:"destinationCount",value:function(){return this.destinationsTarget.querySelectorAll("div.destination").length}},{key:"removeDestination",value:function(){1<this.destinationCount()&&this.destinationsTarget.removeChild(this.destinationsTarget.querySelector("div.destination:last-child")),this.destinationCount()<=1&&this.hide(this.removeDestinationButtonTarget)}},{key:"toggleSpendUnconfirmed",value:function(){this.useCustomTarget.checked&&this.openCustomInputsAndChangeOutputsPanel()}},{key:"toggleUseCustom",value:function(){this.useCustomTarget.checked?this.destinationFieldsValid()?this.openCustomInputsAndChangeOutputsPanel():this.useCustomTarget.checked=!1:this.resetCustomInputsAndChangeOutputs()}},{key:"resetCustomInputsAndChangeOutputs",value:function(){this.show(this.fetchingUtxosTarget),$("#custom-inputs").slideUp(),this.customInputsTableTarget.innerHTML="",this.hide(this.changeOutputsTarget),this.useRandomChangeOutputsTarget.checked=!1,this.numberOfChangeOutputsTarget.value="",this.generatedChangeOutputsTarget.innerHTML=""}},{key:"openCustomInputsAndChangeOutputsPanel",value:function(){var n=this;this.resetCustomInputsAndChangeOutputs(),$("#custom-inputs").slideDown();var r=this,e=this.sourceAccountTarget.value;this.getUnspentOutputs(e,function(e){var t=e.map(function(e){var t=new Date(1e3*e.receive_time).toString().split(" ").slice(0,5).join(" "),n=e.amount/1e8;return"<tr>\n                  <td width='5%'>\n                    <input data-action='click->send#calculateCustomInputsPercentage' type='checkbox' class='custom-input' name='utxo' value='".concat(e.key,"' data-amount='").concat(n,"' />\n                  </td>\n                  <td width='40%'>").concat(e.address,"</td>\n                  <td width='15%'>").concat(n," DCR</td>\n                  <td width='25%'>").concat(t,"</td>\n                  <td width='15%'>").concat(e.confirmations," confirmation(s)</td>\n                </tr>")});r.customInputsTableTarget.innerHTML=t.join(""),r.hide(n.fetchingUtxosTarget),r.show(r.changeOutputsTarget)})}},{key:"getUnspentOutputs",value:function(e,n){this.nextButtonTarget.innerHTML="Loading...",this.nextButtonTarget.setAttribute("disabled","disabled");var t="/unspent-outputs/".concat(e);this.spendUnconfirmedTarget.checked&&(t+="?getUnconfirmed=true");var r=this;i.a.get(t).then(function(e){var t=e.data;t.success?n(t.message):r.setErrorMessage(t.message)}).catch(function(){r.setErrorMessage("A server error occurred")}).then(function(){r.nextButtonTarget.innerHTML="Next",r.nextButtonTarget.removeAttribute("disabled")})}},{key:"calculateCustomInputsPercentage",value:function(){if(this.useCustomTarget.checked){var e=this.getTotalSendAmount(),t=this.getSelectedInputsSum(),n=0;n=e<=t?100:t/e*100,this.utxoSelectionProgressBarTarget.style.width="".concat(n,"%")}}},{key:"getTotalSendAmount",value:function(){var t=0;return this.amountTargets.forEach(function(e){t+=parseFloat(e.value)}),t}},{key:"getSelectedInputsSum",value:function(){var t=0;return this.customInputsTableTarget.querySelectorAll("input.custom-input:checked").forEach(function(e){t+=parseFloat(e.dataset.amount)}),t}},{key:"toggleCustomChangeOutputsVisibility",value:function(){this.clearMessages(),this.useCustomChangeOutput=!this.useCustomChangeOutput,this.generatedChangeOutputsTarget.innerHTML="",this.numberOfChangeOutputsTarget.value=""}},{key:"generateChangeOutputs",value:function(){if(!this.generatingChangeOutputs&&this.useCustomChangeOutput){this.clearMessages();var e=parseFloat(this.numberOfChangeOutputsTarget.value);if(isNaN(e)||e<1)this.showError("Number of change outputs must be 1 or more");else if(this.validateSendForm()){var o=this;this.getRandomChangeOutputs(e,function(e){o.useCustomChangeOutput&&(o.totalChangeAmount=0,e.forEach(function(e){o.totalChangeAmount+=e.Amount}),e.forEach(function(e,t){var n=document.importNode(o.changeOutputTemplateTarget.content,!0),r=n.querySelector('input[name="change-output-address"]'),s=n.querySelector('input[name="change-output-amount-percentage"]'),a=n.querySelector('input[name="change-output-amount"]'),i=0;o.useRandomChangeOutputsTarget.checked&&(a.value=e.Amount,s.setAttribute("disabled","disabled"),i=e.Amount/o.totalChangeAmount*100),s.value=i,r.value=e.Address,r.setAttribute("data-index",t),s.setAttribute("data-index",t),a.setAttribute("data-index",t),o.generatedChangeOutputsTarget.appendChild(n)}),o.show(o.generatedChangeOutputsTarget))})}}}},{key:"getRandomChangeOutputs",value:function(e,n){this.generatingChangeOutputs=!0,this.generatedChangeOutputsTarget.innerHTML="",this.generateOutputsButtonTarget.setAttribute("disabled","disabled"),this.generateOutputsButtonTarget.innerHTML="Loading...",this.numberOfChangeOutputsTarget.setAttribute("disabled","disabled");var t=$("#send-form").serialize();t+="&totalSelectedInputAmountDcr=".concat(this.getSelectedInputsSum()),this.sourceAccountTarget.disabled&&(t+="&source-account=".concat(this.sourceAccountTarget.value)),t+="&nChangeOutput=".concat(e);var r=this;i.a.get("/random-change-outputs?"+t).then(function(e){var t=e.data;void 0!==t.error?r.setErrorMessage(t.error):n(t.message)}).catch(function(e){console.log(e),r.setErrorMessage("A server error occurred")}).then(function(){r.generateOutputsButtonTarget.removeAttribute("disabled"),r.generateOutputsButtonTarget.innerHTML="Generate Change Outputs",r.numberOfChangeOutputsTarget.removeAttribute("disabled"),r.generatingChangeOutputs=!1})}},{key:"changeOutputAmountPercentageChanged",value:function(e){var t=e.currentTarget,n=parseInt(t.getAttribute("data-index")),r=parseFloat(t.value),s=0;if(this.changeOutputPercentageTargets.forEach(function(e){s+=parseFloat(e.value)}),100<s){var a=100-(s-r);t.value=a,r=a}var i=this.totalChangeAmount;this.changeOutputAmountTargets.forEach(function(e){parseInt(e.getAttribute("data-index"))===n&&(e.value=i*r/100)})}},{key:"getWalletPassphraseAndSubmit",value:function(){this.clearMessages(),this.validateSendForm()&&this.validateChangeOutputAmount()&&$("#passphrase-modal").modal()}},{key:"validateSendForm",value:function(){this.errorsTarget.innerHTML="";var e=this.destinationFieldsValid();return""===this.sourceAccountTarget.value&&(this.showError("The source account is required"),e=!1),this.useCustomTarget.checked&&this.getSelectedInputsSum()<this.getTotalSendAmount()&&(this.showError("The sum of selected inputs is less than send amount"),e=!1),e}},{key:"validateChangeOutputAmount",value:function(){var n=this;this.clearMessages();var r=0;return this.changeOutputPercentageTargets.forEach(function(e){var t=parseFloat(e.value);if(isNaN(t)||t<=0)return n.showError("Change amount percentage must be greater than 0"),!1;r+=t}),!this.useCustomChangeOutput||100===r||(this.showError("Total change amount percentage must be equal to 100. Current total is ".concat(r)),!1)}},{key:"submitForm",value:function(){if(this.validatePassphrase()){$("#passphrase-modal").modal("hide"),this.nextButtonTarget.innerHTML="Sending...",this.nextButtonTarget.setAttribute("disabled","disabled");var e=$("#send-form").serialize();e+="&totalSelectedInputAmountDcr=".concat(this.getSelectedInputsSum()),this.walletPassphraseTarget.value="",this.sourceAccountTarget.disabled&&(e+="&source-account=".concat(this.sourceAccountTarget.value));var r=this;i.a.post("/send",e).then(function(e){var t=e.data;if(void 0!==t.error)r.setErrorMessage(t.error);else{r.resetSendForm();var n="The transaction was published successfully. Hash: <strong>".concat(t.txHash,"</strong>");r.setSuccessMessage(n)}}).catch(function(){r.setErrorMessage("A server error occurred")}).then(function(){r.nextButtonTarget.innerHTML="Next",r.nextButtonTarget.removeAttribute("disabled")})}}},{key:"validatePassphrase",value:function(){return""!==this.walletPassphraseTarget.value||!(this.passwordErrorTarget.innerHTML='<div class="error">Your wallet passphrase is required</div>')}},{key:"resetSendForm",value:function(){this.resetCustomInputsAndChangeOutputs();for(var e=this.destinationCount();1<e;)this.removeDestination(),e--;this.addressTargets.forEach(function(e){e.value=""}),this.amountTargets.forEach(function(e){e.value=""}),this.spendUnconfirmedTarget.checked=!1,this.useCustomTarget.checked=!1,this.clearMessages()}},{key:"setErrorMessage",value:function(e){this.errorMessageTarget.innerHTML=e,this.hide(this.successMessageTarget),this.show(this.errorMessageTarget)}},{key:"setSuccessMessage",value:function(e){this.successMessageTarget.innerHTML=e,this.hide(this.errorMessageTarget),this.show(this.successMessageTarget)}},{key:"clearMessages",value:function(){this.hide(this.errorMessageTarget),this.hide(this.successMessageTarget),this.errorsTarget.innerHTML=""}},{key:"hide",value:function(e){e.classList.add("d-none")}},{key:"show",value:function(e){e.classList.remove("d-none")}},{key:"showError",value:function(e){this.errorsTarget.innerHTML+='<div class="error">'.concat(e,"</div>")}}])&&o(n.prototype,r),s&&o(n,s),t}()},38:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return d});var a=n(1),r=n(2),i=n.n(r);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var d=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),c(this,l(t).apply(this,arguments))}var n,r,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(t,a["b"]),n=t,s=[{key:"targets",get:function(){return["errorMessage","successMessage","sourceAccount","numberOfTickets","spendUnconfirmed","errors","submitButton","walletPassphrase","passwordError"]}}],(r=[{key:"validateForm",value:function(){var e=!(this.errorsTarget.innerHTML="");return""===this.sourceAccountTarget.value&&(this.showError("The source account is required"),e=!1),""===this.numberOfTicketsTarget.value&&(this.showError("The number of tickets is required"),e=!1),e}},{key:"submitForm",value:function(){if(this.validatePassphrase()){$("#passphrase-modal").modal("hide"),this.submitButtonTarget.innerHTML="Purchasing...",this.submitButtonTarget.setAttribute("disabled","disabled");var e=$("#purchase-tickets-form").serialize();this.sourceAccountTarget.disabled&&(e+="&source-account="+this.sourceAccountTarget.value),this.walletPassphraseTarget.value="";var s=this;i.a.post("/purchase-tickets",e).then(function(e){var t=e.data;if(t.success){var n=["<p>You have purchased "+t.message.length+" ticket(s)</p>"],r=t.message.map(function(e){return"<p><strong>"+e+"</strong></p>"});n.push.apply(n,o(r)),s.setSuccessMessage(n.join("")),s.submitButtonTarget.innerHTML="Purchase again"}else s.setErrorMessage(t.message)}).catch(function(){s.submitButtonTarget.innerHTML="Purchase",s.setErrorMessage("A server error occurred")}).then(function(){s.submitButtonTarget.removeAttribute("disabled")})}}},{key:"validatePassphrase",value:function(){return""!==this.walletPassphraseTarget.value||!(this.passwordErrorTarget.innerHTML='<div class="error">Your wallet passphrase is required</div>')}},{key:"getWalletPassphraseAndSubmit",value:function(){this.clearMessages(),this.validateForm()&&$("#passphrase-modal").modal()}},{key:"setErrorMessage",value:function(e){this.hide(this.successMessageTarget),this.show(this.errorMessageTarget),this.errorMessageTarget.innerHTML=e}},{key:"setSuccessMessage",value:function(e){this.hide(this.errorMessageTarget),this.show(this.successMessageTarget),this.successMessageTarget.innerHTML=e}},{key:"clearMessages",value:function(){this.hide(this.errorMessageTarget),this.hide(this.successMessageTarget),this.hide(this.errorsTarget)}},{key:"hide",value:function(e){e.classList.add("d-none")}},{key:"show",value:function(e){e.classList.remove("d-none")}},{key:"showError",value:function(e){this.errorsTarget.innerHTML+='<div class="error">'.concat(e,"</div>"),this.show(this.errorsTarget)}}])&&u(n.prototype,r),s&&u(n,s),t}()}});
//# sourceMappingURL=app.bundle.js.map