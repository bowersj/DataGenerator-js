/*
 *
 * enums-product.js
 *
 * Purpose
 * This file contains all the enums required for generating a product document
 *
 */

let docHistory = require( './enums-metadata.js' );


module.exports = {
    "docEvent": docHistory.docEvent,
    "productCategories": [ 
        { "category":"Books and Audible",                  "subCategories":[ "Books", "Children's Books", "AbeBooks.com", "Comics & Graphic Novels", "Magazines", "Textbooks", "Textbook Rentals" ] },
        { "category":"Movies, Music, and Games",           "subCategories":[ "Movies & TV", "Blu-Ray", "Video Shorts", "CD's & Vinyl", "Digital Music", "Musical Instruments", "Headphones", "Video Games", "PC Gaming", "Digital Games", "Entertainment Collectibles" ] },
        { "category":"Electronics, Computers & Office",    "subCategories":[ "TV & Video", "Home Audio & Theater", "Camera, Photo, & Video", "Cell Phones & Accessories", "Headphones", "Video Games", "Bluetooth & Wireless Speakers", "Car Electronics", "Musical Instruments", "Wearable Technology", "Electronics", "Bargain Finds" ] },
        { "category":"Home, Garden & Tools",               "subCategories":[ "Home", "Home Decore", "Furniture", "Kitchen & Dining", "Bed & Bath", "Garden & Outdoor", "Mattresses", "Storage & Organization", "Appliances", "Fine Art", "Collectibles & Fine Art", "Arts, Crafts & Sewing", "Pet Supplies", "Event & Party Supplies" ] },
        { "category":"Pet Supplies",                       "subCategories":[ "Dog Supplies", "Dog Food", "Cat Supplies", "Cat Food", "Fish & Aquatic Pets", "Small Animals", "Birds" ] },
        { "category":"Food & Grocery",                     "subCategories":[ "Grocery & Gourmet Food", "Fresh" ] },
        { "category":"Beauty & Health",                    "subCategories":[ "All Beauty", "Luxury Beauty", "Professional Skin Care", "Salon & Spa", "Men's Grooming", "Health, Household & Baby Care", "Vitamins & Dietary Supplements", "Household Supplies", "Health Care", "Sport Nutrition", "Baby & Child Care", "Medical Supplies & Equipment", "Health & Wellness" ] },
        { "category":"Toys, Kids & Baby",                  "subCategories":[ "Toys & Games", "Baby", "Diapering", "Video Games for Kids", "Baby Registry", "Kids Birthdays", "For Girls", "For Boys", "For Baby", "For Teens" ] },
        { "category":"Clothing, Shoes, Jewelry & Watches", "subCategories":[ "Fashion", "Women", "Men", "Girls", "Boys", "Baby", "Luggage", "Sales & Deals" ] },
        { "category":"Handmade",                           "subCategories":[ "All Handmade", "Gifts", "Jewelry", "Home & Kitchen", "Wedding", "Clothing & Shoes", "Handbags & Accessories", "Beauty & Grooming", "Stationary & Party Supplies", "Toys & Games", "Pet Supplies", "Home Decor", "Artwork", "Kitchen & Dining", "Furniture", "Baby" ] },
        { "category":"Sports & Outdoor",                   "subCategories":[ "Athletic Clothing", "Exercise & Fitness", "Team Sports", "Fan Shop", "Golf", "Leisure Sports & Game Room", "Sports Collectibles", "All Sports & Fitness", "New Gear Innovations" ] },
        { "category":"Automotive & Industrial",            "subCategories":[ "Automotive Parts & Accessories", "Automotive Tools & Equipment", "car/Vehicle Electronic & GPS", "Tires & Wheels", "Motorcycle & Powersports", "Vehicles" ] }
    ],
    "productStatus": [ "Active", "Inactive" ],
    "supplierProductStatus": [ "In Stock", "Out of Stock", "Back Ordered", "Discontinued" ],
    "productWeightUOM": [ "Gram", "Kilogram", "Pound", "Ounce", "Ton" ],
    // can also contain in the future unboxed among other potential values
    "productMeasurePurpose": [ "boxed" ],
    // what values do want available for website purpose in the product document?
    "websitePurpose": [ "Sales", "Seller", "Reseller" ],
    "productSizeUOM": [ "mm", "cm", "m", "in", "ft", "yd" ],
    "getProductCategoriesAndSubCategories": function(){
        /*
         * gets the values category and subcategory and returns an object with those properties
         *
         */
        let index = Math.floor(Math.random() * this.productCategories.length);
        let enumValue = this.productCategories[index];

        let newIndex = Math.floor(Math.random() * enumValue.subCategories.length);

        return {category: enumValue.category, subCategory:  enumValue.subCategories[newIndex]}
    },
    "getDocEvent": function(){
        return {docEvent: this.docEvent[Math.floor(Math.random() * this.docEvent.length)]}
    },
    "getProductStatus": function(){
        return {productStatus: this.productStatus[Math.floor(Math.random() * this.productStatus.length)]}
    },
    "getSupplierProductStatus": function(){
        return {supplierProductStatus: this.supplierProductStatus[Math.floor(Math.random() * this.supplierProductStatus.length)]}
    },
    "getProductWeightUOM": function(){
        // return {productWeightUOM: this.productWeightUOM[Math.floor(Math.random() * this.productWeightUOM.length)]}
        return {productWeightUOM: this.productMeasurePurpose[0]}
    },
    "getProductMeasurePurpose": function(){
        return {productMeasurePurpose: this.productMeasurePurpose[Math.floor(Math.random() * this.productMeasurePurpose.length)]}
    },
    "getProductSizeUOM": function(){
        return {productSizeUOM: this.productSizeUOM[Math.floor(Math.random() * this.productSizeUOM.length)]}
    },
    "getWebsitePurpose": function(){
        return {websitePurpose: this.websitePurpose[Math.floor(Math.random() * this.websitePurpose.length)]}
    }
};