/* eslint-disable no-unused-vars */
import {
  AnalyticsIcon,
  // AuditTrailIcon,
  // DatabaseIcon,
  // DispatchIcon,
  // DriverIcon,
  // HomeIcon,
  // InvoiceIcon,
  // NotificationBellIcon,
  // OrderIcon,
  SettingsIcon,
  // ShipmentCalculatorIcon,
  ShipmentIcon,
  SupportIcon,
  // TransactionIcon,
} from "src/assets/SvgIcons";
import {
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
} from "../assets/SvgIcons";

export const sidedata = [
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
        title: "Orders List",
        icon: <DotIcon />,
        href: "/admin/order-list",
      },
    ],
  },

  {
    title: "Property",
    icon: <PropertyIcon />,
    href: "/admin/property",
    child: [
      {
        title: "Add property",
        icon: <DotIcon />,
        href: "/admin/property/add-property",
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
