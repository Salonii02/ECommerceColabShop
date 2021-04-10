import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./Sidebar.js";
import Chat from "./Chat.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import NavBar from "./components/NavBar/NavBar.js";
import Products from "./components/Products/Products";
import db from "./firebase";
import logo from "./images/ColabShop.png";
import ErrorBoundary from "./ErrorBoundary";
function App() {
  const [{ user }, dispatch] = useStateValue();
  const [loggedIn, setloggedIn] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    let Newproducts = [];
    // const newmyntra = [
    //   {
    //     productname: ["Anouk"],
    //     price: [" 2899 "],
    //     pricedicounted: ["\u20b91014 "],
    //     producttype: ["Women Printed Kurta with Trousers & Dupatta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/7186142/2021/3/29/8b3e3d3c-619c-4c1a-bc0e-0b38d7052e8b1617000894042-Anouk-Women-Blue-Printed-Kurta-with-Trousers--Dupatta-783161-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["AHIKA"],
    //     price: [" 1350 "],
    //     pricedicounted: ["\u20b9688 "],
    //     producttype: ["Printed Straight Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/11056154/2019/12/5/30b0017d-7e72-4d40-9633-ef78d01719741575541717470-AHIKA-Women-Black--Green-Printed-Straight-Kurta-990157554171-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Libas"],
    //     price: [" 2399 "],
    //     pricedicounted: ["\u20b91919 "],
    //     producttype: ["Ethnic Print Kurta Set "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/10356511/2019/8/8/a28f9ccb-c0d7-4e66-87f0-e639f157ff2d1565263388836-Libas-Women-Kurta-Sets-571565263387250-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Varanga"],
    //     price: [" 1699 "],
    //     pricedicounted: ["\u20b9679 "],
    //     producttype: ["Mustard Marigold Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/8529019/2019/1/23/5d6a8e02-0fa0-4770-82f5-6b52d9c983561548242338312-Varanga-mustard-printed-straight-kurta-6361548242336928-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Vishudh"],
    //     price: [" 1149 "],
    //     pricedicounted: ["\u20b9517 "],
    //     producttype: ["Printed Straight Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/2110558/2018/4/13/11523617167748-Vishudh-Women-Black--Gold-Toned-Printed-Straight-Kurta-9041523617167566-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["all about you"],
    //     price: [" 3299 "],
    //     pricedicounted: ["\u20b92639 "],
    //     producttype: ["Solid Kurta with Palazzos & Dupatta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/13144206/2021/3/4/78de4f49-8e02-4d88-9374-ea2546708f981614860473914-all-about-you-Women-Green--Yellow-Solid-Kurta-with-Palazzos--1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Libas"],
    //     price: [" 3499 "],
    //     pricedicounted: ["\u20b92799 "],
    //     producttype: ["Women Printed Kurta with Palazzos & Dupatta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/7319901/2018/9/18/ede2810e-0a86-43aa-a7aa-27d3d95a9b5f1537268175318-Libas-Women-Pink--Grey-Printed-Kurta-with-Palazzos--Dupatta-4071537268175098-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Vishudh"],
    //     price: [" 2149 "],
    //     pricedicounted: ["\u20b9795 "],
    //     producttype: ["Women Printed Kurta with Palazzos "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/productimage/2019/8/2/f04c1859-6fd2-401e-886d-1616a36487611564686015480-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["AHIKA"],
    //     price: [" 1398 "],
    //     pricedicounted: ["\u20b9699 "],
    //     producttype: ["Bandhani Printed Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/12924516/2020/11/27/534b6c7d-8663-4a25-a973-8240b45541921606462011449-AHIKA-Women-Kurtas-401606462009205-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Indo Era"],
    //     price: [" 2499 "],
    //     pricedicounted: ["\u20b91149 "],
    //     producttype: ["Muted Hazelnut Kurta Set "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/8969717/2019/3/28/e448c9a1-3a0f-40e7-b267-1bf44a44ba501553778956208-Indo-Era-Beige-Solid-Straight-Kurta-Sets-9801553778954623-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Deewa"],
    //     price: [" 1649 "],
    //     pricedicounted: ["\u20b91299 "],
    //     producttype: ["Printed Maxi Dress "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/13435636/2021/1/22/f6914028-82fa-4187-90a4-1867d8eac3a11611296894583IndoEraGreenEmbroideredkurtaPalazzowithDupattaSetsDressesDee1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Libas"],
    //     price: [" 2199 "],
    //     pricedicounted: ["\u20b91759 "],
    //     producttype: ["Printed Kurta with Palazzos & Dupatta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/11568388/2020/3/5/55c51558-cceb-4e8f-ae71-689d81f218e41583384530038-Libas-Women-Green--Blue-Printed-Kurta-with-Palazzos--Dupatta-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Varanga"],
    //     price: [" 3999 "],
    //     pricedicounted: ["\u20b91519 "],
    //     producttype: ["Embroidered Kurta with Trousers & Dupatta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/13647632/2021/3/2/ca3d4d9a-27dc-46b9-8e84-9e07089cf12c1614669941394-Varanga-Women-Kurta-Sets-2591614669939416-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["See Designs"],
    //     price: [" 1299 "],
    //     pricedicounted: ["\u20b9649 "],
    //     producttype: ["Printed Straight Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/11519290/2020/2/25/19cf3192-3ca7-46a4-88e6-e5ae137995c01582624360192-See-Designs-Women-Blue--White-Printed-Straight-Kurta-1011582-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Libas"],
    //     price: [" 1299 "],
    //     pricedicounted: ["\u20b9649 "],
    //     producttype: ["Patterned Pathani Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/2477343/2018/2/22/11519301743689-Libas-Women-Green-Woven-Design-Pathani-Kurta-4531519301743438-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Popnetic"],
    //     price: [" 1399 "],
    //     pricedicounted: ["\u20b9489 "],
    //     producttype: ["Women Printed Straight Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/11066882/2020/1/13/7c708a55-fcee-45a4-901d-da0dffa5cb491578911582522-Popnetic-Women-Green--Golden-Printed-Straight-Kurta-71015789-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Sangria"],
    //     price: [" 2499 "],
    //     pricedicounted: ["\u20b91249 "],
    //     producttype: ["Pure Cotton Bandhani Kurta Set "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/13290492/2021/2/12/785989fc-f3d5-4231-8afb-9675c84489ba1613131638106-Sangria-Women-Mustard-Yellow--White-Bandhani-Print-Pure-Cott-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["anayna"],
    //     price: [" 1198 "],
    //     pricedicounted: ["\u20b9599 "],
    //     producttype: ["Printed Straight Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/12894708/2020/12/3/15de92f0-3a4c-470c-9e1d-b5526f4335171606978803351anaynaWomenNavyBlueWhitePrintedStraightKurta1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Libas"],
    //     price: [" 2499 "],
    //     pricedicounted: ["\u20b91999 "],
    //     producttype: ["Floral Cotton Kurta Set "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/10356859/2019/8/8/b783aef9-c902-462e-af73-de159bfd011c1565256752191-Libas-Women-Kurta-Sets-2081565256750830-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Vishudh"],
    //     price: [" 2199 "],
    //     pricedicounted: ["\u20b9813 "],
    //     producttype: ["Women Printed Kurta with Palazzos "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/productimage/2019/6/14/523a66cc-6a6b-412d-af0a-c5b9bf80c0eb1560507433753-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Anouk"],
    //     price: [" 1399 "],
    //     pricedicounted: ["\u20b9699 "],
    //     producttype: ["Printed Straight Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/2472856/2018/4/7/11523086508486-Anouk-Women-Orange--Green-Printed-Straight-Kurta-7901523086508323-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Yufta"],
    //     price: [" 2499 "],
    //     pricedicounted: ["\u20b91249 "],
    //     producttype: ["Kurta with Palazzos & Dupatta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/11374210/2020/2/12/0fe1f20e-e952-42fa-a1af-9bff2d2f418f1581484426280-Yufta-Women-Black--Golden-Solid-Kurta-with-Palazzos--Dupatta-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["AHIKA"],
    //     price: [" 1198 "],
    //     pricedicounted: ["\u20b9694 "],
    //     producttype: ["Floral Printed Straight Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/10808284/2019/10/30/c35d059d-a357-4863-bcb1-eacd8c988fb01572422803188-AHIKA-Women-Kurtas-8841572422802083-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Anubhutee"],
    //     price: [" 2499 "],
    //     pricedicounted: ["\u20b9999 "],
    //     producttype: ["Embroidered Kurta with Trousers "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/13807256/2021/3/20/197a9710-3fdc-4f4f-871d-45aa300cd9f91616225557030KALINISeaGreenArtSilkSolidTasselSareeKurtaSetsAnubhuteeWomen1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Libas"],
    //     price: [" 4699 "],
    //     pricedicounted: ["\u20b92208 "],
    //     producttype: ["Women Printed Kurta with Palazzos & Dupatta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/7319923/2018/9/18/ce061dc6-ffa8-4a5a-8776-504b8b78c9201537247723236-Libas-Women-Yellow--White-Printed-Kurta-with-Palazzos--Dupatta-5961537247722978-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Vishudh"],
    //     price: [" 2149 "],
    //     pricedicounted: ["\u20b91299 "],
    //     producttype: ["Women Printed Fit and Flare Dress "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/8662559/2019/10/1/da580819-f252-446c-a103-3a6e8815c9f91569924875019-Vishudh-Women-Grey-Printed-Fit-and-Flare-Dress-4511569924872-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["ZIYAA"],
    //     price: [" 2468 "],
    //     pricedicounted: ["\u20b9962 "],
    //     producttype: ["Floral Leafy Foil Kurta Set "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/11056866/2019/12/9/67a0d919-cbca-4d89-a8f1-6a25c9e9305c1575891613300-Round-NeckWith--34th-Sleeve-Straight-Floral-print-Crepe-Kurt-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Anubhutee"],
    //     price: [" 2199 "],
    //     pricedicounted: ["\u20b9989 "],
    //     producttype: ["Ethnic Embroidered Kurta Set "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/10942370/2019/11/19/3cfdd561-ad23-4ee4-8187-de635252a15e1574150056042-Anubhutee-Women-Navy-Blue--Off-White-Yoke-Design-Kurta-with--1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Anouk"],
    //     price: [" 2899 "],
    //     pricedicounted: ["\u20b91304 "],
    //     producttype: ["Floral Print Kurta Set "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/7186140/2018/10/3/e74e1ad0-7e16-47f9-a6b7-74b3cde055d01538569313154-Anouk-Women-Fuchsia-Printed-Kurta-with-Trousers--Dupatta-869-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Sangria"],
    //     price: [" 1699 "],
    //     pricedicounted: ["\u20b9934 "],
    //     producttype: ["Pure Cotton Printed Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/13437304/2021/2/26/5c7aaf1e-5a4f-4333-805b-273119ef21991614338189563-Sangria-Women-Kurtas-6211614338188389-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["AHIKA"],
    //     price: [" 1198 "],
    //     pricedicounted: ["\u20b9694 "],
    //     producttype: ["Printed Straight Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/10808290/2019/10/30/3573b361-8560-4aad-bcf6-265ad635ef581572423341928-AHIKA-Women-Kurtas-2491572423340722-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Indo Era"],
    //     price: [" 3299 "],
    //     pricedicounted: ["\u20b91220 "],
    //     producttype: ["Muted Dandelion Kurta Set "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/10885078/2019/11/21/7bcebac3-e62a-4b04-b77d-6137daeef6a81574346823453-Indo-Era-Solid-Straight-Kurta-with-Palazzo-Dupatta-Set-30815-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["PANIT"],
    //     price: [" 4299 "],
    //     pricedicounted: ["\u20b91676 "],
    //     producttype: ["Self Design Kurti with Palazzos & Dupatta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/12394870/2020/9/2/f4040f5f-7d16-413c-8730-e390fa3f1ece1599054216986PANITWomenYellow1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Jaipur Kurti"],
    //     price: [" 1649 "],
    //     pricedicounted: ["\u20b9676 "],
    //     producttype: ["Printed Straight Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/5571465/2018/5/15/2ac3672a-d16d-4aec-b853-30a3f50708021526387316249-Jaipur-Kurti-Women-Turquoise-Blue--Green-Printed-Straight-Kurta-5621526387316032-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Yuris"],
    //     price: [" 3499 "],
    //     pricedicounted: ["\u20b91294 "],
    //     producttype: ["Kurta with Trousers & Dupatta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/13027852/2020/12/18/e5740785-849e-4cbd-8d3b-78d38d9abd4d1608288067857YurisBlackWhitePrintedKurtaWithPalazooDupatta1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Varanga"],
    //     price: [" 3599 "],
    //     pricedicounted: ["\u20b91259 "],
    //     producttype: ["Print Maxi Dress With Dupatta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/13764658/2021/3/24/295b01d0-4fb7-44ef-b8cc-bf6b656aec3f1616560148700-Varanga-White-And-Indigo-Block-Printed-Anarkali-Dress-With-D-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Libas"],
    //     price: [" 2199 "],
    //     pricedicounted: ["\u20b91759 "],
    //     producttype: ["Women Embroidered A-Line Dress "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/10842022/2019/11/6/a373d08e-a2fb-4cbf-9a19-dd9679ea0c181573032453223-Libas-Women-Dresses-7681573032451400-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Anouk"],
    //     price: [" 3099 "],
    //     pricedicounted: ["\u20b92014 "],
    //     producttype: ["Solid Kurta with Trousers & Dupatta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/13237954/2021/3/4/908d7674-f18b-46d0-9f79-002839633a951614836858273-Anouk-Women-Kurta-Sets-5551614836855969-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Vishudh"],
    //     price: [" 2249 "],
    //     pricedicounted: ["\u20b9787 "],
    //     producttype: ["Women Checked Maxi Dress "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/productimage/2019/6/13/f1efffbb-d77f-472e-aef7-136d718e61f61560384815947-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["AURELIA"],
    //     price: [" 1299 "],
    //     pricedicounted: ["\u20b9649 "],
    //     producttype: ["Women Ethnic Motifs Printed Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/13543712/2021/3/1/0dec0fa7-253a-4658-82f7-6eb15dcdb1081614588678674AureliaDarkPinkGeometricPrintKurta1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Anubhutee"],
    //     price: [" 1999 "],
    //     pricedicounted: ["\u20b9939 "],
    //     producttype: ["Peacock Blue Motifs Kurta Set "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/11090416/2019/12/13/ba5f515e-1320-4895-be40-15a70a529e1b1576244873040-Anubhutee-Women-Teal--White-Printed-Kurta-with-Palazzos-3371-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Libas"],
    //     price: [" 1999 "],
    //     pricedicounted: ["\u20b9939 "],
    //     producttype: ["High-Low Kurta with Palazzo "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/11917538/2020/6/15/c6d4360b-f59e-4a52-b8f0-fccdde88d1291592198449728KurtasGERUAWomenDressesGERUAWomenKurtasGERUAWomenDressesGERU1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Anouk"],
    //     price: [" 999 "],
    //     pricedicounted: ["\u20b9649 "],
    //     producttype: ["Printed A-Line Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/11201536/2020/2/11/6b5b3442-b0ec-4365-a3ab-f6567620db021581416079076-Anouk-Women-Kurtas-3881581416077880-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Vishudh"],
    //     price: [" 2099 "],
    //     pricedicounted: ["\u20b9839 "],
    //     producttype: ["Women Printed Shirt Dress "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/productimage/2019/6/10/027bc8c5-c343-49d4-bdc6-bb9687ef03ab1560139075957-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["Napra"],
    //     price: [" 1499 "],
    //     pricedicounted: ["\u20b9494 "],
    //     producttype: ["Embroidered Georgette Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/productimage/2020/1/10/fd72530e-22b2-4796-9f57-f819975898741578611005769-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["7Threads"],
    //     price: [" 1339 "],
    //     pricedicounted: ["\u20b9455 "],
    //     producttype: ["Women Ethnic Motifs Printed Kurta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/productimage/2021/2/24/0f1697df-2e23-4ee2-85d9-0a3cf0a6dde51614143174549-1.jpg"
    //     ]
    //   },
    //   {
    //     productname: ["GoSriKi"],
    //     price: [" 3119 "],
    //     pricedicounted: ["\u20b9935 "],
    //     producttype: ["Printed Kurta with Trousers & Dupatta "],
    //     product_link:
    //       "https://www.myntra.com/kurta-sets/gosriki/gosriki-women-burgundy--off-white-printed-kurta-with-trousers--dupatta/13462942/buy",
    //     imagelink: [
    //       "https://assets.myntassets.com/dpr_2,h_240,q_50,w_180/assets/images/13462942/2021/2/9/7b6e3c48-d06f-4378-b497-2b89b5dcfda01612871210267-GoSriki-Women-Burgundy-Solid-Straight-Kurta-with-Palazzos--D-1.jpg"
    //     ]
    //   }
    // ];
    // newmyntra.map(product => {
    //   db.collection("Items")
    //     .add({
    //       title: product.productname[0],
    //       price: product.price[0],
    //       img: product.imagelink[0],
    //       category: product.producttype[0],
    //       description: product.producttype[0],
    //       link: product.product_link
    //     })
    //     .then(function (docRef) {
    //       product.id = docRef.id;
    //       db.collection("Items")
    //         .doc(docRef.id)
    //         .set(
    //           {
    //             id: docRef.id
    //           },
    //           { merge: true }
    //         )
    //         .then(() => console.log("sucessfully set"))
    //         .catch(error => console.log(error));
    //     })
    //     .catch(error => console.log("Couldnt ADD dataitems"));
    // });
    db.collection("Items")
      .get()
      .then(docs => {
        docs.forEach(doc => {
          Newproducts.push(doc.data());
        });
        setProducts(Newproducts);
      })
      .catch(error => console.log(error));
    console.log(products.length);
  };
  useEffect(() => {
    fetchProducts();
    // console.log("in use effect", products);
  }, []); //executes once during the start

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        //console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        });
        // console.log(result);
        //for new user
        if (result.additionalUserInfo.isNewUser) {
          const userRef = db.collection("user");
          console.log(result);
          console.log(user);
          userRef
            .doc(result.user.uid)
            .set({
              uid: result.user.uid,
              displayName: result.user.displayName,
              wishlist: [],
              cart: [],
              groups: [],
              emailid: result.user.email
            })
            .then(docRef => {
              setloggedIn(true);
            })
            .catch(error => {
              console.error("Error adding user: ", error);
            });
        } else {
          setloggedIn(true);
        }
      })
      .catch(error => alert(error.message));
  };
  return (
    <div className="app">
      {!loggedIn ? (
        <div className="login">
          <div className="login_container">
            <img src={logo} alt="" />
            <div className="login_text">
              <h1>Sign in to ColabShop</h1>
            </div>
            <Button type="submit" onClick={signIn}>
              Sign in With Google
            </Button>
          </div>
        </div>
      ) : (
        <div className="app__productbody">
          <NavBar />
          <div className="product">
            {products ? <Products products={products} /> : null}
          </div>
          <div className="app__body">
            <Router>
              <ErrorBoundary>
                <SideBar />
              </ErrorBoundary>
              <Switch>
                <Route exact path="/rooms/:roomId" component={Chat}></Route>
              </Switch>
            </Router>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
