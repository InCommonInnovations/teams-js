import{__rest as r}from"../../../../node_modules/tslib/tslib.es6.js";import{marketplace as t}from"../public/marketplace.js";function e(r){try{return r.cartItems=o(r.cartItems),r}catch(r){throw new Error("Error deserializing cart")}}function o(r){return r.map((r=>{if(r.imageURL){const t=new URL(r.imageURL);r.imageURL=t}return r.accessories&&(r.accessories=o(r.accessories)),r}))}const a=t=>{try{return t.map((t=>{const{imageURL:e,accessories:o}=t,n=r(t,["imageURL","accessories"]),s=Object.assign({},n);return e&&(s.imageURL=e.href),o&&(s.accessories=a(o)),s}))}catch(r){throw new Error("Error serializing cart items")}};function n(r){if(!Array.isArray(r)||0===r.length)throw new Error("cartItems must be a non-empty array");for(const t of r)i(t),s(t.accessories)}function s(r){if(null!=r){if(!Array.isArray(r)||0===r.length)throw new Error("CartItem.accessories must be a non-empty array");for(const t of r){if(t.accessories)throw new Error("Item in CartItem.accessories cannot have accessories");i(t)}}}function i(r){if(!r.id)throw new Error("cartItem.id must not be empty");if(!r.name)throw new Error("cartItem.name must not be empty");m(r.price),f(r.quantity)}function c(r){if(null!=r){if(!r)throw new Error("id must not be empty");if(!1===/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(r))throw new Error("id must be a valid UUID")}}function m(r){if("number"!=typeof r||r<0)throw new Error(`price ${r} must be a number not less than 0`);if(parseFloat(r.toFixed(3))!==r)throw new Error(`price ${r} must have at most 3 decimal places`)}function f(r){if("number"!=typeof r||r<=0||parseInt(r.toString())!==r)throw new Error(`quantity ${r} must be an integer greater than 0`)}function u(r){if(!Object.values(t.CartStatus).includes(r))throw new Error(`cartStatus ${r} is not valid`)}export{e as deserializeCart,o as deserializeCartItems,a as serializeCartItems,s as validateAccessoryItems,i as validateBasicCartItem,n as validateCartItems,u as validateCartStatus,m as validatePrice,f as validateQuantity,c as validateUuid};