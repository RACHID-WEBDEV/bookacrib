/* eslint-disable no-unused-vars */

import {
  AnalyticsIcon,
  SettingsIcon,
  ShipmentIcon,
  SupportIcon,
  CartIcon,
  CmsIcon,
  GlobeIcon,
  UserGroupIcon,
  OverViewIcon,
  TransactionsIcon,
  DotIcon,
  PropertyForRentIcon,
  CustomerIcon,
  ReportIcon,
  AdvertsIcon,
  NotifcationActiveIcon,
  AvatarIcon,
  PropertyIcon,
  CompanyIcon,
} from "../assets/SvgIcons";

export const adminsidedata = [
  {
    title: "Overview",
    icon: <OverViewIcon />,
    href: "/admin/dashboard",
    child: [
      // {
      //   title: "Admin Home",
      //   icon: <SettingsIcon />,
      //   href: "/admin/dashboard/home-admin",
      // },
      // {
      //   title: "Order Home",
      //   icon: <HomeIcon />,
      //   href: "/admin/dashboard/order-home",
      // },
      // {
      //   title: "Sales Home",
      //   icon: <HomeIcon />,
      //   href: "/admin/dashboard/home-sales",
      // },
    ],
  },
  {
    title: "Transactions",
    icon: <TransactionsIcon />,
    href: "/admin/transactions",
    child: [
      {
        title: "List Bookings",
        icon: <DotIcon />,
        href: "/admin/transactions/list-bookings",
      },
    ],
  },

  {
    title: "Property",
    icon: <PropertyIcon />,
    href: "/admin/property/all-properties",
    child: [
      {
        title: "Create property",
        icon: <DotIcon />,
        href: "/admin/property/create-property",
      },
      {
        title: "Approve property",
        icon: <DotIcon />,
        href: "/admin/property/approve-property",
      },
      {
        title: "Features",
        icon: <DotIcon />,
        href: "/admin/property/features",
      },
      {
        title: "Categories",
        icon: <DotIcon />,
        href: "/admin/property/categories",
      },
      {
        title: "Room Type",
        icon: <DotIcon />,
        href: "/admin/property/room-types",
      },
      {
        title: "Property for Rent",
        icon: <DotIcon />,
        href: "/admin/property/property-for-Rent",
      },
    ],
  },
  {
    title: "Companies",
    icon: <CompanyIcon />,
    href: "/admin/list-companies",
    child: [],
  },
  {
    title: "Customers",
    icon: <CustomerIcon />,
    href: "/admin/customers",
    child: [],
  },
  {
    title: "Reports",
    icon: <ReportIcon />,
    // href: "/admin",
    child: [],
  },

  {
    title: "Adverts",
    icon: <AdvertsIcon />,
    // href: "/admin",
    child: [],
  },
  {
    title: "Admin ",
    icon: <PropertyForRentIcon />,
    href: "/admin/settings",
    child: [
      {
        title: "Roles",
        icon: <DotIcon />,
        href: "/admin/settings/roles",
      },
      {
        title: "Permissions",
        icon: <DotIcon />,
        href: "/admin/settings/permissions",
      },
    ],
  },
  {
    isHeader: true,
    title: "Internal tools",
  },

  {
    title: "Settings",
    icon: <SettingsIcon />,
    child: [
      {
        title: "Hero Icons",
        icon: <SettingsIcon />,
        href: "/admin/icons-iconify",
      },
    ],
  },
  {
    title: "Notifications",
    icon: <NotifcationActiveIcon />,
    child: [],
  },

  // {
  //   title: "Multi Level",
  //   icon: <AuditTrailIcon />,
  //   child: [
  //     {
  //       title: "Level 1.1",
  //       icon: <AuditTrailIcon />,
  //       href: "/admin#",
  //     },
  //     {
  //       title: "Level 2",
  //       icon: <SettingsIcon />,
  //       nested: [
  //         {
  //           title: "Level-2.1",
  //           href: "/admin#",
  //         },
  //         {
  //           title: "Level 2.2",
  //           href: "/admin#",
  //         },
  //         {
  //           title: "Level 3",
  //           child: [
  //             {
  //               title: "Level 3.1",
  //               href: "/admin#",
  //             },
  //             {
  //               title: "Level 3.2",
  //               href: "/admin#",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export const sidedata = [
  {
    title: "Overview",
    icon: <OverViewIcon />,
    href: "/user/dashboard",
    child: [
      // {
      //   title: "Admin Home",
      //   icon: <SettingsIcon />,
      //   href: "/user/dashboard/home-admin",
      // },
      // {
      //   title: "Order Home",
      //   icon: <HomeIcon />,
      //   href: "/user/dashboard/order-home",
      // },
      // {
      //   title: "Sales Home",
      //   icon: <HomeIcon />,
      //   href: "/user/dashboard/home-sales",
      // },
    ],
  },
  {
    title: "Transactions",
    icon: <TransactionsIcon />,
    href: "/user/transactions",
    child: [
      {
        title: "List Bookings",
        icon: <DotIcon />,
        href: "/user/transactions/list-bookings",
      },
    ],
  },

  {
    title: "Property",
    icon: <PropertyIcon />,
    href: "/user/property",
    child: [
      {
        title: "Create property",
        icon: <DotIcon />,
        href: "/user/property/create-property",
      },
      {
        title: "Approve property",
        icon: <DotIcon />,
        href: "/user/property/approve-property",
      },
      {
        title: "Features",
        icon: <DotIcon />,
        href: "/user/property/features",
      },
      {
        title: "Categories",
        icon: <DotIcon />,
        href: "/user/property/categories",
      },
      {
        title: "Room Type",
        icon: <DotIcon />,
        href: "/user/property/room-types",
      },
      {
        title: "Property for Rent",
        icon: <DotIcon />,
        href: "/user/property/property-for-Rent",
      },
    ],
  },
  {
    title: "Customers",
    icon: <CustomerIcon />,
    // href: "/admin",
    child: [],
  },
  {
    title: "Reports",
    icon: <ReportIcon />,
    // href: "/admin",
    child: [],
  },

  {
    title: "Adverts",
    icon: <AdvertsIcon />,
    // href: "/admin",
    child: [],
  },
  {
    title: "Admin ",
    icon: <PropertyForRentIcon />,
    href: "/user/settings",
    child: [
      {
        title: "Roles",
        icon: <DotIcon />,
        href: "/user/settings/roles",
      },
      {
        title: "Permissions",
        icon: <DotIcon />,
        href: "/user/settings/permissions",
      },
    ],
  },
  {
    isHeader: true,
    title: "Internal tools",
  },

  {
    title: "Settings",
    icon: <SettingsIcon />,
    child: [
      {
        title: "Hero Icons",
        icon: <SettingsIcon />,
        href: "/user/icons-iconify",
      },
    ],
  },
  {
    title: "Notifications",
    icon: <NotifcationActiveIcon />,
    child: [],
  },

  // {
  //   title: "Multi Level",
  //   icon: <AuditTrailIcon />,
  //   child: [
  //     {
  //       title: "Level 1.1",
  //       icon: <AuditTrailIcon />,
  //       href: "/admin#",
  //     },
  //     {
  //       title: "Level 2",
  //       icon: <SettingsIcon />,
  //       nested: [
  //         {
  //           title: "Level-2.1",
  //           href: "/admin#",
  //         },
  //         {
  //           title: "Level 2.2",
  //           href: "/admin#",
  //         },
  //         {
  //           title: "Level 3",
  //           child: [
  //             {
  //               title: "Level 3.1",
  //               href: "/admin#",
  //             },
  //             {
  //               title: "Level 3.2",
  //               href: "/admin#",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];
