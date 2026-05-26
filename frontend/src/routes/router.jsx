import {
  createRootRoute,
  createRoute,
  createRouter
} from "@tanstack/react-router";

import MainLayout from "../layouts/MainLayout";
import HomePage from "./HomePage";
import ImportListing from "./ImportListing";
import Listings from "./Listings";

// Root layout route
const rootRoute = createRootRoute({
  component: MainLayout
});

// Home route
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage
});

// Import Listing route
const importListingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/import",
  component: ImportListing
});
// Listings route
const listingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/listings",
  component: Listings
});

//Contact route
import Contact from "./Contact";

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact
});

import SignIn from "./SignIn";

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin",
  component: SignIn
});
import CreateListing from "./admin/CreateListing";

const adminCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/listings",
  component: CreateListing
});

import PropertyDetails from "./PropertyDetails";
const propertyDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/property/:id",
  component: PropertyDetails
});
// Route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  importListingRoute,
  contactRoute,
  signInRoute,
  adminCreateRoute,
  propertyDetailsRoute,
  listingsRoute
]);

export const router = createRouter({
  routeTree
});