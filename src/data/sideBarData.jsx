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
} from "../assets/SvgIcons";

export const sidedata = [
  {
    title: "Overview",
    icon: <OverViewIcon />,
    href: "/dashboard",
    child: [
      // {
      //   title: "Admin Home",
      //   icon: <SettingsIcon />,
      //   href: "/dashboard/home-admin",
      // },
      // {
      //   title: "Order Home",
      //   icon: <HomeIcon />,
      //   href: "/dashboard/order-home",
      // },
      // {
      //   title: "Sales Home",
      //   icon: <HomeIcon />,
      //   href: "/dashboard/home-sales",
      // },
    ],
  },
  {
    title: "Transactions",
    icon: <TransactionsIcon />,
    href: "/orders-management",
    child: [
      {
        title: "Orders List",
        icon: <DotIcon />,
        href: "/orders-management/orders-list",
      },
    ],
  },

  {
    title: "Property for Rent",
    icon: <PropertyForRentIcon />,
    // href: "/property-for-rent",
    child: [
      {
        title: "Add property",
        icon: <DotIcon />,
        href: "/add-property",
      },
      {
        title: "Approve property",
        icon: <DotIcon />,
        href: "/approve-property",
      },
      {
        title: "Property for Rent",
        icon: <DotIcon />,
        href: "Property for Rent",
      },
    ],
  },
  {
    title: "Customers",
    icon: <CustomerIcon />,
    // href: "",
    child: [],
  },
  {
    title: "Reports",
    icon: <ReportIcon />,
    // href: "",
    child: [],
  },

  {
    title: "Adverts",
    icon: <AdvertsIcon />,
    // href: "",
    child: [],
  },
  {
    title: "Admin ",
    icon: <PropertyForRentIcon />,
    // href: "",
    child: [],
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
        href: "/icons-iconify",
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
  //       href: "#",
  //     },
  //     {
  //       title: "Level 2",
  //       icon: <SettingsIcon />,
  //       nested: [
  //         {
  //           title: "Level-2.1",
  //           href: "#",
  //         },
  //         {
  //           title: "Level 2.2",
  //           href: "#",
  //         },
  //         {
  //           title: "Level 3",
  //           child: [
  //             {
  //               title: "Level 3.1",
  //               href: "#",
  //             },
  //             {
  //               title: "Level 3.2",
  //               href: "#",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];
